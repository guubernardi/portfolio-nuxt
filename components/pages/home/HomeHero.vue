<template>
  <section id="inicio" ref="raiz" class="hero">
    <NavTopo />

    <!-- cenário: notificações, setas e figurinhas. Decoração pura, posicionada
         como no Figma num palco de 1440px; some aos poucos em tela menor -->
    <div class="hero__palco" aria-hidden="true">
      <div class="notificacao notificacao--whatsapp">
        <span class="notificacao__app notificacao__app--whatsapp"><SvgIcone nome="whatsapp" /></span>
        <span class="notificacao__corpo">
          <span class="notificacao__topo"><b>WhatsApp</b> agora</span>
          Oi! Vi seu site e quero<br />agendar um horário.
        </span>
      </div>

      <div class="notificacao notificacao--loja">
        <span class="notificacao__app notificacao__app--loja"><SvgIcone nome="loja" /></span>
        <span class="notificacao__corpo">
          <span class="notificacao__topo"><b>Loja</b> agora</span>
          Pedido #1043 pago no Pix<br />R$ 189,90
        </span>
      </div>

      <div class="notificacao notificacao--sistema">
        <span class="notificacao__app notificacao__app--sistema"><SvgIcone nome="dashboard" /></span>
        <span class="notificacao__corpo">
          <span class="notificacao__topo"><b>Sistema</b> há 2 min</span>
          Produção de hoje atualizada,<br />3 setores no prazo.
        </span>
      </div>

      <img class="hero__seta hero__seta--esquerda" src="/images/home/seta-mao-esquerda.svg" alt="" width="170" height="125" />
      <img class="hero__seta hero__seta--direita" src="/images/home/seta-mao-direita.svg" alt="" width="175" height="140" />

      <span class="figurinha-gb">
        <img src="/images/home/logo-figurinha.svg" alt="" width="74" height="80" />
      </span>
    </div>

    <div class="hero__conteudo">
      <span class="hero__selo">Disponível para novos projetos</span>

      <h1 class="hero__titulo">
        Sites,<br />
        sistemas e<br />
        e&#8209;commerces.
      </h1>

      <p class="hero__texto">
        Site que traz cliente, loja que vende sozinha e sistema que organiza a empresa.
        <br class="hero__quebra" />
        Tudo feito do zero, falando direto com quem desenha e programa.
      </p>

      <div class="hero__acoes">
        <a class="v2-botao v2-botao--claro" :href="whatsapp" target="_blank" rel="noopener">
          Solicitar orçamento
          <span class="v2-botao__bolinha"><SvgIcone nome="seta-direita" /></span>
        </a>
        <a class="v2-botao v2-botao--contorno" href="#projetos" @click="rolarPara($event, '#projetos')">
          Ver projetos
        </a>
      </div>
    </div>

    <a class="selo-orcamento" :href="whatsapp" target="_blank" rel="noopener">
      <SvgIcone nome="seta-direita" />
      <span>Peça seu<br />orçamento</span>
    </a>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { gsap } from 'gsap'
import { linkWhatsapp } from '~/helpers/site'
import { useScrollTo } from '~/composables/useScrollTo'
import { useAnimacoes } from '~/composables/useAnimacoes'

const raiz = ref(null)

const whatsapp = linkWhatsapp()
const { scrollTo } = useScrollTo()

// o href fica de verdade (funciona sem JS e no "abrir em nova aba"); com JS a
// rolagem é suave
function rolarPara(evento, alvo) {
  evento.preventDefault()
  scrollTo(alvo)
}

