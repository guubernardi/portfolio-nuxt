<template>
  <div id="tela">
    <PreLoader nome="GUSTAVO BERNARDI" cargo="DESENVOLVEDOR WEB" />
    <Nav />
    <slot />
  </div>
</template>

<script setup>
import Nav from '../components/global/nav/Nav.vue'
import PreLoader from '../components/pages/index/PreLoader.vue'
</script>

<style lang="sass" scoped>
#tela
  min-height: 100vh
  width: 100%

main
  display: flex
  flex-direction: column
  align-items: flex-start
  justify-content: flex-start
  width: 100%
  max-width: 1920px
  margin: 0 auto

@media screen and (max-width: 1000px)
</style>
