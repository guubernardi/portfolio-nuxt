<template>
  <main class="servico">
    <div class="luz" aria-hidden="true">
      <span class="luz__nucleo"></span>
      <span class="luz__feixe"></span>
    </div>

    <NavTopo />

    <section class="abertura">
      <div class="selo">
        <span class="selo__ponto"></span>
        Disponível para novos projetos
      </div>

      <h1 class="abertura__titulo">
        <span class="abertura__linha">{{ servico.titulo }}</span>
        <span class="abertura__linha abertura__titulo--leve">{{ servico.chamada }}</span>
      </h1>

      <p class="abertura__texto">{{ servico.resumo }}</p>

      <div class="abertura__acoes">
        <a class="acao acao--primaria" :href="linkWhatsapp" target="_blank" rel="noopener">
          Solicitar orçamento
          <SvgIcone nome="whatsapp" />
        </a>
        <a v-if="exemplos.length" class="acao acao--secundaria" href="#exemplos">
          {{ servico.acaoExemplos }}
        </a>
      </div>
    </section>

    <section class="bloco">
      <span class="bloco__rotulo revelar" v-revelar><b>01</b> O problema</span>
      <h2 class="bloco__titulo revelar" v-revelar="90">
        <span class="bloco__linha">{{ servico.problema.titulo }}</span>
        <span class="bloco__linha bloco__titulo--leve">{{ servico.problema.chamada }}</span>
      </h2>
      <p class="bloco__texto revelar" v-revelar="170">{{ servico.problema.texto }}</p>

      <ul class="duvidas">
        <li
          v-for="(duvida, i) in servico.problema.duvidas"
          :key="duvida"
          class="duvida revelar"
          v-revelar="i * 55"
        >
          <SvgIcone nome="check" cor="#46e08a" :tamanho="18" />
          {{ duvida }}
        </li>
      </ul>
    </section>

    <section class="bloco">
      <span class="bloco__rotulo revelar" v-revelar><b>02</b> O que você recebe</span>
      <h2 class="bloco__titulo revelar" v-revelar="90">
        <span class="bloco__linha">{{ servico.entregasTitulo.titulo }}</span>
        <span class="bloco__linha bloco__titulo--leve">{{ servico.entregasTitulo.chamada }}</span>
      </h2>

      <ul class="entregas">
        <li
          v-for="(item, i) in servico.entregas"
          :key="item.titulo"
          class="entrega revelar"
          v-revelar="i * 70"
        >
          <span class="entrega__numero">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3 class="entrega__titulo">{{ item.titulo }}</h3>
          <p class="entrega__texto">{{ item.texto }}</p>
        </li>
      </ul>
    </section>

    <!-- some junto com a prova: seção de exemplo sem exemplo é seção vazia -->
    <section v-if="exemplos.length" id="exemplos" class="bloco">
      <span class="bloco__rotulo revelar" v-revelar><b>03</b> Já no ar</span>
      <h2 class="bloco__titulo revelar" v-revelar="90">
        <span class="bloco__linha">{{ servico.exemplosTitulo.titulo }}</span>
        <span class="bloco__linha bloco__titulo--leve">{{ servico.exemplosTitulo.chamada }}</span>
      </h2>

      <ul class="exemplos" :class="{ 'exemplos--unico': exemplos.length === 1 }">
        <li
          v-for="(projeto, i) in exemplos"
          :key="projeto.id"
          class="exemplo revelar"
          v-revelar="i * 90"
        >
          <NuxtLink class="exemplo__area" :to="`/projetos/${projeto.slug}`">
            <img
              :src="projeto.imagem"
              :alt="`${projeto.nome} — ${projeto.categoria} para ${projeto.setor}`"
              :width="projeto.largura"
              :height="projeto.altura"
              loading="lazy"
              decoding="async"
            />
            <div class="exemplo__base">
              <h3 class="exemplo__nome">{{ projeto.nome }}</h3>
              <p class="exemplo__resumo">{{ projeto.resumo }}</p>
              <span class="exemplo__cta">
                Ver o case
                <SvgIcone nome="seta-direita" />
              </span>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </section>

    <section class="bloco">
      <span class="bloco__rotulo revelar" v-revelar><b>04</b> Como funciona</span>
      <h2 class="bloco__titulo revelar" v-revelar="90">
        <span class="bloco__linha">Do primeiro contato</span>
        <span class="bloco__linha bloco__titulo--leve">ao site no ar.</span>
      </h2>

      <div
        class="linha-tempo"
        :class="{ 'linha-tempo--ativa': percorrida }"
        :style="{ '--avanco': avanco }"
      >
        <!-- fica fora do <ol> porque lista ordenada só aceita <li> dentro -->
        <span class="linha-tempo__corredor" aria-hidden="true">
          <span class="linha-tempo__avanco"></span>
          <span class="linha-tempo__bola"></span>
        </span>

        <ol
          ref="etapasRef"
          class="etapas etapas--animada"
          :class="{ 'etapas--ativa': percorrida }"
        >
          <li v-for="(etapa, i) in ETAPAS" :key="etapa.titulo" class="etapa" :style="{ '--i': i }">
            <span class="etapa__marca" aria-hidden="true">
              <span class="etapa__ponto"></span>
              <span v-if="i < ETAPAS.length - 1" class="etapa__trilho"></span>
            </span>

            <div class="etapa__caixa">
              <span class="etapa__numero">{{ String(i + 1).padStart(2, '0') }}</span>
              <h3 class="etapa__titulo">{{ etapa.titulo }}</h3>
              <p class="etapa__texto">{{ etapa.texto }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <section class="bloco">
      <span class="bloco__rotulo revelar" v-revelar><b>05</b> Dúvidas</span>
      <h2 class="bloco__titulo revelar" v-revelar="90">
        <span class="bloco__linha">O que perguntam</span>
        <span class="bloco__linha bloco__titulo--leve">antes de começar.</span>
      </h2>

      <ul class="faq">
        <li
          v-for="(item, i) in servico.perguntas"
          :key="item.pergunta"
          class="pergunta revelar"
          :class="{ 'pergunta--aberta': aberta === i }"
          v-revelar="i * 55"
        >
          <button
            class="pergunta__gatilho"
            type="button"
            :aria-expanded="aberta === i"
            :aria-controls="`resposta-${i}`"
            @click="alternar(i)"
          >
            <span>{{ item.pergunta }}</span>
            <span class="pergunta__sinal" aria-hidden="true"></span>
          </button>
          <div :id="`resposta-${i}`" class="pergunta__corpo" role="region">
            <p class="pergunta__resposta">{{ item.resposta }}</p>
          </div>
        </li>
      </ul>
    </section>

    <section class="fecho">
      <h2 class="fecho__titulo revelar" v-revelar>
        <span class="fecho__linha">{{ servico.fecho.titulo }}</span>
        <span class="fecho__linha fecho__titulo--leve">{{ servico.fecho.chamada }}</span>
      </h2>
      <p class="fecho__texto revelar" v-revelar="90">{{ servico.fecho.texto }}</p>
      <div class="fecho__acoes revelar" v-revelar="170">
        <a class="acao acao--primaria" :href="linkWhatsapp" target="_blank" rel="noopener">
          Chamar no WhatsApp
          <SvgIcone nome="whatsapp" />
        </a>
        <NuxtLink to="/projetos" class="acao acao--secundaria">Ver todos os projetos</NuxtLink>
      </div>
    </section>

    <footer class="rodape">
      <NuxtLink to="/" class="rodape__marca">
        <Svgs nome="logo" />
        Gustavo Bernardi
      </NuxtLink>
      <span class="rodape__copy">© {{ ano }} Todos os direitos reservados.</span>
    </footer>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import Svgs from '~/components/global/svgs/Svgs.vue'
import { PROJETOS } from '~/helpers/projetos'
import { ETAPAS, servicoPorSlug } from '~/helpers/servicos'
import { SITE_URL, SITE_NOME, TELEFONE, ID_ORGANIZACAO, ID_SITE, urlCanonica } from '~/helpers/site'

// A estrutura da página de serviço mora aqui e o conteúdo mora no
// helpers/servicos.js. São cinco nichos com o mesmo esqueleto: manter cinco
// cópias deste arquivo garantiria que a primeira correção de estilo passasse a
// valer em uma só delas.
const props = defineProps({
  slug: { type: String, required: true },
})

const servico = servicoPorSlug(props.slug)

if (!servico) {
  throw createError({
    statusCode: 404,
    statusMessage: `Serviço não encontrado: ${props.slug}`,
    fatal: true,
  })
}

const ano = new Date().getFullYear()

const linkWhatsapp =
  `https://wa.me/${TELEFONE.replace('+', '')}?text=` +
  encodeURIComponent(servico.mensagemWhatsapp)

// a prova sai do próprio portfólio: se entrar outro projeto do nicho, ele
// aparece aqui sozinho, sem precisar editar esta página
const exemplos = computed(() =>
  PROJETOS.filter((p) => p.slug && servico.filtroSetor.test(p.setor))
)

const aberta = ref(0)
function alternar(i) {
  aberta.value = aberta.value === i ? -1 : i
}

// a timeline das etapas. IntersectionObserver em vez de ScrollTrigger porque esta
// página roda com layout: false, fora do #smooth-wrapper que o ScrollSmoother
// controla. A classe --animada já vem do servidor, então não existe o quadro em
// que a seção aparece inteira antes do JS escondê-la
const etapasRef = ref(null)
const percorrida = ref(false)
const avanco = ref(0)
let observador = null
let quadro = 0

// a bola anda conforme a lista sobe pela tela: 0 quando ela entra lá embaixo, 1
// quando chega à altura de leitura. É por isso que o valor é uma fração, e não
// pixels: quem posiciona é o CSS, que já sabe onde estão o primeiro e o último ponto
function medirAvanco() {
  const lista = etapasRef.value
  if (!lista) return

  const topo = lista.getBoundingClientRect().top
  const partida = window.innerHeight * 0.82
  const chegada = window.innerHeight * 0.3
  const bruto = (partida - topo) / (partida - chegada)

  avanco.value = Math.min(1, Math.max(0, bruto))
}

// o scroll dispara muito mais que uma vez por quadro; sem isto o cálculo roda
// dezenas de vezes para uma pintura só
function aoRolar() {
  if (quadro) return
  quadro = requestAnimationFrame(() => {
    quadro = 0
    medirAvanco()
  })
}

onMounted(() => {
  const lista = etapasRef.value
  if (!lista) return

  observador = new IntersectionObserver(
    (entradas) => {
      if (!entradas[0].isIntersecting) return
      percorrida.value = true
      observador.disconnect()
    },
    // o percurso começa com a lista já dentro da tela, não ao encostar a borda
    { rootMargin: '0px 0px -18% 0px' }
  )

  observador.observe(lista)

  // quem pediu menos movimento recebe a barra cheia e parada, sem ouvinte de scroll
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    avanco.value = 1
    return
  }

  window.addEventListener('scroll', aoRolar, { passive: true })
  window.addEventListener('resize', aoRolar)
  medirAvanco()
})

