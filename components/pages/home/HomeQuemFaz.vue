<template>
  <section id="sobre" ref="raiz" class="quem v2-grade-clara" aria-labelledby="quem-titulo">
    <!-- BERNARDI fantasma ao fundo: parado, de propósito (letreiro animado
         gigante derrubava a aba do Safari no iPhone) -->
    <div class="quem__fantasma" aria-hidden="true">
      <span>Bernardi&nbsp;&nbsp;Bernardi&nbsp;&nbsp;Bernardi</span>
      <span>Bernardi&nbsp;&nbsp;Bernardi&nbsp;&nbsp;Bernardi</span>
      <span>Bernardi&nbsp;&nbsp;Bernardi&nbsp;&nbsp;Bernardi</span>
    </div>

    <p class="quem__nome" aria-hidden="true">Gustavo</p>

    <img
      class="quem__foto"
      src="/images/home/gustavo-recorte.webp"
      alt="Gustavo Bernardi olhando por cima do ombro"
      width="1400"
      height="1208"
      loading="lazy"
      decoding="async"
    />

    <!-- créditos de filme: os clientes, na vertical -->
    <p class="quem__creditos">
      <template v-for="(cliente, i) in clientes" :key="cliente">
        <span v-if="i > 0" aria-hidden="true">✱</span>{{ cliente }}
      </template>
    </p>

    <div class="quem__decoracao" aria-hidden="true">
      <span class="figurinha figurinha--zero">Escrito do zero</span>
      <span class="figurinha figurinha--intermediario"><SvgIcone nome="check" /> Sem intermediário</span>
      <img class="quem__brilho" src="/images/home/brilho.svg" alt="" width="72" height="72" />
      <img class="quem__brilho-contorno" src="/images/home/brilho-contorno.svg" alt="" width="36" height="36" />
      <img class="quem__circulo" src="/images/home/circulo-pontilhado.svg" alt="" width="120" height="120" />
      <img class="quem__onda" src="/images/home/onda-mao.svg" alt="" width="280" height="60" />
    </div>

    <div class="quem__apresentacao v2-conteudo">
      <div class="quem__texto">
        <p class="v2-rotulo">Olá, eu sou o Gustavo</p>
        <h2 id="quem-titulo" class="quem__titulo">
          Eu faço a sua empresa<br />
          <em>vender e produzir mais.</em>
        </h2>
        <p class="quem__paragrafo">
          Já criei sistema para fábrica, loja virtual para revenda e sites que realmente
          vendem. E quem conversa com você sou eu, do primeiro rascunho ao projeto no ar.
        </p>
        <div class="quem__acoes">
          <NuxtLink class="v2-botao v2-botao--escuro" to="/projetos">
            Ver projetos
            <span class="v2-botao__bolinha"><SvgIcone nome="seta-direita" /></span>
          </NuxtLink>
          <a class="v2-botao v2-botao--ciano" :href="whatsapp" target="_blank" rel="noopener">
            <SvgIcone nome="whatsapp" />
            Chamar no WhatsApp
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { gsap } from 'gsap'
import { linkWhatsapp } from '~/helpers/site'
import { useAnimacoes, entrar, parallax } from '~/composables/useAnimacoes'

const raiz = ref(null)

useAnimacoes(raiz, ({ movimento, mesa }, el) => {
  if (!movimento) return

  // o nome sobe primeiro e a foto chega na frente dele, como o pôster montando
  const montagem = gsap.timeline({
    defaults: { ease: 'power4.out' },
    scrollTrigger: { trigger: el, start: 'top 72%', once: true },
  })
  montagem
    .from(el.querySelector('.quem__nome'), { yPercent: 45, autoAlpha: 0, duration: 1.2 })
    .from(el.querySelector('.quem__foto'), { y: 120, autoAlpha: 0, duration: 1.3 }, 0.2)
    .from(el.querySelector('.quem__texto').children, { y: 34, autoAlpha: 0, duration: 0.8, stagger: 0.09, ease: 'power3.out' }, 0.55)
    .from(el.querySelector('.quem__creditos'), { autoAlpha: 0, duration: 1 }, 0.8)

  if (!mesa) return

  // figurinhas coladas com estalo, e os rabiscos aparecendo em volta
  const deco = el.querySelector('.quem__decoracao')
  gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 55%', once: true }, defaults: { ease: 'back.out(2)' } })
    .from(deco.querySelectorAll('.figurinha'), { scale: 0, rotation: '-=30', duration: 0.8, stagger: 0.25 }, 0.6)
    .from(deco.querySelectorAll('.quem__brilho, .quem__brilho-contorno'), { scale: 0, rotation: -90, duration: 0.7, stagger: 0.12 }, 0.9)
    .from(deco.querySelector('.quem__circulo'), { scale: 0.4, autoAlpha: 0, duration: 0.9 }, 0.8)
    .from(deco.querySelector('.quem__onda'), { scaleX: 0, transformOrigin: 'left center', duration: 1, ease: 'power3.out' }, 1.1)

  // movimento contínuo, leve: o círculo gira e o brilho pulsa
  gsap.to(deco.querySelector('.quem__circulo'), { rotation: 360, duration: 24, ease: 'none', repeat: -1 })
  gsap.to(deco.querySelector('.quem__brilho'), { scale: 0.75, duration: 1.8, ease: 'sine.inOut', yoyo: true, repeat: -1 })

  // rolando, o BERNARDI do fundo desliza em sentidos opostos e o nome sobe devagar
  el.querySelectorAll('.quem__fantasma span').forEach((linha, i) => {
    parallax(linha, el, { x: i % 2 ? 160 : -160 })
  })
  parallax(el.querySelector('.quem__nome'), el, { y: -70 })
})

