import React, { useState, useEffect } from 'react';
import { Bell, BellRing, X, CheckCircle2 } from 'lucide-react';
import { Language } from '../../types';

interface PushNotificationPromptProps {
  language: Language;
}

export const PushNotificationPrompt: React.FC<PushNotificationPromptProps> = ({ language }) => {
  const [permission, setPermission] = useState<string>('default');
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermission(Notification.permission);
      if (Notification.permission === 'default') {
        const timer = setTimeout(() => setShowBanner(true), 2500);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleEnablePush = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const result = await Notification.requestPermission();
        setPermission(result);
        setShowBanner(false);
        if (result === 'granted') {
          new Notification('City Square BD Notifications Enabled', {
            body: 'You will receive real-time alerts for monthly dividend payouts and installment due dates.',
            icon: '/favicon.ico'
          });
        }
      } catch (err) {
        console.error(err);
        setShowBanner(false);
      }
    } else {
      setShowBanner(false);
    }
  };

  if (!showBanner || permission !== 'default') return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm rounded-2xl bg-slate-900 text-white p-4 shadow-2xl border border-slate-700 animate-in slide-in-from-bottom-5">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
          <BellRing className="w-4 h-4 animate-bounce" />
        </div>
        <div className="flex-1 space-y-1">
          <h4 className="text-xs font-bold text-white">
            {language === 'bn' ? 'পুশ নোটিফিকেশন চালু করুন' : 'Enable Real-time Push Alerts'}
          </h4>
          <p className="text-[11px] text-slate-300 leading-snug">
            {language === 'bn'
              ? 'কিস্তির সময়সীমা ও কক্সবাজার হোটেল শেয়ারের মাসিক মুনাফা জমার তাৎক্ষণিক আপডেট পান।'
              : 'Get instant browser alerts when hotel dividends are credited or plot installments are due.'}
          </p>
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={handleEnablePush}
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[11px] transition-colors"
            >
              {language === 'bn' ? 'অনুমতি দিন' : 'Allow Alerts'}
            </button>
            <button
              onClick={() => setShowBanner(false)}
              className="px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-white text-[11px] transition-colors"
            >
              {language === 'bn' ? 'পরে' : 'Dismiss'}
            </button>
          </div>
        </div>
        <button
          onClick={() => setShowBanner(false)}
          className="text-slate-400 hover:text-white p-0.5"
          aria-label="Close"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
