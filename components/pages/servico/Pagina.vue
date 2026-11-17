<template>
  <main id="tela" ref="raiz" class="pagina-servico">
    <V2Topo
      :linha1="servico.titulo"
      :linha2="servico.chamada"
      :texto="servico.resumo"
      tamanho="medio"
      :trilha="[{ rotulo: 'Serviços', para: '/servicos' }, { rotulo: servico.titulo }]"
      adesivo="Escrito do zero"
      figurinha
    >
      <template #acoes>
        <a class="v2-botao v2-botao--ciano" :href="linkWhatsapp" target="_blank" rel="noopener">
          <SvgIcone nome="whatsapp" />
          Chamar no WhatsApp
        </a>
        <a v-if="exemplos.length" class="v2-botao v2-botao--contorno" href="#exemplos" @click="rolar($event, '#exemplos')">
          {{ servico.acaoExemplos }}
        </a>
      </template>
    </V2Topo>

    <DivisorArco :topo="MARINHO" :base="GELO" />

    <!-- 01 o problema -->
    <section class="bloco v2-grade-clara">
      <div class="v2-conteudo">
        <header class="bloco__cabecalho">
          <p class="v2-rotulo"><b>01</b> O problema</p>
          <h2 class="v2-titulo">{{ servico.problema.titulo }} <em>{{ servico.problema.chamada }}</em></h2>
        </header>

        <div class="problema">
          <p class="problema__texto">{{ servico.problema.texto }}</p>
          <div class="problema__duvidas">
            <p class="problema__rotulo">O que passa na cabeça de quem procura</p>
            <ul>
              <li v-for="duvida in servico.problema.duvidas" :key="duvida" class="duvida">{{ duvida }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- 02 o que você recebe -->
    <section class="bloco bloco--colado v2-grade-clara">
      <div class="v2-conteudo">
        <header class="bloco__cabecalho">
          <p class="v2-rotulo"><b>02</b> O que você recebe</p>
          <h2 class="v2-titulo">{{ servico.entregasTitulo.titulo }} <em>{{ servico.entregasTitulo.chamada }}</em></h2>
        </header>

        <ul class="entregas">
          <li v-for="entrega in servico.entregas" :key="entrega.titulo" class="entrega">
            <span class="entrega__check" aria-hidden="true"><SvgIcone nome="check" /></span>
            <h3 class="entrega__titulo">{{ entrega.titulo }}</h3>
            <p class="entrega__texto">{{ entrega.texto }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- 03 já no ar: a prova sai do próprio portfólio -->
    <template v-if="exemplos.length">
      <DivisorArco :topo="GELO" :base="ABISMO" />
      <section id="exemplos" class="bloco bloco--escuro v2-grade-escura">
        <div class="v2-conteudo">
          <header class="bloco__cabecalho">
            <p class="v2-rotulo v2-rotulo--escuro"><b>03</b> Já no ar</p>
            <h2 class="v2-titulo v2-titulo--claro">{{ servico.exemplosTitulo.titulo }} <em>{{ servico.exemplosTitulo.chamada }}</em></h2>
          </header>

          <ul class="exemplos" :class="{ 'exemplos--tres': exemplos.length > 2 }">
            <li v-for="exemplo in exemplos" :key="exemplo.id" class="exemplos__item">
              <V2CardProjeto :projeto="exemplo" :descricao="exemplo.resumo" />
            </li>
          </ul>
        </div>
      </section>
      <DivisorArco :topo="ABISMO" :base="MARINHO" />
    </template>
    <DivisorArco v-else :topo="GELO" :base="MARINHO" />

    <!-- 04 como funciona: a mesma seção da home, com as etapas daqui -->
    <HomeProcesso :rotulo="exemplos.length ? '04 Como funciona' : '03 Como funciona'" :itens="ETAPAS" :mensagem="servico.mensagemWhatsapp" />

    <DivisorArco :topo="MARINHO" :base="GELO" />

    <!-- 05 dúvidas: o FAQPage já vai no grafo desta página, então o da seção sai -->
    <HomeFaq :rotulo="exemplos.length ? '05 Dúvidas' : '04 Dúvidas'" :itens="servico.perguntas" :estruturado="false" />

    <DivisorArco :topo="GELO" :base="MARINHO" />
    <HomeChamada
      ancora="orcamento"
      :linha1="servico.fecho.titulo"
      :linha2="servico.fecho.chamada"
      :texto="servico.fecho.texto"
      :mensagem="servico.mensagemWhatsapp"
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
import HomeProcesso from '~/components/pages/home/HomeProcesso.vue'
import HomeFaq from '~/components/pages/home/HomeFaq.vue'
import HomeChamada from '~/components/pages/home/HomeChamada.vue'
import HomeRodape from '~/components/pages/home/HomeRodape.vue'
import { PROJETOS } from '~/helpers/projetos'
import { ETAPAS, servicoPorSlug } from '~/helpers/servicos'
import { SITE_URL, SITE_NOME, ID_ORGANIZACAO, ID_SITE, urlCanonica, linkWhatsapp as montarWhatsapp } from '~/helpers/site'
import { useScrollTo } from '~/composables/useScrollTo'
import { useAnimacoes, entrar } from '~/composables/useAnimacoes'

// A estrutura da página de serviço mora aqui e o conteúdo mora no
// helpers/servicos.js: são doze páginas com o mesmo esqueleto.
const props = defineProps({
  slug: { type: String, required: true },
})

const servico = servicoPorSlug(props.slug)

if (!servico) {
  throw createError({
    statusCode: 404,
    statusMessage: `Serviço não encontrado: ${props.slug}`,
    fatal: true,
  })
}

const MARINHO = '#021228'
const ABISMO = '#020715'
const GELO = '#F3F7F9'

const linkWhatsapp = montarWhatsapp(servico.mensagemWhatsapp)

// a prova sai do próprio portfólio: se entrar outro projeto do nicho, ele
// aparece aqui sozinho, sem precisar editar esta página
const exemplos = computed(() => PROJETOS.filter((p) => p.slug && servico.filtro(p)).slice(0, 6))

const { scrollTo } = useScrollTo()
function rolar(evento, alvo) {
  evento.preventDefault()
  scrollTo(alvo)
}

const raiz = ref(null)

useAnimacoes(raiz, ({ movimento }, el) => {
  if (!movimento) return

  // só os blocos desta página; Processo, FAQ e Chamada animam a si mesmos
  el.querySelectorAll(':scope > .bloco .bloco__cabecalho').forEach((c) => entrar(c.children, c, { y: 50, stagger: 0.12 }))

  const problema = el.querySelector('.problema')
  entrar(problema.querySelector('.problema__texto'), problema, { y: 40 })
  // as dúvidas aparecem como balões de pensamento, uma de cada vez
  gsap.from(problema.querySelectorAll('.duvida'), {
    scale: 0.6, y: 20, autoAlpha: 0, duration: 0.6, stagger: 0.12, ease: 'back.out(2)',
    scrollTrigger: { trigger: problema, start: 'top 78%', once: true },
  })

  const entregas = el.querySelector('.entregas')
  entrar(entregas.children, entregas, { y: 60, stagger: 0.08 })
  gsap.from(entregas.querySelectorAll('.entrega__check'), {
    scale: 0, rotation: -120, duration: 0.6, stagger: 0.08, delay: 0.3, ease: 'back.out(2.5)',
    scrollTrigger: { trigger: entregas, start: 'top 82%', once: true },
  })

  const itens = el.querySelectorAll('.exemplos__item')
  if (itens.length) {
    ScrollTrigger.batch(itens, {
      once: true, start: 'top 88%',
      onEnter: (lote) => gsap.from(lote, { y: 60, autoAlpha: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' }),
    })
  }
})

const canonica = urlCanonica(`/${servico.slug}`)
const TITULO = servico.tituloSeo
const DESCRICAO = servico.descricaoSeo

useHead({
  title: TITULO,
  link: [{ rel: 'canonical', href: canonica }],


  meta: [
    { name: 'description', content: DESCRICAO },
    { property: 'og:title', content: `${TITULO} | ${SITE_NOME}` },
    { property: 'og:description', content: DESCRICAO },
    { property: 'og:url', content: canonica },
    { name: 'twitter:title', content: `${TITULO} | ${SITE_NOME}` },
    { name: 'twitter:description', content: DESCRICAO },
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
              { '@type': 'ListItem', position: 2, name: servico.titulo, item: canonica },
            ],
          },
          {
            '@type': 'Service',
            '@id': `${canonica}#servico`,
            name: servico.servicoSeo,
            description: DESCRICAO,
            serviceType: servico.servicoSeo,
            provider: { '@id': ID_ORGANIZACAO },
            areaServed: { '@type': 'Country', name: 'Brasil' },
            audience: { '@type': 'Audience', audienceType: servico.publicoSeo },
            url: canonica,
          },
          {
            '@type': 'WebPage',
            '@id': `${canonica}#pagina`,
            url: canonica,
            name: `${TITULO} | ${SITE_NOME}`,
            description: DESCRICAO,
            inLanguage: 'pt-BR',
            isPartOf: { '@id': ID_SITE },
            about: { '@id': `${canonica}#servico` },
          },
          {
            '@type': 'FAQPage',
            '@id': `${canonica}#duvidas`,
            mainEntity: servico.perguntas.map((p) => ({
              '@type': 'Question',
              name: p.pergunta,
              acceptedAnswer: { '@type': 'Answer', text: p.resposta },
            })),
          },
        ],
      }),
    },
  ],
})
</script>

