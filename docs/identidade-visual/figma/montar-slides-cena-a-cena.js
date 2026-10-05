// Monta os slides internos de um carrossel "cena a cena" no Figma.
//
// Roda no `use_figma` (Plugin API, com await e return no topo).
// Antes de rodar:
//   1. Crie a seção com os frames 1080x1350 e um retângulo "Cena" em cada um.
//   2. Suba as imagens nos retângulos (upload_assets com nodeIds, scaleMode FILL).
//   3. Preencha SLIDES abaixo com os ids dos frames e dos retângulos.
//
// O script adiciona, por cima da cena: degradê de topo e de base, textura,
// "devbygusta", índice, seta, bloco de conteúdo e, no último slide, o chip de CTA.

const PAGINA = '0:1'
const TEXTURA = '391:41' // "Ruído & Textura" de um carrossel existente
const CHIP = '391:162' // "Chip CTA" de um carrossel existente

// Desça a cena (cenaY) quando o personagem encostar no texto.
// Ligue `emenda` quando a imagem vier com o topo chapado e uma linha reta no meio.
const SLIDES = [
  { frame: 'ID_FRAME_02', cena: 'ID_CENA_02', indice: '02 / 07', eyebrow: 'O PROBLEMA', titulo: 'Ninguém espera página carregar', destaque: 'espera', corpo: 'Texto de até ~25 palavras.' },
  // ...
  { frame: 'ID_FRAME_07', cena: 'ID_CENA_07', indice: '07 / 07', eyebrow: 'RESUMINDO', titulo: 'Síntese do carrossel.', destaque: 'carrossel', cta: true },
]
const CENA_Y = 0
const EMENDA = false
const CTA = 'me chama que eu te mostro como'
const CTA_DESTAQUE = 'como'

const abismo = { r: 2 / 255, g: 7 / 255, b: 21 / 255 }
const ciano = { r: 26 / 255, g: 216 / 255, b: 233 / 255 }
const branco = { r: 1, g: 1, b: 1 }
const VERTICAL = [[0, 1, 0], [-1, 0, 1]]

const pagina = await figma.getNodeByIdAsync(PAGINA)
await figma.setCurrentPageAsync(pagina)
await Promise.all(['Bold', 'ExtraBold', 'Black', 'Regular', 'SemiBold'].map(style => figma.loadFontAsync({ family: 'Figtree', style })))
const textura = await figma.getNodeByIdAsync(TEXTURA)
const chipBase = await figma.getNodeByIdAsync(CHIP)

function texto(pai, conteudo, estilo, tamanho, cor, opacidade, nome) {
  const t = figma.createText()
  t.fontName = { family: 'Figtree', style: estilo }
  t.fontSize = tamanho
  t.characters = conteudo
  t.fills = [{ type: 'SOLID', color: cor, opacity: opacidade }]
  t.name = nome || conteudo
  pai.appendChild(t)
  return t
}

function degrade(nome, largura, altura, paradas) {
  const r = figma.createRectangle()
  r.name = nome
  r.resize(largura, altura)
  r.fills = [{ type: 'GRADIENT_LINEAR', gradientTransform: VERTICAL, gradientStops: paradas.map(([position, a]) => ({ position, color: { ...abismo, a } })) }]
  return r
}

const relatorio = []
for (const s of SLIDES) {
  const frame = await figma.getNodeByIdAsync(s.frame)
  const cena = await figma.getNodeByIdAsync(s.cena)
  cena.y = CENA_Y

  if (EMENDA) {
    const emenda = degrade('Scrim emenda', 1080, 150, [[0, 0.97], [0.3, 0.85], [1, 0]])
    frame.appendChild(emenda)
    emenda.x = 0
    emenda.y = 640
  }

  const topo = degrade('Scrim topo', 1080, 820, [[0, 0.94], [0.55, 0.7], [1, 0]])
  frame.appendChild(topo)
  topo.x = 0
  topo.y = 0

  const base = degrade('Scrim base', 1080, 300, [[0, 0], [1, 0.85]])
  frame.appendChild(base)
  base.x = 0
  base.y = 1050

  const ruido = textura.clone()
  frame.appendChild(ruido)
  ruido.resize(1080, 1350)
  ruido.x = 0
  ruido.y = 0
  ruido.opacity = 0.35

  const handle = texto(frame, 'devbygusta', 'Bold', 26, branco, 0.85, 'devbygusta')
  handle.x = 72
  handle.y = 72

  const indice = texto(frame, s.indice, 'Bold', 26, branco, 0.7, 'indice')
  indice.x = 72
  indice.y = 1244

  if (!s.cta) {
    const seta = texto(frame, '→', 'Regular', 40, branco, 0.55, 'seta')
    seta.x = 964
    seta.y = 1236
  }

  // createAutoLayout nasce com fundo branco: zere o fill
  const conteudo = figma.createAutoLayout('VERTICAL', { name: 'Conteúdo', itemSpacing: 32 })
  conteudo.fills = []
  frame.appendChild(conteudo)
  conteudo.x = 72
  conteudo.y = 170

  const eyebrow = texto(conteudo, s.eyebrow, 'ExtraBold', 26, ciano, 1)
  eyebrow.letterSpacing = { unit: 'PERCENT', value: 8 }
  eyebrow.effects = [{ type: 'DROP_SHADOW', visible: true, radius: 18, color: { ...ciano, a: 0.4 }, offset: { x: 0, y: 0 }, spread: 0, blendMode: 'NORMAL' }]

  const titulo = texto(conteudo, s.titulo, 'Black', 96, branco, 1)
  titulo.lineHeight = { unit: 'PERCENT', value: 96 }
  titulo.letterSpacing = { unit: 'PERCENT', value: -2 }
  titulo.textAutoResize = 'HEIGHT'
  titulo.resize(936, titulo.height)
  const i = s.titulo.lastIndexOf(s.destaque)
  titulo.setRangeFills(i, i + s.destaque.length, [{ type: 'SOLID', color: ciano }])

  if (s.corpo) {
    const corpo = texto(conteudo, s.corpo, 'Regular', 38, branco, 0.8)
    corpo.lineHeight = { unit: 'PERCENT', value: 140 }
    corpo.textAutoResize = 'HEIGHT'
    corpo.resize(936, corpo.height)
  }

  if (s.cta) {
    const chip = chipBase.clone()
    frame.appendChild(chip)
    chip.x = 72
    chip.y = Math.round(conteudo.y + conteudo.height + 56)
    chip.effects = chip.effects.map(e => (e.type === 'DROP_SHADOW' ? { ...e, color: { ...ciano, a: 0.25 } } : e))
    const rotulo = chip.findOne(n => n.type === 'TEXT')
    rotulo.characters = CTA
    rotulo.name = CTA
    rotulo.setRangeFills(0, CTA.length, [{ type: 'SOLID', color: branco, opacity: 0.92 }])
    const j = CTA.lastIndexOf(CTA_DESTAQUE)
    rotulo.setRangeFills(j, j + CTA_DESTAQUE.length, [{ type: 'SOLID', color: ciano }])
  }

  frame.placeholder = false
  relatorio.push({ slide: s.frame, fimDoConteudo: Math.round(conteudo.y + conteudo.height) })
}

return { relatorio }
