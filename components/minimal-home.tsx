"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Armchair,
  Blocks,
  Bot,
  Car,
  Cog,
  Gamepad2,
  Hotel,
  Microscope,
  Orbit,
  Radar,
  Rocket,
  Stamp,
  Waves,
  Zap,
  type LucideIcon,
} from "lucide-react"
import { projects } from "@/lib/projects"

const profileImage = "/profile-photo.png"

// Presentation-only metadata for the timeline. Lives here so lib/projects.ts stays untouched.
const timelineMeta: Record<string, { period: string; icon: LucideIcon }> = {
  "ai-grand-prix": { period: "2026", icon: Radar },
  hour_of_robotics: { period: "2026", icon: Blocks },
  "frc-971": { period: "2021-2024", icon: Bot },
  "robot-arm": { period: "2025", icon: Cog },
  "somo-ai": { period: "2024-2025", icon: Hotel },
  "can-robot-controller": { period: "2024", icon: Gamepad2 },
  "custom-rocket": { period: "2024", icon: Rocket },
  sky_drive: { period: "2025", icon: Orbit },
  "atila-biosystems": { period: "2023", icon: Microscope },
  "mantis-shrimp-composites": { period: "2026", icon: Waves },
  fpv_drone: { period: "2024", icon: Zap },
  rocket_car: { period: "2024", icon: Car },
  wooden_bench: { period: "2024", icon: Armchair },
  tramp_stamp: { period: "2025", icon: Stamp },
}

const work = [
  { company: "Tesla", role: "Cybercab", href: "https://www.tesla.com/cybercab" },
  { company: "Origami Robotics", role: "Dexterous robot hands", href: "https://www.origami-robotics.com" },
  { company: "Somo AI", role: "Lead prototyping engineer", href: "/projects/somo-ai" },
  { company: "Atila Biosystems", role: "Point of care device electronics", href: "/projects/atila-biosystems" },
]

// Organization each project was done with, shown as the first pill
const orgTag: Record<string, string> = {
  "ai-grand-prix": "Anduril",
  hour_of_robotics: "Y Combinator",
  "frc-971": "FIRST Robotics",
  "somo-ai": "Somo AI",
  "atila-biosystems": "Atila Biosystems",
}

// Punchier one-liners for the featured entries. Lead with the number.
const blurbs: Record<string, string> = {
  "ai-grand-prix":
    "25th of 3,000+ entries in Anduril and DCL's autonomous drone race. A 17 gate course flown on a camera and IMU alone, 35.37 second lap.",
  hour_of_robotics:
    "2nd place at YC Robohacks. Drag and drop programming for real robots, running entirely in the browser.",
  "frc-971":
    "Four years doing every job on the team. Autonomous software, PCBs, firmware, gearboxes, machining, driving, and match strategy.",
  "somo-ai":
    "Lead prototyping engineer. 12 custom PCBs and a CAN bus smart hotel system that helped raise $20M+.",
  "custom-rocket":
    "Broke Mach 1 with homemade APCP propellant, a custom nozzle, and my own altimeter and ignition electronics.",
  "robot-arm":
    "A 6 axis arm designed in Onshape with inverse kinematics and path planning written from scratch. Still in progress.",
}

function Tags({ project }: { project: (typeof projects)[number] }) {
  const org = orgTag[project.slug]
  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {org && (
        <span className="rounded-full px-2.5 py-0.5 text-xs font-medium text-foreground ring-1 ring-border">{org}</span>
      )}
      {project.tags.slice(0, org ? 2 : 3).map((tag) => (
        <span key={tag} className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground">
          {tag}
        </span>
      ))}
    </div>
  )
}

const rotations = ["-rotate-6 translate-y-3", "rotate-0 -translate-y-1 z-10", "rotate-6 translate-y-3"]

