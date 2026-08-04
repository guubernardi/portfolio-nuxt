<template>
  <main class="bio">
    <div class="bio__luz" aria-hidden="true">
      <span class="bio__nucleo"></span>
      <span class="bio__feixe"></span>
    </div>

    <div class="bio__conteudo">
      <div class="bio__logo">
        <Svgs nome="logo" />
      </div>

      <h1 class="bio__nome">Gustavo Bernardi</h1>
      <p class="bio__cargo">Desenvolvimento web</p>

      <div class="bio__selo">
        <span class="bio__ponto"></span>
        Disponível para novos projetos
      </div>

      <p class="bio__texto">
        Sites, e-commerces e sistemas sob medida. Do protótipo ao deploy, com código próprio.
      </p>

      <nav class="bio__links" aria-label="Links">
        <a
          v-for="link in links"
          :key="link.rotulo"
          :href="link.url"
          :target="link.externo ? '_blank' : undefined"
          :rel="link.externo ? 'noopener' : undefined"
          class="link"
          :class="{ 'link--primario': link.primario }"
        >
          <span class="link__icone">
            <Svgs v-if="link.svgs" :nome="link.icone" />
            <SvgIcone v-else :nome="link.icone" />
          </span>

          <span class="link__rotulo">{{ link.rotulo }}</span>

          <span class="link__seta" aria-hidden="true">
            <SvgIcone nome="seta-direita" />
          </span>
        </a>
      </nav>

      <span class="bio__rodape">© {{ ano }} Gustavo Bernardi</span>
    </div>
  </main>
</template>

<script setup>
import Svgs from '~/components/global/svgs/Svgs.vue'

// sem layout: o `default` traz uma Nav que não faz sentido numa página de bio
definePageMeta({ layout: false })

const ano = new Date().getFullYear()

const linkWhatsapp = 'https://wa.me/5511977912709?text=' +
  encodeURIComponent('Olá! Vim pelo Instagram e gostaria de um orçamento para um projeto.')

const links = [
  {
    rotulo: 'Solicitar orçamento',
    url: linkWhatsapp,
    icone: 'whatsapp',
    svgs: true,
    externo: true,
    primario: true,
  },
  // 'mundo' e não 'planeta': planeta não existe na lib, existe só no Svgs.vue,
  // e ele tem cor fixa no path. 'mundo' é preenchido, igual ao do WhatsApp
  {
    rotulo: 'Conhecer o site',
    url: 'https://gustavobernardi.com',
    icone: 'mundo',
    svgs: false,
    externo: true,
  },
]

// sem a marca no título: o titleTemplate do app.vue já a acrescenta
useHead({
  title: 'Estúdio de desenvolvimento web',
  meta: [
    { name: 'description', content: 'Sites, e-commerces e sistemas sob medida.' },
    // fora da busca de propósito: é página de bio, não deve competir com o site
    { name: 'robots', content: 'noindex, follow' },
  ],
})
</script>

<style scoped lang="sass">
.bio
  position: relative
  display: flex
  align-items: center
  justify-content: center
  min-height: 100svh
  padding: 48px 22px 40px
  overflow: hidden
  background: radial-gradient(ellipse 90% 55% at 50% 12%, #05142a 0%, #010710 46%, #000000 100%)

.bio__luz
  position: absolute
  inset: 0
  pointer-events: none

.bio__nucleo
  position: absolute
  top: 8%
  left: 50%
  width: min(620px, 130vw)
  height: 380px
  transform: translateX(-50%)
  border-radius: 50%
  background: radial-gradient(ellipse at center, rgba(60, 110, 220, 0.32) 0%, transparent 70%)
  filter: blur(60px)

.bio__feixe
  position: absolute
  top: 24%
  left: -10%
  width: 120%
  height: 2px
  border-radius: 100px
  background: linear-gradient(90deg, transparent, rgba(190, 215, 255, 0.5) 45%, rgba(255, 255, 255, 0.8) 50%, rgba(190, 215, 255, 0.5) 55%, transparent)
  box-shadow: 0 0 24px 3px rgba(130, 175, 255, 0.35)
  transform: rotate(-4deg)

.bio__conteudo
  position: relative
  z-index: 1
  display: flex
  flex-direction: column
  align-items: center
  width: 100%
  max-width: 440px
  text-align: center

.bio__logo
  display: flex
  align-items: center
  justify-content: center
  width: 72px
  height: 72px
  margin-bottom: 24px
  border: 1px solid rgba(255, 255, 255, 0.12)
  border-radius: 20px
  background: rgba(255, 255, 255, 0.04)
  backdrop-filter: blur(12px)
  -webkit-backdrop-filter: blur(12px)

  :deep(svg)
    width: 34px
    height: 34px

.bio__nome
  margin: 0
  font-family: var(--semibold)
  font-size: 26px
  letter-spacing: -0.01em
  color: var(--cor-branco)

.bio__cargo
  margin: 6px 0 0
  font-family: var(--light)
  font-size: 15px
  color: #8aa6f0

.bio__selo
  display: inline-flex
  align-items: center
  gap: 9px
  margin: 22px 0 0
  padding: 8px 16px
  border: 1px solid rgba(255, 255, 255, 0.13)
  border-radius: 100px
  background: rgba(255, 255, 255, 0.04)
  font-family: var(--light)
  font-size: 13px
  color: rgba(255, 255, 255, 0.75)

.bio__ponto
  width: 7px
  height: 7px
  border-radius: 50%
  background: #46e08a
  box-shadow: 0 0 0 4px rgba(70, 224, 138, 0.16)

.bio__texto
  margin: 20px 0 0
  font-family: var(--light)
  font-size: 14.5px
  line-height: 1.65
  color: rgba(255, 255, 255, 0.5)

.bio__links
  display: flex
  flex-direction: column
  gap: 12px
  width: 100%
  margin-top: 34px

.link
  display: flex
  align-items: center
  gap: 14px
  // alvo de toque generoso: praticamente todo acesso vem do celular
  padding: 17px 18px
  border: 1px solid rgba(255, 255, 255, 0.1)
  border-radius: 14px
  background: rgba(255, 255, 255, 0.03)
  text-decoration: none
  transition: background 0.4s ease, border-color 0.4s ease

  &:hover
    background: rgba(125, 155, 255, 0.08)
    border-color: rgba(125, 155, 255, 0.26)

    .link__seta
      transform: translateX(4px)

  &--primario
    border-color: transparent
    background: var(--cor-azul-forte)

    &:hover
      background: #2c1fd6
      border-color: transparent

  &__icone
    display: flex
    align-items: center
    justify-content: center
    flex-shrink: 0
    width: 22px
    height: 22px
    color: var(--cor-branco)

    :deep(svg)
      display: block
      width: 19px
      height: 19px

  &__rotulo
    flex: 1
    text-align: left
    font-family: var(--semibold)
    font-size: 15px
    line-height: 1
    color: var(--cor-branco)

  &__seta
    display: flex
    flex-shrink: 0
    color: rgba(255, 255, 255, 0.45)
    transition: transform 0.4s ease

    :deep(svg)
      display: block
      width: 14px
      height: 14px

.bio__rodape
  margin-top: 38px
  font-family: var(--light)
  font-size: 12.5px
  color: rgba(255, 255, 255, 0.28)
</style>
