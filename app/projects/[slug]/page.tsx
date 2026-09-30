"use client"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowUpRight, Github, ExternalLink, FileText, Download, ChevronDown, ChevronUp } from "lucide-react"
import { projects } from "@/lib/projects"
import VideoPlayer from "@/components/video-player"
import ImageGallery from "@/components/image-gallery"
import { ErrorBoundary } from "@/components/error-boundary"
import { useToast } from "@/components/ui/use-toast"
import { trackEvent } from "@/lib/analytics"
import { cn } from "@/lib/utils"
import { HOME, Label, NotebookHeader, mono, splitTitle } from "@/components/notebook"
import dynamic from "next/dynamic"

// Dynamically import ModelViewer to avoid SSR issues
const ModelViewer = dynamic(() => import("@/components/model-viewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-video rounded-2xl bg-card flex items-center justify-center">
      <div className="animate-spin h-8 w-8 border-4 border-signal border-t-transparent rounded-full"></div>
    </div>
  ),
})

// Fallback component for model viewer errors
function ModelViewerFallback({ modelUrl, description }: { modelUrl: string; description: string }) {
  return (
    <div className="p-8 rounded-2xl bg-card text-center">
      <h3 className="text-lg font-medium mb-2">3D Model Available</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <button
        type="button"
        onClick={() => window.open(modelUrl, "_blank")}
        className="rounded-full border border-foreground/25 px-4 py-2 text-sm hover:border-signal hover:text-signal transition-colors"
      >
        Download 3D Model
      </button>
    </div>
  )
}

const pillPrimary =
  "inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:bg-signal hover:text-white transition-colors"
