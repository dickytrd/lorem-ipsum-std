import * as THREE from 'three'
import CamParallax from './CamParallax'
import SkullBrain from './SkullBrainClass'
import ParticleSystem from './ParticleSystem'

class MainThreeScene {
    constructor() {
        this.bind()
        this.camera   = null
        this.scene    = null
        this.renderer = null
        this._raf     = null       // requestAnimationFrame id
        this._running = false
    }

    init(container) {
        if (this._running) this.destroy()  // safety: prevent double-init in dev HMR

        // ── Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        this.renderer.setSize(container.clientWidth, container.clientHeight)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.renderer.setClearColor(0x000000, 0) // transparent bg
        container.appendChild(this.renderer.domElement)
        this._container = container

        // ── Scene
        this.scene = new THREE.Scene()

        // ── Camera
        this.camera = new THREE.PerspectiveCamera(
            20,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        )
        this.camera.position.set(10, 0, 20)

        // ── Subsystems
        CamParallax.init(this.camera)
        SkullBrain.init(this.scene)
        ParticleSystem.init(this.scene)

        // ── Events
        window.addEventListener('resize', this.resizeCanvas)

        // ── Start loop
        this._running = true
        this._raf = requestAnimationFrame(this.update)
    }

    update() {
        if (!this._running) return
        this._raf = requestAnimationFrame(this.update)

        this.renderer.render(this.scene, this.camera)
        CamParallax.update()
        SkullBrain.update()
        ParticleSystem.update()
    }

    resizeCanvas() {
        if (!this._container) return
        const w = this._container.clientWidth
        const h = this._container.clientHeight
        this.renderer.setSize(w, h)
        this.camera.aspect = w / h
        this.camera.updateProjectionMatrix()
    }

    // Called from React useEffect cleanup
    destroy() {
        this._running = false
        cancelAnimationFrame(this._raf)

        window.removeEventListener('resize', this.resizeCanvas)

        CamParallax.destroy()
        SkullBrain.destroy()
        ParticleSystem.destroy()

        this.renderer?.dispose()

        if (this._container && this.renderer?.domElement) {
            if (this._container.contains(this.renderer.domElement)) {
                this._container.removeChild(this.renderer.domElement)
            }
        }

        this.camera   = null
        this.scene    = null
        this.renderer = null
        this._container = null
    }

    bind() {
        this.init        = this.init.bind(this)
        this.update      = this.update.bind(this)
        this.resizeCanvas = this.resizeCanvas.bind(this)
        this.destroy     = this.destroy.bind(this)
    }
}

const _instance = new MainThreeScene()
export default _instance
