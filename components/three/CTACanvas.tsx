'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function CTACanvas() {
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

        camera.position.z = 40

        const isMobile = window.innerWidth < 768
        const particleCount = isMobile ? 800 : 2500

        // Vortex Particles
        const geometry = new THREE.BufferGeometry()
        const positions = new Float32Array(particleCount * 3)

        for (let i = 0; i < particleCount; i++) {
            // Random distribute in a large cube
            positions[i * 3] = (Math.random() - 0.5) * 100
            positions[i * 3 + 1] = (Math.random() - 0.5) * 100
            positions[i * 3 + 2] = (Math.random() - 0.5) * 100
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

        const material = new THREE.PointsMaterial({
            color: 0xE8432D,
            transparent: true,
            opacity: 0.6,
            size: 0.2,
            blending: THREE.AdditiveBlending
        })

        const vortex = new THREE.Points(geometry, material)
        scene.add(vortex)

        let mouseX = 0
        let mouseY = 0
        const handleMouseMove = (e: MouseEvent) => {
            if (!mountNode) return
            const rect = mountNode.getBoundingClientRect()
            mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1
            mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1
        }
        if (!isMobile) window.addEventListener('mousemove', handleMouseMove)

        let animationId: number
        const animate = () => {
            animationId = requestAnimationFrame(animate)

            vortex.rotation.z -= 0.005

            // Vortex morph logic
            const positionsArr = vortex.geometry.attributes.position.array as Float32Array

            for (let i = 0; i < particleCount; i++) {
                const idx = i * 3

                // Slightly pull towards center (0,0,0)
                positionsArr[idx] *= 0.992
                positionsArr[idx + 1] *= 0.992

                // If they get sucked into center, respawn them back on the edges
                if (Math.abs(positionsArr[idx]) < 1 && Math.abs(positionsArr[idx + 1]) < 1) {
                    positionsArr[idx] = (Math.random() - 0.5) * 100
                    positionsArr[idx + 1] = (Math.random() - 0.5) * 100
                }
            }

            vortex.geometry.attributes.position.needsUpdate = true

            // View shifting
            camera.position.x += (mouseX * 10 - camera.position.x) * 0.05
            camera.position.y += (mouseY * 10 - camera.position.y) * 0.05
            camera.lookAt(scene.position)

            renderer.render(scene, camera)
        }

        animate()

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