<style scoped lang="sass">
.pagina-servico
  background: var(--gelo)

.bloco
  padding: 100px 0 110px
  background-color: var(--gelo)

  &--colado
    padding-top: 0

  &--escuro
    background-color: var(--abismo)
    color: #fff

  &__cabecalho
    margin-bottom: 52px

    .v2-rotulo b
      margin-right: 6px

    .v2-titulo
      font-size: clamp(34px, 4.4vw, 62px)

// ===== problema =====
.problema
  display: grid
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr)
  gap: 64px
  align-items: start

  &__texto
    margin: 0
    font-family: var(--figtree)
    font-size: 18px
    line-height: 1.65
    color: var(--abismo)

  &__rotulo
    margin: 0 0 18px
    font-family: var(--figtree)
    font-weight: 700
    font-size: 12px
    letter-spacing: 0.16em
    text-transform: uppercase
    color: var(--texto-apagado)

  ul
    display: flex
    flex-direction: column
    align-items: flex-start
    gap: 14px
    margin: 0
    padding: 0
    list-style: none

// cada dúvida é um balão torto, alternando o lado
.duvida
  padding: 10px 18px
  border: 2px solid var(--abismo)
  border-radius: 999px
  background: #fff
  box-shadow: 0 8px 18px rgba(2, 7, 21, 0.08)
  font-family: var(--figtree)
  font-weight: 600
  font-size: 15px
  color: var(--abismo)

  &:nth-child(odd)
    transform: rotate(-1.5deg)

  &:nth-child(even)
    margin-left: 48px
    transform: rotate(1.5deg)

