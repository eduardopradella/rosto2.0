// Sequência de recuperação de leads (5 e-mails, PT-PT).
// Blocos: string = parágrafo (**negrito**), { cta }, { lista: [] }, { img: n } (image/email/prova-n.jpg).
// atrasoHoras = horas após a inscrição.

export const EMAILS = [
	{
		atrasoHoras: 0,
		assunto: 'Faça este teste ao espelho (5 segundos)',
		preheader: 'Vai perceber porque é que nada resultou até hoje.',
		blocos: [
			'Antes de mais nada, quero que faça uma coisa. Não demora mais do que 5 segundos.',
			'Abra a câmara frontal do telemóvel (ou vá ao espelho) e faça isto:',
			{ lista: [
				'Relaxe o rosto. Sem sorrir.',
				'Pouse a ponta dos dedos no alto das maçãs do rosto, logo abaixo dos olhos.',
				'Empurre a pele 1 centímetro para cima, em direção às têmporas.'
			] },
			'Agora olhe para o seu bigode chinês.',
			'**Suavizou, não foi?** Em muitas mulheres, quase desaparece.',
			'Mas repare num pormenor que quase toda a gente ignora: **os seus dedos nem sequer tocaram no sulco.**',
			'Leia a frase seguinte devagar, porque explica porque é que cremes, séruns, massagens e até injeções não lhe deram o resultado que esperava:',
			'**O bigode chinês não é uma ruga. É uma queda.**',
			'As bochechas perderam sustentação, desceram, e o tecido acumulou-se junto à boca. O sulco é apenas o sítio onde essa queda se vê. Tratar o sulco é como pintar uma parede com infiltração: fica bonito uns dias e depois volta tudo.',
			'O que os seus dedos fizeram há bocado foi devolver a sustentação durante 5 segundos. A pergunta que vale tudo é: **e se fossem os seus próprios músculos a fazer isso, todos os dias, sozinhos?**',
			'Foi exatamente isso que aconteceu aqui:',
			{ img: 1 },
			'Sem agulhas. Sem volume artificial. Apenas a musculatura certa a voltar a segurar o rosto.',
			'Amanhã vou mostrar-lhe porque é que o tratamento mais vendido para o bigode chinês pode, com o tempo, deixar o rosto mais velho — e o que fazer em vez disso.',
			'Se não quer esperar até amanhã, veja o protocolo completo aqui:',
			{ cta: 'Quero ver o Protocolo' },
			'Até amanhã,',
			'**P.S.** Guarde este e-mail. Sempre que duvidar de que o problema é de sustentação, repita o teste do espelho.'
		]
	},
	{
		atrasoHoras: 24,
		assunto: 'O erro de centenas de euros que tantas mulheres repetem',
		preheader: 'Encher o sulco é tratar o sítio errado.',
		blocos: [
			'Ontem fez o teste do espelho e viu com os próprios olhos: o sulco suaviza quando as bochechas sobem.',
			'Hoje quero falar-lhe do erro mais caro que se comete com o bigode chinês.',
			'Chama-se **preencher o sulco.**',
			'À primeira vista faz sentido: há uma cova, enche-se a cova. Mas lembre-se do que viu ontem. A cova não é o problema. É a consequência de um tecido que está a descer.',
			'Então, o que acontece quando se injeta volume precisamente onde esse tecido se acumula?',
			{ lista: [
				'Acrescenta-se **peso** a uma zona que já está a cair.',
				'A causa — a perda de sustentação — **continua a avançar.**',
				'Daqui a uns meses o sulco volta. E volta-se à clínica.'
			] },
			'É assim que nasce aquele rosto que se reconhece à distância: bochechas estufadas, a metade de baixo da cara mais larga, o famoso "rosto de balão". Bonito na fotografia do dia. Estranho ao fim de dois anos.',
			'Não estou contra a estética. Estou contra gastar centenas de euros, de meses a meses, a responder à pergunta errada.',
			'A pergunta certa é: **o que voltou a segurar estes rostos?**',
			{ img: 2 },
			'Nada foi injetado. A diferença está na sustentação — músculos que voltaram a puxar para cima em vez de para baixo.',
			'Amanhã conto-lhe porque é que a ginástica facial do YouTube quase nunca consegue isto (e porque pode até piorar).',
			{ cta: 'Ver como funciona' },
			'Até amanhã,'
		]
	},
	{
		atrasoHoras: 48,
		assunto: '"Já tentei exercícios faciais e não resultou"',
		preheader: 'Tem razão. E sei exatamente porquê.',
		blocos: [
			'Se pensou isto ao ler os meus e-mails, quero dizer-lhe uma coisa: **tem razão.**',
			'A maioria dos exercícios faciais da internet não resulta. Alguns até pioram.',
			'E não é falta de disciplina sua. É um erro de ordem.',
			'O seu rosto tem dois grupos de músculos em guerra:',
			{ lista: [
				'**Os depressores** — puxam as bochechas e os cantos da boca para baixo. Com a idade, ganham força.',
				'**Os elevadores** — seguram as maçãs do rosto lá em cima. Com a idade, perdem força.'
			] },
			'Agora veja o que fazem os vídeos genéricos: caretas, sorrisos forçados, bochechas cheias de ar. Trabalham **os dois grupos ao mesmo tempo** — incluindo os que já estão a ganhar a guerra.',
			'É como tentar subir um estore enquanto alguém o puxa para baixo do outro lado. Faz força. Cansa-se. E o estore fica no mesmo sítio.',
			'O Protocolo Xô Bigode Chinês inverte a lógica:',
			{ lista: [
				'**Fase 1 — Desliga os depressores.** Primeiro, tira a força que puxa para baixo.',
				'**Fase 2 — Ancora os elevadores.** Só depois ativa, de forma isolada, os músculos que sustentam as maçãs do rosto — o mesmo gesto que os seus dedos fizeram no teste do espelho.',
				'**Fase 3 — Drena e oxigena.** Tira o inchaço para que a nova sustentação se veja.'
			] },
			'**3 minutos por dia.** Em casa. Com as suas mãos.',
			'É por isso que o resultado aparece onde a ginástica comum falhou:',
			{ img: 3 },
			{ cta: 'Começar hoje — desde €9,72' },
			'Amanhã: as contas que ninguém faz antes de marcar a próxima sessão.'
		]
	},
	{
		atrasoHoras: 72,
		assunto: 'Veja com atenção a zona do círculo',
		preheader: 'Sem agulhas. Só sustentação.',
		blocos: [
			'Hoje deixo as imagens falarem primeiro.',
			{ img: 4 },
			{ img: 5 },
			'Olhe para dentro do círculo vermelho. A linha que desce do nariz ao canto da boca. A sombra junto aos lábios. O contorno da bochecha.',
			'Nenhuma destas mulheres injetou nada. Fizeram uma rotina curta, todos os dias, que devolveu sustentação ao rosto.',
			'Agora, as contas:',
			{ lista: [
				'**Uma sessão de preenchimento:** várias centenas de euros. A repetir quando o efeito passa.',
				'**Cremes "anti-rugas":** dezenas de euros por frasco, todos os meses, a tratar só a superfície.',
				'**Protocolo Xô Bigode Chinês:** €9,72. Pagamento único. Seu para sempre.'
			] },
			'E se quiser o cuidado completo, o **Premium (€18,33)** junta três bónus pensados para a pele depois dos 35:',
			{ lista: [
				'**Manual Skincare Anti-Craquelado** — os ativos certos para devolver densidade à pele fina.',
				'**Guia do Colagénio na Menopausa e 35+** — hábitos e nutrição para travar a perda de colagénio.',
				'**Drenagem Express "Efeito Freshness"** — 5 minutos para desinchar o rosto no dia de um evento.'
			] },
			'E para que não tenha de confiar em mim às cegas: **7 dias de garantia.** Entra, vê as aulas, faz a rotina. Se não ficar satisfeita, por qualquer motivo, basta um e-mail e devolvemos 100% do valor. Sem perguntas.',
			'O risco é todo nosso.',
			{ cta: 'Escolher o meu plano' },
			'Amanhã envio-lhe a última mensagem sobre isto.'
		]
	},
	{
		atrasoHoras: 96,
		assunto: 'Vou deixar de lhe escrever sobre isto',
		preheader: 'Mas antes, uma pergunta honesta.',
		blocos: [
			'Esta é a última mensagem desta série, por isso vou direto ao assunto.',
			'Há uns dias deixou o seu e-mail numa página sobre o bigode chinês. Fê-lo porque aquilo que vê ao espelho a incomoda. Isso não mudou desde então.',
			'Nestes dias ficou a saber mais do que a maioria das pessoas que lhe venderam soluções:',
			{ lista: [
				'O bigode chinês é uma **queda**, não uma ruga.',
				'Preencher o sulco trata o sítio errado e pode deixar o rosto mais pesado.',
				'Os exercícios genéricos falham porque reforçam os músculos que puxam para baixo.',
				'A solução é desligar os depressores e ancorar os elevadores — por esta ordem.'
			] },
			'Agora tem duas opções.',
			'**A primeira:** fechar este e-mail e deixar para depois. O problema é que a sustentação não espera. Daqui a um ano o sulco estará mais fundo — e o mais provável é ter gasto dinheiro em mais um creme.',
			'**A segunda:** dar 3 minutos por dia ao seu rosto durante as próximas duas semanas, com 7 dias de garantia para decidir.',
			{ img: 2 },
			'Imagine a próxima reunião de família. Alguém olha para si duas vezes e pergunta: "O que é que fizeste? Estás com um ar tão descansado." E o segredo fica só consigo.',
			'Custa menos do que um almoço fora.',
			{ cta: 'Quero reerguer o meu rosto' },
			'Um abraço,',
			'**P.S.** Se alguma dúvida a está a travar, responda a este e-mail e diga-me qual é. Leio todas as respostas.'
		]
	}
];

