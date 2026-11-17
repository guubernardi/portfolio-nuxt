import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

// Só registra os plugins. O ScrollSmoother em si é criado e destruído pelo
// layouts/web.vue, o único que tem o #smooth-wrapper: criado aqui, ele nascia
// também nas páginas sem layout, e sem achar o wrapper o GSAP montava um
// invólucro próprio em volta do <body> (o que tirava o menu teleportado do
// lugar e dava hidratação divergente em /projetos, nos cases e nos serviços).
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin)

export default defineNuxtPlugin(() => {})
