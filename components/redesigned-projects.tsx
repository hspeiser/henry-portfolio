"use client"

import { useEffect, useRef, useState } from "react"
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

const montage = {
  hd: "/hero/montage-1080.mp4",
  sd: "/hero/montage-720.mp4",
  poster: "/hero/montage-poster.jpg",
}

function MontageBanner() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [near, setNear] = useState(false)
  const visibleRef = useRef(false)

  const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches

  // Start downloading once it's close to the viewport, and only play while it's on screen
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const loadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true)
          loadObserver.disconnect()
        }
      },
      { rootMargin: "600px 0px" }
    )
    const playObserver = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting
      const video = videoRef.current
      if (!video) return
      if (entry.isIntersecting && !reducedMotion()) {
        video.play().catch(() => {})
      } else {
        video.pause()
      }
    }, { threshold: 0.15 })
    loadObserver.observe(el)
    playObserver.observe(el)
    return () => {
      loadObserver.disconnect()
      playObserver.disconnect()
    }
  }, [])

  // Sources are added late, so the video has to be told to pick them up
  useEffect(() => {
    const video = videoRef.current
    if (!near || !video) return
    video.load()
    if (visibleRef.current && !reducedMotion()) video.play().catch(() => {})
  }, [near])

  return (
    <div ref={containerRef} className="relative w-full aspect-video max-h-[70vh] bg-black overflow-hidden mb-16 md:mb-20">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        loop
        playsInline
        preload="none"
        poster={montage.poster}
        aria-hidden="true"
      >
        {near && <source src={montage.sd} type="video/mp4" media="(max-width: 767px)" />}
        {near && <source src={montage.hd} type="video/mp4" />}
      </video>
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-background to-transparent" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent" aria-hidden="true" />
    </div>
  )
}

export default function RedesignedProjects() {
  const [imageLoaded, setImageLoaded] = useState<Record<string, boolean>>({})

  return (
    <section id="projects" className="pb-24 md:pb-32">
      <MontageBanner />
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
