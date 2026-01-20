<template>
  <!-- Preloader aparece só no primeiro load (fica montado no app todo) -->
  <PreLoader nome="GUSTAVO BERNARDI" cargo="DESENVOLVEDOR WEB" />

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
    { rel: 'icon', type: 'image/jpeg', href: '/images/logo.png' },

    { rel: 'apple-touch-icon', href: '/favicons/apple-touch-icon.png' }
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
