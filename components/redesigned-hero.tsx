"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react"

const profileImage = "/profile-photo.png"

const phrases = [
  "building rockets.",
  "blowing things up.",
  "shooting first, and asking questions later.",
  "making the impossible possible (with duct tape).",
  "working with my hands.",
  "designing web applications.",
  "building systems that actually work.",
  "making mistakes.",
  "designing printed circuit boards.",
  "debugging code one semicolon at a time.",
  "robots.",
  "doing things no one else has done before.",
]

function Typewriter() {
  const [text, setText] = useState("")
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [ready, setReady] = useState(false)

  // Only the "I like ..." part types. The main text is always static.
  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!ready) return
    let timeout: NodeJS.Timeout

    const current = phrases[phraseIndex]
    if (!isDeleting) {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), 45)
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2500)
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(text.slice(0, -1)), 25)
      } else {
        setIsDeleting(false)
        setPhraseIndex((i) => (i + 1) % phrases.length)
      }
    }

    return () => clearTimeout(timeout)
  }, [text, isDeleting, ready, phraseIndex])

  return (
    <span>
      <span className="text-muted-foreground">I build things. Sometimes they even work.</span>
      <br />
      <span className="text-muted-foreground">I like </span>
      <span className="text-foreground">{text}</span>
      <span className="inline-block w-[2px] h-[1em] bg-muted-foreground/60 align-middle ml-0.5 animate-pulse" />
    </span>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
  }),
}

export default function RedesignedHero() {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <section id="top" className="min-h-[100dvh] flex items-center pt-14">
      <div className="max-w-[1200px] mx-auto px-6 py-20 w-full grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Text */}
        <div className="order-2 md:order-1 text-center md:text-left">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="text-sm text-muted-foreground mb-4 tracking-wide uppercase"
          >
            Engineer & Builder
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6"
          >
            Henry Speiser
          </motion.h1>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-lg sm:text-xl leading-relaxed mb-8 min-h-[3.5em]"
          >
            <Typewriter />
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="flex flex-wrap gap-2 mb-8 justify-center md:justify-start"
          >
            {["Software", "Electronics", "Mechanical"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs text-muted-foreground border border-border rounded-full"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
            className="flex items-center gap-6 justify-center md:justify-start"
          >
            <a
              href="#projects"
              className="px-5 py-2.5 text-sm font-medium bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-5 py-2.5 text-sm font-medium text-foreground border border-border rounded-lg hover:bg-accent transition-colors"
            >
              Contact
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={5}
            className="flex items-center gap-4 mt-8 justify-center md:justify-start"
          >
            {[
              { href: "https://github.com/hspeiser", icon: Github, label: "GitHub" },
              { href: "https://www.linkedin.com/in/henryspeiser/", icon: Linkedin, label: "LinkedIn" },
              { href: "mailto:henry@speiser.net", icon: Mail, label: "Email" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                aria-label={label}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="order-1 md:order-2 flex justify-center"
        >
          <div className="relative w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 lg:w-72 lg:h-72 rounded-full overflow-hidden border border-border bg-muted">
            <Image
              src={profileImage}
              alt="Henry Speiser"
              fill
              className={`object-cover scale-[1.14] transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
              quality={75}
              priority
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block">
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4 text-muted-foreground/40" />
        </motion.div>
      </div>
    </section>
  )
}
