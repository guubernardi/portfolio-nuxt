<template>
  <section id="faq" ref="raiz" class="faq v2-grade-clara" aria-labelledby="faq-titulo">
    <div class="faq__grade v2-conteudo">
      <div class="faq__lado">
        <header class="faq__cabecalho">
          <p class="v2-rotulo">{{ rotulo }}</p>
          <h2 id="faq-titulo" class="v2-titulo faq__titulo">
            O que perguntam<br />
            antes de <span>começar.</span>
          </h2>
        </header>

        <div class="faq__nao-achou">
          <div class="nao-achou">
            <p class="nao-achou__titulo">Ficou alguma dúvida?</p>
            <p class="nao-achou__texto">Me chama e eu respondo<br />pessoalmente, sem robô.</p>
            <a class="v2-botao v2-botao--ciano" :href="whatsapp" target="_blank" rel="noopener">
              <SvgIcone nome="whatsapp" />
              Chamar no WhatsApp
            </a>
          </div>
        </div>
      </div>

      <ul class="perguntas">
        <li
          v-for="(item, i) in perguntas"
          :key="item.pergunta"
          class="pergunta"
          :class="{ 'pergunta--aberta': aberta === i }"
        >
          <button
            :id="`faq-gatilho-${i}`"
            class="pergunta__gatilho"
            type="button"
            :aria-expanded="aberta === i"
            :aria-controls="`faq-resposta-${i}`"
            @click="alternar(i)"
          >
            <span>{{ item.pergunta }}</span>
            <span class="pergunta__sinal" aria-hidden="true"><SvgIcone nome="mais" /></span>
          </button>
          <div :id="`faq-resposta-${i}`" class="pergunta__corpo" role="region" :aria-labelledby="`faq-gatilho-${i}`">
            <div class="pergunta__corpo-interno">
              <p>{{ item.resposta }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { gsap } from 'gsap'
import { linkWhatsapp } from '~/helpers/site'
import { useAnimacoes, entrar } from '~/composables/useAnimacoes'

const raiz = ref(null)

useAnimacoes(raiz, ({ movimento }, el) => {
  if (!movimento) return
  entrar(el.querySelector('.faq__cabecalho').children, el, { y: 50, stagger: 0.12, start: 'top 72%' })
  gsap.from(el.querySelector('.nao-achou'), {
    y: 70, rotation: -12, autoAlpha: 0, duration: 1, ease: 'back.out(1.5)',
    scrollTrigger: { trigger: el, start: 'top 60%', once: true },
  })
  // as perguntas deslizam da direita, uma atrás da outra
  entrar(el.querySelectorAll('.pergunta'), el.querySelector('.perguntas'), { x: 60, y: 0, duration: 0.7, stagger: 0.09 })
})

const whatsapp = linkWhatsapp('Olá, Gustavo! Vim pelo site e fiquei com uma dúvida.')
const aberta = ref(0)

// A home usa as perguntas daqui; as páginas de serviço passam as do nicho.
// Lá o FAQPage já sai no grafo da própria página, então o daqui é desligado.
const props = defineProps({
  rotulo: { type: String, default: 'Dúvidas' },
  itens: { type: Array, default: null },
  estruturado: { type: Boolean, default: true },
})

const PADRAO = [
  {
    pergunta: 'E se eu não gostar do layout?',
    resposta: 'O layout é aprovado antes de virar código, justamente para isso não acontecer. Nessa fase os ajustes são rápidos e fazem parte do processo.',
  },
  {
    pergunta: 'Preciso ter texto e imagem prontos para começar?',
    resposta: 'Não. Dá para começar com o que você tem e ir preenchendo junto. O que ajuda muito é chegar sabendo o que você quer que o visitante faça no site, seja pedir orçamento, comprar ou agendar. O resto eu organizo no caminho.',
  },
  {
    pergunta: 'Quem cuida da hospedagem e do domínio?',
    resposta: 'A configuração fica comigo e as contas ficam no seu nome, com você como dono dos acessos. Se um dia quiser levar o projeto para outro lugar, você leva, sem depender de ninguém para liberar nada.',
  },
  {
    pergunta: 'E depois que o site entra no ar?',
    resposta: 'Você não fica sozinho. Acompanho o período logo após o lançamento para corrigir qualquer coisa que apareça no uso real. Ajustes e evoluções depois disso são combinados à parte, do jeito que fizer sentido para o seu momento.',
  },
  {
    pergunta: 'Já tenho um site. Dá para refazer?',
    resposta: 'Dá, e é bem comum. Refaço mantendo o que já funciona e o endereço que seus clientes conhecem, sem perder o que você construiu de busca. Se o conteúdo atual estiver bom, ele é aproveitado em vez de jogado fora.',
  },
]

const perguntas = props.itens || PADRAO

function alternar(i) {
  aberta.value = aberta.value === i ? -1 : i
}

// FAQPage: é o formato que buscadores e IAs leem para citar a resposta
if (props.estruturado) useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: perguntas.map((p) => ({
          '@type': 'Question',
          name: p.pergunta,
          acceptedAnswer: { '@type': 'Answer', text: p.resposta },
        })),
      }),
    },
  ],
})
</script>

