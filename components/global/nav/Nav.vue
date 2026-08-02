<template>
  <nav :class="{ aberto: state.menu }">
    <a role="button" tabindex="0" class="logo-link" @click="scrollParaSection('.hero')">
      <img src="/images/logo-linha.svg" class="logo" alt="logo" />
    </a>

    <div class="opcoes">
      <a role="button" tabindex="0" @click="scrollParaSection('.hero')">Inicio</a>
      <a role="button" tabindex="0" @click="scrollParaSection('.skills')">Skills</a>
      <a role="button" tabindex="0" @click="scrollParaSection('.social')">Sociais</a>
      <a role="button" tabindex="0" @click="scrollParaSection('.projetos')">Projetos</a>
      <a role="button" tabindex="0" @click="scrollParaSection('.sobre')">Sobre mim</a>
    </div>

    <div class="sociais">
      <a href="https://linkedin.com/in/gubernardi" target="_blank" aria-label="LinkedIn">
        <img src="/images/linkedin.svg" alt="LinkedIn" />
      </a>
      <a href="https://github.com/guubernardi" target="_blank" aria-label="GitHub">
        <img src="/images/github.svg" alt="GitHub" />
      </a>
      <a href="https://wa.me/5511977912709" target="_blank" aria-label="WhatsApp">
        <img src="/images/whatsapp.svg" alt="WhatsApp" />
      </a>
      <a href="mailto:gubernardi@hotmail.com?" target="_blank" aria-label="Email">
        <img src="/images/email.svg" alt="Email" />
      </a>
    </div>

    <button class="menu" type="button" @click="state.menu = !state.menu" :class="{ aberto: state.menu }">
      <span class="um"></span>
      <span class="dois"></span>
    </button>
  </nav>
</template>

<script setup>
  import { reactive, nextTick } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useScrollTo } from '~/composables/useScrollTo'

  const router = useRouter()
  const route = useRoute()
  const { scrollTo } = useScrollTo()

  const state = reactive({
    menu: false
  })

  async function scrollParaSection(seletor) {
    if (route.path === '/') {
      await nextTick()
      scrollTo(seletor)
      state.menu = false
      return
    }

    state.menu = false
    const hash = seletor?.startsWith('.') ? `#${seletor.slice(1)}` : seletor
    await router.push({ path: '/', hash })
  }
</script>  

<style scoped lang="sass">
nav
  display: flex
  align-items: center
  justify-content: space-between
  width: calc(100% - 120px)
  max-width: 1720px
  position: fixed
  top: 20px
  left: 50%
  transform: translateX(-50%)
  height: 70px
  border-radius: 100px
  padding: 0 15px 0 35px
  background-color: var(--cor-escuro-3-transparente)
  backdrop-filter: blur(15px)
  z-index: 10

  .logo-link
    cursor: pointer
    line-height: 0

  img.logo
    width: 240px
    height: auto

  .opcoes
    display: flex
    align-items: center
    gap: 30px

    a
      font-size: var(--f1)
      font-family: var(--light)
      color: white
      border-right: 1px solid var(--cor-escuro-5)
      padding: 0 30px 0 0
      transition: color 0.3s, transform 0.3s
      cursor: pointer
      user-select: none

      &:last-child
        border-right: none
        padding: 0

      &:hover
        color: #FFB12B

  .sociais
    display: flex
    align-items: center
    gap: 16px
    padding: 0 0 0 30px
    border-left: 1px solid var(--cor-escuro-5)

    a
      display: flex
      align-items: center
      justify-content: center
      opacity: 0.75
      transition: opacity 0.3s, transform 0.3s

      &:hover
        opacity: 1
        transform: scale(1.15)

    img
      width: 22px
      height: 22px
      object-fit: contain

@media screen and (max-width: 1000px)
  nav
    align-items: flex-start
    width: calc(100% - 60px)
    top: 20px
    left: 30px
    height: 60px
    border-radius: 30px
    padding: 15px 30px 0 30px
    transform: translateX(0)
    overflow: hidden
    transition: all 0.3s

    &.aberto
      height: 380px

    .logo-link
      margin: 5px 0 0 0

    img.logo
      width: 160px

    .opcoes
      display: flex
      flex-direction: column
      align-items: flex-start
      gap: 0
      position: absolute
      top: 50px

      a
        font-size: var(--f2)
        border-right: none
        padding: 12px 0

      &::last-child
        border-right: none
        padding: 15px 0

    .sociais
      display: flex
      position: absolute
      top: 330px
      left: 30px
      padding: 0
      border-left: none
      gap: 20px

      img
        width: 26px
        height: 26px

    button.menu
      display: flex
      align-items: center
      justify-content: center
      width: 30px
      height: 30px
      position: relative
      background-color: transparent

      &.aberto
        span
          background-color: var(--cor-vermelho)

          &.um
            transform: rotate(45deg)
            top: 13px

          &.dois
            transform: rotate(-45deg)
            width: 30px
            bottom: 13px

      span
        height: 3px
        border-radius: 20px
        background-color: var(--cor-branco)
        right: 0
        position: absolute
        transition: all 0.3s

        &.um
          width: 30px
          top: 7px

        &.dois
          width: 20px
          bottom: 7px
</style>
