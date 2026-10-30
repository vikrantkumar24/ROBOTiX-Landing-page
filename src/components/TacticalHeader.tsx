import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, ArrowUpRight, Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { sound } from '../utils/audioEngine';
import { ArenaCompetition } from '../data/robofestData';

interface TacticalHeaderProps {
  onDeployBotClick: (arenaId?: string) => void;
  onInspectArenaRule?: (arena: ArenaCompetition) => void;
  onDownloadRulebook?: () => void;
  audioMuted: boolean;
  onToggleAudio: () => void;
}

interface MenuHeading {
  id: string;
  num: string;
  title: string;
}

const MENU_HEADINGS: MenuHeading[] = [
  { id: 'gateway-hero', num: '01', title: 'GATEWAY ENTRANCE' },
  { id: 'bot-showcase', num: '02', title: 'COMBAT BOTS SHOWCASE' },
  { id: 'intel', num: '03', title: 'MISSION INTEL & DIVISIONS' },
  { id: 'arenas', num: '04', title: '7 COMBAT ARENAS' },
  { id: 'album', num: '05', title: 'COMBAT PHOTO ALBUM' },
  { id: 'reach', num: '06', title: 'BENCHMARKS & REACH' },
  { id: 'register', num: '07', title: 'SQUAD REGISTRATION' },
  { id: 'footer', num: '08', title: 'COMMS & VENUE' },
];

