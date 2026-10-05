---
name: instagram-carousel
description: Cria carrosséis de Instagram para o perfil @devbygusta (Gustavo Bernardi) direto no Figma, no padrão visual já definido — 1080x1350, fundo marinho, ciano, Figtree, capa com personagem famoso em 3D gerada na Magnific e páginas internas cena a cena. Use SEMPRE que o Gustavo pedir um carrossel, post, roteiro de post, slides para o Instagram, capa de post, case em carrossel ou conteúdo educativo para o perfil, mesmo que ele não cite o Figma. Também use quando ele pedir para "montar no Figma" um post, ou pedir ideias de carrossel.
---

# Carrossel de Instagram — @devbygusta

Padrão de carrossel do perfil de dev do Gustavo. Cobre roteiro (copy) e montagem
no Figma via `use_figma`.

## Antes de começar

1. Carregue a skill `figma-use` (obrigatória antes de qualquer `use_figma`).
2. Confirme com o Gustavo o **tema** e, se ele não disser, proponha o roteiro
   antes de montar. Roteiro primeiro, Figma depois — sempre.

**Arquivo Figma:** `Indentidade Gustavo Bernardi`
fileKey `NRdT37in3liHA1XvSVmeWn`, página `Indentidade Gustavo Bernardi` (id `0:1`).

Cada carrossel vive numa `SECTION` própria nessa página, nomeada
`Carrosel — <assunto>`. Slides ficam lado a lado, y fixo, espaçamento 1200 no x.

## Tokens

| Token | Valor |
|---|---|
| Formato | 1080 x 1350 |
| Fundo | `#020715` (abismo) |
| Marinho | `#021228` |
| Petróleo (profundidade) | `#0A4E70` |
| Azul elétrico | `#07B1E8` |
| Ciano de destaque (texto, eyebrow, palavra da headline) | `#1AD8E9` |
| Glow | `#07B1E8` a ~40% |
| Texto | `#F3F7F9` / branco |
| Vermelho (negativo) | `#EF4444` |
| Verde (positivo) | `#22C55E` |
| Fonte | Figtree |
| Padding lateral | 72 |

Paleta nova desde 2026-10-05, tirada das capas do frame `novas capas` (`406:53`).
Na Magnific ela existe como Cor `devbygusta` (as 4 do meio). Os carrosséis
antigos usam o azul `#4C7FD6` / `#2563EB` com fundo `#06080F`; ao mexer neles,
mantenha o que já está lá.

Estilos Figtree disponíveis: `Black`, `Bold`, `ExtraBold`, `SemiBold`, `Medium`,
`Regular`, `Light` (sem espaço no nome — é `ExtraBold`, não `Extra Bold`).

## Anatomia do slide

Ordem de camadas, de baixo para cima:

1. Fundo `#06080F`
2. `Glow` — elipse 1300x900, azul 42%, blur de camada 300, em `x: -54, y: 360`
3. `Ruído & Textura` — clonar do slide `225:366` (case Conecta Contábil),
   redimensionar para 1080x1350
4. Conteúdo
5. Chrome fixo:
   - `devbygusta` — Bold 26, branco 85%, em `72, 72`
   - `índice` — Bold 26, branco 70%, em `72, 1244`, formato `01 / 07`
   - `→` — Regular 40, branco 55%, em `964, 1236`. **Não colocar no último slide.**

### Bloco de conteúdo (slides internos)

Auto-layout vertical, `itemSpacing: 32`, `fills = []`, largura dos textos 936,
em `x: 72`, `y = (1350 - altura) / 2 - 20`.

| Elemento | Estilo |
|---|---|
| Eyebrow | ExtraBold 26, azul `#4C7FD6`, letterSpacing 8%, caixa alta |
| Headline | Black 96, branco, lineHeight 96%, letterSpacing -2% |
| Corpo | Regular 38, branco 68%, lineHeight 140% |

Para destacar uma palavra na headline, use `setRangeFills` com o azul. Uma
palavra por slide, no máximo.

### Capa

Duas direções, ambas já montadas no arquivo:

**A — imagem de fundo** (ver `01 Capa` do carrossel do Mario)
Título Black 178 em duas linhas, lineHeight 88%, no topo; arte ocupando a metade
de baixo; scrim de gradiente em cima e embaixo para leitura; chip de vidro
embaixo com uma palavra em azul.

