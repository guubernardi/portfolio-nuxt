<template>
    <div
      v-if="visivel"
      class="preloader"
      :class="{ 'is-leaving': saindo }"
      aria-label="Carregando"
      role="status"
    >
      <div class="inner">
        <h1 class="nome">{{ nome }}</h1>
        <p class="cargo">{{ cargo }}</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onBeforeUnmount, onMounted, ref } from 'vue'
  
  const props = defineProps<{
    nome?: string
    cargo?: string
  }>()
  
  const nome = props.nome ?? 'GUSTAVO BERNARDI'
  const cargo = props.cargo ?? 'DESENVOLVEDOR WEB'
  
  const visivel = ref(true)
  const saindo = ref(false)
  
  const MIN_SHOW_MS = 900 // garante que você VEJA o preloader
  const startAt = performance.now()
  
  let safetyTimer: number | null = null
  let removedTimer: number | null = null
  
  function finalizar() {
    if (!visivel.value || saindo.value) return
  
    const elapsed = performance.now() - startAt
    const wait = Math.max(0, MIN_SHOW_MS - elapsed)
  
    window.setTimeout(() => {
      saindo.value = true
  
      removedTimer = window.setTimeout(() => {
        visivel.value = false
      }, 650)
    }, wait)
  }
  
  function onLoad() {
    finalizar()
  }
  
  onMounted(() => {
    // se já carregou (cache), ainda segura pelo MIN_SHOW_MS
    if (document.readyState === 'complete') finalizar()
    else window.addEventListener('load', onLoad, { once: true })
  
    // plano B: nunca travar a tela
    safetyTimer = window.setTimeout(finalizar, 2500)
  })
  
  onBeforeUnmount(() => {
    window.removeEventListener('load', onLoad)
    if (safetyTimer) window.clearTimeout(safetyTimer)
    if (removedTimer) window.clearTimeout(removedTimer)
  })
  </script>
  
  <style scoped>
  .preloader {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: grid;
    place-items: center;
    background: #050505;
    overflow: hidden;
    opacity: 1;
    transform: translateY(0);
    transition: opacity 650ms ease, transform 650ms ease;
    font-family: var(--bold);
  }
  
  /* saída */
  .preloader.is-leaving {
    opacity: 0;
    transform: translateY(-10px);
    pointer-events: none;
  }
  
  /* leve vinheta pra ficar premium */
  .preloader::before {
    content: "";
    position: absolute;
    inset: -20%;
    background: radial-gradient(circle at center, rgba(255,255,255,0.03), rgba(0,0,0,0) 55%);
    pointer-events: none;
  }
  
  .inner {
    position: relative;
    text-align: center;
    padding: 24px;
    max-width: 92vw;
  }
  
  /* NOME (igual print) */
  .nome {
    margin: 0;
    color: #ffffff;
    text-transform: uppercase;
    letter-spacing: 0.28em;
    font-weight: 700;
    line-height: 1.05;
  
    /* responsivo e grande */
    font-size: clamp(28px, 4.2vw, 58px);
  
    opacity: 0;
    transform: translateY(10px);
    animation: nomeIn 700ms ease forwards;
  }
  
  /* CARGO (dourado/laranja) */
  .cargo {
    margin: 18px 0 0;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    font-weight: 700;
    font-size: clamp(12px, 1.4vw, 16px);
    color: #f2a900;
  
    opacity: 0;
    transform: translateY(10px);
    animation: cargoIn 700ms ease forwards;
    animation-delay: 180ms;
  }
  
  @keyframes nomeIn {
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes cargoIn {
    to { opacity: 1; transform: translateY(0); }
  }
  
  @media (prefers-reduced-motion: reduce) {
    .nome, .cargo {
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
  }
</style>
  