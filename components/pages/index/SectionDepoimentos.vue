<template>
  <section
    v-if="depoimentos.length"
    ref="secaoRef"
    id="depoimentos"
    class="depoimentos"
    aria-label="O que os clientes dizem"
  >
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

    <!-- A Criação de Adão como moldura: os dois braços vêm das laterais e o
         depoimento fica no lugar da faísca, entre os dedos -->
    <div
      class="carrossel"
      role="group"
      aria-roledescription="carrossel"
      aria-label="Depoimentos de clientes"
      @mouseenter="pausado = true"
      @mouseleave="pausado = false"
      @focusin="pausado = true"
      @focusout="pausado = false"
    >
      <div ref="conexaoRef" class="conexao">
        <img
          ref="bracoAdaoRef"
          class="conexao__braco conexao__braco--adao"
          :src="IMAGEM_MAOS"
          alt=""
          width="1420"
          height="380"
          loading="lazy"
          decoding="async"
        />

        <div class="conexao__centro">
          <!-- celular: sem espaço nas laterais, as duas mãos ficam inteiras em cima -->
          <div class="conexao__maos" aria-hidden="true">
            <img :src="IMAGEM_MAOS" alt="" width="1420" height="380" loading="lazy" decoding="async" />
            <span class="conexao__faisca"></span>
          </div>

          <div ref="cartaoRef" class="cartao">
            <span class="cartao__faisca cartao__faisca--esq" aria-hidden="true"></span>
            <span class="cartao__faisca cartao__faisca--dir" aria-hidden="true"></span>

            <svg class="cartao__aspas" width="34" height="27" viewBox="0 0 28 22" fill="none" aria-hidden="true">
              <path
                d="M0 22V13.2C0 5.9 4.1 1.1 11 0l1.2 2.9C8.3 4.1 6.6 6.4 6.3 9.6H12V22H0Zm16 0V13.2C16 5.9 20.1 1.1 27 0l1.2 2.9c-3.9 1.2-5.6 3.5-5.9 6.7H28V22H16Z"
                fill="currentColor"
              />
            </svg>

            <!-- Todos os depoimentos ficam empilhados na mesma célula e só o atual
                 aparece. Assim o card tem sempre a altura do maior: se ela mudasse a
                 cada troca, os braços, centralizados no card, pulariam junto -->
            <div class="cartao__palco" aria-live="polite">
              <figure
                v-for="(item, i) in depoimentos"
                :key="item.nome"
                class="cartao__figura"
                :class="{ 'cartao__figura--ativa': i === atual }"
                :aria-hidden="i === atual ? undefined : 'true'"
              >
                <blockquote
                  class="cartao__texto"
                  :class="{
                    'cartao__texto--curto': item.texto.length < 220,
                    'cartao__texto--longo': item.texto.length > 280,
                  }"
                >{{ item.texto }}</blockquote>

                <figcaption class="cartao__autor">
                  <span class="cartao__inicial" aria-hidden="true">{{ item.nome.charAt(0) }}</span>
                  <span class="cartao__dados">
                    <strong class="cartao__nome">{{ item.nome }}</strong>
                    <span class="cartao__cargo">
                      {{ item.cargo }}
                      <a
                        v-if="item.site"
                        class="cartao__empresa"
                        :href="item.site"
                        target="_blank"
                        rel="noopener"
                      >{{ item.empresa }}</a>
                    </span>
                  </span>

                  <a
                    v-if="item.instagram"
                    class="cartao__instagram"
                    :href="item.instagram"
                    target="_blank"
                    rel="noopener"
                    :aria-label="item.rotuloInstagram ?? `Instagram da ${item.empresa}`"
                  >
                    <SvgIcone nome="instagram" />
                  </a>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>

        <img
          ref="bracoDeusRef"
          class="conexao__braco conexao__braco--deus"
          :src="IMAGEM_MAOS"
          alt=""
          width="1420"
          height="380"
          loading="lazy"
          decoding="async"
        />
      </div>

      <!-- fora da grade dos braços: dentro dela, a altura dos controles empurrava
           as mãos pra baixo do meio do card -->
      <div v-if="depoimentos.length > 1" class="controles">
        <button class="controles__seta controles__seta--voltar" type="button" aria-label="Depoimento anterior" @click="anterior">
          <SvgIcone nome="seta-direita" />
        </button>

        <div class="controles__pontos">
          <button
            v-for="(item, i) in depoimentos"
            :key="item.nome"
            class="controles__ponto"
            :class="{ 'controles__ponto--ativo': i === atual }"
            type="button"
            :aria-label="`Ver depoimento ${i + 1} de ${depoimentos.length}`"
            :aria-current="i === atual ? 'true' : undefined"
            @click="irPara(i)"
          ></button>
        </div>

        <button class="controles__seta" type="button" aria-label="Próximo depoimento" @click="proximo">
          <SvgIcone nome="seta-direita" />
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Mãos da Criação de Adão (Michelangelo, domínio público, via Wikimedia Commons),
// recortadas e pintadas na paleta azul. Um arquivo só: no computador cada braço
// mostra a sua metade dele, no celular ele aparece inteiro.
const IMAGEM_MAOS = '/images/criacao-adao-maos.webp'

