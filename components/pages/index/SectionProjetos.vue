<template>
  <section ref="secaoRef" class="projetos" aria-label="Cases">
    <div class="projetos__cabecalho">
      <span ref="rotuloRef" class="projetos__rotulo">
        <b>03</b>
        Projetos
      </span>
      <h2 ref="tituloRef" class="projetos__titulo">
        Projetos que já estão<br />
        <span class="projetos__titulo--leve">no ar.</span>
      </h2>
    </div>

    <ul ref="listaRef" class="projetos__grade">
      <li
        v-for="(projeto, i) in projetos"
        :key="projeto.id"
        class="case"
        :class="{ 'case--destaque': i === 0 }"
      >
        <a class="case__area" :href="projeto.link" target="_blank" rel="noopener">
          <span class="case__indice">{{ String(i + 1).padStart(2, '0') }}</span>

          <div class="case__midia">
            <!-- width/height reais reservam a caixa antes do download e evitam o
                 pulo de layout que o Google mede como CLS -->
            <img
              :src="projeto.imagem"
              :alt="`${projeto.nome} — ${projeto.categoria} para ${projeto.setor}`"
              :width="projeto.largura"
              :height="projeto.altura"
              :loading="i === 0 ? 'eager' : 'lazy'"
              :fetchpriority="i === 0 ? 'high' : 'auto'"
              decoding="async"
            />
          </div>

          <div class="case__base">
            <span v-if="i === 0" class="case__selo">Projeto em destaque</span>

            <div class="case__topo">
              <h3 class="case__nome">{{ projeto.nome }}</h3>
              <span class="case__tag">{{ projeto.categoria }}</span>
            </div>

            <div class="case__rodape">
              <p class="case__setor">{{ projeto.setor }}</p>
              <span v-if="i !== 0" class="case__seta" aria-hidden="true">
                <SvgIcone nome="seta-direita" />
              </span>
            </div>

            <span v-if="i === 0" class="case__cta">
              Ver projeto
              <SvgIcone nome="seta-direita" />
            </span>
          </div>
        </a>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SITE_URL, ID_ORGANIZACAO } from '~/helpers/site'

const secaoRef = ref(null)
const rotuloRef = ref(null)
const tituloRef = ref(null)
const listaRef = ref(null)

let contexto = null

// .webp e não .png: os cinco prints somavam 8 MB, o que sozinho derrubava o LCP
// da página. Em webp a 1200px de largura o conjunto caiu para 300 KB.
const projetos = [
  {
    id: 'jamilly',
    nome: 'Jamilly Ferreira',
    categoria: 'Landing page',
    setor: 'Psicologia clínica',
    imagem: '/images/projetos/site-jamilly.webp',
    largura: 1200,
    altura: 675,
    link: 'https://www.jamillyferreirapsicologa.com.br/',
  },
  {
    id: 'conectados',
    nome: 'Conectados',
    categoria: 'Landing page',
    setor: 'Conferência de jovens',
    imagem: '/images/projetos/conectados.webp',
    largura: 1200,
    altura: 675,
    link: 'https://conectados-sigma.vercel.app/',
  },
  {
    id: 'tiro-de-guerra',
    nome: 'Rifa Tiro de Guerra',
    categoria: 'Sistema',
    setor: 'Rifas online com PIX',
    imagem: '/images/projetos/tiro-de-guerra.webp',
    largura: 1200,
    altura: 675,
    link: 'https://tg-azure.vercel.app',
  },

  {
    id: 'citytoys',
    nome: 'City Toys',
    categoria: 'Site institucional',
    setor: 'Brinquedos infláveis',
    imagem: '/images/projetos/citytoys.webp',
    largura: 1200,
    altura: 800,
    link: 'https://www.citytoysbrinquedos.com/',
  },

  {
    id: 'toyz',
    nome: 'Toyz',
    categoria: 'Sistema',
    setor: 'Locação de brinquedos',
    imagem: '/images/projetos/toyz.webp',
    largura: 1200,
    altura: 675,
    link: 'https://apptoyz.com.br/',
  },
]

