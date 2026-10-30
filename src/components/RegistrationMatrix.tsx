import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Terminal, 
  RefreshCw, 
  Download, 
  Users, 
  Radio, 
  ArrowRight,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { ARENAS_DATA } from '../data/robofestData';
import { sound } from '../utils/audioEngine';

interface RegistrationMatrixProps {
  preselectedArenaId?: string;
}

interface PilotTeammate {
  callsign: string;
  email: string;
}

interface CommandFormData {
  callsignLeader: string;
  pilotCommsEmail: string;
  collegeInstitution: string;
  targetArena: string;
  teamSize: number;
  teammates: PilotTeammate[];
  botBrief: string;
  safetyGuidelinesConfirmed: boolean;
  requestHostelBunker: boolean;
}

interface VerifiedRegistration {
  serialId: string;
  registeredAt: string;
  data: CommandFormData;
}

const QUICK_COLLEGES = [
  'NIT Raipur',
  'IIT Bhilai',
  'IIIT Naya Raipur',
  'CSVTU Bhilai',
  'BIT Durg',
  'IIT Kharagpur'
];

export const RegistrationMatrix: React.FC<RegistrationMatrixProps> = ({
  preselectedArenaId,
}) => {
  const [formData, setFormData] = useState<CommandFormData>({
    callsignLeader: '',
    pilotCommsEmail: '',
    collegeInstitution: 'NIT Raipur',
    targetArena: preselectedArenaId || 'robowar',
    teamSize: 2,
    teammates: [{ callsign: '', email: '' }],
    botBrief: '',
    safetyGuidelinesConfirmed: false,
    requestHostelBunker: false
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [confirmedRecord, setConfirmedRecord] = useState<VerifiedRegistration | null>(null);

  useEffect(() => {
    if (preselectedArenaId) {
      setFormData(prev => ({ ...prev, targetArena: preselectedArenaId }));
    }
  }, [preselectedArenaId]);

  const handleTeamSizeChange = (newSize: number) => {
    sound.playBlip(550);
    const additionalNeeded = newSize - 1;
    let list = [...formData.teammates];
    if (additionalNeeded > list.length) {
      for (let i = list.length; i < additionalNeeded; i++) {
        list.push({ callsign: '', email: '' });
      }
    } else {
      list = list.slice(0, additionalNeeded);
    }
    setFormData(prev => ({ ...prev, teamSize: newSize, teammates: list }));
  };

  const validate = (): boolean => {
    const errs: { [key: string]: string } = {};

    if (!formData.callsignLeader.trim()) {
      errs.callsignLeader = 'TEAM LEADER / CALLSIGN IS REQUIRED';
    }
    if (!formData.pilotCommsEmail.trim()) {
      errs.pilotCommsEmail = 'LEADER EMAIL / COMMS IS REQUIRED';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.pilotCommsEmail)) {
      errs.pilotCommsEmail = 'INVALID EMAIL FORMAT';
    }
    if (!formData.collegeInstitution.trim()) {
      errs.collegeInstitution = 'COLLEGE / INSTITUTION IS REQUIRED';
    }
    if (!formData.safetyGuidelinesConfirmed) {
      errs.safety = 'MANDATORY: YOU MUST CONFIRM SAFETY & ISOLATION COMPLIANCE';
    }

    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      sound.playWarning();
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    sound.playHydraulic();
    setIsTransmitting(true);

    setTimeout(() => {
      const code = Math.floor(1000 + Math.random() * 9000);
      const prefix = formData.targetArena.slice(0, 3).toUpperCase();
      const serialId = `RF26-${prefix}-${code}`;

      const record: VerifiedRegistration = {
        serialId,
        registeredAt: new Date().toLocaleString('en-IN', {
          dateStyle: 'medium',
          timeStyle: 'short'
        }),
        data: { ...formData }
      };

      sound.playConfirm();
      setConfirmedRecord(record);
      setIsTransmitting(false);
    }, 500);
  };

  const handleDownloadLicense = () => {
    if (!confirmedRecord) return;
    sound.playBlip(700);

    const receipt = `
======================================================================
         ROBOFEST'26 // OFFICIAL COMBAT PILOT ENTRY LICENSE
             ROBOTiX CLUB • NATIONAL INSTITUTE OF TECHNOLOGY RAIPUR
======================================================================

CLEARANCE SERIAL:   ${confirmedRecord.serialId}
SECURITY TIMESTAMP: ${confirmedRecord.registeredAt}
STATUS:             ● AUTHORIZED ENTRY PASS

TARGET DIVISION:    [ ${confirmedRecord.data.targetArena.toUpperCase()} ]
VENUE SECTOR:       NIT RAIPUR CAMPUS GROUNDS, RAIPUR, CHHATTISGARH
COORDINATES:        21.2497° N, 81.6050° E

PILOT COMMAND PROFILE:
----------------------
CALLSIGN / LEADER:  ${confirmedRecord.data.callsignLeader}
AFFILIATION:        ${confirmedRecord.data.collegeInstitution}
PILOT COMMS EMAIL:  ${confirmedRecord.data.pilotCommsEmail}
CREW MANPOWER:      ${confirmedRecord.data.teamSize} PILOTS

REPORTING DIRECTIVES:
1. Report to Central Scrutineering Arena by 08:30 AM on 22 March 2026.
2. Present this official clearance receipt along with collegiate photo ID.
3. Bring isolated radio transmitters and custom battery charging safety fire-bags.

CONVENOR: ROBOTiX Club, National Institute of Technology Raipur
OFFICIAL COMMS: robotix@nitrr.ac.in
======================================================================
`;

    const blob = new Blob([receipt], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${confirmedRecord.serialId}_ENTRY_LICENSE.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleRegisterAnother = () => {
    sound.playBlip(500);
    setConfirmedRecord(null);
    setFormData({
      callsignLeader: '',
      pilotCommsEmail: '',
      collegeInstitution: 'NIT Raipur',
      targetArena: 'robowar',
      teamSize: 2,
      teammates: [{ callsign: '', email: '' }],
      botBrief: '',
      safetyGuidelinesConfirmed: false,
      requestHostelBunker: false
    });
    setErrors({});
  };

  const activeArenaObj = ARENAS_DATA.find(a => a.id === formData.targetArena);

  return (
    <section id="register" className="py-20 lg:py-24 relative bg-[#050609] border-b border-[#1f2433] radar-grid">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0c0e15] border border-[#ff3b30]/50 text-[#ff3b30] font-mono text-xs uppercase tracking-widest mb-2 clip-chamfer-sm">
            <Radio className="w-3.5 h-3.5 text-[#ffcc00] animate-pulse" />
            <span>[ SQUAD REGISTRATION ]</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-display uppercase">
            Register Your Squad
          </h2>
          <p className="text-slate-400 text-xs font-mono mt-1">
            Reserve your arena slot and generate an official clearance license.
          </p>
        </div>

        {/* VERIFICATION / CONFIRMATION TICKET SCREEN */}
        {confirmedRecord ? (
          <div className="relative bg-[#0c0e15] border-2 border-[#ffcc00] p-6 sm:p-8 clip-chamfer shadow-[0_0_40px_rgba(255,204,0,0.25)] animate-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-[#1f2433] gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#050609] border border-[#ffcc00] flex items-center justify-center text-[#ffcc00] clip-chamfer-sm">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-xs font-mono text-[#ffcc00] font-bold tracking-widest uppercase">
                    ● REGISTRATION VERIFIED // ENTRY LICENSE GRANTED
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white font-display uppercase mt-0.5">
                    Clearance Pass Dispatched
                  </h3>
                </div>
              </div>

              <div className="text-left sm:text-right font-mono">
                <div className="text-[10px] text-slate-500 uppercase">CLEARANCE SERIAL</div>
                <div className="text-lg sm:text-xl font-black text-[#ffcc00] tracking-wider">
                  {confirmedRecord.serialId}
                </div>
              </div>
            </div>

            {/* Content Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-b border-[#1f2433] font-mono text-xs">
              <div className="md:col-span-2 space-y-3">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">TARGET ARENA</span>
                  <div className="text-base font-bold text-white uppercase flex items-center gap-2 mt-0.5">
                    <span>{confirmedRecord.data.targetArena.toUpperCase()}</span>
                    <span className="text-xs px-2 py-0.5 bg-[#ff3b30]/20 text-[#ff3b30] border border-[#ff3b30]/40">
                      {activeArenaObj?.prizePool} POOL
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div>
                    <span className="text-[10px] text-slate-500 block">CALLSIGN / LEADER</span>
                    <div className="text-sm font-bold text-slate-100">{confirmedRecord.data.callsignLeader}</div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">INSTITUTION</span>
                    <div className="text-sm font-bold text-slate-100">{confirmedRecord.data.collegeInstitution}</div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">COMMS EMAIL</span>
                    <div className="text-sm font-bold text-slate-100 truncate">{confirmedRecord.data.pilotCommsEmail}</div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">CREW MANPOWER</span>
                    <div className="text-sm font-bold text-[#ffcc00]">{confirmedRecord.data.teamSize} PILOTS</div>
                  </div>
                </div>
              </div>

              {/* Barcode Matrix Card */}
              <div className="flex flex-col items-center justify-center p-4 bg-[#050609] border border-[#1f2433] clip-chamfer text-center">
                <div className="w-full h-12 flex items-center justify-center gap-1 bg-white p-2 mb-2">
                  {[2, 4, 1, 3, 1, 2, 4, 1, 3, 2, 1, 4, 1, 3, 2, 4].map((w, i) => (
                    <div key={i} className="h-full bg-black" style={{ width: `${w * 2}px` }} />
                  ))}
                </div>
                <div className="text-[9px] font-mono text-slate-400">
                  SCRUTINEERING BARCODE VALID
                </div>
                <div className="text-xs font-mono font-bold text-[#ffcc00] mt-1">
                  NITRR // COMBAT ARENA
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-5 flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={handleRegisterAnother}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#050609] hover:bg-slate-800 border border-[#1f2433] text-slate-300 font-mono text-xs uppercase clip-chamfer cursor-pointer transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#ffcc00]" />
                <span>REGISTER ANOTHER SQUAD</span>
              </button>

              <button
                onClick={handleDownloadLicense}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#ff3b30] hover:bg-[#ff5500] text-white font-black font-mono text-xs uppercase clip-chamfer cursor-pointer shadow-[0_0_20px_rgba(255,59,48,0.4)] transition-all"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD CLEARANCE LICENSE (.TXT)</span>
              </button>
            </div>

          </div>
        ) : (
          /* Command Console Form */
          <div className="bg-[#08090f] border border-[#1f2433] p-6 sm:p-8 clip-chamfer shadow-[0_0_40px_rgba(0,0,0,0.8)]">
            
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Target Arena Dropdown */}
              <div>
                <label className="block text-xs font-mono font-bold text-[#ffcc00] uppercase tracking-wider mb-2">
                  TARGET ARENA [SELECT COMPETITION] *
                </label>
                <div className="relative">
                  <select
                    value={formData.targetArena}
                    onChange={(e) => {
                      sound.playBlip(600);
                      setFormData({ ...formData, targetArena: e.target.value });
                    }}
                    className="w-full px-4 py-3 bg-[#0c0e15] border border-[#1f2433] focus:border-[#ff3b30] text-white font-mono text-xs uppercase appearance-none outline-none clip-chamfer cursor-pointer"
                  >
                    {ARENAS_DATA.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.rank}. {a.name} // {a.shortTag} (REWARD: {a.prizePool})
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#ff3b30] font-mono text-xs">
                    ▼
                  </div>
                </div>

                {activeArenaObj && (
                  <div className="mt-2 text-[11px] font-mono text-slate-400 flex flex-wrap items-center gap-3">
                    <span className="text-[#ff3b30] font-bold">MASS SPEC: {activeArenaObj.weightClass}</span>
                    <span>/</span>
                    <span className="text-[#ffcc00]">TIMELINE: {activeArenaObj.timeline}</span>
                  </div>
                )}
              </div>

              {/* Callsign / Pilot Comms / College */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2">
                    TEAM LEADER / CALLSIGN *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. CAPTAIN APEX / ROHIT"
                    value={formData.callsignLeader}
                    onChange={(e) => {
                      setFormData({ ...formData, callsignLeader: e.target.value });
                      if (errors.callsignLeader) setErrors({ ...errors, callsignLeader: '' });
                    }}
                    className={`w-full px-4 py-2.5 bg-[#0c0e15] border text-white font-mono text-xs uppercase placeholder-slate-600 outline-none clip-chamfer transition-colors ${
                      errors.callsignLeader ? 'border-[#ff3b30]' : 'border-[#1f2433] focus:border-[#ff3b30]'
                    }`}
                  />
                  {errors.callsignLeader && (
                    <span className="text-[10px] font-mono text-[#ff3b30] mt-1 block">
                      ✖ {errors.callsignLeader}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2">
                    COMMS EMAIL *
                  </label>
                  <input
                    type="email"
                    placeholder="leader@institute.edu"
                    value={formData.pilotCommsEmail}
                    onChange={(e) => {
                      setFormData({ ...formData, pilotCommsEmail: e.target.value });
                      if (errors.pilotCommsEmail) setErrors({ ...errors, pilotCommsEmail: '' });
                    }}
                    className={`w-full px-4 py-2.5 bg-[#0c0e15] border text-white font-mono text-xs placeholder-slate-600 outline-none clip-chamfer transition-colors ${
                      errors.pilotCommsEmail ? 'border-[#ff3b30]' : 'border-[#1f2433] focus:border-[#ff3b30]'
                    }`}
                  />
                  {errors.pilotCommsEmail && (
                    <span className="text-[10px] font-mono text-[#ff3b30] mt-1 block">
                      ✖ {errors.pilotCommsEmail}
                    </span>
                  )}
                </div>
              </div>

              {/* College / Institution */}
              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2">
                  COLLEGE / INSTITUTION (DEFAULTS TO NIT RAIPUR) *
                </label>
                <input
                  type="text"
                  placeholder="e.g. NIT Raipur, IIT Bhilai, IIIT-NR"
                  value={formData.collegeInstitution}
                  onChange={(e) => {
                    setFormData({ ...formData, collegeInstitution: e.target.value });
                    if (errors.collegeInstitution) setErrors({ ...errors, collegeInstitution: '' });
                  }}
                  className={`w-full px-4 py-2.5 bg-[#0c0e15] border text-white font-mono text-xs uppercase placeholder-slate-600 outline-none clip-chamfer transition-colors ${
                    errors.collegeInstitution ? 'border-[#ff3b30]' : 'border-[#1f2433] focus:border-[#ff3b30]'
                  }`}
                />
                {errors.collegeInstitution && (
                  <span className="text-[10px] font-mono text-[#ff3b30] mt-1 block">
                    ✖ {errors.collegeInstitution}
                  </span>
                )}

                {/* Quick Select Institution Chips */}
                <div className="flex flex-wrap items-center gap-1.5 mt-2">
                  <span className="text-[10px] font-mono text-slate-500 uppercase">QUICK FILL:</span>
                  {QUICK_COLLEGES.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        sound.playBlip(500);
                        setFormData({ ...formData, collegeInstitution: c });
                        if (errors.collegeInstitution) setErrors({ ...errors, collegeInstitution: '' });
                      }}
                      className="px-2 py-0.5 bg-[#0c0e15] hover:bg-[#181b22] border border-[#1f2433] hover:border-[#ffcc00] text-slate-400 hover:text-[#ffcc00] font-mono text-[10px] uppercase clip-chamfer-sm transition-colors cursor-pointer"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Team Size Selector */}
              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2">
                  TEAM SIZE (1 TO 4 PILOTS)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleTeamSizeChange(size)}
                      className={`py-2 text-xs font-mono font-bold uppercase clip-chamfer transition-all cursor-pointer ${
                        formData.teamSize === size
                          ? 'bg-[#ff3b30] text-white shadow-[0_0_15px_rgba(255,59,48,0.4)]'
                          : 'bg-[#0c0e15] border border-[#1f2433] text-slate-400 hover:text-white'
                      }`}
                    >
                      {size === 1 ? '1 Solo' : `${size} Pilots`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional Pilot Roster Fields */}
              {formData.teammates.length > 0 && (
                <div className="p-4 bg-[#050609] border border-[#1f2433] clip-chamfer space-y-3">
                  <div className="text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-[#ffcc00]" />
                    <span>ADDITIONAL TEAM CREW</span>
                  </div>

                  {formData.teammates.map((tm, idx) => (
                    <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#1a1e29]">
                      <div>
                        <input
                          type="text"
                          placeholder={`Pilot ${idx + 2} Name`}
                          value={tm.callsign}
                          onChange={(e) => {
                            const updated = [...formData.teammates];
                            updated[idx].callsign = e.target.value;
                            setFormData({ ...formData, teammates: updated });
                          }}
                          className="w-full px-3 py-2 bg-[#0c0e15] border border-[#1f2433] text-white text-xs font-mono uppercase outline-none focus:border-[#ff3b30]"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          placeholder={`Pilot ${idx + 2} Email`}
                          value={tm.email}
                          onChange={(e) => {
                            const updated = [...formData.teammates];
                            updated[idx].email = e.target.value;
                            setFormData({ ...formData, teammates: updated });
                          }}
                          className="w-full px-3 py-2 bg-[#0c0e15] border border-[#1f2433] text-white text-xs font-mono outline-none focus:border-[#ff3b30]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Safety Compliance Checkbox */}
              <div className="p-3.5 bg-[#0c0e15] border border-[#ff3b30]/50 clip-chamfer">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.safetyGuidelinesConfirmed}
                    onChange={(e) => {
                      sound.playBlip(600);
                      setFormData({ ...formData, safetyGuidelinesConfirmed: e.target.checked });
                      if (errors.safety) setErrors({ ...errors, safety: '' });
                    }}
                    className="w-4 h-4 mt-0.5 accent-[#ff3b30] cursor-pointer"
                  />
                  <span className="text-xs font-mono text-slate-300 uppercase">
                    I confirm robot complies with tournament weight limits & radio failsafe rules.
                  </span>
                </label>
                {errors.safety && (
                  <div className="text-[10px] font-mono text-[#ff3b30] font-bold mt-2">
                    ✖ {errors.safety}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isTransmitting}
                className="tactical-btn-glitch w-full py-3.5 px-6 bg-[#ff3b30] hover:bg-[#ff5500] text-white font-black font-mono text-xs tracking-wider uppercase clip-chamfer transition-all cursor-pointer shadow-[0_0_20px_rgba(255,59,48,0.4)] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isTransmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>AUTHORIZING PASS...</span>
                  </>
                ) : (
                  <>
                    <span>REGISTER SQUAD</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </>
                )}
              </button>

            </form>

          </div>
        )}

      </div>
    </section>
  );
};
