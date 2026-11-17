<template>
  <main id="tela" ref="raiz" class="pagina-servicos">
    <V2Topo
      rotulo="Serviços"
      linha1="O que eu faço"
      linha2="e como funciona."
      texto="Site e sistema escritos do zero, sem template e sem construtor. Loja virtual em Shopify, com o tema trabalhado no código."
      adesivo="Sem template"
      figurinha
    />

    <DivisorArco :topo="MARINHO" :base="GELO" />

    <!-- por tipo de projeto -->
    <section class="bloco v2-grade-clara" aria-labelledby="tipos-titulo">
      <div class="v2-conteudo">
        <header class="bloco__cabecalho">
          <p class="v2-rotulo">Por tipo de projeto</p>
          <h2 id="tipos-titulo" class="v2-titulo">Escolha pelo que <em>você precisa.</em></h2>
        </header>

        <ol class="tipos">
          <li v-for="(servico, i) in porTipo" :key="servico.slug" class="tipo">
            <NuxtLink class="tipo__area" :to="`/${servico.slug}`">
              <span class="tipo__numero">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="tipo__icone" aria-hidden="true"><SvgIcone :nome="servico.icone" /></span>
              <span class="tipo__texto">
                <span class="tipo__nome">{{ servico.nomeCurto }}</span>
                <span class="tipo__chamada">{{ servico.chamada }}</span>
              </span>
              <span class="tipo__botao" aria-hidden="true">
                Ver como funciona
                <span class="tipo__bolinha"><SvgIcone nome="seta-direita" /></span>
              </span>
            </NuxtLink>
          </li>
        </ol>
      </div>
    </section>

    <!-- por segmento -->
    <section class="bloco bloco--segmentos v2-grade-clara" aria-labelledby="segmentos-titulo">
      <div class="v2-conteudo">
        <header class="bloco__cabecalho bloco__cabecalho--lado">
          <div>
            <p class="v2-rotulo">Por segmento</p>
            <h2 id="segmentos-titulo" class="v2-titulo">Tem página feita <em>para o seu ramo.</em></h2>
          </div>
          <p class="bloco__nota">
            Se o seu ramo está aqui, comece por essa página: ela fala do seu caso, com exemplos do
            mesmo segmento já no ar.
          </p>
        </header>

        <ul class="segmentos">
          <li v-for="(servico, i) in porNicho" :key="servico.slug" class="segmento" :class="`segmento--${TONS[i % TONS.length]}`">
            <NuxtLink class="segmento__area" :to="`/${servico.slug}`">
              <span class="segmento__rotulo">{{ dividir(servico.titulo).prefixo }}</span>
              <span class="segmento__nome">{{ dividir(servico.titulo).nome }}</span>
              <span class="segmento__chamada">{{ servico.chamada }}</span>
              <span class="segmento__link">Ver a página <SvgIcone nome="seta-direita" /></span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>

    <DivisorArco :topo="GELO" :base="MARINHO" />
    <HomeChamada
      ancora="orcamento"
      linha1="Não achou o que"
      linha2="você precisa?"
      texto="Manda uma mensagem contando o problema. Se não for comigo, eu digo, e às vezes a resposta é que você ainda não precisa disso."
      mensagem="Olá! Vim pelo site e gostaria de um orçamento."
    />
    <DivisorArco :topo="MARINHO" :base="ABISMO" />
    <HomeRodape />
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { gsap } from 'gsap'
import V2Topo from '~/components/pages/v2/V2Topo.vue'
import DivisorArco from '~/components/global/elementos/DivisorArco.vue'
import HomeChamada from '~/components/pages/home/HomeChamada.vue'
import HomeRodape from '~/components/pages/home/HomeRodape.vue'
import { SERVICOS_POR_TIPO, SERVICOS_POR_NICHO } from '~/helpers/servicos'
import { SITE_URL, SITE_NOME, ID_ORGANIZACAO, ID_SITE, urlCanonica } from '~/helpers/site'
import { useAnimacoes, entrar } from '~/composables/useAnimacoes'

definePageMeta({ layout: false })

const MARINHO = '#021228'
const ABISMO = '#020715'
const GELO = '#F3F7F9'

const porTipo = [...SERVICOS_POR_TIPO].sort((a, b) => a.ordem - b.ordem)
const porNicho = SERVICOS_POR_NICHO

