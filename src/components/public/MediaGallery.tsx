import React, { useState } from 'react';
import {
  Camera,
  Play,
  Maximize2,
  X,
  Compass,
  MapPin,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import { Language } from '../../types';

interface MediaItem {
  id: string;
  title: string;
  titleBn: string;
  project: string;
  projectBn: string;
  category: 'construction' | 'aerial' | 'event' | 'render';
  imageUrl: string;
  date: string;
  tag: string;
  tagBn: string;
}

interface MediaGalleryProps {
  language: Language;
}

export const MediaGallery: React.FC<MediaGalleryProps> = ({ language }) => {
  const isBn = language === 'bn';
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxItem, setLightboxItem] = useState<MediaItem | null>(null);

  const mediaItems: MediaItem[] = [
    {
      id: 'med-1',
      title: 'Purbachal Sector 4 Arterial 60ft Boulevard Blacktopping',
      titleBn: 'পূর্বাচল সেক্টর ৪-এর ৬০ ফুট প্রধান এভিনিউ পিচ ঢালাই কাজ',
      project: 'City R Mega Town',
      projectBn: 'সিটি আর মেগা টাউন',
      category: 'construction',
      imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?w=800&auto=format&fit=crop&q=80',
      date: 'September 2026',
      tag: 'Civil Progress',
      tagBn: 'সিভিল উন্নয়ন'
    },
    {
      id: 'med-2',
      title: 'City Royal Bay Luxury Hotel & Suites - 12-Story Superstructure',
      titleBn: 'সিটি রয়্যাল বে লাক্সারি রিসোর্ট - ১২ তলা ছাদ ঢালাই ও কাঠামো',
      project: 'Kuakata / Cox\'s Bazar Resort',
      projectBn: 'কুয়াকাটা / কক্সবাজার রিসোর্ট',
      category: 'construction',
      imageUrl: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=800&auto=format&fit=crop&q=80',
      date: 'August 2026',
      tag: 'Hospitality',
      tagBn: 'হসপিটালিটি'
    },
    {
      id: 'med-3',
      title: '350+ Acres High-Elevation Sand Filling & Boundary Demarcation',
      titleBn: '৩৫০+ একর বন্যা স্তরের উপরে বালু ভরাট ও সীমানা পিলার স্থাপন',
      project: 'City R Mega Town',
      projectBn: 'সিটি আর মেগা টাউন',
      category: 'aerial',
      imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?w=800&auto=format&fit=crop&q=80',
      date: 'July 2026',
      tag: 'Aerial View',
      tagBn: 'ড্রোন ভিউ'
    },
    {
      id: 'med-4',
      title: 'Client Land Registration & Sub-Registry Handover Ceremony',
      titleBn: 'সম্মানিত বিনিয়োগকারীদের মাঝে মূল রেজিস্ট্রি দলিল ও দখলপত্র হস্তান্তর',
      project: 'Corporate Event',
      projectBn: 'কর্পোরেট ইভেন্ট',
      category: 'event',
      imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80',
      date: 'June 2026',
      tag: 'Investor Meet',
      tagBn: 'গ্রাহক সমাবেশ'
    },
    {
      id: 'med-5',
      title: 'Architectural 3D Renders: Central Mosque & Waterfront Lake Park',
      titleBn: 'নান্দনিক ৩ডি নকশা: সেন্ট্রাল জামে মসজিদ ও লেকভিউ ওয়াকওয়ে',
      project: 'Master Plan Vision',
      projectBn: 'মাস্টারপ্ল্যান নকশা',
      category: 'render',
      imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80',
      date: 'May 2026',
      tag: '3D Render',
      tagBn: '৩ডি নকশা'
    },
    {
      id: 'med-6',
      title: 'Mirpur Pallabi Commercial Hub - Triple-Basement Deep Piling',
      titleBn: 'পল্লবী বাণিজ্যিক ভবন - ৩-তলা বেসমেন্ট ও রিটেইল স্পেস',
      project: 'City Square Commercial',
      projectBn: 'সিটি স্কয়ার কমার্শিয়াল',
      category: 'construction',
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
      date: 'April 2026',
      tag: 'Commercial',
      tagBn: 'বাণিজ্যিক ভবন'
    }
  ];

  const filtered = activeCategory === 'all'
    ? mediaItems
    : mediaItems.filter(m => m.category === activeCategory);

  return (
    <section id="gallery" className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <Camera className="w-3.5 h-3.5" />
              <span>{isBn ? 'প্রকল্প ফটো ও ভিডিও গ্যালারি' : 'Project Media & Video Tours'}</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {isBn ? 'বাস্তব সাইট পরিদর্শন ও অগ্রগতি চিত্র' : 'Live On-Site Development Progress'}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {isBn
                ? 'ড্রেজার দিয়ে বালু ভরাট, পিচ ঢালাই রাস্তা, বাউন্ডারি পিলার এবং রিসোর্ট কাঠামোর সাম্প্রতিক আলোকচিত্র।'
                : 'Witness transparent ground reality — sand filling, blacktop boulevards, deep piling, and structural milestones.'}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: isBn ? 'সকল ছবি' : 'All Media' },
              { id: 'construction', label: isBn ? 'নির্মাণ ও রাস্তা' : 'Construction' },
              { id: 'aerial', label: isBn ? 'ড্রোন ভিউ' : 'Aerial & Drone' },
              { id: 'event', label: isBn ? 'গ্রাহক অনুষ্ঠান' : 'Handover Events' },
              { id: 'render', label: isBn ? '৩ডি স্থাপত্য নকশা' : '3D Master Renders' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeCategory === tab.id
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(item => (
            <div
              key={item.id}
              onClick={() => setLightboxItem(item)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="aspect-16/10 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

              {/* Content on Image */}
              <div className="absolute inset-0 p-5 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20">
                    {isBn ? item.tagBn : item.tag}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-amber-600/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] text-amber-300 font-medium">
                    {isBn ? item.projectBn : item.project} · {item.date}
                  </span>
                  <h3 className="font-bold text-white text-sm line-clamp-2">
                    {isBn ? item.titleBn : item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightboxItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
            <div className="max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative animate-in fade-in zoom-in-95">
              
              <button
                onClick={() => setLightboxItem(null)}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-16/9 bg-black">
                <img
                  src={lightboxItem.imageUrl}
                  alt={lightboxItem.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-6 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-800">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
                    <span>{isBn ? lightboxItem.projectBn : lightboxItem.project}</span>
                    <span>·</span>
                    <span>{lightboxItem.date}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {isBn ? lightboxItem.titleBn : lightboxItem.title}
                  </h3>
                </div>

                <button
                  onClick={() => setLightboxItem(null)}
                  className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-colors shrink-0"
                >
                  {isBn ? 'বন্ধ করুন' : 'Close Preview'}
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
