"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { trackEvent } from "@/lib/analytics"

interface VideoPlayerProps {
  videoUrl: string
  title: string
  projectSlug?: string
}

export default function VideoPlayer({ videoUrl, title, projectSlug }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasTrackedPlay, setHasTrackedPlay] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      const progress = (video.currentTime / video.duration) * 100
      setProgress(progress)
    }

    const handleEnded = () => {
      setIsPlaying(false)
    }

    const handleLoadedData = () => {
      setIsLoaded(true)
      // Ensure we're at the first frame
      video.currentTime = 0.1
    }

    const handleLoadedMetadata = () => {
      // Set to a small value to show the first frame
      video.currentTime = 0.1
    }

    const handlePlay = () => {
      // Track video play event (only once per video)
      if (!hasTrackedPlay && projectSlug) {
        trackEvent.videoPlay(projectSlug, videoUrl)
        setHasTrackedPlay(true)
      }
    }

    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("ended", handleEnded)
    video.addEventListener("loadeddata", handleLoadedData)
    video.addEventListener("loadedmetadata", handleLoadedMetadata)
    video.addEventListener("play", handlePlay)

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("ended", handleEnded)
      video.removeEventListener("loadeddata", handleLoadedData)
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
      video.removeEventListener("play", handlePlay)
    }
  }, [videoUrl, projectSlug, hasTrackedPlay])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !video.muted
    setIsMuted(!isMuted)
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current
    if (!video) return

    const rect = e.currentTarget.getBoundingClientRect()
    const pos = (e.clientX - rect.left) / rect.width
    video.currentTime = pos * video.duration
  }

  return (
    <div className="relative rounded-lg overflow-hidden border">
      <video
        ref={videoRef}
        className="w-full aspect-video object-contain bg-black"
        src={videoUrl}
        title={title}
        playsInline
        preload="metadata"
      />

      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20" onClick={togglePlay}>
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>

        <div className="relative flex-1 h-1 bg-white/30 cursor-pointer" onClick={handleProgressClick}>
          <div className="absolute top-0 left-0 h-full bg-primary" style={{ width: `${progress}%` }}></div>
        </div>

        <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20" onClick={toggleMute}>
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}
