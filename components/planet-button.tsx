"use client"

import { useRef, useEffect } from "react"
import { useRouter } from "next/navigation"

interface PlanetButtonProps {
  href: string
  label: string
  color: "purple" | "cyan" | "blue" | "green" | "red"
  size: number
  rotationSpeed: number
}

export default function PlanetButton({ href, label, color, size, rotationSpeed }: PlanetButtonProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const router = useRouter()
  const animationRef = useRef<number>()
  const isHoveredRef = useRef(false)

  // Generate color values based on the color prop
  const getColors = () => {
    switch (color) {
      case "purple":
        return {
          base: "#9333EA", // purple-600
          highlight: "#A855F7", // purple-500
          shadow: "#581C87", // purple-900
          glow: "rgba(147, 51, 234, 0.5)", // purple with opacity
        }
      case "cyan":
        return {
          base: "#06B6D4", // cyan-500
          highlight: "#22D3EE", // cyan-400
          shadow: "#0E7490", // cyan-700
          glow: "rgba(6, 182, 212, 0.5)", // cyan with opacity
        }
      case "blue":
        return {
          base: "#2563EB", // blue-600
          highlight: "#3B82F6", // blue-500
          shadow: "#1E40AF", // blue-800
          glow: "rgba(37, 99, 235, 0.5)", // blue with opacity
        }
      case "green":
        return {
          base: "#10B981", // green-500
          highlight: "#34D399", // green-400
          shadow: "#065F46", // green-800
          glow: "rgba(16, 185, 129, 0.5)", // green with opacity
        }
      case "red":
        return {
          base: "#EF4444", // red-500
          highlight: "#F87171", // red-400
          shadow: "#991B1B", // red-800
          glow: "rgba(239, 68, 68, 0.5)", // red with opacity
        }
      default:
        return {
          base: "#9333EA",
          highlight: "#A855F7",
          shadow: "#581C87",
          glow: "rgba(147, 51, 234, 0.5)",
        }
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions with device pixel ratio for sharper rendering
    const dpr = window.devicePixelRatio || 1
    canvas.width = size * dpr
    canvas.height = size * dpr
    ctx.scale(dpr, dpr)

    // Set canvas display size
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`

    let rotation = 0
    const colors = getColors()

    // Draw the planet
    const drawPlanet = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Save the current context state
      ctx.save()

      // Move to center of canvas
      ctx.translate(size / 2, size / 2)

      // Draw glow effect
      if (isHoveredRef.current) {
        ctx.shadowColor = colors.glow
        ctx.shadowBlur = 20
      }

      // Draw planet base
      ctx.beginPath()
      ctx.arc(0, 0, size / 2 - 10, 0, Math.PI * 2)
      ctx.fillStyle = colors.base
      ctx.fill()

      // Draw planet details with rotation
      ctx.rotate(rotation)

      // Draw surface details (bands or craters)
      for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        const bandY = -size / 4 + (i * size) / 4
        const bandHeight = size / 12
        ctx.ellipse(0, bandY, size / 2 - 15, bandHeight, 0, 0, Math.PI * 2)
        ctx.fillStyle = i % 2 === 0 ? colors.highlight : colors.shadow
        ctx.fill()
      }

      // Draw a ring around the planet for some types
      if (color === "cyan" || color === "purple") {
        ctx.beginPath()
        ctx.ellipse(0, 0, size / 2 - 5, (size / 2 - 5) / 3, Math.PI / 4, 0, Math.PI * 2)
        ctx.strokeStyle = colors.highlight
        ctx.lineWidth = 3
        ctx.stroke()
      }

      // Restore the context
      ctx.restore()

      // Update rotation
      rotation += rotationSpeed

      // Continue animation
      animationRef.current = requestAnimationFrame(drawPlanet)
    }

    // Start animation
    drawPlanet()

    // Handle hover events
    const handleMouseEnter = () => {
      isHoveredRef.current = true
    }

    const handleMouseLeave = () => {
      isHoveredRef.current = false
    }

    canvas.addEventListener("mouseenter", handleMouseEnter)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      canvas.removeEventListener("mouseenter", handleMouseEnter)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [color, size, rotationSpeed])

  const handleClick = () => {
    router.push(href)
  }

  return (
    <div className="flex flex-col items-center group cursor-pointer" onClick={handleClick}>
      <div className="relative mb-3">
        <canvas
          ref={canvasRef}
          className="rounded-full cursor-pointer transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 bg-white transition-opacity duration-300"></div>
      </div>
      <span className="font-zen-dots text-lg font-medium text-white group-hover:text-gray-300 transition-colors">
        {label}
      </span>
    </div>
  )
}
