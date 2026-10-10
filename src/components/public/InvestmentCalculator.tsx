import React, { useState } from 'react';
import { Calculator, TrendingUp, ShieldCheck, Check, Sparkles, Percent } from 'lucide-react';
import { Language } from '../../types';
import { translations, getTranslation, formatBDT } from '../../services/i18n';

interface InvestmentCalculatorProps {
  language: Language;
  onEnquire: () => void;
}

export const InvestmentCalculator: React.FC<InvestmentCalculatorProps> = ({
  language,
  onEnquire
}) => {
  const [assetType, setAssetType] = useState<'plot3' | 'plot5' | 'hotelShare'>('plot5');
  const [tenureMonths, setTenureMonths] = useState<number>(48);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30);

  const t = (key: keyof typeof translations.en) => getTranslation(language, key);

  // Asset configurations
  const assetConfig = {
    plot3: {
      name: language === 'bn' ? '৩ কাঠা আবাসিক প্লট (পূর্বাচল)' : '3 Katha Residential Plot (Purbachal)',
      basePrice: 2250000,
      annualAppreciation: 0.16, // 16% p.a.
      projectedRentalYield: 0
    },
    plot5: {
      name: language === 'bn' ? '৫ কাঠা আবাসিক প্লট (পূর্বাচল)' : '5 Katha Residential Plot (Purbachal)',
      basePrice: 3500000,
      annualAppreciation: 0.18, // 18% p.a.
      projectedRentalYield: 0
    },
    hotelShare: {
      name: language === 'bn' ? '১টি লাক্সারি হোটেল স্যুট শেয়ার (কক্সবাজার)' : '1 Luxury Hotel Suite Share (Cox\'s Bazar)',
      basePrice: 600000,
      annualAppreciation: 0.12,
      projectedRentalYield: 0.185 // 18.5% annual cash dividend
    }
  };

  const selectedAsset = assetConfig[assetType];
  const totalPrice = selectedAsset.basePrice;
  const downPaymentAmount = Math.round((totalPrice * downPaymentPercent) / 100);
  const remainingFinanced = totalPrice - downPaymentAmount;
  const monthlyInstallment = Math.round(remainingFinanced / tenureMonths);

  // 5-year capital appreciation projection
  const estimated5YrValuation = Math.round(totalPrice * Math.pow(1 + selectedAsset.annualAppreciation, 5));
  const estimatedDividends5Yr = Math.round(totalPrice * selectedAsset.projectedRentalYield * 5);

  return (
    <section id="calculator" className="py-12 sm:py-16 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>{t('calcTitle')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {language === 'bn' ? 'আপনার ভবিষ্যৎ বিনিয়োগ পরিকল্পনা যাচাই করুন' : 'Smart Installment & Yield Estimator'}
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            {t('calcSubtitle')}
          </p>
        </div>

        {/* Calculator Interface Card */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Input Controls */}
            <div className="space-y-6">
              
              {/* Asset Type */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  {t('calcPlotType')}
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'plot3', label: t('calcPlot3Katha'), price: '৳22,50,000' },
                    { id: 'plot5', label: t('calcPlot5Katha'), price: '৳35,00,000' },
                    { id: 'hotelShare', label: t('calcHotelShare'), price: '৳6,00,000' }
                  ].map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setAssetType(item.id as any)}
                      className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                        assetType === item.id
                          ? 'border-amber-600 bg-amber-500/10 text-slate-900 dark:text-white ring-1 ring-amber-500'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-xs font-semibold">{item.label}</span>
                      <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400">
                        {item.price}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Down Payment Slider */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  <span>Down Payment ({downPaymentPercent}%)</span>
                  <span className="font-mono text-amber-700 dark:text-amber-400 font-bold">
                    {formatBDT(downPaymentAmount, language)}
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="50"
                  step="5"
                  value={downPaymentPercent}
                  onChange={e => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-600 dark:text-slate-300 font-mono mt-1">
                  <span>20% Booking</span>
                  <span>30% Standard</span>
                  <span>50% Special Rebate</span>
                </div>
              </div>

              {/* Installment Tenure */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  {t('calcTenure')}
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[24, 36, 48, 60].map(tenure => (
                    <button
                      key={tenure}
                      type="button"
                      onClick={() => setTenureMonths(tenure)}
                      className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                        tenureMonths === tenure
                          ? 'bg-amber-600 border-amber-600 text-white shadow-xs'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                      }`}
                    >
                      {tenure} Mos
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Calculations & ROI Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950 text-white flex flex-col justify-between shadow-xl">
              <div className="space-y-4">
                <span className="text-[11px] font-mono tracking-widest text-amber-400 uppercase block">
                  Projected Financial Schedule
                </span>

                {/* Monthly Installment Highlight */}
                <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                  <span className="text-xs text-slate-300 block mb-1">
                    {t('calcMonthlyInstallment')}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-mono">
                      {formatBDT(monthlyInstallment, language)}
                    </span>
                    <span className="text-xs text-slate-300">/ month</span>
                  </div>
                  <span className="text-[11px] text-slate-300 block mt-1 font-mono">
                    Total {tenureMonths} equal installments (0% interest)
                  </span>
                </div>

                {/* 5-Year Capital Gain Projection */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-white/10">
                    <span className="text-slate-300">Estimated 5-Yr Valuation:</span>
                    <span className="font-mono font-bold text-amber-200">
                      {formatBDT(estimated5YrValuation, language)}
                    </span>
                  </div>
                  {selectedAsset.projectedRentalYield > 0 && (
                    <div className="flex justify-between py-1.5 border-b border-white/10">
                      <span className="text-slate-300">5-Yr Cash Dividends:</span>
                      <span className="font-mono font-bold text-emerald-300">
                        +{formatBDT(estimatedDividends5Yr, language)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between py-1.5 border-b border-white/10">
                    <span className="text-slate-300">Deed & Registration:</span>
                    <span className="text-emerald-400 font-semibold">100% Sub-Registry Title</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-300 italic flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Backed by City Square BD guaranteed corporate buyback & handover guarantee.</span>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={onEnquire}
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-lg"
                >
                  {language === 'bn' ? 'বুকিং ও প্লট নিশ্চিত করুন' : 'Confirm Booking & Lock Rate'}
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
