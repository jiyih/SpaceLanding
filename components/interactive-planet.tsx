"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

interface InteractivePlanetProps {
  name: string
  image: string
  description: string
  size: number
  position: { x: number; y: number }
  details: {
    type: string
    distance: string
    temperature: string
    exploration: string
  }
  onClick: () => void
  padding?: number // Add padding option for planets like Saturn
}

export default function InteractivePlanet({
  name,
  image,
  description,
  size,
  position,
  details,
  onClick,
  padding = 0, // Default padding is 0
}: InteractivePlanetProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Calculate the glow color based on the planet type - updated to match legend colors
  const getGlowColor = () => {
    switch (details.type) {
      case "earth-like":
        return "rgba(34, 197, 94, 0.8)" // green-500 with opacity
      case "gas-giant":
        return "rgba(37, 99, 235, 0.8)" // blue-600 with opacity
      case "ice-giant":
        return "rgba(8, 145, 178, 0.8)" // cyan-600 with opacity
      case "volcanic":
        return "rgba(220, 38, 38, 0.8)" // red-600 with opacity
      case "desert":
        return "rgba(202, 138, 4, 0.8)" // yellow-600 with opacity
      case "rocky":
        return "rgba(156, 163, 175, 0.8)" // gray-400 with opacity
      default:
        return "rgba(147, 51, 234, 0.8)" // purple-600 with opacity
    }
  }

  // Calculate total size with padding
  const totalSize = size + padding * 2

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        zIndex: isHovered ? 10 : 1,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: Math.random() * 0.5,
      }}
      whileHover={{ scale: 1.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Planet image with pulse animation */}
      <div className="relative" style={{ padding: `${padding}px` }}>
        <div
          className="absolute inset-0 rounded-full transition-all duration-300"
          style={{
            boxShadow: isHovered ? `0 0 30px 10px ${getGlowColor()}` : "none",
            animation: isHovered ? "pulse 2s infinite" : "none",
          }}
        />
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          width={totalSize}
          height={totalSize}
          className="object-contain"
          priority
        />
      </div>

      {/* Planet name tooltip */}
      <motion.div
        className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 translate-y-full bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-blue-500/30 whitespace-nowrap"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
        transition={{ duration: 0.2 }}
      >
        <p className="text-sm font-medium text-white">{name}</p>
      </motion.div>
    </motion.div>
  )
}
