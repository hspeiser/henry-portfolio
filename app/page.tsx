"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Github, Linkedin, Mail, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import AndurilHeader from "@/components/anduril-header"
import AndurilSection from "@/components/anduril-section"
import ProjectGrid from "@/components/project-grid"

// Base URL for assets
const baseUrl = "https://pub-23ed2f7e90c646778e7f318e43b4e788.r2.dev/public"

// Project data
const projects = [
  {
    title: "SkyDrive (Rocket Thrower)",
    description:
      "Centripetal force rocket thrower with a 1m radius, capable of ~600 feet throwing distance. Large-scale project, biggest yet. Work in progress.",
    tags: ["WORK IN PROGRESS", "Motor Modeling", "Fluid Flow", "Large-scale design"],
    imageUrl: `${baseUrl}/sky_drive/rotor_view.png?height=400&width=600`,
    slug: "sky_drive",
    featured: true,
  },
  {
    title: "Custom Mach 1 Rocket",
    description: "Fully custom solid-state rocket with custom remote ignitors and parachute deployment system.",
    tags: ["KiCAD", "Onshape", "Microcontrollers"],
    imageUrl: `${baseUrl}/rocket_photos/launch_good.png?height=400&width=600`,
    slug: "custom-rocket",
    featured: true,
  },
  {
    title: "Atila Biosystems POC Device",
    description: "Reusable and affordable viral testing device with PCR-level efficacy.",
    tags: ["Altium", "C", "Teamwork"],
    imageUrl: `${baseUrl}/atila_photos/Rev1-Rev2.png?height=400&width=600`,
    slug: "atila-biosystems",
  },
  {
    title: "Universal Connector System",
    description: "Universal connectorized system to reduce unintentional unplugs of sensor and motor connectors.",
    tags: ["KiCAD", "OnShape", "FEA"],
    imageUrl: `${baseUrl}/robot_electronics/robot.png?height=400&width=600`,
    slug: "robot-electronics",
  },
  {
    title: "100MPH FPV Drone",
    description:
      "I built a ridiculously fast FPV drone from scratch to explore aerial cinematography and scratch that itch for speed.",
    tags: ["Robust Design", "Tuning", "Need For Speed"],
    imageUrl: `${baseUrl}/fpv_drone/ready_to_fly.png?height=400&width=600`,
    slug: "fpv_drone",
  },
  {
    title: "Rocket-Powered RC Car",
    description:
      "A Fast & Furious-style RC car retrofitted with a rocket engine for a wild (and slightly dangerous) experiment.",
    tags: ["3D Printing", "Rocket", "RC Car", "Great Ideas"],
    imageUrl: `${baseUrl}/rocket_car/side_view_rocket_car.png?height=400&width=600`,
    slug: "rocket_car",
  },
  {
    title: "Handcrafted Outdoor Wooden Bench",
    description: "Designed and built a custom outdoor bench with a focus on durability and aesthetics.",
    tags: ["Woodworking", "CAD", "Structural Design"],
    imageUrl: `${baseUrl}/wooden_bench/hanging_bench.png?height=400&width=600`,
    slug: "wooden_bench",
  },
  {
    title: "The Tramp Stamp (Rapid Test Name Stamper)",
    description: "A custom multi-stamp holder designed to quickly fill out name and student ID fields on tests.",
    tags: ["3D Printing", "Futuristic Technology"],
    imageUrl: `${baseUrl}/tramp_stamp/second_side_view.png?height=400&width=600`,
    slug: "tramp_stamp",
  },
  {
    title: "Personal Portfolio Website",
    description: "A fully custom-built portfolio showcasing my engineering projects.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    imageUrl: `${baseUrl}/portfolio_website/homepage.png?height=400&width=600`,
    slug: "portfolio_website",
  },
]

