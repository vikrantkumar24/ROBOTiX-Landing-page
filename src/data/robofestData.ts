export interface ArenaCompetition {
  id: string;
  rank: string;
  name: string;
  shortTag: string;
  tagline: string;
  category: string;
  prizePool: string;
  combatTier: string;
  timeline: string;
  teamSize: string;
  weightClass: string;
  dimensions: string;
  controlProtocol: string;
  primaryWeaponry: string;
  arenaDetails: string;
  description: string;
  tacticalRules: string[];
  disqualifications: string[];
}

export const ARENAS_DATA: ArenaCompetition[] = [
  {
    id: 'robowar',
    rank: '01',
    name: 'ROBOWAR',
    shortTag: '8KG COMBAT ARENA',
    tagline: 'Full Metal Kinetic Destruction & Cage Clashes',
    category: 'COMBAT ROBOTICS',
    prizePool: '₹10,000',
    combatTier: 'HEAVYWEIGHT DESTRUCTION',
    timeline: '22 MARCH // 2:00 PM - 6:00 PM',
    teamSize: '2 - 4 PILOTS',
    weightClass: '8.0 KG (±5% STRICT)',
    dimensions: '50 X 50 X 50 CM MAXIMUM',
    controlProtocol: '2.4 GHZ RF ISOLATED FAILSAFE',
    primaryWeaponry: 'Titanium spinning drums, vertical discs, pneumatic wedges, flippers (Up to 10,000 RPM)',
    arenaDetails: '16x16 ft diamond-plate steel floor enclosed by 12mm ballistic polycarbonate with active floor hazard spikes and push pits.',
    description: 'Central India’s premier full-contact robotic warfare tournament. Custom-machined AR500 armor and high-RPM titanium kinetic weapons battle in intense double-elimination rounds under strict wireless isolation protocols.',
    tacticalRules: [
      'Radio systems must feature automatic failsafe lockout cutting weapon power within 1.0 second of signal loss.',
      'Maximum battery voltage: 28.0V DC (6S LiPo equivalent). External mechanical master switch required.',
      'Approved armor: AR400/500 steel, Grade 5 Titanium, 7075-T6 aluminum, carbon composites.'
    ],
    disqualifications: [
      'Entanglement nets, EMP emitters, tethered liquids, or chemical flame jets.',
      'Exceeding 8.00 kg at official digital weigh-in inspection.'
    ]
  },
  {
    id: 'robothon',
    rank: '02',
    name: 'ROBOTHON',
    shortTag: '24H SIMULATION HACKATHON',
    tagline: 'Autonomous Swarm Drones, Rovers & Nanobot Simulation',
    category: 'SIMULATION & AUTONOMY',
    prizePool: '₹35,000',
    combatTier: 'AUTONOMOUS DEFENSE SIM',
    timeline: '22 - 23 MARCH // 24 HOURS NON-STOP',
    teamSize: '2 - 4 PILOTS',
    weightClass: 'SIMULATED / HIL RIGS',
    dimensions: 'UNRESTRICTED MULTI-AGENT',
    controlProtocol: 'ROS2 HUMBLE / GAZEBO GARDEN / WEBOTS',
    primaryWeaponry: 'Autonomous path planning, Swarm flocking, Lidar SLAM, Benthic exploration',
    arenaDetails: 'Virtual 500m Gazebo/Webots physics environment benchmarked live on dedicated GPU clusters at Central Computer Center, NIT Raipur.',
    description: 'Central India’s premier 24-hour non-stop autonomous robotics hackathon. Teams solve mission-critical defense simulations across GPS-denied aerial drone swarms, benthic underwater rovers, and 6-legged rough terrain rovers.',
    tacticalRules: [
      'Problem statements released live at 15:00 HRS on 22 March at CCC-2.',
      'Automated leaderboard continuously benchmarks collision avoidance, task completion time, and energy efficiency.',
      'Top finalist algorithms deployed on physical hardware-in-the-loop (HIL) test rigs.'
    ],
    disqualifications: [
      'Submitting pre-trained neural networks or code created prior to the 24h sprint kick-off.',
      'Exceeding allocated compute threshold during real-time drone swarm evaluation.'
    ]
  },
  {
    id: 'roborace',
    rank: '03',
    name: 'ROBORACE',
    shortTag: 'KINETIC SPEED & OBSTACLE TRACK',
    tagline: 'High-G Speed, Elevated Ramps & Oil/Gravel Chicanes',
    category: 'TIME-ATTACK RACING',
    prizePool: '₹10,000',
    combatTier: 'OBSTACLE TIME-ATTACK',
    timeline: '23 MARCH // 10:00 AM - 2:00 PM',
    teamSize: '1 - 4 PILOTS',
    weightClass: '5.0 KG MAXIMUM',
    dimensions: '25 X 25 X 25 CM STRICT BOX LIMIT',
    controlProtocol: '2.4 GHZ WIRELESS OR TETHERED',
    primaryWeaponry: 'High-torque brushless drive, active steering linkages, 4WD independent suspension',
    arenaDetails: '85-meter multi-terrain obstacle raceway at Open Air Theatre with switchbacks, oil-slick simulator, gravel pit, and bridge ramp.',
    description: 'An aggressive obstacle raceway testing chassis engineering and driver reaction times. Machines must conquer elevated rope bridges, slippery oil chicanes, and rumble strips against laser optical timing gates.',
    tacticalRules: [
      'Bot must strictly fit within a 25x25x25 cm mechanical inspection cube at all times.',
      'Custom fabricated chassis, 3D printed components, and steering linkages rewarded.',
      'Two trial runs allowed per team; fastest single clean lap dictates leaderboard qualification.'
    ],
    disqualifications: [
      'Using commercially available ready-to-run (RTR) toy RC car chassis.',
      'Max onboard voltage exceeding 24V DC.'
    ]
  },
  {
    id: 'robosoccer',
    rank: '04',
    name: 'ROBOSOCCER',
    shortTag: 'MECHATRONIC STRIKER SHOWDOWN',
    tagline: '2v2 Tactical Soccer Matches on Regulation Turf',
    category: 'TACTICAL BOT ATHLETICS',
    prizePool: '₹10,000',
    combatTier: '2V2 TACTICAL SOCCER',
    timeline: '23 MARCH // 2:50 PM - 6:00 PM',
    teamSize: '2 - 4 PILOTS',
    weightClass: '5.0 KG STRIKER WEIGHT',
    dimensions: '30 X 30 X 30 CM STRICT',
    controlProtocol: 'DUAL WIRELESS RF 2.4 GHZ',
    primaryWeaponry: 'Magnetic ball-grabbers, solenoid kickers, high-traction omni-wheels',
    arenaDetails: 'Regulation 10x8 ft synthetic turf pitch with raised wooden boundary boards and automated IR beam score counters.',
    description: 'High-octane mechanized soccer where speed meets ball-handling strategy. Dual striker and defender bots maneuver specialized magnetic ball-grabbers and pneumatic/solenoid kickers in 2.5-minute match rounds.',
    tacticalRules: [
      'Ball holding must not encapsulate more than 30% of ball circumference.',
      'Kicker mechanisms must use mechanical springs or solenoids (pneumatics max 4 bar).',
      'Sudden death penalty shootouts trigger in case of regular time draw.'
    ],
    disqualifications: [
      'Direct chassis ramming of opponent without playing ball (2 yellow cards = red card penalty).',
      'Exceeding 30x30x30 cm bounding box at kick-off.'
    ]
  },
  {
    id: 'vibecoding',
    rank: '05',
    name: 'VIBECODING',
    shortTag: 'EMBEDDED HARDWARE CODING',
    tagline: 'Arduino, ESP32, Verilog Microcontroller Challenges',
    category: 'HARDWARE FIRMWARE HACK',
    prizePool: '₹12,000',
    combatTier: 'LIVE EMBEDDED CONTROLLER',
    timeline: '22 MARCH // 10:00 AM - 2:00 PM',
    teamSize: '1 - 2 PILOTS',
    weightClass: 'BARE-METAL SENSORS & PCB',
    dimensions: 'BREADBOARD & CUSTOM PCB',
    controlProtocol: 'FREERTOS / CAN-BUS / SPI / I2C',
    primaryWeaponry: 'STM32 ARM Cortex, ESP32 dual-core, Verilog FPGA state machines, IMU sensor fusion',
    arenaDetails: 'NIT Raipur Electronics & Embedded Systems Lab with dedicated test benches, regulated DC supplies, and logic analyzers.',
    description: 'Put your microcontroller mastery to the test against mystery hardware kits. Teams solder, route, and write interrupt-driven real-time firmware under clock pressure in NIT Raipur embedded labs.',
    tacticalRules: [
      'Mystery hardware sensors and test actuators distributed on the spot.',
      'All firmware compiled and flashed live under inspection bench monitoring.',
      'Logic analyzers and digital storage oscilloscopes provided at each workstation.'
    ],
    disqualifications: [
      'Using pre-written commercial closed-source driver packages.',
      'External internet communication for code sharing outside approved doc repos.'
    ]
  },
  {
    id: 'ideathon',
    rank: '06',
    name: 'IDEATHON',
    shortTag: 'TECH INNOVATION PITCH',
    tagline: 'Physical Hardware Prototype & Venture Showcase',
    category: 'VENTURE & PHYSICAL DEMO',
    prizePool: '₹15,000',
    combatTier: 'DEFENSE & INDUSTRIAL INCUBATION',
    timeline: '23 MARCH // 2:00 PM - 6:00 PM',
    teamSize: '1 - 3 PILOTS',
    weightClass: 'WORKING HARDWARE PROTOTYPE',
    dimensions: 'PORTABLE DISPLAY UNIT',
    controlProtocol: 'ANY EMBEDDED ARCHITECTURE',
    primaryWeaponry: 'Agritech robotics, defense drones, prosthetic exoskeletons, clean energy automation',
    arenaDetails: 'Main Seminar Hall, Department of Mechanical Engineering, NIT Raipur with multimedia display and prototype testing runway.',
    description: 'Bridging technical warfare prototypes with commercial venture capital. Teams demonstrate functional physical hardware prototypes before industry defense mentors and seed investors.',
    tacticalRules: [
      'Functional working hardware prototype or physical mechanism required.',
      'Teams receive 7 minutes for presentation and 3 minutes for technical Q&A.',
      'Top 2 winners receive direct fast-track incubation grant support via NIT Raipur Innovation Cell.'
    ],
    disqualifications: [
      'Pure software slide presentations without working physical engineering proof.'
    ]
  },
  {
    id: 'roboquiz',
    rank: '07',
    name: 'ROBOQUIZ',
    shortTag: 'ROBOTICS & ELECTRONICS QUIZ',
    tagline: 'High-Stakes Technical Trivia & Circuit Diagnostics',
    category: 'ELECTRONICS & ROBOTICS INTEL',
    prizePool: '₹6,000 GOODIES & AWARDS',
    combatTier: 'TECHNICAL COGNITIVE SPRINT',
    timeline: '22 MARCH // 2:30 PM ONWARDS',
    teamSize: '1 - 2 PILOTS',
    weightClass: 'COGNITIVE TELEMETRY',
    dimensions: 'WRITTEN & BUZZER ROUNDS',
    controlProtocol: 'OFFLINE WIRELESS BUZZERS',
    primaryWeaponry: 'Circuit analysis, ROS2 commands, robotics history, electronic logic gates',
    arenaDetails: 'Lecture Hall Complex (LHC-1), NIT Raipur equipped with fast-response electronic buzzer podiums.',
    description: 'Fast-paced technical trivia testing your grasp on microcontrollers, robotics kinematics, autonomous sensor pipelines, and defense robotics lore across two offline knockout stages.',
    tacticalRules: [
      'Round 1: 30-minute written diagnostics screening across electronics and robotics kinematics.',
      'Round 2: Rapid-fire buzzer round on stage with negative marking for false triggers.',
      'Certificates and hardware dev kit prizes awarded to top 3 winning teams.'
    ],
    disqualifications: [
      'Use of mobile devices, calculators, or smart wearables during quiz rounds.'
    ]
  }
];

export const FEST_METRICS = [
  { value: '₹90,000+', label: 'TOTAL PRIZE POOL', sublabel: 'Cash rewards & goodies' },
  { value: '24-HOUR', label: 'ROBOTHON SPRINT', sublabel: 'Autonomous drone sim' },
  { value: '8.0 KG', label: 'COMBAT WEAPON CLASS', sublabel: '10,000 RPM full metal' },
  { value: '22-23 MARCH', label: 'HOST DATES 2026', sublabel: 'NIT Raipur campus' }
];
