# ROBOFEST 2026: Industrial Combat Robotics Tournament Landing Page

Transform the ROBOFEST landing page into an aggressive, high-octane esports and industrial combat robotics tournament portal inspired by Techfest Robowars, featuring an angular chamfered tactical HUD, CRT scanline overlays, hazard caution stripes, interactive arena dossiers, Web Audio synthesized tactical feedback, and a pilot onboarding registration matrix.

> [!IMPORTANT]
> **Confirmed User Decisions:**
> - **Tactical Audio Feedback**: Enabled subtle Web Audio API synthesized cyber/hydraulic sound effects (mechanical ticks, radar hums, hydraulic engagement chimes) with a top-bar tactical MUTE / UNMUTE toggle.
> - **Arena Inspection Mode**: Interactive split-screen arena switcher on desktop with an aggressive tactical slide-out inspection drawer for detailed rules, bot safety envelopes, and weapon constraints.
> - **Anti-SaaS Aesthetic**: Hard, angular chamfered corners (`clip-path: polygon(...)`), hazard caution stripes (`repeating-linear-gradient`), pitch black `#050507`, hazard orange/crimson (`#FF3B30`), industrial yellow (`#FFCC00`), and zero soft pill buttons.

---

### 1. Overview & Core Concept

- **Concept**: A dark, militarized combat robotics tournament portal for ROBOFEST, presented by ROBOTiX Club • NIT Raipur on 22–23 March.
- **Audience**: Collegiate robotics engineers, combat bot fabricators, drone researchers, embedded systems builders, and tech festival spectators.
- **Key Value**: Delivers the adrenaline of Techfest Robowars with fast combat intel retrieval, live interactive bot telemetry, instant arena dossier switching, and frictionless team registration.

---

### 2. User Experience & Visual Design

#### Visual Identity & Styling
- **Canvas & Background**: Pitch black (`#050507`), industrial SVG dot-matrix grid, and CRT scanline overlay (`repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, transparent 1px, transparent 2px, rgba(0,0,0,0.15) 3px)`).
- **Color Palette**:
  - Hazard Crimson / Orange: `#FF3B30` / `#FF5500` (primary accents, weapon warnings, active arena states)
  - Industrial Caution Yellow: `#FFCC00` (caution striping, telemetry callouts, prize badges)
  - Gunmetal & Carbon Slate: `#0A0B0E`, `#0F1117`, `#181B22` (tactical panels, borders)
  - Electric Cyan & Emerald Accents: `#00F2FE` (radar telemetry), `#00FF66` (live armed status)
  - Bone White & Monospace Text: `#F5F5F7` headers, Space Mono tabular data
- **Geometry & Borders**:
  - Chamfered cut corners via CSS clip-path: `polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))`
  - Sharp, technical hairline borders, crosshair corner markers (`+`), and diagonal hazard caution stripes on button hovers.
  - Zero soft pill buttons or generic SaaS cards.
- **Audio Feedback (Synthesized Web Audio API)**:
  - Hydraulic actuator sound on arena switch
  - High-frequency laser blip on tab selection
  - Low-frequency confirmation pulse on registration dispatch
  - Dedicated sound toggle `[ AUDIO: ON/OFF ]` in top telemetry bar.

#### Page Sections & Flow

1. **Tactical Sticky Header**:
   - Left: `ROBOTiX CLUB [NITRR]` in monospace bold with blinking emerald telemetry dot (`● SYSTEM ARMED`).
   - Center: Tracked military index links: `[ 01. INTEL ]`, `[ 02. ARENAS ]`, `[ 03. RULEBOOKS ]`, `[ 04. REGISTER ]`.
   - Right: Sound toggle and chamfer-cut CTA button: `ENTER THE ARENA [REC]`.

2. **Hero Section (High-Octane Combat)**:
   - Micro-kicker: `SECTOR 22-23 MARCH // CENTRAL INDIA'S LARGEST BOT COMBAT`.
   - Massive condensed typography with overlapping brutalist text:
     ```
     ROBOFEST
     WHERE METAL BENDS.
     ```
   - Real-time animated audio-frequency oscilloscope / telemetry HUD waveform canvas behind the headline.
   - Dual action panel:
     - Primary: Heavy hazard button with diagonal caution stripes on hover (`REGISTER TEAM // ENTER`).
     - Secondary: `DOWNLOAD BRIEFING PDF / INTEL` with technical wireframe icon.
   - Live continuous marquee ticker:
     `₹90,000+ COMBAT PRIZE POOL • 24HR ROBOTHON • 8KG COMBAT ROBOWARS • ROBORACE • ROBOSOCCER • VIBECODING • IDEATHON • NIT RAIPUR ARENA •`

3. **Intel & Club Legacy (Section 01)**:
   - Briefing on ROBOTiX Club NIT Raipur (est. 1956) combat heritage, 24/7 technical pits, and machining capabilities.
   - 4 Tactical Division Cards with chamfered frames: Autonomous Systems, Kinetic Combat, Embedded Firmware, Venture Prototyping.

