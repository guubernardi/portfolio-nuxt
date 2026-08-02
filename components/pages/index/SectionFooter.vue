<template>
  <footer class="footer">
    <div class="footer__wrap">
      <div class="footer__topo">
        <div class="footer__marca">
          <div class="footer__logo">
            <Svgs nome="logo" />
          </div>

          <div class="footer__marca-texto">
            <span class="footer__nome">Gustavo Bernardi</span>
            <span class="footer__cargo">Estúdio de desenvolvimento web</span>
          </div>

          <p class="footer__resumo">
            Sites, e-commerces e sistemas sob medida. Do protótipo ao deploy, com código
            próprio e prazo combinado.
          </p>
        </div>

        <nav class="footer__nav" aria-label="Navegação do rodapé">
          <span class="footer__titulo">Navegação</span>

          <span
            v-for="link in links"
            :key="link.alvo"
            class="footer__link"
            role="button"
            tabindex="0"
            @click="scrollPara(link.alvo)"
            @keydown.enter="scrollPara(link.alvo)"
          >
            {{ link.rotulo }}
          </span>
        </nav>

        <div class="footer__contato">
          <span class="footer__titulo">Fale com a gente</span>

          <a class="footer__cta" :href="linkWhatsapp" target="_blank" rel="noopener">
            Chamar no WhatsApp
            <SvgIcone nome="seta-direita" />
          </a>

          <a
            class="footer__insta"
            href="https://www.instagram.com/devbygusta/"
            target="_blank"
            rel="noopener"
          >
            <SvgIcone nome="instagram" />
            @devbygusta
          </a>
        </div>
      </div>

      <div class="footer__divider"></div>

      <div class="footer__rodape">
        <span class="footer__copy">© {{ ano }} Gustavo Bernardi. Todos os direitos reservados.</span>
      </div>
    </div>
  </footer>
</template>

<script setup>
import Svgs from '../../global/svgs/Svgs.vue'
import { useScrollTo } from '~/composables/useScrollTo'

const ano = new Date().getFullYear()
const { scrollTo } = useScrollTo()

const linkWhatsapp = 'https://wa.me/5511977912709?text=' +
  encodeURIComponent('Olá! Vim pelo site e gostaria de um orçamento para um projeto.')

const links = [
  { rotulo: 'Início', alvo: '.hero' },
  { rotulo: 'Serviços', alvo: '.servicos' },
  { rotulo: 'Como trabalhamos', alvo: '.processo' },
  { rotulo: 'Projetos', alvo: '.projetos' },
  { rotulo: 'Dúvidas', alvo: '.faq' },
  { rotulo: 'Contato', alvo: '.contato' },
]

function scrollPara(seletor) {
  scrollTo(seletor)
}
</script>

<style scoped lang="sass">
.footer
  width: 100%
  padding: 96px 60px 44px
  background: var(--cor-preto)

  &__wrap
    display: flex
    flex-direction: column
    gap: 56px
    // mesmo grid de 1600px das outras seções
    max-width: 1600px
    margin: 0 auto

  // 4 colunas com o mesmo gap das etapas do Processo: assim as colunas do footer
  // caem exatamente sobre as colunas das seções de cima, e não só a caixa externa
  &__topo
    display: grid
    grid-template-columns: repeat(4, minmax(0, 1fr))
    gap: 30px

  &__marca
    display: flex
    flex-direction: column
    align-items: flex-start
    grid-column: span 2
    gap: 0

  &__logo
    display: flex
    align-items: center
    justify-content: center
    width: 52px
    height: 52px
    margin-bottom: 20px
    border: 1px solid rgba(255, 255, 255, 0.1)
    border-radius: 14px
    background: rgba(255, 255, 255, 0.03)

    :deep(svg)
      width: 26px
      height: 26px

  &__marca-texto
    display: flex
    flex-direction: column
    gap: 4px

  &__nome
    font-family: var(--semibold)
    font-size: 17px
    line-height: 1.2
    color: var(--cor-branco)

  &__cargo
    font-family: var(--light)
    font-size: 14px
    color: #8aa6f0

  &__resumo
    max-width: 380px
    margin: 20px 0 0
    font-family: var(--light)
    font-size: 14.5px
    line-height: 1.65
    color: rgba(255, 255, 255, 0.45)

  &__titulo
    margin-bottom: 22px
    font-family: var(--light)
    font-size: 11px
    letter-spacing: 2.2px
    text-transform: uppercase
    color: rgba(255, 255, 255, 0.4)

  &__nav
    display: flex
    flex-direction: column
    align-items: flex-start
    gap: 13px

  &__link
    font-family: var(--light)
    font-size: 15px
    color: rgba(255, 255, 255, 0.55)
    cursor: pointer
    transition: color 0.4s ease

    &:hover
      color: var(--cor-branco)

  // última coluna encostada na direita: alinhada ao fim do grid e da divisória,
  // senão sobra um vão morto e a borda direita do footer fica irregular
  &__contato
    display: flex
    flex-direction: column
    align-items: flex-end
    text-align: right

  &__cta
    display: inline-flex
    align-items: center
    gap: 11px
    padding: 14px 24px
    border: 1px solid rgba(140, 165, 255, 0.28)
    border-radius: 12px
    background: rgba(40, 55, 150, 0.45)
    font-family: var(--semibold)
    font-size: 14px
    line-height: 1
    color: var(--cor-branco)
    text-decoration: none
    transition: background 0.4s ease

    &:hover
      background: rgba(58, 74, 190, 0.6)

      :deep(svg)
        transform: translateX(4px)

    :deep(svg)
      display: block
      width: 14px
      height: 14px
      transition: transform 0.4s ease

  // o @ à mostra convida a seguir; só o ícone solto não diz qual é o perfil
  &__insta
    display: inline-flex
    align-items: center
    gap: 10px
    margin-top: 20px
    font-family: var(--light)
    font-size: 14.5px
    color: rgba(255, 255, 255, 0.5)
    text-decoration: none
    transition: color 0.4s ease

    &:hover
      color: var(--cor-branco)

    :deep(svg)
      display: block
      width: 17px
      height: 17px
      flex-shrink: 0

  &__divider
    width: 100%
    height: 1px
    background: rgba(255, 255, 255, 0.08)

  &__rodape
    display: flex
    align-items: center
    justify-content: space-between
    gap: 16px

  &__copy
    font-family: var(--light)
    font-size: 13.5px
    color: rgba(255, 255, 255, 0.3)

@media (max-width: 1000px)
  .footer
    padding: 76px 32px 40px

    &__topo
      grid-template-columns: repeat(2, minmax(0, 1fr))
      gap: 44px

    &__marca
      grid-column: 1 / -1

@media (max-width: 620px)
  .footer
    padding: 64px 20px 36px

    &__wrap
      gap: 40px

    &__topo
      grid-template-columns: 1fr
      gap: 38px

    // em coluna única não há borda direita pra acompanhar: volta pra esquerda
    &__contato
      align-items: flex-start
      text-align: left

    &__cta
      width: 100%
      justify-content: center

    &__rodape
      flex-direction: column
      align-items: flex-start
      gap: 10px
</style>