const whatsapp = linkWhatsapp('Olá, Gustavo! Vim pelo site e quero conversar sobre um projeto.')
const clientes = ['Qualifix', 'Gama 3D', 'City Toys', 'Brenna Damasceno', 'Conecta Contábil']
</script>

<style scoped lang="sass">
.quem
  position: relative
  overflow: hidden
  height: 900px
  background-color: var(--gelo)

  &__fantasma
    position: absolute
    inset: 0
    font-family: var(--figtree)
    font-weight: 900
    font-size: 230px
    letter-spacing: -0.03em
    text-transform: uppercase
    color: rgba(2, 7, 21, 0.04)
    white-space: nowrap
    pointer-events: none

    span
      position: absolute

      &:nth-child(1)
        top: 330px
        left: -120px

      &:nth-child(2)
        top: 560px
        left: -420px

      &:nth-child(3)
        top: 790px
        left: -200px

  // o nome fica atrás da foto: a cabeça cobre o meio das letras. Centralizado
  // por left/right, sem transform, porque o GSAP anima a posição dele
  &__nome
    position: absolute
    top: 40px
    left: 0
    right: 0
    z-index: 1
    margin: 0
    text-align: center
    font-family: var(--figtree)
    font-weight: 900
    font-size: min(295px, 20.5vw)
    line-height: 1.2
    letter-spacing: -0.04em
    text-transform: uppercase
    color: var(--azul-eletrico)
    white-space: nowrap

  // um pouco à direita do centro, como no Figma (43% da foto antes do meio)
  &__foto
    position: absolute
    bottom: 0
    left: calc(50% - min(913px, 63vw) * 0.43)
    z-index: 2
    width: min(913px, 63vw)
    height: auto

  &__creditos
    position: absolute
    top: 50%
    left: 28px
    z-index: 3
    display: flex
    gap: 10px
    margin: 0
    transform: translate(-50%, -50%) rotate(-90deg)
    font-family: var(--figtree)
    font-weight: 600
    font-size: 11px
    letter-spacing: 0.18em
    text-transform: uppercase
    white-space: nowrap
    color: rgba(90, 96, 114, 0.7)

  &__decoracao
    position: absolute
    top: 0
    left: 50%
    z-index: 3
    width: 100%
    max-width: 1440px
    height: 100%
    transform: translateX(-50%)
    pointer-events: none

  &__brilho
    position: absolute
    top: 520px
    left: 1210px

  &__brilho-contorno
    position: absolute
    top: 470px
    left: 1320px

  &__circulo
    position: absolute
    top: 360px
    left: 1100px

  &__onda
    position: absolute
    top: 735px
    left: 1056px
    transform: rotate(6deg)

  // texto embaixo, à esquerda, por cima da grade e ao lado da foto
  &__apresentacao
    position: absolute
    bottom: 76px
    left: 50%
    z-index: 4
    transform: translateX(-50%)

  &__texto
    max-width: 460px

  &__titulo
    margin: 0
    font-family: var(--figtree)
    font-weight: 700
    font-size: clamp(32px, 3.1vw, 44px)
    line-height: 1.08
    letter-spacing: -0.02em
    color: var(--abismo)

    em
      font-style: normal
      color: var(--petroleo)

  &__paragrafo
    margin: 20px 0 0
    font-family: var(--figtree)
    font-size: 17px
    line-height: 1.55
    color: var(--texto-apagado)

  &__acoes
    display: flex
    flex-wrap: wrap
    gap: 12px
    margin-top: 20px

.figurinha
  position: absolute
  display: inline-flex
  align-items: center
  gap: 10px
  border: 3px solid var(--abismo)
  font-family: var(--figtree)
  font-weight: 800
  font-size: 18px
  white-space: nowrap

  svg
    width: 22px
    height: 22px

  &--zero
    top: 435px
    left: 248px
    padding: 12px 22px
    border-radius: 999px
    background: var(--petroleo)
    color: #fff
    transform: rotate(8deg)

  &--intermediario
    top: 585px
    left: 1083px
    padding: 14px 20px
    border-radius: 20px
    background: #fff
    color: var(--abismo)
    box-shadow: 0 12px 24px rgba(13, 15, 26, 0.15)
    transform: rotate(-6deg)

    svg
      color: var(--petroleo)

// abaixo de 1400 o cenário da direita (posições do Figma) sai da tela
@media (max-width: 1400px)
  .quem__decoracao
    display: none

// tablet e celular: nome em cima, foto no meio, texto embaixo, em fluxo
@media (max-width: 980px)
  .quem
    height: auto
    padding-top: 40px

  .quem__fantasma, .quem__creditos
    display: none

  .quem__nome
    position: relative
    top: auto
    font-size: 21vw

  .quem__foto
    position: relative
    display: block
    width: min(640px, 112vw)
    margin: -12vw auto 0
    left: 2%

  .quem__apresentacao
    position: relative
    bottom: auto
    left: auto
    transform: none
    padding-top: 36px
    padding-bottom: 64px
    margin-top: -1px
    background: var(--gelo)

  .quem__texto
    max-width: none

@media (max-width: 760px)
  .quem__acoes .v2-botao
    width: 100%
</style>