export const TacticalHeader: React.FC<TacticalHeaderProps> = ({
  onDeployBotClick,
  audioMuted,
  onToggleAudio,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('gateway-hero');
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Track scroll progress and active section
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrolled(currentScroll > 20);

      // Scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100)));
      }

      // Active section detection
      const sectionIds = ['gateway-hero', 'bot-showcase', 'intel', 'arenas', 'album', 'reach', 'register', 'footer'];
      const scrollPosition = currentScroll + 200;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to topic on the website
  const scrollToHeading = (id: string) => {
    sound.playConfirm();
    setIsMenuOpen(false);

    if (id === 'bot-showcase' || id === 'robots-showcase') {
      const hero = document.getElementById('gateway-hero');
      if (hero) {
        const y = hero.offsetTop + 140;
        window.scrollTo({ top: y, behavior: 'smooth' });
        return;
      }
    }

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleMenu = () => {
    if (!isMenuOpen) {
      sound.playHydraulic();
    } else {
      sound.playSteamHiss();
    }
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div ref={menuRef} className="relative z-50">
      <header 
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          scrolled 
            ? 'bg-[#050609]/95 backdrop-blur-md border-b border-[#1f2433] shadow-[0_10px_30px_rgba(0,0,0,0.85)]' 
            : 'bg-[#050609]/85 backdrop-blur-sm border-b border-white/10'
        } text-slate-200`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-3">
            
            {/* ============================================================== */}
            {/* LEFT: OFFICIAL ROBOT LOGO & BRAND LOCKUP                       */}
            {/* ============================================================== */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <a
                href="#gateway-hero"
                onClick={(e) => { e.preventDefault(); scrollToHeading('gateway-hero'); }}
                className="flex items-center gap-2 sm:gap-2.5 group cursor-pointer focus:outline-none"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#0c0e15] border border-[#ff3b30] hover:border-[#ffcc00] p-1.5 flex items-center justify-center clip-chamfer-sm group-hover:shadow-[0_0_15px_rgba(255,59,48,0.6)] transition-all shrink-0">
                  <img 
                    src="/assets/aistudio/image_66ed7668.png" 
                    alt="ROBOTiX Club NIT Raipur Logo" 
                    className="w-full h-full object-contain filter drop-shadow-[0_0_6px_rgba(255,255,255,0.7)] group-hover:scale-110 transition-transform"
                  />
                </div>

                <div className="flex flex-col">
                  <div className="text-xs sm:text-sm font-black tracking-wider sm:tracking-widest font-mono text-white flex items-center gap-1 sm:gap-1.5 whitespace-nowrap">
                    <span>ROBOTiX</span>
                    <span className="text-[#ff3b30] text-[10px] sm:text-xs font-bold">[NITRR]</span>
                  </div>
                  <div className="flex items-center gap-1 text-[9px] sm:text-[10px] font-mono text-[#ffcc00] whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ffcc00] animate-pulse shrink-0" />
                    <span className="tracking-wider font-bold hidden sm:inline">22-23 MARCH '26</span>
                    <span className="tracking-wider font-bold sm:hidden">LIVE</span>
                  </div>
                </div>
              </a>
            </div>

            {/* Center area left clean as requested, all headings are housed inside the menu */}
            <div className="flex-1" />

            {/* ============================================================== */}
            {/* RIGHT: AUDIO FX, REGISTER & RESPONSIVE HAMBURGER MENU BUTTON  */}
            {/* ============================================================== */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              
              {/* Tactical Audio FX Toggle */}
              <button
                onClick={() => {
                  onToggleAudio();
                  if (audioMuted) sound.playConfirm();
                }}
                title={audioMuted ? 'Enable Tactical Audio Effects' : 'Mute Tactical Audio Effects'}
                className="p-1.5 sm:p-2 bg-[#0c0e15] border border-slate-700 hover:border-[#ffcc00] text-slate-300 hover:text-white transition-all cursor-pointer clip-chamfer-sm shrink-0"
                aria-label="Toggle Sound Effects"
              >
                {audioMuted ? (
                  <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500" />
                ) : (
                  <div className="flex items-center gap-1">
                    <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ffcc00]" />
                    <span className="hidden xl:flex items-end gap-0.5 h-3">
                      <span className="w-0.5 bg-[#ffcc00] animate-[pulse_0.8s_ease-in-out_infinite] h-2" />
                      <span className="w-0.5 bg-[#ffcc00] animate-[pulse_0.6s_ease-in-out_infinite] h-3" />
                    </span>
                  </div>
                )}
              </button>

              {/* Direct Squad Register CTA Button */}
              <button
                onClick={() => {
                  sound.playConfirm();
                  onDeployBotClick();
                }}
                className="tactical-btn-glitch px-2.5 sm:px-3.5 py-1.5 sm:py-2 bg-[#ff3b30] hover:bg-[#ff5500] text-white font-mono font-bold text-[11px] sm:text-xs uppercase clip-chamfer-sm transition-all shadow-[0_0_12px_rgba(255,59,48,0.4)] hover:shadow-[0_0_18px_rgba(255,59,48,0.7)] flex items-center gap-1 shrink-0 cursor-pointer"
              >
                <span className="hidden md:inline">REGISTER SQUAD</span>
                <span className="md:hidden">REGISTER</span>
                <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>

              {/* RESPONSIVE HAMBURGER MENU BUTTON */}
              <button
                onClick={toggleMenu}
                onMouseEnter={() => sound.playBlip(750)}
                className="tactical-btn-glitch p-1.5 sm:p-2 bg-[#0c0e15] hover:bg-[#121622] border border-[#ff3b30]/60 hover:border-[#ffcc00] text-[#ffcc00] hover:text-white rounded-lg transition-all duration-200 flex items-center justify-center shrink-0 cursor-pointer shadow-[0_0_12px_rgba(255,59,48,0.25)]"
                aria-label="Toggle Headings Menu"
                title="Topic Navigation Menu"
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5 text-[#ff3b30]" />
                ) : (
                  <Menu className="w-5 h-5 text-[#ffcc00]" />
                )}
              </button>

            </div>

          </div>
        </div>

        {/* TACTICAL HUD LASER PROGRESS BAR */}
        <div className="w-full h-[2px] bg-[#1f2433] overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#ff3b30] via-[#ffcc00] to-[#ff3b30] transition-all duration-150 ease-out shadow-[0_0_8px_rgba(255,204,0,0.6)]"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </header>

      {/* ============================================================== */}
      {/* ANIMATED MENU DROPDOWN (JUST HOLDS THE HEADINGS & SCROLLS DOWN) */}
      {/* ============================================================== */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed top-14 sm:top-16 left-0 right-0 z-40 bg-[#050609]/95 backdrop-blur-2xl border-b border-[#ff3b30]/40 shadow-[0_25px_50px_rgba(0,0,0,0.95)] max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            {/* PERSISTENT SCANLINES */}
            <div className="absolute inset-0 crt-scanline-overlay pointer-events-none opacity-20" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 relative z-10">
              
              {/* Menu Sub-header */}
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10 font-mono text-xs">
                <div className="flex items-center gap-2 text-[#ffcc00]">
                  <span className="w-2 h-2 rounded-full bg-[#ff3b30] animate-ping" />
                  <span className="font-bold tracking-wider uppercase">SELECT TOPIC TO SCROLL</span>
                </div>
                <span className="text-slate-500 text-[10px]">
                  {MENU_HEADINGS.length} SECTIONS AVAILABLE
                </span>
              </div>

              {/* Headings List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 py-2">
                {MENU_HEADINGS.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToHeading(item.id)}
                      onMouseEnter={() => sound.playBlip(780)}
                      className={`w-full group text-left px-3.5 py-3 rounded-xl border transition-all duration-200 flex items-center justify-between cursor-pointer ${
                        isActive
                          ? 'bg-[#ffcc00]/15 border-[#ffcc00] text-white shadow-[0_0_15px_rgba(255,204,0,0.2)]'
                          : 'bg-[#0c0e15]/70 hover:bg-[#151926] border-white/10 hover:border-[#ff3b30] text-slate-300 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`font-mono text-xs font-bold px-1.5 py-0.5 rounded ${
                          isActive 
                            ? 'bg-[#ffcc00] text-black' 
                            : 'bg-white/10 text-slate-400 group-hover:text-[#ff3b30] group-hover:bg-[#ff3b30]/15'
                        }`}>
                          {item.num}
                        </span>
                        <span className="font-display font-bold text-sm tracking-wide uppercase group-hover:tracking-wider transition-all">
                          {item.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-slate-500 group-hover:text-[#ffcc00] group-hover:translate-x-1 transition-all">
                        {isActive && (
                          <span className="text-[10px] font-mono text-[#ffcc00] uppercase font-bold mr-1">
                            ACTIVE
                          </span>
                        )}
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </button>
                  );
                })}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
