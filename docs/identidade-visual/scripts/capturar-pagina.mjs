// Captura a página inteira de um site, no computador (1280) e no celular (360),
// para a galeria do case e para os slides do carrossel.
//
// Uso:
//   node capturar-pagina.mjs <url> <pasta-de-saida> [so-desktop]
//   python costurar-pagina.py <pasta-de-saida>
//
// Precisa do puppeteer-core instalado em algum projeto. Por padrão usa o do
// astro-criativos; para outro, passe o caminho em PUPPETEER_CORE.
//
// Por que fatiar em vez de `fullPage: true`: página com revelação no scroll só
// mostra a seção depois que ela entra na tela. O `fullPage` estica a janela de
// uma vez e as seções ficam no estado inicial, invisíveis. Aqui a página é
// rolada tela por tela, cada tela vira uma fatia e o costurar-pagina.py junta.
//
// O que já deu errado e está resolvido aqui:
// - "Reduzir movimento" ligado: site com seções que grudam e cartas empilhadas
//   (GSAP) vira uma página contínua, do jeito que dá para mostrar num print.
// - Barra de rolagem com cor própria aparecia como uma faixa na borda direita,
//   mesmo com --hide-scrollbars. Vai escondida por CSS.
// - Elemento sticky acompanha a rolagem e saía repetido na emenda das fatias
//   (ou sumia, quando era escondido junto com o menu). Ele é solto na posição
//   natural da página antes de fatiar. Só o que é fixed (menu, botão de
//   WhatsApp) some, a partir da segunda fatia.
import { pathToFileURL } from 'url'
import fs from 'fs'
import path from 'path'

const PP =
  process.env.PUPPETEER_CORE ??
  'C:/Users/GUSTAVO/Documents/projetos/astro-criativos/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js'
const CHROME = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const puppeteer = (await import(pathToFileURL(PP).href)).default

const [url, out, modo] = process.argv.slice(2)
if (!url || !out) {
  console.error('Uso: node capturar-pagina.mjs <url> <pasta-de-saida> [so-desktop]')
  process.exit(1)
}
fs.mkdirSync(out, { recursive: true })
const esperar = (ms) => new Promise((r) => setTimeout(r, ms))

const nav = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--hide-scrollbars'] })

async function capturar(rotulo, viewport, ua) {
  const p = await nav.newPage()
  await p.setViewport(viewport)
  if (ua) await p.setUserAgent(ua)
  await p.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
  await p.goto(url, { waitUntil: 'networkidle2', timeout: 90000 })
  await p.addStyleTag({
    content: '::-webkit-scrollbar{width:0!important;height:0!important;display:none!important} html,body{scrollbar-width:none!important}',
  })
  await esperar(2500)

  // uma passada pela página inteira carrega as imagens preguiçosas e monta as seções
  let total = await p.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y < total; y += viewport.height / 2) {
    await p.evaluate((a) => window.scrollTo(0, a), y)
    await esperar(250)
  }
  await p.evaluate(() => window.scrollTo(0, 0))
  await esperar(1500)

  const soltos = await p.evaluate(() => {
    let n = 0
    for (const el of document.querySelectorAll('body *')) {
      if (getComputedStyle(el).position === 'sticky') {
        el.style.setProperty('position', 'relative', 'important')
        el.style.setProperty('top', 'auto', 'important')
        n++
      }
    }
    return n
  })
  await esperar(800)

  total = await p.evaluate(() => document.documentElement.scrollHeight)
  const vista = viewport.height
  const n = Math.ceil(total / vista)
  for (let i = 0; i < n; i++) {
    await p.evaluate((a) => window.scrollTo(0, a), Math.min(i * vista, total - vista))
    await esperar(800)
    if (i === 1) {
      await p.evaluate(() => {
        for (const el of document.querySelectorAll('body *')) {
          if (getComputedStyle(el).position === 'fixed') el.style.visibility = 'hidden'
        }
      })
      await esperar(200)
    }
    // o nome guarda a rolagem real: o costurar-pagina.py cola cada fatia ali
    const real = await p.evaluate(() => window.scrollY)
    await p.screenshot({ path: path.join(out, `${rotulo}-${String(i).padStart(3, '0')}-${Math.round(real)}.png`) })
  }
  fs.writeFileSync(
    path.join(out, `${rotulo}.json`),
    JSON.stringify({ largura: viewport.width, total, dpr: viewport.deviceScaleFactor }),
  )
  console.log(`${rotulo}: ${total}px de altura, ${n} fatias, ${soltos} sticky soltos`)
  await p.close()
}

await capturar('desktop', { width: 1280, height: 800, deviceScaleFactor: 2 })
if (modo !== 'so-desktop') {
  await capturar(
    'mobile',
    { width: 360, height: 780, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  )
}
await nav.close()
