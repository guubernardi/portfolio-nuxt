<template>
  <!-- Topo das páginas internas da V2: o mesmo fundo do topo da home (marinho,
       brilho elétrico e grade), título gigante em duas linhas e um lado direito
       livre (ficha do case, formulário do contato, figurinhas) -->
  <header ref="raiz" class="topo" :class="{ 'topo--com-lado': $slots.lado }">
    <NavTopo />

    <div class="topo__grade v2-conteudo">
      <div class="topo__texto">
        <nav v-if="trilha?.length" class="topo__trilha" aria-label="Você está em">
          <template v-for="(item, i) in trilha" :key="item.rotulo">
            <NuxtLink v-if="item.para" :to="item.para">{{ item.rotulo }}</NuxtLink>
            <span v-else aria-current="page">{{ item.rotulo }}</span>
            <span v-if="i < trilha.length - 1" aria-hidden="true">/</span>
          </template>
        </nav>

        <slot name="antes-do-titulo">
          <p v-if="rotulo" class="topo__rotulo">{{ rotulo }}</p>
        </slot>

        <h1 class="topo__titulo" :class="`topo__titulo--${tamanho}`">
          <span>{{ linha1 }}</span>
          <em v-if="linha2">{{ linha2 }}</em>
        </h1>

        <p v-if="texto" class="topo__descricao">{{ texto }}</p>

        <div v-if="$slots.acoes" class="topo__acoes">
          <slot name="acoes" />
        </div>
      </div>

      <div v-if="$slots.lado" class="topo__lado">
        <slot name="lado" />
      </div>
    </div>

    <!-- figurinhas: decoração, posicionadas no canto direito -->
    <div v-if="figurinha || adesivo" class="topo__cenario" aria-hidden="true">
      <span v-if="adesivo" class="topo__adesivo">{{ adesivo }}</span>
      <span v-if="figurinha" class="topo__figurinha">
        <img src="/images/home/logo-figurinha.svg" alt="" width="74" height="80" />
      </span>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { gsap } from 'gsap'
import NavTopo from '~/components/global/nav/NavTopo.vue'
import { useAnimacoes } from '~/composables/useAnimacoes'

defineProps({
  rotulo: { type: String, default: '' },
  linha1: { type: String, required: true },
  linha2: { type: String, default: '' },
  texto: { type: String, default: '' },
  trilha: { type: Array, default: null },
  // 'grande' para títulos curtos (Projetos, Contato), 'medio' para os longos
  tamanho: { type: String, default: 'grande' },
  figurinha: { type: Boolean, default: false },
  adesivo: { type: String, default: '' },
})

const raiz = ref(null)

// O título e o texto entram em CSS (são o LCP da página). O GSAP cuida do lado
// direito e das figurinhas, que podem esperar o JS.
useAnimacoes(raiz, ({ movimento, mesa }, el) => {
  if (!movimento) return

  const lado = el.querySelector('.topo__lado')
  if (lado) gsap.from(lado, { y: 60, rotation: 6, autoAlpha: 0, duration: 1.1, delay: 0.35, ease: 'back.out(1.3)' })

  const cenario = el.querySelector('.topo__cenario')
  if (!cenario || !mesa) return

  const figurinha = cenario.querySelector('.topo__figurinha')
  const adesivo = cenario.querySelector('.topo__adesivo')
  const boia = figurinha && gsap.to(figurinha, { rotation: '-=8', y: -10, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1, paused: true })
  const tl = gsap.timeline({ delay: 0.45, defaults: { ease: 'back.out(2)' }, onComplete: () => boia?.play() })
  if (figurinha) tl.from(figurinha, { scale: 0.3, rotation: -40, autoAlpha: 0, duration: 1 })
  if (adesivo) tl.from(adesivo, { scale: 0, rotation: -30, duration: 0.7 }, 0.3)
})
</script>

