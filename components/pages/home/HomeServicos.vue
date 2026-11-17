<template>
  <section id="servicos" ref="raiz" class="servicos v2-grade-clara" aria-labelledby="servicos-titulo">
    <div class="v2-conteudo">
      <header class="servicos__cabecalho">
        <p class="v2-rotulo">O que eu faço</p>
        <h2 id="servicos-titulo" class="v2-titulo">
          Um serviço para cada
          <em>fase da sua empresa.</em>
        </h2>
      </header>

      <ul class="servicos__cards">
        <!-- SITES -->
        <li class="card card--sites">
          <div class="card__ilustracao" aria-hidden="true">
            <div class="janela">
              <span class="janela__bolinhas"><i /><i /><i /></span>
              <span class="janela__logo" />
              <span class="janela__menu"><i /><i /><i /></span>
              <span class="janela__titulo" />
              <span class="janela__titulo janela__titulo--curto" />
              <span class="janela__linha" />
              <span class="janela__linha janela__linha--curta" />
              <span class="pilula pilula--ciano janela__agendar"><SvgIcone nome="whatsapp" /> Agendar</span>
            </div>
            <span class="pilula pilula--branca card__aviso"><i class="ponto-verde" /> Novo contato!</span>
          </div>
          <p class="card__rotulo">Sites</p>
          <h3 class="card__titulo">Site que traz cliente.</h3>
          <p class="card__texto">Landing page ou site institucional<br />feito para virar contato no WhatsApp.</p>
          <ul class="card__inclui">
            <li v-for="item in ['Landing page', 'Site institucional', 'Pronto para aparecer no Google']" :key="item">
              <SvgIcone nome="check" /> {{ item }}
            </li>
          </ul>
          <NuxtLink class="card__link" to="/servicos">Ver como funciona <SvgIcone nome="seta-direita" /></NuxtLink>
        </li>

        <!-- E-COMMERCE -->
        <li class="card card--loja">
          <div class="card__ilustracao" aria-hidden="true">
            <div class="produto">
              <span class="produto__foto" />
              <span class="produto__linha" />
              <span class="produto__linha produto__linha--curta" />
              <b class="produto__preco">R$ 89,90</b>
              <span class="pilula pilula--ciano produto__comprar">Comprar</span>
            </div>
            <span class="pilula pilula--ciano card__pix"><SvgIcone nome="check" /> Pedido pago no Pix</span>
            <span class="pilula pilula--branca card__frete">Frete calculado: R$ 12,40</span>
          </div>
          <p class="card__rotulo">E-commerce</p>
          <h3 class="card__titulo">Loja que<br />vende sozinha.</h3>
          <p class="card__texto">O cliente escolhe, calcula o frete e paga sem esperar alguém responder no direct.</p>
          <ul class="card__inclui">
            <li v-for="item in ['Loja virtual do zero', 'Pix, cartão e frete calculado', 'Shopify ou loja própria']" :key="item">
              <SvgIcone nome="check" /> {{ item }}
            </li>
          </ul>
          <NuxtLink class="card__link" to="/criacao-de-loja-virtual">Ver como funciona <SvgIcone nome="seta-direita" /></NuxtLink>
        </li>

        <!-- SISTEMAS -->
        <li class="card card--sistemas">
          <div class="card__ilustracao" aria-hidden="true">
            <div class="painel">
              <span class="painel__legenda">Produção de hoje</span>
              <b class="painel__valor">3 de 3 setores no prazo</b>
              <span class="painel__colunas">
                <i v-for="(altura, i) in [46, 70, 58, 92, 80, 110, 98]" :key="i" :style="{ height: `${altura}px`, opacity: 0.25 + i * 0.125 }" />
              </span>
            </div>
          </div>
          <p class="card__rotulo">Sistemas</p>
          <h3 class="card__titulo">Sistema que organiza a empresa.</h3>
          <p class="card__texto">O seu processo em um lugar só, no computador, no celular e na TV da reunião.</p>
          <ul class="card__inclui">
            <li v-for="item in ['Sistema web sob medida', 'Integrações e pagamentos', 'Painéis e relatórios']" :key="item">
              <SvgIcone nome="check" /> {{ item }}
            </li>
          </ul>
          <NuxtLink class="card__link" to="/desenvolvimento-de-sistema-web">Ver como funciona <SvgIcone nome="seta-direita" /></NuxtLink>
        </li>
      </ul>

      <div class="servicos__tambem">
        <span>Também faço</span>
        <NuxtLink v-for="item in tambem" :key="item.rota" class="servicos__chip" :to="item.rota">
          <SvgIcone :nome="item.icone" /> {{ item.rotulo }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { gsap } from 'gsap'
import { useAnimacoes, entrar } from '~/composables/useAnimacoes'

const raiz = ref(null)

useAnimacoes(raiz, ({ movimento }, el) => {
  if (!movimento) return

  entrar(el.querySelector('.servicos__cabecalho').children, el.querySelector('.servicos__cabecalho'), { y: 50, stagger: 0.12 })

  // cada card sobe meio torto e endireita; depois a ilustração dele ganha vida
  el.querySelectorAll('.card').forEach((card, i) => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: card, start: 'top 85%', once: true }, delay: i * 0.12 })
    tl.from(card, { y: 90, autoAlpha: 0, rotation: (i - 1) * 4, duration: 1, ease: 'power3.out' })
    // cada card tem uma ilustração diferente: só anima o que existe nele
    const pilulas = card.querySelectorAll('.card__ilustracao .pilula')
    const colunas = card.querySelectorAll('.painel__colunas i')
    if (pilulas.length) tl.from(pilulas, { scale: 0, duration: 0.6, stagger: 0.12, ease: 'back.out(2.4)' }, 0.55)
    if (colunas.length) tl.from(colunas, { scaleY: 0, transformOrigin: 'bottom center', duration: 0.7, stagger: 0.06, ease: 'power3.out' }, 0.5)
    tl.from(card.querySelectorAll('.card__inclui li'), { x: -16, autoAlpha: 0, duration: 0.5, stagger: 0.07, ease: 'power2.out' }, 0.6)
  })

  entrar(el.querySelectorAll('.servicos__tambem > *'), el.querySelector('.servicos__tambem'), { y: 20, duration: 0.6, stagger: 0.08, start: 'top 92%' })
})

