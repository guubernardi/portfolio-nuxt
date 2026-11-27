<template>
  <main class="bio">
    <div class="bio__conteudo">
      <!-- decorativa: o nome já está no h1. A boia é o invólucro que balança; a
           figurinha dentro faz o pop da entrada, e um transform não pisa no outro -->
      <div class="bio__boia" aria-hidden="true">
        <span class="bio__figurinha">
          <img src="/images/home/logo-figurinha.svg" width="74" height="80" alt="" />
        </span>
      </div>

      <span class="bio__selo">Disponível para novos projetos</span>

      <h1 class="v2-titulo v2-titulo--claro bio__titulo">
        Gustavo
        <em>Bernardi</em>
        <svg class="bio__brilho bio__brilho--alto" viewBox="0 0 72 72" aria-hidden="true"><path :d="BRILHO" /></svg>
        <svg class="bio__brilho bio__brilho--baixo" viewBox="0 0 72 72" aria-hidden="true"><path :d="BRILHO" /></svg>
      </h1>

      <p class="bio__texto">
        Sites, sistemas e e-commerces feitos do zero, falando direto com quem desenha e&nbsp;programa.
      </p>

      <nav class="bio__links" aria-label="Links">
        <a
          v-for="link in links"
          :key="link.rotulo"
          :href="link.url"
          :target="link.externo ? '_blank' : undefined"
          :rel="link.externo ? 'noopener' : undefined"
          class="v2-botao link"
          :class="VARIANTES[link.variante]"
        >
          <SvgIcone class="link__icone" :nome="link.icone" :tamanho="link.tamanhoIcone" aria-hidden="true" />
          <span class="link__rotulo">{{ link.rotulo }}</span>
          <span class="v2-botao__bolinha link__bolinha" aria-hidden="true">
            <SvgIcone nome="seta-direita" :tamanho="18" />
          </span>
        </a>
      </nav>

      <small class="bio__rodape">© {{ ano }} Gustavo Bernardi</small>
    </div>
  </main>
</template>

<script setup>
import { linkWhatsapp } from '~/helpers/site'

// sem layout: o `default` traz uma Nav que não faz sentido numa página de bio.
// Sem fontesAntigas: a página usa a Figtree variável, que o app.vue já pré-carrega
definePageMeta({ layout: false })

const ano = new Date().getFullYear()

// o brilho de 4 pontas da V2 (public/images/home/brilho.svg), inline para a cor
// vir do CSS
const BRILHO = 'M36 4C38 24 48 34 68 36C48 38 38 48 36 68C34 48 24 38 4 36C24 34 34 24 36 4Z'

// cada variante compõe o botão global da V2 (home-v2.sass); o scoped só acerta
// o que é da bio
const VARIANTES = {
  ciano: 'v2-botao--ciano-seta',
  contorno: 'v2-botao--contorno-suave link--contorno',
}

const links = [
  {
    rotulo: 'Solicitar orçamento',
    // a mensagem conta que veio do Instagram, para a conversa já chegar com a origem
    url: linkWhatsapp('Olá! Vim pelo Instagram e gostaria de um orçamento para um projeto.'),
    icone: 'whatsapp',
    tamanhoIcone: 22,
    variante: 'ciano',
    externo: true,
  },
  // 'mundo' e não 'planeta': planeta não existe na lib, existe só no Svgs.vue,
  // e ele tem cor fixa no path
  {
    rotulo: 'Conhecer o site',
    url: 'https://www.gustavobernardi.com',
    icone: 'mundo',
    tamanhoIcone: 20,
    variante: 'contorno',
    externo: true,
  },
]

// sem a marca no título: o titleTemplate do app.vue já a acrescenta
useHead({
  title: 'Estúdio de desenvolvimento web',
  // marinho também no html e no body: sem isso o "puxar" da rolagem no iPhone
  // mostra o preto do site nas bordas
  htmlAttrs: { style: 'background-color: #021228' },
  bodyAttrs: { style: 'background-color: #021228' },
  meta: [
    { name: 'description', content: 'Sites, e-commerces e sistemas sob medida.' },
    // fora da busca de propósito: é página de bio, não deve competir com o site
    { name: 'robots', content: 'noindex, follow' },
    // a barra do navegador do iPhone na cor do fundo
    { name: 'theme-color', content: '#021228' },
  ],
})
</script>

<style scoped lang="sass">
// a curva das entradas do hero da home
$saida: cubic-bezier(0.22, 1, 0.36, 1)
// curva "back": passa um pouco do tamanho e volta, o pop da figurinha
$pop: cubic-bezier(0.34, 1.56, 0.64, 1)

