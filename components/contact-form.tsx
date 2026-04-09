"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"

const links = [
  {
    href: "mailto:henry@speiser.net",
    icon: Mail,
    label: "Email",
    text: "henry@speiser.net",
  },
  {
    href: "https://github.com/hspeiser",
    icon: Github,
    label: "GitHub",
    text: "github.com/hspeiser",
    external: true,
  },
  {
    href: "https://www.linkedin.com/in/henryspeiser/",
    icon: Linkedin,
    label: "LinkedIn",
    text: "linkedin.com/in/henryspeiser",
    external: true,
  },
]

export default function ContactForm() {
  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-lg"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Get in touch</h2>
          <p className="text-muted-foreground mb-10">
            Have a project in mind or just want to chat? Reach out.
          </p>

          <div className="space-y-4">
            {links.map(({ href, icon: Icon, label, text, external }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="flex items-center gap-4 p-4 rounded-xl border border-border hover:bg-accent hover:border-foreground/20 transition-colors group"
              >
                <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                  <Icon className="h-[18px] w-[18px] text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{label}</p>
                  <p className="text-sm text-muted-foreground">{text}</p>
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