const tambem = [
  { rotulo: 'UI/UX e interface', icone: 'paleta', rota: '/design-de-interface' },
  { rotulo: 'Landing page para evento', icone: 'ingresso', rota: '/landing-page-para-evento' },
  { rotulo: 'Página de link da bio', icone: 'instagram', rota: '/bio' },
]
</script>

<style scoped lang="sass">
.servicos
  padding: 120px 0
  background-color: var(--gelo)

  &__cabecalho
    margin-bottom: 56px

  &__cards
    display: grid
    grid-template-columns: repeat(3, minmax(0, 1fr))
    gap: 24px
    margin: 0
    padding: 0
    list-style: none

  &__tambem
    display: flex
    flex-wrap: wrap
    align-items: center
    gap: 12px
    margin-top: 56px
    font-family: var(--figtree)
    font-weight: 600
    font-size: 16px
    color: var(--texto-apagado)

  &__chip
    display: inline-flex
    align-items: center
    gap: 8px
    padding: 9px 16px 9px 14px
    border: 1px solid rgba(2, 7, 21, 0.12)
    border-radius: 999px
    background: #fff
    font-weight: 500
    font-size: 15px
    color: var(--abismo)
    text-decoration: none
    transition: border-color 0.3s ease

    &:hover
      border-color: var(--petroleo)

    svg
      width: 18px
      height: 18px
      color: var(--petroleo)

.card
  display: flex
  flex-direction: column
  gap: 24px
  padding: 40px
  border-radius: 32px
  font-family: var(--figtree)

  &--sites
    background: var(--petroleo)
    color: #fff

  &--loja
    background: var(--abismo)
    color: #fff

  &--sistemas
    border: 1px solid rgba(2, 7, 21, 0.1)
    background: #fff
    color: var(--abismo)

  &__ilustracao
    position: relative
    height: 230px
    overflow: hidden
    border-radius: 20px
    background: rgba(255, 255, 255, 0.14)

  &--loja &__ilustracao
    background: rgba(255, 255, 255, 0.07)

  &--sistemas &__ilustracao
    background: var(--gelo)

  &__rotulo
    margin: 0
    font-weight: 700
    font-size: 12px
    letter-spacing: 0.16em
    text-transform: uppercase
    opacity: 0.7

  &__titulo
    margin: 0
    font-weight: 700
    font-size: clamp(28px, 2.5vw, 36px)
    line-height: 1.05
    letter-spacing: -0.02em

  &__texto
    margin: 0
    font-size: 17px
    line-height: 1.5
    color: #DCE6FF

  &--loja &__texto
    color: #B8C0D0

  &--sistemas &__texto
    color: var(--texto-apagado)

  &__inclui
    display: flex
    flex-direction: column
    gap: 12px
    margin: 0
    padding: 0
    list-style: none
    font-weight: 500
    font-size: 16px

    li
      display: flex
      align-items: center
      gap: 10px

    svg
      width: 18px
      height: 18px
      flex-shrink: 0

  &--sistemas &__inclui svg
    color: var(--petroleo)

  // empurra o link pro pé do card, pros três terminarem alinhados
  &__link
    display: inline-flex
    align-items: center
    gap: 8px
    margin-top: auto
    padding-top: 8px
    font-weight: 600
    font-size: 16px
    color: inherit
    text-decoration: none

    svg
      width: 16px
      height: 16px
      transition: transform 0.3s ease

    &:hover svg
      transform: translateX(4px)