// O título, o texto e os botões entram em CSS (ver os keyframes no fim): são o
// LCP da home e não podem esperar o JS. O GSAP cuida do que está em volta.
useAnimacoes(raiz, ({ movimento, mesa }, el) => {
  if (!movimento) return

  // o selo chega girando depois do título; o clearProps devolve o transform
  // ao CSS pra o hover dele voltar a funcionar
  gsap.from(el.querySelector('.selo-orcamento'), {
    scale: 0, rotation: -140, duration: 1.1, delay: 0.9, ease: 'back.out(1.6)', clearProps: 'transform',
  })

  if (!mesa) return

  const palco = el.querySelector('.hero__palco')
  const notificacoes = palco.querySelectorAll('.notificacao')
  const figurinha = palco.querySelector('.figurinha-gb')
  const setas = palco.querySelectorAll('.hero__seta')

  const entrada = gsap.timeline({ delay: 0.55, defaults: { ease: 'back.out(1.5)' } })
  entrada
    .from(notificacoes, { autoAlpha: 0, y: 70, rotation: '+=14', scale: 0.85, duration: 0.9, stagger: 0.14 })
    .from(figurinha, { autoAlpha: 0, scale: 0.3, rotation: -40, duration: 1, ease: 'back.out(2.2)' }, 0.15)
    .from(setas, { autoAlpha: 0, scale: 0.4, duration: 0.8, stagger: 0.12 }, 0.35)

  // depois de entrar, as notificações ficam boiando, cada uma num ritmo. Criadas
  // pausadas aqui (e não no callback) pra o gsap.context desfazer ao sair
  const boias = [
    ...[...notificacoes].map((n, i) => gsap.to(n, { y: i % 2 ? -12 : 12, duration: 2.6 + i * 0.5, ease: 'sine.inOut', yoyo: true, repeat: -1, paused: true })),
    gsap.to(figurinha, { rotation: '-=8', duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1, paused: true }),
  ]
  entrada.add(() => boias.forEach((b) => b.play()))

  // o cenário inteiro acompanha o mouse de leve, como profundidade
  const moverX = gsap.quickTo(palco, 'x', { duration: 0.9, ease: 'power3' })
  const moverY = gsap.quickTo(palco, 'y', { duration: 0.9, ease: 'power3' })
  const aoMover = (e) => {
    moverX((e.clientX / window.innerWidth - 0.5) * -26)
    moverY((e.clientY / window.innerHeight - 0.5) * -18)
  }
  el.addEventListener('mousemove', aoMover)

  // rolando pra baixo, o texto do topo sobe e esmaece antes da faixa cobrir
  gsap.to(el.querySelector('.hero__conteudo'), {
    yPercent: 22, autoAlpha: 0.25, ease: 'none',
    scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: 0.6 },
  })
  gsap.to(palco, {
    yPercent: -10, ease: 'none',
    scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: 0.6 },
  })

  return () => el.removeEventListener('mousemove', aoMover)
})
</script>

