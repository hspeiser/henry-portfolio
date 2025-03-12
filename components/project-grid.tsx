"use client"

import { useEffect, useRef } from "react"
import ProjectCard from "@/components/project-card"

interface Project {
  title: string
  description: string
  tags: string[]
  imageUrl: string
  slug: string
  featured?: boolean
}

interface ProjectGridProps {
  projects: Project[]
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.1 },
    )

    if (gridRef.current) {
      observer.observe(gridRef.current)
    }

    return () => {
      if (gridRef.current) {
        observer.unobserve(gridRef.current)
      }
    }
  }, [])

  return (
    <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 fade-in">
      {projects.map((project, index) => (
        <div key={project.slug} className={`stagger-${(index % 5) + 1}`}>
          <ProjectCard {...project} />
        </div>
      ))}
    </div>
  )
}

