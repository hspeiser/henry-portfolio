"use client"

interface VideoPlayerProps {
  videoUrl: string
  title: string
}

export default function VideoPlayer({ videoUrl, title }: VideoPlayerProps) {
  // For demo purposes, we'll show a placeholder
  // In a real app, you would use the actual video URL
  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
      {videoUrl ? (
        <video controls className="h-full w-full" poster="/placeholder.svg?height=720&width=1280">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-center text-gray-500 dark:text-gray-400">Video demo would be displayed here</p>
        </div>
      )}
    </div>
  )
}