.bio
  display: flex
  align-items: center
  justify-content: center
  min-height: 100vh
  // svh: a altura com as barras à mostra, como no navegador do Instagram
  min-height: 100svh
  padding: 56px 20px 32px
  overflow: hidden
  // o fundo do hero da V2 com o brilho mais alto, atrás da figurinha e do nome.
  // O gradiente já termina transparente: nada de filter: blur (caro no Safari)
  background-color: var(--marinho)
  background-image: radial-gradient(ellipse 80% 45% at 50% 30%, rgba(7, 177, 232, 0.32), rgba(7, 177, 232, 0) 100%), linear-gradient(to right, rgba(243, 247, 249, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(243, 247, 249, 0.08) 1px, transparent 1px)
  background-size: 100% 100%, 96px 96px, 96px 96px
  background-position: 0 0, -1px -1px, -1px -1px
  color: #fff

  &__conteudo
    display: flex
    flex-direction: column
    align-items: center
    width: 100%
    max-width: 400px
    text-align: center

  // ===== figurinha =====
  &__boia
    transform: rotate(-8deg)
    // começa quando o pop termina (0.05s + 0.7s)
    animation: boiar 3.2s ease-in-out 0.75s infinite alternate both

  &__figurinha
    display: flex
    align-items: center
    justify-content: center
    width: 96px
    height: 96px
    border: 3px solid var(--abismo)
    border-radius: 24px
    background: #fff
    box-shadow: 0 14px 28px rgba(5, 13, 51, 0.35)
    animation: pop 0.7s $pop 0.05s both

    img
      display: block
      width: 48px
      height: auto

  &__selo
    margin-top: 24px
    padding: 8px 16px
    border-radius: 999px
    background: var(--abismo)
    font-family: var(--figtree)
    font-weight: 600
    font-size: 14px
    animation: entrar 0.8s $saida 0.12s both

  // família, peso, caixa alta e o ciano da 2ª linha vêm do .v2-titulo--claro
  &__titulo
    position: relative
    margin-top: 20px
    font-size: clamp(52px, 15vw, 80px)
    line-height: 0.86
    text-wrap: balance
    animation: entrar 0.8s $saida 0.2s both

  // textura, fora do fluxo. A coluna centraliza os filhos, então a caixa do
  // título tem a largura da palavra mais longa e os cantos dela encostam nas letras
  &__brilho
    position: absolute
    display: block
    fill: var(--ciano)
    pointer-events: none

    &--alto
      top: -14px
      left: -18px
      width: 20px
      height: 20px

    // em 320px sobram ~35px entre o "I" e a borda da tela: o brilho cabe
    &--baixo
      right: -20px
      bottom: -16px
      width: 28px
      height: 28px

  &__texto
    max-width: 340px
    margin-top: 20px
    font-family: var(--figtree)
    font-weight: 400
    font-size: 16px
    line-height: 1.5
    color: rgba(255, 255, 255, 0.9)
    text-wrap: pretty
    animation: entrar 0.8s $saida 0.3s both

  &__links
    display: flex
    flex-direction: column
    gap: 12px
    width: 100%
    margin-top: 32px

  &__rodape
    margin-top: 40px
    font-family: var(--figtree)
    font-weight: 400
    font-size: 13px
    color: rgba(255, 255, 255, 0.5)
    animation: entrar 0.8s $saida 0.6s both

// ===== links =====
// por cima do .v2-botao: largura cheia e mais alto (quase todo acesso é pelo
// polegar, no celular), com a bolinha maior
.link
  width: 100%
  min-height: 60px
  padding: 8px 8px 8px 22px
  gap: 14px
  font-size: 16px
  animation: entrar 0.8s $saida 0.4s both

  & + &
    animation-delay: 0.48s

  // fundo escuro translúcido: sem ele a grade passa por trás do texto
  &--contorno
    border-width: 1.5px
    background: rgba(2, 7, 21, 0.35)

    &:hover
      background: rgba(255, 255, 255, 0.08)

  // o tamanho vem da prop do SvgIcone; aqui o desenho só preenche a caixa (o
  // .v2-botao fixa svg em 20px)
  &__icone
    flex-shrink: 0

    :deep(svg)
      width: 100%
      height: 100%

  &__rotulo
    flex: 1
    text-align: left

  &__bolinha
    width: 44px
    height: 44px

    :deep(svg)
      width: 18px
      height: 18px

@keyframes entrar
  from
    opacity: 0
    transform: translateY(24px)

@keyframes pop
  from
    opacity: 0
    transform: scale(0.4) rotate(-30deg)

@keyframes boiar
  from
    transform: translateY(4px) rotate(-8deg)
  to
    transform: translateY(-4px) rotate(-3deg)

@media (prefers-reduced-motion: reduce)
  .bio__boia, .bio__figurinha, .bio__selo, .bio__titulo, .bio__texto, .bio__rodape, .link
    animation: none
</style>
