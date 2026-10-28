import { descadastrar, tokenEmail } from './_lib/funil.js';

// GET  /api/descadastrar?e=..&t=..  → página de confirmação (evita descadastros por antivírus que abrem links)
// POST /api/descadastrar?e=..&t=..  → descadastra (botão da página e "one-click" do Gmail/Outlook)
export default async function handler(req, res) {
	let email = '';
	try { email = Buffer.from(String(req.query.e || ''), 'base64url').toString('utf8'); } catch {}
	const valido = email && req.query.t === tokenEmail(email);

	res.setHeader('Content-Type', 'text/html; charset=utf-8');
	res.setHeader('Cache-Control', 'no-store');
	if (!valido) return res.status(400).send(pagina('Link inválido', 'Este link de cancelamento não é válido.'));

	if (req.method === 'POST') {
		await descadastrar(email);
		return res.status(200).send(pagina('Subscrição cancelada', 'Não voltará a receber estes e-mails. Obrigada pelo seu tempo. 💜'));
	}

	return res.status(200).send(pagina('Cancelar subscrição', `Deixar de receber os e-mails do Protocolo Xô Bigode Chinês em <strong>${email.replace(/[<>&"]/g, '')}</strong>?`,
		`<form method="post"><button type="submit">Sim, cancelar subscrição</button></form>`));
}

function pagina(titulo, texto, extra = '') {
	return `<!doctype html><html lang="pt-PT"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${titulo}</title>
<style>body{margin:0;background:#f9f0ff;font-family:Arial,Helvetica,sans-serif;color:#2B2B2B;display:flex;min-height:100vh;align-items:center;justify-content:center;padding:16px;box-sizing:border-box}
.c{background:#fff;border-radius:16px;padding:32px 26px;max-width:420px;text-align:center;box-shadow:0 10px 30px rgba(105,51,138,.08)}
h1{color:#4a2263;font-size:22px;margin:0 0 12px}p{line-height:1.6;margin:0 0 20px}
button{background:#69338a;color:#fff;border:0;border-radius:10px;padding:14px 22px;font-size:16px;font-weight:700;cursor:pointer}</style></head>
<body><div class="c"><h1>${titulo}</h1><p>${texto}</p>${extra}</div></body></html>`;
}
