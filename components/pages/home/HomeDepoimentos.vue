<template>
  <section id="depoimentos" ref="raiz" class="depoimentos v2-grade-clara" aria-labelledby="depoimentos-titulo">
    <div class="depoimentos__palco">
      <header class="depoimentos__cabecalho">
        <div>
          <p class="v2-rotulo">Depoimentos</p>
          <h2 id="depoimentos-titulo" class="v2-titulo">
            Quem já recebeu
            <em>conta como foi.</em>
          </h2>
        </div>
        <p class="depoimentos__sub">
          Prazo cumprido, conversa direta e um site que<br class="quebra" />
          o cliente consegue usar no dia seguinte.
        </p>
      </header>

      <ul class="recados">
        <li v-for="(item, i) in depoimentos" :key="item.nome" class="recado-posicao" :class="`recado-posicao--${item.id}`">
          <div class="recado__entrada">
            <figure class="recado" :class="`recado--${item.estilo}`">
              <span class="recado__fita" aria-hidden="true" />
              <span class="recado__aspas" aria-hidden="true">“</span>
              <blockquote class="recado__texto">{{ item.texto }}</blockquote>
              <figcaption class="recado__autor">
                <span class="recado__avatar" aria-hidden="true">{{ item.iniciais }}</span>
                <span class="recado__dados">
                  <strong>{{ item.nome }}</strong>
                  <span>
                    {{ item.cargo }}
                    <a v-if="item.site" :href="item.site" target="_blank" rel="noopener">{{ item.empresa }}</a>
                  </span>
                </span>
              </figcaption>
            </figure>
          </div>
        </li>
      </ul>

      <span class="figurinha-aspas" aria-hidden="true">“</span>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { gsap } from 'gsap'
import { useAnimacoes, entrar } from '~/composables/useAnimacoes'

const raiz = ref(null)

useAnimacoes(raiz, ({ movimento, mesa }, el) => {
  if (!movimento) return

  entrar(el.querySelector('.depoimentos__cabecalho').querySelectorAll('.v2-rotulo, .v2-titulo, .depoimentos__sub'), el, { y: 50, stagger: 0.12, start: 'top 70%' })

  // os bilhetes caem girando, um de cada vez, e a fita cola por último
  el.querySelectorAll('.recado-posicao').forEach((posicao, i) => {
    const sentido = i % 2 ? 1 : -1
    gsap.timeline({ scrollTrigger: { trigger: posicao, start: 'top 88%', once: true }, delay: mesa ? i * 0.18 : 0 })
      .from(posicao.querySelector('.recado__entrada'), { y: -110, autoAlpha: 0, rotation: 14 * sentido, duration: 1, ease: 'back.out(1.3)' })
      .from(posicao.querySelector('.recado__fita'), { scaleX: 0, autoAlpha: 0, duration: 0.45, ease: 'power2.out' }, 0.7)
  })

  if (!mesa) return

  const aspas = el.querySelector('.figurinha-aspas')
  const boia = gsap.to(aspas, { y: -14, rotation: '+=6', duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: -1, paused: true })
  gsap.from(aspas, {
    scale: 0, rotation: -60, duration: 0.9, ease: 'back.out(2)',
    scrollTrigger: { trigger: aspas, start: 'top 90%', once: true },
    onComplete: () => boia.play(),
  })
})

// Depoimentos reais (Brenna, Anderson, Jamilly e Guilherme), na versão revisada
// que eles aprovaram; o do Guilherme está no recorte usado no Figma da V2.
// `cargo` termina na preposição porque a empresa vem em seguida, como link.
const depoimentos = [
  {
    id: 'brenna',
    estilo: 'branco',
    nome: 'Brenna Damasceno',
    iniciais: 'BD',
    cargo: 'Fundadora da',
    empresa: 'Clínica Brenna Damasceno',
    site: 'https://clinicabrennadamasceno.com.br/',
    texto: 'Superou minhas expectativas. Antes, eu tinha um site amador, feito por mim mesma, com sérios erros de design. Contratar você foi o meu melhor investimento, e com certeza vou te indicar para os meus conhecidos.',
  },
  {
    id: 'anderson',
    estilo: 'ciano',
    nome: 'Anderson',
    iniciais: 'A',
    cargo: '',
    empresa: 'Gama 3D',
    site: 'https://gama3d.com.br/',
    texto: 'Meu e‑commerce ficou surreal. Que trabalho incrível, parabéns! A loja virou referência no ramo 3D.',
  },
  {
    id: 'jamilly',
    estilo: 'petroleo',
    nome: 'Jamilly Ferreira',
    iniciais: 'JF',
    cargo: '',
    empresa: 'Psicóloga',
    site: 'https://www.jamillyferreirapsicologa.com.br/',
    texto: 'Eu não tinha a menor ideia do que queria, e você chegou com um design pronto e totalmente personalizado para mim, além de um link de bio também personalizado. O resultado ficou excelente.',
  },
  {
    id: 'guilherme',
    estilo: 'abismo',
    nome: 'Guilherme Pessin',
    iniciais: 'GP',
    cargo: 'Gerente da',
    empresa: 'City Toys',
    site: 'https://www.citytoysbrinquedos.com/',
    texto: 'Sendo bem sincero, o site superou as expectativas. Eu adorei, e meu pai também gostou muito. Até pessoas do setor vieram comentar sobre ele. Está de parabéns, o resultado ficou excelente.',
  },
]
</script>

