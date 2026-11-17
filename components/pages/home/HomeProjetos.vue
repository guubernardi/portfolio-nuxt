<template>
  <section id="projetos" ref="raiz" class="projetos v2-grade-escura" aria-labelledby="projetos-titulo">
    <div class="v2-conteudo">
      <header class="projetos__cabecalho">
        <div>
          <p class="v2-rotulo v2-rotulo--escuro">Projetos</p>
          <h2 id="projetos-titulo" class="v2-titulo v2-titulo--claro">
            Projetos que já
            <em>estão no ar.</em>
          </h2>
        </div>
        <NuxtLink class="v2-botao v2-botao--contorno-suave" to="/projetos">
          Ver todos os projetos
          <span class="v2-botao__bolinha"><SvgIcone nome="seta-direita" /></span>
        </NuxtLink>
      </header>

      <ul class="projetos__grade">
        <li v-for="(projeto, i) in destaques" :key="projeto.slug" class="projeto">
          <NuxtLink class="projeto__link" :to="destinoDoProjeto(projeto)">
            <span class="projeto__print">
              <!-- width/height reais reservam a caixa antes do download (sem CLS) -->
              <img
                :src="projeto.imagem"
                :alt="`${projeto.nome}, ${projeto.categoria.toLowerCase()} no ar`"
                :width="projeto.largura"
                :height="projeto.altura"
                loading="lazy"
                decoding="async"
              />
              <span class="projeto__categoria">{{ projeto.categoria }}</span>
            </span>
            <span class="projeto__linha">
              <span class="projeto__nome">{{ projeto.nome }}</span>
              <span class="projeto__abrir" aria-hidden="true"><SvgIcone nome="seta-direita" /></span>
            </span>
            <span class="projeto__frase">{{ projeto.frase }}</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { gsap } from 'gsap'
import { projetoPorSlug, destinoDoProjeto } from '~/helpers/projetos'
import { useAnimacoes, entrar } from '~/composables/useAnimacoes'

const raiz = ref(null)

useAnimacoes(raiz, ({ movimento }, el) => {
  if (!movimento) return

  entrar(el.querySelector('.projetos__cabecalho').querySelectorAll('.v2-rotulo, .v2-titulo, .v2-botao'), el.querySelector('.projetos__cabecalho'), { y: 50, stagger: 0.12 })

  // o print abre de dentro pra fora e a imagem assenta; o clearProps devolve
  // o transform ao CSS pro zoom do hover voltar
  el.querySelectorAll('.projeto').forEach((projeto, i) => {
    const print = projeto.querySelector('.projeto__print')
    gsap.timeline({ scrollTrigger: { trigger: projeto, start: 'top 82%', once: true }, delay: (i % 2) * 0.15 })
      .fromTo(print, { clipPath: 'inset(14% 14% 14% 14% round 24px)', autoAlpha: 0 }, { clipPath: 'inset(0% 0% 0% 0% round 24px)', autoAlpha: 1, duration: 1.1, ease: 'power3.inOut', clearProps: 'clipPath' })
      .from(print.querySelector('img'), { scale: 1.25, duration: 1.4, ease: 'power3.out', clearProps: 'transform' }, 0)
      .from(print.querySelector('.projeto__categoria'), { y: -16, autoAlpha: 0, duration: 0.5 }, 0.7)
      .from(projeto.querySelectorAll('.projeto__linha, .projeto__frase'), { y: 24, autoAlpha: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' }, 0.5)
  })
})

// Um de cada tipo de serviço. A frase é o resultado do lado de quem contratou,
// tirada do case (helpers/projetos.js); o resto vem da própria lista.
const FRASES = {
  'clinica-brenna-damasceno': 'A paciente já chega decidida: a página indica a psicóloga certa e abre o WhatsApp com o nome dela.',
  'gama-3d': 'A venda saiu do direct: o cliente escolhe entre 94 cores, vê o frete e paga sozinho.',
  qualifix: 'A fábrica inteira no mesmo plano, no computador, no celular e na TV da reunião.',
  'city-toys': 'Orçamento a um toque em cada brinquedo e combo montado pelo cliente.',
}

const destaques = Object.entries(FRASES)
  .map(([slug, frase]) => {
    const projeto = projetoPorSlug(slug)
    return projeto ? { ...projeto, frase } : null
  })
  .filter(Boolean)
</script>

<style scoped lang="sass">
.projetos
  padding: 120px 0
  background-color: var(--abismo)
  color: #fff

  &__cabecalho
    display: flex
    flex-wrap: wrap
    align-items: flex-end
    justify-content: space-between
    gap: 28px
    margin-bottom: 64px

  &__grade
    display: grid
    grid-template-columns: repeat(2, minmax(0, 1fr))
    gap: 64px 32px
    margin: 0
    padding: 0
    list-style: none

.projeto
  font-family: var(--figtree)

  &__link
    display: flex
    flex-direction: column
    gap: 22px
    color: inherit
    text-decoration: none

  &__print
    position: relative
    display: block
    overflow: hidden
    aspect-ratio: 640 / 427
    border-radius: 24px
    background: var(--marinho)

    img
      display: block
      width: 100%
      height: 100%
      object-fit: cover
      transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)

  &__link:hover &__print img
    transform: scale(1.03)

  &__categoria
    position: absolute
    top: 20px
    left: 20px
    padding: 8px 14px
    border-radius: 999px
    background: #fff
    font-weight: 700
    font-size: 13px
    color: var(--abismo)

  &__linha
    display: flex
    align-items: center
    justify-content: space-between
    gap: 16px

  &__nome
    font-weight: 700
    font-size: clamp(24px, 2.1vw, 30px)
    letter-spacing: -0.01em

  &__abrir
    display: flex
    align-items: center
    justify-content: center
    width: 48px
    height: 48px
    flex-shrink: 0
    border: 1px solid rgba(255, 255, 255, 0.3)
    border-radius: 50%
    transition: background 0.3s ease, color 0.3s ease

    // a seta-direita girada 45° vira o ↗ do Figma
    svg
      width: 18px
      height: 18px
      transform: rotate(-45deg)

  &__link:hover &__abrir
    background: #fff
    color: var(--abismo)

  &__frase
    font-size: 17px
    line-height: 1.5
    color: var(--texto-apagado-escuro)

@media (max-width: 900px)
  .projetos
    padding: 80px 0

  .projetos__grade
    grid-template-columns: 1fr
    gap: 48px
</style>
