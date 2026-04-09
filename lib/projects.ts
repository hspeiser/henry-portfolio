// Base URL for assets
const baseUrl = "https://pub-23ed2f7e90c646778e7f318e43b4e788.r2.dev/public"

export interface Project {
  title: string
  description: string
  longDescription?: string
  tags: string[]
  imageUrl: string
  slug: string
  featured?: boolean
  demoUrl?: string
  githubUrl?: string
  images: { url: string; description: string }[]
  videos?: { url: string; description: string }[]
  models?: { url: string; description: string }[]
  categories: string[] // This field already exists
}

// Update the categories for each project
export const projects: Project[] = [
  {
    title: "6-DOF Robot Arm",
    description:
      "Custom-built 6-degree-of-freedom robot arm with inverse kinematics, path planning, and camera-based control.",
    longDescription:
      "This is a current work-in-progress project. I'm experimenting with a lot of different ideas, but the first step was just building a robot to build on. I designed the arm in Onshape, then decided I wanted to write all of my own inverse kinematics from scratch instead of relying on black-box tooling.\n\nI've been using the Placo library and messing around with different path-planning approaches to find valid, non-self-intersecting motions, basically making sure the robot doesn't hurt itself or smash into its own body. I've tried a mix of PRM, RRT, linear interpolation, and joint-space planning, and I'm still comparing how each one behaves in practice.\n\nOn top of that, I'm exploring different control ideas using cameras, depth cameras, and wrist-mounted IMUs to make arm control more intuitive and to collect better data from human motion. All of this is very much a work in progress, and I'll keep updating this page as things evolve.\n\nI've been working on this for a bit now and I've learned a ton about robotic control. It's been a genuinely fun project, especially the part where you finally plug it in and it immediately tomahawks across the desk, smashes your computer, and breaks something. That part's definitely my favorite.\n\n P.S The videos are the coolest part!",
    tags: ["Python", "Onshape", "Placo", "OpenCV"],
    imageUrl: `${baseUrl}/robot_project/rerun_view_of_robot_arm_with_movement_plots.png`,
    slug: "robot-arm",
    featured: true,
    images: [
      {
        url: `${baseUrl}/robot_project/rerun_view_of_robot_arm_with_movement_plots.png`,
        description:
          "Real-time visualization in Rerun showing the robot arm's joint positions, movement trajectories, and control plots during live operation.",
      },
      {
        url: `${baseUrl}/robot_project/fully_assembled_arm_holdin_pen.png`,
        description:
          "Fully assembled 6-DOF robot arm holding a pen, demonstrating precision control and end-effector positioning accuracy.",
      },
      {
        url: `${baseUrl}/robot_project/cad_model_of_arm.png`,
        description:
          "Complete CAD model designed in Onshape showing all mechanical components, joint assemblies, and structural elements.",
      },
      {
        url: `${baseUrl}/robot_project/map_of_possible_positions.png`,
        description:
          "3D visualization mapping the complete workspace volume and all possible end-effector positions the robot can reach.",
      },
      {
        url: `${baseUrl}/robot_project/mediapipe_to_joint_position_live_tracking_demo.png`,
        description:
          "MediaPipe integration showing live hand tracking converted to joint positions for intuitive human-guided robot control.",
      },
      {
        url: `${baseUrl}/robot_project/almost_full_arm_assembly_without_roll_and_gripper.png`,
        description:
          "Near-complete mechanical assembly showing the robot structure without the final wrist roll joint and gripper attachment.",
      },
      {
        url: `${baseUrl}/robot_project/bottom_half_assembly.png`,
        description:
          "Detailed view of the bottom half assembly including the base, first joints, and primary structural components.",
      },
      {
        url: `${baseUrl}/robot_project/v1_pan_assembly.png`,
        description:
          "First version of the pan assembly showing the initial rotating base mechanism design and implementation.",
      },
      {
        url: `${baseUrl}/robot_project/bounding_box.png`,
        description:
          "Collision bounding box visualization used for self-intersection detection and safety during path planning operations.",
      },
    ],
    videos: [
      {
        url: `${baseUrl}/robot_project/arm_moving_with_movement_plots_to_goal.mp4`,
        description:
          "Video demonstration of the arm moving to a target position with real-time movement plots and trajectory tracking overlays.",
      },
      {
        url: `${baseUrl}/robot_project/fun_figure_8_demo.mp4`,
        description:
          "Fun demonstration showing the robot performing a smooth figure-8 motion pattern to validate path planning algorithms.",
      },
      {
        url: `${baseUrl}/robot_project/joint_space_path_planner.mp4`,
        description:
          "Joint-space path planner in action showing collision-free motion planning between different arm configurations.",
      },
      {
        url: `${baseUrl}/robot_project/camera_base_pose_estimation.mp4`,
        description:
          "Camera-based pose estimation system tracking the robot arm's base position for improved spatial awareness.",
      },
      {
        url: `${baseUrl}/robot_project/first_version_of_path_planner.mp4`,
        description:
          "Early version of the path planning system testing different movement strategies and collision avoidance techniques.",
      },
    ],
    categories: ["Robotics", "Mechanical", "3D Printing"],
  },
  {
    title: "Somo AI Smart Hospitality Platform",
    description:
      "Lead prototyping engineer for AI-driven smart hotel automation system. Built 12 custom PCBs validating distinct product lines, contributing to $20M+ funding.",
    longDescription:
      "At Somo AI, I was in charge of leading prototyping, which basically meant I got to build from napkin to product. That included taking ideas from rough sketches all the way through software, hardware, and enclosures, usually within one to two-week timeframes, to figure out what would actually work in our smart hotel system.\n\nThe goal was to create a true smart system that didn't rely on Wi-Fi or crowded 2.4 GHz and 5 GHz channels. Instead, we used an automotive CAN bus, so the system didn't need internet access or cell service, you could literally be in the middle of the ocean and it would still work. Everything talked to each other: lights, climate control, shades, sensors like presence detectors and door sensors, and more. It was a fully integrated, end-to-end system.\n\nOne of the coolest parts was that these weren't just experiments that sat on a shelf, they were used in investor demos. Often, the only products investors ever saw were these prototypes, neatly packaged in production quality enclosures. They helped Somo raise over $20 million in funding and generate $1.2 million in revenue.\n\nThere were countless tight deadlines where I had to prove whether an idea was viable, which forced me to get really good at building proof-of-concepts that worked on the first try, and when they didn't, I got equally good at cutting traces and patching boards to make them work fast.\n\nI worked with a ridiculous variety of technologies: real-time operating systems, multiple microcontroller platforms (ESP32, Raspberry Pi Pico, STM32), and every kind of sensor you can imagine, PIR, thermal, current sensing, millimeter-wave radar, IMUs, and more. I also worked with motor control systems, industrial protocols like RS-485 for DMX lighting over CAN bus, and RF communications ranging from sub-GHz to Bluetooth Low Energy.\n\nThe entire system was designed to retrofit into existing hotels without tearing anything apart, while still being smart enough to optimize both energy usage and guest experience.",
    tags: [
      "ESP32",
      "STM32",
      "Pi Pico",
      "RTOS",
      "CAN Bus",
      "RS-485",
      "BLE",
      "RF Communications",
      "Motor Control",
      "PCB Design",
      "IoT",
      "Sensors",
    ],
    imageUrl: `${baseUrl}/somo/basestation_graphic.jpeg`,
    slug: "somo-ai",
    featured: true,
    images: [
      // System Architecture & Technical Diagrams
      {
        url: `${baseUrl}/somo/basestation_graphic.jpeg`,
        description:
          "Technical diagram of the base station showing the system architecture and component integration for coordinating all smart room devices.",
      },
      {
        url: `${baseUrl}/somo/canbo_graphic.jpeg`,
        description:
          "CAN bus communication architecture diagram illustrating the robust networking protocol used throughout the smart hospitality system.",
      },

      // Base Station Development
      {
        url: `${baseUrl}/somo/breadboard_basestation_compressed.jpg`,
        description:
          "Early breadboard prototype of the base station used for initial circuit validation and firmware development.",
      },
      {
        url: `${baseUrl}/somo/base_station_top_view_compressed.jpg`,
        description:
          "Top view of the base station PCB featuring RF communication modules, microcontroller, and power management circuitry.",
      },
      {
        url: `${baseUrl}/somo/base_station_interior_compressed.jpg`,
        description:
          "Interior view of the base station showing the complex PCB layout and component arrangement for coordinating all room devices.",
      },
      {
        url: `${baseUrl}/somo/developer_base_station_travel_version_top_compressed.jpg`,
        description:
          "Top view of the travel-friendly developer base station with integrated debugging interfaces and status LEDs.",
      },
      {
        url: `${baseUrl}/somo/developer_base_station_travel_version_bottom_compressed.jpg`,
        description:
          "Bottom view of the portable developer base station designed for field testing and demonstrations.",
      },

      // Smart Switch Development
      {
        url: `${baseUrl}/somo/v1_of_our_low_voltage_smart_switch_compressed.jpg`,
        description:
          "First-generation low-voltage smart switch prototype, establishing the foundation for future iterations.",
      },
      {
        url: `${baseUrl}/somo/bringup_of_full_featureset_smart_switch_compressed.jpg`,
        description:
          "Testing setup during the bringup phase of the full-featured smart switch, validating all sensor inputs and communication protocols.",
      },
      {
        url: `${baseUrl}/somo/smart_switch_prod_version_5_top_compressed.jpg`,
        description:
          "Top side of production version 5 smart switch PCB with integrated sensors, communication modules, and power circuits.",
      },
      {
        url: `${baseUrl}/somo/smart_switch_prod_version_5_bottom_compressed.jpg`,
        description:
          "Bottom side of production version 5 smart switch PCB, showcasing optimized routing and component placement.",
      },
      {
        url: `${baseUrl}/somo/smart_switch_v7_compressed.jpg`,
        description:
          "Version 7 of the smart switch - the culmination of iterative design improvements for optimal performance and manufacturability.",
      },

      // Light Plates & User Interfaces
      {
        url: `${baseUrl}/somo/custom_capacitive_light_plate_generic_compressed.jpg`,
        description:
          "Generic version of the custom capacitive light plate with haptic feedback, featuring touch-sensitive controls and ambient lighting.",
      },
      {
        url: `${baseUrl}/somo/capacitive_light_plated_installed_in_wall_compressed.jpg`,
        description:
          "Custom capacitive light plate installed in wall, demonstrating the elegant retrofit design that replaces traditional switches.",
      },
      {
        url: `${baseUrl}/somo/nobu_custom_capactive_light_plate_compressed.jpg`,
        description:
          "Custom-branded capacitive light plate designed specifically for Nobu Hotels, featuring their aesthetic requirements.",
      },
      {
        url: `${baseUrl}/somo/custom_light_plate_manufacturing_compressed.jpg`,
        description:
          "Manufacturing setup for the custom light plates, showing the precision assembly process for capacitive sensors.",
      },
      {
        url: `${baseUrl}/somo/light_plate_printing_fixture_for_prod_compressed.jpg`,
        description:
          "Custom 3D-printed fixture for manufacturing light plates, ensuring consistent quality and alignment during production.",
      },

      // Control Interfaces
      {
        url: `${baseUrl}/somo/smart_haptic_feedback_knob_v1_vs_v2_compressed.jpg`,
        description:
          "Evolution of the haptic feedback knob from version 1 to version 2, with enhanced tactile response and durability.",
      },
      {
        url: `${baseUrl}/somo/smart_switch_base_station_and_smart_knob_compressed.jpg`,
        description:
          "Complete system showing the base station coordinating with a smart haptic knob for intuitive room control.",
      },

      // Sensors & Components
      {
        url: `${baseUrl}/somo/side_by_side_old_vs_new_pir_sensor_compressed.jpg`,
        description:
          "Comparison between older and newer PIR sensor designs, showing improvements in sensitivity and false-positive reduction.",
      },

      // Testing & Validation
      {
        url: `${baseUrl}/somo/initial_range_testing_of_CAN_bus_of_smart_switch_compressed.jpg`,
        description:
          "Range testing setup for the CAN bus communication system, validating signal integrity over extended cable lengths.",
      },

      // Demo & Integration
      {
        url: `${baseUrl}/somo/demo_rig_front_compressed.jpg`,
        description:
          "Front view of the investor demo rig that showcases the complete smart room automation system in action.",
      },
      {
        url: `${baseUrl}/somo/demo_rig_back_compressed.jpg`,
        description:
          "Back view of the demonstration rig showing wiring and connections between base station, switches, and sensors.",
      },

      // Manufacturing & Tools
      {
        url: `${baseUrl}/somo/usbc_universal_programmer_for_all_devices_compressed.jpg`,
        description:
          "Custom USB-C universal programmer I designed to streamline firmware updates across all Somo device types during manufacturing.",
      },
    ],
    videos: [
      {
        url: `${baseUrl}/somo/product_demo_compressed.mp4`,
        description:
          "Complete product demonstration showing the smart hospitality system controlling lights, climate, and shades through the mobile app and physical interfaces.",
      },
      {
        url: `${baseUrl}/somo/using_saw_to_generate_emi_on_can_bus_compressed.mp4`,
        description:
          "EMI stress testing of the CAN bus using a circular saw to generate extreme electromagnetic interference, validating the system's robustness in real-world electrical noise conditions.",
      },
    ],
    categories: ["Electronics", "Embedded Systems", "IoT", "PCB Design"],
  },
  {
    title: "Redundant CAN-Based Robot Controller",
    description:
      "High-speed STM32-based joystick and button controller with CAN FD, built for intense, high-stakes matches.",
    longDescription:
      "Controlling a robot is harder than people think. It needs to be fast, it needs to be accurate, it needs to be redundant and reliable. And in high-speed, high-intensity matches, having all of those things is really, really important.\n\nWhen our previous setup kept breaking and started losing us matches, I designed a custom STM32-based joystick and button controller that communicates over CAN FD. It has redundant USB connections that feed into two separate CAN channels for failover protection. Each board supports up to 20 buttons and 4 joysticks, with extremely fast data transfer and virtually zero latency.\n\nI also built a custom buck-boost power supply to dummy-proof the whole thing, protecting it from voltage issues and user errors. On top of that, the boards can talk to each other seamlessly, which gives us extra flexibility and redundancy in how the driver station is set up. It's still in development — software's in progress, hardware's being debugged — but it's already insanely responsive and ridiculously powerful.",
    tags: ["STM32", "CAN FD", "PCB Design", "Embedded Systems", "Robotics"],
    imageUrl: `${baseUrl}/button_board/button_board_pcb.png`,
    slug: "can-robot-controller",
    featured: true,
    images: [
      {
        url: `${baseUrl}/button_board/board_with_power_working_and_software_flashed.png`,
        description:
          "The fully assembled controller board with power connected and software successfully flashed, showing all status LEDs lit up and ready for operation.",
      },
      {
        url: `${baseUrl}/button_board/button_board_pcb.png`,
        description:
          "PCB layout design of the button controller board showing the careful routing of high-speed signals and power distribution.",
      },
      {
        url: `${baseUrl}/button_board/debugging_the_hardware_and_initial_testing.png`,
        description:
          "Hardware debugging session with logic analyzer and test equipment connected to verify signal integrity and timing.",
      },
      {
        url: `${baseUrl}/button_board/measuring_waveform_oscelliscope.png`,
        description:
          "Oscilloscope measurement of signal waveforms to ensure clean communication and proper voltage levels across the system.",
      },
      {
        url: `${baseUrl}/button_board/power_supply_5V_to_board_using_buck_boost.png`,
        description:
          "Custom buck-boost power supply providing stable 5V to the controller board, with protection against voltage fluctuations.",
      },
      {
        url: `${baseUrl}/button_board/view_of_power_supply.png`,
        description:
          "Another view of the power supply module showing the compact design and robust connectors for reliable operation.",
      },
      {
        url: `${baseUrl}/button_board/Power_supply_noise_linearly_regulated_to_5V_through_the_TI_chip.png`,
        description:
          "Measurement of power supply noise after linear regulation through the TI chip, showing extremely clean power delivery essential for reliable operation.",
      },
    ],
    categories: ["Electronics", "Embedded Systems", "Robotics"],
  },
  {
    title: "Custom Mach 1 Rocket",
    description: "Fully custom solid-state rocket with custom remote ignitors and parachute deployment system.",
    longDescription:
      "I built and launched a rocket equipped with a custom altimeter and a wireless launch system, successfully breaking the sound barrier. To power the rocket, I developed APCP rocket fuel from scratch, formulating unique mixtures tailored to our specific rocket specifications. I also designed and fabricated a custom converging-diverging nozzle and casing, optimizing them for reusability and ease of manufacturing. To validate performance, I constructed a test stand to measure thrust and compare results with simulations. It was awesome.",
    tags: ["KiCad", "Onshape", "OpenRocket", "Microcontrollers", "Rocket Propellant"],
    imageUrl: `${baseUrl}/rocket_photos/launch_good.png`,
    slug: "custom-rocket",
    featured: true,
    githubUrl: "https://github.com/hspeiser/rocket-development",
    demoUrl: "https://www.youtube.com/watch?v=p_gHWFGRnWY&ab_channel=HenrySpeiser",
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
    models: [
      { url: `${baseUrl}/3d_models/rocket.stl`, description: "Our custom rocket motor geometry." },
      { url: `${baseUrl}/3d_models/thrust_stand.stl`, description: "Logged thrust measurements from motor at 80Hz." },
    ],
    categories: ["Electronics", "Mechanical", "3D Printing", "Rockets", "Embedded Systems"],
  },
  {
    title: "SkyDrive (Rocket Thrower)",
    description:
      "Centripetal force rocket thrower with a 1m radius, capable of ~600 feet throwing distance. Large-scale project, biggest yet. Work in progress.",
    longDescription:
      "Rockets spend 50-60% of their fuel just getting up to speed. But what if we could throw them up to speed instead, allowing for bigger payloads with less fuel? Sounds too good to be true, right? Well, that's exactly what I'm going to test. With my small-scale version, I'll explore what kinds of payloads and electronics can withstand extreme acceleration. SpinLaunch, which I'm taking inspiration from, launches at around 10,000 Gs, so I'm going to figure out what kinds of electronics and components can survive those forces. Plus, I'll be launching a few things into the air to see how they hold up.",
    tags: ["WORK IN PROGRESS", "Motor Modeling", "Fluid Flow", "Large-scale design"],
    imageUrl: `${baseUrl}/sky_drive/rotor_view.png`,
    slug: "sky_drive",
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
    videos: [
      {
        url: `${baseUrl}/sky_drive/rotor_spinning.mp4`,
        description: "Footage of the rotor spinning during initial testing.",
      },
    ],
    categories: ["Mechanical", "Electronics", "3D Printing", "Rockets", "Embedded Systems"],
  },
  {
    title: "Atila Biosystems POC Device",
    description: "Reusable and affordable viral testing device with PCR-level efficacy.",
    longDescription: `I designed and developed printed circuit boards for biomedical point-of-care devices, working on a reusable virus testing device that was not only as accurate as PCR but also extremely fast. I created a heating element controller that precisely regulated temperatures to ensure the sample wasn't destroyed while also creating the perfect conditions for the multiplication of the cells. Within 30 minutes, the device could determine if you had a virus based on the capsule selected, testing for things like COVID, influenza, HPV, and more, all in a single dock using interchangeable cartridges. It was 90% cheaper than competitors, could be powered in multiple ways, and was designed for use anywhere on Earth. The device was presented to the Bill & Melinda Gates foundation and contributed to Atila's receiving of a $500k grant. It has been FDA approved and will undergo production very soon.`,
    tags: ["Altium", "C", "Teamwork"],
    imageUrl: `${baseUrl}/atila_photos/Rev1-Rev2.png`,
    slug: "atila-biosystems",
    demoUrl: "https://atilabiosystems.com/product/aipoct-dock/",
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
    categories: ["Electronics", "Embedded Systems"],
  },
  {
    title: "Universal Connector System",
    description: "Universal connectorized system to reduce unintentional unplugs of sensor and motor connectors.",
    longDescription:
      "In our robotics competitions, we frequently encountered issues where high-impact collisions caused connectors to sensors and motors to unplug, rendering the robot inoperable mid-match. To solve this, I designed a suite of 11 custom circuit boards that securely attach to sensors, motors, and our onboard computing system, dramatically reducing connector failures. I transitioned our system to Molex SL connectors, which feature latching mechanisms to prevent accidental disconnections. Additionally, I developed a custom wire tester to ensure all connections were reliable before matches, incorporating LED indicators on each board for quick debugging. This system significantly improved our robot's reliability, and our designs were so effective that we began selling these boards to other teams at competitions.",
    tags: ["KiCAD", "OnShape", "FEA"],
    imageUrl: `${baseUrl}/robot_electronics/robot.png`,
    slug: "robot-electronics",
    githubUrl: "https://github.com/frc971/electrical",
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
    categories: ["Electronics", "3D Printing"],
  },
  {
    title: "100MPH FPV Drone",
    description:
      "I built a ridiculously fast FPV drone from scratch to explore aerial cinematography and scratch that itch for speed.",
    longDescription:
      "I made a custom first-person view (FPV) drone with the goal of exploring aerial cinematography and learning how to tune the PID controller for the smoothest possible flight. Along the way, I ran into a bunch of problems, because of course I did. I quickly learned the beauty of Loctiting my bolts so they wouldn't shake loose mid-flight. I also realized how important it is to zip-tie everything with strain relief unless you enjoy your cables ripping out at the worst possible moment. Building the drone was fun, but learning to fly was an entirely different challenge. I spent about 20 hours in a flight simulator before even attempting to fly in real life, and honestly, it was worth it. I had a lot of fun messing around with the motor settings, trying out different propellers, and experimenting with battery efficiency. I got to figure out the balance between heavy and light batteries, flight time, speed, agility, and overall mobility.",
    tags: ["Robust Design", "Tuning", "Need For Speed"],
    imageUrl: `${baseUrl}/fpv_drone/ready_to_fly.png`,
    slug: "fpv_drone",
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
    videos: [
      {
        url: `${baseUrl}/fpv_drone/fpv_flying.mp4`,
        description: "Short clip showcasing the drone flying in FPV mode.",
      },
    ],
    categories: ["Electronics", "Mechanical", "Embedded Systems"],
  },
  {
    title: "Rocket-Powered RC Car",
    description:
      "A Fast & Furious-style RC car retrofitted with a rocket engine for a wild (and slightly dangerous) experiment.",
    longDescription:
      "One day, I was wandering through Target when I saw a Fast & Furious Vin Diesel style muscle car RC car, and an idea hit me, what if I strapped a rocket engine to it? I'd already built a rocket engine, so obviously, the next logical step was to design a mount for it, attach it to the car, and see what happened.\n\nBut I wasn't just going to slap it on and hope for the best. I actually tried to calculate where the thrust should go so the car would drive in a straight line instead of flipping into oblivion. I 3D printed a mount with the perfect angle to keep it stable, strapped the rocket on, and lit it off.\n\nHowever, the motor was way too powerful, and despite my 'carefully' engineered thrust angle, the car immediately jumped into the air and started spinning in these terrifying, high-speed death circles. For a solid moment, I was convinced I was about to die.",
    tags: ["3D Printing", "Rocket", "RC Car", "Great Ideas"],
    imageUrl: `${baseUrl}/rocket_car/side_view_rocket_car.png`,
    slug: "rocket_car",
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
    videos: [
      {
        url: `${baseUrl}/rocket_car/rocket_car_ignition.MP4`,
        description: "Footage of the rocket engine ignition and the car's chaotic first test run.",
      },
    ],
    models: [
      {
        url: `${baseUrl}/3d_models/rocket_car.stl`,
        description: "3D model of the rocket-powered RC car with custom motor mount.",
      },
    ],
    categories: ["Mechanical", "3D Printing"],
  },
  {
    title: "Handcrafted Outdoor Wooden Bench",
    description: "Designed and built a custom outdoor bench with a focus on durability and aesthetics.",
    longDescription:
      "I built a sturdy outdoor bench so I could hang out on my favorite mountain with my friends and spend time with the horses that roam around the preserve. I used high-quality wood and durable fasteners, going with a slatted design for breathability and weather resistance. Along the way, I learned the hard way that 2x4s aren't actually 2 inches by 4 inches (which was a fun surprise when things didn't line up). I reinforced the joints to make sure it would last, then sanded and finished it with a protective varnish. This project was all about getting my hands dirty, building something solid, and making a spot to just sit back and enjoy the view.",
    tags: ["Woodworking", "CAD", "Structural Design"],
    imageUrl: `${baseUrl}/wooden_bench/hanging_bench.png`,
    slug: "wooden_bench",
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
    models: [{ url: `${baseUrl}/3d_models/bench.stl`, description: "Bench design file." }],
    categories: ["Woodworking"],
  },
  {
    title: "The Tramp Stamp (Rapid Test Name Stamper)",
    description: "A custom multi-stamp holder designed to quickly fill out name and student ID fields on tests.",
    longDescription:
      "For my exams, I was required to write my full name and student ID on every test page, sometimes up to 18 pages per test, with no additional time provided. To solve this, I designed a custom stamp holder that aligned three individual stamps perfectly. With this tool, I could stamp my name and ID across all test pages in about 15 seconds, saving valuable time during exams. After the first exam I used it, everyone wanted one. Unfortunately (Fortunately), after the course instructors saw me using it they fixed the exam because they understood how silly it was.",
    tags: ["3D Printing", "Futuristic Technology"],
    imageUrl: `${baseUrl}/tramp_stamp/second_side_view.png`,
    slug: "tramp_stamp",
    images: [
      { url: `${baseUrl}/tramp_stamp/side_view.png`, description: "Side view of the TRAMP Stamp setup." },
      {
        url: `${baseUrl}/tramp_stamp/stamp_examples.png`,
        description: "Examples of stamped test pages using the device.",
      },
      { url: `${baseUrl}/tramp_stamp/top_view.png`, description: "Top view of the TRAMP Stamp in action." },
      {
        url: `${baseUrl}/tramp_stamp/second_side_view.png`,
        description: "Alternative side view of the TRAMP Stamp.",
      },
    ],
    models: [{ url: `${baseUrl}/3d_models/tramp.stl`, description: "Stamp holder 3d print." }],
    categories: ["3D Printing"],
  },
  {
    title: "Personal Portfolio Website",
    description: "A fully custom-built portfolio showcasing my engineering projects.",
    longDescription:
      "I built a fully custom portfolio to showcase my engineering projects. I used Next.js and React, and I had to figure out how to structure a clean, fast loading site while making sure it could handle a ton of images and assets efficiently—because I had a lot, and that's a lot of data to host. To solve that, I wrote some scripts that compress images and videos while keeping them sharp, so everything loads quickly without sacrificing quality. For storage, I set up Cloudflare R2, so images load fast no matter where you are, and I host the whole site on Vercel, which makes deployment automatic every time I push to GitHub. I had never done anything like this before, so everything, from getting the styles right with Tailwind CSS to setting up dynamic project pages, was a learning experience. It was really fun seeing it all come together and getting to build something completely from scratch.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    imageUrl: `${baseUrl}/portfolio_website/homepage.png`,
    slug: "portfolio_website",
    demoUrl: "https://henryspeiser.com",
    githubUrl: "https://github.com/hspeiser/henry-portfolio",
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
    categories: ["Web Development"],
  },
]
