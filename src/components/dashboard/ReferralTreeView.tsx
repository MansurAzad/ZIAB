import React, { useState } from 'react';
import {
  Users,
  Network,
  Share2,
  Copy,
  CheckCircle2,
  Award,
  TrendingUp,
  ChevronRight,
  ShieldCheck,
  UserPlus,
  DollarSign,
  Gift,
  Calculator,
  Layers,
  ArrowRight,
  Sparkles,
  Search,
  Check,
  X,
  Building2,
  Phone,
  Mail,
  HelpCircle
} from 'lucide-react';
import { Language, User } from '../../types';
import { formatBDT } from '../../services/i18n';

interface ReferralTreeViewProps {
  user: User;
  language: Language;
  onNavigateToProgram?: () => void;
}

interface DownlineMember {
  id: string;
  name: string;
  username: string;
  sponsorUsername: string;
  generation: 1 | 2 | 3 | 4;
  phone: string;
  joinedDate: string;
  assetBooked: string;
  investmentValue: number;
  commissionEarned: number;
  status: 'active' | 'pending';
  rank: string;
}

export const ReferralTreeView: React.FC<ReferralTreeViewProps> = ({ user, language, onNavigateToProgram }) => {
  const [copied, setCopied] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState<'tree' | 'generation_list' | 'ranks' | 'calculator' | 'add_downline'>('tree');
  const [selectedGenerationFilter, setSelectedGenerationFilter] = useState<'all' | 1 | 2 | 3>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Commission Simulator State
  const [calcAssetType, setCalcAssetType] = useState<'plot' | 'hotel_share'>('plot');
  const [calcValue, setCalcValue] = useState<number>(3500000);
  const [calcGen, setCalcGen] = useState<number>(1);

  // New Downline Registration Form State
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberPhone, setNewMemberPhone] = useState('');
  const [newMemberUsername, setNewMemberUsername] = useState('');
  const [newMemberAsset, setNewMemberAsset] = useState('City R Mega Town Purbachal (3 Katha)');
  const [newMemberPlacement, setNewMemberPlacement] = useState('direct');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const referralCode = user.referralCode || 'CSBD-8842';
  const refUrl = `https://citysquarebd.com/user/register?ref=${user.username}&code=${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(refUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Comprehensive Downline Network Data
  const [teamMembers, setTeamMembers] = useState<DownlineMember[]>([
    {
      id: 'mem-101',
      name: 'Md. Anwar Hossain (Chittagong)',
      username: 'anwar_ctg',
      sponsorUsername: user.username,
      generation: 1,
      phone: '+880 1819-334455',
      joinedDate: '15 Aug 2026',
      assetBooked: 'City R Mega Town (Sector 4, Plot #168)',
      investmentValue: 3500000,
      commissionEarned: 175000,
      status: 'active',
      rank: 'Associate Member'
    },
    {
      id: 'mem-102',
      name: 'Engr. Tanvir Ahmed Chowdhury',
      username: 'tanvir_eng',
      sponsorUsername: user.username,
      generation: 1,
      phone: '+880 1711-889900',
      joinedDate: '04 Sep 2026',
      assetBooked: 'City Royal Bay (1 Suite Share)',
      investmentValue: 600000,
      commissionEarned: 30000,
      status: 'active',
      rank: 'Executive Associate'
    },
    {
      id: 'mem-103',
      name: 'Dr. Farhana Yasmin (Panchlaish)',
      username: 'dr_farhana',
      sponsorUsername: user.username,
      generation: 1,
      phone: '+880 1912-776655',
      joinedDate: '28 Sep 2026',
      assetBooked: 'City Pallabi Square (Shop #304)',
      investmentValue: 2500000,
      commissionEarned: 125000,
      status: 'active',
      rank: 'Associate Member'
    },
    {
      id: 'mem-201',
      name: 'Kazi Mashiur Rahman',
      username: 'mashiur_kazi',
      sponsorUsername: 'anwar_ctg',
      generation: 2,
      phone: '+880 1611-445566',
      joinedDate: '10 Oct 2026',
      assetBooked: 'City R Mega Town (Sector 2, Plot #92)',
      investmentValue: 4800000,
      commissionEarned: 120000,
      status: 'active',
      rank: 'Associate Member'
    },
    {
      id: 'mem-202',
      name: 'Saiful Islam Sumon',
      username: 'saiful_sumon',
      sponsorUsername: 'tanvir_eng',
      generation: 2,
      phone: '+880 1822-112233',
      joinedDate: '14 Oct 2026',
      assetBooked: 'City Royal Bay Kuakata (2 Shares)',
      investmentValue: 1200000,
      commissionEarned: 30000,
      status: 'active',
      rank: 'Associate Member'
    },
    {
      id: 'mem-301',
      name: 'Rubel Hossain (Agrabad)',
      username: 'rubel_agrabad',
      sponsorUsername: 'mashiur_kazi',
      generation: 3,
      phone: '+880 1515-998877',
      joinedDate: '22 Oct 2026',
      assetBooked: 'Mawa Project 1 (Plot #21)',
      investmentValue: 2200000,
      commissionEarned: 22000,
      status: 'active',
      rank: 'Member'
    }
  ]);

  const totalTeamVolume = teamMembers.reduce((acc, m) => acc + m.investmentValue, 0);
  const totalCommissionEarned = teamMembers.reduce((acc, m) => acc + m.commissionEarned, 0);
  const directCount = teamMembers.filter(m => m.generation === 1).length;
  const teamTotalCount = teamMembers.length;

  const handleRegisterDownline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName || !newMemberUsername) return;

    const newMem: DownlineMember = {
      id: 'mem-' + Date.now(),
      name: newMemberName,
      username: newMemberUsername.toLowerCase().trim(),
      sponsorUsername: newMemberPlacement === 'direct' ? user.username : 'anwar_ctg',
      generation: newMemberPlacement === 'direct' ? 1 : 2,
      phone: newMemberPhone || '+880 1700-000000',
      joinedDate: 'Just Now',
      assetBooked: newMemberAsset,
      investmentValue: 3500000,
      commissionEarned: newMemberPlacement === 'direct' ? 175000 : 87500,
      status: 'active',
      rank: 'Associate Member'
    };

    setTeamMembers(prev => [newMem, ...prev]);
    setRegistrationSuccess(true);
    setNewMemberName('');
    setNewMemberPhone('');
    setNewMemberUsername('');
    setTimeout(() => {
      setRegistrationSuccess(false);
      setActiveTab('tree');
    }, 1800);
  };

  const filteredMembers = teamMembers.filter(m => {
    const matchesGen = selectedGenerationFilter === 'all' || m.generation === selectedGenerationFilter;
    const matchesSearch = searchQuery === '' || 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      m.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.assetBooked.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGen && matchesSearch;
  });

  // Calculate commission rate
  const getCommissionRate = (gen: number) => {
    switch (gen) {
      case 1: return 5.0; // 5%
      case 2: return 2.5; // 2.5%
      case 3: return 1.0; // 1.0%
      case 4: return 0.5; // 0.5%
      default: return 0.5;
    }
  };

  const calculatedCommission = (calcValue * getCommissionRate(calcGen)) / 100;

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              {language === 'bn' ? 'অ্যাসোসিয়েট নেটওয়ার্ক ও মাল্টি-লেভেল জেনারেশন ট্রি' : 'Associate MLM Network & Multi-Tier Generation'}
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
              MLM AFFILIATE
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === 'bn'
              ? 'আপনার স্পন্সর লিংক, ডিরেক্ট ও ইনডিরেক্ট জেনারেশন ডাউনলাইন, পদবী পুরস্কার এবং টিম সেলস কমিশন পরিচালনা করুন।'
              : 'Multi-level associate genealogy, generation commissions, rank ladder targets, and downline registration.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('add_downline')}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-xs font-semibold shadow-md flex items-center gap-1.5 transition-all"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'নতুন মেম্বার যুক্ত করুন' : 'Enroll New Downline'}</span>
          </button>
        </div>
      </div>

      {/* MLM Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] font-medium text-slate-500 block">
            {language === 'bn' ? 'টিম মোট ইনভেস্টমেন্ট' : 'Total Team Turnover'}
          </span>
          <span className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white font-mono block mt-1">
            {formatBDT(totalTeamVolume, language)}
          </span>
          <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" /> Across {teamTotalCount} members
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] font-medium text-slate-500 block">
            {language === 'bn' ? 'মোট কমিশন অর্জিত' : 'Total Commission Earned'}
          </span>
          <span className="text-lg sm:text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono block mt-1">
            {formatBDT(totalCommissionEarned, language)}
          </span>
          <span className="text-[10px] text-slate-500 font-mono mt-1 block">
            Gen 1: 5% | Gen 2: 2.5% | Gen 3: 1%
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] font-medium text-slate-500 block">
            {language === 'bn' ? 'ডিরেক্ট স্পন্সর মেম্বার' : 'Direct Referrals (Gen 1)'}
          </span>
          <span className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white font-mono block mt-1">
            {directCount} <span className="text-xs text-slate-500 font-normal">Active</span>
          </span>
          <span className="text-[10px] text-amber-600 font-semibold mt-1 block">
            Total Downline: {teamTotalCount} Members
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] font-medium text-slate-500 block">
            {language === 'bn' ? 'বর্তমান পদবী (Rank)' : 'Current Designation'}
          </span>
          <span className="text-sm sm:text-base font-extrabold text-amber-600 dark:text-amber-400 block mt-1 truncate">
            GOLD SENIOR ASSOCIATE
          </span>
          <span className="text-[10px] text-slate-500 mt-1 block">
            Next: Assistant Sales Manager
          </span>
        </div>
      </div>

      {/* Rank Target Progress Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 text-white shadow-xl space-y-4 border border-amber-900/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                PROMOTION TRACKER
              </span>
              <span className="text-xs text-slate-400">Target Volume: ৳1.8 Crore</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white mt-1">
              Gold Senior Associate → Assistant Sales Manager (ASM)
            </h3>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono font-bold text-emerald-400 block">
              82% Completed
            </span>
            <span className="text-[10px] text-slate-400">৳32.2 Lac remaining to qualify</span>
          </div>
        </div>

        <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 rounded-full w-[82%]" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono pt-2 border-t border-white/10">
          <div>
            <span className="text-slate-400 block text-[10px]">Rank Incentive:</span>
            <strong className="text-amber-300">Royal Enfield / Umrah Package</strong>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Monthly Royalty Pool:</span>
            <strong className="text-emerald-400">+1.5% Global Turnover</strong>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Team Sales Target:</span>
            <strong className="text-white">৳1,80,00,000</strong>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Current Achieved:</span>
            <strong className="text-white">৳1,47,80,000</strong>
          </div>
        </div>
      </div>

      {/* Official Sponsor Link Box */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Share2 className="w-4 h-4 text-amber-600" />
              {language === 'bn' ? 'আপনার ইউনিক রেফারেল কোড ও স্পন্সর লিংক' : 'Your Unique Referral Code & Sponsor URL'}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
              {referralCode}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCode}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                copiedCode
                  ? 'bg-emerald-600 text-white'
                  : 'bg-amber-100 hover:bg-amber-200 dark:bg-amber-950/60 dark:hover:bg-amber-900/60 text-amber-800 dark:text-amber-200'
              }`}
            >
              {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Code Copied!' : 'Copy Code: ' + referralCode}</span>
            </button>

            {onNavigateToProgram && (
              <button
                onClick={onNavigateToProgram}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                <span>Track Signups</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            readOnly
            value={refUrl}
            className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/70 font-mono text-slate-800 dark:text-slate-200"
          />
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-xs"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 text-amber-200" />}
            <span>{copied ? 'Copied!' : 'Copy Link'}</span>
          </button>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto text-xs">
        {[
          { id: 'tree', label: language === 'bn' ? 'ভিজ্যুয়াল জেনারেশন ট্রি' : 'Visual Genealogy Tree', icon: Network },
          { id: 'generation_list', label: language === 'bn' ? 'ডাউনলাইন তালিকা (লেভেল ১-৩)' : 'Downline Roster (Levels 1-3)', icon: Users },
          { id: 'ranks', label: language === 'bn' ? 'পদবী ও ইনসেন্টিভ পুরষ্কার' : 'Career Ranks & Incentives', icon: Award },
          { id: 'calculator', label: language === 'bn' ? 'কমিশন ক্যালকুলেটর' : 'Commission Simulator', icon: Calculator },
          { id: 'add_downline', label: language === 'bn' ? 'মেম্বার এনরোলমেন্ট' : 'Direct Downline Enrollment', icon: UserPlus }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: VISUAL GENEALOGY TREE */}
      {activeTab === 'tree' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Network className="w-4 h-4 text-amber-600" />
              Interactive Downline Hierarchy Tree
            </h3>
            <span className="text-xs text-slate-500 font-mono">
              Root: <strong>@{user.username}</strong>
            </span>
          </div>

          {/* Graphical Hierarchy Tree */}
          <div className="overflow-x-auto pb-4">
            <div className="min-w-[650px] flex flex-col items-center space-y-6 py-2">
              
              {/* ROOT NODE: Ziabulctg1 */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-800 text-white shadow-lg border-2 border-amber-400 flex flex-col items-center text-center w-64">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-extrabold text-sm border border-white/40 mb-1.5">
                  ZC
                </div>
                <strong className="text-xs">{user.fullName}</strong>
                <span className="text-[10px] font-mono text-amber-200">@{user.username} (You - Root)</span>
                <span className="mt-1 px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-black/20 text-amber-100">
                  GOLD SENIOR ASSOCIATE
                </span>
                <span className="text-[10px] font-mono mt-1 text-emerald-200">
                  Team Vol: {formatBDT(totalTeamVolume, language)}
                </span>
              </div>

              {/* Connecting Vertical Line */}
              <div className="w-0.5 h-6 bg-slate-300 dark:bg-slate-700" />

              {/* LEVEL 1: DIRECT REFERRALS ROW */}
              <div className="flex items-start justify-center gap-4 sm:gap-6 w-full">
                
                {/* Branch 1: Anwar */}
                <div className="flex flex-col items-center">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-emerald-500/60 shadow-sm flex flex-col items-center text-center w-48 hover:border-emerald-500 transition-colors">
                    <span className="px-1.5 py-0.5 rounded text-[8px] font-mono font-bold bg-emerald-500/10 text-emerald-600 uppercase">
                      Gen 1 · 5% Bonus
                    </span>
                    <strong className="text-xs text-slate-900 dark:text-white mt-1">Md. Anwar Hossain</strong>
                    <span className="text-[10px] font-mono text-slate-500">@anwar_ctg</span>
                    <span className="text-[10px] text-slate-600 dark:text-slate-300 mt-1 font-mono">
                      Inv: ৳35,00,000
                    </span>
                    <span className="text-[9px] font-bold text-emerald-600 font-mono">
                      +৳1,75,000 Commission
                    </span>
                  </div>

                  {/* Connecting Line to Level 2 */}
                  <div className="w-0.5 h-6 bg-slate-300 dark:bg-slate-700" />

                  {/* Level 2 Branch under Anwar: Kazi Mashiur */}
                  <div className="flex flex-col items-center">
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 shadow-xs flex flex-col items-center text-center w-44 hover:border-amber-500 transition-colors">
                      <span className="px-1.5 py-0.2 rounded text-[8px] font-mono font-bold bg-blue-500/10 text-blue-600">
                        Gen 2 · 2.5% Bonus
                      </span>
                      <strong className="text-[11px] text-slate-900 dark:text-white mt-0.5">Kazi Mashiur</strong>
                      <span className="text-[9px] font-mono text-slate-400">@mashiur_kazi</span>
                      <span className="text-[9px] text-slate-500 font-mono">Inv: ৳48,00,000</span>
                      <span className="text-[9px] font-bold text-emerald-600 font-mono">+৳1,20,000 Earned</span>
                    </div>

                    {/* Connecting Line to Level 3 */}
                    <div className="w-0.5 h-6 bg-slate-300 dark:bg-slate-700" />

                    {/* Level 3: Rubel */}
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-dashed border-slate-300 dark:border-slate-700 shadow-xs flex flex-col items-center text-center w-40">
                      <span className="px-1.5 py-0.2 rounded text-[8px] font-mono font-bold bg-purple-500/10 text-purple-600">
                        Gen 3 · 1.0% Bonus
                      </span>
                      <strong className="text-[10px] text-slate-900 dark:text-white mt-0.5">Rubel Hossain</strong>
                      <span className="text-[8px] font-mono text-slate-400">@rubel_agrabad</span>
                      <span className="text-[8px] font-bold text-emerald-600 font-mono">+৳22,000 Earned</span>
                    </div>
                  </div>
                </div>

                {/* Branch 2: Tanvir */}
                <div className="flex flex-col items-center">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-emerald-500/60 shadow-sm flex flex-col items-center text-center w-48 hover:border-emerald-500 transition-colors">
                    <span className="px-1.5 py-0.5 rounded text-[8px] font-mono font-bold bg-emerald-500/10 text-emerald-600 uppercase">
                      Gen 1 · 5% Bonus
                    </span>
                    <strong className="text-xs text-slate-900 dark:text-white mt-1">Engr. Tanvir Ahmed</strong>
                    <span className="text-[10px] font-mono text-slate-500">@tanvir_eng</span>
                    <span className="text-[10px] text-slate-600 dark:text-slate-300 mt-1 font-mono">
                      Inv: ৳6,00,000
                    </span>
                    <span className="text-[9px] font-bold text-emerald-600 font-mono">
                      +৳30,000 Commission
                    </span>
                  </div>

                  {/* Connecting Line to Level 2 */}
                  <div className="w-0.5 h-6 bg-slate-300 dark:bg-slate-700" />

                  {/* Level 2 Branch under Tanvir: Saiful */}
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 shadow-xs flex flex-col items-center text-center w-44 hover:border-amber-500 transition-colors">
                    <span className="px-1.5 py-0.2 rounded text-[8px] font-mono font-bold bg-blue-500/10 text-blue-600">
                      Gen 2 · 2.5% Bonus
                    </span>
                    <strong className="text-[11px] text-slate-900 dark:text-white mt-0.5">Saiful Islam Sumon</strong>
                    <span className="text-[9px] font-mono text-slate-400">@saiful_sumon</span>
                    <span className="text-[9px] text-slate-500 font-mono">Inv: ৳12,00,000</span>
                    <span className="text-[9px] font-bold text-emerald-600 font-mono">+৳30,000 Earned</span>
                  </div>
                </div>

                {/* Branch 3: Farhana */}
                <div className="flex flex-col items-center">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-emerald-500/60 shadow-sm flex flex-col items-center text-center w-48 hover:border-emerald-500 transition-colors">
                    <span className="px-1.5 py-0.5 rounded text-[8px] font-mono font-bold bg-emerald-500/10 text-emerald-600 uppercase">
                      Gen 1 · 5% Bonus
                    </span>
                    <strong className="text-xs text-slate-900 dark:text-white mt-1">Dr. Farhana Yasmin</strong>
                    <span className="text-[10px] font-mono text-slate-500">@dr_farhana</span>
                    <span className="text-[10px] text-slate-600 dark:text-slate-300 mt-1 font-mono">
                      Inv: ৳25,00,000
                    </span>
                    <span className="text-[9px] font-bold text-emerald-600 font-mono">
                      +৳1,25,000 Commission
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      )}

      {/* TAB 2: GENERATION ROSTER TABLE */}
      {activeTab === 'generation_list' && (
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden space-y-4 p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Generation Filter Chips */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-500 font-medium">Filter:</span>
              {[
                { id: 'all', label: 'All Levels' },
                { id: 1, label: 'Generation 1 (5%)' },
                { id: 2, label: 'Generation 2 (2.5%)' },
                { id: 3, label: 'Generation 3 (1%)' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setSelectedGenerationFilter(f.id as any)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    selectedGenerationFilter === f.id
                      ? 'bg-amber-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search member, asset..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/70 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase font-semibold">
                <tr>
                  <th className="p-3">Level</th>
                  <th className="p-3">Associate / Investor</th>
                  <th className="p-3">Sponsor ID</th>
                  <th className="p-3">Project & Asset Allotted</th>
                  <th className="p-3 font-mono">Volume</th>
                  <th className="p-3 text-right">Commission Earned</th>
                  <th className="p-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredMembers.map(mem => (
                  <tr key={mem.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-mono">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        mem.generation === 1 
                          ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                          : mem.generation === 2
                          ? 'bg-blue-500/10 text-blue-600 border border-blue-500/20'
                          : 'bg-purple-500/10 text-purple-600 border border-purple-500/20'
                      }`}>
                        Gen {mem.generation}
                      </span>
                    </td>
                    <td className="p-3 font-medium text-slate-900 dark:text-white">
                      {mem.name}
                      <span className="block text-[10px] text-slate-400 font-mono">
                        @{mem.username} · Joined {mem.joinedDate}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-slate-600 dark:text-slate-400">
                      @{mem.sponsorUsername}
                    </td>
                    <td className="p-3 text-slate-700 dark:text-slate-300">
                      {mem.assetBooked}
                    </td>
                    <td className="p-3 font-mono font-bold text-slate-900 dark:text-white">
                      {formatBDT(mem.investmentValue, language)}
                    </td>
                    <td className="p-3 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      +{formatBDT(mem.commissionEarned, language)}
                    </td>
                    <td className="p-3 text-center">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: CAREER RANKS & INCENTIVES */}
      {activeTab === 'ranks' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-300 dark:border-amber-800/50 text-xs text-amber-900 dark:text-amber-200">
            <strong>City Square BD Leadership Ladder:</strong> Every plot booking and resort share sold in your downline accumulates towards rank rewards. Rewards are disbursed within 7 working days upon milestone verification.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                rank: 'Executive Associate',
                criteria: '৳10 Lac Team Volume',
                reward: 'Luxury Smart Watch & Executive Bag',
                achieved: true,
                badge: 'Achieved'
              },
              {
                rank: 'Senior Associate',
                criteria: '৳25 Lac Team Volume',
                reward: 'Cox’s Bazar 5-Star Couple Holiday (3D/2N)',
                achieved: true,
                badge: 'Achieved'
              },
              {
                rank: 'Gold Senior Associate',
                criteria: '৳60 Lac Team Volume',
                reward: 'Bangkok / Thailand Air Ticket & Tour',
                achieved: true,
                badge: 'Current Rank'
              },
              {
                rank: 'Assistant Sales Manager (ASM)',
                criteria: '৳1.8 Crore Team Volume',
                reward: 'Holy Umrah Package or Royal Enfield Hunter 350',
                achieved: false,
                badge: 'In Progress (82%)'
              },
              {
                rank: 'Sales Manager (SM)',
                criteria: '৳4.0 Crore Team Volume',
                reward: 'Brand New Sedan Car (Toyota Allion/Axio)',
                achieved: false,
                badge: 'Upcoming'
              },
              {
                rank: 'Crown Club Director',
                criteria: '৳10.0 Crore Team Volume',
                reward: 'Luxury 3-BHK Ready Flat in Purbachal City R Mega Town',
                achieved: false,
                badge: 'Apex Milestone'
              }
            ].map((rk, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl border transition-all ${
                  rk.achieved
                    ? 'bg-white dark:bg-slate-900 border-emerald-500/40 shadow-xs'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    rk.achieved
                      ? 'bg-emerald-500/10 text-emerald-600'
                      : 'bg-amber-500/10 text-amber-600'
                  }`}>
                    {rk.badge}
                  </span>
                  <Award className={`w-4 h-4 ${rk.achieved ? 'text-emerald-500' : 'text-slate-400'}`} />
                </div>

                <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-2">
                  {rk.rank}
                </h4>

                <div className="mt-3 space-y-1.5 text-xs">
                  <div className="text-slate-500 text-[11px]">
                    Required: <strong className="text-slate-700 dark:text-slate-300 font-mono">{rk.criteria}</strong>
                  </div>
                  <div className="text-amber-800 dark:text-amber-300 font-semibold text-xs flex items-center gap-1.5 pt-1 border-t border-slate-100 dark:border-slate-800">
                    <Gift className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{rk.reward}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: COMMISSION SIMULATOR */}
      {activeTab === 'calculator' && (
        <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Calculator className="w-4 h-4 text-amber-600" />
              MLM Affiliate Commission Simulator
            </h3>
            <p className="text-xs text-slate-500">
              Calculate projected commission for any plot or hotel share sale across generations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Asset Category
              </label>
              <select
                value={calcAssetType}
                onChange={e => setCalcAssetType(e.target.value as any)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value="plot">Land Plot (Purbachal City R Mega Town)</option>
                <option value="hotel_share">Hotel & Resort Suite Share (City Royal Bay)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Generation Tier
              </label>
              <select
                value={calcGen}
                onChange={e => setCalcGen(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value={1}>Generation 1 (Direct Referral - 5.0%)</option>
                <option value={2}>Generation 2 (Downline Member - 2.5%)</option>
                <option value={3}>Generation 3 (Sub-Downline - 1.0%)</option>
                <option value={4}>Generation 4 & 5 (Extended Team - 0.5%)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Booking / Asset Value (BDT): <strong>{formatBDT(calcValue, language)}</strong>
            </label>
            <input
              type="range"
              min="300000"
              max="15000000"
              step="100000"
              value={calcValue}
              onChange={e => setCalcValue(Number(e.target.value))}
              className="w-full accent-amber-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>৳3.0 Lac</span>
              <span>৳35.0 Lac (Standard 3 Katha)</span>
              <span>৳1.5 Crore</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-mono tracking-wider opacity-90 block">
                Instant Commission Calculation
              </span>
              <span className="text-xl sm:text-2xl font-extrabold font-mono block mt-0.5">
                {formatBDT(calculatedCommission, language)}
              </span>
              <span className="text-[11px] opacity-80">
                Rate applied: {getCommissionRate(calcGen)}% on {formatBDT(calcValue, language)}
              </span>
            </div>

            <div className="text-right text-xs font-mono">
              <span className="block opacity-90">Rank Volume Points:</span>
              <strong className="text-amber-200">+{Math.round(calcValue / 10000)} Pts</strong>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: DIRECT DOWNLINE ENROLLMENT FORM */}
      {activeTab === 'add_downline' && (
        <div className="max-w-xl mx-auto p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-amber-600" />
              Direct Downline Investor Enrollment
            </h3>
            <p className="text-xs text-slate-500">
              Register a new client or associate under your network code <strong className="text-amber-600">@{user.username}</strong>.
            </p>
          </div>

          {registrationSuccess && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500 text-emerald-800 dark:text-emerald-200 text-xs flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>Downline member registered successfully and added to your generation tree!</span>
            </div>
          )}

          <form onSubmit={handleRegisterDownline} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Name / পুরো নাম *
              </label>
              <input
                type="text"
                required
                value={newMemberName}
                onChange={e => setNewMemberName(e.target.value)}
                placeholder="e.g. Al-Amin Chowdhury"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Username *
                </label>
                <input
                  type="text"
                  required
                  value={newMemberUsername}
                  onChange={e => setNewMemberUsername(e.target.value)}
                  placeholder="e.g. alamin_ctg"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Mobile Number / মোবাইল
                </label>
                <input
                  type="tel"
                  value={newMemberPhone}
                  onChange={e => setNewMemberPhone(e.target.value)}
                  placeholder="+880 1819-000000"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Asset of Interest
                </label>
                <select
                  value={newMemberAsset}
                  onChange={e => setNewMemberAsset(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="City R Mega Town Purbachal (3 Katha)">City R Mega Town Purbachal (3 Katha Plot)</option>
                  <option value="City R Mega Town Purbachal (5 Katha)">City R Mega Town Purbachal (5 Katha Plot)</option>
                  <option value="City Royal Bay Luxury Hotel Kuakata (1 Share)">City Royal Bay Kuakata (1 Suite Share)</option>
                  <option value="City Royal Bay Luxury Hotel Cox's Bazar">City Royal Bay Cox's Bazar (Share)</option>
                  <option value="City Pallabi Square Mirpur (Commercial)">City Pallabi Square (Commercial Shop)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Sponsor Placement
                </label>
                <select
                  value={newMemberPlacement}
                  onChange={e => setNewMemberPlacement(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                >
                  <option value="direct">Direct Under You (@{user.username} - Gen 1)</option>
                  <option value="anwar">Under Downline @anwar_ctg (Gen 2)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Enroll Downline & Activate Sponsor Placement</span>
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
