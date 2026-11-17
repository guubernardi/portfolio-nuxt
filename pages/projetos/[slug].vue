<template>
  <main id="tela" ref="raiz" class="pagina-case">
    <V2Topo
      :linha1="nomeLinha1"
      :linha2="nomeLinha2"
      :texto="projeto.resumo"
      tamanho="medio"
      :trilha="[{ rotulo: 'Projetos', para: '/projetos' }, { rotulo: projeto.nome }]"
    >
      <template #antes-do-titulo>
        <span class="categoria">{{ projeto.categoria }}</span>
        <!-- Projeto de demonstração precisa dizer que é, e em cima, não numa
             nota de rodapé. Passar demo por trabalho contratado desmonta na
             primeira pergunta, e é o portfólio inteiro que perde. -->
        <p v-if="projeto.demonstracao" class="aviso-demo">
          Este eu fiz por conta própria, para ter um exemplo do nicho no portfólio. Não foi
          trabalho contratado, e os dados da página são fictícios.
        </p>
      </template>

      <template #acoes>
        <a class="v2-botao v2-botao--ciano-seta" :href="projeto.site" target="_blank" rel="noopener">
          Ver no ar
          <span class="v2-botao__bolinha"><SvgIcone nome="seta-direita" /></span>
        </a>
        <a class="v2-botao v2-botao--contorno" :href="linkWhatsapp" target="_blank" rel="noopener">
          Quero algo assim
        </a>
      </template>

      <!-- ficha ao lado do título: os dados objetivos ficam legíveis de relance -->
      <template #lado>
        <aside class="ficha" aria-label="Dados do projeto">
          <div v-for="linha in projeto.ficha" :key="linha.rotulo" class="ficha__linha">
            <span class="ficha__rotulo">{{ linha.rotulo }}</span>
            <span class="ficha__valor">{{ linha.valor }}</span>
          </div>
        </aside>
      </template>
    </V2Topo>

    <DivisorArco :topo="MARINHO" :base="GELO" />

    <!-- print principal e os números medidos -->
    <section class="vitrine v2-grade-clara" aria-label="O projeto">
      <div class="v2-conteudo">
        <div class="vitrine__print">
          <img
            :src="projeto.imagem"
            :alt="`${projeto.nome} no computador e no celular`"
            :width="projeto.largura"
            :height="projeto.altura"
            fetchpriority="high"
          />
        </div>

        <ul v-if="projeto.numeros?.length" class="numeros">
          <li v-for="n in projeto.numeros" :key="n.rotulo" class="numero">
            <span class="numero__valor">{{ n.valor }}<i v-if="n.unidade">{{ n.unidade }}</i></span>
            <span class="numero__rotulo">{{ n.rotulo }}</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- 01 contexto -->
    <section class="bloco bloco--claro v2-grade-clara">
      <div class="v2-conteudo">
        <header class="bloco__cabecalho">
          <p class="v2-rotulo"><b>01</b> O contexto</p>
          <h2 class="v2-titulo">Qual era o problema <em>antes {{ artigoContraido }} existir.</em></h2>
        </header>
        <div class="contexto">
          <p v-for="trecho in contexto" :key="trecho" class="contexto__coluna">{{ trecho }}</p>
        </div>
      </div>
    </section>

    <!-- 02 interface: sem capturas, a seção inteira sai -->
    <template v-if="projeto.galeria?.length">
      <DivisorArco :topo="GELO" :base="ABISMO" />
      <section class="bloco bloco--escuro v2-grade-escura">
        <div class="v2-conteudo">
          <header class="bloco__cabecalho">
            <p class="v2-rotulo v2-rotulo--escuro"><b>02</b> A interface</p>
            <h2 class="v2-titulo v2-titulo--claro">Cada tela, <em>no detalhe.</em></h2>
          </header>

          <div class="galeria">
            <figure v-for="tela in projeto.galeria" :key="tela.src" class="tela" :class="`tela--${tela.tipo}`">
              <!-- moldura desenhada em CSS: não carrega imagem de mockup -->
              <div class="aparelho" :style="{ '--percorrer': percorrer(tela) }">
                <div v-if="tela.tipo === 'mac'" class="aparelho__barra" aria-hidden="true">
                  <i /><i /><i />
                  <span>{{ dominioDoSite }}</span>
                </div>
                <span v-else class="aparelho__ilha" aria-hidden="true" />
                <div class="tela__janela" tabindex="0" :aria-label="tela.alt">
                  <img :src="tela.src" :alt="tela.alt" :width="tela.largura" :height="tela.altura" loading="lazy" decoding="async" />
                </div>
              </div>
              <figcaption>{{ tela.rotulo }}</figcaption>
            </figure>
          </div>

          <a class="galeria__link" :href="projeto.site" target="_blank" rel="noopener">
            Abrir {{ dominioDoSite }}
            <SvgIcone nome="seta-direita" />
          </a>
        </div>
      </section>
      <DivisorArco :topo="ABISMO" :base="MARINHO" />
    </template>
    <DivisorArco v-else :topo="GELO" :base="MARINHO" />

    <!-- 03 decisões -->
    <section class="bloco bloco--marinho">
      <div class="v2-conteudo">
        <header class="bloco__cabecalho">
          <p class="v2-rotulo v2-rotulo--escuro"><b>{{ projeto.galeria?.length ? '03' : '02' }}</b> O que foi feito</p>
          <h2 class="v2-titulo v2-titulo--claro">As decisões que <em>sustentam {{ artigo }}.</em></h2>
        </header>

        <ol class="decisoes">
          <li v-for="(decisao, i) in projeto.decisoes" :key="decisao.titulo" class="decisao">
            <span class="decisao__numero">{{ String(i + 1).padStart(2, '0') }}</span>
            <h3 class="decisao__titulo">{{ decisao.titulo }}</h3>
            <p class="decisao__texto">{{ decisao.texto }}</p>
          </li>
        </ol>
      </div>
    </section>

    <DivisorArco :topo="MARINHO" :base="GELO" />

    <!-- 04 entrega e outros projetos -->
    <section class="bloco bloco--claro v2-grade-clara">
      <div class="v2-conteudo">
        <header class="bloco__cabecalho">
          <p class="v2-rotulo"><b>{{ projeto.galeria?.length ? '04' : '03' }}</b> A entrega</p>
          <h2 class="v2-titulo">Tudo o que <em>ficou pronto.</em></h2>
        </header>

        <ul class="entregas">
          <li v-for="item in projeto.entregas" :key="item">
            <span class="entregas__check" aria-hidden="true"><SvgIcone nome="check" /></span>
            {{ item }}
          </li>
        </ul>

        <div v-if="outros.length" class="outros">
          <header class="bloco__cabecalho outros__cabecalho">
            <div>
              <p class="v2-rotulo">Veja outros projetos</p>
              <h2 class="v2-titulo">Mais projetos <em>no ar.</em></h2>
            </div>
            <!-- o caminho de volta para a página do nicho, ou para a lista toda -->
            <NuxtLink class="v2-botao v2-botao--escuro" :to="paginaDoServico || '/projetos'">
              {{ paginaDoServico ? servicoDoNicho.titulo : 'Ver todos os projetos' }}
              <span class="v2-botao__bolinha"><SvgIcone nome="seta-direita" /></span>
            </NuxtLink>
          </header>
          <ul class="outros__grade">
            <li v-for="outro in outros" :key="outro.id" class="outros__item">
              <V2CardProjeto :projeto="outro" tom="claro" />
            </li>
          </ul>
        </div>
      </div>
    </section>

    <DivisorArco :topo="GELO" :base="MARINHO" />
    <HomeChamada
      ancora="orcamento"
      linha1="Seu projeto pode"
      linha2="ser o próximo."
      :mensagem="`Olá! Vi o projeto da ${projeto.nome} no site e gostaria de um orçamento para algo parecido.`"
    />
    <DivisorArco :topo="MARINHO" :base="ABISMO" />
    <HomeRodape />
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import V2Topo from '~/components/pages/v2/V2Topo.vue'
import V2CardProjeto from '~/components/pages/v2/V2CardProjeto.vue'
import DivisorArco from '~/components/global/elementos/DivisorArco.vue'
import HomeChamada from '~/components/pages/home/HomeChamada.vue'
import HomeRodape from '~/components/pages/home/HomeRodape.vue'
import { useAnimacoes, entrar, parallax } from '~/composables/useAnimacoes'
import { servicoDoSetor } from '~/helpers/servicos'
import { PROJETOS, projetoPorSlug } from '~/helpers/projetos'
import { SITE_URL, SITE_NOME, ID_ORGANIZACAO, ID_SITE, urlCanonica, linkWhatsapp as montarWhatsapp } from '~/helpers/site'

