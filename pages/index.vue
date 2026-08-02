<template>
  <div id="tela">
    <SectionHero/>
    <DivisorCurva corTopo="var(--cor-escuro-1)" cor="#000000" />
    <SectionServicos/>
    <SectionProcesso/>
    <DivisorCurva corTopo="#010912" cor="#010912" />
    <SectionProjetos/>
    <DivisorCurva corTopo="#061c3e" cor="#051a39" />
    <SectionDiferenciais/>
    <SectionFaq/>
    <SectionContato/>
    <SectionFooter/>
  </div>
</template>

<script setup>
import SectionHero from '../components/pages/index/SectionHero.vue';
import SectionServicos from '../components/pages/index/SectionServicos.vue'
import SectionProcesso from '../components/pages/index/SectionProcesso.vue'
import SectionProjetos from '../components/pages/index/SectionProjetos.vue'
import SectionDiferenciais from '../components/pages/index/SectionDiferenciais.vue'
import SectionFaq from '../components/pages/index/SectionFaq.vue'
import SectionContato from '../components/pages/index/SectionContato.vue'
import SectionFooter from '../components/pages/index/SectionFooter.vue'
import DivisorCurva from '../components/global/elementos/DivisorCurva.vue'
definePageMeta({
  layout: 'web'
})

useHead({
  title: 'Gustavo Bernardi - Agencia de desenvolvimento web',
  meta: [
    { name: 'description', content: 'Agencia de desenvolvimento web' },
    { property: 'og:title', content: 'Agencia de desenvolvimento web' },
    { property: 'og:description', content: 'Agencia de desenvolvimento web' }
  ]
})
</script>
