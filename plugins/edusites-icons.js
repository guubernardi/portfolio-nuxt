import { instalarIcones } from '@edusites/icons/nuxt'

// registra <SvgIcone> globalmente: sem import em cada componente
export default defineNuxtPlugin((nuxtApp) => {
  instalarIcones(nuxtApp)
})
