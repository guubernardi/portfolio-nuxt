<template>
  <section ref="secaoRef" class="faq" aria-label="Dúvidas frequentes">
    <div ref="cabecalhoRef" class="faq__cabecalho">
      <span class="faq__rotulo">
        <b>05</b>
        Dúvidas
      </span>

      <h2 class="faq__titulo">
        O que perguntam<br />
        <span class="faq__titulo--leve">antes de começar.</span>
      </h2>
    </div>

    <ul ref="listaRef" class="faq__lista">
      <li
        v-for="(item, i) in perguntas"
        :key="item.pergunta"
        class="pergunta"
        :class="{ 'pergunta--aberta': aberta === i }"
      >
        <button
          class="pergunta__gatilho"
          type="button"
          :aria-expanded="aberta === i"
          :aria-controls="`faq-resposta-${i}`"
          @click="alternar(i)"
        >
          <span class="pergunta__texto">{{ item.pergunta }}</span>
          <span class="pergunta__sinal" aria-hidden="true"></span>
        </button>

        <div :id="`faq-resposta-${i}`" class="pergunta__corpo" role="region">
          <div class="pergunta__corpo-interno">
            <p class="pergunta__resposta">{{ item.resposta }}</p>
          </div>
        </div>
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

const aberta = ref(0)
let contexto = null

const perguntas = [
  // "como funciona do começo ao fim" saiu daqui: virou a seção Processo,
  // que mostra as quatro etapas em vez de escondê-las num acordeão
  {
    pergunta: 'E se eu não gostar do layout?',
    resposta:
      'O layout é aprovado antes de virar código, justamente pra isso não acontecer. Nessa fase os ajustes são rápidos e fazem parte do processo. Mudar depois que a tela já está programada custa muito mais caro, então preferimos resolver tudo no protótipo.',
  },
  {
    pergunta: 'Preciso ter texto e imagem prontos pra começar?',
    resposta:
      'Não. Dá pra começar com o que você tem e ir preenchendo junto. O que ajuda muito é você chegar sabendo o que quer que o visitante faça no site, seja pedir orçamento, comprar ou agendar. O resto a gente organiza no caminho.',
  },
  {
    pergunta: 'Quem cuida da hospedagem e do domínio?',
    resposta:
      'A configuração fica por nossa conta e as contas ficam no seu nome, com você como dono dos acessos. Isso importa: se um dia quiser levar o projeto pra outro lugar, você leva, sem depender de ninguém pra liberar nada.',
  },
  {
    pergunta: 'E depois que o site entra no ar?',
    resposta:
      'Você não fica sozinho. Acompanhamos o período logo após o lançamento pra corrigir qualquer coisa que apareça no uso real. Ajustes e evoluções depois disso são combinados à parte, do jeito que fizer sentido pro seu momento.',
  },
  {
    pergunta: 'Já tenho um site. Dá pra refazer?',
    resposta:
      'Dá, e é bem comum. Refazemos mantendo o que já funciona e o endereço que seus clientes conhecem, sem perder o que você construiu de busca. Se o conteúdo atual estiver bom, ele é aproveitado em vez de jogado fora.',
  },
]

function alternar(i) {
  aberta.value = aberta.value === i ? -1 : i
}

// FAQPage ajuda a aparecer como resultado rico na busca e é o formato que
// os buscadores e as IAs leem pra citar resposta
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: perguntas.map((p) => ({
          '@type': 'Question',
          name: p.pergunta,
          acceptedAnswer: { '@type': 'Answer', text: p.resposta },
        })),
      }),
    },
  ],
})

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
        y: 26,
        duration: 0.7,
        stagger: 0.07,
        ease: 'power3.out',
        scrollTrigger: { trigger: listaRef.value, start: 'top 84%' },
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
.faq
  position: relative
  width: 100%
  margin-top: -1px
  padding: 120px 60px 130px
  background: linear-gradient(to bottom, #04142e 0%, #041229 100%)

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

  &__lista
    display: flex
    flex-direction: column
    gap: 12px
    max-width: 860px
    margin: 0 auto
    padding: 0
    list-style: none

.pergunta
  border: 1px solid rgba(255, 255, 255, 0.08)
  border-radius: 14px
  background: rgba(255, 255, 255, 0.025)
  transition: background 0.4s ease, border-color 0.4s ease

  &:hover
    border-color: rgba(125, 155, 255, 0.2)

  &--aberta
    background: rgba(125, 155, 255, 0.05)
    border-color: rgba(125, 155, 255, 0.22)

  &__gatilho
    display: flex
    align-items: center
    justify-content: space-between
    gap: 20px
    width: 100%
    padding: 22px 26px
    border: none
    background: none
    text-align: left
    cursor: pointer
    color: var(--cor-branco)

  &__texto
    font-family: var(--semibold)
    font-size: 16px
    line-height: 1.4

  // "+" que vira "×" ao abrir, desenhado em dois traços pra girar sem fonte
  &__sinal
    position: relative
    flex-shrink: 0
    width: 18px
    height: 18px
    transition: transform 0.4s ease

    &::before,
    &::after
      content: ''
      position: absolute
      top: 50%
      left: 50%
      background: rgba(255, 255, 255, 0.7)
      transform: translate(-50%, -50%)
      transition: opacity 0.4s ease

    &::before
      width: 14px
      height: 1.5px

    &::after
      width: 1.5px
      height: 14px

  &--aberta &__sinal
    transform: rotate(135deg)

  // grid 0fr → 1fr anima a altura sem precisar medir nada em JS
  &__corpo
    display: grid
    grid-template-rows: 0fr
    transition: grid-template-rows 0.4s ease

  &--aberta &__corpo
    grid-template-rows: 1fr

  &__corpo-interno
    overflow: hidden

  &__resposta
    margin: 0
    padding: 0 26px 24px
    font-family: var(--light)
    font-size: 15px
    line-height: 1.7
    color: rgba(255, 255, 255, 0.6)

@media (max-width: 820px)
  .faq
    padding: 80px 20px 90px

    &__cabecalho
      margin-bottom: 38px

  .pergunta
    &__gatilho
      padding: 18px 20px

    &__texto
      font-size: 15px

    &__resposta
      padding: 0 20px 20px
</style>
