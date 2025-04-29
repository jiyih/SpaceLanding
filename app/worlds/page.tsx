"use client"

import { useState } from "react"
import Link from "next/link"
import { AnimatePresence } from "framer-motion"
import { Rocket, ArrowLeft, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import InteractivePlanet from "@/components/interactive-planet"
import PlanetDetailCard from "@/components/planet-detail-card"
import GalaxyBackground from "@/components/galaxy-background"

// Planet data - adjusted positions to center better and moved left
const planets = [
  {
    id: 1,
    name: "Mercury",
    image: "/images/planets/mercury.png",
    type: "rocky",
    description:
      "The smallest and innermost planet in the Solar System. Its surface is heavily cratered and similar in appearance to the Moon.",
    distance: "0.39 AU from Sun",
    temperature: "430°C (day) / -180°C (night)",
    exploration: "45%",
    size: 80,
    position: { x: 7, y: 50 }, // Moved left
  },
  {
    id: 2,
    name: "Venus",
    image: "/images/planets/venus.png",
    type: "volcanic",
    description:
      "Often called Earth's sister planet due to similar size. It has a thick toxic atmosphere and is the hottest planet in our solar system.",
    distance: "0.72 AU from Sun",
    temperature: "462°C",
    exploration: "32%",
    size: 110,
    position: { x: 13, y: 40 }, // Moved left
  },
  {
    id: 3,
    name: "Earth",
    image: "/images/planets/earth.png",
    type: "earth-like",
    description:
      "Our home planet. The only known celestial body to harbor life, with liquid water oceans and an oxygen-rich atmosphere.",
    distance: "1 AU from Sun",
    temperature: "15°C (average)",
    exploration: "100%",
    size: 120,
    position: { x: 23, y: 30 }, // Moved left
  },
  {
    id: 4,
    name: "Mars",
    image: "/images/planets/mars.png",
    type: "desert",
    description:
      "The Red Planet. Features valleys, deserts, and polar ice caps. Scientists have found evidence of ancient rivers and lakes.",
    distance: "1.52 AU from Sun",
    temperature: "-63°C (average)",
    exploration: "78%",
    size: 100,
    position: { x: 34, y: 45 }, // Moved left
  },
  {
    id: 5,
    name: "Jupiter",
    image: "/images/planets/jupiter.png",
    type: "gas-giant",
    description:
      "The largest planet in our solar system. A gas giant with a Great Red Spot and over 79 moons, including the four large Galilean moons.",
    distance: "5.2 AU from Sun",
    temperature: "-145°C",
    exploration: "37%",
    size: 180,
    position: { x: 42, y: 35 }, // Moved left
  },
  {
    id: 6,
    name: "Saturn",
    image: "/images/planets/saturn.png",
    type: "gas-giant",
    description:
      "Famous for its spectacular ring system. A gas giant with a beautiful yellow hue and at least 82 moons, including Titan.",
    distance: "9.5 AU from Sun",
    temperature: "-178°C",
    exploration: "33%",
    size: 170,
    position: { x: 54, y: 30 }, // Moved left
    padding: 40, // Add extra padding for Saturn's rings
  },
  {
    id: 7,
    name: "Uranus",
    image: "/images/planets/uranus.png",
    type: "ice-giant",
    description:
      "An ice giant that rotates on its side. Has a blue-green color due to methane in its atmosphere and 27 known moons.",
    distance: "19.8 AU from Sun",
    temperature: "-224°C",
    exploration: "22%",
    size: 140,
    position: { x: 74, y: 40 }, // Moved left
  },
  {
    id: 8,
    name: "Neptune",
    image: "/images/planets/neptune.png",
    type: "ice-giant",
    description:
      "The windiest planet in our solar system with the fastest winds. A deep blue ice giant with 14 moons, including Triton.",
    distance: "30.1 AU from Sun",
    temperature: "-214°C",
    exploration: "18%",
    size: 130,
    position: { x: 85, y: 30 }, // Moved left
  },
]

export default function WorldsPage() {
  const [selectedPlanet, setSelectedPlanet] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Filter planets based on search query
  const filteredPlanets = planets.filter(
    (planet) =>
      planet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      planet.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      planet.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Get the selected planet data
  const selectedPlanetData = selectedPlanet !== null ? planets.find((p) => p.id === selectedPlanet) : null

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Galaxy background */}
      <GalaxyBackground />

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="p-4 flex justify-between items-center backdrop-blur-sm bg-black/20 border-b border-blue-500/30">
          <div className="flex items-center gap-2">
            <Rocket className="h-6 w-6 text-blue-400" />
            <span className="font-zen-dots font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
              SPACE
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative max-w-xs hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-400" />
              <Input
                type="text"
                placeholder="Search worlds..."
                className="pl-9 bg-black/30 border-blue-500/30 text-white focus-visible:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Button asChild variant="ghost" className="text-white hover:bg-white/10">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </header>

        {/* Mobile search */}
        <div className="p-4 md:hidden">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-400" />
            <Input
              type="text"
              placeholder="Search worlds..."
              className="pl-9 bg-black/30 border-blue-500/30 text-white focus-visible:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Galaxy map title */}
        <div className="text-center mt-4 mb-8">
          <h1 className="font-zen-dots text-4xl md:text-5xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
              Solar System Explorer
            </span>
          </h1>
          <p className="text-blue-200 mt-2">Discover the planets of our cosmic neighborhood</p>
        </div>

        {/* Galaxy map */}
        <div className="relative w-full h-[calc(100vh-250px)] min-h-[500px]">
          {filteredPlanets.map((planet) => (
            <InteractivePlanet
              key={planet.id}
              name={planet.name}
              image={planet.image}
              description={planet.description}
              size={planet.size}
              position={planet.position}
              details={{
                type: planet.type,
                distance: planet.distance,
                temperature: planet.temperature,
                exploration: planet.exploration,
              }}
              onClick={() => setSelectedPlanet(planet.id)}
              padding={planet.padding} // Pass the padding for Saturn
            />
          ))}

          {/* Connecting lines between planets (orbital paths) */}
          <svg className="absolute inset-0 w-full h-full z-0 opacity-30 pointer-events-none">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            {/* Draw orbital paths - adjusted to match new planet positions */}
            <line x1="10%" y1="50%" x2="20%" y2="40%" stroke="url(#lineGradient)" strokeWidth="1" />
            <line x1="20%" y1="40%" x2="30%" y2="30%" stroke="url(#lineGradient)" strokeWidth="1" />
            <line x1="30%" y1="30%" x2="40%" y2="45%" stroke="url(#lineGradient)" strokeWidth="1" />
            <line x1="40%" y1="45%" x2="50%" y2="35%" stroke="url(#lineGradient)" strokeWidth="1" />
            <line x1="50%" y1="35%" x2="60%" y2="50%" stroke="url(#lineGradient)" strokeWidth="1" />
            <line x1="60%" y1="50%" x2="70%" y2="40%" stroke="url(#lineGradient)" strokeWidth="1" />
            <line x1="70%" y1="40%" x2="80%" y2="30%" stroke="url(#lineGradient)" strokeWidth="1" />
          </svg>
        </div>

        {/* Legend */}
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-md rounded-full px-4 py-2 border border-blue-500/30">
          <div className="flex items-center gap-4 text-xs text-blue-200">
            <div className="flex items-center gap-1">
              <span className="inline-block w-3 h-3 rounded-full bg-gray-400" />
              <span>Rocky</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="inline-block w-3 h-3 rounded-full bg-blue-600" />
              <span>Gas Giant</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="inline-block w-3 h-3 rounded-full bg-cyan-600" />
              <span>Ice Giant</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="inline-block w-3 h-3 rounded-full bg-red-600" />
              <span>Volcanic</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="inline-block w-3 h-3 rounded-full bg-green-600" />
              <span>Earth-like</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="inline-block w-3 h-3 rounded-full bg-yellow-600" />
              <span>Desert</span>
            </div>
          </div>
        </div>
      </div>

      {/* Planet detail modal */}
      <AnimatePresence>
        {selectedPlanetData && <PlanetDetailCard planet={selectedPlanetData} onClose={() => setSelectedPlanet(null)} />}
      </AnimatePresence>
    </main>
  )
}
