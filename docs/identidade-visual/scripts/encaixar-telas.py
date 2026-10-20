"""Encaixa prints reais nas telas verdes de um mockup gerado na Magnific.

A IA desenha bem o aparelho e o cenário, mas inventa o texto miúdo das telas.
O caminho é gerar a cena com as telas em verde chapado (#00FF00) e colar o
print real por cima, em perspectiva, com os cantos arredondados.

Uso:
    python encaixar-telas.py cena-verde.png saida.jpg \
        --tela print-notebook.png --tela print-celular.png \
        [--cantos "x,y x,y x,y x,y" --cantos "..."] [--ciano] [--sem-vermelho]

- Uma --tela por aparelho, na ordem da esquerda pra direita. Se um aparelho
  cobrir o outro, passe primeiro o de trás: o seguinte fica na frente.
- Sem --cantos, os cantos saem das bordas do verde. Se a IA deixou parte da
  tela sem pintar, a detecção erra; aí passe os cantos à mão, na ordem
  topo-esquerda, topo-direita, baixo-direita, baixo-esquerda (são os cantos
  "virtuais", onde as bordas retas se cruzam, não o arco arredondado).
- Recorte cada print na proporção da tela: notebook 16:10 (ex.: 1280x800),
  celular na proporção do aparelho gerado (o script avisa qual é).
- --ciano puxa o glow do cenário pro azul elétrico do @devbygusta.
- --sem-vermelho tira as rachaduras laranja que às vezes aparecem na pedra.
- --manter-por-cima troca só o que é verde: o notch do celular, pétalas e
  reflexos que a cena pôs na frente da tela continuam por cima do print.
- --reflexo-ciano pinta de ciano o verde que a tela refletiu fora dela (na
  pedra, na mesa). Use nas cenas escuras do @devbygusta.

Gera também <saida>-conferencia.jpg com os cantos desenhados.
Precisa de: pip install numpy opencv-python-headless
"""
import argparse
import cv2
import numpy as np


def mascara_verde(img):
    b, g, r = [img[..., i].astype(int) for i in range(3)]
    return ((g > 150) & (g - r > 70) & (g - b > 70)).astype(np.uint8)


def ajusta_reta(pts, eixo):
    """eixo 'y': y = a*x + b; eixo 'x': x = a*y + b. Descarta pontos fora da reta e reajusta."""
    p = np.array(pts, float)
    u, v = (p[:, 0], p[:, 1]) if eixo == 'y' else (p[:, 1], p[:, 0])
    a, b = np.polyfit(u, v, 1)
    for _ in range(3):
        res = np.abs(v - (a * u + b))
        ok = res < max(2.0, np.median(res) * 2.5)
        if ok.sum() < 4:
            break
        a, b = np.polyfit(u[ok], v[ok], 1)
    return eixo, a, b


def cruza(l1, l2):
    if l1[0] == 'x':
        l1, l2 = l2, l1
    _, a1, b1 = l1  # y = a1 x + b1
    _, a2, b2 = l2  # x = a2 y + b2
    y = (a1 * b2 + b1) / (1 - a1 * a2)
    return a2 * y + b2, y


