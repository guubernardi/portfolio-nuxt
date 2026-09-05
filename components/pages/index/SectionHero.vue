<template>
  <section id="inicio" class="hero">
    <NavTopo />

    <div ref="luzRef" class="luz" aria-hidden="true">
      <span class="luz__nucleo"></span>
      <span ref="feixeEsqRef" class="luz__feixe luz__feixe--esq"></span>
      <span ref="feixeDirRef" class="luz__feixe luz__feixe--dir"></span>

      <div ref="estrelasRef" class="luz__estrelas">
        <span v-for="e in estrelas" :key="e.id" :style="e.estilo"></span>
      </div>
    </div>

    <div class="hero__conteudo">
      <div ref="seloRef" class="selo">
        <span class="selo__ponto"></span>
        Disponível para tirar ideias do papel
      </div>

      <h1 ref="tituloRef" class="titulo">
        <span class="titulo__linha"><span class="titulo__texto">Sites, e-commerces</span></span>
        <span class="titulo__linha"><span class="titulo__texto">e sistemas</span></span>
        <span class="titulo__linha"><span class="titulo__texto titulo__texto--leve">sob medida.</span></span>
      </h1>

      <p ref="textoRef" class="hero__texto">
        Tire suas ideias do papel. Cuidamos do projeto inteiro, do protótipo
        ao deploy, com código próprio, performance real e prazo combinado.
      </p>

      <div ref="acoesRef" class="hero__acoes">
        <a class="acao acao--primaria" :href="linkWhatsapp" target="_blank" rel="noopener">
          Solicitar orçamento
          <Svgs nome="seta" />
        </a>

        <button class="acao acao--secundaria" type="button" @click="scrollPara('.projetos')">
          Ver projetos
        </button>
      </div>
    </div>

    <div class="hero__transicao"></div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Svgs from '../../global/svgs/Svgs.vue'
import { useScrollTo } from '~/composables/useScrollTo'

const linkWhatsapp = 'https://wa.me/5511966206588?text=' +
  encodeURIComponent('Olá! Vim pelo site e gostaria de um orçamento para um projeto.')

// posições fixas: Math.random() aqui daria hidratação divergente entre servidor e cliente
function sorteador(semente) {
  let s = semente
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
}

const estrelas = (() => {
  const r = sorteador(20260801)
  return Array.from({ length: 52 }, (_, id) => {
    const tamanho = 1 + r() * 1.8
    return {
      id,
      estilo: {
        left: (r() * 100).toFixed(2) + '%',
        top: (r() * 100).toFixed(2) + '%',
        width: tamanho.toFixed(2) + 'px',
        height: tamanho.toFixed(2) + 'px',
        opacity: (0.12 + r() * 0.5).toFixed(2),
        animationDelay: (r() * 6).toFixed(2) + 's',
        animationDuration: (3 + r() * 4).toFixed(2) + 's',
      },
    }
  })
})()

const { scrollTo: gsapScrollTo } = useScrollTo()

const luzRef = ref(null)
const feixeEsqRef = ref(null)
const feixeDirRef = ref(null)
const estrelasRef = ref(null)
const seloRef = ref(null)
const tituloRef = ref(null)
const textoRef = ref(null)
const acoesRef = ref(null)

let contexto = null
let animou = false

function scrollPara(seletor) {
  gsapScrollTo(seletor)
}

// Só a luz fica no GSAP. Nav, selo, título, texto e botões saíram para CSS:
// enquanto estavam aqui, o conteúdo do hero só aparecia depois de o bundle
// baixar e hidratar, e era isso que punha o LCP do celular em 15s.
function alvos() {
  return {
    feixes: [feixeEsqRef.value, feixeDirRef.value].filter(Boolean),
    estrelas: estrelasRef.value,
  }
}

// estado inicial aplicado já na montagem, pra nada piscar antes da timeline rodar
function prepararEntrada() {
  const { feixes, estrelas } = alvos()
  gsap.set(feixes, { autoAlpha: 0, scaleX: 0.55 })
  gsap.set(estrelas, { autoAlpha: 0 })
}

function iniciarEntrada() {
  if (animou) return
  animou = true

  const { feixes, estrelas } = alvos()

  // respirar() só entra no fim: rodando junto, ele e a timeline disputam a mesma opacity
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete: respirar })

  // a luz abre primeiro: os feixes se esticam e o campo de estrelas acende.
  // O resto da coreografia roda em CSS, nos mesmos tempos (ver bloco de entrada
  // no <style>): se mexer nos delays de um lado, acertar o outro junto.
  tl.to(feixes, { autoAlpha: 1, scaleX: 1, duration: 1.8, stagger: 0.18, ease: 'power3.inOut' })
    .to(estrelas, { autoAlpha: 1, duration: 1.6 }, 0.2)
}

