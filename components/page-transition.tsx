"use client"

import type React from "react"

interface PageTransitionProps {
  children: React.ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  // Simply render children without any animations
  return <>{children}</>
}
