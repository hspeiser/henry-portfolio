"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function CursorEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show cursor effect after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 500)

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", updateMousePosition)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      clearTimeout(timer)
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Main cursor dot */}
          <motion.div
            className="fixed w-4 h-4 rounded-full bg-primary/50 pointer-events-none z-[100] mix-blend-difference"
            animate={{
              x: mousePosition.x - 8,
              y: mousePosition.y - 8,
              opacity: [0.5, 0.8, 0.5],
              scale: [1, 1.2, 1],
            }}
            transition={{
              x: { duration: 0.1, ease: "linear" },
              y: { duration: 0.1, ease: "linear" },
              opacity: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              scale: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            }}
          />

          {/* Larger cursor ring */}
          <motion.div
            className="fixed w-12 h-12 rounded-full border-2 border-primary/30 pointer-events-none z-[99] mix-blend-difference"
            animate={{
              x: mousePosition.x - 24,
              y: mousePosition.y - 24,
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              x: { duration: 0.15, ease: "linear" },
              y: { duration: 0.15, ease: "linear" },
              opacity: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            }}
          />
        </>
      )}
    </AnimatePresence>
  )
}
