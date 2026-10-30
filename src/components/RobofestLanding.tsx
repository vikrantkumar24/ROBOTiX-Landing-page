import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, Zap, Trophy, Cpu, Target, Crosshair, 
  ChevronRight, Calendar, MapPin, Users, Download, ArrowUpRight, CheckCircle2
} from 'lucide-react';

interface EventSpec {
  label: string;
  value: string;
}

export interface RobofestEvent {
  id: string;
  title: string;
  tagline: string;
  date: string;
  prize: string;
  category: string;
  teamSize: string;
  specs: EventSpec[];
  accent: string;
  description: string;
}

const EVENTS_DATA: RobofestEvent[] = [
  {
    id: "robowar",
    title: "ROBOWAR",
    tagline: "FULL METAL COMBAT ARENA",
    date: "22 MARCH • 02:00 PM - 06:00 PM",
    prize: "₹10,000",
    category: "HEAVY COMBAT",
    teamSize: "1-4 PILOTS",
    specs: [
      { label: "WEIGHT LIMIT", value: "8.0 KG (STRICT)" },
      { label: "TRANSMISSION", value: "2.4GHz WIRELESS DUAL-BAND" },
      { label: "ARENA SAFETY", value: "POLYCARBONATE ENCLOSURE" },
      { label: "WEAPONS", value: "SPINNERS, WEDGES, LIFTERS" }
    ],
    accent: "from-amber-500 to-red-600",
    description: "Design and build a devastating remote-controlled combat machine. Knock out opponents in a steel-enclosed arena under full impact conditions."
  },
  {
    id: "robothon",
    title: "ROBOTHON",
    tagline: "24-HOUR AUTONOMOUS SIMULATION HACKATHON",
    date: "22-23 MARCH • 10:00 AM ONWARDS",
    prize: "₹35,000",
    category: "FLAGSHIP HACK",
    teamSize: "2-4 MEMBERS",
    specs: [
      { label: "DURATION", value: "24 HOURS NON-STOP" },
      { label: "FOCUS DOMAINS", value: "GPS-DENIED DRONES, SWARMS" },
      { label: "ADVANCED TECH", value: "ROVERS, NANOBOTS, UNDERWATER" },
      { label: "FORMAT", value: "SIMULATION-BASED & REAL-TIME JUDGING" }
    ],
    accent: "from-cyan-400 to-blue-600",
    description: "Central India's benchmark autonomy hackathon. Tackle GPS-denied tactical navigation, aerial swarm coordination, and extreme terrain kinematic rovers."
  },
  {
    id: "roborace",
    title: "ROBORACE",
    tagline: "SPEED, SUSPENSION & OBSTACLE NAVIGATION",
    date: "23 MARCH • 10:00 AM - 02:00 PM",
    prize: "₹10,000",
    category: "KINETIC SPEED",
    teamSize: "1-4 PILOTS",
    specs: [
      { label: "MAX CHASSIS", value: "25 x 25 x 25 CM" },
      { label: "WEIGHT LIMIT", value: "5.0 KG" },
      { label: "TRACK SURFACE", value: "OIL, INCLINES, GRAVEL, ROLLS" },
      { label: "SCORING", value: "TIME-TRIAL + PENALTY CHECKPOINTS" }
    ],
    accent: "from-emerald-400 to-teal-600",
    description: "Push brushless torque and throttle control through switchbacks, ramps, friction traps, and sudden drop-offs."
  },
  {
    id: "robosoccer",
    title: "ROBOSOCCER",
    tagline: "MECHATRONIC STRIKER SHOWDOWN",
    date: "23 MARCH • 02:50 PM - 06:00 PM",
    prize: "₹10,000",
    category: "SPORTS DYNAMICS",
    teamSize: "1-4 PILOTS",
    specs: [
      { label: "MAX CHASSIS", value: "30 x 30 x 30 CM" },
      { label: "WEIGHT LIMIT", value: "5.0 KG" },
      { label: "MATCH TIME", value: "2.5 MINUTES / HALF" },
      { label: "BALL TYPE", value: "STANDARD TOURNAMENT TENNIS BALL" }
    ],
    accent: "from-purple-500 to-pink-600",
    description: "Fast-paced robotic soccer. Dribble, intercept, and launch shots into enemy territory in a rapid bracket tournament."
  },
  {
    id: "vibecoding",
    title: "VIBECODING",
    tagline: "EMBEDDED SYSTEMS & CIRCUIT HACKING",
    date: "22 MARCH • 10:00 AM - 02:00 PM",
    prize: "₹12,000",
    category: "MICROCONTROLLERS",
    teamSize: "1-2 CODERS",
    specs: [
      { label: "PLATFORMS", value: "ARDUINO / ESP32 / VERILOG" },
      { label: "CHALLENGES", value: "REAL-TIME SENSOR FUSION, PWM" },
      { label: "DURATION", value: "3 HOURS CODING SPRINT" },
      { label: "MODE", value: "OFFLINE HARDWARE BENCHMARK" }
    ],
    accent: "from-orange-400 to-amber-600",
    description: "Program logic, wire circuits, and eliminate latency on bare metal to solve robotics perception problems."
  },
  {
    id: "ideathon",
    title: "IDEATHON",
    tagline: "THE FRONTIER OF ROBOTIC INNOVATION",
    date: "23 MARCH • 02:00 PM - 06:00 PM",
    prize: "₹15,000",
    category: "VENTURE PITCH",
    teamSize: "2-4 MEMBERS",
    specs: [
      { label: "PITCH DURATION", value: "10 MIN (PITCH + Q&A)" },
      { label: "DELIVERABLES", value: "PROTOTYPE / PROOF-OF-CONCEPT" },
      { label: "THEMES", value: "HEALTHCARE, DEFENSE, AUTOMATION" },
      { label: "JUDGES", value: "INDUSTRY LEADERS & FACULTY" }
    ],
    accent: "from-blue-500 to-indigo-600",
    description: "Pitch groundbreaking robotics engineering and societal tech solutions before domain investors and faculty."
  }
];

