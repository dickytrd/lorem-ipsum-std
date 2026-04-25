'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function Skull() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const width = mount.clientWidth || 400
    const height = mount.clientHeight || 800

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000)
    camera.position.set(0, 0, 10)
    camera.lookAt(0, 0, 0)
    let skullObject = null

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.domElement.style.display = 'block'
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.enableZoom = false
    controls.enablePan = false
    controls.target.set(10, 0, 3)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(4, 5, 4)
    scene.add(ambientLight, directionalLight)

    const loader = new GLTFLoader()
    const skullMaterial = new THREE.MeshNormalMaterial()
    const brainMaterial = new THREE.MeshNormalMaterial({ wireframe: true })

    loader.load(
      '/models/humanSkull.glb',
      (glb) => {
        glb.scene.traverse((child) => {
          if (child.isMesh) {
            if (child.name === 'Brain') {
              child.material = brainMaterial
            } else {
              child.material = skullMaterial
            }
          }
        })

        const bounds = new THREE.Box3().setFromObject(glb.scene)
        const center = bounds.getCenter(new THREE.Vector3())
        const size = bounds.getSize(new THREE.Vector3())
        glb.scene.position.sub(center)

        const maxDim = Math.max(size.x, size.y, size.z)
        const fov = camera.fov * (Math.PI / 180)
        const distance = Math.abs(maxDim / 2 / Math.tan(fov / 2)) * 1.3
        camera.position.set(5, 0, 5)
        controls.target.set(0, 0, 0)
        controls.update()

        skullObject = glb.scene
        scene.add(glb.scene)
      },
      undefined,
      (error) => {
        console.error('Failed to load skull model:', error)
      }
    )

    const resize = () => {
      const w = mount.clientWidth || 500
      const h = mount.clientHeight || 500
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener('resize', resize)

    let frameId = null
    const animate = () => {
      frameId = requestAnimationFrame(animate)
      if (skullObject) {
        skullObject.rotation.y += 0.002
      }
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      if (frameId) cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
      controls.dispose()
      renderer.dispose()
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={mountRef} className="skull-canvas" style={{ width: '100%', height: '100%' }} />
}
