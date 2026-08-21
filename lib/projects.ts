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
  paperUrl?: string
  images: { url: string; description: string }[]
  videos?: { url: string; description: string }[]
  models?: { url: string; description: string }[]
  papers?: { url: string; title: string; description: string }[]
  categories: string[] // This field already exists
}

// Update the categories for each project
export const projects: Project[] = [
  {
    title: "Anduril AI Grand Prix (25th of 3,000+)",
    description:
      "Autonomous drone racing for Anduril and DCL's AI Grand Prix. Flew a 17-gate course using only a camera and IMU at 30 Hz, finishing 25th out of more than 3,000 entries with a 35.37 second lap.",
    longDescription:
      "This summer, one of my teammates and I competed in Anduril and DCL's AI Grand Prix, an autonomous drone racing competition. We ended up finishing 25th out of more than 3,000 entries with a final time of 35.37 seconds.\n\nThis was probably one of the most fun technical projects I have worked on. We came into it with basically no background in autonomous drone racing, very limited compute, and seven weeks to figure everything out.\n\nThere were two virtual qualifiers, VQ1 and VQ2. VQ1 gave us absolute position, which made the problem much easier. VQ2 removed that. Now the drone had to fly a 17 gate course using only a camera and IMU while running everything live at 30 Hz.\n\nThat changed basically the entire problem.\n\nThe first big question was localization. If the drone does not know where it is, having a good controller does not really matter. We needed to detect the gates, estimate their geometry accurately enough to recover pose, fuse that with the IMU, and keep the estimate stable while the drone was moving at race speed.\n\nI went through close to 30 versions of the vision stack.\n\nAt different points I was training YOLO models, custom corner detection networks, crop trackers, and different versions of the localization pipeline. One of the biggest improvements came from looking specifically at where our models sucked. I spent around six hours manually clicking gate corners on images where the detector was failing, especially blurry frames, close approaches, partial occlusions, and weird viewing angles. We then combined those high quality manual labels with much larger amounts of automatically generated simulator data.\n\nBy the end we had around 39,000 labeled frames. The final corner detector could localize gate corners to subpixel accuracy, and our localization became good enough that some of the other top teams were asking us how we were doing it.\n\nThen there was the control problem.\n\nThere were a million possible ways to approach it. We could train everything with PPO. We could build a simplified simulator and learn a residual policy there. We could imitate human flights. We could hand tune a controller. We could try to model the dynamics ourselves. We tried a lot of them.\n\nI pulled out my old FPV controller and personally flew the course hundreds of times. Some of that data was useful for training, but honestly a lot of the value was just learning what a fast line actually looked like. I could see where the drone needed to accelerate, where it needed to start rotating early, which gates were actually hard, and which problems were coming from perception instead of control.\n\nPure imitation learning did not end up being enough. The drone basically inherited how cautious the human pilot was. Pure end to end RL also had transfer problems.\n\nWhat eventually worked was a hybrid system. We had a reference controller that could already finish the course, optimized the racing line offline, and then trained PPO residual policies to make smaller corrections in the sections where learned control actually helped.\n\nOne of the biggest constraints through all of this was compute.\n\nA real simulator flight took around 40 seconds. That is completely terrible if you want to do millions of RL steps. We also did not have a lab full of GPUs. Most of the competition I was working with one shared RTX 5090 and my laptop 5070.\n\nSo I trained a dynamics world model from our flight data.\n\nInstead of making the model predict the entire simulator from scratch, we modeled the physics we understood and trained a small neural network ensemble to predict the remaining error. Eventually we could run around 300,000 simulated steps per second on one GPU. That made it possible to test huge numbers of controller changes and PPO policies offline before wasting another real simulator flight.\n\nThe world model was definitely not perfect. Over longer horizons the prediction error got large enough that an optimizer could find ways to exploit it. We learned pretty quickly that it was useful for short horizon search and ranking candidates, not as a replacement for the actual simulator.\n\nCompute management itself became part of the competition. I basically tried to keep every GPU I could get access to at 100 percent utilization. At one point I had six laptops connected and doing different jobs. One would be training a vision model, another running post-training on YOLO, another fitting dynamics, another processing flight logs. If a friend had a GPU sitting around, I wanted it.\n\nWe collected over 200 GB of data and ran a few thousand live flights. Most of them failed.\n\nThat was another thing I learned from this project. Making one good flight happen is very different from building something that repeatedly works. We would fix one gate, suddenly start reaching three gates farther, and immediately discover an entirely new failure mode. Sometimes a change looked amazing and then failed six times in a row. Sometimes the simulator itself was lagging and we spent hours thinking our policy had gotten worse.\n\nEventually we got pretty obsessive about evaluation. We kept a frozen champion, tested changes against it, replayed failures, tracked exactly where runs died, and stopped trusting a change just because one flight looked good.\n\nThe final jump happened really fast. Our first complete VQ2 lap was 40.01 seconds. Fixing the gate map brought that to 39.79. Better multigate localization and a better racing line brought it to 37.62. Adding routed residual policies got us to 36.83. Then a bunch of speed tuning and work on the later part of the course brought the final time down to 35.37 seconds.\n\nA lot of this project was just iteration. Train something, fly it, crash, figure out why, collect the failure, train again, and repeat. I worked around the clock for a lot of the competition and tried basically every idea I thought had a chance of making the drone faster.\n\nWe started with almost no domain knowledge and ended up learning a ridiculous amount about reinforcement learning, PPO, behavior cloning, world models, system identification, visual localization, EKFs, real-time inference, control, model fine-tuning, and just how difficult it is to make a drone fly fast when the only thing telling it where it is is a blurry camera.\n\nIt was extremely scrappy, which was probably my favorite part. We did not have the compute or number of people that some of the labs we were competing against had. We just had to keep finding ways around that.\n\nSeven weeks later, we had a drone flying a 17 gate course autonomously in 35.37 seconds.",
    tags: [
      "Reinforcement Learning",
      "PPO",
      "World Models",
      "Behavior Cloning",
      "YOLO",
      "Computer Vision",
      "EKF",
      "PyTorch",
      "Real-Time Inference",
      "Drones",
    ],
    imageUrl: `${baseUrl}/ai-grand-prix/gatenet_human_side_by_side.png`,
    slug: "ai-grand-prix",
    featured: true,
    githubUrl: "https://github.com/hspeiser/redemption",
    images: [
      {
        url: `${baseUrl}/ai-grand-prix/gatenet_human_side_by_side.png`,
        description:
          "Judging the corner detectors against my manual clicks on the exact same frames. GateNet v7 often only found 2 of 4 corners while v13 and CropGateNet v11 find all four, even on the hard frames.",
      },
      {
        url: `${baseUrl}/ai-grand-prix/v13_labled_image_mid_flight.jpg`,
        description:
          "Live view mid-flight. The v13 detector locks onto two gates at once, 17.5m and 32m out, with all 8 corners at sub-pixel error while the EKF holds a 2.2cm position estimate.",
      },
      {
        url: `${baseUrl}/ai-grand-prix/gatenet_comparison_3_gate16.png`,
        description:
          "Detector generations side by side on gate 16. v7 finds 2 of 4 corners while v13 and CropGateNet v11 find all four. This progression is what six hours of manually clicking corners bought us.",
      },
      {
        url: `${baseUrl}/ai-grand-prix/detector_blind_frame_recovery.png`,
        description:
          "Hand-labeling failure frames taught the detector to see. Blind-frame recovery went from 44% on the v7 baseline to 61% on v13 with hand-seeded drought labels.",
      },
      {
        url: `${baseUrl}/ai-grand-prix/vision_model_precision_comparison.png`,
        description:
          "More detections were not enough. The pose also had to be precise. YOLO found gates but with around 60cm of pose error, and CropGateNet v11 got that down to about 13cm on the same frames.",
      },
      {
        url: `${baseUrl}/ai-grand-prix/vision_latency.png`,
        description:
          "Moving dense GateNet inference from CPU (220ms) to GPU (28ms) removed the 3 Hz vision ceiling and let the full stack run inside the 33ms control period at 30 Hz.",
      },
      {
        url: `${baseUrl}/ai-grand-prix/exact_framework_graph.png`,
        description:
          "The full system. Camera frames and IMU feed GateNet and a visual-inertial EKF, a 53-dimensional observation drives the reference controller plus routed PPO residual actors, and every flight gets recorded into the training corpus that feeds the world model and offline searches.",
      },
      {
        url: `${baseUrl}/ai-grand-prix/course_racing_line.png`,
        description:
          "The offline-optimized racing line through all 17 gates of the VQ2 course, colored by planned speed.",
      },
      {
        url: `${baseUrl}/ai-grand-prix/record_progression.png`,
        description:
          "The lap-time progression. 40.01s first finish, 39.79s after fixing the gate map, 37.62s with multigate localization and a better line, 36.83s with routed residuals, and 35.37s after speed tuning the end of the course.",
      },
      {
        url: `${baseUrl}/ai-grand-prix/where_runs_died.png`,
        description:
          "Most of the 8,561 recorded flights never made it past gate 3. This is what iteration actually looks like.",
      },
      {
        url: `${baseUrl}/ai-grand-prix/terminal_position_heatmap.png`,
        description:
          "Heatmap of where 1,931 timing-healthy failures ended on the course map. Bright clusters are repeated walls. They show where engineering time paid off and where the course kept fighting back.",
      },
      {
        url: `${baseUrl}/ai-grand-prix/failure_modes.png`,
        description:
          "Failure taxonomy from the live episode logs. Collisions dominate at 1,731 flights, followed by everything else you can imagine going wrong.",
      },
      {
        url: `${baseUrl}/ai-grand-prix/flight_gate_distribution.png`,
        description:
          "Where 2,395 logged flights ended, with big walls at gates 5, 9, and 10, plus 49 complete laps at the far end.",
      },
      {
        url: `${baseUrl}/ai-grand-prix/worldmodel_horizon_error.png`,
        description:
          "World-model accuracy over rollout horizon. Useful for short-horizon search and ranking candidates, but the error grows enough over ~1 second that an optimizer can exploit it, so it never replaced the real simulator.",
      },
      {
        url: `${baseUrl}/ai-grand-prix/worldmodel_error_by_gate.png`,
        description:
          "Where the all-course world model was least reliable. The 32-step prediction error spikes at gates 9, 10, and 15, exactly the sections that needed specialist residual policies.",
      },
      {
        url: `${baseUrl}/ai-grand-prix/flywheel_data_growth.png`,
        description:
          "Each flywheel cycle fed fresh flight data back into the world model. One jump added 81,000 new transitions from 36 hours of flying.",
      },
      {
        url: `${baseUrl}/ai-grand-prix/data_footprint.png`,
        description:
          "211 GB of flight data spread across three machines and about 3.7 million files by the end of the competition.",
      },
      {
        url: `${baseUrl}/ai-grand-prix/stats_machinery.png`,
        description:
          "The machinery in numbers. 12 world-model versions, 300,000 simulated steps per second on one GPU, 408 commits in 7 weeks, 0.73px median corner localization, and 28ms GPU inference.",
      },
    ],
    videos: [
      {
        url: `${baseUrl}/ai-grand-prix/vq2_NO_CONTACT_GENERIC_V7_EKF_V6_NO17_first17s.mp4`,
        description:
          "Onboard view of a clean, contact-free VQ2 run. Camera and IMU only, everything running live at 30 Hz.",
      },
    ],
    categories: ["Robotics", "AI / Machine Learning"],
  },
  {
    title: "Hour of Robotics (YC Robohacks 2nd Place Winner)",
    description:
      "A browser-based platform that lets anyone program real robots through a drag-and-drop interface, making robotics as accessible as Hour of Code made programming.",
    longDescription:
      "Hour of Code reached hundreds of millions of people and changed who gets into programming. We think robotics needs that same inflection point, because right now the barrier to entry is just way too high. So we built Hour of Robotics, a platform that lets anyone program real robots through a drag-and-drop interface like Scratch, running entirely in the browser.\n\nThe Innate MARS robot has LiDAR, dual cameras, a drive base, and a 6-DOF arm. Instead of throwing people into complex ROS terminals, we turned everything into visual blocks: movement, arm control, navigation, vision, and speech, all backed by real ROS commands over WebSocket.\n\nWith the platform you can build full pick-and-place manipulation pipelines visually (most teams couldn't get consistent pickups, we were doing it reliably with ~20 blocks), test everything in a full in-browser simulator with IK, collision detection, and 3D visualization before touching hardware, use open vocabulary vision to find objects like a \"red cup\" by description, and run local LLM (Gemma 4) blocks for on-device reasoning with no API costs.\n\nWe took concepts like inverse kinematics, SLAM, and computer vision, and made them feel simple. That's the goal.",
    tags: ["Next.js", "React", "Blockly", "ROS2", "Python", "FastAPI", "PyTorch", "IKpy"],
    imageUrl: `${baseUrl}/robohacks/complex_example.png`,
    slug: "hour_of_robotics",
    demoUrl: "https://www.youtube.com/watch?v=Dn52xctBjB8",
    githubUrl: "https://github.com/filipkujawa/hour_of_robotics",
    images: [
      {
        url: `${baseUrl}/robohacks/all_of_the_robots_lined_up.jpg`,
        description: "All of the robots lined up at the event.",
      },
      {
        url: `${baseUrl}/robohacks/camera_view_picking_up_block.png`,
        description: "Camera view of the robot picking up a block.",
      },
      {
        url: `${baseUrl}/robohacks/complex_example.png`,
        description: "Complex block-based program example.",
      },
      {
        url: `${baseUrl}/robohacks/me_presenting.jpg`,
        description: "Presenting Hour of Robotics at YC Robohacks.",
      },
      {
        url: `${baseUrl}/robohacks/me_with_robot.JPG`,
        description: "With the Innate MARS robot.",
      },
      {
        url: `${baseUrl}/robohacks/photo_of_us_working_at_event.JPG`,
        description: "Working on the project at the event.",
      },
      {
        url: `${baseUrl}/robohacks/robot_in_front_of_block.png`,
        description: "Robot in front of a block.",
      },
      {
        url: `${baseUrl}/robohacks/simple_example_in_simulation.png`,
        description: "Simple example running in simulation.",
      },
    ],
    videos: [
      {
        url: `${baseUrl}/robohacks/video_pick_and_place-1.mp4`,
        description: "Demo of Hour of Robotics in action.",
      },
    ],
    categories: ["Web Development", "Robotics"],
  },
  {
    title: "FRC Team 971 - Spartan Robotics",
    description:
      "Four years on FRC Team 971 doing a little bit of everything. Autonomous software, power electronics and PCBs, firmware, gearboxes, machining, driving, and match strategy.",
    longDescription:
      "For four years I spent more time at the lab than I did at school. When I joined the team I was told I would pick one discipline, mechanical, electrical, or software. I always thought that was BS. Why not every single one?\n\nSo I did all of them. I wrote the autonomous. I designed most of our power electronics and coprocessor PCBs, wrote the firmware that ran on them, and built the superstructure collision avoidance software so the robot could not tear itself apart. I designed gearboxes and mechanical linkages. I wired the robot and manufactured parts on the lathe and mill, and CAMed parts for the CNC routers. I drove the robot in matches and worked out our match strategy. I wanted to do everything because I was interested in everything.\n\nMy trick was asking the mentors the dumb questions early, actually listening, and then coming back with the hard questions once I had some idea of what was going on. Eventually I learned to love all of it.\n\nSome favorites from those years. We wrote the first 3 piece plus balance autonomous in the world. I designed a suite of 11 connector boards that basically ended our unplugged-sensor problem, and other teams started buying them from us at competitions. And when we could not trust the published field layout, I threw 4 Raspberry Pis and 4 cameras in a box and mapped every AprilTag on the field myself.",
    tags: [
      "Autonomous",
      "PCB Design",
      "Firmware",
      "KiCAD",
      "OnShape",
      "Gearbox Design",
      "CNC Machining",
      "Controls",
      "Match Strategy",
    ],
    imageUrl: `${baseUrl}/robot_electronics/2022_robot_driving_action_shot_intaking_across_the_field.jpg`,
    slug: "robot-electronics",
    githubUrl: "https://github.com/frc971/electrical",
    images: [
      {
        url: `${baseUrl}/robot_electronics/2022_robot_collision_action_shot_cool_looking.jpg`,
        description:
          "Two of our robots smashing into each other mid-match, motion blur and all.",
      },
      {
        url: `${baseUrl}/robot_electronics/2022_robot_driving_action_shot_intaking_across_the_field.jpg`,
        description:
          "Full sprint across the field with the intake down.",
      },
      {
        url: `${baseUrl}/robot_electronics/2022_robot_half_assembled.jpg`,
        description:
          "The 2022 robot half assembled on the shop table.",
      },
      {
        url: `${baseUrl}/robot_electronics/2022_robot_mid_shot_catapult.jpg`,
        description:
          "The 2022 catapult robot out on the field.",
      },
      {
        url: `${baseUrl}/robot_electronics/2022_me_zeroing_the_intake_potentiometer.jpg`,
        description:
          "Zeroing the intake potentiometer at competition. Get this wrong and the intake is wrong everywhere.",
      },
      {
        url: `${baseUrl}/robot_electronics/another_action_shot_of_2022_catapult_mid_shot.jpg`,
        description:
          "Catapult firing mid-drive, ball still in the air.",
      },
      {
        url: `${baseUrl}/robot_electronics/Full_Robot_cropped_top_down_cad_2022.jpg`,
        description:
          "Top down CAD of the full 2022 robot. Everything packed into one frame.",
      },
      {
        url: `${baseUrl}/robot_electronics/2023_robot_long_reach_placing_cone_scoring_points.jpg`,
        description:
          "The 2023 arm at full stretch dropping a cone on the top level.",
      },
      {
        url: `${baseUrl}/robot_electronics/2023_robot_partial_assembly.jpg`,
        description:
          "The 2023 robot coming together in the shop.",
      },
      {
        url: `${baseUrl}/robot_electronics/2023_robot_placing_cone_different_angle.jpg`,
        description:
          "Placing a cone from another angle.",
      },
      {
        url: `${baseUrl}/robot_electronics/action_shot_of_2023_robot_driving_through_the_field_with_arm_up_holding_cone.jpg`,
        description:
          "Hauling across the field with the arm up and a cone locked in.",
      },
      {
        url: `${baseUrl}/robot_electronics/the_enormous_2023_proximal_and_distal_gearboxes_for_5_dof_7ft_carbon_fiber_robot_arm.jpg`,
        description:
          "The comically large gearboxes for the 7 foot carbon fiber arm.",
      },
      {
        url: `${baseUrl}/robot_electronics/box_of_pis_used_this_to_map_out_the_field_bc_of_differences_4pis_4cameras_submm_accuacy_in_mapping_all_22april_tags.jpg`,
        description:
          "A box of Raspberry Pis and cameras I used to map every AprilTag on the field down to the millimeter, because no two fields are actually built the same.",
      },
      {
        url: `${baseUrl}/robot_electronics/button_board_used_to_control_robot.jpg`,
        description:
          "The button board from our driver station. One arcade button for everything the robot can do.",
      },
      {
        url: `${baseUrl}/robot_electronics/led_ring_board_i_designed_for_retro_reflective.jpg`,
        description:
          "An LED ring board I designed so the cameras could actually see the targets.",
      },
      {
        url: `${baseUrl}/robot_electronics/me_fixing_robot_2023_competition.jpg`,
        description:
          "Fixing the arm chain between matches in 2023.",
      },
      {
        url: `${baseUrl}/robot_electronics/2024_Robot_Shooting_Disk.jpg`,
        description:
          "The 2024 robot launching a ring mid-match.",
      },
      {
        url: `${baseUrl}/robot_electronics/2024_pre_match_checklist_pit_me_looking_at_potential_problem.jpg`,
        description:
          "Running the pre match checklist in the pit and staring down something suspicious.",
      },
      {
        url: `${baseUrl}/robot_electronics/2024_robot_partial_wiring_inside.jpg`,
        description:
          "Inside the 2024 robot mid wiring. Organized chaos.",
      },
      {
        url: `${baseUrl}/robot_electronics/looking_stylish_in_cowboy_hat_while_building_2024_robot_shooter.jpg`,
        description:
          "Building the 2024 shooter. Cowboy hats required.",
      },
      {
        url: `${baseUrl}/robot_electronics/Me_swapping_battery_2024.jpg`,
        description:
          "Swapping the battery between matches, pit crew style.",
      },
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
    videos: [
      {
        url: `${baseUrl}/robot_electronics/2022_robot_turret_pov_video_web.mp4`,
        description:
          "POV from the 2022 turret as it spins up to track the hub. The Pi cameras and my green LED ring boards sweep across the arena.",
      },
      {
        url: `${baseUrl}/robot_electronics/2022_super_satisfying_auto_align_web.mp4`,
        description:
          "Auto align in action. The robot locks onto the target and snaps into position. Exactly as satisfying as it sounds.",
      },
      {
        url: `${baseUrl}/robot_electronics/first_3_piece_autonomous_plus_balance_autonomous_in_the_world_we_set_the_bar_I_wrote_it_2023_web.mp4`,
        description:
          "The first 3 piece autonomous plus balance in the world. We set the bar and I wrote it. Watch the arm score three cones and drive onto the charge station without a driver touching anything.",
      },
      {
        url: `${baseUrl}/robot_electronics/2023_robot_head_on_collision_sending_opposing_robot_flying_web.mp4`,
        description:
          "Head-on collision at San Francisco Regional sending the opposing robot flying. Defense is a contact sport.",
      },
      {
        url: `${baseUrl}/robot_electronics/2024_initial_design_practice_shooting_disks_web_web.mp4`,
        description:
          "Early testing of the 2024 shooter, chucking rings at the practice field.",
      },
    ],
    categories: ["Electronics", "3D Printing"],
  },
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
      { url: `${baseUrl}/atila_photos/Rev1-Rev2.png`, description: "Revision 1 and Revision 2 PCBs side by side." },
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
    title: "Shrimpy: The Mantis Shrimp Inspired Helicoid Composite",
    description:
      "Bio-inspired Bouligand fiber composites 3D-printed in continuous Kevlar, tested in compression and 3-point bend. Compressive strength nearly doubled and toughness peaked at almost exactly the angle mantis shrimp use biologically.",
    longDescription:
      "The mantis shrimp is one of the most ridiculous animals on the planet. It punches with the speed and force of a .22 caliber bullet, accelerates its claw at around 10,000 g, and uses that claw to repeatedly smash open snail shells and crabs without breaking it. The secret is the dactyl club, a hammer made out of a helical fiber structure called the Bouligand architecture. Each layer of fibers is rotated by a small angle from the one below, which forces any crack to twist through every successive layer instead of running cleanly. Evolution basically built a self-toughening armor better than most composites we know how to make.\n\nSo obviously, we wanted to make one. And then crush it.\n\nWe used a Markforged X7 continuous-fiber printer to lay down Kevlar inside an Onyx matrix, with each layer rotated by Δθ from the one below. Five pitch angles got printed (0°, 5°, 10°, 15°, 20°), then we ran them through an Instron 5583: half got crushed per ASTM D695, the rest got three-point-bent.\n\nThe compression results were honestly really cool. Strength nearly doubled, from 106 MPa at 0° to 210 MPa at 20°, and the failure mode shifted from a catastrophic 'splat into a mushroom' to a contained dent on one side. Energy absorption peaked at around 11°, which is wild because that's basically right where the mantis shrimp lives biologically. We accidentally rediscovered evolution's answer to a materials problem.\n\nThe bend results went the other direction: 0° was strongest at 290 MPa, but the helical samples kept carrying load way past where the others fractured. The 20° beam held on out to ~12% strain instead of snapping at ~5%. The Bouligand structure trades some peak strength for a huge gain in damage tolerance, which is exactly the trade-off the shrimp has converged on. When you're punching things 50,000 times in your life, toughness beats stiffness every time.\n\nNext time: more than one specimen per angle (we were material-limited), drop-weight testing to actually probe the impact regime, and trying different matrix/fiber combos to figure out how much of this is the structure vs. Kevlar just being good at being Kevlar.",
    tags: [
      "Markforged X7",
      "Continuous Fiber 3D Printing",
      "Kevlar",
      "Onyx",
      "Bouligand Composites",
      "ASTM D695",
      "Instron Testing",
      "FEA",
      "Bio-Inspired Design",
    ],
    imageUrl: `${baseUrl}/mantis_shrimp/mantis.png`,
    slug: "mantis-shrimp-composites",
    featured: true,
    paperUrl: `${baseUrl}/mantis_shrimp/mantis_shrimp_inspired_composites.pdf`,
    images: [
      {
        url: `${baseUrl}/mantis_shrimp/figure%201%20-%20compression%20ply%20orientations.png`,
        description:
          "Slicer view of the five compression specimens. Each ply rotates by Δθ (0°, 5°, 10°, 15°, 20°), so you can actually see the helix wrap around the cylinder as the angle increases.",
      },
      {
        url: `${baseUrl}/mantis_shrimp/figure%202%20-%203pt%20bend%20ply%20orientations.png`,
        description: "Same ply orientations for the rectangular three-point bend specimens.",
      },
      {
        url: `${baseUrl}/mantis_shrimp/figure%203%20-%20kevlar%20fiber%20path%2060deg.png`,
        description:
          "Top-down view of the Kevlar fiber path inside a single layer at 60°. The fibers can't quite fill the rectangular corners when rotated, which slightly lowers the fiber volume fraction in the helical specimens vs. the unidirectional control.",
      },
      {
        url: `${baseUrl}/mantis_shrimp/figure%204%20-%20compression%20sim%20specimens.png`,
        description:
          "FEA simulation in Markforged's Eiger solver under the same compression load. Higher pitch angles distribute stress much more uniformly across the cylinder.",
      },
      {
        url: `${baseUrl}/mantis_shrimp/3pt%20bend%20test%20machine%20setup%20photo.png`,
        description:
          "Test setup on the Instron 5583. Specimen sitting between the platens, mid-test.",
      },
      {
        url: `${baseUrl}/mantis_shrimp/figure%205%20-%20compression%20force-displacement%20curves.png`,
        description:
          "Force vs. displacement for every compression specimen. Peak load roughly doubles from 13 kN at 0° to 26 kN at 20°.",
      },
      {
        url: `${baseUrl}/mantis_shrimp/figure%206%20-%203pt%20bend%20stress-strain%20curves.png`,
        description:
          "Flexural stress-strain curves. The 0° unidirectional control hits the highest peak (290 MPa), but the 20° helical sample keeps carrying load way out to 12% strain, past where the others have already fractured.",
      },
      {
        url: `${baseUrl}/mantis_shrimp/figure%207%20-%20compression%20specimens%20post-test.png`,
        description:
          "Compression specimens after testing. The 0° one totally flattened into a mushroom while the 20° one is barely deformed.",
      },
      {
        url: `${baseUrl}/mantis_shrimp/figure%208%20-%203pt%20bend%20specimens%20post-test.png`,
        description:
          "Bend specimens after testing. Low-pitch beams snapped sharply at the loading point while high-pitch beams curved smoothly, so damage spread out instead of concentrating.",
      },
      {
        url: `${baseUrl}/mantis_shrimp/figure%209%20-%20strength%20and%20modulus%20vs%20fiber%20angle.png`,
        description:
          "Strength and modulus vs. fiber pitch angle for both tests. Compression strength climbs with angle, flexural strength drops. Exactly opposite trends, which makes sense given how each test loads the fibers.",
      },
      {
        url: `${baseUrl}/mantis_shrimp/figure%2010%20-%20energy%20absorption%20vs%20fiber%20angle.png`,
        description:
          "Volumetric energy absorption vs. pitch angle. Compression toughness peaks around 11°, eerily close to where mantis shrimp biology lands. Energy absorption is the one metric that improves with helical stacking across both tests.",
      },
    ],
    papers: [
      {
        url: `${baseUrl}/mantis_shrimp/mantis_shrimp_inspired_composites.pdf`,
        title: "Mechanical Properties of Mantis Shrimp Inspired Helicoidal Composites",
        description:
          "Full write-up with the methods, all force-displacement and stress-strain data, post-test morphology, the Tsai-Hill off-axis model fit, and discussion of the strength vs. toughness trade-off.",
      },
    ],
    categories: ["Mechanical", "3D Printing", "Materials Science"],
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
]
