<template>
  <div id="tela">
    
    <slot />
  </div>
</template>

<script setup>
import Nav from '../components/global/nav/Nav.vue'
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
