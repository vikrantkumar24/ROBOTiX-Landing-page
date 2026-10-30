import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { ChevronDown, Flame, Shield, ArrowRight, Crosshair, Award, Zap, FileText, Lock, Unlock, Gauge, RotateCcw, Clock } from 'lucide-react';
import { sound } from '../utils/audioEngine';
import { ARENAS_DATA, ArenaCompetition } from '../data/robofestData';

interface GatewayHeroProps {
  onEnterArenas: () => void;
  onDeployBot: (arenaId?: string) => void;
  onDownloadRulebook: () => void;
  onInspectArena: (arena: ArenaCompetition) => void;
}

interface CombatBot {
  id: string;
  weightClass: string;
  name: string;
  arenaId: string;
  image: string;
  tagline: string;
  prize: string;
  specs: {
    armor: string;
    weapon: string;
    power: string;
    speed: string;
  };
}

const COMBAT_BOTS: CombatBot[] = [
  {
    id: 'robowar-8kg',
    weightClass: '8 KG COMBAT HEAVYWEIGHT',
    name: 'ROBOWAR // TITANIUM CRUSHER',
    arenaId: 'robowar',
    image: '/assets/aistudio/robobot1_2iQckRV_57f16dfc.webp',
    tagline: 'High-kinetic steel cage warfare with titanium spinning drums.',
    prize: '₹10,000 PRIZE',
    specs: {
      armor: 'Hardened AR500 Steel + Ballistic Polycarbonate',
      weapon: '10,000 RPM Vertical Drum Blade',
      power: '22.2V 6S LiPo with Brushless Outrunners',
      speed: '30 km/h Rapid Ramming Velocity',
    },
  },
  {
    id: 'robothon-24h',
    weightClass: '24 HR SWARM AI ROVER',
    name: 'ROBOTHON // AUTONOMOUS HEXAPOD',
    arenaId: 'robothon',
    image: '/assets/aistudio/bot3_11zon_04d2c407.webp',
    tagline: '24-hour simulation hackathon for swarm AI and multi-agent rovers.',
    prize: '₹35,000 PRIZE',
    specs: {
      armor: 'Carbon Fiber Exo-Chassis',
      weapon: 'ROS2 Humble Autonomous Swarm Link',
      power: 'NVIDIA Jetson Nano + LiDAR Depth Array',
      speed: 'Articulated 6-Legged Inverse Kinematics',
    },
  },
  {
    id: 'roborace-5kg',
    weightClass: '5 KG KINETIC SPEEDSTER',
    name: 'ROBORACE // HIGH-SPEED CHICANE RACER',
    arenaId: 'roborace',
    image: '/assets/aistudio/bot4_11zon_f9dcebdf.webp',
    tagline: '85m obstacle track with chicanes, bridge ramps, and gravel beds.',
    prize: '₹10,000 PRIZE',
    specs: {
      armor: '3K Carbon Composite 25x25x25cm Box Limit',
      weapon: 'Active Front Hydraulic Suspension & Downforce Wing',
      power: '4x High-Torque Brushless Hub Motors',
      speed: '45 km/h Acceleration Sprint',
    },
  },
  {
    id: 'robosoccer-6kg',
    weightClass: '6 KG STRIKER BOT',
    name: 'ROBOSOCCER // OMNI-WHEEL STRIKER',
    arenaId: 'robosoccer',
    image: '/assets/aistudio/bot5_11zon_f4cbb83a.webp',
    tagline: 'Rapid 360° holonomic mechatronic striker bot showdown.',
    prize: '₹10,000 PRIZE',
    specs: {
      armor: 'Anodized 6061-T6 Aluminum Cage',
      weapon: 'Pneumatic 5-Bar Solenoid Ball Kicker',
      power: 'Triple Omni-Directional 120° Drive',
      speed: 'Holonomic 360° Instant Vector Shift',
    },
  },
];

