<template>
  <main class="portfolio">
    <div class="luz" aria-hidden="true">
      <span class="luz__nucleo"></span>
      <span class="luz__feixe"></span>
    </div>

    <NavTopo />

    <section class="abertura">
      <div class="selo">
        <span class="selo__ponto"></span>
        {{ porTipo.length }} frentes de trabalho
      </div>

      <h1 class="abertura__titulo">
        O que eu faço<br />
        <span class="abertura__titulo--leve">e como cada coisa funciona.</span>
      </h1>

      <p class="abertura__texto">
        Site e sistema escritos do zero, sem template e sem construtor; loja virtual em
        Shopify, com o tema trabalhado no código. Cada serviço tem uma página explicando o
        que muda na prática e o que você recebe.
      </p>
    </section>

    <!-- por tipo de projeto. quem chega sabendo o que quer entra por aqui -->
    <section class="grupo">
      <div class="grupo__cabecalho">
        <span class="grupo__rotulo"><b>01</b> Por tipo de projeto</span>
        <span class="grupo__contagem">{{ porTipo.length }} serviços</span>
      </div>

      <ul class="grade">
        <li v-for="(servico, i) in porTipo" :key="servico.slug" class="carta revelar" v-revelar="i * 70">
          <NuxtLink class="carta__area" :to="`/${servico.slug}`">
            <span class="carta__chip">
              <SvgIcone :nome="servico.icone" />
            </span>

            <span class="carta__numero">{{ String(i + 1).padStart(2, '0') }}</span>

            <h2 class="carta__nome">{{ servico.nomeCurto }}</h2>
            <p class="carta__resumo">{{ servico.resumoCurto }}</p>

            <div class="carta__rodape">
              <span class="carta__acao">
                Ver como funciona
                <SvgIcone nome="seta-direita" />
              </span>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </section>

    <!-- por segmento. quem chega sabendo o próprio ramo, mas não o nome técnico -->
    <section class="grupo">
      <div class="grupo__cabecalho">
        <span class="grupo__rotulo"><b>02</b> Por segmento</span>
        <span class="grupo__contagem">{{ porNicho.length }} páginas</span>
      </div>

      <p class="grupo__nota">
        Se o seu ramo está aqui, comece por essa página: ela fala do seu caso, com exemplos
        do mesmo segmento já no ar.
      </p>

      <ul class="segmentos">
        <li
          v-for="(servico, i) in porNicho"
          :key="servico.slug"
          class="segmento revelar"
          v-revelar="i * 60"
        >
          <NuxtLink class="segmento__area" :to="`/${servico.slug}`">
            <span class="segmento__nome">{{ servico.titulo }}</span>
            <SvgIcone nome="seta-direita" />
          </NuxtLink>
        </li>
      </ul>
    </section>

    <section class="fecho">
      <h2 class="fecho__titulo">
        Não achou<br />
        <span class="fecho__titulo--leve">o que você precisa?</span>
      </h2>
      <p class="fecho__texto">
        Manda uma mensagem contando o problema. Se não for comigo, eu digo, e às vezes a
        resposta é que você ainda não precisa disso.
      </p>
      <div class="fecho__acoes">
        <a class="acao acao--primaria" :href="linkWhatsapp" target="_blank" rel="noopener">
          Chamar no WhatsApp
          <SvgIcone nome="whatsapp" />
        </a>
        <NuxtLink to="/projetos" class="acao acao--secundaria">Ver os projetos</NuxtLink>
      </div>
    </section>

    <footer class="rodape">
      <NuxtLink to="/" class="rodape__marca">
        <Svgs nome="logo" />
        Gustavo Bernardi
      </NuxtLink>
      <span class="rodape__copy">© {{ ano }} Todos os direitos reservados.</span>
    </footer>
  </main>
</template>