export default function RobofestLanding() {
  const [selectedEvent, setSelectedEvent] = useState<RobofestEvent>(EVENTS_DATA[0]);
  const [registered, setRegistered] = useState(false);
  const [formData, setFormData] = useState({
    callsign: '',
    email: '',
    college: '',
    targetArena: EVENTS_DATA[0].id,
    teamSize: '1 (SOLO DRIVER)',
    terms: false
  });

  const handleDownloadRulebook = (event: RobofestEvent) => {
    const content = `
======================================================================
           ROBOFEST 2026 // OFFICIAL ARENA SPECIFICATIONS
                ROBOTiX CLUB • NIT RAIPUR (EST. 1956)
======================================================================

EVENT:          ${event.title}
CATEGORY:       ${event.category}
TAGLINE:        ${event.tagline}
DATE & TIME:    ${event.date}
PRIZE REWARD:   ${event.prize}
CREW LIMIT:     ${event.teamSize}

ARENA SPECIFICATIONS & MANDATORY CONSTRAINTS:
----------------------------------------------------------------------
${event.specs.map(s => `• ${s.label}: ${s.value}`).join('\n')}

DESCRIPTION & DIRECTIVES:
${event.description}

SAFETY & COMPLIANCE:
1. All robots must feature radio-isolation failsafe protocols.
2. Digital weigh-in and dimensional scrutiny takes place 2 hours prior to scheduled heats.
3. Venue: National Institute of Technology Raipur, G.E. Road, Raipur, CG.

CONVENOR: ROBOTiX Club • NIT Raipur
CONTACT: robotix@nitrr.ac.in
======================================================================
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${event.id.toUpperCase()}_OFFICIAL_RULEBOOK_ROBOFEST_2026.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistered(true);
  };

  return (
    <div className="relative min-h-screen bg-[#07090e] text-slate-100 font-['Chakra_Petch',sans-serif] selection:bg-amber-400 selection:text-black overflow-x-hidden">
      
      {/* SCANLINE & CRT GRID OVERLAY */}
      <div className="pointer-events-none fixed inset-0 z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[length:100%_4px] opacity-30" />
      <div className="pointer-events-none fixed inset-0 z-40 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.85)_100%)]" />

      {/* TACTICAL NAVIGATION BAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-amber-400 clip-chamfer-sm flex items-center justify-center font-black text-black">
              R
            </div>
            <div>
              <span className="font-bold tracking-widest text-lg text-white">ROBOTiX CLUB</span>
              <span className="hidden sm:inline-block ml-2 text-xs font-mono text-amber-400 border border-amber-400/40 px-1.5 py-0.5">NIT RAIPUR</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 font-mono text-sm tracking-wider">
            <a href="#about" className="hover:text-amber-400 transition-colors">[ 01. DOSSIER ]</a>
            <a href="#arenas" className="hover:text-amber-400 transition-colors">[ 02. COMBAT ARENAS ]</a>
            <a href="#register" className="hover:text-amber-400 transition-colors">[ 03. PILOT REGISTRATION ]</a>
          </nav>

          <a 
            href="#register" 
            className="clip-chamfer-sm bg-amber-400 hover:bg-amber-300 text-black font-bold px-5 py-2 text-sm uppercase tracking-wider transition-all"
          >
            DEPLOY BOT //
          </a>
        </div>
      </header>

      {/* HERO SECTION - TECHFEST AGGRESSIVE STYLE */}
      <section className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center px-6 border-b border-white/10 overflow-hidden">
        {/* Ambient Grid Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-r from-red-600/15 via-amber-500/15 to-cyan-500/15 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          
          {/* Tactical HUD Header */}
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-amber-400 bg-amber-400/10 border border-amber-400/30 px-3 py-1">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              SYSTEM PROTOCOL // CENTRAL INDIA LARGEST ROBOTICS CONVENTION
            </span>
            <span className="hidden sm:inline-block font-mono text-xs text-slate-500">
              COORD: 21.2497° N, 81.6050° E
            </span>
          </div>

          {/* Massively Bold Display Headline */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <h1 className="text-7xl sm:text-9xl lg:text-[11rem] font-black tracking-tighter leading-[0.85] uppercase">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-500">
                ROBO
              </span>
              <span className="block text-amber-400 drop-shadow-[0_0_35px_rgba(251,191,36,0.35)]">
                FEST'26
              </span>
            </h1>
          </motion.div>

          <p className="mt-8 max-w-2xl text-lg sm:text-xl text-slate-300 font-normal leading-relaxed">
            Where Silicon, High-Torque Motors & Kinetic Engineering Collide. Two days of uncompromising arena combat, 24-hour autonomy simulations, and microchip warfare at <strong className="text-white">NIT Raipur</strong>.
          </p>

          {/* Action Row */}
          <div className="mt-10 flex flex-wrap gap-4 items-center">
            <a 
              href="#arenas"
              className="clip-chamfer relative group overflow-hidden bg-amber-400 px-8 py-4 font-mono font-black text-black uppercase tracking-wider text-base transition-all hover:bg-amber-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                ENTER ARENAS <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity bg-[repeating-linear-gradient(45deg,#000,#000_10px,#fff_10px,#fff_20px)]" />
            </a>

            <a 
              href="#register"
              className="clip-chamfer border border-white/20 bg-white/5 hover:bg-white/10 px-8 py-4 font-mono font-bold text-white uppercase tracking-wider text-base transition-all flex items-center gap-2"
            >
              REGISTER CREW [FREE]
            </a>
          </div>

          {/* Telemetry Stats Bar */}
          <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 font-mono">
            <div>
              <p className="text-xs text-slate-500 uppercase">PRIZE POOL</p>
              <p className="text-3xl font-black text-white mt-1">₹90,000+</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase">FLAGSHIP HACK</p>
              <p className="text-3xl font-black text-amber-400 mt-1">24 HOURS</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase">COMBAT ARENA</p>
              <p className="text-3xl font-black text-white mt-1">8 KG CLASS</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase">EVENT TIMELINE</p>
              <p className="text-3xl font-black text-cyan-400 mt-1">22-23 MAR</p>
            </div>
          </div>

        </div>
      </section>

      {/* MARQUEE RUNWAY */}
      <div className="bg-amber-400 text-black py-2.5 overflow-hidden font-black text-sm uppercase tracking-widest font-mono">
        <div className="flex gap-8 whitespace-nowrap animate-marquee">
          <span>// ROBOWAR COMBAT 8KG</span>
          <span>// 24H SIMULATION ROBOTHON</span>
          <span>// SPEED OBSTACLE ROBORACE</span>
          <span>// HIGH-TORQUE ROBOSOCCER</span>
          <span>// EMBEDDED VIBECODING</span>
          <span>// PITCH INNOVATION IDEATHON</span>
          <span>// NIT RAIPUR ROBOTIX CLUB</span>
          {/* Repeat for seamless loop */}
          <span>// ROBOWAR COMBAT 8KG</span>
          <span>// 24H SIMULATION ROBOTHON</span>
          <span>// SPEED OBSTACLE ROBORACE</span>
          <span>// HIGH-TORQUE ROBOSOCCER</span>
          <span>// EMBEDDED VIBECODING</span>
          <span>// PITCH INNOVATION IDEATHON</span>
          <span>// NIT RAIPUR ROBOTIX CLUB</span>
        </div>
      </div>

      {/* ABOUT / DOSSIER SECTION */}
      <section id="about" className="py-24 px-6 max-w-7xl mx-auto border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <span className="font-mono text-xs text-amber-400 uppercase tracking-widest">// 01. TECHNICAL DOSSIER</span>
            <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white mt-2">
              ROBOTiX CLUB LEGACY
            </h2>
            <p className="mt-6 text-slate-300 leading-relaxed font-sans text-base">
              National Institute of Technology Raipur's flagship robotics collective, pioneering autonomous vehicle design, full-contact combat engineering, aerial swarms, and embedded systems innovation across Central India.
            </p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              <div className="bg-white/5 border border-white/10 p-4 clip-chamfer-sm">
                <div className="text-amber-400 font-bold mb-1">24/7 TECHNICAL PIT</div>
                <div className="text-slate-400">Regulated DC power, oscilloscope benches, 3D printers, and soldering bays on-site.</div>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 clip-chamfer-sm">
                <div className="text-cyan-400 font-bold mb-1">SAFETY INVARIANTS</div>
                <div className="text-slate-400">Bulletproof 12mm polycarbonate enclosure & strict 1.0s radio-loss failsafe halts.</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-black/60 border border-white/20 p-8 clip-chamfer">
            <div className="font-mono text-xs text-slate-500 uppercase tracking-widest pb-4 border-b border-white/10 flex justify-between">
              <span>HOST CAMPUS DIRECTORY</span>
              <span className="text-emerald-400">● LIVE STATUS: OK</span>
            </div>
            <div className="mt-6 space-y-4 font-mono text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-bold block">NATIONAL INSTITUTE OF TECHNOLOGY RAIPUR</span>
                  <span className="text-slate-400">G.E. Road, Raipur, Chhattisgarh - 492010</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-bold block">CONVENTION SCHEDULE</span>
                  <span className="text-slate-400">22-23 March 2026 • 09:00 AM Onwards</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Trophy className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-bold block">₹90,000+ AGGREGATE REWARD PURSE</span>
                  <span className="text-slate-400">Awarded live at Valedictory Grand Finals</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECHFEST STYLE ARENAS SPLIT-VIEWPORT SHOWCASE */}
      <section id="arenas" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="font-mono text-xs text-amber-400 uppercase tracking-widest">// COMBAT & SIMULATION DIVISION</span>
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mt-2">
            SELECT COMBAT ARENA
          </h2>
        </div>

        {/* Dynamic Interactive Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Event Roster */}
          <div className="lg:col-span-5 space-y-3">
            {EVENTS_DATA.map((event, idx) => {
              const isSelected = selectedEvent.id === event.id;
              return (
                <button
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className={`w-full text-left p-5 transition-all clip-chamfer-sm border cursor-pointer ${
                    isSelected 
                      ? 'bg-white/10 border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.15)] translate-x-2' 
                      : 'bg-white/[0.02] border-white/10 hover:border-white/30 hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-xs mb-1">
                    <span className={isSelected ? 'text-amber-400 font-bold' : 'text-slate-500'}>
                      ARENA [0{idx + 1}]
                    </span>
                    <span className="text-slate-400">{event.category}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black tracking-wide uppercase text-white">
                      {event.title}
                    </h3>
                    <span className="font-mono text-amber-400 font-bold text-sm">
                      {event.prize}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Combat Dossier */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedEvent.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-black/60 border border-white/20 p-8 clip-chamfer relative overflow-hidden"
              >
                {/* Tactical Accent Line */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${selectedEvent.accent}`} />

                {/* Top Badge Info */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 font-mono text-xs">
                  <div className="flex items-center gap-2 text-amber-400">
                    <Calendar className="w-4 h-4" />
                    <span>{selectedEvent.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-cyan-400">
                    <Users className="w-4 h-4" />
                    <span>{selectedEvent.teamSize}</span>
                  </div>
                  <div className="text-slate-400">
                    STATUS: <span className="text-emerald-400">REGISTRATION OPEN</span>
                  </div>
                </div>

                {/* Event Name & Description */}
                <div className="my-6">
                  <span className="font-mono text-xs text-slate-500 uppercase tracking-widest">
                    {selectedEvent.tagline}
                  </span>
                  <h3 className="text-4xl sm:text-5xl font-black uppercase text-white mt-1">
                    {selectedEvent.title}
                  </h3>
                  <p className="mt-4 text-slate-300 leading-relaxed font-sans text-base">
                    {selectedEvent.description}
                  </p>
                </div>

                {/* Hardware Telemetry Spec Matrix */}
                <div className="my-8">
                  <h4 className="font-mono text-xs uppercase text-amber-400 tracking-wider mb-4">
                    // ARENA SPECIFICATIONS & MANDATORY CONSTRAINTS
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
                    {selectedEvent.specs.map((spec, i) => (
                      <div key={i} className="bg-white/5 border border-white/10 p-3 clip-chamfer-sm">
                        <div className="text-[10px] text-slate-500 uppercase">{spec.label}</div>
                        <div className="text-sm font-bold text-slate-200 mt-0.5">{spec.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prize and Download Row */}
                <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="font-mono text-xs text-slate-500 uppercase">PRIZE REWARD</span>
                    <p className="text-3xl font-black text-amber-400">{selectedEvent.prize}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleDownloadRulebook(selectedEvent)}
                      className="clip-chamfer-sm border border-white/20 hover:border-white/50 px-4 py-2 text-xs font-mono uppercase tracking-wider flex items-center gap-2 text-slate-200 hover:text-white transition-colors cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-amber-400" /> RULEBOOK
                    </button>
                    <a 
                      href="#register"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, targetArena: selectedEvent.id }));
                      }}
                      className="clip-chamfer-sm bg-amber-400 hover:bg-amber-300 text-black px-6 py-2.5 text-xs font-bold uppercase tracking-wider font-mono flex items-center gap-2 transition-all cursor-pointer"
                    >
                      ENTER ARENA <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* REGISTRATION TERMINAL SECTION */}
      <section id="register" className="py-24 px-6 border-t border-white/10 bg-slate-950/60">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="font-mono text-xs text-amber-400 uppercase tracking-widest">// PILOT ONBOARDING</span>
            <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white mt-1">
              AUTHORIZE ARENA REGISTRATION
            </h2>
            <p className="mt-2 text-sm text-slate-400 font-mono">
              Official entry for ROBOFEST 2026 • NIT Raipur
            </p>
          </div>

          <div className="bg-black border border-white/20 p-8 clip-chamfer relative">
            {registered ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
                <h3 className="text-2xl font-bold uppercase text-white font-mono">TRANSMISSION CONFIRMED</h3>
                <p className="text-sm text-slate-400 font-mono max-w-md mx-auto">
                  Your crew dossier has been dispatched to ROBOTiX Club systems. Check your pilot email ({formData.email || 'leader email'}) for verification & pit details.
                </p>
                <div className="pt-2">
                  <div className="inline-block bg-white/5 border border-white/15 px-4 py-2 font-mono text-xs text-amber-400 mb-4">
                    CLEARANCE PASS: RF26-{formData.targetArena.toUpperCase()}-{Math.floor(1000 + Math.random() * 9000)}
                  </div>
                </div>
                <div>
                  <button 
                    onClick={() => {
                      setRegistered(false);
                      setFormData({
                        callsign: '',
                        email: '',
                        college: '',
                        targetArena: selectedEvent.id,
                        teamSize: '1 (SOLO DRIVER)',
                        terms: false
                      });
                    }} 
                    className="font-mono text-xs text-amber-400 underline underline-offset-4 mt-4 cursor-pointer"
                  >
                    SUBMIT ANOTHER DEPLOYMENT
                  </button>
                </div>
              </div>
            ) : (
              <form 
                onSubmit={handleRegisterSubmit}
                className="space-y-6 font-mono text-xs"
              >
                <div>
                  <label className="block text-slate-400 uppercase mb-2">CALLSIGN / TEAM LEADER NAME *</label>
                  <input 
                    required 
                    placeholder="E.G., VIKRANT KUMAR" 
                    value={formData.callsign}
                    onChange={(e) => setFormData({ ...formData, callsign: e.target.value })}
                    className="w-full bg-white/5 border border-white/15 focus:border-amber-400 focus:outline-none p-3.5 text-white tracking-wider"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 uppercase mb-2">PILOT COMMS / EMAIL *</label>
                    <input 
                      required 
                      type="email" 
                      placeholder="PILOT@NITRR.AC.IN" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 focus:border-amber-400 focus:outline-none p-3.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 uppercase mb-2">COLLEGE / INSTITUTION *</label>
                    <input 
                      required 
                      placeholder="NIT RAIPUR" 
                      value={formData.college}
                      onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 focus:border-amber-400 focus:outline-none p-3.5 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 uppercase mb-2">TARGET ARENA *</label>
                    <select 
                      value={formData.targetArena}
                      onChange={(e) => {
                        setFormData({ ...formData, targetArena: e.target.value });
                        const found = EVENTS_DATA.find(ev => ev.id === e.target.value);
                        if (found) setSelectedEvent(found);
                      }}
                      className="w-full bg-[#12151e] border border-white/15 focus:border-amber-400 focus:outline-none p-3.5 text-white"
                    >
                      {EVENTS_DATA.map(ev => (
                        <option key={ev.id} value={ev.id}>{ev.title} ({ev.prize})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 uppercase mb-2">TEAM SIZE (PILOTS)</label>
                    <select 
                      value={formData.teamSize}
                      onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                      className="w-full bg-[#12151e] border border-white/15 focus:border-amber-400 focus:outline-none p-3.5 text-white"
                    >
                      <option value="1 (SOLO DRIVER)">1 (SOLO DRIVER)</option>
                      <option value="2 PILOTS">2 PILOTS</option>
                      <option value="3 PILOTS">3 PILOTS</option>
                      <option value="4 PILOTS (MAX)">4 PILOTS (MAX)</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-start gap-2 pt-2">
                  <input 
                    required 
                    type="checkbox" 
                    id="terms" 
                    checked={formData.terms}
                    onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
                    className="mt-1 accent-amber-400 cursor-pointer" 
                  />
                  <label htmlFor="terms" className="text-slate-400 text-[11px] leading-relaxed cursor-pointer">
                    I verify that our robot will strictly comply with weight tolerances, radio-isolation kill-switches, and arena safety guidelines.
                  </label>
                </div>

                <button 
                  type="submit" 
                  className="w-full clip-chamfer-sm bg-amber-400 hover:bg-amber-300 text-black font-black py-4 uppercase tracking-widest text-sm transition-all cursor-pointer shadow-[0_0_25px_rgba(251,191,36,0.25)]"
                >
                  TRANSMIT REGISTRATION //
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER - TERMINAL TELEMETRY STYLE */}
      <footer className="border-t border-white/10 bg-black py-12 px-6 font-mono text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-400">ROBOTiX CLUB • NIT RAIPUR • ALL SYSTEMS ONLINE</span>
          </div>

          <div className="flex gap-6 text-slate-400">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-amber-400">[INSTAGRAM]</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-amber-400">[LINKEDIN]</a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-amber-400">[GITHUB]</a>
          </div>

          <div className="text-slate-500">
            © 2026 ROBOFEST // ANANTYA'26
          </div>
        </div>
      </footer>

    </div>
  );
}
