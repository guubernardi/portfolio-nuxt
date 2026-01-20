<template>
  <button
    class="botao"
    type="button"
    :disabled="carregando || disabled"
    :aria-busy="carregando ? 'true' : 'false'"
    @click="handleClick"
  >
    <span v-if="icone" class="icone" aria-hidden="true">
      <Svgs :nome="icone" />
    </span>

    <span class="txt">{{ texto }}</span>

    <span v-if="tagTexto" class="tag">{{ tagTexto }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  texto: { type: String, required: true },
  carregando: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },

  icone: { type: String, default: 'check' },

  tag: { type: String, default: '' },


  scrollPara: { type: String, default: '' },


  scrollOffset: { type: Number, default: 0 }
})

const emit = defineEmits<{
  (e: 'click', ev: MouseEvent): void
  (e: 'scroll', selector: string): void
}>()

let storePortifolio: any = null
try {
  // @ts-ignore
  storePortifolio = typeof useStorePortifolio === 'function' ? useStorePortifolio() : null
} catch (e) {
  storePortifolio = null
}

const tagTexto = computed(() => {
  if (props.tag && String(props.tag).trim()) return String(props.tag).trim()

  const lote = storePortifolio?.lote
  return lote ? String(lote).toUpperCase() : ''
})

function scrollPara(seletor: string) {
  const alvo = document.querySelector(seletor)
  if (!alvo) return

  if (props.scrollOffset) {
    const top = (alvo as HTMLElement).getBoundingClientRect().top + window.scrollY - props.scrollOffset
    window.scrollTo({ top, behavior: 'smooth' })
    return
  }

  alvo.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function handleClick(ev: MouseEvent) {
  if (props.carregando || props.disabled) return

  emit('click', ev)

  if (props.scrollPara && String(props.scrollPara).trim()) {
    scrollPara(String(props.scrollPara).trim())
    emit('scroll', String(props.scrollPara).trim())
  }
}
</script>

<style lang="sass" scoped>
button
  display: flex
  align-items: center
  justify-content: center
  gap: 10px
  padding: 10px 25px 10px 10px
  border-radius: 50px
  background: linear-gradient(90deg, #3C3A37, #FFB12B)

  &:hover
    .icone
      background-color: #3C3A37

    span
      background-color: var(--cor-dourado-escuro-2)
      color: var(--cor-dourado)

    :deep(svg)
      fill: #FFB12B
      width: 30px
      height: 30px

  .icone
    display: flex
    align-items: center
    justify-content: center
    width: 50px
    height: 50px
    border-radius: 50%
    background-color: #191B1D
    transition: all 0.3s
    
    :deep(svg)
      width: auto
      height: auto
      fill: #FFB12B
      transition: all 0.3s

  p
    font-family: var(--semibold)
    font-size: var(--f2)
    color: var(--cor-branco)

  span
    font-family: var(--semibold)
    font-size: var(--f2)
    color: var(--cor-branco)
    background-color: (--cor-dourado)
    padding: 5px 10px
    border-radius: 50px
    transition: all 0.3s

@media screen and (max-width: 1000px)
  button
    padding: 8px 20px 8px 8px

    .icone
      width: 40px
      height: 40px

      :deep(svg)
        width: 15px
        height: 15px
</style>