const pillOutline =
  "inline-flex items-center gap-2 rounded-full border border-foreground/25 px-5 py-2.5 text-sm font-medium hover:border-signal hover:text-signal transition-colors"

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [activeTab, setActiveTab] = useState("gallery")
  const [descriptionExpanded, setDescriptionExpanded] = useState(false)
  const { toast } = useToast()

  const index = projects.findIndex((p) => p.slug === slug)
  const project = index >= 0 ? projects[index] : undefined
  const next = projects[(index + 1) % projects.length]

  // Track project view
  useEffect(() => {
    if (project) {
      trackEvent.projectView(project.slug)
    }
  }, [project])

  // Handle demo click with analytics
  const handleDemoClick = (url: string) => {
    if (project) {
      trackEvent.projectDemo(project.slug, url)
    }
    toast({
      title: "Demo Link",
      description: "Opening demo in a new tab...",
      duration: 3000,
    })
    window.open(url, "_blank")
  }

  // Handle GitHub click with analytics
  const handleGithubClick = (url: string) => {
    if (project) {
      trackEvent.projectGithub(project.slug, url)
    }
  }

  // Handle tab change with analytics
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    if (project) {
      trackEvent.navigationClick(`project_tab_${value}`)
    }
  }

  const handleBackClick = () => {
    trackEvent.navigationClick("back_to_projects")
  }

  if (!project) {
    return (
      <div className={"min-h-screen"}>
        <NotebookHeader />
        <div className="mx-auto max-w-[1200px] px-4 md:px-8 py-24">
          <Label>Error · 404</Label>
          <h1 className="mt-4 text-4xl md:text-6xl font-semibold tracking-[-0.04em]">
            Project not found<span className="text-signal">.</span>
          </h1>
          <p className="mt-4 text-foreground/70 max-w-md">
            The project you're looking for is still being developed. Check back later!
          </p>
          <Link href={`${HOME}#work`} className={cn(pillPrimary, "mt-8")}>
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>
        </div>
      </div>
    )
  }

  const { name, note } = splitTitle(project.title)
  const paragraphs = project.longDescription?.split("\n").filter((p) => p.trim()) ?? []
  const isCollapsible = paragraphs.length > 4
  const collapsed = isCollapsible && !descriptionExpanded

  const tabs = [
    { value: "gallery", label: "Gallery", count: project.images.length },
    { value: "videos", label: "Videos", count: project.videos?.length ?? 0 },
    { value: "models", label: "3D Models", count: project.models?.length ?? 0 },
    { value: "paper", label: "Paper", count: project.papers?.length ?? 0 },
  ].filter((t) => t.count > 0)

  return (
    <div className={"min-h-screen"}>
      <NotebookHeader />

      <main className="mx-auto max-w-[1200px] px-4 md:px-8 pb-10">
        {/* Back */}
        <div className="pt-8 md:pt-10">
          <Link
            href={`${HOME}#work`}
            onClick={handleBackClick}
            className="group inline-flex items-center gap-2 hover:text-signal transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            <Label className="group-hover:text-signal transition-colors">All projects</Label>
          </Link>
        </div>

        {/* Title */}
        <section className="pt-8 md:pt-12 pb-8 md:pb-10">
          <div className="flex items-baseline gap-3">
            <span className={cn(mono.className, "text-[13px] text-signal")}>{String(index + 1).padStart(2, "0")}</span>
            {note && <Label>{note}</Label>}
          </div>
          <h1 className="mt-3 text-4xl sm:text-5xl md:text-7xl font-semibold tracking-[-0.045em] leading-[0.98] max-w-4xl">
            {name}
            <span className="text-signal">.</span>
          </h1>
          <p className="mt-5 text-lg md:text-xl text-foreground/70 max-w-2xl leading-snug">{project.description}</p>

          {(project.demoUrl || project.githubUrl || project.paperUrl) && (
            <div className="mt-7 flex flex-wrap gap-3">
              {project.demoUrl && (
                <button type="button" className={pillPrimary} onClick={() => handleDemoClick(project.demoUrl!)}>
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </button>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleGithubClick(project.githubUrl!)}
                  className={project.demoUrl ? pillOutline : pillPrimary}
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              )}
              {project.paperUrl && (
                <button
                  type="button"
                  className={pillOutline}
                  onClick={() => {
                    trackEvent.navigationClick(`project_paper_${project.slug}`)
                    setActiveTab("paper")
                    setTimeout(() => {
                      document.getElementById("project-media")?.scrollIntoView({ behavior: "smooth", block: "start" })
                    }, 50)
                  }}
                >
                  <FileText className="h-4 w-4" />
                  Read Paper
                </button>
              )}
            </div>
          )}
        </section>

        {/* Hero image */}
        <div className="relative aspect-video overflow-hidden rounded-2xl bg-muted">
          <Image
            src={project.imageUrl || "/placeholder.svg"}
            alt={project.title}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
            priority
          />
        </div>

        {/* Write-up + spec sheet */}
        <section className="pt-12 md:pt-16 grid lg:grid-cols-[1fr_300px] gap-12 lg:gap-16">
          <div>
            <div className="border-b border-foreground pb-3 mb-6">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.03em]">The build</h2>
            </div>
            <div className={cn("relative", collapsed && "max-h-[26rem] overflow-hidden")}>
              {paragraphs.map((paragraph, i) => (
                <p key={i} className="mb-5 text-base sm:text-lg leading-relaxed text-foreground/80">
                  {paragraph}
                </p>
              ))}
              {collapsed && (
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
              )}
            </div>
            {isCollapsible && (
              <button
                type="button"
                onClick={() => setDescriptionExpanded(!descriptionExpanded)}
                className={cn(pillOutline, "mt-2")}
              >
                {descriptionExpanded ? (
                  <>
                    Show less <ChevronUp className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Read the whole thing <ChevronDown className="h-4 w-4" />
                  </>
                )}
              </button>
            )}
          </div>

          <aside className="lg:sticky lg:top-24 self-start">
            <dl className="rounded-2xl bg-card p-5 space-y-5">
              <div>
                <dt><Label>Discipline</Label></dt>
                <dd className="mt-1.5 text-sm">{project.categories.join(", ")}</dd>
              </div>
              <div className="border-t border-border pt-5">
                <dt><Label>Stack</Label></dt>
                <dd className="mt-2 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-foreground/15 px-2.5 py-1 text-xs text-foreground/80">
                      {tag}
                    </span>
                  ))}
                </dd>
              </div>
              <div className="border-t border-border pt-5">
                <dt><Label>On file</Label></dt>
                <dd className={cn(mono.className, "mt-1.5 text-sm text-foreground/80")}>
                  {tabs
                    .map((t) => {
                      const label = t.value === "gallery" ? "photo" : t.value === "models" ? "3d model" : t.value.replace(/s$/, "")
                      return `${t.count} ${label}${t.count === 1 ? "" : "s"}`
                    })
                    .join(" · ")}
                </dd>
              </div>
            </dl>
          </aside>
        </section>

        {/* Media */}
        <section id="project-media" className="scroll-mt-20 pt-16 md:pt-24">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-foreground pb-3 mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.03em]">Evidence</h2>
            {tabs.length > 1 && (
              <div className="flex flex-wrap gap-2" role="tablist">
                {tabs.map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === t.value}
                    onClick={() => handleTabChange(t.value)}
                    className={cn(
                      "rounded-full px-3.5 py-1.5 text-sm transition-colors",
                      activeTab === t.value
                        ? "bg-foreground text-background"
                        : "border border-foreground/20 text-foreground/70 hover:text-foreground hover:border-foreground/50"
                    )}
                  >
                    {t.label}
                    <span className={cn(mono.className, "ml-1.5 text-[11px] opacity-60")}>{t.count}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {activeTab === "gallery" && <ImageGallery images={project.images} projectSlug={project.slug} />}

          {activeTab === "videos" && project.videos && (
            <div className="space-y-10 max-w-5xl mx-auto">
              {project.videos.map((video, i) => (
                <figure key={i}>
                  <div className="overflow-hidden rounded-2xl">
                    <VideoPlayer videoUrl={video.url} title={project.title} projectSlug={project.slug} />
                  </div>
                  <figcaption className="mt-3 text-sm text-foreground/70">{video.description}</figcaption>
                </figure>
              ))}
            </div>
          )}

          {activeTab === "models" && project.models && (
            <div className="space-y-10 max-w-5xl mx-auto">
              {project.models.map((model, i) => (
                <figure key={i}>
                  <div className="overflow-hidden rounded-2xl">
                    <ErrorBoundary fallback={<ModelViewerFallback modelUrl={model.url} description={model.description} />}>
                      <ModelViewer modelUrl={model.url} projectSlug={project.slug} />
                    </ErrorBoundary>
                  </div>
                  <figcaption className="mt-3 text-sm text-foreground/70">{model.description}</figcaption>
                </figure>
              ))}
            </div>
          )}

          {activeTab === "paper" && project.papers && (
            <div className="space-y-6 max-w-5xl mx-auto">
              {project.papers.map((paper, i) => (
                <div key={i} className="overflow-hidden rounded-2xl bg-card">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-4">
                    <div className="flex items-start gap-3 min-w-0">
                      <FileText className="h-5 w-5 text-signal shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <h4 className="font-medium">{paper.title}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">{paper.description}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button
                        type="button"
                        className={pillOutline}
                        onClick={() => window.open(paper.url, "_blank", "noopener,noreferrer")}
                      >
                        <ExternalLink className="h-4 w-4" />
                        Open
                      </button>
                      <a href={paper.url} download target="_blank" rel="noopener noreferrer" className={pillOutline}>
                        <Download className="h-4 w-4" />
                        Download
                      </a>
                    </div>
                  </div>
                  <iframe src={paper.url} className="w-full h-[85vh] border-0 bg-white" title={paper.title} />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Next project */}
        {next && next.slug !== project.slug && (
          <Link href={`/projects/${next.slug}`} className="group mt-24 md:mt-32 block border-t border-foreground pt-6">
            <Label>Next project · {String(((index + 1) % projects.length) + 1).padStart(2, "0")}</Label>
            <div className="mt-3 flex items-center justify-between gap-6">
              <span className="text-3xl sm:text-4xl md:text-6xl font-semibold tracking-[-0.04em] leading-[1.02] group-hover:text-signal transition-colors">
                {splitTitle(next.title).name}
              </span>
              <ArrowUpRight className="h-8 w-8 md:h-12 md:w-12 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-signal" />
            </div>
          </Link>
        )}

        <footer className="mt-20 flex flex-col sm:flex-row gap-3 justify-between border-t border-foreground/15 pt-4">
          <Label>© {new Date().getFullYear()} Henry Speiser</Label>
          <Label>Built by hand, mostly</Label>
        </footer>
      </main>
    </div>
  )
}
