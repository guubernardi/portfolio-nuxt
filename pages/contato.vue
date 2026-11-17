<template>
  <main id="tela" ref="raiz" class="pagina-contato">
    <V2Topo
      rotulo="Contato"
      linha1="Vamos"
      linha2="conversar?"
      texto="Me conta o que você precisa e eu respondo pessoalmente, sem robô e sem formulário longo."
    >
      <template #acoes>
        <div class="notificacao" aria-hidden="true">
          <span class="notificacao__app"><SvgIcone nome="whatsapp" /></span>
          <span class="notificacao__corpo">
            <span class="notificacao__topo"><b>Gustavo</b> agora</span>
            Oi! Me conta o que<br />você precisa.
          </span>
        </div>
      </template>

      <!-- não é formulário de verdade: a escolha só monta a primeira mensagem
           do WhatsApp, pra conversa já começar sabendo o assunto -->
      <template #lado>
        <div class="escolha">
          <fieldset class="escolha__grupo">
            <legend class="escolha__titulo">O que você precisa?</legend>
            <label v-for="opcao in OPCOES" :key="opcao.valor" class="opcao" :class="{ 'opcao--marcada': escolhida === opcao.valor }">
              <input v-model="escolhida" class="opcao__radio" type="radio" name="necessidade" :value="opcao.valor" />
              <span class="opcao__icone" aria-hidden="true"><SvgIcone :nome="opcao.icone" /></span>
              <span class="opcao__texto">
                <span class="opcao__nome">{{ opcao.nome }}</span>
                <span class="opcao__detalhe">{{ opcao.detalhe }}</span>
              </span>
              <span class="opcao__marca" aria-hidden="true" />
            </label>
          </fieldset>
          <a class="v2-botao v2-botao--ciano escolha__enviar" :href="linkEscolhido" target="_blank" rel="noopener">
            <SvgIcone nome="whatsapp" />
            Continuar no WhatsApp
          </a>
        </div>
      </template>
    </V2Topo>

    <DivisorArco :topo="MARINHO" :base="GELO" />

    <section class="canais v2-grade-clara" aria-labelledby="canais-titulo">
      <div class="v2-conteudo">
        <header class="canais__cabecalho">
          <p class="v2-rotulo">Outros jeitos de falar comigo</p>
          <h2 id="canais-titulo" class="v2-titulo">Escolha o canal <em>que preferir.</em></h2>
        </header>

        <ul class="canais__lista">
          <li class="canal canal--ciano">
            <a class="canal__area" :href="whatsappGeral" target="_blank" rel="noopener">
              <SvgIcone nome="whatsapp" />
              <span class="canal__rotulo">WhatsApp</span>
              <span class="canal__valor">(11) 96620-6588</span>
              <span class="canal__texto">Respondo eu mesmo, no canal que você já usa.</span>
            </a>
          </li>
          <li class="canal canal--petroleo">
            <a class="canal__area" href="https://www.instagram.com/devbygusta/" target="_blank" rel="noopener">
              <SvgIcone nome="instagram" />
              <span class="canal__rotulo">Instagram</span>
              <span class="canal__valor">@devbygusta</span>
              <span class="canal__texto">Bastidores dos projetos e conteúdo sobre sites.</span>
            </a>
          </li>
          <li class="canal canal--abismo">
            <div class="canal__area">
              <SvgIcone nome="check" />
              <span class="canal__rotulo">Atendimento</span>
              <span class="canal__valor">Online, no Brasil todo</span>
              <span class="canal__texto">De Fortaleza a São Paulo, tudo por chamada e WhatsApp.</span>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <DivisorArco :topo="GELO" :base="ABISMO" />
    <HomeRodape />
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { gsap } from 'gsap'
import V2Topo from '~/components/pages/v2/V2Topo.vue'
import DivisorArco from '~/components/global/elementos/DivisorArco.vue'
import HomeRodape from '~/components/pages/home/HomeRodape.vue'
import { SITE_URL, SITE_NOME, TELEFONE, EMAIL, ID_ORGANIZACAO, ID_SITE, urlCanonica, linkWhatsapp } from '~/helpers/site'
import { useAnimacoes, entrar } from '~/composables/useAnimacoes'

definePageMeta({ layout: false })

const MARINHO = '#021228'
const ABISMO = '#020715'
const GELO = '#F3F7F9'

