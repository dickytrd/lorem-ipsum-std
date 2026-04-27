import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import manager from './LoadingManager'

class SkullBrain {
    constructor() {
        this.bind()
        // Pass manager so Three.js tracks all loads automatically
        this.modelLoader = new GLTFLoader(manager)
        this.texLoader   = new THREE.TextureLoader(manager)
        this._meshes     = []
    }

    init(scene) {
        this.scene = scene

        const gTex = this.texLoader.load('/assets/textures/grayMetal.png')
        const bTex = this.texLoader.load('/assets/textures/blackMetal.png')
        const eTex = this.texLoader.load('/assets/textures/red eye.jpg')

        this.gMatCap = new THREE.MeshMatcapMaterial({
            matcap: gTex, transparent: true, opacity: 0.7, depthWrite: false,
        })
        this.bMatCap = new THREE.MeshMatcapMaterial({ matcap: bTex })
        this.eMatCap = new THREE.MeshMatcapMaterial({ matcap: eTex })

        this.modelLoader.load('/assets/models/humanSkull.glb', (glb) => {
            glb.scene.traverse((child) => {
                if (child.isMesh) {
                    if (child.name === 'Brain')                        child.material = this.bMatCap
                    if (child.name === 'shape' || child.name === 'shape_1') child.material = this.gMatCap
                    this._meshes.push(child)
                }
            })
            this.glbScene = glb.scene
            this.scene.add(glb.scene)
        })

        const sphereGeom   = new THREE.IcosahedronGeometry(0.4, 3)
        this.sphere1 = new THREE.Mesh(sphereGeom, this.eMatCap)
        this.sphere1.position.set(-0.7, 0.7, 0.7)
        this.scene.add(this.sphere1)

        this.sphere2 = this.sphere1.clone()
        this.sphere2.position.set(0.7, 0.7, 0.7)
        this.scene.add(this.sphere2)
    }

    update() {}

    destroy() {
        if (this.glbScene) this.scene.remove(this.glbScene)
        if (this.sphere1)  this.scene.remove(this.sphere1)
        if (this.sphere2)  this.scene.remove(this.sphere2)
        this.gMatCap?.dispose()
        this.bMatCap?.dispose()
        this.eMatCap?.dispose()
    }

    bind() {
        this.init    = this.init.bind(this)
        this.update  = this.update.bind(this)
    }
}

const _instance = new SkullBrain()
export default _instance
