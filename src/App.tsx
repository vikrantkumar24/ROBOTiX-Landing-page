/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TacticalHeader } from './components/TacticalHeader';
import { GatewayHero } from './components/GatewayHero';
import { IntelSection } from './components/IntelSection';
import { ArenasDossier } from './components/ArenasDossier';
import { AlbumSection } from './components/AlbumSection';
import { OurReachSection } from './components/OurReachSection';
import { TacticalRuleDrawer } from './components/TacticalRuleDrawer';
import { RegistrationMatrix } from './components/RegistrationMatrix';
import { IndustrialFooter } from './components/IndustrialFooter';
import { ARENAS_DATA, ArenaCompetition } from './data/robofestData';
import { sound } from './utils/audioEngine';

export default function App() {
  const [audioMuted, setAudioMuted] = useState(false);
  const [selectedRuleArena, setSelectedRuleArena] = useState<ArenaCompetition | null>(ARENAS_DATA[0]);
  const [isRuleDrawerOpen, setIsRuleDrawerOpen] = useState(false);
  const [preselectedArenaId, setPreselectedArenaId] = useState<string>('robowar');

  const handleToggleAudio = () => {
    const nextState = !audioMuted;
    setAudioMuted(nextState);
    sound.isMuted = nextState;
  };

  const scrollToRegistration = (arenaId?: string) => {
    if (arenaId) {
      setPreselectedArenaId(arenaId);
    }
    const el = document.getElementById('register');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToArenas = () => {
    const el = document.getElementById('arenas');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenRuleDrawer = (arena?: ArenaCompetition) => {
    if (arena) setSelectedRuleArena(arena);
    setIsRuleDrawerOpen(true);
  };

  const handleDownloadRulebook = () => {
    sound.playBlip(700);
    const rulebook = `
======================================================================
               ROBOFEST'26 // OFFICIAL COMBAT RULEBOOK
             ROBOTiX CLUB • NIT RAIPUR (ESTABLISHED 1956)
======================================================================

CONVENTION DATES:  22 - 23 MARCH 2026
BASE ARENA:        NIT RAIPUR CAMPUS, G.E. ROAD, RAIPUR, CHHATTISGARH
COORDINATES:       21.2497° N, 81.6050° E
TOTAL PRIZE POOL:  ₹90,000+ CASH DISPATCH & GOODIES

OFFICIAL ARENA BREAKDOWN & DIRECTIVES:
----------------------------------------------------------------------
01. ROBOWAR // 8KG COMBAT ARENA
    - Schedule: 22 March // 2:00 PM - 6:00 PM
    - Prize Pool: ₹10,000
    - Mass Limit: 8.0 kg (±5% tolerance at weigh-in)
    - Enclosure: 16x16 ft diamond-plate steel, 12mm ballistic polycarbonate
    - Weapons: Titanium spinning drums, vertical discs, pneumatic wedges (10,000 RPM)
    - Failsafe Rule: Weapon must de-energize to 0 RPM within 1.0 second of RF loss

02. ROBOTHON // 24-HOUR AUTONOMOUS SIMULATION HACKATHON
    - Schedule: 22 - 23 March // 24 Hours Non-Stop
    - Prize Pool: ₹35,000
    - Tracks: GPS-denied Swarm Drones, Benthic Underwater, Rough Terrain Hexapods
    - Engine: ROS2 Humble, Gazebo Garden, Webots with GPU CUDA clusters

03. ROBORACE // KINETIC SPEED & OBSTACLE TRACK
    - Schedule: 23 March // 10:00 AM - 2:00 PM
    - Prize Pool: ₹10,000
    - Dimensions: 25 x 25 x 25 cm strict box limit | Mass: 5.0 kg max
    - Circuit: 85m multi-terrain with oil chicanes, gravel bed, and bridge ramp

04. ROBOSOCCER // MECHATRONIC STRIKER SHOWDOWN
    - Schedule: 23 March // 2:50 PM - 6:00 PM
    - Prize Pool: ₹10,000
    - Dimensions: 30 x 30 x 30 cm | Mass: 5.0 kg | Matches: 2.5 min rounds
    - Regulation synthetic turf pitch with electronic IR goal lines

05. VIBECODING // EMBEDDED HARDWARE CODING
    - Schedule: 22 March // 10:00 AM - 2:00 PM
    - Prize Pool: ₹12,000
    - Architecture: Bare-metal C/C++, FreeRTOS, STM32, ESP32, Verilog FPGA
    - Workstation: Rigol oscilloscopes, DC power supplies & Weller irons provided

06. IDEATHON // TECH INNOVATION PITCH
    - Schedule: 23 March // 2:00 PM - 6:00 PM
    - Prize Pool: ₹15,000
    - Format: 10-Min pitch + working physical prototype demo
    - Direct incubation grant fast-track via NIT Raipur Innovation Cell

07. ROBOQUIZ // ROBOTICS & ELECTRONICS QUIZ
    - Schedule: 22 March // 2:30 PM Onwards
    - Prize Pool: ₹6,000 goodies & dev kits
    - Format: 2 offline knockout rounds with electronic buzzer podiums

SCRUTINEERING RULES & DISQUALIFICATIONS:
- All machines undergo digital scale weigh-in and RF radio isolation testing.
- Banned weapons: Entanglement nets, EMP emitters, tethered liquids, open flames.
- Any bot failing the 1.0s failsafe power-cut test is immediately disqualified.

RADIO HELPDESK: robotix@nitrr.ac.in
CAMPUS COMMS: +91 771 2254200 (NITRR EXT)
======================================================================
`;

    const blob = new Blob([rulebook], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ROBOFEST26_OFFICIAL_COMBAT_RULEBOOK.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#050609] text-[#f5f5f7] flex flex-col selection:bg-[#ff3b30]/30 selection:text-[#ffcc00]">
      
      {/* Tactical Sticky Navigation Bar */}
      <TacticalHeader
        onDeployBotClick={(arenaId) => scrollToRegistration(arenaId)}
        onInspectArenaRule={(arena) => handleOpenRuleDrawer(arena)}
        onDownloadRulebook={handleDownloadRulebook}
        audioMuted={audioMuted}
        onToggleAudio={handleToggleAudio}
      />

      <main className="flex-1">
        {/* Gateway Entrance Hero: Steel Gates closed at start, parts on scroll to reveal fire arena & pinned bot showcase */}
        <GatewayHero
          onEnterArenas={scrollToArenas}
          onDeployBot={(arenaId) => scrollToRegistration(arenaId)}
          onDownloadRulebook={handleDownloadRulebook}
          onInspectArena={(arena) => handleOpenRuleDrawer(arena)}
        />

        {/* Section 01: Mission Intel & ROBOTiX Club Legacy */}
        <IntelSection />

        {/* Section 02: Competitions / 7 Arenas Dossier */}
        <ArenasDossier
          onRegisterArena={(arenaId) => scrollToRegistration(arenaId)}
          onInspectRules={(arena) => handleOpenRuleDrawer(arena)}
        />

        {/* Section 03: Official Tournament Combat Album */}
        <AlbumSection />

        {/* Section 04: Our Reach & Battleground Encounters */}
        <OurReachSection />

        {/* Section 05: Pilot Onboarding & Squad Registration Matrix */}
        <RegistrationMatrix
          preselectedArenaId={preselectedArenaId}
        />
      </main>

      {/* Industrial Red-Gradient Footer */}
      <IndustrialFooter />

      {/* Slide-out Tactical Rule & Tolerances Drawer */}
      <TacticalRuleDrawer
        arena={selectedRuleArena}
        isOpen={isRuleDrawerOpen}
        onClose={() => setIsRuleDrawerOpen(false)}
        onRegister={(arenaId) => {
          setIsRuleDrawerOpen(false);
          scrollToRegistration(arenaId);
        }}
      />

    </div>
  );
}
