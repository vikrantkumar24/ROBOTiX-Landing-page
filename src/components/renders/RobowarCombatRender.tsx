import React, { useState, useEffect } from 'react';
import { Flame, Crosshair, Zap, Gauge, AlertTriangle, ShieldAlert } from 'lucide-react';
import { sound } from '../../utils/audioEngine';

export const RobowarCombatRender: React.FC = () => {
  const [rpm, setRpm] = useState(9840);
  const [kineticEnergy, setKineticEnergy] = useState(3420);
  const [hazardSpikeActive, setHazardSpikeActive] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setRpm(prev => 9700 + Math.floor(Math.random() * 280));
      setKineticEnergy(prev => 3380 + Math.floor(Math.random() * 90));
      if (Math.random() > 0.7) {
        setHazardSpikeActive(s => !s);
      }
    }, 400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full min-h-[220px] sm:min-h-[260px] bg-[#030407] rounded-none overflow-hidden border border-[#ff3b30]/50 select-none">
      
      {/* Background Smoky Arena & Industrial Steel Plate Floor */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#ff3b30]/20 via-[#0a0606] to-[#040508] pointer-events-none" />
      <div className="absolute inset-0 radar-grid opacity-35 pointer-events-none" />

      {/* Arena Diamond Plate Floor Grid */}
      <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="diamond-plate" width="20" height="20" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="20" y2="20" stroke="#ff3b30" strokeWidth="0.5" strokeOpacity="0.3" />
            <line x1="20" y1="0" x2="0" y2="20" stroke="#ff3b30" strokeWidth="0.5" strokeOpacity="0.3" />
            <circle cx="10" cy="10" r="1.5" fill="#ffcc00" fillOpacity="0.4" />
          </pattern>
          <linearGradient id="laser-fire" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff3b30" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#ff9900" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#ffcc00" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#diamond-plate)" />
      </svg>

      {/* Arena Ballistic Polycarbonate Shield Perimeter Lighting */}
      <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-[#ff3b30]/30 to-transparent flex justify-between px-4 py-1 text-[9px] font-mono text-[#ffcc00] border-b border-[#ff3b30]/40">
        <span>● BALLISTIC ENCLOSURE: 12MM POLYCARBONATE</span>
        <span className="text-[#00FF66] font-bold">INTERLOCK LOCKED</span>
      </div>

      {/* Main 8KG Combat Robot In Arena (Render) */}
      <div className="absolute inset-0 flex items-center justify-center">
        
        {/* Kinetic Collision Impact Flash / Sparks Container */}
        <div className="relative w-72 sm:w-96 h-40 flex items-center justify-center">
          
          {/* Floor Hazard Spike Trap */}
          <div className={`absolute bottom-2 left-6 transition-all duration-300 ${hazardSpikeActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-40'}`}>
            <div className="flex items-end gap-1">
              <div className="w-2.5 h-8 bg-gradient-to-t from-slate-600 to-slate-200 clip-chamfer-sm" />
              <div className="w-3 h-11 bg-gradient-to-t from-[#ff3b30] to-yellow-300 clip-chamfer-sm shadow-[0_0_15px_#ff3b30]" />
              <div className="w-2.5 h-7 bg-gradient-to-t from-slate-600 to-slate-200 clip-chamfer-sm" />
            </div>
            <span className="text-[7px] font-mono text-[#ff3b30] block -mt-1 font-bold">HAZARD SPIKE</span>
          </div>

          {/* Opponent Bot Debris / Secondary bot */}
          <div className="absolute right-4 bottom-5 opacity-70">
            <svg viewBox="0 0 60 40" className="w-16 h-12">
              <polygon points="10,35 50,35 40,15 15,15" fill="#181b22" stroke="#64748b" strokeWidth="1.5" />
              <rect x="5" y="25" width="8" height="12" fill="#334155" />
              <rect x="47" y="25" width="8" height="12" fill="#334155" />
              <line x1="20" y1="20" x2="35" y2="10" stroke="#ff3b30" strokeWidth="2" strokeDasharray="2 2" />
            </svg>
          </div>

          {/* High-Octane 8KG Combat Robot Chassis */}
          <div className="relative z-10 flex flex-col items-center">
            
            {/* Flying Kinetic Sparks Burst */}
            <div className="absolute -top-3 -right-6 pointer-events-none">
              <div className="w-2 h-2 rounded-full bg-yellow-300 shadow-[0_0_15px_#ffcc00] animate-ping" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#ff3b30] shadow-[0_0_10px_#ff3b30] animate-pulse" />
              <div className="w-1 h-6 bg-gradient-to-b from-yellow-300 to-transparent rotate-45 transform origin-top-left opacity-80" />
              <div className="w-1 h-8 bg-gradient-to-b from-[#ff3b30] to-transparent -rotate-30 transform origin-top-left opacity-90" />
            </div>

            {/* Heavy Chassis SVG Render */}
            <svg viewBox="0 0 160 90" className="w-48 sm:w-60 h-28 sm:h-36 drop-shadow-[0_10px_25px_rgba(255,59,48,0.65)]">
              {/* Outer Shadow & Ground Glow */}
              <ellipse cx="80" cy="75" rx="65" ry="12" fill="#ff3b30" fillOpacity="0.25" />

              {/* Side Drive Pods / Tank Tracks */}
              <rect x="10" y="32" width="18" height="42" rx="3" fill="#0c0e15" stroke="#475569" strokeWidth="1.5" />
              <line x1="10" y1="42" x2="28" y2="42" stroke="#334155" />
              <line x1="10" y1="52" x2="28" y2="52" stroke="#334155" />
              <line x1="10" y1="62" x2="28" y2="62" stroke="#334155" />

              <rect x="132" y="32" width="18" height="42" rx="3" fill="#0c0e15" stroke="#475569" strokeWidth="1.5" />
              <line x1="132" y1="42" x2="150" y2="42" stroke="#334155" />
              <line x1="132" y1="52" x2="150" y2="52" stroke="#334155" />
              <line x1="132" y1="62" x2="150" y2="62" stroke="#334155" />

              {/* Heavy AR500 Steel Main Hull (Angled Sloped Armor) */}
              <polygon points="26,38 134,38 142,74 18,74" fill="#0f141e" stroke="#ff3b30" strokeWidth="2.5" />
              <polygon points="34,44 126,44 132,68 28,68" fill="#182030" stroke="#ffcc00" strokeWidth="1.2" />

              {/* Titanium Spinning Drum Weapon (Rotating Glowing Disc) */}
              <g className="animate-spin origin-[80px_24px]" style={{ animationDuration: '0.18s' }}>
                <circle cx="80" cy="24" r="20" fill="#111827" stroke="#ff3b30" strokeWidth="2.5" />
                <rect x="76" y="4" width="8" height="40" rx="2" fill="url(#laser-fire)" />
                <rect x="60" y="20" width="40" height="8" rx="2" fill="url(#laser-fire)" />
                <circle cx="80" cy="24" r="7" fill="#ffcc00" />
              </g>

              {/* Weapon Guard Bracket */}
              <path d="M54,24 L70,38 L90,38 L106,24" fill="none" stroke="#64748b" strokeWidth="2.5" />

              {/* Status Optical Failsafe Beacon */}
              <circle cx="80" cy="56" r="3.5" fill="#00FF66" className="animate-pulse" />
              <circle cx="80" cy="56" r="6" stroke="#00FF66" strokeWidth="1" fill="none" />

              {/* Bolt Rivets */}
              <circle cx="34" cy="42" r="1.5" fill="#94a3b8" />
              <circle cx="126" cy="42" r="1.5" fill="#94a3b8" />
              <circle cx="26" cy="70" r="1.5" fill="#94a3b8" />
              <circle cx="134" cy="70" r="1.5" fill="#94a3b8" />
            </svg>
          </div>

        </div>
      </div>

      {/* Bottom Tactical Telemetry HUD Overlay */}
      <div className="absolute inset-x-0 bottom-0 bg-[#08090f]/95 border-t border-[#1f2433] px-3 sm:px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[#ff3b30] font-bold">
            <Gauge className="w-3.5 h-3.5 text-[#ff3b30]" />
            <span>DRUM RPM:</span>
            <span className="text-white text-xs tabular-nums">{rpm.toLocaleString()}</span>
          </div>
          <span className="text-slate-600">/</span>
          <div className="flex items-center gap-1.5 text-[#ffcc00] font-bold">
            <Zap className="w-3.5 h-3.5 text-[#ffcc00]" />
            <span>KINETIC JOULES:</span>
            <span className="text-white text-xs tabular-nums">{kineticEnergy} J</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-slate-400">
          <span className="flex items-center gap-1 text-[#00FF66]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse" />
            <span>FAILSAFE: ARMED</span>
          </span>
          <span className="hidden sm:inline text-slate-500">| 24V 6S LIPO ACTIVE</span>
        </div>
      </div>

    </div>
  );
};