4. **The Arenas: Techfest Interactive Switcher (Section 02 & 03)**:
   - **Left Panel**: Ranked competition selector:
     - `01. ROBOWAR // 8KG Combat Arena` (Kinetic destruction, spinning drums)
     - `02. ROBOTHON // 24H Simulation Hackathon` (Swarm drones & rovers)
     - `03. ROBORACE // Speed Obstacle Track` (25x25x25 cm, 5kg sprint)
     - `04. ROBOSOCCER // Mechanical Striker Showdown` (30x30x30 cm dual strikers)
     - `05. VIBECODING // Embedded Hardware Hack` (Arduino/ESP/FPGA live firmware)
     - `06. IDEATHON // Robotics Venture Pitch` (Physical prototypes)
   - **Right Panel (Combat Dossier)**:
     - High-detail technical dossier of the hovered/selected arena.
     - Live weapon/mobility specs, arena hazard traps, match rounds (e.g. 3-min combat heats), cash prize callout (`₹35,000`, `₹10,000`), and interactive bot schematic wireframe.
     - `INSPECT RULES` action button opening the slide-out tactical drawer.
   - **Slide-Out Inspection Drawer**:
     - Full technical rulebook, dimensional envelopes, allowed vs banned weaponry, radio failsafe lockout requirements, and scoring matrix.

5. **Tactical Registration Matrix (Section 04)**:
   - Pilot / Team onboarding portal aesthetic.
   - Fields:
     - `CALLSIGN / TEAM NAME`
     - `PILOT / LEADER NAME`
     - `TRANSMISSION / EMAIL` & `SECURE COMMS / PHONE`
     - `AFFILIATION / COLLEGE` (with quick-fill chips for NIT Raipur, IIT Bhilai, IIIT-NR, CSVTU, BIT Durg)
     - `TACTICAL DIVISION [SELECT EVENT]`
     - Dynamic crew size selector (1 to 4 pilots)
     - Mandatory Checkbox: `"Confirm bot adheres to safety & radio isolation protocols"`
   - Submit action: `AUTHORIZE REGISTRATION`.
   - On submission: Issues a military-grade Combat Pilot License / Dispatch Ticket with barcode rendering, Pass ID, and `.txt` clearance certificate download.

6. **Industrial Footer**:
   - Geolocation coordinates: `NIT RAIPUR // 21.2497° N, 81.6050° E`.
   - Official ROBOTiX Club institutional badge, emergency radio comms (`robotix@nitrr.ac.in`), and bracketed social channels: `[INSTAGRAM]`, `[LINKEDIN]`, `[GITHUB]`.
   - Terminal footer status: `● STATUS: ARENA TELEMETRY ONLINE`.

---

### 3. Key Product Decisions & Trade-Offs

- **Chamfered Clip-Path Geometry**:
  - *Decision*: Apply custom CSS utility `.tactical-chamfer` using `clip-path: polygon(...)` and custom border pseudoelements instead of default Tailwind `rounded-2xl` cards.
  - *Why*: Eliminates the "soft SaaS" look and establishes an authentic defense/esports combat terminal aesthetic.
- **Client-Side Web Audio Synthesizer**:
  - *Decision*: Lightweight Web Audio API generator (synthesizing gentle square/sawtooth beeps and white-noise clicks) with zero external audio assets.
  - *Why*: Zero network latency, 100% offline reliability, no 404 audio assets, and instant mute toggle compliance.
- **Interactive Split Dossier**:
  - *Decision*: Side-by-side terminal list + active dossier view on desktop, stacking seamlessly on mobile.
  - *Why*: Directly mirrors Techfest Robowars tournament dossiers where viewers can flick through weapon classes instantly.

---

### 4. Technical Architecture & Component Mapping

```
┌──────────────────────────────────────────────────────────────┐
│                      App.tsx Root View                       │
│  - Active Arena State     - Audio Engine Hook (Mute/Play)    │
│  - Registration Drawer    - Rulebook Slide-Out Drawer State  │
└──────────────────────────────┬───────────────────────────────┘
                               │
       ┌───────────────────────┼────────────────────────┐
       ▼                       ▼                        ▼
┌───────────────┐     ┌──────────────────┐     ┌─────────────────┐
│ TacticalHeader│     │   HeroSection    │     │  ArenasDossier  │
│ - Telemetry   │     │ - Kinetic Title  │     │ - Ranked List   │
│ - Armed Dot   │     │ - Audio Wave HUD │     │ - Dynamic Panel │
│ - Audio Mute  │     │ - Hazard Marquee │     │ - Rule Drawer   │
└───────────────┘     └──────────────────┘     └─────────────────┘
                               │
       ┌───────────────────────┴────────────────────────┐
       ▼                                                ▼
┌─────────────────────────┐                  ┌───────────────────┐
│   RegistrationMatrix    │                  │  IndustrialFooter │
│ - Pilot Onboarding Form │                  │ - GPS Coordinates │
│ - Radio Safety Checkbox │                  │ - Comms & Socials │
│ - Dispatch License Pass │                  │ - Arena Telemetry │
└─────────────────────────┘                  └───────────────────┘
```

### 5. Verification Plan

- `compile_applet` & `lint_applet` to confirm clean TypeScript build with zero errors.
- Visual inspection of chamfered angles, scanlines, caution hover stripes, and responsive layouts.
- Functional check of Web Audio synthesis, interactive arena switcher, rulebook slide-out, and registration pass generation.
