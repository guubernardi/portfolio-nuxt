// Fonte única dos dados que o SEO usa. Antes o domínio estava escrito na mão em
// app.vue, no sitemap e no robots — e dois deles ainda apontavam pra dominio.com.

// com www: é o domínio que a Vercel serve de fato. O apex redireciona para cá,
// então apontar a canônica para gustavobernardi.com faria toda página apontar
// para uma URL que só redireciona.
export const SITE_URL = 'https://www.gustavobernardi.com'

export const SITE_NOME = 'Gustavo Bernardi'
export const SITE_CARGO = 'Estúdio de desenvolvimento web'

// URL absoluta: WhatsApp, LinkedIn e X ignoram og:image relativo
export const OG_IMAGE = `${SITE_URL}/images/share.png`
export const OG_IMAGE_LARGURA = 1200
export const OG_IMAGE_ALTURA = 630
export const OG_IMAGE_ALT =
  'Gustavo Bernardi — sites, e-commerces e sistemas sob medida'

export const TELEFONE = '+5511977912709'
export const EMAIL = 'gubernardi@hotmail.com'

export const PERFIS = [
  'https://www.instagram.com/devbygusta/',
  'https://github.com/guubernardi',
  'https://linkedin.com/in/gubernardi',
]

// Os mesmos seis serviços da SectionServicos, aqui no formato que o schema.org
// entende. Se mudar lá, mudar aqui: é o que o Google e as IAs leem como oferta.
export const SERVICOS = [
  {
    nome: 'Criação de landing pages',
    descricao:
      'Página única focada em conversão, escrita do zero e otimizada para transformar visitante em cliente.',
  },
  {
    nome: 'Criação de sites institucionais',
    descricao:
      'Site institucional sob medida, com identidade própria, sem template pronto.',
  },
  {
    nome: 'Desenvolvimento de sistemas sob medida',
    descricao:
      'Sistemas web feitos para o processo do cliente, incluindo painéis e áreas administrativas.',
  },
  {
    nome: 'Desenvolvimento de e-commerce',
    descricao:
      'Loja virtual rápida, com checkout objetivo e foco em fechamento de venda.',
  },
  {
    nome: 'Integrações e meios de pagamento',
    descricao:
      'Integração de PIX, assinaturas, gateways de pagamento e APIs de terceiros.',
  },
  {
    nome: 'UI/UX e design de interface',
    descricao:
      'Protótipo e interface pensados para serem claros de usar, aprovados antes de virar código.',
  },
]

// @id estável: é o que amarra o grafo entre app.vue e as páginas. Mudar isso
// quebra a referência de provider/publisher.
export const ID_ORGANIZACAO = `${SITE_URL}/#organizacao`
export const ID_SITE = `${SITE_URL}/#site`
export const ID_PESSOA = `${SITE_URL}/#gustavo`

export function urlCanonica(caminho = '/') {
  if (caminho === '/') return `${SITE_URL}/`
  return SITE_URL + caminho.replace(/\/+$/, '')
}
