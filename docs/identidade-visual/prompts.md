# Prompts

Prompts usados na Magnific com o modelo Nano Banana Pro (`imagen-nano-banana-2`), formato 4:5, resolução 2k. Os prompts ficam em inglês porque o modelo responde melhor; o texto que aparece na imagem fica em português.

## 1. Capa

Referência: estilo `#devbygusta` (id `2357594`). Pra usar o cenário padrão, inclua também a imagem do `@cenario-devbygusta` como referência de imagem.

```
Instagram carousel cover. {PERSONAGEM} rendered as a high-end 3D animated movie character with cinematic lighting and rich detail.
SETTING: {CENÁRIO}, everything color graded in deep navy and cyan, with a few subtle translucent holographic UI panels floating near the character.
POSE: {POSE}.
EXPRESSION: {EXPRESSÃO}.
PROPS: {OBJETOS EM VOLTA}.
COMPOSITION: character big in the frame, filling the lower two thirds, slight low angle.
TYPOGRAPHY: at the top a small white uppercase sans line "{LINHA DE CIMA}". Below it a huge bold condensed all-caps white headline in two lines "{TÍTULO}", the last word partially hidden behind the character's head. At the bottom center small bold white uppercase text "ARRASTA PARA O LADO".
LOOK: deep navy almost black palette (#020715, #021228, #0A4E70), cyan #1AD8E9 and electric blue #07B1E8 glow, teal rim light, volumetric light, particles and bokeh, high contrast, sharp. Vertical 4:5. No other text, no logos, no watermark.
```

Pra linha de cima sair em azul, troque `small white` por `small electric blue`.

### Com imagem do personagem em vez do nome

Mande a imagem do personagem como primeira referência e troque a primeira frase por:

```
Use the character from the FIRST reference image as the hero. Keep the exact same character design, proportions, colors and outfit, but render it as a high-end 3D animated movie character with cinematic lighting and rich detail.
```

Se o gerador bloquear o personagem pelo nome, ele também bloqueia pela imagem. Nesse caso, troque de personagem.

## 2. Poses prontas

| Gancho | POSE | EXPRESSION |
|---|---|---|
| Pânico | both hands grabbing the top of the head, leaning back in panic | mouth wide open screaming, eyes huge with shock |
| Pare | one arm stretched toward the camera, open palm in a stop gesture, hand in the foreground with strong perspective | angry and serious, frowning, teeth clenched |
| Velocidade | sprinting sideways at full speed, body leaning forward, cyan light trails and motion streaks behind | determined confident grin |
| Preguiça | slumped asleep over a glowing laptop keyboard, small "zzz" floating up | lazy, eyes closed, drooling |
| Dinheiro | holding a fan of banknotes close to the face, stacks of cash around | ecstatic grin, dollar signs reflected in the eyes |
| Desconfiado | one hand on the chin, body slightly turned, looking sideways at the viewer | suspicious, one eyebrow raised |
| Apresentando | one open hand held out toward the camera, presenting a small glowing holographic website floating above the palm | proud confident smile |
| Vergonha | one hand covering the face, peeking through the fingers at a broken website panel showing a 404 error | embarrassed, cringing |

## 3. Cena interna (sem texto)

Referências: a capa (ou a cena 02) como **imagem**, pra manter o mesmo personagem, e a imagem do cenário como **estilo**.

Não use o estilo `#devbygusta` sozinho aqui: ele descreve a tipografia das capas, e o modelo acaba escrevendo um título em inglês na cena.

```
The same {PERSONAGEM} as in the reference image, same 3D animated movie look, cinematic.
SCENE: {O QUE ACONTECE NESTA CENA}.
COMPOSITION: the top 45% of the image is dark, calm and completely empty (deep shadow); the scene sits in the lower half.
Color graded deep navy and cyan (#020715, #021228, #0A4E70, #1AD8E9, #07B1E8), teal rim light, volumetric glow, particles.
Absolutely no text, no letters, no words, no logos, no watermark. Vertical 4:5.
```

Se o personagem sair alto demais e encostar no texto, gere de novo com:

```
Wide shot, camera pulled back. IMPORTANT COMPOSITION: the character is small in the frame and the top of the head is below the vertical middle of the image; the entire upper 55% of the image is empty dark shadow with nothing in it, reserved for text.
```

Se o topo sair chapado, com uma emenda reta, acrescente:

```
the top 45% of the image is a seamless dark navy gradient with soft bokeh, no hard edges, no flat color blocks
```

## 4. Personagem original

Usado quando o personagem da capa é bloqueado pelo gerador ou é uma pessoa real. Descreva o visual com detalhes fixos e gere a cena 02 primeiro; depois use essa cena como referência nas outras.

Exemplos usados:

- **Cliente de loja online:** `an original friendly cartoon online shopper, a young woman with curly dark hair in a high bun, round glasses and a bright yellow hoodie, holding a smartphone`
- **Dono de empresa:** `an original cartoon business owner, a stocky bald man with a thick dark beard, round friendly face, white shirt with rolled-up sleeves and an orange tie`
- **Cientista:** `an original faceless cartoon scientist in a bright yellow hazmat suit and a black gas mask with round lenses, face never visible`

## 5. Cenário-assinatura

O prompt que gerou o `@cenario-devbygusta` ([imagem](assets/cenario-devbygusta.jpg)):

```
Empty cinematic background plate for a social media cover. No people, no characters, no text, no letters. A dark futuristic tech room in deep navy, almost black, filled with floating translucent holographic UI panels: website wireframes, analytics dashboards, charts, code windows, browser windows, warning icons and loading spinners, all glowing cyan and electric blue. Volumetric teal light bursting from the center behind where a character would stand, fine glowing particles and bokeh, subtle tech grid lines and thin HUD frame lines near the edges, strong depth of field. Keep the central lower area open for a hero character in the foreground and keep clean dark space in the top third for a big headline. Color palette strictly: abyss navy #020715, night navy #021228, petrol blue #0A4E70, electric blue #07B1E8, cyan glow #1AD8E9, icy white highlights #F3F7F9. High contrast, sharp, premium 3D render look, vertical 4:5.
```

## Problemas comuns e como resolver

| Problema | Solução |
|---|---|
| A cena copiou o "ARRASTA PARA O LADO" da capa | No Figma, aumente o retângulo da cena pra 1210x1512 em `x: -65`; o texto sai do quadro |
| Topo chapado com emenda reta | Retângulo `Scrim emenda` (1080x150, degradê 97% → 85% → 0%) sobre a emenda |
| Personagem encostando no texto ou no chip | Desça o retângulo da cena (`y` entre 60 e 230) |
| "NSFW: Content detected" | É o filtro de personagem. Não cobra crédito; troque o personagem |
| Erro 403 ao gerar várias de uma vez | Mande em lotes de 3, ou uma por vez |