// deriva lenta e contínua: sem isso a luz parece um png parado
function respirar() {
  const { feixes } = alvos()

  feixes.forEach((feixe, i) => {
    gsap.to(feixe, {
      opacity: 0.72,
      duration: 4 + i,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: i * 0.8,
    })
    gsap.to(feixe, {
      xPercent: i === 0 ? 4 : -4,
      duration: 9 + i * 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  })
}

// parallax leve: a cena responde ao cursor sem virar brinquedo
function aoMoverMouse(e) {
  const nx = e.clientX / window.innerWidth - 0.5
  const ny = e.clientY / window.innerHeight - 0.5

  gsap.to(luzRef.value, {
    x: nx * -26,
    y: ny * -18,
    duration: 1.1,
    ease: 'power2.out',
    overwrite: 'auto',
  })
}

onMounted(() => {
  contexto = gsap.context(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      prepararEntrada()

      // sem preloader cobrindo a tela, a entrada começa junto com a montagem.
      // se o preloader voltar, isto precisa esperar o evento 'preloader:fim'
      iniciarEntrada()

      window.addEventListener('pointermove', aoMoverMouse, { passive: true })
      return () => window.removeEventListener('pointermove', aoMoverMouse)
    })

    // sem animação de entrada: tudo já visível. O conteúdo em CSS não precisa
    // de tratamento aqui — ele só é escondido dentro de no-preference.
    mm.add('(prefers-reduced-motion: reduce)', () => {
      const { feixes, estrelas } = alvos()
      gsap.set([...feixes, estrelas], { autoAlpha: 1, scaleX: 1 })
    })
  })

})

onBeforeUnmount(() => {
  contexto?.revert()
})
</script>