onBeforeUnmount(() => {
  observador?.disconnect()
  window.removeEventListener('scroll', aoRolar)
  window.removeEventListener('resize', aoRolar)
  if (quadro) cancelAnimationFrame(quadro)
})

const canonica = urlCanonica(`/${servico.slug}`)
const TITULO = servico.tituloSeo
const DESCRICAO = servico.descricaoSeo

useHead({
  title: TITULO,
  link: [{ rel: 'canonical', href: canonica }],

  // o estado inicial da timeline vem no HTML, entao sem JS o observer nunca roda
  // e a secao 04 ficaria invisivel. isto devolve as etapas de pe
  noscript: [
    {
      children:
        '<style>.etapas--animada .etapa__ponto,.etapas--animada .etapa__trilho,' +
        '.etapas--animada .etapa__caixa{opacity:1!important;transform:none!important}</style>',
    },
  ],

  meta: [
    { name: 'description', content: DESCRICAO },
    { property: 'og:title', content: `${TITULO} | ${SITE_NOME}` },
    { property: 'og:description', content: DESCRICAO },
    { property: 'og:url', content: canonica },
    { name: 'twitter:title', content: `${TITULO} | ${SITE_NOME}` },
    { name: 'twitter:description', content: DESCRICAO },
  ],

  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Início', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: servico.titulo, item: canonica },
            ],
          },
          {
            '@type': 'Service',
            '@id': `${canonica}#servico`,
            name: servico.servicoSeo,
            description: DESCRICAO,
            serviceType: servico.servicoSeo,
            provider: { '@id': ID_ORGANIZACAO },
            areaServed: { '@type': 'Country', name: 'Brasil' },
            audience: { '@type': 'Audience', audienceType: servico.publicoSeo },
            url: canonica,
          },
          {
            '@type': 'WebPage',
            '@id': `${canonica}#pagina`,
            url: canonica,
            name: `${TITULO} | ${SITE_NOME}`,
            description: DESCRICAO,
            inLanguage: 'pt-BR',
            isPartOf: { '@id': ID_SITE },
            about: { '@id': `${canonica}#servico` },
          },
          {
            '@type': 'FAQPage',
            '@id': `${canonica}#duvidas`,
            mainEntity: servico.perguntas.map((p) => ({
              '@type': 'Question',
              name: p.pergunta,
              acceptedAnswer: { '@type': 'Answer', text: p.resposta },
            })),
          },
        ],
      }),
    },
  ],
})
</script>

