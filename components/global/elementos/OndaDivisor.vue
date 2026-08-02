<template>
  <div class="onda" :class="{ invertida }" :style="{ backgroundColor: cor }">
    <svg viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
      <!-- banda de cima (cor da seção acima); embaixo aparece o fundo do
           container (cor da seção abaixo). Assim as duas bordas do divisor
           batem exatamente com a cor da seção vizinha, sem emenda visível. -->
      <path
        :fill="corTopo"
        d="M0,0 L1440,0 L1440,28 C1040,112 400,112 0,28 Z"
      />
    </svg>
  </div>
</template>

<script setup>
defineProps({
  // cor da seção de baixo (fundo do container / preenchimento do vale da onda)
  cor: { type: String, default: 'var(--cor-escuro-1)' },
  // cor da seção de cima (banda superior da onda)
  corTopo: { type: String, default: 'transparent' },
  // inverte a curva verticalmente
  invertida: { type: Boolean, default: false },
})
</script>

<style lang="sass" scoped>
.onda
  width: 100%
  line-height: 0
  display: block
  // 1px de sobreposição nos dois lados evita qualquer fresta de sub-pixel;
  // como as cores batem com as seções vizinhas, a sobreposição é invisível
  margin-top: -1px
  margin-bottom: -1px

  svg
    display: block
    width: 100%
    height: clamp(50px, 6vw, 110px)

  &.invertida svg
    transform: rotate(180deg)
</style>
