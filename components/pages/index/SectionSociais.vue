<template>
  <section class="social">
    <div class="titulo">
      <h2>Redes Sociais</h2>
    </div>

    <div class="itens">
      <div class="conteudo">
        <div class="canvas" ref="canvasContainer" aria-hidden="true"></div>

        <div class="item">
          <p>LinkedIn</p>
          <div class="icone">
            <a href="https://linkedin.com/in/gubernardi" target="_blank"><img src="/images/linkedin.svg" alt="Ícone LinkedIn" /></a>
          </div>
        </div>

        <div class="item">
          <p>GitHub</p>
          <div class="icone">
            <a href="https://github.com/guubernardi" target="_blank"><img src="/images/github.svg" alt="Ícone GitHub" /></a>
          </div>
        </div>

        <div class="item">
          <p>WhatsApp</p>
          <div class="icone">
            <a href="https://w.app/ln2fgx" target="_blank"><img src="/images/whatsapp.svg" alt="Ícone WhatsApp" /></a>
          </div>
        </div>

        <div class="item item--email">
          <p>Email</p>
          <div class="icone">
            <a href="mailto:gubernardi@hotmail.com?" target="_blank"><img src="/images/email.svg" alt="Ícone Email" /></a>
          </div>
        </div>
      </div>
    </div>

    <div class="divisor"></div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'

const canvasContainer = ref(null)

let renderer, scene, camera, composer, tube
let animationId = null
let resizeObs = null
let mq = null

function destroyLinhaBloom() {
  if (animationId) cancelAnimationFrame(animationId)
  animationId = null

  if (resizeObs) resizeObs.disconnect()
  resizeObs = null

  if (tube?.geometry) tube.geometry.dispose()
  if (tube?.material) tube.material.dispose()
  if (composer) composer.dispose()
  if (renderer) renderer.dispose()

  renderer = scene = camera = composer = tube = null

  const el = canvasContainer.value
  if (el) el.innerHTML = ''
}

function criarLinhaBloom() {
  const el = canvasContainer.value
  if (!el) return

  // se estiver em mobile/tablet, não cria a linha
  if (mq?.matches) return

  // evita duplicar canvas (hot reload / navegação)
  el.innerHTML = ''

  const width = Math.max(1, el.clientWidth)
  const height = Math.max(1, el.clientHeight)

  // se o container estiver “achatado” (ex: display none), não cria
  if (height < 10 || width < 10) return

  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(20, width / height, 0.1, 100)
  camera.position.set(0, 0, 8)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.setSize(width, height)
  renderer.setClearColor(0x000000, 0)

  try {
    renderer.outputColorSpace = THREE.SRGBColorSpace
  } catch {
    renderer.outputEncoding = THREE.sRGBEncoding
  }

  el.appendChild(renderer.domElement)

  const aspect = width / height
  const xRange = 6.5 * aspect

  const curvePoints = []
  const segments = 260
  for (let i = 0; i <= segments; i++) {
    const x = (i / segments) * (xRange * 2) - xRange
    curvePoints.push(new THREE.Vector3(x, 0, 0))
  }

  const buildTube = (points) => {
    const curve = new THREE.CatmullRomCurve3(points)
    curve.curveType = 'catmullrom'
    curve.tension = 0.5
    return new THREE.TubeGeometry(curve, segments, 0.03, 10, false)
  }

  const tubeGeometry = buildTube(curvePoints)

  const material = new THREE.MeshBasicMaterial({
    color: 0xffb12b,
    transparent: true,
    opacity: 1,
    blending: THREE.AdditiveBlending
  })

  tube = new THREE.Mesh(tubeGeometry, material)
  scene.add(tube)

  const renderScene = new RenderPass(scene, camera)

  const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), 1.2, 0.35, 0.8)
  bloomPass.threshold = 0
  bloomPass.strength = 0.75
  bloomPass.radius = 0.35

  const outputPass = new OutputPass()

  composer = new EffectComposer(renderer)
  composer.addPass(renderScene)
  composer.addPass(bloomPass)
  composer.addPass(outputPass)

  let time = 0

  const animate = () => {
    animationId = requestAnimationFrame(animate)
    time += 0.03

    for (let i = 0; i <= segments; i++) {
      const x = (i / segments) * (xRange * 2) - xRange
      const y = Math.sin(x * 0.6 + time * 2.2) * 0.10
      curvePoints[i].set(x, y, 0)
    }

    const newGeometry = buildTube(curvePoints)
    tube.geometry.dispose()
    tube.geometry = newGeometry

    composer.render()
  }

  animate()

  resizeObs = new ResizeObserver(() => {
    if (!renderer || !composer || !camera) return
    if (mq?.matches) return

    const w = Math.max(1, el.clientWidth)
    const h = Math.max(1, el.clientHeight)
    if (h < 10 || w < 10) return

    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setSize(w, h)
    composer.setSize(w, h)
  })
  resizeObs.observe(el)
}

