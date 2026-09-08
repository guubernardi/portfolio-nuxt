<template>
  <main class="case-pagina">
    <div class="luz" aria-hidden="true">
      <span class="luz__nucleo"></span>
      <span class="luz__feixe"></span>
    </div>

    <NavTopo />

    <div class="voltar-caixa">
      <NuxtLink to="/projetos" class="voltar">
        <span class="voltar__circulo" aria-hidden="true">
          <SvgIcone nome="seta-direita" />
        </span>
        Projetos
      </NuxtLink>
    </div>

    <section class="abertura">
      <div class="abertura__texto">
        <span class="abertura__etiqueta">
          <b>{{ projeto.nome }}</b>
          <span aria-hidden="true">·</span>
          {{ projeto.demonstracao ? 'Nutrição' : 'Case' }}
        </span>

        <!-- Projeto de demonstração precisa dizer que é, e em cima, não numa
             nota de rodapé. Passar demo por trabalho contratado desmonta na
             primeira pergunta, e é o portfólio inteiro que perde. -->
        <p v-if="projeto.demonstracao" class="aviso-demo">
          Este eu fiz por conta própria, para ter um exemplo do nicho no portfólio. Não foi
          trabalho contratado, e os dados da página são fictícios.
        </p>

        <h1 class="abertura__titulo">{{ projeto.nome }}</h1>
        <p class="abertura__resumo">{{ projeto.resumo }}</p>

        <div class="abertura__acoes">
          <a class="acao acao--primaria" :href="projeto.site" target="_blank" rel="noopener">
            Ver no ar
            <SvgIcone nome="mundo" />
          </a>
          <a class="acao acao--secundaria" :href="linkWhatsapp" target="_blank" rel="noopener">
            Quero algo assim
          </a>
        </div>
      </div>

      <!-- ficha ao lado do título: os dados objetivos do projeto ficam legíveis
           de relance, sem competir com o texto -->
      <aside class="ficha" aria-label="Dados do projeto">
        <div v-for="linha in projeto.ficha" :key="linha.rotulo" class="ficha__linha">
          <span class="ficha__rotulo">{{ linha.rotulo }}</span>
          <span class="ficha__valor">{{ linha.valor }}</span>
        </div>
      </aside>
    </section>

    <section class="bloco">
      <span class="bloco__rotulo"><b>01</b> O contexto</span>
      <h2 class="bloco__titulo">
        Qual era o problema<br />
        <span class="bloco__titulo--leve">antes {{ artigo }} existir.</span>
      </h2>
      <p class="bloco__texto">{{ projeto.contexto }}</p>

      <ul class="numeros">
        <li v-for="n in projeto.numeros" :key="n.rotulo" class="numero">
          <span class="numero__valor">
            {{ n.valor }}<i v-if="n.unidade">{{ n.unidade }}</i>
          </span>
          <span class="numero__rotulo">{{ n.rotulo }}</span>
        </li>
      </ul>
    </section>

    <!-- sem capturas, a seção inteira sai: título sobre galeria vazia é pior
         que não ter a seção -->
    <section v-if="projeto.galeria?.length" class="bloco">
      <span class="bloco__rotulo"><b>02</b> A interface</span>
      <h2 class="bloco__titulo">
        Cada tela, <span class="bloco__titulo--leve">no detalhe.</span>
      </h2>

      <div class="galeria">
        <figure
          v-for="tela in projeto.galeria"
          :key="tela.src"
          class="tela"
          :class="`tela--${tela.tipo}`"
        >
          <!-- moldura desenhada em CSS: nao carrega imagem de mockup -->
          <div class="aparelho" :style="{ '--percorrer': percorrer(tela) }">
            <div class="aparelho__corpo">
              <span v-if="tela.tipo === 'iphone'" class="aparelho__ilha" aria-hidden="true"></span>
              <div class="tela__janela" tabindex="0">
                <img
                  :src="tela.src"
                  :alt="tela.alt"
                  :width="tela.largura"
                  :height="tela.altura"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
            <span v-if="tela.tipo === 'mac'" class="aparelho__base" aria-hidden="true"></span>
          </div>

          <figcaption>{{ tela.rotulo }}</figcaption>
        </figure>
      </div>

      <a class="galeria__link" :href="projeto.site" target="_blank" rel="noopener">
        {{ dominioDoSite }}
        <SvgIcone nome="seta-direita" />
      </a>
    </section>

    <section class="bloco">
      <span class="bloco__rotulo"><b>03</b> O que foi feito</span>
      <h2 class="bloco__titulo">
        As decisões que<br />
        <span class="bloco__titulo--leve">sustentam {{ artigo }}.</span>
      </h2>

      <ol class="decisoes">
        <li v-for="(decisao, i) in projeto.decisoes" :key="decisao.titulo" class="decisao">
          <span class="decisao__numero">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3 class="decisao__titulo">{{ decisao.titulo }}</h3>
          <p class="decisao__texto">{{ decisao.texto }}</p>
        </li>
      </ol>
    </section>

    <section class="bloco">
      <span class="bloco__rotulo"><b>04</b> A entrega</span>
      <h2 class="bloco__titulo">
        O que ficou <span class="bloco__titulo--leve">pronto.</span>
      </h2>

      <ul class="lista">
        <li v-for="item in projeto.entregas" :key="item">
          <SvgIcone nome="check" cor="#46e08a" :tamanho="20" />
          {{ item }}
        </li>
      </ul>
    </section>

    <section class="fecho">
      <h2 class="fecho__titulo">
        Seu projeto pode<br />
        <span class="fecho__titulo--leve">ser o próximo.</span>
      </h2>
      <p class="fecho__texto">
        Manda uma mensagem contando o que você precisa. Sem formulário longo e sem compromisso.
      </p>
      <div class="fecho__acoes">
        <a class="acao acao--primaria" :href="linkWhatsapp" target="_blank" rel="noopener">
          Chamar no WhatsApp
          <SvgIcone nome="whatsapp" />
        </a>
        <NuxtLink v-if="paginaDoServico" :to="paginaDoServico" class="acao acao--secundaria">
          Quero um site assim
        </NuxtLink>
        <NuxtLink v-else to="/projetos" class="acao acao--secundaria">Ver todos os projetos</NuxtLink>
      </div>
    </section>

    <section v-if="outros.length" class="bloco bloco--outros">
      <h2 class="bloco__titulo bloco__titulo--menor">Veja outros projetos</h2>

      <ul class="outros">
        <li v-for="outro in outros" :key="outro.id" class="outro">
          <a
            class="outro__area"
            :href="destinoDoProjeto(outro)"
            :target="outro.slug ? null : '_blank'"
            :rel="outro.slug ? null : 'noopener'"
          >
            <img
              :src="outro.imagem"
              :alt="`${outro.nome}, ${outro.categoria.toLowerCase()} para ${outro.setor.toLowerCase()}`"
              :width="outro.largura"
              :height="outro.altura"
              loading="lazy"
              decoding="async"
            />
            <span class="outro__nome">{{ outro.nome }}</span>
            <span class="outro__tag" :class="{ 'outro__tag--proprio': outro.demonstracao }">
              {{ outro.demonstracao ? 'Nutrição' : outro.categoria }}
            </span>
          </a>
        </li>
      </ul>
    </section>

    <footer class="rodape">
      <NuxtLink to="/" class="rodape__marca">
        <Svgs nome="logo" />
        Gustavo Bernardi
      </NuxtLink>
      <span class="rodape__copy">© {{ ano }} Todos os direitos reservados.</span>
    </footer>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import Svgs from '~/components/global/svgs/Svgs.vue'
