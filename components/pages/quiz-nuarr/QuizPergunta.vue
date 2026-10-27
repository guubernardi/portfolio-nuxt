<template>
  <section class="pergunta">
    <form class="pergunta__form" novalidate @submit.prevent="enviar">
      <!-- escolha: fieldset + legend dá ao leitor de tela o enunciado de cada opção -->
      <fieldset
        v-if="ehEscolha"
        class="pergunta__grupo"
        :aria-describedby="pergunta.ajuda ? idAjuda : undefined"
      >
        <legend class="pergunta__legenda">
          <h1 class="pergunta__titulo" tabindex="-1" data-foco-inicial>{{ pergunta.titulo }}</h1>
        </legend>

        <p v-if="pergunta.ajuda" :id="idAjuda" class="pergunta__ajuda">{{ pergunta.ajuda }}</p>

        <div class="opcoes">
          <label
            v-for="opcao in pergunta.opcoes"
            :key="opcao.valor"
            :for="idDe(opcao.valor)"
            class="opcao"
            :class="{ 'opcao--marcada': marcada(opcao.valor) }"
          >
            <input
              v-if="varias"
              :id="idDe(opcao.valor)"
              v-model="resposta.selecao"
              class="opcao__input"
              type="checkbox"
              :name="idBase"
              :value="opcao.valor"
            >
            <input
              v-else
              :id="idDe(opcao.valor)"
              v-model="resposta.selecao"
              class="opcao__input"
              type="radio"
              :name="idBase"
              :value="opcao.valor"
            >

            <span
              class="opcao__marca"
              :class="varias ? 'opcao__marca--quadrado' : 'opcao__marca--circulo'"
              aria-hidden="true"
            >
              <SvgIcone v-if="varias" nome="check-limpo" />
            </span>

            <span class="opcao__textos">
              <span class="opcao__rotulo">{{ opcao.rotulo }}</span>
              <span v-if="opcao.descricao" class="opcao__descricao">{{ opcao.descricao }}</span>
            </span>
          </label>
        </div>

        <Transition name="complemento" @enter="mostrarComplemento">
          <div v-if="complementos.length" class="complementos" :class="{ 'complementos--duplo': complementos.length > 1 }">
            <div v-for="campo in complementos" :key="campo.id" class="campo">
              <label class="campo__rotulo" :for="idCampo(campo.id)">{{ campo.rotulo }}</label>
              <input
                :id="idCampo(campo.id)"
                class="campo__entrada"
                :class="{ 'campo__entrada--curta': campo.curto }"
                type="text"
                :value="resposta.campos[campo.id]"
                :inputmode="campo.inputmode || 'text'"
                :autocomplete="campo.autocomplete || 'off'"
                :autocapitalize="campo.inputmode === 'numeric' ? 'off' : 'sentences'"
                :aria-required="campo.obrigatorio ? 'true' : undefined"
                enterkeyhint="next"
                @input="atualizarCampo(campo, $event)"
                @keydown.enter="avancarCampo(campo, $event)"
              >
            </div>
          </div>
        </Transition>
      </fieldset>

      <!-- texto livre: o próprio título é o rótulo do campo -->
      <div v-else class="pergunta__grupo">
        <h1 class="pergunta__titulo" tabindex="-1" data-foco-inicial>
          <label :for="idBase">{{ pergunta.titulo }}</label>
        </h1>

        <p v-if="pergunta.ajuda" :id="idAjuda" class="pergunta__ajuda">{{ pergunta.ajuda }}</p>

        <input
          v-if="pergunta.tipo === 'texto'"
          :id="idBase"
          class="campo__entrada pergunta__entrada"
          :class="{ 'campo__entrada--curta': pergunta.curto }"
          type="text"
          :value="resposta.texto"
          :placeholder="pergunta.placeholder"
          :inputmode="pergunta.inputmode || 'text'"
          autocomplete="off"
          autocapitalize="off"
          enterkeyhint="next"
          :aria-describedby="pergunta.ajuda ? idAjuda : undefined"
          @input="atualizarTexto($event)"
        >

        <textarea
          v-else
          :id="idBase"
          class="campo__entrada campo__entrada--area pergunta__entrada"
          rows="5"
          :value="resposta.texto"
          :placeholder="pergunta.placeholder"
          autocapitalize="sentences"
          :aria-describedby="pergunta.ajuda ? idAjuda : undefined"
          @input="atualizarTexto($event)"
        ></textarea>
      </div>

      <div class="acoes">
        <p class="acoes__aviso" role="status">{{ mostrarAviso ? pendencia : '' }}</p>

        <div class="acoes__botoes">
          <QuizBotao
            variante="secundario"
            :icone="editando ? '' : 'seta-esquerda'"
            @click="$emit('voltar')"
          >
            {{ editando ? 'Cancelar' : 'Voltar' }}
          </QuizBotao>

          <QuizBotao
            class="acoes__principal"
            tipo="submit"
            :icone="editando ? 'check-limpo' : 'seta-direita'"
            :icone-lado="editando ? 'esquerda' : 'direita'"
            :desabilitado="Boolean(pendencia)"
          >
            {{ rotuloPrincipal }}
          </QuizBotao>
        </div>
      </div>
    </form>
  </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import QuizBotao from '~/components/pages/quiz-nuarr/QuizBotao.vue'