// sem layout: o `default` traz uma Nav antiga; o case usa o topo da V2
definePageMeta({ layout: false })

const route = useRoute()
const projeto = projetoPorSlug(route.params.slug)

// slug inexistente precisa devolver 404 de verdade, senão a rota responde 200
// com página vazia e o Google indexa um caso que não existe
if (!projeto) {
  throw createError({ statusCode: 404, statusMessage: 'Projeto não encontrado', fatal: true })
}

const MARINHO = '#021228'
const ABISMO = '#020715'
const GELO = '#F3F7F9'

// sistema e loja não são página: os títulos acompanham o tipo do projeto
const ARTIGOS = { Sistema: 'o sistema', 'E-commerce': 'a loja' }
const artigo = ARTIGOS[projeto.categoria] || 'a página'
// "antes DA página existir", "antes DO sistema existir"
const artigoContraido = { 'a página': 'da página', 'o sistema': 'do sistema', 'a loja': 'da loja' }[artigo]

// o caminho de volta para a página do nicho: quem chegou no case por busca
// encontra a página de quem vende o serviço, e esse vai e volta junta as
// páginas num grupo sobre o mesmo assunto
const servicoDoNicho = servicoDoSetor(projeto.setor)
const paginaDoServico = servicoDoNicho ? `/${servicoDoNicho.slug}` : null

