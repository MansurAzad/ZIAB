import React from 'react';
import {
  Building2,
  Award,
  ShieldCheck,
  CheckCircle2,
  Users,
  Target,
  Compass,
  FileCheck2,
  Quote,
  Sparkles,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { Language } from '../../types';

interface AboutUsProps {
  language: Language;
  onBookSiteVisit?: () => void;
  onOpenProjects?: () => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({
  language,
  onBookSiteVisit,
  onOpenProjects
}) => {
  const isBn = language === 'bn';

  const leaders = [
    {
      name: 'Mr. Ripon Hossain',
      nameBn: 'জনাব রিপন হোসেন',
      role: 'Chairman',
      roleBn: 'চেয়ারম্যান',
      company: 'Zone Square Real Estate Limited',
      companyBn: 'জোন স্কয়ার রিয়েল এস্টেট লিমিটেড',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
      message:
        'Our core philosophy has always been transparency, legal integrity, and sustainable wealth creation. At Zone Square, we do not merely sell plots or shares; we build generations of trust and lasting family heritage across Bangladesh.',
      messageBn:
        'আমাদের মূল দর্শন হলো সততা, শতভাগ আইনগত নিরাপত্তা এবং দীর্ঘমেয়াদী সম্পদ সৃষ্টি। জোন স্কয়ারে আমরা প্রতিটি বিনিয়োগকারী পরিবারের ভবিষ্যৎ নিরাপত্তা ও প্রজন্ম থেকে প্রজন্মের আস্থা গড়ে তুলি।'
    },
    {
      name: 'Mr. H. M. Ziaur Rahman',
      nameBn: 'জনাব এইচ. এম. জিয়াউর রহমান',
      role: 'Managing Director',
      roleBn: 'ব্যবস্থাপনা পরিচালক',
      company: 'Zone Square Real Estate Limited',
      companyBn: 'জোন স্কয়ার রিয়েল এস্টেট লিমিটেড',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80',
      message:
        'We are determined to pioneer world-class planned urbanization in Purbachal and scenic tourist resort developments in Kuakata and Cox\'s Bazar. Our commitment is timely project execution, zero legal flaws, and guaranteed returns for our valued investors.',
      messageBn:
        'আন্তর্জাতিক মানের পর্যটন রিসোর্ট প্রকল্প ও ১২ মাসের ডাবল প্রফিট প্রকল্প সফলভাবে পরিচালনা করতে আমরা প্রতিশ্রুতিবদ্ধ। নির্দিষ্ট সময়ে কিস্তি বণ্টন, নির্ভেজাল আইনি কাগজপত্র এবং বিনিয়োগকারীদের লাভবান করাই আমাদের অঙ্গীকার।'
    },
    {
      name: 'Mr. Uttam Saha',
      nameBn: 'জনাব উত্তম সাহা',
      role: 'Marketing Director',
      roleBn: 'মার্কেটিং ডিরেক্টর',
      company: 'Zone Square Real Estate Limited',
      companyBn: 'জোন স্কয়ার রিয়েল এস্টেট লিমিটেড',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80',
      message:
        'Customer satisfaction and transparent communication define our investor relationships. Whether for small fractional hotel shares or large residential estates, we offer bespoke guidance and unwavering post-purchase service.',
      messageBn:
        'বিনিয়োগকারী ও গ্রাহকদের সর্বোচ্চ সন্তুষ্টি এবং স্বচ্ছ তথ্য সরবরাহ করাই আমাদের নীতি। আবাসিক প্লট বুকিং থেকে শুরু করে হোটেল শেয়ারের মাসিক লভ্যাংশ নিশ্চিতকরণ—প্রতিটি ক্ষেত্রে আমরা গ্রাহকের পাশে থাকি।'
    }
  ];

  const milestones = [
    {
      year: '2016',
      title: isBn ? 'কোম্পানি প্রতিষ্ঠা' : 'Company Inception',
      desc: isBn
        ? 'মিরপুর পল্লবীতে প্রধান কার্যালয় প্রতিষ্ঠার মাধ্যমে যাত্রা শুরু।'
        : 'Founded in Dhaka with core focus on vetted land acquisition in greater Purbachal.'
    },
    {
      year: '2019',
      title: isBn ? 'সিটি আর মেগা টাউন উদ্বোধন' : 'City R Mega Town Launch',
      desc: isBn
        ? 'পূর্বাচলে ৩৫০+ একর সুপরিকল্পিত আবাসন প্রকল্পের ভিত্তিপ্রস্তর স্থাপন।'
        : 'Master-planned 350+ acre satellite residential township with 60ft/40ft avenues.'
    },
    {
      year: '2022',
      title: isBn ? 'চট্টগ্রাম জোনাল অফিস ও রিসোর্ট শেয়ার' : 'Ctg Expansion & Hospitality',
      desc: isBn
        ? 'মুরাদপুর সালমা সেন্টারে চট্টগ্রাম শাখা উদ্বোধন এবং কুয়াকাটা ও কক্সবাজার হোটেল শেয়ার প্রবর্তন।'
        : 'Inaugurated Chittagong regional office at Muradpur and launched 5-star resort fractional suites.'
    },
    {
      year: '2026',
      title: isBn ? 'ডিজিটাল ইনভেস্টর পোর্টাল ও দ্রুত হস্তান্তর' : 'Digital Investor Portal & Handover',
      desc: isBn
        ? 'বিনিয়োগকারীদের জন্য রিয়েল-টাইম কিস্তি ট্র্যাকিং, মাসিক লভ্যাংশ অটো-ট্রান্সফার ও দ্রুত সাব-রেজিস্ট্রি।'
        : 'Next-generation encrypted portal with instant payment, monthly dividend tracking, and possession handovers.'
    }
  ];

  const coreValues = [
    {
      icon: ShieldCheck,
      title: isBn ? '১০০% আইনি নিরাপত্তা' : '100% Legal Certainty',
      desc: isBn
        ? 'সিএস, এসএ, আরএস, বিএস খারিজকৃত নির্ভেজাল জমি এবং নিরবচ্ছিন্ন মালিকানা স্বত্ব।'
        : 'Flawless chain of title with CS, SA, RS, BS records vetted by Supreme Court advocates.'
    },
    {
      icon: Target,
      title: isBn ? 'পরিকল্পিত আধুনিকায়ন' : 'Planned Modernization',
      desc: isBn
        ? 'প্রশস্ত এভিনিউ, ভূগর্ভস্থ ড্রেনেজ, সুউচ্চ বাউন্ডারি এবং সর্বাধুনিক নাগরিক সুবিধা।'
        : 'Wide arterial avenues, underground utility conduits, continuous RCC boundary protection.'
    },
    {
      icon: Sparkles,
      title: isBn ? '১২ মাসে ডাবল প্রফিট প্রকল্প' : '12-Month Double Profit Scheme',
      desc: isBn
        ? '১২ মাসে নিশ্চিত দ্বিগুণ রিটার্ন (১০০% নিট মুনাফা), যা প্রতি মাসে সমান কিস্তি আকারে সরাসরি আপনার ব্যাংক বা ওয়ালেটে পরিশোধ করা হয়।'
        : 'Guaranteed 2X return in 12 months (100% net profit), disbursed consecutively in 12 equal monthly installments directly into your bank or wallet.'
    },
    {
      icon: Users,
      title: isBn ? 'গ্রাহকবান্ধব সেবা' : 'Customer-Centric Care',
      desc: isBn
        ? 'ফ্রি এসি বাসে সাইট ভিজিট, সহজ কিস্তি এবং সার্বক্ষণিক বিনিয়োগকারী সহায়তা।'
        : 'Complimentary weekend site visits, flexible installment tenures, and transparent support.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>{isBn ? 'আমাদের পরিচিতি ও অঙ্গীকার' : 'Corporate Profile & Vision'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {isBn ? 'জোন স্কয়ার রিয়েল এস্টেট লিমিটেড' : 'ZONE SQUARE Real Estate Limited'}
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {isBn
              ? 'একটি আস্থার প্রতীক—যেখানে নিরাপদ ভূমি আবাসন এবং আধুনিক পর্যটন রিসোর্ট বিনিয়োগের মাধ্যমে গড়ে ওঠে প্রতিটি পরিবারের স্বপ্ন ও নিরাপদ ভবিষ্যত।'
              : 'A trusted leader in Bangladesh real estate development, delivering planned residential communities and premier hospitality investment opportunities with complete legal transparency.'}
          </p>
        </div>

        {/* Corporate Identity & Key Numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-6 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/30 text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-700 dark:text-amber-400 font-mono">10+</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mt-1">
              {isBn ? 'বছরের সাফল্য ও আস্থা' : 'Years of Trust & Excellence'}
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/30 text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-700 dark:text-emerald-400 font-mono">350+</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mt-1">
              {isBn ? 'একর মাস্টারপ্ল্যান পূর্বাচলে' : 'Acres Master Planned'}
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/30 text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-blue-700 dark:text-blue-400 font-mono">3,200+</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mt-1">
              {isBn ? 'সন্তুষ্ট বিনিয়োগকারী পরিবার' : 'Valued Investor Families'}
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-purple-50/60 dark:bg-purple-950/20 border border-purple-200/60 dark:border-purple-900/30 text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-purple-700 dark:text-purple-400 font-mono">100%</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mt-1">
              {isBn ? 'নিষ্কণ্টক আইনি দলিল' : 'Vetted Title Certainty'}
            </div>
          </div>
        </div>

        {/* Board of Directors & Leadership */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              {isBn ? 'পরিচালনা পর্ষদের বার্তা' : 'Message from Board of Directors'}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {isBn
                ? 'দক্ষ নেতৃত্ব ও অভিজ্ঞ টিমওয়ার্কের মাধ্যমে প্রতিটি প্রকল্পে শতভাগ স্বচ্ছতা নিশ্চিত করা হচ্ছে।'
                : 'Driven by ethical vision, seasoned civil expertise, and unwavering devotion to investor prosperity.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leaders.map((leader, idx) => (
              <div
                key={idx}
                className="flex flex-col bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-500/80 shadow-xs group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base">
                      {isBn ? leader.nameBn : leader.name}
                    </h4>
                    <p className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                      {isBn ? leader.roleBn : leader.role}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {isBn ? leader.companyBn : leader.company}
                    </p>
                  </div>
                </div>

                <div className="relative flex-1 bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300 italic leading-relaxed">
                  <Quote className="w-5 h-5 text-amber-500/30 absolute top-2 right-2 pointer-events-none" />
                  "{isBn ? leader.messageBn : leader.message}"
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Core Values */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              {isBn ? 'আমাদের মূল মূল্যবোধ ও প্রতিশ্রুতি' : 'Our Pillars of Integrity'}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {isBn
                ? 'যে অঙ্গীকারগুলো সিটি স্কয়ারকে অনন্য উচ্চতায় প্রতিষ্ঠিত করেছে।'
                : 'The foundational standards that set City Square BD apart in the real estate sector.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <val.icon className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  {val.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Journey Milestones */}
        <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-8">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                {isBn ? 'সাফল্যের অগ্রযাত্রা' : 'Milestones Journey'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                {isBn ? 'সিটি স্কয়ারের ইতিহাস ও ধারাবাহিক অগ্রগতি' : 'A Legacy of Continuous Growth'}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {milestones.map((m, idx) => (
                <div key={idx} className="border-l-2 border-amber-500/60 pl-4 space-y-1.5">
                  <span className="font-mono text-xl font-bold text-amber-400">{m.year}</span>
                  <h4 className="font-bold text-white text-sm">{m.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA inside */}
            <div className="pt-4 flex flex-wrap items-center gap-4 border-t border-slate-800">
              <button
                onClick={onBookSiteVisit}
                className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs shadow-md transition-colors"
              >
                {isBn ? 'ফ্রি সাইট ভিজিট বুক করুন' : 'Book Free Site Visit'}
              </button>
              <button
                onClick={onOpenProjects}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors"
              >
                {isBn ? 'প্রকল্পসমূহ দেখুন' : 'Explore All Projects'}
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
