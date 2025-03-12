"use client"

import type React from "react"
import { useInView } from "react-intersection-observer"

interface AndurilSectionProps {
  id?: string
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
  align?: "left" | "center" | "right"
}

export default function AndurilSection({
  id,
  title,
  subtitle,
  children,
  className = "",
  align = "center",
}: AndurilSectionProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const alignClass = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  }

  return (
    <section id={id} ref={ref} className={`w-full py-16 md:py-24 ${className} relative`}>
      <div className="anduril-grid"></div>
      <div className="container px-4 md:px-6 anduril-container">
        <div className={`flex flex-col ${alignClass[align]} space-y-4 mb-12 fade-in ${inView ? "visible" : ""}`}>
          <div className="space-y-2 max-w-[800px]">
            <h2 className="text-3xl font-medium uppercase tracking-wider sm:text-4xl md:text-5xl text-white">
              {title}
            </h2>

            {subtitle && (
              <p className="text-white md:text-xl">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className={`fade-in ${inView ? "visible" : ""}`}>{children}</div>
      </div>
    </section>
  )
}