// Só depoimento real, com as palavras do cliente. Os textos de exemplo que
// estavam aqui saíram quando chegou o primeiro de verdade. Com um depoimento só,
// setas, pontos e troca automática somem sozinhos; a partir de dois, voltam.
// `cargo` termina na preposição ("Gerente da") porque o nome da empresa vem logo
// depois, como link para o site dela. O curto vem primeiro: lê-se de relance e
// puxa pra ler o seguinte.
const depoimentos = [
  {
    nome: 'Brenna Damasceno',
    cargo: 'Fundadora da',
    empresa: 'Clínica Brenna Damasceno',
    site: 'https://clinicabrennadamasceno.com.br/',
    instagram: 'https://www.instagram.com/clinicabrennadamasceno',
    texto:
      'Superou minhas expectativas. Antes, eu tinha um site amador, feito por mim mesma, com sérios erros de design. Contratar você foi o meu melhor investimento, e com certeza vou te indicar para os meus conhecidos.',
  },
  {
    // sem cargo informado: a linha de baixo mostra só a loja
    nome: 'Anderson',
    cargo: '',
    empresa: 'Gama 3D',
    site: 'https://gama3d.com.br/',
    instagram: 'https://www.instagram.com/gama.3d_',
    texto:
      // o hífen de "e‑commerce" aqui é o inseparável (U+2011), não o do teclado:
      // com o comum, a palavra quebrava no meio da linha ("e-" / "commerce")
      'Meu e‑commerce ficou surreal. Que trabalho incrível, parabéns! A loja virou referência no ramo 3D.',
  },
  {
    // profissional liberal, sem nome de empresa: o link do site fica na profissão
    // e o botão do Instagram leva o nome dela no rótulo de acessibilidade
    nome: 'Jamilly Ferreira',
    cargo: '',
    empresa: 'Psicóloga',
    site: 'https://www.jamillyferreirapsicologa.com.br/',
    instagram: 'https://www.instagram.com/jamillyferreira.psico',
    rotuloInstagram: 'Instagram da Jamilly Ferreira',
    texto:
      'Eu não tinha a menor ideia do que queria, e você chegou com um design pronto e totalmente personalizado para mim, além de um link de bio também personalizado. O resultado ficou excelente.',
  },
  {
    nome: 'Guilherme Pessin',
    cargo: 'Gerente da',
    empresa: 'City Toys',
    site: 'https://www.citytoysbrinquedos.com/',
    instagram: 'https://www.instagram.com/city_toysbrinquedos',
    texto:
      'Sendo bem sincero, o site superou as expectativas. Eu adorei, e meu pai também gostou muito. Ele foi criado praticamente sem referência, porque nesse ramo é difícil encontrar algo parecido, e até pessoas do setor vieram comentar sobre ele. Ficou muito autoexplicativo: o “Monte seu combo” é fácil de entender e intuitivo, e o contato, em que eu tanto insisti, ficou ótimo, sem ficar feio nem repetitivo. Está de parabéns, o resultado ficou excelente.',
  },
]

const atual = ref(0)
const pausado = ref(false)

function irPara(i) {
  atual.value = (i + depoimentos.length) % depoimentos.length
}

