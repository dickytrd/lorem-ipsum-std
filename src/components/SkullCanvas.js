'use client'
/**
 * SkullCanvas — Three.js Wireframe Skull Placeholder
 * ─────────────────────────────────────────────────
 * This is a PLACEHOLDER for your actual WebGL skull.
 * Replace the entire useEffect body with your own Three.js / WebGL implementation.
 *
 * Props:
 *   className {string}  — CSS class for sizing the container div
 *   style     {object}  — Inline styles for the container div
 */
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function SkullCanvas({ className = '', style = {} }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const w = mount.clientWidth  || 400
    const h = mount.clientHeight || 400

    // ─── Scene ─────────────────────────────────────────────
    const scene = new THREE.Scene()

    // ─── Camera ────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100)
    camera.position.z = 4.8

    // ─── Renderer ──────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0) // transparent bg
    mount.appendChild(renderer.domElement)

    // ─── Materials ─────────────────────────────────────────
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: false,
      transparent: true,
      opacity: 0.55,
    })

    const wireDimMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: false,
      transparent: true,
      opacity: 0.1,
    })

    const eyeMat = new THREE.MeshBasicMaterial({
      color: 0xff1500,
      transparent: true,
      opacity: 0.9,
    })

    // ─── Skull Group ───────────────────────────────────────
    const skullGroup = new THREE.Group()

    // -- Cranium (deformed sphere to approximate skull shape)
    const craniumGeo = new THREE.SphereGeometry(1, 22, 18)
    const pos = craniumGeo.attributes.position

    for (let i = 0; i < pos.count; i++) {
      let x = pos.getX(i)
      let y = pos.getY(i)
      let z = pos.getZ(i)

      // Flatten face (front)
      if (z > 0.4) z = z * 0.82

      // Jaw taper — bottom of skull narrows
      if (y < -0.35) {
        const t = (y + 0.35) / (-1 + 0.35) // 0→1 from jaw to chin
        const taper = 1 - t * 0.28
        x = x * taper * 0.88
        z = z * taper
        y = y * 0.62 - 0.18
      }

      // Cheekbones — widen at eye level
      if (y > -0.25 && y < 0.15) {
        x = x * 1.1
      }

      // Forehead — slight forward projection
      if (y > 0.55) {
        z = z + y * 0.06
        x = x * 0.9
      }

      pos.setXYZ(i, x, y, z)
    }
    pos.needsUpdate = true
    craniumGeo.computeVertexNormals()

    const cranium = new THREE.Mesh(craniumGeo, wireMat)
    skullGroup.add(cranium)

    // -- Inner dim mesh for depth/volume illusion
    const innerGeo = new THREE.SphereGeometry(0.95, 14, 12)
    skullGroup.add(new THREE.Mesh(innerGeo, wireDimMat))

    // -- Eye sockets (glowing red spheres)
    const eyeGeo = new THREE.SphereGeometry(0.19, 12, 10)

    const leftEye  = new THREE.Mesh(eyeGeo, eyeMat)
    const rightEye = new THREE.Mesh(eyeGeo, eyeMat)
    leftEye.position.set(-0.31, 0.05, 0.8)
    rightEye.position.set( 0.31, 0.05, 0.8)
    skullGroup.add(leftEye, rightEye)

    // -- Point lights for eye glow bleed
    const lLight = new THREE.PointLight(0xff1500, 3.5, 1.4)
    const rLight = new THREE.PointLight(0xff1500, 3.5, 1.4)
    lLight.position.copy(leftEye.position)
    rLight.position.copy(rightEye.position)
    skullGroup.add(lLight, rLight)

    // -- Nose cavity outline
    const noseGeo = new THREE.OctahedronGeometry(0.1, 0)
    const noseMat = new THREE.MeshBasicMaterial({
      color: 0xffffff, wireframe: true, transparent: true, opacity: 0.25,
    })
    const nose = new THREE.Mesh(noseGeo, noseMat)
    nose.position.set(0, -0.2, 0.92)
    nose.rotation.y = Math.PI * 0.25
    skullGroup.add(nose)

    scene.add(skullGroup)

    // ─── Mouse parallax ───────────────────────────────────
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const onMouseMove = (e) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 1.2
      targetY = (e.clientY / window.innerHeight - 0.5) * 0.5
    }
    window.addEventListener('mousemove', onMouseMove)

    // ─── Resize ───────────────────────────────────────────
    const onResize = () => {
      const nw = mount.clientWidth
      const nh = mount.clientHeight
      if (!nw || !nh) return
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
      renderer.setSize(nw, nh)
    }
    window.addEventListener('resize', onResize)

    // ─── Render loop ──────────────────────────────────────
    let raf
    const clock = new THREE.Clock()

    const tick = () => {
      raf = requestAnimationFrame(tick)
      const t = clock.getElapsedTime()

      // Smooth mouse lerp
      currentX += (targetX - currentX) * 0.04
      currentY += (targetY - currentY) * 0.04

      // Rotation: auto-spin + mouse offset
      skullGroup.rotation.y = t * 0.22 + currentX * 0.6
      skullGroup.rotation.x = Math.sin(t * 0.18) * 0.08 - currentY * 0.45

      // Subtle breathing
      const breathe = 1 + Math.sin(t * 1.1) * 0.007
      skullGroup.scale.setScalar(breathe)

      // Eye pulsing
      const pulse = (Math.sin(t * 2.8) * 0.5 + 0.5)
      eyeMat.opacity = 0.65 + pulse * 0.35
      lLight.intensity = 2.5 + pulse * 2.5
      rLight.intensity = 2.5 + pulse * 2.5

      renderer.render(scene, camera)
    }
    tick()

    // ─── Cleanup ──────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      craniumGeo.dispose()
      innerGeo.dispose()
      eyeGeo.dispose()
      noseGeo.dispose()
      renderer.dispose()
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className={className}
      style={{ width: '100%', height: '100%', ...style }}
    />
  )
}
