import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Building2,
  KeyRound,
  Compass,
  MapPin,
  TrendingUp,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { Language, User } from '../../types';
import { translations, getTranslation } from '../../services/i18n';

interface HeroSectionProps {
  language: Language;
  user: User | null;
  onOpenAuth: () => void;
  onExploreProjects: () => void;
  onOpenPortal: () => void;
  onOpenDemo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  user,
  onOpenAuth,
  onExploreProjects,
  onOpenPortal,
  onOpenDemo
}) => {
  const t = (key: keyof typeof translations.en) => getTranslation(language, key);

  return (
    <section className="relative overflow-hidden bg-slate-900 text-white pt-12 pb-20 sm:pt-20 sm:pb-28">
      
      {/* Background Architectural Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-600 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Unboxed Kicker */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-amber-400 font-semibold tracking-wide uppercase mb-3">
          <span>ZONE SQUARE</span>
          <span aria-hidden="true">·</span>
          <span>Official Investor Portal</span>
          <span aria-hidden="true">·</span>
          <span>Purbachal & Cox's Bazar</span>
        </div>

        {/* 12-Month Double Profit Scheme Alert Banner */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-emerald-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>
            {language === 'bn'
              ? 'বিশেষ প্রকল্প: ১২ মাসে ডাবল প্রফিট — প্রতি মাসে কিস্তি আকারে লাভ ও আসল বণ্টন!'
              : 'Featured Scheme: 2X Double Return in 12 Months — Paid in 12 Monthly Installments!'}
          </span>
        </div>

        {/* Hero Title & Value Proposition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-left">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              {t('heroTitle1')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
                {t('heroTitleHighlight')}
              </span>{' '}
              {t('heroTitle2')}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              {t('heroSubtitle')}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {user ? (
                <button
                  onClick={onOpenPortal}
                  className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center gap-2"
                >
                  <span>{t('heroCtaPortal')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <>
                  <button
                    onClick={onOpenDemo}
                    className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center gap-2"
                  >
                    <KeyRound className="w-4 h-4" />
                    <span>{t('heroCtaLoginDemo')}</span>
                  </button>
                  <button
                    onClick={onOpenAuth}
                    className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all"
                  >
                    {t('navLogin')}
                  </button>
                </>
              )}

              <button
                onClick={onExploreProjects}
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-all flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-amber-400" />
                <span>{t('heroCtaExplore')}</span>
              </button>
            </div>

            {/* Unboxed Metadata Stats */}
            <div className="pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div>
                <span className="text-xl sm:text-2xl font-extrabold text-amber-400 font-mono block">
                  1,450+
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {t('statInvestors')}
                </span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-extrabold text-white font-mono block">
                  350+
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {t('statAcres')}
                </span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-mono block">
                  100%
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {t('statClearance')}
                </span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-extrabold text-amber-300 font-mono block">
                  2X Return
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {language === 'bn' ? '১২ মাসে ডাবল প্রফিট' : '12-Mo Double Return'}
                </span>
              </div>
            </div>

          </div>

          {/* Right Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 p-6 shadow-2xl">
              
              <div className="relative rounded-xl overflow-hidden aspect-video sm:aspect-4/3 mb-4 group">
                <img
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80"
                  alt="City R Mega Town Purbachal"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">
                      FLAGSHIP RESIDENTIAL DEVELOPMENT
                    </span>
                    <h3 className="text-base font-bold text-white">
                      City R Mega Town - Purbachal
                    </h3>
                  </div>
                </div>
              </div>

              {/* Investor Live Snapshot Box */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2.5 text-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Government Sub-Registry Compliance
                  </span>
                  <span className="font-mono text-emerald-400 font-semibold">100% VERIFIED</span>
                </div>
                <div className="flex items-center justify-between border-t border-slate-800 pt-2 text-slate-300">
                  <span>Available Land Sizes:</span>
                  <span className="font-mono font-bold text-white">3, 5 & 10 Katha Plots</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Payment Schedule:</span>
                  <span className="font-mono font-bold text-amber-400">Up to 60 Months (0% Int)</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
