<template>
  <section class="projetos" ref="secaoRef" aria-label="Seção de projetos">
    <div class="wrap">
      <h2 class="projetos__titulo" ref="tituloRef">Projetos</h2>

      <ul class="projetos__lista" ref="listaRef">
        <li
          v-for="projeto in projetos"
          :key="projeto.id"
          class="card"
        >
          <div
            class="card__imagem"
            :style="projeto.imagem ? { backgroundImage: `url(${projeto.imagem})`, backgroundSize: 'cover', backgroundPosition: 'top center' } : {}"
          >
            <div class="card__mockup">
              <div class="card__mockup-barra">
                <span class="card__mockup-ponto card__mockup-ponto--vermelho"></span>
                <span class="card__mockup-ponto card__mockup-ponto--amarelo"></span>
                <span class="card__mockup-ponto card__mockup-ponto--verde"></span>
                <span class="card__mockup-url">{{ projeto.link }}</span>
              </div>
            </div>
          </div>

          <div class="card__info">
            <div class="card__cabecalho">
              <h3 class="card__nome">{{ projeto.nome }}</h3>
              <span class="card__categoria">| {{ projeto.categoria }}</span>
            </div>

            <p class="card__descricao">{{ projeto.descricao }}</p>

            <div class="card__tecnologias">
              <div class="card__tech" v-for="tech in projeto.tecnologias" :key="tech.nome">
                <Svgs v-if="tech.svgNome" :nome="tech.svgNome" />
                <img v-else :src="tech.icone" :alt="tech.nome" loading="lazy" :style="tech.estilo || {}" />
                <span class="card__tech-label">{{ tech.nome }}</span>
              </div>
            </div>

            <a :href="projeto.link" target="_blank" rel="noopener noreferrer" class="card__link-botao">
              <BotaoAzul icone="codigo" texto="Ver projeto" />
            </a>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { gsap } from 'gsap'
import BotaoAzul from '../../global/elementos/BotaoAzul.vue'
import Svgs from '../../global/svgs/Svgs.vue'

const secaoRef = ref(null)
const tituloRef = ref(null)
const listaRef = ref(null)

