import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProjectCard from "@/components/project-card"

// Base URL for assets
const baseUrl = "https://pub-23ed2f7e90c646778e7f318e43b4e788.r2.dev/public";

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
                tags={["KiCAD", "Onshape", "Microcontrollers"]}
                imageUrl={`${baseUrl}/rocket_photos/overview_rocket.JPG?height=400&width=600`}
                slug="custom-rocket"
              />
              <ProjectCard
                title="Atila BioSytems POC Device"
                description="Reusable and affordable viral testing device with PCR-level efficacy."
                tags={["Altium", "C", "Teamwork"]}
                imageUrl={`${baseUrl}/atila_photos/Rev1-Rev2.png?height=400&width=600`}
                slug="atila-biosystems"
              />
              <ProjectCard
                title="Universal Connector System for FRC"
                description="Universal connectorized system to reduce unintentional unplugs of sensor and motor connectors."
                tags={["KiCAD", "OnShape", "FEA"]}
                imageUrl={`${baseUrl}/robot_electronics/robot.png?height=400&width=600`}
                slug="robot-electronics"
              />
              <ProjectCard
                title="Custom CAN-Based Redundant Robot Controller"
                description="A high-speed board designed to interface with joysticks and 18 buttons, providing reliable control over a robot."
                tags={["KiCAD", "Power Electronics", "Pain"]}
                imageUrl={`${baseUrl}/button_board/button_board_pcb.png?height=400&width=600`}
                slug="button_board"
              />
              <ProjectCard
                title="Hanging Wooden Bench"
                description="A sturdy, hanging bench able to hold up to five people or 700 pounds, perfect for relaxing while watching the sunset."
                tags={["Woodworking", "OnShape", "Removing Splinters"]}
                imageUrl={`${baseUrl}/wooden_bench/hanging_bench.png?height=400&width=600`}
                slug="wooden_bench"
              />
              <ProjectCard
                title="The TRAMP Stamp"
                description="A stamp system that perfectly aligns stamps to quickly fill out my name and student ID on every test page in seconds."
                tags={["3D Printing", "Shameless Hacks"]}
                imageUrl={`${baseUrl}/tramp_stamp/top_view.png?height=400&width=600`}
                slug="tramp_stamp"
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
                Henry loves all things engineering, whether it's designing in CAD, creating printed circuit boards, or writing code, he's all about the process of designing anything. His journey in engineering started with FIRST Robotics, where, as a member of Team 971, he learned how to design PCBs, write industry-level code, and develop complex mechanical systems. Since then, he's carried those skills into personal projects, constantly expanding his knowledge in engineering and problem-solving. He knows C++, Java, and Python, and works with KiCAD, Onshape, and SolidWorks.  
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                To Henry, the world is a sandbox, every problem is an opportunity to build something, whether it's a small fix, like stamping his name 18 times on a test, or something massive, like launching rockets into space. He's always thinking about different ways to do things.
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                When he's not deep in an engineering project, he's skiing, hanging out with his fraternity brothers, or hiking in the Berkeley hills.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full max-w-sm aspect-square overflow-hidden rounded-xl">
                  <img
                    src={`${baseUrl}/pictures_henry/profile.png?height=500&width=500`}
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
                  <a href="mailto:henry@speiser.net">
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