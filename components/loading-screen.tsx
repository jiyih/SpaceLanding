"use client"

import { Rocket } from "lucide-react"

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      <div className="animate-bounce mb-4">
        <Rocket className="h-12 w-12 text-blue-400" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">Preparing for Launch</h2>
      <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 animate-pulse" />
      </div>
      <p className="mt-4 text-gray-400 text-sm">Loading cosmic environment...</p>
    </div>
  )
}
