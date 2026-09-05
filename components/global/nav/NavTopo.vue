<template>
  <Teleport to="body">
    <nav class="nav" :class="{ 'nav--rolado': rolado }">
      <a class="nav__logo" href="/" aria-label="Ir para o início" @click="aoClicar($event, 'inicio')">
        <Svgs nome="logo" />
      </a>

      <div class="nav__menu">
        <a
          v-for="link in links"
          :key="link.id"
          class="nav__link"
          :href="`/#${link.id}`"
          @click="aoClicar($event, link.id)"
        >
          <SvgIcone :nome="link.icone" />
          {{ link.rotulo }}
        </a>
      </div>

      <a class="nav__cta" :href="linkWhatsapp" target="_blank" rel="noopener">
        Solicitar orçamento
      </a>

      <button
        class="hamburger"
        :class="{ 'hamburger--aberto': menuAberto }"
        @click="toggleMenu"
        aria-label="Abrir menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>

    <Transition name="fade-menu">
      <div v-if="menuAberto" class="menu-mobile" @click.self="fecharMenu">
        <div class="menu-mobile__conteudo">
          <nav class="menu-mobile__nav">
            <a
              v-for="link in links"
              :key="link.id"
              class="menu-mobile__link"
              :href="`/#${link.id}`"
              @click="aoClicar($event, link.id)"
            >
              <SvgIcone :nome="link.icone" />
              {{ link.rotulo }}
            </a>
          </nav>

          <a
            class="menu-mobile__cta"
            :href="linkWhatsapp"
            target="_blank"
            rel="noopener"
            @click="fecharMenu"
          >
            Solicitar orçamento
          </a>

          <a
            class="menu-mobile__insta"
            href="https://www.instagram.com/devbygusta/"
            target="_blank"
            rel="noopener"
            @click="fecharMenu"
          >
            <SvgIcone nome="instagram" />
            @devbygusta
          </a>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Svgs from '~/components/global/svgs/Svgs.vue'
import { useScrollTo } from '~/composables/useScrollTo'
import { TELEFONE } from '~/helpers/site'

// na home os itens rolam a página; em qualquer outra rota viram link para
// /#secao, senão o menu apontaria para seções que não existem ali
const route = useRoute()
const naHome = computed(() => route.path === '/')

const linkWhatsapp =
  `https://wa.me/${TELEFONE.replace('+', '')}?text=` +
  encodeURIComponent('Olá! Vim pelo site e gostaria de um orçamento para um projeto.')

const links = [
  { id: 'inicio', rotulo: 'Início', icone: 'casa' },
  { id: 'servicos', rotulo: 'Serviços', icone: 'engrenagem' },
  { id: 'projetos', rotulo: 'Projetos', icone: 'projetos' },
  { id: 'contato', rotulo: 'Contatos', icone: 'telefone' },
]

const { scrollTo: gsapScrollTo } = useScrollTo()

const rolado = ref(false)
const menuAberto = ref(false)
let scrollTriggerInstance = null

// sempre <a href="/#secao">: fora da home o navegador navega normal, e na home
// interceptamos para rolar suave em vez de dar salto
function aoClicar(evento, id) {
  fecharMenu()
  if (!naHome.value) return
  evento.preventDefault()
  gsapScrollTo(`#${id}`)
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
  scrollTriggerInstance = ScrollTrigger.create({
    start: 80,
    onEnter: () => { rolado.value = true },
    onLeaveBack: () => { rolado.value = false },
  })
  window.addEventListener('keydown', aoTeclar)
})

onBeforeUnmount(() => {
  scrollTriggerInstance?.kill()
  window.removeEventListener('keydown', aoTeclar)
  document.body.style.overflow = ''
})
</script>

