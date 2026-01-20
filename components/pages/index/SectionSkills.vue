<template>
    <section class="skills" ref="secSkills">
      <div class="titulo" data-anim>
        <h2>Skills</h2>
        <p>Tecnologias que aplico em meus projetos</p>
      </div>
  
      <div class="quadros">
        <!-- Linha: HTML + CSS -->
        <div class="linha inteiro">
          <div class="quadro um metade" data-anim>
            <Svgs nome="html" />
            <div class="texto">
              <h3>HTML 5</h3>
            </div>
          </div>
  
          <div class="quadro dois metade" data-anim>
            <Svgs nome="css" />
            <div class="texto">
              <h3>CSS 3</h3>
            </div>
          </div>
        </div>
  
        <!-- Linha: (JS/Blender + Sass) + Card 3D -->
        <div class="linha inteiro">
          <div class="coluna doisTercos">
            <div class="linha inteiro">
              <div class="quadro tres metade" data-anim>
                <Svgs nome="javascript" />
                <div class="texto">
                  <h3>JavaScript</h3>
                </div>
              </div>
  
              <div class="quadro quatro metade" data-anim>
                <Svgs nome="blender" />
                <div class="texto">
                  <h3>Blender</h3>
                  <p>Para criar elementos 3D</p>
                </div>
              </div>
            </div>
  
            <div class="quadro cinco inteiro" data-anim>
              <Svgs nome="sass" />
              <div class="texto">
                <h3>Sass</h3>
              </div>
            </div>
          </div>
  
          <!-- inicia o 3D quando entrar em view -->
          <div class="quadro seis terco" data-anim="cubo">
            <div class="elemento" ref="canvasCubo"></div>
            <div class="texto">
              <h3>Animação 3D</h3>
              <p>Uso o ThreeJS para aplicar elementos 3D</p>
            </div>
          </div>
        </div>
  
        <!-- Linha: Nuxt + Figma + GitHub/GitLab/TS -->
        <div class="linha inteiro">
          <div class="quadro sete terco" data-anim>
            <Svgs nome="nuxtjs" />
            <div class="texto">
              <h3>NuxtJS</h3>
            </div>
          </div>
  
          <div class="coluna doisTercos">
            <div class="quadro oito inteiro" data-anim>
              <Svgs nome="figma" />
              <div class="texto">
                <h3>Figma</h3>
              </div>
            </div>
  
            <div class="linha inteiro">
              <div class="quadro nove terco" data-anim>
                <Svgs nome="github" />
                <div class="texto">
                  <h3>GitHub</h3>
                </div>
              </div>
  
              <div class="quadro dez terco" data-anim>
                <Svgs nome="gitlab" />
                <div class="texto">
                  <h3>GitLab</h3>
                </div>
              </div>
  
              <div class="quadro onze terco" data-anim>
                <Svgs nome="typescript" />
                <div class="texto">
                  <h3>TypeScript</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Linha: React + Node -->
        <div class="linha inteiro">
          <div class="quadro doze metade" data-anim>
            <Svgs nome="react" />
            <div class="texto">
              <h3>ReactJS</h3>
            </div>
          </div>
  
          <div class="quadro treze metade" data-anim>
            <Svgs nome="node" />
            <div class="texto">
              <h3>NodeJS</h3>
            </div>
          </div>
        </div>
      </div>
  
      <div class="divisor"></div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
  import Svgs from '../../global/svgs/Svgs.vue'
  
  const secSkills = ref<HTMLElement | null>(null)
  const canvasCubo = ref<HTMLElement | null>(null)
  
  let renderer: any = null
  let scene: any = null
  let camera: any = null
  let model: any = null
  let animationId: number | null = null
  let onResize: (() => void) | null = null
  
  let io: IntersectionObserver | null = null
  let cuboIniciado = false
  
  async function criar3dCubo() {
    if (!canvasCubo.value) return
  
    const THREE = await import('three')
    const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js')
  
    const el = canvasCubo.value
    const width = el.clientWidth || 260
    const height = el.clientHeight || 260
  
    scene = new THREE.Scene()
  
    camera = new THREE.PerspectiveCamera(1, width / height, 0.1, 500)
    camera.position.set(0, 10, 2)
    camera.lookAt(0, -0.1, 0)
  
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    el.appendChild(renderer.domElement)
  
    const loader = new GLTFLoader()
    loader.load('/images/3d/cubo.glb', (gltf: any) => {
      model = gltf.scene
  
      const box = new THREE.Box3().setFromObject(model)
      const center = box.getCenter(new THREE.Vector3())
      model.position.set(-center.x, -center.y, -center.z)
  
      scene.add(model)
      scene.add(new THREE.AmbientLight(0xffffff, 0.1))
  
      const directionalLight = new THREE.DirectionalLight(0xffffff, 3)
      scene.add(directionalLight)
    })
  
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      if (model) model.rotation.z += 0.01
      renderer.render(scene, camera)
    }
    animate()
  
    onResize = () => {
      if (!canvasCubo.value || !renderer || !camera) return
      const newWidth = canvasCubo.value.clientWidth || 260
      const newHeight = canvasCubo.value.clientHeight || 260
      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }
  
    window.addEventListener('resize', onResize)
  }
  
  async function iniciar3dSePreciso() {
    if (cuboIniciado) return
    cuboIniciado = true
    await criar3dCubo()
  }
  
  function configurarAnimacoesScroll() {
    const root = secSkills.value
    if (!root) return
  
    const els = Array.from(root.querySelectorAll<HTMLElement>('[data-anim]'))
  
    // ✅ stagger mais “cremoso”
    els.forEach((el, i) => {
      el.style.setProperty('--delay', `${i * 80}ms`)
    })
  
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    if (reduce) {
      els.forEach((el) => el.classList.add('is-inview'))
      iniciar3dSePreciso()
      return
    }
  
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-inview'))
      iniciar3dSePreciso()
      return
    }
  
    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
  
          const el = entry.target as HTMLElement
          el.classList.add('is-inview')
          io?.unobserve(el)
  
          if (el.dataset.anim === 'cubo') iniciar3dSePreciso()
        })
      },
      {
        threshold: 0.12,
        // entra um pouco antes e dá sensação mais fluida
        rootMargin: '0px 0px -8% 0px'
      }
    )
  
    els.forEach((el) => io?.observe(el))
  }
  
  function destruir3d() {
    if (animationId) cancelAnimationFrame(animationId)
    animationId = null
  
    if (onResize) window.removeEventListener('resize', onResize)
    onResize = null
  
    try {
      if (renderer?.domElement?.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement)
      renderer?.dispose?.()
    } catch (e) {}
  
    renderer = null
    scene = null
    camera = null
    model = null
  }
  
  onMounted(async () => {
    await nextTick()
    configurarAnimacoesScroll()
  })
  
  onBeforeUnmount(() => {
    io?.disconnect()
    io = null
    destruir3d()
  })
  </script>
  
  <style lang="sass" scoped>
  section.skills
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    width: 100%
    position: relative
    overflow: hidden
    background: #131519
    padding-bottom: 140px
  
    [data-anim]
      opacity: 0
      transform: translate3d(0, 14px, 0) scale(.985)
      filter: blur(4px)
      transition-property: opacity, transform, filter
      transition-duration: .75s, .75s, .75s
      transition-timing-function: cubic-bezier(.16, 1, .3, 1)
      transition-delay: var(--delay, 0ms)
      will-change: transform, opacity, filter
  
    [data-anim].is-inview
      opacity: 1
      transform: translate3d(0, 0, 0) scale(1)
      filter: blur(0)
  
    .divisor
      width: calc(100% + 50px)
      height: 150px
      background-color: #131519
      position: absolute
      bottom: -65px
      left: -25px
      transform: rotate(-4deg)
      z-index: 1
  
    .titulo
      display: flex
      flex-direction: column
      align-items: center
      justify-content: center
      text-align: center
      width: 100%
      padding: 40px 80px
      gap: 20px
      background: linear-gradient(0deg, var(--cor-escuro-2), var(--cor-escuro-3))
  
      h2
        font-family: var(--bold)
        font-size: var(--f10)
        line-height: 1
        width: 100%
        max-width: 650px
        background: linear-gradient(0deg, #fddf5a, var(--cor-branco))
        -webkit-background-clip: text
        -webkit-text-fill-color: transparent
        background-clip: text
        -webkit-text-stroke: 1px #FFB12B
        text-stroke: 1px #FFB12B
  
      p
        font-family: var(--light)
        font-size: var(--f2)
        color: var(--cor-cinza)
        line-height: 1.5
        width: 100%
        max-width: 500px
  
    .quadros
      display: flex
      flex-wrap: wrap
      justify-content: space-between
      width: 100%
      padding: 0 80px 40px 80px
      gap: 20px
  
      .quadro
        display: flex
        background-color: var(--cor-escuro-3)
        border-radius: 10px
        position: relative
        overflow: hidden
        min-width: 0
  
        :deep(svg)
          position: absolute
          z-index: 1
          pointer-events: none
          width: 120px
          height: auto
          max-width: 60%
          max-height: 80%
  
        .texto
          display: flex
          flex-direction: column
          align-items: flex-start
          justify-content: flex-start
          width: 100%
          gap: 5px
          padding: 30px
          position: relative
          z-index: 2
  
          h3
            font-family: var(--semibold)
            font-size: var(--f2)
            color: var(--cor-branco)
            line-height: 1.5
  
          p
            font-family: var(--light)
            font-size: var(--f1)
            color: var(--cor-cinza)
            line-height: 1.5
  
        .elemento
          position: absolute
          top: 0
          left: 50%
          transform: translateX(-50%)
          width: 100%
          height: 100%
          border-radius: 20px
          z-index: 0
          pointer-events: none
  
        &.um
          background: linear-gradient(80deg, var(--cor-escuro-3) 70%, var(--cor-azul-escuro))
          padding: 60px 0 0 0
  
          :deep(svg)
            fill: var(--cor-azul-claro)
            width: 130px
            right: 0
            top: 20px
  
        &.dois
          background: linear-gradient(70deg, var(--cor-escuro-3) 70%, #3B3C36)
          padding: 60px 0 0 0
  
          :deep(svg)
            fill: #FFC42E
            width: 130px
            right: 0
            top: 20px
  
        &.tres
          background: linear-gradient(50deg, var(--cor-escuro-3) 70%, var(--cor-roxo-escuro))
          padding: 60px 0 0 0
  
          :deep(svg)
            fill: var(--cor-roxo)
            width: 120px
            top: 0
            right: 30px
  
        &.quatro
          background: linear-gradient(40deg, var(--cor-escuro-3) 70%, var(--cor-laranja-escuro))
          padding: 60px 0 0 0
  
          :deep(svg)
            fill: var(--cor-laranja-forte)
            width: 80px
            top: 0
            right: 30px
  
        &.cinco
          background: linear-gradient(60deg, var(--cor-escuro-3) 60%, var(--cor-rosa-escuro))
          padding: 60px 0 0 0
  
          :deep(svg)
            fill: var(--cor-rosa)
            width: 230px
            top: 0
            right: 0
  
        &.seis
          background: linear-gradient(0deg, var(--cor-escuro-3) 50%, var(--cor-dourado-escuro-1))
          justify-content: flex-end
          align-items: flex-end
          padding: 0 0 30px 0
  
          .texto
            align-items: center
            text-align: center
  
        &.sete
          background: linear-gradient(0deg, var(--cor-escuro-3) 50%, var(--cor-dourado-escuro-1))
          justify-content: flex-end
          align-items: flex-end
          padding: 0 0 30px 0
  
          .texto
            align-items: center
            text-align: center
  
          :deep(svg)
            fill: #FFB12B
            width: 230px
            top: 0
            right: 0
  
        &.oito
          background: linear-gradient(50deg, var(--cor-escuro-3) 70%, var(--cor-rosado-escuro))
          padding: 60px 0 0 0
  
          :deep(svg)
            fill: var(--cor-rosado)
            width: 230px
            top: 0
            right: 0
  
        &.nove
          padding: 70px 0 0 0
  
          .texto
            align-items: center
            text-align: center
  
          :deep(svg)
            width: 40px
            top: 40px
            right: 50%
            transform: translateX(50%)
  
        &.dez
          padding: 70px 0 0 0
  
          .texto
            align-items: center
            text-align: center
  
          :deep(svg)
            width: 40px
            top: 40px
            right: 50%
            transform: translateX(50%)
  
        &.onze
          padding: 70px 0 0 0
  
          .texto
            align-items: center
            text-align: center
  
          :deep(svg)
            width: 40px
            top: 40px
            right: 50%
            transform: translateX(50%)
  
        &.doze
          background: linear-gradient(80deg, var(--cor-escuro-3) 70%, var(--cor-azul-escuro))
          padding: 60px 0 0 0
  
          :deep(svg)
            width: 150px
            top: 0
            right: 0
            border-radius: 0 20px 0 0
  
        &.treze
          background: linear-gradient(30deg, var(--cor-escuro-3) 50%, var(--cor-amarelo-escuro))
          padding: 60px 0 0 0
  
          :deep(svg)
            width: 200px
            top: 0
            right: 30px
  
      .linha
        display: flex
        justify-content: space-between
        gap: 20px
  
      .coluna
        display: flex
        flex-direction: column
        justify-content: space-between
        gap: 20px
        min-width: 0
  
      .metade
        width: 50%
  
      .terco
        width: 33.33%
  
      .doisTercos
        width: 66.66%
  
      .inteiro
        width: 100%
  
  @media screen and (max-width: 1000px)
    section.skills
  
      .divisor
        height: 100px
  
      .titulo
        padding: 40px 30px
        gap: 20px
  
        h2
          font-size: var(--f8)
  
      .quadros
        padding: 0 30px 40px 30px
  
        .quadro
          .texto
            padding: 25px
  
          &.um
            padding: 0 80px 0 0
  
            :deep(svg)
              width: 60px
              right: 0
              top: 25px
  
          &.dois
            padding: 0 80px 0 0
  
            :deep(svg)
              width: 60px
              right: 0
              top: 25px
  
          &.tres
            padding: 60px 0 0 0
  
            :deep(svg)
              width: 100px
              right: 40px
  
          &.quatro
            padding: 0
  
            :deep(svg)
              width: 50px
              top: 0
              right: 20px
  
          &.cinco
            padding: 70px 0 0 0
  
            :deep(svg)
              width: 140px
  
          &.seis
            padding: 150px 0 10px 0
  
          &.sete
            padding: 40px 0 0 0
  
            :deep(svg)
              width: 120px
  
          &.oito
            padding: 70px 0 0 0
  
            :deep(svg)
              width: 150px
  
          &.nove,
          &.dez,
          &.onze
            display: flex
            flex-direction: row
            padding: 0 0 0 55px
  
            .texto
              flex-direction: row
              text-align: left
  
            :deep(svg)
              width: 26px
              top: 24px
              right: auto
              left: 34px
              transform: none
  
          &.doze
            padding: 40px 0 0 0
  
            :deep(svg)
              width: 80px
  
          &.treze
            padding: 70px 0 0 0
  
            :deep(svg)
              width: 130px
              right: 40px
  
        .linha
          flex-direction: column-reverse
          flex-wrap: wrap
  
        .metade,
        .terco,
        .doisTercos,
        .inteiro
          width: 100%
</style>
  