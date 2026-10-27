<template>
  <section class="final" aria-labelledby="quiz-final-titulo">
    <h1 id="quiz-final-titulo" class="final__titulo" tabindex="-1" data-foco-inicial>Pronto, Sabrina!</h1>

    <p class="final__texto">
      Confira as respostas antes de enviar. Se quiser mudar alguma, toque em Alterar.
    </p>

    <ol class="resumo">
      <li v-for="(item, indice) in itens" :key="item.id" class="resumo__item">
        <div class="resumo__textos">
          <p class="resumo__pergunta">{{ indice + 1 }}. {{ item.rotulo }}</p>
          <p class="resumo__resposta" :class="{ 'resumo__resposta--vazia': !item.valor }">
            {{ item.valor || 'Não respondeu' }}
          </p>
        </div>

        <button
          type="button"
          class="resumo__alterar"
          :data-alterar="item.id"
          :aria-label="`Alterar ${item.rotulo.toLowerCase()}`"
          @click="$emit('alterar', item.id)"
        >
          Alterar
        </button>
      </li>
    </ol>

    <aside class="lembrete">
      <span class="lembrete__icone" aria-hidden="true">
        <SvgIcone nome="camera" />
      </span>

      <p class="lembrete__texto">
        <strong>Falta só uma coisa:</strong> me mande pelo WhatsApp uma ou duas fotos suas com boa qualidade, de preferência com fundo liso. Elas entram no topo do site.
      </p>
    </aside>

    <div class="final__acoes">
      <QuizBotao class="final__botao" :href="linkWhatsapp" icone="whatsapp" bloco @click="aoEnviar">
        Enviar pelo WhatsApp
      </QuizBotao>

      <QuizBotao
        class="final__botao"
        variante="secundario"
        :icone="copiado ? 'check-limpo' : 'copiar'"
        bloco
        @click="copiar"
      >
        {{ copiado ? 'Respostas copiadas' : 'Copiar respostas' }}
      </QuizBotao>
    </div>

    <p class="final__status" role="status">{{ status }}</p>

    <!-- plano B da cópia: o texto fica à vista e selecionado para copiar na mão -->
    <div v-if="mostrarTexto" class="final__copia">
      <label class="final__copia-rotulo" for="quiz-mensagem">Texto das respostas</label>
      <textarea
        id="quiz-mensagem"
        ref="campoMensagem"
        class="final__copia-campo"
        readonly
        rows="10"
        :value="mensagem"
      ></textarea>
    </div>

    <div ref="areaRecomecar" class="recomecar">
      <QuizBotao
        v-if="!confirmando"
        variante="texto"
        icone="seta-girar-anti-horario"
        @click="pedirConfirmacao"
      >
        Recomeçar
      </QuizBotao>

      <div v-else class="recomecar__confirmacao" role="group" aria-labelledby="quiz-recomecar-pergunta">
        <p id="quiz-recomecar-pergunta" class="recomecar__pergunta">
          Apagar todas as respostas e começar de novo?
        </p>

        <div class="recomecar__botoes">
          <QuizBotao variante="texto" data-cancelar @click="cancelarConfirmacao">Cancelar</QuizBotao>
          <QuizBotao variante="secundario" @click="$emit('recomecar')">Apagar e recomeçar</QuizBotao>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { nextTick, onBeforeUnmount, ref } from 'vue'
import QuizBotao from '~/components/pages/quiz-nuarr/QuizBotao.vue'

const props = defineProps({
  itens: { type: Array, required: true },
  mensagem: { type: String, required: true },
  linkWhatsapp: { type: String, required: true },
})

defineEmits(['alterar', 'recomecar'])

const status = ref('')
const copiado = ref(false)
const mostrarTexto = ref(false)
const campoMensagem = ref(null)
let temporizador = 0

function aoEnviar() {
  status.value = 'Se o WhatsApp não abrir, toque em Copiar respostas e cole na nossa conversa.'
}

function marcarCopiado() {
  copiado.value = true
  status.value = 'Respostas copiadas. É só colar na nossa conversa do WhatsApp.'
  clearTimeout(temporizador)
  temporizador = setTimeout(() => { copiado.value = false }, 3000)
}

// writeText é chamado dentro do clique: Safari só libera a área de
// transferência com o gesto ainda ativo. Fora de HTTPS (o dev pela rede, por
// exemplo) a API nem existe, e aí entra a seleção do texto
async function copiar() {
  try {
    if (!navigator.clipboard?.writeText) throw new Error('sem clipboard')
    await navigator.clipboard.writeText(props.mensagem)
    marcarCopiado()
  } catch {
    await copiarPorSelecao()
  }
}

async function copiarPorSelecao() {
  mostrarTexto.value = true
  await nextTick()

  const campo = campoMensagem.value
  if (!campo) return

  campo.focus({ preventScroll: true })
  campo.select()
  // o select() sozinho não seleciona nada no iOS
  campo.setSelectionRange(0, campo.value.length)
  campo.scrollIntoView({ block: 'center' })

  let copiou = false
  try {
    copiou = document.execCommand('copy')
  } catch {
    copiou = false
  }

  if (copiou) marcarCopiado()
  else status.value = 'Não consegui copiar sozinho. Deixei o texto selecionado aqui embaixo: toque e segure para copiar.'
}

// recomeçar apaga tudo, então pede confirmação ali mesmo, sem janela do
// navegador (alguns navegadores embutidos de app engolem o confirm)
const confirmando = ref(false)
const areaRecomecar = ref(null)