<style scoped lang="sass">
.depoimentos
  position: relative
  overflow: hidden
  background-color: var(--gelo)

  // palco de 1440x1177 com as posições do Figma
  &__palco
    position: relative
    max-width: 1440px
    height: 1177px
    margin: 0 auto
    padding: 100px 64px 0

  &__cabecalho
    display: flex
    flex-wrap: wrap
    align-items: flex-start
    justify-content: space-between
    gap: 24px

  &__sub
    width: 410px
    margin: 96px 64px 0 0
    font-family: var(--figtree)
    font-size: 18px
    line-height: 1.5
    color: var(--texto-apagado)

.recados
  margin: 0
  padding: 0
  list-style: none

.recado-posicao
  position: absolute

  &--brenna
    top: 410px
    left: 54px
    width: 400px
    --giro: 3deg
    --fita: var(--ciano)

  &--anderson
    top: 370px
    left: 549px
    width: 360px
    --giro: -4deg
    --fita: rgba(255, 255, 255, 0.85)

  &--jamilly
    top: 430px
    left: 969px
    width: 400px
    --giro: 2deg
    --fita: var(--ciano)

  &--guilherme
    top: 734px
    left: 455px
    width: 520px
    --giro: -2deg
    --fita: var(--ciano)

.recado
  position: relative
  display: flex
  flex-direction: column
  gap: 20px
  margin: 0
  padding: 28px 32px
  border: 3px solid var(--abismo)
  border-radius: 24px
  box-shadow: 0 20px 40px rgba(13, 15, 31, 0.16)
  font-family: var(--figtree)
  transform: rotate(var(--giro))

  &--branco
    background: #fff
    color: var(--abismo)

  &--ciano
    background: var(--ciano)
    color: var(--abismo)

  &--petroleo
    background: var(--petroleo)
    color: #fff

  &--abismo
    background: var(--abismo)
    color: #fff

  // a fita adesiva que "cola" o recado na parede
  &__fita
    position: absolute
    top: -16px
    left: 50%
    width: 96px
    height: 28px
    background: var(--fita)
    opacity: 0.85
    transform: translateX(-50%) rotate(5deg)

  &__aspas
    height: 30px
    font-weight: 900
    font-size: 72px
    line-height: 0.75
    color: var(--azul-eletrico)

  &--ciano &__aspas
    color: var(--abismo)

  &--petroleo &__aspas, &--abismo &__aspas
    color: var(--ciano)

  &__texto
    margin: 0
    font-weight: 500
    font-size: 19px
    line-height: 1.45

  &__autor
    display: flex
    align-items: center
    gap: 12px

  &__avatar
    display: flex
    align-items: center
    justify-content: center
    width: 48px
    height: 48px
    flex-shrink: 0
    border-radius: 50%
    background: var(--abismo)
    font-weight: 800
    font-size: 16px
    color: #fff

  &--abismo &__avatar
    background: #fff
    color: var(--abismo)

  &__dados
    display: flex
    flex-direction: column
    gap: 2px

    strong
      font-weight: 700
      font-size: 17px

    span
      font-size: 14px
      opacity: 0.75

    a
      color: inherit
      text-decoration: underline
      text-underline-offset: 3px

.figurinha-aspas
  position: absolute
  top: 829px
  left: 1140px
  display: flex
  align-items: center
  justify-content: center
  width: 110px
  height: 110px
  padding-top: 34px
  border: 3px solid var(--abismo)
  border-radius: 50%
  background: var(--petroleo)
  font-family: var(--figtree)
  font-weight: 900
  font-size: 96px
  line-height: 0.7
  color: #fff
  transform: rotate(10deg)

// ===== tela menor: os recados viram uma coluna de bilhetes =====
@media (max-width: 1400px)
  .depoimentos__palco
    height: auto
    padding: 100px 40px 110px

  .depoimentos__sub
    margin: 0

  .figurinha-aspas
    display: none

  .recados
    display: grid
    grid-template-columns: repeat(2, minmax(0, 1fr))
    gap: 48px 40px
    max-width: 900px
    margin: 72px auto 0

  .recado-posicao
    position: relative
    top: auto
    left: auto
    width: auto

@media (max-width: 760px)
  .depoimentos__palco
    padding: 80px 20px 90px

  .depoimentos__sub
    width: auto

    .quebra
      display: none

  .recados
    grid-template-columns: 1fr
    gap: 40px
    margin-top: 48px

  .recado
    padding: 24px 22px
    transform: rotate(calc(var(--giro) / 2))

  .recado__texto
    font-size: 17px
</style>