<style scoped lang="sass">
.hero
  position: relative
  width: 100%
  min-height: 100svh
  display: flex
  align-items: center
  justify-content: center
  overflow: hidden
  color: var(--cor-branco)
  background: radial-gradient(ellipse 85% 60% at 50% 58%, #05142a 0%, #010710 42%, #000000 100%)

.luz
  position: absolute
  inset: 0
  z-index: 1
  pointer-events: none
  will-change: transform

// brilho difuso que sustenta o texto e dá profundidade ao fundo
.luz__nucleo
  position: absolute
  top: 54%
  left: 50%
  width: min(1150px, 125vw)
  height: min(620px, 72vh)
  transform: translate(-50%, -50%)
  border-radius: 50%
  background: radial-gradient(ellipse at center, rgba(60, 110, 220, 0.3) 0%, rgba(40, 90, 190, 0.12) 45%, transparent 72%)
  filter: blur(70px)

// núcleo fino e claro + halo largo: é a soma dos dois que lê como luz volumétrica.
// sem filter no pai — ele criaria contexto e abafaria o brilho do ::after
.luz__feixe
  position: absolute
  height: 3px
  border-radius: 100px
  background: linear-gradient(90deg, transparent 0%, rgba(160, 195, 255, 0.55) 22%, rgba(255, 255, 255, 0.98) 50%, rgba(160, 195, 255, 0.55) 78%, transparent 100%)
  box-shadow: 0 0 30px 4px rgba(130, 175, 255, 0.5), 0 0 90px 18px rgba(60, 110, 225, 0.3)

  &::after
    content: ''
    position: absolute
    top: 50%
    left: 5%
    width: 90%
    height: 300px
    transform: translateY(-50%)
    border-radius: 50%
    background: radial-gradient(ellipse 50% 50% at center, rgba(95, 145, 250, 0.5) 0%, rgba(45, 90, 205, 0.18) 42%, transparent 70%)
    filter: blur(50px)

  // ponto de origem da luz, pra o feixe ter foco em vez de virar um risco uniforme
  &::before
    content: ''
    position: absolute
    top: 50%
    left: 50%
    width: 190px
    height: 190px
    transform: translate(-50%, -50%)
    border-radius: 50%
    background: radial-gradient(circle at center, rgba(255, 255, 255, 0.5) 0%, rgba(150, 190, 255, 0.22) 30%, transparent 65%)
    filter: blur(18px)

  &--esq
    top: 74%
    left: -16%
    width: 74%
    transform: rotate(-8deg)

  &--dir
    top: 87%
    right: -18%
    width: 68%
    transform: rotate(-6deg)

.luz__estrelas
  position: absolute
  inset: 0

  span
    position: absolute
    border-radius: 50%
    background: var(--cor-branco)
    animation: cintilar linear infinite

.hero__transicao
  position: absolute
  bottom: 0
  left: 0
  width: 100%
  height: 130px
  background: linear-gradient(to bottom, transparent 0%, var(--cor-escuro-1) 82%)
  z-index: 3
  pointer-events: none

.hero__conteudo
  position: relative
  z-index: 4
  width: 100%
  max-width: 1000px
  padding: 140px 40px 100px
  display: flex
  flex-direction: column
  align-items: center
  text-align: center

.selo
  display: inline-flex
  align-items: center
  gap: 10px
  margin: 0 0 34px
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
    animation: pulsar-selo 2.4s ease-in-out infinite

.titulo
  margin: 0
  font-size: clamp(36px, 5.6vw, 76px)
  line-height: 1.08
  letter-spacing: -0.025em

  &__linha
    display: block
    overflow: hidden
    padding-bottom: 0.09em
    margin-bottom: -0.09em

  &__texto
    display: block
    font-family: var(--semibold)
    color: var(--cor-branco)

    &--leve
      font-family: var(--light)
      color: rgba(255, 255, 255, 0.82)

.hero__texto
  max-width: 620px
  margin: 30px 0 0
  font-family: var(--light)
  font-size: clamp(15px, 1.35vw, 19px)
  line-height: 1.65
  color: rgba(255, 255, 255, 0.6)

.hero__acoes
  display: flex
  flex-wrap: wrap
  align-items: center
  justify-content: center
  gap: 16px
  margin: 46px 0 0

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
  // trava a caixa de linha: sem isso o <a> com ícone e o <button> nativo
  // calculam alturas diferentes com o mesmo padding
  line-height: 1
  text-decoration: none
  cursor: pointer
  transition: background 0.4s ease, border-color 0.4s ease

  :deep(svg)
    display: block
    width: 15px
    height: 15px
    // sem fill no path original: seguindo currentColor, acompanha a cor do botão
    fill: currentColor
    transition: transform 0.4s ease

  &--primaria
    color: var(--cor-branco)
    background: var(--cor-azul-forte)

    &:hover
      background: #2c1fd6

      :deep(svg)
        transform: translateX(4px)

  &--secundaria
    color: rgba(255, 255, 255, 0.88)
    background: rgba(30, 46, 115, 0.4)
    border-color: rgba(125, 155, 255, 0.18)
    backdrop-filter: blur(10px)
    -webkit-backdrop-filter: blur(10px)

    &:hover
      background: rgba(125, 155, 255, 0.16)
      border-color: rgba(140, 165, 255, 0.3)

@keyframes pulsar-selo
  0%, 100%
    box-shadow: 0 0 0 4px rgba(70, 224, 138, 0.16)
  50%
    box-shadow: 0 0 0 8px rgba(70, 224, 138, 0.04)

@keyframes cintilar
  0%, 100%
    opacity: inherit
  50%
    opacity: 0.15

@media (max-width: 900px)
  .hero__conteudo
    padding: 120px 26px 90px

@media (max-width: 600px)
  .selo
    margin-bottom: 26px
    font-size: 13px

  .hero__acoes
    width: 100%
    flex-direction: column
    margin-top: 38px

  .acao
    width: 100%

// ===== entrada do conteúdo, em CSS =====
// Esta coreografia era uma timeline GSAP disparada no onMounted. O efeito era o
// mesmo, mas o hero ficava invisível até o bundle baixar e hidratar: no celular
// o LCP batia 15s, com 83% do tempo classificado como "render delay". Em CSS a
// entrada começa junto com o parse do estilo, que é inline, sem esperar JS.
// Os tempos abaixo são os mesmos da timeline antiga.
@media (prefers-reduced-motion: no-preference)
  .selo
    opacity: 0
    animation: heroSobe 0.6s cubic-bezier(0.33, 1, 0.68, 1) 0.5s both

  // O título NÃO entra aqui de propósito. O Chrome não aceita como candidato a
  // LCP um elemento clipado ou transparente no primeiro paint, e não reavalia
  // quando a animação o revela. Com todo o hero escondido, a página ficava sem
  // LCP nenhum (NO_LCP no PageSpeed). O título é o maior bloco de texto: ele
  // precisa estar pintado desde o primeiro frame para a métrica existir.

  .hero__texto
    opacity: 0
    animation: heroSobe 0.7s cubic-bezier(0.33, 1, 0.68, 1) 1.25s both

  .hero__acoes
    opacity: 0
    animation: heroSobe 0.7s cubic-bezier(0.33, 1, 0.68, 1) 1.4s both

@keyframes heroSobe
  from
    opacity: 0
    transform: translateY(22px)
  to
    opacity: 1
    transform: translateY(0)

@keyframes heroLinha
  from
    transform: translateY(115%)
  to
    transform: translateY(0)
</style>
