<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href || undefined"
    :target="href ? '_blank' : undefined"
    :rel="href ? 'noopener' : undefined"
    :type="href ? undefined : tipo"
    :aria-disabled="desabilitado ? 'true' : undefined"
    class="quiz-botao"
    :class="[`quiz-botao--${variante}`, { 'quiz-botao--bloco': bloco, 'quiz-botao--desabilitado': desabilitado }]"
  >
    <span v-if="icone && iconeLado === 'esquerda'" class="quiz-botao__icone" aria-hidden="true">
      <SvgIcone :nome="icone" />
    </span>

    <span class="quiz-botao__rotulo"><slot /></span>

    <span v-if="icone && iconeLado === 'direita'" class="quiz-botao__icone" aria-hidden="true">
      <SvgIcone :nome="icone" />
    </span>
  </component>
</template>

<script setup>
// Botão em pílula da marca da Nuárr. Fica separado do Botao.vue do site porque
// lá a identidade é a do Gustavo (escura, azul); aqui tudo vem dos tokens
// --nuarr-* que a página declara na raiz.
defineProps({
  variante: { type: String, default: 'primario' }, // primario | secundario | texto
  tipo: { type: String, default: 'button' },
  href: { type: String, default: '' },
  icone: { type: String, default: '' },
  iconeLado: { type: String, default: 'esquerda' },
  bloco: { type: Boolean, default: false },
  // aria-disabled e não disabled: o botão continua focável e clicável, e o
  // clique explica o que falta em vez de simplesmente não fazer nada
  desabilitado: { type: Boolean, default: false },
})
</script>

<style scoped lang="sass">
.quiz-botao
  display: inline-flex
  align-items: center
  justify-content: center
  gap: 10px
  min-height: 52px
  padding: 0 26px
  border: 1.5px solid transparent
  border-radius: 999px
  font-family: var(--semibold)
  font-size: 15.5px
  line-height: 1.2
  text-align: center
  text-decoration: none
  cursor: pointer
  transition: background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease, opacity 0.25s ease, transform 0.15s ease

  &:active
    transform: scale(0.98)

  &:focus-visible
    outline: 2px solid var(--nuarr-marrom)
    outline-offset: 3px

  &--bloco
    width: 100%

  &--primario
    color: var(--nuarr-fundo)
    background: var(--nuarr-marrom)

    @media (hover: hover)
      &:hover
        background: var(--nuarr-marrom-hover)

  &--secundario
    color: var(--nuarr-marrom)
    background: transparent
    border-color: var(--nuarr-taupe)

    @media (hover: hover)
      &:hover
        background: var(--nuarr-areia-suave)
        border-color: var(--nuarr-marrom)

  &--texto
    min-height: 44px
    padding: 0 14px
    font-family: var(--light)
    font-size: 15px
    color: var(--nuarr-texto-2)
    background: transparent

    @media (hover: hover)
      &:hover
        color: var(--nuarr-marrom)

  &--desabilitado
    opacity: 0.38
    cursor: not-allowed

    &:active
      transform: none

    @media (hover: hover)
      &.quiz-botao--primario:hover
        background: var(--nuarr-marrom)

  &__icone
    display: flex
    flex-shrink: 0
    font-size: 16px

    :deep(svg)
      display: block

  &__rotulo
    text-wrap: balance
</style>