import { servicoDoSetor } from '~/helpers/servicos'
import { PROJETOS, projetoPorSlug, destinoDoProjeto } from '~/helpers/projetos'
import { SITE_URL, SITE_NOME, ID_ORGANIZACAO, ID_SITE, urlCanonica } from '~/helpers/site'

// sem layout: o `default` traz uma Nav que não combina com a página de case,
// que tem cabeçalho próprio e enxuto
definePageMeta({ layout: false })

const route = useRoute()
const projeto = projetoPorSlug(route.params.slug)

// slug inexistente precisa devolver 404 de verdade, senão a rota responde 200
// com página vazia e o Google indexa um caso que não existe
if (!projeto) {
  throw createError({ statusCode: 404, statusMessage: 'Projeto não encontrado', fatal: true })
}

// sistema nao e pagina: os titulos das secoes acompanham o tipo do projeto
const artigo = projeto.categoria.toLowerCase().includes('sistema') ? 'o sistema' : 'a página'

// quando existe pagina de servico para o nicho deste case, o fecho leva para
// ela em vez de devolver para a listagem
// o caminho de volta para a página do nicho. Quem chegou no case por busca de
// projeto encontra aqui a página de quem vende o serviço, e é esse vai e volta
// que junta as páginas num grupo sobre o mesmo assunto em vez de páginas soltas
const servicoDoNicho = servicoDoSetor(projeto.setor)
const paginaDoServico = servicoDoNicho ? `/${servicoDoNicho.slug}` : null