// ===== entregas =====
.entregas
  display: grid
  grid-template-columns: repeat(3, minmax(0, 1fr))
  gap: 22px
  margin: 0
  padding: 0
  list-style: none

.entrega
  display: flex
  flex-direction: column
  gap: 12px
  padding: 26px
  border: 1px solid rgba(2, 7, 21, 0.1)
  border-radius: 22px
  background: #fff
  font-family: var(--figtree)
  transition: border-color 0.3s ease, box-shadow 0.3s ease

  &:hover
    border-color: var(--abismo)
    box-shadow: 0 16px 32px rgba(2, 7, 21, 0.1)

  &__check
    display: flex
    align-items: center
    justify-content: center
    width: 34px
    height: 34px
    border: 2px solid var(--abismo)
    border-radius: 50%
    background: var(--ciano)
    color: var(--abismo)

    svg
      width: 16px
      height: 16px

  &__titulo
    margin: 0
    font-weight: 700
    font-size: 18px
    line-height: 1.3
    color: var(--abismo)

  &__texto
    margin: 0
    font-size: 15px
    line-height: 1.55
    color: var(--texto-apagado)

// ===== exemplos =====
.exemplos
  display: grid
  grid-template-columns: repeat(2, minmax(0, 1fr))
  gap: 48px 32px
  margin: 0
  padding: 0
  list-style: none

  &--tres
    grid-template-columns: repeat(3, minmax(0, 1fr))

@media (max-width: 1000px)
  .problema
    grid-template-columns: 1fr
    gap: 40px

  .entregas, .exemplos--tres
    grid-template-columns: repeat(2, minmax(0, 1fr))

@media (max-width: 760px)
  .bloco
    padding: 72px 0 80px

  .bloco--colado
    padding-top: 0

  .entregas, .exemplos, .exemplos--tres
    grid-template-columns: 1fr

  .duvida:nth-child(even)
    margin-left: 20px
</style>
