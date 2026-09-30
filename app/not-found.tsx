import Link from "next/link"
import { Label, NotebookHeader } from "@/components/notebook"

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <NotebookHeader />
      <div className="mx-auto max-w-[1200px] px-4 md:px-8 py-24">
        <Label>Error · 404</Label>
        <h1 className="mt-4 text-4xl md:text-6xl font-semibold tracking-[-0.04em]">
          Page not found<span className="text-signal">.</span>
        </h1>
        <p className="mt-4 text-foreground/70 max-w-md">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:bg-signal hover:text-white transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
