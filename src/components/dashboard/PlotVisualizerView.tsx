import React, { useState } from 'react';
import {
  Compass,
  Layers,
  Ruler,
  Maximize2,
  Building2,
  Trees,
  Car,
  Download,
  Info,
  CheckCircle2,
  Sun
} from 'lucide-react';
import { Language, User, PlotBooking } from '../../types';
import { formatBDT } from '../../services/i18n';

interface PlotVisualizerViewProps {
  user: User;
  plot: PlotBooking;
  language: Language;
}

export const PlotVisualizerView: React.FC<PlotVisualizerViewProps> = ({ user, plot, language }) => {
  const [viewMode, setViewMode] = useState<'boundary' | 'setbacks' | 'elevation'>('boundary');

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            {language === 'bn' ? 'প্লট #১৪২ ৩ডি বাউন্ডারি ও রাজউক ড্যাপ নকশা' : 'Plot #142 3D Boundary & RAJUK DAP Layout'}
          </h2>
          <p className="text-xs text-slate-500">
            {language === 'bn'
              ? 'সেক্টর ৪, রোড ১২-এর ৫ কাঠা কর্নার প্লটের ভৌত পরিমাপ, চারদিকের সীমানা এবং ইমারত নির্মাণ বিধিমালা।'
              : 'Physical boundary dimensions, setback clearances, and RAJUK building construction bylaws for Plot #142.'}
          </p>
        </div>

        {/* View Switcher Buttons */}
        <div className="flex items-center gap-1 p-1 bg-slate-200/80 dark:bg-slate-800 rounded-xl text-xs font-semibold">
          {[
            { id: 'boundary', label: language === 'bn' ? 'চারপাশের সীমানা' : 'Boundary Grid' },
            { id: 'setbacks', label: language === 'bn' ? 'সেটব্যাক ও ড্যাপ' : 'Setback Rules' },
            { id: 'elevation', label: language === 'bn' ? 'জি+৮ উচ্চতা ও এফএআর' : 'G+8 Elevation' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setViewMode(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                viewMode === tab.id
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Blueprint Canvas Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        
        {/* Technical Specs Top Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 mb-6 border-b border-slate-100 dark:border-slate-800 text-xs">
          <div>
            <span className="text-slate-400 block font-mono">Area Specification:</span>
            <strong className="text-slate-900 dark:text-white font-mono text-sm">
              5 Katha (3,600 Sq. Ft. / 334.4 Sq.m)
            </strong>
          </div>
          <div>
            <span className="text-slate-400 block font-mono">Frontage Dimensions:</span>
            <strong className="text-amber-700 dark:text-amber-400 font-mono text-sm">
              72 Feet Front × 50 Feet Depth
            </strong>
          </div>
          <div>
            <span className="text-slate-400 block font-mono">Facing & Orientation:</span>
            <strong className="text-slate-900 dark:text-white font-mono text-sm">
              South-East Corner Plot
            </strong>
          </div>
          <div>
            <span className="text-slate-400 block font-mono">Max Permissible Height:</span>
            <strong className="text-emerald-600 dark:text-emerald-400 font-mono text-sm">
              G+8 Floors (FAR: 3.50)
            </strong>
          </div>
        </div>

        {/* 2D/3D Schematic Render */}
        <div className="relative rounded-2xl bg-slate-950 text-white p-6 sm:p-10 border border-slate-800 overflow-hidden">
          
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

          {/* Compass Rose */}
          <div className="absolute top-4 right-4 flex items-center gap-1.5 text-xs font-mono text-amber-400 bg-white/10 px-2.5 py-1 rounded-md backdrop-blur-xs">
            <Compass className="w-4 h-4 animate-spin" />
            <span>N ↑ / S ↓</span>
          </div>

          <div className="relative max-w-lg mx-auto my-4">
            
            {/* North Neighbor */}
            <div className="p-2 mb-2 text-center rounded-lg bg-slate-900/80 border border-dashed border-slate-700 text-xs text-slate-400 font-mono">
              NORTH: ADJACENT RESIDENTIAL PLOT #141 (5 KATHA)
            </div>

            {/* Central Plot Container */}
            <div className="relative border-4 border-amber-500 rounded-xl bg-gradient-to-br from-amber-950/60 via-slate-900/90 to-amber-900/40 p-6 sm:p-8 text-center shadow-2xl">
              
              <div className="flex justify-between text-[11px] font-mono text-amber-300 pb-4 border-b border-white/10">
                <span>WIDTH: 72'-0"</span>
                <span>DEPTH: 50'-0"</span>
              </div>

              <div className="py-8 space-y-2">
                <span className="text-[11px] font-mono tracking-widest text-amber-400 uppercase block">
                  ALLOTMENT: CSBD/AL/PUR/2024/0842
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  PLOT NO. 142
                </h3>
                <p className="text-xs text-slate-300 font-sans max-w-xs mx-auto">
                  Owner: {user.fullName} · {plot.sector}
                </p>

                {viewMode === 'setbacks' && (
                  <div className="mt-4 p-3 rounded-lg bg-black/60 border border-emerald-500/40 text-left text-[11px] font-mono space-y-1 text-emerald-300">
                    <div>• Front Setback: 1.50m (5'-0") mandatory green lawn</div>
                    <div>• Rear Setback: 2.00m (6'-6") service zone</div>
                    <div>• Side Setbacks: 1.25m (4'-0") ventilation passage</div>
                    <div>• Maximum Ground Coverage (MGC): 60% (2,160 Sq. Ft.)</div>
                  </div>
                )}

                {viewMode === 'elevation' && (
                  <div className="mt-4 p-3 rounded-lg bg-black/60 border border-amber-500/40 text-left text-[11px] font-mono space-y-1 text-amber-200">
                    <div>• Permissible Floors: Ground + 8 Living Floors</div>
                    <div>• Total Allowable Built Area: 12,600 Sq. Ft.</div>
                    <div>• Ground Floor: Dedicated Car Parking (8 vehicles)</div>
                    <div>• Rooftop: Solar Panel & Community Green Garden</div>
                  </div>
                )}
              </div>

              {/* Side Neighbor indicators */}
              <div className="flex justify-between text-[10px] text-slate-400 font-mono pt-3 border-t border-white/10">
                <span>← WEST: GREEN BUFFER (20ft)</span>
                <span>EAST: PLOT #143 (5K) →</span>
              </div>

            </div>

            {/* South Arterial Road Frontage */}
            <div className="p-3 mt-2 text-center rounded-lg bg-amber-500/20 border border-amber-400/40 text-xs font-mono text-amber-300 font-bold flex items-center justify-center gap-2">
              <Car className="w-4 h-4 text-amber-400" />
              <span>SOUTH: ROAD #12 (60 FEET WIDE ARTERIAL BOULEVARD)</span>
            </div>

          </div>

          <div className="text-center text-[11px] text-slate-400 font-mono mt-4">
            RAJUK DAP Sheet #04 · AC Land Rupganj Mouza Map Verified · Permanent Cement Pillars Anchored
          </div>
        </div>

        {/* Construction By-Law Guidance Card */}
        <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              City Square BD provides complimentary architectural vetting and structural drawing submission assistance for RAJUK plan approvals.
            </span>
          </div>

          <button
            onClick={() => alert('RAJUK DAP Building Code Guidelines & Architectural Setback Manual (PDF) downloaded.')}
            className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 text-white font-semibold text-xs whitespace-nowrap flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download DAP Guide</span>
          </button>
        </div>

      </div>

    </div>
  );
};