<script setup>
import Svgs from '~/components/global/svgs/Svgs.vue'
import { SERVICOS_POR_TIPO, SERVICOS_POR_NICHO } from '~/helpers/servicos'
import { SITE_URL, SITE_NOME, TELEFONE, ID_ORGANIZACAO, ID_SITE, urlCanonica } from '~/helpers/site'

definePageMeta({ layout: false })

const ano = new Date().getFullYear()

const porTipo = [...SERVICOS_POR_TIPO].sort((a, b) => a.ordem - b.ordem)
const porNicho = SERVICOS_POR_NICHO

const linkWhatsapp =
  `https://wa.me/${TELEFONE.replace('+', '')}?text=` +
  encodeURIComponent('Olá! Vim pelo site e gostaria de um orçamento.')

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
.portfolio
  position: relative
  width: 100%
  min-height: 100svh
  overflow: hidden
  color: var(--cor-branco)
  background: linear-gradient(180deg, #05142a 0%, #020a18 14%, #01060f 40%, #020814 68%, #04101f 100%)

.luz
  position: absolute
  inset: 0
  z-index: 0
  pointer-events: none

.luz__nucleo
  position: absolute
  top: -180px
  left: 50%
  width: min(1100px, 130vw)
  height: 520px
  transform: translateX(-50%)
  background: radial-gradient(ellipse at center, rgba(60, 110, 220, 0.26) 0%, rgba(40, 90, 190, 0.1) 46%, transparent 72%)

.luz__feixe
  position: absolute
  top: 100px
  left: 50%
  width: min(940px, 96vw)
  height: 2px
  transform: translateX(-50%)
  background: linear-gradient(90deg, transparent 0%, rgba(160, 195, 255, 0.5) 24%, rgba(255, 255, 255, 0.9) 50%, rgba(160, 195, 255, 0.5) 76%, transparent 100%)
  box-shadow: 0 0 28px 4px rgba(130, 175, 255, 0.4)

// abertura centralizada, como as seções da home: é o que diferencia daquele
// bloco alinhado à esquerda com números na ponta
.abertura
  position: relative
  z-index: 1
  width: 100%
  max-width: 900px
  margin: 0 auto
  padding: 190px 60px 0 60px
  text-align: center

  &__titulo
    margin: 30px 0 0 0
    font-family: var(--semibold)
    font-size: clamp(38px, 5.6vw, 74px)
    line-height: 1.05
    letter-spacing: -0.03em

    &--leve
      font-family: var(--light)
      color: #8aa6f0

  &__texto
    max-width: 620px
    margin: 24px auto 0 auto
    font-family: var(--light)
    font-size: clamp(15px, 1.35vw, 18px)
    line-height: 1.68
    color: rgba(255, 255, 255, 0.6)

// mesmo selo do hero da home
.selo
  display: inline-flex
  align-items: center
  gap: 10px
  padding: 9px 20px
  border: 1px solid rgba(255, 255, 255, 0.14)
  border-radius: 100px
  background: rgba(255, 255, 255, 0.04)
  backdrop-filter: blur(10px)
  -webkit-backdrop-filter: blur(10px)
  font-family: var(--light)
  font-size: 14px
  color: rgba(255, 255, 255, 0.78)

  &__ponto
    width: 7px
    height: 7px
    border-radius: 50%
    background: #46e08a
    box-shadow: 0 0 0 4px rgba(70, 224, 138, 0.16)

.grupo
  position: relative
  z-index: 1
  width: 100%
  max-width: 1720px
  margin: 0 auto
  padding: 110px 60px 0 60px

  &__cabecalho
    display: flex
    align-items: center
    justify-content: space-between
    gap: 20px
    margin-bottom: 30px
    padding-bottom: 20px
    border-bottom: 1px solid rgba(255, 255, 255, 0.08)

  &__rotulo
    display: inline-flex
    align-items: center
    gap: 12px
    font-family: var(--semibold)
    font-size: clamp(17px, 1.7vw, 22px)
    color: var(--cor-branco)

    b
      font-family: var(--semibold)
      font-style: italic
      font-size: 13px
      color: rgba(138, 166, 240, 0.8)

  &__contagem
    font-family: var(--light)
    font-size: 13px
    letter-spacing: 1.2px
    text-transform: uppercase
    color: rgba(255, 255, 255, 0.38)

.fecho
  position: relative
  z-index: 1
  width: 100%
  max-width: 1720px
  margin: 0 auto
  padding: 140px 60px 0 60px
  text-align: center

  &::before
    content: ''
    position: absolute
    top: 16%
    left: 50%
    z-index: -1
    width: min(1100px, 92vw)
    height: 520px
    transform: translateX(-50%)
    pointer-events: none
    background: radial-gradient(ellipse at center, rgba(48, 92, 215, 0.17) 0%, rgba(28, 56, 140, 0.06) 46%, transparent 72%)

  &__titulo
    margin: 0
    font-family: var(--semibold)
    font-size: clamp(28px, 3.8vw, 50px)
    line-height: 1.1
    letter-spacing: -0.02em

    &--leve
      font-family: var(--light)
      color: #8aa6f0

  &__texto
    max-width: 520px
    margin: 20px auto 0 auto
    font-family: var(--light)
    font-size: 16px
    line-height: 1.65
    color: rgba(255, 255, 255, 0.55)

  &__acoes
    display: flex
    flex-wrap: wrap
    align-items: center
    justify-content: center
    gap: 14px
    margin: 34px 0 0 0

.acao
  display: inline-flex
  align-items: center
  justify-content: center
  gap: 12px
  padding: 17px 34px
  border: 1px solid transparent
  border-radius: 12px
  font-family: var(--semibold)
  font-size: 15px
  line-height: 1
  text-decoration: none
  cursor: pointer
  transition: background 0.4s ease, border-color 0.4s ease

  :deep(svg)
    width: 15px
    height: 15px

  &--primaria
    background: var(--cor-branco)
    color: #050505

    &:hover
      background: rgba(255, 255, 255, 0.86)

  &--secundaria
    border-color: rgba(125, 155, 255, 0.2)
    background: rgba(30, 46, 115, 0.38)
    color: rgba(255, 255, 255, 0.88)

    &:hover
      background: rgba(125, 155, 255, 0.16)
      border-color: rgba(140, 165, 255, 0.3)

.rodape
  position: relative
  z-index: 1
  display: flex
  flex-wrap: wrap
  align-items: center
  justify-content: space-between
  gap: 18px
  width: 100%
  max-width: 1720px
  margin: 130px auto 0 auto
  padding: 34px 60px 44px 60px

  &::before
    content: ''
    position: absolute
    top: 0
    left: 60px
    right: 60px
    height: 1px
    background: rgba(255, 255, 255, 0.07)

  &__marca
    display: inline-flex
    align-items: center
    gap: 12px
    font-family: var(--semibold)
    font-size: 14px
    color: rgba(255, 255, 255, 0.8)
    text-decoration: none
    transition: color 0.4s ease

    :deep(svg)
      width: 26px
      height: 28px

    &:hover
      color: var(--cor-branco)

  &__copy
    font-family: var(--light)
    font-size: 13px
    color: rgba(255, 255, 255, 0.32)

@media (max-width: 1250px)
  .abertura,
  .grupo,
  .fecho,
  .rodape
    padding-left: 32px
    padding-right: 32px

  .rodape::before
    left: 32px
    right: 32px

@media (max-width: 1000px)
  .grade
    grid-template-columns: 1fr

  .abertura
    padding-top: 150px

  .grupo
    padding-top: 84px

  .fecho
    padding-top: 104px

  .rodape
    margin-top: 96px

@media (max-width: 820px)
  .abertura,
  .grupo,
  .fecho,
  .rodape
    padding-left: 20px
    padding-right: 20px

  .rodape::before
    left: 20px
    right: 20px

// a /projetos não tem nota abaixo do cabeçalho, então esta classe nasceu sem
// estilo e o parágrafo caiu na fonte padrão do navegador
.grupo__nota
  width: 100%
  max-width: 1000px
  margin: 18px auto 0 auto
  padding: 0 60px
  font-family: var(--light)
  font-size: 15px
  line-height: 1.7
  color: rgba(255, 255, 255, 0.55)

// ---- grade de serviços, própria desta página ----
.grade
  display: grid
  grid-template-columns: repeat(3, 1fr)
  gap: 22px
  width: 100%
  max-width: 1720px
  margin: 34px auto 0 auto
  padding: 0 60px
  list-style: none

.carta
  &__area
    display: flex
    flex-direction: column
    height: 100%
    padding: 30px 28px 26px 28px
    border: 1px solid rgba(255, 255, 255, 0.07)
    border-radius: 20px
    background: rgba(255, 255, 255, 0.025)
    text-decoration: none
    color: inherit
    transition: border-color 0.4s ease, background 0.4s ease, transform 0.4s ease

    &:hover
      border-color: rgba(125, 155, 255, 0.28)
      background: rgba(125, 155, 255, 0.06)
      transform: translateY(-3px)

      .carta__acao :deep(svg)
        transform: translateX(4px)

  &__chip
    display: flex
    align-items: center
    justify-content: center
    width: 46px
    height: 46px
    border: 1px solid rgba(125, 155, 255, 0.22)
    border-radius: 14px
    background: rgba(30, 46, 115, 0.4)

    :deep(svg)
      width: 20px
      height: 20px

  &__numero
    margin: 22px 0 0 0
    font-family: var(--semibold)
    font-style: italic
    font-size: 13px
    color: rgba(138, 166, 240, 0.75)

  &__nome
    margin: 10px 0 0 0
    font-family: var(--semibold)
    font-size: 20px
    letter-spacing: -0.01em

  &__resumo
    margin: 10px 0 0 0
    font-family: var(--light)
    font-size: 15px
    line-height: 1.62
    color: rgba(255, 255, 255, 0.58)

  // empurrado para a base para os cartões fecharem alinhados, mesmo com
  // resumos de alturas diferentes
  &__rodape
    display: flex
    align-items: center
    margin: auto 0 0 0
    padding: 22px 0 0 0

  &__acao
    display: inline-flex
    align-items: center
    gap: 9px
    font-family: var(--semibold)
    font-size: 14px
    color: rgba(160, 185, 255, 0.9)

    :deep(svg)
      width: 14px
      height: 14px
      transition: transform 0.4s ease

// ---- lista por segmento ----
.segmentos
  display: grid
  gap: 10px
  width: 100%
  max-width: 1000px
  margin: 26px auto 0 auto
  padding: 0 60px
  list-style: none

.segmento
  &__area
    display: flex
    align-items: center
    gap: 18px
    padding: 20px 24px
    border: 1px solid rgba(255, 255, 255, 0.07)
    border-radius: 14px
    background: rgba(255, 255, 255, 0.02)
    text-decoration: none
    color: inherit
    transition: border-color 0.4s ease, background 0.4s ease

    &:hover
      border-color: rgba(125, 155, 255, 0.26)
      background: rgba(125, 155, 255, 0.06)

    :deep(svg)
      flex-shrink: 0
      width: 15px
      height: 15px
      color: rgba(255, 255, 255, 0.5)

  &__nome
    flex: 1
    font-family: var(--semibold)
    font-size: 16px


@media (max-width: 1250px)
  .grade
    grid-template-columns: repeat(2, 1fr)
    padding: 0 32px

  .segmentos
    padding: 0 32px

@media (max-width: 820px)
  .grade
    grid-template-columns: 1fr
    padding: 0 20px

  .segmentos
    padding: 0 20px

  .segmento__area
    flex-wrap: wrap

  .segmento__nome
    flex: 1 1 100%
</style>
