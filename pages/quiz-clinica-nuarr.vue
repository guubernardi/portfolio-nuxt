<template>
  <div class="quiz">
    <div class="quiz__coluna">
      <!-- fora da transição das telas: assim a barra anda de uma pergunta para
           a outra em vez de nascer de novo a cada tela -->
      <Transition name="cabecalho">
        <header v-if="tela > 0" class="cabecalho">
          <div class="cabecalho__linha">
            <img
              class="cabecalho__simbolo"
              src="/images/quiz-nuarr/simbolo.svg"
              width="270"
              height="207"
              alt="Nuárr"
            >
            <p class="cabecalho__contador">{{ textoContador }}</p>
          </div>

          <div class="cabecalho__barra" aria-hidden="true">
            <span class="cabecalho__progresso" :style="{ width: `${progresso * 100}%` }"></span>
          </div>
        </header>
      </Transition>

      <main class="quiz__palco">
        <Transition :name="`tela-${direcao}`" mode="out-in" @enter="aoEntrar">
          <QuizAbertura v-if="tela === 0" key="abertura" :total="TOTAL" @comecar="comecar" />

          <QuizPergunta
            v-else-if="perguntaAtual"
            :key="perguntaAtual.id"
            :pergunta="perguntaAtual"
            :resposta="respostas[perguntaAtual.id]"
            :pendencia="pendenciaDe(perguntaAtual)"
            :vazia="vaziaDe(perguntaAtual)"
            :campos-visiveis="camposVisiveis(perguntaAtual)"
            :editando="editando"
            @continuar="continuar"
            @voltar="voltar"
          />

          <QuizFinal
            v-else
            key="final"
            :itens="itensResumo"
            :mensagem="mensagem"
            :link-whatsapp="linkWhatsapp"
            @alterar="alterar"
            @recomecar="recomecar"
          />
        </Transition>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import QuizAbertura from '~/components/pages/quiz-nuarr/QuizAbertura.vue'
import QuizPergunta from '~/components/pages/quiz-nuarr/QuizPergunta.vue'
import QuizFinal from '~/components/pages/quiz-nuarr/QuizFinal.vue'
import { TELEFONE } from '~/helpers/site'

// Briefing do site da Nuárr Clínica de Psicologia, para a Sabrina responder
// pelo celular. Página privada: sem layout (a Nav do site não faz sentido
// aqui), fora do sitemap e fora da busca. A identidade é a da clínica, não a
// do Gustavo, por isso as cores vivem em tokens --nuarr-* na raiz da página.
definePageMeta({ layout: false })

// ---- perguntas

const soDigitos = (maximo) => (valor) => valor.replace(/\D/g, '').slice(0, maximo)

// aceita "CRP 06/123456", "06123456" ou "06/123456" e guarda sempre "06/123456":
// no teclado numérico do iPhone nem existe a barra
function formatarCrp(valor) {
  const digitos = valor.replace(/\D/g, '').slice(0, 8)
  return digitos.length > 2 ? `${digitos.slice(0, 2)}/${digitos.slice(2)}` : digitos
}

// rótulos das opções marcadas, na ordem da lista (e não na ordem do clique).
// Opção "Outra" com texto digitado entra com o texto no lugar do rótulo
function rotulosMarcados(pergunta, resposta) {
  const marcadas = Array.isArray(resposta.selecao) ? resposta.selecao : [resposta.selecao]

  return pergunta.opcoes
    .filter((opcao) => marcadas.includes(opcao.valor))
    .map((opcao) => (opcao.trocaPor && resposta.campos[opcao.trocaPor]?.trim()) || opcao.rotulo)
}

function resumirEscolhas(resposta) {
  return rotulosMarcados(this, resposta).join(', ')
}

function resumirTexto(resposta) {
  return resposta.texto.trim()
}

