"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Rocket, ArrowLeft, Globe, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import StarBackground from "@/components/star-background"

export default function WorldsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const worlds = [
    {
      id: 1,
      name: "Nebula Prime",
      type: "gas-giant",
      description: "A swirling gas giant with vibrant auroras and floating islands.",
      distance: "12.5 light years",
      temperature: "-120°C",
      exploration: "37%",
    },
    {
      id: 2,
      name: "Crystallis",
      type: "ice-world",
      description: "An ice planet with crystal formations that refract light in spectacular ways.",
      distance: "8.3 light years",
      temperature: "-200°C",
      exploration: "22%",
    },
    {
      id: 3,
      name: "Pyrosia",
      type: "volcanic",
      description: "A volcanic world with rivers of lava and obsidian mountains.",
      distance: "15.7 light years",
      temperature: "350°C",
      exploration: "18%",
    },
    {
      id: 4,
      name: "Aquatica",
      type: "ocean",
      description: "An ocean planet with bioluminescent marine life and floating cities.",
      distance: "9.2 light years",
      temperature: "15°C",
      exploration: "45%",
    },
    {
      id: 5,
      name: "Terra Nova",
      type: "earth-like",
      description: "An Earth-like planet with lush forests and diverse ecosystems.",
      distance: "22.1 light years",
      temperature: "22°C",
      exploration: "62%",
    },
    {
      id: 6,
      name: "Desertum",
      type: "desert",
      description: "A desert world with massive sand dunes and ancient ruins.",
      distance: "17.8 light years",
      temperature: "45°C",
      exploration: "29%",
    },
  ]

  const filteredWorlds = selectedCategory === "all" ? worlds : worlds.filter((world) => world.type === selectedCategory)

  return (
    <main className="relative min-h-screen bg-black text-white">
      {/* Stars background */}
      <StarBackground />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="p-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Rocket className="h-6 w-6 text-blue-400" />
            <span className="font-zen-dots font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
              SPACE
            </span>
          </div>

          <Button asChild variant="ghost" className="text-white hover:bg-white/10">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </header>

        {/* Main content */}
        <div className="max-w-6xl mx-auto p-6">
          <h1 className="font-zen-dots text-4xl md:text-5xl font-bold mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
              Discover New Worlds
            </span>
          </h1>

          <div className="flex flex-wrap gap-3 mb-8">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
              className={selectedCategory === "all" ? "bg-blue-600 hover:bg-blue-700" : "border-blue-500 text-blue-400"}
            >
              <Globe className="mr-2 h-4 w-4" />
              All Worlds
            </Button>
            <Button
              variant={selectedCategory === "earth-like" ? "default" : "outline"}
              onClick={() => setSelectedCategory("earth-like")}
              className={
                selectedCategory === "earth-like"
                  ? "bg-green-600 hover:bg-green-700"
                  : "border-green-500 text-green-400"
              }
            >
              Earth-like
            </Button>
            <Button
              variant={selectedCategory === "gas-giant" ? "default" : "outline"}
              onClick={() => setSelectedCategory("gas-giant")}
              className={
                selectedCategory === "gas-giant" ? "bg-blue-600 hover:bg-blue-700" : "border-blue-500 text-blue-400"
              }
            >
              Gas Giants
            </Button>
            <Button
              variant={selectedCategory === "ice-world" ? "default" : "outline"}
              onClick={() => setSelectedCategory("ice-world")}
              className={
                selectedCategory === "ice-world" ? "bg-cyan-600 hover:bg-cyan-700" : "border-cyan-500 text-cyan-400"
              }
            >
              Ice Worlds
            </Button>
            <Button
              variant={selectedCategory === "volcanic" ? "default" : "outline"}
              onClick={() => setSelectedCategory("volcanic")}
              className={
                selectedCategory === "volcanic" ? "bg-red-600 hover:bg-red-700" : "border-red-500 text-red-400"
              }
            >
              Volcanic
            </Button>
            <Button
              variant={selectedCategory === "ocean" ? "default" : "outline"}
              onClick={() => setSelectedCategory("ocean")}
              className={
                selectedCategory === "ocean" ? "bg-blue-600 hover:bg-blue-700" : "border-blue-500 text-blue-400"
              }
            >
              Ocean
            </Button>
            <Button
              variant={selectedCategory === "desert" ? "default" : "outline"}
              onClick={() => setSelectedCategory("desert")}
              className={
                selectedCategory === "desert"
                  ? "bg-yellow-600 hover:bg-yellow-700"
                  : "border-yellow-500 text-yellow-400"
              }
            >
              Desert
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorlds.map((world) => (
              <Card key={world.id} className="bg-black/40 backdrop-blur-sm border-blue-900/50 overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={`/abstract-geometric-shapes.png?height=200&width=400&query=${world.type} planet`}
                    alt={world.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <Badge
                      className={`
                      ${world.type === "earth-like" ? "bg-green-600" : ""}
                      ${world.type === "gas-giant" ? "bg-blue-600" : ""}
                      ${world.type === "ice-world" ? "bg-cyan-600" : ""}
                      ${world.type === "volcanic" ? "bg-red-600" : ""}
                      ${world.type === "ocean" ? "bg-blue-600" : ""}
                      ${world.type === "desert" ? "bg-yellow-600" : ""}
                    `}
                    >
                      {world.type
                        .split("-")
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ")}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="font-zen-dots text-white flex items-center gap-2">
                    {world.name}
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(Math.random() * 5) + 1 ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`}
                        />
                      ))}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">{world.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-gray-400">Distance</p>
                      <p className="font-medium">{world.distance}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Temperature</p>
                      <p className="font-medium">{world.temperature}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-400">Exploration Progress</p>
                      <div className="w-full h-2 bg-gray-800 rounded-full mt-1">
                        <div
                          className={`h-full rounded-full ${
                            world.type === "earth-like"
                              ? "bg-green-600"
                              : world.type === "gas-giant"
                                ? "bg-blue-600"
                                : world.type === "ice-world"
                                  ? "bg-cyan-600"
                                  : world.type === "volcanic"
                                    ? "bg-red-600"
                                    : world.type === "ocean"
                                      ? "bg-blue-600"
                                      : "bg-yellow-600"
                          }`}
                          style={{ width: world.exploration }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Explore World</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
