<template>
  <section class="header">
    <nav class="nav" :class="{ 'nav--rolado': rolado }">
      <div class="logo">
        <Svgs nome="logo" />
      </div>

      <div class="opcoes">
        <div class="sociais">
          <Svgs nome="whatsapp" />
          <Svgs nome="linkedin-branco" />
          <Svgs nome="github-branco" />
        </div>

        <div class="menu">
          <span class="links">Inicio</span>
          <span class="links">Projetos</span>
          <span class="links">Sobre mim</span>
        </div>
      </div>

      <button class="hamburger" :class="{ 'hamburger--aberto': menuAberto }" @click="toggleMenu" aria-label="Abrir menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>

    <Transition name="fade-menu">
      <div v-if="menuAberto" class="menu-mobile" @click.self="fecharMenu">
        <div class="menu-mobile__conteudo">
          <nav class="menu-mobile__nav">
            <span class="menu-mobile__link" @click="fecharMenu">Início</span>
            <span class="menu-mobile__link" @click="fecharMenu">Projetos</span>
            <span class="menu-mobile__link" @click="fecharMenu">Sobre mim</span>
          </nav>

          <div class="menu-mobile__sociais">
            <Svgs nome="whatsapp" />
            <Svgs nome="linkedin-branco" />
            <Svgs nome="github-branco" />
          </div>
        </div>
      </div>
    </Transition>

    <div class="header__transicao"></div>

    <div class="container-conteudo">
      <div class="esquerda">
        <h1>
          Olá, me chamo <br />
          <span class="nome">Gustavo Bernardi</span>
        </h1>

        <p class="cargo">
          Desenvolvedor Front-End
        </p>

        <BotaoAzul class="btn-projetos" icone="codigo" texto="Ver projetos" />
      </div>

      <div class="direita">
        <div class="codigo-wrapper">
          <div class="janela-codigo">
            <div class="aba">portifolio.vue</div>
            <div class="corpo-codigo">
              <pre><code v-html="displayedHtml"></code><span v-if="typedCount < totalChars" class="cursor">▋</span></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import Svgs from '../../global/svgs/Svgs.vue'
import BotaoAzul from '../../global/elementos/BotaoAzul.vue'

const rolado = ref(false)
const menuAberto = ref(false)
const typedCount = ref(0)

function aoRolar() {
  rolado.value = window.scrollY > 80
}

function toggleMenu() {
  menuAberto.value = !menuAberto.value
  document.body.style.overflow = menuAberto.value ? 'hidden' : ''
}

function fecharMenu() {
  menuAberto.value = false
  document.body.style.overflow = ''
}

function aoTeclar(e) {
  if (e.key === 'Escape') fecharMenu()
}

onMounted(() => {
  window.addEventListener('scroll', aoRolar, { passive: true })
  window.addEventListener('keydown', aoTeclar)

  const intervalo = setInterval(() => {
    if (typedCount.value < totalChars) {
      typedCount.value++
    } else {
      clearInterval(intervalo)
    }
  }, 20)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', aoRolar)
  window.removeEventListener('keydown', aoTeclar)
  document.body.style.overflow = ''
})

const linhasTokens = [
  [{ t: '<template>', c: 'purple' }],
  [{ t: '  ' }, { t: '<div', c: 'blue' }, { t: ' ' }, { t: 'class', c: 'green' }, { t: '=' }, { t: '"user-profile"', c: 'orange' }, { t: '>', c: 'blue' }],
  [{ t: '    ' }, { t: '{{', c: 'purple' }, { t: ' user.name ' }, { t: '}}', c: 'purple' }],
  [{ t: '  ' }, { t: '<' + '/div>', c: 'blue' }],
  [{ t: '<' + '/template>', c: 'purple' }],
  [],
  [{ t: '<script', c: 'purple' }, { t: ' ' }, { t: 'setup', c: 'green' }, { t: '>', c: 'purple' }],
  [{ t: '  ' }, { t: 'const', c: 'blue' }, { t: ' user ' }, { t: '=', c: 'purple' }, { t: ' ' }, { t: 'ref', c: 'blue' }, { t: "({ name: " }, { t: "'Gustavo'", c: 'orange' }, { t: ' })' }],
  [{ t: '<' + '/script>', c: 'purple' }],
]

const escMap = { '&': '&amp;', '<': '&lt;', '>': '&gt;' }
function esc(s) {
  return s.replace(/[&<>]/g, ch => escMap[ch])
}

