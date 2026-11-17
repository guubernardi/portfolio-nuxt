<template>
  <NuxtLink class="card-projeto" :class="`card-projeto--${tom}`" :to="destinoDoProjeto(projeto)">
    <span class="card-projeto__print">
      <!-- width/height reais reservam a caixa antes do download (sem CLS) -->
      <img
        :src="projeto.imagem"
        :alt="`${projeto.nome}, ${projeto.categoria.toLowerCase()} no ar`"
        :width="projeto.largura"
        :height="projeto.altura"
        loading="lazy"
        decoding="async"
      />
      <span class="card-projeto__categoria">{{ projeto.categoria }}</span>
    </span>
    <span class="card-projeto__linha">
      <span class="card-projeto__nome">{{ projeto.nome }}</span>
      <span class="card-projeto__abrir" aria-hidden="true"><SvgIcone nome="seta-direita" /></span>
    </span>
    <span class="card-projeto__descricao">
      {{ descricao || projeto.setor }}
      <!-- projeto feito por conta própria tem que dizer que é: passar demo por
           trabalho contratado desmonta na primeira pergunta -->
      <template v-if="projeto.demonstracao"> · projeto próprio</template>
    </span>
  </NuxtLink>
</template>

<script setup>
import { destinoDoProjeto } from '~/helpers/projetos'

defineProps({
  projeto: { type: Object, required: true },
  // sem descrição, aparece o setor do projeto
  descricao: { type: String, default: '' },
  // 'escuro' sobre abismo/marinho, 'claro' sobre gelo
  tom: { type: String, default: 'escuro' },
})
</script>

<style scoped lang="sass">
.card-projeto
  display: flex
  flex-direction: column
  gap: 16px
  font-family: var(--figtree)
  color: #fff
  text-decoration: none

  &--claro
    color: var(--abismo)

  &__print
    position: relative
    display: block
    overflow: hidden
    aspect-ratio: 3 / 2
    border-radius: 22px
    background: var(--marinho)

    img
      display: block
      width: 100%
      height: 100%
      object-fit: cover
      transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)

  &:hover &__print img
    transform: scale(1.04)

  &__categoria
    position: absolute
    top: 16px
    left: 16px
    padding: 7px 13px
    border-radius: 999px
    background: #fff
    font-weight: 700
    font-size: 12px
    color: var(--abismo)

  &__linha
    display: flex
    align-items: center
    justify-content: space-between
    gap: 14px

  &__nome
    font-weight: 700
    font-size: clamp(20px, 1.7vw, 24px)
    letter-spacing: -0.01em

  &__abrir
    display: flex
    align-items: center
    justify-content: center
    width: 42px
    height: 42px
    flex-shrink: 0
    border: 1px solid rgba(255, 255, 255, 0.3)
    border-radius: 50%
    transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease

    svg
      width: 16px
      height: 16px
      transform: rotate(-45deg)

  &--claro &__abrir
    border-color: rgba(2, 7, 21, 0.2)

  &:hover &__abrir
    border-color: transparent
    background: var(--ciano)
    color: var(--abismo)

  &__descricao
    margin-top: -8px
    font-size: 15px
    line-height: 1.5
    color: var(--texto-apagado-escuro)

  &--claro &__descricao
    color: var(--texto-apagado)

  &:focus-visible
    outline: 2px solid var(--ciano)
    outline-offset: 6px
    border-radius: 24px
</style>
