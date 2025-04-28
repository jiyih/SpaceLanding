"use client"

import { useState } from "react"
import Link from "next/link"
import { Rocket, ArrowLeft, Users, MessageSquare, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import StarBackground from "@/components/star-background"

export default function SocialPage() {
  const [activeTab, setActiveTab] = useState("community")

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
              Cosmic Social Hub
            </span>
          </h1>

          <div className="flex flex-wrap gap-4 mb-8">
            <Button
              variant={activeTab === "community" ? "default" : "outline"}
              onClick={() => setActiveTab("community")}
              className={activeTab === "community" ? "bg-blue-600 hover:bg-blue-700" : "border-blue-500 text-blue-400"}
            >
              <Users className="mr-2 h-4 w-4" />
              Community
            </Button>
            <Button
              variant={activeTab === "messages" ? "default" : "outline"}
              onClick={() => setActiveTab("messages")}
              className={activeTab === "messages" ? "bg-blue-600 hover:bg-blue-700" : "border-blue-500 text-blue-400"}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Messages
            </Button>
            <Button
              variant={activeTab === "share" ? "default" : "outline"}
              onClick={() => setActiveTab("share")}
              className={activeTab === "share" ? "bg-blue-600 hover:bg-blue-700" : "border-blue-500 text-blue-400"}
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>

          {activeTab === "community" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="bg-black/40 backdrop-blur-sm border-blue-900/50">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage
                          src={`/placeholder.svg?height=40&width=40&query=space explorer avatar`}
                          alt="User"
                        />
                        <AvatarFallback>U{i}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-white">Cosmic Explorer {i + 1}</CardTitle>
                        <CardDescription className="text-gray-400">@space_traveler_{i + 1}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">
                      Just discovered an amazing nebula in sector {(i + 1) * 7}! The colors are breathtaking. Who wants
                      to join the next expedition?
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between text-sm text-gray-400">
                    <span>{Math.floor(Math.random() * 100) + 1} likes</span>
                    <span>{Math.floor(Math.random() * 20)} replies</span>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          {activeTab === "messages" && (
            <div className="bg-black/40 backdrop-blur-sm border border-blue-900/50 rounded-lg p-6">
              <h2 className="font-zen-dots text-2xl font-bold mb-6">Your Messages</h2>
              <p className="text-gray-300 mb-8">
                Connect with fellow space explorers and coordinate your next mission.
              </p>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 hover:bg-blue-900/20 rounded-lg transition-colors"
                  >
                    <Avatar>
                      <AvatarImage src={`/placeholder.svg?height=40&width=40&query=space explorer avatar`} alt="User" />
                      <AvatarFallback>U{i}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-medium">Cosmic Explorer {i + 1}</h3>
                      <p className="text-sm text-gray-400 truncate">
                        Hey! Are you joining the expedition to the Andromeda galaxy next week?
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">{Math.floor(Math.random() * 12) + 1}h ago</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "share" && (
            <div className="bg-black/40 backdrop-blur-sm border border-blue-900/50 rounded-lg p-6">
              <h2 className="font-zen-dots text-2xl font-bold mb-6">Share Your Journey</h2>
              <p className="text-gray-300 mb-8">
                Document your space adventures and share them with the cosmic community.
              </p>
              <div className="space-y-6">
                <div className="p-4 border border-dashed border-blue-500/50 rounded-lg text-center">
                  <p className="text-gray-400 mb-4">Upload images or videos from your space travels</p>
                  <Button className="bg-blue-600 hover:bg-blue-700">Upload Media</Button>
                </div>
                <div className="p-4 border border-blue-900/30 rounded-lg">
                  <h3 className="font-medium mb-2">Share to Other Platforms</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" className="border-blue-500 text-blue-400">
                      Spacebook
                    </Button>
                    <Button variant="outline" className="border-cyan-500 text-cyan-400">
                      Spacer
                    </Button>
                    <Button variant="outline" className="border-blue-500 text-blue-400">
                      CosmicGram
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
