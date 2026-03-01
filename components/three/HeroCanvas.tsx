'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function HeroCanvas() {
    const mountRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const mountNode = mountRef.current
        if (!mountNode) return

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        mountNode.appendChild(renderer.domElement)

        const group = new THREE.Group()
        scene.add(group)

        // Wireframe Material
        const material = new THREE.MeshBasicMaterial({
            color: 0xE8432D,
            wireframe: true,
            transparent: true,
            opacity: 0.3
        })

        // Shapes
        const icosahedron = new THREE.Mesh(new THREE.IcosahedronGeometry(6, 0), material)
        icosahedron.position.set(-15, 5, -5)

        const octahedron = new THREE.Mesh(new THREE.OctahedronGeometry(5, 0), material)
        octahedron.position.set(15, -8, -10)

        const torus = new THREE.Mesh(new THREE.TorusGeometry(8, 0.5, 8, 50), material)
        torus.position.set(20, 10, -15)

        const torusKnot = new THREE.Mesh(new THREE.TorusKnotGeometry(4, 1, 64, 8), material)
        torusKnot.position.set(-20, -10, -20)

        group.add(icosahedron, octahedron, torus, torusKnot)

        // Particles
        const isMobile = window.innerWidth < 768
        const particleCount = isMobile ? 1000 : 3000
        const particlesGeo = new THREE.BufferGeometry()
        const posArray = new Float32Array(particleCount * 3)

        for (let i = 0; i < particleCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 100
        }

        particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.05,
            color: 0xffffff,
            transparent: true,
            opacity: 0.3
        })

        const particlesMesh = new THREE.Points(particlesGeo, particlesMaterial)
        scene.add(particlesMesh)

        camera.position.z = 25

        // Mouse interacion
        let mouseX = 0
        let mouseY = 0
        let targetX = 0
        let targetY = 0

        const handleMouseMove = (e: MouseEvent) => {
            const halfX = window.innerWidth / 2
            const halfY = window.innerHeight / 2
            mouseX = (e.clientX - halfX) / halfX
            mouseY = (e.clientY - halfY) / halfY
        }

        if (!isMobile) {
            window.addEventListener('mousemove', handleMouseMove)
        }

        // Animation Loop
        let animationId: number
        const animate = () => {
            animationId = requestAnimationFrame(animate)

            // Rotate shapes
            icosahedron.rotation.x += 0.001
            icosahedron.rotation.y += 0.002
            octahedron.rotation.x -= 0.002
            octahedron.rotation.y -= 0.001
            torus.rotation.z += 0.001
            torusKnot.rotation.x += 0.002

            // Rotate particle field slowly
            particlesMesh.rotation.y += 0.0005

            // Mouse Parallax effect
            targetX = mouseX * 2
            targetY = mouseY * 2
            group.position.x += (targetX - group.position.x) * 0.05
            group.position.y += (-targetY - group.position.y) * 0.05
            group.rotation.x += (mouseY * 0.1 - group.rotation.x) * 0.05
            group.rotation.y += (mouseX * 0.1 - group.rotation.y) * 0.05

            renderer.render(scene, camera)
        }

        animate()

        // Handle Resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        }
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('mousemove', handleMouseMove)
            cancelAnimationFrame(animationId)
            if (mountNode && mountNode.firstChild) {
                mountNode.removeChild(renderer.domElement)
            }
            renderer.dispose()
        }
    }, [])

    return <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" />
}
