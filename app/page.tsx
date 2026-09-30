"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Download } from "lucide-react"
import ResumeViewer from "@/components/resume-viewer"
import { projects } from "@/lib/projects"
import { cn } from "@/lib/utils"
import { Label, NotebookHeader, mono, splitTitle } from "@/components/notebook"

const links = [
  { label: "GitHub", href: "https://github.com/hspeiser" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/henryspeiser/" },
  { label: "Resume", href: "/api/resume" },
  { label: "Email", href: "mailto:henry@speiser.net" },
]

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const { name, note } = splitTitle(project.title)
  const previewUrl = project.videos?.[0]?.url
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hovered, setHovered] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const showVideo = hovered && videoReady

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block"
      onMouseEnter={() => {
        if (!window.matchMedia("(hover: hover)").matches) return
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
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={cn(
            "object-cover transition-all duration-500 group-hover:scale-[1.02]",
            showVideo && "opacity-0"
          )}
        />
        {previewUrl && (
          <video
            ref={videoRef}
            src={hovered || videoReady ? previewUrl : undefined}
            muted
            loop
            playsInline
            preload="none"
            onLoadedData={() => setVideoReady(true)}
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
              showVideo ? "opacity-100" : "opacity-0"
            )}
          />
        )}
      </div>

      <div className="mt-3 grid grid-cols-[2.25rem_1fr_auto] items-baseline gap-x-2">
        <span className={cn(mono.className, "text-[13px] text-signal")}>{String(index + 1).padStart(2, "0")}</span>
        <h3 className="text-lg md:text-xl font-semibold tracking-[-0.02em] leading-snug group-hover:text-signal transition-colors">
          {name}
        </h3>
        <ArrowUpRight className="h-4 w-4 self-center opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
        <span />
        <div className="col-span-2 mt-1 flex flex-col gap-0.5">
          {note && <span className="text-sm text-foreground/75">{note}</span>}
          <Label>{project.tags.slice(0, 3).join(" · ")}</Label>
        </div>
      </div>
    </Link>
  )
}

const skills = ["Software", "Electronics", "Mechanical", "PCB Design", "Embedded Systems", "3D Printing"]

function About() {
  const [isResumeOpen, setIsResumeOpen] = useState(false)

  return (
    <section id="about" className="scroll-mt-20 pt-24 md:pt-32">
      <div className="flex items-baseline justify-between border-b border-foreground pb-3 mb-8 md:mb-10">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.03em]">About</h2>
      </div>
      <div className="grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 md:gap-14 items-start">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted max-w-sm w-full">
          <Image
            src="/profile-photo.png"
            alt="Henry Speiser"
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover scale-[1.08]"
          />
        </div>
        <div>
          <div className="space-y-5 text-base sm:text-lg leading-relaxed text-foreground/80">
            <p>
              I hate leaving any stone unturned. If I don't know something, I go figure it out,
              either by finding someone who does or by digging into it myself. No matter how much
              work it takes, if there's an answer, I want to find it.
            </p>
            <p>
              That's also why I've ended up working across so many different parts of
              engineering. I love designing mechanical systems, circuit boards, writing software
              and firmware, and training models. Whatever the problem needs, I'm happy to learn.
              Instead of thinking about engineering in terms of disciplines, I think about what
              needs to happen to get to the best solution.
            </p>
            <p>
              And I hate treating things like black boxes. I always want to know exactly why
              something works. The more of a system you understand, the more options you have
              when you're trying to solve something, and the less you're constrained by whatever
              tools or abstractions you already know.
            </p>
            <p>
              That's pretty much how I approach engineering. Understand the problem all the way
              down, figure out what the best solution should be, and then do whatever work it
              takes to get there.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-1.5">
            {skills.map((skill) => (
              <span key={skill} className="rounded-full border border-foreground/15 px-2.5 py-1 text-xs text-foreground/80">
                {skill}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setIsResumeOpen(true)}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:bg-signal hover:text-white transition-colors"
          >
            <Download className="h-4 w-4" />
            Resume
          </button>
        </div>
      </div>
      <ResumeViewer isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} pdfUrl="/api/resume" />
    </section>
  )
}

export default function Home() {
  return (
    <div className={"min-h-screen"}>
      <NotebookHeader />

      <main id="top" className="mx-auto max-w-[1200px] px-4 md:px-8">
        {/* Intro */}
        <section className="pt-12 md:pt-20 pb-10 md:pb-14 grid md:grid-cols-[1fr_auto] gap-8 md:gap-12 items-end">
          <div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.045em] leading-[0.95]">
              Henry Speiser<span className="text-signal">.</span>
            </h1>
            <p className="mt-5 text-lg md:text-xl text-foreground/70 max-w-md leading-snug">
              I build things. Sometimes they even work.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={l.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  className="underline decoration-foreground/25 underline-offset-4 hover:text-signal hover:decoration-signal transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
          <div className="hidden md:block relative w-40 h-48 lg:w-48 lg:h-56 overflow-hidden rounded-2xl bg-muted">
            <Image src="/profile-photo.png" alt="Henry Speiser" fill sizes="200px" className="object-cover" priority />
          </div>
        </section>

        {/* Montage */}
        <section>
          <div className="relative aspect-video bg-black overflow-hidden rounded-2xl ring-1 ring-foreground/10">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              poster="/hero/montage-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
            >
              <source src="/hero/montage-720.mp4" type="video/mp4" media="(max-width: 767px)" />
              <source src="/hero/montage-1080.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="mt-2 flex justify-between">
            <Label>Fig. 00 · Everything, fast</Label>
            <Label>0:48</Label>
          </div>
        </section>

        {/* Work */}
        <section id="work" className="scroll-mt-20 pt-16 md:pt-24">
          <div className="flex items-baseline justify-between border-b border-foreground pb-3 mb-8 md:mb-10">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.03em]">Projects</h2>
            <Label>{projects.length} entries</Label>
          </div>
          <div className="grid md:grid-cols-2 gap-x-6 lg:gap-x-8 gap-y-10 md:gap-y-14">
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        </section>

        <About />

        {/* Contact */}
        <section id="contact" className="scroll-mt-20 pt-24 md:pt-32 pb-10">
          <div className="border-t border-foreground pt-6">
            <Label>Contact</Label>
            <p className="mt-4 text-3xl sm:text-4xl md:text-6xl font-semibold tracking-[-0.04em] leading-[1.05] max-w-3xl">
              Got something that needs building<span className="text-signal">?</span>
            </p>
            <a
              href="mailto:henry@speiser.net"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-3 text-sm font-medium hover:bg-signal hover:text-white transition-colors"
            >
              henry@speiser.net
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <footer className="mt-20 flex flex-col sm:flex-row gap-3 justify-between border-t border-foreground/15 pt-4">
            <Label>© {new Date().getFullYear()} Henry Speiser</Label>
            <Label>Built by hand, mostly</Label>
          </footer>
        </section>
      </main>
    </div>
  )
}
