import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { Zen_Dots } from "next/font/google"

// Initialize the Zen Dots font
const zenDots = Zen_Dots({
  weight: "400", // Zen Dots only comes in 400 weight
  subsets: ["latin"],
  display: "swap",
  variable: "--font-zen-dots",
})

export const metadata: Metadata = {
  title: "Space Exploration",
  description: "Explore New Worlds",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={zenDots.variable}>
      <body className="min-h-screen bg-black">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