const perguntas = [
  {
    id: 'especialidade',
    resumo: 'Especialidade',
    titulo: 'Qual vai ser a especialidade da clínica?',
    ajuda: 'Pode marcar mais de uma.',
    tipo: 'varias',
    obrigatoria: true,
    opcoes: [
      { valor: 'ansiedade', rotulo: 'Ansiedade e depressão' },
      { valor: 'perinatal', rotulo: 'Psicologia perinatal', descricao: 'Gestação, maternidade e pós-parto' },
      { valor: 'infancia', rotulo: 'Infância e adolescência' },
      { valor: 'casais', rotulo: 'Casais e família' },
      { valor: 'luto', rotulo: 'Luto e perdas' },
      { valor: 'autoestima', rotulo: 'Autoestima e relacionamentos' },
      { valor: 'outra', rotulo: 'Outra', trocaPor: 'outra' },
    ],
    campos: [{ id: 'outra', rotulo: 'Qual?', quando: ['outra'] }],
    resumir: resumirEscolhas,
  },
  {
    id: 'atendimento',
    resumo: 'Atendimento',
    titulo: 'Como vão ser os atendimentos?',
    tipo: 'uma',
    obrigatoria: true,
    opcoes: [
      { valor: 'online', rotulo: 'Só online' },
      { valor: 'presencial', rotulo: 'Só presencial' },
      { valor: 'online-e-presencial', rotulo: 'Online e presencial' },
    ],
    campos: [
      {
        id: 'cidade',
        rotulo: 'Cidade',
        quando: ['presencial', 'online-e-presencial'],
        obrigatorio: true,
        aviso: 'Preencha a cidade para continuar.',
        autocomplete: 'address-level2',
      },
      {
        id: 'bairro',
        rotulo: 'Bairro',
        quando: ['presencial', 'online-e-presencial'],
        autocomplete: 'address-level3',
      },
    ],
    // "Online e presencial (Fortaleza, Aldeota)"
    resumir(resposta) {
      const escolha = rotulosMarcados(this, resposta)[0]
      if (!escolha) return ''

      const local = camposVisiveis(this, resposta)
        .map((id) => resposta.campos[id].trim())
        .filter(Boolean)

      return local.length ? `${escolha} (${local.join(', ')})` : escolha
    },
  },
  {
    id: 'publico',
    resumo: 'Público',
    titulo: 'Qual público você quer atender principalmente?',
    ajuda: 'Pode marcar mais de uma.',
    tipo: 'varias',
    obrigatoria: true,
    opcoes: [
      { valor: 'adultos', rotulo: 'Adultos' },
      { valor: 'mulheres', rotulo: 'Mulheres' },
      { valor: 'gestantes', rotulo: 'Gestantes e mães' },
      { valor: 'criancas', rotulo: 'Crianças' },
      { valor: 'adolescentes', rotulo: 'Adolescentes' },
      { valor: 'casais', rotulo: 'Casais' },
      { valor: 'idosos', rotulo: 'Idosos' },
      { valor: 'outro', rotulo: 'Outro', trocaPor: 'outro' },
    ],
    campos: [{ id: 'outro', rotulo: 'Qual?', quando: ['outro'] }],
    resumir: resumirEscolhas,
  },
  {
    id: 'abordagem',
    resumo: 'Abordagem',
    titulo: 'Qual abordagem você usa?',
    ajuda: 'Pode marcar mais de uma.',
    tipo: 'varias',
    obrigatoria: true,
    opcoes: [
      { valor: 'tcc', rotulo: 'TCC', descricao: 'Terapia Cognitivo-Comportamental' },
      { valor: 'psicanalise', rotulo: 'Psicanálise' },
      { valor: 'act', rotulo: 'ACT', descricao: 'Terapia de Aceitação e Compromisso' },
      { valor: 'humanista', rotulo: 'Humanista' },
      { valor: 'sistemica', rotulo: 'Sistêmica' },
      { valor: 'outra', rotulo: 'Outra', trocaPor: 'outra' },
    ],
    campos: [{ id: 'outra', rotulo: 'Qual?', quando: ['outra'] }],
    resumir: resumirEscolhas,
  },
  {
    id: 'equipe',
    resumo: 'Equipe',
    titulo: 'A equipe vai aparecer no site desde o começo?',
    tipo: 'uma',
    obrigatoria: true,
    opcoes: [
      { valor: 'sim', rotulo: 'Sim, já tenho psicólogas na equipe' },
      { valor: 'depois', rotulo: 'Ainda não, mas quero o espaço pronto para entrarem depois' },
      { valor: 'so-eu', rotulo: 'Por enquanto, só eu' },
    ],
    campos: [
      {
        id: 'quantidade',
        rotulo: 'Quantas, além de você?',
        quando: ['sim'],
        inputmode: 'numeric',
        curto: true,
        formatar: soDigitos(2),
      },
    ],
    // "Sim, 2 psicólogas além de mim"; sem o número, fica a frase da opção
    resumir(resposta) {
      if (resposta.selecao !== 'sim') return rotulosMarcados(this, resposta)[0] || ''

      const quantidade = Number.parseInt(resposta.campos.quantidade, 10)
      if (!quantidade) return 'Sim, já tenho psicólogas na equipe'

      return `Sim, ${quantidade} ${quantidade === 1 ? 'psicóloga' : 'psicólogas'} além de mim`
    },
  },
  {
    id: 'nome',
    resumo: 'Nome',
    titulo: 'O nome Nuárr já está confirmado?',
    tipo: 'uma',
    obrigatoria: true,
    opcoes: [
      { valor: 'confirmado', rotulo: 'Sim, é Nuárr' },
      { valor: 'contador', rotulo: 'Ainda estou vendo com o contador' },
      { valor: 'outro', rotulo: 'Estou pensando em outro nome' },
    ],
    campos: [{ id: 'outro', rotulo: 'Qual?', quando: ['outro'] }],
    resumir(resposta) {
      const outro = resposta.campos.outro.trim()
      if (resposta.selecao === 'outro' && outro) return `Estou pensando em outro nome: ${outro}`

      return rotulosMarcados(this, resposta)[0] || ''
    },
  },
  {
    id: 'crp',
    resumo: 'CRP',
    titulo: 'Qual é o seu CRP?',
    ajuda: 'Ele aparece no rodapé do site. Se preferir, me manda depois.',
    tipo: 'texto',
    obrigatoria: false,
    placeholder: '00/00000',
    inputmode: 'numeric',
    curto: true,
    formatar: formatarCrp,
    resumir: resumirTexto,
  },
  {
    id: 'sentimento',
    resumo: 'Como quer que a pessoa se sinta',
    titulo: 'Como você quer que a pessoa se sinta ao entrar no site?',
    tipo: 'textarea',
    obrigatoria: false,
    placeholder: 'Por exemplo: acolhida, segura e à vontade para marcar a primeira conversa.',
    resumir: resumirTexto,
  },
]

