<template>
    <section id="eu" class="sobre">
      <div class="wrap">
        <div class="topo" aria-hidden="true">
          <Svgs nome="nuxtjs-divisor" />
        </div>
  
        <div class="quadro">
          <div class="conteudo">
            <!-- ESQUERDA -->
            <div class="col-esq">
              <h2>QUEM SOU EU?</h2>
  
              <div class="pessoa">
                <div
                  class="foto"
                  aria-label="Foto / 3D"
                  @mouseenter="hover3d = true"
                  @mouseleave="hover3d = false"
                >
                  <img
                    class="foto__img"
                    src="/images/gustavo.svg"
                    alt="Foto do Gustavo Bernardi"
                    loading="lazy"
                    decoding="async"
                  />
 
                  <div class="canvas" ref="canvasGustavo" aria-hidden="true"></div>
                </div>
  
                <p>
                  Sou Gustavo Bernardi, estudante de Análise e Desenvolvimento de Sistemas (3º semestre).
                  Estou me especializando em Front-End, criando soluções web com foco em interfaces modernas,
                  responsivas e bem estruturadas. <br /><br />
                  Estou à procura do meu primeiro emprego na área de desenvolvimento.
                </p>
              </div>
            </div>

            <div class="col-dir">
              <div class="itens">
                <div class="item" v-for="item in state.itens" :key="item.id">
                  <div class="icone" aria-hidden="true">
                    <Svgs :nome="item.icone" />
                  </div>
                  <p>{{ item.texto }}</p>
                </div>
              </div>
  
              <div class="acao">
                <NuxtLink to='/curriculo'><ElementosBotao texto="Ver Curriculo" icone="curriculo"/></NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import * as THREE from 'three'
  import { GLTFLoader } from 'three/examples/jsm/Addons.js'
  
  const canvasGustavo = ref(null)
  const hover3d = ref(false)
  
  const state = reactive({
    itens: [
      { id: 1, 
        icone: 'estudante', 
        texto: 'Estudante de Análise e Desenvolvimento de Sistemas' 
    },
      { id: 2, 
        icone: 'front', 
        texto: 'Front End' 
    },
      { id: 3, 
        icone: 'planeta', 
        texto: 'Inglês Básico (em evolução)' 
    },
      { id: 4, 
        icone: 'localizacao', 
        texto: 'São Bernardo do Campo - SP' 
    }
    ]
  })
  
  function criar3d() {
    if (!canvasGustavo.value) return
  
    const width = canvasGustavo.value.clientWidth || 165
    const height = canvasGustavo.value.clientHeight || 165
  
    const scene = new THREE.Scene()
  
    const fov = 2
    const cameraPos = { x: 15, y: 3, z: 0 }
    const lookAt = { x: -5, y: -0.02, z: 0 }
  
    const camera = new THREE.PerspectiveCamera(fov, width / height, 0.1, 500)
    camera.position.set(cameraPos.x, cameraPos.y, cameraPos.z)
    camera.lookAt(lookAt.x, lookAt.y, lookAt.z)
  
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
  
    canvasGustavo.value.innerHTML = ''
    canvasGustavo.value.appendChild(renderer.domElement)
  
    let model
    const loader = new GLTFLoader()
  
    loader.load('/images/3d/gustavo.glb', (gltf) => {
      model = gltf.scene
  
      const box = new THREE.Box3().setFromObject(model)
      const center = box.getCenter(new THREE.Vector3())
      model.position.x = -center.x
      model.position.y = -center.y
      model.position.z = -center.z
  
      scene.add(model)
      scene.add(new THREE.AmbientLight(0xffffff, 5))
  
      const directionalLight = new THREE.DirectionalLight(0xffffff, 7)
      scene.add(directionalLight)
    })
  
    let rotationY = 0
    let isDragging = false
    let lastMouseX = 0
  
    const handleStart = (clientX) => {
      isDragging = true
      lastMouseX = clientX
      renderer.domElement.style.cursor = 'grabbing'
    }
  
    const handleMove = (clientX) => {
      if (!isDragging || !model) return
      const deltaX = clientX - lastMouseX
      rotationY -= deltaX * 0.01
      model.rotation.y = rotationY
      lastMouseX = clientX
    }
  
    const handleEnd = () => {
      isDragging = false
      renderer.domElement.style.cursor = 'grab'
    }
  
    const handleMouseDown = (event) => {
      handleStart(event.clientX)
      window.addEventListener('mousemove', handleMouseMoveGlobal)
      window.addEventListener('mouseup', handleMouseUpGlobal)
    }
  
    const handleMouseMoveGlobal = (event) => {
      handleMove(event.clientX)
    }
  
    const handleMouseUpGlobal = () => {
      handleEnd()
      window.removeEventListener('mousemove', handleMouseMoveGlobal)
      window.removeEventListener('mouseup', handleMouseUpGlobal)
    }
  
    const handleTouchStart = (event) => {
      if (event.touches.length === 1) handleStart(event.touches[0].clientX)
    }
    const handleTouchMove = (event) => {
      if (event.touches.length === 1) handleMove(event.touches[0].clientX)
    }
    const handleTouchEnd = () => handleEnd()
  
    renderer.domElement.addEventListener('mousedown', handleMouseDown)
    renderer.domElement.addEventListener('touchstart', handleTouchStart, { passive: true })
    renderer.domElement.addEventListener('touchmove', handleTouchMove, { passive: true })
    renderer.domElement.addEventListener('touchend', handleTouchEnd, { passive: true })
    renderer.domElement.style.cursor = 'grab'
  
    const animate = () => {
      requestAnimationFrame(animate)
  
      // ✅ auto-rotate só quando estiver em hover (economiza GPU/CPU)
      if (model && hover3d.value && !isDragging) {
        rotationY -= 0.005
        model.rotation.y = rotationY
      }
  
      renderer.render(scene, camera)
    }
    animate()
  
    window.addEventListener('resize', () => {
      if (!canvasGustavo.value) return
      const newWidth = canvasGustavo.value.clientWidth || 165
      const newHeight = canvasGustavo.value.clientHeight || 165
      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    })
  }
  
  onMounted(() => {
    criar3d()
  })
  </script>
  
  <style lang="sass" scoped>
  section.sobre
    width: 100%
    position: relative
    overflow: visible
    padding: 90px 0 180px 0
    background: #1C1F25
    font-family: var(--light)
  
    .wrap
      width: 100%
      max-width: 1200px
      padding: 0 40px
      margin: 0 auto
      position: relative
  
    .topo
      position: absolute
      left: 50%
      top: -58px
      transform: translateX(-50%)
      z-index: 20
      pointer-events: none
  
      :deep(svg)
        width: 240px !important
        height: auto !important
        display: block
        fill: #FFB12B
        filter: drop-shadow(0 10px 18px rgba(0,0,0,.45))
  
    .quadro
      width: 100%
      border-radius: 36px
      border: 18px solid #FFB12B
      background: rgba(10,12,16,.65)
      box-shadow: 0 30px 80px rgba(0,0,0,.45)
      overflow: hidden
      position: relative
  
    .conteudo
      display: flex
      min-height: 360px
      background: linear-gradient(180deg, rgba(18,21,28,.92), rgba(12,14,19,.92))
  
    .col-esq
      flex: 1.15
      padding: 56px 60px
  
      h2
        font-family: var(--bold)
        font-size: clamp(42px, 4vw, 62px)
        line-height: 0.95
        margin: 0 0 28px 0
        letter-spacing: 1px
        background: linear-gradient(180deg, #FFF, #FFB12B)
        -webkit-background-clip: text
        -webkit-text-fill-color: transparent
        text-shadow: 0 12px 30px rgba(0,0,0,.35)
  
    .pessoa
      display: flex
      align-items: center
      gap: 18px
  
      .foto
        width: 165px
        height: 165px
        border-radius: 999px
        overflow: hidden
        position: relative
        flex: 0 0 auto
        background: linear-gradient(180deg, rgba(255,177,43,.95), rgba(25,28,35,.95))
        box-shadow: 0 18px 35px rgba(0,0,0,.45)
        border: 2px solid rgba(255,177,43,.35)
  
        // FOTO normal
        .foto__img
          position: absolute
          inset: 0
          width: 100%
          height: 100%
          object-fit: cover
          display: block
          transition: opacity .25s ease, transform .25s ease
          opacity: 1
  
        // 3D (por cima, escondido)
        .canvas
          position: absolute
          inset: 0
          width: 100%
          height: 100%
          opacity: 0
          pointer-events: none
          transition: opacity .25s ease
  
          :deep(canvas)
            width: 100% !important
            height: 100% !important
            display: block
  
        &:hover
          .foto__img
            opacity: 0
            transform: scale(1.02)
  
          .canvas
            opacity: 1
  
      p
        font-family: var(--light)
        font-size: 14.5px
        color: rgba(226,231,239,.82)
        line-height: 1.55
        margin: 0
        max-width: 520px
  
    .col-dir
      width: 420px
      border-left: 1px solid rgba(255,255,255,.07)
      display: flex
      flex-direction: column
      justify-content: space-between
  
    .itens
      display: flex
      flex-direction: column
  
    .item
      display: flex
      align-items: center
      gap: 14px
      padding: 22px 26px
      border-bottom: 1px solid rgba(255,255,255,.07)
      background: linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,0))
      transition: background .2s ease
  
      &:hover
        background: rgba(255,177,43,.06)
  
      p
        margin: 0
        font-family: var(--light)
        font-size: 14px
        color: rgba(226,231,239,.82)
  
    .icone
      width: 38px
      height: 38px
      border-radius: 999px
      display: flex
      align-items: center
      justify-content: center
      background: radial-gradient(circle at 30% 30%, rgba(255,177,43,.20), rgba(0,0,0,0))
      border: 1px solid rgba(255,177,43,.14)
  
      :deep(svg)
        width: 16px !important
        height: 16px !important
        display: block
  
    .acao
      padding: 22px 26px 28px
      display: flex
      justify-content: center
  
      .link-cv
        width: 100%
        text-decoration: none
  
      button
        width: 100%
        border: none
        cursor: pointer
        border-radius: 999px
        padding: 14px 18px
        font-family: var(--regular)
        font-size: 14px
        color: #fff
        background: linear-gradient(90deg, rgba(60,58,55,.95), #FFB12B)
        box-shadow: 0 16px 32px rgba(0,0,0,.35)
        transition: transform .15s ease, filter .15s ease
  
        &:hover
          transform: translateY(-1px)
          filter: brightness(1.05)
  
        &:active
          transform: translateY(0)
  
  @media (max-width: 980px)
    section.sobre
      padding: 70px 0 140px 0
  
      .wrap
        padding: 0 18px
  
      .topo
        top: -50px
  
        :deep(svg)
          width: 210px !important
  
      .conteudo
        flex-direction: column
  
      .col-dir
        width: 100%
        border-left: none
        border-top: 1px solid rgba(255,255,255,.07)
  
      .col-esq
        padding: 44px 26px
  
      .pessoa
        flex-direction: column
        align-items: flex-start
  
        .foto
          width: 150px
          height: 150px
  
  @media (max-width: 520px)
    section.sobre
      .quadro
        border-width: 14px
        border-radius: 28px
  
      .col-esq h2
        font-size: 44px
  </style>
  