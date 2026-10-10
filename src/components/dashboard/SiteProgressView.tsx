import React, { useState } from 'react';
import {
  Camera,
  Calendar,
  MapPin,
  CheckCircle2,
  HardHat,
  Eye,
  Car,
  Clock,
  ExternalLink,
  ChevronRight,
  Sun,
  ShieldCheck,
  Video
} from 'lucide-react';
import { Language, User, PlotBooking } from '../../types';

interface SiteProgressViewProps {
  user: User;
  plot: PlotBooking;
  language: Language;
}

export const SiteProgressView: React.FC<SiteProgressViewProps> = ({ user, plot, language }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);
  const [visitBooked, setVisitBooked] = useState(false);
  const [visitDate, setVisitDate] = useState('2026-10-18');
  const [pickupLocation, setPickupLocation] = useState('Chattogram Office (Agrabad)');

  const updates = [
    {
      id: 'site-1',
      title: 'Sector 4 60ft Boulevard Bitumen Carpeting & Plot Demarcation',
      titleBn: 'সেক্টর ৪-এর ৬০ ফুট প্রধান এভিনিউ পিচ ঢালাই ও প্লট সীমানা পিলার স্থাপন',
      date: '02 October 2026',
      location: 'Purbachal Sector 4, Road 12 (Adjacent to Plot #142)',
      image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?w=1000&auto=format&fit=crop&q=80',
      tag: 'Plot #142 Frontage',
      status: 'Civil Works Completed',
      notes: 'Road base compaction test passed at 98.4%. Drainage RCC box culvert connection successfully certified.'
    },
    {
      id: 'site-2',
      title: 'Underground Electrical Ducting & 33kV Substation Civil Works',
      titleBn: 'ভূগর্ভস্থ বৈদ্যুতিক তারের ডাক্ট ও ৩৩ কেভি সাবস্টেশন নির্মাণ',
      date: '24 September 2026',
      location: 'Sector 4 Central Utility Block',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1000&auto=format&fit=crop&q=80',
      tag: 'Utilities Infrastructure',
      status: 'Active Progress (72%)',
      notes: 'Substation boundary concrete poured. DESCO technical inspector verified conduit depth at 2.2 meters.'
    },
    {
      id: 'site-3',
      title: 'Lake Promenade Landscaping & Retaining Wall Protection',
      titleBn: 'লেক প্রমেনেড ল্যান্ডস্কেপিং ও প্রটেকশন রিটেইনিং ওয়াল',
      date: '10 September 2026',
      location: 'Purbachal Sector 4 Lake South Zone',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1000&auto=format&fit=crop&q=80',
      tag: 'Eco-Park & Promenade',
      status: 'Piling & Retaining Wall Done',
      notes: 'Gabion stone mattress and steel-reinforced bank protection completed to safeguard against monsoon surges.'
    },
    {
      id: 'site-4',
      title: 'City Royal Bay Resort 12-Story Superstructure & Infinity Pool',
      titleBn: 'সিটি রয়্যাল বে ১২-তলা কাঠামো ও ইনফিনিটি পুল নির্মাণ',
      date: '15 September 2026',
      location: 'Inani Marine Drive, Cox\'s Bazar',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1000&auto=format&fit=crop&q=80',
      tag: 'Hotel Share Assets',
      status: 'Interior Fitouts Ongoing',
      notes: 'Heated oceanfront infinity pool waterproofing completed. Luxury suite imported marble tiling underway.'
    }
  ];

  const currentUpdate = updates[selectedPhotoIndex];

  const handleBookVisit = (e: React.FormEvent) => {
    e.preventDefault();
    setVisitBooked(true);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            {language === 'bn' ? 'সাইট অগ্রগতি, ড্রোন ফুটেজ ও সিসিটিভি লগ' : 'On-Site Construction Cam & Drone Updates'}
          </h2>
          <p className="text-xs text-slate-500">
            {language === 'bn'
              ? 'আপনার প্লট #১৪২ (সেক্টর ৪, পূর্বাচল) এবং হোটেল শেয়ার প্রকল্পের সার্বক্ষণিক নির্মাণ অগ্রগতি ও সাইট ভিজিট ব্যবস্থা।'
              : 'Real-time construction photos, civil engineering milestones, and complimentary VIP site inspection booking.'}
          </p>
        </div>

        {/* Live Weather & Ground Conditions */}
        <div className="flex items-center gap-3 p-2 rounded-xl bg-amber-500/10 dark:bg-amber-500/5 border border-amber-300 dark:border-amber-800 text-xs">
          <Sun className="w-4 h-4 text-amber-500 animate-spin" />
          <div>
            <span className="font-semibold text-slate-900 dark:text-white block leading-tight">
              Purbachal Site: 29°C · Clear Weather
            </span>
            <span className="text-[10px] text-slate-500 font-mono">
              Ground Compaction: 98.4% · Active Shift
            </span>
          </div>
        </div>
      </div>

      {/* Featured Construction Photo Viewer */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        
        {/* Main Photo Frame */}
        <div className="relative aspect-16/9 sm:aspect-21/9 overflow-hidden bg-slate-950">
          <img
            src={currentUpdate.image}
            alt={currentUpdate.title}
            className="w-full h-full object-cover transition-all duration-700"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex flex-col justify-between p-6">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-md text-[11px] font-mono font-bold bg-amber-500 text-slate-950 shadow-md">
                {currentUpdate.tag}
              </span>
              <span className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-black/60 text-white backdrop-blur-xs flex items-center gap-1.5">
                <Camera className="w-3 h-3 text-emerald-400" />
                GEO-VERIFIED SURVEY
              </span>
            </div>

            <div className="space-y-1 text-white">
              <span className="text-[11px] font-mono text-amber-300 block">
                {currentUpdate.date} · {currentUpdate.location}
              </span>
              <h3 className="text-base sm:text-xl font-extrabold text-white">
                {language === 'bn' ? currentUpdate.titleBn : currentUpdate.title}
              </h3>
              <p className="text-xs text-slate-300 max-w-2xl line-clamp-2">
                {currentUpdate.notes}
              </p>
            </div>
          </div>
        </div>

        {/* Thumbnail Selector Strip */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {updates.map((u, idx) => (
            <button
              key={u.id}
              onClick={() => setSelectedPhotoIndex(idx)}
              className={`p-2 rounded-xl border text-left transition-all ${
                selectedPhotoIndex === idx
                  ? 'border-amber-500 bg-white dark:bg-slate-800 ring-2 ring-amber-400/30 shadow-xs'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 bg-white/50 dark:bg-slate-800/40'
              }`}
            >
              <div className="aspect-16/9 rounded-lg overflow-hidden mb-1.5 bg-slate-200">
                <img src={u.image} alt={u.title} className="w-full h-full object-cover" />
              </div>
              <span className="text-[11px] font-bold text-slate-900 dark:text-white block truncate leading-tight">
                {language === 'bn' ? u.titleBn : u.title}
              </span>
              <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                {u.date}
              </span>
            </button>
          ))}
        </div>

      </div>

      {/* Book Complimentary Site Inspection Visit */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 text-white shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          <div className="md:col-span-7 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-semibold font-mono">
              <Car className="w-3.5 h-3.5" />
              <span>COMPLIMENTARY INVESTOR SERVICE</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold">
              {language === 'bn' ? 'সরাসরি সাইট পরিদর্শন গাড়ি বুক করুন' : 'Book a Complimentary On-Site Inspection'}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {language === 'bn'
                ? 'সিটি স্কয়ার বিডি নিজস্ব এসি মাইক্রোবাসে আপনাকে পূর্বাচল মেগা টাউনে আপনার প্লট #১৪২ পরিদর্শনের ব্যবস্থা করে। আমাদের সাইট ইঞ্জিনিয়ার উপস্থিত থেকে সকল সীমানা ও দলিল মিলিয়ে দেখাবেন।'
                : 'Inspect your allocated Plot #142 in Purbachal Sector 4. Our dedicated civil engineer will guide you across the 60ft avenue, culvert networks, and lakefront promenade.'}
            </p>
          </div>

          <div className="md:col-span-5 bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/10">
            {visitBooked ? (
              <div className="text-center py-4 space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-white">
                  {language === 'bn' ? 'পরিদর্শন সফলভাবে বুক করা হয়েছে!' : 'Site Visit Confirmed!'}
                </h4>
                <p className="text-xs text-slate-300">
                  {language === 'bn'
                    ? `আমাদের প্রতিনিধি ${visitDate} তারিখে আপনার সাথে যোগাযোগ করবেন (${pickupLocation})।`
                    : `Our executive will arrange transport for ${visitDate} from ${pickupLocation}.`}
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookVisit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Preferred Visit Date
                  </label>
                  <input
                    type="date"
                    required
                    value={visitDate}
                    onChange={e => setVisitDate(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Pickup Location
                  </label>
                  <select
                    value={pickupLocation}
                    onChange={e => setPickupLocation(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white"
                  >
                    <option>Chattogram Office (Agrabad C/A)</option>
                    <option>Dhaka Head Office (Mirpur Pallabi)</option>
                    <option>Purbachal 300ft Toll Plaza</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase tracking-wider text-xs transition-colors shadow-sm"
                >
                  {language === 'bn' ? 'পরিদর্শন নিশ্চিত করুন' : 'Confirm Site Visit'}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

    </div>
  );
};
