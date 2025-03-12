import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  imageUrl: string
  slug: string
  featured?: boolean
}

export default function ProjectCard({ title, description, tags, imageUrl, slug, featured = false }: ProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`} className="block">
      <div className="anduril-card group h-full relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent opacity-30 z-0"></div>
        <div className="aspect-[4/3] w-full overflow-hidden relative">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-60"></div>

          {featured && (
            <div className="absolute top-3 right-3 bg-white/20 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider">
              Featured
            </div>
          )}
        </div>

        <div className="p-6 relative">
          <div className="absolute top-0 left-0 w-1 h-full bg-white/50"></div>
          <h3
            className="text-xl font-medium uppercase tracking-wider mb-2 text-white group-hover:text-white/80 transition-colors"
            style={{ color: "#ffffff !important" }}
          >
            {title}
          </h3>

          <p className="text-sm text-white mb-4 line-clamp-2" style={{ color: "#ffffff !important" }}>
            {description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-xs bg-muted/50 text-white border-white/30"
                style={{ color: "#ffffff !important" }}
              >
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge
                variant="outline"
                className="text-xs bg-muted/50 text-white border-white/30"
                style={{ color: "#ffffff !important" }}
              >
                +{tags.length - 3}
              </Badge>
            )}
          </div>

          <div
            className="flex items-center text-sm font-medium text-white group-hover:text-white/80 transition-colors"
            style={{ color: "#ffffff !important" }}
          >
            View Project
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  )
}

