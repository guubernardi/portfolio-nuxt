<template>
  <footer ref="raiz" class="rodape">
    <div class="v2-conteudo">
      <div class="rodape__topo">
        <div class="rodape__marca">
          <span class="rodape__logo"><Svgs nome="logo" /></span>
          <p>Sites, e-commerces e sistemas<br />sob medida, escritos do zero.</p>
        </div>

        <nav class="rodape__colunas" aria-label="Rodapé">
          <div>
            <p class="rodape__rotulo">Navegação</p>
            <ul>
              <li><NuxtLink to="/">Início</NuxtLink></li>
              <li><NuxtLink to="/servicos">Serviços</NuxtLink></li>
              <li><NuxtLink to="/projetos">Projetos</NuxtLink></li>
              <li><NuxtLink to="/#sobre">Sobre</NuxtLink></li>
              <li><NuxtLink to="/contato">Contato</NuxtLink></li>
            </ul>
          </div>
          <div>
            <p class="rodape__rotulo">Serviços</p>
            <ul>
              <li><NuxtLink to="/criacao-de-landing-page">Landing page</NuxtLink></li>
              <li><NuxtLink to="/criacao-de-site-institucional">Site institucional</NuxtLink></li>
              <li><NuxtLink to="/criacao-de-loja-virtual">Loja virtual</NuxtLink></li>
              <li><NuxtLink to="/desenvolvimento-de-sistema-web">Sistema web</NuxtLink></li>
            </ul>
          </div>
          <div>
            <p class="rodape__rotulo">Contato</p>
            <ul>
              <li><a :href="whatsapp" target="_blank" rel="noopener">WhatsApp (11) 96620-6588</a></li>
              <li><a href="https://www.instagram.com/devbygusta/" target="_blank" rel="noopener">Instagram @devbygusta</a></li>
            </ul>
          </div>
        </nav>
      </div>

      <p class="rodape__assinatura" aria-hidden="true">Gustavo Bernardi</p>

      <div class="rodape__base">
        <span>© {{ ano }} Gustavo Bernardi</span>
        <span>Feito do zero, como todo projeto.</span>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'
import { gsap } from 'gsap'
import { linkWhatsapp } from '~/helpers/site'
import { useAnimacoes, entrar } from '~/composables/useAnimacoes'

const raiz = ref(null)

useAnimacoes(raiz, ({ movimento, mesa }, el) => {
  if (!movimento) return

  entrar(el.querySelectorAll('.rodape__marca, .rodape__colunas > div'), el, { y: 30, stagger: 0.1, start: 'top 90%' })

  // o nome vazado se revela da esquerda pra direita: no computador acompanha a
  // rolagem; no celular roda uma vez, sem ficar preso ao scroll
  const assinatura = el.querySelector('.rodape__assinatura')
  const de = { clipPath: 'inset(0% 100% 0% 0%)' }
  const para = { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none' }
  if (mesa) {
    // end 'max' = fim da página. Com um ponto fixo (ex.: 'bottom 75%') a rolagem
    // acabava antes e o nome ficava cortado no meio ("GUSTAVO BER")
    gsap.fromTo(assinatura, de, { ...para, scrollTrigger: { trigger: assinatura, start: 'clamp(top bottom)', end: 'max', scrub: 0.6 } })
  } else {
    gsap.fromTo(assinatura, de, { ...para, duration: 1.4, ease: 'power2.inOut', scrollTrigger: { trigger: assinatura, start: 'top 92%', once: true } })
  }
})

const whatsapp = linkWhatsapp()
const ano = new Date().getFullYear()
</script>

<style scoped lang="sass">
.rodape
  padding: 80px 0 56px
  background: var(--abismo)
  color: #fff
  font-family: var(--figtree)

  &__topo
    display: flex
    flex-wrap: wrap
    justify-content: space-between
    gap: 48px

  &__logo
    display: inline-flex

    :deep(svg)
      width: 44px
      height: auto

  &__marca p
    margin: 22px 0 0
    font-size: 18px
    line-height: 1.5
    color: rgba(255, 255, 255, 0.75)

  &__colunas
    display: flex
    flex-wrap: wrap
    gap: 48px 80px

    ul
      display: flex
      flex-direction: column
      gap: 14px
      margin: 0
      padding: 0
      list-style: none

    a
      font-weight: 500
      font-size: 16px
      color: rgba(255, 255, 255, 0.85)
      text-decoration: none
      transition: color 0.3s ease

      &:hover
        color: var(--ciano)

  &__rotulo
    margin: 0 0 14px
    font-weight: 700
    font-size: 13px
    letter-spacing: 0.16em
    text-transform: uppercase
    color: var(--ciano)

  // o nome vazado, de ponta a ponta
  &__assinatura
    margin: 72px 0 40px
    font-weight: 900
    // "GUSTAVO BERNARDI" mede ~9,4x o tamanho da fonte. A caixa é a tela menos
    // 128px de margem (até 1312px), então a fonte acompanha isso e não só a
    // largura da tela: com 9.8vw o "I" final passava da borda e era cortado
    font-size: clamp(44px, calc(10.5vw - 14px), 138px)
    line-height: 1
    letter-spacing: -0.04em
    text-transform: uppercase
    white-space: nowrap
    color: transparent
    -webkit-text-stroke: 1.5px rgba(243, 247, 249, 0.18)

  &__base
    display: flex
    flex-wrap: wrap
    justify-content: space-between
    gap: 12px
    padding-top: 24px
    border-top: 1px solid rgba(243, 247, 249, 0.12)
    font-size: 14px
    color: var(--texto-apagado-escuro)

@media (max-width: 760px)
  .rodape__colunas
    gap: 36px 48px

  // numa linha só o nome vazava da tela do celular
  .rodape__assinatura
    font-size: 17vw
    line-height: 0.92
    white-space: normal
</style>