function ImageFan({
  images,
  videoUrl,
  title,
  hovered,
}: {
  images: { url: string; description: string }[]
  videoUrl?: string
  title: string
  hovered: boolean
}) {
  const picks = images.slice(0, 3)
  if (picks.length === 0) return null

  // The front card (middle of three) swaps to the project's video on hover
  const videoIndex = picks.length === 3 ? 1 : picks.length - 1

  return (
    <div className="flex items-center justify-center pt-5 pb-9 -space-x-8 sm:-space-x-10">
      {picks.map((img, i) => (
        <div
          key={img.url}
          className={`relative h-28 w-36 sm:h-36 sm:w-48 shrink-0 overflow-hidden rounded-2xl bg-muted shadow-[0_12px_32px_-8px_rgba(0,0,0,0.8)] ring-1 ring-white/10 transition-transform duration-500 ease-out ${
            rotations[picks.length === 1 ? 1 : picks.length === 2 ? (i === 0 ? 0 : 2) : i]
          } group-hover:[&:nth-child(1)]:-translate-x-3 group-hover:[&:nth-child(3)]:translate-x-3 group-hover:[&:nth-child(2)]:-translate-y-3`}
        >
          <Image src={img.url} alt={img.description || title} fill sizes="200px" className="object-cover" />
          {videoUrl && i === videoIndex && <HoverVideo src={videoUrl} active={hovered} />}
        </div>
      ))}
    </div>
  )
}

