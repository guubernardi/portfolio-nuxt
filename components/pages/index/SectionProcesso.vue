<template>
  <section ref="secaoRef" class="processo" aria-label="Como trabalhamos">
    <div ref="cabecalhoRef" class="processo__cabecalho">
      <span class="processo__rotulo">
        <b>02</b>
        Como trabalhamos
      </span>

      <h2 class="processo__titulo">
        Quatro etapas.<br />
        <span class="processo__titulo--leve">Nenhuma surpresa.</span>
      </h2>
    </div>

    <ol ref="listaRef" class="etapas">
      <li v-for="(etapa, i) in etapas" :key="etapa.titulo" class="etapa">
        <div class="etapa__marca">
          <span class="etapa__numero">{{ String(i + 1).padStart(2, '0') }}</span>
          <span v-if="i < etapas.length - 1" class="etapa__linha" aria-hidden="true">
            <span class="etapa__pulso"></span>
          </span>
        </div>

        <h3 class="etapa__titulo">{{ etapa.titulo }}</h3>
        <p class="etapa__texto">{{ etapa.texto }}</p>
      </li>
    </ol>

    <div ref="contratoRef" class="contrato">
      <span class="contrato__icone">
        <SvgIcone nome="contrato-assinar" />
      </span>

      <div class="contrato__texto">
        <h3 class="contrato__titulo">Todo projeto tem contrato</h3>
        <p class="contrato__descricao">
          Segurança pros dois lados. Nada do que a gente combinou fica só na conversa.
        </p>
      </div>

      <ul class="contrato__itens">
        <li v-for="item in garantias" :key="item" class="contrato__item">
          <SvgIcone nome="check" />
          {{ item }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const secaoRef = ref(null)
const cabecalhoRef = ref(null)
const listaRef = ref(null)
const contratoRef = ref(null)

let contexto = null

const garantias = ['Escopo definido', 'Prazo acordado', 'Valor fechado']

const etapas = [
  {
    titulo: 'Conversa',
    texto: 'Entendemos o que o projeto precisa resolver antes de falar de tela.',
  },
  {
    titulo: 'Protótipo',
    texto: 'Você aprova o layout inteiro antes de qualquer linha de código.',
  },
  {
    titulo: 'Desenvolvimento',
    texto: 'Código escrito do zero, com você acompanhando cada etapa.',
  },
  {
    titulo: 'No ar',
    texto: 'Deploy, testes finais e o projeto entregue funcionando.',
  },
]

// pontos de luz correndo de uma etapa pra outra, em cascata: é o que dá a leitura
// de avanço, em vez de quatro colunas paradas lado a lado
function correrPulsos() {
  const linhas = listaRef.value?.querySelectorAll('.etapa__linha') ?? []

  linhas.forEach((linha, i) => {
    const pulso = linha.querySelector('.etapa__pulso')
    if (!pulso) return

    const tween = gsap.fromTo(
      pulso,
      { x: 0 },
      {
        // função em vez de valor fixo: a largura muda com a viewport
        x: () => linha.offsetWidth - pulso.offsetWidth,
        duration: 1.5,
        ease: 'power1.inOut',
        repeat: -1,
        repeatDelay: 1.6,
        delay: i * 0.5,
        // sem invalidate o valor calculado congela no primeiro ciclo e quebra no resize
        onRepeat: () => tween.invalidate(),
      }
    )

    gsap.fromTo(
      pulso,
      { opacity: 0 },
      {
        keyframes: [
          { opacity: 1, duration: 0.25 },
          { opacity: 1, duration: 1 },
          { opacity: 0, duration: 0.25 },
        ],
        repeat: -1,
        repeatDelay: 1.6,
        delay: i * 0.5,
      }
    )
  })
}

onMounted(() => {
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

      // a timeline monta etapa por etapa: círculo, texto, e a linha ligando na próxima.
      // uma stagger só no <li> inteiro não deixa a linha "correr" entre as etapas
      const tl = gsap.timeline({
        scrollTrigger: { trigger: listaRef.value, start: 'top 84%' },
        onComplete: correrPulsos,
      })

      const etapasEls = listaRef.value?.querySelectorAll('.etapa') ?? []

      etapasEls.forEach((el, i) => {
        const numero = el.querySelector('.etapa__numero')
        const linha = el.querySelector('.etapa__linha')
        const corpo = [el.querySelector('.etapa__titulo'), el.querySelector('.etapa__texto')]
        const momento = i * 0.26

        tl.from(numero, {
          autoAlpha: 0,
          scale: 0.4,
          duration: 0.5,
          ease: 'back.out(2.2)',
        }, momento)

        tl.from(corpo, {
          autoAlpha: 0,
          y: 18,
          duration: 0.5,
          stagger: 0.07,
          ease: 'power3.out',
        }, momento + 0.12)

        if (linha) {
          tl.from(linha, {
            scaleX: 0,
            duration: 0.45,
            ease: 'power2.inOut',
          }, momento + 0.2)
        }
      })

      gsap.from(contratoRef.value, {
        autoAlpha: 0,
        y: 26,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: contratoRef.value, start: 'top 92%' },
      })
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
.processo
  position: relative
  width: 100%
  margin-top: -1px
  padding: 118px 60px 124px
  background: linear-gradient(to bottom, #01060f 0%, #010912 100%)

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

.etapas
  display: grid
  grid-template-columns: repeat(4, 1fr)
  gap: 30px
  // mesmo grid de 1600px dos Cases e da nav
  max-width: 1600px
  margin: 0 auto
  padding: 0
  list-style: none

.etapa
  &__marca
    position: relative
    display: flex
    align-items: center
    margin-bottom: 26px

  &__numero
    display: flex
    align-items: center
    justify-content: center
    flex-shrink: 0
    width: 46px
    height: 46px
    border: 1px solid rgba(125, 155, 255, 0.28)
    border-radius: 50%
    background: rgba(30, 46, 115, 0.4)
    font-family: var(--semibold)
    font-size: 13px
    color: #8aa6f0

  // liga uma etapa na outra e some antes da borda pra não encostar no círculo seguinte.
  // origem à esquerda: a linha cresce a partir do círculo, não do meio
  &__linha
    position: relative
    flex: 1
    height: 1px
    margin-left: 14px
    transform-origin: left center
    background: linear-gradient(to right, rgba(125, 155, 255, 0.28), rgba(125, 155, 255, 0.05))

  // ponto de luz que percorre a linha rumo à próxima etapa
  &__pulso
    position: absolute
    top: 50%
    left: 0
    width: 34px
    height: 2px
    margin-top: -1px
    border-radius: 2px
    background: linear-gradient(90deg, transparent, #a9c4ff, transparent)
    box-shadow: 0 0 10px 1px rgba(138, 166, 240, 0.55)
    opacity: 0

  &__titulo
    margin: 0 0 8px
    font-family: var(--semibold)
    font-size: 18px
    letter-spacing: -0.01em
    color: var(--cor-branco)

  &__texto
    margin: 0
    padding-right: 16px
    font-family: var(--light)
    font-size: 14.5px
    line-height: 1.6
    color: rgba(255, 255, 255, 0.5)

.contrato
  display: flex
  align-items: center
  gap: 20px
  max-width: 1600px
  margin: 62px auto 0
  padding: 26px 30px
  border: 1px solid rgba(125, 155, 255, 0.18)
  border-radius: 16px
  background: rgba(30, 46, 115, 0.28)

  &__icone
    display: flex
    align-items: center
    justify-content: center
    flex-shrink: 0
    width: 46px
    height: 46px
    border: 1px solid rgba(125, 155, 255, 0.28)
    border-radius: 12px
    background: rgba(125, 155, 255, 0.08)
    color: #8aa6f0

    :deep(svg)
      width: 20px
      height: 20px

  &__titulo
    margin: 0 0 5px
    font-family: var(--semibold)
    font-size: 16px
    color: var(--cor-branco)

  &__texto
    flex: 1
    min-width: 0

  &__descricao
    margin: 0
    max-width: 560px
    font-family: var(--light)
    font-size: 14.5px
    line-height: 1.6
    color: rgba(255, 255, 255, 0.55)

  // ocupa a metade direita, que antes ficava vazia, desdobrando o que o contrato cobre
  &__itens
    display: flex
    align-items: center
    gap: 34px
    flex-shrink: 0
    margin: 0
    padding: 0
    list-style: none

  &__item
    display: flex
    align-items: center
    gap: 9px
    line-height: 1
    font-family: var(--semibold)
    font-size: 14px
    color: rgba(255, 255, 255, 0.8)

    :deep(svg)
      // sem display:block o svg fica na linha de base do texto e sobe alguns pixels
      display: block
      width: 17px
      height: 17px
      flex-shrink: 0
      color: #8aa6f0

@media (max-width: 900px)
  .processo
    padding: 88px 20px 92px

  .contrato
    flex-wrap: wrap
    margin-top: 44px
    padding: 22px 22px
    gap: 16px
    align-items: flex-start

  .contrato__itens
    gap: 18px 24px
    flex-wrap: wrap
    width: 100%
    padding-top: 4px

    &__cabecalho
      margin-bottom: 44px

  .etapas
    grid-template-columns: repeat(2, 1fr)
    gap: 34px 24px

  .etapa__linha
    display: none

@media (max-width: 560px)
  .etapas
    grid-template-columns: 1fr
    gap: 28px

  .etapa__marca
    margin-bottom: 18px
</style>
