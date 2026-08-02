<template>
  <Teleport to="body">
    <div ref="el" class="preloader">
      <div ref="conteudo" class="preloader__conteudo">
        <svg ref="svgRef" class="preloader__logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 51 55" fill="none">
          <path class="lp lp--fill" fill-rule="evenodd" clip-rule="evenodd" d="M19 53.5V25.5H26V32.5H39.5H40.5L42.5 30.5V28.5L41 26.5L40 26H37V19H44L49.5 24.5L50 25V33L46.5 36.5L49.5 39.5L50 40V47.5L49.5 48L49 48.5L43.5 54H43H19V53.5ZM43 42.5L40.5 40H40H26V47H40.5L43 44.5V42.5Z" fill="white"/>
          <path class="lp lp--fill" d="M35 12.5H27.5V11L24.5 8H11L8 11V27L11.5 30.5H16.5V38H8.5L0.5 30V8L8 0.5H27.5L34.5 7L35 7.5V12.5Z" fill="white"/>
          <rect class="lp lp--fill" x="13.5" y="16.5" width="18" height="7" fill="white"/>
          <path class="lp lp--stroke" d="M27.5 31V23.5L25.5 23.4286L13.5 23V16H24H34H34.5V31H28" stroke="white" stroke-width="0.8" fill="none"/>
          <path class="lp lp--stroke" d="M28 27L28.5 23.5H29.5L29 25L28 27.5" stroke="white" stroke-width="0.5" fill="none"/>
          <path class="lp lp--stroke" d="M28 29L32 16.5H33H33.5L29.5 25.5L32.5 17L28 30" stroke="white" stroke-width="0.5" fill="none"/>
          <rect class="lp lp--fill" x="32.5" y="16.5" width="1" height="1" fill="white"/>
        </svg>

        <div ref="textoRef" class="preloader__texto">
          <span class="preloader__nome">{{ nome }}</span>
          <span class="preloader__cargo">{{ cargo }}</span>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

defineProps({
  nome: String,
  cargo: String,
})

const { $emitter } = useNuxtApp()

const el = ref(null)
const conteudo = ref(null)
const svgRef = ref(null)
const textoRef = ref(null)

onMounted(() => {
  const fills = svgRef.value.querySelectorAll('.lp--fill')
  const strokes = svgRef.value.querySelectorAll('.lp--stroke')

  gsap.set(svgRef.value, { scale: 0.8, opacity: 0 })
  gsap.set(fills, { opacity: 0 })
  gsap.set(textoRef.value, { opacity: 0, y: 12 })

  strokes.forEach((p) => {
    if (p.getTotalLength) {
      const len = p.getTotalLength()
      gsap.set(p, { strokeDasharray: len, strokeDashoffset: len })
    }
  })

  document.body.style.overflow = 'hidden'

  const tl = gsap.timeline({
    onComplete() {
      gsap.to(el.value, {
        opacity: 0,
        duration: 0.55,
        ease: 'power2.inOut',
        onComplete() {
          el.value.style.display = 'none'
          document.body.style.overflow = ''
          // libera as animações de entrada das seções (ex.: hero)
          window.__preloaderFinalizado = true
          $emitter.emit('preloader:fim')
        },
      })
    },
  })

  tl.to(svgRef.value, { scale: 1, opacity: 1, duration: 0.55, ease: 'power3.out' })
    .to(fills, { opacity: 1, duration: 0.45, stagger: 0.07, ease: 'power2.out' }, '-=0.15')
    .to(strokes, { strokeDashoffset: 0, duration: 0.55, stagger: 0.1, ease: 'power2.inOut' }, '-=0.3')
    .to(textoRef.value, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2')
    .to({}, { duration: 0.5 })
})
</script>

<style lang="sass">
.preloader
  position: fixed !important
  top: 0 !important
  left: 0 !important
  right: 0 !important
  bottom: 0 !important
  z-index: 99999 !important
  background: #050505 !important
  display: flex
  align-items: center
  justify-content: center

  &__conteudo
    display: flex
    flex-direction: column
    align-items: center
    gap: 28px

  &__logo
    width: 90px
    height: auto
    filter: drop-shadow(0 0 28px rgba(255, 255, 255, 0.2))

  &__texto
    display: flex
    flex-direction: column
    align-items: center
    gap: 6px

  &__nome
    font-family: var(--semibold)
    font-size: 18px
    letter-spacing: 4px
    color: rgba(255, 255, 255, 0.9)
    text-transform: uppercase

  &__cargo
    font-family: var(--light)
    font-size: 11px
    letter-spacing: 3px
    color: rgba(255, 255, 255, 0.4)
    text-transform: uppercase
</style>
