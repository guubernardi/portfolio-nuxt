<template>
  <section class="hero" :class="{ 'is-icons': mostrarIcons }">
    <div class="titulo">
      <div class="texto">
        <h1 class="titulo-digitado">
          <span class="titulo-digitado__texto">{{ tituloDigitado }}</span>
          <span v-if="!tituloConcluido" class="cursor" aria-hidden="true">|</span>
        </h1>

        <div class="paragrafo-box">
          <p class="paragrafo-digitando" :class="{ 'is-sair': paragrafoConcluido }">
            {{ paragrafoDigitado }}
            <span v-if="!paragrafoConcluido" class="cursor cursor--p" aria-hidden="true">|</span>
          </p>

          <p class="paragrafo-final" :class="{ 'is-visivel': paragrafoConcluido }">
            Estudante de Análise e Desenvolvimento de Sistemas (3º semestre) e desenvolvedor em formação com foco em
            <span class="um">
              FrontEnd <br />
            </span>
            Gosto de criar soluções web que unem design limpo, responsividade e boa expêriencia do usario. <br />
            Estou sempre aprimorando minhas habilidades para construir interfaces modernas e concistentes,
            <span class="dois">
              do layout à implementação.
            </span>
          </p>
        </div>

        <div class="acoes" :class="{ 'is-visivel': mostrarAcoes }">
          <ElementosBotao class="acao acao--1" texto="Veja meus Projetos" icone="desktop" scroll-para=".projetos" />
          <NuxtLink to='/curriculo'><ElementosBotao class="acao acao--2" texto="Ver Curriculo" icone="curriculo"/></NuxtLink>
        </div>
      </div>
    </div>

    <div class="imagem" aria-hidden="true">
      <div class="conteudo">
        <img src="/images/nuxt.svg" alt="Icone Nuxtjs" />
        <img src="/images/javascript.svg" alt="Icone JavaScript" />
        <img src="/images/code.svg" alt="Icone Code" />
        <img src="/images/react.svg" alt="Icone React" />
      </div>
    </div>

    <div class="divisor"></div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

const tituloCompleto = `Olá, me chamo\nGustavo Bernardi`

const paragrafoCompletoTexto =
  `Sou, estudante de Análise e Desenvolvimento de Sistemas (3º semestre) e desenvolvedor em formação com foco em\n` +
  `FrontEnd\n` +
  `Gosto de criar soluções web que unem design limpo, responsividade e boa expêriencia do usario.\n` +
  `Estou sempre aprimorando minhas habilidades para construir interfaces modernas e concistentes, do layout à implementação.`

const tituloDigitado = ref('')
const paragrafoDigitado = ref('')

const tituloConcluido = ref(false)
const paragrafoConcluido = ref(false)

const mostrarAcoes = ref(false)
const mostrarIcons = ref(false)

const timers: ReturnType<typeof setTimeout>[] = []

function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    const t = setTimeout(() => resolve(), ms)
    timers.push(t)
  })
}

async function digitarTexto(
  texto: string,
  setValor: (v: string) => void,
  opts?: { min?: number; max?: number }
) {
  const min = opts?.min ?? 18
  const max = opts?.max ?? 42

  let atual = ''
  for (let k = 0; k < texto.length; k++) {
    const ch = texto[k]
    atual += ch
    setValor(atual)

    let delay = min + Math.random() * (max - min)

    if (['.', ',', '!', '?', ':'].includes(ch)) delay += 160
    if (ch === '\n') delay += 220

    await sleep(delay)
  }
}

onMounted(async () => {
  await sleep(250)
  mostrarIcons.value = true

  await digitarTexto(tituloCompleto, (v) => (tituloDigitado.value = v), { min: 22, max: 55 })
  tituloConcluido.value = true

  await sleep(120)
  await digitarTexto(paragrafoCompletoTexto, (v) => (paragrafoDigitado.value = v), { min: 5, max: 26 })

  paragrafoConcluido.value = true
  await sleep(120)
  mostrarAcoes.value = true
})

onBeforeUnmount(() => {
  timers.forEach((t) => clearTimeout(t))
})
</script>

