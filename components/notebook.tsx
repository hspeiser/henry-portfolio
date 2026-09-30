import type React from "react"
import { Inter_Tight, JetBrains_Mono } from "next/font/google"
import { cn } from "@/lib/utils"

// Shared pieces for the notebook style pages
export const sans = Inter_Tight({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })
export const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"] })

export const HOME = "/"

// "Anduril AI Grand Prix (25th of 3,000+)" -> name + note
export function splitTitle(title: string) {
  const match = title.match(/^(.*?)\s*\((.*)\)\s*$/)
  return match ? { name: match[1], note: match[2] } : { name: title, note: "" }
}

export function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn(mono.className, "text-[11px] uppercase tracking-[0.08em] text-foreground/55", className)}>
      {children}
    </span>
  )
}

export function NotebookHeader() {
  return (
    <header className="sticky top-0 z-30 bg-background/90 backdrop-blur border-b border-foreground/15">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8 h-14 flex items-center justify-between">
        <a href={`${HOME}#top`} className="text-sm font-semibold tracking-tight">
          Henry Speiser<span className="text-signal">.</span>
        </a>
        <nav className="flex gap-5 text-sm">
          <a href={`${HOME}#work`} className="hover:text-signal transition-colors">Work</a>
          <a href={`${HOME}#about`} className="hover:text-signal transition-colors">About</a>
          <a href={`${HOME}#contact`} className="hover:text-signal transition-colors">Contact</a>
        </nav>
      </div>
    </header>
  )
}