const TOTAL = perguntas.length
const TELA_FINAL = TOTAL + 1

// ---- respostas

// guardadas no localStorage do aparelho: se ela fechar a aba no meio, volta de
// onde parou. O sufixo de versão deixa mudar o formato sem ler lixo antigo
const CHAVE = 'quiz-nuarr:v1'

function respostaVazia(pergunta) {
  return {
    selecao: pergunta.tipo === 'varias' ? [] : '',
    campos: Object.fromEntries((pergunta.campos || []).map((campo) => [campo.id, ''])),
    texto: '',
  }
}

function respostasIniciais() {
  return Object.fromEntries(perguntas.map((pergunta) => [pergunta.id, respostaVazia(pergunta)]))
}

const respostas = reactive(respostasIniciais())

function camposVisiveis(pergunta, resposta = respostas[pergunta.id]) {
  return (pergunta.campos || [])
    .filter((campo) =>
      campo.quando.some((valor) =>
        Array.isArray(resposta.selecao) ? resposta.selecao.includes(valor) : resposta.selecao === valor
      )
    )
    .map((campo) => campo.id)
}

// o que falta para seguir, já no texto que aparece para ela; vazio = pode seguir
function pendenciaDe(pergunta) {
  const resposta = respostas[pergunta.id]

  if (pergunta.tipo === 'varias' && !resposta.selecao.length) {
    return 'Marque pelo menos uma opção para continuar.'
  }
  if (pergunta.tipo === 'uma' && !resposta.selecao) {
    return 'Escolha uma opção para continuar.'
  }

  const visiveis = camposVisiveis(pergunta, resposta)
  const faltando = (pergunta.campos || []).find(
    (campo) => campo.obrigatorio && visiveis.includes(campo.id) && !resposta.campos[campo.id].trim()
  )

  return faltando ? faltando.aviso : ''
}

function resumoDe(pergunta) {
  return pergunta.resumir(respostas[pergunta.id])
}

function vaziaDe(pergunta) {
  return !pergunta.obrigatoria && !resumoDe(pergunta)
}

