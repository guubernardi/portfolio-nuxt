<template>
  <div class="divisor" :style="{ background: corTopo }" aria-hidden="true">
    <svg viewBox="0 0 1440 110" preserveAspectRatio="none">
      <defs>
        <!-- a luz nasce no centro e some nas pontas, senão a curva vira um traço chapado -->
        <linearGradient :id="`${uid}-brilho`" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#7da2ff" stop-opacity="0" />
          <stop offset="26%" stop-color="#7da2ff" stop-opacity="0.45" />
          <stop offset="50%" stop-color="#ffffff" stop-opacity="0.92" />
          <stop offset="74%" stop-color="#7da2ff" stop-opacity="0.45" />
          <stop offset="100%" stop-color="#7da2ff" stop-opacity="0" />
        </linearGradient>

        <filter :id="`${uid}-bloom`" x="-10%" y="-400%" width="120%" height="900%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      <path :d="area" :fill="cor" />

      <!-- traço largo e desfocado por baixo faz o halo; o fino por cima é o núcleo -->
      <path
        :d="curva"
        fill="none"
        :stroke="`url(#${uid}-brilho)`"
        stroke-width="7"
        :filter="`url(#${uid}-bloom)`"
        opacity="0.5"
      />
      <path
        :d="curva"
        fill="none"
        :stroke="`url(#${uid}-brilho)`"
        stroke-width="1.4"
      />
    </svg>
  </div>
</template>

<script setup>
defineProps({
  // cor da seção de baixo (preenchimento abaixo da curva)
  cor: { type: String, default: 'var(--cor-escuro-1)' },
  // cor da seção de cima (fundo acima da curva)
  corTopo: { type: String, default: 'var(--cor-escuro-1)' },
})

// ids de gradiente/filtro precisam ser únicos: dois divisores na mesma página
// compartilhariam a definição e um sobrescreveria o outro
let contador = 0
const uid = `divisor-${++contador}-${Math.random().toString(36).slice(2, 7)}`

const curva = 'M0,80 C 400,12 1040,12 1440,80'
const area = `${curva} L1440,110 L0,110 Z`
</script>

<style lang="sass" scoped>
.divisor
  position: relative
  z-index: 2
  width: 100%
  line-height: 0
  // 1px de sobreposição dos dois lados evita fresta de sub-pixel na emenda
  margin-top: -1px
  margin-bottom: -1px

  svg
    display: block
    width: 100%
    height: clamp(54px, 6.5vw, 110px)
    overflow: visible
</style>