function proximo() {
  irPara(atual.value + 1)
}

function anterior() {
  irPara(atual.value - 1)
}

const secaoRef = ref(null)
const cabecalhoRef = ref(null)
const conexaoRef = ref(null)
const cartaoRef = ref(null)
const bracoAdaoRef = ref(null)
const bracoDeusRef = ref(null)

let contexto = null
let relogio = null
let observador = null
let visivel = false

// Tempo de leitura de cada um: ~55ms por letra (uns 18 caracteres por segundo),
// entre 8s e 40s. Com tempo fixo, o depoimento comprido trocava no meio da frase.
function tempoDeLeitura(texto) {
  return Math.min(40000, Math.max(8000, texto.length * 55))
}

// troca sozinho, mas só com a seção na tela e ninguém lendo (mouse ou foco
// dentro pausam). Com "reduzir movimento", só troca no clique.
let rodando = false

function agendar() {
  if (!rodando) return
  clearTimeout(relogio)
  relogio = setTimeout(() => {
    if (visivel && !pausado.value) proximo()
    else agendar()
  }, tempoDeLeitura(depoimentos[atual.value].texto))
}

function iniciarRotacao() {
  if (depoimentos.length < 2) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  observador = new IntersectionObserver(([entrada]) => {
    visivel = entrada.isIntersecting
  }, { threshold: 0.4 })
  observador.observe(conexaoRef.value)

  rodando = true
  agendar()
}

// qualquer troca, automática ou no clique, recomeça a contagem do zero
watch(atual, agendar)

onMounted(() => {
  if (!secaoRef.value) return

  iniciarRotacao()

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

      // os braços chegam pelas laterais até encostar no depoimento
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: conexaoRef.value, start: 'top 80%' },
      })

      tl.from(cartaoRef.value, { autoAlpha: 0, y: 30, duration: 0.8 })
        .from(bracoAdaoRef.value, { autoAlpha: 0, x: -90, duration: 1.2 }, 0.1)
        .from(bracoDeusRef.value, { autoAlpha: 0, x: 90, duration: 1.2 }, 0.1)
    })
  }, secaoRef.value)
})

onBeforeUnmount(() => {
  rodando = false
  clearTimeout(relogio)
  observador?.disconnect()
  contexto?.revert()
  ScrollTrigger.getAll().forEach((t) => {
    if (secaoRef.value?.contains(t.trigger)) t.kill()
  })
})
</script>

<style scoped lang="sass">
$ciano: #1AD8E9
$azul-eletrico: #07B1E8

.depoimentos
  position: relative
  width: 100%
  margin-top: -1px
  padding: 40px 60px 130px
  overflow: hidden
  background: radial-gradient(ellipse 42% 38% at 50% 64%, rgba($azul-eletrico, 0.12) 0%, transparent 70%), #04142e

  &__cabecalho
    max-width: 720px
    margin: 0 auto 64px
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

