<template>
  <footer class="footer">
    <div class="footer__wrap">
      <div class="footer__topo">
        <div class="footer__marca">
          <Svgs nome="logo" />
          <div class="footer__marca-texto">
            <span class="footer__nome">Gustavo Bernardi</span>
            <span class="footer__cargo">Desenvolvedor Front-End</span>
          </div>
        </div>

        <nav class="footer__nav">
          <span class="footer__link">Início</span>
          <span class="footer__link">Projetos</span>
          <span class="footer__link">Sobre mim</span>
        </nav>

        <div class="footer__sociais">
          <Svgs nome="whatsapp" />
          <Svgs nome="linkedin-branco" />
          <Svgs nome="github-branco" />
        </div>
      </div>

      <div class="footer__divider"></div>

      <div class="footer__rodape">
        <span class="footer__copy">© {{ ano }} Gustavo Bernardi · Todos os direitos reservados</span>
        <span class="footer__feito">Feito com Vue.js &amp; NuxtJS</span>
      </div>
    </div>
  </footer>
</template>

<script setup>
import Svgs from '../../global/svgs/Svgs.vue'

const ano = new Date().getFullYear()
</script>

<style scoped lang="sass">
.footer
  width: 100%
  background: #000000
  padding: 64px 0 40px

  &__wrap
    padding: 0 148px
    display: flex
    flex-direction: column
    gap: 40px

    @media (max-width: 1200px)
      padding: 0 60px

    @media (max-width: 900px)
      padding: 0 30px

    @media (max-width: 600px)
      padding: 0 20px

  &__topo
    display: flex
    align-items: center
    justify-content: space-between
    gap: 40px

    @media (max-width: 900px)
      flex-direction: column
      align-items: flex-start
      gap: 32px

  &__marca
    display: flex
    align-items: center
    gap: 14px

    :deep(svg)
      width: 36px
      height: 36px
      flex-shrink: 0

  &__marca-texto
    display: flex
    flex-direction: column
    gap: 2px

  &__nome
    font-family: var(--semibold)
    font-size: var(--f2)
    color: var(--cor-branco)
    line-height: 1

  &__cargo
    font-family: var(--light)
    font-size: var(--f1)
    color: rgba(255, 255, 255, 0.45)

  &__nav
    display: flex
    align-items: center
    gap: 32px

    @media (max-width: 600px)
      gap: 20px
      flex-wrap: wrap

  &__link
    font-family: var(--light)
    font-size: var(--f1)
    color: rgba(255, 255, 255, 0.55)
    cursor: pointer
    transition: color 0.2s ease

    &:hover
      color: var(--cor-branco)

  &__sociais
    display: flex
    align-items: center
    gap: 24px

    :deep(svg)
      width: 20px
      height: 20px
      cursor: pointer
      opacity: 0.55
      transition: opacity 0.2s ease

      &:hover
        opacity: 1

  &__divider
    width: 100%
    height: 1px
    background: rgba(255, 255, 255, 0.08)

  &__rodape
    display: flex
    align-items: center
    justify-content: space-between
    gap: 16px

    @media (max-width: 600px)
      flex-direction: column
      align-items: flex-start
      gap: 8px

  &__copy
    font-family: var(--light)
    font-size: var(--f1)
    color: rgba(255, 255, 255, 0.3)

  &__feito
    font-family: var(--light)
    font-size: var(--f1)
    color: rgba(255, 255, 255, 0.3)
</style>
