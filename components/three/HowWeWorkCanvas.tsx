'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function HowWeWorkCanvas() {
    const mountRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const mountNode = mountRef.current
        if (!mountNode) return

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false })

        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        mountNode.appendChild(renderer.domElement)

        camera.position.z = 20
        camera.position.y = 5
        camera.lookAt(0, 0, 0)

        const isMobile = window.innerWidth < 768
        const count = isMobile ? 300 : 800

        // Helix DNA structure
        const geometry = new THREE.BufferGeometry()
        const positions = new Float32Array(count * 3)
        const sizes = new Float32Array(count)

        for (let i = 0; i < count; i++) {
            const t = i * 0.2 // length along the strand
            const radius = 5

            // Helix 1 (even dots) and Helix 2 (odd dots) offset by PI
            const offset = (i % 2 === 0) ? 0 : Math.PI

            positions[i * 3] = Math.sin(t + offset) * radius
            positions[i * 3 + 1] = t * 0.3 - 10 // Height progression
            positions[i * 3 + 2] = Math.cos(t + offset) * radius

            sizes[i] = Math.random() * 0.5 + 0.1
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

        // Custom shader material to allow varied sizes across the points
        const material = new THREE.PointsMaterial({
            color: 0xE8432D,
            transparent: true,
            opacity: 0.6,
            size: 0.15
        })

        const helix = new THREE.Points(geometry, material)
        scene.add(helix)

        // Mouse Interaction
        let mouseX = 0
        let mouseY = 0
        const handleMouseMove = (e: MouseEvent) => {
            mouseX = (e.clientX / window.innerWidth) * 2 - 1
            mouseY = -(e.clientY / window.innerHeight) * 2 + 1
        }
        if (!isMobile) window.addEventListener('mousemove', handleMouseMove)

        // Animation Loop
        let animationId: number
        const animate = () => {
            animationId = requestAnimationFrame(animate)

            // Main rotation
            helix.rotation.y += 0.005 + (mouseY * 0.01)

            // Subtle tilt based on X
            helix.rotation.x = mouseX * 0.2
            helix.rotation.z = mouseX * 0.1

            // Move scene vertically slightly
            helix.position.y = Math.sin(Date.now() * 0.001) * 2

            renderer.render(scene, camera)
        }

        animate()

        // Resize
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
            renderer.dispose()
            if (mountNode?.firstChild) mountNode.removeChild(renderer.domElement)
        }
    }, [])

    return <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" />
}
