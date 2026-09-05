<template>
  <main class="portfolio">
    <div class="luz" aria-hidden="true">
      <span class="luz__nucleo"></span>
      <span class="luz__feixe"></span>
    </div>

    <NavTopo />

    <section class="abertura">
      <span class="abertura__etiqueta">
        <b>Portfólio</b>
        <span class="abertura__risco" aria-hidden="true"></span>
        Projetos no ar
      </span>

      <h1 class="abertura__titulo">
        Trabalho que já<br />
        <span class="abertura__titulo--leve">está no ar.</span>
      </h1>

      <div class="abertura__base">
        <p class="abertura__texto">
          De landing page a sistema sob medida. Cada projeto aqui foi desenhado e escrito do
          zero, sem template, e continua rodando para o cliente que pediu.
        </p>

        <ul class="numeros">
          <li v-for="n in numeros" :key="n.rotulo" class="numero">
            <span class="numero__valor">{{ n.valor }}</span>
            <span class="numero__rotulo">{{ n.rotulo }}</span>
          </li>
        </ul>
      </div>
    </section>

    <section class="lista">
      <span class="lista__rotulo"><b>01</b> Todos os projetos</span>

      <ul class="grade">
        <li v-for="(projeto, i) in projetos" :key="projeto.id" class="item">
          <!-- quem tem case abre a pagina interna; quem nao tem vai pro site -->
          <NuxtLink
            class="item__area"
            :to="destinoDoProjeto(projeto)"
            :target="projeto.slug ? null : '_blank'"
            :rel="projeto.slug ? null : 'noopener'"
          >
            <span class="item__indice">{{ String(i + 1).padStart(2, '0') }}</span>

            <div class="item__midia">
              <img
                :src="projeto.imagem"
                :alt="`${projeto.nome}, ${projeto.categoria.toLowerCase()} para ${projeto.setor.toLowerCase()}`"
                :width="projeto.largura"
                :height="projeto.altura"
                :loading="i < 2 ? 'eager' : 'lazy'"
                decoding="async"
              />
            </div>

            <div class="item__info">
              <div class="item__topo">
                <h2 class="item__nome">{{ projeto.nome }}</h2>
                <span class="item__tag">{{ projeto.categoria }}</span>
              </div>

              <p class="item__setor">{{ projeto.setor }}</p>

              <span class="item__acao">
                {{ projeto.slug ? 'Ver o case' : 'Ver no ar' }}
                <SvgIcone nome="seta-direita" />
              </span>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </section>

    <section class="fecho">
      <h2 class="fecho__titulo">
        Seu projeto pode<br />
        <span class="fecho__titulo--leve">ser o próximo.</span>
      </h2>
      <p class="fecho__texto">
        Manda uma mensagem contando o que você precisa. Sem formulário longo e sem compromisso.
      </p>
      <div class="fecho__acoes">
        <a class="acao acao--primaria" :href="linkWhatsapp" target="_blank" rel="noopener">
          Chamar no WhatsApp
          <SvgIcone nome="whatsapp" />
        </a>
        <NuxtLink to="/" class="acao acao--secundaria">Voltar para o início</NuxtLink>
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
import { PROJETOS as projetos, PROJETOS_COM_CASE, destinoDoProjeto } from '~/helpers/projetos'
import { SITE_URL, SITE_NOME, TELEFONE, ID_ORGANIZACAO, ID_SITE, urlCanonica } from '~/helpers/site'

definePageMeta({ layout: false })

const ano = new Date().getFullYear()

const linkWhatsapp =
  `https://wa.me/${TELEFONE.replace('+', '')}?text=` +
  encodeURIComponent('Olá! Vi os projetos no site e gostaria de um orçamento.')

// contados a partir dos próprios dados: acrescentar um projeto atualiza os
// números sozinho, sem risco de a página afirmar algo que deixou de ser verdade
const numeros = [
  { valor: projetos.length, rotulo: 'Projetos no ar' },
  { valor: PROJETOS_COM_CASE.length, rotulo: 'Cases detalhados' },
  { valor: new Set(projetos.map((p) => p.setor)).size, rotulo: 'Segmentos atendidos' },
]

const canonica = urlCanonica('/projetos')

