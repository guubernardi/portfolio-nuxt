<template>
  <section ref="secaoRef" id="depoimentos" class="depoimentos" aria-label="O que os clientes dizem">
    <div ref="cabecalhoRef" class="depoimentos__cabecalho">
      <span class="depoimentos__rotulo">
        <b>05</b>
        Depoimentos
      </span>

      <h2 class="depoimentos__titulo">
        Quem já recebeu o projeto<br />
        <span class="depoimentos__titulo--leve">conta como foi.</span>
      </h2>

      <p class="depoimentos__texto">
        Prazo cumprido, conversa direta e um site que o cliente consegue usar no dia seguinte.
      </p>
    </div>

    <ul ref="listaRef" class="depoimentos__lista">
      <li v-for="item in depoimentos" :key="item.nome" class="cartao">
        <figure class="cartao__figura">
          <svg class="cartao__aspas" width="28" height="22" viewBox="0 0 28 22" fill="none" aria-hidden="true">
            <path
              d="M0 22V13.2C0 5.9 4.1 1.1 11 0l1.2 2.9C8.3 4.1 6.6 6.4 6.3 9.6H12V22H0Zm16 0V13.2C16 5.9 20.1 1.1 27 0l1.2 2.9c-3.9 1.2-5.6 3.5-5.9 6.7H28V22H16Z"
              fill="currentColor"
            />
          </svg>

          <blockquote class="cartao__texto">{{ item.texto }}</blockquote>

          <figcaption class="cartao__autor">
            <span class="cartao__inicial" aria-hidden="true">{{ item.nome.charAt(0) }}</span>
            <span class="cartao__dados">
              <strong class="cartao__nome">{{ item.nome }}</strong>
              <span class="cartao__cargo">{{ item.cargo }}</span>
            </span>
          </figcaption>
        </figure>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const secaoRef = ref(null)
const cabecalhoRef = ref(null)
const listaRef = ref(null)

let contexto = null

// Troque pelos depoimentos reais dos seus clientes: basta editar nome, cargo e texto.
const depoimentos = [
  {
    nome: 'Mariana Duarte',
    cargo: 'Nutricionista clínica',
    texto:
      'Eu só tinha um perfil no Instagram. Em duas semanas o site estava no ar e as consultas começaram a chegar pelo botão do WhatsApp.',
  },
  {
    nome: 'Rafael Moura',
    cargo: 'Dono de loja de brinquedos',
    texto:
      'Ele explicou cada etapa sem enrolação e entregou antes do combinado. A loja virtual ficou rápida e eu mesmo cadastro os produtos.',
  },
  {
    nome: 'Camila Nogueira',
    cargo: 'Contadora',
    texto:
      'O site passa a seriedade que meu escritório precisava. Meus clientes comentam que acharam tudo no lugar certo e fácil de entender.',
  },
]

onMounted(() => {
  contexto = gsap.context(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(cabecalhoRef.value, {
        autoAlpha: 0,
        y: 28,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: secaoRef.value, start: 'top 78%' },
      })

      gsap.from(listaRef.value?.children ?? [], {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: listaRef.value, start: 'top 86%' },
      })
    })
  }, secaoRef.value)
})

onBeforeUnmount(() => {
  contexto?.revert()
  ScrollTrigger.getAll().forEach((t) => {
    if (secaoRef.value?.contains(t.trigger)) t.kill()
  })
})
</script>

<style scoped lang="sass">
.depoimentos
  position: relative
  width: 100%
  margin-top: -1px
  padding: 40px 60px 120px
  background: #04142e

  &__cabecalho
    max-width: 720px
    margin: 0 auto 56px
    text-align: center

  &__rotulo
    display: inline-flex
    align-items: center
    gap: 10px
    margin-bottom: 22px
    font-family: var(--light)
    font-size: 12px
    letter-spacing: 2.4px
    text-transform: uppercase
    color: rgba(255, 255, 255, 0.45)

    b
      font-family: var(--semibold)
      font-style: italic
      color: rgba(255, 255, 255, 0.75)

  &__titulo
    margin: 0
    font-family: var(--semibold)
    font-size: clamp(28px, 3.6vw, 48px)
    line-height: 1.12
    letter-spacing: -0.02em
    color: var(--cor-branco)

    &--leve
      font-family: var(--light)
      color: #8aa6f0

  &__texto
    max-width: 480px
    margin: 20px auto 0
    font-family: var(--light)
    font-size: 16px
    line-height: 1.6
    color: rgba(255, 255, 255, 0.6)

  &__lista
    display: grid
    grid-template-columns: repeat(3, 1fr)
    gap: 24px
    max-width: 1600px
    margin: 0 auto
    padding: 0
    list-style: none

.cartao
  display: flex

  &__figura
    display: flex
    flex-direction: column
    gap: 24px
    width: 100%
    margin: 0
    padding: 36px 32px
    border: 1px solid rgba(255, 255, 255, 0.08)
    border-radius: 18px
    background: rgba(255, 255, 255, 0.025)
    transition: background 0.4s ease, border-color 0.4s ease, transform 0.4s ease

    &:hover
      border-color: rgba(125, 155, 255, 0.3)
      background: rgba(125, 155, 255, 0.05)
      transform: translateY(-4px)

  &__aspas
    color: #8aa6f0

  &__texto
    margin: 0
    font-family: var(--light)
    font-size: 17px
    line-height: 1.65
    color: rgba(255, 255, 255, 0.85)

  &__autor
    display: flex
    align-items: center
    gap: 14px
    margin-top: auto
    padding-top: 24px
    border-top: 1px solid rgba(255, 255, 255, 0.08)

  &__inicial
    display: flex
    align-items: center
    justify-content: center
    width: 44px
    min-width: 44px
    height: 44px
    border-radius: 50%
    background: rgba(125, 155, 255, 0.16)
    font-family: var(--semibold)
    font-size: 16px
    color: var(--cor-branco)

  &__dados
    display: flex
    flex-direction: column
    gap: 2px

  &__nome
    font-family: var(--semibold)
    font-size: 15px
    color: var(--cor-branco)

  &__cargo
    font-family: var(--light)
    font-size: 14px
    color: rgba(255, 255, 255, 0.55)

@media (max-width: 1000px)
  .depoimentos
    &__lista
      grid-template-columns: repeat(2, 1fr)

@media (max-width: 900px)
  .depoimentos
    padding: 24px 20px 90px

    &__cabecalho
      margin-bottom: 40px

@media (max-width: 640px)
  .depoimentos
    &__lista
      grid-template-columns: 1fr

  .cartao
    &__figura
      padding: 28px 24px
</style>
