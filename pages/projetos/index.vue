<template>
  <main id="tela" class="pagina-projetos">
    <V2Topo
      rotulo="Projetos"
      linha1="Cada projeto aqui"
      linha2="está rodando."
      texto="De landing page a sistema sob medida. Tudo desenhado e escrito do zero, sem template, e entregue no nome do cliente."
      adesivo="● No ar agora"
      figurinha
    />

    <DivisorArco :topo="MARINHO" :base="ABISMO" />

    <section ref="raiz" class="lista v2-grade-escura" aria-label="Todos os projetos">
      <div class="v2-conteudo">
        <div class="filtros" role="group" aria-label="Filtrar por tipo de projeto">
          <button
            v-for="filtro in FILTROS"
            :key="filtro.valor"
            type="button"
            class="filtros__opcao"
            :class="{ 'filtros__opcao--ativa': ativo === filtro.valor }"
            :aria-pressed="ativo === filtro.valor"
            @click="filtrar(filtro.valor)"
          >
            {{ filtro.rotulo }}
            <span class="filtros__conta">{{ contar(filtro.valor) }}</span>
          </button>
        </div>

        <ul class="lista__grade">
          <li v-for="projeto in visiveis" :key="projeto.id" class="lista__item">
            <V2CardProjeto :projeto="projeto" />
          </li>
        </ul>
      </div>
    </section>

    <DivisorArco :topo="ABISMO" :base="MARINHO" />
    <HomeChamada
      ancora="orcamento"
      linha1="Seu projeto pode"
      linha2="ser o próximo."
      mensagem="Olá! Vi os projetos no site e gostaria de um orçamento."
    />
    <DivisorArco :topo="MARINHO" :base="ABISMO" />
    <HomeRodape />
  </main>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import V2Topo from '~/components/pages/v2/V2Topo.vue'
import V2CardProjeto from '~/components/pages/v2/V2CardProjeto.vue'
import DivisorArco from '~/components/global/elementos/DivisorArco.vue'
import HomeChamada from '~/components/pages/home/HomeChamada.vue'
import HomeRodape from '~/components/pages/home/HomeRodape.vue'
import { PROJETOS as projetos } from '~/helpers/projetos'
import { SITE_URL, SITE_NOME, ID_ORGANIZACAO, ID_SITE, urlCanonica } from '~/helpers/site'
import { useAnimacoes } from '~/composables/useAnimacoes'

definePageMeta({ layout: false })

const MARINHO = '#021228'
const ABISMO = '#020715'

// ordem do Figma: um de cada tipo primeiro, depois o resto. Projeto novo que
// não estiver aqui entra no fim, sem sumir da página
const ORDEM = ['clinica-brenna-damasceno', 'gama-3d', 'qualifix', 'city-toys', 'jamilly-ferreira', 'conecta-contabil', 'toyz', 'astro', 'patas-felizes', 'nathalia-psi', 'laura-nutricionista', 'conectados']
const ordenados = [...projetos].sort((a, b) => {
  const pa = ORDEM.indexOf(a.slug)
  const pb = ORDEM.indexOf(b.slug)
  return (pa === -1 ? 99 : pa) - (pb === -1 ? 99 : pb)
})

const FILTROS = [
  { rotulo: 'Todos', valor: 'todos' },
  { rotulo: 'Landing page', valor: 'Landing page' },
  { rotulo: 'Site institucional', valor: 'Site institucional' },
  { rotulo: 'E-commerce', valor: 'E-commerce' },
  { rotulo: 'Sistema', valor: 'Sistema' },
]

const ativo = ref('todos')
const visiveis = computed(() =>
  ativo.value === 'todos' ? ordenados : ordenados.filter((p) => p.categoria === ativo.value)
)
const contar = (valor) => (valor === 'todos' ? projetos.length : projetos.filter((p) => p.categoria === valor).length)

const raiz = ref(null)
let animar = false

// troca de filtro: a grade nova entra em cascata. A altura da página muda,
// então os gatilhos de baixo (chamada, rodapé) precisam ser recalculados
async function filtrar(valor) {
  if (ativo.value === valor) return
  ativo.value = valor
  await nextTick()
  if (animar) {
    gsap.from(raiz.value.querySelectorAll('.lista__item'), { y: 30, autoAlpha: 0, duration: 0.5, stagger: 0.05, ease: 'power3.out' })
  }
  ScrollTrigger.refresh()
}

useAnimacoes(raiz, ({ movimento }, el) => {
  animar = movimento
  if (!movimento) return
  gsap.from(el.querySelectorAll('.filtros__opcao'), { y: 20, autoAlpha: 0, duration: 0.6, stagger: 0.06, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } })
  ScrollTrigger.batch(el.querySelectorAll('.lista__item'), {
    once: true,
    start: 'top 88%',
    onEnter: (itens) => gsap.from(itens, { y: 60, autoAlpha: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }),
  })
})

const canonica = urlCanonica('/projetos')

const TITULO = 'Portfólio de sites e sistemas'
const DESCRICAO =
  'Projetos de sites, landing pages e sistemas feitos do zero por Gustavo Bernardi. Veja o que foi entregue em cada um e o site funcionando.'

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
              { '@type': 'ListItem', position: 2, name: 'Projetos', item: canonica },
            ],
          },
          {
            '@type': 'CollectionPage',
            '@id': `${canonica}#pagina`,
            url: canonica,
            name: `${TITULO} | ${SITE_NOME}`,
            description: DESCRICAO,
            inLanguage: 'pt-BR',
            isPartOf: { '@id': ID_SITE },
            about: { '@id': ID_ORGANIZACAO },
            mainEntity: {
              '@type': 'ItemList',
              numberOfItems: projetos.length,
              itemListElement: projetos.map((projeto, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                item: {
                  '@type': 'CreativeWork',
                  name: projeto.nome,
                  url: projeto.slug ? urlCanonica(`/projetos/${projeto.slug}`) : projeto.site,
                  description: `${projeto.categoria} para ${projeto.setor.toLowerCase()}`,
                  image: SITE_URL + projeto.imagem,
                  creator: { '@id': ID_ORGANIZACAO },
                },
              })),
            },
          },
        ],
      }),
    },
  ],
})
</script>

<style scoped lang="sass">
.pagina-projetos
  background: var(--abismo)

.lista
  padding: 72px 0 120px
  background-color: var(--abismo)

  &__grade
    display: grid
    grid-template-columns: repeat(3, minmax(0, 1fr))
    gap: 56px 28px
    margin: 48px 0 0
    padding: 0
    list-style: none

.filtros
  display: flex
  flex-wrap: wrap
  gap: 10px

  &__opcao
    display: inline-flex
    align-items: center
    gap: 8px
    padding: 9px 16px
    border: 1px solid rgba(255, 255, 255, 0.35)
    border-radius: 999px
    background: none
    font-family: var(--figtree)
    font-weight: 600
    font-size: 14px
    color: #fff
    cursor: pointer
    transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease

    &:hover
      border-color: #fff

    &:focus-visible
      outline: 2px solid var(--ciano)
      outline-offset: 3px

    &--ativa
      border-color: #fff
      background: #fff
      color: var(--abismo)

  &__conta
    font-size: 12px
    opacity: 0.6

@media (max-width: 1100px)
  .lista__grade
    grid-template-columns: repeat(2, minmax(0, 1fr))

@media (max-width: 680px)
  .lista
    padding: 56px 0 90px

  .lista__grade
    grid-template-columns: 1fr
    gap: 44px
</style>