// cartões de segmento alternam as cores da paleta, como os bilhetes do Figma
const TONS = ['branco', 'ciano', 'petroleo', 'abismo', 'branco', 'petroleo']

// "Site para psicólogo" vira rótulo "Site para" + nome "Psicólogo"
function dividir(titulo) {
  const casamento = titulo.match(/^(.*? para) (.+)$/)
  if (!casamento) return { prefixo: '', nome: titulo }
  const nome = casamento[2]
  return { prefixo: casamento[1], nome: nome.charAt(0).toUpperCase() + nome.slice(1) }
}

const raiz = ref(null)

useAnimacoes(raiz, ({ movimento }, el) => {
  if (!movimento) return

  el.querySelectorAll('.bloco__cabecalho').forEach((c) => entrar(c.querySelectorAll('.v2-rotulo, .v2-titulo, .bloco__nota'), c, { y: 50, stagger: 0.12 }))

  // linhas dos tipos entram da esquerda, uma atrás da outra
  entrar(el.querySelectorAll('.tipo'), el.querySelector('.tipos'), { x: -60, y: 0, duration: 0.7, stagger: 0.08 })

  // bilhetes de segmento caem girando
  el.querySelectorAll('.segmento').forEach((s, i) => {
    gsap.from(s, {
      y: -90, rotation: (i % 2 ? 1 : -1) * 14, autoAlpha: 0, duration: 0.9, delay: (i % 3) * 0.12, ease: 'back.out(1.4)',
      scrollTrigger: { trigger: s, start: 'top 92%', once: true },
    })
  })
})

const canonica = urlCanonica('/servicos')
const TITULO = 'Serviços'
const DESCRICAO =
  'Landing page, site institucional, sistema sob medida, loja virtual, integrações e design de interface. Cada serviço explicado, com os projetos que provam cada um.'

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
              { '@type': 'ListItem', position: 2, name: TITULO, item: canonica },
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
          },
          // a lista aponta para as páginas de serviço; o detalhe de cada uma mora
          // no Service declarado na própria página, sem repetir aqui
          {
            '@type': 'ItemList',
            '@id': `${canonica}#lista`,
            name: 'Serviços de desenvolvimento web',
            numberOfItems: porTipo.length,
            itemListElement: porTipo.map((servico, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: servico.servicoSeo,
              url: `${SITE_URL}/${servico.slug}`,
            })),
          },
          {
            '@type': 'ProfessionalService',
            '@id': `${canonica}#oferta`,
            name: SITE_NOME,
            provider: { '@id': ID_ORGANIZACAO },
            areaServed: { '@type': 'Country', name: 'Brasil' },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Serviços de desenvolvimento web',
              itemListElement: porTipo.map((servico) => ({
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  '@id': `${SITE_URL}/${servico.slug}#servico`,
                  name: servico.servicoSeo,
                  url: `${SITE_URL}/${servico.slug}`,
                },
              })),
            },
          },
        ],
      }),
    },
  ],
})
</script>

<style scoped lang="sass">
.pagina-servicos
  background: var(--gelo)

.bloco
  padding: 100px 0 110px
  background-color: var(--gelo)

  &--segmentos
    padding-top: 40px
    padding-bottom: 140px

  &__cabecalho
    margin-bottom: 56px

    .v2-titulo
      font-size: clamp(36px, 4.6vw, 66px)

    &--lado
      display: flex
      flex-wrap: wrap
      align-items: flex-end
      justify-content: space-between
      gap: 24px

  &__nota
    max-width: 420px
    margin: 0
    font-family: var(--figtree)
    font-size: 17px
    line-height: 1.55
    color: var(--texto-apagado)

// ===== tipos =====
.tipos
  margin: 0
  padding: 0
  list-style: none

