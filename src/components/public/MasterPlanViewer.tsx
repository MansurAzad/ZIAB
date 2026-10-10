import React, { useState } from 'react';
import {
  MapPin,
  CheckCircle2,
  Info,
  Maximize2,
  Layers,
  Compass,
  Trees,
  Car,
  Building,
  UserCheck
} from 'lucide-react';
import { Language } from '../../types';
import { translations, getTranslation, formatBDT } from '../../services/i18n';

interface MasterPlanViewerProps {
  language: Language;
  onSelectPlotForBooking?: (plotNo: string) => void;
}

interface PlotNode {
  id: string;
  plotNo: string;
  sizeKatha: number;
  facing: string;
  status: 'available' | 'booked' | 'user_owned' | 'reserved';
  priceKatha: number;
  ownerName?: string;
  road: string;
}

export const MasterPlanViewer: React.FC<MasterPlanViewerProps> = ({
  language,
  onSelectPlotForBooking
}) => {
  const [selectedPlot, setSelectedPlot] = useState<PlotNode | null>({
    id: 'p-142',
    plotNo: '142',
    sizeKatha: 5,
    facing: 'South-East Corner',
    status: 'user_owned',
    priceKatha: 700000,
    ownerName: 'Ziabul Hoque (Ziabulctg1)',
    road: '60ft Arterial Boulevard'
  });

  const t = (key: keyof typeof translations.en) => getTranslation(language, key);

  // Sector 4 Plot Grid Generation
  const plotsGrid: PlotNode[] = Array.from({ length: 36 }, (_, i) => {
    const num = 120 + i;
    const isUserPlot = num === 142;
    const isBooked = [121, 124, 128, 131, 133, 137, 139, 145, 148, 152].includes(num);
    const isReserved = [126, 135, 150].includes(num);

    let status: PlotNode['status'] = 'available';
    if (isUserPlot) status = 'user_owned';
    else if (isBooked) status = 'booked';
    else if (isReserved) status = 'reserved';

    return {
      id: `p-${num}`,
      plotNo: `${num}`,
      sizeKatha: num % 2 === 0 ? 5 : 3,
      facing: num % 3 === 0 ? 'South Facing' : num % 2 === 0 ? 'Corner Facing' : 'East Facing',
      status,
      priceKatha: num % 2 === 0 ? 700000 : 750000,
      ownerName: isUserPlot ? 'Ziabul Hoque (Ziabulctg1)' : isBooked ? 'Allocated Investor' : undefined,
      road: num < 135 ? '40ft Internal Avenue' : '60ft Boulevard'
    };
  });

  return (
    <section id="masterplan" className="py-12 sm:py-16 bg-slate-100/70 dark:bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'মাস্টার প্ল্যান ভিউয়ার' : 'Master Layout Explorer'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('masterPlanTitle')}
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            {t('masterPlanSubtitle')}
          </p>
        </div>

        {/* Master Plan Map Card */}
        <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden">
          
          {/* Top Bar: Sector Info & Legend */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs font-medium text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-emerald-500 inline-block" />
                {t('statusAvailable')}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-amber-500 ring-2 ring-amber-300 inline-block" />
                {language === 'bn' ? 'জিয়াবুলctg1-এর প্লট (#142)' : 'Ziabulctg1 Plot (#142)'}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-slate-400 inline-block" />
                {t('statusBooked')}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-rose-400 inline-block" />
                {t('statusReserved')}
              </span>
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-2">
              <span className="font-semibold text-slate-700 dark:text-slate-200">Sector 4 Amenities:</span>
              <span className="text-slate-600 dark:text-slate-300">Lake Promenade · 60ft Central Avenue · Grand Mosque</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-700">
            
            {/* Visual Sector Grid */}
            <div className="lg:col-span-2 p-4 sm:p-6 bg-slate-50/50 dark:bg-slate-900/40">
              
              {/* Landmark Header in Layout */}
              <div className="flex items-center justify-between mb-3 text-xs font-mono text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-amber-600" />
                  <span>NORTH: 300 FEET EXPRESSWAY CONNECTOR (60ft AVENUE)</span>
                </div>
                <span>RAJUK PURBACHAL SECTOR 4</span>
              </div>

              {/* Grid of Plots */}
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-2.5">
                {plotsGrid.map(plot => {
                  const isSelected = selectedPlot?.id === plot.id;
                  let bgClasses = 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200';
                  
                  if (plot.status === 'user_owned') {
                    bgClasses = 'bg-amber-500 text-white border-amber-600 shadow-md ring-2 ring-amber-300 animate-pulse';
                  } else if (plot.status === 'booked') {
                    bgClasses = 'bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400';
                  } else if (plot.status === 'reserved') {
                    bgClasses = 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-400';
                  }

                  return (
                    <button
                      key={plot.id}
                      onClick={() => setSelectedPlot(plot)}
                      className={`p-2 sm:p-2.5 rounded-xl border text-center transition-all ${bgClasses} ${
                        isSelected ? 'scale-105 ring-2 ring-slate-900 dark:ring-white z-10' : 'hover:scale-[1.02]'
                      }`}
                    >
                      <span className="block text-[11px] sm:text-xs font-extrabold font-mono">
                        #{plot.plotNo}
                      </span>
                      <span className="block text-[9px] sm:text-[10px] font-sans font-medium mt-0.5 opacity-90">
                        {plot.sizeKatha}K
                      </span>
                      {plot.status === 'user_owned' && (
                        <span className="block text-[8px] font-bold bg-white text-amber-900 rounded px-1 mt-1 uppercase tracking-tighter">
                          MINE
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* South Boulevard Indicator */}
              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs text-slate-500 font-mono">
                <div className="flex items-center gap-1.5">
                  <Trees className="w-3.5 h-3.5 text-emerald-600" />
                  <span>SOUTH: BOTANICAL LAKEFRONT PROMENADE & WALKING TRAIL</span>
                </div>
                <span>N 23°51'22" E 90°32'40"</span>
              </div>
            </div>

            {/* Plot Detail Side Panel */}
            <div className="p-6 bg-white dark:bg-slate-800 flex flex-col justify-between">
              {selectedPlot ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
                    <div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                        Sector 4 Allotment
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        Plot #{selectedPlot.plotNo}
                        {selectedPlot.status === 'user_owned' && (
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300">
                            Allocated
                          </span>
                        )}
                      </h3>
                    </div>
                    <span className="text-sm font-extrabold text-amber-600 dark:text-amber-400 font-mono">
                      {selectedPlot.sizeKatha} Katha
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                    <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-700/50">
                      <span className="text-slate-400">Road Frontage:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedPlot.road}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-700/50">
                      <span className="text-slate-400">Orientation / Facing:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedPlot.facing}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-700/50">
                      <span className="text-slate-400">Rate per Katha:</span>
                      <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                        {formatBDT(selectedPlot.priceKatha, language)}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-700/50">
                      <span className="text-slate-400">Total Plot Value:</span>
                      <span className="font-mono font-extrabold text-base text-amber-700 dark:text-amber-400">
                        {formatBDT(selectedPlot.priceKatha * selectedPlot.sizeKatha, language)}
                      </span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">Current Status:</span>
                      <span className="font-semibold capitalize text-slate-800 dark:text-slate-200">
                        {selectedPlot.status === 'user_owned'
                          ? 'Owned by Ziabulctg1'
                          : selectedPlot.status}
                      </span>
                    </div>
                  </div>

                  {selectedPlot.status === 'user_owned' ? (
                    <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-amber-900 dark:text-amber-200">
                        <UserCheck className="w-4 h-4 text-amber-600" />
                        <span>Registered to Your Portfolio</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                        Installment Plan Active: ৳35,000/mo. Allotment Letter: CSBD/AL/PUR/2024/0842.
                      </p>
                    </div>
                  ) : selectedPlot.status === 'available' ? (
                    <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs">
                      <span className="font-bold text-emerald-900 dark:text-emerald-200 block mb-1">
                        Plot is Open for Booking
                      </span>
                      <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                        Available on 36/48/60-month easy installment schedule or 10% instant down payment discount.
                      </p>
                    </div>
                  ) : null}

                </div>
              ) : (
                <div className="text-center py-10 text-slate-400 text-xs">
                  Select a plot to inspect technical dimensions and availability.
                </div>
              )}

              <div className="pt-4">
                {selectedPlot?.status === 'available' ? (
                  <button
                    onClick={() => onSelectPlotForBooking && onSelectPlotForBooking(selectedPlot.plotNo)}
                    className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-colors shadow-sm"
                  >
                    {language === 'bn' ? 'এই প্লটের জন্য বুকিং আবেদন করুন' : 'Book Plot #' + selectedPlot.plotNo}
                  </button>
                ) : (
                  <div className="text-center text-[11px] text-slate-600 dark:text-slate-300">
                    City Square BD Customer Support: 01700-CITYBD
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