const ano = new Date().getFullYear()
const outros = PROJETOS.filter((p) => p.id !== projeto.id).slice(0, 3)

const linkWhatsapp =
  'https://wa.me/5511966206588?text=' +
  encodeURIComponent(
    `Olá! Vi o projeto da ${projeto.nome} no site e gostaria de um orçamento para algo parecido.`
  )

// quanto da imagem falta percorrer, em % dela mesma: (altura - quadro) / altura.
// o quadro tem a proporcao do aparelho, entao isso independe do tamanho da tela
function percorrer(tela) {
  const proporcaoImagem = tela.altura / tela.largura
  const proporcaoQuadro = tela.tipo === 'mac' ? 10 / 16 : 852 / 393
  return ((1 - proporcaoQuadro / proporcaoImagem) * 100).toFixed(1) + '%'
}

const dominioDoSite = computed(() => projeto.site.replace(/^https?:\/\//, '').replace(/\/$/, ''))

const canonica = urlCanonica(`/projetos/${projeto.slug}`)

// o title mira o serviço, não o nome do cliente: é "landing page para psicologia
// clínica" que alguém digita na busca, o nome próprio só quem já conhece
const TITULO = projeto.titulo
const DESCRICAO = `${projeto.resumo} Veja as decisões por trás do site de ${projeto.nome}, feito do zero por ${SITE_NOME}.`

useHead({
  title: TITULO,
  link: [{ rel: 'canonical', href: canonica }],
  meta: [
    { name: 'description', content: DESCRICAO },
    { property: 'og:title', content: `${TITULO} | ${SITE_NOME}` },
    { property: 'og:description', content: DESCRICAO },
    { property: 'og:url', content: canonica },
    { property: 'og:image', content: SITE_URL + projeto.imagem },
    { name: 'twitter:title', content: `${TITULO} | ${SITE_NOME}` },
    { name: 'twitter:description', content: DESCRICAO },
    { name: 'twitter:image', content: SITE_URL + projeto.imagem },
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
              { '@type': 'ListItem', position: 2, name: 'Projetos', item: `${SITE_URL}/#projetos` },
              { '@type': 'ListItem', position: 3, name: projeto.nome, item: canonica },
            ],
          },
          {
            '@type': 'WebPage',
            '@id': `${canonica}#pagina`,
            url: canonica,
            name: `${TITULO} | ${SITE_NOME}`,
            description: DESCRICAO,
            inLanguage: 'pt-BR',
            isPartOf: { '@id': ID_SITE },
            primaryImageOfPage: { '@type': 'ImageObject', url: SITE_URL + projeto.imagem },
          },
          {
            '@type': 'CreativeWork',
            '@id': `${canonica}#projeto`,
            name: `Site de ${projeto.nome}`,
            headline: TITULO,
            abstract: projeto.resumo,
            url: projeto.site,
            image: SITE_URL + projeto.imagem,
            inLanguage: 'pt-BR',
            genre: projeto.categoria,
            about: projeto.setor,
            creator: { '@id': ID_ORGANIZACAO },
            mainEntityOfPage: { '@id': `${canonica}#pagina` },
          },
        ],
      }),
    },
  ],
})
</script>