// outros projetos: primeiro os do mesmo tipo, depois o resto
const outros = [
  ...PROJETOS.filter((p) => p.id !== projeto.id && p.categoria === projeto.categoria),
  ...PROJETOS.filter((p) => p.id !== projeto.id && p.categoria !== projeto.categoria),
].slice(0, 3)

const linkWhatsapp = montarWhatsapp(
  `Olá! Vi o projeto da ${projeto.nome} no site e gostaria de um orçamento para algo parecido.`
)

// o nome no título vai em duas linhas: a primeira palavra e o resto
const palavras = projeto.nome.split(' ')
const nomeLinha1 = palavras.length > 1 ? palavras[0] : `${projeto.nome}.`
const nomeLinha2 = palavras.length > 1 ? `${palavras.slice(1).join(' ')}.` : ''

// o contexto vai em duas colunas, cortado na frase mais perto do meio
const contexto = (() => {
  const frases = projeto.contexto.match(/[^.!?]+[.!?]+/g) || [projeto.contexto]
  if (frases.length < 2) return [projeto.contexto]
  const meio = projeto.contexto.length / 2
  let corte = 1
  let soma = 0
  let menorDistancia = Infinity
  frases.forEach((frase, i) => {
    soma += frase.length
    const distancia = Math.abs(soma - meio)
    if (distancia < menorDistancia && i < frases.length - 1) {
      menorDistancia = distancia
      corte = i + 1
    }
  })
  return [frases.slice(0, corte).join('').trim(), frases.slice(corte).join('').trim()]
})()

// quanto da imagem falta percorrer, em % dela mesma: (altura - quadro) / altura.
// o quadro tem a proporção do aparelho, então isso independe do tamanho da tela
function percorrer(tela) {
  const proporcaoImagem = tela.altura / tela.largura
  const proporcaoQuadro = tela.tipo === 'mac' ? 10 / 16 : 852 / 393
  return ((1 - proporcaoQuadro / proporcaoImagem) * 100).toFixed(1) + '%'
}

