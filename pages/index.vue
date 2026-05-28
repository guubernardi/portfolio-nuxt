<template>
  <div id="tela">
    <SectionHero/>
    <SectionSobre/>
    <SectionProjetos/>
    <SectionFooter/>
  </div>
</template>

<script setup>
import SectionHero from '../components/pages/index/SectionHero.vue';
import SectionSobre from '../components/pages/index/SectionSobre.vue'
import SectionProjetos from '../components/pages/index/SectionProjetos.vue'
import SectionFooter from '../components/pages/index/SectionFooter.vue'
definePageMeta({
  layout: 'web'
})

useHead({
  title: 'Gustavo Bernardi - FrontEnd',
  meta: [
    { name: 'description', content: 'Desenvolvedor FrontEnd' },
    { property: 'og:title', content: 'Portifolio Gustavo Bernardi' },
    { property: 'og:description', content: 'Portifolio Gustavo Bernardi' }
  ]
})
</script>
