<template>
  <section ref="secaoRef" id="sobre" class="poster" aria-labelledby="poster-titulo">
    <!-- PALCO: tudo o que é cenário, atrás do conteúdo. A ordem aqui é a ordem
         das camadas: texto fantasma, nome com brilho, faíscas e, na frente, a foto -->
    <div class="palco" aria-hidden="true">
      <div class="palco__fantasma">
        <div v-for="linha in 3" :key="linha" class="palco__fantasma-linha">
          <span>Bernardi Bernardi Bernardi Bernardi&nbsp;</span>
          <span>Bernardi Bernardi Bernardi Bernardi&nbsp;</span>
        </div>
      </div>

      <p ref="nomeRef" class="palco__nome">Gustavo</p>

      <div class="palco__faiscas">
        <span v-for="f in faiscas" :key="f.id" :style="f.estilo"></span>
      </div>

      <img
        ref="fotoRef"
        class="palco__foto"
        src="/images/gustavo-recorte.webp"
        alt=""
        width="937"
        height="883"
        loading="lazy"
        decoding="async"
      />
    </div>

    <!-- créditos de pôster: os clientes, na vertical, como o elenco de um filme -->
    <p class="creditos">
      <span class="creditos__rotulo">Feito para</span>
      <span v-for="cliente in clientes" :key="cliente">{{ cliente }}</span>
    </p>

    <div class="poster__grade">
      <div ref="introRef" class="intro">
        <p class="intro__ola">Olá, eu sou o Gustavo</p>

        <h2 id="poster-titulo" class="intro__titulo">
          Eu faço a sua empresa<br />
          <span class="intro__titulo--leve">vender e produzir mais.</span>
        </h2>

        <p class="intro__texto">
          Já criei sistema para fábrica, loja virtual para revenda e sites que realmente vendem.
        </p>

        <a class="intro__cta" :href="linkWhatsapp" target="_blank" rel="noopener">
          Quero um resultado assim
          <SvgIcone nome="seta-direita" />
        </a>
      </div>

      <div ref="resultadosRef" class="resultados">
        <p class="resultados__rotulo">O que mudou pra quem contratou</p>

        <ul class="resultados__lista">
          <li v-for="item in resultados" :key="item.link" class="resultado">
            <NuxtLink :to="item.link" class="resultado__link">
              <span class="resultado__tag">{{ item.tag }}</span>
              <span class="resultado__titulo">{{ item.titulo }}</span>
              <span class="resultado__texto">{{ item.texto }}</span>
            </NuxtLink>
          </li>
        </ul>

        <NuxtLink to="/projetos" class="resultados__todos">
          Ver os {{ PROJETOS.length }} projetos
          <SvgIcone nome="seta-direita" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PROJETOS } from '~/helpers/projetos'

const linkWhatsapp = 'https://wa.me/5511966206588?text=' +
  encodeURIComponent('Olá, Gustavo! Vi os resultados no seu site e quero conversar sobre um projeto.')

// Escrito do lado de quem paga: o que mudou no negócio, não o que foi
// programado. Cada frase sai do contexto do case (helpers/projetos.js) e pode ser
// conferida nele. Número inventado não entra.
const resultados = [
  {
    tag: 'Sistema · Qualifix',
    titulo: 'A fábrica inteira no mesmo plano',
    texto: 'A programação saiu das páginas soltas e agora muda na hora no computador, no celular e na TV da reunião.',
    link: '/projetos/qualifix',
  },
  {
    tag: 'Loja virtual · Gama 3D',
    titulo: 'A venda saiu do direct',
    texto: 'O cliente escolhe entre 94 cores de filamento, vê o frete e paga sozinho, sem esperar alguém responder.',
    link: '/projetos/gama-3d',
  },
  {
    tag: 'Site · Clínica Brenna Damasceno',
    titulo: 'A paciente já chega decidida',
    texto: 'A página indica a psicóloga certa para o que ela vive e abre o WhatsApp com o nome dela na mensagem.',
    link: '/projetos/clinica-brenna-damasceno',
  },
]