<style lang="sass" scoped>
section.hero
  display: flex
  justify-content: space-between
  width: 100%
  background: linear-gradient(150deg, #3B3C36, #131519 30%)
  position: relative
  overflow: hidden
  min-height: 100vh
  min-height: 100svh

  .divisor
    width: calc(100% + 50px)
    height: 150px
    background-color: var(--cor-escuro-3)
    position: absolute
    bottom: -65px
    left: -25px
    transform: rotate(4deg)
    z-index: 1

  .titulo
    display: flex
    flex-direction: column
    align-items: flex-start
    width: 50%
    padding: 180px 0 240px 80px
    position: relative
    z-index: 2

  .texto
    display: flex
    flex-direction: column
    align-items: flex-start
    justify-content: flex-start
    width: 100%
    gap: 20px

    .titulo-digitado
      font-family: var(--bold)
      font-size: var(--f10)
      line-height: 1
      width: 100%
      max-width: 550px
      background: linear-gradient(0deg, #FFF9B4, var(--cor-branco))
      -webkit-background-clip: text
      -webkit-text-fill-color: transparent
      background-clip: text
      text-stroke: 1px var(--cor-dourado)

      .titulo-digitado__texto
        white-space: pre-line

    .cursor
      display: inline-block
      margin-left: 8px
      -webkit-text-fill-color: transparent
      background: linear-gradient(0deg, #FFF9B4, var(--cor-branco))
      -webkit-background-clip: text
      background-clip: text
      animation: piscar 0.8s steps(1) infinite

    .cursor--p
      margin-left: 4px

    .paragrafo-box
      display: grid
      width: 100%
      max-width: 620px

      .paragrafo-digitando,
      .paragrafo-final
        grid-area: 1 / 1

    .paragrafo-digitando
      font-family: var(--light)
      font-size: var(--f2)
      color: var(--cor-cinza)
      line-height: 1.5
      white-space: pre-line
      opacity: 1
      transition: opacity .25s ease

      &.is-sair
        opacity: 0

    .paragrafo-final
      font-family: var(--light)
      font-size: var(--f2)
      color: var(--cor-cinza)
      line-height: 1.5
      opacity: 0
      transform: translateY(10px)
      transition: opacity .6s ease, transform .6s ease
      pointer-events: none

      &.is-visivel
        opacity: 1
        transform: translateY(0)
        pointer-events: auto

      span
        font-family: var(--semibold)
        position: relative
        padding: 0 2px 0 0

    .acoes
      display: flex
      gap: 12px
      align-items: center
      opacity: 0
      transform: translateY(10px)
      transition: opacity .16s ease, transform .6s ease
      pointer-events: none

      &.is-visivel
        opacity: 1
        transform: translateY(0)
        pointer-events: auto

      .acao
        opacity: 0
        transform: translateY(10px)
        transition: opacity .6s ease, transform .6s ease

      &.is-visivel .acao
        opacity: 1
        transform: translateY(0)

      &.is-visivel .acao--1
        transition-delay: .05s

      &.is-visivel .acao--2
        transition-delay: .18s

  .imagem
    display: flex
    align-items: center
    justify-content: center
    width: 50%
    height: auto
    position: relative
    overflow: hidden
    z-index: 2

    .conteudo
      position: absolute
      inset: 0
      pointer-events: none

      img
        position: absolute
        left: var(--x)
        top: var(--y)
        width: clamp(72px, 8vw, 170px)
        height: auto

        opacity: 0
        filter: drop-shadow(0 18px 40px rgba(0,0,0,.28)) blur(8px)
        transition: opacity .8s ease, filter .8s ease
        will-change: opacity, filter, transform

        transform: translate(-50%, -50%) rotate(var(--r)) scale(var(--s))
        animation: flutuar 7s ease-in-out infinite
        animation-delay: var(--d)

  &.is-icons
    .imagem .conteudo img
      opacity: .95
      filter: drop-shadow(0 18px 40px rgba(0,0,0,.28)) blur(0)

    .imagem .conteudo img:nth-child(1)
      transition-delay: .05s

    .imagem .conteudo img:nth-child(2)
      transition-delay: .15s

    .imagem .conteudo img:nth-child(3)
      transition-delay: .25s

    .imagem .conteudo img:nth-child(4)
      transition-delay: .35s

  .imagem .conteudo
    img:nth-child(1)
      --x: 22%
      --y: 30%
      --s: 1.05
      --r: -10deg
      --d: -1.2s

    img:nth-child(2)
      --x: 85%
      --y: 38%
      --s: 1.25
      --r: 6deg
      --d: -2.4s

    img:nth-child(3)
      --x: 12%
      --y: 85%
      --s: .95
      --r: 0deg
      --d: -0.7s

    img:nth-child(4)
      --x: 70%
      --y: 78%
      --s: 1.1
      --r: 12deg
      --d: -3.1s

@keyframes flutuar
  0%, 100%
    transform: translate(-50%, -50%) rotate(var(--r)) scale(var(--s)) translateY(0)
  50%
    transform: translate(-50%, -50%) rotate(var(--r)) scale(var(--s)) translateY(-12px)

@keyframes piscar
  50%
    opacity: 0

@media screen and (max-width: 1000px)
  section.hero
    flex-direction: column

    .divisor
      height: 100px
      bottom: -45px
      transform: rotate(6deg)

    .titulo
      width: 100%
      padding: 120px 24px 40px 24px

    .imagem
      width: 100%
      min-height: 420px

      .conteudo
        img
          width: clamp(62px, 14vw, 140px)

        img:nth-child(1)
          --x: 18%
          --y: 40%

        img:nth-child(2)
          --x: 50%
          --y: 22%

        img:nth-child(3)
          --x: 82%
          --y: 44%

        img:nth-child(4)
          --x: 60%
          --y: 78%

    .texto
      align-items: center
      justify-content: center
      text-align: center

      .titulo-digitado
        font-size: var(--f8)
        max-width: 560px

      .paragrafo-box
        max-width: 420px

      .acoes
        justify-content: center
        flex-wrap: wrap

@media (prefers-reduced-motion: reduce)
  section.hero
    *
      animation: none !important
      transition: none !important
</style>
