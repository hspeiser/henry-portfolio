"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Play } from "lucide-react"
import { projects } from "@/lib/projects"
import { cn } from "@/lib/utils"

function ProjectMedia({
  project,
  imageLoaded,
  onImageLoad,
}: {
  project: (typeof projects)[number]
  imageLoaded: boolean
  onImageLoad: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const [videoStarted, setVideoStarted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const previewUrl = project.videos?.[0]?.url

  return (
    <div
      className="aspect-video relative bg-muted overflow-hidden"
      onMouseEnter={() => {
        setHovered(true)
        videoRef.current?.play().catch(() => {})
      }}
      onMouseLeave={() => {
        setHovered(false)
        if (videoRef.current) {
          videoRef.current.pause()
          videoRef.current.currentTime = 0
        }
      }}
    >
      <Image
        src={project.imageUrl}
        alt={project.title}
        fill
        className={cn(
          "object-cover transition-all duration-500 group-hover:scale-[1.03]",
          hovered && videoStarted ? "opacity-0" : "",
          imageLoaded ? "opacity-100" : "opacity-0"
        )}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        onLoad={onImageLoad}
      />
      {previewUrl && (
        <video
          ref={videoRef}
          src={hovered || videoStarted ? previewUrl : undefined}
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={() => setVideoStarted(true)}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
            hovered && videoStarted ? "opacity-100" : "opacity-0"
          )}
        />
      )}
      {previewUrl && (
        <div
          className={cn(
            "absolute bottom-2.5 left-2.5 flex items-center gap-1.5 rounded-full bg-background/80 backdrop-blur px-2.5 py-1 text-[10px] uppercase tracking-wider text-muted-foreground transition-opacity duration-300",
            hovered && videoStarted ? "opacity-0" : "opacity-100"
          )}
        >
          <Play className="h-3 w-3" />
          Preview
        </div>
      )}
    </div>
  )
}

export default function RedesignedProjects() {
  const [imageLoaded, setImageLoaded] = useState<Record<string, boolean>>({})

  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Projects</h2>
          <p className="text-muted-foreground mb-10 max-w-lg">
            Things I've built across software, electronics, and mechanical engineering.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
            >
              <Link
                href={`/projects/${project.slug}`}
                className="group block rounded-xl border border-border bg-card overflow-hidden hover:border-foreground/20 transition-colors"
              >
                <ProjectMedia
                  project={project}
                  imageLoaded={!!imageLoaded[project.slug]}
                  onImageLoad={() => setImageLoaded((prev) => ({ ...prev, [project.slug]: true }))}
                />

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-1 group-hover:text-foreground/80 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs text-muted-foreground bg-muted rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-2 py-0.5 text-xs text-muted-foreground">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
