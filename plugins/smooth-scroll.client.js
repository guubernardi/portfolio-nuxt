import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin)

export default defineNuxtPlugin(() => {
  // Celular e tablet ficam com a rolagem nativa. O ScrollSmoother move a página
  // inteira como um bloco só, via transform: no iPhone isso vira uma camada de
  // GPU com a altura da página toda (11 mil px na home, x3 de densidade), e
  // junto com os brilhos e vidros do resto da página a aba estourava a memória
  // do Safari ("Um problema ocorreu repetidamente"). No toque, a suavização
  // quase não se nota mesmo, e o useScrollTo já cai no gsap quando não há smoother.
  // isTouch === 1 é aparelho só de toque; notebook com tela de toque (2) mantém.
  if (ScrollTrigger.isTouch === 1) return

  ScrollSmoother.create({
    wrapper: '#smooth-wrapper',
    content: '#smooth-content',
    smooth: 1.5,
    effects: true,
  })
})
