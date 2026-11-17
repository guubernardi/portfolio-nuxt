// Só os ícones da @edusites/icons que o site usa de fato. O <SvgIcone> da lib
// resolve o nome em runtime, então não tem como o bundler saber quais entram, e
// no cliente ele acabava baixando o ICONES inteiro (os 1088 SVGs, ~2,3 MB, 734 KB
// com gzip) em todas as páginas, até na /bio, que mostra três ícones.
//
// Aqui cada ícone é um import estático: o bundle leva só estes, e o
// components/global/SvgIcone.vue monta o SVG na hora, igual no servidor e no
// cliente. Ícone novo no site? Acrescente o import e a chave abaixo; se faltar,
// o componente avisa no console e o ícone fica vazio.
//
// O alias #edusites-icones (nuxt.config.ts) aponta para a pasta de SVGs da lib,
// que o "exports" do package.json dela não deixa importar pelo nome do pacote.
import camera from '#edusites-icones/camera.js'
import carrinhoCompras from '#edusites-icones/carrinho-compras.js'
import casa from '#edusites-icones/casa.js'
import check from '#edusites-icones/check.js'
import checkLimpo from '#edusites-icones/check-limpo.js'
import contrato from '#edusites-icones/contrato.js'
import contratoAssinar from '#edusites-icones/contrato-assinar.js'
import copiar from '#edusites-icones/copiar.js'
import dashboard from '#edusites-icones/dashboard.js'
import design from '#edusites-icones/design.js'
import duvida from '#edusites-icones/duvida.js'
import engrenagem from '#edusites-icones/engrenagem.js'
import foguete from '#edusites-icones/foguete.js'
import ingresso from '#edusites-icones/ingresso.js'
import instagram from '#edusites-icones/instagram.js'
import integracoes from '#edusites-icones/integracoes.js'
import loja from '#edusites-icones/loja.js'
import mais from '#edusites-icones/mais.js'
import monitor from '#edusites-icones/monitor.js'
import mundo from '#edusites-icones/mundo.js'
import paleta from '#edusites-icones/paleta.js'
import predio from '#edusites-icones/predio.js'
import projetos from '#edusites-icones/projetos.js'
import setaDireita from '#edusites-icones/seta-direita.js'
import setaEsquerda from '#edusites-icones/seta-esquerda.js'
import setaGirarAntiHorario from '#edusites-icones/seta-girar-anti-horario.js'
import telefone from '#edusites-icones/telefone.js'
import usuario from '#edusites-icones/usuario.js'
import whatsapp from '#edusites-icones/whatsapp.js'

// de onde vem cada um, para saber o que pode sair se a página mudar:
// - nome fixo no template: camera, check, check-limpo, contrato, contrato-assinar,
//   dashboard, instagram, loja, mais, seta-direita, whatsapp
// - menu (NavTopo): casa, engrenagem, projetos, usuario, telefone
// - botões do quiz (QuizBotao via QuizAbertura/QuizPergunta/QuizFinal):
//   seta-esquerda, copiar, seta-girar-anti-horario
// - HomeServicos (outros serviços): paleta, ingresso
// - /servicos e SectionServicos (helpers/servicos.js): foguete, predio,
//   carrinho-compras, integracoes, design
// - /bio: mundo
// - /contato (opções): monitor, duvida
export const ICONES = {
  camera,
  'carrinho-compras': carrinhoCompras,
  casa,
  check,
  'check-limpo': checkLimpo,
  contrato,
  'contrato-assinar': contratoAssinar,
  copiar,
  dashboard,
  design,
  duvida,
  engrenagem,
  foguete,
  ingresso,
  instagram,
  integracoes,
  loja,
  mais,
  monitor,
  mundo,
  paleta,
  predio,
  projetos,
  'seta-direita': setaDireita,
  'seta-esquerda': setaEsquerda,
  'seta-girar-anti-horario': setaGirarAntiHorario,
  telefone,
  usuario,
  whatsapp,
}
