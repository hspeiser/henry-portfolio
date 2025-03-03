"use client"

import Link from "next/link"
import { ArrowLeft, Github, Globe } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import CodeSnippet from "@/components/code-snippet"
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


const projects: Record<string, Project> = {
    "custom-rocket": {
      title: "Custom Mach 1 Rocket",
      description: "Fully custom solid-state rocket with remote ignitors and parachute deployment system.",
      longDescription:
        "I built and launched a rocket equipped with a custom altimeter and a wireless launch system, successfully breaking the sound barrier. To power the rocket, I developed APCP rocket fuel from scratch, formulating unique mixtures tailored to our specific rocket specifications. I also designed and fabricated a custom converging-diverging nozzle and casing, optimizing them for reusability and ease of manufacturing. To validate performance, I constructed a test stand to measure thrust and compare results with simulations. It was awesome.",
      tags: ["KiCad", "Onshape", "OpenRocket", "Microcontrollers", "Rocket Propellant"],
      // Full image array
      images: [
        { url: "/rocket_photos/overview_rocket.JPG", description: "The evolution of our rocket motors and nozzles." },
        { url: "/rocket_photos/completed_rocket.png", description: "The fully assembled rocket, ready for flight testing." },
        { url: "/rocket_photos/APCP_creation.png", description: "Mixing up the APCP propellant for maximum thrust output." },
        { url: "/rocket_photos/APCP_fuel_mold.png", description: "Filling and molding the solid rocket propellant grains." },
        { url: "/rocket_photos/APCP_vacuum.png", description: "Pulling a vacuum on the propellant to remove air bubbles." },
        { url: "/rocket_photos/completed_ignitor_pair.png", description: "A pair of homemade ignitors to trigger the propellant." },
        { url: "/rocket_photos/ignitor_testing.png", description: "Testing the ignitor’s reliability and ignition timing." },
        { url: "/rocket_photos/thrust_stand.png", description: "Custom-built thrust stand for measuring rocket motor performance." },
        { url: "/rocket_photos/motor_testing.PNG", description: "Rocket motor hot-fire test on the thrust stand." },
        { url: "/rocket_photos/thrust_stand_explosion.PNG", description: "That moment the test stand exploded—less than ideal, but a learning experience!" },
        { url: "/rocket_photos/automatic_parachute_deployment.png", description: "Electronics for automatic parachute deployment." },
        { url: "/rocket_photos/nozzle.png", description: "Custom-fabricated converging-diverging nozzle for supersonic exhaust flow." },
        { url: "/rocket_photos/rocket_launch.PNG", description: "Liftoff! Achieved Mach 1 during ascent." },
      ],
      // Full videos array
      videos: [
        { url: "/rocket_photos/rocket_launch.mp4", description: "Successful rocket launch." },
        { url: "/rocket_photos/test_fire.mp4", description: "First successful static fire w/ data collection." },
        { url: "/rocket_photos/loadcell_measurements_apcp.mp4", description: "Using the data collected from our test stand we graphed the thrust curve and compared it to the simulation." }
      ],
      codeSnippets: [
        {
          language: "python",
          title: "RPI Pico Ignitor Code",
          code: `from machine import Pin, SPI
  import struct
  from nrf24l01 import NRF24L01
  import utime
  
  led = Pin(25, Pin.OUT)                
  csn = Pin(17, mode=Pin.OUT, value=1)  
  ce  = Pin(5, mode=Pin.OUT, value=0)   
  button = Pin(15, Pin.IN, Pin.PULL_UP) 
  
  pipes = (b"\\xe1\\xf0\\xf0\\xf0\\xf0", b"\\xd2\\xf0\\xf0\\xf0\\xf0")
  
  def setup():
      print("Initializing NRF24L01")
      spi = SPI(0, baudrate=2000000, sck=Pin(18), mosi=Pin(19), miso=Pin(16))
      nrf = NRF24L01(spi, csn, ce, payload_size=4)
      
      nrf.open_tx_pipe(pipes[0])
      nrf.open_rx_pipe(1, pipes[1])
      nrf.start_listening()
  
      led.value(0)
      return nrf
  
  def master(nrf):
      while True:
          if button.value() == 0:
              led.value(1)
              print("tx 1")
              nrf.stop_listening()
              try:
                  nrf.send(struct.pack("i", 1))
                  print("Message sent")
                  utime.sleep(0.01)
              except OSError:
                  print('Message lost')
          else:
              led.value(0)
              utime.sleep(0.1)
  
  nrf = setup()
  master(nrf)`
        }
      ],
      // Full stlModels array
      stlModels: [
        { url: "/rocket_photos/rocket.stl", description: "Our custom rocket motor geometry." },
        { url: "/rocket_photos/thrust_stand.stl", description: "Logged thrust measurements from motor at 80Hz." }
      ],
      // Demo + repo
      liveUrl: "https://www.youtube.com/watch?v=p_gHWFGRnWY&ab_channel=HenrySpeiser",
      repoUrl: "https://github.com/hspeiser/rocket-development"
    },
    // ====== 2) ATILA BIOSYSTEMS ======
    "atila-biosystems": {
      title: "Atila Biosystems",
      description: "Designed and developed PCBs for biomedical point-of-care (POC) devices.",
      longDescription: `I designed and developed printed circuit boards for biomedical point-of-care devices, working on a reusable virus testing device that was not only as accurate as PCR but also extremely fast. I created a heating element controller that precisely regulated temperatures to ensure the sample wasn’t destroyed while also creating the perfect conditions for the multiplication of the cells. Within 30 minutes, the device could determine if you had a virus based on the capsule selected, testing for things like COVID, influenza, HPV, and more, all in a single dock using interchangeable cartridges. It was 90% cheaper than competitors, could be powered in multiple ways, and was designed for use anywhere on Earth. The device was presented to the Bill & Melinda Gates foundation and contributed to Atila's reciving of a $500k grant. It has been FDA approved and will undergo production very soon.`,
      tags: ["Altium", "KiCad", "C", "MicroPython", "SolidWorks", "Patience", "Teamwork"],
      images: [
        { url: "/atila_photos/breadboard_version_of_final_circuit.png", description: "Breadboard version of the final circuit." },
        { url: "/atila_photos/other_view_of_bread_board_circuit.png", description: "Another angle of the breadboard circuit." },
        { url: "/atila_photos/testing_breadboard_before_main_design.png", description: "Testing the breadboard before final design." },
        { url: "/atila_photos/first_rev_of_caritrage.png", description: "First revision of the cartridge design." },
        { url: "/atila_photos/hand_maufacturing_the_prototypes.png", description: "Hand-manufacturing the prototypes." },
        { url: "/atila_photos/resuable_capsule.png", description: "Reusable capsule injection mold." },
        { url: "/atila_photos/Rev1-Rev2.png", description: "Side-by-side: Revision 1 and Revision 2 PCBs." },
        { url: "/atila_photos/debugging_code.png", description: "Debugging code on the microcontroller." },
        { url: "/atila_photos/manufacturing_device.png", description: "First prototype of the heated wax pump to manufacture the cartridges." },
        { url: "/atila_photos/running_tests.png", description: "Running preliminary tests on the device." }
      ],
      videos: [
        { url: "/atila_photos/litmus.mp4", description: "Successful results from the device's cell amplification." }
      ],
      codeSnippets: [],
      stlModels: [],
      liveUrl: "https://atilabiosystems.com/product/aipoct-dock/",
      repoUrl: ""
    },
    "robot-electronics": {
      title: "Custom Electronics for High-Impact Robotics",
      description: "Designed and implemented a suite of custom electronics to improve reliability in high-impact robotics competitions.",
      longDescription: "In our robotics competitions, we frequently encountered issues where high-impact collisions caused connectors to sensors and motors to unplug, rendering the robot inoperable mid-match. To solve this, I designed a suite of 11 custom circuit boards that securely attach to sensors, motors, and our onboard computing system, dramatically reducing connector failures. I transitioned our system to Molex SL connectors, which feature latching mechanisms to prevent accidental disconnections. Additionally, I developed a custom wire tester to ensure all connections were reliable before matches, incorporating LED indicators on each board for quick debugging. This system significantly improved our robot's reliability, and our designs were so effective that we began selling these boards to other teams at competitions.",
      tags: ["KiCad", "Electronics Design", "Embedded Systems", "PCB Manufacturing", "Connector Engineering", "Robotics"],
      images: [
        { url: "/robot_electronics/robot.png", description: "Final competition robot, equipped with all custom electronics." },
        { url: "/robot_electronics/beam_break_adapter.png", description: "Beam break sensor circuit for object detection." },
        { url: "/robot_electronics/jetson_orin_assembly.png", description: "Jetson Orin NX computing module wired and assembled." },
        { url: "/robot_electronics/jetson_orin_adapter.png", description: "Adapter board for integrating the Jetson Orin NX with robot systems." },
        { url: "/robot_electronics/motor_can_adapter.png", description: "CAN motor controller adapter for improved signal integrity." },
        { url: "/robot_electronics/optical_encoder_adapter.png", description: "Optical encoder adapter for precision motor feedback." },
        { url: "/robot_electronics/power_adapter.png", description: "Custom power adapter for sensor and motor connections." },
        { url: "/robot_electronics/robot_wiring.png", description: "Complete robot wiring showcasing custom electronics integration." },
        { url: "/robot_electronics/pot_board.png", description: "Potentiometer breakout board for analog feedback." },
        { url: "/robot_electronics/mag_encoder.png", description: "Magnetic encoder board for precise motor control." },
        { url: "/robot_electronics/roborio_interface.png", description: "Main interface board for the RoboRIO control system." },
        { url: "/robot_electronics/wire_tester.png", description: "Custom wire tester for validating electrical connections." }
      ],
      stlModels: [],
      videos: [],
      codeSnippets: [],
      liveUrl: "",
      repoUrl: "https://github.com/frc971/electrical"
    },
      "wooden_bench": {
        title: "Handcrafted Outdoor Wooden Bench",
        description: "Designed and built a custom outdoor bench with a focus on durability and aesthetics.",
        longDescription: "I designed and built a handcrafted outdoor bench using high-quality wood and durable fasteners. The bench was constructed with a slatted design for breathability and weather resistance. During assembly, I carefully reinforced structural joints to ensure long-term durability. After construction, the bench was sanded and finished with a protective varnish to withstand outdoor conditions. This project emphasized both functional design and craftsmanship, resulting in a bench that is comfortable, aesthetically pleasing, and built to last.",
        tags: ["Woodworking", "CAD", "Structural Design", "Hand Tools", "Outdoor Furniture"],
        images: [
          { url: "/wooden_bench/top_cad_view.png", description: "Top-down CAD view of the bench design." },
          { url: "/wooden_bench/underside_cad_view.png", description: "Underside CAD rendering of the bench structure." },
          { url: "/wooden_bench/assembling_back.png", description: "Assembling the backrest of the bench." },
          { url: "/wooden_bench/assembling_base.png", description: "Constructing the base frame of the bench." },
          { url: "/wooden_bench/behind_bench.png", description: "A scenic view behind the completed bench." },
          { url: "/wooden_bench/completed_without_varnish.png", description: "The completed bench before applying varnish." },
          { url: "/wooden_bench/drying_bench.png", description: "The bench drying after applying varnish for protection." },
          { url: "/wooden_bench/front_sitting_bench.png", description: "A front view of people sitting on the bench." },
          { url: "/wooden_bench/hanging_bench.png", description: "The bench placed in its final outdoor setting." }
        ],
        stlModels: [
          { url: "/wooden_bench/bench.stl", description: "Bench design file" }
        ],
        videos: [],
        codeSnippets: [],
        liveUrl: "",
        repoUrl: ""
    },
      "tramp_stamp": {
        title: "The Tranp Stamp (Rapid Test Name Stamper)",
        description: "A custom multi-stamp holder designed to quickly fill out name and student ID fields on tests.",
        longDescription: "For my exams, I was required to write my full name and student ID on every test page, sometimes up to 18 pages per test, with no additional time provided. To solve this, I designed a custom stamp holder that aligned three individual stamps perfectly. With this tool, I could stamp my name and ID across all test pages in about 15 seconds, saving valuable time during exams. After the first exam I used it, everyone wanted one. Unfortunately (Fortunately), after the course instructors saw me using it they fixed the exam because they understood how silly it was.",
        tags: ["3D Printing", "Futuristic Technology"],
        images: [
          { url: "/tramp_stamp/side_view.png", description: "Side view of the Tranp Stamp setup." },
          { url: "/tramp_stamp/stamp_examples.png", description: "Examples of stamped test pages using the device." },
          { url: "/tramp_stamp/top_view.png", description: "Top view of the Tranp Stamp in action." },
          { url: "/tramp_stamp/second_side_view.png", description: "Alternative side view of the Tranp Stamp." }
        ],
        stlModels: [],
        videos: [],
        codeSnippets: [],
        liveUrl: "",
        repoUrl: ""
    }
  
  
  
}




