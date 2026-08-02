<template>
  <button class="botao-azul" type="button" @click="$emit('click', $event)">
    <Svgs v-if="icone" :nome="icone" />
    {{ texto }}
  </button>
</template>

<script setup lang="ts">
import Svgs from '../svgs/Svgs.vue'

defineProps({
  texto: { type: String, required: true },
  icone: { type: String, default: '' },
})

defineEmits<{ (e: 'click', ev: MouseEvent): void }>()
</script>

<style scoped lang="sass">
.botao-azul
  display: flex
  align-items: center
  justify-content: center
  gap: 12px
  padding: 16px 40px
  border: none
  border-radius: 32px
  color: white
  font-family: var(--light)
  font-size: 16px
  cursor: pointer
  // degradê suave e uniforme (indigo -> azul), numa direção só; hover só desliza pro azul
  background: linear-gradient(120deg, var(--cor-azul-forte) 0%, var(--cor-azul-claro) 100%)
  background-size: 150% 100%
  background-position: 0% center
  box-shadow: 0 8px 24px rgba(25, 15, 163, 0.4)
  transition: background-position 0.5s ease, box-shadow 0.3s ease
  &:hover
    background-position: 100% center

  :deep(svg)
    width: 18px
    height: 18px
</style>
