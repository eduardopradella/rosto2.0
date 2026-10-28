import { put, get } from '@vercel/blob';
import { Resend } from 'resend';
import { createHash, createHmac } from 'node:crypto';
import { EMAILS, montarEmail } from './emails.js';

// Configuração (Vercel → Settings → Environment Variables)
//   RESEND_API_KEY  chave da API do Resend
//   EMAIL_FROM      remetente, ex.: "Protocolo Xô Bigode Chinês <contato@seudominio.com>"
//   EMAIL_REPLY_TO  opcional; por omissão protocoloxobigode@gmail.com
//   FUNIL_URL       destino dos botões; por omissão a secção de oferta da página
const SITE = 'https://protocoloxo.vercel.app';
const FUNIL_URL = process.env.FUNIL_URL || `${SITE}/#oferta`;
const REPLY_TO = process.env.EMAIL_REPLY_TO || 'protocoloxobigode@gmail.com';

export const funilAtivo = () => Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);

const hashEmail = (email) => createHash('sha256').update(email).digest('hex').slice(0, 32);
const caminhoEstado = (email) => `funil/${hashEmail(email)}.json`;
export const tokenEmail = (email) => createHmac('sha256', process.env.LEADS_KEY || '').update(email).digest('hex').slice(0, 20);

export function linkDescadastro(email) {
	const e = Buffer.from(email).toString('base64url');
	return `${SITE}/api/descadastrar?e=${e}&t=${tokenEmail(email)}`;
}

export async function lerEstado(email) {
	try {
		const r = await get(caminhoEstado(email), { access: 'private', useCache: false });
		return r ? JSON.parse(await new Response(r.stream).text()) : null;
	} catch { return null; }
}

export async function gravarEstado(email, estado, { novo = false } = {}) {
	await put(caminhoEstado(email), JSON.stringify(estado), {
		access: 'private',
		contentType: 'application/json',
		addRandomSuffix: false,
		allowOverwrite: !novo
	});
}

const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

// Envia com retry em caso de limite de taxa (429) ou erro temporário.
async function enviar(resend, payload, idempotencyKey) {
	for (let tentativa = 0; tentativa < 4; tentativa++) {
		const { data, error } = await resend.emails.send(payload, { idempotencyKey });
		if (!error) return data.id;
		if (error.statusCode && error.statusCode < 500 && error.statusCode !== 429) throw new Error(`${error.name}: ${error.message}`);
		await esperar(1000 * (tentativa + 1));
	}
	throw new Error('Resend indisponível após várias tentativas');
}

// Inscreve um lead na sequência: e-mail 1 agora, 2–5 agendados no Resend.
// A trava anti-duplicação é o ficheiro de estado criado com allowOverwrite:false —
// se já existir, o lead já entrou no funil e nada é enviado.
export async function inscreverNoFunil({ email, nome = '' }, { origem = 'popup' } = {}) {
	if (!funilAtivo()) return { estado: 'funil_inativo' };

	const estado = { email, nome, origem, inscritoEm: new Date().toISOString(), emails: [], descadastrado: false };
	try {
		await gravarEstado(email, estado, { novo: true });
	} catch {
		return { estado: 'ja_no_funil' };
	}

	const resend = new Resend(process.env.RESEND_API_KEY);
	const descadastro = linkDescadastro(email);
	const inicio = Date.now();
	const chave = hashEmail(email);

	for (let n = 0; n < EMAILS.length; n++) {
		const { assunto, html, texto } = montarEmail(n, { nome, link: FUNIL_URL, linkDescadastro: descadastro });
		const payload = {
			from: process.env.EMAIL_FROM,
			to: [email],
			replyTo: REPLY_TO,
			subject: assunto,
			html,
			text: texto,
			headers: {
				'List-Unsubscribe': `<${descadastro}>`,
				'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click'
			},
			tags: [{ name: 'sequencia', value: 'xo_leads' }, { name: 'email', value: `e${n + 1}` }]
		};
		if (EMAILS[n].atrasoHoras > 0) payload.scheduledAt = new Date(inicio + EMAILS[n].atrasoHoras * 3600e3).toISOString();

		try {
			const id = await enviar(resend, payload, `xo-${chave}-e${n + 1}`);
			estado.emails.push({ n: n + 1, id, agendadoPara: payload.scheduledAt || estado.inscritoEm });
		} catch (e) {
			estado.emails.push({ n: n + 1, erro: String(e.message || e) });
			console.error(`funil: falha no e-mail ${n + 1} para ${email}`, e);
		}
		await esperar(550); // limite padrão do Resend: 2 pedidos/segundo
	}

	await gravarEstado(email, estado);
	return { estado: 'inscrito', emails: estado.emails };
}

// Cancela os e-mails agendados que ainda não saíram e marca o lead como descadastrado.
export async function descadastrar(email) {
	const estado = (await lerEstado(email)) || { email, emails: [] };
	if (estado.descadastrado) return;
	if (process.env.RESEND_API_KEY) {
		const resend = new Resend(process.env.RESEND_API_KEY);
		for (const e of estado.emails) {
			if (!e.id || new Date(e.agendadoPara) <= new Date()) continue;
			try { await resend.emails.cancel(e.id); } catch {}
			await esperar(550);
		}
	}
	estado.descadastrado = true;
	estado.descadastradoEm = new Date().toISOString();
	await gravarEstado(email, estado);
}
