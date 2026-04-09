"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useSpring } from "framer-motion"

export default function ScrollProgress() {
  const [isVisible, setIsVisible] = useState(false)
  const { scrollYProgress } = useScroll()

  // Smooth out the scroll progress
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    const handleScroll = () => {
      // Only show after scrolling a bit
      setIsVisible(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] overflow-hidden">
      {/* Left bar - grows from left to center */}
      <motion.div
        className="absolute top-0 left-0 h-full bg-gradient-to-r from-happy-hearts to-golden-nugget"
        style={{
          width: "50%",
          transformOrigin: "left center",
          scaleX,
        }}
      />

      {/* Right bar - grows from right to center */}
      <motion.div
        className="absolute top-0 right-0 h-full bg-gradient-to-l from-happy-hearts to-golden-nugget"
        style={{
          width: "50%",
          transformOrigin: "right center",
          scaleX,
        }}
      />
    </div>
  )
}