const props = defineProps({
  pergunta: { type: Object, required: true },
  // objeto reativo da página: as opções e campos escrevem direto nele, de
  // propósito. Pergunta e página andam juntas, e um emit por tecla só
  // espalharia a mesma regra em dois lugares
  resposta: { type: Object, required: true },
  // texto do que falta para continuar, vazio quando a resposta está completa.
  // A regra mora na página, que também precisa dela para montar o resumo
  pendencia: { type: String, default: '' },
  vazia: { type: Boolean, default: false },
  camposVisiveis: { type: Array, default: () => [] },
  editando: { type: Boolean, default: false },
})

const emit = defineEmits(['continuar', 'voltar'])

const idBase = computed(() => `quiz-${props.pergunta.id}`)
const idAjuda = computed(() => `${idBase.value}-ajuda`)
const idDe = (valor) => `${idBase.value}-${valor}`
// prefixo próprio: a opção "Outra" e o campo "Qual?" dela teriam o mesmo id
const idCampo = (campo) => `${idBase.value}-campo-${campo}`

const ehEscolha = computed(() => ['varias', 'uma'].includes(props.pergunta.tipo))
const varias = computed(() => props.pergunta.tipo === 'varias')

const complementos = computed(() =>
  (props.pergunta.campos || []).filter((campo) => props.camposVisiveis.includes(campo.id))
)

function marcada(valor) {
  return varias.value ? props.resposta.selecao.includes(valor) : props.resposta.selecao === valor
}

const rotuloPrincipal = computed(() => {
  if (props.editando) return 'Salvar'
  return props.vazia ? 'Pular' : 'Continuar'
})

// o aviso só aparece depois de uma tentativa, e some sozinho quando a resposta
// fica completa: avisar antes de ela tocar em qualquer coisa seria bronca
const mostrarAviso = ref(false)
watch(() => props.pendencia, (pendencia) => {
  if (!pendencia) mostrarAviso.value = false
})

function enviar() {
  if (props.pendencia) {
    mostrarAviso.value = true
    return
  }
  emit('continuar')
}

// value + @input em vez de v-model: quando a formatação devolve o mesmo valor
// que já estava salvo (letra num campo numérico), o Vue não re-renderiza e a
// letra ficaria na tela. Por isso o valor é reescrito no próprio input
function aplicar(formatar, evento) {
  const bruto = evento.target.value
  const valor = formatar ? formatar(bruto) : bruto
  if (evento.target.value !== valor) evento.target.value = valor
  return valor
}

function atualizarCampo(campo, evento) {
  props.resposta.campos[campo.id] = aplicar(campo.formatar, evento)
}

