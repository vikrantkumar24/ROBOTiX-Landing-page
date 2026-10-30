import React from 'react';
import { Trophy, Users, Award, Shield } from 'lucide-react';
import { sound } from '../utils/audioEngine';

export const OurReachSection: React.FC = () => {
  return (
    <section id="reach" className="relative w-full bg-[#050609] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#1f2433] radar-grid overflow-hidden">
      
      {/* PERSISTENT SCANLINES */}
      <div className="absolute inset-0 crt-scanline-overlay pointer-events-none opacity-20" />

      {/* AMBIENT RADIAL LIGHTING */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-[#ff3b30]/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ff3b30]/15 border border-[#ff3b30]/50 text-[#ff3b30] font-mono text-xs uppercase tracking-widest clip-chamfer-sm mb-2">
            <Trophy className="w-3.5 h-3.5 text-[#ffcc00]" />
            <span>CENTRAL INDIA'S PREMIER ROBOTICS CONVENTION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white uppercase drop-shadow-[0_4px_25px_rgba(255,59,48,0.4)]">
            TOURNAMENT BENCHMARKS
          </h2>
          <p className="text-slate-400 font-mono text-xs mt-1">
            Uniting combat squads and roboticists across the subcontinent.
          </p>
        </div>

        {/* 4 PUNCHY STAT CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
          
          {/* STAT 1 */}
          <div 
            onMouseEnter={() => sound.playBlip(600)}
            className="p-5 bg-[#0c0e15] border border-[#ff3b30]/40 hover:border-[#ff3b30] rounded-xl text-center transition-all duration-300 hover:scale-[1.02] shadow-[0_8px_25px_rgba(0,0,0,0.6)]"
          >
            <div className="text-3xl sm:text-4xl font-black font-display text-white">
              ₹90K+
            </div>
            <div className="text-[10px] sm:text-xs font-mono text-[#ffcc00] font-bold uppercase tracking-wider mt-1">
              PRIZE POOL
            </div>
          </div>

          {/* STAT 2 */}
          <div 
            onMouseEnter={() => sound.playBlip(700)}
            className="p-5 bg-[#0c0e15] border border-[#ffcc00]/40 hover:border-[#ffcc00] rounded-xl text-center transition-all duration-300 hover:scale-[1.02] shadow-[0_8px_25px_rgba(0,0,0,0.6)]"
          >
            <div className="text-3xl sm:text-4xl font-black font-display text-white">
              2,000+
            </div>
            <div className="text-[10px] sm:text-xs font-mono text-[#ffcc00] font-bold uppercase tracking-wider mt-1">
              SPECTATORS
            </div>
          </div>

          {/* STAT 3 */}
          <div 
            onMouseEnter={() => sound.playBlip(800)}
            className="p-5 bg-[#0c0e15] border border-[#ff3b30]/40 hover:border-[#ff3b30] rounded-xl text-center transition-all duration-300 hover:scale-[1.02] shadow-[0_8px_25px_rgba(0,0,0,0.6)]"
          >
            <div className="text-3xl sm:text-4xl font-black font-display text-white">
              50+
            </div>
            <div className="text-[10px] sm:text-xs font-mono text-[#ffcc00] font-bold uppercase tracking-wider mt-1">
              COLLEGIATE SQUADS
            </div>
          </div>

          {/* STAT 4 */}
          <div 
            onMouseEnter={() => sound.playBlip(900)}
            className="p-5 bg-[#0c0e15] border border-[#ffcc00]/40 hover:border-[#ffcc00] rounded-xl text-center transition-all duration-300 hover:scale-[1.02] shadow-[0_8px_25px_rgba(0,0,0,0.6)]"
          >
            <div className="text-3xl sm:text-4xl font-black font-display text-white">
              24 HRS
            </div>
            <div className="text-[10px] sm:text-xs font-mono text-[#ffcc00] font-bold uppercase tracking-wider mt-1">
              NON-STOP SPRINT
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
