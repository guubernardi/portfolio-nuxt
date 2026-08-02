<template>
  <!-- Preloader desativado: custava ~2,6s antes da entrada do hero começar, e o
       próprio hero já é a revelação da página. O componente segue em
       components/global/PreLoader.vue caso queira voltar. -->

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useHead, useRoute } from '#imports'

const SITE_URL = 'https://gustavobernardi.com'
const OG_IMAGE = '/favicons/share.png' 

useHead({
  htmlAttrs: { lang: 'pt-BR' },

  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },

    {
      name: 'description',
      content:
        'Portfólio de Gustavo Bernardi — Desenvolvedor Web. Projetos, skills e contato.'
    },
    { name: 'author', content: 'Gustavo Bernardi' },
    { name: 'robots', content: 'index, follow' },

    { name: 'theme-color', content: '#050505' },

    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'pt_BR' },
    { property: 'og:site_name', content: 'Gustavo Bernardi' },
    { property: 'og:title', content: 'Gustavo Bernardi | Desenvolvedor Web' },
    {
      property: 'og:description',
      content:
        'Portfólio de Gustavo Bernardi — Projetos, skills e contato.'
    },
    { property: 'og:url', content: SITE_URL },
    { property: 'og:image', content: OG_IMAGE },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Gustavo Bernardi | Desenvolvedor Web' },
    {
      name: 'twitter:description',
      content:
        'Portfólio de Gustavo Bernardi — Projetos, skills e contato.'
    },
    { name: 'twitter:image', content: OG_IMAGE }
  ],

  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicons/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicons/favicon-16x16.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-touch-icon.png' },
    { rel: 'manifest', href: '/site.webmanifest' }
  ]
})

const route = useRoute()

onMounted(() => {
  watch(
    () => route.fullPath,
    () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
    }
  )
})
</script>
