import React from 'react';
import {
  TrendingUp,
  X,
  CreditCard,
  ShieldCheck,
  Calendar,
  Sparkles,
  ChevronRight,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { User, PlotBooking, ShareInvestment, Language } from '../../types';
import { formatBDT, getTranslation, translations } from '../../services/i18n';

interface GlanceWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  plots: PlotBooking[];
  shares: ShareInvestment[];
  language: Language;
  onOpenPayment: () => void;
  onOpenPortal: () => void;
  isCloudSynced: boolean;
}

export const GlanceWidget: React.FC<GlanceWidgetProps> = ({
  isOpen,
  onClose,
  user,
  plots,
  shares,
  language,
  onOpenPayment,
  onOpenPortal,
  isCloudSynced
}) => {
  const t = (key: keyof typeof translations.en) => getTranslation(language, key);

  if (!isOpen) return null;

  const nextPlot = plots[0];
  const activeShare = shares[0];
  const monthlyDividend = shares.reduce((acc, s) => acc + s.monthlyDividendAmount, 0);

  return (
    <aside
      aria-label="Quick Glance Portfolio Widget"
      className="fixed bottom-20 right-4 sm:right-6 z-50 w-80 sm:w-96 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden transition-all duration-200 animate-in fade-in slide-in-from-bottom-5"
    >
      {/* Widget Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 p-3.5 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-amber-500/20 border border-amber-400/30 flex items-center justify-center">
            <TrendingUp className="w-3.5 h-3.5 text-amber-300" />
          </div>
          <div>
            <h3 className="text-xs font-bold tracking-tight leading-none text-white">
              {t('glanceTitle')}
            </h3>
            <span className="text-[10px] text-amber-200/80 font-mono">
              {user ? user.memberId : 'Demo Mode'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <div
            className={`w-2 h-2 rounded-full ${
              isCloudSynced ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
            }`}
            title={isCloudSynced ? 'Encrypted Cloud Sync Active' : 'Offline Stored'}
          />
          <button
            onClick={onClose}
            className="p-1 text-slate-300 hover:text-white rounded-md hover:bg-white/10 transition-colors"
            aria-label="Close Glance Widget"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Widget Body */}
      <div className="p-4 space-y-3 bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100">
        
        {/* Next Due Metric */}
        {nextPlot && (
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span className="flex items-center gap-1.5 font-medium">
                <Calendar className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                {t('glanceNextDue')}
              </span>
              <span className="text-[11px] font-mono text-amber-700 dark:text-amber-400 font-semibold">
                {nextPlot.nextDueDate}
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-base font-extrabold text-slate-900 dark:text-white">
                {formatBDT(nextPlot.nextDueAmount, language)}
              </span>
              <span className="text-[11px] text-slate-600 dark:text-slate-300">
                Plot #{nextPlot.plotNo} ({nextPlot.sector})
              </span>
            </div>
          </div>
        )}

        {/* Monthly Dividend Metric */}
        <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
              {t('glanceDividend')}
            </span>
            <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
              +{formatBDT(monthlyDividend, language)}
              <span className="text-[10px] text-slate-400 font-normal"> /mo</span>
            </span>
          </div>
          <div className="text-right text-[11px] text-slate-600 dark:text-slate-300">
            <span>2 Suite Units</span>
            <span className="block text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
              18.5% ROI
            </span>
          </div>
        </div>

        {/* Security & Sync Status */}
        <div className="flex items-center justify-between px-2 text-[11px] text-slate-600 dark:text-slate-300">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            AES-256 Encrypted
          </span>
          <span className="font-mono">
            {isCloudSynced ? t('glanceSynced') : t('glanceOffline')}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => {
              onClose();
              onOpenPayment();
            }}
            className="w-full py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>{t('payNow')}</span>
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenPortal();
            }}
            className="w-full py-2 px-3 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
          >
            <span>{t('navPortal')}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </aside>
  );
};
