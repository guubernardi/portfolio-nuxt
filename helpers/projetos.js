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
    nome: 'Conectados',
    categoria: 'Landing page',
    setor: 'Conferência de jovens',
    imagem: '/images/projetos/conectados.webp',
    largura: 1200,
    altura: 675,
    site: 'https://conectados-sigma.vercel.app/',
  },

  {
    id: 'tiro-de-guerra',
    nome: 'Rifa Tiro de Guerra',
    categoria: 'Sistema',
    setor: 'Rifas online com PIX',
    imagem: '/images/projetos/tiro-de-guerra.webp',
    largura: 1200,
    altura: 675,
    site: 'https://tg-azure.vercel.app',
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
    categoria: 'Site institucional',
    setor: 'Pet shop e banho e tosa',
    imagem: '/images/projetos/patas-felizes.webp',
    largura: 1200,
    altura: 800,
    site: 'https://www.patasfelizes.com/',

    resumo:
      'A vitrine de um pet shop dentro do shopping, com o caminho até o agendamento no canal onde os clientes já estão.',

    ficha: [
      { rotulo: 'Tipo de projeto', valor: 'Site institucional' },
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