<style scoped lang="sass">
.topo
  position: relative
  overflow: hidden
  padding: 168px 0 150px
  color: #fff
  background-color: var(--marinho)
  background-image: radial-gradient(ellipse 60% 70% at 40% 45%, rgba(7, 177, 232, 0.28), rgba(7, 177, 232, 0) 100%), linear-gradient(to right, rgba(243, 247, 249, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(243, 247, 249, 0.08) 1px, transparent 1px)
  background-size: 100% 100%, 96px 96px, 96px 96px
  background-position: 0 0, -1px -1px, -1px -1px

  &__grade
    position: relative
    z-index: 2

  &--com-lado &__grade
    display: grid
    grid-template-columns: minmax(0, 1fr) minmax(0, 480px)
    align-items: center
    gap: 56px

  &__trilha
    display: flex
    flex-wrap: wrap
    gap: 8px
    margin-bottom: 28px
    font-family: var(--figtree)
    font-size: 14px
    color: rgba(255, 255, 255, 0.7)
    animation: entrar 0.7s cubic-bezier(0.22, 1, 0.36, 1) both

    a
      color: inherit
      text-decoration: none

      &:hover
        color: #fff
        text-decoration: underline

    [aria-current]
      color: #fff

  &__rotulo
    margin: 0 0 20px
    font-family: var(--figtree)
    font-weight: 700
    font-size: 14px
    letter-spacing: 0.18em
    text-transform: uppercase
    color: rgba(255, 255, 255, 0.85)
    animation: entrar 0.7s cubic-bezier(0.22, 1, 0.36, 1) both

  &__titulo
    margin: 0
    font-family: var(--figtree)
    font-weight: 900
    letter-spacing: -0.03em
    line-height: 0.92
    text-transform: uppercase
    animation: entrar 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both

    span, em
      display: block

    em
      font-style: normal
      color: var(--ciano)

    &--grande
      font-size: clamp(42px, 7.2vw, 104px)

    // títulos longos (serviços, cases) quebram antes de chegar nas figurinhas
    // da direita, como no Figma: "SITE PARA PSICÓLOGO / QUE MARCA A / ..."
    &--medio
      max-width: 940px
      font-size: clamp(36px, 5.2vw, 76px)

  &__descricao
    max-width: 560px
    margin: 32px 0 0
    font-family: var(--figtree)
    font-size: clamp(16px, 1.3vw, 19px)
    line-height: 1.55
    color: rgba(255, 255, 255, 0.85)
    animation: entrar 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.22s both

  &__acoes
    display: flex
    flex-wrap: wrap
    gap: 12px
    margin-top: 32px
    animation: entrar 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.32s both

  &__lado
    position: relative

  // ===== figurinhas =====
  &__cenario
    position: absolute
    top: 0
    left: 0
    right: 0
    z-index: 1
    max-width: 1440px
    height: 100%
    margin: 0 auto
    pointer-events: none

  &__figurinha
    position: absolute
    top: 190px
    right: 110px
    display: flex
    align-items: center
    justify-content: center
    width: 150px
    height: 150px
    border: 4px solid var(--abismo)
    border-radius: 34px
    background: #fff
    box-shadow: 0 16px 30px rgba(5, 13, 51, 0.35)
    transform: rotate(12deg)

    img
      width: 74px
      height: auto

  // logo abaixo da figurinha: ao lado dela, encostava no fim do título longo
  &__adesivo
    position: absolute
    top: 360px
    right: 130px
    z-index: 1
    padding: 12px 22px
    border: 3px solid var(--abismo)
    border-radius: 999px
    background: var(--ciano)
    font-family: var(--figtree)
    font-weight: 800
    font-size: 18px
    color: var(--abismo)
    white-space: nowrap
    transform: rotate(-8deg)

@keyframes entrar
  from
    opacity: 0
    transform: translateY(24px)

@media (prefers-reduced-motion: reduce)
  .topo__trilha, .topo__rotulo, .topo__titulo, .topo__descricao, .topo__acoes
    animation: none

// as figurinhas encostam no título abaixo de 1240
@media (max-width: 1240px)
  .topo__cenario
    display: none

@media (max-width: 1000px)
  .topo--com-lado .topo__grade
    grid-template-columns: 1fr

@media (max-width: 760px)
  .topo
    padding: 128px 0 110px

  .topo__acoes :deep(.v2-botao)
    width: 100%
</style>
