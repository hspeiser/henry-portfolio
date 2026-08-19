"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Download, ExternalLink } from "lucide-react"
import ResumeViewer from "@/components/resume-viewer"

const profileImage = "/profile-photo.png"
const resumePdfPath = "/api/resume"

export default function AboutSection() {
  const [isResumeOpen, setIsResumeOpen] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <section id="about" className="py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-border bg-muted max-w-md mx-auto md:mx-0">
              <Image
                src={profileImage}
                alt="Henry Speiser"
                fill
                className={`object-cover scale-[1.08] transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                sizes="(max-width: 768px) 100vw, 50vw"
                onLoad={() => setImageLoaded(true)}
              />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">About</h2>

            <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
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

            <div className="flex flex-wrap gap-2 mb-8">
              {["Software", "Electronics", "Mechanical", "PCB Design", "Embedded Systems", "3D Printing"].map(
                (skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs text-muted-foreground border border-border rounded-full"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsResumeOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity"
              >
                <Download className="h-4 w-4" />
                Resume
              </button>
              <a
                href="https://www.linkedin.com/in/henryspeiser/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground border border-border rounded-lg hover:bg-accent transition-colors"
              >
                LinkedIn
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <ResumeViewer isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} pdfUrl={resumePdfPath} />
    </section>
  )
}
