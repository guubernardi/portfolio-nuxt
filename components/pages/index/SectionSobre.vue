<template>
  <section class="sobre" ref="secaoRef" aria-label="Seção sobre mim">
    <div class="sobre__wrap">
      <h2 class="sobre__titulo" ref="tituloRef">Sobre mim</h2>

      <div class="sobre__conteudo">
        <div class="sobre__foto-wrap">
          <img class="sobre__foto" ref="fotoRef" src="/images/gustavo.png" alt="Foto de Gustavo Bernardi" />
        </div>

        <div class="sobre__texto" ref="textoRef">
          <p class="sobre__paragrafo">
            Sou estudante de Análise e Desenvolvimento de Sistemas (3º semestre) e desenvolvedor em formação com foco em <strong class="sobre__destaque">FrontEnd</strong>
          </p>
          <p class="sobre__paragrafo">
            Gosto de criar soluções web que unem <strong class="sobre__destaque">design limpo</strong>, <strong class="sobre__destaque">responsividade</strong> e <strong class="sobre__destaque">boa experiência do usuário</strong>.
          </p>
          <p class="sobre__paragrafo">
            Estou sempre aprimorando minhas habilidades para construir <strong class="sobre__destaque">interfaces modernas</strong> e consistentes, do layout à implementação.
          </p>

          <img class="sobre__teclado" ref="tecladoRef" src="/images/teclado.png" alt="" aria-hidden="true" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { gsap } from 'gsap'

const secaoRef = ref(null)
const tituloRef = ref(null)
const fotoRef = ref(null)
const textoRef = ref(null)
const tecladoRef = ref(null)
let floatTween = null
let glowTween = null

function iniciarGlow() {
  glowTween = gsap.to(tecladoRef.value, {
    filter: 'brightness(1.15)',
    duration: 2,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
    delay: 0.3,
  })
}

const aoEntrar = () => {
  floatTween?.pause()
  glowTween?.kill()
  gsap.to(tecladoRef.value, {
    scale: 1.05,
    filter: 'brightness(1.2)',
    duration: 0.3,
    ease: 'power2.out',
  })
}

const aoSair = () => {
  gsap.to(tecladoRef.value, {
    scale: 1,
    filter: 'brightness(1)',
    duration: 0.3,
    ease: 'power2.out',
    onComplete: () => {
      floatTween?.resume()
      iniciarGlow()
    },
  })
}

onMounted(() => {
  const teclado = tecladoRef.value
  const titulo = tituloRef.value
  const foto = fotoRef.value
  const paragrafos = textoRef.value?.querySelectorAll('p') || []

  gsap.set(titulo, { opacity: 0, y: -30 })
  gsap.set(foto, { opacity: 0, x: -50 })
  gsap.set(paragrafos, { opacity: 0, x: 40 })
  gsap.set(teclado, { opacity: 0, x: 80, filter: 'brightness(1)' })

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()

      gsap.to(titulo, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' })

      gsap.to(foto, { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out', delay: 0.15 })

      gsap.to(paragrafos, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.12,
        delay: 0.25,
      })

      gsap.to(teclado, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.4,
        onComplete: () => {
          floatTween = gsap.to(teclado, {
            y: -12,
            duration: 3,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
          })
          iniciarGlow()
        },
      })
    },
    { threshold: 0.2 }
  )

  if (secaoRef.value) observer.observe(secaoRef.value)

  teclado.addEventListener('mouseenter', aoEntrar)
  teclado.addEventListener('mouseleave', aoSair)
})

onBeforeUnmount(() => {
  floatTween?.kill()
  glowTween?.kill()
  const teclado = tecladoRef.value
  if (teclado) {
    teclado.removeEventListener('mouseenter', aoEntrar)
    teclado.removeEventListener('mouseleave', aoSair)
    gsap.killTweensOf(teclado)
  }
  gsap.killTweensOf(tituloRef.value)
  gsap.killTweensOf(fotoRef.value)
})
</script>

<style scoped lang="sass">
.sobre
  width: 100%
  height: 100vh
  background: radial-gradient(ellipse at 15% 50%, rgba(30, 58, 138, 0.25) 0%, transparent 55%), radial-gradient(ellipse at 80% 20%, rgba(96, 165, 250, 0.1) 0%, transparent 45%), radial-gradient(ellipse at 70% 80%, rgba(37, 99, 235, 0.15) 0%, transparent 40%), var(--cor-escuro-1)
  display: flex
  align-items: center
  position: relative

  &::after
    content: ''
    position: absolute
    bottom: 0
    left: 0
    width: 100%
    height: 160px
    background: linear-gradient(to bottom, transparent, #000000)
    pointer-events: none
    z-index: 1

  &__wrap
    width: 100%
    padding: 60px 148px
    display: flex
    flex-direction: column
    gap: 48px

    @media (max-width: 1200px)
      padding: 60px

    @media (max-width: 900px)
      padding: 60px 30px

    @media (max-width: 600px)
      padding: 60px 20px

  &__titulo
    font-family: var(--semibold)
    font-size: clamp(42px, 5vw, 72px)
    color: var(--cor-branco)
    text-align: center
    margin: 0
    letter-spacing: -1px

  &__conteudo
    display: flex
    align-items: center
    justify-content: space-between
    gap: 60px

  &__foto-wrap
    flex: 1
    display: flex
    align-items: flex-start
    margin-top: -40px

  &__foto
    width: 100%
    max-width: 290px
    border-radius: 16px
    display: block
    object-fit: cover
    box-shadow: 0 0 80px 20px rgba(96, 165, 250, 0.35)

  &__texto
    flex: 1
    display: flex
    flex-direction: column
    gap: 20px
    text-align: left
    padding-top: 40px

  &__paragrafo
    font-family: var(--light)
    font-size: var(--f2)
    color: rgba(255, 255, 255, 0.75)
    line-height: 1.7
    margin: 0

  &__destaque
    font-family: var(--semibold)
    font-weight: 800
    color: var(--cor-branco)

  &__teclado
    width: 420px
    margin-top: 0
    align-self: center
    user-select: none
    cursor: default

@media (max-width: 900px)
  .sobre__conteudo
    flex-direction: column
    align-items: flex-start
    gap: 40px

  .sobre__foto-wrap
    width: 200px

  .sobre__texto
    max-width: 100%

  .sobre__teclado
    width: 280px

@media (max-width: 600px)
  .sobre
    height: auto
    padding: 60px 0

  .sobre__teclado
    width: 200px
</style>