// ===== mini-ilustrações (HTML e CSS, nada de imagem) =====
.pilula
  position: absolute
  display: inline-flex
  align-items: center
  gap: 8px
  padding: 8px 12px
  border-radius: 999px
  font-weight: 700
  font-size: 12px
  color: var(--abismo)
  white-space: nowrap

  svg
    width: 14px
    height: 14px

  &--ciano
    background: var(--ciano)

  &--branca
    background: #fff
    box-shadow: 0 10px 24px rgba(5, 10, 31, 0.22)

.ponto-verde
  width: 22px
  height: 22px
  border-radius: 50%
  background: #25D366

.janela
  position: absolute
  top: 28px
  left: 24px
  right: 24px
  height: 230px
  border-radius: 14px
  background: #fff
  box-shadow: 0 10px 24px rgba(5, 10, 31, 0.18)

  > span:not(.pilula)
    position: absolute

  &__bolinhas
    top: 14px
    left: 16px
    display: flex
    gap: 5px

    i
      width: 8px
      height: 8px
      border-radius: 50%
      background: var(--petroleo)

      &:nth-child(2)
        background: var(--azul-eletrico)

      &:nth-child(3)
        background: var(--ciano)

  &__logo
    top: 38px
    left: 16px
    width: 22px
    height: 22px
    border-radius: 6px
    background: var(--azul-eletrico)

  &__menu
    top: 46px
    right: 16px
    display: flex
    gap: 12px

    i
      width: 32px
      height: 6px
      border-radius: 3px
      background: rgba(2, 7, 21, 0.15)

  &__titulo
    top: 76px
    left: 16px
    width: 65%
    height: 14px
    border-radius: 4px
    background: rgba(2, 7, 21, 0.85)

    &--curto
      top: 98px
      width: 52%

  &__linha
    top: 124px
    left: 16px
    width: 72%
    height: 6px
    border-radius: 3px
    background: rgba(2, 7, 21, 0.15)

    &--curta
      top: 136px
      width: 62%

  &__agendar
    top: 154px
    left: 16px

.card__aviso
  top: 152px
  right: 34px
  transform: rotate(6deg)

.produto
  position: absolute
  top: 26px
  left: 24px
  width: 150px
  height: 230px
  border-radius: 14px
  background: #fff
  box-shadow: 0 10px 24px rgba(5, 10, 31, 0.3)

  > span:not(.pilula), > b
    position: absolute
    left: 10px

  &__foto
    top: 10px
    width: 130px
    height: 96px
    border-radius: 10px
    background: linear-gradient(90deg, var(--azul-eletrico), var(--petroleo))

  &__linha
    top: 116px
    width: 100px
    height: 8px
    border-radius: 4px
    background: rgba(2, 7, 21, 0.8)

    &--curta
      top: 130px
      width: 70px
      height: 6px
      background: rgba(2, 7, 21, 0.2)

  &__preco
    top: 142px
    font-weight: 800
    font-size: 15px
    color: var(--abismo)

  &__comprar
    top: 170px
    left: 10px
    padding: 6px 14px

.card__pix
  top: 52px
  left: 150px
  box-shadow: 0 10px 24px rgba(5, 10, 31, 0.3)
  transform: rotate(-4deg)

.card__frete
  top: 120px
  left: 176px
  font-weight: 600
  transform: rotate(3deg)

.painel
  position: absolute
  top: 26px
  left: 24px
  right: 24px
  height: 230px
  padding: 18px
  border-radius: 14px
  background: #fff
  box-shadow: 0 10px 24px rgba(5, 10, 31, 0.08)

  &__legenda
    display: block
    font-weight: 600
    font-size: 12px
    color: var(--texto-apagado)

  &__valor
    display: block
    margin-top: 4px
    font-weight: 800
    font-size: 16px
    color: var(--abismo)

  &__colunas
    position: absolute
    left: 18px
    right: 18px
    top: 92px
    height: 110px
    display: flex
    align-items: flex-end
    justify-content: space-between

    i
      width: 26px
      border-radius: 6px
      background: var(--petroleo)

@media (max-width: 1100px)
  .servicos__cards
    grid-template-columns: 1fr
    max-width: 560px

@media (max-width: 760px)
  .servicos
    padding: 80px 0

  .card
    padding: 28px 22px
    border-radius: 26px

  // no celular estreito a pílula do frete sai pela direita: some
  .card__frete
    display: none
</style>