const OPCOES = [
  { valor: 'site', icone: 'monitor', nome: 'Um site', detalhe: 'Landing page ou site institucional', mensagem: 'Olá, Gustavo! Vim pelo site e preciso de um site (landing page ou institucional).' },
  { valor: 'loja', icone: 'loja', nome: 'Uma loja virtual', detalhe: 'Vender pela internet com Pix e cartão', mensagem: 'Olá, Gustavo! Vim pelo site e preciso de uma loja virtual.' },
  { valor: 'sistema', icone: 'dashboard', nome: 'Um sistema', detalhe: 'Organizar um processo da empresa', mensagem: 'Olá, Gustavo! Vim pelo site e preciso de um sistema para a minha empresa.' },
  { valor: 'nao-sei', icone: 'duvida', nome: 'Ainda não sei', detalhe: 'Me conta o problema e a gente descobre junto', mensagem: 'Olá, Gustavo! Vim pelo site e ainda não sei bem o que preciso. Posso te contar o problema?' },
]

const escolhida = ref('site')
const linkEscolhido = computed(() => linkWhatsapp(OPCOES.find((o) => o.valor === escolhida.value).mensagem))
const whatsappGeral = linkWhatsapp('Olá, Gustavo! Vim pela página de contato do site.')

const raiz = ref(null)

useAnimacoes(raiz, ({ movimento, mesa }, el) => {
  if (!movimento) return

  gsap.from(el.querySelectorAll('.opcao'), { x: 40, autoAlpha: 0, duration: 0.6, stagger: 0.08, delay: 0.7, ease: 'power3.out' })
  if (mesa) gsap.from(el.querySelector('.notificacao'), { y: 50, rotation: -18, autoAlpha: 0, duration: 0.9, delay: 0.6, ease: 'back.out(1.6)' })

  const canais = el.querySelector('.canais')
  entrar(canais.querySelector('.canais__cabecalho').children, canais, { y: 50, stagger: 0.12 })
  canais.querySelectorAll('.canal').forEach((c, i) => {
    gsap.from(c, {
      y: -90, rotation: (i % 2 ? 1 : -1) * 14, autoAlpha: 0, duration: 0.9, delay: i * 0.14, ease: 'back.out(1.4)',
      scrollTrigger: { trigger: canais.querySelector('.canais__lista'), start: 'top 85%', once: true },
    })
  })
})

const canonica = urlCanonica('/contato')
const TITULO = 'Contato'
const DESCRICAO = 'Fale direto com quem desenha e programa: WhatsApp (11) 96620-6588 ou Instagram @devbygusta. Atendimento online para todo o Brasil, sem formulário longo.'

useHead({
  title: TITULO,
  link: [{ rel: 'canonical', href: canonica }],
  meta: [
    { name: 'description', content: DESCRICAO },
    { property: 'og:title', content: `${TITULO} | ${SITE_NOME}` },
    { property: 'og:description', content: DESCRICAO },
    { property: 'og:url', content: canonica },
    { name: 'twitter:title', content: `${TITULO} | ${SITE_NOME}` },
    { name: 'twitter:description', content: DESCRICAO },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Início', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: TITULO, item: canonica },
            ],
          },
          {
            '@type': 'ContactPage',
            '@id': `${canonica}#pagina`,
            url: canonica,
            name: `${TITULO} | ${SITE_NOME}`,
            description: DESCRICAO,
            inLanguage: 'pt-BR',
            isPartOf: { '@id': ID_SITE },
            about: { '@id': ID_ORGANIZACAO },
            mainEntity: {
              '@type': 'ContactPoint',
              contactType: 'sales',
              telephone: TELEFONE,
              email: EMAIL,
              availableLanguage: ['Portuguese'],
              areaServed: 'BR',
            },
          },
        ],
      }),
    },
  ],
})
</script>

<style scoped lang="sass">
.pagina-contato
  background: var(--gelo)

// notificação ao lado do texto, como no Figma
.notificacao
  display: flex
  gap: 12px
  align-items: flex-start
  padding: 16px 22px 16px 16px
  border: 1.5px solid rgba(255, 255, 255, 0.55)
  border-radius: 22px
  background: rgba(255, 255, 255, 0.22)
  backdrop-filter: blur(12px)
  -webkit-backdrop-filter: blur(12px)
  box-shadow: 0 18px 36px rgba(5, 13, 64, 0.3)
  font-family: var(--figtree)
  font-weight: 500
  font-size: 15px
  line-height: 1.35
  white-space: nowrap
  transform: rotate(4deg)

  &__app
    display: flex
    align-items: center
    justify-content: center
    width: 44px
    height: 44px
    flex-shrink: 0
    border-radius: 12px
    background: #25D366

    svg
      width: 24px
      height: 24px

  &__corpo
    display: flex
    flex-direction: column
    gap: 4px

  &__topo
    font-size: 13px
    color: rgba(255, 255, 255, 0.7)

    b
      margin-right: 8px
      font-weight: 700
      font-size: 14px
      color: #fff

