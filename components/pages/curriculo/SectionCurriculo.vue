<template>
  <main class="pagina-curriculo-3d" aria-label="Currículo 3D">
    <ClientOnly>
      <div ref="canvasHost" class="canvas-host" />
    </ClientOnly>

    <!-- Overlay de status -->
    <div v-if="status3d !== 'ready'" class="overlay-status" aria-live="polite">
      <div class="card-status">
        <p class="titulo">CURRICULO EM 3D</p>

        <small v-if="status3d === 'loading'" class="status">Carregando 3D…</small>

        <small v-else-if="status3d === 'error'" class="status status-erro">
          Não consegui renderizar o GLB 😵‍💫<br />
          <span class="erro-detalhe">{{ erro3d }}</span>
        </small>
      </div>
    </div>

    <div class="hud">
  
      <ElementosBotao
        class="btn-baixar"
        type="button"
        :texto="baixando ? 'Baixando...' : 'Baixar Curriculo'"
        icone="curriculo"
        @click="baixarCurriculo"
      />

      <p class="dica">Arraste para girar • Scroll para zoom</p>
    </div>

    <div class="fx" aria-hidden="true"></div>
  </main>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from '#imports'

const baixando = ref(false)
const canvasHost = ref<HTMLElement | null>(null)

const status3d = ref<'idle' | 'loading' | 'ready' | 'error'>('idle')
const erro3d = ref('')

const PDF_URL = '/curriculo/curriculo.pdf'
const DOWNLOAD_NAME = 'curriculo.pdf'
const GLB_URL = '/images/3d/curriculo.glb'

let cleanupThree: null | (() => void) = null
const jaIniciou = ref(false)

