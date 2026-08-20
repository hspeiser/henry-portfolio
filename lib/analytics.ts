import { track as vercelTrack } from "@vercel/analytics"
import posthog from "posthog-js"

// Send every event to both Vercel Analytics and PostHog
const track = (name: string, properties?: Record<string, string | number | undefined>) => {
  const defined = properties
    ? Object.fromEntries(Object.entries(properties).filter(([, v]) => v !== undefined))
    : undefined
  vercelTrack(name, defined as Record<string, string | number> | undefined)
  if (typeof window !== "undefined" && posthog.__loaded) {
    posthog.capture(name, properties)
  }
}

// Custom analytics events
export const trackEvent = {
  // Project interactions
  projectView: (projectSlug: string) => {
    track("project_view", { project: projectSlug })
  },

  projectDemo: (projectSlug: string, demoUrl: string) => {
    track("project_demo_click", { project: projectSlug, url: demoUrl })
  },

  projectGithub: (projectSlug: string, githubUrl: string) => {
    track("project_github_click", { project: projectSlug, url: githubUrl })
  },

  // Navigation events
  navigationClick: (section: string) => {
    track("navigation_click", { section })
  },

  // Contact events
  contactClick: (method: string) => {
    track("contact_click", { method })
  },

  // Resume events
  resumeView: () => {
    track("resume_view")
  },

  resumeDownload: () => {
    track("resume_download")
  },

  // Filter events
  projectFilter: (category: string) => {
    track("project_filter", { category })
  },

  // Model viewer events
  modelView: (projectSlug: string, modelUrl: string) => {
    track("model_view", { project: projectSlug, model: modelUrl })
  },

  // Video events
  videoPlay: (projectSlug: string, videoUrl: string) => {
    track("video_play", { project: projectSlug, video: videoUrl })
  },

  // Gallery events
  imageView: (projectSlug: string, imageIndex: number, imageUrl?: string) => {
    const imageName = imageUrl ? decodeURIComponent(imageUrl.split("/").pop() ?? "") : undefined
    track("image_view", { project: projectSlug, index: imageIndex, image: imageName })
  },

  // Social media clicks
  socialClick: (platform: string, url: string) => {
    track("social_click", { platform, url })
  },

  // Theme changes
  themeChange: (theme: string) => {
    track("theme_change", { theme })
  },

  // Error tracking
  error: (errorType: string, errorMessage: string, component?: string) => {
    track("error", { type: errorType, message: errorMessage, component })
  },
}
