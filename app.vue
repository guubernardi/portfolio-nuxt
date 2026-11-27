<template>
  <!-- Preloader desativado: custava ~2,6s antes da entrada do hero começar, e o
       próprio hero já é a revelação da página. O componente segue em
       components/global/PreLoader.vue caso queira voltar. -->

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useHead, useRoute } from '#imports'
import {
  SITE_URL,
  SITE_NOME,
  SITE_CARGO,
  OG_IMAGE,
  OG_IMAGE_LARGURA,
  OG_IMAGE_ALTURA,
  OG_IMAGE_ALT,
  TELEFONE,
  EMAIL,
  PERFIS,
  ID_ORGANIZACAO,
  ID_SITE,
  ID_PESSOA,
  urlCanonica
} from '~/helpers/site'

const route = useRoute()

// canônica por página: sem ela, gustavobernardi.com, www.gustavobernardi.com e
// qualquer /?utm=... entram no índice como páginas diferentes disputando entre si
const canonica = computed(() => urlCanonica(route.path))

// Preload só das fontes que a página desenha logo de cara. As páginas V2 usam a
// Figtree variável (é dela o título do topo, o LCP da home) e a semibold, que
// está no menu do celular e é a reserva da variável na pilha --figtree. As que
// ainda estão no visual antigo (currículo e quiz) marcam fontesAntigas no
// definePageMeta e usam a light e a semibold, sem a variável. Antes as três iam
// em toda página: a light só aparece no menu do celular das V2, e o WebKit
// avisava que ela e a semibold vinham no preload sem uso a tempo.
const FONTE_VARIAVEL = '/fonts/figtree-variavel-latin.woff2'
const FONTE_SEMIBOLD = '/fonts/figtree-semibold.woff2'
const FONTE_LIGHT = '/fonts/figtree-light.woff2'

useHead({
  link: computed(() => {
    const fontes = route.meta.fontesAntigas
      ? [FONTE_LIGHT, FONTE_SEMIBOLD]
      : [FONTE_VARIAVEL, FONTE_SEMIBOLD]
    return fontes.map((href) => ({ rel: 'preload', as: 'font', type: 'font/woff2', href, crossorigin: 'anonymous' }))
  })
})

const DESCRICAO =
  'Sites, e-commerces e sistemas sob medida, escritos do zero e sem template. Do protótipo ao deploy, com performance real e prazo combinado.'

useHead({
  htmlAttrs: { lang: 'pt-BR' },

  // .revelar esconde o conteúdo esperando o observer do plugins/revelar.js. Sem
  // JS esse observer nunca roda, então aqui as seções voltam a ficar de pé
  noscript: [
    { children: '<style>.revelar{opacity:1!important;transform:none!important}</style>' },
  ],

  // páginas passam só o próprio assunto; a marca entra aqui uma vez só
  titleTemplate: (titulo) =>
    titulo ? `${titulo} | ${SITE_NOME}` : `${SITE_NOME} | ${SITE_CARGO}`,

  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },

    { name: 'description', content: DESCRICAO },
    { name: 'author', content: SITE_NOME },
    { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1' },

    { name: 'theme-color', content: '#050505' },

    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'pt_BR' },
    { property: 'og:site_name', content: SITE_NOME },
    { property: 'og:title', content: `${SITE_NOME} | ${SITE_CARGO}` },
    { property: 'og:description', content: DESCRICAO },
    { property: 'og:url', content: canonica },
    { property: 'og:image', content: OG_IMAGE },
    { property: 'og:image:width', content: String(OG_IMAGE_LARGURA) },
    { property: 'og:image:height', content: String(OG_IMAGE_ALTURA) },
    { property: 'og:image:alt', content: OG_IMAGE_ALT },

    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: `${SITE_NOME} | ${SITE_CARGO}` },
    { name: 'twitter:description', content: DESCRICAO },
    { name: 'twitter:image', content: OG_IMAGE },
    { name: 'twitter:image:alt', content: OG_IMAGE_ALT }
  ],

  link: [
    { rel: 'canonical', href: canonica },

    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicons/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicons/favicon-16x16.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-touch-icon.png' },
    { rel: 'manifest', href: '/site.webmanifest' }
  ],

  // Grafo do negócio, com @id estável para as páginas referenciarem. É o que faz
  // o Google entender "estúdio que presta serviço" em vez de "página de currículo",
  // e é a fonte que ChatGPT e Perplexity leem para citar contato e serviços.
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': ID_ORGANIZACAO,
            name: SITE_NOME,
            alternateName: `${SITE_NOME} — ${SITE_CARGO}`,
            description: DESCRICAO,
            url: `${SITE_URL}/`,
            email: EMAIL,
            telephone: TELEFONE,
            logo: {
              '@type': 'ImageObject',
              url: `${SITE_URL}/favicons/android-chrome-512x512.png`,
              width: 512,
              height: 512
            },
            image: OG_IMAGE,
            founder: { '@id': ID_PESSOA },
            knowsLanguage: 'pt-BR',
            areaServed: { '@type': 'Country', name: 'Brasil' },
            contactPoint: [
              {
                '@type': 'ContactPoint',
                contactType: 'sales',
                telephone: TELEFONE,
                email: EMAIL,
                availableLanguage: ['Portuguese'],
                areaServed: 'BR'
              }
            ],
            sameAs: PERFIS
          },
          {
            '@type': 'Person',
            '@id': ID_PESSOA,
            name: SITE_NOME,
            url: `${SITE_URL}/`,
            jobTitle: 'Desenvolvedor web',
            worksFor: { '@id': ID_ORGANIZACAO },
            knowsAbout: [
              'Desenvolvimento web',
              'Vue.js',
              'Nuxt',
              'JavaScript',
              'E-commerce',
              'UI/UX'
            ],
            sameAs: PERFIS
          },
          {
            '@type': 'WebSite',
            '@id': ID_SITE,
            url: `${SITE_URL}/`,
            name: SITE_NOME,
            description: DESCRICAO,
            inLanguage: 'pt-BR',
            publisher: { '@id': ID_ORGANIZACAO }
          }
        ]
      })
    }
  ]
})

onMounted(() => {
  watch(
    () => route.fullPath,
    () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
    }
  )
})
</script>
