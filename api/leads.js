import { list, get } from '@vercel/blob';

// Exporta todos os leads em CSV: /api/leads?key=<LEADS_KEY>
export default async function handler(req, res) {
	const chave = process.env.LEADS_KEY;
	if (!chave || req.query.key !== chave) return res.status(401).send('Não autorizado');

	const blobs = [];
	let cursor;
	do {
		const r = await list({ prefix: 'leads/', cursor, limit: 1000 });
		blobs.push(...r.blobs);
		cursor = r.hasMore ? r.cursor : undefined;
	} while (cursor);

	const leads = [];
	for (let i = 0; i < blobs.length; i += 20) {
		const lote = await Promise.all(blobs.slice(i, i + 20).map(async (b) => {
			try {
				const r = await get(b.pathname, { access: 'private' });
				return JSON.parse(await new Response(r.stream).text());
			} catch { return null; }
		}));
		leads.push(...lote.filter(Boolean));
	}
	leads.sort((a, b) => (a.data < b.data ? 1 : -1));

	const vistos = new Set();
	const colunas = ['data', 'email', 'nome', 'variante', 'utm', 'pais', 'cidade', 'origem'];
	const linhas = [colunas.join(',')];
	for (const l of leads) {
		if (vistos.has(l.email)) continue;
		vistos.add(l.email);
		linhas.push(colunas.map((c) => '"' + String(l[c] ?? '').replace(/"/g, '""') + '"').join(','));
	}

	res.setHeader('Content-Type', 'text/csv; charset=utf-8');
	res.setHeader('Content-Disposition', `attachment; filename="leads-protocoloxo.csv"`);
	res.setHeader('Cache-Control', 'no-store');
	return res.status(200).send('\uFEFF' + linhas.join('\n'));
}
