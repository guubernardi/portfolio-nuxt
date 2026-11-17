<template>
  <section id="processo" ref="raiz" class="processo" aria-labelledby="processo-titulo">
    <div class="processo__palco">
      <header class="processo__cabecalho">
        <p class="v2-rotulo processo__rotulo">{{ rotulo }}</p>
        <h2 id="processo-titulo" class="v2-titulo v2-titulo--claro">
          Do primeiro oi
          <em>ao site no ar.</em>
        </h2>
      </header>

      <div class="selo-contrato">
        <SvgIcone nome="contrato" />
        <span>Todo projeto<br />tem contrato</span>
      </div>

      <img class="processo__caminho" src="/images/home/caminho-processo.svg" alt="" aria-hidden="true" width="1500" height="400" />

      <ol class="etapas">
        <li v-for="(etapa, i) in etapas" :key="etapa.titulo" class="etapa" :class="`etapa--${i + 1}`">
          <span class="etapa__numero" aria-hidden="true">{{ i + 1 }}</span>
          <div class="etapa__entrada">
            <div class="etapa__cartao">
              <!-- cena de cada etapa, em HTML e CSS -->
              <div v-if="i === 0" class="cena cena--conversa" aria-hidden="true">
                <span class="balao balao--meu">Oi! Quero um site.</span>
                <span class="balao balao--dele">Bora! Me conta mais.</span>
              </div>
              <div v-else-if="i === 1" class="cena cena--prototipo" aria-hidden="true">
                <i class="b1" /><i class="b2" /><i class="b3" /><i class="b4" /><i class="b5" />
                <span class="carimbo"><SvgIcone nome="check" /> Aprovado</span>
              </div>
              <div v-else-if="i === 2" class="cena cena--codigo" aria-hidden="true">
                <img src="/images/home/cena-codigo.svg" alt="" width="240" height="112" />
              </div>
              <div v-else class="cena cena--no-ar" aria-hidden="true">
                <span class="endereco"><i /> seusite.com.br</span>
                <span class="publicado"><SvgIcone nome="check" /> Site no ar</span>
                <i class="bloco" />
              </div>

              <h3 class="etapa__titulo"><span class="etapa__indice">{{ i + 1 }}.</span> {{ etapa.titulo }}</h3>
              <p class="etapa__texto">{{ etapa.texto }}</p>
            </div>
          </div>
        </li>
      </ol>

      <div class="processo__chamada">
        <p>Tudo começa na etapa 1: um oi no WhatsApp.</p>
        <a class="v2-botao v2-botao--ciano" :href="whatsapp" target="_blank" rel="noopener">
          <SvgIcone nome="whatsapp" />
          Chamar no WhatsApp
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { gsap } from 'gsap'
import { linkWhatsapp } from '~/helpers/site'
import { useAnimacoes, entrar } from '~/composables/useAnimacoes'

const raiz = ref(null)

useAnimacoes(raiz, ({ movimento, mesa }, el) => {
  if (!movimento) return

  entrar(el.querySelector('.processo__cabecalho').children, el, { y: 50, stagger: 0.12, start: 'top 70%' })
  const selo = el.querySelector('.selo-contrato')
  // criado já pausado aqui dentro, pra o gsap.context desfazer ao sair da página
  const balanco = mesa ? gsap.to(selo, { rotation: '+=8', duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1, paused: true }) : null
  gsap.from(selo, {
    scale: 0, rotation: -120, duration: 1, ease: 'back.out(1.7)',
    scrollTrigger: { trigger: el, start: 'top 60%', once: true },
    // o balanço só começa depois da entrada: os dois mexem na mesma rotação
    onComplete: () => balanco?.play(),
  })

  // os quatro cartões chegam na ordem do caminho, e o detalhe de cada cena
  // aparece depois: balões da conversa, carimbo de aprovado, site no ar
  el.querySelectorAll('.etapa').forEach((etapa, i) => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: etapa, start: 'top 88%', once: true }, delay: mesa ? i * 0.22 : 0 })
    tl.from(etapa.querySelector('.etapa__entrada'), { y: 90, autoAlpha: 0, scale: 0.9, duration: 0.9, ease: 'back.out(1.4)' })
      .from(etapa.querySelector('.etapa__numero'), { y: 80, autoAlpha: 0, duration: 0.9, ease: 'power3.out' }, 0)
    // a cena do código não tem detalhe solto: só anima onde existe
    const detalhes = etapa.querySelectorAll('.balao, .carimbo, .publicado, .endereco')
    if (detalhes.length) tl.from(detalhes, { scale: 0, autoAlpha: 0, duration: 0.5, stagger: 0.2, ease: 'back.out(2.2)' }, 0.5)
  })

  entrar(el.querySelector('.processo__chamada').children, el.querySelector('.processo__chamada'), { y: 24, stagger: 0.1, start: 'top 92%' })

  if (!mesa) return

  // o caminho pontilhado se desenha da esquerda pra direita conforme a rolagem
  gsap.fromTo(el.querySelector('.processo__caminho'), { clipPath: 'inset(0% 100% 0% 0%)' }, {
    clipPath: 'inset(0% 0% 0% 0%)', ease: 'none',
    scrollTrigger: { trigger: el, start: 'top 65%', end: 'center 40%', scrub: 0.8 },
  })
})