<style scoped lang="sass">
.case-pagina
  position: relative
  width: 100%
  min-height: 100svh
  overflow: hidden
  color: var(--cor-branco)
  // antes terminava em preto puro e a pagina virava um retangulo chapado do
  // meio pra baixo; agora assenta num azul bem escuro, como as secoes da home
  background: linear-gradient(180deg, #05142a 0%, #020a18 12%, #01060f 34%, #020814 62%, #04101f 100%)

// mesma luz do hero da home, mais discreta: aqui ela ambienta, nao e o assunto
.luz
  position: absolute
  inset: 0
  z-index: 0
  pointer-events: none

.luz__nucleo
  position: absolute
  top: -180px
  left: 50%
  width: min(1100px, 130vw)
  height: 520px
  transform: translateX(-50%)
  background: radial-gradient(ellipse at center, rgba(60, 110, 220, 0.26) 0%, rgba(40, 90, 190, 0.1) 46%, transparent 72%)

.luz__feixe
  position: absolute
  // valor fixo de proposito: em % a linha descia junto com o tamanho da pagina
  // e cortava o resumo e a ficha
  top: 100px
  left: 50%
  width: min(940px, 96vw)
  height: 2px
  transform: translateX(-50%)
  background: linear-gradient(90deg, transparent 0%, rgba(160, 195, 255, 0.5) 24%, rgba(255, 255, 255, 0.9) 50%, rgba(160, 195, 255, 0.5) 76%, transparent 100%)
  box-shadow: 0 0 28px 4px rgba(130, 175, 255, 0.4)

.voltar-caixa
  position: relative
  z-index: 1
  width: 100%
  max-width: 1720px
  margin: 0 auto
  // folga da barra fixa, que mede ~86px com a margem dela
  padding: 132px 60px 0 60px

.voltar
  display: inline-flex
  align-items: center
  gap: 14px
  font-family: var(--light)
  font-size: 14px
  color: rgba(255, 255, 255, 0.55)
  text-decoration: none
  transition: color 0.4s ease

  &__circulo
    display: flex
    align-items: center
    justify-content: center
    width: 46px
    height: 46px
    border: 1px solid rgba(255, 255, 255, 0.14)
    border-radius: 50%
    transition: border-color 0.4s ease, background 0.4s ease

    // a seta da lib aponta pra direita e aqui o sentido e voltar
    :deep(svg)
      width: 14px
      height: 14px
      transform: rotate(180deg)

  &:hover
    color: var(--cor-branco)

    .voltar__circulo
      border-color: rgba(140, 165, 255, 0.4)
      background: rgba(30, 46, 115, 0.4)

.abertura
  position: relative
  z-index: 1
  display: grid
  grid-template-columns: minmax(0, 1.55fr) minmax(0, 1fr)
  align-items: start
  gap: 60px
  width: 100%
  max-width: 1720px
  margin: 0 auto
  padding: 34px 60px 0 60px

  &__etiqueta
    display: inline-flex
    align-items: center
    gap: 9px
    font-family: var(--light)
    font-size: 12px
    letter-spacing: 2.4px
    text-transform: uppercase
    color: rgba(255, 255, 255, 0.4)

    b
      font-family: var(--semibold)
      font-style: italic
      color: rgba(255, 255, 255, 0.78)

  &__titulo
    margin: 18px 0 0 0
    font-family: var(--semibold)
    font-size: clamp(40px, 6.4vw, 88px)
    line-height: 1.02
    letter-spacing: -0.03em

  &__resumo
    max-width: 620px
    margin: 24px 0 0 0
    font-family: var(--light)
    font-size: clamp(16px, 1.4vw, 20px)
    line-height: 1.62
    color: rgba(255, 255, 255, 0.62)

  &__acoes
    display: flex
    flex-wrap: wrap
    gap: 14px
    margin: 36px 0 0 0

// fundo âmbar de propósito: é informação que corrige uma suposição, não um
// detalhe decorativo
.aviso-demo
  max-width: 620px
  margin: 20px 0 0 0
  padding: 12px 16px
  border: 1px solid rgba(240, 180, 90, 0.28)
  border-radius: 10px
  background: rgba(240, 180, 90, 0.09)
  font-family: var(--light)
  font-size: 14px
  line-height: 1.6
  color: rgba(245, 205, 150, 0.92)
  display: none

.ficha
  margin-top: 12px
  border: 1px solid rgba(255, 255, 255, 0.09)
  border-radius: 20px
  background: rgba(255, 255, 255, 0.025)

  &__linha
    padding: 22px 26px 22px 26px
    border-bottom: 1px solid rgba(255, 255, 255, 0.07)

    &:last-child
      border-bottom: none

  &__rotulo
    display: block
    font-family: var(--light)
    font-size: 11px
    letter-spacing: 1.8px
    text-transform: uppercase
    color: rgba(255, 255, 255, 0.4)

  &__valor
    display: block
    margin-top: 7px
    font-family: var(--semibold)
    font-size: 16px
    color: var(--cor-branco)

.acao
  display: inline-flex
  align-items: center
  justify-content: center
  gap: 12px
  padding: 17px 34px
  border: 1px solid transparent
  border-radius: 12px
  font-family: var(--semibold)
  font-size: 15px
  // trava a caixa de linha, igual a home: sem isso <a> e <NuxtLink> com icone
  // calculam alturas diferentes com o mesmo padding
  line-height: 1
  text-decoration: none
  cursor: pointer
  transition: background 0.4s ease, border-color 0.4s ease

  :deep(svg)
    width: 15px
    height: 15px

  &--primaria
    background: var(--cor-branco)
    color: #050505

    &:hover
      background: rgba(255, 255, 255, 0.86)

  &--secundaria
    border-color: rgba(125, 155, 255, 0.2)
    background: rgba(30, 46, 115, 0.38)
    color: rgba(255, 255, 255, 0.88)

    &:hover
      background: rgba(125, 155, 255, 0.16)
      border-color: rgba(140, 165, 255, 0.3)

.bloco
  position: relative
  z-index: 1
  width: 100%
  max-width: 1720px
  margin: 0 auto
  padding: 120px 60px 0 60px

  // brilho de fundo alternando o lado a cada secao: e o que quebra o preto
  // continuo sem competir com o texto
  &::before
    content: ''
    position: absolute
    top: 4%
    z-index: -1
    width: min(820px, 78vw)
    height: 620px
    pointer-events: none
    background: radial-gradient(ellipse at center, rgba(42, 84, 200, 0.16) 0%, rgba(26, 52, 132, 0.06) 44%, transparent 70%)

  &:nth-of-type(odd)::before
    left: -220px

  &:nth-of-type(even)::before
    right: -220px

  &__rotulo
    display: inline-flex
    align-items: center
    gap: 10px
    margin-bottom: 18px
    font-family: var(--light)
    font-size: 12px
    letter-spacing: 2.4px
    text-transform: uppercase
    color: rgba(255, 255, 255, 0.45)

    b
      font-family: var(--semibold)
      font-style: italic
      color: rgba(255, 255, 255, 0.75)

  &__titulo
    margin: 0
    font-family: var(--semibold)
    font-size: clamp(28px, 3.6vw, 48px)
    line-height: 1.1
    letter-spacing: -0.02em

    &--leve
      font-family: var(--light)
      color: #8aa6f0

    &--menor
      font-size: clamp(24px, 2.6vw, 34px)

  &__texto
    max-width: 780px
    margin: 26px 0 0 0
    font-family: var(--light)
    font-size: clamp(15px, 1.3vw, 18px)
    line-height: 1.74
    color: rgba(255, 255, 255, 0.6)

.numeros
  display: grid
  grid-template-columns: repeat(3, 1fr)
  gap: 22px
  margin: 46px 0 0 0
  padding: 0
  list-style: none

.numero
  padding: 30px 28px 32px 28px
  border: 1px solid rgba(255, 255, 255, 0.07)
  border-radius: 20px
  background: rgba(255, 255, 255, 0.025)

  &__valor
    display: block
    font-family: var(--semibold)
    font-size: clamp(34px, 3.6vw, 48px)
    line-height: 1
    letter-spacing: -0.02em
    color: var(--cor-branco)

    i
      font-family: var(--light)
      font-style: normal
      font-size: 0.42em
      color: rgba(255, 255, 255, 0.42)

  &__rotulo
    display: block
    margin-top: 14px
    font-family: var(--light)
    font-size: 14px
    line-height: 1.5
    color: rgba(255, 255, 255, 0.55)

.galeria
  // altura unica para os dois aparelhos; a largura de cada um sai dela
  --altura-quadro: 640px
  display: grid
  grid-template-columns: auto auto
  justify-content: start
  align-items: start
  align-items: start
  gap: 26px
  margin: 44px 0 0 0

.tela
  margin: 0

  // altura igual nos dois quadros: a largura de cada um vem da proporcao do
  // aparelho, entao o MacBook fica largo e o iPhone estreito, mas alinhados
  &__janela
    position: relative
    height: var(--altura-quadro)
    overflow: hidden

    img
      display: block
      width: 100%
      height: auto
      // percentual fixo de proposito: a imagem tem altura conhecida em relacao
      // a largura, entao o quanto falta percorrer nao depende do tamanho da tela
      animation: percorrer 26s ease-in-out infinite

  figcaption
    margin-top: 18px
    font-family: var(--light)
    font-size: 13px
    color: rgba(255, 255, 255, 0.42)

.aparelho
  &__corpo
    position: relative

.tela--mac
  .tela__janela
    aspect-ratio: 16 / 10
    width: auto
    border-radius: 5px

  .aparelho__corpo
    padding: 12px 12px 12px 12px
    border: 1px solid rgba(255, 255, 255, 0.14)
    border-radius: 16px 16px 6px 6px
    background: linear-gradient(180deg, #23262e 0%, #16181d 100%)
    box-shadow: 0 26px 60px rgba(0, 0, 0, 0.5)

    &::before
      content: ''
      position: absolute
      top: 5px
      left: 50%
      width: 4px
      height: 4px
      transform: translateX(-50%)
      border-radius: 50%
      background: rgba(255, 255, 255, 0.22)

  .aparelho__base
    position: relative
    display: block
    width: 118%
    height: 15px
    margin: 0 0 0 -9%
    border-radius: 0 0 12px 12px
    background: linear-gradient(180deg, #4a505c 0%, #363b45 55%, #22262e 100%)
    clip-path: polygon(0 0, 100% 0, 97.5% 100%, 2.5% 100%)

    &::after
      content: ''
      position: absolute
      top: 0
      left: 50%
      width: 96px
      height: 8px
      transform: translateX(-50%)
      border-radius: 0 0 8px 8px
      background: rgba(0, 0, 0, 0.55)

.tela--iphone
  .aparelho
    display: flex
    justify-content: center

  .tela__janela
    aspect-ratio: 393 / 852
    width: auto
    border-radius: 36px

    img
      animation-duration: 34s

  .aparelho__corpo
    padding: 11px 11px 11px 11px
    border: 1px solid rgba(255, 255, 255, 0.16)
    border-radius: 46px
    background: linear-gradient(160deg, #2b2f38 0%, #14161b 60%, #1d2027 100%)
    box-shadow: 0 26px 60px rgba(0, 0, 0, 0.5)

    &::before,
    &::after
      content: ''
      position: absolute
      width: 2px
      border-radius: 2px
      background: rgba(255, 255, 255, 0.16)

    &::before
      top: 108px
      left: -3px
      height: 54px

    &::after
      top: 120px
      right: -3px
      height: 74px

  .aparelho__ilha
    position: absolute
    top: 20px
    left: 50%
    z-index: 2
    width: 74px
    height: 20px
    transform: translateX(-50%)
    border-radius: 100px
    background: #0b0c0f

// quanto falta percorrer: (altura da imagem - altura do quadro) / altura da
// imagem. Com 1280x5984 num quadro 16:10 da 86.6%; no iPhone, 11385/360 num
// quadro 393:852 da 93.1%. Pausa no topo e no fim para dar tempo de ler
@keyframes percorrer
  0%, 7%
    transform: translateY(0)
  50%, 57%
    transform: translateY(calc(-1 * var(--percorrer)))
  100%
    transform: translateY(0)

@media (prefers-reduced-motion: reduce)
  .tela__janela img
    animation: none

.galeria__link
  display: inline-flex
  align-items: center
  gap: 9px
  margin: 30px 0 0 0
  font-family: var(--semibold)
  font-size: 14px
  color: #8aa6f0
  text-decoration: none
  transition: color 0.4s ease

  :deep(svg)
    width: 13px
    height: 13px

  &:hover
    color: var(--cor-branco)

.decisoes
  display: grid
  grid-template-columns: repeat(2, 1fr)
  gap: 22px
  margin: 44px 0 0 0
  padding: 0
  list-style: none

.decisao
  padding: 30px 30px 32px 30px
  border: 1px solid rgba(255, 255, 255, 0.07)
  border-radius: 20px
  background: rgba(255, 255, 255, 0.025)

  &__numero
    font-family: var(--semibold)
    font-style: italic
    font-size: 13px
    color: rgba(138, 166, 240, 0.75)

  &__titulo
    margin: 12px 0 0 0
    font-family: var(--semibold)
    font-size: 19px
    line-height: 1.32

  &__texto
    margin: 12px 0 0 0
    font-family: var(--light)
    font-size: 15px
    line-height: 1.7
    color: rgba(255, 255, 255, 0.58)

.lista
  display: grid
  grid-template-columns: repeat(2, 1fr)
  gap: 6px 46px
  margin: 44px 0 0 0
  padding: 0
  list-style: none

  li
    display: flex
    align-items: flex-start
    gap: 12px
    padding: 14px 0 14px 0
    font-family: var(--light)
    font-size: 16px
    line-height: 1.55
    color: rgba(255, 255, 255, 0.72)

    :deep(svg)
      flex-shrink: 0
      margin-top: 2px

.fecho
  position: relative
  z-index: 1
  width: 100%
  max-width: 1720px
  margin: 0 auto
  padding: 130px 60px 0 60px
  text-align: center

  &::before
    content: ''
    position: absolute
    top: 12%
    left: 50%
    z-index: -1
    width: min(1100px, 92vw)
    height: 560px
    transform: translateX(-50%)
    pointer-events: none
    background: radial-gradient(ellipse at center, rgba(48, 92, 215, 0.17) 0%, rgba(28, 56, 140, 0.06) 46%, transparent 72%)

  &__titulo
    margin: 0
    font-family: var(--semibold)
    font-size: clamp(28px, 3.8vw, 50px)
    line-height: 1.1
    letter-spacing: -0.02em

    &--leve
      font-family: var(--light)
      color: #8aa6f0

  &__texto
    max-width: 520px
    margin: 20px auto 0 auto
    font-family: var(--light)
    font-size: 16px
    line-height: 1.65
    color: rgba(255, 255, 255, 0.55)

  &__acoes
    display: flex
    flex-wrap: wrap
    align-items: center
    justify-content: center
    gap: 14px
    margin: 34px 0 0 0

.outros
  display: grid
  grid-template-columns: repeat(3, 1fr)
  gap: 22px
  margin: 34px 0 0 0
  padding: 0
  list-style: none

.outro
  &__area
    display: block
    padding: 14px 14px 20px 14px
    border: 1px solid rgba(255, 255, 255, 0.07)
    border-radius: 20px
    background: rgba(255, 255, 255, 0.025)
    text-decoration: none
    transition: border-color 0.4s ease, background 0.4s ease

    &:hover
      border-color: rgba(140, 165, 255, 0.28)
      background: rgba(30, 46, 115, 0.3)

    img
      display: block
      width: 100%
      // sem height:auto o atributo height do HTML vence e o aspect-ratio nunca
      // entra em acao: era por isso que o card do City Toys ficava mais alto
      height: auto
      aspect-ratio: 16 / 10
      object-fit: cover
      object-position: center
      border-radius: 12px

  &__nome
    display: block
    margin: 18px 0 0 4px
    font-family: var(--semibold)
    font-size: 17px
    color: var(--cor-branco)

  &__tag
    display: block
    margin: 6px 0 0 4px
    font-family: var(--light)
    font-size: 13px
    color: rgba(255, 255, 255, 0.45)

    &--proprio
      border-color: rgba(240, 180, 90, 0.3)
      background: rgba(240, 180, 90, 0.1)
      color: rgba(245, 205, 150, 0.9)

.rodape
  position: relative
  z-index: 1
  display: flex
  flex-wrap: wrap
  align-items: center
  justify-content: space-between
  gap: 18px
  width: 100%
  max-width: 1720px
  margin: 120px auto 0 auto
  padding: 34px 60px 44px 60px

  &::before
    content: ''
    position: absolute
    top: 0
    left: 60px
    right: 60px
    height: 1px
    background: rgba(255, 255, 255, 0.07)

  &__marca
    display: inline-flex
    align-items: center
    gap: 12px
    font-family: var(--semibold)
    font-size: 14px
    color: rgba(255, 255, 255, 0.8)
    text-decoration: none
    transition: color 0.4s ease

    :deep(svg)
      width: 26px
      height: 28px

    &:hover
      color: var(--cor-branco)

  &__copy
    font-family: var(--light)
    font-size: 13px
    color: rgba(255, 255, 255, 0.32)

// mesmos pontos de quebra e mesmos respiros da home (60 / 32 / 20), para o
// conteudo cair no mesmo eixo quando se troca de pagina
@media (max-width: 1250px)
  .voltar-caixa,
  .abertura,
  .bloco,
  .fecho,
  .rodape
    padding-left: 32px
    padding-right: 32px

  .rodape::before
    left: 32px
    right: 32px

@media (max-width: 1000px)
  .abertura
    grid-template-columns: 1fr
    gap: 40px
    padding-top: 26px

  .ficha
    margin-top: 0

  .numeros,
  .decisoes,
  .lista,
  .outros
    grid-template-columns: 1fr

  .galeria
    --altura-quadro: 460px
    grid-template-columns: auto
    justify-content: center
    gap: 44px

  .bloco
    padding-top: 90px

  .fecho
    padding-top: 96px

  .rodape
    margin-top: 90px

@media (max-width: 820px)
  .voltar-caixa,
  .abertura,
  .bloco,
  .fecho,
  .rodape
    padding-left: 20px
    padding-right: 20px

  .rodape::before
    left: 20px
    right: 20px

</style>
