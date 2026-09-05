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
    filtroSetor: /psicolog/i,

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
    filtroSetor: /contábil|contabil|contador/i,

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
    filtroSetor: /pet\s?shop|banho e tosa/i,

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
    filtroSetor: /evento|confer/i,

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
    filtroSetor: /brinquedo|inflá|infla/i,

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

// usado pelas páginas de case para achar o serviço do nicho do projeto e oferecer
// o caminho de volta. O primeiro que casar com o setor vence
export function servicoDoSetor(setor = '') {
  return SERVICOS.find((s) => s.filtroSetor.test(setor)) || null
}