// A home usa as etapas daqui; as páginas de serviço passam as delas (ETAPAS em
// helpers/servicos.js) e o próprio rótulo numerado.
const props = defineProps({
  rotulo: { type: String, default: 'Como eu trabalho' },
  itens: { type: Array, default: null },
  mensagem: { type: String, default: undefined },
})

const whatsapp = linkWhatsapp(props.mensagem)
const PADRAO = [
  { titulo: 'Conversa', texto: 'Entendo o que o projeto precisa resolver antes de falar de tela.' },
  { titulo: 'Protótipo', texto: 'Você aprova o layout inteiro antes de qualquer código.' },
  { titulo: 'Desenvolvimento', texto: 'Escrevo do zero, e você acompanha cada etapa.' },
  { titulo: 'No ar', texto: 'Publico, testo tudo e sigo junto depois do lançamento.' },
]
const etapas = props.itens || PADRAO
</script>

<style scoped lang="sass">
.processo
  position: relative
  overflow: hidden
  color: #fff
  background-color: var(--marinho)
  background-image: radial-gradient(ellipse 58% 55% at 50% 50%, rgba(7, 177, 232, 0.32), rgba(7, 177, 232, 0) 100%), linear-gradient(to right, rgba(243, 247, 249, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(243, 247, 249, 0.08) 1px, transparent 1px)
  background-size: 100% 100%, 96px 96px, 96px 96px
  background-position: 0 0, -1px -1px, -1px -1px

  // palco de 1440x1120 com as posições do Figma
  &__palco
    position: relative
    max-width: 1440px
    height: 1120px
    margin: 0 auto

  &__cabecalho
    position: absolute
    top: 100px
    left: 64px

  &__rotulo
    color: rgba(255, 255, 255, 0.85)

  &__caminho
    position: absolute
    top: 400px
    left: -20px
    width: 1500px
    max-width: none
    height: 400px
    pointer-events: none

  &__chamada
    position: absolute
    left: 0
    right: 0
    top: 980px
    display: flex
    flex-wrap: wrap
    align-items: center
    justify-content: center
    gap: 20px

    p
      margin: 0
      font-family: var(--figtree)
      font-weight: 600
      font-size: 19px

.selo-contrato
  position: absolute
  top: 112px
  right: 110px
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  gap: 8px
  width: 200px
  height: 200px
  border-radius: 50%
  background: var(--abismo)
  font-family: var(--figtree)
  font-weight: 800
  font-size: 16px
  line-height: 1.15
  letter-spacing: 0.04em
  text-align: center
  text-transform: uppercase
  transform: rotate(10deg)

  svg
    width: 30px
    height: 30px
    color: var(--ciano)

.etapas
  margin: 0
  padding: 0
  list-style: none

.etapa
  position: absolute
  width: 280px
  font-family: var(--figtree)

  // posição e inclinação de cada cartão, como no Figma
  &--1
    top: 428px
    left: 86px
    --giro: 4deg

  &--2
    top: 592px
    left: 433px
    --giro: -3deg

  &--3
    top: 427px
    left: 749px
    --giro: 3deg

  &--4
    top: 588px
    left: 1095px
    --giro: -4deg

  // número vazado gigante atrás do cartão
  &__numero
    position: absolute
    top: -178px
    left: 122px
    z-index: 0
    font-weight: 900
    font-size: 300px
    line-height: 1
    color: transparent
    -webkit-text-stroke: 2px rgba(243, 247, 249, 0.4)
    pointer-events: none

  &--1 &__numero, &--3 &__numero
    top: -178px

  &--2 &__numero, &--4 &__numero
    top: -162px

  &__cartao
    position: relative
    z-index: 1
    display: flex
    flex-direction: column
    gap: 14px
    padding: 20px 20px 24px
    border: 3px solid var(--abismo)
    border-radius: 24px
    background: #fff
    color: var(--abismo)
    box-shadow: 0 18px 32px rgba(5, 13, 64, 0.35)
    transform: rotate(var(--giro))

  &__titulo
    margin: 0
    font-weight: 700
    font-size: 24px
    letter-spacing: -0.01em

  // no desktop o número gigante já diz a ordem; o índice só aparece no empilhado
  &__indice
    display: none

  &__texto
    margin: 0
    font-size: 15px
    line-height: 1.5
    color: var(--texto-apagado)

// ===== cenas =====
.cena
  position: relative
  height: 112px
  overflow: hidden
  border-radius: 14px
  background: var(--gelo)

  &--conversa
    background: #EFEAE2

  &--codigo
    background: none

    img
      display: block
      width: 100%
      height: 100%

.balao
  position: absolute
  padding: 8px 12px
  font-weight: 500
  font-size: 13px
  color: var(--abismo)
  white-space: nowrap

  &--meu
    top: 16px
    right: 14px
    border-radius: 12px 4px 12px 12px
    background: #D9FDD3

  &--dele
    top: 60px
    left: 14px
    border-radius: 4px 12px 12px 12px
    background: #fff

.cena--prototipo
  i
    position: absolute
    left: 16px
    border-radius: 4px

  .b1
    top: 16px
    width: 40px
    height: 10px
    border-radius: 5px
    background: rgba(2, 7, 21, 0.15)

  .b2
    top: 36px
    width: 150px
    height: 12px
    background: rgba(2, 7, 21, 0.8)

  .b3
    top: 54px
    width: 120px
    height: 12px
    background: rgba(2, 7, 21, 0.8)

  .b4
    top: 76px
    width: 90px
    height: 22px
    border-radius: 11px
    background: var(--petroleo)

  .b5
    top: 16px
    left: auto
    right: 16px
    width: 54px
    height: 82px
    border-radius: 10px
    background: rgba(10, 78, 112, 0.15)

.carimbo
  position: absolute
  top: 72px
  left: 118px
  display: inline-flex
  align-items: center
  gap: 6px
  padding: 7px 12px
  border: 2px solid var(--abismo)
  border-radius: 999px
  background: var(--ciano)
  font-weight: 800
  font-size: 13px
  color: var(--abismo)
  transform: rotate(8deg)

  svg
    width: 14px
    height: 14px

.cena--no-ar
  .endereco, .publicado
    position: absolute
    left: 16px
    display: inline-flex
    align-items: center
    gap: 8px
    padding: 8px 12px
    border-radius: 999px
    font-size: 13px

  .endereco
    top: 16px
    background: #fff
    font-weight: 600

    i
      width: 8px
      height: 8px
      border-radius: 50%
      background: #25D366

  .publicado
    top: 62px
    background: var(--abismo)
    font-weight: 700
    color: #fff

    svg
      width: 14px
      height: 14px
      color: var(--ciano)

  .bloco
    position: absolute
    top: 62px
    right: 16px
    width: 74px
    height: 34px
    border-radius: 10px
    background: rgba(10, 78, 112, 0.15)

// ===== tela menor: tudo em fluxo =====
@media (max-width: 1400px)
  .processo__palco
    height: auto
    padding: 100px 40px 90px

  .processo__cabecalho, .selo-contrato, .processo__chamada
    position: relative
    top: auto
    left: auto
    right: auto

  .selo-contrato
    position: absolute
    top: 90px
    right: 40px
    width: 150px
    height: 150px
    font-size: 13px

  .processo__caminho, .etapa__numero
    display: none

  .etapas
    display: grid
    grid-template-columns: repeat(2, minmax(0, 1fr))
    gap: 36px 28px
    max-width: 760px
    margin: 72px auto 0

  .etapa
    position: relative
    top: auto
    left: auto
    width: auto

  .etapa__indice
    display: inline

  .processo__chamada
    margin-top: 64px

@media (max-width: 760px)
  .processo__palco
    padding: 80px 20px

  .selo-contrato
    position: relative
    top: auto
    right: auto
    margin: 32px 0 0 auto

  .etapas
    grid-template-columns: 1fr
    margin-top: 40px

  // giro menor: no celular o cartão torto come largura útil
  .etapa__cartao
    transform: rotate(calc(var(--giro) / 2))

  .processo__chamada
    flex-direction: column
    text-align: center

    .v2-botao
      width: 100%
</style>
