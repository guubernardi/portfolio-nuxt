// Páginas de serviço por nicho. Cada entrada aqui vira uma página inteira em
// /<slug>, renderizada pelo components/pages/servico/Pagina.vue.
//
// A regra que mantém isto longe de página-isca: o que muda de um nicho para o
// outro não é a palavra-chave, é o problema. Quem procura psicólogo está com
// medo de não ser motivo suficiente; quem procura pet shop está com o cachorro
// sujo agora; quem organiza festa quer saber se o brinquedo está livre no dia.
// Se duas entradas puderem trocar de texto entre si, a segunda não devia existir.
//
// `filtroSetor` puxa a prova do próprio portfólio: projeto novo do nicho aparece
// na página sozinho, e o case ganha o caminho de volta pelo helpers/projetos.

export const SERVICOS = [
  // ---------------------------------------------------------------- psicólogo
  {
    slug: 'site-para-psicologo',
    eixo: 'nicho',
    filtro: (p) => /psicolog/i.test(p.setor),

    titulo: 'Site para psicólogo',
    chamada: 'que marca a primeira sessão.',
    resumo:
      'Uma página feita para quem chega em dúvida sair com a conversa aberta no WhatsApp. Escrita do zero, sem template, com o que a pessoa precisa ler antes de decidir.',
    acaoExemplos: 'Ver dois sites prontos',
    mensagemWhatsapp: 'Olá! Sou psicólogo(a) e gostaria de um orçamento para um site.',

    tituloSeo: 'Site para psicólogo',
    descricaoSeo:
      'Criação de site para psicólogo e psicóloga: página escrita do zero, com as dúvidas de quem procura terapia respondidas e contato direto no WhatsApp. Veja dois exemplos no ar.',
    servicoSeo: 'Criação de site para psicólogo',
    publicoSeo: 'Psicólogos e psicólogas',

    problema: {
      titulo: 'Quem procura terapia',
      chamada: 'não está comparando preço.',
      texto:
        'Está se perguntando se o que sente é motivo suficiente, se terapia online funciona de verdade e se vai conseguir falar de coisa íntima com um estranho. Site de psicólogo costuma responder à pergunta errada: abre com abordagem, formação e técnica, que são exatamente as informações que importam depois. Antes disso, a pessoa precisa se reconhecer na tela.',
      duvidas: [
        'O que eu sinto é motivo suficiente para procurar terapia?',
        'Terapia online funciona igual à presencial?',
        'Preciso ter um diagnóstico para começar?',
        'O que eu contar fica mesmo em sigilo?',
        'Quanto tempo dura o processo?',
        'Quanto custa e como funciona o pagamento?',
      ],
    },

    entregasTitulo: { titulo: 'Uma página inteira,', chamada: 'pensada para o seu caso.' },
    entregas: [
      {
        titulo: 'Texto escrito para quem está em dúvida',
        texto:
          'A página segue a ordem em que as perguntas aparecem na cabeça de quem procura, não a ordem de um currículo. Acolhimento primeiro, credencial onde ela pesa.',
      },
      {
        titulo: 'Perguntas frequentes que seguram a decisão',
        texto:
          'Sigilo, formato online, duração e necessidade de diagnóstico respondidos na própria página, em vez de virarem mensagem que você responde de novo toda semana.',
      },
      {
        titulo: 'Contato direto, sem formulário',
        texto:
          'O botão abre o WhatsApp ou o Instagram já com a mensagem começada. Formulário cria espera e ninguém sabe se chegou.',
      },
      {
        titulo: 'CRP e abordagem apresentados do jeito certo',
        texto:
          'Registro no conselho e linha teórica aparecem explicados, não como sigla solta. Vira confirmação de uma decisão quase tomada.',
      },
      {
        titulo: 'Encontrável no Google e pelas IAs',
        texto:
          'A página descreve para os buscadores quem você é, o que faz e onde atende. É o que permite ao Google e ao ChatGPT citarem a informação certa em vez de adivinharem.',
      },
      {
        titulo: 'No seu nome, com você dono dos acessos',
        texto:
          'Domínio e hospedagem ficam na sua conta. Se um dia quiser levar o site para outro lugar, você leva, sem depender de ninguém.',
      },
    ],

    exemplosTitulo: { titulo: 'Dois sites de psicóloga', chamada: 'funcionando agora.' },

    perguntas: [
      {
        pergunta: 'Preciso ter os textos prontos?',
        resposta:
          'Não. Dá para começar com o que você já usa para se apresentar e escrever o resto junto. O que ajuda é você chegar sabendo quem quer atender e como prefere ser contatado.',
      },
      {
        pergunta: 'Posso usar meu CRP e material do conselho?',
        resposta:
          'Sim, e o site é montado respeitando o que o Código de Ética do psicólogo permite divulgar. Nada de promessa de resultado ou depoimento de paciente.',
      },
      {
        pergunta: 'Atendo presencial e online. O site cobre os dois?',
        resposta:
          'Cobre. A página deixa claro as duas modalidades, com o endereço aparecendo para quem busca atendimento na região e o formato online explicado para quem está longe.',
      },
      {
        pergunta: 'Já tenho site. Dá para refazer?',
        resposta:
          'Dá, e é comum. Refazemos mantendo o endereço que seus pacientes já conhecem, sem perder o que você construiu de busca até aqui.',
      },
      {
        pergunta: 'Quanto tempo leva?',
        resposta:
          'Depende do quanto o conteúdo já está pronto, e o prazo é combinado antes de começar. A parte que costuma demorar não é o código, é decidir o que a página vai dizer.',
      },
      {
        pergunta: 'E depois que entra no ar?',
        resposta:
          'Acompanho o período logo após o lançamento para corrigir o que aparecer no uso real. Ajustes e evoluções depois disso são combinados à parte.',
      },
    ],

    fecho: {
      titulo: 'Vamos montar',
      chamada: 'o seu?',
      texto:
        'Manda uma mensagem contando como você atende hoje. Sem formulário longo e sem compromisso.',
    },
  },

  // ----------------------------------------------------------------- contador
  {
    slug: 'site-para-contador',
    eixo: 'nicho',
    filtro: (p) => /contábil|contabil|contador/i.test(p.setor),

    titulo: 'Site para contador',
    chamada: 'que traz cliente sem depender de indicação.',
    resumo:
      'Uma página que responde o que o empresário pergunta antes de trocar de contabilidade: se você atende o tipo de empresa dele, como é a migração e quem vai falar com ele no dia a dia.',
    acaoExemplos: 'Ver um escritório no ar',
    mensagemWhatsapp: 'Olá! Tenho um escritório de contabilidade e gostaria de um orçamento para um site.',

    tituloSeo: 'Site para contador e escritório de contabilidade',
    descricaoSeo:
      'Criação de site para contador: página escrita do zero, com os segmentos que você atende, o processo de troca de contabilidade explicado e contato direto no WhatsApp.',
    servicoSeo: 'Criação de site para escritório de contabilidade',
    publicoSeo: 'Contadores e escritórios de contabilidade',

    problema: {
      titulo: 'Quem procura contador',
      chamada: 'já tem um. E está insatisfeito.',
      texto:
        'Quase ninguém busca contabilidade por não ter nenhuma. Busca porque não recebe resposta, porque descobriu um imposto tarde demais ou porque o negócio mudou e o escritório não acompanhou. Essa pessoa chega desconfiada e com uma pergunta prática na cabeça: trocar dá trabalho? Site de escritório costuma responder falando de si, com fundação, missão e valores, quando o que decide é saber se você entende o negócio dela.',
      duvidas: [
        'Vocês atendem o meu tipo de empresa?',
        'Como funciona a troca de contabilidade?',
        'Vou ficar sem entregar alguma obrigação no meio do caminho?',
        'Quanto custa por mês e o que está incluso?',
        'É tudo online ou preciso levar papel até lá?',
        'Quem vai falar comigo no dia a dia?',
      ],
    },

    entregasTitulo: { titulo: 'Uma página que responde', chamada: 'antes de você atender.' },
    entregas: [
      {
        titulo: 'Os segmentos que você atende, ditos com clareza',
        texto:
          'Médico, prestador de serviço, e-commerce, negócio digital: cada um tem regime e dor diferentes. Quem se reconhece na descrição entra em contato já sabendo que é com você.',
      },
      {
        titulo: 'A migração explicada passo a passo',
        texto:
          'Trocar de contador assusta mais pelo medo de ficar descoberto do que pelo preço. A página mostra como a transição acontece e de quem é cada responsabilidade.',
      },
      {
        titulo: 'Serviços descritos sem jargão fiscal',
        texto:
          'Abertura, troca de regime, folha, imposto de renda e regularização em linguagem de dono de empresa. Termo técnico só quando ele é a informação, não quando é enfeite.',
      },
      {
        titulo: 'Contato direto, sem formulário',
        texto:
          'O botão abre o WhatsApp com a mensagem começada. Quem está pensando em trocar de escritório não quer preencher formulário e esperar retorno.',
      },
      {
        titulo: 'Encontrável no Google e pelas IAs',
        texto:
          'A página descreve para os buscadores o que o escritório faz, para quem e onde. É o que permite ao Google e ao ChatGPT citarem seus serviços em vez de adivinharem.',
      },
      {
        titulo: 'No seu nome, com você dono dos acessos',
        texto:
          'Domínio e hospedagem ficam na conta do escritório. Se um dia quiser mudar de fornecedor, você leva o site junto.',
      },
    ],

    exemplosTitulo: { titulo: 'Um escritório', chamada: 'funcionando agora.' },

    perguntas: [
      {
        pergunta: 'Preciso ter os textos prontos?',
        resposta:
          'Não. Dá para começar da sua proposta comercial e do que você já responde por WhatsApp todo dia, que costuma ser o melhor material bruto que existe.',
      },
      {
        pergunta: 'Posso divulgar meu CRC e o do escritório?',
        resposta:
          'Pode, e o registro entra onde ele pesa: confirmando uma decisão quase tomada, não como primeira frase da página.',
      },
      {
        pergunta: 'Atendo vários segmentos. Cabe tudo em uma página?',
        resposta:
          'Cabe, e o desenho é justamente esse: cada segmento com o próprio bloco, para a pessoa se reconhecer sem ler o que não é dela. Se um segmento virar o carro-chefe, ele pode ganhar uma página só dele depois.',
      },
      {
        pergunta: 'Trabalho com dado fiscal e da folha. E a LGPD?',
        resposta:
          'O site não é o lugar onde esse dado circula. Ele leva a conversa para o seu canal, e a página traz política de privacidade e termos publicados, que é o que a LGPD espera de um site institucional.',
      },
      {
        pergunta: 'Já tenho site. Dá para refazer?',
        resposta:
          'Dá, mantendo o mesmo endereço e o histórico que ele já tem no Google. Refazer no mesmo domínio preserva o que foi conquistado até aqui.',
      },
      {
        pergunta: 'E depois que entra no ar?',
        resposta:
          'Acompanho o período seguinte ao lançamento para ajustar o que aparecer. Domínio e hospedagem ficam configurados na sua conta, no nome do escritório.',
      },
    ],

    fecho: {
      titulo: 'Vamos montar',
      chamada: 'o do seu escritório?',
      texto:
        'Manda uma mensagem contando que tipo de empresa você atende. Sem formulário longo e sem compromisso.',
    },
  },

  // ----------------------------------------------------------------- pet shop
  {
    slug: 'site-para-petshop',
    eixo: 'nicho',
    filtro: (p) => /pet\s?shop|banho e tosa/i.test(p.setor),

    titulo: 'Site para pet shop',
    chamada: 'que enche a agenda de banho e tosa.',
    resumo:
      'Uma página feita para quem está com o pet sujo hoje e decide no celular: o que você atende, quanto custa, se tem vaga essa semana e onde fica.',
    acaoExemplos: 'Ver um pet shop no ar',
    mensagemWhatsapp: 'Olá! Tenho um pet shop e gostaria de um orçamento para um site.',

    tituloSeo: 'Site para pet shop e banho e tosa',
    descricaoSeo:
      'Criação de site para pet shop: página com serviços por porte, faixa de preço, endereço e agendamento direto no WhatsApp. Escrita do zero, sem template.',
    servicoSeo: 'Criação de site para pet shop',
    publicoSeo: 'Pet shops e serviços de banho e tosa',

    problema: {
      titulo: 'Quem procura pet shop',
      chamada: 'está com pressa e perto de casa.',
      texto:
        'A busca acontece no celular, quase sempre em pé, e a decisão sai em menos de um minuto. A pessoa quer saber se você atende o porte do cachorro dela, quanto custa, se tem vaga essa semana e quanto tempo leva até aí. Site de pet shop costuma abrir com foto de filhote e a frase de que ama animais, o que é verdade e não responde nenhuma dessas perguntas.',
      duvidas: [
        'Atende cachorro do porte do meu?',
        'Quanto custa o banho e a tosa?',
        'Tem vaga para essa semana?',
        'Vocês buscam e levam em casa?',
        'Onde fica e tem onde estacionar?',
        'Meu pet fica esperando em gaiola?',
      ],
    },

    entregasTitulo: { titulo: 'Uma página que agenda', chamada: 'enquanto você trabalha.' },
    entregas: [
      {
        titulo: 'Serviços por porte, com faixa de preço',
        texto:
          'Banho, tosa, hidratação e pacote mensal com o que muda de um porte para o outro. Preço escondido faz a pessoa mandar mensagem só para perguntar valor, ou desistir antes.',
      },
      {
        titulo: 'Agendamento direto no WhatsApp',
        texto:
          'O botão abre a conversa já dizendo qual serviço e qual porte. Você recebe o pedido pronto em vez de começar toda conversa do zero.',
      },
      {
        titulo: 'Endereço, mapa e horário de funcionamento',
        texto:
          'Quem busca pet shop busca perto. Endereço visível, ponto de referência e horário são o que transforma a visita na página em cliente na porta.',
      },
      {
        titulo: 'Fotos do espaço de verdade',
        texto:
          'Quem deixa o animal quer ver onde ele vai ficar. Foto do banho, do secador e do lugar de espera responde a pergunta que ninguém faz em voz alta.',
      },
      {
        titulo: 'Encontrável na busca local',
        texto:
          'A página descreve para os buscadores o que você faz e em que cidade e bairro. É o que faz você aparecer no “pet shop perto de mim” em vez de ficar de fora.',
      },
      {
        titulo: 'No seu nome, com você dono dos acessos',
        texto:
          'Domínio e hospedagem ficam na sua conta. Se um dia quiser levar o site para outro lugar, você leva.',
      },
    ],

    exemplosTitulo: { titulo: 'Um pet shop', chamada: 'funcionando agora.' },

    perguntas: [
      {
        pergunta: 'Preciso ter os textos prontos?',
        resposta:
          'Não. Dá para começar da sua tabela de serviços e do que você já responde no WhatsApp todo dia. Esse material costuma ser melhor do que qualquer texto escrito do zero.',
      },
      {
        pergunta: 'Meus preços mudam. Vou ter que refazer a página?',
        resposta:
          'Não. A página pode trabalhar com faixa de preço ou com “a partir de”, que sustenta reajuste sem virar mentira. E o valor é um dos pontos fáceis de atualizar depois.',
      },
      {
        pergunta: 'Dá para o cliente escolher horário sozinho?',
        resposta:
          'Dá, mas na maioria dos pet shops o WhatsApp resolve melhor, porque a agenda muda o tempo todo. Se o volume justificar, a página pode ganhar agendamento com horário de verdade depois.',
      },
      {
        pergunta: 'Também vendo ração e acessórios. Cabe na página?',
        resposta:
          'Cabe como vitrine e pedido por WhatsApp. Loja com carrinho e pagamento é outro tipo de projeto, e só vale quando o volume de venda justifica.',
      },
      {
        pergunta: 'Já tenho site. Dá para refazer?',
        resposta:
          'Dá, mantendo o mesmo endereço e o histórico que ele já tem no Google. Refazer no mesmo domínio preserva o que foi conquistado até aqui.',
      },
      {
        pergunta: 'E depois que entra no ar?',
        resposta:
          'Acompanho o período seguinte ao lançamento para ajustar o que aparecer. Domínio e hospedagem ficam configurados na sua conta, no seu nome.',
      },
    ],

    fecho: {
      titulo: 'Vamos montar',
      chamada: 'o do seu pet shop?',
      texto:
        'Manda uma mensagem contando quais serviços você faz e onde fica. Sem formulário longo e sem compromisso.',
    },
  },

  // ------------------------------------------------------------------- evento
  {
    slug: 'landing-page-para-evento',
    eixo: 'nicho',
    filtro: (p) => /evento|confer/i.test(p.setor),

    titulo: 'Landing page para evento',
    chamada: 'que vende ingresso antes de esgotar.',
    resumo:
      'Uma página feita para a janela curta da divulgação: quem sobe no palco, que dia acontece e quanto custa, decidido no celular em rede ruim.',
    acaoExemplos: 'Ver uma página no ar',
    mensagemWhatsapp: 'Olá! Estou organizando um evento e gostaria de um orçamento para uma landing page.',

    tituloSeo: 'Landing page para evento e conferência',
    descricaoSeo:
      'Criação de landing page para evento: palco, cronograma, ingresso com parcelamento e uma página leve o bastante para carregar na rede do celular. Escrita do zero.',
    servicoSeo: 'Criação de landing page para evento',
    publicoSeo: 'Organizadores de eventos e conferências',

    problema: {
      titulo: 'Evento não tem segunda chance',
      chamada: 'de causar a primeira impressão.',
      texto:
        'A venda acontece numa janela curta, quase sempre no celular, logo depois de um story ou de um link mandado por um amigo. Nesse minuto a pessoa quer três respostas: quem vai falar, quando acontece e quanto custa. Se a página demora a abrir ou esconde qualquer uma delas, a decisão não acontece, e ninguém volta depois para conferir.',
      duvidas: [
        'Quem vai estar no palco?',
        'Que dia e que horas começa?',
        'Quanto custa e dá para parcelar?',
        'Onde vai ser e como eu chego?',
        'Ainda tem ingresso?',
        'Como eu recebo o meu ingresso?',
      ],
    },

    entregasTitulo: { titulo: 'Uma página pronta', chamada: 'antes da divulgação começar.' },
    entregas: [
      {
        titulo: 'O palco em destaque, antes do preço',
        texto:
          'Nome, foto e quem é cada pessoa que sobe. Em conferência, o line-up é o argumento de venda mais forte, e ele precisa aparecer antes de qualquer valor.',
      },
      {
        titulo: 'Programação aberta antes da compra',
        texto:
          'O cronograma dos dias mostra como o tempo se organiza. Quem vai a um evento precisa saber se encaixa na agenda, e não dá para pedir que compre primeiro e descubra depois.',
      },
      {
        titulo: 'Ingresso com valor e parcela na mesma linha',
        texto:
          'Para boa parte do público, poder dividir muda a decisão tanto quanto o valor cheio. Esconder o parcelamento empurra a dúvida para uma conversa que nunca acontece.',
      },
      {
        titulo: 'Leve o bastante para a rede do lugar',
        texto:
          'Divulgação de evento é link aberto no celular, muitas vezes em rede de igreja, escola ou centro de convenções. Página pesada perde a venda antes de aparecer.',
      },
      {
        titulo: 'Aviso de esgotado no lugar de erro',
        texto:
          'Quando a venda encerra, a página passa a anunciar isso em destaque em vez de deixar o botão levar a lugar nenhum. Evento esgotado ainda recebe visita, e o recado certo constrói a próxima edição.',
      },
      {
        titulo: 'No ar a tempo, com o endereço no seu nome',
        texto:
          'Data de divulgação é prazo, não sugestão. Domínio e hospedagem ficam na sua conta, e a página fica de pé para a edição seguinte.',
      },
    ],

    exemplosTitulo: { titulo: 'Uma conferência', chamada: 'que já aconteceu.' },

    perguntas: [
      {
        pergunta: 'Ainda não fechei todos os nomes do palco. Dá para começar?',
        resposta:
          'Dá, e é o normal. A página sobe com o que já está confirmado e recebe o resto conforme fecha, porque em evento esperar tudo pronto significa perder semana de divulgação.',
      },
      {
        pergunta: 'A venda de ingresso acontece na própria página?',
        resposta:
          'A página pode levar para a plataforma de ingresso que você já usa, que é o caminho mais rápido e seguro, ou receber pagamento direto quando o formato justificar. Isso a gente decide pelo tamanho do evento.',
      },
      {
        pergunta: 'Meu evento é anual. Dá para reaproveitar no ano que vem?',
        resposta:
          'Dá, e é o melhor cenário: o endereço mantém o histórico no Google e a edição nova entra sobre a mesma base, sem começar do zero em audiência.',
      },
      {
        pergunta: 'Quanto tempo antes eu preciso começar?',
        resposta:
          'Quanto mais cedo melhor, mas o que trava não costuma ser o desenvolvimento e sim o conteúdo: nomes, datas e valores confirmados. Com isso em mãos, a página sobe rápido.',
      },
      {
        pergunta: 'E depois que o evento acontece?',
        resposta:
          'A página pode virar registro da edição, com o que aconteceu e a lista de quem participou. Isso alimenta a expectativa da próxima e mantém o endereço vivo para o Google.',
      },
      {
        pergunta: 'Preciso ter os textos prontos?',
        resposta:
          'Não. Dá para escrever junto a partir do que você já usa na divulgação em rede social, que costuma ser o material que melhor traduz o tom do evento.',
      },
    ],

    fecho: {
      titulo: 'Vamos montar',
      chamada: 'a do seu evento?',
      texto:
        'Manda uma mensagem contando o que é o evento e quando acontece. Sem formulário longo e sem compromisso.',
    },
  },

  // --------------------------------------------------- locadora de brinquedos
  {
    slug: 'site-para-locadora-de-brinquedos',
    eixo: 'nicho',
    filtro: (p) => /brinquedo|inflá|infla/i.test(p.setor),

    titulo: 'Site para locadora de brinquedos',
    chamada: 'que fecha festa pelo WhatsApp.',
    resumo:
      'Uma página com o catálogo à mostra, o espaço que cada brinquedo precisa e o orçamento saindo pelo WhatsApp já com o item escolhido e a data da festa.',
    acaoExemplos: 'Ver os dois projetos no ar',
    mensagemWhatsapp: 'Olá! Tenho uma locadora de brinquedos e gostaria de um orçamento.',

    tituloSeo: 'Site para locadora de brinquedos e infláveis',
    descricaoSeo:
      'Criação de site para locadora de brinquedos: catálogo com foto e medidas, área de entrega, orçamento direto no WhatsApp e sistema de gestão quando a agenda aperta.',
    servicoSeo: 'Criação de site para locadora de brinquedos',
    publicoSeo: 'Locadoras de brinquedos e infláveis para festas',

    problema: {
      titulo: 'Quem organiza uma festa',
      chamada: 'está com data marcada e pouco tempo.',
      texto:
        'A pessoa já sabe o dia, já reservou o salão e agora corre atrás do brinquedo. Ela quer ver o que você tem, saber se cabe no espaço, se está livre naquela data e se você entrega no bairro dela. Catálogo em PDF, álbum de rede social ou o clássico "chama no direct para ver a lista" transformam uma decisão de dois minutos numa negociação de dois dias, e ela vai fechar com quem responder primeiro.',
      duvidas: [
        'Que brinquedos vocês têm?',
        'Cabe no espaço que eu tenho?',
        'Está disponível no dia da minha festa?',
        'Quanto custa e o que está incluso?',
        'Vocês entregam e montam?',
        'Atendem o meu bairro?',
      ],
    },

    entregasTitulo: { titulo: 'Um catálogo que trabalha', chamada: 'no lugar do seu direct.' },
    entregas: [
      {
        titulo: 'Catálogo com foto, medida e capacidade',
        texto:
          'Cada brinquedo com quanto ocupa, para que idade serve e quantas crianças aguenta. É o que evita a locação que dá errado por não caber no salão.',
      },
      {
        titulo: 'Orçamento que chega pronto',
        texto:
          'O botão abre o WhatsApp já dizendo qual brinquedo e para que data. Você responde valor em vez de gastar cinco mensagens descobrindo o que a pessoa quer.',
      },
      {
        titulo: 'Área de entrega dita com clareza',
        texto:
          'Bairros e cidades atendidos, com o que muda no frete. Descobrir no fim da conversa que você não entrega ali é o pior jeito de perder um cliente.',
      },
      {
        titulo: 'Entrega, montagem e retirada explicadas',
        texto:
          'Quem contrata quer saber a que horas você chega, quanto tempo leva para montar e quem desmonta. Sem isso, sobra insegurança na véspera da festa.',
      },
      {
        titulo: 'Encontrável na busca local',
        texto:
          'A página descreve para os buscadores o que você aluga e em que região. É o que coloca você no “aluguel de pula-pula perto de mim” em vez de deixar de fora.',
      },
      {
        titulo: 'Sistema de gestão quando a agenda apertar',
        texto:
          'Passado certo volume, planilha e caderno começam a gerar locação sobreposta. Dá para evoluir para um painel com agenda, contrato e controle de frota, como o Toyz aqui do portfólio.',
      },
    ],

    exemplosTitulo: { titulo: 'Um site e um sistema', chamada: 'funcionando agora.' },

    perguntas: [
      {
        pergunta: 'Meu catálogo muda. Vou depender de você para atualizar?',
        resposta:
          'Não precisa ser assim. O catálogo pode ficar num painel que você mesmo edita, e a partir de certo tamanho isso deixa de ser luxo e vira necessidade.',
      },
      {
        pergunta: 'Dá para o cliente ver a disponibilidade da data?',
        resposta:
          'Dá, mas isso já é sistema, não site. Quando o volume justifica, a agenda entra num painel de verdade, com bloqueio de data e controle de cada brinquedo, que é exatamente o que o Toyz faz.',
      },
      {
        pergunta: 'Preciso mostrar preço no site?',
        resposta:
          'Não obrigatoriamente. Muita locadora trabalha com “a partir de” porque o valor muda com data, distância e período. O que não funciona é não dar referência nenhuma.',
      },
      {
        pergunta: 'Trabalho com festa e também com evento de empresa. Cabe?',
        resposta:
          'Cabe, e vale separar: são públicos que decidem de formas diferentes. A página pode ter um caminho para cada um sem virar duas páginas soltas.',
      },
      {
        pergunta: 'Já tenho site. Dá para refazer?',
        resposta:
          'Dá, mantendo o mesmo endereço e o histórico que ele já tem no Google. Refazer no mesmo domínio preserva o que foi conquistado até aqui.',
      },
      {
        pergunta: 'E depois que entra no ar?',
        resposta:
          'Acompanho o período seguinte ao lançamento para ajustar o que aparecer. Domínio e hospedagem ficam configurados na sua conta, no seu nome.',
      },
    ],

    fecho: {
      titulo: 'Vamos montar',
      chamada: 'o da sua locadora?',
      texto:
        'Manda uma mensagem contando o que você aluga e para que região. Sem formulário longo e sem compromisso.',
    },
  },
  // ================================================================ por tipo
  {
    slug: 'criacao-de-landing-page',
    eixo: 'tipo',
    ordem: 1,
    icone: 'foguete',
    nomeCurto: 'Landing pages',
    resumoCurto: 'Uma página, um objetivo: virar cliente.',
    filtro: (p) => p.categoria === 'Landing page',

    titulo: 'Criação de landing page',
    chamada: 'que existe para uma coisa só.',
    resumo:
      'Uma página com um único objetivo e nada que atrapalhe ele. Escrita do zero, na ordem em que a dúvida aparece na cabeça de quem lê.',
    acaoExemplos: 'Ver quatro páginas no ar',
    mensagemWhatsapp: 'Olá! Gostaria de um orçamento para uma landing page.',

    tituloSeo: 'Criação de landing page',
    descricaoSeo:
      'Criação de landing page escrita do zero, com um objetivo por página e contato direto no WhatsApp. Veja quatro páginas publicadas e o que cada uma resolveu.',
    servicoSeo: 'Criação de landing page',
    publicoSeo: 'Profissionais e empresas que precisam converter visitante em cliente',

    problema: {
      titulo: 'Landing page não é site pequeno.',
      chamada: 'É uma decisão de cada vez.',
      texto:
        'A diferença não está no tamanho, está no foco. Site institucional apresenta uma empresa inteira e aceita que a pessoa passeie. Landing page existe para uma ação, e cada bloco que não empurra para ela é um convite a sair. É por isso que encher uma landing de menu, blog e história da empresa costuma derrubar justamente o número que ela deveria subir.',
      duvidas: [
        'Uma página só resolve mesmo?',
        'Preciso de menu e várias seções?',
        'Como sei se ela está funcionando?',
        'Dá para usar em anúncio pago?',
        'Quanto texto é texto demais?',
        'E se eu quiser mudar a oferta depois?',
      ],
    },

    entregasTitulo: { titulo: 'Uma página construída', chamada: 'em volta de uma ação.' },
    entregas: [
      {
        titulo: 'Um objetivo escolhido antes de desenhar',
        texto:
          'Agendar, orçar, comprar ou inscrever: um só. Página que tenta fazer três coisas normalmente não faz nenhuma, e essa decisão vem antes de qualquer layout.',
      },
      {
        titulo: 'Texto na ordem da dúvida, não do organograma',
        texto:
          'A leitura segue as perguntas que travam a decisão, uma de cada vez. Credencial e história entram onde pesam, que quase nunca é no começo.',
      },
      {
        titulo: 'Contato direto, sem formulário longo',
        texto:
          'O botão abre WhatsApp ou checkout já com o contexto. Cada campo a mais num formulário é gente que desiste no meio.',
      },
      {
        titulo: 'Rápida o bastante para sobreviver ao clique',
        texto:
          'Landing page vive de tráfego de rede social e anúncio, quase tudo no celular. Página lenta perde a visita antes de mostrar a primeira linha.',
      },
      {
        titulo: 'Preparada para receber anúncio',
        texto:
          'Estrutura limpa para medir o que acontece e para o pixel de campanha funcionar. Sem isso você paga por clique sem saber o que ele virou.',
      },
      {
        titulo: 'No seu nome, com você dono dos acessos',
        texto:
          'Domínio e hospedagem ficam na sua conta. Se um dia quiser levar a página para outro lugar, você leva.',
      },
    ],

    exemplosTitulo: { titulo: 'Quatro landing pages', chamada: 'publicadas.' },

    perguntas: [
      {
        pergunta: 'Qual a diferença para um site institucional?',
        resposta:
          'Landing page tem uma ação e nada que dispute com ela. Site institucional apresenta a empresa inteira e aceita que a pessoa navegue. Quando o objetivo é uma decisão só, a página curta costuma render mais.',
      },
      {
        pergunta: 'Uma página só não é pouco?',
        resposta:
          'Depende do que você vende. Para serviço com uma oferta clara, uma página bem escrita costuma resolver melhor do que cinco páginas rasas. Se o negócio tem várias frentes, aí faz sentido crescer.',
      },
      {
        pergunta: 'Dá para usar em anúncio do Instagram e do Google?',
        resposta:
          'Dá, e a página é montada pensando nisso: carregamento rápido no celular e estrutura pronta para receber o pixel da campanha e medir o que o clique virou.',
      },
      {
        pergunta: 'Preciso ter os textos prontos?',
        resposta:
          'Não. Dá para começar do que você já usa para se apresentar e do que responde por mensagem todo dia, que costuma ser o melhor material bruto que existe.',
      },
      {
        pergunta: 'Consigo mudar a oferta depois?',
        resposta:
          'Consegue. Preço, condição e chamada são as partes que mais mudam, e a página é montada esperando que mudem.',
      },
      {
        pergunta: 'E depois que entra no ar?',
        resposta:
          'Acompanho o período seguinte ao lançamento para ajustar o que aparecer no uso real. Domínio e hospedagem ficam configurados na sua conta.',
      },
    ],

    fecho: {
      titulo: 'Vamos montar',
      chamada: 'a sua?',
      texto: 'Manda uma mensagem contando o que a página precisa fazer acontecer. Sem compromisso.',
    },
  },
  {
    slug: 'criacao-de-site-institucional',
    eixo: 'tipo',
    ordem: 2,
    icone: 'predio',
    nomeCurto: 'Sites institucionais',
    resumoCurto: 'A cara da sua empresa, sem parecer modelo pronto.',
    filtro: (p) => p.categoria === 'Site institucional',

    titulo: 'Criação de site institucional',
    chamada: 'que não parece modelo pronto.',
    resumo:
      'O site que responde quem é a empresa, o que ela faz e por que confiar. Escrito e desenhado do zero, sem tema comprado e sem construtor.',
    acaoExemplos: 'Ver dois sites no ar',
    mensagemWhatsapp: 'Olá! Gostaria de um orçamento para um site institucional.',

    tituloSeo: 'Criação de site institucional para empresas',
    descricaoSeo:
      'Criação de site institucional escrito e desenhado do zero, sem template. Serviços, provas e contato organizados para quem está decidindo com quem fechar.',
    servicoSeo: 'Criação de site institucional',
    publicoSeo: 'Empresas e prestadores de serviço',

    problema: {
      titulo: 'Template entrega um site.',
      chamada: 'Não entrega um argumento.',
      texto:
        'Modelo pronto resolve a parte fácil, que é ter algo no ar. A parte difícil é dizer por que fechar com você e não com o concorrente, e nenhum tema comprado sabe isso. O resultado é aquele site correto e esquecível, com missão, visão, valores e uma foto de aperto de mão, que a pessoa fecha sem ter aprendido nada sobre a empresa.',
      duvidas: [
        'O que essa empresa faz, exatamente?',
        'Ela atende o meu tamanho de negócio?',
        'Já fez isso para alguém como eu?',
        'Quem vai cuidar do meu projeto?',
        'Como funciona e quanto custa?',
        'Como falo com alguém agora?',
      ],
    },

    entregasTitulo: { titulo: 'Um site que argumenta', chamada: 'em vez de se apresentar.' },
    entregas: [
      {
        titulo: 'Serviços explicados pelo problema que resolvem',
        texto:
          'Cada frente descrita pela dor que ela tira do cliente, não pelo nome interno que ela tem na empresa. É o que faz a pessoa se reconhecer e seguir lendo.',
      },
      {
        titulo: 'Prova no lugar de adjetivo',
        texto:
          'Cliente atendido, número real, projeto entregue. Dizer que é referência no mercado não convence ninguém; mostrar o que foi feito convence.',
      },
      {
        titulo: 'Estrutura pensada para crescer',
        texto:
          'O site nasce sabendo onde entram as páginas seguintes, de segmento ou de serviço, em vez de virar um bloco fechado que precisa ser refeito para receber conteúdo.',
      },
      {
        titulo: 'Contato em todo ponto de decisão',
        texto:
          'O caminho para falar com você aparece onde a pessoa se convence, não só no rodapé. Convencimento tem prazo de validade curto.',
      },
      {
        titulo: 'Encontrável no Google e pelas IAs',
        texto:
          'A página descreve para os buscadores o que a empresa faz, para quem e onde atende. É o que permite ao Google e ao ChatGPT citarem a informação certa em vez de adivinharem.',
      },
      {
        titulo: 'No nome da empresa, com você dono dos acessos',
        texto:
          'Domínio e hospedagem ficam na conta da empresa. Se um dia quiser trocar de fornecedor, o site vai junto.',
      },
    ],

    exemplosTitulo: { titulo: 'Dois sites institucionais', chamada: 'funcionando agora.' },

    perguntas: [
      {
        pergunta: 'Qual a diferença para uma landing page?',
        resposta:
          'Site institucional apresenta a empresa inteira e aceita que a pessoa navegue entre serviços e provas. Landing page tem uma ação só. Quando o negócio tem várias frentes, o institucional sustenta melhor.',
      },
      {
        pergunta: 'Por que não usar WordPress ou um construtor?',
        resposta:
          'Porque tema pronto carrega um monte de código que o seu site não usa, e isso aparece na velocidade e na busca. Escrever do zero rende página mais leve e sem plugin para manter atualizado.',
      },
      {
        pergunta: 'Quantas páginas o site precisa ter?',
        resposta:
          'As que tiverem conteúdo próprio para sustentar. Página criada só para engordar o menu não ajuda ninguém e ainda divide a atenção do Google entre endereços fracos.',
      },
      {
        pergunta: 'Já tenho site. Dá para refazer?',
        resposta:
          'Dá, mantendo o mesmo endereço e o histórico que ele já tem no Google. Refazer no mesmo domínio preserva o que foi conquistado até aqui.',
      },
      {
        pergunta: 'Consigo atualizar o conteúdo sozinho?',
        resposta:
          'Dá para deixar as partes que mudam com frequência num painel que você edita. Vale decidir isso no começo, porque muda como o site é construído.',
      },
      {
        pergunta: 'E depois que entra no ar?',
        resposta:
          'Acompanho o período seguinte ao lançamento para ajustar o que aparecer no uso real. Domínio e hospedagem ficam configurados na conta da empresa.',
      },
    ],

    fecho: {
      titulo: 'Vamos montar',
      chamada: 'o da sua empresa?',
      texto: 'Manda uma mensagem contando o que a empresa faz e para quem. Sem compromisso.',
    },
  },
  {
    slug: 'desenvolvimento-de-sistema-web',
    eixo: 'tipo',
    ordem: 3,
    icone: 'engrenagem',
    nomeCurto: 'Sistemas sob medida',
    resumoCurto: 'Feito pro seu processo, não pro processo genérico.',
    filtro: (p) => p.categoria === 'Sistema',

    titulo: 'Desenvolvimento de sistema web',
    chamada: 'feito para o seu processo.',
    resumo:
      'Painel sob medida para o jeito que a sua operação já funciona, em vez de obrigar a equipe a se encaixar num software genérico.',
    acaoExemplos: 'Ver um sistema no ar',
    mensagemWhatsapp: 'Olá! Preciso de um sistema sob medida e gostaria de um orçamento.',

    tituloSeo: 'Desenvolvimento de sistema web sob medida',
    descricaoSeo:
      'Desenvolvimento de sistema web sob medida: painel, cadastro, agenda e relatório desenhados para o processo da sua operação. Veja um sistema em uso.',
    servicoSeo: 'Desenvolvimento de sistema web sob medida',
    publicoSeo: 'Empresas com processo próprio que planilha já não sustenta',

    problema: {
      titulo: 'A planilha aguenta',
      chamada: 'até o dia em que não aguenta.',
      texto:
        'Todo processo começa cabendo numa planilha e num grupo de WhatsApp. O problema aparece quando duas pessoas editam a mesma linha, quando alguém aceita um pedido que já estava reservado, ou quando descobrir quanto se faturou no mês vira uma tarde de trabalho. Nesse ponto a escolha costuma ser entre um software genérico que obriga a mudar o processo e um sistema feito para o processo que já existe.',
      duvidas: [
        'Vou ter que mudar meu jeito de trabalhar?',
        'Minha equipe vai conseguir usar?',
        'E os dados que já estão na planilha?',
        'Quanto tempo até funcionar de verdade?',
        'Dá para começar pequeno?',
        'Quem mexe nisso se você sumir?',
      ],
    },

    entregasTitulo: { titulo: 'Um sistema que cabe', chamada: 'na operação de hoje.' },
    entregas: [
      {
        titulo: 'O processo mapeado antes de qualquer tela',
        texto:
          'Primeiro entender como o trabalho acontece hoje, inclusive as gambiarras que funcionam. Sistema que ignora o processo real vira sistema que a equipe contorna.',
      },
      {
        titulo: 'Começo pelo que dói mais',
        texto:
          'A primeira entrega resolve o gargalo que mais custa dinheiro ou tempo, não o módulo mais fácil de programar. É o que faz o sistema se pagar antes de ficar pronto.',
      },
      {
        titulo: 'Telas que a equipe entende sem treinamento',
        texto:
          'Quem vai usar não escolheu usar. Se a tela precisa de manual, ela vai ser evitada, e o dado volta para a planilha paralela.',
      },
      {
        titulo: 'Níveis de acesso desde o começo',
        texto:
          'Quem vê o quê, quem pode apagar, quem aprova. Deixar isso para depois é como decidir onde ficam as paredes com a casa levantada.',
      },
      {
        titulo: 'Relatório que responde a pergunta do dono',
        texto:
          'Quanto entrou, o que está em aberto, o que travou. Relatório existe para virar decisão, não para encher tela de gráfico.',
      },
      {
        titulo: 'Código seu, sem depender de mim',
        texto:
          'O código fica no seu repositório, escrito de forma que outro desenvolvedor consiga continuar. Sistema é compromisso longo e não pode virar refém de uma pessoa.',
      },
    ],

    exemplosTitulo: { titulo: 'Um sistema', chamada: 'em uso todo dia.' },

    perguntas: [
      {
        pergunta: 'Por que não usar um software pronto?',
        resposta:
          'Se existe um pronto que serve, use, sai mais barato. Sob medida compensa quando o seu processo é a vantagem competitiva, ou quando o pronto obrigaria a equipe a trabalhar de um jeito pior do que já trabalha.',
      },
      {
        pergunta: 'Dá para começar pequeno e crescer?',
        resposta:
          'É como recomendo fazer. A primeira versão resolve o gargalo principal e entra em uso; o resto entra depois, guiado pelo que a equipe sentir falta usando de verdade.',
      },
      {
        pergunta: 'E os dados que já estão na planilha?',
        resposta:
          'Entram na migração inicial. Vale reservar tempo para isso porque planilha antiga costuma ter duplicidade e campo preenchido de três jeitos diferentes, e limpar isso é parte do trabalho.',
      },
      {
        pergunta: 'Quanto tempo leva?',
        resposta:
          'Bem mais que um site, e o prazo é combinado por etapa. O que costuma demorar não é programar e sim decidir as regras: o que acontece quando dois pedidos disputam a mesma data, quem pode cancelar, o que conta como concluído.',
      },
      {
        pergunta: 'Preciso de um app ou o navegador resolve?',
        resposta:
          'Na maioria dos casos o navegador resolve, inclusive no celular, e sai bem mais barato de manter. App faz sentido quando precisa funcionar sem internet ou usar recurso do aparelho.',
      },
      {
        pergunta: 'E se eu precisar trocar de desenvolvedor?',
        resposta:
          'O código fica no seu repositório desde o primeiro dia, com a estrutura documentada. Você não fica preso a mim, e isso é proteção sua, não gentileza minha.',
      },
    ],

    fecho: {
      titulo: 'Vamos mapear',
      chamada: 'o seu processo?',
      texto:
        'Manda uma mensagem contando onde a operação trava hoje. Sem compromisso, e às vezes a resposta é que você não precisa de sistema ainda.',
    },
  },
  {
    slug: 'criacao-de-loja-virtual',
    eixo: 'tipo',
    ordem: 4,
    icone: 'carrinho-compras',
    nomeCurto: 'E-commerce',
    resumoCurto: 'Loja que carrega rápido e fecha venda.',
    // nenhuma loja publicada no portfólio até agora, então a seção de exemplos
    // some sozinha. Quando entrar um case de e-commerce, basta trocar este
    // filtro por p.categoria === 'E-commerce' e a prova aparece aqui
    filtro: () => false,

    titulo: 'Criação de loja virtual',
    chamada: 'que não perde a venda no meio.',
    resumo:
      'Loja em Shopify com o tema trabalhado no código, montada em volta do caminho até o pagamento e funcionando no celular, que é onde a compra acontece.',
    acaoExemplos: '',
    mensagemWhatsapp: 'Olá! Gostaria de um orçamento para uma loja virtual.',

    tituloSeo: 'Criação de loja virtual em Shopify',
    descricaoSeo:
      'Criação de loja virtual em Shopify com tema personalizado no código: catálogo, frete e checkout montados em volta da venda, leves o bastante para converter no celular.',
    servicoSeo: 'Criação de loja virtual em Shopify',
    publicoSeo: 'Comércios e marcas que vendem produto',

    problema: {
      titulo: 'Loja não perde venda na vitrine.',
      chamada: 'Perde no caminho até o pagamento.',
      texto:
        'A pessoa achou o produto, gostou do preço e mesmo assim não comprou. O que derruba costuma estar depois disso: frete que só aparece no último passo, cadastro obrigatório antes de ver o valor final, imagem que demora a carregar no 4G e forma de pagamento que ela não usa. Cada um desses degraus é gente saindo com o carrinho cheio.',
      duvidas: [
        'Quanto vai custar o frete até mim?',
        'Em quanto tempo chega?',
        'Posso pagar no PIX ou parcelar?',
        'É seguro comprar aqui?',
        'E se eu precisar trocar?',
        'Tem o tamanho e a cor que eu quero?',
      ],
    },

    entregasTitulo: { titulo: 'Uma loja montada', chamada: 'em volta do checkout.' },
    entregas: [
      {
        titulo: 'Frete e pagamento sem surpresa no fim',
        texto:
          'O valor de entrega aparece cedo, junto do produto, e o checkout aceita PIX e cartão. Descobrir o frete no último passo é a causa mais comum de carrinho abandonado.',
      },
      {
        titulo: 'Catálogo que aguenta o seu sortimento',
        texto:
          'Variação de tamanho, cor e grade organizadas para o cliente achar sem se perder, e para você cadastrar sem sofrer.',
      },
      {
        titulo: 'Rápida no celular, que é onde se compra',
        texto:
          'Imagem tratada e página leve para carregar em rede móvel. Loja lenta perde a venda antes de mostrar o produto.',
      },
      {
        titulo: 'Tema personalizado no código, não montado em bloco',
        texto:
          'A vitrine é trabalhada direto no tema, e não escolhida numa lista. É o que faz a loja não sair com a mesma cara de todas as outras da plataforma.',
      },
      {
        titulo: 'Painel do Shopify para você tocar sozinho',
        texto:
          'Produto, preço, estoque e pedido no seu controle, sem depender do desenvolvedor. Loja em que cada alteração vira chamado não sobrevive à primeira Black Friday.',
      },
      {
        titulo: 'No seu nome, com você dono dos acessos',
        texto:
          'Domínio, hospedagem e contas de pagamento no nome da empresa. Loja mexe com dinheiro, e esse acesso não pode estar com terceiro.',
      },
    ],

    exemplosTitulo: { titulo: '', chamada: '' },

    perguntas: [
      {
        pergunta: 'Dá para começar vendendo pelo WhatsApp?',
        resposta:
          'Dá, e para quem está começando costuma ser o caminho mais rápido: catálogo no site e o pedido saindo pela conversa, sem checkout. Quando o volume de pedido passa do ponto em que dá para responder um a um, aí o carrinho se paga.',
      },
      {
        pergunta: 'Por que Shopify e não outra plataforma?',
        resposta:
          'Porque nela eu consigo mexer no código do tema em vez de só arrastar bloco pronto. Isso é o que separa uma loja com a sua cara de uma loja que parece a do concorrente, e ainda deixa o pagamento, o frete e a segurança por conta de quem faz isso em escala.',
      },
      {
        pergunta: 'Preciso de quantos produtos para valer a pena?',
        resposta:
          'Não é o número, é o giro. Loja com cinco produtos que vendem todo dia justifica; loja com trezentos que ninguém procura só cria trabalho de cadastro. Vale começar pelo que já tem saída.',
      },
      {
        pergunta: 'Como funciona o pagamento?',
        resposta:
          'Por gateway, com o dinheiro caindo direto na sua conta. As contas ficam no nome da empresa desde o começo, porque acesso a dinheiro não se compartilha.',
      },
      {
        pergunta: 'E o estoque, integra com o que eu já uso?',
        resposta:
          'Depende do que você usa. Sistema com API pública normalmente integra; sistema fechado às vezes obriga a escolher um lado como fonte da verdade. É uma das primeiras coisas a checar.',
      },
      {
        pergunta: 'Quanto tempo leva?',
        resposta:
          'Mais que um site institucional, porque loja tem produto, frete, pagamento e as regras de exceção. O que costuma demorar é preparar o catálogo, que é trabalho seu e vale começar antes.',
      },
    ],

    fecho: {
      titulo: 'Vamos conversar',
      chamada: 'sobre a sua loja?',
      texto:
        'Manda uma mensagem contando o que você vende e como vende hoje. Sem formulário longo e sem compromisso.',
    },
  },
  {
    slug: 'integracoes-e-pagamentos',
    eixo: 'tipo',
    ordem: 5,
    icone: 'integracoes',
    nomeCurto: 'Integrações e pagamentos',
    resumoCurto: 'PIX, assinatura e API conversando direito.',
    // a prova aqui é o sistema, onde integração de verdade aparece
    filtro: (p) => p.categoria === 'Sistema',

    titulo: 'Integrações e pagamentos',
    chamada: 'ligando o que hoje é copiar e colar.',
    resumo:
      'PIX, assinatura, gateway e API de terceiro conversando com o seu sistema, para o dado deixar de andar na mão de alguém.',
    acaoExemplos: 'Ver um sistema no ar',
    mensagemWhatsapp: 'Olá! Preciso integrar pagamento ou sistemas e gostaria de um orçamento.',

    tituloSeo: 'Integração de pagamento e de API',
    descricaoSeo:
      'Integração de PIX, assinatura, gateway de pagamento e API entre sistemas, com tratamento de erro e retentativa. Trabalho sob medida, escrito do zero.',
    servicoSeo: 'Integração de pagamento e de sistemas',
    publicoSeo: 'Empresas com sistemas que precisam trocar dados entre si',

    problema: {
      titulo: 'Integração é fácil de fazer',
      chamada: 'e difícil de fazer direito.',
      texto:
        'Conectar dois sistemas no dia bom é questão de horas. O trabalho de verdade é o dia ruim: a cobrança que caiu duas vezes, o retorno que chegou fora de ordem, o serviço do outro lado que ficou dez minutos fora do ar. Integração que só foi testada no caminho feliz costuma quebrar em silêncio, e quando alguém percebe, o estrago já entrou no fechamento do mês.',
      duvidas: [
        'E se o pagamento cair e o sistema não registrar?',
        'Dá para cobrar assinatura todo mês sozinho?',
        'Meu sistema antigo aceita integração?',
        'Como eu descubro que deu erro?',
        'Isso para de funcionar quando eles mudarem a API?',
        'Quanto tempo leva para ligar os dois?',
      ],
    },

    entregasTitulo: { titulo: 'Uma ligação que aguenta', chamada: 'o dia em que dá errado.' },
    entregas: [
      {
        titulo: 'PIX, cartão e assinatura recorrente',
        texto:
          'Cobrança avulsa ou mensal com o retorno do gateway tratado, incluindo o pagamento que confirma depois e o que não confirma nunca.',
      },
      {
        titulo: 'Retorno confirmado, não presumido',
        texto:
          'O sistema só considera pago o que o gateway confirmou, com verificação de assinatura. Confiar no que volta pelo navegador é como aceitar cheque sem olhar.',
      },
      {
        titulo: 'Repetição sem cobrar duas vezes',
        texto:
          'Quando o mesmo aviso chega duas vezes, e chega, o efeito acontece uma só. É a diferença entre uma integração e um problema com o cliente.',
      },
      {
        titulo: 'Retentativa quando o outro lado cai',
        texto:
          'Serviço de terceiro sai do ar, e a integração precisa esperar e tentar de novo em vez de perder a informação e seguir como se nada fosse.',
      },
      {
        titulo: 'Erro que avisa alguém',
        texto:
          'Falha registrada e comunicada, não engolida. Integração silenciosa é a que você descobre quebrada no fechamento do mês.',
      },
      {
        titulo: 'Chaves e acessos no nome da empresa',
        texto:
          'Conta do gateway e credenciais no seu nome, guardadas fora do código. Dinheiro e chave de acesso não ficam com fornecedor.',
      },
    ],

    exemplosTitulo: { titulo: 'Um sistema', chamada: 'com essa engrenagem por dentro.' },

    perguntas: [
      {
        pergunta: 'Quais gateways de pagamento você integra?',
        resposta:
          'Os que têm documentação e API pública, que hoje é praticamente todo mundo relevante no Brasil. A escolha costuma ser sua, pela taxa e pelo prazo de repasse, e eu ligo no que você escolher.',
      },
      {
        pergunta: 'Dá para cobrar assinatura mensal automaticamente?',
        resposta:
          'Dá. O gateway cuida da cobrança recorrente e o sistema reage ao que ele responde: liberar acesso quando paga, avisar quando falha e suspender quando não paga mesmo. A parte trabalhosa é justamente essa segunda metade.',
      },
      {
        pergunta: 'Meu sistema atual é antigo. Dá para integrar?',
        resposta:
          'Se ele expõe alguma API ou banco acessível, dá. Se é totalmente fechado, às vezes o caminho é uma ponte intermediária, e isso muda o tamanho do trabalho. É a primeira coisa a checar antes de prometer prazo.',
      },
      {
        pergunta: 'E quando eles mudarem a API do lado deles?',
        resposta:
          'Acontece, e por isso a integração fica isolada num ponto só do código. Quando o fornecedor muda, se ajusta ali, sem mexer no resto do sistema.',
      },
      {
        pergunta: 'Como eu sei que está tudo funcionando?',
        resposta:
          'Pelo registro do que passou e pelo aviso quando algo falha. Integração boa é a que grita quando quebra, não a que fica quieta.',
      },
      {
        pergunta: 'Isso é um projeto separado ou parte de um sistema?',
        resposta:
          'Pode ser os dois. Entra dentro de um sistema que estou fazendo, ou como trabalho isolado ligando coisas que você já tem.',
      },
    ],

    fecho: {
      titulo: 'Vamos ligar',
      chamada: 'o que hoje é manual?',
      texto: 'Manda uma mensagem contando quais sistemas precisam conversar. Sem compromisso.',
    },
  },
  {
    slug: 'design-de-interface',
    eixo: 'tipo',
    ordem: 6,
    icone: 'design',
    nomeCurto: 'UI/UX e interface',
    resumoCurto: 'Bonito de ver e óbvio de usar.',
    // todo projeto do portfólio passou por layout aprovado antes do código, então
    // a prova aqui é a lista inteira
    filtro: (p) => Boolean(p.slug),

    titulo: 'Design de interface',
    chamada: 'aprovado antes de virar código.',
    resumo:
      'O layout inteiro desenhado e aprovado antes da primeira linha de código, porque mudar um desenho custa minutos e mudar um site pronto custa dias.',
    acaoExemplos: 'Ver os projetos no ar',
    mensagemWhatsapp: 'Olá! Gostaria de um orçamento para design de interface.',

    tituloSeo: 'Design de interface: UI e UX',
    descricaoSeo:
      'Design de interface para site e sistema: layout completo aprovado antes do código, pensado para o celular primeiro e para quem vai usar todo dia.',
    servicoSeo: 'Design de interface e experiência do usuário',
    publicoSeo: 'Empresas e profissionais que precisam de site ou sistema',

    problema: {
      titulo: 'Mudar um desenho custa minutos.',
      chamada: 'Mudar um site pronto custa dias.',
      texto:
        'O jeito caro de descobrir que uma tela não funciona é descobrir com ela já programada. É quando arrastar um botão vira meio dia de trabalho, e quando o cliente deixa de pedir ajustes que deveria pedir, para não atrasar a entrega. Por isso o layout inteiro vem primeiro: nessa fase, discordar é barato e mudar de ideia é esperado.',
      duvidas: [
        'Vou ver como fica antes de aprovar?',
        'Posso pedir mudança sem virar retrabalho?',
        'Funciona bem no celular?',
        'Minha identidade visual vai ser respeitada?',
        'E se eu não tiver identidade nenhuma?',
        'Quem usa todo dia vai achar fácil?',
      ],
    },

    entregasTitulo: { titulo: 'O projeto inteiro visível', chamada: 'antes de existir.' },
    entregas: [
      {
        titulo: 'Layout completo antes do código',
        texto:
          'Todas as telas desenhadas e aprovadas por você. Nessa fase ajuste é conversa; depois de programado, é obra.',
      },
      {
        titulo: 'Celular como ponto de partida',
        texto:
          'A maior parte das visitas chega pelo telefone. Desenhar primeiro no menor tamanho evita a tela que só funciona bem no monitor de quem a desenhou.',
      },
      {
        titulo: 'Hierarquia guiando o olho',
        texto:
          'O que importa aparece primeiro, com tamanho e contraste fazendo esse trabalho. Tudo em destaque é o mesmo que nada em destaque.',
      },
      {
        titulo: 'Sua identidade respeitada, ou construída',
        texto:
          'Se você já tem marca, cor e tipografia, o desenho parte delas. Se não tem, a gente define o mínimo para o projeto não sair com cara de genérico.',
      },
      {
        titulo: 'Contraste e tamanho que dá para ler',
        texto:
          'Texto legível, área de toque que o dedo acerta e contraste suficiente. Acessibilidade aqui não é caridade, é gente conseguindo comprar.',
      },
      {
        titulo: 'Estados que a interface real precisa',
        texto:
          'Carregando, vazio, erro e sucesso. Tela desenhada só no estado bonito vira improviso na hora de programar.',
      },
    ],

    exemplosTitulo: { titulo: 'Todo projeto passou', chamada: 'por essa etapa.' },

    perguntas: [
      {
        pergunta: 'Design vem separado ou junto com o site?',
        resposta:
          'Normalmente junto, porque é a mesma entrega: o layout aprovado é a primeira etapa do projeto. Também faço só o desenho, para quem já tem quem programe.',
      },
      {
        pergunta: 'Quantas rodadas de ajuste eu tenho?',
        resposta:
          'As necessárias para você aprovar de verdade, e é justamente por isso que essa fase vem antes do código. Ajuste aqui é barato; o combinado sobre escopo fica no contrato.',
      },
      {
        pergunta: 'Não tenho logo nem identidade visual. Isso trava?',
        resposta:
          'Não trava. Dá para definir o mínimo, cor, tipografia e tom, junto com o projeto. Marca completa é outro trabalho, mas o site não precisa esperar por ela.',
      },
      {
        pergunta: 'Você usa Figma? Eu recebo os arquivos?',
        resposta:
          'Uso, e você recebe. O arquivo é seu, e serve para qualquer outro profissional continuar o trabalho depois.',
      },
      {
        pergunta: 'UI e UX são a mesma coisa?',
        resposta:
          'Não. UX é decidir o caminho que a pessoa percorre e o que ela precisa em cada passo; UI é como isso aparece na tela. Projeto pequeno resolve os dois na mesma etapa, mas as decisões são de naturezas diferentes.',
      },
      {
        pergunta: 'Vale redesenhar um sistema que já existe?',
        resposta:
          'Vale quando a equipe contorna a ferramenta, quando todo mundo novo precisa de treinamento ou quando o erro se repete sempre no mesmo lugar. Isso é problema de interface, não de gente desatenta.',
      },
    ],

    fecho: {
      titulo: 'Vamos desenhar',
      chamada: 'antes de construir?',
      texto: 'Manda uma mensagem contando o que precisa ser feito. Sem compromisso.',
    },
  },
]

