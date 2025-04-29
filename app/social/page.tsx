"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Rocket, ArrowLeft, Users, MessageSquare, ChevronLeft, ChevronRight, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample community posts data
const initialCommunityPosts = [
  {
    id: 1,
    author: "Commander Alex",
    avatar: "/cosmic-guardian.png",
    handle: "@commander_alex",
    content:
      "Just discovered an amazing nebula in sector 7! The colors are breathtaking. Who wants to join the next expedition?",
    likes: 87,
    replies: 14,
    time: "2 hours ago",
    liked: false,
  },
  {
    id: 2,
    author: "Dr. Elena Zhao",
    avatar: "/woman-exploring-exoplanet.png",
    handle: "@dr_zhao",
    content:
      "Our research on the crystalline formations on Proxima B is showing promising results. These structures could revolutionize our understanding of extraterrestrial biology!",
    likes: 124,
    replies: 32,
    time: "5 hours ago",
    liked: false,
  },
  {
    id: 3,
    author: "Pilot Zoe",
    avatar: "/intrepid-explorer.png",
    handle: "@pilot_zoe",
    content:
      "Successfully navigated through the asteroid belt using the new quantum navigation system. Zero damage to the ship! #SpacePilotSkills",
    likes: 56,
    replies: 8,
    time: "Yesterday",
    liked: false,
  },
  {
    id: 4,
    author: "Engineer Marcus",
    avatar: "/orbital-constructor.png",
    handle: "@eng_marcus",
    content:
      "Just upgraded the propulsion system. We're now capable of reaching 0.25c! That's a 15% improvement over our previous max speed.",
    likes: 93,
    replies: 21,
    time: "2 days ago",
    liked: false,
  },
  {
    id: 5,
    author: "Security Chief Raj",
    avatar: "/orbital-guardian.png",
    handle: "@security_raj",
    content:
      "Reminder to all crew: The emergency drill is scheduled for tomorrow at 0900 hours. Please review safety protocols before then.",
    likes: 45,
    replies: 7,
    time: "3 days ago",
    liked: false,
  },
]

