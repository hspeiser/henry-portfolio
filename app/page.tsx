import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProjectCard from "@/components/project-card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <span className="font-bold text-xl">Portfolio</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#projects">
            Projects
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#about">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#contact">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Hi, I'm Henry
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Engineer that Loves Solving Problems
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild>
                  <Link href="#projects">View My Work</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="#contact">Contact Me</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="projects" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">My Projects</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Check out some of my recent work
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
              <ProjectCard
                title="Custom Mach 1 Rocket"
                description="Fully custom solid-state rocket with custom remote ignitors and parachute deployment system."
                tags={["KiCad", "Onshape", "Microcontrollers"]}
                imageUrl="/homepage_pictures/rocket_center.JPG?height=400&width=600"
                slug="custom-rocket"
              />
              <ProjectCard
                title="Social Media Dashboard"
                description="Analytics dashboard for tracking engagement across multiple social platforms."
                tags={["Next.js", "TypeScript", "Tailwind CSS"]}
                imageUrl="/placeholder.svg?height=400&width=600"
                slug="social-dashboard"
              />
              <ProjectCard
                title="Mobile Fitness App"
                description="Cross-platform mobile application for workout tracking and nutrition planning."
                tags={["React Native", "Firebase", "Redux"]}
                imageUrl="/placeholder.svg?height=400&width=600"
                slug="fitness-app"
              />
              <ProjectCard
                title="AI Content Generator"
                description="Web application that leverages AI to generate marketing content."
                tags={["Python", "TensorFlow", "Flask"]}
                imageUrl="/placeholder.svg?height=400&width=600"
                slug="ai-content-generator"
              />
              <ProjectCard
                title="Real-time Chat Application"
                description="Secure messaging platform with end-to-end encryption and file sharing."
                tags={["Socket.io", "Express", "Vue.js"]}
                imageUrl="/placeholder.svg?height=400&width=600"
                slug="chat-application"
              />
              <ProjectCard
                title="Portfolio Website"
                description="The website you're currently viewing, built with modern web technologies."
                tags={["Next.js", "Tailwind CSS", "TypeScript"]}
                imageUrl="/placeholder.svg?height=400&width=600"
                slug="portfolio-website"
              />
            </div>
          </div>
        </section>
        <section id="about" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Me</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  I'm a passionate developer with a background in computer science and a love for creating elegant
                  solutions to complex problems. With over [X] years of experience in the industry, I've worked on a
                  wide range of projects from small startups to large enterprise applications.
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  My expertise includes front-end development with React and Next.js, back-end development with Node.js
                  and Python, and database design with SQL and NoSQL solutions. I'm always learning new technologies and
                  methodologies to stay at the cutting edge of web development.
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  When I'm not coding, you can find me hiking, reading, or experimenting with new recipes in the
                  kitchen.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full max-w-sm aspect-square overflow-hidden rounded-xl">
                  <img
                    src="/placeholder.svg?height=500&width=500"
                    alt="Profile"
                    className="object-cover"
                    width={500}
                    height={500}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get In Touch</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  I'm currently open to new opportunities. Feel free to reach out!
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button className="flex items-center gap-2" asChild>
                  <a href="mailto:your.email@example.com">
                    <Mail className="h-4 w-4" />
                    Email Me
                  </a>
                </Button>
                <Button variant="outline" className="flex items-center gap-2" asChild>
                  <a href="https://github.com/hspeiser" target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                </Button>
                <Button variant="outline" className="flex items-center gap-2" asChild>
                  <a href="https://www.linkedin.com/in/henryspeiser/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Henry. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#projects">
            Projects
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#about">
            About
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#contact">
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  )
}