async function pedirConfirmacao() {
  confirmando.value = true
  await nextTick()
  areaRecomecar.value?.querySelector('[data-cancelar]')?.focus()
}

async function cancelarConfirmacao() {
  confirmando.value = false
  await nextTick()
  areaRecomecar.value?.querySelector('button')?.focus()
}

onBeforeUnmount(() => clearTimeout(temporizador))
</script>

<style scoped lang="sass">
.final
  display: flex
  flex-direction: column
  padding: 104px 0 calc(48px + env(safe-area-inset-bottom))

  @media screen and (max-width: 1000px)
    padding: 84px 0 calc(32px + env(safe-area-inset-bottom))

.final__titulo
  font-family: var(--semibold)
  font-size: 36px
  line-height: 1.15
  letter-spacing: -0.015em
  color: var(--nuarr-marrom)
  text-wrap: balance

  &:focus
    outline: none

  @media screen and (max-width: 1000px)
    font-size: 30px

.final__texto
  margin-top: 12px
  font-family: var(--light)
  font-size: 16px
  line-height: 1.65
  color: var(--nuarr-texto-2)
  text-wrap: pretty

// ---- resumo

.resumo
  margin-top: 32px
  padding: 4px 20px
  border-radius: 14px
  background: var(--nuarr-areia-suave)
  list-style: none

  @media screen and (max-width: 1000px)
    margin-top: 28px
    padding: 4px 16px

.resumo__item
  display: flex
  align-items: flex-start
  gap: 12px
  padding: 16px 0

  & + &
    border-top: 1px solid var(--nuarr-linha)

.resumo__textos
  flex: 1
  min-width: 0

.resumo__pergunta
  font-family: var(--semibold)
  font-size: 13.5px
  line-height: 1.4
  color: var(--nuarr-texto-2)

.resumo__resposta
  margin-top: 4px
  font-family: var(--light)
  font-size: 16px
  line-height: 1.5
  color: var(--nuarr-marrom)
  white-space: pre-line
  overflow-wrap: anywhere
  text-wrap: pretty

  &--vazia
    color: var(--nuarr-texto-2)
    font-style: italic

// área de toque de 44px sem pesar no visual: o texto é pequeno, o alvo não
.resumo__alterar
  flex-shrink: 0
  min-height: 44px
  margin: -10px -10px -10px 0
  padding: 0 10px
  border-radius: 999px
  background: transparent
  font-family: var(--semibold)
  font-size: 14px
  color: var(--nuarr-marrom)
  text-decoration: underline
  text-decoration-color: var(--nuarr-taupe)
  text-underline-offset: 4px
  cursor: pointer
  transition: background-color 0.2s ease, text-decoration-color 0.2s ease

  @media (hover: hover)
    &:hover
      background: var(--nuarr-areia-media)
      text-decoration-color: var(--nuarr-marrom)

  &:focus-visible
    outline: 2px solid var(--nuarr-marrom)
    outline-offset: 2px

// ---- lembrete das fotos

.lembrete
  display: flex
  align-items: flex-start
  gap: 14px
  margin-top: 24px
  padding: 18px 20px
  border: 1px solid var(--nuarr-ocre-borda)
  border-radius: 14px
  background: var(--nuarr-areia)

  @media screen and (max-width: 1000px)
    padding: 16px

.lembrete__icone
  display: flex
  flex-shrink: 0
  align-items: center
  justify-content: center
  width: 38px
  height: 38px
  border-radius: 50%
  background: var(--nuarr-ocre)
  color: var(--nuarr-fundo)
  font-size: 18px

  :deep(svg)
    display: block

.lembrete__texto
  font-family: var(--light)
  font-size: 15.5px
  line-height: 1.6
  color: var(--nuarr-marrom)
  text-wrap: pretty

  strong
    font-family: var(--semibold)

// ---- ações

.final__acoes
  display: flex
  gap: 12px
  margin-top: 32px

  @media screen and (max-width: 1000px)
    flex-direction: column
    margin-top: 28px

.final__botao
  flex: 1

.final__status
  margin-top: 14px
  font-family: var(--light)
  font-size: 14.5px
  line-height: 1.55
  text-align: center
  color: var(--nuarr-texto-2)
  text-wrap: pretty

  &:empty
    margin-top: 0

.final__copia
  display: flex
  flex-direction: column
  gap: 8px
  margin-top: 16px

.final__copia-rotulo
  font-family: var(--light)
  font-size: 14.5px
  color: var(--nuarr-texto-2)

.final__copia-campo
  width: 100%
  padding: 14px 16px
  border: 1px solid var(--nuarr-texto-3)
  border-radius: 14px
  background: var(--nuarr-campo)
  font-family: var(--light)
  font-size: 16px
  line-height: 1.55
  color: var(--nuarr-marrom)
  resize: vertical
  user-select: text
  -webkit-user-select: text

  &:focus
    border-color: var(--nuarr-marrom)
    box-shadow: 0 0 0 3px var(--nuarr-ocre-halo)

// ---- recomeçar

.recomecar
  display: flex
  justify-content: center
  margin-top: 40px
  padding-top: 24px
  border-top: 1px solid var(--nuarr-linha)

.recomecar__confirmacao
  display: flex
  flex-direction: column
  align-items: center
  gap: 14px
  text-align: center

.recomecar__pergunta
  font-family: var(--light)
  font-size: 15.5px
  line-height: 1.5
  color: var(--nuarr-marrom)
  text-wrap: balance

.recomecar__botoes
  display: flex
  flex-wrap: wrap
  justify-content: center
  gap: 8px

@media (prefers-reduced-motion: reduce)
  .resumo__alterar
    transition: none
</style>