// MOLDURA
.conexao
  display: grid
  grid-template-columns: minmax(0, 1fr) minmax(0, 600px) minmax(0, 1fr)
  align-items: center
  max-width: 1560px
  margin: 0 auto

  // Os dois braços usam a mesma altura, então ficam na mesma escala. A largura
  // sai da proporção de cada metade e pode passar da coluna: o excesso fica pra
  // fora da tela e a ponta do braço some no degradê.
  &__braco
    display: block
    height: clamp(160px, 17vw, 270px)
    width: auto
    max-width: none
    object-fit: cover
    // os dedos ficam a 54% da altura da imagem; isso alinha a ponta com o meio do card
    transform: translateY(-4%)

    &--adao
      justify-self: end
      // metade esquerda da imagem, até a ponta do dedo do Adão
      aspect-ratio: 772 / 380
      object-position: 0 50%
      -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 45%)
      mask-image: linear-gradient(to right, transparent 0%, #000 45%)

    &--deus
      justify-self: start
      // metade direita, a partir da ponta do dedo de Deus
      aspect-ratio: 640 / 380
      object-position: 100% 50%
      -webkit-mask-image: linear-gradient(to left, transparent 0%, #000 45%)
      mask-image: linear-gradient(to left, transparent 0%, #000 45%)

  &__centro
    position: relative
    z-index: 1
    min-width: 0

  // só no celular
  &__maos
    display: none

  &__faisca
    position: absolute
    width: 14px
    height: 14px
    border-radius: 50%
    background: #e6fbff
    box-shadow: 0 0 10px 3px rgba($ciano, 0.9), 0 0 34px 10px rgba($azul-eletrico, 0.55)
    transform: translate(-50%, -50%)
    animation: pulsar 2.6s ease-in-out infinite

// CARD
.cartao
  position: relative
  display: flex
  flex-direction: column
  min-height: 300px
  padding: 40px 46px 34px
  border: 1px solid rgba(125, 155, 255, 0.2)
  border-radius: 22px
  background: rgba(255, 255, 255, 0.03)
  backdrop-filter: blur(14px)
  -webkit-backdrop-filter: blur(14px)
  box-shadow: 0 0 90px rgba($azul-eletrico, 0.1)

  // o brilho onde cada dedo encosta no card, como a faísca da pintura
  &__faisca
    position: absolute
    top: 50%
    width: 12px
    height: 12px
    border-radius: 50%
    background: #e6fbff
    box-shadow: 0 0 10px 3px rgba($ciano, 0.85), 0 0 30px 8px rgba($azul-eletrico, 0.5)
    transform: translate(-50%, -50%)
    animation: pulsar 2.6s ease-in-out infinite

    &--esq
      left: 0

    &--dir
      left: 100%
      animation-delay: 1.3s

  &__aspas
    flex-shrink: 0
    margin-bottom: 20px
    color: $ciano
    filter: drop-shadow(0 0 10px rgba($ciano, 0.45))

  // uma célula só: os depoimentos ficam um em cima do outro e a altura do card
  // é a do maior
  &__palco
    display: grid
    flex: 1

  &__figura
    grid-area: 1 / 1
    display: flex
    flex-direction: column
    gap: 28px
    width: 100%
    margin: 0
    opacity: 0
    visibility: hidden
    transform: translateY(10px)
    // o que sai some rápido e só depois fica invisível pro leitor de tela e pro Tab
    transition: opacity 0.35s ease, transform 0.35s ease, visibility 0s linear 0.35s

    &--ativa
      opacity: 1
      visibility: visible
      transform: none
      transition: opacity 0.45s ease 0.2s, transform 0.45s ease 0.2s, visibility 0s

  // margem automática em cima e embaixo: o depoimento curto fica centrado no
  // espaço que sobra no card do comprido, em vez de grudado no topo
  &__texto
    margin: auto 0
    font-family: var(--light)
    font-size: clamp(18px, 1.5vw, 21px)
    line-height: 1.6
    color: rgba(255, 255, 255, 0.9)

    // depoimento de verdade às vezes é um parágrafo inteiro: a letra desce um
    // pouco pra o card não ficar mais alto que os braços
    &--longo
      font-size: clamp(16px, 1.2vw, 17.5px)
      line-height: 1.65

    // frase curta divide o card com a comprida: letra maior ocupa o espaço e
    // deixa a frase com cara de manchete
    &--curto
      font-size: clamp(21px, 2vw, 26px)
      line-height: 1.5
      color: var(--cor-branco)

  &__autor
    display: flex
    align-items: center
    gap: 14px
    margin-top: auto
    padding-top: 22px
    border-top: 1px solid rgba(255, 255, 255, 0.08)

  &__inicial
    display: flex
    align-items: center
    justify-content: center
    width: 44px
    min-width: 44px
    height: 44px
    border: 1px solid rgba($ciano, 0.35)
    border-radius: 50%
    background: rgba($azul-eletrico, 0.14)
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
    font-weight: normal
    color: var(--cor-branco)

  &__cargo
    font-family: var(--light)
    font-size: 14px
    color: rgba(255, 255, 255, 0.55)

  &__empresa
    font-family: var(--semibold)
    color: $ciano
    text-decoration: underline
    text-decoration-color: rgba($ciano, 0.35)
    text-underline-offset: 3px
    transition: text-decoration-color 0.3s ease

    &:hover
      text-decoration-color: $ciano

  &__instagram
    display: flex
    align-items: center
    justify-content: center
    flex-shrink: 0
    width: 42px
    height: 42px
    margin-left: auto
    border: 1px solid rgba($ciano, 0.3)
    border-radius: 50%
    background: rgba($azul-eletrico, 0.1)
    color: $ciano
    transition: background 0.3s ease, border-color 0.3s ease

    &:hover
      border-color: rgba($ciano, 0.7)
      background: rgba($azul-eletrico, 0.2)

    &:focus-visible
      outline: 2px solid $ciano
      outline-offset: 3px

    :deep(svg)
      display: block
      width: 18px
      height: 18px
      fill: currentColor

// CONTROLES
.controles
  display: flex
  align-items: center
  justify-content: center
  gap: 18px
  margin-top: 26px

  &__seta
    display: flex
    align-items: center
    justify-content: center
    width: 44px
    height: 44px
    padding: 0
    border: 1px solid rgba(125, 155, 255, 0.22)
    border-radius: 50%
    background: rgba(30, 46, 115, 0.35)
    color: rgba(255, 255, 255, 0.85)
    cursor: pointer
    transition: background 0.4s ease, border-color 0.4s ease

    &:hover
      border-color: rgba($ciano, 0.5)
      background: rgba(125, 155, 255, 0.16)

    &:focus-visible
      outline: 2px solid $ciano
      outline-offset: 3px

    :deep(svg)
      display: block
      width: 15px
      height: 15px
      fill: currentColor

    &--voltar :deep(svg)
      transform: rotate(180deg)

  &__pontos
    display: flex
    gap: 8px

  // a área de toque é maior que o desenho do ponto, pra dar pra acertar no celular
  &__ponto
    position: relative
    width: 24px
    height: 24px
    padding: 0
    border: 0
    background: transparent
    cursor: pointer

    &::before
      content: ''
      position: absolute
      top: 50%
      left: 50%
      width: 8px
      height: 8px
      border-radius: 999px
      background: rgba(255, 255, 255, 0.25)
      transform: translate(-50%, -50%)
      transition: width 0.4s ease, background 0.4s ease

    &--ativo::before
      width: 22px
      background: $ciano
      box-shadow: 0 0 10px rgba($ciano, 0.6)

    &:focus-visible
      outline: 2px solid $ciano
      outline-offset: 2px
      border-radius: 999px

@keyframes pulsar
  0%, 100%
    opacity: 1
    transform: translate(-50%, -50%) scale(1)
  50%
    opacity: 0.55
    transform: translate(-50%, -50%) scale(0.75)

@media (prefers-reduced-motion: reduce)
  .cartao__faisca,
  .conexao__faisca
    animation: none

  .cartao__figura,
  .cartao__figura--ativa
    transform: none
    transition: visibility 0s

// abaixo disso não sobra lateral pros braços: as mãos sobem pra cima do card
@media (max-width: 1023px)
  .depoimentos
    padding: 24px 20px 100px

    &__cabecalho
      margin-bottom: 20px

  .conexao
    grid-template-columns: minmax(0, 1fr)
    max-width: 620px

    &__braco
      display: none

    // a imagem é bem mais larga que a tela, pra as mãos não ficarem miúdas;
    // os braços sobram pras laterais e somem no degradê
    &__maos
      position: relative
      display: block
      width: 180%
      margin: 0 -40%
      -webkit-mask-image: linear-gradient(to right, transparent 16%, #000 33%, #000 67%, transparent 84%)
      mask-image: linear-gradient(to right, transparent 16%, #000 33%, #000 67%, transparent 84%)

      img
        display: block
        width: 100%
        height: auto

      // fio de luz que desce da faísca até o card
      &::after
        content: ''
        position: absolute
        top: 56%
        left: 54.6%
        width: 1px
        height: 44%
        background: linear-gradient(to bottom, rgba($ciano, 0.8), transparent)

    // entre a ponta do dedo do Adão (x 54,4%) e a de Deus (x 54,9%), na altura dos dedos
    &__faisca
      top: 54%
      left: 54.6%

  .cartao
    min-height: 0
    padding: 32px 26px 28px

    &__faisca
      display: none
</style>