const projetos = ref([
  {
    id: 1,
    nome: 'RIFA TIRO DE GUERRA',
    categoria: 'SISTEMA',
    descricao: 'Sistema de rifas online que fiz no meu ano de alistamento militar obrigatório com pagamento via PIX pelo Asaas e sorteio integrado à Loteria Federal.',
    imagem: '/images/projetos/tiro-de-guerra.png',
    tecnologias: [
      { nome: 'NuxtJS',   svgNome: 'nuxtjs' },
      { nome: 'NodeJS',   icone: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { nome: 'Figma',    icone: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
      { nome: 'Supabase', icone: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg' },
    ],
    link: 'https://tg-azure.vercel.app',
  },
  {
    id: 2,
    nome: 'CITY TOYS',
    categoria: 'LANDING PAGE',
    descricao: 'Landing page desenvolvida para cliente real. Projeto focado em UI/UX com animações fluidas usando GSAP e design responsivo.',
    imagem: '/images/projetos/citytoys.png',
    tecnologias: [
      { nome: 'Vue.js', icone: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
      { nome: 'SASS',   icone: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg' },
      { nome: 'GSAP',   icone: 'https://cdn.simpleicons.org/greensock/88CE02' },
    ],
    link: 'https://www.citytoysbrinquedos.com/',
  },
  {
    id: 6,
    nome: 'TOYZ',
    categoria: 'SISTEMA',
    descricao: 'Plataforma completa de gerenciamento para locadoras de brinquedos, desenvolvida em parceria com um amigo via GitHub. Conta com controle de reservas, módulo financeiro, contratos digitais e sistema de assinatura recorrente.',
    imagem: '/images/projetos/toyz.png',
    tecnologias: [
      { nome: 'NuxtJS',     svgNome: 'nuxtjs' },
      { nome: 'NodeJS',     icone: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { nome: 'TypeScript', icone: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { nome: 'Supabase',   icone: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg' },
      { nome: 'GitHub',     icone: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', estilo: { filter: 'invert(1)' } },
    ],
    link: 'https://www.apptoyz.com.br/',
  },
])

onMounted(() => {
  const titulo = tituloRef.value
  const cards = listaRef.value?.querySelectorAll('.card') || []

  gsap.set(titulo, { opacity: 0, y: 40 })
  gsap.set(cards, { opacity: 0, y: 60 })

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()

      gsap.to(titulo, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' })
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        stagger: 0.18,
        delay: 0.2,
      })
    },
    { threshold: 0.08 }
  )

  if (secaoRef.value) observer.observe(secaoRef.value)
})
</script>

<style scoped lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@800&display=swap')

.projetos
  width: 100%
  background: var(--cor-escuro-1)
  padding: 100px 0
  position: relative
  margin-top: -2px

  &::before
    content: ''
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 160px
    background: linear-gradient(to bottom, #000000 0%, #060a10 50%, transparent 100%)
    pointer-events: none
    z-index: 1

  &__titulo
    font-family: var(--semibold)
    font-weight: 800
    font-size: clamp(42px, 5vw, 72px)
    color: var(--cor-branco)
    text-align: center
    margin: 0 0 64px
    letter-spacing: -1px

  &__lista
    display: flex
    flex-direction: column
    gap: 48px
    list-style: none
    margin: 0
    padding: 0

.wrap
  width: 100%
  padding: 0 148px

  @media (max-width: 1200px)
    padding: 0 60px

  @media (max-width: 900px)
    padding: 0 30px

  @media (max-width: 600px)
    padding: 0 20px

.card
  display: grid
  grid-template-columns: 1fr 1fr
  border-radius: 44px
  overflow: hidden
  background: #0D0D1A
  transition: box-shadow 0.3s ease

  &:hover
    box-shadow: 0 24px 64px rgba(0, 0, 0, 0.5)

  &__imagem
    position: relative
    min-height: 430px
    overflow: hidden
    background-color: #0d1117

    &::after
      content: ''
      position: absolute
      inset: 0
      background: rgba(0, 0, 0, 0.45)
      z-index: 1

  &__mockup
    position: absolute
    top: -1px
    left: 0
    width: 101%
    z-index: 2
    border-radius: 0 0 0px 10px
    overflow: hidden
    border: 1px solid rgba(255, 255, 255, 0.12)
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5)
    background: transparent

  &__mockup-barra
    display: flex
    align-items: center
    gap: 6px
    padding: 10px 14px
    background: #1e1e2e
    border-bottom: 1px solid rgba(255, 255, 255, 0.08)

  &__mockup-ponto
    width: 10px
    height: 10px
    border-radius: 50%
    flex-shrink: 0

    &--vermelho
      background: #ff5f57

    &--amarelo
      background: #febc2e

    &--verde
      background: #28c840

  &__mockup-url
    flex: 1
    margin-left: 10px
    background: rgba(255, 255, 255, 0.07)
    border-radius: 4px
    padding: 4px 10px
    font-family: 'Fira Code', monospace
    font-size: 11px
    color: rgba(255, 255, 255, 0.35)
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis

  &__info
    padding: 44px 48px
    display: flex
    flex-direction: column
    justify-content: center
    gap: 20px

  &__cabecalho
    display: flex
    align-items: baseline
    gap: 10px
    flex-wrap: wrap

  &__nome
    font-family: 'Syne', sans-serif
    font-weight: 800
    font-size: var(--f3)
    color: var(--cor-branco)
    margin: 0
    letter-spacing: 1px
    text-transform: uppercase

  &__categoria
    font-family: 'Syne', sans-serif
    font-weight: 800
    font-size: var(--f1)
    letter-spacing: 2px
    background: linear-gradient(90deg, #60a5fa, #a78bfa)
    -webkit-background-clip: text
    -webkit-text-fill-color: transparent
    background-clip: text

  &__descricao
    font-family: var(--light)
    font-size: var(--f1)
    color: var(--cor-branco)
    line-height: 1.65
    margin: 0
    margin-top: 16px

  &__tecnologias
    display: flex
    gap: 22px
    flex-wrap: wrap
    margin-top: 16px

  &__tech
    display: flex
    flex-direction: row
    align-items: center
    gap: 8px

    img
      width: 21px
      height: 21px
      object-fit: contain
      display: block
      flex-shrink: 0

    :deep(svg)
      width: 21px
      height: 21px
      display: block
      flex-shrink: 0

  &__tech-label
    font-family: var(--semibold)
    font-size: var(--f1)
    color: #fff

  &__link-botao
    align-self: center
    text-decoration: none
    margin-top: 16px

@media (max-width: 900px)
  .card
    grid-template-columns: 1fr

    &__imagem
      min-height: 260px

    &__info
      padding: 32px 28px
      gap: 16px

@media (max-width: 600px)
  .projetos
    padding: 70px 0

  .projetos__titulo
    margin-bottom: 40px
    font-size: 40px

  .wrap
    padding: 0 20px

  .card
    &__info
      padding: 24px 20px
      gap: 14px

    &__nome
      font-size: var(--f3)

    &__link-botao
      width: 100%
</style>