// Prova de trabalho em formato legível por máquina: é o que o Google e as IAs
// usam para responder "ele já entregou o quê?" sem depender de ler o print.
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        '@id': `${SITE_URL}/#projetos`,
        name: 'Projetos publicados',
        numberOfItems: projetos.length,
        itemListElement: projetos.map((projeto, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'WebSite',
            name: projeto.nome,
            url: projeto.link,
            description: `${projeto.categoria} — ${projeto.setor}`,
            image: SITE_URL + projeto.imagem,
            creator: { '@id': ID_ORGANIZACAO },
          },
        })),
      }),
    },
  ],
})

onMounted(() => {
  contexto = gsap.context(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const cards = listaRef.value?.querySelectorAll('.case') ?? []

      gsap.from([rotuloRef.value, tituloRef.value], {
        autoAlpha: 0,
        y: 28,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: secaoRef.value, start: 'top 78%' },
      })

      gsap.from(cards, {
        autoAlpha: 0,
        y: 46,
        duration: 0.85,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: { trigger: listaRef.value, start: 'top 82%' },
      })
    })
  }, secaoRef.value)
})

onBeforeUnmount(() => {
  contexto?.revert()
  ScrollTrigger.getAll().forEach((t) => {
    if (secaoRef.value?.contains(t.trigger)) t.kill()
  })
})
</script>

