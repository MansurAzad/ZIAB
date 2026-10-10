import React from 'react';
import {
  X,
  Printer,
  ShieldCheck,
  Building2,
  FileText,
  Award,
  QrCode,
  Scale
} from 'lucide-react';
import { User, PlotBooking, Language } from '../../types';
import { formatBDT } from '../../services/i18n';

interface RegisteredDeedModalProps {
  isOpen: boolean;
  onClose: () => void;
  plot: PlotBooking;
  user: User;
  language: Language;
}

export const RegisteredDeedModal: React.FC<RegisteredDeedModalProps> = ({
  isOpen,
  onClose,
  plot,
  user,
  language
}) => {
  if (!isOpen) return null;
  const isBn = language === 'bn';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
      <div className="bg-white text-slate-900 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto print:max-h-none print:overflow-visible print:p-0 print:border-none print:shadow-none">
        
        {/* Controls */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
              <Scale className="w-3.5 h-3.5" />
              <span>{isBn ? 'রেজিস্ট্রিকৃত বায়না চুক্তিপত্র' : 'REGISTERED BAYNA DEED OF AGREEMENT'}</span>
            </span>
            <span className="text-xs font-mono text-slate-500">DEED-CSBD-{plot.plotNo}-2024</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isBn ? 'প্রিন্ট দলিল' : 'Print Legal Deed'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Legal Non-Judicial Stamped Paper Replica */}
        <div className="mt-4 p-8 border-4 border-emerald-800/30 rounded-2xl bg-amber-50/15 relative space-y-6 font-serif">
          
          {/* Top Stamp Header */}
          <div className="text-center border-b-2 border-emerald-900 pb-4 space-y-1">
            <div className="inline-block px-4 py-1 border border-emerald-800 rounded text-emerald-900 text-xs font-bold uppercase tracking-widest">
              গণপ্রজাতন্ত্রী বাংলাদেশ সরকার · নন-জুডিশিয়াল স্ট্যাম্প · মূল্য ১০০০ টাকা
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-emerald-950 tracking-wide mt-2">
              জমি বিক্রয়ের চূড়ান্ত বায়না চুক্তিপত্র দলিল
            </h2>
            <p className="text-xs text-slate-700 font-sans">
              রেজিস্ট্রেশন আইন ১৯০৮ ও সুনির্দিষ্ট প্রতিকার আইন অনুযায়ী সম্পাদিত
            </p>
          </div>

          {/* Parties */}
          <div className="space-y-4 text-xs leading-relaxed text-slate-800 font-sans">
            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
              <div>
                <strong className="text-slate-900 block font-bold">১ম পক্ষ (বিক্রেতা / ডেভেলপার):</strong>
                <span>
                  <strong>সিটি স্কয়ার রিয়েল এস্টেট লিমিটেড</strong>, পক্ষে ব্যবস্থাপনা পরিচালক জনাব এইচ. এম. জিয়াউর রহমান, প্রধান কার্যালয়: প্লট #১২, রোড #০৩, সেকশন #১২, পল্লবী, মিরপুর, ঢাকা-১২১৬।
                </span>
              </div>
              <div className="pt-2 border-t border-slate-100">
                <strong className="text-slate-900 block font-bold">২য় পক্ষ (ক্রেতা / বরাদ্দগ্রহীতা):</strong>
                <span>
                  <strong>{user.fullName} ({user.fullNameBn || ''})</strong>, পিতা: মরহুম আব্দুল লতিফ চৌধুরী, মাতা: মরহুমা জাহেদা খাতুন, জাতীয় পরিচয়পত্র নং: {user.nidNo}, বর্তমান ও স্থায়ী ঠিকানা: {user.address}, {user.city}।
                </span>
              </div>
            </div>

            {/* Property Schedule */}
            <div className="p-4 rounded-xl bg-amber-50/40 border border-amber-200 space-y-2">
              <strong className="text-amber-900 block font-bold uppercase text-[11px] tracking-wider">
                তফসিল বর্ণিত সম্পত্তির বিবরণ (Property Schedule)
              </strong>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
                <div>জেলা: ঢাকা</div>
                <div>থানা: রূপগঞ্জ</div>
                <div>মৌজা: পূর্বাচল</div>
                <div>সি.এস/এস.এ খতিয়ান: ৪৮২</div>
                <div>আর.এস খতিয়ান: ৮৯১</div>
                <div>বি.এস খতিয়ান: ১২০৪</div>
                <div>দাগ নম্বর: ৩৯২০</div>
                <div>সেক্টর: {plot.sector}</div>
              </div>
              <div className="pt-2 border-t border-amber-200/80 text-xs text-slate-900">
                <strong>বরাদ্দকৃত প্লট নং:</strong> {plot.plotNo}, <strong>রোড নং:</strong> {plot.roadNo}, <strong>জমির পরিমাণ:</strong> {plot.katha} কাঠা (উত্তর ও পার্কমুখী)।
              </div>
            </div>

            {/* Financial Terms */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs space-y-2">
              <strong className="text-slate-900 font-bold block">মূল্য ও কিস্তির শর্তাবলী:</strong>
              <div className="flex justify-between items-center text-xs">
                <span>মোট নির্ধারিত বিক্রয়মূল্য:</span>
                <strong className="font-mono text-sm">{formatBDT(plot.totalCost, 'en')}</strong>
              </div>
              <div className="flex justify-between items-center text-xs text-emerald-700">
                <span>ইতোমধ্যে পরিশোধিত অর্থ:</span>
                <strong className="font-mono text-sm">{formatBDT(plot.paidAmount, 'en')}</strong>
              </div>
              <div className="flex justify-between items-center text-xs text-amber-700">
                <span>অবশিষ্ট প্রদেয় অর্থ:</span>
                <strong className="font-mono text-sm">{formatBDT(plot.totalCost - plot.paidAmount, 'en')}</strong>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 italic">
              * চুক্তি অনুযায়ী অবশিষ্ট কিস্তি সম্পূর্ণ পরিশোধ সাপেক্ষে ১ম পক্ষ ২য় পক্ষের বরাবরে সাব-রেজিস্ট্রি অফিসে উপস্থিত হয়ে চূড়ান্ত কবলা দলিল সম্পাদন ও নামজারি সম্পন্ন করে সীমানা দখল বুঝিয়ে দিতে আইনত বাধ্য থাকিবে।
            </p>
          </div>

          {/* Signatures & Seal */}
          <div className="pt-6 border-t-2 border-emerald-900/60 flex items-end justify-between text-xs font-sans">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-white border border-slate-300 rounded-lg flex items-center justify-center p-1">
                <QrCode className="w-14 h-14 text-slate-800" />
              </div>
              <div className="text-[10px] text-slate-500">
                <span className="font-bold text-emerald-900 block">Ministry of Land e-Registry</span>
                ডিজিটাল কিউআর কোড স্ক্যান করে দলিলের অনলাইন সত্যতা যাচাই করুন।
              </div>
            </div>

            <div className="flex items-center gap-8 text-center text-[11px]">
              <div>
                <div className="font-serif italic font-bold text-slate-900 mb-1">
                  Ziabul Hoque
                </div>
                <div className="border-t border-slate-400 pt-1 text-[10px] uppercase font-bold text-slate-600">
                  ২য় পক্ষ (ক্রেতা)
                </div>
              </div>
              <div>
                <div className="font-serif italic font-bold text-slate-900 mb-1">
                  H. M. Ziaur Rahman
                </div>
                <div className="border-t border-slate-400 pt-1 text-[10px] uppercase font-bold text-slate-600">
                  ১ম পক্ষ (ব্যবস্থাপনা পরিচালক)
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
