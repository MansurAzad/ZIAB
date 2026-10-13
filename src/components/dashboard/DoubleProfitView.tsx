import React, { useState } from 'react';
import {
  Sparkles,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Calendar,
  CreditCard,
  Wallet,
  ArrowRight,
  FileCheck2,
  Download,
  AlertCircle,
  Plus,
  ChevronRight,
  ExternalLink,
  Award
} from 'lucide-react';
import { DoubleProfitPlan, Language, User } from '../../types';
import { StorageService } from '../../services/storage';
import { formatBDT } from '../../services/i18n';

interface DoubleProfitViewProps {
  user: User;
  language: Language;
  onRefreshData: () => void;
}

export const DoubleProfitView: React.FC<DoubleProfitViewProps> = ({
  user,
  language,
  onRefreshData
}) => {
  const isBn = language === 'bn';
  const [plans, setPlans] = useState<DoubleProfitPlan[]>(() => {
    return StorageService.getDoubleProfitPlans();
  });

  const [selectedPlan, setSelectedPlan] = useState<DoubleProfitPlan | null>(() => {
    const list = StorageService.getDoubleProfitPlans();
    return list.length > 0 ? list[0] : null;
  });

  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [isDeedModalOpen, setIsDeedModalOpen] = useState(false);
  const [deedPlan, setDeedPlan] = useState<DoubleProfitPlan | null>(null);

  // New Plan Enrollment Form State
  const [selectedPackageAmount, setSelectedPackageAmount] = useState<number>(500000);
  const [customAmountInput, setCustomAmountInput] = useState<string>('500000');
  const [paymentSource, setPaymentSource] = useState<'wallet' | 'bank_transfer'>('wallet');
  const [enrollSuccessMessage, setEnrollSuccessMessage] = useState<string | null>(null);

  const refreshPlans = () => {
    const updated = StorageService.getDoubleProfitPlans();
    setPlans(updated);
    if (selectedPlan) {
      const match = updated.find(p => p.id === selectedPlan.id);
      setSelectedPlan(match || (updated.length > 0 ? updated[0] : null));
    } else if (updated.length > 0) {
      setSelectedPlan(updated[0]);
    }
    onRefreshData();
  };

  // Preset packages
  const packages = [
    { amount: 100000, label: '৳১,০০,০০০', returnLabel: '১২ মাসে ৳২,০০,০০০', monthly: '৳১৬,৬৬৭ / মাস' },
    { amount: 250000, label: '৳২,৫০,০০০', returnLabel: '১২ মাসে ৳৫,০০,০০০', monthly: '৳৪১,৬৬৭ / মাস' },
    { amount: 500000, label: '৳৫,০০,০০০', returnLabel: '১২ মাসে ৳১০,০০,০০০', monthly: '৳৮৩,৩৩৩ / মাস' },
    { amount: 1000000, label: '৳১০,০০,০০০', returnLabel: '১২ মাসে ৳২০,০০,০০০', monthly: '৳১,৬৬,৬৬৭ / মাস' },
    { amount: 2500000, label: '৳২৫,০০,০০০', returnLabel: '১২ মাসে ৳৫০,০০,০০০', monthly: '৳৪,১৬,৬৬৭ / মাস' },
    { amount: 5000000, label: '৳৫০,০০,০০০', returnLabel: '১২ মাসে ৳১,০০,০০,০০০', monthly: '৳৮,৩৩,৩৩৩ / মাস' }
  ];

  const handleSelectPackage = (amt: number) => {
    setSelectedPackageAmount(amt);
    setCustomAmountInput(String(amt));
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    setCustomAmountInput(val);
    setSelectedPackageAmount(Number(val) || 0);
  };

  // Submit new enrollment
  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPackageAmount < 50000) {
      alert(isBn ? 'সর্বনিম্ন বিনিয়োগের পরিমাণ ৫০,০০০ টাকা' : 'Minimum investment amount is BDT 50,000');
      return;
    }

    const created = StorageService.createDoubleProfitPlan({
      memberId: user.memberId,
      memberName: user.fullName,
      principalAmount: selectedPackageAmount,
      packageName: `Premium 12-Month Double Return (৳${selectedPackageAmount.toLocaleString()})`,
      packageNameBn: `১২ মাসে দ্বিগুণ মুনাফা প্যাকেজ (৳${selectedPackageAmount.toLocaleString()})`
    });

    refreshPlans();
    setIsEnrollModalOpen(false);
    setEnrollSuccessMessage(
      isBn
        ? `অভিনন্দন! আপনার ৳${selectedPackageAmount.toLocaleString()} টাকার ১২ মাসে ডাবল প্রফিট প্রকল্প সফলভাবে সক্রিয় হয়েছে। প্রতি মাসে কিস্তির টাকা সরাসরি আপনার হিসাবে জমা হবে।`
        : `Congratulations! Your BDT ${selectedPackageAmount.toLocaleString()} 12-Month Double Profit Plan is now active. Monthly installments will be credited automatically.`
    );
    setTimeout(() => setEnrollSuccessMessage(null), 8000);
  };

  // Calculated metrics across all user plans
  const totalInvestedCapital = plans.reduce((acc, p) => acc + p.principalAmount, 0);
  const totalTarget2xReturn = plans.reduce((acc, p) => acc + p.totalReturnAmount, 0);
  const totalMonthlyInstallmentReceivable = plans
    .filter(p => p.status === 'active')
    .reduce((acc, p) => acc + p.monthlyInstallmentAmount, 0);
  const totalAlreadyPaidOut = plans.reduce((acc, p) => acc + p.totalPaidOut, 0);

  // Generate 12-Month Installment Ledger for a selected plan
  const generate12MonthSchedule = (plan: DoubleProfitPlan) => {
    const schedule = [];
    const baseDate = new Date(plan.startDate);
    
    for (let i = 1; i <= 12; i++) {
      const payoutDate = new Date(baseDate);
      payoutDate.setMonth(baseDate.getMonth() + i);
      const isPaid = i <= plan.paidInstallments;
      const isNext = i === plan.paidInstallments + 1;
      const chequeNumber = plan.pdcCheckNumbers && plan.pdcCheckNumbers[i - 1]
        ? plan.pdcCheckNumbers[i - 1]
        : `PDC-IBBL-${202600 + i}`;

      schedule.push({
        installmentNo: i,
        monthLabel: payoutDate.toLocaleDateString(isBn ? 'bn-BD' : 'en-GB', { month: 'long', year: 'numeric' }),
        dueDate: payoutDate.toISOString().split('T')[0],
        amount: plan.monthlyInstallmentAmount,
        chequeNumber,
        status: isPaid ? 'paid' : isNext ? 'processing' : 'upcoming',
        voucherRef: isPaid ? `DP-VOUCH-${plan.id.slice(-4)}-${i}` : '—'
      });
    }
    return schedule;
  };

  return (
    <div className="space-y-6">
      
      {/* Success Notification */}
      {enrollSuccessMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            <p className="text-xs sm:text-sm font-semibold">{enrollSuccessMessage}</p>
          </div>
          <button
            onClick={() => setEnrollSuccessMessage(null)}
            className="text-xs font-bold text-emerald-600 hover:underline ml-3"
          >
            {isBn ? 'বন্ধ করুন' : 'Dismiss'}
          </button>
        </div>
      )}

      {/* Hero Scheme Guarantee Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 p-6 sm:p-8 text-white shadow-2xl overflow-hidden border border-amber-400/40">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/20 backdrop-blur-xs border border-white/20 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>{isBn ? '১২ মাসে নিশ্চিত ডাবল প্রফিট প্রকল্প' : 'Guaranteed 12-Month Double Return Scheme'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              {isBn
                ? '১২ মাসে ডাবল প্রফিট — প্রতি মাসে মাসিক কিস্তিতে সরাসরি রিটার্ন!'
                : 'Double Your Capital in 12 Months — Paid in 12 Equal Monthly Installments!'}
            </h2>
            <p className="text-xs sm:text-sm text-amber-50/90 leading-relaxed">
              {isBn
                ? 'আমাদের এই কোম্পানি দিচ্ছে শতভাগ নির্ভরযোগ্য ও লাভজনক প্রকল্প। আপনি যে মূলধন বিনিয়োগ করবেন, ১২ মাসে তার দ্বিগুণ রিটার্ন পাবেন (১০০% নিট মুনাফা)। প্রতি মাসে সমান কিস্তি আকারে লাভ ও আসল আপনার অ্যাকাউন্টে স্বয়ংক্রিয়ভাবে জমা হবে।'
                : 'Our company guarantees 2X total payout in 12 months (100% net profit). Both capital and profits are disbursed consecutively across 12 equal monthly installments directly into your bank or portal wallet.'}
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-semibold text-amber-100">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>{isBn ? '১২টি ব্যাংক সিকিউরিটি PDC চেক' : '12 Bank PDC Cheques'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FileCheck2 className="w-4 h-4 text-emerald-300" />
                <span>{isBn ? 'রেজিস্টার্ড আইনি চুক্তিপত্র' : 'Notarized Legal Deed'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-300" />
                <span>{isBn ? 'প্রতি মাসের ১-৫ তারিখে কিস্তি ক্রেডিট' : 'Monthly Auto Credit on 1st-5th'}</span>
              </div>
            </div>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-3">
            <button
              onClick={() => setIsEnrollModalOpen(true)}
              className="px-6 py-3.5 rounded-2xl bg-slate-950 hover:bg-slate-900 text-amber-400 font-black text-xs uppercase tracking-wider transition-all shadow-xl flex items-center justify-center gap-2 group"
            >
              <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>{isBn ? 'নতুন ডাবল প্রফিট প্ল্যান খুলুন' : 'Enroll in New Plan'}</span>
            </button>
            {selectedPlan && (
              <button
                onClick={() => {
                  setDeedPlan(selectedPlan);
                  setIsDeedModalOpen(true);
                }}
                className="px-6 py-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs transition-all border border-white/20 flex items-center justify-center gap-2"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>{isBn ? 'চুক্তিপত্র ও PDC চেক দেখুন' : 'View Deed & Cheques'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Invested Capital */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">
              {isBn ? 'মোট বিনিয়োগকৃত মূলধন' : 'Total Capital Invested'}
            </span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            ৳{totalInvestedCapital.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            {isBn ? `${plans.length}টি সক্রিয় বিনিয়োগ প্যাকেজ` : `${plans.length} active packages`}
          </span>
        </div>

        {/* Total 2X Return */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">
              {isBn ? '১২ মাসের মোট ডাবল রিটার্ন' : 'Total 12-Mo 2X Return'}
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
            ৳{totalTarget2xReturn.toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-500 font-semibold mt-1 block">
            {isBn ? '১০০% নিশ্চিত নিট মুনাফা (দ্বিগুণ প্রাপ্তি)' : '100% Net Profit (200% Payout)'}
          </span>
        </div>

        {/* Monthly Installment Receivable */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">
              {isBn ? 'প্রতি মাসে মোট কিস্তি আয়' : 'Monthly Installment Inflow'}
            </span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono">
            ৳{totalMonthlyInstallmentReceivable.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            {isBn ? '১২ মাসের কিস্তির মাসিক প্রাপ্যতা' : 'Disbursed every month'}
          </span>
        </div>

        {/* Total Received So Far */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">
              {isBn ? 'ইতোমধ্যে প্রাপ্ত কিস্তি' : 'Total Paid Out to Date'}
            </span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-blue-600 dark:text-blue-400 font-mono">
            ৳{totalAlreadyPaidOut.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            {isBn ? 'সরাসরি ওয়ালেট/ব্যাংকে জমা হয়েছে' : 'Credited to your balance'}
          </span>
        </div>

      </div>

      {/* Main Content Layout: Plan Selector & 12-Month Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: List of Plans */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {isBn ? 'আপনার ডাবল প্রফিট প্ল্যানসমূহ' : 'Your Double Profit Plans'}
            </h3>
            <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
              {plans.length} {isBn ? 'টি প্ল্যান' : 'Plans'}
            </span>
          </div>

          {plans.length === 0 ? (
            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700 text-center space-y-3">
              <Sparkles className="w-8 h-8 text-amber-500 mx-auto" />
              <p className="text-xs text-slate-500">
                {isBn ? 'আপনার কোনো সক্রিয় ডাবল প্রফিট প্ল্যান নেই।' : 'No active double profit plans yet.'}
              </p>
              <button
                onClick={() => setIsEnrollModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-bold hover:bg-amber-500 transition-colors"
              >
                {isBn ? 'এখনই প্ল্যান শুরু করুন' : 'Start Plan Now'}
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {plans.map(plan => {
                const isSelected = selectedPlan?.id === plan.id;
                const progressPercent = Math.round((plan.paidInstallments / plan.totalMonths) * 100);

                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan)}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-amber-500/10 dark:bg-amber-500/15 border-amber-500 shadow-md ring-1 ring-amber-500'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-slate-950 font-mono">
                            12-MONTHS 2X
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            plan.status === 'completed'
                              ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                              : 'bg-blue-500/20 text-blue-600 dark:text-blue-400'
                          }`}>
                            {plan.status === 'completed'
                              ? (isBn ? 'সম্পন্ন' : 'Completed')
                              : (isBn ? 'চলমান কিস্তি' : 'Active')}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                          {isBn ? plan.packageNameBn : plan.packageName}
                        </h4>
                      </div>
                      <span className="text-xs font-mono font-black text-amber-600 dark:text-amber-400">
                        ৳{plan.principalAmount.toLocaleString()}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1.5 mt-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500">
                          {isBn ? 'কিস্তি পরিশোধের অগ্রগতি:' : 'Installment Progress:'}
                        </span>
                        <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                          {plan.paidInstallments} / 12 {isBn ? 'মাসিক কিস্তি' : 'Months'} ({progressPercent}%)
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full transition-all duration-500"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>

                    {/* Monthly Installment Details */}
                    <div className="grid grid-cols-2 gap-2 mt-3 pt-2 text-[11px] border-t border-slate-200/60 dark:border-slate-800/60">
                      <div>
                        <span className="text-slate-500 block">{isBn ? 'প্রতি মাসে কিস্তি:' : 'Monthly Installment:'}</span>
                        <strong className="text-amber-600 dark:text-amber-400 font-mono text-xs">
                          ৳{plan.monthlyInstallmentAmount.toLocaleString()} / মাস
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">{isBn ? 'পরবর্তী কিস্তির তারিখ:' : 'Next Payout Date:'}</span>
                        <strong className="text-slate-700 dark:text-slate-300 font-mono text-xs">
                          {plan.nextPayoutDate}
                        </strong>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800/50">
                      <span className="font-mono">Deed: {plan.agreementDeedNo}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeedPlan(plan);
                          setIsDeedModalOpen(true);
                        }}
                        className="text-amber-600 dark:text-amber-400 font-bold hover:underline flex items-center gap-1"
                      >
                        <FileCheck2 className="w-3.5 h-3.5" />
                        <span>{isBn ? 'চুক্তিপত্র' : 'Deed & PDC'}</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

          {/* Guarantee Note Box */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-900 dark:text-amber-300 space-y-2">
            <div className="flex items-center gap-2 font-bold">
              <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{isBn ? 'কোম্পানির অফিসিয়াল সিকিউরিটি অঙ্গীকার' : 'Corporate Legal Guarantee'}</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-700 dark:text-slate-300">
              {isBn
                ? 'প্রতিটি প্ল্যানের বিপরীতে বিনিয়োগকারীকে কোম্পানির নির্ধারিত ব্যাংক একাউন্ট থেকে ১২ মাসের ১২টি পোস্ট-ডেটেড চেক (PDC) এবং ১০০ টাকার নন-জুডিশিয়াল স্ট্যাম্পে নোটারি রেজিস্টার্ড চুক্তিপত্র প্রদান করা হয়।'
                : 'Each plan is backed by 12 official company bank post-dated cheques (PDC) and a notarized legal agreement on non-judicial stamp.'}
            </p>
          </div>

        </div>

        {/* Right Column: Detailed 12-Month Installment Ledger */}
        <div className="lg:col-span-7">
          {selectedPlan ? (
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              
              {/* Header */}
              <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-900/50">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-slate-950 font-mono">
                      PLAN SCHEDULE
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {isBn ? selectedPlan.packageNameBn : selectedPlan.packageName}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {isBn
                      ? `মোট ১২টি মাসিক কিস্তির বিস্তারিত বণ্টন শিডিউল ও ব্যাংক PDC চেকের বিবরণ`
                      : `Detailed 12-month installment payout schedule and bank PDC cheques`}
                  </p>
                </div>

                <div className="text-right sm:text-right">
                  <span className="text-[11px] text-slate-400 block">{isBn ? 'প্রতি মাসে কিস্তি:' : 'Monthly Installment:'}</span>
                  <span className="text-lg font-black text-amber-600 dark:text-amber-400 font-mono">
                    ৳{selectedPlan.monthlyInstallmentAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Installment Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 uppercase text-[10px] font-bold tracking-wider">
                    <tr>
                      <th className="py-3 px-4">{isBn ? 'কিস্তি #' : 'Inst #'}</th>
                      <th className="py-3 px-4">{isBn ? 'মাস ও তারিখ' : 'Month & Due Date'}</th>
                      <th className="py-3 px-4">{isBn ? 'কিস্তির পরিমাণ' : 'Installment (BDT)'}</th>
                      <th className="py-3 px-4">{isBn ? 'ব্যাংক PDC চেক #' : 'Bank PDC Cheque'}</th>
                      <th className="py-3 px-4">{isBn ? 'স্ট্যাটাস' : 'Status'}</th>
                      <th className="py-3 px-4 text-right">{isBn ? 'ভাউচার নং' : 'Voucher Ref'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                    {generate12MonthSchedule(selectedPlan).map(row => (
                      <tr
                        key={row.installmentNo}
                        className={`transition-colors ${
                          row.status === 'paid'
                            ? 'bg-emerald-500/5 dark:bg-emerald-500/5'
                            : row.status === 'processing'
                            ? 'bg-amber-500/10 dark:bg-amber-500/10 font-bold'
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                        }`}
                      >
                        <td className="py-3 px-4">
                          <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-bold flex items-center justify-center">
                            {row.installmentNo}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-semibold text-slate-800 dark:text-slate-200 block font-sans">
                            {row.monthLabel}
                          </span>
                          <span className="text-[10px] text-slate-400">{row.dueDate}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm font-bold text-slate-900 dark:text-white">
                            ৳{row.amount.toLocaleString()}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono border border-slate-200 dark:border-slate-700">
                            {row.chequeNumber}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {row.status === 'paid' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>{isBn ? 'পরিশোধিত' : 'Paid'}</span>
                            </span>
                          )}
                          {row.status === 'processing' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-700 dark:text-amber-400 animate-pulse">
                              <Clock className="w-3 h-3" />
                              <span>{isBn ? 'প্রক্রিয়াধীন' : 'Processing'}</span>
                            </span>
                          )}
                          {row.status === 'upcoming' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 dark:bg-slate-800 text-slate-500">
                              <span>{isBn ? 'আসন্ন' : 'Upcoming'}</span>
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="text-[10px] text-slate-400">{row.voucherRef}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Footer Summary */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{isBn ? '১২ মাস মেয়াদান্তে মোট নিট মুনাফা: ১০০% (আসল সহ মোট ২০০% রিটার্ন)' : '100% Net Profit delivered at end of 12-month tenure.'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-500">{isBn ? 'সর্বমোট রিটার্ন:' : 'Total Payout:'}</span>
                  <span className="text-base font-black text-amber-600 dark:text-amber-400 font-mono">
                    ৳{selectedPlan.totalReturnAmount.toLocaleString()}
                  </span>
                </div>
              </div>

            </div>
          ) : (
            <div className="p-12 text-center text-slate-400">
              {isBn ? 'একটি প্ল্যান নির্বাচন করুন।' : 'Select a plan to view its schedule.'}
            </div>
          )}
        </div>

      </div>

      {/* ======================================================== */}
      {/* MODAL 1: ENROLL IN NEW 12-MONTH DOUBLE PROFIT PLAN       */}
      {/* ======================================================== */}
      {isEnrollModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl p-6 sm:p-8 text-white shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black">
                    {isBn ? '১২ মাসে ডাবল প্রফিট প্রকল্পে আবেদন' : 'Enroll in 12-Month Double Profit Scheme'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {isBn ? 'প্রতি মাসে সমান কিস্তিতে লাভ ও আসল সরাসরি উত্তোলনযোগ্য' : 'Disbursed in 12 equal monthly installments'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsEnrollModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleEnrollSubmit} className="space-y-6 text-xs">
              
              {/* Preset Packages Grid */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  {isBn ? 'জনপ্রিয় প্যাকেজ বেছে নিন:' : 'Select Investment Package:'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {packages.map(pkg => (
                    <button
                      key={pkg.amount}
                      type="button"
                      onClick={() => handleSelectPackage(pkg.amount)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        selectedPackageAmount === pkg.amount
                          ? 'border-amber-500 bg-amber-500/20 ring-2 ring-amber-500 text-white'
                          : 'border-slate-800 bg-slate-800/60 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-sm font-mono">{pkg.label}</span>
                        {selectedPackageAmount === pkg.amount && (
                          <span className="w-2 h-2 rounded-full bg-amber-500" />
                        )}
                      </div>
                      <span className="text-[10px] text-emerald-400 font-bold block mt-1">
                        {pkg.returnLabel}
                      </span>
                      <span className="text-[10px] text-amber-300 block font-mono">
                        {pkg.monthly}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Amount Input */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  {isBn ? 'অথবা আপনার পছন্দমতো বিনিয়োগ লিখুন (টাকা):' : 'Or Enter Custom Investment Amount (BDT):'}
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-base font-extrabold text-amber-500 font-mono">৳</span>
                  <input
                    type="text"
                    value={customAmountInput}
                    onChange={handleCustomChange}
                    placeholder="e.g. 500000"
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-700 bg-slate-800 text-white font-mono font-bold text-base focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Realtime Payout Computation Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 to-emerald-500/10 border border-amber-500/30 space-y-2.5 font-mono">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-sans">{isBn ? 'আপনার মূলধন বিনিয়োগ:' : 'Invested Capital:'}</span>
                  <strong className="text-white text-sm">৳{selectedPackageAmount.toLocaleString()}</strong>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-sans">{isBn ? '১২ মাসে নিট মুনাফা (১০০% লাভ):' : '12-Month Net Profit (100%):'}</span>
                  <strong className="text-emerald-400 text-sm">+৳{selectedPackageAmount.toLocaleString()}</strong>
                </div>
                <div className="flex items-center justify-between text-xs border-t border-slate-800 pt-2">
                  <span className="text-slate-200 font-sans font-bold">{isBn ? '১২ মাসে সর্বমোট রিটার্ন (২০০%):' : 'Total 12-Month 2X Payout:'}</span>
                  <strong className="text-amber-400 text-base font-black">৳{(selectedPackageAmount * 2).toLocaleString()}</strong>
                </div>
                <div className="flex items-center justify-between text-xs border-t border-slate-800 pt-2 bg-slate-900/60 p-2.5 rounded-xl">
                  <span className="text-amber-300 font-sans font-bold">{isBn ? 'প্রতি মাসে কিস্তিতে পাবেন (১২ মাস):' : 'You Will Receive Every Month (12 Mos):'}</span>
                  <strong className="text-emerald-300 text-lg font-black">৳{Math.round((selectedPackageAmount * 2) / 12).toLocaleString()} / মাস</strong>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  {isBn ? 'পেমেন্ট মাধ্যম বেছে নিন:' : 'Select Payment Method:'}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentSource('wallet')}
                    className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                      paymentSource === 'wallet'
                        ? 'border-amber-500 bg-amber-500/20 text-white ring-1 ring-amber-500'
                        : 'border-slate-800 bg-slate-800/60 text-slate-400'
                    }`}
                  >
                    <Wallet className="w-5 h-5 text-amber-400 shrink-0" />
                    <div>
                      <span className="font-bold text-xs block">{isBn ? 'ইনভেস্টমেন্ট ওয়ালেট' : 'Portal Wallet'}</span>
                      <span className="text-[10px] text-slate-400">Instant Activation</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentSource('bank_transfer')}
                    className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                      paymentSource === 'bank_transfer'
                        ? 'border-amber-500 bg-amber-500/20 text-white ring-1 ring-amber-500'
                        : 'border-slate-800 bg-slate-800/60 text-slate-400'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-amber-400 shrink-0" />
                    <div>
                      <span className="font-bold text-xs block">{isBn ? 'ব্যাংক ট্রান্সফার / স্লিপ' : 'Bank Deposit Slip'}</span>
                      <span className="text-[10px] text-slate-400">PDC Cheque Verification</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Guarantee Terms Acceptance */}
              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-2.5 text-[11px] text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  {isBn
                    ? 'আমি কোম্পানির ১২ মাসের ডাবল প্রফিট প্রকল্পের নিয়মাবলী ও ১২টি সিকিউরিটি চেক ও রেজিস্টার্ড চুক্তিপত্রের শর্তাবলীতে সম্মতি জানাচ্ছি।'
                    : 'I agree to the 12-month double profit plan terms, 12 bank security cheques, and registered agreement conditions.'}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEnrollModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
                >
                  {isBn ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 text-slate-950 font-black uppercase tracking-wider shadow-lg flex items-center gap-2"
                >
                  <span>{isBn ? 'নিশ্চিত করুন ও সক্রিয় করুন' : 'Confirm & Activate Plan'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: LEGAL AGREEMENT DEED & 12 BANK PDC CHEQUES VIEW */}
      {/* ======================================================== */}
      {isDeedModalOpen && deedPlan && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl p-6 sm:p-8 text-white shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <Award className="w-6 h-6 text-amber-500" />
                <div>
                  <h3 className="text-base sm:text-lg font-black">
                    {isBn ? 'অফিসিয়াল রেজিস্টার্ড চুক্তিপত্র ও ১২টি ব্যাংক PDC সিকিউরিটি চেক' : 'Official Registered Deed & 12 Bank PDC Cheques'}
                  </h3>
                  <span className="text-xs font-mono text-amber-400">
                    Deed No: {deedPlan.agreementDeedNo}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsDeedModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Simulated Government Stamped Registered Deed */}
            <div className="p-6 rounded-2xl bg-amber-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border-2 border-amber-500/40 space-y-4 font-serif">
              <div className="text-center border-b border-amber-500/30 pb-3">
                <span className="text-[10px] font-mono tracking-widest text-amber-700 dark:text-amber-400 font-bold uppercase block">
                  GOVERNMENT OF THE PEOPLE'S REPUBLIC OF BANGLADESH · NON-JUDICIAL STAMP
                </span>
                <h4 className="text-lg font-black text-slate-900 dark:text-white mt-1">
                  ZONE SQUARE REAL ESTATE LIMITED
                </h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  Head Office: Mirpur DOHS / Pallabi, Dhaka · Regional: Salma Centre, Chattogram
                </p>
              </div>

              <div className="text-xs space-y-2 leading-relaxed">
                <p>
                  <strong>বিনিয়োগকারী (First Party / Investor):</strong> {deedPlan.memberName} (ID: {deedPlan.memberId})
                </p>
                <p>
                  <strong>কোম্পানি (Second Party):</strong> জোন স্কয়ার রিয়েল এস্টেট লিমিটেড (ব্যবস্থাপনা পরিচালক ও চেয়ারম্যান কর্তৃক স্বাক্ষরিত)।
                </p>
                <p>
                  <strong>বিনিয়োগকৃত মূলধন (Capital Invested):</strong> ৳{deedPlan.principalAmount.toLocaleString()} টাকা।
                </p>
                <p>
                  <strong>১২ মাসের মোট প্রাপ্য রিটার্ন (Guaranteed 2X Return):</strong> ৳{deedPlan.totalReturnAmount.toLocaleString()} টাকা (১০০% নিট মুনাফা সহ দ্বিগুণ ফেরত)।
                </p>
                <p>
                  <strong>মাসিক কিস্তির পরিমাণ (Monthly Installment Payout):</strong> প্রতি মাসে ৳{deedPlan.monthlyInstallmentAmount.toLocaleString()} টাকা হারে ১২টি সমান কিস্তিতে পরিশোধযোগ্য।
                </p>
              </div>

              {/* 12 Bank PDC Cheques Manifest */}
              <div className="pt-3 border-t border-amber-500/30 font-sans">
                <h5 className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-2">
                  ১২টি ব্যাংক পোস্ট-ডেটেড সিকিউরিটি চেক (12 Bank PDC Cheques Manifest):
                </h5>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] font-mono">
                  {deedPlan.pdcCheckNumbers.map((chk, idx) => (
                    <div
                      key={chk}
                      className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 flex items-center justify-between"
                    >
                      <span className="text-slate-500 font-sans">কিস্তি #{idx + 1}</span>
                      <strong className="text-amber-600 dark:text-amber-400">{chk}</strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* Seals & Signatures */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-amber-500/30 text-center text-xs font-sans">
                <div>
                  <div className="h-10 border-b border-dashed border-slate-400 mx-8" />
                  <span className="font-bold block mt-1">First Party (Investor)</span>
                  <span className="text-[10px] text-slate-500">{deedPlan.memberName}</span>
                </div>
                <div>
                  <div className="h-10 border-b border-dashed border-slate-400 mx-8" />
                  <span className="font-bold text-amber-600 dark:text-amber-400 block mt-1">Authorized Signatory</span>
                  <span className="text-[10px] text-slate-500">ZONE SQUARE Corporate Seal</span>
                </div>
              </div>

            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400 font-mono">
                Issued under Section 138 NI Act Security Compliance
              </span>
              <button
                onClick={() => setIsDeedModalOpen(false)}
                className="px-6 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs"
              >
                {isBn ? 'ঠিক আছে' : 'Close Document'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