<style scoped lang="sass">
.projetos
  position: relative
  width: 100%
  // 1px de sobreposição na seção anterior: as cores batem na emenda, então some
  margin-top: -1px
  padding: 130px 60px 140px
  // nasce na cor em que o .hero__transicao termina e desce pro mesmo azul-profundo
  // do hero, fechando em preto na emenda com o footer
  // preto logo abaixo da curva do divisor, abrindo pro azul do hero conforme desce
  background: linear-gradient(to bottom, #010912 0%, #020a18 18%, #020d20 38%, #04122c 62%, #061c3e 100%)

  // brilho azul concentrado embaixo, reforçando o lado que abre
  &::before
    content: ''
    position: absolute
    inset: 0
    z-index: 0
    pointer-events: none
    // o brilho morre antes da borda: em 105% ele clareava a última linha da seção
    // e criava degrau contra a seção seguinte, que começa na cor declarada
    background: radial-gradient(ellipse 90% 38% at 50% 88%, rgba(30, 70, 160, 0.28) 0%, rgba(20, 45, 110, 0.09) 42%, transparent 68%)

  &__cabecalho
    position: relative
    z-index: 1
    max-width: 720px
    margin: 0 auto 64px
    // centralizado como as outras seções: era a única alinhada à esquerda
    text-align: center

  // mesmo rótulo numerado de Serviços e Contato: com um em pílula e dois em texto,
  // a numeração da página ficava quebrada
  &__rotulo
    display: inline-flex
    align-items: center
    gap: 10px
    margin-bottom: 18px
    font-family: var(--light)
    font-size: 12px
    letter-spacing: 2.4px
    text-transform: uppercase
    color: rgba(255, 255, 255, 0.45)

    b
      font-family: var(--semibold)
      font-style: italic
      color: rgba(255, 255, 255, 0.75)

  &__titulo
    margin: 0
    font-family: var(--semibold)
    font-size: clamp(32px, 4.2vw, 58px)
    line-height: 1.1
    letter-spacing: -0.02em
    color: var(--cor-branco)

    &--leve
      font-family: var(--light)
      color: #8aa6f0

  &__grade
    position: relative
    z-index: 1
    display: grid
    // 2 colunas com o primeiro ocupando a linha inteira: 1 + 2 + 2 fecha os 5
    // projetos sem sobrar célula vazia
    grid-template-columns: repeat(2, 1fr)
    gap: 28px
    max-width: 1600px
    margin: 0 auto
    padding: 0
    list-style: none

.case
  // o destaque ocupa a linha toda e vira horizontal: imagem grande de um lado,
  // informação do outro, em vez de simplesmente esticar o card padrão
  &--destaque
    grid-column: 1 / -1

    .case__area
      display: grid
      // imagem dominante e coluna de texto estreita: com ela larga demais o
      // conteúdo fica solto e sobra vazio, que era o problema
      grid-template-columns: minmax(0, 1.75fr) minmax(0, 1fr)
      align-items: center
      gap: 40px
      padding: 14px

    // conteúdo ancorado no topo do próprio bloco, não espalhado na altura toda
    .case__base
      display: flex
      flex-direction: column
      align-items: flex-start
      padding: 0 40px 0 8px
      gap: 0

    .case__topo
      margin-bottom: 14px

    .case__nome
      font-size: clamp(26px, 2.3vw, 34px)

    // sem space-between: o setor gruda no nome em vez de ir pra outra ponta
    .case__rodape
      justify-content: flex-start

    .case__setor
      font-size: 16px

  &__selo
    display: inline-block
    margin-bottom: 18px
    padding: 6px 13px
    border: 1px solid rgba(125, 155, 255, 0.28)
    border-radius: 100px
    background: rgba(30, 46, 115, 0.4)
    font-family: var(--semibold)
    font-size: 10.5px
    letter-spacing: 1.4px
    text-transform: uppercase
    color: #8aa6f0

  // no card grande a seta solta num círculo fica perdida; um botão com rótulo
  // ocupa o espaço e diz o que acontece no clique
  &__cta
    display: inline-flex
    align-items: center
    gap: 11px
    margin-top: 30px
    padding: 14px 26px
    border: 1px solid rgba(255, 255, 255, 0.16)
    border-radius: 12px
    background: rgba(255, 255, 255, 0.04)
    font-family: var(--semibold)
    font-size: 14px
    line-height: 1
    color: var(--cor-branco)
    transition: background 0.4s ease, border-color 0.4s ease

    :deep(svg)
      display: block
      width: 14px
      height: 14px
      transition: transform 0.4s ease

  &__area
    display: flex
    flex-direction: column
    height: 100%
    padding: 14px 14px 26px
    border: 1px solid rgba(255, 255, 255, 0.07)
    border-radius: 18px
    background: rgba(255, 255, 255, 0.022)
    text-decoration: none
    position: relative
    transition: background 0.4s ease, border-color 0.4s ease

    &:hover
      background: rgba(125, 155, 255, 0.05)
      border-color: rgba(125, 155, 255, 0.2)

      .case__midia img
        transform: scale(1.03)

      .case__seta
        background: var(--cor-azul-forte)
        border-color: var(--cor-azul-forte)

      .case__cta
        background: rgba(125, 155, 255, 0.12)
        border-color: rgba(125, 155, 255, 0.3)

        :deep(svg)
          transform: translateX(4px)

  &__indice
    position: absolute
    top: 30px
    left: 30px
    z-index: 2
    font-family: var(--light)
    font-size: 13px
    color: rgba(255, 255, 255, 0.4)

  &__midia
    overflow: hidden
    border-radius: 12px
    background: #08090c
    aspect-ratio: 16 / 10

    img
      display: block
      width: 100%
      height: 100%
      object-fit: cover
      transition: transform 0.6s ease

  &__base
    display: flex
    flex-direction: column
    gap: 18px
    padding: 26px 16px 0

  &__topo
    display: flex
    align-items: center
    flex-wrap: wrap
    gap: 14px

  &__nome
    margin: 0
    font-family: var(--light)
    font-size: clamp(21px, 1.9vw, 27px)
    letter-spacing: -0.01em
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

  &__rodape
    display: flex
    align-items: center
    justify-content: space-between
    gap: 20px

  &__setor
    margin: 0
    font-family: var(--light)
    font-size: 15px
    color: rgba(255, 255, 255, 0.5)

  &__seta
    display: flex
    align-items: center
    justify-content: center
    flex-shrink: 0
    width: 42px
    height: 42px
    border: 1px solid rgba(255, 255, 255, 0.16)
    border-radius: 50%
    color: var(--cor-branco)
    transition: background 0.4s ease, border-color 0.4s ease

    :deep(svg)
      width: 16px
      height: 16px

@media (max-width: 1250px)
  .projetos
    padding: 100px 32px 110px

    &__grade
      grid-template-columns: repeat(2, 1fr)
      gap: 20px

@media (max-width: 820px)
  .projetos
    padding: 80px 20px 90px

    &__cabecalho
      margin-bottom: 44px

    &__grade
      grid-template-columns: 1fr

  // sem largura pra duas colunas, o destaque volta a ser um card comum empilhado
  .case--destaque .case__area
    display: flex
    flex-direction: column
    gap: 0
    padding: 14px 14px 26px

  .case--destaque .case__base
    padding: 22px 10px 0
    gap: 18px

  .case
    &__indice
      top: 26px
      left: 26px

    &__base
      padding: 22px 10px 0
</style>
