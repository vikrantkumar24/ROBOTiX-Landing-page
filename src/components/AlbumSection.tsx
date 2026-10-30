import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Camera, Trophy, Flame } from 'lucide-react';
import { sound } from '../utils/audioEngine';

interface AlbumPhoto {
  id: string;
  image: string;
  caption: string;
  role: string;
  tag: string;
}

const ALBUM_PHOTOS: AlbumPhoto[] = [
  {
    id: 'faruq',
    image: '/assets/aistudio/faruq.e0909d3ab44ea6865abb_8335cf4c.webp',
    caption: 'ARENA ANNOUNCER // PYRO SPECTACLE',
    role: 'Faruq Tauheed Style Ringmaster',
    tag: 'CEREMONY',
  },
  {
    id: 'bella',
    image: '/assets/aistudio/bella.eb7b9b4b8ef57732186c_50772aa5.webp',
    caption: 'WARRIOR SPIRIT // PIT CREW ENERGY',
    role: 'Combat Pilot Adrenaline',
    tag: 'BATTLE SPIRIT',
  },
  {
    id: 'uai',
    image: '/assets/aistudio/uai.9bc0f5687b061549b59d_1dee15e2.webp',
    caption: 'SQUAD CELEBRATION // PODIUM VICTORY',
    role: 'Champion Robot Builders',
    tag: 'CHAMPIONS',
  },
  {
    id: 'orby',
    image: '/assets/aistudio/orby.e4e78acefaf8eb81a002_c03c235e.webp',
    caption: 'ORBY BLADE // HEAVYWEIGHT TROPHY',
    role: 'Grand Tournament Finalist',
    tag: 'FINALS',
  },
  {
    id: 'solarbot',
    image: '/assets/aistudio/solarbot.f877545a3fc8876ee60d_e95b7b28.webp',
    caption: 'SOLARBOT LEAGUE // MEDAL CEREMONY',
    role: 'Precision Engineering Award',
    tag: 'HONORS',
  },
  {
    id: 'riobotz',
    image: '/assets/aistudio/riobotz.312489570c9ba6d6702e_ba4a0949.webp',
    caption: 'RIOBOTZ MINOTAUR // COMBAT LEGEND',
    role: 'Titanium Drum Spinner Pioneer',
    tag: 'LEGEND',
  },
];

export const AlbumSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollManual = (direction: 'left' | 'right') => {
    sound.playBlip(700);
    if (!scrollContainerRef.current) return;
    const scrollAmount = 340;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section 
      id="album" 
      className="relative w-full bg-[#050609] py-20 px-4 sm:px-6 lg:px-8 border-b border-[#1f2433] overflow-hidden"
    >
      {/* PERSISTENT SCANLINES */}
      <div className="absolute inset-0 crt-scanline-overlay pointer-events-none opacity-25" />

      {/* AMBIENT RADIAL RED FLAME */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[350px] bg-[#ff3b30]/10 blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* SECTION HEADER & NAV CONTROLS */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ff3b30]/15 border border-[#ff3b30]/50 text-[#ff3b30] font-mono text-xs uppercase tracking-widest clip-chamfer-sm mb-2">
              <Camera className="w-3.5 h-3.5 text-[#ff3b30]" />
              <span>TOURNAMENT ARCHIVES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-display text-white uppercase tracking-tight drop-shadow-[0_4px_25px_rgba(255,59,48,0.5)]">
              THE COMBAT ALBUM
            </h2>
            <p className="font-mono text-xs text-slate-400 mt-1">
              Highlights from previous arena showdowns and podium ceremonies.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollManual('left')}
              aria-label="Scroll left"
              className="w-10 h-10 rounded bg-[#0c0e15] hover:bg-[#ff3b30] border border-white/20 hover:border-[#ff3b30] text-white flex items-center justify-center transition-all cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.5)]"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollManual('right')}
              aria-label="Scroll right"
              className="w-10 h-10 rounded bg-[#0c0e15] hover:bg-[#ff3b30] border border-white/20 hover:border-[#ff3b30] text-white flex items-center justify-center transition-all cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.5)]"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* HORIZONTAL PHOTO GALLERY (NO OVERLAPPING, CLEAN SCROLL & SNAP) */}
        <div 
          ref={scrollContainerRef}
          className="w-full overflow-x-auto pb-4 scrollbar-none flex gap-5 sm:gap-6 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none' }}
        >
          {ALBUM_PHOTOS.map((photo) => (
            <div
              key={photo.id}
              onMouseEnter={() => sound.playBlip(750)}
              className="shrink-0 w-[270px] sm:w-[320px] rounded-xl overflow-hidden border border-white/15 hover:border-[#ff3b30] bg-[#0c0e15] shadow-[0_12px_30px_rgba(0,0,0,0.8)] transition-all duration-300 group snap-start cursor-pointer"
            >
              {/* PHOTO CONTAINER */}
              <div className="relative aspect-[4/5] overflow-hidden bg-black">
                <img
                  src={photo.image}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />
                
                {/* TAG BADGE */}
                <div className="absolute top-3 left-3 px-2 py-0.5 bg-black/85 border border-[#ffcc00] text-[#ffcc00] font-mono text-[10px] font-bold uppercase rounded">
                  {photo.tag}
                </div>

                {/* BOTTOM CAPTION */}
                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <div className="text-[10px] font-mono text-[#ffcc00] uppercase tracking-wider flex items-center gap-1">
                    <Flame className="w-3 h-3 text-[#ff3b30]" />
                    <span>{photo.role}</span>
                  </div>
                  <div className="font-display font-bold text-sm sm:text-base text-white uppercase tracking-tight mt-1">
                    {photo.caption}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
