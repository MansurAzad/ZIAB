import React, { useState } from 'react';
import { Calculator, TrendingUp, ShieldCheck, Check, Sparkles, Percent, Wallet, DollarSign, CalendarCheck, FileText, ArrowRight } from 'lucide-react';
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
  // Calculator mode: 'doubleProfit' (12-Month 2x Return in Monthly Installments) vs 'standardPlots'
  const [calcMode, setCalcMode] = useState<'doubleProfit' | 'standardPlots'>('doubleProfit');

  // Double Profit State
  const [doubleInvestmentAmount, setDoubleInvestmentAmount] = useState<number>(500000);
  const [customDoubleAmount, setCustomDoubleAmount] = useState<string>('500000');

  // Standard Plot State
  const [assetType, setAssetType] = useState<'plot3' | 'plot5' | 'hotelShare'>('plot5');
  const [tenureMonths, setTenureMonths] = useState<number>(48);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30);

  const t = (key: keyof typeof translations.en) => getTranslation(language, key);

  // Asset configurations for plots
  const assetConfig = {
    plot3: {
      name: language === 'bn' ? '৩ কাঠা আবাসিক প্লট (পূর্বাচল)' : '3 Katha Residential Plot (Purbachal)',
      basePrice: 2250000,
      annualAppreciation: 0.16,
      projectedRentalYield: 0
    },
    plot5: {
      name: language === 'bn' ? '৫ কাঠা আবাসিক প্লট (পূর্বাচল)' : '5 Katha Residential Plot (Purbachal)',
      basePrice: 3500000,
      annualAppreciation: 0.18,
      projectedRentalYield: 0
    },
    hotelShare: {
      name: language === 'bn' ? '১টি লাক্সারি হোটেল স্যুট শেয়ার (কক্সবাজার)' : '1 Luxury Hotel Suite Share (Cox\'s Bazar)',
      basePrice: 600000,
      annualAppreciation: 0.12,
      projectedRentalYield: 0.185
    }
  };

  const selectedAsset = assetConfig[assetType];
  const totalPrice = selectedAsset.basePrice;
  const downPaymentAmount = Math.round((totalPrice * downPaymentPercent) / 100);
  const remainingFinanced = totalPrice - downPaymentAmount;
  const monthlyPlotInstallment = Math.round(remainingFinanced / tenureMonths);
  const estimated5YrValuation = Math.round(totalPrice * Math.pow(1 + selectedAsset.annualAppreciation, 5));

  // --- 12-MONTH DOUBLE PROFIT CALCULATIONS ---
  // Double Profit: Total Return = 200% (Principal * 2) delivered across 12 equal monthly installments!
  const principal = Number(doubleInvestmentAmount) || 0;
  const totalReturn = principal * 2;
  const totalNetProfit = principal; // 100% net profit
  const monthlyInstallmentPayout = Math.round(totalReturn / 12);

  const handleSelectPackage = (amt: number) => {
    setDoubleInvestmentAmount(amt);
    setCustomDoubleAmount(String(amt));
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    setCustomDoubleAmount(val);
    setDoubleInvestmentAmount(Number(val) || 0);
  };

  return (
    <section id="calculator" className="py-12 sm:py-16 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {language === 'bn' ? 'বিশেষ বিনিয়োগ ও দ্বিগুণ মুনাফা পরিকল্পনা' : 'Double Return & Investment Estimator'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {language === 'bn' ? '১২ মাসে ডাবল প্রফিট ও ইনস্টলমেন্ট রিটার্ন ক্যালকুলেটর' : '12-Month Double Profit & Payout Estimator'}
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            {language === 'bn'
              ? 'আমাদের কোম্পানি দিচ্ছে ১২ মাসে নিশ্চিত দ্বিগুণ মুনাফা! প্রতি মাসে সমান কিস্তিতে লাভ ও আসল সরাসরি আপনার ব্যাংক বা মোবাইল ওয়ালেটে পৌঁছে যাবে।'
              : 'Our company delivers guaranteed 2X double return in 12 months, disbursed in 12 equal monthly installments directly to your bank account or mobile wallet.'}
          </p>
        </div>

        {/* Toggle Mode: 12-Month Double Profit Scheme vs Plot Installments */}
        <div className="max-w-md mx-auto mb-8 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 grid grid-cols-2 gap-1.5 text-xs font-bold">
          <button
            onClick={() => setCalcMode('doubleProfit')}
            className={`py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 ${
              calcMode === 'doubleProfit'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? '১২ মাসে ডাবল প্রফিট' : '12-Month Double Return'}</span>
          </button>
          <button
            onClick={() => setCalcMode('standardPlots')}
            className={`py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 ${
              calcMode === 'standardPlots'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'প্লট কিস্তি হিসাব' : 'Plot Installment Plan'}</span>
          </button>
        </div>

        {/* ============================================================ */}
        {/* MODE 1: 12-MONTH DOUBLE PROFIT SCHEME (MONTHLY INSTALLMENTS) */}
        {/* ============================================================ */}
        {calcMode === 'doubleProfit' && (
          <div className="max-w-4xl mx-auto rounded-3xl bg-slate-50 dark:bg-slate-800/80 border-2 border-amber-500/40 shadow-2xl overflow-hidden p-6 sm:p-8">
            
            {/* Banner Flag */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent border border-amber-500/30 flex items-center justify-between mb-8">
              <div className="flex items-center gap-2.5 text-amber-800 dark:text-amber-300">
                <Check className="w-4 h-4 bg-amber-500 text-white rounded-full p-0.5 shrink-0" />
                <span className="text-xs sm:text-sm font-bold">
                  {language === 'bn'
                    ? '১০০% ব্যাংক সিকিউরিটি চেক ও রেজিস্টার্ড চুক্তিপত্রের মাধ্যমে শতভাগ নিরাপদ বিনিয়োগ।'
                    : '100% Backed by Bank Security PDC Cheques & Notarized Registered Deed.'}
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 text-[11px] font-black uppercase tracking-wider font-mono shrink-0">
                2X DOUBLE PROFIT
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
              
              {/* Left Column: Select Package & Custom Amount */}
              <div className="md:col-span-6 space-y-6">
                
                {/* Popular Investment Packages */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    {language === 'bn' ? 'জনপ্রিয় বিনিয়োগ প্যাকেজ বেছে নিন' : 'Select Investment Package'}
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { amount: 100000, label: '৳১,০০,০০০', returnText: '১২ মাসে ৳২,০০,০০০' },
                      { amount: 250000, label: '৳২,৫০,০০০', returnText: '১২ মাসে ৳৫,০০,০০০' },
                      { amount: 500000, label: '৳৫,০০,০০০', returnText: '১২ মাসে ৳১০,০০,০০০' },
                      { amount: 1000000, label: '৳১০,০০,০০০', returnText: '১২ মাসে ৳২০,০০,০০০' },
                      { amount: 2500000, label: '৳২৫,০০,০০০', returnText: '১২ মাসে ৳৫০,০০,০০০' },
                      { amount: 5000000, label: '৳৫০,০০,০০০', returnText: '১২ মাসে ৳১,০০,০০,০০০' }
                    ].map(pkg => (
                      <button
                        key={pkg.amount}
                        type="button"
                        onClick={() => handleSelectPackage(pkg.amount)}
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          doubleInvestmentAmount === pkg.amount
                            ? 'border-amber-600 bg-amber-500/15 text-slate-900 dark:text-white ring-2 ring-amber-500'
                            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-extrabold font-mono">{pkg.label}</span>
                          {doubleInvestmentAmount === pkg.amount && (
                            <span className="w-2 h-2 rounded-full bg-amber-500" />
                          )}
                        </div>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block mt-1">
                          {pkg.returnText}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Investment Amount Input */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    {language === 'bn' ? 'অথবা আপনার পছন্দমতো বিনিয়োগ লিখুন (টাকা)' : 'Or Enter Custom Investment Amount (BDT)'}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-base font-extrabold text-amber-600 font-mono">৳</span>
                    <input
                      type="text"
                      value={customDoubleAmount}
                      onChange={handleCustomChange}
                      placeholder="e.g. 500000"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold text-base focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                  <span className="text-[11px] text-slate-500 block mt-1.5">
                    {language === 'bn'
                      ? 'সর্বনিম্ন ৫০,০০০ টাকা থেকে যেকোনো পরিমাণ বিনিয়োগ অনুমোদিত।'
                      : 'Minimum BDT 50,000 to any custom amount accepted.'}
                  </span>
                </div>

                {/* Security Highlights */}
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>{language === 'bn' ? '১২ মাসের কিস্তিতে ১০০% দ্বিগুণ ফেরত সুবিধা' : '100% Guaranteed 2X Double Return in 12 Months'}</span>
                  </div>
                  <div className="flex items-start gap-2 text-[11px]">
                    <Check className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <span>{language === 'bn' ? 'প্রতি মাসের ১-৫ তারিখের মধ্যে স্বয়ংক্রিয় ব্যাংক/ওয়ালেট ট্রান্সফার।' : 'Automated bank/wallet payout credited on 1st-5th of every month.'}</span>
                  </div>
                  <div className="flex items-start gap-2 text-[11px]">
                    <Check className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <span>{language === 'bn' ? 'কোম্পানির অফিসিয়াল সিলমোহরযুক্ত ১২টি সিকিউরিটি চেক ও চুক্তিপত্র প্রদান।' : '12 official company post-dated bank cheques (PDC) + legal stamped deed.'}</span>
                  </div>
                </div>

              </div>

              {/* Right Column: Live Profit & Monthly Installment Breakdown */}
              <div className="md:col-span-6 p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950 text-white flex flex-col justify-between shadow-2xl border border-amber-500/30">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-[11px] font-mono tracking-widest text-amber-400 uppercase font-bold">
                      {language === 'bn' ? '১২ মাসের কিস্তিভিত্তিক প্রফিট হিসাব' : '12-Month Installment Yield Breakdown'}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 font-mono">
                      12 EQUAL INSTALLMENTS
                    </span>
                  </div>

                  {/* Monthly Installment Card */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 to-amber-600/10 border border-amber-500/40">
                    <span className="text-xs text-amber-300 font-medium block">
                      {language === 'bn' ? 'প্রতি মাসে কিস্তিতে পাবেন (১২ মাস জুড়ে)' : 'You Will Receive Every Month (12 Installments)'}
                    </span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-3xl sm:text-4xl font-black text-amber-400 font-mono tracking-tight">
                        ৳{monthlyInstallmentPayout.toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-300">/ {language === 'bn' ? 'প্রতি মাস' : 'month'}</span>
                    </div>
                    <span className="text-[11px] text-emerald-400 font-semibold block mt-1 font-mono">
                      {language === 'bn' ? 'মোট ১২টি সমান মাসিক কিস্তিতে প্রদান করা হবে' : 'Disbursed in 12 consecutive monthly installments'}
                    </span>
                  </div>

                  {/* Total Calculations Table */}
                  <div className="space-y-2.5 text-xs pt-1">
                    <div className="flex justify-between py-2 border-b border-slate-800">
                      <span className="text-slate-400">
                        {language === 'bn' ? 'আপনার মোট বিনিয়োগ (মূলধন):' : 'Your Invested Capital:'}
                      </span>
                      <strong className="font-mono text-white text-sm">
                        ৳{principal.toLocaleString()}
                      </strong>
                    </div>

                    <div className="flex justify-between py-2 border-b border-slate-800">
                      <span className="text-slate-400">
                        {language === 'bn' ? '১২ মাসে মোট নিট মুনাফা (১০০% লাভ):' : '12-Month Net Profit (100% Gain):'}
                      </span>
                      <strong className="font-mono text-emerald-400 text-sm">
                        +৳{totalNetProfit.toLocaleString()}
                      </strong>
                    </div>

                    <div className="flex justify-between py-2 border-b border-slate-800">
                      <span className="text-slate-400">
                        {language === 'bn' ? '১২ মাসে সর্বমোট প্রাপ্তি (দ্বিগুণ/২০০%):' : 'Total 12-Month Payout (200% / 2X):'}
                      </span>
                      <strong className="font-mono text-amber-300 text-base font-black">
                        ৳{totalReturn.toLocaleString()}
                      </strong>
                    </div>

                    <div className="flex justify-between py-2 border-b border-slate-800">
                      <span className="text-slate-400">
                        {language === 'bn' ? 'নিরাপত্তা ও গ্যারান্টি:' : 'Security & Guarantee:'}
                      </span>
                      <span className="text-emerald-400 font-semibold">
                        {language === 'bn' ? '১২টি ব্যাংক PDC চেক + রেজিস্টার্ড দলিল' : '12 Bank PDC Cheques + Deed'}
                      </span>
                    </div>
                  </div>

                </div>

                <div className="pt-6">
                  <button
                    onClick={onEnquire}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:brightness-110 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-xl shadow-amber-900/30 flex items-center justify-center gap-2"
                  >
                    <span>{language === 'bn' ? 'এখনই ডাবল প্রফিট প্রকল্পে আবেদন করুন' : 'Apply for Double Profit Plan Now'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <span className="text-[10px] text-center text-slate-400 block mt-2">
                    {language === 'bn' ? 'লগইন করে তাৎক্ষণিক ওয়ালেট বা ব্যাংকের মাধ্যমে প্ল্যান সক্রিয় করুন।' : 'Instant activation via portal payment gateway or bank slip.'}
                  </span>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ============================================================ */}
        {/* MODE 2: STANDARD LAND PLOT INSTALLMENT CALCULATOR */}
        {/* ============================================================ */}
        {calcMode === 'standardPlots' && (
          <div className="max-w-4xl mx-auto rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden p-6 sm:p-8">
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
                  <span className="text-[11px] font-mono tracking-widest text-amber-400 uppercase block font-bold">
                    Projected Financial Schedule
                  </span>

                  {/* Monthly Installment Highlight */}
                  <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                    <span className="text-xs text-slate-300 block mb-1">
                      {t('calcMonthlyInstallment')}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-mono">
                        {formatBDT(monthlyPlotInstallment, language)}
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
                    <div className="flex justify-between py-1.5 border-b border-white/10">
                      <span className="text-slate-300">Deed & Registration:</span>
                      <span className="text-emerald-400 font-semibold">100% Sub-Registry Title</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-300 italic flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Backed by CITY ZONE SQUARE guaranteed corporate buyback & handover guarantee.</span>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={onEnquire}
                    className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-lg"
                  >
                    {language === 'bn' ? 'বুকিং ও প্লট নিশ্চিত করুন' : 'Confirm Booking & Lock Rate'}
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
