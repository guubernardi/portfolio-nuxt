import { fileURLToPath } from 'node:url'
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: true,
  debug: true,
  css: ['~/assets/css/index.sass'],
  // pasta dos SVGs da @edusites/icons, um arquivo por ícone. O "exports" da lib
  // só libera o pacote inteiro; o helpers/icones.js importa daqui só os usados
  alias: {
    '#edusites-icones': fileURLToPath(new URL('./node_modules/@edusites/icons/src/icones', import.meta.url))
  },
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
  // grafia alternativa do briefing da Nuárr: quem digitar o link de memória cai no lugar certo
  routeRules: {
    '/quiz-clinica-naur': { redirect: { to: '/quiz-clinica-nuarr', statusCode: 301 } }
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
  compatibilityDate: '2025-04-03'
})
