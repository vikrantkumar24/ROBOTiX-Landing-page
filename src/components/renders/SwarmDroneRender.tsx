import React, { useState, useEffect } from 'react';
import { Radio, Crosshair, Zap, Compass, Layers } from 'lucide-react';

export const SwarmDroneRender: React.FC = () => {
  const [velocity, setVelocity] = useState(34.2);
  const [swarmSync, setSwarmSync] = useState(99.8);
  const [dronePulse, setDronePulse] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVelocity(prev => Number((33.8 + Math.random() * 0.9).toFixed(1)));
      setSwarmSync(prev => Number((99.5 + Math.random() * 0.4).toFixed(1)));
      setDronePulse(p => (p + 1) % 360);
    }, 450);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full min-h-[220px] sm:min-h-[260px] bg-[#030407] rounded-none overflow-hidden border border-[#ffcc00]/50 select-none">
      
      {/* Background Proving Ground & Laser Guide Grid */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#ffcc00]/10 via-[#0a0705] to-[#040508] pointer-events-none" />
      <div className="absolute inset-0 radar-grid opacity-35 pointer-events-none" />

      {/* Hexagonal Course Gates */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="amber-beam" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff3b30" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ffaa00" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ffcc00" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Course Ring Gate 1 (Left) */}
        <polygon points="50,40 85,25 120,40 120,80 85,95 50,80" fill="none" stroke="#ffcc00" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
        
        {/* Course Ring Gate 2 (Center Active Gate) */}
        <polygon points="150,20 220,10 290,20 290,110 220,120 150,110" fill="none" stroke="#ff3b30" strokeWidth="2.5" opacity="0.8" className="animate-pulse" />
        <circle cx="220" cy="65" r="3" fill="#ffcc00" />

        {/* Course Ring Gate 3 (Right Distance) */}
        <polygon points="320,45 350,35 380,45 380,85 350,95 320,85" fill="none" stroke="#ffcc00" strokeWidth="1" strokeDasharray="4 2" opacity="0.4" />

        {/* Lidar Guide Beams across the Course */}
        <line x1="20" y1="95" x2="420" y2="45" stroke="url(#amber-beam)" strokeWidth="1.5" strokeDasharray="6 4" />
        <line x1="20" y1="50" x2="420" y2="85" stroke="#ff3b30" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
      </svg>

      {/* Top Banner Telemetry */}
      <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-[#ffcc00]/20 to-transparent flex justify-between px-4 py-1 text-[9px] font-mono text-[#ffcc00] border-b border-[#ffcc00]/40">
        <span>● AUTONOMOUS SWARM PROVING GROUND // ROS2 HUMBLE</span>
        <span className="text-[#ff3b30] font-bold">VIO LOCALIZATION: LOCKED</span>
      </div>

      {/* Main Autonomous Drone Swarm Formation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-80 sm:w-96 h-44 flex items-center justify-center">
          
          {/* Drone 01: Lead Alpha Drone (Center-Front) */}
          <div className="relative z-20 flex flex-col items-center">
            <div className="relative">
              <svg width="120" height="70" viewBox="0 0 120 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="filter drop-shadow-[0_0_15px_rgba(255,204,0,0.6)]">
                {/* Central Carbon Fuselage */}
                <path d="M45 32 H75 L70 42 H50 Z" fill="#18181f" stroke="#ffcc00" strokeWidth="1.5" />
                <circle cx="60" cy="37" r="4" fill="#ff3b30" className="animate-pulse" />
                
                {/* Quad Arms */}
                <line x1="45" y1="34" x2="20" y2="18" stroke="#cbd5e1" strokeWidth="2.5" />
                <line x1="75" y1="34" x2="100" y2="18" stroke="#cbd5e1" strokeWidth="2.5" />
                <line x1="48" y1="40" x2="24" y2="54" stroke="#64748b" strokeWidth="2" />
                <line x1="72" y1="40" x2="96" y2="54" stroke="#64748b" strokeWidth="2" />
                
                {/* Rotors (High-Speed Blur Discs) */}
                <ellipse cx="20" cy="18" rx="16" ry="4" fill="#ffcc00" fillOpacity="0.35" stroke="#ffcc00" strokeWidth="0.8" />
                <ellipse cx="100" cy="18" rx="16" ry="4" fill="#ffcc00" fillOpacity="0.35" stroke="#ffcc00" strokeWidth="0.8" />
                <ellipse cx="24" cy="54" rx="14" ry="3.5" fill="#ff3b30" fillOpacity="0.35" stroke="#ff3b30" strokeWidth="0.8" />
                <ellipse cx="96" cy="54" rx="14" ry="3.5" fill="#ff3b30" fillOpacity="0.35" stroke="#ff3b30" strokeWidth="0.8" />

                {/* Front Optical Flow Sensor Beacon */}
                <circle cx="60" cy="40" r="1.5" fill="#ffffff" />
              </svg>
            </div>
          </div>

          {/* Wingman Drone 02 (Left Escort) */}
          <div className="absolute left-6 top-8 z-10 opacity-80 scale-75">
            <svg width="80" height="50" viewBox="0 0 120 70" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M45 32 H75 L70 42 H50 Z" fill="#18181f" stroke="#ffcc00" strokeWidth="1" />
              <circle cx="60" cy="37" r="3" fill="#ffcc00" />
              <line x1="45" y1="34" x2="20" y2="18" stroke="#cbd5e1" strokeWidth="2" />
              <line x1="75" y1="34" x2="100" y2="18" stroke="#cbd5e1" strokeWidth="2" />
              <ellipse cx="20" cy="18" rx="14" ry="3" fill="#ffcc00" fillOpacity="0.3" stroke="#ffcc00" />
              <ellipse cx="100" cy="18" rx="14" ry="3" fill="#ffcc00" fillOpacity="0.3" stroke="#ffcc00" />
            </svg>
          </div>

          {/* Wingman Drone 03 (Right Escort) */}
          <div className="absolute right-6 top-7 z-10 opacity-80 scale-75">
            <svg width="80" height="50" viewBox="0 0 120 70" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M45 32 H75 L70 42 H50 Z" fill="#18181f" stroke="#ffcc00" strokeWidth="1" />
              <circle cx="60" cy="37" r="3" fill="#ffcc00" />
              <line x1="45" y1="34" x2="20" y2="18" stroke="#cbd5e1" strokeWidth="2" />
              <line x1="75" y1="34" x2="100" y2="18" stroke="#cbd5e1" strokeWidth="2" />
              <ellipse cx="20" cy="18" rx="14" ry="3" fill="#ffcc00" fillOpacity="0.3" stroke="#ffcc00" />
              <ellipse cx="100" cy="18" rx="14" ry="3" fill="#ffcc00" fillOpacity="0.3" stroke="#ffcc00" />
            </svg>
          </div>

        </div>
      </div>

      {/* Bottom Live Flight Telemetry Readouts */}
      <div className="absolute inset-x-0 bottom-0 bg-[#030407]/90 border-t border-[#ffcc00]/30 px-3 py-1.5 flex items-center justify-between font-mono text-[9px] text-slate-300">
        <div className="flex items-center gap-3">
          <span className="text-[#ffcc00]">SWARM: 3 UNITS</span>
          <span className="text-white">VELOCITY: {velocity} M/S</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#ff3b30] font-bold">FORMATION: V-VECTOR</span>
          <span className="text-[#ffcc00] font-bold">SYNC: {swarmSync}%</span>
        </div>
      </div>

    </div>
  );
};
