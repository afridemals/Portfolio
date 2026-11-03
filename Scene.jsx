import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Scene() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    let renderer, raf
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    } catch {
      return // WebGL unavailable: page still works without the 3D layer
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    el.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const cam = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100)
    cam.position.z = 7

    const wire = (geo, color, opacity) =>
      new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity }))
    const core = wire(new THREE.IcosahedronGeometry(1.9, 2), 0x3b82f6, 0.55)
    const shell = wire(new THREE.IcosahedronGeometry(2.6, 1), 0xff7a1a, 0.25)
    const group = new THREE.Group()
    group.add(core, shell)

    const dots = (n, color) => {
      const p = new Float32Array(n * 3)
      for (let i = 0; i < p.length; i++) p[i] = (Math.random() - 0.5) * 22
      const g = new THREE.BufferGeometry()
      g.setAttribute('position', new THREE.BufferAttribute(p, 3))
      return new THREE.Points(g, new THREE.PointsMaterial({ color, size: 0.04, transparent: true, opacity: 0.8 }))
    }
    const blue = dots(500, 0x3b82f6)
    const orange = dots(300, 0xff7a1a)
    scene.add(group, blue, orange)

    const place = () => {
      const wide = window.innerWidth > 800
      group.position.set(wide ? 3.2 : 0, wide ? 0 : 2.2, 0)
      group.scale.setScalar(wide ? 1 : 0.7)
    }
    place()

    let mx = 0, my = 0
    const onMove = (e) => { mx = e.clientX / window.innerWidth - 0.5; my = e.clientY / window.innerHeight - 0.5 }
    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight)
      cam.aspect = window.innerWidth / window.innerHeight
      cam.updateProjectionMatrix()
      place()
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('resize', onResize)

    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const tick = () => {
      if (!still) {
        core.rotation.y += 0.003; core.rotation.x += 0.0015
        shell.rotation.y -= 0.002
        blue.rotation.y += 0.0004; orange.rotation.y -= 0.0006
      }
      cam.position.x += (mx * 1.5 - cam.position.x) * 0.04
      cam.position.y += (-my * 1.5 - cam.position.y) * 0.04
      cam.lookAt(0, 0, 0)
      group.rotation.z = (window.scrollY / window.innerHeight) * 0.6
      renderer.render(scene, cam)
      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', onResize)
      scene.traverse((o) => { o.geometry?.dispose(); o.material?.dispose() })
      renderer.dispose()
      el.innerHTML = ''
    }
  }, [])

  return <div ref={ref} aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none" />
}
