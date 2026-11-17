<template>
  <!-- as quatro objeções que mais travam a decisão, respondidas logo abaixo do topo -->
  <section ref="raiz" class="faixa" aria-label="Garantias">
    <ul class="faixa__lista">
      <template v-for="(item, i) in itens" :key="item">
        <li v-if="i > 0" class="faixa__estrela" aria-hidden="true">
          <img src="/images/home/estrela-faixa.svg" alt="" width="16" height="18" />
        </li>
        <li class="faixa__item">{{ item }}</li>
      </template>
    </ul>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { gsap } from 'gsap'
import { useAnimacoes, entrar } from '~/composables/useAnimacoes'

const raiz = ref(null)

useAnimacoes(raiz, ({ movimento }, el) => {
  if (!movimento) return
  entrar(el.querySelectorAll('.faixa__item'), el, { y: 18, duration: 0.7, stagger: 0.09, start: 'top 92%' })
  // as estrelas giram e acendem entre as frases
  gsap.from(el.querySelectorAll('.faixa__estrela img'), {
    scale: 0, rotation: -180, duration: 0.9, stagger: 0.09, delay: 0.2, ease: 'back.out(2)',
    scrollTrigger: { trigger: el, start: 'top 92%', once: true },
  })
})

const itens = [
  'Contrato em todo projeto',
  'Layout aprovado antes do código',
  'Domínio e acessos no seu nome',
  'Suporte depois que entra no ar',
]
</script>

<style scoped lang="sass">
.faixa
  padding: 36px 64px
  background: var(--abismo)

  &__lista
    display: flex
    flex-wrap: wrap
    align-items: center
    justify-content: center
    gap: 14px 28px
    margin: 0
    padding: 0
    list-style: none

  &__item
    font-family: var(--figtree)
    font-weight: 600
    font-size: 19px
    color: #fff
    white-space: nowrap

  &__estrela
    display: flex

    img
      width: 16px
      height: 18px

// no celular as quatro viram uma lista, uma por linha, sem as estrelas
@media (max-width: 760px)
  .faixa
    padding: 28px 20px

    &__lista
      flex-direction: column
      gap: 10px

    &__estrela
      display: none

    &__item
      font-size: 16px
</style>