const dominioDoSite = computed(() => projeto.site.replace(/^https?:\/\//, '').replace(/\/$/, ''))

const raiz = ref(null)

useAnimacoes(raiz, ({ movimento, mesa }, el) => {
  if (!movimento) return

  // o print principal abre de dentro pra fora e a imagem assenta
  const print = el.querySelector('.vitrine__print')
  gsap.fromTo(print, { clipPath: 'inset(8% 8% 8% 8% round 28px)' }, {
    clipPath: 'inset(0% 0% 0% 0% round 28px)', duration: 1.3, delay: 0.2, ease: 'power3.inOut', clearProps: 'clipPath',
  })
  const numeros = el.querySelector('.numeros')
  if (numeros) entrar(numeros.children, numeros, { y: 50, stagger: 0.12, start: 'top 92%' })

  el.querySelectorAll('.bloco__cabecalho').forEach((c) => entrar(c.querySelectorAll('.v2-rotulo, .v2-titulo, .v2-botao'), c, { y: 50, stagger: 0.12 }))
  entrar(el.querySelectorAll('.contexto__coluna'), el.querySelector('.contexto'), { y: 40, stagger: 0.15 })

  const galeria = el.querySelector('.galeria')
  if (galeria) entrar(galeria.children, galeria, { y: 90, duration: 1.1, stagger: 0.2 })

  // decisões: cartões caem tortos e assentam
  el.querySelectorAll('.decisao').forEach((d, i) => {
    gsap.from(d, {
      y: 80, rotation: (i % 2 ? 1 : -1) * 10, autoAlpha: 0, duration: 0.9, delay: (i % 3) * 0.12, ease: 'back.out(1.3)',
      scrollTrigger: { trigger: d, start: 'top 92%', once: true },
    })
  })

  // entregas: cada item entra e o check gira
  const entregas = el.querySelector('.entregas')
  const gatilho = { trigger: entregas, start: 'top 85%', once: true }
  gsap.from(entregas.querySelectorAll('li'), { x: -30, autoAlpha: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out', scrollTrigger: gatilho })
  gsap.from(entregas.querySelectorAll('.entregas__check'), { scale: 0, rotation: -120, duration: 0.6, stagger: 0.08, delay: 0.2, ease: 'back.out(2.5)', scrollTrigger: { ...gatilho } })

  const itens = el.querySelectorAll('.outros__item')
  if (itens.length) {
    ScrollTrigger.batch(itens, {
      once: true, start: 'top 88%',
      onEnter: (lote) => gsap.from(lote, { y: 60, autoAlpha: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' }),
    })
  }

  if (mesa) parallax(print.querySelector('img'), print, { yPercent: -3, scale: 1.08 })
})

const canonica = urlCanonica(`/projetos/${projeto.slug}`)

// o title mira o serviço, não o nome do cliente: é "landing page para psicologia
// clínica" que alguém digita na busca, o nome próprio só quem já conhece
const TITULO = projeto.titulo
// a loja partiu de um tema base de Shopify, então "do zero" não vale para ela
const DESCRICAO =
  projeto.categoria === 'E-commerce'
    ? `${projeto.resumo} Veja as decisões por trás da loja virtual da ${projeto.nome}, feita por ${SITE_NOME}.`
    : `${projeto.resumo} Veja as decisões por trás do site de ${projeto.nome}, feito do zero por ${SITE_NOME}.`

useHead({
  title: TITULO,
  link: [{ rel: 'canonical', href: canonica }],
  meta: [
    { name: 'description', content: DESCRICAO },
    { property: 'og:title', content: `${TITULO} | ${SITE_NOME}` },
    { property: 'og:description', content: DESCRICAO },
    { property: 'og:url', content: canonica },
    { property: 'og:image', content: SITE_URL + projeto.imagem },
    { name: 'twitter:title', content: `${TITULO} | ${SITE_NOME}` },
    { name: 'twitter:description', content: DESCRICAO },
    { name: 'twitter:image', content: SITE_URL + projeto.imagem },
  ],

  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Início', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Projetos', item: `${SITE_URL}/#projetos` },
              { '@type': 'ListItem', position: 3, name: projeto.nome, item: canonica },
            ],
          },
          {
            '@type': 'WebPage',
            '@id': `${canonica}#pagina`,
            url: canonica,
            name: `${TITULO} | ${SITE_NOME}`,
            description: DESCRICAO,
            inLanguage: 'pt-BR',
            isPartOf: { '@id': ID_SITE },
            primaryImageOfPage: { '@type': 'ImageObject', url: SITE_URL + projeto.imagem },
          },
          {
            '@type': 'CreativeWork',
            '@id': `${canonica}#projeto`,
            name: `Site de ${projeto.nome}`,
            headline: TITULO,
            abstract: projeto.resumo,
            url: projeto.site,
            image: SITE_URL + projeto.imagem,
            inLanguage: 'pt-BR',
            genre: projeto.categoria,
            about: projeto.setor,
            creator: { '@id': ID_ORGANIZACAO },
            mainEntityOfPage: { '@id': `${canonica}#pagina` },
          },
        ],
      }),
    },
  ],
})
</script>

<style scoped lang="sass">
.pagina-case
  background: var(--gelo)

.categoria
  display: inline-block
  margin-bottom: 18px
  padding: 7px 14px
  border-radius: 999px
  background: #fff
  font-family: var(--figtree)
  font-weight: 700
  font-size: 13px
  color: var(--abismo)

.aviso-demo
  max-width: 520px
  margin: 0 0 22px
  padding: 14px 18px
  border: 1px solid rgba(26, 216, 233, 0.4)
  border-radius: 14px
  background: rgba(26, 216, 233, 0.1)
  font-family: var(--figtree)
  font-size: 15px
  line-height: 1.5
  color: #fff

