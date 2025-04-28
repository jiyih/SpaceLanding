"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface ImagePlanetButtonProps {
  href: string
  label: string
  imageSrc: string
  size?: number
  position?: {
    top?: string
    right?: string
    left?: string
  }
  planetType?: "moon" | "saturn" // To determine which float animation to use
}

export default function ImagePlanetButton({
  href,
  label,
  imageSrc,
  size = 150,
  position,
  planetType = "moon",
}: ImagePlanetButtonProps) {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    router.push(href)
  }

  // Calculate container size (20% larger than the image)
  const containerSize = Math.floor(size * 1.2)

  // Determine which animation class to use based on planetType
  const floatAnimationClass = planetType === "moon" ? "animate-float" : "animate-float-slow"

  return (
    <div
      className="flex flex-col items-center group cursor-pointer absolute"
      style={{
        top: position?.top || "auto",
        right: position?.right || "auto",
        left: position?.left || "auto",
      }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative mb-3 ${floatAnimationClass}`}>
        <div
          className={`rounded-full overflow-hidden transition-transform duration-500 flex items-center justify-center ${
            isHovered ? "scale-110" : ""
          }`}
          style={{ width: `${containerSize}px`, height: `${containerSize}px` }}
        >
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={label}
            width={size}
            height={size}
            className="object-contain"
          />
        </div>
      </div>

      {/* Label that only appears on hover */}
      <div className="h-8 flex items-center justify-center">
        <span
          className={`font-zen-dots text-lg font-medium text-white transition-all duration-300 ${
            isHovered ? "opacity-100 transform translate-y-0" : "opacity-0 transform -translate-y-2"
          }`}
        >
          {label}
        </span>
      </div>
    </div>
  )
}