const itensResumo = computed(() =>
  perguntas.map((pergunta) => ({
    id: pergunta.id,
    rotulo: pergunta.resumo,
    valor: resumoDe(pergunta),
  }))
)

// *negrito* é a marcação do próprio WhatsApp
const mensagem = computed(() => {
  const linhas = itensResumo.value.map(
    (item, indice) => `*${indice + 1}. ${item.rotulo}:* ${item.valor || 'não respondeu'}`
  )

  return ['*Briefing do site · Nuárr*', '', ...linhas].join('\n')
})

const linkWhatsapp = computed(
  () => `https://wa.me/${TELEFONE.replace('+', '')}?text=${encodeURIComponent(mensagem.value)}`
)

// ---- navegação

// 0 = abertura, 1 a TOTAL = perguntas, TELA_FINAL = resumo
const tela = ref(0)
const direcao = ref('avancar')

const perguntaAtual = computed(() =>
  tela.value >= 1 && tela.value <= TOTAL ? perguntas[tela.value - 1] : null
)

const textoContador = computed(() =>
  perguntaAtual.value ? `Pergunta ${tela.value} de ${TOTAL}` : 'Revisão'
)

const progresso = computed(() => (perguntaAtual.value ? tela.value / TOTAL : 1))

function irPara(destino, sentido) {
  direcao.value = sentido || (destino >= tela.value ? 'avancar' : 'voltar')
  tela.value = destino
}

// o resumo só abre com as obrigatórias em dia; se alguma ficou para trás, ela
// cai direto nessa pergunta
function irParaFinal() {
  const pendente = perguntas.findIndex((pergunta) => pendenciaDe(pergunta))
  if (pendente === -1) irPara(TELA_FINAL, 'avancar')
  else irPara(pendente + 1)
}

function comecar() {
  irPara(1, 'avancar')
}

// edição a partir do resumo: uma pergunta só, com "Salvar" e "Cancelar". A
// cópia guardada é o que o Cancelar devolve
const editando = ref(false)
const ultimaAlterada = ref('')
let copiaAntesDeEditar = null

function alterar(id) {
  const indice = perguntas.findIndex((pergunta) => pergunta.id === id)
  if (indice === -1) return

  copiaAntesDeEditar = JSON.parse(JSON.stringify(respostas[id]))
  editando.value = true
  ultimaAlterada.value = id
  irPara(indice + 1, 'voltar')
}

function sairDaEdicao() {
  editando.value = false
  copiaAntesDeEditar = null
}

function continuar() {
  if (editando.value) {
    sairDaEdicao()
    irParaFinal()
    return
  }

  if (tela.value < TOTAL) irPara(tela.value + 1, 'avancar')
  else irParaFinal()
}

function voltar() {
  if (editando.value) {
    const pergunta = perguntaAtual.value
    if (pergunta && copiaAntesDeEditar) Object.assign(respostas[pergunta.id], copiaAntesDeEditar)
    sairDaEdicao()
    irPara(TELA_FINAL, 'avancar')
    return
  }

  irPara(Math.max(tela.value - 1, 0), 'voltar')
}

function recomecar() {
  Object.assign(respostas, respostasIniciais())
  sairDaEdicao()
  ultimaAlterada.value = ''

  try {
    localStorage.removeItem(CHAVE)
  } catch {
    // sem storage (aba anônima do Safari, por exemplo): só não há o que apagar
  }

  irPara(0, 'voltar')
}

// chamado com a tela nova já no DOM e ainda invisível: o scroll acontece antes
// do primeiro quadro, sem salto. O foco vai para o título, para o leitor de
// tela anunciar a pergunta nova; voltando de uma edição, vai para o "Alterar"
// daquela pergunta, que é onde ela estava
function aoEntrar(elemento) {
  const voltandoDaEdicao = tela.value === TELA_FINAL && ultimaAlterada.value
  const alvoEdicao = voltandoDaEdicao
    ? elemento.querySelector(`[data-alterar="${ultimaAlterada.value}"]`)
    : null

  if (alvoEdicao) {
    alvoEdicao.scrollIntoView({ block: 'center', behavior: 'instant' })
    alvoEdicao.focus({ preventScroll: true })
    ultimaAlterada.value = ''
    return
  }

  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  elemento.querySelector('[data-foco-inicial]')?.focus({ preventScroll: true })
}

