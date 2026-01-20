<template>
  <nav :class="{ aberto: state.menu }">
    <img src="/images/logo-linha.svg" class="logo" alt="logo" />

    <div class="opcoes">
      <a role="button" tabindex="0" @click="scrollParaSection('.hero')">Inicio</a>
      <a role="button" tabindex="0" @click="scrollParaSection('.skills')">Skills</a>
      <a role="button" tabindex="0" @click="scrollParaSection('.social')">Sociais</a>
      <a role="button" tabindex="0" @click="scrollParaSection('.projetos')">Projetos</a>
      <a role="button" tabindex="0" @click="scrollParaSection('.sobre')">Sobre mim</a>
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
  
  const router = useRouter()
  const route = useRoute()
  
  const state = reactive({
    menu: false
  })
  
  function acharElemento(seletor, hash) {
    const porId = hash ? document.querySelector(hash) : null
    if (porId) return porId
  
    const porClasse = seletor ? document.querySelector(seletor) : null
    if (porClasse) return porClasse
  
    if (hash) {
      const cls = '.' + hash.replace('#', '')
      return document.querySelector(cls)
    }
  
    return null
  }
  
  function scrollAgora(seletor, hash) {
    const el = acharElemento(seletor, hash)
    if (!el) return
  
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    state.menu = false
  }
  
  async function scrollParaSection(seletor) {
    const hash = seletor?.startsWith('.') ? `#${seletor.slice(1)}` : seletor
  
    if (route.path === '/') {
      await nextTick()
      scrollAgora(seletor, hash)
      return
    }

    state.menu = false
    await router.push({ path: '/', hash })
  }
</script>  

<style scoped lang="sass">
nav
  display: flex
  align-items: center
  justify-content: space-between
  width: calc(100% - 60px)
  max-width: 1520px
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
      height: 310px

    img.logo
      width: 160px
      margin: 5px 0 0 0

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
