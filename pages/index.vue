<template>
  <div id="tela">
    <SectionHero/>
    <SectionSkills/>
    <SectionSociais/>
    <SectionProjetos/>
    <SectionSobreMim/>
    <Footer/>
  </div>
</template>

<script setup>
import Footer from '../components/pages/index/Footer.vue';
import SectionHero from '../components/pages/index/SectionHero.vue';
import SectionProjetos from '../components/pages/index/SectionProjetos.vue';
import SectionSkills from '../components/pages/index/SectionSkills.vue';
import SectionSobreMim from '../components/pages/index/SectionSobreMim.vue';
import SectionSociais from '../components/pages/index/SectionSociais.vue';

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
