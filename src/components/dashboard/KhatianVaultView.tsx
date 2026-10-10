import React, { useState } from 'react';
import {
  FileCheck2,
  Download,
  Eye,
  ShieldCheck,
  CheckCircle2,
  X,
  Printer,
  Scale,
  Award,
  ExternalLink
} from 'lucide-react';
import { Language, User, PlotBooking } from '../../types';

interface KhatianVaultViewProps {
  user: User;
  plot: PlotBooking;
  language: Language;
}

interface LandRecord {
  id: string;
  name: string;
  nameBn: string;
  category: 'mutation' | 'khatian' | 'tax' | 'technical';
  docNumber: string;
  issuingAuthority: string;
  dateIssued: string;
  status: 'authenticated' | 'verified';
  summary: string;
  summaryBn: string;
}

export const KhatianVaultView: React.FC<KhatianVaultViewProps> = ({ user, plot, language }) => {
  const [selectedRecord, setSelectedRecord] = useState<LandRecord | null>(null);

  const records: LandRecord[] = [
    {
      id: 'rec-mut-1',
      name: 'e-Mutation & DCR Certificate (নামজারি ও ডিসিআর)',
      nameBn: 'ই-নামজারি খতিয়ান ও ডিসিআর রশিদ (অনলাইন কপি)',
      category: 'mutation',
      docNumber: 'MUT-PUR-2024-1284/DCR',
      issuingAuthority: 'Office of Assistant Commissioner (Land), Rupganj / Purbachal',
      dateIssued: '18 March 2024',
      status: 'authenticated',
      summary: 'Official government mutation granting clean title to City Square BD Limited with sub-allotment earmarked for Member ID: CSBD-CTG-8842.',
      summaryBn: 'সহকারী কমিশনার (ভূমি) কর্তৃক সিটি স্কয়ার বিডির নামে ১ নম্বর খাস খতিয়ান থেকে নামজারি সম্পন্ন ও জিয়াবুলctg1-এর অনুকূলে প্লট #১৪২ সংরক্ষিত।'
    },
    {
      id: 'rec-dakhila',
      name: 'Land Development Tax Dakhila (ভূমি উন্নয়ন কর রসিদ)',
      nameBn: 'ভূমি উন্নয়ন কর রসিদ (খাজনা দাখিলা ১৪৩২ বঙ্গাব্দ)',
      category: 'tax',
      docNumber: 'LDT-DAK-2025/99814',
      issuingAuthority: 'Ministry of Land, Government of Bangladesh (Digital Portal)',
      dateIssued: '02 January 2026',
      status: 'authenticated',
      summary: '100% up-to-date Land Development Tax paid up to 1432 Bangabda. Zero government dues or encumbrances.',
      summaryBn: '১৪৩২ বঙ্গাব্দ পর্যন্ত ভূমি উন্নয়ন কর শতভাগ পরিশোধিত। কোনো প্রকার সরকারি বকেয়া নেই।'
    },
    {
      id: 'rec-cs',
      name: 'CS Khatian (সিএস পরচা - ক্যাডাস্ট্রাল সার্ভে)',
      nameBn: 'সিএস পরচা (ক্যাডাস্ট্রাল সার্ভে রেকর্ড)',
      category: 'khatian',
      docNumber: 'CS Khatian No. 412, Mouza: Purbachal',
      issuingAuthority: 'Directorate of Land Records and Survey (DLRS)',
      dateIssued: 'Archival Verified',
      status: 'verified',
      summary: 'Original Cadastral Survey record confirming agricultural freehold classification without vested or zamindari disputes.',
      summaryBn: 'মূল সিএস রেকর্ড অনুসারে নিষ্কর ও নিষ্কণ্টক ব্যক্তিগত মালিকানার অবিচ্ছিন্ন ধারাবাহিকতা প্রমাণিত।'
    },
    {
      id: 'rec-sa',
      name: 'SA Khatian (এসএ পরচা - স্টেট একুইজিশন)',
      nameBn: 'এসএ পরচা (স্টেট একুইজিশন রেকর্ড)',
      category: 'khatian',
      docNumber: 'SA Khatian No. 820, Jote: 104',
      issuingAuthority: 'Sub-Registry Record Room & AC Land Archives',
      dateIssued: 'Archival Verified',
      status: 'verified',
      summary: 'State Acquisition 1950 verified record showing unbroken lineage from original recorded landholder.',
      summaryBn: 'স্টেট একুইজিশন আইনের আওতায় প্রস্তুতকৃত রেকর্ড এবং ধারাবাহিক ওয়ারিশান নামজারি সমর্থিত।'
    },
    {
      id: 'rec-rs',
      name: 'RS Khatian (আরএস পরচা - রিভিশনাল সার্ভে)',
      nameBn: 'আরএস পরচা (রিভিশনাল সার্ভে রেকর্ড)',
      category: 'khatian',
      docNumber: 'RS Khatian No. 1142, Dag: 582/142',
      issuingAuthority: 'Department of Land Records and Survey, Dhaka',
      dateIssued: 'Certified 1988',
      status: 'verified',
      summary: 'Revisional Survey matching current physical layout boundaries with zero overlap with highway or forest reserves.',
      summaryBn: 'আরএস দাগ নং ৫৮২/১৪২-এর সাথে বর্তমান ভৌত সীমানা শতভাগ সামঞ্জস্যপূর্ণ।'
    },
    {
      id: 'rec-bs',
      name: 'BS / City Survey Khatian (বিএস পরচা)',
      nameBn: 'বিএস / সিটি জরিপ পরচা',
      category: 'khatian',
      docNumber: 'BS Khatian No. 904, Final Gazette',
      issuingAuthority: 'Gazette of the People\'s Republic of Bangladesh',
      dateIssued: 'Gazetted 2018',
      status: 'authenticated',
      summary: 'Final gazetted City Survey Khatian reflecting modern planned sectors and RAJUK master alignment.',
      summaryBn: 'সর্বশেষ সরকারি গেজেটভুক্ত বিএস খতিয়ান। আধুনিক পূর্বাচল মাস্টার প্ল্যানের আওতাভুক্ত।'
    },
    {
      id: 'rec-rajuk',
      name: 'RAJUK Layout Alignment NOC (রাজউক অনুমোদন ছাড়পত্র)',
      nameBn: 'রাজউক লেআউট সমন্বয় ও সাব-রেজিস্ট্রি এনওসি',
      category: 'technical',
      docNumber: 'RAJUK/DAP/SEC4/2023/4402',
      issuingAuthority: 'Rajdhani Unnayan Kartripakkha (RAJUK)',
      dateIssued: '05 October 2023',
      status: 'authenticated',
      summary: 'Official clearance confirming Road 12 is an approved 60ft arterial boulevard and Plot #142 adheres to all DAP setbacks.',
      summaryBn: 'রাজউক ডিটেইল্ড এরিয়া প্ল্যান (ড্যাপ) অনুযায়ী ৬০ ফুট এভিনিউ ও আবাসিক ইমারত নির্মাণ অনুমোদন।'
    },
    {
      id: 'rec-buet',
      name: 'BUET Soil Compaction & Bearing Capacity Test',
      nameBn: 'বুয়েট মৃত্তিকা পরীক্ষা ও বহনক্ষমতা সনদ',
      category: 'technical',
      docNumber: 'BUET/CED/SM-2024/0918',
      issuingAuthority: 'Bureau of Research, Testing and Consultation (BRTC), BUET',
      dateIssued: '14 August 2024',
      status: 'authenticated',
      summary: 'Standard Penetration Test (SPT) and bearing capacity certified safe for up to G+8 storey residential structural design.',
      summaryBn: 'বুয়েট সিভিল ইঞ্জিনিয়ারিং বিভাগ কর্তৃক মাটি পরীক্ষা সম্পন্ন। জি+৮ তলা পর্যন্ত ভবন নির্মাণের জন্য নিরাপদ।'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            {language === 'bn' ? 'খতিয়ান, নামজারি ও আইনি দলিল রেকর্ড রুম' : 'Digital Land Deed & Khatian Record Room'}
          </h2>
          <p className="text-xs text-slate-500">
            {language === 'bn'
              ? 'প্লট #১৪২-এর সকল সরকারি খতিয়ান (সিএস, এসএ, আরএস, বিএস), খাজনা দাখিলা, বুয়েট সয়েল টেস্ট ও রাজউক অনুমোদন যাচাই করুন।'
              : 'Official authenticated land records, 100-year continuous mutation chain, and civil engineering certifications.'}
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>100% Dispute-Free Land Title</span>
        </div>
      </div>

      {/* Grid of Records */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {records.map(rec => (
          <div
            key={rec.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-amber-400/50 transition-all space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  {rec.category} record
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  AUTHENTICATED
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                {language === 'bn' ? rec.nameBn : rec.name}
              </h4>

              <div className="text-[11px] text-slate-500 font-mono mt-1">
                Ref: {rec.docNumber}
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                {language === 'bn' ? rec.summaryBn : rec.summary}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-mono">
                {rec.issuingAuthority}
              </span>
              <button
                onClick={() => setSelectedRecord(rec)}
                className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 dark:text-amber-300 text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'দলিল দেখুন' : 'Inspect'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Record Inspector Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-auto">
            
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-200">
                  Government Certified Document Inspector
                </span>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Content Paper Canvas */}
            <div className="p-6 sm:p-8 space-y-4 bg-amber-50/20 dark:bg-slate-950 font-serif text-slate-900 dark:text-slate-100">
              <div className="p-6 border-2 border-dashed border-amber-700/40 dark:border-amber-500/30 rounded-xl space-y-4 bg-white/90 dark:bg-slate-900/90 shadow-inner">
                
                <div className="text-center pb-4 border-b border-slate-200 dark:border-slate-800 font-sans">
                  <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block">
                    Government of the People's Republic of Bangladesh
                  </span>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white uppercase mt-0.5">
                    {language === 'bn' ? selectedRecord.nameBn : selectedRecord.name}
                  </h3>
                  <span className="text-xs font-mono text-amber-700 dark:text-amber-400 font-semibold block mt-0.5">
                    {selectedRecord.docNumber}
                  </span>
                </div>

                <div className="font-sans text-xs space-y-3 leading-relaxed text-slate-700 dark:text-slate-300">
                  <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-[11px]">
                    <div>
                      <span className="text-slate-400 block">Beneficiary / Holder:</span>
                      <strong className="text-slate-900 dark:text-white">{user.fullName} ({user.memberId})</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Allocated Asset:</span>
                      <strong className="text-slate-900 dark:text-white">{plot.projectName} #{plot.plotNo}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Issuing Authority:</span>
                      <span className="text-slate-900 dark:text-white">{selectedRecord.issuingAuthority}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Validation Date:</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">{selectedRecord.dateIssued}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 pt-2">
                    {language === 'bn' ? selectedRecord.summaryBn : selectedRecord.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] font-sans text-slate-500">
                  <div className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Official Seal Verified</span>
                  </div>
                  <span className="font-mono">QR: CSBD-VLT-{selectedRecord.id.toUpperCase()}</span>
                </div>

              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex items-center justify-end gap-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Copy</span>
              </button>
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold transition-colors"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