const allChars = linhasTokens.flatMap((linha, i) => {
  const chars = linha.flatMap(({ t, c }) => t.split('').map(ch => ({ ch, c: c || null })))
  if (i < linhasTokens.length - 1) chars.push({ ch: '\n', c: null })
  return chars
})

const totalChars = allChars.length

const displayedHtml = computed(() => {
  const typed = allChars.slice(0, typedCount.value)
  let html = ''
  let i = 0
  while (i < typed.length) {
    const { ch, c } = typed[i]
    if (ch === '\n') { html += '\n'; i++; continue }
    if (!c) { html += esc(ch); i++; continue }
    let group = ''
    while (i < typed.length && typed[i].c === c && typed[i].ch !== '\n') {
      group += typed[i].ch
      i++
    }
    html += `<span class="${c}">${esc(group)}</span>`
  }
  return html
})
</script>

<style scoped lang="sass">
$purple: #c678dd
$green: #98c379
$orange: #d19a66

.header
  width: 100%
  height: 100vh
  min-height: 100vh
  background-attachment: fixed
  overflow: hidden
  color: white
  font-family: sans-serif
  background: linear-gradient(120deg, var(--cor-preto) 0%, var(--cor-azul-escuro) 100%)
  position: relative

.header__transicao
  position: absolute
  bottom: 0
  left: 0
  width: 100%
  height: 180px
  background: linear-gradient(to bottom, transparent, var(--cor-escuro-1))
  pointer-events: none
  z-index: 5

.nav
  position: fixed
  top: 0
  left: 0
  right: 0
  z-index: 100
  display: flex
  justify-content: space-between
  align-items: center
  padding: 28px 148px
  border-radius: 0
  border: 1px solid transparent
  background: transparent
  transition: all 0.3s ease

  &--rolado
    top: 12px
    left: 375px
    right: 375px
    border-radius: 100px
    padding: 16px 40px
    background: rgba(10, 10, 25, 0.85)
    backdrop-filter: blur(16px)
    -webkit-backdrop-filter: blur(16px)
    border: 1px solid rgba(255, 255, 255, 0.08)
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4)

  .logo
    animation: aparecer-cima 0.6s ease both
    :deep(svg)
      width: 35px
      height: 35px
      cursor: pointer

  .opcoes
    animation: aparecer-cima 0.6s 0.15s ease both
    display: flex
    align-items: center
    gap: 33px

    .sociais
      display: flex
      align-items: center
      gap: 33px
      :deep(svg)
        width: 18px
        height: 18px
        cursor: pointer
        transition: 0.3s ease
        &:hover
          opacity: 0.7

    .menu
      display: flex
      align-items: center
      gap: 34px
      .links
        font-size: 16px
        font-weight: 300
        cursor: pointer
        transition: 0.3s ease
        &:hover
          opacity: 0.7

.hamburger
  display: none
  flex-direction: column
  justify-content: center
  gap: 5px
  cursor: pointer
  background: none
  border: none
  padding: 8px
  z-index: 101

  span
    display: block
    width: 24px
    height: 2px
    background: white
    border-radius: 2px
    transition: all 0.3s ease
    transform-origin: center

  &--aberto
    span:nth-child(1)
      transform: translateY(7px) rotate(45deg)

    span:nth-child(2)
      opacity: 0
      transform: scaleX(0)

    span:nth-child(3)
      transform: translateY(-7px) rotate(-45deg)

.menu-mobile
  position: fixed
  inset: 0
  z-index: 99
  background: rgba(5, 5, 15, 0.97)
  backdrop-filter: blur(24px)
  -webkit-backdrop-filter: blur(24px)
  display: flex
  align-items: center
  justify-content: center

  &__conteudo
    display: flex
    flex-direction: column
    align-items: center
    gap: 56px

  &__nav
    display: flex
    flex-direction: column
    align-items: center
    gap: 36px

  &__link
    font-family: var(--semibold)
    font-size: clamp(28px, 8vw, 40px)
    color: var(--cor-branco)
    cursor: pointer
    transition: opacity 0.2s ease
    letter-spacing: -0.5px

    &:hover
      opacity: 0.5

  &__sociais
    display: flex
    align-items: center
    gap: 36px
    :deep(svg)
      width: 26px
      height: 26px
      cursor: pointer
      transition: opacity 0.2s ease
      &:hover
        opacity: 0.6

.fade-menu-enter-active,
.fade-menu-leave-active
  transition: opacity 0.3s ease

.fade-menu-enter-from,
.fade-menu-leave-to
  opacity: 0