<style scoped lang="sass">
.faq
  padding: 120px 0 130px
  background-color: var(--gelo)

  &__grade
    display: grid
    grid-template-columns: minmax(0, 1fr) 620px
    gap: 48px
    align-items: start

  &__titulo
    font-size: clamp(38px, 4.2vw, 60px)

    span
      color: var(--petroleo)

.nao-achou
  display: inline-flex
  flex-direction: column
  gap: 16px
  margin-top: 56px
  padding: 28px
  border: 3px solid var(--abismo)
  border-radius: 24px
  background: var(--abismo)
  color: #fff
  font-family: var(--figtree)
  transform: rotate(3deg)

  &__titulo
    margin: 0
    font-weight: 700
    font-size: 24px

  &__texto
    margin: 0
    font-size: 16px
    line-height: 1.5
    color: #B8C0D0

.perguntas
  display: flex
  flex-direction: column
  gap: 14px
  margin: 0
  padding: 0
  list-style: none

.pergunta
  border: 1px solid rgba(2, 7, 21, 0.12)
  border-radius: 22px
  background: #fff
  font-family: var(--figtree)
  transition: border-color 0.3s ease, box-shadow 0.3s ease

  &--aberta
    border: 3px solid var(--abismo)
    box-shadow: 0 14px 30px rgba(13, 15, 31, 0.12)

  &__gatilho
    display: flex
    align-items: center
    justify-content: space-between
    gap: 16px
    width: 100%
    padding: 24px 28px
    border: 0
    background: none
    font-family: inherit
    font-weight: 700
    font-size: clamp(17px, 1.4vw, 20px)
    letter-spacing: -0.01em
    text-align: left
    color: var(--abismo)
    cursor: pointer

    &:focus-visible
      outline: 2px solid var(--petroleo)
      outline-offset: -4px
      border-radius: 20px

  // aberta: compensa os 2px a mais da borda pra a pergunta não pular
  &--aberta &__gatilho
    padding: 22px 26px

  &__sinal
    display: flex
    align-items: center
    justify-content: center
    width: 40px
    height: 40px
    flex-shrink: 0
    border-radius: 50%
    background: var(--gelo)
    color: var(--abismo)
    transition: background 0.3s ease, color 0.3s ease, transform 0.3s ease

    svg
      width: 16px
      height: 16px

  // o "+" gira 45° e vira "x"
  &--aberta &__sinal
    background: var(--petroleo)
    color: #fff
    transform: rotate(45deg)

  // abre por grid-template-rows: anima a altura sem medir com JS
  &__corpo
    display: grid
    grid-template-rows: 0fr
    transition: grid-template-rows 0.35s ease

  &--aberta &__corpo
    grid-template-rows: 1fr

  &__corpo-interno
    overflow: hidden

    p
      margin: 0
      padding: 0 26px 24px
      font-size: 17px
      line-height: 1.55
      color: var(--texto-apagado)

@media (max-width: 1100px)
  .faq__grade
    grid-template-columns: 1fr

  .nao-achou
    margin-top: 36px

@media (max-width: 760px)
  .faq
    padding: 80px 0 90px

  .nao-achou
    display: flex
    transform: none

    .v2-botao
      width: 100%

  .pergunta__gatilho
    padding: 20px

  .pergunta--aberta .pergunta__gatilho
    padding: 18px

  .pergunta__corpo-interno p
    padding: 0 18px 20px
</style>
