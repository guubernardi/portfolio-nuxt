<template>
  <section ref="secaoRef" class="servicos" aria-label="O que fazemos">
    <div ref="cabecalhoRef" class="servicos__cabecalho">
      <span class="servicos__rotulo">
        <b>01</b>
        O que fazemos
      </span>

      <h2 class="servicos__titulo">
        Do primeiro rascunho<br />
        <span class="servicos__titulo--leve">ao site no ar.</span>
      </h2>

      <p class="servicos__sub">Tudo escrito do zero. Nada de template.</p>
    </div>

    <ul ref="listaRef" class="servicos__grade">
      <li v-for="(servico, i) in servicos" :key="servico.id" class="servico">
        <span class="servico__chip">
          <SvgIcone :nome="servico.icone" />
        </span>

        <span class="servico__numero">{{ String(i + 1).padStart(2, '0') }}</span>

        <h3 class="servico__titulo">{{ servico.titulo }}</h3>
        <p class="servico__texto">{{ servico.texto }}</p>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const secaoRef = ref(null)
const cabecalhoRef = ref(null)
const listaRef = ref(null)

let contexto = null

const servicos = [
  {
    id: 'landing',
    icone: 'foguete',
    titulo: 'Landing pages',
    texto: 'Uma página, um objetivo: virar cliente.',
  },
  {
    id: 'institucional',
    icone: 'predio',
    titulo: 'Sites institucionais',
    texto: 'A cara da sua empresa, sem parecer modelo pronto.',
  },
  {
    id: 'sistemas',
    icone: 'engrenagem',
    titulo: 'Sistemas sob medida',
    texto: 'Feito pro seu processo, não pro processo genérico.',
  },
  {
    id: 'ecommerce',
    icone: 'carrinho-compras',
    titulo: 'E-commerce',
    texto: 'Loja que carrega rápido e fecha venda.',
  },
  {
    id: 'integracoes',
    icone: 'integracoes',
    titulo: 'Integrações e pagamentos',
    texto: 'PIX, assinatura e API conversando direito.',
  },
  {
    id: 'design',
    icone: 'design',
    titulo: 'UI/UX e interface',
    texto: 'Bonito de ver e óbvio de usar.',
  },
]

onMounted(() => {
  contexto = gsap.context(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(cabecalhoRef.value, {
        autoAlpha: 0,
        y: 28,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: secaoRef.value, start: 'top 78%' },
      })

      gsap.from(listaRef.value?.querySelectorAll('.servico') ?? [], {
        autoAlpha: 0,
        y: 34,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: listaRef.value, start: 'top 84%' },
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
.servicos
  position: relative
  width: 100%
  padding: 120px 60px 130px
  // continua o preto que o DivisorCurva deixa e escurece de leve até a próxima seção
  background: linear-gradient(to bottom, #000000 0%, #000000 58%, #01060f 100%)

  &__cabecalho
    max-width: 720px
    margin: 0 auto 68px
    text-align: center

  &__rotulo
    display: inline-flex
    align-items: center
    gap: 10px
    margin-bottom: 22px
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
    font-size: clamp(30px, 3.9vw, 54px)
    line-height: 1.1
    letter-spacing: -0.02em
    color: var(--cor-branco)

    // mesmo azul da linha do DivisorCurva e das bordas da nav, pra não inventar
    // um tom novo só aqui
    &--leve
      font-family: var(--light)
      color: #8aa6f0

  &__sub
    margin: 20px 0 0
    font-family: var(--light)
    font-size: 16px
    color: rgba(138, 166, 240, 0.72)

  &__grade
    display: grid
    grid-template-columns: repeat(3, 1fr)
    gap: 20px
    max-width: 1600px
    margin: 0 auto
    padding: 0
    list-style: none

.servico
  position: relative
  padding: 26px 26px 30px
  border: 1px solid rgba(255, 255, 255, 0.07)
  border-radius: 16px
  background: rgba(255, 255, 255, 0.022)
  transition: background 0.4s ease, border-color 0.4s ease

  &:hover
    background: rgba(125, 155, 255, 0.05)
    border-color: rgba(125, 155, 255, 0.2)

    .servico__chip
      border-color: rgba(125, 155, 255, 0.32)
      color: #a9c4ff

  &__chip
    display: flex
    align-items: center
    justify-content: center
    width: 44px
    height: 44px
    margin-bottom: 26px
    border: 1px solid rgba(255, 255, 255, 0.1)
    border-radius: 11px
    background: rgba(255, 255, 255, 0.04)
    color: var(--cor-branco)
    transition: border-color 0.4s ease, color 0.4s ease

    :deep(svg)
      width: 19px
      height: 19px

  &__numero
    position: absolute
    top: 30px
    right: 26px
    font-family: var(--light)
    font-size: 12px
    color: rgba(255, 255, 255, 0.3)

  &__titulo
    margin: 0 0 8px
    font-family: var(--semibold)
    font-size: 17px
    letter-spacing: -0.01em
    color: var(--cor-branco)

  &__texto
    margin: 0
    font-family: var(--light)
    font-size: 14.5px
    line-height: 1.55
    color: rgba(255, 255, 255, 0.5)

@media (max-width: 1100px)
  .servicos
    padding: 100px 32px 110px

    &__grade
      grid-template-columns: repeat(2, 1fr)

@media (max-width: 700px)
  .servicos
    padding: 80px 20px 90px

    &__cabecalho
      margin-bottom: 42px

    &__grade
      grid-template-columns: 1fr
</style>