export default function Home() {
  // Animate sections on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.1 },
    )

    document.querySelectorAll(".fade-in").forEach((section) => {
      observer.observe(section)
    })

    document.querySelectorAll(".slide-in").forEach((section) => {
      observer.observe(section)
    })

    return () => {
      document.querySelectorAll(".fade-in, .slide-in").forEach((section) => {
        observer.unobserve(section)
      })
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen anduril-bg">
      <AndurilHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="anduril-scan-line"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-8 text-center max-w-3xl mx-auto">
              <div className="space-y-4 slide-in">
                <h1
                  className="text-4xl font-medium uppercase tracking-wider sm:text-5xl md:text-6xl/none lg:text-7xl/none anduril-text-glow"
                  style={{ color: "#ffffff !important" }}
                >
                  Henry Speiser
                </h1>

                <p className="text-lg mt-6 max-w-[600px] mx-auto text-white" style={{ color: "#ffffff !important" }}>
                  I build things. Sometimes they even work.
                </p>
              </div>

              {/* Update buttons to tactical style */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8 slide-in">
                <Button size="lg" className="tactical-button" asChild>
                  <a href="#projects">Explore Projects</a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="tactical-button border-white/50 hover:border-white"
                  asChild
                >
                  <a href="#contact">Get in Touch</a>
                </Button>
              </div>
            </div>
          </div>

          {/* Scroll indicator - Fix centering */}
          <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center slide-in">
            <span className="text-white text-sm mb-2 uppercase tracking-wider" style={{ color: "#ffffff !important" }}>
              Scroll to explore
            </span>
            <ChevronDown className="h-5 w-5 text-white animate-bounce" />
          </div>
        </section>

        {/* Projects Section */}
        <AndurilSection
          id="projects"
          title="Selected Projects"
          subtitle="A showcase of my engineering work and experiments"
        >
          <ProjectGrid projects={projects} />
        </AndurilSection>

        <div className="section-divider" />

        {/* About Section */}
        <AndurilSection id="about" title="About Me" align="left">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 slide-in">
              <p className="text-lg text-white" style={{ color: "#ffffff !important" }}>
              I love all things engineering, whether it's designing in CAD, creating printed circuit boards, or writing code, I'm all about the process of designing anything. My journey in engineering started with FIRST Robotics, where, as a member of Team 971, I learned how to design PCBs, write industry level code, and develop complex mechanical systems.
              </p>
              <p className="text-lg text-white" style={{ color: "#ffffff !important" }}>
              To me, the world is a sandbox, every problem is an opportunity to build something, whether it's a small fix, like stamping my name 18 times on a test, or something massive, like launching rockets into space. I’m always thinking about different ways to do things.
              </p>

              <div className="pt-4">
                <h3 className="text-xl font-medium uppercase tracking-wider mb-4 subtle-border inline-block pb-2 text-white">
                  Expertise
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg border border-white/20 bg-card text-center hover-lift anduril-card">
                    <span className="block text-sm font-medium uppercase text-white">Software</span>
                    <span className="text-xs text-white/80">C++, Java, Python</span>
                  </div>
                  <div className="p-4 rounded-lg border border-white/20 bg-card text-center hover-lift anduril-card">
                    <span className="block text-sm font-medium uppercase text-white">Electronics</span>
                    <span className="text-xs text-white/80">PCB Design, Microcontrollers</span>
                  </div>
                  <div className="p-4 rounded-lg border border-white/20 bg-card text-center hover-lift anduril-card">
                    <span className="block text-sm font-medium uppercase text-white">Mechanical</span>
                    <span className="text-xs text-white/80">CAD, 3D Printing</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center slide-in">
              <div className="relative rounded-lg overflow-hidden border border-white/20 anduril-glow">
                <img
                  src={`${baseUrl}/pictures_henry/profile.png?height=500&width=500`}
                  alt="Profile"
                  className="object-cover w-full max-w-md aspect-square"
                  width={500}
                  height={500}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-60"></div>
              </div>
            </div>
          </div>
        </AndurilSection>

        <div className="section-divider" />

        {/* Contact Section */}
        <AndurilSection
          id="contact"
          title="Get in Touch"
          subtitle="Interested in collaborating? Let's build something together"
        >
          <div className="max-w-md mx-auto fade-in">
            <div className="anduril-card p-8">
              <p className="text-center text-white mb-8" style={{ color: "#ffffff !important" }}>
                Feel free to reach out through any of these channels. I'm always interested in hearing about new
                projects and opportunities.
              </p>

              <div className="flex flex-col gap-4">
                {/* Update contact buttons */}
                <Button className="flex items-center gap-2 w-full tactical-button" asChild>
                  <a href="mailto:henry@speiser.net">
                    <Mail className="h-4 w-4" />
                    Email Me
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 w-full tactical-button border-white/50 hover:border-white"
                  asChild
                >
                  <a href="https://github.com/hspeiser" target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 w-full tactical-button border-white/50 hover:border-white"
                  asChild
                >
                  <a href="https://www.linkedin.com/in/henryspeiser/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </AndurilSection>
      </main>

      <footer className="border-t border-white/20 py-6 md:py-0">
        <div className="container flex flex-col gap-4 md:h-16 md:flex-row md:items-center">
          <p className="text-sm text-white uppercase tracking-wider" style={{ color: "#ffffff !important" }}>
            © {new Date().getFullYear()} Henry Speiser | All rights reserved
          </p>
          <nav className="md:ml-auto flex gap-4 sm:gap-6">
            <Link
              className="text-sm text-white hover:text-white/80 transition-colors uppercase tracking-wider"
              href="#projects"
              style={{ color: "#ffffff !important" }}
            >
              Projects
            </Link>
            <Link
              className="text-sm text-white hover:text-white/80 transition-colors uppercase tracking-wider"
              href="#about"
              style={{ color: "#ffffff !important" }}
            >
              About
            </Link>
            <Link
              className="text-sm text-white hover:text-white/80 transition-colors uppercase tracking-wider"
              href="#contact"
              style={{ color: "#ffffff !important" }}
            >
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