export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects[params.slug]

  if (!project) {
    return (
      <div className="container px-4 py-12 md:px-6 flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-2xl font-bold mb-4">Project not found</h1>
        <p className="mb-6">The project you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/#projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </Button>
      </div>
    )
  }

  const triggerCount =
  1 +
  (projects[params.slug]?.videos?.length > 0 ? 1 : 0) +
  (projects[params.slug]?.codeSnippets?.length > 0 ? 1 : 0) +
  (projects[params.slug]?.stlModels?.length > 0 ? 1 : 0);

  

  return (
    <div className="container px-4 py-12 md:px-6">
      {/* Back Button */}
      <Link
        href="/#projects"
        className="inline-flex items-center text-sm font-medium text-primary hover:underline mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Projects
      </Link>

      {/* TOP SECTION: Title, Tags, Long Description, Demo/Repo Buttons, Featured Image */}
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-start">
        {/* Left Column */}
        <div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            {project.title}
          </h1>
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          {/* Long Description */}
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {project.longDescription}
          </p>
          {/* Demo / Repo Links */}
          <div className="flex flex-wrap gap-4 mb-8">
            {project.liveUrl && (
              <Button className="flex items-center gap-2" asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <Globe className="h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            )}
            {project.repoUrl && (
              <Button variant="outline" className="flex items-center gap-2" asChild>
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  View Code
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Right Column - Featured Image */}
        <div className="rounded-lg overflow-hidden">
          <img
            src={project.images[0]?.url || "/placeholder.svg"}
            alt={project.title}
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

        <Tabs defaultValue="gallery" className="mt-12">
        <TabsList className="flex w-full justify-start gap-4 mb-8">
          {/* Gallery tab always visible */}
          <TabsTrigger value="gallery">Image Gallery</TabsTrigger>

          {/* Conditionally render "Video Demo" tab if videos exist */}
          {project?.videos?.length > 0 && (
            <TabsTrigger value="video">Video Demo</TabsTrigger>
          )}

          {/* Conditionally render "Code Snippets" tab if code snippets exist */}
          {project?.codeSnippets?.length > 0 && (
            <TabsTrigger value="code">Code Snippets</TabsTrigger>
          )}

          {/* Conditionally render "3D Models" tab if stlModels exist */}
          {project?.stlModels?.length > 0 && (
            <TabsTrigger value="model">3D Models</TabsTrigger>
          )}
      </TabsList>


        {/* Always show gallery tab content */}
        <TabsContent value="gallery">
          <ImageGallery images={project.images} alt={project.title} />
        </TabsContent>

        {/* Videos tab content, only if they exist */}
        {project.videos.length > 0 && (
          <TabsContent value="video">
            {project.videos.map((video, idx) => (
              <div key={idx} className="mb-8">
                <VideoPlayer videoUrl={video.url} title={project.title} />
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {video.description}
                </p>
              </div>
            ))}
          </TabsContent>
        )}

        {/* Code tab content */}
        {project.codeSnippets.length > 0 && (
          <TabsContent value="code">
            {project.codeSnippets.map((snippet, idx) => (
              <div key={idx} className="mb-8">
                <CodeSnippet
                  language={snippet.language}
                  title={snippet.title}
                  code={snippet.code}
                />
              </div>
            ))}
          </TabsContent>
        )}

        {/* 3D models tab content */}
        {project.stlModels.length > 0 && (
          <TabsContent value="model">
            {project.stlModels.map((model, idx) => (
              <div key={idx} className="mb-8">
                <STLModelViewer modelUrl={model.url} backgroundColor="#f5f5f5" />
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {model.description}
                </p>
              </div>
            ))}
          </TabsContent>
        )}

      </Tabs>

    </div>
  )
}
