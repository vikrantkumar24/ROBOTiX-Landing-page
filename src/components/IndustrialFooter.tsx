import React, { useState } from 'react';
import { 
  ArrowUp, 
  MapPin, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Github, 
  Twitter, 
  Mail, 
  Phone, 
  Copy, 
  Check, 
  ArrowUpRight 
} from 'lucide-react';
import { sound } from '../utils/audioEngine';

interface SocialLink {
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  { name: 'Instagram', url: 'https://instagram.com', icon: Instagram, color: '#E1306C' },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: Linkedin, color: '#0A66C2' },
  { name: 'YouTube', url: 'https://youtube.com', icon: Youtube, color: '#FF0000' },
  { name: 'GitHub', url: 'https://github.com', icon: Github, color: '#FFFFFF' },
  { name: 'X', url: 'https://twitter.com', icon: Twitter, color: '#1DA1F2' },
];

export const IndustrialFooter: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const scrollToTop = () => {
    sound.playHydraulic();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyEmail = () => {
    sound.playConfirm();
    navigator.clipboard.writeText('robotix@nitrr.ac.in');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToSection = (id: string) => {
    sound.playBlip(750);
    if (id === 'bot-showcase') {
      const hero = document.getElementById('gateway-hero');
      if (hero) {
        window.scrollTo({ top: hero.offsetTop + 140, behavior: 'smooth' });
        return;
      }
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="footer" className="relative w-full bg-[#040508] border-t border-white/10 text-slate-400 font-mono text-xs overflow-hidden">
      
      {/* PERSISTENT ULTRA-SUBTLE CRT SCANLINE */}
      <div className="absolute inset-0 crt-scanline-overlay pointer-events-none opacity-15" />
      
      {/* SOFT AMBIENT GLOW ACCENT */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[200px] bg-gradient-to-r from-[#ff3b30]/10 via-[#ffcc00]/10 to-[#ff3b30]/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        
        {/* MAIN SLEEK 4-COLUMN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-10 border-b border-white/10">
          
          {/* COL 1: BRAND IDENTITY & SOCIALS (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#0c0e15] border border-[#ff3b30] p-1.5 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(255,59,48,0.3)]">
                <img 
                  src="/assets/aistudio/image_66ed7668.png" 
                  alt="ROBOTiX Logo" 
                  className="w-full h-full object-contain filter drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]"
                />
              </div>
              <div>
                <div className="text-base font-display font-black tracking-wider text-white uppercase flex items-center gap-1.5">
                  <span>ROBOTiX CLUB</span>
                  <span className="text-[#ff3b30] text-xs font-mono font-bold">[NITRR]</span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono tracking-wider">
                  NATIONAL INSTITUTE OF TECHNOLOGY RAIPUR • EST. 1956
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Central India's flagship combat robotics convention and autonomous simulation tournament. Engineered for extreme kinetic innovation.
            </p>

            {/* Clean Social Icons Row */}
            <div className="flex items-center gap-2 pt-1">
              {SOCIAL_LINKS.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => sound.playBlip(800)}
                    className="w-8 h-8 rounded-lg bg-[#0c0e15] border border-white/10 hover:border-white/40 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200 group cursor-pointer"
                    title={item.name}
                    aria-label={item.name}
                  >
                    <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* COL 2: QUICK NAVIGATION (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-[11px] font-bold text-white uppercase tracking-wider font-mono">
              DIRECTORIES
            </div>
            <ul className="space-y-2 text-xs">
              {[
                { id: 'gateway-hero', label: 'Gateway Entrance' },
                { id: 'bot-showcase', label: 'Combat Bots Arsenal' },
                { id: 'arenas', label: '7 Official Arenas' },
                { id: 'intel', label: 'Mission Intel & Divisions' },
                { id: 'album', label: 'Tournament Album' },
                { id: 'reach', label: 'Pan-India Reach' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-slate-400 hover:text-[#ffcc00] transition-colors cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 3: COMMS & VENUE (4 Cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-[11px] font-bold text-white uppercase tracking-wider font-mono">
              DISPATCH HELPDESK
            </div>

            <div className="space-y-2.5 text-xs text-slate-400">
              {/* Address */}
              <div className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#ff3b30] shrink-0 mt-0.5" />
                <span>Dept. of Mechanical Engineering, NIT Raipur, G.E. Road, Raipur, CG — 492010</span>
              </div>

              {/* Email with copy */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-3.5 h-3.5 text-[#ffcc00] shrink-0" />
                  <a href="mailto:robotix@nitrr.ac.in" className="hover:text-white transition-colors">
                    robotix@nitrr.ac.in
                  </a>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="px-2 py-0.5 rounded bg-[#0c0e15] border border-white/10 hover:border-[#ffcc00] text-[10px] text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                >
                  {copied ? <Check className="w-3 h-3 text-[#ffcc00]" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>+91 771 2254200 (NITRR EXT)</span>
              </div>
            </div>

            {/* Quick Register CTA Button */}
            <div className="pt-2">
              <button
                onClick={() => scrollToSection('register')}
                onMouseEnter={() => sound.playBlip(750)}
                className="tactical-btn-glitch w-full py-2 px-3 rounded-lg bg-[#ff3b30] hover:bg-[#ff5500] text-white font-mono font-bold text-xs uppercase transition-all shadow-[0_0_12px_rgba(255,59,48,0.3)] hover:shadow-[0_0_18px_rgba(255,59,48,0.6)] flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>REGISTER SQUAD MATRIX</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* BOTTOM MINIMAL SUB-STRIP */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffcc00] animate-pulse" />
            <span>21.2497° N, 81.6050° E // ALL ARENA SYSTEMS ONLINE</span>
          </div>

          <div>
            © 2026 ROBOTiX CLUB • NIT RAIPUR. ALL RIGHTS RESERVED.
          </div>

          <button
            onClick={scrollToTop}
            onMouseEnter={() => sound.playBlip(850)}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer group"
            aria-label="Back to top"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

        </div>

      </div>
    </footer>
  );
};