<style scoped lang="sass">
.hero
  position: relative
  overflow: hidden
  min-height: 900px
  padding: 112px 20px 150px
  // brilho azul elétrico no centro, como nas capas do Insta. Gradiente que já
  // termina transparente: nada de filter: blur (caro no Safari do iPhone)
  background-color: var(--marinho)
  background-image: radial-gradient(ellipse 58% 52% at 50% 50%, rgba(7, 177, 232, 0.32), rgba(7, 177, 232, 0) 100%), linear-gradient(to right, rgba(243, 247, 249, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(243, 247, 249, 0.08) 1px, transparent 1px)
  background-size: 100% 100%, 96px 96px, 96px 96px
  background-position: 0 0, -1px -1px, -1px -1px
  color: #fff
  text-align: center

  &__conteudo
    position: relative
    z-index: 2

  &__selo
    display: inline-block
    margin-bottom: 31px
    padding: 8px 16px
    border-radius: 999px
    background: var(--abismo)
    font-family: var(--figtree)
    font-weight: 600
    font-size: 14px
    animation: entrar 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both

  &__titulo
    margin: 0
    font-family: var(--figtree)
    font-weight: 900
    // 11vw no celular: "E-COMMERCES." é a linha mais larga e não pode vazar
    font-size: clamp(38px, 11vw, 135px)
    line-height: 0.84
    letter-spacing: -0.03em
    text-transform: uppercase
    animation: entrar 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both

  &__texto
    max-width: 780px
    margin: 35px auto 0
    font-family: var(--figtree)
    font-weight: 400
    font-size: clamp(16px, 1.35vw, 19px)
    line-height: 1.5
    color: rgba(255, 255, 255, 0.9)
    animation: entrar 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.35s both

  &__acoes
    display: flex
    flex-wrap: wrap
    justify-content: center
    gap: 12px
    margin-top: 33px
    animation: entrar 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.45s both

  // ===== cenário =====
  // centralizado por margem, não por transform: o GSAP mexe no x/y dele
  // (mouse) e um translateX(-50%) no CSS seria sobrescrito
  &__palco
    position: absolute
    top: 0
    left: 0
    right: 0
    z-index: 1
    max-width: 1440px
    height: 100%
    margin: 0 auto
    pointer-events: none

  &__seta
    position: absolute

    &--esquerda
      top: 330px
      left: 150px

    &--direita
      top: 372px
      right: 27px

.notificacao
  position: absolute
  display: flex
  gap: 14px
  align-items: flex-start
  padding: 16px 22px 16px 16px
  border: 1.5px solid rgba(255, 255, 255, 0.55)
  border-radius: 22px
  background: rgba(255, 255, 255, 0.22)
  // no toque o vidro sai pela regra global (aparelho-de-toque.sass)
  backdrop-filter: blur(12px)
  -webkit-backdrop-filter: blur(12px)
  box-shadow: 0 18px 36px rgba(5, 13, 64, 0.3)
  font-family: var(--figtree)
  font-weight: 500
  font-size: 15px
  line-height: 1.35
  text-align: left
  white-space: nowrap

  &--whatsapp
    top: 190px
    left: 55px
    transform: rotate(-6deg)

  &--loja
    top: 562px
    right: 60px
    transform: rotate(6deg)

  &--sistema
    top: 662px
    left: 56px
    transform: rotate(4deg)

  &__app
    display: flex
    align-items: center
    justify-content: center
    width: 44px
    height: 44px
    border-radius: 12px
    flex-shrink: 0

    svg
      width: 24px
      height: 24px

    &--whatsapp
      background: #25D366
      color: #fff

    &--loja
      background: var(--abismo)
      color: #fff

    &--sistema
      background: #fff
      color: var(--petroleo)

  &__corpo
    display: flex
    flex-direction: column
    gap: 4px

  &__topo
    font-size: 13px
    color: rgba(255, 255, 255, 0.7)

    b
      margin-right: 8px
      font-weight: 700
      font-size: 14px
      color: #fff

.figurinha-gb
  position: absolute
  top: 108px
  right: 110px
  display: flex
  align-items: center
  justify-content: center
  width: 150px
  height: 150px
  border: 4px solid var(--abismo)
  border-radius: 34px
  background: #fff
  box-shadow: 0 16px 30px rgba(5, 13, 51, 0.35)
  transform: rotate(12deg)

  img
    width: 74px
    height: auto

// selo redondo "Peça seu orçamento": fica fora do palco porque é um link
.selo-orcamento
  position: absolute
  z-index: 2
  bottom: 4px
  right: max(20px, calc(50% - 720px + 102px))
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  gap: 6px
  width: 168px
  height: 168px
  border-radius: 50%
  background: var(--ciano)
  color: var(--abismo)
  font-family: var(--figtree)
  font-weight: 800
  font-size: 15px
  line-height: 1.1
  letter-spacing: 0.04em
  text-transform: uppercase
  text-decoration: none
  transform: rotate(12deg)
  transition: transform 0.4s ease

  &:hover
    transform: rotate(4deg) scale(1.04)

  &:focus-visible
    outline: 2px solid #fff
    outline-offset: 4px

  svg
    width: 28px
    height: 28px
    transform: rotate(-45deg)

@keyframes entrar
  from
    opacity: 0
    transform: translateY(24px)

@media (prefers-reduced-motion: reduce)
  .hero__selo, .hero__titulo, .hero__texto, .hero__acoes
    animation: none

// abaixo de 1280 as setas encostam no título; abaixo de 1100 as notificações
// e a figurinha também. O título manda: o cenário sai antes
@media (max-width: 1280px)
  .hero__seta
    display: none

@media (max-width: 1100px)
  .hero__palco
    display: none

  .hero
    min-height: 0
    padding-bottom: 200px

@media (max-width: 760px)
  .hero
    padding: 120px 20px 150px

  .hero__quebra
    display: none

  .hero__acoes .v2-botao
    width: 100%

  .selo-orcamento
    width: 120px
    height: 120px
    font-size: 12px
    bottom: 14px
    right: 16px

    svg
      width: 22px
      height: 22px
</style>