function HoverVideo({ src, active }: { src: string; active: boolean }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (active) setStarted(true)
  }, [active])

  // Runs again once the video element mounts after the first hover, so the first hover plays too
  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (active) {
      video.play().catch(() => {})
    } else {
      video.pause()
      video.currentTime = 0
    }
  }, [active, started])

  if (!started) return null

  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      onLoadedData={() => setReady(true)}
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
        active && ready ? "opacity-100" : "opacity-0"
      }`}
    />
  )
}

// Projects that get the full treatment (photo fan, hover video, description)
const featured = new Set(["ai-grand-prix", "hour_of_robotics", "frc-971", "somo-ai", "custom-rocket", "robot-arm"])

function CompactEntry({ project, first }: { project: (typeof projects)[number]; first: boolean }) {
  const meta = timelineMeta[project.slug]
  const Icon = meta?.icon ?? Cog

  return (
    <li className={`relative pb-8 pl-8 last:pb-4 ${first ? "pt-4" : ""}`}>
      <span
        className={`absolute -left-[13px] flex h-[26px] w-[26px] items-center justify-center rounded-full bg-background ${
          first ? "top-4" : "top-0"
        }`}
      >
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </span>

      <Link href={`/projects/${project.slug}`} className="group block">
        <h2 className="text-[17px] font-semibold leading-tight group-hover:underline underline-offset-4 decoration-muted-foreground/60">
          {project.title}
          {meta?.period && (
            <span className="font-normal text-muted-foreground no-underline">
              {" "}
              · {meta.period}
            </span>
          )}
        </h2>

        <Tags project={project} />
      </Link>
    </li>
  )
}

function TimelineEntry({ project }: { project: (typeof projects)[number] }) {
  const [hovered, setHovered] = useState(false)
  const meta = timelineMeta[project.slug]
  const Icon = meta?.icon ?? Cog

  return (
    <li className="relative pb-20 pl-8 last:pb-8">
      <span className="absolute -left-[13px] top-0 flex h-[26px] w-[26px] items-center justify-center rounded-full bg-background">
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </span>

      <Link
        href={`/projects/${project.slug}`}
        className="group block"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <h2 className="text-[17px] font-semibold leading-tight">
          {project.title}
          {meta?.period && (
            <span className="font-normal text-muted-foreground">
              {" "}
              · {meta.period}
            </span>
          )}
        </h2>

        <Tags project={project} />

        <ImageFan images={project.images} videoUrl={project.videos?.[0]?.url} title={project.title} hovered={hovered} />

        <p className="text-[15px] leading-relaxed text-muted-foreground">{blurbs[project.slug] ?? project.description}</p>
      </Link>
    </li>
  )
}

export default function MinimalHome() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Intro */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          className="mx-auto w-full max-w-[34rem] px-6 pb-2 pt-14 sm:pt-16"
        >
          <div className="relative mb-8 h-16 w-16 overflow-hidden rounded-xl bg-muted">
            <Image src={profileImage} alt="Henry Speiser" fill sizes="64px" className="scale-[1.14] object-cover" priority />
          </div>

          <div className="space-y-5 text-[17px] leading-relaxed">
            <p>Hey, I&apos;m Henry.</p>
            <p>
              I broke the sound barrier with a{" "}
              <Link href="/projects/custom-rocket" className="underline underline-offset-4 decoration-muted-foreground/60 hover:decoration-foreground transition-colors">
                rocket I built in my backyard
              </Link>
              .
            </p>
            <p>
              This summer I taught a{" "}
              <Link href="/projects/ai-grand-prix" className="underline underline-offset-4 decoration-muted-foreground/60 hover:decoration-foreground transition-colors">
                drone to race
              </Link>{" "}
              a 17 gate course with nothing but a camera and an IMU. It placed 25th out of more than 3,000.
            </p>
            <p>
              Before that I spent four years on{" "}
              <Link href="/projects/frc-971" className="underline underline-offset-4 decoration-muted-foreground/60 hover:decoration-foreground transition-colors">
                FRC Team 971
              </Link>{" "}
              doing every job on the team.
            </p>
            <p>
              I&apos;ve worked on the{" "}
              <a href="https://www.tesla.com/cybercab" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-muted-foreground/60 hover:decoration-foreground transition-colors">
                Cybercab
              </a>{" "}
              at Tesla and on dexterous hands at{" "}
              <a href="https://www.origami-robotics.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-muted-foreground/60 hover:decoration-foreground transition-colors">
                Origami Robotics
              </a>
              .
            </p>
            <p>Currently, I&apos;m working on solving robot data collection.</p>
          </div>

          {/* Work */}
          <ul className="mt-8 divide-y divide-border border-y border-border text-[15px]">
            {work.map((job) => (
              <li key={job.company} className="flex flex-col gap-0.5 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <a
                  href={job.href}
                  target={job.href.startsWith("/") ? undefined : "_blank"}
                  rel={job.href.startsWith("/") ? undefined : "noopener noreferrer"}
                  className="font-semibold hover:underline underline-offset-4 decoration-muted-foreground/60"
                >
                  {job.company}
                </a>
                <span className="text-muted-foreground sm:text-right">{job.role}</span>
              </li>
            ))}
          </ul>

        </motion.div>
      </section>

      {/* Timeline */}
      <section id="work" className="mx-auto w-full max-w-[34rem] px-6 pb-8 pt-12">
        <ol className="relative border-l border-border">
          {projects
            .filter((project) => featured.has(project.slug))
            .map((project) => (
              <TimelineEntry key={project.slug} project={project} />
            ))}
          {projects
            .filter((project) => !featured.has(project.slug))
            .map((project, i) => (
              <CompactEntry key={project.slug} project={project} first={i === 0} />
            ))}
        </ol>
      </section>

      {/* About + contact */}
      <section className="mx-auto w-full max-w-[34rem] px-6 pb-24 pt-8">
        <div className="space-y-5 text-[17px] leading-relaxed">
          <p>
            I hate leaving any stone unturned. If I don&apos;t know something, I go figure it out, either by finding
            someone who does or by digging into it myself. No matter how much work it takes, if there&apos;s an answer,
            I want to find it.
          </p>
          <p>
            I don&apos;t think about engineering in terms of disciplines. Mechanical, electrical, firmware, software,
            training models, whatever the problem needs, I&apos;m happy to learn. And I hate treating things like black
            boxes. The more of a system you understand, the more options you have.
          </p>
          <p className="text-muted-foreground">
            You can find me on{" "}
            <a href="https://github.com/hspeiser" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4 decoration-muted-foreground/60 hover:decoration-foreground transition-colors">
              GitHub
            </a>{" "}
            or{" "}
            <a href="https://www.linkedin.com/in/henryspeiser/" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4 decoration-muted-foreground/60 hover:decoration-foreground transition-colors">
              LinkedIn
            </a>
            . I respond to{" "}
            <a href="mailto:henry@speiser.net" className="text-foreground underline underline-offset-4 decoration-muted-foreground/60 hover:decoration-foreground transition-colors">
              email
            </a>{" "}
            best.
          </p>
        </div>
      </section>
    </main>
  )
}
