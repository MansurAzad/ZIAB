import React from 'react';
import { Building2, MapPin, Phone, Mail, Globe, ShieldCheck, Heart } from 'lucide-react';
import { Language } from '../../types';
import { translations, getTranslation } from '../../services/i18n';

interface FooterProps {
  language: Language;
  onNavigate: (view: string) => void;
  onOpenAuth: () => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onNavigate, onOpenAuth }) => {
  const t = (key: keyof typeof translations.en) => getTranslation(language, key);

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-600 flex items-center justify-center text-white shadow-md">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-white text-lg tracking-tight">
                ZONE <span className="text-amber-500">SQUARE</span>
              </span>
            </div>
            
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              {language === 'bn'
                ? 'জোন স্কয়ার রিয়েল এস্টেট খাতের একটি শীর্ষস্থানীয় প্রতিষ্ঠান। আধুনিক বাসস্থান, ১২ মাসে নিশ্চিত ডাবল প্রফিট প্রকল্প ও লাভজনক শেয়ার বিনিয়োগে বিশ্বস্ত অংশীদার।'
                : 'ZONE SQUARE is a premier corporate developer in Bangladesh delivering 12-month double return investment schemes, master-planned developments, and high-yield hospitality investments.'}
            </p>

            <div className="flex items-center gap-2 text-slate-500 text-[11px]">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Certified under Real Estate Development & Management Act</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              {language === 'bn' ? 'প্রকল্পসমূহ' : 'Developments'}
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('projects')} className="hover:text-amber-400 transition-colors">
                  City R Mega Town (Purbachal)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('projects')} className="hover:text-amber-400 transition-colors">
                  City Royal Bay Hotel & Suites
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('projects')} className="hover:text-amber-400 transition-colors">
                  Pallabi Commercial Square
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('masterplan')} className="hover:text-amber-400 transition-colors">
                  Interactive Sector 4 Map
                </button>
              </li>
            </ul>
          </div>

          {/* Investor Services */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              {language === 'bn' ? 'বিনিয়োগকারী পোর্টাল' : 'Investor Portal'}
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={onOpenAuth} className="hover:text-amber-400 transition-colors">
                  Investor Sign In (Ziabulctg1)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('calculator')} className="hover:text-amber-400 transition-colors">
                  ROI & Installment Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('legal')} className="hover:text-amber-400 transition-colors">
                  Legal Deeds & Mutation Records
                </button>
              </li>
              <li>
                <span className="text-emerald-400 font-mono text-[11px]">
                  End-to-End Encrypted Cloud
                </span>
              </li>
            </ul>
          </div>

          {/* Offices */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              {language === 'bn' ? 'অফিস লোকেশন' : 'Corporate Offices'}
            </h4>
            
            <div className="space-y-2 text-[11px] leading-tight">
              <div>
                <strong className="text-slate-300 block">Dhaka Head Office:</strong>
                <span>Section 12, Mirpur Pallabi, Dhaka-1216</span>
              </div>

              <div>
                <strong className="text-slate-300 block">Chattogram Regional Office:</strong>
                <span>Salma Centre, 1st Floor, 70 Muradpur, Panchlaish, Ctg</span>
              </div>

              <div className="pt-1 flex items-center gap-1.5 text-amber-400 font-mono">
                <Phone className="w-3.5 h-3.5" />
                <span>+880 1810-685888</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 ZONE SQUARE Limited. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Privacy Policy</span>
            <span>Terms of Allotment</span>
            <span>Security & E2E Encryption</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
