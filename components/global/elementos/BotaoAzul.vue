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
  background: linear-gradient(90deg, var(--cor-azul-medio) 0%, var(--cor-azul-escuro-2) 50%, var(--cor-azul-forte) 100%)
  background-size: 200% 100%
  background-position: left center
  transition: background-position 0.5s ease
  &:hover
    background-position: right center

  :deep(svg)
    width: 18px
    height: 18px
</style>
