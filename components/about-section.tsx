"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Download, ExternalLink } from "lucide-react"
import ResumeViewer from "@/components/resume-viewer"

const baseUrl = "https://pub-23ed2f7e90c646778e7f318e43b4e788.r2.dev/public"
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
                src={`${baseUrl}/pictures_henry/profile.png`}
                alt="Henry Speiser"
                fill
                className={`object-cover transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
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
                I love all things engineering, whether it's designing in CAD, creating printed
                circuit boards, or writing code, I'm all about the process of designing anything.
              </p>
              <p>
                My journey in engineering started with FIRST Robotics, where, as a member of Team
                971, I learned how to design PCBs, write industry level code, and develop complex
                mechanical systems.
              </p>
              <p>
                To me, the world is a sandbox — every problem is an opportunity to build
                something, whether it's a small fix, like stamping my name 18 times on a test, or
                something massive, like launching rockets into space. I'm always thinking about
                different ways to do things.
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