onMounted(async () => {
  await nextTick()

  mq = window.matchMedia('(max-width: 1000px)')

  const sync = () => {
    if (mq.matches) {
      destroyLinhaBloom()
    } else {
      // recria se voltou pro desktop
      destroyLinhaBloom()
      criarLinhaBloom()
    }
  }

  // inicia de acordo com o tamanho atual
  sync()

  // escuta mudanças de breakpoint
  if (mq.addEventListener) mq.addEventListener('change', sync)
  else mq.addListener(sync) // fallback antigo
})

onBeforeUnmount(() => {
  if (mq) {
    try {
      mq.removeEventListener?.('change', () => {})
    } catch {}
  }
  destroyLinhaBloom()
})
</script>

<style scoped lang="sass">
section.social
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  position: relative
  width: 100%
  background-color: var(--cor-escuro-1)
  overflow: hidden
  font-family: var(--light)
  min-height: 100vh
  min-height: 100svh

  .titulo
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    width: 100%
    background: var(--cor-escuro-1)
    padding: 50px 0 0 0

    h2
      font-family: var(--bold)
      font-size: var(--f10)
      line-height: 1
      width: 100%
      max-width: 550px
      background: linear-gradient(0deg, #fddf5a, var(--cor-branco))
      -webkit-background-clip: text
      -webkit-text-fill-color: transparent
      background-clip: text
      -webkit-text-stroke: 1px #FFB12B
      text-stroke: 1px #FFB12B

  .itens
    display: flex
    width: 100%

    .conteudo
      position: relative
      width: 100%
      padding: 70px 80px 60px 80px

      display: grid
      grid-template-columns: repeat(4, minmax(160px, 1fr))
      align-items: center
      justify-items: center
      gap: 40px

      .canvas
        position: absolute
        left: 0
        right: 0
        top: 50%
        transform: translateY(-50%)
        height: 50px
        pointer-events: none
        z-index: 1
        overflow: hidden

      .item
        display: flex
        flex-direction: column
        align-items: center
        justify-content: center
        gap: 10px
        z-index: 2

        p
          color: var(--cor-branco)
          opacity: .9

      .icone
        display: flex
        align-items: center
        justify-content: center
        width: 150px
        height: 150px
        border-radius: 50px
        background-color: rgba(78, 60, 34, .55)
        border: 1px solid #FFB12B
        backdrop-filter: blur(20px)

        img
          width: 70px
          height: 70px
          object-fit: contain

  .divisor
    width: calc(100% + 70px)
    height: 150px
    background-color: var(--cor-escuro-3)
    position: absolute
    bottom: -75px
    left: -25px
    transform: rotate(4deg)
    z-index: 1


@media screen and (max-width: 1000px)
  section.social
    justify-content: flex-start
    min-height: auto
    padding-bottom: 140px

    .titulo
      padding: 44px 24px 0 24px

    .itens
      .conteudo
        padding: 46px 24px 0 24px
        grid-template-columns: repeat(2, minmax(0, 1fr))
        gap: 26px 18px

        .canvas
          display: none !important

        .icone
          width: 130px
          height: 130px
          border-radius: 42px

          img
            width: 60px
            height: 60px

@media screen and (max-width: 520px)
  section.social
    .itens
      .conteudo
        grid-template-columns: 1fr
        gap: 22px

        .icone
          width: 140px
          height: 140px
</style>
