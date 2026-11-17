<template>
  <!-- emenda entre duas seções da Home V2: a de cima vira o fundo e a de baixo
       sobe num arco. Mesma curva do DivisorCurva, sem o brilho -->
  <div class="divisor-arco" :style="{ background: topo }" aria-hidden="true">
    <svg viewBox="0 0 1440 110" preserveAspectRatio="none">
      <path d="M0 80C400 12 1040 12 1440 80V110H0Z" :fill="base" />
    </svg>
  </div>
</template>

<script setup>
defineProps({
  // cor da seção de cima
  topo: { type: String, required: true },
  // cor da seção de baixo, que sobe no arco
  base: { type: String, required: true },
})
</script>

<style lang="sass" scoped>
.divisor-arco
  width: 100%
  line-height: 0
  // 1px de sobreposição evita a fresta de sub-pixel na emenda
  margin: -1px 0

  svg
    display: block
    width: 100%
    height: clamp(48px, 7.6vw, 110px)
</style>
