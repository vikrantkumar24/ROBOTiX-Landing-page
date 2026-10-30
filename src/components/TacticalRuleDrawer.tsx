import React from 'react';
import { X, CheckCircle2, ArrowRight, Crosshair, AlertOctagon, Terminal } from 'lucide-react';
import { ArenaCompetition } from '../data/robofestData';
import { sound } from '../utils/audioEngine';

interface TacticalRuleDrawerProps {
  arena: ArenaCompetition | null;
  isOpen: boolean;
  onClose: () => void;
  onRegister: (arenaId: string) => void;
}

export const TacticalRuleDrawer: React.FC<TacticalRuleDrawerProps> = ({
  arena,
  isOpen,
  onClose,
  onRegister,
}) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !arena) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="absolute inset-0"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-2xl w-full bg-[#050609] border-l-2 border-[#ff3b30] shadow-[0_0_50px_rgba(255,59,48,0.35)] flex flex-col z-10 crt-scanline-overlay">
        
        {/* Drawer Header */}
        <div className="p-6 bg-[#0a0c13] border-b border-[#1f2433] flex items-start justify-between gap-4">
          <div>
            <div className="text-[11px] font-mono text-[#ffcc00] flex items-center gap-2 font-bold tracking-widest uppercase">
              <Crosshair className="w-3.5 h-3.5 text-[#ff3b30]" />
              <span>ROBOTiX SCRUTINEERING BOARD // ARENA {arena.rank}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-display uppercase mt-1">
              {arena.name} SPECIFICATIONS & RULES
            </h3>
            <div className="text-xs font-mono text-slate-400 mt-0.5">
              {arena.tagline}
            </div>
          </div>

          <button
            onClick={() => {
              sound.playBlip(400);
              onClose();
            }}
            className="p-2 bg-[#0c0e15] border border-[#1f2433] hover:border-[#ff3b30] text-slate-400 hover:text-white clip-chamfer-sm transition-colors cursor-pointer"
            aria-label="Close rule drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-6 flex-1 overflow-y-auto font-mono text-xs">
          
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 bg-[#0c0e15] border border-[#1a1e29] clip-chamfer-sm">
            <div>
              <div className="text-[10px] text-slate-500">MAX MASS</div>
              <div className="text-xs font-bold text-[#ffcc00]">{arena.weightClass}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500">DIMENSIONS</div>
              <div className="text-xs font-bold text-white">{arena.dimensions}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500">CONTROL RF</div>
              <div className="text-xs font-bold text-[#ffcc00]">{arena.controlProtocol.split('/')[0]}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500">PRIZE POOL</div>
              <div className="text-xs font-bold text-[#ff3b30]">{arena.prizePool}</div>
            </div>
          </div>

          {/* Arena Dimensions & Enclosure */}
          <div className="p-4 bg-[#08090f] border border-[#ff3b30]/40 clip-chamfer space-y-2">
            <div className="text-[11px] font-bold text-[#ffcc00] uppercase tracking-wider flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#ff3b30]" />
              <span>ARENA ENCLOSURE & VENUE TIMELINE</span>
            </div>
            <div className="text-slate-300 pt-1 space-y-2">
              <div>
                <span className="text-[10px] text-slate-500 block">SCHEDULE:</span>
                <span className="font-bold text-[#ffcc00]">{arena.timeline}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">ENCLOSURE & BALLISTICS:</span>
                <span className="text-white leading-relaxed">{arena.arenaDetails}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">WEAPONRY & RULES:</span>
                <span className="text-slate-300 leading-relaxed">{arena.primaryWeaponry}</span>
              </div>
            </div>
          </div>

          {/* Tactical Directives */}
          <div>
            <div className="text-[11px] font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#ffcc00]" />
              <span>MANDATORY SCRUTINEERING DIRECTIVES</span>
            </div>
            <div className="space-y-2">
              {arena.tacticalRules.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-2.5 bg-[#0c0e15] border border-[#1a1e29] text-slate-300">
                  <span className="text-[#ffcc00] font-bold">[{idx + 1}]</span>
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Disqualification Triggers */}
          <div className="p-4 bg-[#0c0e15] border border-[#ff3b30]/50 clip-chamfer">
            <div className="text-[11px] font-bold text-[#ff3b30] uppercase tracking-wider mb-3 flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-[#ff3b30]" />
              <span>INSTANT DISQUALIFICATION TRIGGERS</span>
            </div>
            <ul className="space-y-2 text-slate-300">
              {arena.disqualifications.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#ff3b30] font-bold">✖</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Drawer Footer Actions */}
        <div className="p-6 bg-[#0a0c13] border-t border-[#1f2433] flex items-center justify-between gap-4">
          <button
            onClick={() => {
              sound.playBlip(400);
              onClose();
            }}
            className="tactical-btn-glitch px-4 py-2.5 bg-[#0c0e15] border border-[#1f2433] hover:border-slate-500 text-slate-300 text-xs font-mono uppercase clip-chamfer-sm cursor-pointer"
          >
            DISMISS
          </button>

          <button
            onClick={() => {
              sound.playHydraulic();
              onClose();
              onRegister(arena.id);
            }}
            className="tactical-btn-glitch inline-flex items-center gap-2 px-6 py-2.5 bg-[#ff3b30] hover:bg-[#ff5500] text-white font-black font-mono text-xs uppercase clip-chamfer transition-all cursor-pointer shadow-[0_0_20px_rgba(255,59,48,0.4)]"
          >
            <span>REGISTER SQUAD FOR {arena.name}</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>

      </div>
    </div>
  );
};
