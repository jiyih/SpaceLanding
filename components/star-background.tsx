"use client"

export default function StarBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
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