<style scoped lang="sass">
.servico
  position: relative
  width: 100%
  min-height: 100svh
  overflow: hidden
  color: var(--cor-branco)
  background: linear-gradient(180deg, #05142a 0%, #020a18 14%, #01060f 40%, #020814 68%, #04101f 100%)

.luz
  position: absolute
  inset: 0
  z-index: 0
  pointer-events: none

.luz__nucleo
  position: absolute
  top: -180px
  left: 50%
  width: min(1100px, 130vw)
  height: 520px
  transform: translateX(-50%)
  background: radial-gradient(ellipse at center, rgba(60, 110, 220, 0.26) 0%, rgba(40, 90, 190, 0.1) 46%, transparent 72%)

.luz__feixe
  position: absolute
  top: 100px
  left: 50%
  width: min(940px, 96vw)
  height: 2px
  transform: translateX(-50%)
  background: linear-gradient(90deg, transparent 0%, rgba(160, 195, 255, 0.5) 24%, rgba(255, 255, 255, 0.9) 50%, rgba(160, 195, 255, 0.5) 76%, transparent 100%)
  box-shadow: 0 0 28px 4px rgba(130, 175, 255, 0.4)

// A abertura já está na tela quando a página abre, então ela entra por animação
// de CSS e não pelo observer. O h1 fica de fora de propósito: o Chrome não aceita
// como candidato a LCP um elemento transparente no primeiro quadro, e não
// reavalia depois. Foi exatamente assim que a home perdeu a métrica uma vez.
@keyframes entrarAbertura
  from
    opacity: 0
    transform: translateY(18px)
  to
    opacity: 1
    transform: none

.selo
  animation: entrarAbertura 0.7s cubic-bezier(0.22, 1, 0.36, 1) both
  display: inline-flex
  align-items: center
  gap: 10px
  padding: 9px 20px
  border: 1px solid rgba(255, 255, 255, 0.14)
  border-radius: 100px
  background: rgba(255, 255, 255, 0.04)
  backdrop-filter: blur(10px)
  -webkit-backdrop-filter: blur(10px)
  font-family: var(--light)
  font-size: 14px
  color: rgba(255, 255, 255, 0.78)

  &__ponto
    width: 7px
    height: 7px
    border-radius: 50%
    background: #46e08a
    box-shadow: 0 0 0 4px rgba(70, 224, 138, 0.16)

.abertura
  position: relative
  z-index: 1
  width: 100%
  max-width: 900px
  margin: 0 auto
  padding: 190px 60px 0 60px
  text-align: center

  &__linha
    display: block

  &__titulo
    margin: 30px 0 0 0
    font-family: var(--semibold)
    font-size: clamp(36px, 5.4vw, 70px)
    line-height: 1.05
    letter-spacing: -0.03em
    text-wrap: balance

    &--leve
      font-family: var(--light)
      color: #8aa6f0

  &__texto
    max-width: 620px
    margin: 24px auto 0 auto
    animation: entrarAbertura 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.16s both
    text-wrap: pretty
    font-family: var(--light)
    font-size: clamp(15px, 1.35vw, 18px)
    line-height: 1.68
    color: rgba(255, 255, 255, 0.6)

  &__acoes
    display: flex
    flex-wrap: wrap
    align-items: center
    justify-content: center
    gap: 14px
    margin: 36px 0 0 0
    animation: entrarAbertura 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.28s both

.acao
  display: inline-flex
  align-items: center
  justify-content: center
  gap: 12px
  padding: 17px 34px
  border: 1px solid transparent
  border-radius: 12px
  font-family: var(--semibold)
  font-size: 15px
  line-height: 1
  text-decoration: none
  cursor: pointer
  transition: background 0.4s ease, border-color 0.4s ease

  :deep(svg)
    width: 15px
    height: 15px

  &--primaria
    background: var(--cor-branco)
    color: #050505

    &:hover
      background: rgba(255, 255, 255, 0.86)

  &--secundaria
    border-color: rgba(125, 155, 255, 0.2)
    background: rgba(30, 46, 115, 0.38)
    color: rgba(255, 255, 255, 0.88)

    &:hover
      background: rgba(125, 155, 255, 0.16)
      border-color: rgba(140, 165, 255, 0.3)

.bloco
  position: relative
  z-index: 1
  width: 100%
  max-width: 1720px
  margin: 0 auto
  padding: 120px 60px 0 60px

  &::before
    content: ''
    position: absolute
    top: 4%
    z-index: -1
    width: min(820px, 78vw)
    height: 620px
    pointer-events: none
    background: radial-gradient(ellipse at center, rgba(42, 84, 200, 0.16) 0%, rgba(26, 52, 132, 0.06) 44%, transparent 70%)

  &:nth-of-type(odd)::before
    left: -220px

  &:nth-of-type(even)::before
    right: -220px

  &__rotulo
    display: flex
    justify-content: center
    align-items: center
    gap: 10px
    margin-bottom: 18px
    font-family: var(--light)
    font-size: 12px
    letter-spacing: 2.4px
    text-transform: uppercase
    color: rgba(255, 255, 255, 0.45)

    b
      font-family: var(--semibold)
      font-style: italic
      color: rgba(255, 255, 255, 0.75)

  &__linha
    display: block

  &__titulo
    margin: 0
    font-family: var(--semibold)
    font-size: clamp(28px, 3.6vw, 48px)
    line-height: 1.1
    letter-spacing: -0.02em
    text-align: center
    text-wrap: balance

    &--leve
      font-family: var(--light)
      color: #8aa6f0

  &__texto
    max-width: 780px
    margin: 26px auto 0 auto
    text-align: center
    text-wrap: pretty
    font-family: var(--light)
    font-size: clamp(15px, 1.3vw, 18px)
    line-height: 1.74
    color: rgba(255, 255, 255, 0.6)

.duvidas
  display: grid
  grid-template-columns: repeat(2, 1fr)
  gap: 4px 46px
  width: 100%
  max-width: 1000px
  margin: 40px auto 0 auto
  padding: 0
  list-style: none

.duvida
  display: flex
  align-items: flex-start
  gap: 12px
  padding: 14px 0
  font-family: var(--light)
  font-size: 16px
  line-height: 1.55
  color: rgba(255, 255, 255, 0.72)

  :deep(svg)
    flex-shrink: 0
    margin-top: 2px

.entregas
  display: grid
  grid-template-columns: repeat(3, 1fr)
  gap: 22px
  margin: 44px 0 0 0
  padding: 0
  list-style: none

.entrega
  padding: 30px 28px 32px 28px
  border: 1px solid rgba(255, 255, 255, 0.07)
  border-radius: 20px
  background: rgba(255, 255, 255, 0.025)

  &__numero
    font-family: var(--semibold)
    font-style: italic
    font-size: 13px
    color: rgba(138, 166, 240, 0.75)

  &__titulo
    margin: 12px 0 0 0
    font-family: var(--semibold)
    font-size: 18px
    line-height: 1.32

  &__texto
    margin: 12px 0 0 0
    font-family: var(--light)
    font-size: 15px
    line-height: 1.7
    color: rgba(255, 255, 255, 0.58)

.exemplos
  display: grid
  grid-template-columns: repeat(2, 1fr)
  gap: 26px
  margin: 44px 0 0 0
  padding: 0
  list-style: none

// com um exemplo so, duas colunas deixariam metade da linha vazia
.exemplos--unico
  grid-template-columns: minmax(0, 720px)
  justify-content: center

.exemplo
  &__area
    display: block
    padding: 14px 14px 24px 14px
    border: 1px solid rgba(255, 255, 255, 0.07)
    border-radius: 22px
    background: rgba(255, 255, 255, 0.025)
    text-decoration: none
    transition: border-color 0.4s ease, background 0.4s ease

    &:hover
      border-color: rgba(140, 165, 255, 0.28)
      background: rgba(30, 46, 115, 0.3)

      .exemplo__cta :deep(svg)
        transform: translateX(4px)

    img
      display: block
      width: 100%
      height: auto
      aspect-ratio: 16 / 10
      object-fit: cover
      border-radius: 14px

  &__base
    padding: 22px 12px 0 12px

  &__nome
    margin: 0
    font-family: var(--semibold)
    font-size: clamp(19px, 1.6vw, 23px)
    color: var(--cor-branco)

  &__resumo
    margin: 10px 0 0 0
    font-family: var(--light)
    font-size: 15px
    line-height: 1.6
    color: rgba(255, 255, 255, 0.55)

  &__cta
    display: inline-flex
    align-items: center
    gap: 9px
    margin: 18px 0 0 0
    font-family: var(--semibold)
    font-size: 14px
    color: #8aa6f0

    :deep(svg)
      width: 13px
      height: 13px
      transition: transform 0.4s ease

// segura a bola por cima da lista. a margem sai do <ol> e vem para ca, senao o
// corredor nao teria como se alinhar com a fileira de pontos
.linha-tempo
  position: relative
  margin: 52px 0 0 0

  // vai do centro do primeiro ponto ao centro do ultimo: 6px de raio de um lado,
  // uma coluna inteira menos o raio do outro
  &__corredor
    position: absolute
    top: 6px
    left: 6px
    right: calc((100% - 66px) / 4 - 6px)
    height: 1px
    opacity: 0
    // entra depois de os pontos comecarem a aparecer, senao chega antes do trilho
    transition: opacity 0.5s ease 0.45s

  &__avanco
    position: absolute
    top: 0
    left: 0
    width: calc(var(--avanco, 0) * 100%)
    height: 1px
    background: linear-gradient(to right, rgba(138, 166, 240, 0.45), #8aa6f0)

  &__bola
    position: absolute
    top: 50%
    left: calc(var(--avanco, 0) * 100%)
    width: 14px
    height: 14px
    border-radius: 50%
    background: #a9c4ff
    box-shadow: 0 0 0 5px rgba(138, 166, 240, 0.14), 0 0 18px 2px rgba(138, 166, 240, 0.55)
    transform: translate(-50%, -50%)

  &--ativa &__corredor
    opacity: 1

.etapas
  display: grid
  grid-template-columns: repeat(4, 1fr)
  gap: 22px
  margin: 0
  padding: 0
  list-style: none

.etapa
  display: flex
  flex-direction: column

  &__marca
    position: relative
    display: flex
    align-items: center
    height: 12px
    margin-bottom: 22px

  &__ponto
    flex-shrink: 0
    width: 12px
    height: 12px
    border: 1px solid rgba(125, 155, 255, 0.5)
    border-radius: 50%
    background: rgba(30, 46, 115, 0.8)
    box-shadow: 0 0 0 5px rgba(125, 155, 255, 0.06)

  // o trilho avanca os 22px do vao do grid para encostar no ponto seguinte,
  // senao a linha quebraria a cada card
  &__trilho
    flex: 1
    height: 1px
    margin: 0 -22px 0 10px
    transform-origin: left center
    background: linear-gradient(to right, rgba(125, 155, 255, 0.36), rgba(125, 155, 255, 0.1))

  // a caixa cresce para todos os cards fecharem na mesma altura
  &__caixa
    flex: 1
    padding: 28px 26px 30px 26px
    border: 1px solid rgba(255, 255, 255, 0.07)
    border-radius: 20px
    background: rgba(255, 255, 255, 0.025)

  &__numero
    font-family: var(--semibold)
    font-style: italic
    font-size: 13px
    color: rgba(138, 166, 240, 0.75)

  &__titulo
    margin: 12px 0 0 0
    font-family: var(--semibold)
    font-size: 18px

  &__texto
    margin: 10px 0 0 0
    font-family: var(--light)
    font-size: 15px
    line-height: 1.65
    color: rgba(255, 255, 255, 0.58)

// --animada so entra pelo JS: sem script, ou com movimento reduzido, a secao
// nasce visivel e nada aqui a esconde
.etapas--animada
  .etapa__ponto
    opacity: 0
    transform: scale(0.2)
    transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.35s ease
    transition-delay: calc(var(--i) * 0.24s)

  .etapa__trilho
    transform: scaleX(0)
    transition: transform 0.42s ease-in-out
    transition-delay: calc(var(--i) * 0.24s + 0.16s)

  .etapa__caixa
    opacity: 0
    transform: translateY(22px)
    transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease
    transition-delay: calc(var(--i) * 0.24s + 0.08s)

.etapas--ativa
  .etapa__ponto
    opacity: 1
    transform: scale(1)

  .etapa__trilho
    transform: scaleX(1)

  .etapa__caixa
    opacity: 1
    transform: none

.faq
  width: 100%
  max-width: 900px
  margin: 40px auto 0 auto
  padding: 0
  list-style: none

.pergunta
  border-bottom: 1px solid rgba(255, 255, 255, 0.08)

  &__gatilho
    display: flex
    align-items: center
    justify-content: space-between
    gap: 20px
    width: 100%
    padding: 26px 0
    border: none
    background: none
    font-family: var(--semibold)
    font-size: clamp(16px, 1.4vw, 19px)
    text-align: left
    color: var(--cor-branco)
    cursor: pointer

  &__sinal
    position: relative
    flex-shrink: 0
    width: 16px
    height: 16px

    &::before,
    &::after
      content: ''
      position: absolute
      top: 50%
      left: 0
      width: 16px
      height: 2px
      border-radius: 2px
      background: rgba(255, 255, 255, 0.6)
      transition: transform 0.4s ease

    &::after
      transform: rotate(90deg)

  &--aberta &__sinal::after
    transform: rotate(0deg)

  &__corpo
    display: grid
    grid-template-rows: 0fr
    transition: grid-template-rows 0.4s ease

  &--aberta &__corpo
    grid-template-rows: 1fr

  &__resposta
    overflow: hidden
    margin: 0
    padding: 0 44px 0 0
    font-family: var(--light)
    font-size: 16px
    line-height: 1.7
    color: rgba(255, 255, 255, 0.58)

  &--aberta &__resposta
    padding-bottom: 26px

.fecho
  position: relative
  z-index: 1
  width: 100%
  max-width: 1720px
  margin: 0 auto
  padding: 140px 60px 0 60px
  text-align: center

  &::before
    content: ''
    position: absolute
    top: 16%
    left: 50%
    z-index: -1
    width: min(1100px, 92vw)
    height: 520px
    transform: translateX(-50%)
    pointer-events: none
    background: radial-gradient(ellipse at center, rgba(48, 92, 215, 0.17) 0%, rgba(28, 56, 140, 0.06) 46%, transparent 72%)

  &__linha
    display: block

  &__titulo
    margin: 0
    font-family: var(--semibold)
    font-size: clamp(28px, 3.8vw, 50px)
    line-height: 1.1
    letter-spacing: -0.02em
    text-wrap: balance

    &--leve
      font-family: var(--light)
      color: #8aa6f0

  &__texto
    max-width: 520px
    margin: 20px auto 0 auto
    text-wrap: pretty
    font-family: var(--light)
    font-size: 16px
    line-height: 1.65
    color: rgba(255, 255, 255, 0.55)

  &__acoes
    display: flex
    flex-wrap: wrap
    align-items: center
    justify-content: center
    gap: 14px
    margin: 34px 0 0 0

.rodape
  position: relative
  z-index: 1
  display: flex
  flex-wrap: wrap
  align-items: center
  justify-content: space-between
  gap: 18px
  width: 100%
  max-width: 1720px
  margin: 130px auto 0 auto
  padding: 34px 60px 44px 60px

  &::before
    content: ''
    position: absolute
    top: 0
    left: 60px
    right: 60px
    height: 1px
    background: rgba(255, 255, 255, 0.07)

  &__marca
    display: inline-flex
    align-items: center
    gap: 12px
    font-family: var(--semibold)
    font-size: 14px
    color: rgba(255, 255, 255, 0.8)
    text-decoration: none

    :deep(svg)
      width: 26px
      height: 28px

  &__copy
    font-family: var(--light)
    font-size: 13px
    color: rgba(255, 255, 255, 0.32)

@media (max-width: 1250px)
  .abertura,
  .bloco,
  .fecho,
  .rodape
    padding-left: 32px
    padding-right: 32px

  .rodape::before
    left: 32px
    right: 32px

  .entregas
    grid-template-columns: repeat(2, 1fr)

  .etapas
    grid-template-columns: repeat(2, 1fr)

  // em duas colunas o card par fecha a linha: o trilho dele apontaria para o vazio
  .etapa:nth-child(2n) .etapa__trilho
    display: none

  // o corredor e calculado sobre quatro colunas; fora disso ele mentiria a posicao
  .linha-tempo__corredor
    display: none

@media (max-width: 1000px)
  .duvidas,
  .entregas,
  .exemplos,
  .etapas
    grid-template-columns: 1fr

  // em coluna unica a linha do tempo vira vertical: ponto a esquerda, trilho
  // descendo pela lateral do card ate o proximo
  .etapa
    display: grid
    grid-template-columns: 12px 1fr
    gap: 0 20px

    &__marca
      flex-direction: column
      align-items: center
      height: auto
      margin: 0
      padding-top: 32px

    &__trilho
      width: 1px
      height: auto
      margin: 10px 0 -22px 0
      transform-origin: center top
      background: linear-gradient(to bottom, rgba(125, 155, 255, 0.36), rgba(125, 155, 255, 0.1))

  .etapas--animada .etapa__trilho
    transform: scaleY(0)

  .etapas--ativa .etapa__trilho
    transform: scaleY(1)

  .abertura
    padding-top: 150px

  .bloco
    padding-top: 90px

  .fecho
    padding-top: 104px

  .rodape
    margin-top: 96px

@media (max-width: 820px)
  .abertura,
  .bloco,
  .fecho,
  .rodape
    padding-left: 20px
    padding-right: 20px

  .rodape::before
    left: 20px
    right: 20px

  .pergunta__resposta
    padding-right: 0

// mesma razao do noscript: como o estado inicial esta no HTML, quem pediu menos
// movimento precisa de uma saida no proprio CSS. fica no fim do arquivo de
// proposito, para vencer o scaleY que o bloco do mobile aplica no trilho
@media (prefers-reduced-motion: reduce)
  .etapas--animada
    .etapa__ponto,
    .etapa__trilho,
    .etapa__caixa
      opacity: 1
      transform: none
      transition: none

  .selo,
  .abertura__texto,
  .abertura__acoes
    animation: none
</style>
