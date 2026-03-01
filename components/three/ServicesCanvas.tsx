'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function ServicesCanvas() {
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

        camera.position.z = 30

        // Spheres
        const isMobile = window.innerWidth < 768
        const sphereCount = isMobile ? 50 : 200
        const spheres: THREE.Mesh[] = []
        const geometry = new THREE.SphereGeometry(0.3, 8, 8)
        const material = new THREE.MeshBasicMaterial({
            color: 0xE8432D,
            transparent: true,
            opacity: 0.2
        })

        const group = new THREE.Group()
        scene.add(group)

        for (let i = 0; i < sphereCount; i++) {
            const mesh = new THREE.Mesh(geometry, material)
            mesh.position.set(
                (Math.random() - 0.5) * 60,
                (Math.random() - 0.5) * 60,
                (Math.random() - 0.5) * 20
            )
            // Store original positions and drift speeds
            mesh.userData = {
                originalX: mesh.position.x,
                originalY: mesh.position.y,
                speed: Math.random() * 0.02 + 0.01
            }
            group.add(mesh)
            spheres.push(mesh)
        }

        // Mouse Interaction
        const mouse = { x: 0, y: 0 }
        const handleMouseMove = (e: MouseEvent) => {
            if (!mountNode) return
            const rect = mountNode.getBoundingClientRect()
            mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
            mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
        }

        if (!isMobile) {
            window.addEventListener('mousemove', handleMouseMove)
        }

        // Render loop
        let animationId: number
        const animate = () => {
            animationId = requestAnimationFrame(animate)

            spheres.forEach(mesh => {
                // Drift up
                mesh.position.y += mesh.userData.speed
                if (mesh.position.y > 30) {
                    mesh.position.y = -30
                }

                // Repel from mouse
                const dx = mesh.position.x - (mouse.x * 40)
                const dy = mesh.position.y - (mouse.y * 40)
                const dist = Math.sqrt(dx * dx + dy * dy)

                if (dist < 15) {
                    mesh.position.x += dx * 0.01
                    mesh.position.y += dy * 0.01
                } else {
                    // Return to original horizontal track
                    mesh.position.x += (mesh.userData.originalX - mesh.position.x) * 0.02
                }
            })

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
