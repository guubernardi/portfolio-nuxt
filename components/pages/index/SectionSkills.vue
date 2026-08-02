<template>
  <section class="skills" ref="secSkills" aria-label="Seção de skills">
    <div class="skills__titulo" data-anim>
      <h2>Skills</h2>
      <p>Tecnologias que aplico em meus projetos</p>
    </div>

    <div class="skills__grid">
      <div
        v-for="skill in skills"
        :key="skill.nome"
        class="card"
        :class="`card--span${skill.span}`"
        :style="{ '--c': skill.cor }"
        data-anim
      >
        <div class="card__icone">
          <Svgs :nome="skill.icon" />
        </div>
        <span class="card__nome">{{ skill.nome }}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { gsap } from 'gsap'
import Svgs from '../../global/svgs/Svgs.vue'

interface Skill {
  nome: string
  icon: string
  cor: string
  span: 1 | 2
}

const skills: Skill[] = [
  { nome: 'HTML 5', icon: 'html', cor: '#33A0FF', span: 2 },
  { nome: 'CSS 3', icon: 'css', cor: '#FFB12B', span: 2 },
  { nome: 'JavaScript', icon: 'javascript', cor: '#6A3EF8', span: 1 },
  { nome: 'TypeScript', icon: 'typescript', cor: '#0069FF', span: 1 },
  { nome: 'ReactJS', icon: 'react', cor: '#61DAFB', span: 1 },
  { nome: 'Sass', icon: 'sass', cor: '#CD6799', span: 1 },
  { nome: 'NuxtJS', icon: 'nuxtjs', cor: '#00DC82', span: 2 },
  { nome: 'Figma', icon: 'figma', cor: '#A259FF', span: 2 },
]

const secSkills = ref<HTMLElement | null>(null)
let io: IntersectionObserver | null = null

function configurarAnimacoesScroll() {
  const root = secSkills.value
  if (!root) return

  const els = Array.from(root.querySelectorAll<HTMLElement>('[data-anim]'))

  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
  if (reduce || !('IntersectionObserver' in window)) {
    gsap.set(els, { opacity: 1, y: 0 })
    return
  }

  gsap.set(els, { opacity: 0, y: 18 })

  io = new IntersectionObserver(
    (entries) => {
      const visiveis = entries.filter((e) => e.isIntersecting)
      if (!visiveis.length) return

      visiveis.forEach((entry, i) => {
        const el = entry.target as HTMLElement
        io?.unobserve(el)

        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: i * 0.05,
          ease: 'power3.out',
          // clearProps evita a linha verde de 1px (camada de GPU) no Chrome
          clearProps: 'transform',
        })
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
  )

  els.forEach((el) => io?.observe(el))
}

onMounted(async () => {
  await nextTick()
  configurarAnimacoesScroll()
})

onBeforeUnmount(() => {
  io?.disconnect()
  io = null
})
</script>

<style lang="sass" scoped>
section.skills
  display: flex
  flex-direction: column
  align-items: center
  width: 100%
  position: relative
  background: var(--cor-azul-escuro)
  padding: 70px 0 100px

  .skills__titulo
    display: flex
    flex-direction: column
    align-items: center
    text-align: center
    gap: 16px
    padding: 0 30px 56px

    h2
      font-family: var(--bold)
      font-size: var(--f10)
      line-height: 1
      background: linear-gradient(180deg, var(--cor-branco), var(--cor-azul-claro))
      -webkit-background-clip: text
      -webkit-text-fill-color: transparent
      background-clip: text

    p
      font-family: var(--light)
      font-size: var(--f2)
      color: var(--cor-cinza)
      line-height: 1.5
      max-width: 500px

  .skills__grid
    width: 100%
    padding: 0 148px
    display: grid
    grid-template-columns: repeat(4, 1fr)
    gap: 20px

    @media (max-width: 1200px)
      padding: 0 60px

    @media (max-width: 900px)
      padding: 0 30px
      grid-template-columns: repeat(2, 1fr)

    @media (max-width: 600px)
      padding: 0 20px
      grid-template-columns: 1fr

  .card
    position: relative
    overflow: hidden
    display: flex
    align-items: flex-end
    min-height: 160px
    padding: 26px
    border-radius: 18px
    background: rgba(255, 255, 255, 0.04)
    border: 1px solid rgba(255, 255, 255, 0.08)
    transition: transform 0.3s ease, border-color 0.3s ease

    &--span2
      grid-column: span 2

      @media (max-width: 600px)
        grid-column: span 1

    &:hover
      transform: translateY(-4px)
      border-color: rgba(255, 255, 255, 0.2)

    // brilho da cor da tecnologia no canto
    &::before
      content: ''
      position: absolute
      top: -60px
      right: -40px
      width: 220px
      height: 220px
      background: radial-gradient(circle, var(--c) 0%, transparent 70%)
      opacity: 0.22
      pointer-events: none

    &__icone
      position: absolute
      top: 50%
      right: 26px
      transform: translateY(-50%)
      width: 84px
      height: 84px
      pointer-events: none
      :deep(svg)
        width: 100%
        height: 100%
        fill: var(--c)
        filter: drop-shadow(0 6px 18px rgba(0, 0, 0, 0.35))

    &.card--span1 .card__icone
      top: 22px
      right: 22px
      transform: none
      width: 64px
      height: 64px

    &__nome
      position: relative
      z-index: 1
      font-family: var(--semibold)
      font-size: var(--f2)
      color: var(--cor-branco)
</style>