// as quatro etapas são as mesmas em todo projeto, então moram fora dos nichos
export const ETAPAS = [
  { titulo: 'Conversa', texto: 'Entendo como você atende hoje e o que o site precisa resolver.' },
  { titulo: 'Protótipo', texto: 'Você aprova o layout inteiro antes de qualquer linha de código.' },
  { titulo: 'Desenvolvimento', texto: 'Código escrito do zero, com você acompanhando cada etapa.' },
  { titulo: 'No ar', texto: 'Publicação, domínio configurado e o site entregue funcionando.' },
]

export function servicoPorSlug(slug) {
  return SERVICOS.find((s) => s.slug === slug) || null
}

// as páginas por tipo de projeto alimentam a /servicos e o menu
export const SERVICOS_POR_TIPO = SERVICOS.filter((s) => s.eixo === 'tipo')
export const SERVICOS_POR_NICHO = SERVICOS.filter((s) => s.eixo === 'nicho')

// usado pelas páginas de case para oferecer o caminho de volta. Só considera as
// páginas por nicho: o case já vive dentro de uma categoria, então mandar quem
// leu o case da Jamilly para /criacao-de-landing-page seria mandá-lo de volta
// para onde ele já está. O que agrega é o segmento
export function servicoDoSetor(setor = '') {
  const projeto = { setor }
  return SERVICOS_POR_NICHO.find((s) => s.filtro(projeto)) || null
}