// só cliente, nada de produto próprio. A lista cabe na altura do pôster na vertical:
// nome novo aqui, conferir se os créditos não saem cortados no topo
const clientes = ['Qualifix', 'Gama 3D', 'City Toys', 'Brenna Damasceno', 'Conecta Contábil']

// posições fixas: Math.random() aqui daria hidratação diferente entre servidor e cliente
function sorteador(semente) {
  let s = semente
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
}

const faiscas = (() => {
  const r = sorteador(20261102)
  return Array.from({ length: 30 }, (_, id) => {
    const tamanho = 2 + r() * 3.5
    return {
      id,
      estilo: {
        left: (r() * 100).toFixed(2) + '%',
        top: (25 + r() * 70).toFixed(2) + '%',
        width: tamanho.toFixed(2) + 'px',
        height: tamanho.toFixed(2) + 'px',
        animationDelay: (r() * 9).toFixed(2) + 's',
        animationDuration: (6 + r() * 6).toFixed(2) + 's',
      },
    }
  })
})()

const secaoRef = ref(null)
const nomeRef = ref(null)
const fotoRef = ref(null)
const introRef = ref(null)
const resultadosRef = ref(null)

let contexto = null

onMounted(() => {
  contexto = gsap.context(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: secaoRef.value, start: 'top 70%' },
      })

      // o nome acende primeiro, a foto sobe por cima dele, e o texto entra por último
      tl.from(nomeRef.value, { autoAlpha: 0, scale: 0.94, duration: 1.2 })
        .from(fotoRef.value, { autoAlpha: 0, y: 60, duration: 1.1 }, 0.25)
        .from(introRef.value?.children ?? [], { autoAlpha: 0, y: 24, duration: 0.7, stagger: 0.08 }, 0.6)
        .from(resultadosRef.value?.querySelectorAll('.resultado, .resultados__rotulo, .resultados__todos') ?? [], {
          autoAlpha: 0,
          x: 24,
          duration: 0.7,
          stagger: 0.08,
        }, 0.7)
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
// paleta devbygusta: abismo, marinho, azul elétrico e ciano. Nada de quente.
$abismo: #020715
$fundo-vizinho: #04142e
$ciano: #1AD8E9
$azul-eletrico: #07B1E8

.poster
  position: relative
  width: 100%
  // piso de 880px mesmo em tela baixa: com menos que isso a coluna de resultados
  // sobe até o nome e o rótulo some no brilho das letras
  min-height: clamp(880px, 100vh, 1000px)
  margin-top: -1px
  overflow: hidden
  isolation: isolate
  // as bordas de cima e de baixo voltam pro azul das seções vizinhas, pra o
  // pôster não abrir com um corte seco
  background: linear-gradient(to bottom, $fundo-vizinho 0%, transparent 14%, transparent 86%, $fundo-vizinho 100%), radial-gradient(ellipse 60% 55% at 50% 52%, rgba($azul-eletrico, 0.2) 0%, rgba($azul-eletrico, 0.05) 45%, transparent 70%), $abismo

  &__grade
    position: relative
    z-index: 5
    display: grid
    // a coluna do meio fica vazia pro rosto; a dos resultados é a mais larga
    // pra os cards quebrarem menos linha e não subirem até o nome
    grid-template-columns: minmax(0, 1fr) minmax(0, 0.85fr) minmax(0, 1.15fr)
    grid-template-areas: 'intro . resultados'
    align-items: end
    min-height: inherit
    max-width: 1600px
    margin: 0 auto
    padding: 0 60px 90px

