<template>
  <section ref="secaoRef" class="contato" aria-label="Contato">
    <div ref="painelRef" class="contato__painel">
      <span class="contato__rotulo">
        <b>06</b>
        Contato
      </span>

      <h2 class="contato__titulo">
        Tem um projeto em mente?<br />
        <span class="contato__titulo--leve">Vamos conversar.</span>
      </h2>

      <p class="contato__texto">
        Manda uma mensagem contando o que você precisa. Sem formulário longo e sem compromisso.
      </p>

      <a class="contato__cta" :href="linkWhatsapp" target="_blank" rel="noopener">
        Chamar no WhatsApp
        <SvgIcone nome="seta-direita" />
      </a>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const linkWhatsapp = 'https://wa.me/5511977912709?text=' +
  encodeURIComponent('Olá! Vim pelo site e gostaria de um orçamento para um projeto.')

const secaoRef = ref(null)
const painelRef = ref(null)

let contexto = null

onMounted(() => {
  contexto = gsap.context(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(painelRef.value, {
        autoAlpha: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: secaoRef.value, start: 'top 80%' },
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
.contato
  position: relative
  width: 100%
  // 1px de sobreposição: evita a fresta de sub-pixel na emenda com os cases
  margin-top: -1px
  padding: 130px 60px 140px
  // começa na cor em que o FAQ termina e volta ao preto do footer, fechando a página
  background: linear-gradient(to bottom, #041229 0%, #030d1f 30%, #01060f 70%, #000000 100%)

  // brilho atrás do painel, na mesma família de luz do hero
  &::before
    content: ''
    position: absolute
    top: 50%
    left: 50%
    width: min(1000px, 110%)
    height: min(560px, 90%)
    transform: translate(-50%, -50%)
    border-radius: 50%
    background: radial-gradient(ellipse at center, rgba(45, 85, 190, 0.3) 0%, rgba(30, 60, 140, 0.1) 45%, transparent 72%)
    filter: blur(70px)
    pointer-events: none

  &__painel
    position: relative
    z-index: 1
    display: flex
    flex-direction: column
    align-items: center
    max-width: 820px
    margin: 0 auto
    padding: 72px 60px 66px
    border: 1px solid rgba(125, 155, 255, 0.16)
    border-radius: 22px
    background: rgba(255, 255, 255, 0.025)
    backdrop-filter: blur(14px)
    -webkit-backdrop-filter: blur(14px)
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
    max-width: 470px
    margin: 20px 0 0
    font-family: var(--light)
    font-size: 16px
    line-height: 1.6
    color: rgba(255, 255, 255, 0.55)

  &__cta
    display: inline-flex
    align-items: center
    gap: 12px
    margin-top: 38px
    padding: 17px 34px
    border-radius: 12px
    background: var(--cor-azul-forte)
    font-family: var(--semibold)
    font-size: 15px
    line-height: 1
    color: var(--cor-branco)
    text-decoration: none
    transition: background 0.4s ease

    &:hover
      background: #2c1fd6

      :deep(svg)
        transform: translateX(4px)

    :deep(svg)
      display: block
      width: 15px
      height: 15px
      transition: transform 0.4s ease

@media (max-width: 820px)
  .contato
    padding: 90px 20px 100px

    &__painel
      padding: 52px 26px 48px

    &__cta
      width: 100%
      justify-content: center
</style>
