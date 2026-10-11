import React, { useState, useMemo } from 'react';
import {
  Users,
  Share2,
  Copy,
  Check,
  QrCode,
  TrendingUp,
  DollarSign,
  Award,
  Search,
  Filter,
  Phone,
  Mail,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Clock,
  AlertCircle,
  ShieldCheck,
  ChevronRight,
  Download,
  Send,
  UserPlus,
  X,
  Eye,
  Building2,
  Layers,
  ArrowRight,
  Gift,
  HelpCircle
} from 'lucide-react';
import { Language, User, ReferralSignup } from '../../types';
import { StorageService } from '../../services/storage';
import { formatBDT } from '../../services/i18n';

interface ReferralProgramViewProps {
  user: User;
  language: Language;
  onNavigateToTree?: () => void;
}

export const ReferralProgramView: React.FC<ReferralProgramViewProps> = ({
  user,
  language,
  onNavigateToTree
}) => {
  const referralCode = user.referralCode || user.memberId.replace('CSBD-CTG-', 'CSBD-') || 'CSBD-8842';
  const referralUrl = `https://citysquarebd.com/user/register?ref=${user.username}&code=${referralCode}`;

  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showDossierModal, setShowDossierModal] = useState<ReferralSignup | null>(null);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [claimSuccess, setClaimSuccess] = useState(false);

  // Signups list state loaded from StorageService
  const [signups, setSignups] = useState<ReferralSignup[]>(() => {
    return StorageService.getReferralSignups();
  });

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'pending' | 'completed'>('all');
  const [genFilter, setGenFilter] = useState<'all' | 1 | 2 | 3>('all');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  // New Invite / Direct Signup Form State
  const [newInviteName, setNewInviteName] = useState('');
  const [newInviteUsername, setNewInviteUsername] = useState('');
  const [newInvitePhone, setNewInvitePhone] = useState('');
  const [newInviteEmail, setNewInviteEmail] = useState('');
  const [newInviteProject, setNewInviteProject] = useState('City R Mega Town Purbachal (Plot #205, 3 Katha)');
  const [newInviteInvestment, setNewInviteInvestment] = useState('3500000');
  const [newInviteGen, setNewInviteGen] = useState<1 | 2>(1);
  const [newInviteNotes, setNewInviteNotes] = useState('');
  const [inviteSubmitting, setInviteSubmitting] = useState(false);
  const [inviteSuccessMsg, setInviteSuccessMsg] = useState('');

  // Copy handlers
  const handleCopyCode = () => {
    navigator.clipboard?.writeText(referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2200);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(referralUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  // Social Share Helpers
  const shareText = language === 'bn'
    ? `সিটি স্কয়ার বিডি প্রকল্পে বিনিয়োগ করে নিশ্চিত ক্যাপিটাল গেইন ও হালাল লভ্যাংশ উপভোগ করুন। আমার রেফারেল কোড: ${referralCode} ব্যবহার করে সরাসরি রেজিস্ট্রেশন করুন: ${referralUrl}`
    : `Invest in City Square BD premium land & hotel projects for guaranteed capital appreciation & halal returns. Use my referral code: ${referralCode} to sign up: ${referralUrl}`;

  const handleShareWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const handleShareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralUrl)}`, '_blank');
  };

  const handleShareTelegram = () => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(referralUrl)}&text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const handleShareEmail = () => {
    const subject = encodeURIComponent('Invitation to Invest with City Square BD');
    const body = encodeURIComponent(shareText);
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };

  // Filtered Signups
  const filteredSignups = useMemo(() => {
    return signups.filter(s => {
      const matchSearch =
        searchQuery === '' ||
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.nameBn && s.nameBn.includes(searchQuery)) ||
        s.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.memberId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.phone.includes(searchQuery) ||
        s.assetBooked.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = statusFilter === 'all' || s.status === statusFilter;
      const matchGen = genFilter === 'all' || s.generation === genFilter;

      return matchSearch && matchStatus && matchGen;
    });
  }, [signups, searchQuery, statusFilter, genFilter]);

  // Network Performance Metrics
  const totalSignupsCount = signups.length;
  const verifiedActiveCount = signups.filter(s => s.status === 'active' || s.status === 'completed').length;
  const pendingCount = signups.filter(s => s.status === 'pending').length;
  const directGen1Count = signups.filter(s => s.generation === 1).length;
  const totalNetworkVolume = signups.reduce((acc, s) => acc + s.investmentValue, 0);
  const totalCommissionEarned = signups.reduce((acc, s) => acc + s.commissionEarned, 0);
  const conversionRate = totalSignupsCount > 0 ? Math.round((verifiedActiveCount / totalSignupsCount) * 100) : 0;
  
  // Available commission to withdraw/transfer
  const availableBonus = signups
    .filter(s => s.payoutStatus === 'available')
    .reduce((acc, s) => acc + s.commissionEarned, 0) || 25000;

  // Handler for adding a new referral signup directly
  const handleCreateInviteSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInviteName || !newInviteUsername) return;

    setInviteSubmitting(true);
    const invAmount = Number(newInviteInvestment) || 3500000;
    const rate = newInviteGen === 1 ? 5 : 2.5;
    const commEarned = (invAmount * rate) / 100;

    const newSignupData: Omit<ReferralSignup, 'id'> = {
      name: newInviteName,
      nameBn: newInviteName,
      username: newInviteUsername.toLowerCase().trim().replace('@', ''),
      memberId: `CSBD-CTG-${Math.floor(9500 + Math.random() * 499)}`,
      email: newInviteEmail || `${newInviteUsername.toLowerCase()}@client.com`,
      phone: newInvitePhone || '+880 1819-000000',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      sponsorUsername: newInviteGen === 1 ? user.username : 'anwar_ctg',
      sponsorName: newInviteGen === 1 ? user.fullName : 'Md. Anwar Hossain',
      generation: newInviteGen,
      signupDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      signupTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      status: 'active',
      assetBooked: newInviteProject,
      investmentValue: invAmount,
      commissionEarned: commEarned,
      commissionRate: rate,
      payoutStatus: 'available',
      rank: 'Associate Member',
      location: 'Chattogram Office',
      kycVerified: true,
      notes: newInviteNotes || 'Referred directly by user referral program portal.'
    };

    const created = StorageService.addReferralSignup(newSignupData);
    setSignups(StorageService.getReferralSignups());

    setInviteSubmitting(false);
    setInviteSuccessMsg(
      language === 'bn'
        ? `সফলভাবে ${created.name} আপনার নেটওয়ার্কে সাইন আপ সম্পন্ন করেছেন! সম্ভাব্য কমিশন: ${formatBDT(commEarned, language)}`
        : `Successfully registered ${created.name} in your network! Commission: ${formatBDT(commEarned, language)}`
    );

    setTimeout(() => {
      setInviteSuccessMsg('');
      setShowInviteModal(false);
      setNewInviteName('');
      setNewInviteUsername('');
      setNewInvitePhone('');
      setNewInviteEmail('');
      setNewInviteNotes('');
    }, 2000);
  };

  // Claim commission handler
  const handleClaimCommission = () => {
    // Update all available signups to 'credited'
    const updated = signups.map(s => {
      if (s.payoutStatus === 'available') {
        return { ...s, payoutStatus: 'credited' as const };
      }
      return s;
    });
    setSignups(updated);
    setClaimSuccess(true);
    setTimeout(() => {
      setClaimSuccess(false);
      setShowClaimModal(false);
    }, 1800);
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              {language === 'bn' ? 'রেফারেল ও নেটওয়ার্ক প্রোগ্রাম' : 'Referral Program & Network Tracker'}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-300/60 dark:border-amber-700/60">
              {language === 'bn' ? 'লাইভ নেটওয়ার্ক' : 'LIVE NETWORK'}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {language === 'bn'
              ? 'আপনার ইউনিক রেফারেল কোড শেয়ার করুন এবং আপনার নেটওয়ার্কের সফল সাইন-আপ ও অর্জিত কমিশন ট্র্যাক করুন।'
              : 'Share your unique referral code, track successful member signups, and monitor tiered commissions.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onNavigateToTree && (
            <button
              onClick={onNavigateToTree}
              className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Layers className="w-3.5 h-3.5 text-amber-600" />
              <span>{language === 'bn' ? 'জেনারেশন ট্রি দেখুন' : 'View MLM Tree'}</span>
            </button>
          )}

          <button
            onClick={() => setShowInviteModal(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-xs font-semibold shadow-md flex items-center gap-1.5 transition-all"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'নতুন মেম্বার সাইন আপ করান' : 'Enroll New Referral'}</span>
          </button>
        </div>
      </div>

      {/* HERO SECTION: UNIQUE REFERRAL CODE & LINK SHOWCASE */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-amber-950 p-6 sm:p-8 text-white shadow-xl border border-amber-500/30">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left / Main: Referral Code & Details */}
          <div className="lg:col-span-8 space-y-5">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-400" />
                {language === 'bn' ? 'আপনার অফিসিয়াল ইনভেস্টর রেফারেল কোড' : 'OFFICIAL INVESTOR REFERRAL CODE'}
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                Member: {user.memberId}
              </span>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {language === 'bn'
                  ? 'বন্ধু ও পরিচিতজনদের রেফার করে ৫% পর্যন্ত নগদ বোনাস অর্জন করুন'
                  : 'Invite Network Partners & Earn up to 5% Direct Commission'}
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                {language === 'bn'
                  ? 'প্রতিটি সফল প্লট ও হোটেল শেয়ার বুকিংয়ের বিপরীতে তাৎক্ষণিক কমিশন জেনারেট হয়। লেভেল ১-এ ৫%, লেভেল ২-এ ২.৫% এবং লেভেল ৩-এ ১% বোনাস প্রযোজ্য।'
                  : 'Earn multi-tier incentives when your network books residential plots or commercial hotel shares in Purbachal & Kuakata.'}
              </p>
            </div>

            {/* Unique Referral Code Badge + Copy Action */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
              <div className="flex items-center bg-black/40 border border-amber-500/40 rounded-2xl p-1.5 pl-4 backdrop-blur-md">
                <div className="flex flex-col pr-4">
                  <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">
                    {language === 'bn' ? 'ইউনিক কোড' : 'Referral Code'}
                  </span>
                  <span className="text-xl sm:text-2xl font-black font-mono tracking-widest text-amber-400">
                    {referralCode}
                  </span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 shadow-md ${
                    copiedCode
                      ? 'bg-emerald-600 text-white'
                      : 'bg-amber-600 hover:bg-amber-500 text-white'
                  }`}
                >
                  {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedCode ? (language === 'bn' ? 'কপি হয়েছে!' : 'Code Copied!') : (language === 'bn' ? 'কোড কপি করুন' : 'Copy Code')}</span>
                </button>
              </div>

              {/* Show QR Code Button */}
              <button
                onClick={() => setShowQrModal(true)}
                className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                title="View QR Code"
              >
                <QrCode className="w-4 h-4 text-amber-400" />
                <span>{language === 'bn' ? 'কিউআর কোড দেখুন' : 'Show QR Code'}</span>
              </button>
            </div>

            {/* Direct Referral Link Input Box */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-300 flex items-center justify-between">
                <span>{language === 'bn' ? 'রেজিস্ট্রেশন লিংক (ডিরেক্ট সাইন আপ)' : 'Direct Registration URL'}</span>
                <span className="text-[10px] text-amber-400 font-mono">1-Click Auto-Fill Sponsor</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={referralUrl}
                  className="flex-1 px-3.5 py-2.5 text-xs rounded-xl bg-black/40 border border-slate-700 font-mono text-slate-200 focus:outline-none select-all"
                />
                <button
                  onClick={handleCopyLink}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap shadow-xs ${
                    copiedLink
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30'
                  }`}
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Link Copied!' : 'Copy Link'}</span>
                </button>
              </div>
            </div>

            {/* Social Share Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-[11px] text-slate-400 font-medium mr-1">
                {language === 'bn' ? 'সরাসরি শেয়ার করুন:' : 'Share Instantly:'}
              </span>
              <button
                onClick={handleShareWhatsApp}
                className="px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-[11px] font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>WhatsApp</span>
              </button>
              <button
                onClick={handleShareFacebook}
                className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/40 text-[11px] font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>Facebook</span>
              </button>
              <button
                onClick={handleShareTelegram}
                className="px-3 py-1.5 rounded-lg bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 border border-sky-500/40 text-[11px] font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>Telegram</span>
              </button>
              <button
                onClick={handleShareEmail}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 border border-white/20 text-[11px] font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Mail className="w-3 h-3" />
                <span>Email</span>
              </button>
            </div>
          </div>

          {/* Right / Quick Earnings Summary Card */}
          <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-semibold text-slate-300">
                {language === 'bn' ? 'কমিশন ওয়ালেট সামারি' : 'Commission Wallet'}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400">
                VERIFIED
              </span>
            </div>

            <div>
              <span className="text-[11px] text-slate-400 block">
                {language === 'bn' ? 'মোট উপার্জিত রেফারেল কমিশন' : 'Total Referral Earnings'}
              </span>
              <strong className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono block mt-1">
                {formatBDT(totalCommissionEarned, language)}
              </strong>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-black/30 rounded-xl p-2.5">
                <span className="text-[10px] text-slate-400 block">
                  {language === 'bn' ? 'ক্লেমযোগ্য ব্যালেন্স' : 'Available Balance'}
                </span>
                <span className="text-sm font-bold text-amber-300 font-mono block mt-0.5">
                  {formatBDT(availableBonus, language)}
                </span>
              </div>
              <div className="bg-black/30 rounded-xl p-2.5">
                <span className="text-[10px] text-slate-400 block">
                  {language === 'bn' ? 'কনভার্সন রেট' : 'Conversion Rate'}
                </span>
                <span className="text-sm font-bold text-white font-mono block mt-0.5">
                  {conversionRate}%
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowClaimModal(true)}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold shadow-md flex items-center justify-center gap-1.5 transition-all"
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'কমিশন ফান্ড ট্রান্সফার করুন' : 'Claim to Main Wallet'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* 4 STATS CARDS: NETWORK SIGNUP PERFORMANCE */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        
        {/* Stat 1: Total Signups */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">
              {language === 'bn' ? 'মোট সাইন-আপ' : 'Total Network Signups'}
            </span>
            <Users className="w-4 h-4 text-blue-500" />
          </div>
          <span className="text-2xl font-black text-slate-900 dark:text-white font-mono block">
            {totalSignupsCount}
          </span>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-1">
            <span className="text-emerald-600 font-semibold">{directGen1Count} Direct</span>
            <span>·</span>
            <span>{totalSignupsCount - directGen1Count} Indirect</span>
          </div>
        </div>

        {/* Stat 2: Successful & Active */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">
              {language === 'bn' ? 'সফল ও সক্রিয় বুকিং' : 'Successful Signups'}
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono block">
            {verifiedActiveCount}
          </span>
          <span className="text-[11px] text-emerald-600/80 font-medium mt-1 block">
            {conversionRate}% Conversion Success
          </span>
        </div>

        {/* Stat 3: Pending Signups */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">
              {language === 'bn' ? 'যাচাইকরণ প্রক্রিয়াধীন' : 'Pending Verification'}
            </span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <span className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono block">
            {pendingCount}
          </span>
          <span className="text-[11px] text-slate-400 mt-1 block">
            Awaiting Token / KYC
          </span>
        </div>

        {/* Stat 4: Network Turnover */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">
              {language === 'bn' ? 'নেটওয়ার্ক ইনভেস্টমেন্ট ভলিউম' : 'Network Sales Volume'}
            </span>
            <TrendingUp className="w-4 h-4 text-amber-500" />
          </div>
          <span className="text-xl font-black text-slate-900 dark:text-white font-mono block truncate">
            {formatBDT(totalNetworkVolume, language)}
          </span>
          <span className="text-[11px] text-amber-600 font-semibold mt-1 block">
            Rank: Gold Senior Associate
          </span>
        </div>

      </div>

      {/* MULTI-LEVEL COMMISSION TIER GUIDE */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-600/5 to-transparent border border-amber-500/20 dark:border-amber-500/30 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5 uppercase tracking-wide">
            <Award className="w-4 h-4 text-amber-600" />
            {language === 'bn' ? 'মাল্টি-টিয়ার কমিশন কাঠামো ও বন্টন নিয়ম' : 'Multi-Tier Referral Commission Rules'}
          </h4>
          <span className="text-[11px] text-amber-700 dark:text-amber-400 font-medium">
            Halal Real Estate MLM Structure
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-200/60 dark:border-amber-900/40 shadow-xs flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-xs shrink-0">
              L1
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-900 dark:text-white">Tier 1: Direct Signups</span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                  5.0%
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {language === 'bn'
                  ? 'আপনার রেফারেল লিংক ব্যবহার করে প্রত্যক্ষ সাইন-আপ ও প্লট ক্রয়ে ৫% ক্যাশ কমিশন।'
                  : 'Earn 5% on full investment when friends book plots/shares via your referral link.'}
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-blue-200/60 dark:border-blue-900/40 shadow-xs flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0">
              L2
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-900 dark:text-white">Tier 2: 2nd Generation</span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                  2.5%
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {language === 'bn'
                  ? 'আপনার ডিরেক্ট মেম্বারদের আমন্ত্রণে নতুন বুকিং সম্পন্ন হলে ২.৫% ওভাররাইডিং কমিশন।'
                  : 'Earn 2.5% override commission on sales made by your 1st-generation team.'}
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-purple-200/60 dark:border-purple-900/40 shadow-xs flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold text-xs shrink-0">
              L3
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-900 dark:text-white">Tier 3: 3rd Generation</span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                  1.0%
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {language === 'bn'
                  ? '৩য় প্রজন্মের সেলস ভলিউমে ১.০% প্যাসিভ নেটওয়ার্ক কমিশন অ্যাকাউন্টে জমা হবে।'
                  : 'Earn 1.0% passive team revenue on third-tier investment enrollments.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* TRACK SUCCESSFUL SIGNUPS FROM NETWORK - FILTER & SEARCH BAR */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        
        {/* Table Top Toolbar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-600" />
                {language === 'bn' ? 'সফল সাইন-আপ ও নেটওয়ার্ক ট্র্যাকার' : 'Successful Network Signups Tracker'}
                <span className="text-xs text-slate-500 font-normal font-mono">
                  ({filteredSignups.length} records)
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {language === 'bn'
                  ? 'আপনার রেফারেল কোডের মাধ্যমে যুক্ত হওয়া সকল ইনভেস্টর, তাঁদের বুকিং স্ট্যাটাস ও অর্জিত কমিশন বিবরণী।'
                  : 'Real-time record of investors registered using your referral code, their bookings & bonuses.'}
              </p>
            </div>

            {/* View Mode Toggle: Table or Cards */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-1 text-xs">
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                    viewMode === 'table'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  Table
                </button>
                <button
                  onClick={() => setViewMode('cards')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                    viewMode === 'cards'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  Cards
                </button>
              </div>
            </div>
          </div>

          {/* Filter Pills & Search Input */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
            
            {/* Search Input */}
            <div className="sm:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={language === 'bn' ? 'নাম, ফোন নম্বর, মেম্বার আইডি বা প্রজেক্ট দিয়ে সার্চ করুন...' : 'Search by name, phone, member ID, or plot...'}
                className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Generation Filter */}
            <div className="sm:col-span-3">
              <select
                value={genFilter}
                onChange={e => setGenFilter(e.target.value === 'all' ? 'all' : Number(e.target.value) as any)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="all">All Tiers (Gen 1-3)</option>
                <option value="1">Direct (Tier 1 · 5%)</option>
                <option value="2">Tier 2 (Indirect · 2.5%)</option>
                <option value="3">Tier 3 (Network · 1%)</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="sm:col-span-3">
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value as any)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active & Verified</option>
                <option value="pending">Pending Verification</option>
              </select>
            </div>

          </div>
        </div>

        {/* VIEW 1: DATA TABLE */}
        {viewMode === 'table' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Member / Investor</th>
                  <th className="py-3 px-4">Tier / Sponsor</th>
                  <th className="py-3 px-4">Asset Booked</th>
                  <th className="py-3 px-4">Investment Volume</th>
                  <th className="py-3 px-4">Commission Earned</th>
                  <th className="py-3 px-4">Signup Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredSignups.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Users className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                        <span className="font-medium text-xs">No referral signups found matching criteria.</span>
                        <button
                          onClick={() => { setSearchQuery(''); setStatusFilter('all'); setGenFilter('all'); }}
                          className="text-[11px] text-amber-600 hover:underline"
                        >
                          Clear filters
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredSignups.map(signup => (
                    <tr
                      key={signup.id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group"
                    >
                      {/* Member Info */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={signup.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                            alt={signup.name}
                            className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                          />
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white block group-hover:text-amber-600 transition-colors">
                              {signup.name}
                            </span>
                            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
                              <span>@{signup.username}</span>
                              <span>·</span>
                              <span className="text-amber-600 dark:text-amber-400 font-bold">{signup.memberId}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Tier & Sponsor */}
                      <td className="py-3.5 px-4">
                        <div>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                              signup.generation === 1
                                ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                                : signup.generation === 2
                                ? 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-800'
                                : 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-800'
                            }`}
                          >
                            Gen {signup.generation} · {signup.commissionRate}%
                          </span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">
                            {signup.generation === 1 ? 'Directly Sponsored' : `via @${signup.sponsorUsername}`}
                          </span>
                        </div>
                      </td>

                      {/* Asset Booked */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <span className="font-medium text-slate-800 dark:text-slate-200 block truncate">
                          {signup.assetBooked}
                        </span>
                        <span className="text-[10px] text-slate-400 block">
                          {signup.location}
                        </span>
                      </td>

                      {/* Investment Volume */}
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900 dark:text-white">
                        {formatBDT(signup.investmentValue, language)}
                      </td>

                      {/* Commission Earned */}
                      <td className="py-3.5 px-4">
                        <div>
                          <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 block">
                            +{formatBDT(signup.commissionEarned, language)}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">
                            {signup.payoutStatus === 'credited' ? (
                              <span className="text-emerald-600">✓ Credited</span>
                            ) : signup.payoutStatus === 'available' ? (
                              <span className="text-amber-600">● Available to Claim</span>
                            ) : (
                              <span>⏳ Pending Settlement</span>
                            )}
                          </span>
                        </div>
                      </td>

                      {/* Signup Date */}
                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                        <span>{signup.signupDate}</span>
                        {signup.signupTime && (
                          <span className="text-[10px] text-slate-400 block">{signup.signupTime}</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        {signup.status === 'active' || signup.status === 'completed' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Active / Booked</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                            <Clock className="w-3 h-3" />
                            <span>In Verification</span>
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setShowDossierModal(signup)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-slate-700 dark:text-slate-300 hover:text-amber-700 dark:hover:text-amber-300 text-[11px] font-semibold transition-colors inline-flex items-center gap-1 shadow-2xs"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Details</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* VIEW 2: CARDS GRID */}
        {viewMode === 'cards' && (
          <div className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSignups.length === 0 ? (
              <div className="col-span-full py-12 text-center text-slate-400">
                No referral signups found matching criteria.
              </div>
            ) : (
              filteredSignups.map(signup => (
                <div
                  key={signup.id}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4 bg-slate-50/50 dark:bg-slate-800/30 hover:border-amber-500/50 transition-all space-y-3 relative group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={signup.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                        alt={signup.name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                      />
                      <div>
                        <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                          {signup.name}
                        </h4>
                        <span className="text-[10px] font-mono text-slate-500 block">
                          @{signup.username} · {signup.memberId}
                        </span>
                      </div>
                    </div>
                    
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        signup.generation === 1
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                      }`}
                    >
                      Gen {signup.generation}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-[11px] space-y-1">
                    <span className="text-slate-400 text-[10px] block">Booked Asset:</span>
                    <strong className="text-slate-900 dark:text-white block font-medium">
                      {signup.assetBooked}
                    </strong>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800 mt-1">
                      <span className="text-[10px] text-slate-500 font-mono">Volume: {formatBDT(signup.investmentValue, language)}</span>
                      <span className="text-[10px] font-bold text-emerald-600 font-mono">
                        +{formatBDT(signup.commissionEarned, language)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span className="font-mono text-[10px]">{signup.signupDate}</span>
                    <button
                      onClick={() => setShowDossierModal(signup)}
                      className="px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-[10px] font-semibold hover:bg-amber-600 hover:text-white transition-colors"
                    >
                      View Dossier
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Table Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>All referral commissions are disbursed in compliance with Bangladesh Real Estate & Land Development Regulations.</span>
          </div>
          <span className="font-mono text-[11px]">
            Network ID: <strong>{user.memberId}</strong>
          </span>
        </div>

      </div>

      {/* QR CODE DISPLAY MODAL */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">
                Digital Referral QR Card
              </span>
              <button
                onClick={() => setShowQrModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-white border-2 border-dashed border-amber-500/40 inline-flex flex-col items-center mx-auto shadow-inner">
              {/* High-fidelity SVG QR Code representation */}
              <svg className="w-48 h-48" viewBox="0 0 160 160" fill="none">
                <rect width="160" height="160" fill="#FFFFFF" rx="12" />
                {/* QR corner 1 */}
                <rect x="15" y="15" width="40" height="40" fill="#0f172a" rx="4" />
                <rect x="23" y="23" width="24" height="24" fill="#ffffff" rx="2" />
                <rect x="29" y="29" width="12" height="12" fill="#d97706" rx="1" />
                
                {/* QR corner 2 */}
                <rect x="105" y="15" width="40" height="40" fill="#0f172a" rx="4" />
                <rect x="113" y="23" width="24" height="24" fill="#ffffff" rx="2" />
                <rect x="119" y="29" width="12" height="12" fill="#d97706" rx="1" />

                {/* QR corner 3 */}
                <rect x="15" y="105" width="40" height="40" fill="#0f172a" rx="4" />
                <rect x="23" y="113" width="24" height="24" fill="#ffffff" rx="2" />
                <rect x="29" y="119" width="12" height="12" fill="#d97706" rx="1" />

                {/* Center / Pattern Data */}
                <rect x="65" y="20" width="8" height="8" fill="#0f172a" />
                <rect x="80" y="20" width="8" height="8" fill="#0f172a" />
                <rect x="65" y="35" width="8" height="8" fill="#d97706" />
                <rect x="75" y="45" width="12" height="8" fill="#0f172a" />
                <rect x="65" y="60" width="30" height="8" fill="#0f172a" />
                <rect x="20" y="65" width="8" height="12" fill="#0f172a" />
                <rect x="35" y="70" width="12" height="8" fill="#d97706" />
                <rect x="110" y="65" width="8" height="12" fill="#0f172a" />
                <rect x="125" y="75" width="12" height="8" fill="#0f172a" />
                <rect x="60" y="80" width="40" height="12" fill="#0f172a" />
                <rect x="65" y="105" width="12" height="8" fill="#0f172a" />
                <rect x="85" y="110" width="8" height="12" fill="#d97706" />
                <rect x="105" y="105" width="8" height="8" fill="#0f172a" />
                <rect x="120" y="105" width="12" height="8" fill="#0f172a" />
                <rect x="105" y="125" width="30" height="12" fill="#0f172a" />
                <rect x="65" y="130" width="24" height="8" fill="#0f172a" />

                {/* Central Brand Dot */}
                <circle cx="80" cy="80" r="10" fill="#d97706" />
                <text x="80" y="84" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">CS</text>
              </svg>
              <div className="mt-3">
                <span className="text-[11px] font-mono font-bold text-slate-800 block">
                  Scan to Register with Code:
                </span>
                <strong className="text-sm font-black font-mono text-amber-600 block">
                  {referralCode}
                </strong>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {user.fullName}
              </h4>
              <p className="text-xs text-slate-500">
                Gold Senior Associate · City Square BD
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={handleCopyLink}
                className="flex-1 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-xs"
              >
                Copy Full Link
              </button>
              <button
                onClick={() => setShowQrModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ENROLL NEW REFERRAL SIGNUP MODAL */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 text-left shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-amber-600" />
                  {language === 'bn' ? 'নতুন রেফারেল মেম্বার এনরোলমেন্ট' : 'Enroll New Referral Signup'}
                </h3>
                <span className="text-[11px] text-slate-500">
                  Sponsor: <strong>{user.fullName} (@{user.username})</strong>
                </span>
              </div>
              <button
                onClick={() => setShowInviteModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {inviteSuccessMsg ? (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-200">
                  {language === 'bn' ? 'সফলভাবে নিবন্ধিত হয়েছে!' : 'Referral Recorded Successfully!'}
                </h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-300">{inviteSuccessMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleCreateInviteSignup} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Investor Full Name / মেম্বারের পুরো নাম *
                  </label>
                  <input
                    type="text"
                    required
                    value={newInviteName}
                    onChange={e => setNewInviteName(e.target.value)}
                    placeholder="e.g. Md. Shahidul Islam"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Username / ইউজারনেম *
                    </label>
                    <input
                      type="text"
                      required
                      value={newInviteUsername}
                      onChange={e => setNewInviteUsername(e.target.value)}
                      placeholder="e.g. shahidul_ctg"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Phone Number / ফোন নম্বর *
                    </label>
                    <input
                      type="text"
                      required
                      value={newInvitePhone}
                      onChange={e => setNewInvitePhone(e.target.value)}
                      placeholder="+880 1819-000000"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={newInviteEmail}
                      onChange={e => setNewInviteEmail(e.target.value)}
                      placeholder="shahidul@gmail.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Tier Placement
                    </label>
                    <select
                      value={newInviteGen}
                      onChange={e => setNewInviteGen(Number(e.target.value) as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    >
                      <option value="1">Level 1 (Direct · 5.0% Bonus)</option>
                      <option value="2">Level 2 (Under Anwar Hossain · 2.5% Bonus)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Asset / Project Booked
                    </label>
                    <select
                      value={newInviteProject}
                      onChange={e => setNewInviteProject(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    >
                      <option value="City R Mega Town Purbachal (Sector 4, 3 Katha)">City R Mega Town Purbachal (3 Katha)</option>
                      <option value="City Royal Bay Kuakata (1 Suite Share)">City Royal Bay Kuakata (1 Suite Share)</option>
                      <option value="City Pallabi Square (Shop #201)">City Pallabi Square (Shop #201)</option>
                      <option value="City Padma Expressway (Plot #14, 5 Katha)">City Padma Expressway (5 Katha)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Booking Value (BDT)
                    </label>
                    <input
                      type="number"
                      required
                      value={newInviteInvestment}
                      onChange={e => setNewInviteInvestment(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Notes / Verification Remarks
                  </label>
                  <textarea
                    rows={2}
                    value={newInviteNotes}
                    onChange={e => setNewInviteNotes(e.target.value)}
                    placeholder="e.g. Registered in Chattogram office. Initial token ৳2 Lac received."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowInviteModal(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={inviteSubmitting}
                    className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md flex items-center gap-1.5"
                  >
                    {inviteSubmitting ? 'Registering...' : 'Confirm & Save Signup'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* VIEW DOSSIER MODAL */}
      {showDossierModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 text-left shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <img
                  src={showDossierModal.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                  alt={showDossierModal.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-amber-500"
                />
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    {showDossierModal.name}
                  </h3>
                  <span className="text-xs font-mono text-slate-500">
                    @{showDossierModal.username} · Member ID: {showDossierModal.memberId}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowDossierModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <span className="text-[10px] text-slate-400 block">Sponsor / Referrer</span>
                <strong className="text-slate-900 dark:text-white">
                  {showDossierModal.sponsorName} (@{showDossierModal.sponsorUsername})
                </strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <span className="text-[10px] text-slate-400 block">Generation & Rate</span>
                <strong className="text-emerald-600 font-mono">
                  Level {showDossierModal.generation} ({showDossierModal.commissionRate}% Bonus)
                </strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <span className="text-[10px] text-slate-400 block">Phone Contact</span>
                <span className="font-mono text-slate-800 dark:text-slate-200">{showDossierModal.phone}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <span className="text-[10px] text-slate-400 block">Email Address</span>
                <span className="text-slate-800 dark:text-slate-200 truncate block">{showDossierModal.email}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-2">
              <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300 block uppercase tracking-wide">
                Booking & Commission Breakdown
              </span>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Allotted Asset:</span>
                <strong className="text-slate-900 dark:text-white text-right">{showDossierModal.assetBooked}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Total Booking Value:</span>
                <strong className="text-slate-900 dark:text-white font-mono">{formatBDT(showDossierModal.investmentValue, language)}</strong>
              </div>
              <div className="flex justify-between pt-1 border-t border-amber-500/20">
                <span className="text-slate-600 dark:text-slate-400">Your Referral Commission:</span>
                <strong className="text-emerald-600 font-mono text-sm">+{formatBDT(showDossierModal.commissionEarned, language)}</strong>
              </div>
            </div>

            {showDossierModal.notes && (
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300">
                <strong className="block text-[10px] text-slate-400 mb-0.5">Verification Notes:</strong>
                {showDossierModal.notes}
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <a
                href={`tel:${showDossierModal.phone}`}
                className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>Call Member</span>
              </a>
              <button
                onClick={() => setShowDossierModal(null)}
                className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CLAIM TO MAIN WALLET MODAL */}
      {showClaimModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
              <DollarSign className="w-6 h-6" />
            </div>

            {claimSuccess ? (
              <div className="space-y-2">
                <h3 className="text-base font-bold text-emerald-700 dark:text-emerald-300">
                  {language === 'bn' ? 'সফলভাবে ক্রেডিট হয়েছে!' : 'Commission Credited Successfully!'}
                </h3>
                <p className="text-xs text-slate-500">
                  {formatBDT(availableBonus, language)} has been transferred to your primary investment wallet.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  {language === 'bn' ? 'কমিশন ওয়ালেটে ট্রান্সফার করুন' : 'Claim Commission to Wallet'}
                </h3>
                <p className="text-xs text-slate-500">
                  You have <strong className="text-emerald-600 font-mono">{formatBDT(availableBonus, language)}</strong> in verified referral bonuses ready to transfer.
                </p>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 font-mono text-xs text-slate-700 dark:text-slate-300">
                  Destination: <strong>Primary Investment Wallet</strong>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => setShowClaimModal(false)}
                    className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleClaimCommission}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md"
                  >
                    Confirm Transfer
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
