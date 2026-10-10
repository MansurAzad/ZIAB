import React from 'react';
import { ShieldCheck, FileCheck, Award, CheckCircle, Scale, Building, ExternalLink } from 'lucide-react';
import { Language } from '../../types';
import { translations, getTranslation } from '../../services/i18n';

interface LegalSecurityProps {
  language: Language;
}

export const LegalSecurity: React.FC<LegalSecurityProps> = ({ language }) => {
  const t = (key: keyof typeof translations.en) => getTranslation(language, key);

  const pillars = [
    {
      title: 'CS, SA, RS & BS Khatian Chain',
      titleBn: 'সিএস, এসএ, আরএস ও বিএস খতিয়ান যাচাই',
      desc: 'Flawless 100-year continuous ownership chain directly verified with AC Land and Sub-Registry records.',
      descBn: 'এসি ল্যান্ড ও সাব-রেজিস্ট্রি রেকর্ড দ্বারা নির্ভুল ১০০ বছরের ধারাবাহিক মালিকানা যাচাইকৃত।'
    },
    {
      title: 'RAJUK & Master Plan Conformance',
      titleBn: 'রাজউক ও ড্যাপ (DAP) পরিকল্পনা সংলগ্ন',
      desc: 'All residential blocks in City R Mega Town are designed strictly adhering to RAJUK guidelines and official road alignments.',
      descBn: 'সিটি আর মেগা টাউনের সকল ব্লক রাজউক নির্দেশনা ও প্রশস্ত সড়ক নেটওয়ার্ক মেনে পরিকল্পিত।'
    },
    {
      title: 'Direct Sub-Registry Deed Delivery',
      titleBn: 'তাৎক্ষণিক রেজিস্ট্রি ও নামজারি',
      desc: 'Plot owners receive full legal Kabuliat & Deed registration upon completion of payment schedules.',
      descBn: 'কিস্তি বা এককালীন পরিশোধের সাথে সাথেই ক্রেতাকে দলিল সম্পাদন ও নামজারি বুঝিয়ে দেওয়া হয়।'
    },
    {
      title: 'Bank & Islamic Finance Approved',
      titleBn: 'ব্যাংক লোন ও শরিয়াহ সম্মত বিনিয়োগ',
      desc: 'All projects are pre-vetted by leading banks for seamless building construction loans and shariah-compliant fractional profit-sharing.',
      descBn: 'শীর্ষস্থানীয় ব্যাংকসমূহ কর্তৃক অনুমোদিত এবং সম্পূর্ণ শরিয়াহ-সম্মত লাভ বণ্টন ব্যবস্থা।'
    }
  ];

  return (
    <section id="legal" className="py-12 sm:py-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Scale className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? '১০০% আইনি নিরাপত্তা' : '100% Legal Title Warranty'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {language === 'bn' ? 'নিরাপদ বিনিয়োগ ও জমি রেজিস্ট্রির নিশ্চয়তা' : 'Zero-Risk Real Estate & Land Title Security'}
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            {language === 'bn'
              ? 'সিটি স্কয়ার বিডি আপনার প্রতিটি টাকার সর্বোচ্চ আইনি সুরক্ষা প্রদানে প্রতিশ্রুতিবদ্ধ।'
              : 'At City Square BD, every acre is backed by ironclad land records, verified mutations, and transparent registration.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {language === 'bn' ? item.titleBn : item.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {language === 'bn' ? item.descBn : item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Corporate Trust Badge Strip */}
        <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 text-white flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-amber-400 shrink-0" />
            <div>
              <h4 className="text-sm font-bold">Official Verification Desk</h4>
              <p className="text-xs text-slate-300">
                Inspect physical deed records, Porcha, and RS/BS Khatian at our Mirpur Pallabi Head Office or Agrabad Chattogram Branch.
              </p>
            </div>
          </div>
          <div className="text-xs font-mono bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 whitespace-nowrap">
            Hotline: +880 1700-CITYBD
          </div>
        </div>

      </div>
    </section>
  );
};