const TITULO = 'Portfólio de sites e sistemas'
const DESCRICAO =
  'Projetos de sites, landing pages e sistemas feitos do zero por Gustavo Bernardi. Veja o que foi entregue em cada um e o site funcionando.'

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
              { '@type': 'ListItem', position: 2, name: 'Projetos', item: canonica },
            ],
          },
          {
            '@type': 'CollectionPage',
            '@id': `${canonica}#pagina`,
            url: canonica,
            name: `${TITULO} | ${SITE_NOME}`,
            description: DESCRICAO,
            inLanguage: 'pt-BR',
            isPartOf: { '@id': ID_SITE },
            about: { '@id': ID_ORGANIZACAO },
            mainEntity: {
              '@type': 'ItemList',
              numberOfItems: projetos.length,
              itemListElement: projetos.map((projeto, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                item: {
                  '@type': 'CreativeWork',
                  name: projeto.nome,
                  url: projeto.slug ? urlCanonica(`/projetos/${projeto.slug}`) : projeto.site,
                  description: `${projeto.categoria} para ${projeto.setor.toLowerCase()}`,
                  image: SITE_URL + projeto.imagem,
                  creator: { '@id': ID_ORGANIZACAO },
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
  background: linear-gradient(180deg, #05142a 0%, #020a18 14%, #01060f 38%, #020814 66%, #04101f 100%)

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

.abertura
  position: relative
  z-index: 1
  width: 100%
  max-width: 1720px
  margin: 0 auto
  padding: 190px 60px 0 60px

  &__etiqueta
    display: inline-flex
    align-items: center
    gap: 16px
    font-family: var(--light)
    font-size: 12px
    letter-spacing: 2.4px
    text-transform: uppercase
    color: rgba(255, 255, 255, 0.42)

    b
      font-family: var(--semibold)
      color: rgba(255, 255, 255, 0.8)

  &__risco
    display: block
    width: 54px
    height: 1px
    background: rgba(255, 255, 255, 0.22)

  &__titulo
    margin: 22px 0 0 0
    font-family: var(--semibold)
    font-size: clamp(42px, 7vw, 96px)
    line-height: 1.02
    letter-spacing: -0.03em

    &--leve
      font-family: var(--light)
      color: #8aa6f0

  // texto e números na mesma linha, separados por um filete: o mesmo corte
  // horizontal que a home usa entre hero e seções
  &__base
    display: grid
    grid-template-columns: minmax(0, 1fr) auto
    align-items: end
    gap: 60px
    margin: 54px 0 0 0
    padding: 40px 0 0 0
    border-top: 1px solid rgba(255, 255, 255, 0.09)

  &__texto
    max-width: 540px
    margin: 0
    font-family: var(--light)
    font-size: clamp(15px, 1.3vw, 17px)
    line-height: 1.7
    color: rgba(255, 255, 255, 0.6)

.numeros
  display: flex
  gap: 54px
  margin: 0
  padding: 0
  list-style: none

.numero
  &__valor
    display: block
    font-family: var(--semibold)
    font-size: clamp(30px, 3.2vw, 42px)
    line-height: 1
    letter-spacing: -0.02em

  &__rotulo
    display: block
    margin-top: 10px
    font-family: var(--light)
    font-size: 11px
    letter-spacing: 1.6px
    text-transform: uppercase
    color: rgba(255, 255, 255, 0.42)

.lista
  position: relative
  z-index: 1
  width: 100%
  max-width: 1720px
  margin: 0 auto
  padding: 130px 60px 0 60px

  &__rotulo
    display: inline-flex
    align-items: center
    gap: 10px
    margin-bottom: 34px
    font-family: var(--light)
    font-size: 12px
    letter-spacing: 2.4px
    text-transform: uppercase
    color: rgba(255, 255, 255, 0.45)

    b
      font-family: var(--semibold)
      font-style: italic
      color: rgba(255, 255, 255, 0.75)

.grade
  display: grid
  grid-template-columns: repeat(2, 1fr)
  gap: 28px
  margin: 0
  padding: 0
  list-style: none

.item
  &__area
    position: relative
    display: block
    padding: 14px 14px 24px 14px
    border: 1px solid rgba(255, 255, 255, 0.07)
    border-radius: 22px
    background: rgba(255, 255, 255, 0.025)
    text-decoration: none
    transition: border-color 0.4s ease, background 0.4s ease

    &:hover
      border-color: rgba(140, 165, 255, 0.28)
      background: rgba(30, 46, 115, 0.3)

      .item__acao
        color: var(--cor-branco)

        :deep(svg)
          transform: translateX(4px)

  &__indice
    position: absolute
    top: 30px
    right: 30px
    z-index: 2
    font-family: var(--semibold)
    font-style: italic
    font-size: 13px
    color: rgba(255, 255, 255, 0.5)

  &__midia
    img
      display: block
      width: 100%
      height: auto
      aspect-ratio: 16 / 10
      object-fit: cover
      border-radius: 14px

  &__info
    padding: 22px 12px 0 12px

  &__topo
    display: flex
    flex-wrap: wrap
    align-items: center
    gap: 12px

  &__nome
    margin: 0
    font-family: var(--semibold)
    font-size: clamp(19px, 1.6vw, 23px)
    color: var(--cor-branco)

  &__tag
    padding: 6px 14px
    border: 1px solid rgba(255, 255, 255, 0.16)
    border-radius: 100px
    font-family: var(--semibold)
    font-size: 11px
    letter-spacing: 1.2px
    text-transform: uppercase
    color: rgba(255, 255, 255, 0.7)

  &__setor
    margin: 10px 0 0 0
    font-family: var(--light)
    font-size: 15px
    color: rgba(255, 255, 255, 0.5)

  &__acao
    display: inline-flex
    align-items: center
    gap: 9px
    margin: 20px 0 0 0
    font-family: var(--semibold)
    font-size: 14px
    color: #8aa6f0
    transition: color 0.4s ease

    :deep(svg)
      width: 13px
      height: 13px
      transition: transform 0.4s ease

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

// mesmos pontos de quebra da home
@media (max-width: 1250px)
  .abertura,
  .lista,
  .fecho,
  .rodape
    padding-left: 32px
    padding-right: 32px

  .rodape::before
    left: 32px
    right: 32px

@media (max-width: 1000px)
  .abertura__base
    grid-template-columns: 1fr
    align-items: start
    gap: 38px

  .numeros
    gap: 38px

  .grade
    grid-template-columns: 1fr

  .abertura
    padding-top: 150px

  .lista
    padding-top: 96px

  .fecho
    padding-top: 104px

  .rodape
    margin-top: 96px

@media (max-width: 820px)
  .abertura,
  .lista,
  .fecho,
  .rodape
    padding-left: 20px
    padding-right: 20px

  .rodape::before
    left: 20px
    right: 20px

  .numeros
    flex-wrap: wrap
    gap: 28px 40px
</style>