// ---- progresso salvo no aparelho

let restaurado = false

function restaurar() {
  let salvo = null
  try {
    salvo = JSON.parse(localStorage.getItem(CHAVE) || 'null')
  } catch {
    salvo = null
  }
  if (!salvo || typeof salvo !== 'object') return

  // campo a campo e conferindo o tipo: um valor velho ou corrompido não pode
  // derrubar a página, no máximo é ignorado
  for (const pergunta of perguntas) {
    const guardada = salvo.respostas?.[pergunta.id]
    if (!guardada || typeof guardada !== 'object') continue

    const resposta = respostas[pergunta.id]
    const validos = (pergunta.opcoes || []).map((opcao) => opcao.valor)

    if (pergunta.tipo === 'varias' && Array.isArray(guardada.selecao)) {
      resposta.selecao = validos.filter((valor) => guardada.selecao.includes(valor))
    }
    if (pergunta.tipo === 'uma' && validos.includes(guardada.selecao)) {
      resposta.selecao = guardada.selecao
    }
    for (const id of Object.keys(resposta.campos)) {
      if (typeof guardada.campos?.[id] === 'string') resposta.campos[id] = guardada.campos[id]
    }
    if (typeof guardada.texto === 'string') resposta.texto = guardada.texto
  }

  const telaSalva = Number(salvo.tela)
  if (!Number.isInteger(telaSalva) || telaSalva <= 0 || telaSalva > TELA_FINAL) return

  if (telaSalva === TELA_FINAL) irParaFinal()
  else irPara(telaSalva, 'avancar')
}

function salvar() {
  if (!restaurado) return

  try {
    localStorage.setItem(CHAVE, JSON.stringify({ tela: tela.value, respostas }))
  } catch {
    // storage cheio ou bloqueado: o quiz segue funcionando, só não lembra depois
  }
}

watch([tela, respostas], salvar, { deep: true })

onMounted(async () => {
  restaurar()
  restaurado = true

  // O plugins/smooth-scroll.client.js cria o ScrollSmoother em toda página.
  // Sem #smooth-wrapper (caso das páginas sem layout), ele embrulha o #__nuxt
  // num div fixo com overflow hidden e rola movendo o conteúdo por transform.
  // Aqui isso quebra três coisas: o sticky da barra de botões (ela subia junto
  // com a lista e cobria o campo "Qual?"), o scrollIntoView dos campos que
  // abrem e a rolagem que o navegador faz ao focar um campo com o teclado
  // aberto. O kill() devolve o estilo original do wrapper e do conteúdo, e a
  // rolagem volta a ser a nativa. Esta página não tem link interno, então não
  // há para onde levar o smoother de volta
  const { ScrollSmoother } = await import('gsap/ScrollSmoother')
  ScrollSmoother.get()?.kill()
})

// ---- head

useHead({
  title: 'Briefing do site · Nuárr',
  // fundo da marca também no html e no body: sem isso o "puxar" da rolagem no
  // iPhone mostra o preto do site do Gustavo nas bordas
  htmlAttrs: { style: 'background-color: #F3ECE3' },
  bodyAttrs: { style: 'background-color: #F3ECE3' },
  meta: [
    { name: 'description', content: 'Oito perguntas rápidas para desenhar o site da Nuárr Clínica de Psicologia.' },
    // página privada de cliente: fora da busca e sem seguir links
    { name: 'robots', content: 'noindex, nofollow' },
    { name: 'theme-color', content: '#F3ECE3' },
    // é o que o WhatsApp mostra na prévia do link
    { property: 'og:title', content: 'Briefing do site · Nuárr' },
    { property: 'og:description', content: 'Oito perguntas rápidas para desenhar o site da clínica.' },
    { name: 'twitter:title', content: 'Briefing do site · Nuárr' },
    { name: 'twitter:description', content: 'Oito perguntas rápidas para desenhar o site da clínica.' },
  ],
})
</script>