def detecta_cantos(comp):
    ys, xs = np.nonzero(comp)
    x0, x1, y0, y1 = xs.min(), xs.max(), ys.min(), ys.max()
    mx, my = int((x1 - x0) * 0.15), int((y1 - y0) * 0.15)
    colunas = range(x0 + mx, x1 - mx, max(1, (x1 - x0) // 40))
    linhas = range(y0 + my, y1 - my, max(1, (y1 - y0) // 40))
    topo = [(c, np.nonzero(comp[:, c])[0].min()) for c in colunas if comp[:, c].any()]
    base = [(c, np.nonzero(comp[:, c])[0].max()) for c in colunas if comp[:, c].any()]
    esq = [(np.nonzero(comp[l, :])[0].min(), l) for l in linhas if comp[l, :].any()]
    dir_ = [(np.nonzero(comp[l, :])[0].max(), l) for l in linhas if comp[l, :].any()]
    t, bt = ajusta_reta(topo, 'y'), ajusta_reta(base, 'y')
    e, d = ajusta_reta(esq, 'x'), ajusta_reta(dir_, 'x')
    return np.float32([cruza(t, e), cruza(t, d), cruza(bt, d), cruza(bt, e)])


def proporcao(q):
    w = (np.linalg.norm(q[1] - q[0]) + np.linalg.norm(q[2] - q[3])) / 2
    h = (np.linalg.norm(q[3] - q[0]) + np.linalg.norm(q[2] - q[1])) / 2
    return w / h


def mascara_arredondada(w, h, r):
    m = np.zeros((h, w), np.uint8)
    cv2.rectangle(m, (r, 0), (w - r, h), 255, -1)
    cv2.rectangle(m, (0, r), (w, h - r), 255, -1)
    for cx, cy in [(r, r), (w - r, r), (r, h - r), (w - r, h - r)]:
        cv2.circle(m, (cx, cy), r, 255, -1, cv2.LINE_AA)
    return m


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('cena')
    ap.add_argument('saida')
    ap.add_argument('--tela', action='append', required=True)
    ap.add_argument('--cantos', action='append')
    ap.add_argument('--ciano', action='store_true')
    ap.add_argument('--sem-vermelho', action='store_true')
    ap.add_argument('--manter-por-cima', action='store_true')
    ap.add_argument('--reflexo-ciano', action='store_true')
    a = ap.parse_args()

    base = cv2.imread(a.cena)
    H_, W_ = base.shape[:2]
    # quanto cada pixel da cena original é "tela verde" (1) ou outra coisa (0)
    b0, g0, r0 = [base[..., i].astype(np.float32) for i in range(3)]
    chave = np.clip((g0 - np.maximum(r0, b0) - 40) / 60, 0, 1)
    chave = cv2.GaussianBlur(cv2.dilate(chave, np.ones((3, 3), np.uint8)), (3, 3), 0)
    if a.cantos:
        quads = [np.float32([list(map(float, p.split(','))) for p in c.split()]) for c in a.cantos]
    else:
        n, lab, st, _ = cv2.connectedComponentsWithStats(mascara_verde(base), 8)
        comps = sorted([i for i in range(1, n) if st[i][4] > 20000], key=lambda i: st[i][0])
        quads = [detecta_cantos(lab == i) for i in comps]
    if len(quads) != len(a.tela):
        raise SystemExit(f'{len(quads)} telas na cena, {len(a.tela)} prints passados')

    telas_m = np.zeros((H_, W_), np.uint8)
    cheias, warps = [], []
    for k, (q, arq) in enumerate(zip(quads, a.tela)):
        src = cv2.imread(arq)
        h, w = src.shape[:2]
        print(f'tela {k + 1}: cantos {q.round(1).tolist()}, proporção da tela {proporcao(q):.3f}, do print {w / h:.3f}')
        if w < 1000:  # print pequeno: amplia antes de entortar pra não borrar
            f = 1000 / w
            src = cv2.resize(src, None, fx=f, fy=f, interpolation=cv2.INTER_LANCZOS4)
            h, w = src.shape[:2]
        raio = int(w * (0.16 if w / h < 0.75 else 0.005))
        M = cv2.getPerspectiveTransform(np.float32([[0, 0], [w, 0], [w, h], [0, h]]), q)
        warp = cv2.warpPerspective(src, M, (W_, H_), flags=cv2.INTER_CUBIC)
        m = cv2.warpPerspective(mascara_arredondada(w, h, raio), M, (W_, H_))
        m = cv2.dilate(m, np.ones((5, 5), np.uint8))
        cheias.append(m.copy())
        # o que vem depois fica na frente: tira daqui o corpo dos aparelhos seguintes
        for q2 in quads[k + 1:]:
            corpo = np.zeros((H_, W_), np.uint8)
            cv2.fillConvexPoly(corpo, q2.astype(np.int32), 255)
            borda = max(9, int(np.linalg.norm(q2[1] - q2[0]) * 0.04)) | 1
            m = np.minimum(m, 255 - cv2.dilate(corpo, np.ones((borda, borda), np.uint8)))
        # reflexo leve de vidro
        gy, gx = np.mgrid[0:h, 0:w].astype(np.float32)
        brilho = np.clip(1 - (gx / w + gy / h) / 1.2, 0, 1) ** 2 * 0.06 * 255
        brilho = cv2.warpPerspective(np.dstack([brilho] * 3), M, (W_, H_))
        al = m.astype(np.float32) / 255
        if a.manter_por_cima:
            al = al * chave
        al = al[..., None]
        base = (base * (1 - al) + np.clip(warp + brilho, 0, 255) * al).astype(np.uint8)
        telas_m = np.maximum(telas_m, m)
        warps.append(warp)

    # verde que sobrou dentro de uma tela é dela: completa com o print
    for m, warp in zip(cheias, warps):
        sobra = cv2.dilate(mascara_verde(base), np.ones((5, 5), np.uint8)) > 0
        sel = sobra & (m > 0)
        base[sel] = warp[sel]
    # tira o reflexo verde que ficou no contorno das telas
    contorno = cv2.dilate(telas_m, np.ones((31, 31), np.uint8)) - cv2.erode(telas_m, np.ones((15, 15), np.uint8))
    b, g, r = [base[..., i].astype(int) for i in range(3)]
    vaz = (contorno > 0) & (g > r + 12) & (g > b + 12)
    base[..., 1] = np.where(vaz, np.maximum(r, b), g).astype(np.uint8)

    if a.reflexo_ciano:
        fora = cv2.dilate(telas_m, np.ones((9, 9), np.uint8)) == 0
        hsv = cv2.cvtColor(base, cv2.COLOR_BGR2HSV)
        verde = fora & (hsv[..., 0] > 35) & (hsv[..., 0] < 85) & (hsv[..., 1] > 60)
        hsv[..., 0] = np.where(verde, 96, hsv[..., 0])  # 96 = azul elétrico/ciano no OpenCV
        base = cv2.cvtColor(hsv, cv2.COLOR_HSV2BGR)

    if a.ciano or a.sem_vermelho:
        prot = cv2.GaussianBlur(cv2.dilate(telas_m, np.ones((7, 7), np.uint8)), (9, 9), 0).astype(np.float32) / 255
        hsv = cv2.cvtColor(base, cv2.COLOR_BGR2HSV).astype(np.float32)
        h, s, v = hsv[..., 0], hsv[..., 1], hsv[..., 2]
        if a.sem_vermelho:
            yy = np.arange(H_)[:, None] * np.ones((1, W_))
            s = np.where(((h < 22) | (h > 165)) & (s > 60) & (yy > H_ * 0.7), s * 0.12, s)
        if a.ciano:  # azul royal (#1E6BFF) -> azul elétrico (#07B1E8)
            w = np.clip(1 - np.abs(h - 112) / 16, 0, 1) * np.clip((s - 25) / 40, 0, 1)
            h, s = h - 13 * w, s * (1 + 0.08 * w)
        novo = cv2.cvtColor(np.dstack([h, np.clip(s, 0, 255), v]).astype(np.uint8), cv2.COLOR_HSV2BGR)
        base = (novo * (1 - prot[..., None]) + base * prot[..., None]).astype(np.uint8)

    cv2.imwrite(a.saida, base, [cv2.IMWRITE_JPEG_QUALITY, 93])
    conf = base.copy()
    for q in quads:
        cv2.polylines(conf, [q.astype(np.int32)], True, (0, 0, 255), 3)
    cv2.imwrite(a.saida.rsplit('.', 1)[0] + '-conferencia.jpg', conf, [cv2.IMWRITE_JPEG_QUALITY, 80])


if __name__ == '__main__':
    main()