.container-conteudo
  width: 100%
  height: 100vh
  display: flex
  align-items: center
  justify-content: space-between
  padding: 100px 148px 0
  gap: 40px

  .esquerda
    flex: 1
    max-width: 650px
    display: flex
    flex-direction: column
    justify-content: center
    align-items: flex-start

    h1
      animation: aparecer 0.7s 0.3s ease both
      margin: 0
      font-size: 55px
      line-height: 1.2
      text-align: left
      color: white
      .nome
        display: block
        margin-top: 15px
        font-weight: 800

    .cargo
      animation: aparecer 0.7s 0.5s ease both
      margin: 38px 0 46px
      font-size: 32px
      font-weight: 300
      line-height: 1
      color: rgba(255, 255, 255, 0.92)

    .btn-projetos
      animation: aparecer 0.7s 0.65s ease both

  .direita
    flex: 1
    display: flex
    justify-content: center
    align-items: center
    position: relative

    .codigo-wrapper
      animation: aparecer-direita 0.8s 0.45s ease both
      position: relative
      width: 100%
      max-width: 550px

      &::before
        content: ''
        position: absolute
        top: 50%
        left: 50%
        transform: translate(-50%, -50%)
        width: 110%
        height: 110%
        background: radial-gradient(ellipse at 40% 60%, var(--cor-azul-forte) 0%, transparent 65%)
        filter: blur(70px)
        opacity: 0.3
        z-index: 0
        pointer-events: none
        border-radius: 50%

      &::after
        content: ''
        position: absolute
        top: 20%
        right: -10%
        width: 50%
        height: 50%
        background: radial-gradient(ellipse at center, var(--cor-azul) 0%, transparent 70%)
        filter: blur(50px)
        opacity: 0.2
        z-index: 0
        pointer-events: none
        border-radius: 50%

      .janela-codigo
        position: relative
        z-index: 1
        background: rgba(10, 10, 20, 0.6)
        backdrop-filter: blur(12px)
        border: 1px solid rgba(255, 255, 255, 0.1)
        border-radius: 20px
        overflow: hidden
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4)

        .aba
          background: rgba(255, 255, 255, 0.05)
          padding: 10px 24px
          font-size: 13px
          color: rgba(255,255,255,0.5)
          border-bottom: 1px solid rgba(255, 255, 255, 0.1)

        .corpo-codigo
          padding: 30px
          font-family: 'Fira Code', monospace
          font-size: 15px
          line-height: 1.7
          pre
            margin: 0
          .cursor
            display: inline-block
            color: var(--cor-azul)
            animation: piscar 0.7s step-end infinite
          :deep(.purple)
            color: $purple
          :deep(.blue)
            color: var(--cor-azul)
          :deep(.green)
            color: $green
          :deep(.orange)
            color: $orange

      .tag
        position: absolute
        padding: 8px 18px
        background: rgba(255, 255, 255, 0.07)
        backdrop-filter: blur(8px)
        border: 1px solid rgba(255, 255, 255, 0.15)
        border-radius: 30px
        font-size: 14px
        font-weight: 500
        z-index: 5
        transition: all 0.3s ease

        &:hover
          background: rgba(255, 255, 255, 0.12)

@keyframes aparecer
  from
    opacity: 0
    transform: translateY(30px)
  to
    opacity: 1
    transform: translateY(0)

@keyframes aparecer-cima
  from
    opacity: 0
    transform: translateY(-20px)
  to
    opacity: 1
    transform: translateY(0)

@keyframes aparecer-direita
  from
    opacity: 0
    transform: translateX(50px)
  to
    opacity: 1
    transform: translateX(0)

@keyframes piscar
  0%, 100%
    opacity: 1
  50%
    opacity: 0

@media (max-width: 1200px)
  .nav
    padding: 28px 60px
  .nav.nav--rolado
    left: 16px
    right: 16px
    padding: 16px 28px
  .container-conteudo
    padding: 100px 60px 0

  .container-conteudo .esquerda h1
    font-size: 48px

@media (max-width: 900px)
  .nav
    padding: 24px 24px
    &--rolado
      left: 12px
      right: 12px
      top: 8px
      padding: 14px 20px

    .opcoes
      display: none

  .hamburger
    display: flex

  .container-conteudo
    flex-direction: column
    text-align: center
    padding: 40px 30px

    .esquerda
      align-items: center
      h1
        text-align: center

    .direita
      display: none

@media (max-width: 600px)
  .container-conteudo .esquerda h1
    font-size: 38px

  .container-conteudo .esquerda .btn-projetos
    width: 100%
</style>