function atualizarTexto(evento) {
  props.resposta.texto = aplicar(props.pergunta.formatar, evento)
}

// o campo que abre ("Qual?", "Cidade") costuma nascer embaixo da barra de
// botões presa ao pé da tela. O scroll-margin do CSS desconta a barra
function mostrarComplemento(elemento) {
  const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  elemento.scrollIntoView({ block: 'nearest', behavior: semMovimento ? 'instant' : 'smooth' })
}

// Enter na cidade leva ao bairro em vez de enviar a pergunta pela metade
function avancarCampo(campo, evento) {
  const indice = complementos.value.findIndex((item) => item.id === campo.id)
  const proximo = complementos.value[indice + 1]
  if (!proximo) return

  evento.preventDefault()
  document.getElementById(idCampo(proximo.id))?.focus()
}
</script>

<style scoped lang="sass">
.pergunta
  display: flex
  flex: 1
  flex-direction: column
  min-height: calc(100svh - 48px)
  padding-top: 104px

  @media screen and (max-width: 1000px)
    min-height: calc(100svh - 20px)
    padding-top: 84px

.pergunta__form
  display: flex
  flex: 1
  flex-direction: column

.pergunta__grupo
  min-width: 0

.pergunta__legenda
  display: block
  width: 100%

.pergunta__titulo
  font-family: var(--semibold)
  font-size: 30px
  line-height: 1.2
  letter-spacing: -0.015em
  color: var(--nuarr-marrom)
  text-wrap: balance

  // foco programático na troca de tela: serve ao leitor de tela, não ao olho
  &:focus
    outline: none

  label
    cursor: text

  @media screen and (max-width: 1000px)
    font-size: 25px

.pergunta__ajuda
  margin-top: 10px
  font-family: var(--light)
  font-size: 15.5px
  line-height: 1.6
  color: var(--nuarr-texto-2)
  text-wrap: pretty

.pergunta__entrada
  margin-top: 28px

  @media screen and (max-width: 1000px)
    margin-top: 24px

// ---- opções

.opcoes
  display: flex
  flex-direction: column
  gap: 10px
  margin-top: 28px

  @media screen and (max-width: 1000px)
    margin-top: 24px

.opcao
  position: relative
  display: flex
  align-items: center
  gap: 14px
  min-height: 56px
  padding: 14px 18px
  border: 1.5px solid transparent
  border-radius: 14px
  background: var(--nuarr-areia-suave)
  cursor: pointer
  transition: background-color 0.2s ease, border-color 0.2s ease

  @media (hover: hover)
    &:hover
      background: var(--nuarr-areia-media)

  &:active
    background: var(--nuarr-areia-media)

  // o anel vai no cartão inteiro, que é o que ela enxerga como "a opção"
  &:has(.opcao__input:focus-visible)
    outline: 2px solid var(--nuarr-marrom)
    outline-offset: 3px

  &--marcada
    background: var(--nuarr-areia)
    border-color: var(--nuarr-marrom)

    @media (hover: hover)
      &:hover
        background: var(--nuarr-areia)

// o input real cobre o cartão: teclado, leitor de tela e o contorno do
// VoiceOver continuam funcionando, só a aparência é a do cartão
.opcao__input
  position: absolute
  inset: 0
  z-index: 1
  width: 100%
  height: 100%
  margin: 0
  opacity: 0
  cursor: pointer

.opcao__marca
  display: flex
  flex-shrink: 0
  align-items: center
  justify-content: center
  width: 22px
  height: 22px
  border: 1.5px solid var(--nuarr-texto-3)
  color: var(--nuarr-fundo)
  font-size: 12px
  transition: background-color 0.2s ease, border-color 0.2s ease

  :deep(.edusites-icone)
    transform: scale(0.4)
    opacity: 0
    transition: transform 0.2s ease-out, opacity 0.2s ease-out

  &--quadrado
    border-radius: 7px

  &--circulo
    border-radius: 50%

    &::after
      content: ''
      width: 10px
      height: 10px
      border-radius: 50%
      background: var(--nuarr-marrom)
      transform: scale(0)
      transition: transform 0.2s ease-out