// ===== escolha =====
.escolha
  padding: 30px 28px 28px
  border: 3px solid var(--abismo)
  border-radius: 28px
  background: #fff
  box-shadow: 0 30px 60px rgba(2, 7, 21, 0.4)
  font-family: var(--figtree)
  color: var(--abismo)
  transform: rotate(-2deg)

  &__grupo
    display: flex
    flex-direction: column
    gap: 10px
    margin: 0
    padding: 0
    border: 0

  &__titulo
    margin-bottom: 18px
    padding: 0
    font-weight: 700
    font-size: 26px
    letter-spacing: -0.01em

  &__enviar
    width: 100%
    margin-top: 18px

.opcao
  position: relative
  display: flex
  align-items: center
  gap: 14px
  padding: 14px 16px
  border: 2px solid transparent
  border-radius: 18px
  background: var(--gelo)
  cursor: pointer
  transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease

  &:hover
    border-color: rgba(10, 78, 112, 0.35)

  // o input fica por cima de tudo, invisível: clique e teclado funcionam nele
  &__radio
    position: absolute
    inset: 0
    width: 100%
    height: 100%
    margin: 0
    opacity: 0
    cursor: pointer

  &:has(.opcao__radio:focus-visible)
    outline: 2px solid var(--azul-eletrico)
    outline-offset: 2px

  &__icone
    display: flex
    align-items: center
    justify-content: center
    width: 40px
    height: 40px
    flex-shrink: 0
    border-radius: 12px
    background: rgba(10, 78, 112, 0.1)
    color: var(--petroleo)

    svg
      width: 20px
      height: 20px

  &__texto
    display: flex
    flex-direction: column
    gap: 2px
    flex: 1

  &__nome
    font-weight: 700
    font-size: 17px

  &__detalhe
    font-size: 13px
    color: var(--texto-apagado)

  &__marca
    width: 22px
    height: 22px
    flex-shrink: 0
    border: 2px solid var(--abismo)
    border-radius: 50%
    background: #fff

  &--marcada
    border-color: var(--abismo)
    background: var(--petroleo)
    color: #fff

    .opcao__icone
      background: rgba(255, 255, 255, 0.16)
      color: #fff

    .opcao__detalhe
      color: rgba(255, 255, 255, 0.75)

    .opcao__marca
      border-color: #fff
      background: var(--ciano)
      box-shadow: inset 0 0 0 4px var(--petroleo)

// ===== canais =====
.canais
  padding: 100px 0 130px
  background-color: var(--gelo)

  &__cabecalho
    margin-bottom: 56px

    .v2-titulo
      font-size: clamp(36px, 4.6vw, 66px)

  &__lista
    display: grid
    grid-template-columns: repeat(3, minmax(0, 1fr))
    gap: 32px
    margin: 0
    padding: 0
    list-style: none

.canal
  &:nth-child(1)
    --giro: 2deg

  &:nth-child(2)
    --giro: -1.5deg

  &:nth-child(3)
    --giro: 1deg

  &__area
    display: flex
    flex-direction: column
    gap: 6px
    height: 100%
    padding: 28px 28px 30px
    border: 3px solid var(--abismo)
    border-radius: 24px
    box-shadow: 0 20px 40px rgba(2, 7, 21, 0.16)
    font-family: var(--figtree)
    text-decoration: none
    transform: rotate(var(--giro))
    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)

    > svg
      width: 28px
      height: 28px
      margin-bottom: 10px

  a.canal__area:hover
    transform: rotate(0deg) translateY(-6px)

  a.canal__area:focus-visible
    outline: 2px solid var(--petroleo)
    outline-offset: 4px

  &--ciano &__area
    background: var(--ciano)
    color: var(--abismo)

  &--petroleo &__area
    background: var(--petroleo)
    color: #fff

  &--abismo &__area
    background: var(--abismo)
    color: #fff

  &__rotulo
    font-weight: 700
    font-size: 12px
    letter-spacing: 0.16em
    text-transform: uppercase
    opacity: 0.75

  &__valor
    font-weight: 900
    font-size: clamp(22px, 2vw, 28px)
    letter-spacing: -0.01em

  &__texto
    margin-top: 6px
    font-size: 15px
    line-height: 1.5
    opacity: 0.85

@media (max-width: 1000px)
  .canais__lista
    grid-template-columns: 1fr
    max-width: 520px

  .escolha
    max-width: 520px
    transform: none

@media (max-width: 760px)
  .canais
    padding: 72px 0 90px

  .escolha
    padding: 24px 18px 20px

  .canal__area
    transform: rotate(calc(var(--giro) / 2))
</style>
