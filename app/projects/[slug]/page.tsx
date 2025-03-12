"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Github, Globe, FileText, Video, CuboidIcon as Cube } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import AndurilHeader from "@/components/anduril-header"

import VideoPlayer from "@/components/video-player"
import ImageGallery from "@/components/image-gallery"
import STLModelViewer from "@/components/stl-model-viewer"

interface Project {
  title: string
  description: string
  longDescription: string
  tags: string[]
  images: { url: string; description: string }[]
  videos: { url: string; description: string }[]
  codeSnippets: {
    language: string
    title: string
    code: string
  }[]
  stlModels: { url: string; description: string }[]
  liveUrl: string
  repoUrl: string
}

const handleLiveDemoClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, projectSlug: string) => {
  if (
    projectSlug === "portfolio_website" &&
    (window.location.hostname === "henryspeiser.com" || window.location.hostname.includes("localhost"))
  ) {
    event.preventDefault() // Stop the link from opening
    alert("You're already on the website!")
  }
}

// Base URL for all assets
const baseUrl = "https://pub-23ed2f7e90c646778e7f318e43b4e788.r2.dev/public"

const projects: Record<string, Project> = {
  "custom-rocket": {
    title: "Custom Mach 1 Rocket",
    description: "Fully custom solid-state rocket with remote ignitors and parachute deployment system.",
    longDescription:
      "I built and launched a rocket equipped with a custom altimeter and a wireless launch system, successfully breaking the sound barrier. To power the rocket, I developed APCP rocket fuel from scratch, formulating unique mixtures tailored to our specific rocket specifications. I also designed and fabricated a custom converging-diverging nozzle and casing, optimizing them for reusability and ease of manufacturing. To validate performance, I constructed a test stand to measure thrust and compare results with simulations. It was awesome.",
    tags: ["KiCad", "Onshape", "OpenRocket", "Microcontrollers", "Rocket Propellant"],
    images: [
      { url: `${baseUrl}/rocket_photos/launch_good.png`, description: "Liftoff! Achieved Mach 1 during ascent." },
      {
        url: `${baseUrl}/rocket_photos/overview_rocket.JPG`,
        description: "The evolution of our rocket motors and nozzles.",
      },
      {
        url: `${baseUrl}/rocket_photos/completed_rocket.png`,
        description: "The fully assembled rocket, ready for flight testing.",
      },
      {
        url: `${baseUrl}/rocket_photos/APCP_creation.png`,
        description: "Mixing up the APCP propellant for maximum thrust output.",
      },
      {
        url: `${baseUrl}/rocket_photos/APCP_fuel_mold.png`,
        description: "Filling and molding the solid rocket propellant grains.",
      },
      {
        url: `${baseUrl}/rocket_photos/APCP_vacuum.png`,
        description: "Pulling a vacuum on the propellant to remove air bubbles.",
      },
      {
        url: `${baseUrl}/rocket_photos/completed_ignitor_pair.png`,
        description: "A pair of homemade ignitors to trigger the propellant.",
      },
      {
        url: `${baseUrl}/rocket_photos/ignitor_testing.png`,
        description: "Testing the ignitor's reliability and ignition timing.",
      },
      {
        url: `${baseUrl}/rocket_photos/thrust_stand.png`,
        description: "Custom-built thrust stand for measuring rocket motor performance.",
      },
      {
        url: `${baseUrl}/rocket_photos/motor_testing.PNG`,
        description: "Rocket motor hot-fire test on the thrust stand.",
      },
      {
        url: `${baseUrl}/rocket_photos/thrust_stand_explosion.PNG`,
        description:
          "I was lucky I didnt get blasted in the face when I took this photo, instead it flew into the neighbors yard and started a fire.",
      },
      {
        url: `${baseUrl}/rocket_photos/automatic_parachute_deployment.png`,
        description: "Electronics for automatic parachute deployment.",
      },
      {
        url: `${baseUrl}/rocket_photos/nozzle.png`,
        description: "Custom-fabricated converging-diverging nozzle for supersonic exhaust flow.",
      },
    ],
    videos: [
      { url: `${baseUrl}/rocket_photos/rocket_launch.mp4`, description: "Successful rocket launch." },
      {
        url: `${baseUrl}/rocket_photos/test_fire.mp4`,
        description: "First successful static fire w/ data collection.",
      },
      {
        url: `${baseUrl}/rocket_photos/loadcell_measurements_apcp.mp4`,
        description:
          "Using the data collected from our test stand we graphed the thrust curve and compared it to the simulation.",
      },
    ],
    codeSnippets: [],
    stlModels: [
      { url: `/3d_models/rocket.stl`, description: "Our custom rocket motor geometry." },
      { url: `/3d_models/thrust_stand.stl`, description: "Logged thrust measurements from motor at 80Hz." },
    ],
    liveUrl: "https://www.youtube.com/watch?v=p_gHWFGRnWY&ab_channel=HenrySpeiser",
    repoUrl: "https://github.com/hspeiser/rocket-development",
  },
  "atila-biosystems": {
    title: "Atila Biosystems",
    description: "Designed and developed PCBs for biomedical point-of-care (POC) devices.",
    longDescription: `I designed and developed printed circuit boards for biomedical point-of-care devices, working on a reusable virus testing device that was not only as accurate as PCR but also extremely fast. I created a heating element controller that precisely regulated temperatures to ensure the sample wasn't destroyed while also creating the perfect conditions for the multiplication of the cells. Within 30 minutes, the device could determine if you had a virus based on the capsule selected, testing for things like COVID, influenza, HPV, and more, all in a single dock using interchangeable cartridges. It was 90% cheaper than competitors, could be powered in multiple ways, and was designed for use anywhere on Earth. The device was presented to the Bill & Melinda Gates foundation and contributed to Atila's rec  The device was presented to the Bill & Melinda Gates foundation and contributed to Atila's receiving of a $500k grant. It has been FDA approved and will undergo production very soon.`,
    tags: ["Altium", "KiCad", "C", "MicroPython", "SolidWorks", "Patience", "Teamwork"],
    images: [
      {
        url: `${baseUrl}/atila_photos/breadboard_version_of_final_circuit.png`,
        description: "Breadboard version of the final circuit.",
      },
      {
        url: `${baseUrl}/atila_photos/other_view_of_bread_board_circuit.png`,
        description: "Another angle of the breadboard circuit.",
      },
      {
        url: `${baseUrl}/atila_photos/testing_breadboard_before_main_design.png`,
        description: "Testing the breadboard before final design.",
      },
      {
        url: `${baseUrl}/atila_photos/first_rev_of_caritrage.png`,
        description: "First revision of the cartridge design.",
      },
      {
        url: `${baseUrl}/atila_photos/hand_maufacturing_the_prototypes.png`,
        description: "Hand-manufacturing the prototypes.",
      },
      { url: `${baseUrl}/atila_photos/resuable_capsule.png`, description: "Reusable capsule injection mold." },
      { url: `${baseUrl}/atila_photos/Rev1-Rev2.png`, description: "Side-by-side: Revision 1 and Revision 2 PCBs." },
      { url: `${baseUrl}/atila_photos/debugging_code.png`, description: "Debugging code on the microcontroller." },
      {
        url: `${baseUrl}/atila_photos/manufacturing_device.png`,
        description: "First prototype of the heated wax pump to manufacture the cartridges.",
      },
      { url: `${baseUrl}/atila_photos/running_tests.png`, description: "Running preliminary tests on the device." },
    ],
    videos: [
      {
        url: `${baseUrl}/atila_photos/litmus.mp4`,
        description: "Successful results from the device's cell amplification.",
      },
    ],
    codeSnippets: [],
    stlModels: [],
    liveUrl: "https://atilabiosystems.com/product/aipoct-dock/",
    repoUrl: "",
  },
  "robot-electronics": {
    title: "Custom Electronics for High-Impact Robotics",
    description:
      "Designed and implemented a suite of custom electronics to improve reliability in high-impact robotics competitions.",
    longDescription:
      "In our robotics competitions, we frequently encountered issues where high-impact collisions caused connectors to sensors and motors to unplug, rendering the robot inoperable mid-match. To solve this, I designed a suite of 11 custom circuit boards that securely attach to sensors, motors, and our onboard computing system, dramatically reducing connector failures. I transitioned our system to Molex SL connectors, which feature latching mechanisms to prevent accidental disconnections. Additionally, I developed a custom wire tester to ensure all connections were reliable before matches, incorporating LED indicators on each board for quick debugging. This system significantly improved our robot's reliability, and our designs were so effective that we began selling these boards to other teams at competitions.",
    tags: ["KiCad", "Electronics Design", "Embedded Systems", "PCB Manufacturing", "Connector Engineering", "Robotics"],
    images: [
      {
        url: `${baseUrl}/robot_electronics/robot.png`,
        description: "Final competition robot, equipped with all custom electronics.",
      },
      {
        url: `${baseUrl}/robot_electronics/beam_break_adapter.png`,
        description: "Beam break sensor circuit for object detection.",
      },
      {
        url: `${baseUrl}/robot_electronics/jetson_orin_assembly.png`,
        description: "Jetson Orin NX computing module wired and assembled.",
      },
      {
        url: `${baseUrl}/robot_electronics/jetson_orin_adapter.png`,
        description: "Adapter board for integrating the Jetson Orin NX with robot systems.",
      },
      {
        url: `${baseUrl}/robot_electronics/motor_can_adapter.png`,
        description: "CAN motor controller adapter for improved signal integrity.",
      },
      {
        url: `${baseUrl}/robot_electronics/optical_encoder_adapter.png`,
        description: "Optical encoder adapter for precision motor feedback.",
      },
      {
        url: `${baseUrl}/robot_electronics/power_adapter.png`,
        description: "Custom power adapter for sensor and motor connections.",
      },
      {
        url: `${baseUrl}/robot_electronics/robot_wiring.png`,
        description: "Complete robot wiring showcasing custom electronics integration.",
      },
      {
        url: `${baseUrl}/robot_electronics/pot_board.png`,
        description: "Potentiometer breakout board for analog feedback.",
      },
      {
        url: `${baseUrl}/robot_electronics/mag_encoder.png`,
        description: "Magnetic encoder board for precise motor control.",
      },
      {
        url: `${baseUrl}/robot_electronics/roborio_interface.png`,
        description: "Main interface board for the RoboRIO control system.",
      },
      {
        url: `${baseUrl}/robot_electronics/wire_tester.png`,
        description: "Custom wire tester for validating electrical connections.",
      },
    ],
    stlModels: [],
    videos: [],
    codeSnippets: [],
    liveUrl: "",
    repoUrl: "https://github.com/frc971/electrical",
  },
  wooden_bench: {
    title: "Handcrafted Outdoor Wooden Bench",
    description: "Designed and built a custom outdoor bench with a focus on durability and aesthetics.",
    longDescription:
      "I built a sturdy outdoor bench so I could hang out on my favorite mountain with my friends and spend time with the horses that roam around the preserve. I used high-quality wood and durable fasteners, going with a slatted design for breathability and weather resistance. Along the way, I learned the hard way that 2x4s aren't actually 2 inches by 4 inches (which was a fun surprise when things didn't line up). I reinforced the joints to make sure it would last, then sanded and finished it with a protective varnish. This project was all about getting my hands dirty, building something solid, and making a spot to just sit back and enjoy the view.",
    tags: ["Woodworking", "CAD", "Structural Design", "Hand Tools", "Outdoor Furniture"],
    images: [
      { url: `${baseUrl}/wooden_bench/top_cad_view.png`, description: "Top-down CAD view of the bench design." },
      {
        url: `${baseUrl}/wooden_bench/underside_cad_view.png`,
        description: "Underside CAD rendering of the bench structure.",
      },
      { url: `${baseUrl}/wooden_bench/assembling_back.png`, description: "Assembling the backrest of the bench." },
      { url: `${baseUrl}/wooden_bench/assembling_base.png`, description: "Constructing the base frame of the bench." },
      { url: `${baseUrl}/wooden_bench/behind_bench.png`, description: "A scenic view behind the completed bench." },
      {
        url: `${baseUrl}/wooden_bench/completed_without_varnish.png`,
        description: "The completed bench before applying varnish.",
      },
      {
        url: `${baseUrl}/wooden_bench/drying_bench.png`,
        description: "The bench drying after applying varnish for protection.",
      },
      {
        url: `${baseUrl}/wooden_bench/front_sitting_bench.png`,
        description: "A front view of people sitting on the bench.",
      },
      {
        url: `${baseUrl}/wooden_bench/hanging_bench.png`,
        description: "The bench placed in its final outdoor setting.",
      },
    ],
    stlModels: [{ url: `/3d_models/bench.stl`, description: "Bench design file." }],
    videos: [],
    codeSnippets: [],
    liveUrl: "",
    repoUrl: "",
  },
  tramp_stamp: {
    title: "The Tramp Stamp (Rapid Test Name Stamper)",
    description: "A custom multi-stamp holder designed to quickly fill out name and student ID fields on tests.",
    longDescription:
      "For my exams, I was required to write my full name and student ID on every test page, sometimes up to 18 pages per test, with no additional time provided. To solve this, I designed a custom stamp holder that aligned three individual stamps perfectly. With this tool, I could stamp my name and ID across all test pages in about 15 seconds, saving valuable time during exams. After the first exam I used it, everyone wanted one. Unfortunately (Fortunately), after the course instructors saw me using it they fixed the exam because they understood how silly it was.",
    tags: ["3D Printing", "Futuristic Technology"],
    images: [
      { url: `${baseUrl}/tramp_stamp/side_view.png`, description: "Side view of the TRAMP Stamp setup." },
      {
        url: `${baseUrl}/tramp_stamp/stamp_examples.png`,
        description: "Examples of stamped test pages using the device.",
      },
      { url: `${baseUrl}/tramp_stamp/top_view.png`, description: "Top view of the TRAMP Stamp in action." },
      { url: `${baseUrl}/tramp_stamp/second_side_view.png`, description: "Alternative side view of the TRAMP Stamp." },
    ],
    stlModels: [{ url: `/3d_models/tramp.stl`, description: "Stamp holder 3d print." }],
    videos: [],
    codeSnippets: [],
    liveUrl: "",
    repoUrl: "",
  },
  fpv_drone: {
    title: "Custom FPV Drone",
    description: "A custom first-person view drone designed for aerial cinematography and PID tuning practice.",
    longDescription:
      "I made a custom first-person view (FPV) drone with the goal of exploring aerial cinematography and learning how to tune the PID controller for the smoothest possible flight. Along the way, I ran into a bunch of problems, because of course I did. I quickly learned the beauty of Loctiting my bolts so they wouldn't shake loose mid-flight. I also realized how important it is to zip-tie everything with strain relief unless you enjoy your cables ripping out at the worst possible moment. Building the drone was fun, but learning to fly was an entirely different challenge. I spent about 20 hours in a flight simulator before even attempting to fly in real life, and honestly, it was worth it. I had a lot of fun messing around with the motor settings, trying out different propellers, and experimenting with battery efficiency. I got to figure out the balance between heavy and light batteries, flight time, speed, agility, and overall mobility.",
    tags: ["3D Printing", "Drone", "RC", "Aerial Cinematography"],
    images: [
      {
        url: `${baseUrl}/fpv_drone/almost_complete_build.png`,
        description: "Drone in an almost-complete state, electronics partially installed.",
      },
      {
        url: `${baseUrl}/fpv_drone/ready_to_fly.png`,
        description: "Fully assembled FPV drone ready for its maiden flight.",
      },
      {
        url: `${baseUrl}/fpv_drone/soldering_controller.png`,
        description: "Soldering the flight controller connections for the drone.",
      },
      {
        url: `${baseUrl}/fpv_drone/soldering_motors_to_frame.png`,
        description: "Securing and soldering motor wires directly to the drone frame.",
      },
    ],
    stlModels: [],
    videos: [
      {
        url: `${baseUrl}/fpv_drone/fpv_flying.mp4`,
        description: "Short clip showcasing the drone flying in FPV mode.",
      },
    ],
    codeSnippets: [],
    liveUrl: "",
    repoUrl: "",
  },
  rocket_car: {
    title: "Rocket-Powered RC Car",
    description:
      "A Fast & Furious-style RC car retrofitted with a rocket engine for a wild (and slightly dangerous) experiment.",
    longDescription:
      "One day, I was wandering through Target when I saw a Fast & Furious Vin Diesel style muscle car RC car, and an idea hit me, what if I strapped a rocket engine to it? I'd already built a rocket engine, so obviously, the next logical step was to design a mount for it, attach it to the car, and see what happened.\n\nBut I wasn't just going to slap it on and hope for the best. I actually tried to calculate where the thrust should go so the car would drive in a straight line instead of flipping into oblivion. I 3D printed a mount with the perfect angle to keep it stable, strapped the rocket on, and lit it off.\n\nHowever, the motor was way too powerful, and despite my 'carefully' engineered thrust angle, the car immediately jumped into the air and started spinning in these terrifying, high-speed death circles. For a solid moment, I was convinced I was about to die.",
    tags: ["3D Printing", "Rocket", "RC Car", "Great Ideas"],
    images: [
      {
        url: `${baseUrl}/rocket_car/side_view_rocket_car.png`,
        description: "Side view showing the 3D-printed rocket mount on the RC car.",
      },
      {
        url: `${baseUrl}/rocket_car/ready_to_launch_car.png`,
        description: "Weighing the rocket car on a scale to measure its total mass before launch.",
      },
      {
        url: `${baseUrl}/rocket_car/rocket_car_on_scale.png`,
        description: "Showing the rocket and the motor for a side-by-side comparison",
      },
    ],
    stlModels: [],
    videos: [
      {
        url: `${baseUrl}/rocket_car/rocket_car_ignition.MP4`,
        description: "Footage of the rocket engine ignition and the car's chaotic first test run.",
      },
    ],
    codeSnippets: [],
    liveUrl: "",
    repoUrl: "",
  },
  sky_drive: {
    title: "Rocket Thrower",
    description:
      "Centripetal force rocket thrower with a 1m radius, capable of ~600 feet throwing distance. Large-scale project, biggest yet. Work in progress.",
    longDescription:
      "Rockets spend 50-60% of their fuel just getting up to speed. But what if we could throw them up to speed instead, allowing for bigger payloads with less fuel? Sounds too good to be true, right? Well, that's exactly what I'm going to test. With my small-scale version, I'll explore what kinds of payloads and electronics can withstand extreme acceleration. SpinLaunch, which I'm taking inspiration from, launches at around 10,000 Gs, so I'm going to figure out what kinds of electronics and components can survive those forces. Plus, I'll be launching a few things into the air to see how they hold up.",
    tags: ["WORK IN PROGRESS", "Motor Modeling", "Fluid Flow", "Large-scale design"],
    images: [
      {
        url: `${baseUrl}/sky_drive/rotor_view.png`,
        description: "CAD view of the rotor with the carbon fiber airfoil clamps.",
      },
      {
        url: `${baseUrl}/sky_drive/Isometric_full_view.png`,
        description: "Isometric view of the mostly completed SkyDrive assembly with the rocket release system.",
      },
    ],
    stlModels: [],
    videos: [
      {
        url: `${baseUrl}/sky_drive/rotor_spinning.mp4`,
        description: "Footage of the rotor spinning during initial testing.",
      },
    ],
    codeSnippets: [],
    liveUrl: "",
    repoUrl: "",
  },
  portfolio_website: {
    title: "Personal Portfolio Website",
    description: "A fully custom-built portfolio showcasing my engineering projects.",
    longDescription:
      "I built a fully custom portfolio to showcase my engineering projects. I used Next.js and React, and I had to figure out how to structure a clean, fast loading site while making sure it could handle a ton of images and assets efficiently—because I had a lot, and that's a lot of data to host. To solve that, I wrote some scripts that compress images and videos while keeping them sharp, so everything loads quickly without sacrificing quality. For storage, I set up Cloudflare R2, so images load fast no matter where you are, and I host the whole site on Vercel, which makes deployment automatic every time I push to GitHub. I had never done anything like this before, so everything, from getting the styles right with Tailwind CSS to setting up dynamic project pages, was a learning experience. It was really fun seeing it all come together and getting to build something completely from scratch.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Cloudflare R2", "Vercel"],
    images: [
      {
        url: `${baseUrl}/portfolio_website/homepage.png`,
        description: "Homepage of the portfolio site, showcasing an overview of projects.",
      },
      {
        url: `${baseUrl}/portfolio_website/project_page.png`,
        description: "Detailed project page layout with interactive features.",
      },
      {
        url: `${baseUrl}/portfolio_website/codebase.png`,
        description: "Screenshot of the organized codebase, showing the Next.js project structure.",
      },
      {
        url: `${baseUrl}/portfolio_website/3d_model.png`,
        description: "Fully interactive 3d model's from my projects, built into the site.",
      },
    ],
    videos: [],
    codeSnippets: [],
    stlModels: [],
    liveUrl: "https://henryspeiser.com",
    repoUrl: "https://github.com/hspeiser/henry-portfolio",
  },
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects[params.slug]
  const [isLoaded, setIsLoaded] = useState(false)

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Add page entrance animation
  useEffect(() => {
    // Short delay to ensure animation is visible
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

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

    document.querySelectorAll(".fade-in, .slide-in").forEach((section) => {
      observer.observe(section)
    })

    return () => {
      document.querySelectorAll(".fade-in, .slide-in").forEach((section) => {
        observer.unobserve(section)
      })
    }
  }, [])

  if (!project) {
    return (
      <div className="min-h-screen anduril-bg">
        <AndurilHeader />
        <div className="container px-4 py-24 md:px-6 flex flex-col items-center justify-center min-h-[50vh]">
          <div className="anduril-card p-8 max-w-md mx-auto text-center fade-in">
            <h1 className="text-2xl font-medium uppercase tracking-wider mb-4">Project Not Found</h1>
            <p className="mb-6 text-white">
              The project you're looking for is still being developed. Check back later!
            </p>
            <Button className="tactical-button" asChild>
              <Link href="/#projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen anduril-bg">
      <AndurilHeader />
      <div className="anduril-scan-line"></div>

      <div className="container px-4 py-24 md:px-6">
        {/* Back Button */}
        <Link
          href="/#projects"
          className="inline-flex items-center text-sm font-medium hover:text-white/80 transition-colors uppercase tracking-wider mb-6 slide-in"
          style={{ color: "#ffffff !important" }}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>

        {/* Project Header - Increased width from max-w-4xl to max-w-6xl (150% wider) */}
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 fade-in">
            <h1
              className="text-3xl md:text-4xl font-medium uppercase tracking-wider mb-4 relative"
              style={{ color: "#ffffff !important" }}
            >
              <span className="absolute -left-4 top-1/2 w-2 h-10 bg-white/30 -translate-y-1/2"></span>
              {project.title}
            </h1>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="rounded-md bg-muted border-white/30 uppercase tracking-wider"
                  style={{ color: "#ffffff !important" }}
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Featured Image - Now with reduced height */}
            <div className="rounded-lg overflow-hidden mb-8 anduril-glow">
              <div className="relative">
                <img
                  src={project.images[0]?.url || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-auto object-cover project-featured-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-60"></div>
              </div>
            </div>

            {/* Project Description */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-white" style={{ color: "#ffffff !important" }}>
                {project.longDescription}
              </p>
            </div>

            {/* Demo / Repo Links */}
            <div className="flex flex-wrap gap-4 mt-8">
              {project.liveUrl && (
                <Button className="tactical-button" asChild>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => handleLiveDemoClick(event, params.slug)}
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    Live Demo
                  </a>
                </Button>
              )}
              {project.repoUrl && (
                <Button variant="outline" className="tactical-button border-white/50 hover:border-white" asChild>
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    View Code
                  </a>
                </Button>
              )}
            </div>
          </div>

          <div className="section-divider" />

          <Tabs defaultValue="gallery" className="mt-12 fade-in">
            <TabsList className="w-full flex flex-wrap justify-start mb-8 bg-muted">
              {/* Gallery tab always visible */}
              <TabsTrigger
                value="gallery"
                className="flex items-center gap-2 uppercase tracking-wider min-w-[180px] data-[state=active]:bg-white/20 data-[state=active]:text-white"
                style={{ color: "#ffffff !important" }}
              >
                <FileText className="h-4 w-4" />
                Documentation
              </TabsTrigger>

              {/* Conditionally render "Video  />
                Documentation
              </TabsTrigger>

              {/* Conditionally render "Video Demo" tab if videos exist */}
              {project?.videos?.length > 0 && (
                <TabsTrigger
                  value="video"
                  className="flex items-center gap-2 uppercase tracking-wider min-w-[180px] data-[state=active]:bg-white/10 data-[state=active]:text-white"
                  style={{ color: "#ffffff !important" }}
                >
                  <Video className="h-4 w-4" />
                  Video Demo
                </TabsTrigger>
              )}

              {/* Conditionally render "3D Models" tab if stlModels exist */}
              {project?.stlModels?.length > 0 && (
                <TabsTrigger
                  value="model"
                  className="flex items-center gap-2 uppercase tracking-wider min-w-[180px] data-[state=active]:bg-white/10 data-[state=active]:text-white"
                  style={{ color: "#ffffff !important" }}
                >
                  <Cube className="h-4 w-4" />
                  3D Models
                </TabsTrigger>
              )}
            </TabsList>

            {/* Always show gallery tab content */}
            <TabsContent value="gallery">
              <div className="anduril-card p-8">
                <h3
                  className="text-xl font-medium uppercase tracking-wider mb-8 flex items-center gap-2"
                  style={{ color: "#ffffff !important" }}
                >
                  <FileText className="h-5 w-5" />
                  Project Documentation
                </h3>
                <ImageGallery images={project.images.slice(1)} alt={project.title} />
              </div>
            </TabsContent>

            {/* Videos tab content, only if they exist */}
            {project.videos.length > 0 && (
              <TabsContent value="video">
                <div className="bg-card border border-white/20 rounded-lg shadow-sm p-8">
                  <h3
                    className="text-xl font-medium uppercase tracking-wider mb-8 flex items-center gap-2"
                    style={{ color: "#ffffff !important" }}
                  >
                    <Video className="h-5 w-5" />
                    Video Demonstrations
                  </h3>

                  {project.videos.map((video, idx) => (
                    <div key={idx} className="mb-8">
                      <VideoPlayer videoUrl={video.url} title={project.title} />
                      <p className="mt-2 text-sm text-white" style={{ color: "#ffffff !important" }}>
                        {video.description}
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            )}

            {/* 3D models tab content */}
            {project.stlModels.length > 0 && (
              <TabsContent value="model">
                <div className="bg-card border border-white/20 rounded-lg shadow-sm p-8">
                  <h3
                    className="text-xl font-medium uppercase tracking-wider mb-8 flex items-center gap-2"
                    style={{ color: "#ffffff !important" }}
                  >
                    <Cube className="h-5 w-5" />
                    3D Models
                  </h3>

                  {project.stlModels.map((model, idx) => (
                    <div key={idx} className="mb-8">
                      <STLModelViewer modelUrl={model.url} backgroundColor="#0a0c14" />
                      <p className="mt-2 text-sm text-white" style={{ color: "#ffffff !important" }}>
                        {model.description}
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  )
}