// ficha: bilhete branco torto ao lado do título
.ficha
  display: flex
  flex-direction: column
  gap: 16px
  padding: 28px 30px
  border: 3px solid var(--abismo)
  border-radius: 24px
  background: #fff
  box-shadow: 0 24px 50px rgba(2, 7, 21, 0.35)
  font-family: var(--figtree)
  color: var(--abismo)
  transform: rotate(-3deg)

  &__linha
    display: flex
    flex-direction: column
    gap: 3px

  &__rotulo
    font-weight: 700
    font-size: 11px
    letter-spacing: 0.16em
    text-transform: uppercase
    color: var(--petroleo)

  &__valor
    font-weight: 600
    font-size: 16px
    line-height: 1.35

// ===== vitrine =====
.vitrine
  padding: 40px 0 80px
  background-color: var(--gelo)

  &__print
    overflow: hidden
    border-radius: 28px
    background: #fff
    box-shadow: 0 30px 70px rgba(2, 18, 40, 0.14)

    img
      display: block
      width: 100%
      height: auto

.numeros
  display: grid
  grid-template-columns: repeat(3, minmax(0, 1fr))
  gap: 20px
  margin: 24px 0 0
  padding: 0
  list-style: none

.numero
  display: flex
  flex-direction: column
  gap: 8px
  padding: 26px 28px
  border: 1px solid rgba(2, 7, 21, 0.08)
  border-radius: 22px
  background: #fff
  font-family: var(--figtree)

  &__valor
    font-weight: 900
    font-size: clamp(38px, 3.6vw, 52px)
    line-height: 1
    letter-spacing: -0.03em
    color: var(--petroleo)

    i
      font-style: normal
      color: var(--azul-eletrico)

  &__rotulo
    font-size: 15px
    line-height: 1.4
    color: var(--texto-apagado)

// ===== blocos =====
.bloco
  padding: 100px 0 120px

  &--claro
    background-color: var(--gelo)

  &--escuro
    background-color: var(--abismo)
    color: #fff

  &--marinho
    color: #fff
    background-color: var(--marinho)
    background-image: radial-gradient(ellipse 60% 55% at 50% 50%, rgba(7, 177, 232, 0.26), rgba(7, 177, 232, 0) 100%), linear-gradient(to right, rgba(243, 247, 249, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(243, 247, 249, 0.08) 1px, transparent 1px)
    background-size: 100% 100%, 96px 96px, 96px 96px
    background-position: 0 0, -1px -1px, -1px -1px

  &__cabecalho
    margin-bottom: 56px

    .v2-rotulo b
      margin-right: 6px

    .v2-titulo
      font-size: clamp(36px, 4.6vw, 66px)

.contexto
  display: grid
  grid-template-columns: repeat(2, minmax(0, 1fr))
  gap: 48px

  &__coluna
    margin: 0
    font-family: var(--figtree)
    font-size: 18px
    line-height: 1.65
    color: var(--abismo)

    & + &
      color: var(--texto-apagado)

// ===== galeria =====
.galeria
  // altura única para os dois aparelhos; a largura de cada um sai dela
  --altura-quadro: 520px
  display: flex
  flex-wrap: wrap
  align-items: flex-end
  gap: 40px

.tela
  margin: 0
  font-family: var(--figtree)

  figcaption
    margin-top: 16px
    font-weight: 700
    font-size: 12px
    letter-spacing: 0.16em
    text-transform: uppercase
    color: var(--texto-apagado-escuro)

  &__janela
    position: relative
    height: var(--altura-quadro)
    overflow: hidden

    img
      display: block
      width: 100%
      height: auto

.aparelho
  position: relative
  overflow: hidden
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.5)

.tela--mac
  .aparelho
    border: 1px solid rgba(255, 255, 255, 0.14)
    border-radius: 16px
    background: #1b1d24

  .tela__janela
    aspect-ratio: 16 / 10

  .aparelho__barra
    display: flex
    align-items: center
    gap: 6px
    padding: 10px 14px
    font-size: 11px
    color: rgba(255, 255, 255, 0.55)

    i
      width: 9px
      height: 9px
      border-radius: 50%
      background: var(--petroleo)

      &:nth-child(2)
        background: var(--azul-eletrico)

      &:nth-child(3)
        background: var(--ciano)

    span
      margin-left: 12px
      padding: 4px 12px
      border-radius: 999px
      background: rgba(255, 255, 255, 0.08)

