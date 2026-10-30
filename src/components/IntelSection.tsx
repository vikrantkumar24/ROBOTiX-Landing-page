import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Flame, Target, Cpu, Lightbulb } from 'lucide-react';
import { sound } from '../utils/audioEngine';

interface DivisionCardProps {
  divNum: string;
  category: string;
  title: string;
  description: string;
  statLabel: string;
  statValue: string;
  icon: React.ReactNode;
  accentColor: '#ff3b30' | '#ffcc00';
  soundFreq: number;
}

const DivisionCard: React.FC<DivisionCardProps> = ({
  divNum,
  category,
  title,
  description,
  statLabel,
  statValue,
  icon,
  accentColor,
  soundFreq,
}) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;
    setTilt({ x: -normY * 6, y: normX * 6 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => sound.playBlip(soundFreq)}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
      }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className={`group relative bg-[#0c0e15] border p-5 clip-chamfer transition-colors cursor-pointer flex flex-col justify-between shadow-lg ${
        accentColor === '#ff3b30'
          ? 'border-[#1f2433] hover:border-[#ff3b30] hover:shadow-[0_10px_25px_rgba(255,59,48,0.2)]'
          : 'border-[#1f2433] hover:border-[#ffcc00] hover:shadow-[0_10px_25px_rgba(255,204,0,0.2)]'
      }`}
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div 
            className="w-9 h-9 bg-[#050609] border flex items-center justify-center clip-chamfer-sm transition-transform group-hover:scale-105"
            style={{ borderColor: `${accentColor}80`, color: accentColor }}
          >
            {icon}
          </div>
          <span 
            className="text-[10px] font-mono font-bold tracking-wider"
            style={{ color: accentColor }}
          >
            {divNum} // {category}
          </span>
        </div>

        <h3 className="text-base font-bold text-white font-display mb-1.5 group-hover-tactical-glitch hover-tactical-glitch transition-colors">
          {title}
        </h3>

        <p className="text-slate-400 font-mono text-xs leading-relaxed">
          {description}
        </p>
      </div>

      <div className="pt-3 border-t border-[#1a1e29] flex items-center justify-between font-mono mt-4">
        <span className="text-[10px] text-slate-500 uppercase">{statLabel}</span>
        <span 
          className="font-bold text-xs"
          style={{ color: accentColor }}
        >
          {statValue}
        </span>
      </div>
    </motion.div>
  );
};

export const IntelSection: React.FC = () => {
  return (
    <section id="intel" className="py-16 lg:py-20 relative bg-[#050609] border-b border-[#1f2433] radar-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Minimal & Crisp */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-mono tracking-widest text-[#ff3b30] uppercase mb-1.5 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#ffcc00] animate-pulse" />
              <span>[ 01. TOURNAMENT INTEL ]</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight font-display uppercase hover-tactical-glitch cursor-default">
              TECHNICAL DIVISIONS
            </h2>
            <p className="text-slate-400 text-xs font-mono mt-1">
              Four specialized engineering tracks at NIT Raipur.
            </p>
          </div>

          <div className="text-right font-mono text-xs text-slate-400 hidden md:block">
            <span className="text-[#ffcc00] font-bold">22 - 23 MARCH 2026</span>
            <span className="text-slate-600 mx-2">•</span>
            <span>NIT RAIPUR CAMPUS</span>
          </div>
        </div>

        {/* 4 Technical Divisions in Clean Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <DivisionCard
            divNum="DIV.01"
            category="KINETIC"
            title="Combat Robotics"
            description="8.0 kg full-contact destruction with titanium vertical spinning drums."
            statLabel="ARENA LIMIT"
            statValue="8.0 KG COMBAT"
            icon={<Flame className="w-4 h-4" />}
            accentColor="#ff3b30"
            soundFreq={500}
          />

          <DivisionCard
            divNum="DIV.02"
            category="AUTONOMY"
            title="Swarm Drones & Sim"
            description="24-Hour autonomous aerial swarm and rover simulation using ROS2."
            statLabel="FORMAT"
            statValue="24H HACKATHON"
            icon={<Target className="w-4 h-4" />}
            accentColor="#ffcc00"
            soundFreq={580}
          />

          <DivisionCard
            divNum="DIV.03"
            category="EMBEDDED"
            title="Real-Time Firmware"
            description="Bare-metal FreeRTOS, STM32 & FPGA high-frequency hardware benches."
            statLabel="HARDWARE"
            statValue="STM32 / ESP32"
            icon={<Cpu className="w-4 h-4" />}
            accentColor="#ff3b30"
            soundFreq={660}
          />

          <DivisionCard
            divNum="DIV.04"
            category="INNOVATION"
            title="Hardware Ideathon"
            description="Working physical prototypes with direct incubation grant fast-track."
            statLabel="INCUBATION"
            statValue="GRANT BACKED"
            icon={<Lightbulb className="w-4 h-4" />}
            accentColor="#ffcc00"
            soundFreq={740}
          />
        </div>

      </div>
    </section>
  );
};
