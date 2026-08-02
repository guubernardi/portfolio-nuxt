<template>
  <section ref="secaoRef" class="diferenciais" aria-label="Por que trabalhar com a gente">
    <div ref="cabecalhoRef" class="diferenciais__cabecalho">
      <span class="diferenciais__rotulo">
        <b>04</b>
        Por que nós
      </span>

      <h2 class="diferenciais__titulo">
        Sem intermediário.<br />
        <span class="diferenciais__titulo--leve">Sem template.</span>
      </h2>

      <p class="diferenciais__texto">
        Você conversa com quem escreve o código, do primeiro rascunho ao deploy.
      </p>
    </div>

    <ul ref="faixaRef" class="faixa">
      <li v-for="item in itens" :key="item.rotulo" class="faixa__celula">
        <span class="faixa__valor">{{ item.valor }}</span>
        <span class="faixa__rotulo">{{ item.rotulo }}</span>
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
const faixaRef = ref(null)

let contexto = null

const itens = [
  { valor: 'Direto', rotulo: 'com quem programa' },
  { valor: '24h', rotulo: 'pra responder' },
  { valor: 'Zero', rotulo: 'template ou construtor' },
  { valor: 'Seu', rotulo: 'o código e os acessos' },
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

      gsap.from(faixaRef.value?.children ?? [], {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: faixaRef.value, start: 'top 86%' },
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
.diferenciais
  position: relative
  width: 100%
  margin-top: -1px
  padding: 120px 60px 120px
  background: linear-gradient(to bottom, #051a39 0%, #04142e 100%)

  &__cabecalho
    max-width: 720px
    margin: 0 auto 56px
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
    font-size: clamp(28px, 3.6vw, 48px)
    line-height: 1.12
    letter-spacing: -0.02em
    color: var(--cor-branco)

    &--leve
      font-family: var(--light)
      color: #8aa6f0

  &__texto
    max-width: 480px
    margin: 20px auto 0
    font-family: var(--light)
    font-size: 16px
    line-height: 1.6
    color: rgba(255, 255, 255, 0.55)

.faixa
  display: grid
  grid-template-columns: repeat(4, 1fr)
  // mesmo grid de 1600px do Processo, Projetos e da nav
  max-width: 1600px
  margin: 0 auto
  padding: 0
  border: 1px solid rgba(255, 255, 255, 0.08)
  border-radius: 18px
  background: rgba(255, 255, 255, 0.022)
  list-style: none
  overflow: hidden

  &__celula
    display: flex
    flex-direction: column
    gap: 10px
    padding: 42px 34px
    // divisória entre colunas em vez de gap: mantém a faixa como peça única
    border-left: 1px solid rgba(255, 255, 255, 0.08)

    &:first-child
      border-left: none

  &__valor
    font-family: var(--semibold)
    font-size: clamp(30px, 3vw, 44px)
    line-height: 1
    letter-spacing: -0.02em
    color: var(--cor-branco)

  &__rotulo
    font-family: var(--light)
    font-size: 14.5px
    line-height: 1.4
    color: rgba(255, 255, 255, 0.5)

@media (max-width: 900px)
  .diferenciais
    padding: 90px 20px 90px

    &__cabecalho
      margin-bottom: 40px

  .faixa
    grid-template-columns: repeat(2, 1fr)

    &__celula
      padding: 32px 26px

      // com duas colunas, quem começa linha nova não pode ter divisória à esquerda
      &:nth-child(odd)
        border-left: none

      &:nth-child(n + 3)
        border-top: 1px solid rgba(255, 255, 255, 0.08)

@media (max-width: 520px)
  .faixa
    grid-template-columns: 1fr

    &__celula
      border-left: none

      &:not(:first-child)
        border-top: 1px solid rgba(255, 255, 255, 0.08)
</style>
