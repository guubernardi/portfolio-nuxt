<template>
  <div id="smooth-wrapper">
    <div id="smooth-content">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

// O smoother vive só enquanto este layout está montado: ao navegar para uma
// página sem layout, ele é destruído junto, em vez de ficar preso a um wrapper
// que já saiu da tela.
onMounted(() => {
  // Celular e tablet ficam com a rolagem nativa. O ScrollSmoother move a página
  // inteira como um bloco só, via transform: no iPhone isso vira uma camada de
  // GPU com a altura da página toda, e junto com os brilhos e vidros a aba
  // estourava a memória do Safari. isTouch === 1 é aparelho só de toque;
  // notebook com tela de toque (2) mantém.
  if (ScrollTrigger.isTouch === 1) return

  ScrollSmoother.create({
    wrapper: '#smooth-wrapper',
    content: '#smooth-content',
    smooth: 1.5,
    effects: true,
  })
  // as seções montam antes do layout, então os gatilhos delas nasceram antes
  // do smoother existir: recalcula com ele no lugar
  ScrollTrigger.refresh()
})

onBeforeUnmount(() => ScrollSmoother.get()?.kill())
</script>

<style lang="sass" scoped>
#smooth-wrapper
  overflow: hidden
  width: 100%

#smooth-content
  width: 100%
</style>
