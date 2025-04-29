"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface PlanetDetailCardProps {
  planet: {
    id: number
    name: string
    image: string
    type: string
    description: string
    distance: string
    temperature: string
    exploration: string
  }
  onClose: () => void
}

export default function PlanetDetailCard({ planet, onClose }: PlanetDetailCardProps) {
  // Get color based on planet type
  const getTypeColor = () => {
    switch (planet.type) {
      case "earth-like":
        return "bg-green-600"
      case "gas-giant":
        return "bg-blue-600"
      case "ice-giant":
        return "bg-cyan-600"
      case "volcanic":
        return "bg-red-600"
      case "desert":
        return "bg-yellow-600"
      case "rocky":
        return "bg-gray-400"
      default:
        return "bg-purple-600"
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Card */}
      <motion.div
        className="relative bg-black/80 backdrop-blur-md border border-blue-500/30 rounded-lg overflow-hidden max-w-md w-full z-10"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        {/* Planet image header */}
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center bg-blue-950/30">
            <Image
              src={planet.image || "/placeholder.svg"}
              alt={planet.name}
              width={200}
              height={200}
              className="object-contain"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
          <div className="absolute bottom-4 left-4">
            <Badge className={getTypeColor()}>
              {planet.type
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 rounded-full bg-black/50 hover:bg-black/70 text-white"
            onClick={onClose}
          >
            ✕
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="font-zen-dots text-2xl text-white mb-2">{planet.name}</h2>
          <p className="text-blue-100 mb-4">{planet.description}</p>

          <div className="grid grid-cols-2 gap-3 text-sm mb-6">
            <div>
              <p className="text-blue-300">Distance</p>
              <p className="font-medium text-white">{planet.distance}</p>
            </div>
            <div>
              <p className="text-blue-300">Temperature</p>
              <p className="font-medium text-white">{planet.temperature}</p>
            </div>
            <div className="col-span-2">
              <p className="text-blue-300">Exploration Progress</p>
              <div className="w-full h-2 bg-blue-950 rounded-full mt-1">
                <div className={`h-full rounded-full ${getTypeColor()}`} style={{ width: planet.exploration }} />
              </div>
              <p className="text-xs text-blue-300 mt-1">{planet.exploration} complete</p>
            </div>
          </div>

          <Button className="w-full bg-blue-600 hover:bg-blue-700">Explore World</Button>
        </div>
      </motion.div>
    </motion.div>
  )
}