Chip: auto-layout horizontal, padding 44/26/44/28, raio 999, fundo `#06080F` a
55%, borda branca 22%, background blur 24, sombra.

**B — título com contorno** (ver frame `Capa — estilo contorno (v2)`)
Duas linhas Black empilhadas, preenchimento branco, `strokes` azul `#2563EB`
com `strokeWeight: 14` e `strokeAlign: 'OUTSIDE'`, e uma faixa azul fina
atravessando entre elas (ExtraBold 28, letterSpacing 6%).

**C — personagem famoso em 3D (direção atual)** (ver frame `novas capas` e
`01 Capa` da seção `Carrosel - Seu site está nas sombras`)
A capa inteira sai pronta da Magnific, com texto dentro da imagem, e entra no
Figma como imagem de 1080x1350. Fórmula: personagem famoso renderizado como
filme 3D (estilo Pixar), expressão exagerada, no terço de baixo; linha pequena
em caixa alta no topo (às vezes em azul elétrico); título branco condensado
gigante em duas linhas com a última palavra passando atrás da cabeça; CTA
`ARRASTA PARA O LADO` embaixo no centro.

Como gerar (MCP da Magnific):
- Modelo Nano Banana Pro (`imagen-nano-banana-2`), `aspectRatio: 4:5`,
  `resolution: 2k` (sai 1856x2304), 75 créditos por imagem.
- Referências: estilo `#devbygusta` (library id `2357594`, tipo `style`) e,
  se quiser o cenário padrão, a imagem do `@cenario-devbygusta` como tipo
  `image` (creation `tCgEAAhmZJ`). Esse modelo não aceita ref tipo `locations`
  e cai pro `auto`.
- O cenário pode mudar pra combinar com o personagem (terraço de Gotham, cofre,
  cânion), desde que fique em marinho e ciano, com glow e alguns painéis
  holográficos discretos.
- Projeto da Magnific: `Identidade devbygusta`.
- Mandar várias gerações em paralelo às vezes volta 403 do firewall do MCP.
  Reenvie uma por vez.