.tipo
  border-bottom: 1px solid rgba(2, 7, 21, 0.1)

  &__area
    display: grid
    grid-template-columns: 40px 52px minmax(0, 1fr) auto
    align-items: center
    gap: 20px
    padding: 22px 20px
    border-radius: 22px
    font-family: var(--figtree)
    color: var(--abismo)
    text-decoration: none
    transition: background 0.35s ease, color 0.35s ease

    &:focus-visible
      outline: 2px solid var(--petroleo)
      outline-offset: 2px

  // o destaque do Figma (primeira linha azul) vira o estado de hover e foco
  &__area:hover, &__area:focus-visible
    background: var(--petroleo)
    color: #fff

  &__numero
    font-weight: 800
    font-size: 15px
    color: var(--petroleo)
    transition: color 0.35s ease

  &__area:hover &__numero
    color: var(--ciano)

  &__icone
    display: flex
    align-items: center
    justify-content: center
    width: 52px
    height: 52px
    border-radius: 14px
    background: rgba(10, 78, 112, 0.1)
    color: var(--petroleo)
    transition: background 0.35s ease, color 0.35s ease

    svg
      width: 24px
      height: 24px

  &__area:hover &__icone
    background: rgba(255, 255, 255, 0.14)
    color: #fff

  &__texto
    display: flex
    flex-direction: column
    gap: 4px

  &__nome
    font-weight: 700
    font-size: clamp(22px, 2vw, 28px)
    letter-spacing: -0.01em

  &__chamada
    font-size: 16px
    color: var(--texto-apagado)
    transition: color 0.35s ease

  &__area:hover &__chamada
    color: rgba(255, 255, 255, 0.8)

  &__botao
    display: inline-flex
    align-items: center
    gap: 12px
    padding: 6px 6px 6px 20px
    border: 1px solid rgba(2, 7, 21, 0.14)
    border-radius: 999px
    background: #fff
    font-weight: 600
    font-size: 14px
    color: var(--abismo)
    white-space: nowrap

  &__bolinha
    display: flex
    align-items: center
    justify-content: center
    width: 34px
    height: 34px
    border-radius: 50%
    background: var(--abismo)
    color: #fff
    transition: background 0.35s ease, color 0.35s ease

    svg
      width: 15px
      height: 15px
      transform: rotate(-45deg)

  &__area:hover &__bolinha
    background: var(--ciano)
    color: var(--abismo)

// ===== segmentos =====
.segmentos
  display: grid
  grid-template-columns: repeat(3, minmax(0, 1fr))
  gap: 36px 32px
  margin: 0
  padding: 0
  list-style: none

.segmento
  &:nth-child(3n + 1)
    --giro: 2deg

  &:nth-child(3n + 2)
    --giro: -2deg

  &:nth-child(3n)
    --giro: 1.5deg

  &__area
    display: flex
    flex-direction: column
    gap: 6px
    height: 100%
    padding: 26px 28px 24px
    border: 3px solid var(--abismo)
    border-radius: 22px
    box-shadow: 0 18px 34px rgba(2, 7, 21, 0.14)
    font-family: var(--figtree)
    text-decoration: none
    transform: rotate(var(--giro))
    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease

    &:hover
      transform: rotate(0deg) translateY(-6px)
      box-shadow: 0 26px 44px rgba(2, 7, 21, 0.22)

    &:focus-visible
      outline: 2px solid var(--petroleo)
      outline-offset: 4px

  &--branco &__area
    background: #fff
    color: var(--abismo)

  &--ciano &__area
    background: var(--ciano)
    color: var(--abismo)

  &--petroleo &__area
    background: var(--petroleo)
    color: #fff

  &--abismo &__area
    background: var(--abismo)
    color: #fff

  &__rotulo
    font-weight: 700
    font-size: 11px
    letter-spacing: 0.16em
    text-transform: uppercase
    opacity: 0.7

  &__nome
    font-weight: 900
    font-size: clamp(24px, 2.2vw, 32px)
    line-height: 1.05
    letter-spacing: -0.02em

  &__chamada
    margin-top: 6px
    font-size: 15px
    line-height: 1.45
    opacity: 0.8

  &__link
    display: inline-flex
    align-items: center
    gap: 8px
    margin-top: auto
    padding-top: 14px
    font-weight: 700
    font-size: 14px

    svg
      width: 14px
      height: 14px
      transition: transform 0.3s ease

  &__area:hover &__link svg
    transform: translateX(4px)

@media (max-width: 1000px)
  .segmentos
    grid-template-columns: repeat(2, minmax(0, 1fr))

@media (max-width: 760px)
  .bloco
    padding: 72px 0 80px

  .tipo__area
    grid-template-columns: 44px minmax(0, 1fr)
    gap: 14px
    padding: 18px 12px

  .tipo__numero, .tipo__botao
    display: none

  .segmentos
    grid-template-columns: 1fr

  .segmento__area
    transform: rotate(calc(var(--giro) / 2))
</style>