.opcao--marcada .opcao__marca
  border-color: var(--nuarr-marrom)

  &--quadrado
    background: var(--nuarr-marrom)

    :deep(.edusites-icone)
      transform: scale(1)
      opacity: 1

  &--circulo::after
    transform: scale(1)

.opcao__textos
  display: flex
  flex-direction: column
  gap: 3px
  min-width: 0

.opcao__rotulo
  font-family: var(--light)
  font-size: 16px
  line-height: 1.35
  color: var(--nuarr-marrom)
  text-wrap: pretty

.opcao__descricao
  font-family: var(--light)
  font-size: 13.5px
  line-height: 1.4
  color: var(--nuarr-texto-2)
  text-wrap: pretty

// ---- campos que abrem conforme a escolha

.complementos
  display: grid
  gap: 16px
  margin-top: 20px
  // altura da barra de botões fixa no pé, para o scrollIntoView parar acima dela
  scroll-margin-bottom: 120px

  &--duplo
    grid-template-columns: 1fr 1fr

    @media screen and (max-width: 1000px)
      grid-template-columns: 1fr

.campo
  display: flex
  flex-direction: column
  gap: 8px
  min-width: 0

.campo__rotulo
  font-family: var(--light)
  font-size: 14.5px
  color: var(--nuarr-texto-2)

// 16px no mínimo: abaixo disso o Safari do iPhone dá zoom ao focar o campo
.campo__entrada
  width: 100%
  height: 52px
  padding: 0 16px
  border: 1px solid var(--nuarr-texto-3)
  border-radius: 14px
  background: var(--nuarr-campo)
  font-family: var(--light)
  font-size: 16px
  color: var(--nuarr-marrom)
  transition: border-color 0.2s ease, box-shadow 0.2s ease
  // idem para o scroll que o navegador faz sozinho ao focar o campo
  scroll-margin-bottom: 120px

  &::placeholder
    color: var(--nuarr-texto-3)
    opacity: 1

  &:focus
    border-color: var(--nuarr-marrom)
    box-shadow: 0 0 0 3px var(--nuarr-ocre-halo)

  &--curta
    max-width: 180px

  &--area
    display: block
    height: auto
    min-height: 148px
    max-height: 360px
    padding: 14px 16px
    line-height: 1.55
    resize: vertical
    field-sizing: content

.complemento-enter-active
  transition: opacity 0.25s ease-out, transform 0.25s ease-out

.complemento-leave-active
  transition: opacity 0.15s ease-in

.complemento-enter-from
  opacity: 0
  transform: translateY(-6px)

.complemento-leave-to
  opacity: 0

// ---- ações

// no celular os botões ficam presos ao pé da tela, na zona do polegar, e o
// degradê deixa a lista passar por baixo sem um corte seco
.acoes
  position: sticky
  bottom: 0
  z-index: 2
  margin-top: 40px
  padding: 8px 0 calc(24px + env(safe-area-inset-bottom))
  background: linear-gradient(to bottom, var(--nuarr-fundo-transparente), var(--nuarr-fundo) 30%)

  @media screen and (max-width: 1000px)
    margin-top: auto
    padding: 28px 0 calc(16px + env(safe-area-inset-bottom))

.acoes__aviso
  min-height: 22px
  margin-bottom: 10px
  font-family: var(--light)
  font-size: 14.5px
  line-height: 1.5
  text-align: right
  color: var(--nuarr-marrom)
  text-wrap: pretty

  &:empty
    margin-bottom: 0
    min-height: 0

.acoes__botoes
  display: flex
  gap: 12px

.acoes__principal
  flex: 1

@media (prefers-reduced-motion: reduce)
  .opcao,
  .opcao__marca,
  .opcao__marca::after,
  .opcao__marca :deep(.edusites-icone),
  .campo__entrada
    transition: none

  .complemento-enter-active,
  .complemento-leave-active
    transition: none

  .complemento-enter-from
    transform: none
</style>
