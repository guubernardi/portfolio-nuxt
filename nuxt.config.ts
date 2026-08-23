import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: true,
  debug: true,
  css: ['~/assets/css/index.sass'],
  components: {
    dirs: ['~/components/global', '~/components/pages']
  },
  experimental: {
    payloadExtraction: false,
    viewTransition: true
  },
  features: {
    inlineStyles: true
  },
  modules: ['@pinia/nuxt', '@nuxt/image'],
  image: {
    quality: 80,
    format: ['webp', 'avif', 'png', 'jpg'],
    densities: [1, 2]
  },
  nitro: {
    compressPublicAssets: true,
    minify: true,
    storage: {
      memory: {
        driver: 'memory'
      }
    }
  },
  build: {
    optimization: {
      splitChunks: {
        layouts: true,
        pages: true,
        commons: true
      }
    }
  },
  // A lib de icones tem 1088 icones e o build gera um chunk por icone. O Nuxt
  // entao emitia 1092 <link rel="prefetch"> no HTML, e o navegador baixava
  // 2,17 MB de chunks que a pagina nao usa, disputando banda com a fonte e o JS
  // no celular. Zerar dynamicImports remove so os hints: os chunks continuam
  // carregando sob demanda de quem realmente precisa deles.
  hooks: {
    'build:manifest'(manifest) {
      for (const chave in manifest) {
        manifest[chave].dynamicImports = []
      }
    }
  },
  compatibilityDate: '2025-04-03'
})
