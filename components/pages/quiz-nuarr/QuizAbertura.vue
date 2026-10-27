<template>
  <section class="abertura" aria-labelledby="quiz-abertura-titulo">
    <div class="abertura__conteudo">
      <img
        class="abertura__logo"
        src="/images/quiz-nuarr/logo.svg"
        width="419"
        height="395"
        alt="Nuárr Clínica de Psicologia"
      >

      <h1 id="quiz-abertura-titulo" class="abertura__titulo" tabindex="-1" data-foco-inicial>
        Vamos desenhar o site da Nuárr
      </h1>

      <p class="abertura__texto">
        São {{ total }} perguntas rápidas sobre a clínica. Leva uns 3&nbsp;minutos. No final, as respostas vão direto para o WhatsApp do Gustavo.
      </p>

      <QuizBotao class="abertura__botao" icone="seta-direita" icone-lado="direita" bloco @click="$emit('comecar')">
        Começar
      </QuizBotao>
    </div>

    <p class="abertura__rodape">Gustavo Bernardi · desenvolvimento web</p>
  </section>
</template>

<script setup>
import QuizBotao from '~/components/pages/quiz-nuarr/QuizBotao.vue'

defineProps({
  total: { type: Number, required: true },
})

defineEmits(['comecar'])
</script>

<style scoped lang="sass">
.abertura
  display: flex
  flex: 1
  flex-direction: column
  align-items: center
  min-height: calc(100svh - 48px)
  padding-bottom: 24px
  text-align: center

  @media screen and (max-width: 1000px)
    min-height: calc(100svh - 20px)

.abertura__conteudo
  display: flex
  flex-direction: column
  align-items: center
  width: 100%
  max-width: 420px
  margin: auto 0
  padding: 32px 0 40px

.abertura__logo
  display: block
  width: 204px
  height: auto
  margin-bottom: 40px

  @media screen and (max-width: 1000px)
    width: 176px
    margin-bottom: 36px

.abertura__titulo
  font-family: var(--semibold)
  font-size: 36px
  line-height: 1.15
  letter-spacing: -0.015em
  color: var(--nuarr-marrom)
  text-wrap: balance

  // foco programático, só para o leitor de tela saber onde está
  &:focus
    outline: none

  @media screen and (max-width: 1000px)
    font-size: 30px

.abertura__texto
  margin-top: 16px
  font-family: var(--light)
  font-size: 16px
  line-height: 1.65
  color: var(--nuarr-texto-2)
  text-wrap: pretty

.abertura__botao
  max-width: 340px
  margin-top: 36px

.abertura__rodape
  font-family: var(--light)
  font-size: 12.5px
  letter-spacing: 0.02em
  color: var(--nuarr-texto-2)
</style>
