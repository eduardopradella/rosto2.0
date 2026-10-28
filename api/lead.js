import { put } from '@vercel/blob';
import { waitUntil } from '@vercel/functions';
import { randomUUID } from 'node:crypto';
import { inscreverNoFunil } from './_lib/funil.js';

export const config = { maxDuration: 30 };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		res.setHeader('Allow', 'POST');
		return res.status(405).json({ ok: false });
	}

	const body = typeof req.body === 'string' ? safeJson(req.body) : (req.body || {});

	// honeypot: robôs preenchem o campo escondido
	if (body.site) return res.status(200).json({ ok: true });

	const email = String(body.email || '').trim().toLowerCase().slice(0, 200);
	const nome = String(body.nome || '').trim().slice(0, 100);
	if (!EMAIL_RE.test(email)) return res.status(400).json({ ok: false, erro: 'email_invalido' });

	const agora = new Date();
	const lead = {
		email,
		nome,
		data: agora.toISOString(),
		origem: String(body.origem || '').slice(0, 300),
		variante: String(body.variante || '').slice(0, 20),
		utm: String(body.utm || '').slice(0, 500),
		pais: req.headers['x-vercel-ip-country'] || '',
		cidade: decodeURIComponent(req.headers['x-vercel-ip-city'] || '')
	};

	try {
		await put(`leads/${agora.toISOString().slice(0, 10)}/${agora.getTime()}-${randomUUID().slice(0, 8)}.json`, JSON.stringify(lead), {
			access: 'private',
			contentType: 'application/json',
			addRandomSuffix: false
		});
	} catch (e) {
		console.error('erro ao salvar lead', e);
		return res.status(500).json({ ok: false });
	}

	// envia o e-mail 1 e agenda os restantes sem atrasar a resposta ao pop-up
	waitUntil(inscreverNoFunil(lead).catch((e) => console.error('erro no funil', e)));

	return res.status(200).json({ ok: true });
}

function safeJson(s) {
	try { return JSON.parse(s); } catch { return {}; }
}