// PALCO
.palco
  position: absolute
  inset: 0
  pointer-events: none

  &__fantasma
    position: absolute
    inset: 0
    display: flex
    flex-direction: column
    justify-content: space-around
    z-index: 0

  &__fantasma-linha
    display: flex
    width: max-content
    font-family: var(--semibold)
    font-size: clamp(110px, 15vw, 240px)
    line-height: 0.9
    letter-spacing: -0.01em
    text-transform: uppercase
    white-space: nowrap
    color: rgba(138, 166, 240, 0.045)
    animation: deslizar 70s linear infinite

    // linhas alternam o sentido, como no pôster: o fundo nunca fica parado
    &:nth-child(2)
      animation-direction: reverse
      transform: translateX(-30%)

    &:nth-child(3)
      animation-duration: 90s

  &__nome
    position: absolute
    top: 11%
    left: 50%
    z-index: 1
    margin: 0
    transform: translateX(-50%)
    font-family: var(--semibold)
    font-size: clamp(120px, 19vw, 320px)
    line-height: 0.85
    letter-spacing: 0.01em
    text-transform: uppercase
    white-space: nowrap
    color: #d2f6ff
    text-shadow: 0 0 18px rgba($ciano, 0.55), 0 0 46px rgba($azul-eletrico, 0.5), 0 0 120px rgba($azul-eletrico, 0.35)

  &__faiscas
    position: absolute
    inset: 0
    z-index: 2

    span
      position: absolute
      border-radius: 50%
      background: $ciano
      box-shadow: 0 0 6px 1px rgba($ciano, 0.8), 0 0 16px 2px rgba($azul-eletrico, 0.5)
      opacity: 0
      animation: subir ease-in-out infinite

      &:nth-child(3n)
        background: #bdeeff

  // recorte com fundo transparente: o nome passa por trás da cabeça. A base
  // some no fundo pra o corte do tronco não aparecer
  &__foto
    position: absolute
    bottom: 0
    left: 50%
    z-index: 3
    height: 82%
    width: auto
    max-width: none
    transform: translateX(-50%)
    -webkit-mask-image: linear-gradient(to bottom, #000 70%, transparent 100%)
    mask-image: linear-gradient(to bottom, #000 70%, transparent 100%)

  // escurece a base do palco pra o texto da frente ler bem por cima do ombro
  &::after
    content: ''
    position: absolute
    inset: 45% 0 0 0
    z-index: 4
    background: linear-gradient(to bottom, transparent 0%, rgba($abismo, 0.55) 55%, $fundo-vizinho 100%)

// CRÉDITOS
.creditos
  position: absolute
  top: 50%
  left: 34px
  z-index: 5
  display: flex
  gap: 20px
  margin: 0
  transform: translate(-50%, -50%) rotate(-90deg)
  transform-origin: center
  font-family: var(--semibold)
  font-size: 10.5px
  letter-spacing: 2.4px
  text-transform: uppercase
  white-space: nowrap
  color: rgba(255, 255, 255, 0.4)

  // o "Feito para" puxa a leitura; os nomes ficam um tom abaixo
  &__rotulo
    color: rgba($ciano, 0.75)

// INTRO
.intro
  grid-area: intro
  max-width: 420px

  &__ola
    margin: 0 0 14px
    font-family: var(--light)
    font-size: 13px
    letter-spacing: 2.4px
    text-transform: uppercase
    color: rgba($ciano, 0.8)

  &__titulo
    margin: 0
    font-family: var(--semibold)
    font-size: clamp(28px, 2.8vw, 42px)
    line-height: 1.1
    letter-spacing: -0.02em
    color: var(--cor-branco)

    &--leve
      font-family: var(--light)
      color: #8aa6f0

  &__texto
    margin: 18px 0 0
    font-family: var(--light)
    font-size: 16px
    line-height: 1.6
    color: rgba(255, 255, 255, 0.68)

  &__cta
    display: inline-flex
    align-items: center
    gap: 12px
    margin-top: 30px
    padding: 17px 30px
    border-radius: 12px
    background: var(--cor-azul-forte)
    box-shadow: 0 0 40px rgba($azul-eletrico, 0.25)
    font-family: var(--semibold)
    font-size: 15px
    line-height: 1
    color: var(--cor-branco)
    text-decoration: none
    pointer-events: auto
    transition: background 0.4s ease

    &:hover
      background: #2c1fd6

      :deep(svg)
        transform: translateX(4px)

    :deep(svg)
      display: block
      width: 15px
      height: 15px
      transition: transform 0.4s ease

// RESULTADOS
.resultados
  grid-area: resultados
  justify-self: end
  width: 100%
  max-width: 400px

  &__rotulo
    margin: 0 0 14px
    font-family: var(--light)
    font-size: 13px
    letter-spacing: 2.4px
    text-transform: uppercase
    color: rgba(255, 255, 255, 0.55)

  &__lista
    display: flex
    flex-direction: column
    gap: 10px
    margin: 0
    padding: 0
    list-style: none

  &__todos
    display: inline-flex
    align-items: center
    gap: 10px
    margin-top: 18px
    font-family: var(--semibold)
    font-size: 14px
    color: #8aa6f0
    text-decoration: none
    transition: color 0.4s ease

    &:hover
      color: var(--cor-branco)

      :deep(svg)
        transform: translateX(4px)

    :deep(svg)
      display: block
      width: 14px
      height: 14px
      transition: transform 0.4s ease

.resultado
  &__link
    display: flex
    flex-direction: column
    gap: 5px
    padding: 15px 20px 16px
    border: 1px solid rgba(125, 155, 255, 0.14)
    border-radius: 16px
    background: rgba(4, 20, 46, 0.62)
    backdrop-filter: blur(12px)
    -webkit-backdrop-filter: blur(12px)
    text-decoration: none
    transition: border-color 0.4s ease, background 0.4s ease

    &:hover
      border-color: rgba($ciano, 0.4)
      background: rgba(10, 40, 80, 0.7)

  &__tag
    font-family: var(--light)
    font-size: 11.5px
    letter-spacing: 1px
    text-transform: uppercase
    color: rgba($ciano, 0.8)

  // a frase do resultado é o que o cliente lê primeiro, então ela é o destaque
  &__titulo
    font-family: var(--semibold)
    font-size: 20px
    line-height: 1.2
    letter-spacing: -0.01em
    color: var(--cor-branco)
    text-shadow: 0 0 22px rgba($ciano, 0.3)

  &__texto
    font-family: var(--light)
    font-size: 14px
    line-height: 1.5
    color: rgba(255, 255, 255, 0.66)

@keyframes deslizar
  to
    transform: translateX(-50%)

@keyframes subir
  0%
    opacity: 0
    transform: translateY(0) scale(1)
  15%
    opacity: 0.9
  70%
    opacity: 0.6
  100%
    opacity: 0
    transform: translateY(-160px) scale(0.5)

// faísca e letreiro andando não são essenciais: com "reduzir movimento" o pôster fica parado
@media (prefers-reduced-motion: reduce)
  .palco__fantasma-linha
    animation: none

  .palco__faiscas span
    animation: none
    opacity: 0.5

// notebook pequeno: as três colunas apertam, então o rosto ganha o centro e o
// texto desce pra baixo dele, em duas colunas
@media (max-width: 1180px)
  .poster
    min-height: 0

    &__grade
      grid-template-columns: repeat(2, minmax(0, 1fr))
      grid-template-areas: 'intro resultados'
      gap: 48px
      min-height: 0
      padding: 0 40px 80px

  .palco
    position: relative
    height: clamp(460px, 62vw, 680px)

    &__foto
      height: 100%

    // aqui o palco acaba no meio da seção, onde o fundo é o abismo, e não o azul
    // da borda: terminar em outra cor deixava uma linha reta embaixo da foto
    &::after
      inset: 55% 0 0 0
      background: linear-gradient(to bottom, transparent 0%, $abismo 100%)

  // sem altura pra ficar em pé, os créditos deitam e viram uma linha embaixo da foto
  .creditos
    position: static
    flex-wrap: wrap
    justify-content: center
    gap: 8px 18px
    padding: 4px 40px 44px
    transform: none
    white-space: normal
    text-align: center
    line-height: 1.6

@media (max-width: 760px)
  .poster__grade
    grid-template-columns: 1fr
    grid-template-areas: 'intro' 'resultados'
    gap: 44px
    padding: 0 20px 80px

  .palco
    height: clamp(400px, 112vw, 560px)

    // 19vw é o maior tamanho em que as sete letras cabem na largura do celular
    &__nome
      top: 9%
      font-size: 19vw

    &__fantasma-linha
      font-size: 26vw

  .creditos
    padding: 4px 20px 40px

  .intro
    max-width: none

    &__cta
      width: 100%
      justify-content: center

  .resultados
    max-width: none
    justify-self: stretch
</style>
