import React, { useState } from 'react';
import {
  Compass,
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  ShieldCheck,
  Send,
  Phone,
  Sparkles,
  Car
} from 'lucide-react';
import { Language } from '../../types';

interface SiteVisitBookingProps {
  language: Language;
  onSuccess?: () => void;
}

export const SiteVisitBooking: React.FC<SiteVisitBookingProps> = ({
  language,
  onSuccess
}) => {
  const isBn = language === 'bn';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    project: 'city-r-mega-town',
    pickupPoint: 'mirpur-pallabi',
    visitDate: '2026-10-16',
    guests: '2',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      onSuccess?.();
    }, 700);
  };

  return (
    <section id="site-visit" className="py-20 bg-slate-50 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-br from-amber-600 via-amber-700 to-slate-900 rounded-3xl p-6 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          
          {/* Background Decorative Rings */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white/5 blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-amber-400/10 blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            
            {/* Left Column: Information & Value Prop */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-200 text-xs font-semibold uppercase tracking-wider border border-white/10">
                <Car className="w-3.5 h-3.5" />
                <span>{isBn ? 'ফ্রি সাইট ভিজিট সার্ভিস' : 'Complimentary Guided Tour'}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {isBn
                  ? 'নিজে চোখে দেখুন আপনার ভবিষ্যতের ঠিকানা'
                  : 'Experience Your Future Property With Your Family'}
              </h2>

              <p className="text-sm sm:text-base text-amber-100/90 leading-relaxed">
                {isBn
                  ? 'প্রতি শুক্র ও শনিবার সিটি স্কয়ারের বিলাসবহুল এসি মাইক্রোবাসে সপরিবারে পূর্বাচল সিটি আর মেগা টাউন অথবা মাওয়া পদ্মা এক্সপ্রেসওয়ে প্রকল্প সরেজমিনে পরিদর্শন করুন। সম্পূর্ণ ফ্রি এবং দুপুরের আপ্যায়ন নিশ্চিত।'
                  : 'Join our weekly weekend guided inspections to Purbachal City R Mega Town or Mawa Project. Travel comfortably in executive AC transport with complimentary refreshments and on-site civil engineer consultations.'}
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 bg-black/20 backdrop-blur-sm p-3.5 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white">
                      {isBn ? 'এসি ট্রান্সপোর্ট সুবিধা' : 'Executive AC Transport'}
                    </h4>
                    <p className="text-[11px] text-amber-200/80">
                      {isBn ? 'মিরপুর পল্লবী ও মতিঝিল থেকে পিকআপ' : 'Pickup from Mirpur & Motijheel'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-black/20 backdrop-blur-sm p-3.5 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white">
                      {isBn ? 'আইনি দলিল প্রদর্শন' : 'Live Document Verification'}
                    </h4>
                    <p className="text-[11px] text-amber-200/80">
                      {isBn ? 'সিএস, আরএস ও বিএস খতিয়ান সরাসরি যাচাই' : 'On-site CS/RS/BS verification'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-black/20 backdrop-blur-sm p-3.5 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white">
                      {isBn ? 'অন-স্পট প্লট সিলেকশন' : 'Spot Plot Demarcation'}
                    </h4>
                    <p className="text-[11px] text-amber-200/80">
                      {isBn ? 'পছন্দের সেক্টর ও রোড নম্বর নির্বাচন' : 'Choose exact corner or park-facing plots'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-black/20 backdrop-blur-sm p-3.5 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white">
                      {isBn ? 'কোনো গোপন খরচ নেই' : '100% Free of Cost'}
                    </h4>
                    <p className="text-[11px] text-amber-200/80">
                      {isBn ? 'সম্পূর্ণ বিনামূল্যে সেবা ও আপ্যায়ন' : 'No obligation to purchase'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct Hotline */}
              <div className="pt-2 flex items-center gap-3 text-xs text-amber-200">
                <Phone className="w-4 h-4 text-amber-300" />
                <span>
                  {isBn ? 'জরুরি বুকিং হটলাইন:' : 'Immediate Tour Desk:'}{' '}
                  <strong className="text-white font-mono text-sm">+880 1810-685888</strong>
                </span>
              </div>
            </div>

            {/* Right Column: Interactive Booking Form */}
            <div className="lg:col-span-6 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-6 sm:p-8 rounded-2xl shadow-xl border border-white/20">
              
              {submitted ? (
                <div className="py-8 text-center space-y-4 animate-in fade-in zoom-in-95">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {isBn ? 'সাইট ভিজিট বুকিং সম্পন্ন হয়েছে!' : 'Site Visit Tour Confirmed!'}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto leading-relaxed">
                    {isBn
                      ? `ধন্যবাদ ${formData.name}! আমাদের সাইট ভিজিট অফিসার আপনার ফোন (${formData.phone}) নম্বরে যোগাযোগ করে আসন নম্বর ও পিকআপ সময় নিশ্চিত করবেন।`
                      : `Thank you, ${formData.name}! Our tour coordinator will contact you at ${formData.phone} with vehicle departure details.`}
                  </p>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs font-mono text-slate-600 dark:text-slate-400">
                    Booking ID: CSBD-TOUR-{Math.floor(1000 + Math.random() * 9000)}
                  </div>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-colors"
                  >
                    {isBn ? 'আরেকটি বুকিং করুন' : 'Book Another Tour'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {isBn ? 'ফ্রি সাইট ভিজিট বুকিং ফর্ম' : 'Reserve Your Tour Seat'}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {isBn
                        ? 'তথ্য পূরণ করুন, আমাদের প্রতিনিধি আপনাকে আসন নিশ্চিত করবেন।'
                        : 'Fill out this form to receive immediate SMS pickup confirmation.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        {isBn ? 'আপনার পুরো নাম *' : 'Full Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder={isBn ? 'যেমন: মোহাম্মদ রহিম' : 'e.g. Ziabul Hoque'}
                        className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        {isBn ? 'মোবাইল নম্বর *' : 'Phone Number *'}
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+880 1810-000000"
                        className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        {isBn ? 'প্রকল্প নির্বাচন করুন' : 'Select Project'}
                      </label>
                      <select
                        value={formData.project}
                        onChange={e => setFormData({ ...formData, project: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="city-r-mega-town">
                          {isBn ? 'সিটি আর মেগা টাউন (পূর্বাচল)' : 'City R Mega Town (Purbachal)'}
                        </option>
                        <option value="mawa-project-1">
                          {isBn ? 'মাওয়া প্রজেক্ট ১ (পদ্মা সেতু এক্সপ্রেসওয়ে)' : 'Mawa Project 1 (Padma Expressway)'}
                        </option>
                        <option value="city-royal-bay">
                          {isBn ? 'সিটি রয়্যাল বে রিসোর্ট (কুয়াকাটা / কক্সবাজার)' : 'City Royal Bay (Kuakata / Cox\'s Bazar)'}
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        {isBn ? 'পিকআপ লোকেশন' : 'Pickup Point'}
                      </label>
                      <select
                        value={formData.pickupPoint}
                        onChange={e => setFormData({ ...formData, pickupPoint: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="mirpur-pallabi">
                          {isBn ? 'মিরপুর পল্লবী হেড অফিস (সকাল ৯:৩০)' : 'Pallabi Mirpur Head Office (9:30 AM)'}
                        </option>
                        <option value="motijheel-branch">
                          {isBn ? 'মতিঝিল শাখা অফিস (সকাল ১০:০০)' : 'Motijheel Commercial Branch (10:00 AM)'}
                        </option>
                        <option value="kuril-flyover">
                          {isBn ? 'কুড়িল বিশ্বরোড / ৩০০ ফুট পয়েন্ট' : 'Kuril Flyover / 300ft Junction'}
                        </option>
                        <option value="chattogram-muradpur">
                          {isBn ? 'চট্টগ্রাম অফিস (সালমা সেন্টার, মুরাদপুর)' : 'Ctg Office (Salma Centre, Muradpur)'}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        {isBn ? 'ভিজিটের তারিখ' : 'Preferred Date'}
                      </label>
                      <input
                        type="date"
                        value={formData.visitDate}
                        onChange={e => setFormData({ ...formData, visitDate: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        {isBn ? 'সদস্য সংখ্যা (আসন)' : 'Number of Guests'}
                      </label>
                      <select
                        value={formData.guests}
                        onChange={e => setFormData({ ...formData, guests: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="1">1 Person</option>
                        <option value="2">2 Persons (Couple)</option>
                        <option value="3">3 Persons (Family)</option>
                        <option value="4+">4+ Persons</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    {loading ? (
                      <span className="animate-spin">⏳</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>{isBn ? 'ফ্রি সাইট ভিজিট কনফার্ম করুন' : 'Confirm Free Site Visit'}</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-center text-slate-500 dark:text-slate-400">
                    {isBn
                      ? '🔒 আপনার তথ্য নিরাপদ। আমাদের প্রতিনিধি কোনোরূপ অপ্রয়োজনীয় কল করবেন না।'
                      : '🔒 Your information is confidential and will never be shared with third parties.'}
                  </p>
                </form>
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