async function baixarCurriculo() {
  if (baixando.value) return
  baixando.value = true

  try {
    const res = await fetch(PDF_URL, { cache: 'no-store' })
    if (!res.ok) throw new Error('Falha ao baixar arquivo.')

    const blob = await res.blob()
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = DOWNLOAD_NAME
    document.body.appendChild(a)
    a.click()
    a.remove()

    URL.revokeObjectURL(url)
  } catch {
    window.open(PDF_URL, '_blank', 'noopener,noreferrer')
  } finally {
    baixando.value = false
  }
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

function enquadrarModelo(obj: any, THREE: any, camera: any) {
  const box = new THREE.Box3().setFromObject(obj)
  const size = new THREE.Vector3()
  const center = new THREE.Vector3()
  box.getSize(size)
  box.getCenter(center)

  obj.position.sub(center)

  const altura = size.y || 1
  const alturaAlvo = 1.25
  const s = alturaAlvo / altura
  obj.scale.setScalar(s)

  const box2 = new THREE.Box3().setFromObject(obj)
  const center2 = new THREE.Vector3()
  const size2 = new THREE.Vector3()
  box2.getCenter(center2)
  box2.getSize(size2)

  obj.position.sub(center2)
  obj.position.y -= 0.15
  obj.rotation.set(0, 1, 1)

  const maxDim = Math.max(size2.x, size2.y, size2.z) || 1
  const fov = (camera.fov * Math.PI) / 180
  let dist = (maxDim / 2) / Math.tan(fov / 2)
  dist *= 1.65

  camera.position.set(0, 0, dist)
  camera.lookAt(0, 0, 0)
  camera.updateProjectionMatrix()
}

async function initThree(host: HTMLElement) {
  if (cleanupThree) cleanupThree()

  status3d.value = 'loading'
  erro3d.value = ''

  await nextTick()
  await new Promise((r) => requestAnimationFrame(() => r(true)))

  try {
    const THREE = await import('three')
    const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader')

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 200)
    camera.position.set(0, 0, 2.6)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setClearColor(0x000000, 0)
    ;(renderer as any).outputColorSpace = (THREE as any).SRGBColorSpace || undefined

    host.appendChild(renderer.domElement)

    const ambient = new THREE.AmbientLight(0xffffff, 0.95)
    scene.add(ambient)

    const hemi = new THREE.HemisphereLight(0xffffff, 0x222222, 0.55)
    scene.add(hemi)

    const key = new THREE.DirectionalLight(0xffffff, 1.1)
    key.position.set(2.2, 3.2, 2.2)
    scene.add(key)

    const fill = new THREE.DirectionalLight(0xffffff, 0.55)
    fill.position.set(-2.6, 1.2, 1.6)
    scene.add(fill)

    const loader = new GLTFLoader()
    const gltf = await new Promise<any>((resolve, reject) => {
      loader.load(GLB_URL, (g) => resolve(g), undefined, (e) => reject(e))
    })

    let model = gltf.scene
    if (!model) throw new Error('GLB carregou, mas veio sem scene.')

    model.traverse((child: any) => {
      if (child?.isMesh) {
        child.castShadow = false
        child.receiveShadow = false
        if (child.material) child.material.needsUpdate = true
      }
    })

    enquadrarModelo(model, THREE, camera)
    scene.add(model)

    function resize() {
      const { width, height } = host.getBoundingClientRect()
      const w = Math.max(1, Math.floor(width))
      const h = Math.max(1, Math.floor(height))
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()

    const ro = new ResizeObserver(() => resize())
    ro.observe(host)

    // ===== DRAG ROTATE
    let isDown = false
    let lastX = 0
    let lastY = 0
    let vY = 0
    let vX = 0

    const minX = -0.55
    const maxX = 0.55

    const dom = renderer.domElement
    dom.style.touchAction = 'none'
    dom.style.userSelect = 'none'

    function onDown(ev: PointerEvent) {
      isDown = true
      lastX = ev.clientX
      lastY = ev.clientY
      dom.setPointerCapture?.(ev.pointerId)
    }

    function onUp() {
      isDown = false
    }

    function onMove(ev: PointerEvent) {
      if (!isDown) return
      const dx = ev.clientX - lastX
      const dy = ev.clientY - lastY
      lastX = ev.clientX
      lastY = ev.clientY

      const s = 0.008
      vY = dx * s
      vX = dy * s

      model.rotation.y += vY
      model.rotation.x = clamp(model.rotation.x + vX, minX, maxX)
      model.rotation.z = 0
    }

    // zoom no scroll
    const zoom = { z: camera.position.z }
    const minZ = 1.3
    const maxZ = 6.0

    function onWheel(ev: WheelEvent) {
      ev.preventDefault()
      const delta = ev.deltaY * 0.0015
      zoom.z = clamp(zoom.z + delta, minZ, maxZ)
    }

    dom.addEventListener('pointerdown', onDown, { passive: true })
    dom.addEventListener('pointerup', onUp, { passive: true })
    dom.addEventListener('pointercancel', onUp, { passive: true })
    dom.addEventListener('pointerleave', onUp, { passive: true })
    dom.addEventListener('pointermove', onMove, { passive: true })
    dom.addEventListener('wheel', onWheel, { passive: false })

    let raf = 0
    function animate() {
      raf = requestAnimationFrame(animate)

      camera.position.z += (zoom.z - camera.position.z) * 0.12

      if (!isDown) {
        model.rotation.y += vY
        model.rotation.x = clamp(model.rotation.x + vX, minX, maxX)
        model.rotation.z = 0

        vY *= 0.92
        vX *= 0.92
        if (Math.abs(vY) < 0.00001) vY = 0
        if (Math.abs(vX) < 0.00001) vX = 0
      }

      renderer.render(scene, camera)
    }
    animate()

    status3d.value = 'ready'

    cleanupThree = () => {
      cancelAnimationFrame(raf)
      ro.disconnect()

      dom.removeEventListener('pointerdown', onDown)
      dom.removeEventListener('pointerup', onUp)
      dom.removeEventListener('pointercancel', onUp)
      dom.removeEventListener('pointerleave', onUp)
      dom.removeEventListener('pointermove', onMove)
      dom.removeEventListener('wheel', onWheel)

      if (model) {
        model.traverse((child: any) => {
          if (child?.isMesh) {
            child.geometry?.dispose?.()
            if (Array.isArray(child.material)) child.material.forEach((m: any) => m?.dispose?.())
            else child.material?.dispose?.()
          }
        })
        scene.remove(model)
        model = null
      }

      renderer.dispose()
      if (renderer.domElement?.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement)
    }
  } catch (e: any) {
    status3d.value = 'error'
    erro3d.value =
      e?.message || 'Veja o console (F12). Checa se /images/3d/curriculo.glb abre no navegador.'
  }
}

watch(
  canvasHost,
  (el) => {
    if (!el || jaIniciou.value) return
    jaIniciou.value = true
    initThree(el)
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  cleanupThree?.()
  cleanupThree = null
})
</script>

<style scoped lang="sass">
.pagina-curriculo-3d
  min-height: 100vh
  min-height: 100svh
  position: relative
  overflow: hidden
  background: radial-gradient(900px 600px at 30% 20%, rgba(255,255,255,.06), transparent 60%), linear-gradient(150deg, #3B3C36, #131519 30%)
  font-family: var(--light)

.canvas-host
  position: absolute
  inset: 0
  width: 100%
  height: 100%

.overlay-status
  position: absolute
  inset: 0
  display: grid
  place-items: center
  pointer-events: none

.card-status
  width: min(360px, 86vw)
  aspect-ratio: 1 / 1.25
  border-radius: 18px
  background: #e6e6e6
  box-shadow: 0 18px 55px rgba(0,0,0,.45)
  display: grid
  place-items: center
  gap: 10px
  padding: 18px

.titulo
  margin: 0
  font-weight: 900
  letter-spacing: .5px
  color: #f4a300
  text-align: center

.status
  font-size: 12px
  opacity: .75
  text-align: center

.status-erro
  opacity: 1
  color: #111

.erro-detalhe
  opacity: .75

.hud
  position: absolute
  left: 50%
  bottom: 26px
  transform: translateX(-50%)
  display: grid
  justify-items: center
  gap: 10px
  pointer-events: auto

.btn-baixar
  display: inline-flex
  align-items: center
  gap: 10px
  border-radius: 999px
  padding: 12px 18px
  color: #f3f3f3
  box-shadow: 0 18px 60px rgba(0,0,0,.55)

.btn-ico
  width: 28px
  height: 28px
  border-radius: 10px
  display: grid
  place-items: center
  background: rgba(244,163,0,.18)
  color: #f4a300

.btn-txt
  font-weight: 700
  font-size: 14px

  &:hover
    cursor: pointer

.dica
  margin: 0
  font-size: 12px
  opacity: .65
  color: rgba(255,255,255,.9)

.fx
  position: absolute
  inset: 0
  pointer-events: none
  background: radial-gradient(500px 340px at 50% 30%, rgba(244,163,0,.10), transparent 60%), radial-gradient(900px 650px at 50% 110%, rgba(0,0,0,.60), transparent 55%)
</style>
