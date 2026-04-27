import * as THREE from 'three'

class ParticleSystem {
    constructor() {
        this.bind()
        this.particleCount = 5000
        this.boxSize = 20
        this.velocities = []
    }

    init(scene) {
        this.scene = scene
        this.particlesGeom = new THREE.BufferGeometry()
        this.particlesPos = []

        for (let p = 0; p < this.particleCount; p++) {
            let x = Math.random() * this.boxSize - this.boxSize / 2
            let y = Math.random() * this.boxSize - this.boxSize / 2
            let z = Math.random() * this.boxSize - this.boxSize / 2
            this.particlesPos.push(x, y, z)

            // velocity random biar gerakan lebih hidup
            this.velocities.push(
                (Math.random() - 0.5) * 0.02, // X
                Math.random() * 0.02,         // Y
                (Math.random() - 0.5) * 0.02  // Z
            )
        }

        this.particlesGeom.setAttribute(
            'position',
            new THREE.Float32BufferAttribute(this.particlesPos, 3)
        )

        this.particleMaterial = new THREE.PointsMaterial({
            color: 0x808080,
            size: 0.05,
        })

        this.particleSystem = new THREE.Points(this.particlesGeom, this.particleMaterial)
        this.scene.add(this.particleSystem)
    }

    update() {
        let positions = this.particlesGeom.attributes.position.array

        for (let i = 0; i < this.particleCount; i++) {
            positions[i * 3]     += this.velocities[i * 3]     // X
            positions[i * 3 + 1] += this.velocities[i * 3 + 1] // Y
            positions[i * 3 + 2] += this.velocities[i * 3 + 2] // Z

            // reset kalau keluar box
            if (positions[i * 3 + 1] > this.boxSize / 2) {
                positions[i * 3]     = Math.random() * this.boxSize - this.boxSize / 2
                positions[i * 3 + 1] = -this.boxSize / 2
                positions[i * 3 + 2] = Math.random() * this.boxSize - this.boxSize / 2

                // regenerate velocity baru
                this.velocities[i * 3]     = (Math.random() - 0.5) * 0.02
                this.velocities[i * 3 + 1] = Math.random() * 0.02
                this.velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02
            }
        }

        this.particlesGeom.attributes.position.needsUpdate = true
    }

    destroy() {
        if (this.particleSystem) {
            this.scene.remove(this.particleSystem)
            this.particlesGeom.dispose()
            this.particleMaterial.dispose()
        }
    }

    bind() {
        this.init = this.init.bind(this)
        this.update = this.update.bind(this)
    }
}

const _instance = new ParticleSystem()
export default _instance