Prompt-base (troque o que está entre chaves; com imagem do personagem como
referência 1, troque a primeira frase por "Use the character from the FIRST
reference image as the hero. Keep the exact same character design..."):

```
Instagram carousel cover. {PERSONAGEM} rendered as a high-end 3D animated movie character with cinematic lighting and rich detail.
SETTING: {CENÁRIO}, everything color graded in deep navy and cyan, with a few subtle translucent holographic UI panels floating near the character.
POSE: {POSE}.
EXPRESSION: {EXPRESSÃO}.
PROPS: {OBJETOS}.
COMPOSITION: character big in the frame, filling the lower two thirds, slight low angle.
TYPOGRAPHY: at the top a small white uppercase sans line "{LINHA DE CIMA}". Below it a huge bold condensed all-caps white headline in two lines "{TÍTULO}", the last word partially hidden behind the character's head. At the bottom center small bold white uppercase text "ARRASTA PARA O LADO".
LOOK: deep navy almost black palette (#020715, #021228, #0A4E70), cyan #1AD8E9 and electric blue #07B1E8 glow, teal rim light, volumetric light, particles and bokeh, high contrast, sharp. Vertical 4:5. No other text, no logos, no watermark.
```

## Carrossel sequencial (cena a cena)

Formato validado no `Carrosel - Seu site está nas sombras` (seção `408:39`):
o mesmo personagem da capa conduz uma história, uma cena por slide (ex.:
Batman investigando o "caso do site invisível", cada slide uma pista). Prende o
arrasto porque a pessoa quer ver a próxima cena.

Imagens: gerar na Magnific com a capa como referência `image` (mantém o mesmo
personagem) + estilo `#devbygusta`. Sem texto na imagem, e com o terço/45% de
cima escuro e vazio pra receber a copy (`COMPOSITION: the top 45% of the image
is dark, calm and empty to receive text later`). A copy vai no Figma, editável.

Anatomia do slide interno, de baixo pra cima:
1. `Cena` — retângulo 1080x1350 com a imagem (`upload_assets` com `nodeIds`
   apontando pros retângulos, `scaleMode: FILL`). Se o elemento-chave da cena
   ficar atrás do texto, desça o retângulo (ex.: `y: 170`).
2. `Scrim topo` — 1080x820, gradiente linear vertical
   (`gradientTransform: [[0,1,0],[-1,0,1]]`), `#020715` a 94% → 70% em 0.55 →
   0%. Encurte pra ~640 quando precisar mostrar algo no meio.
3. `Scrim base` — 1080x300 em `y: 1050`, de 0% a 85%, pra índice e seta.
4. `Ruído & Textura` a 35% de opacidade (a 100% granula a imagem).
5. Chrome de sempre e `Conteúdo` em `x: 72, y: 170` (topo, não centralizado).
   Eyebrow e palavra de destaque em ciano `#1AD8E9`; corpo em branco 80%.

Sem cards de vidro nesse formato: a cena já faz o papel do elemento.

Lições das gerações em lote (2026-10-05):
- O estilo `#devbygusta` descreve a tipografia das capas. Usado sozinho numa
  cena sem texto, o modelo escreve título em inglês na imagem. Pra cena sem
  texto: referência `image` do personagem (capa ou cena 02) + o cenário
  (`tCgEAAhmZJ`) como `style`, e "Absolutely no text" no prompt.
- Usando a capa como referência, às vezes a cena copia o "ARRASTA PARA O LADO".
  Resolve no Figma: retângulo da cena 1210x1512 em `x: -65` (corta a borda).
- Às vezes o topo vazio sai chapado, com uma emenda reta no meio da imagem.
  Resolve com um retângulo `Scrim emenda` (1080x150, gradiente 97% → 85% →
  0%) sobre a linha da emenda.
- Personagem saiu alto e encosta no texto ou no chip: desça o retângulo da cena
  (`y: 60` a `230`). Se descer cortar o que importa embaixo, gere de novo com
  "Wide shot, camera pulled back... top of the head below the vertical middle".
- Personagem original (pra quando o famoso é bloqueado ou é pessoa real): gere
  a cena 02 primeiro e use ela como referência nas outras, pra manter o mesmo
  visual.

## Elementos ilustrativos

Cards de vidro que reforçam o argumento. Todos: raio 24, fundo branco 6%,
borda branca 14%, sombra `y: 20, blur: 44, preto 50%`, rotação de ±5°,
posicionados no canto inferior direito (`x: ~528, y: ~880`), tamanho ~482x300.

Já existem no arquivo, prontos para clonar:

| Card | Onde está | Serve para |
|---|---|---|
| Planilha com X vermelho | slide `05` do carrossel do Mario | mostrar o que não funciona |
| Sistema com checks verdes | slide `06` | o contraponto positivo do anterior |
| Gráfico de barras por dia | slide `03` | quantificar tempo perdido |
| Balões de conversa | slide `02` | rotina manual, ruído de comunicação |

**Regra de ouro:** no máximo 3 ou 4 elementos por carrossel. Capa, slide de
virada de raciocínio e CTA ficam limpos. Card em todo slide vira monotonia e o
elemento perde impacto.

Sempre confira colisão com o texto e com o chrome: o card não pode encostar no
corpo do texto nem cobrir o `→` em `964, 1236`. Para redimensionar um card
inteiro com os filhos, use `card.rescale(fator)` — `resize` não escala o conteúdo.

## Regras de roteiro

- 6 a 8 slides. Acima disso a taxa de quem chega no CTA cai.
- Uma ideia por slide. Corpo com no máximo ~25 palavras.
- Estrutura que funciona: capa → sintoma → custo → diagnóstico → o que muda → CTA.
- Escrever para o cliente, não sobre o processo interno. "Você aprova o layout"
  vale mais que "criamos o layout".
- Não prometer resultado que depende de terceiros (tráfego, vendas, posição no
  Google). Vira cobrança depois.
- Se o carrossel afirma algo sobre o produto (segurança, permissão de acesso,
  velocidade), o que o Gustavo entrega precisa cumprir isso. Levante essa
  ressalva na hora de propor o roteiro.
- Nem todo carrossel precisa ser provocativo. Alterne: bastidor, glossário,
  checklist, resposta a dúvida comum, mini-case.

### CTA

Último slide: eyebrow `RESUMINDO`, headline com a síntese, chip com convite.
Padrão: `me chama que eu te mostro como`, com a última palavra em azul.

### Legenda

Dois blocos curtos + 5 hashtags:
1. A dor em uma frase concreta
2. A ponte para a solução

Sem "comenta X" nem pedido de comentário: o Gustavo tira, porque o perfil ainda
tem pouco engajamento. Sem travessão (— ou –) na copy.

## Publicação e agendamento (Instagram web)

Programação padrão: um post a cada dois dias, às 12:15.

1. Exportar os 7 slides: `get_screenshot` da seção inteira com
   `maxDimension` = largura da seção e `contentsOnly: true`; a imagem vem com
   40px de margem, então cada slide é `crop(x+40, y+40, 1080, 1350)` usando as
   posições dos frames. Salvar em JPG 92.
2. Criar → Postar → `file_upload` no input de arquivo do diálogo (os 7 de uma
   vez, na ordem) → "Selecionar corte" → **4:5** (o padrão é 1:1 e corta).
3. Avançar duas vezes. **Espere a tela da legenda carregar** e foque o
   `[contenteditable]` do diálogo antes de digitar: digitar cedo demais cai fora
   do campo e aciona atalhos da página. Digite em partes (parágrafo, Enter
   Enter, parágrafo...) e confira o texto via JS no fim.
4. Rótulo de IA: ligar quando a capa for imagem realista feita com IA (pessoa
   real ou render fotográfico). Desenho/3D animado: deixar desligado.
5. "Programar conteúdo" → data no calendário → hora 12:15 nos spinbuttons
   `Hours`/`Minutes` → conferir via JS (data, hora, switches, tamanho da
   legenda) → Programar. Conferir a fila em `instagram.com/scheduled_content/`.

## Montagem no Figma — passo a passo

Trabalhe em chamadas pequenas de `use_figma`, validando com `screenshot()`.

1. **Esqueleto** — criar os frames em lotes de 4: fundo, glow, ruído.
   Marque `placeholder = true`.
2. **Chrome** — uma chamada para os 8 slides, criando handle, índice e seta.
3. **Conteúdo** — 3 slides por chamada. `placeholder = false` ao terminar cada um.
4. **Elementos** — um por chamada, com screenshot para conferir colisão.
5. **Conferência final** — screenshot dos slides que ainda não viu.

### Gotchas conhecidos

- `figma.createAutoLayout()` nasce com **fundo branco**. Sempre `fills = []`.
  Sintoma: um retângulo branco cobrindo o texto.
- `node.query()` **quebra com acento** no seletor (`[name=índice]` dá erro de
  caractere inválido). Use `children.find(...)` nesses casos.
- Texto que quebra linha: `textAutoResize = 'HEIGHT'` **e** `resize(936, h)`.
  Só `FILL` colapsa o nó.
- Ao rotacionar, defina `rotation` e **depois** `x`/`y` — a rotação desloca a
  âncora.
- Se um script falhar no meio, o Figma desfaz tudo. Releia o estado antes de
  refazer.

## Propriedade intelectual

Desde 2026-10-05 o Gustavo decidiu usar personagens famosos nas capas pra
prender atenção, sabendo do risco (conta comercial, chance de derrubada por
direito autoral). Não repita o aviso a cada pedido.

- A Magnific barra alguns personagens com "NSFW: Content detected" (não cobra):
  Simpsons e Marvel (Homem de Ferro, Ciclope) caíram, inclusive mandando só a
  imagem do personagem sem citar o nome. Não tente driblar o filtro; troque de
  personagem.
- Passaram: Garfield, Bob Esponja, Batman, Scooby-Doo, Papa-Léguas e Coiote,
  Mario, Flash (Zootopia) e Tio Patinhas. Ou seja, não é "tudo da Disney".
  Personagem novo: teste com 1 imagem antes de gerar o carrossel inteiro.
- Gente real (atores, famosos) tem também direito de imagem: prefira
  personagem animado; se for herói de filme, capacete/máscara e estilo 3D
  animado em vez do rosto do ator.
- Alternativa sem risco, se ele quiser: herói/mascote original nas cores da
  paleta, salvo como Personagem na biblioteca da Magnific.

## Contexto do perfil

@devbygusta é o perfil de dev do Gustavo, usado para captar clientes. Ele vende
site institucional a partir de R$800 e atende o Brasil todo, sem nicho. Os cases
já publicados seguem 9 slides (Capa, Sobre, Desafio, Primeira dobra, Dores,
Estrutura, Paleta, No ar, Vamos criar) — carrossel de case usa essa estrutura;
carrossel educativo usa a deste documento.
