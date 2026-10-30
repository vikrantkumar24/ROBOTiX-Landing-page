# ⚔️ ROBOFEST'26 — ROBOTiX CLUB • NIT RAIPUR

<div align="center">

```
  ██████╗  ██████╗ ██████╗  ██████╗ ███████╗███████╗███████╗██████╗  ██████╗ 
  ██╔══██╗██╔═══██╗██╔══██╗██╔═══██╗██╔════╝██╔════╝██╔════╝╚════██╗██╔════╝ 
  ██████╔╝██║   ██║██████╔╝██║   ██║█████╗  █████╗  ███████╗ █████╔╝███████╗ 
  ██╔══██╗██║   ██║██╔══██╗██║   ██║██╔══╝  ██╔══╝  ╚════██║██╔═══╝ ██╔═══██╗
  ██║  ██║╚██████╔╝██████╔╝╚██████╔╝██║     ███████╗███████║███████╗╚██████╔╝
  ╚═╝  ╚═╝ ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝     ╚══════╝╚══════╝╚══════╝ ╚═════╝ 
```

**CENTRAL INDIA'S PREMIER ROBOTICS CONVENTION & COMBAT TOURNAMENT**  
*Presented by ROBOTiX Club, National Institute of Technology Raipur*

[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.x-black?style=for-the-badge&logo=framer&logoColor=blue)](https://motion.dev/)
[![Vercel Ready](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

[**Live Demo**](https://ais-pre-2odm272av6xf2cl2qwhywr-764573346818.asia-southeast1.run.app) • [**Explore Arenas**](#-tournament-arenas) • [**Rulebooks & Dossier**](#-tactical-intel--rule-dossiers) • [**Deployment Guide**](#-deployment-to-vercel--production)

</div>

---

## 📌 Overview

**ROBOFEST'26** is the flagship annual technical robotics symposium organized by the **ROBOTiX Club** at the **National Institute of Technology (NIT) Raipur**. Featuring a ₹90,000+ prize pool, the convention gathers hundreds of elite robotics engineers, battlebot pilots, drone researchers, and AI developers from across the country to compete in high-stakes kinetic battles, 24-hour simulation hackathons, and autonomous navigation challenges.

This repository powers the official, high-performance web portal for ROBOFEST'26. Built with a bespoke **cyber-tactical industrial aesthetic**, it delivers an immersive experience mimicking military-grade telemetry HUDs, motorized blast doors, and custom Web Audio acoustic feedback.

---

## ⚡ Key Highlights & Architecture

### 🛡️ Kinetic Blast Door Gateway Hero
- **Physics-Linked Scroll Gate**: Utilizes scroll-driven transforms (`framer-motion`) that smoothly slide hydraulic blast doors open and closed as visitors enter the arena.
- **Rotating Dual-Ring HUD Reticle**: Official NIT Raipur ROBOTiX emblem centered in an animated orbital reticle with cardinal calipers and hazard warning beacons.
- **Real-Time Tournament Countdown**: Live day/hour/minute/second countdown clock synced to the opening bell on **March 22, 2026**.

### 🔊 Procedural Web Audio Engine (Zero External Audio Assets)
- Built directly on the native browser **Web Audio API** (`src/utils/audioEngine.ts`).
- Generates procedural sound fx on the fly without heavy `.mp3` downloads:
  - Hydraulic servo hums on blast door triggers
  - Mechanical locking clanks
  - Low-frequency tactical sub-bass drone
  - High-frequency cybernetic clicks and interface beeps
- Global mute toggle with user preference persistence.

### 🕹️ Tactical Glitch & CRT Cyber Effects
- Custom CSS keyframe glitch animations on headers and battle-ready buttons.
- Monochromatic amber (`#ffcc00`) and crimson (`#ff3b30`) color schemes against an ultra-deep charcoal backdrop (`#050609`).
- Retro-futuristic typography utilizing **Chakra Petch** and **Space Mono**.

### 📊 Tactical Rule Dossier & Registration Matrix
- **Side-Drawer Rule Dossier**: Instant slide-out specifications panel for every combat arena with dimension limits, weight thresholds, battery safety protocols, and arena hazard schematics.
- **Dynamic Registration Matrix**: Multi-track entry filter with live slot counters and automated form dispatch.
- **Reach & Historical Archive**: Interactive statistics showcasing 2,500+ participants, 45+ premier institutions, and 120+ battlebots.

---

## 🏟️ Tournament Arenas

| Rank | Event Name | Category | Weight Class | Prize Pool | Highlights |
|:---:|:---|:---|:---|:---:|:---|
| **01** | **ROBOWAR** | Combat Robotics | 8.0 kg (±5%) | **₹10,000** | Full-contact kinetic warfare, titanium spinning drums, 16x16 ft polycarbonate arena with active hazard spikes. |
| **02** | **ROBOTHON** | Simulation & AI | Swarm / Sim | **₹35,000** | 24-hour non-stop autonomous rover, swarm drone, and computer-vision robotics hackathon. |
| **03** | **MAZE RUNNER** | Autonomous Systems | Micro / Mini | **₹15,000** | High-speed PID micromouse and infrared line-maze navigation with dynamic dynamic obstacle rerouting. |
| **04** | **ROBORACE** | Speed & Agility | 5.0 kg | **₹15,000** | Multi-terrain obstacle time-trial featuring gravel, water hazards, ramps, and elevated chicanes. |
| **05** | **DRONE SWARM** | Aerial Robotics | Sub-250g | **₹15,000** | FPV tactical drone agility trials, aerial ring gates, and autonomous payload air-drops. |

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Tooling**: [Vite 6](https://vitejs.dev/) with Fast Refresh
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom `@import "tailwindcss";` config
- **Animations & Physics**: [Framer Motion](https://motion.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Audio Synthesis**: Native Browser [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- **Deployment Platform**: Vercel / Netlify / Self-hosted Docker

---

## 📁 Repository Structure

```tree
robofest26/
├── public/
│   ├── assets/
│   │   └── aistudio/
│   │       ├── image_66ed7668.png   # Official ROBOTiX Club NIT Raipur Emblem
│   │       ├── image_8c227361.png   # Cybernetic Battlebot Armor Visual
│   │       └── ...                  # Event and arena assets
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── renders/
│   │   │   ├── RobowarCombatRender.tsx  # Dynamic 2D/3D arena combat simulation view
│   │   │   └── SwarmDroneRender.tsx     # Autonomous swarm drone HUD display
│   │   ├── AlbumSection.tsx             # Photo archive & legacy gallery
│   │   ├── ArenasDossier.tsx            # Combat tracks grid & specs
│   │   ├── GatewayHero.tsx              # Hydraulic blast door & main gateway
│   │   ├── IndustrialFooter.tsx         # Tactical footer, club info & social links
│   │   ├── IntelSection.tsx             # Glitch-accented festival breakdown
│   │   ├── OurReachSection.tsx          # Key metrics, footprint & university reach
│   │   ├── RegistrationMatrix.tsx       # Live registration terminal
│   │   ├── TacticalHeader.tsx           # Floating navigation bar with audio toggle
│   │   └── TacticalRuleDrawer.tsx       # Slide-out rulebook & telemetry specs
│   ├── data/
│   │   └── robofestData.ts              # Arenas, rules, prizes, and schedule data
│   ├── utils/
│   │   └── audioEngine.ts               # Procedural Web Audio synthesizer engine
│   ├── App.tsx                          # Root application container
│   ├── main.tsx                         # Entry point
│   └── index.css                        # Cyberpunk scanlines, glitch classes & Tailwind
├── index.html                           # SEO meta tags, OpenGraph & Chakra Petch fonts
├── package.json                         # Dependencies & scripts
├── tsconfig.json                        # Strict TypeScript configuration
├── vercel.json                          # Single-page-app rewrite rules for Vercel
└── vite.config.ts                       # Vite build configuration
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** (v9+) or **pnpm** or **bun**

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/robofest26-nit-raipur.git
cd robofest26-nit-raipur
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000` to access the portal.

### 4. Build for Production
```bash
npm run build
```
The compiled, production-ready static assets will be output to the `dist/` directory.

---

## 🌐 Deployment to Vercel & Production

### Deploying to Vercel (1-Click)
1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Keep the default settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. The included `vercel.json` automatically handles client-side routing rewrites:
   ```json
   {
     "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
   }
   ```
6. Click **Deploy**. Your site will be live with high availability and global CDN caching.

---

## 🎨 Customizing Assets & Club Links

To rebrand or update this portal for your specific club chapter or annual edition:

1. **Club Emblem**:
   - Place your SVG or high-res PNG into `public/assets/`
   - Update references in `src/components/TacticalHeader.tsx`, `src/components/GatewayHero.tsx`, and `index.html`.
2. **Arena Data & Prizes**:
   - Edit `src/data/robofestData.ts` to modify prize amounts, rule sets, dimensions, and schedules.
3. **Sound Effects**:
   - Audio frequencies, oscillator waveforms, and durations can be tuned inside `src/utils/audioEngine.ts`.

---

## 👥 Organization & Contact

**ROBOTiX Club, National Institute of Technology Raipur**  
G.E. Road, Raipur, Chhattisgarh, India — 492010  

- 🌐 **Website**: [nitrr.ac.in](https://nitrr.ac.in)
- 📧 **Official Inquiries**: `robotixclub@nitrr.ac.in`
- 📷 **Instagram**: [@robotix_nitrr](https://instagram.com/robotix_nitrr)
- 💼 **LinkedIn**: [ROBOTiX Club NIT Raipur](https://linkedin.com/company/robotix-club-nit-raipur)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — free to use and adapt for collegiate technical societies and open robotics festivals.

<div align="center">
  <sub>Engineered with precision for <strong>ROBOFEST'26</strong> • National Institute of Technology Raipur</sub>
</div>
