<template>
  <span class="edusites-icone" :style="estilo" v-html="svg" />
</template>

<script setup>
// Substitui o <SvgIcone> da @edusites/icons com a mesma API (nome, cor, tamanho,
// className) e o mesmo HTML de saída, para nenhum CSS do site perceber a troca.
//
// O da lib resolvia o nome em runtime: no servidor pelo objeto com os 1088
// ícones e, no cliente, por um import.meta.glob que fica atrás de um
// `typeof import.meta.glob === 'function'`. O Vite troca a chamada do glob pelo
// mapa de chunks, mas o typeof continua lá e no navegador dá 'undefined', então
// todo ícone caía no fallback e baixava o monolito de 2,3 MB. Aqui o SVG vem do
// helpers/icones.js, que só tem os ícones usados, e sai pronto já no SSR: sem
// placeholder vazio na hidratação e sem request por ícone.
import { computed } from 'vue'
import { ICONES } from '~/helpers/icones'

const props = defineProps({
  nome: { type: String, required: true },
  // sem cor, herda do CSS (fill: currentColor)
  cor: { type: String, default: 'currentColor' },
  // sem tamanho, 1em: escala com o font-size de quem o envolve
  tamanho: { type: [Number, String], default: undefined },
  className: { type: String, default: undefined },
})

// o mesmo SVG aparece dezenas de vezes por página (seta, check): monta uma vez só
const montados = new Map()

function montar(nome, cor, tamanho, className) {
  const chave = `${nome}|${cor}|${tamanho}|${className}`
  if (montados.has(chave)) return montados.get(chave)

  const bruto = ICONES[nome]
  if (!bruto) {
    if (import.meta.dev) console.warn(`[SvgIcone] "${nome}" não está em helpers/icones.js`)
    return ''
  }

  // mesma montagem do render.js da lib: tira os fill do desenho para a cor vir
  // do atributo do <svg> (e por ele, do currentColor)
  const viewBox = (bruto.match(/viewBox=["']([^"']+)["']/) || [])[1] || '0 0 24 24'
  const conteudo = bruto.slice(bruto.indexOf('>') + 1, bruto.lastIndexOf('</svg>')).replace(/\s*fill="[^"]*"/g, '')
  const classe = className ? ` class="${className}"` : ''
  const svg = `<svg width="${tamanho}" height="${tamanho}" viewBox="${viewBox}" fill="${cor}" xmlns="http://www.w3.org/2000/svg"${classe}>${conteudo}</svg>`

  montados.set(chave, svg)
  return svg
}

const nomeNormalizado = computed(() => String(props.nome || '').toLowerCase().trim())

const svg = computed(() =>
  montar(nomeNormalizado.value, props.cor || 'currentColor', props.tamanho == null ? '1em' : props.tamanho, props.className || '')
)

// a caixa tem o tamanho do ícone mesmo vazia, e é a mesma string que a lib
// gerava, para o SSR antigo e o novo baterem
const estilo = computed(() => {
  const t = props.tamanho
  const d = t == null ? '1em' : typeof t === 'number' || /^\d+$/.test(String(t)) ? `${t}px` : String(t)
  return `display:inline-flex;line-height:0;width:${d};height:${d}`
})
</script>
