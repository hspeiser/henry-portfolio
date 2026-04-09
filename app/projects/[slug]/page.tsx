"use client"

import type React from "react"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft, Github, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { projects } from "@/lib/projects"
import VideoPlayer from "@/components/video-player"
import ImageGallery from "@/components/image-gallery"
import { ErrorBoundary } from "@/components/error-boundary"
import { useToast } from "@/components/ui/use-toast"
import { trackEvent } from "@/lib/analytics"
import dynamic from "next/dynamic"

// Dynamically import ModelViewer to avoid SSR issues
const ModelViewer = dynamic(() => import("@/components/model-viewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-video rounded-lg border bg-card flex items-center justify-center">
      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
    </div>
  ),
})

// Fallback component for model viewer errors
function ModelViewerFallback({ modelUrl, description }: { modelUrl: string; description: string }) {
  return (
    <div className="p-8 border rounded-lg bg-card text-center">
      <h3 className="text-lg font-medium mb-2">3D Model Available</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <Button variant="outline" onClick={() => window.open(modelUrl, "_blank")}>
        Download 3D Model
      </Button>
    </div>
  )
}

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [activeTab, setActiveTab] = useState("gallery")
  const { toast } = useToast()
  const router = useRouter()

  const project = projects.find((p) => p.slug === slug)

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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

  // Simple back navigation without animations
  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault()
    trackEvent.navigationClick("back_to_projects")

    router.push("/")

    // Scroll to projects section after navigation
    setTimeout(() => {
      const projectsSection = document.getElementById("projects")
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: "smooth" })
      }
    }, 100)
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container px-4 py-24 md:px-6 flex flex-col items-center justify-center min-h-[50vh]">
          <div className="rounded-lg border bg-card p-8 max-w-md mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
            <p className="mb-6 text-muted-foreground">
              The project you're looking for is still being developed. Check back later!
            </p>
            <Button asChild>
              <Link href="/#projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-12 md:px-6 max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/#projects"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            onClick={handleBackClick}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </div>

        {/* Project Content */}
        <div className="w-full">
          {/* Featured Image */}
          <div className="rounded-lg overflow-hidden border mb-6">
            <div className="relative aspect-video">
              <Image
                src={project.imageUrl || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Project info underneath image */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              {project.tags.map((tag, i) => (
                <Badge key={i} className="mb-1">
                  {tag}
                </Badge>
              ))}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">{project.title}</h2>
            <p className="mb-6 text-base sm:text-lg md:text-xl text-muted-foreground">{project.description}</p>

            {/* Demo / Repo Links */}
            <div className="flex flex-wrap gap-4 mt-6">
              {project.demoUrl && (
                <Button variant="default" className="gap-2" onClick={() => handleDemoClick(project.demoUrl!)}>
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </Button>
              )}
              {project.githubUrl && (
                <Button variant="outline" className="gap-2 bg-transparent" asChild>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleGithubClick(project.githubUrl!)}
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Project Details Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <h4 className="text-xl font-semibold mb-3">Project Details</h4>
              <div className="prose prose-invert max-w-none">
                {project.longDescription?.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-4 text-base sm:text-lg text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-3">Project Info</h4>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Categories</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {project.categories?.map((category, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs for Gallery, Videos, 3D Models */}
          <Tabs value={activeTab} onValueChange={handleTabChange} className="mt-8">
            <TabsList className="mb-6">
              <TabsTrigger value="gallery" className="text-sm">
                Gallery
              </TabsTrigger>
              {project.videos && project.videos.length > 0 && (
                <TabsTrigger value="videos" className="text-sm">
                  Videos
                </TabsTrigger>
              )}
              {project.models && project.models.length > 0 && (
                <TabsTrigger value="models" className="text-sm">
                  3D Models
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="gallery" className="mt-0">
              <ImageGallery images={project.images} projectSlug={project.slug} />
            </TabsContent>

            {project.videos && project.videos.length > 0 && (
              <TabsContent value="videos" className="mt-0">
                <div className="space-y-6 max-w-5xl mx-auto">
                  {project.videos.map((video, index) => (
                    <div key={index} className="overflow-hidden rounded-lg border">
                      <VideoPlayer videoUrl={video.url} title={project.title} projectSlug={project.slug} />
                      <div className="p-3 text-sm text-muted-foreground">{video.description}</div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            )}

            {project.models && project.models.length > 0 && (
              <TabsContent value="models" className="mt-0">
                <div className="space-y-6 max-w-5xl mx-auto">
                  {project.models.map((model, index) => (
                    <div key={index} className="overflow-hidden rounded-lg border p-4">
                      <h4 className="font-medium mb-2">{model.description}</h4>
                      <ErrorBoundary
                        fallback={<ModelViewerFallback modelUrl={model.url} description={model.description} />}
                      >
                        {activeTab === "models" && <ModelViewer modelUrl={model.url} projectSlug={project.slug} />}
                      </ErrorBoundary>
                    </div>
                  ))}
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  )
}