const SITE = 'https://protocoloxo.vercel.app';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const negrito = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
const semMarcas = (s) => s.replace(/\*\*(.+?)\*\*/g, '$1');

// Monta o e-mail n (0-4) para um lead. Devolve { assunto, html, texto }.
export function montarEmail(n, { nome, link, linkDescadastro }) {
	const e = EMAILS[n];
	const saudacao = nome ? `Olá, ${nome.split(' ')[0]},` : 'Olá,';
	const assinatura = process.env.EMAIL_ASSINATURA || 'Equipa Protocolo Xô Bigode Chinês';
	const [base, ancora] = link.split('#');
	const urlCta = `${base}${base.includes('?') ? '&' : '?'}utm_source=email&utm_medium=sequencia&utm_campaign=xo_leads&utm_content=e${n + 1}${ancora ? '#' + ancora : ''}`;

	const p = 'margin:0 0 16px;font-size:16px;line-height:1.6;color:#2B2B2B';
	let corpo = `<p style="${p}">${esc(saudacao)}</p>`;
	let texto = `${saudacao}\n\n`;
	// a assinatura entra depois do primeiro "Até amanhã," / "Um abraço," (antes do P.S.), ou no fim
	let assinado = false;
	const assinar = () => {
		corpo += `<p style="${p}">${esc(assinatura)}</p>`;
		texto += `${assinatura}\n\n`;
		assinado = true;
	};
	for (const b of e.blocos) {
		if (typeof b === 'string') {
			if (!assinado && b.startsWith('**P.S.**')) assinar();
			corpo += `<p style="${p}">${negrito(b)}</p>`;
			texto += `${semMarcas(b)}\n\n`;
			if (!assinado && /^(Até amanhã|Um abraço),$/.test(b)) assinar();
		} else if (b.lista) {
			corpo += `<ul style="margin:0 0 16px;padding-left:22px;font-size:16px;line-height:1.6;color:#2B2B2B">${b.lista.map((i) => `<li style="margin-bottom:8px">${negrito(i)}</li>`).join('')}</ul>`;
			texto += b.lista.map((i) => `- ${semMarcas(i)}`).join('\n') + '\n\n';
		} else if (b.img) {
			corpo += `<p style="margin:8px 0 6px;text-align:center"><a href="${esc(urlCta)}"><img src="${SITE}/image/email/prova-${b.img}.jpg" width="504" alt="Antes e depois — bigode chinês" style="display:block;width:100%;max-width:504px;height:auto;border:0;border-radius:10px;margin:0 auto"></a></p>`
				+ `<p style="margin:0 0 18px;font-size:12px;line-height:1.4;color:#999;text-align:center">Fotos partilhadas por alunas, com autorização. Os resultados variam de pessoa para pessoa.</p>`;
		} else if (b.cta) {
			corpo += `<p style="margin:24px 0 28px;text-align:center"><a href="${esc(urlCta)}" style="display:inline-block;background:#00A428;color:#ffffff;font-weight:700;font-size:16px;text-decoration:none;padding:15px 28px;border-radius:10px">${esc(b.cta)}</a></p>`;
			texto += `${b.cta}: ${urlCta}\n\n`;
		}
	}
	if (!assinado) assinar();

	const rodape = 'Os resultados variam de pessoa para pessoa. Este produto é um programa de exercícios e cuidados em casa, não é um tratamento médico e não substitui o aconselhamento de um profissional de saúde.';
	texto += `---\n${rodape}\nRecebeu este e-mail porque se inscreveu em protocoloxo.vercel.app. Cancelar subscrição: ${linkDescadastro}\n`;

	const html = `<!doctype html><html lang="pt-PT"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(e.assunto)}</title></head>
<body style="margin:0;padding:0;background:#f9f0ff">
<span style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(e.preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f9f0ff"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;font-family:Arial,Helvetica,sans-serif">
<tr><td style="padding:22px 28px 6px;font-size:13px;font-weight:700;letter-spacing:.4px;color:#69338a;text-transform:uppercase">Protocolo Xô Bigode Chinês</td></tr>
<tr><td style="padding:12px 28px 8px">${corpo}</td></tr>
</table>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;font-family:Arial,Helvetica,sans-serif"><tr><td style="padding:16px 28px;font-size:12px;line-height:1.5;color:#888;text-align:center">
${esc(rodape)}<br><br>Recebeu este e-mail porque se inscreveu em protocoloxo.vercel.app.<br><a href="${esc(linkDescadastro)}" style="color:#888">Cancelar subscrição</a>
</td></tr></table>
</td></tr></table>
</body></html>`;

	return { assunto: e.assunto, html, texto };
}
