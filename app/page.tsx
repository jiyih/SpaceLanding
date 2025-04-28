"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Spline from "@splinetool/react-spline/next"
import { Rocket, Menu, X } from "lucide-react"
import LoadingScreen from "@/components/loading-screen"
import ImagePlanetButton from "@/components/image-planet-button"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Simulate loading time for the 3D model
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Stars background */}
      <div className="fixed inset-0 z-0">
        <StarField />
      </div>

      {/* Loading screen */}
      {isLoading && <LoadingScreen />}

      {/* 3D Spline Background */}
      <div className="fixed inset-0 z-5 pointer-events-none">
        <Spline
          scene="https://prod.spline.design/HBbL2nm5VIRNq5BR/scene.splinecode"
          onLoad={() => setIsLoading(false)}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Rocket className="h-6 w-6 text-blue-400" />
            <span className="font-zen-dots font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
              SPACE
            </span>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </header>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 right-0 w-full bg-black/90 backdrop-blur-md p-4 z-50 border-t border-blue-900/50">
            <nav className="flex flex-col gap-4">
              <Link
                href="/social"
                className="font-zen-dots p-2 hover:bg-blue-900/20 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Social
              </Link>
              <Link
                href="/worlds"
                className="font-zen-dots p-2 hover:bg-blue-900/20 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Worlds
              </Link>
            </nav>
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 relative">
          {/* Text content positioned higher */}
          <div className="absolute top-[15%] left-[10%] max-w-xl z-10">
            <h1 className="font-zen-dots text-5xl md:text-7xl font-bold mb-6 leading-tight backdrop-blur-sm py-2">
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                Explore
              </span>
              <span className="block text-white">New Worlds</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300">Pick your path, discover something new.</p>
          </div>

          {/* Planet Buttons positioned in upper right */}
          <div className="hidden md:block">
            {/* Social Planet (Moon) - positioned top right */}
            <ImagePlanetButton
              href="/social"
              label="Social"
              imageSrc="/images/moon.png"
              size={180}
              position={{ top: "15%", right: "10%" }}
              planetType="moon"
            />

            {/* Worlds Planet (Saturn) - positioned slightly lower and more to the left */}
            <ImagePlanetButton
              href="/worlds"
              label="Worlds"
              imageSrc="/images/saturn.png"
              size={220}
              position={{ top: "35%", right: "20%" }}
              planetType="saturn"
            />
          </div>

          {/* Mobile planet buttons (stacked for small screens) */}
          <div className="md:hidden flex flex-col items-center mt-[60vh] gap-10">
            <ImagePlanetButton href="/social" label="Social" imageSrc="/images/moon.png" size={120} planetType="moon" />
            <ImagePlanetButton
              href="/worlds"
              label="Worlds"
              imageSrc="/images/saturn.png"
              size={150}
              planetType="saturn"
            />
          </div>
        </div>
      </div>
    </main>
  )
}

// Star field background component
function StarField() {
  return (
    <div className="absolute inset-0">
      {[...Array(200)].map((_, i) => {
        const size = Math.random() * 3 + 1
        const animationDuration = Math.random() * 8 + 4
        const top = Math.random() * 100
        const left = Math.random() * 100
        const delay = Math.random() * 5

        return (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              top: `${top}%`,
              left: `${left}%`,
              opacity: Math.random() * 0.7 + 0.3,
              animationDuration: `${animationDuration}s`,
              animationDelay: `${delay}s`,
              boxShadow: size > 2 ? `0 0 ${size * 2}px rgba(255, 255, 255, 0.7)` : "none",
            }}
          />
        )
      })}
    </div>
  )
}