<style scoped lang="sass">
.nav
  position: fixed
  // a folga da barra flutuante mora aqui: o transform só desloca a partir dela
  top: 10px
  left: 0
  right: 0
  z-index: 100
  // grid 1fr auto 1fr centraliza o menu de verdade: com space-between ele ficava
  // deslocado, porque logo e CTA têm larguras bem diferentes
  display: grid
  grid-template-columns: 1fr auto 1fr
  align-items: center
  gap: 24px
  width: 100%
  max-width: 1600px
  margin: 0 auto
  padding: 14px 0px
  color: var(--cor-branco)
  // a geometria fica constante e só o transform anima. animar top/padding/max-width
  // forçava reflow a cada quadro e re-rasterizava os backdrop-filter de dentro —
  // e max-width partia de `none`, que nem interpola: saltava
  transform: translateY(14px)
  transition: transform 0.4s ease
  will-change: transform

  // a barra em si não tem fundo: quem carrega o vidro é o pill do menu e o CTA
  &--rolado
    transform: translateY(0)

  &__logo
    display: flex
    justify-self: start
    cursor: pointer

    :deep(svg)
      width: 34px
      height: 34px

  &__menu
    display: flex
    justify-self: center
    align-items: center
    gap: 6px
    padding: 12px 22px
    border: 1px solid rgba(125, 155, 255, 0.18)
    border-radius: 16px
    background: rgba(30, 46, 115, 0.4)
    backdrop-filter: blur(12px)
    -webkit-backdrop-filter: blur(12px)

  &__link
    display: inline-flex
    align-items: center
    gap: 9px
    padding: 11px 18px
    border-radius: 10px
    font-family: var(--light)
    font-size: 15px
    color: rgba(255, 255, 255, 0.8)
    cursor: pointer
    transition: background 0.4s ease, color 0.4s ease

    // o ícone herda color do link, então acompanha o hover sozinho
    :deep(svg)
      width: 15px
      height: 15px
      flex-shrink: 0
      opacity: 0.75
      transition: opacity 0.4s ease

    &:hover
      background: rgba(125, 155, 255, 0.16)
      color: var(--cor-branco)

      :deep(svg)
        opacity: 1

  &__cta
    grid-column: 3
    justify-self: end
    padding: 13px 26px
    border: 1px solid rgba(140, 165, 255, 0.28)
    border-radius: 12px
    font-family: var(--semibold)
    font-size: 14px
    color: var(--cor-branco)
    text-decoration: none
    white-space: nowrap
    background: rgba(40, 55, 150, 0.45)
    backdrop-filter: blur(14px)
    -webkit-backdrop-filter: blur(14px)
    // hover mexe só no fundo: sem sombra
    transition: background 0.4s ease

    &:hover
      background: rgba(58, 74, 190, 0.6)

.hamburger
  display: none
  grid-column: 3
  justify-self: end
  flex-direction: column
  justify-content: center
  gap: 5px
  padding: 8px
  background: none
  border: none
  cursor: pointer
  z-index: 101

  span
    display: block
    width: 24px
    height: 2px
    border-radius: 2px
    background: var(--cor-branco)
    transform-origin: center
    transition: all 0.3s ease

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
  display: flex
  align-items: center
  justify-content: center
  background: rgba(2, 8, 18, 0.97)
  backdrop-filter: blur(24px)
  -webkit-backdrop-filter: blur(24px)

  &__conteudo
    display: flex
    flex-direction: column
    align-items: center
    gap: 48px

  &__nav
    display: flex
    flex-direction: column
    align-items: center
    gap: 32px

  &__link
    display: inline-flex
    align-items: center
    gap: 14px
    font-family: var(--semibold)
    font-size: clamp(28px, 8vw, 40px)
    letter-spacing: -0.5px
    color: var(--cor-branco)
    cursor: pointer
    transition: opacity 0.2s ease

    :deep(svg)
      width: 0.62em
      height: 0.62em
      opacity: 0.55

    &:hover
      opacity: 0.5

  &__cta
    padding: 16px 34px
    border-radius: 12px
    font-family: var(--semibold)
    font-size: 15px
    color: var(--cor-branco)
    text-decoration: none
    background: linear-gradient(120deg, var(--cor-azul-forte) 0%, var(--cor-azul-claro) 100%)
    box-shadow: 0 10px 30px rgba(25, 15, 163, 0.4)

  &__insta
    display: inline-flex
    align-items: center
    gap: 11px
    font-family: var(--light)
    font-size: 16px
    color: rgba(255, 255, 255, 0.55)
    text-decoration: none
    transition: color 0.4s ease

    &:hover
      color: var(--cor-branco)

    :deep(svg)
      display: block
      width: 19px
      height: 19px
      flex-shrink: 0

.fade-menu-enter-active,
.fade-menu-leave-active
  transition: opacity 0.3s ease

.fade-menu-enter-from,
.fade-menu-leave-to
  opacity: 0

@media (max-width: 1100px)
  .nav
    padding: 12px 16px

  .nav__link
    padding: 9px 14px
    font-size: 14px

@media (max-width: 900px)
  .nav
    padding: 12px 14px
    transform: translateY(10px)

    &--rolado
      transform: translateY(0)

  .nav__menu,
  .nav__cta
    display: none

  .hamburger
    display: flex

// entrada da barra em CSS, como o resto do hero: nao depende do bundle carregar
@media (prefers-reduced-motion: no-preference)
  .nav__logo,
  .nav__menu,
  .nav__cta
    opacity: 0
    animation: navDesce 0.6s cubic-bezier(0.33, 1, 0.68, 1) both

  .nav__logo
    animation-delay: 0.35s

  .nav__menu
    animation-delay: 0.43s

  .nav__cta
    animation-delay: 0.51s

@keyframes navDesce
  from
    opacity: 0
    transform: translateY(-18px)
  to
    opacity: 1
    transform: translateY(0)
</style>
