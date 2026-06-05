import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

gsap.registerPlugin(ScrollToPlugin)

export function useScrollTo() {
  function scrollTo(seletor) {
    const el = typeof seletor === 'string' ? document.querySelector(seletor) : seletor
    if (!el) return

    const smoother = ScrollSmoother.get()
    if (smoother) {
      smoother.scrollTo(el, true)
      return
    }

    gsap.to(window, {
      scrollTo: { y: el },
      duration: 1.0,
      ease: 'power3.inOut',
      overwrite: true,
    })
  }

  return { scrollTo }
}
