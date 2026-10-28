import { list, get } from '@vercel/blob';
import { EMAILS, montarEmail } from './_lib/emails.js';
import { funilAtivo, inscreverNoFunil, lerEstado, linkDescadastro, linkDoEmail } from './_lib/funil.js';

export const config = { maxDuration: 60 };

// Painel de administração do funil (protegido pela LEADS_KEY):
//   /api/funil?key=..&ver=1..6[&variante=ponte|pagina]  pré-visualiza o e-mail n no navegador
//   /api/funil?key=..&acao=estado         lista os leads e em que ponto do funil estão
//   /api/funil?key=..&acao=inscrever-antigos[&confirmar=1]
//                                         inscreve no funil os leads que já existiam (sem confirmar = só simula)
export default async function handler(req, res) {
	if (!process.env.LEADS_KEY || req.query.key !== process.env.LEADS_KEY) return res.status(401).send('Não autorizado');
	res.setHeader('Cache-Control', 'no-store');

	const ver = Number(req.query.ver);
	if (ver >= 1 && ver <= EMAILS.length) {
		const variante = req.query.variante === 'ponte' ? 'ponte' : 'pagina';
		const { assunto, html } = montarEmail(ver - 1, { nome: 'Maria', link: linkDoEmail(ver - 1, variante), linkDescadastro: linkDescadastro('exemplo@exemplo.com'), variante });
		res.setHeader('Content-Type', 'text/html; charset=utf-8');
		return res.status(200).send(html.replace('<body style="', `<body data-assunto="${assunto.replace(/"/g, '')}" style="`).replace(/<\/title>/, `</title><!-- Assunto: ${assunto} -->`));
	}

	const leads = await todosOsLeads();

	if (req.query.acao === 'estado') {
		const linhas = [];
		for (const l of leads) {
			const e = await lerEstado(l.email);
			linhas.push({ email: l.email, inscrito: Boolean(e), variante: e?.variante || '', descadastrado: e?.descadastrado || false, emails: e?.emails?.map((x) => (x.erro ? `e${x.n}: ERRO ${x.erro}` : `e${x.n}: ${x.agendadoPara}`)) || [] });
		}
		return res.status(200).json({ funilAtivo: funilAtivo(), total: leads.length, leads: linhas });
	}

	if (req.query.acao === 'inscrever-antigos') {
		if (!funilAtivo()) return res.status(400).json({ erro: 'Defina RESEND_API_KEY e EMAIL_FROM primeiro.' });
		const pendentes = [];
		for (const l of leads) if (!(await lerEstado(l.email))) pendentes.push(l);
		if (req.query.confirmar !== '1') return res.status(200).json({ simulacao: true, seriamInscritos: pendentes.map((l) => l.email) });

		const resultado = [];
		const limite = Date.now() + 45000;
		for (const l of pendentes) {
			if (Date.now() > limite) { resultado.push({ aviso: 'Tempo esgotado: volte a abrir este link para continuar.' }); break; }
			const r = await inscreverNoFunil(l, { origem: 'antigos' });
			resultado.push({ email: l.email, ...r });
		}
		return res.status(200).json({ inscritos: resultado });
	}

	return res.status(400).send(`Use ?ver=1..${EMAILS.length}, ?acao=estado ou ?acao=inscrever-antigos`);
}

// Leads únicos (o mais antigo de cada e-mail), ignorando os e-mails de teste.
async function todosOsLeads() {
	const blobs = [];
	let cursor;
	do {
		const r = await list({ prefix: 'leads/', cursor, limit: 1000 });
		blobs.push(...r.blobs);
		cursor = r.hasMore ? r.cursor : undefined;
	} while (cursor);
	blobs.sort((a, b) => (a.pathname < b.pathname ? -1 : 1));

	const vistos = new Map();
	for (let i = 0; i < blobs.length; i += 20) {
		const lote = await Promise.all(blobs.slice(i, i + 20).map(async (b) => {
			try { const r = await get(b.pathname, { access: 'private' }); return JSON.parse(await new Response(r.stream).text()); } catch { return null; }
		}));
		for (const l of lote) if (l && !vistos.has(l.email) && !l.email.endsWith('@exemplo.com')) vistos.set(l.email, l);
	}
	return [...vistos.values()];
}