export default function SocialPage() {
  const [activeTab, setActiveTab] = useState("community")
  const [currentPostIndex, setCurrentPostIndex] = useState(0)
  const [isHologramActive, setIsHologramActive] = useState(false)
  const [communityPosts, setCommunityPosts] = useState(initialCommunityPosts)

  // Initialize hologram after a delay (without message)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHologramActive(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Navigate to next post
  const nextPost = () => {
    setCurrentPostIndex((prev) => (prev === communityPosts.length - 1 ? 0 : prev + 1))
  }

  // Navigate to previous post
  const prevPost = () => {
    setCurrentPostIndex((prev) => (prev === 0 ? communityPosts.length - 1 : prev - 1))
  }

  // Handle like button click (without message)
  const handleLike = () => {
    setCommunityPosts((prevPosts) => {
      const updatedPosts = [...prevPosts]
      const currentPost = updatedPosts[currentPostIndex]

      // Only increment likes if not already liked
      if (!currentPost.liked) {
        currentPost.likes += 1
        currentPost.liked = true
      }

      return updatedPosts
    })
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Spaceship cockpit background */}
      <div className="fixed inset-0 z-0">
        <Image src="/images/spaceship-cockpit.jpeg" alt="Spaceship cockpit" fill className="object-cover" priority />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="p-4 flex justify-between items-center backdrop-blur-sm bg-black/20 border-b border-blue-500/30">
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

        {/* Navigation tabs */}
        <div className="flex justify-center mt-4">
          <div className="flex gap-2 p-1 bg-black/30 backdrop-blur-md rounded-full border border-blue-500/30">
            <Button
              variant={activeTab === "community" ? "default" : "ghost"}
              onClick={() => setActiveTab("community")}
              className={`rounded-full ${
                activeTab === "community" ? "bg-blue-600 hover:bg-blue-700" : "text-blue-300 hover:text-blue-100"
              }`}
              size="sm"
            >
              <Users className="mr-2 h-4 w-4" />
              Community
            </Button>
            <Button
              variant={activeTab === "messages" ? "default" : "ghost"}
              onClick={() => setActiveTab("messages")}
              className={`rounded-full ${
                activeTab === "messages" ? "bg-blue-600 hover:bg-blue-700" : "text-blue-300 hover:text-blue-100"
              }`}
              size="sm"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Messages
            </Button>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex justify-center items-center h-[calc(100vh-140px)]">
          {activeTab === "community" && (
            <div className="relative w-full max-w-2xl">
              {/* Holographic interface frame */}
              <div className="absolute inset-0 border-2 border-blue-400/50 rounded-lg pointer-events-none"></div>

              {/* Hologram activation effect */}
              <AnimatePresence>
                {isHologramActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 bg-blue-500/10 backdrop-blur-sm rounded-lg"
                  ></motion.div>
                )}
              </AnimatePresence>

              {/* Post navigation controls */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-12 z-20">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevPost}
                  className="rounded-full bg-black/30 text-blue-300 hover:bg-blue-900/50 hover:text-blue-100"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
              </div>

              <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-12 z-20">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextPost}
                  className="rounded-full bg-black/30 text-blue-300 hover:bg-blue-900/50 hover:text-blue-100"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>

              {/* Post counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
                <div className="flex gap-1.5">
                  {communityPosts.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1.5 w-1.5 rounded-full ${
                        index === currentPostIndex ? "bg-blue-400" : "bg-blue-900/70"
                      }`}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Holographic post display */}
              <div className="relative h-[500px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {isHologramActive && (
                    <motion.div
                      key={currentPostIndex}
                      initial={{ opacity: 0, y: 20, rotateX: 10 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      exit={{ opacity: 0, y: -20, rotateX: -10 }}
                      transition={{ duration: 0.5 }}
                      className="w-full max-w-md bg-blue-950/40 backdrop-blur-md border border-blue-500/30 rounded-lg p-6 shadow-[0_0_15px_rgba(56,189,248,0.3)] relative"
                    >
                      {/* Holographic scan lines effect */}
                      <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
                        {[...Array(20)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-full h-[1px] bg-blue-400/10"
                            style={{ top: `${(i + 1) * 5}%`, animation: `scanline ${2 + i * 0.1}s linear infinite` }}
                          ></div>
                        ))}
                      </div>

                      {/* Holographic glitch effect */}
                      <div className="absolute inset-0 rounded-lg opacity-30 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent animate-[glitch_3s_ease-in-out_infinite]"></div>
                      </div>

                      {/* Post content */}
                      <div className="relative z-10">
                        <div className="flex items-start gap-4 mb-4">
                          <Avatar className="h-12 w-12 border-2 border-blue-400/50 ring-2 ring-blue-300/20">
                            <AvatarImage
                              src={communityPosts[currentPostIndex].avatar || "/placeholder.svg"}
                              alt={communityPosts[currentPostIndex].author}
                            />
                            <AvatarFallback>{communityPosts[currentPostIndex].author.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-zen-dots text-lg text-white">
                              {communityPosts[currentPostIndex].author}
                            </h3>
                            <p className="text-sm text-blue-200">{communityPosts[currentPostIndex].handle}</p>
                            <p className="text-xs text-blue-300 mt-1">{communityPosts[currentPostIndex].time}</p>
                          </div>
                        </div>

                        <p className="text-white mb-6 leading-relaxed">{communityPosts[currentPostIndex].content}</p>

                        <div className="flex justify-between text-sm text-blue-300">
                          <span className="flex items-center gap-1">
                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-400 mr-1"></span>
                            {communityPosts[currentPostIndex].likes} likes
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-400 mr-1"></span>
                            {communityPosts[currentPostIndex].replies} replies
                          </span>
                        </div>

                        <div className="mt-6 flex gap-2">
                          <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">Reply</Button>
                          <Button
                            variant="outline"
                            className={`flex-1 ${
                              communityPosts[currentPostIndex].liked
                                ? "bg-blue-900/50 border-pink-500 text-pink-300"
                                : "border-blue-500 text-blue-300 hover:bg-blue-900/50"
                            }`}
                            onClick={handleLike}
                          >
                            <Heart
                              className={`mr-2 h-4 w-4 ${
                                communityPosts[currentPostIndex].liked ? "fill-pink-500 text-pink-500" : ""
                              }`}
                            />
                            {communityPosts[currentPostIndex].liked ? "Liked" : "Like"}
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}

          {activeTab === "messages" && (
            <div className="w-full max-w-2xl bg-blue-950/40 backdrop-blur-md border border-blue-500/30 rounded-lg p-6 shadow-[0_0_15px_rgba(56,189,248,0.3)]">
              <h2 className="font-zen-dots text-2xl text-blue-100 mb-6">Messages</h2>
              <p className="text-blue-200 mb-6">This feature is coming soon. Check back later for updates!</p>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setActiveTab("community")}>
                Return to Community
              </Button>
            </div>
          )}
        </div>

        {/* Footer with system status */}
        <div className="fixed bottom-0 left-0 right-0 p-2 bg-black/30 backdrop-blur-sm border-t border-blue-500/20">
          <div className="flex justify-between items-center text-xs text-blue-300">
            <div className="flex items-center gap-4">
              <span className="flex items-center">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400 mr-1"></span>
                System Online
              </span>
              <span>Sector: Alpha Centauri</span>
            </div>
            <div>
              <span>Stardate: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
