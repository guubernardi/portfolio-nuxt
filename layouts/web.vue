<template>
  <div id="smooth-wrapper">
    <div id="smooth-content">
      <slot />
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="sass" scoped>
#smooth-wrapper
  overflow: hidden
  width: 100%

#smooth-content
  width: 100%
</style>
