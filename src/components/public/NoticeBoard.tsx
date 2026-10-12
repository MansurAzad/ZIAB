import React, { useState } from 'react';
import {
  Bell,
  Calendar,
  FileText,
  AlertCircle,
  ChevronRight,
  ExternalLink,
  Download,
  Search,
  CheckCircle2,
  Tag
} from 'lucide-react';
import { Language } from '../../types';

interface NoticeItem {
  id: string;
  title: string;
  titleBn: string;
  category: 'circular' | 'event' | 'handover' | 'important';
  categoryLabel: string;
  categoryLabelBn: string;
  date: string;
  summary: string;
  summaryBn: string;
  pdfUrl?: string;
  urgent?: boolean;
}

interface NoticeBoardProps {
  language: Language;
}

export const NoticeBoard: React.FC<NoticeBoardProps> = ({ language }) => {
  const isBn = language === 'bn';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeNotice, setActiveNotice] = useState<NoticeItem | null>(null);

  const notices: NoticeItem[] = [
    {
      id: 'not-00-double',
      title: 'Company Official Announcement: 12-Month Guaranteed Double Profit Scheme (Paid in 12 Monthly Installments)',
      titleBn: 'কোম্পানির অফিসিয়াল ঘোষণা: ১২ মাসে ডাবল প্রফিট প্রকল্প (প্রতি মাসে মাসিক কিস্তির মাধ্যমে রিটার্ন প্রদান)',
      category: 'important',
      categoryLabel: 'Special Double Return',
      categoryLabelBn: '১২ মাসে ডাবল প্রফিট',
      date: '11 October 2026',
      urgent: true,
      summary:
        'Our company guarantees 2X total payout in 12 months (100% net profit). Both capital and profits are disbursed consecutively across 12 equal monthly installments directly into your bank or portal wallet. Backed by 12 Bank PDC Cheques and registered legal deed.',
      summaryBn:
        'আমাদের এই কোম্পানি দিচ্ছে ১২ মাসে নিশ্চিত ডাবল প্রফিট! আপনি যে পরিমাণ মূলধন বিনিয়োগ করবেন, ১২ মাসে তার দ্বিগুণ রিটার্ন পাবেন (১০০% নিট লাভ)। প্রতি মাসে সমান কিস্তি আকারে লাভ ও আসল সরাসরি আপনার ব্যাংক অ্যাকাউন্ট বা মোবাইল ওয়ালেটে পৌঁছে যাবে। ১২টি ব্যাংক সিকিউরিটি PDC চেক ও রেজিস্টার্ড চুক্তিপত্রের মাধ্যমে শতভাগ নিরাপদ।'
    },
    {
      id: 'not-01',
      title: 'City R Mega Town Sector 4 Plot Demarcation & Possession Schedule',
      titleBn: 'সিটি আর মেগা টাউন সেক্টর ৪ প্লট চিহ্নিতকরণ ও দখল বুঝিয়ে দেওয়ার সময়সূচী',
      category: 'handover',
      categoryLabel: 'Possession & Handover',
      categoryLabelBn: 'দখল ও হস্তান্তর',
      date: '08 October 2026',
      urgent: true,
      summary:
        'All allotted plot owners of Sector 4 (Block B & C) who have cleared at least 24 installments are requested to visit our Mirpur Head Office to verify boundary demarcations and receive physical possession dates.',
      summaryBn:
        'সেক্টর ৪ (ব্লক বি ও সি)-এর সম্মানিত প্লট মালিকগণ যারা ইতোমধ্যে ন্যূনতম ২৪টি কিস্তি পরিশোধ করেছেন, তাদেরকে প্লটের সীমানা পিলার যাচাই এবং দখলপত্র গ্রহণের জন্য মিরপুর প্রধান কার্যালয়ে যোগাযোগের অনুরোধ করা হচ্ছে।'
    },
    {
      id: 'not-02',
      title: 'Kuakata City Royal Bay Resort - 4th Quarter Dividend Distribution Notification',
      titleBn: 'কুয়াকাটা সিটি রয়্যাল বে রিসোর্ট - ৪র্থ কোয়ার্টার লভ্যাংশ বণ্টন সংক্রান্ত বিজ্ঞপ্তি',
      category: 'important',
      categoryLabel: 'Dividend Distribution',
      categoryLabelBn: 'মুনাফা বণ্টন',
      date: '01 October 2026',
      urgent: false,
      summary:
        'Monthly profit sharing and Q3 performance dividends for City Royal Bay Hotel & Suites share owners have been directly transferred to respective bank accounts. Investors can view detailed statement vouchers in the portal.',
      summaryBn:
        'সিটি রয়্যাল বে হোটেল ও স্যুটসের সম্মানিত শেয়ারহোল্ডারদের সেপ্টেম্বর মাসের নির্ধারিত মাসিক মুনাফা এবং ৩য় কোয়ার্টারের বোনাস সংশ্লিষ্ট ব্যাংক হিসাবে অটো-ক্রেডিট করা হয়েছে। অনলাইন পোর্টাল থেকে স্টেটমেন্ট ডাউনলোড করা যাবে।'
    },
    {
      id: 'not-03',
      title: 'Free Weekend Site Visit to Purbachal & Mawa Highway',
      titleBn: 'পূর্বাচল ও মাওয়া প্রকল্পে প্রতি শুক্র ও শনিবার ফ্রি সাইট ভিজিট',
      category: 'event',
      categoryLabel: 'Site Tour',
      categoryLabelBn: 'সাইট পরিদর্শন',
      date: '25 September 2026',
      urgent: false,
      summary:
        'Complimentary luxury AC Microbus tours depart every Friday and Saturday from Pallabi Head Office (9:30 AM) and Motijheel Branch (10:00 AM). Complimentary lunch and refreshments are provided for visiting families.',
      summaryBn:
        'প্রতি শুক্র ও শনিবার সকাল ৯:৩০ মিনিটে পল্লবী হেড অফিস এবং সকাল ১০:০০ টায় মতিঝিল শাখা থেকে পূর্বাচল সিটি আর মেগা টাউন ও মাওয়া প্রকল্পে ফ্রি এসি মাইক্রোবাস ছেড়ে যায়। পরিবারের সকলকে নিয়ে সরাসরি জমি পরিদর্শনের আমন্ত্রণ।'
    },
    {
      id: 'not-04',
      title: 'Official Circular on Land Registration & Sub-Registry Mutation Guidelines',
      titleBn: 'ভূমি রেজিস্ট্রেশন ও সাব-রেজিস্ট্রি নামজারি নীতিমালা সংক্রান্ত সরকারি নির্দেশনা',
      category: 'circular',
      categoryLabel: 'Official Circular',
      categoryLabelBn: 'সরকারি সার্কুলার',
      date: '15 September 2026',
      urgent: false,
      summary:
        'In compliance with latest Land Ministry automated e-Mutation guidelines, all plot registrations for City Square BD properties are being expedited with zero physical harassment. Certified porcha is issued within 15 working days.',
      summaryBn:
        'ভূমি মন্ত্রণালয়ের সর্বশেষ ডিজিটাল ই-নামজারি নীতিমালার আলোকে সিটি স্কয়ারের সকল প্লটের সাব-রেজিস্ট্রি ও নামজারি প্রক্রিয়া দ্রুততম সময়ে সম্পন্ন হচ্ছে। মাত্র ১৫ কার্যদিবসে নামজারি পরচা হস্তান্তর নিশ্চিত করা হচ্ছে।'
    },
    {
      id: 'not-05',
      title: 'Annual General Meeting (AGM) 2026 for Share Investors & Valued Associates',
      titleBn: 'বার্ষিক সাধারণ সভা (এজিএম) ২০২৬ এর তারিখ ও ভেন্যু ঘোষণা',
      category: 'event',
      categoryLabel: 'Corporate Event',
      categoryLabelBn: 'কর্পোরেট ইভেন্ট',
      date: '05 September 2026',
      urgent: false,
      summary:
        'The Annual General Meeting of City Square Real Estate Limited will be held on 18 December 2026 at the Grand Ball Room, Hotel Radisson Blu Dhaka. All registered investors are cordially invited.',
      summaryBn:
        'সিটি স্কয়ার রিয়েল এস্টেট লিমিটেডের বার্ষিক সাধারণ সভা আগামী ১৮ ডিসেম্বর ২০২৬ তারিখে হোটেল রেডিসন ব্লু ঢাকার গ্র্যান্ড বলরুমে অনুষ্ঠিত হবে। সকল রেজিস্ট্রিকৃত সম্মানিত বিনিয়োগকারীকে সাদর আমন্ত্রণ।'
    }
  ];

  const filtered = selectedCategory === 'all'
    ? notices
    : notices.filter(n => n.category === selectedCategory);

  return (
    <section id="news" className="py-20 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <Bell className="w-3.5 h-3.5" />
              <span>{isBn ? 'নোটিশ বোর্ড ও সাম্প্রতিক আপডেট' : 'Official Notice Board'}</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {isBn ? 'কোম্পানি নোটিশ ও গুরুত্বপূর্ণ সার্কুলার' : 'Company Notices & Announcements'}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {isBn
                ? 'প্লট দখল, সাব-রেজিস্ট্রি, লভ্যাংশ বণ্টন এবং সাইট পরিদর্শনের সর্বশেষ অফিসিয়াল তথ্য।'
                : 'Stay updated with official company notices, AGM circulars, dividend distributions, and handover alerts.'}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: isBn ? 'সকল বিজ্ঞপ্তি' : 'All Notices' },
              { id: 'handover', label: isBn ? 'দখল ও হস্তান্তর' : 'Handovers' },
              { id: 'important', label: isBn ? 'লভ্যাংশ ও অর্থ' : 'Dividends' },
              { id: 'event', label: isBn ? 'ইভেন্ট ও ভিজিট' : 'Events' },
              { id: 'circular', label: isBn ? 'আইনি সার্কুলার' : 'Circulars' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  selectedCategory === tab.id
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Notices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(notice => (
            <div
              key={notice.id}
              onClick={() => setActiveNotice(notice)}
              className="cursor-pointer flex flex-col justify-between bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-amber-400 dark:hover:border-amber-500/50 transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {isBn ? notice.categoryLabelBn : notice.categoryLabel}
                  </span>
                  {notice.urgent && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 animate-pulse">
                      {isBn ? 'জরুরি' : 'URGENT'}
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2">
                  {isBn ? notice.titleBn : notice.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {isBn ? notice.summaryBn : notice.summary}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-600" />
                  <span>{notice.date}</span>
                </div>
                <div className="flex items-center gap-1 font-semibold text-amber-700 dark:text-amber-400 group-hover:translate-x-1 transition-transform">
                  <span>{isBn ? 'বিস্তারিত' : 'Read'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Notice Detail */}
        {activeNotice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
            <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 relative animate-in fade-in zoom-in-95">
              
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400">
                    {isBn ? activeNotice.categoryLabelBn : activeNotice.categoryLabel}
                  </span>
                  <div className="text-xs text-slate-500 mt-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    <span>{activeNotice.date}</span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveNotice(null)}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {isBn ? activeNotice.titleBn : activeNotice.title}
                </h3>
                <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
                  {isBn ? activeNotice.summaryBn : activeNotice.summary}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 text-amber-600" />
                <span>
                  {isBn
                    ? 'যেকোনো জিজ্ঞাসায় আমাদের হেড অফিস হটলাইন +880 1810-685888 এ সরাসরি যোগাযোগ করতে পারেন।'
                    : 'For official clarifications, please call our Head Office Help Desk at +880 1810-685888.'}
                </span>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setActiveNotice(null)}
                  className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold hover:opacity-90"
                >
                  {isBn ? 'বন্ধ করুন' : 'Close'}
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
