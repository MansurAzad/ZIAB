import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Building2,
  CheckCircle2,
  CreditCard,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { Language } from '../../types';

interface ContactUsProps {
  language: Language;
}

export const ContactUs: React.FC<ContactUsProps> = ({ language }) => {
  const isBn = language === 'bn';

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const offices = [
    {
      title: isBn ? 'ঢাকা প্রধান কার্যালয় (হেড অফিস)' : 'Dhaka Corporate Head Office',
      address: isBn
        ? 'প্লট #১২, রোড #০৩, ব্লক #ডি, সেকশন #১২, পল্লবী, মিরপুর, ঢাকা-১২১৬'
        : 'Plot #12, Road #03, Block #D, Section #12, Pallabi, Mirpur, Dhaka-1216',
      phone: '+880 1810-685888, +880 1970-884400',
      email: 'info@citysquarebd.com, citysquarebd@gmail.com',
      hours: isBn ? 'শনিবার - বৃহস্পতিবার (সকাল ৯:০০ - সন্ধ্যা ৭:০০)' : 'Saturday - Thursday (9:00 AM - 7:00 PM)',
      isHead: true
    },
    {
      title: isBn ? 'চট্টগ্রাম জোনাল অফিস' : 'Chattogram Regional Office',
      address: isBn
        ? 'সালমা সেন্টার, ১ম তলা, ৭০ মুরাদপুর, পাঁচলাইশ, চট্টগ্রাম'
        : 'Salma Centre, 1st Floor, 70 Muradpur, Panchlaish, Chattogram',
      phone: '+880 1810-685889, +880 1312-770022',
      email: 'chattogram@citysquarebd.com',
      hours: isBn ? 'শনিবার - বৃহস্পতিবার (সকাল ৯:৩০ - সন্ধ্যা ৬:৩০)' : 'Saturday - Thursday (9:30 AM - 6:30 PM)',
      isHead: false
    },
    {
      title: isBn ? 'মতিঝিল করপোরেট লাউঞ্জ' : 'Motijheel Corporate Lounge',
      address: isBn
        ? 'সেনাকল্যাণ ভবন, ৭ম তলা, মতিঝিল বাণিজ্যিক এলাকা, ঢাকা-১০০০'
        : 'Sena Kalyan Bhaban, Level 7, Motijheel C/A, Dhaka-1000',
      phone: '+880 1810-685880',
      email: 'motijheel@citysquarebd.com',
      hours: isBn ? 'রবিবার - বৃহস্পতিবার (সকাল ১০:০০ - বিকাল ৫:০০)' : 'Sunday - Thursday (10:00 AM - 5:00 PM)',
      isHead: false
    }
  ];

  const bankAccounts = [
    {
      bank: 'The City Bank Limited',
      branch: 'Pallabi Mirpur Branch',
      accName: 'City Square Real Estate Limited',
      accNo: '110-3849102-001',
      routing: '225275841'
    },
    {
      bank: 'Dutch-Bangla Bank PLC',
      branch: 'Mirpur-10 Branch',
      accName: 'City Square Real Estate Limited',
      accNo: '107-12000-8842',
      routing: '090272849'
    },
    {
      bank: 'Islami Bank Bangladesh PLC',
      branch: 'Panchlaish Branch, Chattogram',
      accName: 'City Square Real Estate Limited',
      accNo: '2050-2910-100-77',
      routing: '125150993'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>{isBn ? 'যোগাযোগ ও অফিস ঠিকানা' : 'Contact & Office Directory'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {isBn ? 'আমাদের সাথে যোগাযোগ করুন' : 'Get In Touch With City Square BD'}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {isBn
              ? 'ঢাকা প্রধান কার্যালয়, চট্টগ্রাম জোনাল অফিস কিংবা মতিঝিল লাউঞ্জে আপনাকে সাদর আমন্ত্রণ। যে কোনো তথ্যে আমাদের ফোন করুন অথবা সরাসরি ফর্ম পূরণ করুন।'
              : 'Visit our Corporate Head Office in Mirpur Pallabi or our Regional Office at Muradpur Chittagong for personal investment consultations.'}
          </p>
        </div>

        {/* Office Directory Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offices.map((office, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border transition-all ${
                office.isHead
                  ? 'bg-amber-50/40 dark:bg-amber-950/20 border-amber-300 dark:border-amber-900/50 shadow-md ring-1 ring-amber-400/30'
                  : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 text-amber-700 dark:text-amber-400 border border-slate-200 dark:border-slate-700 shadow-2xs">
                  {office.isHead ? (isBn ? 'প্রধান কার্যালয়' : 'Head Office') : (isBn ? 'শাখা কার্যালয়' : 'Regional Branch')}
                </span>
                <Building2 className="w-5 h-5 text-amber-600" />
              </div>

              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-3">
                {office.title}
              </h3>

              <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{office.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="font-mono">{office.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{office.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{office.hours}</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-700/60">
                <a
                  href={`https://wa.me/8801810685888?text=Hello%20City%20Square%20BD,%20I%20am%20interested%20in%20your%20projects.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{isBn ? 'হোয়াটসঅ্যাপে চ্যাট করুন' : 'Chat on WhatsApp'}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Form and Official Bank Accounts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Inquiry Form */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-800/60 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {isBn ? 'অনলাইন বার্তা ও সাধারণ জিজ্ঞাসা' : 'Send an Inquiry or Message'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {isBn
                  ? 'আপনার প্রশ্ন বা বুকিং সংক্রান্ত তথ্য জানান, আমাদের কাস্টমার সার্ভিস টিম ৩০ মিনিটের মধ্যে উত্তর দেবে।'
                  : 'Submit your message below. Our executive relationship manager will respond promptly.'}
              </p>
            </div>

            {submitted ? (
              <div className="p-8 text-center bg-white dark:bg-slate-800 rounded-2xl border border-emerald-300 dark:border-emerald-800 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  {isBn ? 'আপনার বার্তা সফলভাবে পাঠানো হয়েছে!' : 'Message Successfully Delivered!'}
                </h4>
                <p className="text-xs text-slate-500">
                  {isBn
                    ? 'আমাদের কনসালটেন্ট আপনার উল্লেখিত ফোনে দ্রুত যোগাযোগ করবেন।'
                    : 'Our team will contact you shortly on your provided phone number.'}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold"
                >
                  {isBn ? 'নতুন বার্তা পাঠান' : 'Send Another Message'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {isBn ? 'আপনার নাম *' : 'Your Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="e.g. Ziabul Hoque"
                      className="w-full px-3 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {isBn ? 'মোবাইল নম্বর *' : 'Phone Number *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={contactForm.phone}
                      onChange={e => setContactForm({ ...contactForm, phone: e.target.value })}
                      placeholder="+880 1810-000000"
                      className="w-full px-3 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {isBn ? 'ইমেইল অ্যাড্রেস' : 'Email Address'}
                    </label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="user@example.com"
                      className="w-full px-3 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {isBn ? 'বিষয়' : 'Subject'}
                    </label>
                    <select
                      value={contactForm.subject}
                      onChange={e => setContactForm({ ...contactForm, subject: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="general">{isBn ? 'সাধারণ তথ্য অনুসন্ধান' : 'General Inquiry'}</option>
                      <option value="plot">{isBn ? 'পূর্বাচল প্লট বুকিং' : 'Plot Booking'}</option>
                      <option value="hotel">{isBn ? 'হোটেল শেয়ার ও লভ্যাংশ' : 'Hotel Share Investment'}</option>
                      <option value="mutation">{isBn ? 'রেজিস্ট্রি ও নামজারি' : 'Sub-Registry & Mutation'}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {isBn ? 'আপনার বার্তা *' : 'Your Message *'}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={contactForm.message}
                    onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder={isBn ? 'আপনার বিস্তারিত প্রশ্ন লিখুন...' : 'Write your detailed inquiry here...'}
                    className="w-full px-3 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isBn ? 'বার্তা প্রেরণ করুন' : 'Send Inquiry Message'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Official Bank Accounts for Direct Deposit */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-amber-400">
                <CreditCard className="w-5 h-5" />
                <h3 className="text-base font-bold text-white">
                  {isBn ? 'অফিসিয়াল ব্যাংক হিসাব নম্বর' : 'Official Bank Wire Accounts'}
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isBn
                  ? 'সিটি স্কয়ার রিয়েল এস্টেট লিমিটেডের অফিশিয়াল ব্যাংক একাউন্টে চেক বা অনলাইন ফান্ড ট্রান্সফারের মাধ্যমে সরাসরি বুকিং মানি বা কিস্তি জমা দেওয়া যাবে।'
                  : 'For direct cheque or BEFTN / NPSB / RTGS bank transfers, please use the registered company accounts below:'}
              </p>

              <div className="space-y-3 pt-2">
                {bankAccounts.map((acc, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1 font-mono text-xs"
                  >
                    <div className="font-bold text-amber-300">{acc.bank}</div>
                    <div className="text-slate-300 text-[11px] font-sans">
                      A/C: <strong className="text-white font-mono">{acc.accName}</strong>
                    </div>
                    <div className="text-white text-sm font-bold tracking-wider">
                      {acc.accNo}
                    </div>
                    <div className="text-slate-400 text-[10px] font-sans">
                      Branch: {acc.branch} · Routing: {acc.routing}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-[11px] text-amber-300/90 italic">
                {isBn
                  ? '⚠️ টাকা জমার পর ডিপোজিট স্লিপ ড্যাশবোর্ড থেকে আপলোড করে ইনস্ট্যান্ট মানি রিসিপ্ট সংগ্রহ করুন।'
                  : '⚠️ After deposit, upload your slip via Investor Portal to receive official Money Receipt (MR).'}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
