import { onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Condições de mídia das animações da Home V2.
//   movimento: quem não pediu "reduzir movimento" no sistema. Sem isso, nada anima
//              e a página aparece pronta, como veio do servidor.
//   mesa:      computador com mouse e tela larga. Só aqui entram parallax na
//              rolagem, flutuação contínua e reação ao mouse: no iPhone cada
//              animação infinita ou atrelada à rolagem vira mais uma camada na GPU,
//              e a home já derrubou a aba do Safari por memória (ver os commits de
//              novembro e assets/css/aparelho-de-toque.sass).
export const CONDICOES = {
  movimento: '(prefers-reduced-motion: no-preference)',
  mesa: '(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine) and (min-width: 1100px)',
}

let refrescoAgendado = false

// Monta as animações de uma seção dentro de um gsap.context preso à raiz: ao
// sair da página o revert desfaz tweens, ScrollTriggers e estilos inline juntos.
// `montar` recebe ({ movimento, mesa }) e a raiz; roda de novo sozinho quando
// uma condição muda (ex.: a janela estreita abaixo de 1100px).
export function useAnimacoes(raizRef, montar) {
  let contexto = null

  onMounted(() => {
    const raiz = raizRef.value
    if (!raiz) return

    contexto = gsap.context(() => {
      gsap.matchMedia().add(CONDICOES, (ctx) => montar(ctx.conditions, raiz))
    }, raiz)

    // a Figtree variável chega depois do primeiro layout e muda a altura dos
    // títulos: sem recalcular, os gatilhos ficavam alguns pixels deslocados
    if (!refrescoAgendado && document.fonts?.ready) {
      refrescoAgendado = true
      document.fonts.ready.then(() => {
        refrescoAgendado = false
        ScrollTrigger.refresh()
      })
    }
  })

  onBeforeUnmount(() => contexto?.revert())
}

// Entrada padrão ao rolar: sobe e aparece uma vez, sem voltar ao subir a página.
export function entrar(alvos, gatilho, extra = {}) {
  const { start = 'top 82%', ...resto } = extra
  return gsap.from(alvos, {
    autoAlpha: 0,
    y: 40,
    duration: 0.9,
    ease: 'power3.out',
    stagger: 0.1,
    ...resto,
    scrollTrigger: { trigger: gatilho, start, once: true },
  })
}

// Parallax leve atrelado à rolagem (só na condição "mesa").
export function parallax(alvo, gatilho, vars) {
  return gsap.to(alvo, {
    ease: 'none',
    ...vars,
    scrollTrigger: { trigger: gatilho, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
  })
}
