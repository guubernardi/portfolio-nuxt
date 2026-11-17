<template>
  <section :id="ancora" ref="raiz" class="chamada" aria-labelledby="chamada-titulo">
    <div class="chamada__palco">
      <h2 id="chamada-titulo" class="chamada__titulo">
        <!-- cada linha numa máscara: o texto sobe de dentro dela -->
        <span class="chamada__linha"><span>{{ linha1 }}</span></span>
        <span class="chamada__linha"><em>{{ linha2 }}</em></span>
      </h2>

      <p class="chamada__texto">{{ texto }}</p>

      <div class="chamada__acoes">
        <a class="v2-botao v2-botao--ciano" :href="whatsapp" target="_blank" rel="noopener">
          <SvgIcone nome="whatsapp" />
          Chamar no WhatsApp
        </a>
        <a class="v2-botao v2-botao--contorno" href="https://www.instagram.com/devbygusta/" target="_blank" rel="noopener">
          <SvgIcone nome="instagram" />
          @devbygusta
        </a>
      </div>

      <div class="chamada__cenario" aria-hidden="true">
        <div class="notificacao">
          <span class="notificacao__app"><SvgIcone nome="whatsapp" /></span>
          <span class="notificacao__corpo">
            <span class="notificacao__topo"><b>Gustavo</b> agora</span>
            Oi! Me conta o que<br />você precisa.
          </span>
        </div>
        <img class="chamada__seta" src="/images/home/seta-mao-chamada.svg" alt="" width="170" height="125" />
        <span class="figurinha-gb">
          <img src="/images/home/logo-figurinha.svg" alt="" width="74" height="80" />
        </span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { gsap } from 'gsap'
import { linkWhatsapp } from '~/helpers/site'
import { useAnimacoes, entrar } from '~/composables/useAnimacoes'

// A mesma chamada fecha todas as páginas da V2; cada uma troca o título e o
// texto. Sem props, fica a da home.
const props = defineProps({
  ancora: { type: String, default: 'contato' },
  linha1: { type: String, default: 'Tem um projeto' },
  linha2: { type: String, default: 'em mente?' },
  texto: { type: String, default: 'Manda uma mensagem contando o que você precisa. Sem formulário longo e sem compromisso.' },
  mensagem: { type: String, default: undefined },
})

const raiz = ref(null)

useAnimacoes(raiz, ({ movimento, mesa }, el) => {
  if (!movimento) return

  gsap.from(el.querySelectorAll('.chamada__linha > *'), {
    yPercent: 110, duration: 1.1, stagger: 0.14, ease: 'power4.out',
    scrollTrigger: { trigger: el, start: 'top 70%', once: true },
  })
  entrar([el.querySelector('.chamada__texto'), ...el.querySelectorAll('.chamada__acoes > *')], el, { y: 30, stagger: 0.1, delay: 0.35, start: 'top 70%' })

  if (!mesa) return

  const cena = el.querySelector('.chamada__cenario')
  const figurinha = cena.querySelector('.figurinha-gb')
  const boia = gsap.to(figurinha, { rotation: '+=10', y: -10, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1, paused: true })
  gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 55%', once: true }, defaults: { ease: 'back.out(1.6)' }, onComplete: () => boia.play() })
    .from(cena.querySelector('.notificacao'), { x: -120, autoAlpha: 0, rotation: -20, duration: 0.9 })
    .from(cena.querySelector('.chamada__seta'), { scale: 0.3, autoAlpha: 0, duration: 0.7 }, 0.4)
    .from(figurinha, { scale: 0.3, autoAlpha: 0, rotation: 40, duration: 1, ease: 'back.out(2.2)' }, 0.2)
})

const whatsapp = linkWhatsapp(props.mensagem)
</script>

<style scoped lang="sass">
.chamada
  position: relative
  overflow: hidden
  color: #fff
  text-align: center
  background-color: var(--marinho)
  background-image: radial-gradient(ellipse 58% 50% at 50% 50%, rgba(7, 177, 232, 0.32), rgba(7, 177, 232, 0) 100%), linear-gradient(to right, rgba(243, 247, 249, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(243, 247, 249, 0.08) 1px, transparent 1px)
  background-size: 100% 100%, 96px 96px, 96px 96px
  background-position: 0 0, -1px -1px, -1px -1px

  &__palco
    position: relative
    max-width: 1440px
    margin: 0 auto
    padding: 120px 20px 150px

  &__titulo
    position: relative
    z-index: 2
    margin: 0
    font-family: var(--figtree)
    font-weight: 900
    font-size: clamp(48px, 9.2vw, 132px)
    line-height: 0.88
    letter-spacing: -0.04em
    text-transform: uppercase

    em
      font-style: normal
      color: var(--ciano)

  // a máscara: o que estiver abaixo da linha fica escondido
  &__linha
    display: block
    overflow: hidden
    // folga pra descida do "J" e do "?" não ser cortada pela máscara
    padding-bottom: 0.06em

    > *
      display: block

  &__texto
    position: relative
    z-index: 2
    max-width: 560px
    margin: 36px auto 0
    font-family: var(--figtree)
    font-size: clamp(17px, 1.4vw, 20px)
    line-height: 1.5
    color: rgba(255, 255, 255, 0.9)

  &__acoes
    position: relative
    z-index: 2
    display: flex
    flex-wrap: wrap
    justify-content: center
    gap: 12px
    margin-top: 36px

  &__cenario
    position: absolute
    inset: 0
    pointer-events: none

  &__seta
    position: absolute
    top: 414px
    left: 316px

.notificacao
  position: absolute
  top: 470px
  left: 76px
  display: flex
  gap: 12px
  align-items: flex-start
  padding: 16px 22px 16px 16px
  border: 1.5px solid rgba(255, 255, 255, 0.55)
  border-radius: 22px
  background: rgba(255, 255, 255, 0.22)
  backdrop-filter: blur(12px)
  -webkit-backdrop-filter: blur(12px)
  box-shadow: 0 18px 36px rgba(5, 13, 64, 0.3)
  font-family: var(--figtree)
  font-weight: 500
  font-size: 15px
  line-height: 1.35
  text-align: left
  white-space: nowrap
  transform: rotate(-6deg)

  &__app
    display: flex
    align-items: center
    justify-content: center
    width: 44px
    height: 44px
    flex-shrink: 0
    border-radius: 12px
    background: #25D366

    svg
      width: 24px
      height: 24px

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
  top: 405px
  right: 106px
  display: flex
  align-items: center
  justify-content: center
  width: 150px
  height: 150px
  border: 4px solid var(--abismo)
  border-radius: 34px
  background: #fff
  box-shadow: 0 16px 30px rgba(5, 13, 51, 0.35)
  transform: rotate(-10deg)

  img
    width: 74px
    height: auto

// o cenário encosta nos botões abaixo de 1280: sai e o título fica sozinho
@media (max-width: 1280px)
  .chamada__cenario
    display: none

@media (max-width: 760px)
  .chamada__palco
    padding: 90px 20px 110px

  .quebra
    display: none

  .chamada__acoes .v2-botao
    width: 100%
</style>
