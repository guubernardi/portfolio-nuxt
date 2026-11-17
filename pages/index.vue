<template>
  <div id="tela">
    <HomeHero />
    <HomeFaixa />
    <HomeQuemFaz />
    <HomeServicos />
    <DivisorArco :topo="GELO" :base="ABISMO" />
    <HomeProjetos />
    <DivisorArco :topo="ABISMO" :base="MARINHO" />
    <HomeProcesso />
    <DivisorArco :topo="MARINHO" :base="GELO" />
    <HomeDepoimentos />
    <HomeFaq />
    <DivisorArco :topo="GELO" :base="MARINHO" />
    <HomeChamada />
    <DivisorArco :topo="MARINHO" :base="ABISMO" />
    <HomeRodape />
  </div>
</template>

<script setup>
// Home V2 (Figma "Home V2 · paleta Insta"): as seções moram em components/pages/home
import HomeHero from '../components/pages/home/HomeHero.vue'
import HomeFaixa from '../components/pages/home/HomeFaixa.vue'
import HomeQuemFaz from '../components/pages/home/HomeQuemFaz.vue'
import HomeServicos from '../components/pages/home/HomeServicos.vue'
import HomeProjetos from '../components/pages/home/HomeProjetos.vue'
import HomeProcesso from '../components/pages/home/HomeProcesso.vue'
import HomeDepoimentos from '../components/pages/home/HomeDepoimentos.vue'
import HomeFaq from '../components/pages/home/HomeFaq.vue'
import HomeChamada from '../components/pages/home/HomeChamada.vue'
import HomeRodape from '../components/pages/home/HomeRodape.vue'
import DivisorArco from '../components/global/elementos/DivisorArco.vue'
import {
  SITE_URL,
  SITE_NOME,
  OG_IMAGE,
  SERVICOS,
  ID_ORGANIZACAO,
  ID_SITE
} from '~/helpers/site'

// cores das emendas entre seções (mesmos valores dos tokens da paleta)
const GELO = '#F3F7F9'
const ABISMO = '#020715'
const MARINHO = '#021228'

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
