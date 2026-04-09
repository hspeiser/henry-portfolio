"use client"

import type React from "react"

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  // Remove overflow-hidden since we don't need it anymore
  return <>{children}</>
}