export const GatewayHero: React.FC<GatewayHeroProps> = ({
  onEnterArenas,
  onDeployBot,
  onDownloadRulebook,
  onInspectArena,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [manualBotIndex, setManualBotIndex] = useState<number | null>(null);
  const [isLockedOnBot, setIsLockedOnBot] = useState<boolean>(false);
  const [gateStatus, setGateStatus] = useState<'locked' | 'unlatching' | 'open'>('locked');
  const hasPlayedSoundRef = useRef<boolean>(false);

  // Live Combat Countdown to 22 March (09:00 IST)
  const [timeLeft, setTimeLeft] = useState<{
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  }>({ days: '00', hours: '00', minutes: '00', seconds: '00' });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      let target = new Date(now.getFullYear(), 2, 22, 9, 0, 0);
      if (now.getTime() >= target.getTime()) {
        target = new Date(now.getFullYear() + 1, 2, 22, 9, 0, 0);
      }

      const diff = target.getTime() - now.getTime();
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / 1000 / 60) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        days: d < 10 ? `0${d}` : `${d}`,
        hours: h < 10 ? `0${h}` : `${h}`,
        minutes: m < 10 ? `0${m}` : `${m}`,
        seconds: s < 10 ? `0${s}` : `${s}`,
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  // Raw scroll progress from container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Butter-smooth spring interpolation for seamless scrolling in both directions
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    mass: 0.1,
    restDelta: 0.0001,
  });

  // 1-SCROLL FAST OPENING:
  // Fades out completely in ~30-40px (progress 0.002 -> 0.016)
  const closedInfoOpacity = useTransform(smoothProgress, [0.002, 0.016], [1, 0]);
  const closedInfoScale = useTransform(smoothProgress, [0.002, 0.016], [1, 0.94]);
  const closedInfoY = useTransform(smoothProgress, [0.002, 0.016], [0, -16]);
  const closedInfoPointerEvents = useTransform(smoothProgress, (v) => (v > 0.015 ? 'none' : 'auto'));

  // Mechanical lock disengagement: instantaneous on first scroll notch
  const deadboltLeftX = useTransform(smoothProgress, [0.003, 0.020], ['0px', '-42px']);
  const deadboltRightX = useTransform(smoothProgress, [0.003, 0.020], ['0px', '42px']);
  const lockWheelRotate = useTransform(smoothProgress, [0.002, 0.022], [0, 90]);
  const lockWheelScale = useTransform(smoothProgress, [0.003, 0.022], [1, 0.5]);
  const lockWheelOpacity = useTransform(smoothProgress, [0.003, 0.020], [1, 0]);
  const steamFlareOpacity = useTransform(smoothProgress, [0.002, 0.014, 0.026], [0, 0.85, 0]);

  // Blast doors complete their slide outward in just ONE scroll (by 0.024)
  const leftGateX = useTransform(smoothProgress, [0.004, 0.024], ['0%', '-105%']);
  const rightGateX = useTransform(smoothProgress, [0.004, 0.024], ['0%', '105%']);
  const cylinderRodWidth = useTransform(smoothProgress, [0.004, 0.024], ['20px', '160px']);

  // Background arena & fire effect solidifies as doors open
  const arenaBgScale = useTransform(smoothProgress, [0.004, 0.030], [1.12, 1.0]);
  const arenaBgOpacity = useTransform(smoothProgress, [0.002, 0.026], [0.3, 1.0]);
  const fireOpacity = useTransform(smoothProgress, [0.004, 0.028], [0, 0.75]);

  // Robot Categories & Combat Dossier: FULLY PRESENT & INTERACTIVE AT ONE SCROLL (0.014 -> 0.026)
  const revealedContentOpacity = useTransform(
    smoothProgress,
    [0.014, 0.026, 0.94, 0.99],
    [0, 1, 1, 0]
  );
  const revealedContentY = useTransform(smoothProgress, [0.014, 0.026], [18, 0]);
  const revealedContentScale = useTransform(smoothProgress, [0.014, 0.026], [0.98, 1.0]);

  // Active bot category from scroll progress (spread across 0.026 to 0.94)
  const [scrollBotIndex, setScrollBotIndex] = useState(0);
  const [currentProgressRaw, setCurrentProgressRaw] = useState(0);

  useEffect(() => {
    return smoothProgress.on('change', (latest) => {
      setCurrentProgressRaw(latest);

      // Gate unlatching sound trigger
      if (latest < 0.004) {
        setGateStatus('locked');
        hasPlayedSoundRef.current = false;
      } else if (latest < 0.024) {
        setGateStatus('unlatching');
        if (!hasPlayedSoundRef.current) {
          sound.playBlastDoorUnlatch();
          sound.playSteamHiss();
          hasPlayedSoundRef.current = true;
        }
      } else {
        setGateStatus('open');
      }

      // Auto cycle across 4 categories only when not locked by manual user selection
      if (!isLockedOnBot) {
        if (latest < 0.25) {
          setScrollBotIndex(0);
        } else if (latest < 0.48) {
          setScrollBotIndex(1);
        } else if (latest < 0.71) {
          setScrollBotIndex(2);
        } else {
          setScrollBotIndex(3);
        }
      }
    });
  }, [smoothProgress, isLockedOnBot]);

  const activeBotIndex = manualBotIndex !== null ? manualBotIndex : scrollBotIndex;
  const currentBot = COMBAT_BOTS[activeBotIndex];

  const handleSelectBot = (idx: number) => {
    sound.playHydraulic();
    setManualBotIndex(idx);
    setIsLockedOnBot(true); // User clicked to inspect: lock view so scroll doesn't yank them away!
  };

  const handleUnlockAutoScroll = () => {
    sound.playBlip(720);
    setIsLockedOnBot(false);
    setManualBotIndex(null);
  };

  const handleScrollToNextSection = () => {
    sound.playConfirm();
    const nextSec = document.getElementById('intel');
    if (nextSec) {
      nextSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Calculate dwell progress for the active bot
  const botDwellProgress = Math.min(
    100,
    Math.max(
      0,
      activeBotIndex === 0
        ? ((currentProgressRaw - 0.026) / 0.224) * 100
        : activeBotIndex === 1
        ? ((currentProgressRaw - 0.25) / 0.23) * 100
        : activeBotIndex === 2
        ? ((currentProgressRaw - 0.48) / 0.23) * 100
        : ((currentProgressRaw - 0.71) / 0.23) * 100
    )
  );

  return (
    <section
      id="gateway-hero"
      ref={containerRef}
      className="relative h-[300vh] w-full bg-[#050609] select-none"
    >
      {/* Anchor for direct menu bar navigation to open showcase */}
      <div id="bot-showcase-anchor" className="absolute top-[140px] left-0 w-full h-[1px] pointer-events-none" />
      <div id="bot-showcase" className="absolute top-[140px] left-0 w-full h-[1px] pointer-events-none" />
      <div id="robots-showcase" className="absolute top-[140px] left-0 w-full h-[1px] pointer-events-none" />

      {/* FULL-VIEWPORT STICKY ARENA STAGE */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center crt-scanline-overlay">
        
        {/* ========================================================= */}
        {/* 1. DEEP ARENA BACKGROUND (Revealed behind blast doors)     */}
        {/* ========================================================= */}
        <motion.div
          style={{ scale: arenaBgScale, opacity: arenaBgOpacity }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <img
            src="/assets/aistudio/robowarsbg.webp"
            alt="Robowars Arena Background"
            className="w-full h-full object-cover filter contrast-125 brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050609] via-black/40 to-[#050609]/80" />
        </motion.div>

        {/* Ambient Flame backdrop */}
        <motion.div
          style={{ opacity: fireOpacity }}
          className="absolute inset-0 z-1 pointer-events-none overflow-hidden mix-blend-screen"
        >
          <img
            src="/assets/aistudio/firebg.4b8f077e4baddadb7ad6_d69b481e.webp"
            alt="Arena Fire"
            className="w-full h-full object-cover filter contrast-150"
          />
        </motion.div>

        {/* Spotlight lighting effect */}
        <div className="absolute inset-0 z-2 overflow-hidden pointer-events-none">
          <div className="animate-spotlight-flicker">
            <div className="spotlight-cone">
              <div className="spotlight-cone-shape" />
            </div>
            <div className="spotlight-lamp" />
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. REVEALED ARENA TELEMETRY & COMBAT BOT CAROUSEL         */}
        {/* ========================================================= */}
        <motion.div
          style={{
            opacity: revealedContentOpacity,
            y: revealedContentY,
            scale: revealedContentScale,
          }}
          className="absolute inset-0 z-5 flex flex-col justify-between items-center py-4 sm:py-6 px-4 max-w-7xl mx-auto w-full pointer-events-auto"
        >
          {/* TOP CONTROLS: Glassmorphic Weight Class Switcher & Lock Telemetry */}
          <div className="w-full flex flex-col items-center pt-14 sm:pt-16">
            
            {/* Glassmorphic Live Indicator Pill */}
            <div className="flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full text-[10px] sm:text-xs font-mono uppercase tracking-widest mb-2 shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
              <span className="text-white font-bold">ROBOFEST'26 COMBAT ARENA</span>
              <span className="text-slate-400">//</span>
              <span className="text-[#ffcc00] flex items-center gap-1.5 font-bold">
                <Clock className="w-3 h-3 text-[#ff3b30] animate-pulse" />
                <span>{timeLeft.days}D {timeLeft.hours}H {timeLeft.minutes}M {timeLeft.seconds}S</span>
              </span>
            </div>

            {/* 4 Weight Category Tabs with Tactical Glassmorphism */}
            <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 bg-[#0a0d14]/70 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.15)] max-w-full overflow-x-auto">
              {COMBAT_BOTS.map((bot, idx) => {
                const isActive = idx === activeBotIndex;
                return (
                  <button
                    key={bot.id}
                    onClick={() => handleSelectBot(idx)}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                      isActive
                        ? 'bg-[#ff3b30]/90 backdrop-blur-md text-white border border-[#ff3b30] shadow-[0_0_20px_rgba(255,59,48,0.6),inset_0_1px_1px_rgba(255,255,255,0.3)] scale-[1.02]'
                        : 'bg-white/[0.03] backdrop-blur-sm text-slate-300 hover:text-white hover:bg-white/[0.08] border border-white/5'
                    }`}
                  >
                    <span className="text-[10px] text-[#ffcc00] font-mono">0{idx + 1}.</span>
                    <span>{bot.weightClass.split(' ')[0]}</span>
                    <span className="text-[10px] opacity-80 uppercase px-1.5 py-0.5 rounded bg-black/40 border border-white/5">
                      {bot.arenaId}
                    </span>
                  </button>
                );
              })}

              {/* Lock / Auto-Cycle Toggle Button */}
              {isLockedOnBot && (
                <button
                  onClick={handleUnlockAutoScroll}
                  className="px-2.5 py-1.5 bg-[#ffcc00]/20 hover:bg-[#ffcc00]/30 text-[#ffcc00] border border-[#ffcc00]/50 rounded-xl font-mono text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
                  title="Click to resume auto-scroll cycling"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>RESUME AUTO</span>
                </button>
              )}
            </div>
          </div>

          {/* CENTER DISPLAY: ACTIVE COMBAT BOT & GLASSMORPHIC TELEMETRY WITH ANIMATEPRESENCE */}
          <div className="w-full my-auto max-w-6xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentBot.id}
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{ duration: 0.32, ease: 'easeOut' }}
                className="w-full grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-8 items-center"
              >
                {/* Left Column: Glassmorphic Bot Dossier Panel */}
                <div className="md:col-span-5 order-2 md:order-1 relative rounded-2xl p-5 sm:p-6 backdrop-blur-2xl bg-[#080b12]/65 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.2)] text-left overflow-hidden">
                  
                  {/* Glass Top Specular Sheen */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

                  {/* Header Badge */}
                  <div className="text-[10px] font-mono text-[#ffcc00] uppercase tracking-widest flex items-center justify-between mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-[#ffcc00]" />
                      <span>{currentBot.weightClass}</span>
                    </span>
                    <span className="px-2 py-0.5 bg-[#ff3b30]/20 border border-[#ff3b30]/40 text-[#ff3b30] font-bold rounded">
                      {currentBot.prize}
                    </span>
                  </div>

                  {/* Bot Name */}
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-black font-display text-white tracking-tight drop-shadow-sm">
                    {currentBot.name}
                  </h2>

                  <p className="text-xs font-mono text-slate-300 mt-1 leading-relaxed">
                    {currentBot.tagline}
                  </p>

                  {/* Frosted Glass Spec Tiles */}
                  <div className="mt-4 space-y-2 border-t border-white/10 pt-3 font-mono text-xs">
                    <div className="flex justify-between items-center p-2 rounded-lg bg-white/[0.03] backdrop-blur-sm border border-white/5">
                      <span className="text-[10px] text-slate-400 uppercase">ARMOR CHASSIS</span>
                      <span className="text-white text-right font-medium text-[11px] truncate max-w-[190px]">{currentBot.specs.armor}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-white/[0.03] backdrop-blur-sm border border-white/5">
                      <span className="text-[10px] text-slate-400 uppercase">WEAPON SYSTEM</span>
                      <span className="text-[#ffcc00] text-right font-bold text-[11px] truncate max-w-[190px]">{currentBot.specs.weapon}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-white/[0.03] backdrop-blur-sm border border-white/5">
                      <span className="text-[10px] text-slate-400 uppercase">POWERTRAIN</span>
                      <span className="text-white text-right font-medium text-[11px] truncate max-w-[190px]">{currentBot.specs.power}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-white/[0.03] backdrop-blur-sm border border-white/5">
                      <span className="text-[10px] text-slate-400 uppercase">TOP VELOCITY</span>
                      <span className="text-[#ff3b30] text-right font-black text-[11px]">{currentBot.specs.speed}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-5 flex items-center gap-3">
                    <button
                      onClick={() => {
                        sound.playConfirm();
                        onDeployBot(currentBot.arenaId);
                      }}
                      className="tactical-btn-glitch flex-1 px-4 py-2.5 bg-[#ff3b30] hover:bg-[#ff5500] text-white font-mono font-black text-xs uppercase clip-chamfer-sm cursor-pointer shadow-[0_0_20px_rgba(255,59,48,0.5)] transition-all flex items-center justify-center gap-2"
                    >
                      <span>REGISTER SQUAD</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        sound.playBlip(750);
                        const arenaMatch = ARENAS_DATA.find((a) => a.id === currentBot.arenaId);
                        if (arenaMatch) onInspectArena(arenaMatch);
                      }}
                      className="tactical-btn-glitch px-4 py-2.5 bg-black/60 hover:bg-[#ffcc00] hover:text-black border border-[#ffcc00] text-[#ffcc00] font-mono font-bold text-xs uppercase clip-chamfer-sm cursor-pointer transition-all backdrop-blur-md"
                    >
                      RULES
                    </button>
                  </div>
                </div>

                {/* Right Column: High-Res Bot Cutout Render */}
                <div className="md:col-span-7 order-1 md:order-2 flex items-center justify-center relative h-[220px] sm:h-[300px] md:h-[380px]">
                  <div className="absolute inset-0 bg-radial from-[#ff3b30]/20 to-transparent blur-3xl pointer-events-none" />
                  <img
                    key={currentBot.id}
                    src={currentBot.image}
                    alt={currentBot.name}
                    className="max-h-full max-w-full object-contain filter drop-shadow-[0_0_35px_rgba(255,59,48,0.7)] transition-all duration-300"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* BOTTOM BAR: Glassmorphic Scroll Progress Bar & Quick Exit */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 pt-3 pb-1 text-[11px] font-mono text-slate-400 bg-black/40 backdrop-blur-xl px-4 rounded-xl">
            
            {/* Arena Segmented Progress Bar */}
            <div className="flex items-center gap-3">
              <span className="text-[#ffcc00] font-bold">
                BOT {activeBotIndex + 1}/4
              </span>
              <div className="flex items-center gap-1.5">
                {COMBAT_BOTS.map((bot, i) => (
                  <div
                    key={bot.id}
                    onClick={() => handleSelectBot(i)}
                    className="cursor-pointer group flex flex-col items-center"
                    title={`Click to switch to ${bot.name}`}
                  >
                    <div
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === activeBotIndex
                          ? 'w-10 bg-[#ff3b30] shadow-[0_0_8px_rgba(255,59,48,0.8)]'
                          : i < activeBotIndex
                          ? 'w-4 bg-white/40'
                          : 'w-4 bg-white/10'
                      }`}
                    />
                  </div>
                ))}
              </div>
              <span className="text-[10px] text-slate-500 hidden md:inline">
                ({currentBot.weightClass.split(' ')[0]})
              </span>
            </div>

            {/* Quick Exit CTA */}
            <div className="flex items-center gap-4">
              <button
                onClick={onEnterArenas}
                className="text-[#ff3b30] hover:text-[#ffcc00] font-bold flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>EXPLORE ALL 7 ARENAS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleScrollToNextSection}
                className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-md text-[10px] font-bold uppercase transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>MISSION INTEL</span>
                <ChevronDown className="w-3 h-3 text-[#ffcc00]" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* ========================================================= */}
        {/* 3. TACTICAL SLIDING BLAST DOORS (MECHANICAL BULKHEAD)      */}
        {/* ========================================================= */}
        <div className="absolute inset-0 z-10 flex pointer-events-none overflow-hidden">
          
          {/* LEFT BLAST DOOR */}
          <motion.div
            className="relative w-1/2 h-full bg-[#0a0c12] border-r-2 border-[#ff3b30]/60 shadow-[25px_0_60px_rgba(0,0,0,0.95)]"
            style={{
              x: leftGateX,
              backgroundImage: 'url(/assets/aistudio/robogate.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'right center',
            }}
          >
            {/* Dark industrial gradient & steel reinforcement plate */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/90 pointer-events-none" />

            {/* Industrial Hazard Caution Stripe along mating seam */}
            <div className="absolute top-0 right-0 bottom-0 w-6 hazard-caution-stripes border-l border-black/70 shadow-inner" />

            {/* Left Vertical Structural I-Beam & Rivet line */}
            <div className="absolute top-0 right-8 bottom-0 w-8 border-l border-r border-[#1e2330] bg-[#0c0e15]/60 flex flex-col justify-between py-6 items-center">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-[#333a4d] border border-black shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]" />
              ))}
            </div>

            {/* Top & Bottom Heavy Hydraulic Piston Arms (Mounted to Left Door) */}
            <div className="absolute top-8 right-14 flex items-center gap-2">
              <div className="p-1 bg-black/80 backdrop-blur-md border border-slate-700 rounded text-[9px] font-mono text-slate-400">
                <Gauge className="w-3 h-3 text-[#ffcc00] inline mr-1" />
                <span>350 BAR</span>
              </div>
              <div className="w-16 h-4 bg-[#1a1e29] border border-slate-600 rounded-sm relative overflow-hidden flex items-center">
                <motion.div
                  style={{ width: cylinderRodWidth }}
                  className="h-2 bg-gradient-to-r from-slate-300 to-white shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                />
              </div>
            </div>

            <div className="absolute bottom-8 right-14 flex items-center gap-2">
              <div className="p-1 bg-black/80 backdrop-blur-md border border-slate-700 rounded text-[9px] font-mono text-slate-400">
                <Shield className="w-3 h-3 text-[#ff3b30] inline mr-1" />
                <span>HYD-01A</span>
              </div>
              <div className="w-16 h-4 bg-[#1a1e29] border border-slate-600 rounded-sm relative overflow-hidden flex items-center">
                <motion.div
                  style={{ width: cylinderRodWidth }}
                  className="h-2 bg-gradient-to-r from-slate-300 to-white shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                />
              </div>
            </div>

            {/* Left Interlocking Mechanical Deadbolts (4 heavy steel bolts) */}
            <div className="absolute top-1/2 -translate-y-1/2 right-0 flex flex-col gap-10">
              <motion.div
                style={{ x: deadboltLeftX }}
                className="w-10 h-5 bg-gradient-to-l from-[#4b5563] via-[#9ca3af] to-[#374151] border border-black clip-chamfer-sm shadow-2xl flex items-center justify-center"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#ffcc00] animate-ping" />
              </motion.div>
              <div className="w-6 h-5 bg-black/90 border border-slate-700" />
              <motion.div
                style={{ x: deadboltLeftX }}
                className="w-10 h-5 bg-gradient-to-l from-[#4b5563] via-[#9ca3af] to-[#374151] border border-black clip-chamfer-sm shadow-2xl flex items-center justify-center"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#ff3b30]" />
              </motion.div>
              <div className="w-6 h-5 bg-black/90 border border-slate-700" />
            </div>

            {/* Clean structural door styling */}
          </motion.div>

          {/* RIGHT BLAST DOOR (Mirrored & Mechanically Interlocked) */}
          <motion.div
            className="relative w-1/2 h-full bg-[#0a0c12] border-l-2 border-[#ff3b30]/60 shadow-[-25px_0_60px_rgba(0,0,0,0.95)]"
            style={{
              x: rightGateX,
              backgroundImage: 'url(/assets/aistudio/robogate.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'left center',
            }}
          >
            {/* Dark industrial gradient */}
            <div className="absolute inset-0 bg-gradient-to-l from-black/85 via-black/60 to-black/90 pointer-events-none" />

            {/* Industrial Hazard Caution Stripe along mating seam */}
            <div className="absolute top-0 left-0 bottom-0 w-6 hazard-caution-stripes border-r border-black/70 shadow-inner" />

            {/* Right Vertical Structural I-Beam & Rivet line */}
            <div className="absolute top-0 left-8 bottom-0 w-8 border-l border-r border-[#1e2330] bg-[#0c0e15]/60 flex flex-col justify-between py-6 items-center">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-[#333a4d] border border-black shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]" />
              ))}
            </div>

            {/* Top & Bottom Heavy Hydraulic Piston Arms (Mounted to Right Door) */}
            <div className="absolute top-8 left-14 flex items-center gap-2">
              <div className="w-16 h-4 bg-[#1a1e29] border border-slate-600 rounded-sm relative overflow-hidden flex items-center justify-end">
                <motion.div
                  style={{ width: cylinderRodWidth }}
                  className="h-2 bg-gradient-to-l from-slate-300 to-white shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                />
              </div>
              <div className="p-1 bg-black/80 backdrop-blur-md border border-slate-700 rounded text-[9px] font-mono text-slate-400">
                <Gauge className="w-3 h-3 text-[#ffcc00] inline mr-1" />
                <span>350 BAR</span>
              </div>
            </div>

            <div className="absolute bottom-8 left-14 flex items-center gap-2">
              <div className="w-16 h-4 bg-[#1a1e29] border border-slate-600 rounded-sm relative overflow-hidden flex items-center justify-end">
                <motion.div
                  style={{ width: cylinderRodWidth }}
                  className="h-2 bg-gradient-to-l from-slate-300 to-white shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                />
              </div>
              <div className="p-1 bg-black/80 backdrop-blur-md border border-slate-700 rounded text-[9px] font-mono text-slate-400">
                <Shield className="w-3 h-3 text-[#ff3b30] inline mr-1" />
                <span>HYD-01B</span>
              </div>
            </div>

            {/* Right Interlocking Mechanical Deadbolts (opposite sockets & bolts) */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 flex flex-col gap-10">
              <div className="w-6 h-5 bg-black/90 border border-slate-700" />
              <motion.div
                style={{ x: deadboltRightX }}
                className="w-10 h-5 bg-gradient-to-r from-[#4b5563] via-[#9ca3af] to-[#374151] border border-black clip-chamfer-sm shadow-2xl flex items-center justify-center"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#ffcc00] animate-ping" />
              </motion.div>
              <div className="w-6 h-5 bg-black/90 border border-slate-700" />
              <motion.div
                style={{ x: deadboltRightX }}
                className="w-10 h-5 bg-gradient-to-r from-[#4b5563] via-[#9ca3af] to-[#374151] border border-black clip-chamfer-sm shadow-2xl flex items-center justify-center"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#ff3b30]" />
              </motion.div>
            </div>

            {/* Clean structural door styling */}
          </motion.div>

          {/* CENTRAL PNEUMATIC ROTARY VAULT LOCK HUB (Center Seam Mechanism) */}
          <motion.div
            style={{
              rotate: lockWheelRotate,
              scale: lockWheelScale,
              opacity: lockWheelOpacity,
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-[#1e2330] via-[#0f1118] to-black border-4 border-[#ffcc00] shadow-[0_0_35px_rgba(255,204,0,0.6)] flex items-center justify-center pointer-events-none"
          >
            {/* Gear Teeth Outer Ring */}
            <div className="absolute inset-1 rounded-full border border-dashed border-[#ff3b30]/70 animate-[spin_18s_linear_infinite]" />

            {/* Center Lock Status Display */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/90 border-2 border-slate-600 flex flex-col items-center justify-center text-center p-1 shadow-inner">
              {gateStatus === 'locked' && (
                <>
                  <Lock className="w-5 h-5 text-[#ff3b30] mb-0.5 animate-pulse" />
                  <span className="text-[8px] font-mono font-bold text-red-500 tracking-tighter uppercase">SEALED</span>
                </>
              )}
              {gateStatus === 'unlatching' && (
                <>
                  <Unlock className="w-5 h-5 text-[#ffcc00] mb-0.5 animate-bounce" />
                  <span className="text-[8px] font-mono font-bold text-yellow-400 tracking-tighter uppercase">VENTING</span>
                </>
              )}
              {gateStatus === 'open' && (
                <>
                  <Zap className="w-5 h-5 text-[#10b981] mb-0.5" />
                  <span className="text-[8px] font-mono font-bold text-emerald-400 tracking-tighter uppercase">OPEN</span>
                </>
              )}
            </div>

            {/* Mechanical Radial Cross-Bars */}
            <div className="absolute w-full h-1 bg-[#ffcc00]/40 -z-1" />
            <div className="absolute h-full w-1 bg-[#ffcc00]/40 -z-1" />
          </motion.div>

          {/* High-Pressure Pneumatic Steam Seam Flare */}
          <motion.div
            style={{ opacity: steamFlareOpacity }}
            className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-transparent via-[#ffcc00]/80 to-transparent blur-md pointer-events-none mix-blend-screen"
          />
        </div>

        {/* ========================================================= */}
        {/* 4. CLOSED GATE HERO OVERLAY (TITLE, LOGO, DATES, PROMPT)   */}
        {/* ========================================================= */}
        <motion.div
          style={{
            opacity: closedInfoOpacity,
            scale: closedInfoScale,
            y: closedInfoY,
            pointerEvents: closedInfoPointerEvents as any,
          }}
          className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto my-auto"
        >

          {/* OFFICIAL NIT RAIPUR ROBOTICS COMBAT CREST */}
          <div 
            className="relative my-2 sm:my-3 flex items-center justify-center group cursor-pointer select-none"
            title="ROBOTiX Club • National Institute of Technology Raipur"
          >
            {/* Ambient Backlight Pulsing Rings */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#ff3b30]/20 via-[#ffcc00]/15 to-[#ff3b30]/20 rounded-full blur-2xl group-hover:blur-3xl group-hover:from-[#ff3b30]/35 transition-all duration-700 pointer-events-none" />

            {/* Cybernetic Calibration HUD Aperture */}
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 flex items-center justify-center">
              {/* Outer Rotating HUD Arc & Tech Reticle */}
              <svg 
                className="absolute inset-0 w-full h-full animate-[spin_24s_linear_infinite] pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity" 
                viewBox="0 0 160 160"
              >
                <circle cx="80" cy="80" r="76" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none" />
                <circle cx="80" cy="80" r="72" stroke="#ff3b30" strokeWidth="2" strokeDasharray="14 18 36 12" fill="none" opacity="0.8" />
                <circle cx="80" cy="80" r="66" stroke="#ffcc00" strokeWidth="1" strokeDasharray="4 16" fill="none" opacity="0.6" />
                {/* 4 Cardinal Reticle Marks */}
                <line x1="80" y1="2" x2="80" y2="12" stroke="#ff3b30" strokeWidth="2" />
                <line x1="80" y1="148" x2="80" y2="158" stroke="#ff3b30" strokeWidth="2" />
                <line x1="2" y1="80" x2="12" y2="80" stroke="#ff3b30" strokeWidth="2" />
                <line x1="148" y1="80" x2="158" y2="80" stroke="#ff3b30" strokeWidth="2" />
              </svg>

              {/* Counter-rotating Inner Micro-dash Ring */}
              <svg 
                className="absolute inset-0 w-full h-full animate-[spin_16s_linear_infinite_reverse] pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity" 
                viewBox="0 0 160 160"
              >
                <circle cx="80" cy="80" r="58" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="2 12" fill="none" />
              </svg>

              {/* Hexagonal Tactical Shield Plate */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-2xl bg-gradient-to-b from-[#141824] via-[#090b10] to-[#040508] border border-[#ff3b30]/50 group-hover:border-[#ffcc00] p-3 flex flex-col items-center justify-center shadow-[0_0_25px_rgba(255,59,48,0.4)] group-hover:shadow-[0_0_35px_rgba(255,59,48,0.7)] transition-all duration-300">
                {/* Tactical Corner Brackets */}
                <span className="absolute top-1 left-1 w-2 h-2 border-t border-l border-[#ffcc00]" />
                <span className="absolute top-1 right-1 w-2 h-2 border-t border-r border-[#ffcc00]" />
                <span className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-[#ffcc00]" />
                <span className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-[#ffcc00]" />

                {/* Official ROBOTiX Club NIT Raipur Logo */}
                <img
                  src="/assets/aistudio/image_66ed7668.png"
                  alt="NIT Raipur ROBOTiX Club Insignia"
                  className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain filter drop-shadow-[0_0_12px_rgba(255,255,255,0.85)] group-hover:scale-105 transition-transform duration-300"
                />

                {/* Tech Badge Below Logo */}
                <div className="absolute -bottom-2.5 px-2.5 py-0.5 bg-[#0c0e15] border border-[#ff3b30] rounded-sm text-[8px] sm:text-[9px] font-mono font-bold tracking-widest text-[#ffcc00] whitespace-nowrap shadow-[0_0_10px_rgba(255,59,48,0.5)]">
                  NIT RAIPUR
                </div>
              </div>
            </div>
          </div>

          {/* HEADLINE */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-display tracking-tight text-white uppercase drop-shadow-[0_4px_35px_rgba(255,59,48,0.8)]">
            ROBOFEST<span className="text-[#ff3b30]">'26</span>
          </h1>

          <div className="text-xs sm:text-sm font-mono font-bold tracking-[0.25em] text-[#ffcc00] uppercase mt-1">
            WHERE INNOVATION, AI & COMBAT COLLIDE
          </div>

          {/* LIVE COMBAT ARENA COUNTDOWN TIMER */}
          <div className="my-4 flex flex-col items-center">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[#ffcc00] uppercase tracking-widest mb-2 px-2.5 py-0.5 rounded-full bg-black/60 border border-[#ffcc00]/30 backdrop-blur-md">
              <Clock className="w-3.5 h-3.5 text-[#ff3b30] animate-pulse" />
              <span>ARENA COMMENCEMENT COUNTDOWN</span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {/* DAYS */}
              <div className="flex flex-col items-center justify-center w-13 sm:w-16 py-1.5 sm:py-2 bg-[#0c0e15]/80 backdrop-blur-xl border border-white/15 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
                <span className="text-xl sm:text-3xl font-black font-display text-white">{timeLeft.days}</span>
                <span className="text-[8px] sm:text-[9px] font-mono text-slate-400 tracking-wider">DAYS</span>
              </div>
              <span className="text-lg sm:text-xl font-bold text-[#ff3b30] animate-pulse">:</span>

              {/* HOURS */}
              <div className="flex flex-col items-center justify-center w-13 sm:w-16 py-1.5 sm:py-2 bg-[#0c0e15]/80 backdrop-blur-xl border border-white/15 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
                <span className="text-xl sm:text-3xl font-black font-display text-white">{timeLeft.hours}</span>
                <span className="text-[8px] sm:text-[9px] font-mono text-slate-400 tracking-wider">HOURS</span>
              </div>
              <span className="text-lg sm:text-xl font-bold text-[#ff3b30] animate-pulse">:</span>

              {/* MINS */}
              <div className="flex flex-col items-center justify-center w-13 sm:w-16 py-1.5 sm:py-2 bg-[#0c0e15]/80 backdrop-blur-xl border border-white/15 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
                <span className="text-xl sm:text-3xl font-black font-display text-white">{timeLeft.minutes}</span>
                <span className="text-[8px] sm:text-[9px] font-mono text-slate-400 tracking-wider">MINS</span>
              </div>
              <span className="text-lg sm:text-xl font-bold text-[#ff3b30] animate-pulse">:</span>

              {/* SECS */}
              <div className="flex flex-col items-center justify-center w-13 sm:w-16 py-1.5 sm:py-2 bg-[#0c0e15]/80 backdrop-blur-xl border border-[#ff3b30]/50 rounded-xl shadow-[0_0_15px_rgba(255,59,48,0.3)]">
                <span className="text-xl sm:text-3xl font-black font-display text-[#ffcc00]">{timeLeft.seconds}</span>
                <span className="text-[8px] sm:text-[9px] font-mono text-[#ff3b30] font-bold tracking-wider">SECS</span>
              </div>
            </div>
          </div>

          {/* DATES & PRIZE CALLOUT WITH GLASSMORPHISM */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-mono">
            <div className="px-3.5 py-1.5 bg-black/60 backdrop-blur-xl border border-white/15 rounded-xl text-white flex items-center gap-2 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#ff3b30] animate-pulse" />
              <span>22 - 23 MARCH 2026</span>
            </div>
            <div className="px-3.5 py-1.5 bg-black/60 backdrop-blur-xl border border-[#ffcc00]/40 rounded-xl text-[#ffcc00] font-bold flex items-center gap-2 shadow-lg">
              <Award className="w-4 h-4 text-[#ffcc00]" />
              <span>₹90,000+ PRIZE POOL</span>
            </div>
            <div className="px-3.5 py-1.5 bg-black/60 backdrop-blur-xl border border-white/15 rounded-xl text-slate-300 shadow-lg">
              NIT RAIPUR CAMPUS
            </div>
          </div>

          {/* QUICK ACTION BUTTONS */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                sound.playConfirm();
                onDeployBot();
              }}
              className="tactical-btn-glitch px-5 py-2.5 bg-[#ff3b30] hover:bg-[#ff5500] text-white font-mono font-bold text-xs uppercase clip-chamfer-sm cursor-pointer shadow-[0_0_20px_rgba(255,59,48,0.5)] transition-all flex items-center gap-2"
            >
              <span>ENTER THE ARENA [REC]</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                sound.playBlip(700);
                onDownloadRulebook();
              }}
              className="tactical-btn-glitch px-5 py-2.5 bg-black/70 hover:bg-[#ffcc00] hover:text-black border border-[#ffcc00] text-[#ffcc00] font-mono font-bold text-xs uppercase clip-chamfer-sm cursor-pointer transition-all flex items-center gap-2 backdrop-blur-xl"
            >
              <FileText className="w-4 h-4" />
              <span>DOWNLOAD BRIEFING [PDF]</span>
            </button>
          </div>

          {/* SCROLL TRIGGER INSTRUCTION BEACON (Click or 1 Scroll to unlatch) */}
          <button
            onClick={() => {
              sound.playConfirm();
              const hero = document.getElementById('gateway-hero');
              if (hero) {
                window.scrollTo({ top: hero.offsetTop + 140, behavior: 'smooth' });
              }
            }}
            className="mt-8 flex flex-col items-center gap-1.5 font-mono text-xs font-bold tracking-widest text-[#ffcc00] hover:text-white uppercase transition-colors cursor-pointer group"
            title="Welcome to ANANTYA'26: Tech Fest NIT Raipur"
          >
            <span className="group-hover:tracking-wider transition-all">▼ Welcome to ANANTYA 26: Tech Fest NIT Raipur ▼</span>
            <ChevronDown className="w-5 h-5 text-[#ff3b30] animate-bounce" />
          </button>
        </motion.div>

      </div>
    </section>
  );
};
