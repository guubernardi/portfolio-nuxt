// Revelação no scroll para as páginas que rodam fora do #smooth-wrapper, onde o
// ScrollTrigger não tem como se orientar. Um observer só atende a página inteira:
// cada elemento com v-revelar entra quando cruza a linha de leitura e sai da
// lista em seguida, porque a revelação acontece uma vez e não se desfaz.
//
// O par disto é a classe .revelar no assets/css/animations.sass, que já vem no
// HTML do servidor. É ela que guarda o estado inicial; aqui só se acrescenta a
// classe que libera.
export default defineNuxtPlugin((nuxtApp) => {
  let observador = null

  function obterObservador() {
    if (observador) return observador

    observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue
          entrada.target.classList.add('revelado')
          observador.unobserve(entrada.target)
        }
      },
      // um respiro para o elemento entrar de fato na tela antes de acender,
      // em vez de disparar assim que a borda encosta
      { rootMargin: '0px 0px -10% 0px' }
    )

    return observador
  }

  nuxtApp.vueApp.directive('revelar', {
    // mounted não roda no servidor, então o IntersectionObserver só é tocado no
    // navegador mesmo o plugin sendo universal
    mounted(el, binding) {
      if (binding.value) el.style.setProperty('--atraso', `${binding.value}ms`)
      obterObservador().observe(el)
    },

    unmounted(el) {
      observador?.unobserve(el)
    },

    // sem isto o Vue avisa em desenvolvimento que a diretiva não tem par no SSR
    getSSRProps: () => ({}),
  })
})
