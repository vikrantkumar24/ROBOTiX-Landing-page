import React, { useState } from 'react';
import { 
  Trophy, 
  Shield, 
  Clock, 
  Weight, 
  ArrowRight, 
  Crosshair, 
  Zap, 
  Gauge,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { ARENAS_DATA, ArenaCompetition } from '../data/robofestData';
import { sound } from '../utils/audioEngine';
import { RobowarCombatRender } from './renders/RobowarCombatRender';
import { SwarmDroneRender } from './renders/SwarmDroneRender';

interface ArenasDossierProps {
  onRegisterArena: (arenaId: string) => void;
  onInspectRules: (arena: ArenaCompetition) => void;
}

export const ArenasDossier: React.FC<ArenasDossierProps> = ({
  onRegisterArena,
  onInspectRules,
}) => {
  const [selectedArenaId, setSelectedArenaId] = useState<string>('robowar');
  const [viewMode, setViewMode] = useState<'render' | 'schematic'>('render');

  const activeArena = ARENAS_DATA.find((a) => a.id === selectedArenaId) || ARENAS_DATA[0];

  const handleSelect = (arenaId: string) => {
    if (arenaId !== selectedArenaId) {
      sound.playHydraulic();
      setSelectedArenaId(arenaId);
    }
  };

  return (
    <section id="arenas" className="py-20 lg:py-24 relative bg-[#050609] border-b border-[#1f2433] radar-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-mono tracking-widest text-[#ff3b30] uppercase mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#ffcc00] animate-ping" />
              <span>[ 02. COMPETITIONS // ARENA DOSSIER ]</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display uppercase drop-shadow-[0_4px_25px_rgba(255,59,48,0.4)]">
              THE 7 BATTLEGROUNDS
            </h2>
            <p className="text-slate-400 text-xs font-mono mt-1">
              Select an arena track to view specifications and register.
            </p>
          </div>

          <div className="font-mono text-xs text-slate-300 flex items-center gap-3">
            <span className="px-3 py-1.5 bg-[#0c0e15] border border-[#ff3b30]/40 text-[#ffcc00] clip-chamfer-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ff3b30] animate-pulse" />
              <span>07 ARENAS OPERATIONAL</span>
            </span>
          </div>
        </div>

        {/* Split Viewport Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Console: Clickable List of 7 Arenas */}
          <div className="lg:col-span-5 space-y-2">
            <div className="text-[11px] font-mono tracking-widest text-slate-500 uppercase pb-2 border-b border-[#1a1e29] flex justify-between">
              <span>ARENA TRACK</span>
              <span>PRIZE POOL</span>
            </div>

            {ARENAS_DATA.map((arena) => {
              const isSelected = arena.id === selectedArenaId;

              return (
                <div
                  key={arena.id}
                  onClick={() => handleSelect(arena.id)}
                  onMouseEnter={() => {
                    if (!isSelected) sound.playBlip(550);
                  }}
                  className={`group relative p-3.5 clip-chamfer border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#0c0e15] border-[#ff3b30] shadow-[0_0_20px_rgba(255,59,48,0.3)]'
                      : 'bg-[#08090f] border-[#1a1e29] hover:border-[#ffcc00]/60 hover:bg-[#0c0e15]'
                  }`}
                >
                  {/* Left Accent indicator */}
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#ff3b30]" />
                  )}

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className={`text-lg font-black font-mono ${
                        isSelected ? 'text-[#ff3b30]' : 'text-slate-600 group-hover:text-slate-400'
                      }`}>
                        {arena.rank}
                      </span>
                      <div>
                        <div className="text-sm font-black text-white font-display tracking-tight flex items-center gap-2">
                          <span>{arena.name}</span>
                          {arena.id === 'robowar' && (
                            <span className="text-[9px] px-1.5 py-0.2 bg-[#ff3b30]/20 text-[#ff3b30] font-mono border border-[#ff3b30]/50 font-bold">
                              COMBAT
                            </span>
                          )}
                          {arena.id === 'robothon' && (
                            <span className="text-[9px] px-1.5 py-0.2 bg-[#ffcc00]/20 text-[#ffcc00] font-mono border border-[#ffcc00]/50 font-bold">
                              24H HACK
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] font-mono text-slate-400">
                          {arena.shortTag}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xs font-black font-mono text-[#ffcc00]">
                        {arena.prizePool}
                      </div>
                      <div className="text-[10px] font-mono text-slate-500">
                        {arena.timeline.split('//')[0]}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Console: Combat Dossier Panel */}
          <div className="lg:col-span-7">
            <div className="bg-[#08090f] border border-[#ff3b30]/60 p-5 sm:p-7 clip-chamfer shadow-[0_0_30px_rgba(255,59,48,0.2)]">
              
              {/* Dossier Top Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#1f2433] mb-5">
                <div>
                  <div className="text-[10px] font-mono text-[#ff3b30] flex items-center gap-1.5 font-bold tracking-widest uppercase">
                    <Crosshair className="w-3.5 h-3.5 text-[#ff3b30]" />
                    <span>DOSSIER // SECTOR {activeArena.rank}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white font-display uppercase mt-0.5">
                    {activeArena.name}
                  </h3>
                  <div className="text-xs font-mono text-[#ffcc00] mt-0.5">
                    {activeArena.tagline}
                  </div>
                </div>

                <div className="bg-[#050609] border border-[#ffcc00]/50 px-3.5 py-2 clip-chamfer-sm text-right">
                  <div className="text-[9px] font-mono text-slate-400 uppercase">PRIZE POOL</div>
                  <div className="text-xl sm:text-2xl font-black font-mono text-[#ffcc00]">
                    {activeArena.prizePool}
                  </div>
                </div>
              </div>

              {/* Bot Specs & Arena Telemetry Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 bg-[#050609] border border-[#1a1e29] mb-5 font-mono text-xs">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">SCHEDULE</div>
                  <div className="text-[11px] font-bold text-white truncate">{activeArena.timeline.split('//')[1] || activeArena.timeline}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">TEAM CREW</div>
                  <div className="text-[11px] font-bold text-[#ffcc00] truncate">{activeArena.teamSize}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">MASS LIMIT</div>
                  <div className="text-[11px] font-bold text-white truncate">{activeArena.weightClass}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">DIMENSIONS</div>
                  <div className="text-[11px] font-bold text-[#ff3b30] truncate">{activeArena.dimensions}</div>
                </div>
              </div>

              {/* View Mode Switcher: VISUAL RENDER vs TACTICAL SCHEMATIC */}
              <div className="flex items-center justify-between pb-2 mb-2">
                <div className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ffcc00]" />
                  <span>VISUAL FEED: {activeArena.name}</span>
                </div>
                <div className="flex items-center gap-1 bg-[#050609] p-0.5 border border-[#1f2433] clip-chamfer-sm">
                  <button
                    onClick={() => {
                      sound.playBlip(650);
                      setViewMode('render');
                    }}
                    className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                      viewMode === 'render'
                        ? 'bg-[#ff3b30] text-white font-bold clip-chamfer-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    RENDER
                  </button>
                  <button
                    onClick={() => {
                      sound.playBlip(650);
                      setViewMode('schematic');
                    }}
                    className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                      viewMode === 'schematic'
                        ? 'bg-[#ff3b30] text-white font-bold clip-chamfer-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    SPECS
                  </button>
                </div>
              </div>

              {/* Dynamic Schematic & Conceptual Render Display */}
              <div className="relative mb-5 overflow-hidden rounded-lg">
                {viewMode === 'render' && activeArena.id === 'robowar' && (
                  <RobowarCombatRender />
                )}

                {viewMode === 'render' && activeArena.id === 'robothon' && (
                  <SwarmDroneRender />
                )}

                {/* ROBORACE VISUAL RENDER */}
                {viewMode === 'render' && activeArena.id === 'roborace' && (
                  <div className="relative h-52 sm:h-60 bg-[#030407] border border-[#ffcc00]/50 overflow-hidden flex items-center justify-center p-4">
                    <div className="absolute inset-0 radar-grid opacity-30 pointer-events-none" />
                    <div className="absolute top-2 left-3 text-[10px] font-mono text-[#ffcc00] flex items-center gap-1.5">
                      <Gauge className="w-3.5 h-3.5 text-[#ff3b30]" />
                      <span>SPEED TELEMETRY: 45 KM/H TOP VELOCITY // BRUSHLESS DRIVE</span>
                    </div>
                    <img
                      src="/assets/aistudio/bot4_11zon_f9dcebdf.webp"
                      alt="Roborace Speed Bot"
                      className="max-h-[75%] max-w-[75%] object-contain filter drop-shadow-[0_0_20px_rgba(255,204,0,0.6)]"
                    />
                  </div>
                )}

                {/* ROBOSOCCER VISUAL RENDER */}
                {viewMode === 'render' && activeArena.id === 'robosoccer' && (
                  <div className="relative h-52 sm:h-60 bg-[#030407] border border-[#ff3b30]/50 overflow-hidden flex items-center justify-center p-4">
                    <div className="absolute inset-0 radar-grid opacity-30 pointer-events-none" />
                    <div className="absolute top-2 left-3 text-[10px] font-mono text-[#ff3b30] flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-[#ffcc00]" />
                      <span>HOLONOMIC SYSTEM: 360° OMNI-WHEEL DRIVE & SOLENOID STRIKER</span>
                    </div>
                    <img
                      src="/assets/aistudio/bot5_11zon_f4cbb83a.webp"
                      alt="Robosoccer Striker Bot"
                      className="max-h-[75%] max-w-[75%] object-contain filter drop-shadow-[0_0_20px_rgba(255,59,48,0.6)]"
                    />
                  </div>
                )}

                {/* SCHEMATIC MODE OR OTHER ARENAS */}
                {(viewMode === 'schematic' || (activeArena.id !== 'robowar' && activeArena.id !== 'robothon' && activeArena.id !== 'roborace' && activeArena.id !== 'robosoccer')) && (
                  <div className="bg-[#030407] border border-slate-800 p-4 font-mono text-xs space-y-3">
                    <div className="text-[#ffcc00] font-bold flex items-center gap-1.5 border-b border-slate-800 pb-2">
                      <Shield className="w-4 h-4 text-[#ff3b30]" />
                      <span>ARENA PARAMETERS & TECHNICAL SPECIFICATIONS</span>
                    </div>
                    <div className="space-y-1.5 text-slate-300">
                      <div><strong className="text-white">Arena Enclosure:</strong> {activeArena.arenaDetails}</div>
                      <div><strong className="text-white">Primary Weaponry & System:</strong> {activeArena.primaryWeaponry}</div>
                      <div><strong className="text-white">Core Directives:</strong> {activeArena.tacticalRules.slice(0, 2).join(' • ')}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    sound.playConfirm();
                    onRegisterArena(activeArena.id);
                  }}
                  className="tactical-btn-glitch flex-1 min-w-[180px] px-5 py-3 bg-[#ff3b30] hover:bg-[#ff5500] text-white font-mono font-bold text-xs uppercase clip-chamfer-sm cursor-pointer shadow-[0_0_20px_rgba(255,59,48,0.4)] transition-all flex items-center justify-center gap-2"
                >
                  <span>REGISTER FOR {activeArena.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    sound.playBlip(750);
                    onInspectRules(activeArena);
                  }}
                  className="tactical-btn-glitch px-4 py-3 bg-[#050609] hover:bg-slate-800 border border-slate-700 text-slate-200 font-mono text-xs uppercase clip-chamfer-sm cursor-pointer transition-all flex items-center gap-1.5"
                >
                  <span>OFFICIAL RULES</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
