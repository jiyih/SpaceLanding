"use client"

import { useEffect, useRef } from "react"

export default function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawStars()
    }

    // Create stars
    const stars: { x: number; y: number; radius: number; opacity: number; speed: number }[] = []
    const createStars = () => {
      const starCount = Math.floor((window.innerWidth * window.innerHeight) / 1000)

      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          opacity: Math.random() * 0.8 + 0.2,
          speed: Math.random() * 0.05,
        })
      }
    }

    // Draw stars
    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw nebula-like clouds
      drawNebulaClouds()

      // Draw stars
      stars.forEach((star) => {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.fill()
      })
    }

    // Draw nebula-like clouds
    const drawNebulaClouds = () => {
      const nebulaColors = [
        "rgba(63, 81, 181, 0.1)", // blue
        "rgba(156, 39, 176, 0.1)", // purple
        "rgba(233, 30, 99, 0.1)", // pink
        "rgba(0, 150, 136, 0.1)", // teal
      ]

      for (let i = 0; i < 5; i++) {
        const color = nebulaColors[Math.floor(Math.random() * nebulaColors.length)]
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const radius = Math.random() * 300 + 100

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
        gradient.addColorStop(0, color)
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
    }

    // Animate stars
    const animateStars = () => {
      stars.forEach((star) => {
        star.y -= star.speed
        if (star.y < -2) {
          star.y = canvas.height + 2
          star.x = Math.random() * canvas.width
        }
      })

      drawStars()
      requestAnimationFrame(animateStars)
    }

    // Initialize
    handleResize()
    createStars()
    animateStars()

    // Handle window resize
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />
}
