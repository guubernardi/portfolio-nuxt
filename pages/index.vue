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
import {
  SITE_URL,
  SITE_NOME,
  OG_IMAGE,
  SERVICOS,
  ID_ORGANIZACAO,
  ID_SITE
} from '~/helpers/site'

definePageMeta({
  layout: 'web'
})

// title curto de propósito: o titleTemplate do app.vue já acrescenta a marca, e
// o conjunto precisa caber nos ~60 caracteres que o Google mostra
const TITULO = 'Criação de Sites, E-commerce e Sistemas'

const DESCRICAO =
  'Criação de sites, e-commerces e sistemas sob medida, escritos do zero e sem template. Do protótipo ao deploy, com prazo combinado. Peça seu orçamento.'

useHead({
  title: TITULO,
  meta: [
    { name: 'description', content: DESCRICAO },
    { property: 'og:title', content: `${TITULO} | ${SITE_NOME}` },
    { property: 'og:description', content: DESCRICAO },
    { name: 'twitter:title', content: `${TITULO} | ${SITE_NOME}` },
    { name: 'twitter:description', content: DESCRICAO }
  ],

  // O catálogo transforma as seis caixinhas da SectionServicos em oferta legível
  // por máquina. É o que responde "ele faz e-commerce?" sem depender do texto.
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebPage',
            '@id': `${SITE_URL}/#pagina`,
            url: `${SITE_URL}/`,
            name: `${TITULO} | ${SITE_NOME}`,
            description: DESCRICAO,
            inLanguage: 'pt-BR',
            isPartOf: { '@id': ID_SITE },
            about: { '@id': ID_ORGANIZACAO },
            primaryImageOfPage: { '@type': 'ImageObject', url: OG_IMAGE }
          },
          {
            '@type': 'OfferCatalog',
            '@id': `${SITE_URL}/#servicos`,
            name: 'Serviços de desenvolvimento web',
            provider: { '@id': ID_ORGANIZACAO },
            itemListElement: SERVICOS.map((servico, i) => ({
              '@type': 'Offer',
              position: i + 1,
              itemOffered: {
                '@type': 'Service',
                name: servico.nome,
                description: servico.descricao,
                serviceType: servico.nome,
                provider: { '@id': ID_ORGANIZACAO },
                areaServed: { '@type': 'Country', name: 'Brasil' }
              }
            }))
          }
        ]
      })
    }
  ]
})
</script>