.tela--iphone
  .aparelho
    padding: 10px
    border: 1px solid rgba(255, 255, 255, 0.16)
    border-radius: 44px
    background: linear-gradient(160deg, #2b2f38 0%, #14161b 60%, #1d2027 100%)

  .tela__janela
    aspect-ratio: 393 / 852
    border-radius: 34px

  .aparelho__ilha
    position: absolute
    top: 20px
    left: 50%
    z-index: 2
    width: 70px
    height: 19px
    transform: translateX(-50%)
    border-radius: 100px
    background: #0b0c0f

// A tela rola sozinha só no computador. No iPhone uma imagem de 14 mil px
// animada vira uma camada enorme na GPU (a home já derrubou o Safari por
// memória); lá a janela fica rolável com o dedo.
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)
  .tela__janela img
    animation: percorrer 26s ease-in-out infinite

  .tela--iphone .tela__janela img
    animation-duration: 34s

  .tela__janela:hover img
    animation-play-state: paused

@media (hover: none)
  .tela__janela
    overflow-y: auto
    -webkit-overflow-scrolling: touch

// pausa no topo e no fim para dar tempo de ler
@keyframes percorrer
  0%, 7%
    transform: translateY(0)
  50%, 57%
    transform: translateY(calc(-1 * var(--percorrer)))
  100%
    transform: translateY(0)

.galeria__link
  display: inline-flex
  align-items: center
  gap: 8px
  margin-top: 36px
  font-family: var(--figtree)
  font-weight: 600
  font-size: 15px
  color: var(--ciano)
  text-decoration: none

  svg
    width: 15px
    height: 15px
    transform: rotate(-45deg)

  &:hover
    text-decoration: underline

// ===== decisões =====
.decisoes
  display: grid
  grid-template-columns: repeat(3, minmax(0, 1fr))
  gap: 32px 28px
  margin: 0
  padding: 0
  list-style: none

.decisao
  display: flex
  flex-direction: column
  gap: 12px
  padding: 26px 26px 28px
  border: 3px solid var(--abismo)
  border-radius: 22px
  background: #fff
  box-shadow: 0 18px 34px rgba(2, 7, 21, 0.3)
  font-family: var(--figtree)
  color: var(--abismo)

  &:nth-child(3n + 1)
    transform: rotate(-1.5deg)

  &:nth-child(3n + 2)
    transform: rotate(1.5deg)

  &:nth-child(3n)
    transform: rotate(-0.8deg)

  &__numero
    font-weight: 900
    font-size: 30px
    line-height: 1
    color: var(--petroleo)

  &__titulo
    margin: 0
    font-weight: 700
    font-size: 19px
    line-height: 1.25

  &__texto
    margin: 0
    font-size: 15px
    line-height: 1.55
    color: var(--texto-apagado)

// ===== entrega =====
.entregas
  display: grid
  grid-template-columns: repeat(2, minmax(0, 1fr))
  gap: 22px 48px
  margin: 0
  padding: 0
  list-style: none
  font-family: var(--figtree)

  li
    display: flex
    align-items: flex-start
    gap: 14px
    font-size: 17px
    line-height: 1.45
    color: var(--abismo)

  &__check
    display: flex
    align-items: center
    justify-content: center
    width: 30px
    height: 30px
    flex-shrink: 0
    border: 2px solid var(--abismo)
    border-radius: 50%
    background: var(--ciano)
    color: var(--abismo)

    svg
      width: 15px
      height: 15px

.outros
  margin-top: 120px

  &__cabecalho
    display: flex
    flex-wrap: wrap
    align-items: flex-end
    justify-content: space-between
    gap: 24px

  &__grade
    display: grid
    grid-template-columns: repeat(3, minmax(0, 1fr))
    gap: 28px
    margin: 0
    padding: 0
    list-style: none

@media (max-width: 1000px)
  .galeria
    --altura-quadro: 420px

  .decisoes, .outros__grade
    grid-template-columns: repeat(2, minmax(0, 1fr))

  .ficha
    transform: rotate(-1.5deg)

@media (max-width: 760px)
  .bloco
    padding: 72px 0 90px

  .numeros, .contexto, .decisoes, .entregas, .outros__grade
    grid-template-columns: 1fr

  .galeria
    --altura-quadro: 460px
    flex-direction: column
    align-items: center

  // no celular o MacBook não cabe na altura: ele encolhe pela largura
  .tela--mac
    width: 100%

    .tela__janela
      height: auto

  .decisao
    transform: none !important

  .outros
    margin-top: 80px
</style>