<style scoped lang="sass">
// Paleta da Nuárr. O secundário da marca (#8A7462) dá 3,8:1 sobre o off-white
// e 3,1:1 sobre a areia, abaixo do AA para texto pequeno. Ele segue nas bordas
// dos controles e nos placeholders (--nuarr-texto-3), e o texto secundário usa
// o mesmo tom um pouco mais fechado (--nuarr-texto-2), que passa nos dois fundos.
.quiz
  --nuarr-fundo: #F3ECE3
  --nuarr-fundo-transparente: rgba(243, 236, 227, 0)
  --nuarr-areia: #E3D5C4
  --nuarr-areia-media: rgba(227, 213, 196, 0.75)
  --nuarr-areia-suave: rgba(227, 213, 196, 0.5)
  --nuarr-taupe: #A68C76
  --nuarr-linha: rgba(166, 140, 118, 0.3)
  --nuarr-marrom: #4A3428
  --nuarr-marrom-hover: #5E4536
  --nuarr-ocre: #B58646
  --nuarr-ocre-borda: rgba(181, 134, 70, 0.35)
  --nuarr-ocre-halo: rgba(181, 134, 70, 0.22)
  --nuarr-texto-2: #6E5948
  --nuarr-texto-3: #8A7462
  --nuarr-campo: #FBF8F4

  min-height: 100svh
  padding: 48px 24px 0
  // clip e não hidden: hidden viraria contêiner de rolagem e quebraria o
  // position: sticky dos botões das perguntas
  overflow-x: clip
  background: radial-gradient(ellipse 90% 55% at 50% -12%, rgba(227, 213, 196, 0.9) 0%, rgba(227, 213, 196, 0) 70%), var(--nuarr-fundo)
  color: var(--nuarr-marrom)

  @media screen and (max-width: 1000px)
    padding: 20px 20px 0

  :deep(::selection)
    color: var(--nuarr-marrom)
    background: rgba(181, 134, 70, 0.3)

.quiz__coluna
  position: relative
  display: flex
  flex-direction: column
  width: 100%
  max-width: 560px
  min-height: calc(100svh - 48px)
  margin: 0 auto

  @media screen and (max-width: 1000px)
    min-height: calc(100svh - 20px)

.quiz__palco
  display: flex
  flex: 1
  flex-direction: column

// ---- cabeçalho das perguntas

// absoluto: entra e sai sem empurrar a tela que está saindo
.cabecalho
  position: absolute
  top: 0
  right: 0
  left: 0
  z-index: 1

.cabecalho__linha
  display: flex
  align-items: center
  justify-content: space-between
  gap: 16px

.cabecalho__simbolo
  display: block
  width: 42px
  height: auto

.cabecalho__contador
  font-family: var(--light)
  font-size: 14px
  color: var(--nuarr-texto-2)
  font-variant-numeric: tabular-nums

.cabecalho__barra
  height: 4px
  margin-top: 14px
  overflow: hidden
  border-radius: 999px
  background: var(--nuarr-linha)

.cabecalho__progresso
  display: block
  height: 100%
  border-radius: 999px
  background: var(--nuarr-ocre)
  transition: width 0.45s cubic-bezier(0.22, 1, 0.36, 1)

// o cabeçalho espera a abertura sair para aparecer
.cabecalho-enter-active
  transition: opacity 0.3s ease-out 0.18s

.cabecalho-leave-active
  transition: opacity 0.18s ease-in

.cabecalho-enter-from,
.cabecalho-leave-to
  opacity: 0

// ---- troca de tela: some rápido, entra com calma, e o deslocamento acompanha
// o sentido (avançar vem da direita, voltar vem da esquerda)
.tela-avancar-enter-active,
.tela-voltar-enter-active
  transition: opacity 0.3s ease-out, transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)

.tela-avancar-leave-active,
.tela-voltar-leave-active
  transition: opacity 0.18s ease-in, transform 0.18s ease-in

.tela-avancar-enter-from,
.tela-voltar-leave-to
  opacity: 0
  transform: translateX(16px)

.tela-avancar-leave-to,
.tela-voltar-enter-from
  opacity: 0
  transform: translateX(-16px)

@media (prefers-reduced-motion: reduce)
  .cabecalho__progresso,
  .cabecalho-enter-active,
  .cabecalho-leave-active,
  .tela-avancar-enter-active,
  .tela-voltar-enter-active,
  .tela-avancar-leave-active,
  .tela-voltar-leave-active
    transition: none

  .tela-avancar-enter-from,
  .tela-voltar-leave-to,
  .tela-avancar-leave-to,
  .tela-voltar-enter-from
    transform: none
</style>
