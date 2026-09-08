// Fonte única dos projetos. A home (SectionProjetos) e as páginas de case leem
// daqui, então o card e a página nunca divergem.
//
// Quem tem `slug` ganha página própria em /projetos/<slug> e o card passa a
// apontar para ela. Quem não tem segue linkando direto para o site publicado.

export const PROJETOS = [
  {
    id: 'jamilly',
    slug: 'jamilly-ferreira',
    titulo: 'Landing page para psicóloga',
    nome: 'Jamilly Ferreira',
    categoria: 'Landing page',
    setor: 'Psicologia clínica',
    imagem: '/images/projetos/site-jamilly.webp',
    largura: 1200,
    altura: 675,
    site: 'https://www.jamillyferreirapsicologa.com.br/',

    resumo:
      'Uma página só, desenhada para levar quem chega em dúvida até a conversa no WhatsApp.',

    ficha: [
      { rotulo: 'Tipo de projeto', valor: 'Landing page' },
      { rotulo: 'Segmento', valor: 'Psicologia clínica' },
      { rotulo: 'Formato', valor: 'Página única' },
      { rotulo: 'Atendimento', valor: 'Cem por cento online' },
    ],

    // números medidos no site publicado, não estimados. Performance ficou de
    // fora de propósito: hoje ela não é boa o bastante para virar vitrine.
    numeros: [
      { valor: '100', unidade: '/100', rotulo: 'SEO técnico no Lighthouse' },
      { valor: '96', unidade: '/100', rotulo: 'Acessibilidade no Lighthouse' },
      { valor: '8', unidade: '', rotulo: 'Dúvidas respondidas antes do contato' },
    ],

    // capturas nas proporcoes reais dos aparelhos: 16:10 do MacBook e 9:19.5
    // do iPhone. Assim o quadro mostra o mesmo que a tela do aparelho mostraria
    galeria: [
      {
        src: '/images/projetos/jamilly-mac.webp',
        largura: 1280,
        altura: 5984,
        tipo: 'mac',
        rotulo: 'No computador',
        alt: 'Site de Jamilly Ferreira aberto no computador, do topo ao rodapé',
      },
      {
        src: '/images/projetos/jamilly-iphone.webp',
        largura: 360,
        altura: 11385,
        tipo: 'iphone',
        rotulo: 'No celular',
        alt: 'Mesmo site no celular, do topo ao rodapé',
      },
    ],

    contexto:
      'Psicóloga clínica com atendimento cem por cento online. Quem procura terapia pela internet raramente chega decidido: chega se perguntando se funciona à distância, se o problema é grave o bastante para justificar, se vai conseguir falar com um estranho. Um site bonito não resolve isso. O que resolve é responder essas dúvidas na ordem em que elas aparecem na cabeça da pessoa.',

    decisoes: [
      {
        titulo: 'A página segue a dúvida, não o currículo',
        texto:
          'A ordem das seções acompanha o que a pessoa pensa enquanto lê. Primeiro o acolhimento, depois como a terapia funciona, só então quem é a profissional. A credencial aparece onde ela pesa, não logo na abertura.',
      },
      {
        titulo: 'O processo explicado antes de perguntarem',
        texto:
          'Existe uma seção inteira mostrando como a terapia funciona na prática, do primeiro contato ao acompanhamento. Quem nunca fez terapia trava mais pelo desconhecido do que pelo preço, e ver o caminho desenhado tira parte desse peso.',
      },
      {
        titulo: 'Uma seção só para as objeções',
        texto:
          'Antes da chamada final existe um bloco que enfrenta o que costuma travar a decisão. É a conversa que aconteceria por mensagem, resolvida antes de a pessoa precisar perguntar.',
      },
      {
        titulo: 'WhatsApp no lugar de formulário',
        texto:
          'Formulário cria espera e ninguém sabe se a mensagem chegou. O contato vai direto para o WhatsApp, no canal em que a pessoa já sabe conversar e a resposta acontece no mesmo dia.',
      },
      {
        titulo: 'Perguntas frequentes como parte da venda',
        texto:
          'São oito perguntas cobrindo sigilo, duração das sessões, eficácia do formato online e como agendar. Elas seguram quem ainda não está pronto para clicar, em vez de deixar a pessoa sair para pesquisar em outro lugar.',
      },
      {
        titulo: 'Dados estruturados desde o primeiro dia',
        texto:
          'A página descreve para os buscadores quem é a profissional, qual serviço presta, onde atende e qual o registro no conselho. É o que permite ao Google e às ferramentas de IA citarem a informação certa em vez de adivinharem.',
      },
    ],

    // escrito para quem contrata, nao para quem programa: nada de nome de
    // biblioteca ou termo tecnico aqui
    entregas: [
      'Layout desenhado e aprovado antes de virar site',
      'Página escrita do zero, sem template pronto',
      'Perguntas frequentes respondendo as dúvidas que mais travam a decisão',
      'Site preparado para ser encontrado no Google e citado por ferramentas de IA',
      'Site no ar, com domínio e certificado de segurança configurados',
      'Domínio e hospedagem no nome da cliente, com ela como dona dos acessos',
    ],


  },

  {
    id: 'conectados',
    slug: 'conectados',
    titulo: 'Landing page para evento',
    nome: 'Conectados',
    categoria: 'Landing page',
    setor: 'Conferência de jovens',
    imagem: '/images/projetos/conectados.webp',
    largura: 1200,
    altura: 675,
    site: 'https://conectados-sigma.vercel.app/',

    resumo:
      'A página de uma conferência de dois dias, feita para vender ingresso enquanto o assunto está quente.',

    ficha: [
      { rotulo: 'Tipo de projeto', valor: 'Landing page' },
      { rotulo: 'Segmento', valor: 'Evento e conferência' },
      { rotulo: 'Formato', valor: 'Página única com venda' },
      { rotulo: 'Evento', valor: 'Dois dias, agosto de 2026' },
    ],

    // performance entra aqui porque neste projeto ela e boa de verdade: 85 no
    // Lighthouse com 33 requisicoes, o mais leve da lista
    numeros: [
      { valor: '5', unidade: '', rotulo: 'Preletores e atrações no palco' },
      { valor: '85', unidade: '/100', rotulo: 'Desempenho no Lighthouse' },
      { valor: '33', unidade: '', rotulo: 'Requisições para carregar a página' },
    ],

    galeria: [
      {
        src: '/images/projetos/conectados-mac.webp',
        largura: 1280,
        altura: 4783,
        tipo: 'mac',
        rotulo: 'No computador',
        alt: 'Página da conferência Conectados no computador, do topo ao rodapé',
      },
      {
        src: '/images/projetos/conectados-iphone.webp',
        largura: 360,
        altura: 7933,
        tipo: 'iphone',
        rotulo: 'No celular',
        alt: 'Mesma página no celular, do topo ao rodapé',
      },
    ],

    contexto:
      'Evento tem prazo, e página de evento vive de uma janela curta. O ingresso é decidido no celular, quase sempre depois de ver um story ou receber o link de um amigo, e a pessoa quer saber três coisas antes de pagar: quem vai falar, quando acontece e quanto custa. Se a página demora a abrir ou esconde alguma dessas respostas, a decisão simplesmente não acontece: ninguém volta depois para conferir.',

    decisoes: [
      {
        titulo: 'Quatro seções, nada além',
        texto:
          'Tema, preletores, cronograma e ingresso. Página de evento acumula banner, patrocinador e história da organização, e cada bloco a mais é uma chance de a pessoa sair antes de chegar no botão de comprar.',
      },
      {
        titulo: 'Os nomes do palco em destaque',
        texto:
          'Cinco preletores e atrações, cada um com quem é. Em conferência, o nome de quem fala é o argumento de venda mais forte, e ele precisa aparecer antes do preço.',
      },
      {
        titulo: 'A programação aberta antes da compra',
        texto:
          'O cronograma mostra como os dois dias se organizam. Quem vai a um evento precisa saber se consegue encaixar na agenda, e não dá para pedir que a pessoa compre primeiro e descubra depois.',
      },
      {
        titulo: 'Preço e parcela na mesma linha',
        texto:
          'O valor aparece com a opção de parcelamento ao lado. Para público jovem, poder dividir muda a decisão tanto quanto o valor cheio, e esconder isso empurra a dúvida para uma conversa que nunca acontece.',
      },
      {
        titulo: 'Esgotado dito com todas as letras',
        texto:
          'Quando a venda encerrou, a página passou a anunciar isso em destaque em vez de deixar o botão levar a um erro. Página de evento esgotado ainda recebe visita, e o recado certo ali constrói a expectativa da próxima edição.',
      },
      {
        titulo: 'Leveza como requisito, não como enfeite',
        texto:
          'A página carrega com 33 requisições e pontua 85 de desempenho. Divulgação de evento acontece por link no celular, muitas vezes em rede ruim de igreja ou escola, e página pesada perde a venda antes de aparecer.',
      },
    ],

    entregas: [
      'Layout desenhado e aprovado antes de virar site',
      'Página escrita do zero, sem template pronto',
      'Blocos de preletores e cronograma dos dois dias',
      'Área de ingresso com valor e parcelamento',
      'Aviso de esgotado publicado ao fim das vendas',
      'Página no ar antes do início da divulgação',
    ],
  },

  {
    id: 'citytoys',
    slug: 'city-toys',
    titulo: 'Site para locação de brinquedos infláveis',
    nome: 'City Toys',
    categoria: 'Site institucional',
    setor: 'Aluguel de brinquedos infláveis',
    imagem: '/images/projetos/citytoys.webp',
    largura: 1200,
    altura: 800,
    site: 'https://www.citytoysbrinquedos.com/',

    resumo:
      'Catálogo de brinquedos que responde as dúvidas da festa antes de a mãe precisar perguntar no WhatsApp.',

    ficha: [
      { rotulo: 'Tipo de projeto', valor: 'Site institucional' },
      { rotulo: 'Segmento', valor: 'Locação de infláveis' },
      { rotulo: 'Formato', valor: 'Catálogo com orçamento' },
      { rotulo: 'Atendimento', valor: 'Rio de Janeiro e região' },
    ],

    numeros: [
      { valor: '19', unidade: '', rotulo: 'Brinquedos no catálogo' },
      { valor: '6', unidade: '', rotulo: 'Avaliações de clientes na página' },
      { valor: '100', unidade: '/100', rotulo: 'SEO técnico no Lighthouse' },
    ],

    galeria: [
      {
        src: '/images/projetos/citytoys-mac.webp',
        largura: 1280,
        altura: 4752,
        tipo: 'mac',
        rotulo: 'No computador',
        alt: 'Site da City Toys no computador, do topo ao rodapé',
      },
      {
        src: '/images/projetos/citytoys-iphone.webp',
        largura: 360,
        altura: 8524,
        tipo: 'iphone',
        rotulo: 'No celular',
        alt: 'Mesmo site no celular, do topo ao rodapé',
      },
    ],

    contexto:
      'Quem aluga inflável para festa de criança decide rápido e decide no celular, quase sempre no meio de outras vinte tarefas da festa. A dúvida raramente é qual brinquedo é mais bonito: é se cabe no espaço, se serve para a idade das crianças, se entregam no bairro e se vem higienizado. Enquanto isso não fica claro, cada orçamento vira uma conversa longa no WhatsApp repetindo as mesmas respostas.',

    decisoes: [
      {
        titulo: 'O catálogo mostra o que decide, não o que enfeita',
        texto:
          'Cada brinquedo aparece com faixa etária e capacidade ao lado da foto. São as duas informações que definem se aquele item serve para a festa, e elas vêm antes de qualquer texto de venda.',
      },
      {
        titulo: 'Orçamento a um toque, em cada brinquedo',
        texto:
          'Todo item tem o próprio botão de orçamento, que abre o WhatsApp já indicando qual brinquedo interessou. A pessoa não precisa descrever o que viu, e do outro lado ninguém perde tempo perguntando.',
      },
      {
        titulo: 'Monte seu combo como caminho separado',
        texto:
          'Quem quer mais de um brinquedo tem um fluxo próprio, em vez de mandar uma lista solta por mensagem. Festa grande costuma levar mais de um item, e esse é o pedido de maior valor.',
      },
      {
        titulo: 'As três etapas do processo, explicadas',
        texto:
          'Escolher, combinar e receber. Quem nunca alugou não sabe como funciona entrega, montagem e retirada, e ver o caminho inteiro reduz a insegurança de contratar.',
      },
      {
        titulo: 'Avaliações com nome e bairro',
        texto:
          'Seis avaliações reais, com o lugar de onde a pessoa é. Para serviço que entra na casa da família e envolve criança, prova de outros clientes da mesma região pesa mais que qualquer adjetivo.',
      },
      {
        titulo: 'As dúvidas de sempre, respondidas na página',
        texto:
          'Período de locação, área atendida, higienização e frete. São exatamente as quatro perguntas que chegavam por mensagem antes de o site existir.',
      },
    ],

    entregas: [
      'Layout desenhado e aprovado antes de virar site',
      'Catálogo com 19 brinquedos, cada um com idade e capacidade',
      'Botão de orçamento por brinquedo, abrindo o WhatsApp já identificado',
      'Fluxo separado para montar combo de vários brinquedos',
      'Bloco de avaliações e perguntas frequentes',
      'Site no ar, com domínio e certificado de segurança configurados',
    ],
  },

  {
    id: 'toyz',
    slug: 'toyz',
    titulo: 'Sistema de gestão para locadoras',
    nome: 'Toyz',
    categoria: 'Sistema',
    setor: 'Gestão para locadoras de infláveis',
    imagem: '/images/projetos/toyz.webp',
    largura: 1200,
    altura: 675,
    site: 'https://apptoyz.com.br/',

    resumo:
      'O sistema que tira a locadora de infláveis da planilha: agenda, contrato assinado no celular e financeiro no mesmo lugar.',

    ficha: [
      { rotulo: 'Tipo de projeto', valor: 'Sistema web' },
      { rotulo: 'Segmento', valor: 'Locadoras de infláveis' },
      { rotulo: 'Formato', valor: 'Plataforma por assinatura' },
      { rotulo: 'Acesso', valor: 'Computador e celular' },
    ],

    numeros: [
      { valor: '5', unidade: '', rotulo: 'Módulos numa só plataforma' },
      { valor: '14', unidade: ' dias', rotulo: 'Teste grátis, sem cartão' },
      { valor: '100', unidade: '/100', rotulo: 'Práticas recomendadas no Lighthouse' },
    ],

    galeria: [
      {
        src: '/images/projetos/toyz-mac.webp',
        largura: 1280,
        altura: 4979,
        tipo: 'mac',
        rotulo: 'No computador',
        alt: 'Página do sistema Toyz no computador, do topo ao rodapé',
      },
      {
        src: '/images/projetos/toyz-iphone.webp',
        largura: 360,
        altura: 6278,
        tipo: 'iphone',
        rotulo: 'No celular',
        alt: 'Mesma página no celular, do topo ao rodapé',
      },
    ],

    contexto:
      'Locadora de inflável vive de agenda: saber qual brinquedo está livre em qual data, sem prometer duas vezes o mesmo item. Quase todas controlam isso em planilha e caderno, com contrato impresso e cobrança no fio do bigode. O problema não é falta de vontade de organizar, é que o dia é feito de montagem, entrega e retirada. Qualquer sistema que exija sentar no computador para alimentar dado não sobrevive a essa rotina.',

    decisoes: [
      {
        titulo: 'A agenda é o coração, não um módulo a mais',
        texto:
          'A tela principal mostra o que está disponível por data, para o dono responder se tem brinquedo livre sem abrir planilha. Prometer o mesmo item duas vezes é o erro que custa cliente, e a agenda existe para evitar isso.',
      },
      {
        titulo: 'Contrato assinado no celular, sem impressora',
        texto:
          'O cliente assina pelo telefone na hora do fechamento. Some a etapa de imprimir, levar, buscar assinatura e guardar papel, que é onde o contrato costuma simplesmente não acontecer.',
      },
      {
        titulo: 'Tudo em uma plataforma, não em cinco',
        texto:
          'Contratos, brinquedos, clientes, reservas e financeiro no mesmo lugar. A alternativa real não era outro sistema: era planilha, caderno e conversa espalhada pelo WhatsApp.',
      },
      {
        titulo: 'Feito para usar no meio da rua',
        texto:
          'A interface funciona no celular porque é ali que o trabalho acontece. Sistema que só roda no escritório vira dado desatualizado, e dado desatualizado devolve o dono para a planilha.',
      },
      {
        titulo: 'Um plano só, sem tabela de comparação',
        texto:
          'Uma assinatura, tudo incluído. Pequeno negócio não quer estudar qual pacote precisa; quer saber quanto custa e o que ganha, sem medo de escolher errado.',
      },
      {
        titulo: 'Teste sem cartão de crédito',
        texto:
          'Quatorze dias grátis sem pedir cartão na entrada. Para quem nunca usou sistema de gestão, a barreira não é a mensalidade, é o medo de assinar algo que não vai conseguir usar.',
      },
    ],

    entregas: [
      'Identidade e interface do sistema desenhadas do zero',
      'Agenda de brinquedos por data, sem conflito de reserva',
      'Contrato digital assinado pelo celular do cliente',
      'Cadastro de clientes, reservas e controle financeiro',
      'Página de apresentação do sistema, com plano e teste grátis',
      'Sistema no ar, com domínio e certificado de segurança configurados',
    ],
  },
  {
    id: 'patas-felizes',
    slug: 'patas-felizes',
    titulo: 'Site para pet shop',
    nome: 'Patas Felizes',
    categoria: 'Landing page',
    setor: 'Pet shop e banho e tosa',
    imagem: '/images/projetos/patas-felizes.webp',
    largura: 1200,
    altura: 800,
    site: 'https://www.patasfelizes.com/',

    resumo:
      'A vitrine de um pet shop dentro do shopping, com o caminho até o agendamento no canal onde os clientes já estão.',

    ficha: [
      { rotulo: 'Tipo de projeto', valor: 'Landing page' },
      { rotulo: 'Segmento', valor: 'Pet shop, banho e tosa' },
      { rotulo: 'Formato', valor: 'Página única' },
      { rotulo: 'Atendimento', valor: 'Shopping Morumbi, São Paulo' },
    ],

    numeros: [
      { valor: '8', unidade: '', rotulo: 'Serviços apresentados na página' },
      { valor: '6', unidade: '', rotulo: 'Depoimentos de clientes' },
      { valor: '100', unidade: '/100', rotulo: 'SEO técnico no Lighthouse' },
    ],

    galeria: [
      {
        src: '/images/projetos/patas-mac.webp',
        largura: 1280,
        altura: 5190,
        tipo: 'mac',
        rotulo: 'No computador',
        alt: 'Site do Patas Felizes no computador, do topo ao rodapé',
      },
      {
        src: '/images/projetos/patas-iphone.webp',
        largura: 360,
        altura: 8509,
        tipo: 'iphone',
        rotulo: 'No celular',
        alt: 'Mesmo site no celular, do topo ao rodapé',
      },
    ],

    contexto:
      'Pet shop dentro de shopping vive de duas coisas: quem passa na frente e quem procura no celular por banho e tosa perto dali. Quem procura no celular quer saber três coisas antes de sair de casa, e nessa ordem: se fazem o serviço que o cachorro precisa, se o lugar é limpo e se tem alguém que já foi e gostou. Preço vem depois. Sem essas respostas na tela, a pessoa vai ao concorrente que mostrou.',

    decisoes: [
      {
        titulo: 'Agendamento pelo Direct, não por formulário',
        texto:
          'O contato vai para o Instagram, que é onde esse público já acompanha o pet shop e já viu foto de cachorro atendido ali. Formulário mandaria a pessoa para um canal frio, sem rosto, e ninguém marca banho por e-mail.',
      },
      {
        titulo: 'Os oito serviços listados sem rodeio',
        texto:
          'Banho, tosa, tosa higiênica, tratamento de pelagem, vacinação, farmácia, adestramento e venda de produtos. Quem chega procurando um serviço específico precisa ver o nome dele, não uma descrição bonita do cuidado com os animais.',
      },
      {
        titulo: 'O espaço mostrado, não descrito',
        texto:
          'Tem seção de estrutura e galeria do lugar. Quem deixa um animal em algum lugar quer ver onde ele vai ficar, e foto do espaço real resolve isso melhor que qualquer texto sobre higiene.',
      },
      {
        titulo: 'Depoimentos com o serviço que a pessoa usou',
        texto:
          'Seis clientes, cada um dizendo o que fez ali. Vale mais que uma nota geral: quem procura tosa quer ler sobre tosa, não elogio genérico ao atendimento.',
      },
      {
        titulo: 'Endereço tratado como informação de destino',
        texto:
          'A localização no shopping aparece com piso e avenida, e o botão abre direto o mapa. Estabelecimento dentro de shopping se perde exatamente aí, e quem já decidiu ir só precisa saber como chegar.',
      },
      {
        titulo: 'Horário visível sem precisar perguntar',
        texto:
          'Segunda a sábado, das dez às vinte. É a pergunta que mais chega por mensagem em serviço de bairro, e respondê-la na página economiza a conversa que não vira agendamento.',
      },
    ],

    entregas: [
      'Layout desenhado e aprovado antes de virar site',
      'Página escrita do zero, sem template pronto',
      'Lista dos oito serviços com identidade visual própria',
      'Galeria do espaço e bloco de depoimentos de clientes',
      'Agendamento ligado ao Instagram e mapa com o endereço do shopping',
      'Site no ar, com domínio e certificado de segurança configurados',
    ],
  },
  {
    id: 'conecta-contabil',
    slug: 'conecta-contabil',
    titulo: 'Site para escritório de contabilidade',
    nome: 'Conecta Contábil',
    categoria: 'Site institucional',
    setor: 'Contabilidade para negócios digitais',
    imagem: '/images/projetos/conecta-contabil.webp',
    largura: 1200,
    altura: 800,
    site: 'https://www.conectacontabil.digital/',

    resumo:
      'Contabilidade que fala a língua de quem vende online, com preço na mesa antes de a conversa começar.',

    ficha: [
      { rotulo: 'Tipo de projeto', valor: 'Site institucional' },
      { rotulo: 'Segmento', valor: 'Contabilidade digital' },
      { rotulo: 'Formato', valor: 'Site com páginas por especialidade' },
      { rotulo: 'Atendimento', valor: 'Todo o Brasil, cem por cento digital' },
    ],

    numeros: [
      { valor: '6', unidade: '', rotulo: 'Especialidades com página própria' },
      { valor: '3', unidade: '', rotulo: 'Planos com preço aberto' },
      { valor: '100', unidade: '/100', rotulo: 'SEO técnico no Lighthouse' },
    ],

    galeria: [
      {
        src: '/images/projetos/conecta-mac.webp',
        largura: 1280,
        altura: 6488,
        tipo: 'mac',
        rotulo: 'No computador',
        alt: 'Site da Conecta Contábil no computador, do topo ao rodapé',
      },
      {
        src: '/images/projetos/conecta-iphone.webp',
        largura: 360,
        altura: 12777,
        tipo: 'iphone',
        rotulo: 'No celular',
        alt: 'Mesmo site no celular, do topo ao rodapé',
      },
    ],

    contexto:
      'Quem vende infoproduto, roda e-commerce ou cobra assinatura já tentou explicar a operação para um contador tradicional e ouviu que precisava levar as notas em papel. O problema não é preço: é achar quem entenda repasse de marketplace, split de pagamento e nota de serviço digital sem precisar de aula. Escritório de contabilidade costuma se vender como genérico e confiável, e some no meio de mil iguais.',

    decisoes: [
      {
        titulo: 'Uma página para cada tipo de negócio',
        texto:
          'E-commerce, infoproduto, SaaS, agência, criador de conteúdo e dropshipping têm página própria. Quem procura contador para marketplace não quer ler sobre contabilidade em geral: quer ver a palavra do próprio negócio na tela.',
      },
      {
        titulo: 'Preço aberto, antes da conversa',
        texto:
          'Três planos com valor e faixa de faturamento na página. Escritório que esconde preço perde quem só queria saber se cabe no bolso, e ganha uma agenda cheia de conversa que não fecha.',
      },
      {
        titulo: 'O medo de trocar tratado de frente',
        texto:
          'A página enfrenta a objeção real de quem já tem contador: dá trabalho trocar, tem multa, vou ficar sem atendimento no meio. Migração sem custo e ausência de fidelidade aparecem escritas, não subentendidas.',
      },
      {
        titulo: 'O que trava hoje, dito com as palavras do cliente',
        texto:
          'Uma seção lista os problemas da contabilidade tradicional para negócio digital. Quem se reconhece ali entende que do outro lado tem alguém que já viu aquilo antes, e isso vale mais que qualquer selo de qualidade.',
      },
      {
        titulo: 'Prazo de resposta como compromisso público',
        texto:
          'Resposta em até um dia útil, escrito na página. Contador sumido é a queixa mais comum do setor, e transformar prazo em promessa visível é o tipo de diferencial que a concorrência não copia sem se comprometer.',
      },
      {
        titulo: 'Sete dúvidas resolvidas antes do contato',
        texto:
          'Troca de contador, abertura de empresa, conciliação de marketplace, emissão de nota, faturamento baixo e fidelidade. São as perguntas que consumiam a primeira conversa inteira, respondidas antes de ela começar.',
      },
    ],

    entregas: [
      'Layout desenhado e aprovado antes de virar site',
      'Site escrito do zero, sem template pronto',
      'Seis páginas de especialidade, uma para cada tipo de negócio',
      'Tabela de planos com preço e faixa de faturamento',
      'Perguntas frequentes cobrindo troca de contador e abertura de empresa',
      'Site no ar, com domínio e certificado de segurança configurados',
    ],
  },
  {
    id: 'nathalia-psi',
    slug: 'nathalia-psi',
    titulo: 'Site para psicóloga online',
    nome: 'Nathalia',
    categoria: 'Landing page',
    setor: 'Psicologia clínica online',
    imagem: '/images/projetos/nathalia-psi.webp',
    largura: 1200,
    altura: 900,
    site: 'https://www.nathaliapsi.site/',

    resumo:
      'Uma página que dá nome ao que a pessoa está sentindo antes de falar em abordagem, técnica ou preço.',

    ficha: [
      { rotulo: 'Tipo de projeto', valor: 'Landing page' },
      { rotulo: 'Segmento', valor: 'Psicologia clínica' },
      { rotulo: 'Formato', valor: 'Página única com documentos' },
      { rotulo: 'Atendimento', valor: 'Online, adultos, sessões de 50 minutos' },
    ],

    numeros: [
      { valor: '6', unidade: '', rotulo: 'Situações em que a pessoa se reconhece' },
      { valor: '8', unidade: '', rotulo: 'Dúvidas respondidas antes do contato' },
      { valor: '100', unidade: '/100', rotulo: 'SEO técnico no Lighthouse' },
    ],

    galeria: [
      {
        src: '/images/projetos/nathalia-mac.webp',
        largura: 1280,
        altura: 6227,
        tipo: 'mac',
        rotulo: 'No computador',
        alt: 'Site da psicóloga Nathalia no computador, do topo ao rodapé',
      },
      {
        src: '/images/projetos/nathalia-iphone.webp',
        largura: 360,
        altura: 11913,
        tipo: 'iphone',
        rotulo: 'No celular',
        alt: 'Mesmo site no celular, do topo ao rodapé',
      },
    ],

    contexto:
      'Quem procura terapia quase nunca chega sabendo nomear o que sente. Chega com uma sensação difusa de que algo não vai bem e com medo de que aquilo não seja motivo suficiente para ocupar o tempo de um profissional. Site de psicólogo costuma responder à pergunta errada: abre falando de abordagem, formação e técnica, coisas que importam depois. Antes disso, a pessoa precisa se reconhecer na tela.',

    decisoes: [
      {
        titulo: 'Seis situações no lugar de uma lista de sintomas',
        texto:
          'A página descreve cenários do dia a dia em que a pessoa pode se reconhecer, em vez de listar transtornos. Quem chega sem diagnóstico não sabe em qual caixa se encaixa, mas sabe reconhecer a própria rotina descrita em voz alta.',
      },
      {
        titulo: 'A abordagem explicada, não só citada',
        texto:
          'Terapia cognitivo-comportamental, DBT e ACT aparecem com explicação do que significam na prática. Sigla sozinha não ajuda ninguém a decidir; ela vira credencial quando vem acompanhada do que muda na sessão.',
      },
      {
        titulo: 'O caminho da primeira sessão em quatro etapas',
        texto:
          'Do contato ao início do acompanhamento. Terapia online tem uma barreira específica que é não saber como a coisa começa, e desenhar o passo a passo tira a sensação de estar entrando no escuro.',
      },
      {
        titulo: 'CRP e formação onde pesam',
        texto:
          'O registro no conselho e a graduação aparecem depois do acolhimento, não na abertura. É informação que confirma uma decisão quase tomada, e usá-la como primeira frase soa a currículo, não a convite.',
      },
      {
        titulo: 'Oito dúvidas cobrindo o que trava de verdade',
        texto:
          'Sigilo, frequência das sessões, duração do processo, necessidade de diagnóstico e se terapia online funciona igual à presencial. São as perguntas que a pessoa não faz por vergonha e que, sem resposta, viram desistência silenciosa.',
      },
      {
        titulo: 'Política e termos publicados desde o começo',
        texto:
          'A página tem documentos legais próprios, com noindex para não competirem com o conteúdo principal. Profissional de saúde lida com dado sensível, e deixar isso escrito é parte do cuidado, não burocracia.',
      },
    ],

    entregas: [
      'Layout desenhado e aprovado antes de virar site',
      'Página escrita do zero, sem template pronto',
      'Blocos de situações, processo e como funciona a primeira sessão',
      'Perguntas frequentes cobrindo sigilo, formato e duração',
      'Política de privacidade e termos de uso publicados',
      'Site no ar, com domínio e certificado de segurança configurados',
    ],
  },
  {
    id: 'laura-nutricionista',
    slug: 'laura-nutricionista',
    titulo: 'Landing page para nutricionista',
    nome: 'Laura Barbosa',
    categoria: 'Landing page',
    setor: 'Nutrição comportamental',
    demonstracao: true,
    imagem: '/images/projetos/laura-nutricionista.webp',
    largura: 1200,
    altura: 800,
    site: 'https://www.lauranutri.site/',

    resumo:
      'Uma página que fala com quem já tentou cinco dietas e desistiu das cinco, sem prometer a sexta.',

    ficha: [
      { rotulo: 'Tipo de projeto', valor: 'Landing page' },
      { rotulo: 'Segmento', valor: 'Nutrição comportamental' },
      { rotulo: 'Origem', valor: 'Landing page com contato direto' },
      { rotulo: 'Formato', valor: 'Página única com contato direto' },
    ],

    numeros: [
      { valor: '6', unidade: '', rotulo: 'Situações em que a pessoa se reconhece' },
      { valor: '3', unidade: '', rotulo: 'Formatos de atendimento explicados' },
      { valor: '4', unidade: '', rotulo: 'Etapas do primeiro contato até o plano' },
    ],

    galeria: [
      {
        src: '/images/projetos/laura-mac.webp',
        largura: 1280,
        altura: 9604,
        tipo: 'mac',
        rotulo: 'No computador',
        alt: 'Página da nutricionista Laura no computador, do topo ao rodapé',
      },
      {
        src: '/images/projetos/laura-iphone.webp',
        largura: 360,
        altura: 14256,
        tipo: 'iphone',
        rotulo: 'No celular',
        alt: 'Mesma página no celular, do topo ao rodapé',
      },
    ],

    contexto:
      'Nutrição é um dos nichos onde a página padrão mais atrapalha. O modelo corrente abre com foto de prato colorido, promessa de emagrecimento e um botão de agendar, e fala com alguém que já decidiu. Só que quem procura nutricionista raramente está decidindo começar: está decidindo tentar de novo. Já fez dieta, já perdeu peso, já recuperou, e chega desconfiada de que o problema seja ela. Uma página que promete resultado rápido confirma exatamente o ciclo do qual ela quer sair. Montei esta como demonstração do caminho oposto, para ter no portfólio um exemplo do nicho antes de ter um cliente dele.',

    decisoes: [
      {
        titulo: 'A página abre nomeando a frustração, não o resultado',
        texto:
          'O primeiro bloco lista seis situações concretas: emagrece e engorda de novo, o fim de semana desanda, comer virou culpa. Quem se reconhece em uma delas continua lendo. Começar por "perca peso" perderia justamente quem já ouviu isso e não funcionou.',
      },
      {
        titulo: 'Nenhuma promessa de número em lugar nenhum',
        texto:
          'Sem quilos, sem prazo, sem antes e depois. Além de ser o que o Código de Ética do nutricionista restringe, é o que separa esta página do anúncio que a pessoa já aprendeu a ignorar.',
      },
      {
        titulo: 'Três formatos de atendimento, com a diferença dita',
        texto:
          'Consulta online, presencial e acompanhamento aparecem com o que muda entre eles. Quem está em dúvida entre formatos costuma não perguntar, só sair.',
      },
      {
        titulo: 'O caminho até o plano em quatro etapas',
        texto:
          'Do primeiro oi no WhatsApp até o plano na mão, com a conversa de uma hora no meio. Nutrição carrega o medo de receber uma folha de papel com proibições, e desenhar o processo tira esse medo antes da pergunta.',
      },
      {
        titulo: 'Prova por permanência, não por transformação',
        texto:
          'Os depoimentos falam de quem não voltou para a dieta de antes, e não de quantos quilos caíram. É a prova que interessa para quem já emagreceu várias vezes e sempre voltou.',
      },
      {
        titulo: 'Contato pelo WhatsApp, sem formulário',
        texto:
          'A página inteira leva para uma conversa, não para um agendamento imediato. Quem está na dúvida de tentar de novo precisa perguntar antes de marcar, e formulário não serve para perguntar.',
      },
    ],

    entregas: [
      'Layout desenhado do zero, sem template',
      'Página escrita inteira, do título ao rodapé',
      'Blocos de situações, formatos de atendimento e processo',
      'Depoimentos e perguntas frequentes',
      'Estrutura pronta para receber os dados reais de um cliente',
      'No ar, com domínio próprio',
    ],
  },
]

// destino do card na home: página interna quando o case existe, site publicado
// quando ainda não existe
export function destinoDoProjeto(projeto) {
  return projeto.slug ? `/projetos/${projeto.slug}` : projeto.site
}

export function projetoPorSlug(slug) {
  return PROJETOS.find((projeto) => projeto.slug === slug) || null
}

export const PROJETOS_COM_CASE = PROJETOS.filter((projeto) => projeto.slug)
