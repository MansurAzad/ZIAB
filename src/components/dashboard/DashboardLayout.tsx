import React, { useState } from 'react';
import {
  LayoutDashboard,
  MapPin,
  Hotel,
  CreditCard,
  FileText,
  TrendingUp,
  Share2,
  HelpCircle,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Plus,
  RefreshCw,
  QrCode,
  User as UserIcon,
  Phone,
  Mail,
  Copy,
  ChevronRight,
  ExternalLink,
  Lock,
  Layers,
  Award,
  Camera,
  Wallet,
  FileCheck2,
  Ruler,
  Scale,
  Send,
  Network,
  Sparkles,
  Upload,
  X
} from 'lucide-react';
import {
  User,
  Language,
  PlotBooking,
  ShareInvestment,
  InstallmentRecord,
  TransactionRecord,
  SupportTicket,
  AppNotification
} from '../../types';
import { formatBDT, getTranslation, translations } from '../../services/i18n';
import { StorageService } from '../../services/storage';
import { PaymentGatewayModal } from './PaymentGatewayModal';
import { CertificateViewerModal } from './CertificateViewerModal';
import { MoneyReceiptModal } from './MoneyReceiptModal';
import { PlotTransferModal } from './PlotTransferModal';
import { RegisteredDeedModal } from './RegisteredDeedModal';
import { SiteProgressView } from './SiteProgressView';
import { KhatianVaultView } from './KhatianVaultView';
import { DividendManagerView } from './DividendManagerView';
import { TaxCertificateView } from './TaxCertificateView';
import { PlotVisualizerView } from './PlotVisualizerView';
import { ProfileKYCView } from './ProfileKYCView';
import { VacationBookingView } from './VacationBookingView';
import { MemberTransferView } from './MemberTransferView';
import { DepositSlipUploadView } from './DepositSlipUploadView';
import { ReferralTreeView } from './ReferralTreeView';
import { ReferralProgramView } from './ReferralProgramView';
import { TransactionPinSecurityView } from './TransactionPinSecurityView';
import { DoubleProfitView } from './DoubleProfitView';

interface DashboardLayoutProps {
  user: User;
  language: Language;
  plots: PlotBooking[];
  shares: ShareInvestment[];
  installments: InstallmentRecord[];
  transactions: TransactionRecord[];
  tickets: SupportTicket[];
  onRefreshData: () => void;
  onOpenMasterPlan: () => void;
  isCloudSynced: boolean;
  onTriggerSync: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  user,
  language,
  plots,
  shares,
  installments,
  transactions,
  tickets,
  onRefreshData,
  onOpenMasterPlan,
  isCloudSynced,
  onTriggerSync
}) => {
  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'double_profit'
    | 'profile'
    | 'plots'
    | 'plot_visualizer'
    | 'shares'
    | 'vacation'
    | 'site_progress'
    | 'installments'
    | 'slip_upload'
    | 'dividends'
    | 'member_transfer'
    | 'ledger'
    | 'certificates'
    | 'khatian_vault'
    | 'tax_certificate'
    | 'analytics'
    | 'affiliate'
    | 'referral_tree'
    | 'support'
    | 'security'
  >('overview');

  // Modal states
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedInstallmentForPay, setSelectedInstallmentForPay] = useState<InstallmentRecord | null>(null);

  const [certModalOpen, setCertModalOpen] = useState(false);
  const [certType, setCertType] = useState<'plot_allotment' | 'hotel_share'>('plot_allotment');

  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [selectedInstallmentForReceipt, setSelectedInstallmentForReceipt] = useState<InstallmentRecord | null>(null);

  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [deedModalOpen, setDeedModalOpen] = useState(false);

  // Support ticket form
  const [newTicketSubject, setNewTicketSubject] = useState('');
  const [newTicketCategory, setNewTicketCategory] = useState<SupportTicket['category']>('general');
  const [newTicketMessage, setNewTicketMessage] = useState('');
  const [isSubmittingTicket, setIsSubmittingTicket] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // New Plot Booking Request Modal state
  const [isNewPlotModalOpen, setIsNewPlotModalOpen] = useState(false);
  const [newPlotProject, setNewPlotProject] = useState('City R Mega Town - Purbachal');
  const [newPlotKatha, setNewPlotKatha] = useState(5);
  const [newPlotFacing, setNewPlotFacing] = useState('South Facing (Park View)');
  const [newPlotDownpayment, setNewPlotDownpayment] = useState(500000);

  const handleCreateNewPlotBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const ratePerKatha = newPlotProject.includes('Mawa') ? 550000 : 700000;
    const totalCost = ratePerKatha * newPlotKatha;
    StorageService.createPlot({
      projectName: newPlotProject,
      projectNameBn: newPlotProject.includes('Mawa') ? 'মাওয়া এক্সপ্রেসওয়ে স্মার্ট সিটি' : 'সিটি আর মেগা টাউন - পূর্বাচল',
      sector: newPlotProject.includes('Mawa') ? 'Block B' : 'Sector 5',
      roadNo: 'Road #4 (40ft Avenue)',
      katha: newPlotKatha,
      facing: newPlotFacing,
      totalCost,
      paidAmount: newPlotDownpayment,
      status: 'booked'
    });
    onRefreshData();
    setIsNewPlotModalOpen(false);
  };

  const t = (key: keyof typeof translations.en) => getTranslation(language, key);

  // Computed metrics
  const totalPlotCost = plots.reduce((acc, p) => acc + p.totalCost, 0);
  const totalShareCost = shares.reduce((acc, s) => acc + s.totalInvestment, 0);
  const totalPortfolioValue = totalPlotCost + totalShareCost;

  const totalPlotPaid = plots.reduce((acc, p) => acc + p.paidAmount, 0);
  const totalSharePaid = shares.reduce((acc, s) => acc + s.paidAmount, 0);
  const totalPaid = totalPlotPaid + totalSharePaid;

  const totalRemainingDue = totalPortfolioValue - totalPaid;
  const totalDividendsAccrued = shares.reduce((acc, s) => acc + s.totalDividendsEarned, 0);
  const monthlyDividendYield = shares.reduce((acc, s) => acc + s.monthlyDividendAmount, 0);

  const activePlot = plots[0];
  const activeShare = shares[0];
  const nextDueInstallment = installments.find(i => i.status === 'due') || installments[0];

  const handleOpenPayment = (inst?: InstallmentRecord) => {
    setSelectedInstallmentForPay(inst || nextDueInstallment);
    setPaymentModalOpen(true);
  };

  const handleOpenCertificate = (type: 'plot_allotment' | 'hotel_share') => {
    setCertType(type);
    setCertModalOpen(true);
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketSubject || !newTicketMessage) return;
    setIsSubmittingTicket(true);
    StorageService.createTicket(newTicketSubject, newTicketCategory, newTicketMessage);
    onRefreshData();
    setNewTicketSubject('');
    setNewTicketMessage('');
    setIsSubmittingTicket(false);
  };

  const handleCopyReferral = () => {
    const refUrl = `${window.location.origin}/user/register?ref=${user.username}&code=${user.referralCode || user.memberId}`;
    navigator.clipboard?.writeText(refUrl);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  // User Dashboard Navigation Items - Featuring 12-Month Double Profit Scheme
  const navItems = [
    { id: 'overview', label: t('dashOverview'), icon: LayoutDashboard },
    { id: 'double_profit', label: language === 'bn' ? '১২ মাসে ডাবল প্রফিট' : '12-Month Double Profit', icon: Sparkles },
    { id: 'profile', label: t('dashProfile'), icon: UserIcon },
    { id: 'plots', label: t('dashPlots'), icon: MapPin },
    { id: 'installments', label: t('dashInstallments'), icon: CreditCard },
    { id: 'slip_upload', label: t('dashSlipUpload'), icon: Upload },
    { id: 'dividends', label: t('dashDividends'), icon: Wallet },
    { id: 'member_transfer', label: t('dashMemberTransfer'), icon: Send },
    { id: 'ledger', label: t('dashTransactions'), icon: FileText },
    { id: 'certificates', label: t('dashCertificates'), icon: Award },
    { id: 'khatian_vault', label: t('dashKhatianVault'), icon: FileCheck2 },
    { id: 'tax_certificate', label: t('dashTaxCert'), icon: Scale },
    { id: 'analytics', label: t('dashAnalytics'), icon: TrendingUp },
    { id: 'affiliate', label: t('dashAffiliate'), icon: Share2 },
    { id: 'referral_tree', label: t('dashReferralTree'), icon: Network },
    { id: 'support', label: t('dashSupport'), icon: HelpCircle },
    { id: 'security', label: t('dashSecurity'), icon: ShieldCheck }
  ];

  return (
    <div className="min-h-screen bg-slate-100/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors pb-16">
      
      {/* Top Welcome Bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* User Profile Overview */}
            <div className="flex items-center gap-3.5">
              <img
                src={user.avatar}
                alt={user.fullName}
                className="w-12 h-12 rounded-full object-cover border-2 border-amber-500 shadow-sm"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white leading-tight">
                    {t('dashGreeting')}, {language === 'bn' && user.fullNameBn ? user.fullNameBn : user.fullName}
                  </h1>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1">
                  <span>{t('dashMemberNo')}: <strong className="font-mono text-amber-600 dark:text-amber-400">{user.memberId}</strong></span>
                  <span aria-hidden="true">·</span>
                  <span>{t('dashBranch')}: {user.branch}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400">E2E ENCRYPTED</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={onTriggerSync}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
                title="Force Cloud Synchronization"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isCloudSynced ? '' : 'animate-spin text-amber-500'}`} />
                <span>{isCloudSynced ? 'Synced' : 'Syncing...'}</span>
              </button>

              {nextDueInstallment && nextDueInstallment.status === 'due' && (
                <button
                  onClick={() => handleOpenPayment()}
                  className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>{t('payNow')} ({formatBDT(nextDueInstallment.amount, language)})</span>
                </button>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Main Dashboard Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Sidebar Nav */}
          <div className="lg:col-span-3">
            <div className="sticky top-20 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 shadow-xs space-y-1">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 shadow-xs'
                        : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {isActive && <ChevronRight className="w-3.5 h-3.5 text-amber-600" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content Pane */}
          <div className="lg:col-span-9 space-y-6">

            {/* TAB: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                
                {/* 4 Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  
                  {/* Card 1: Total Portfolio */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
                      {t('overviewTotalInvested')}
                    </span>
                    <span className="text-xl font-extrabold text-slate-900 dark:text-white font-mono mt-1 block">
                      {formatBDT(totalPortfolioValue, language)}
                    </span>
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      City R Mega Town (Purbachal Sector 4)
                    </span>
                  </div>

                  {/* Card 2: Total Paid */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
                      {t('overviewTotalPaid')}
                    </span>
                    <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono mt-1 block">
                      {formatBDT(totalPaid, language)}
                    </span>
                    <span className="text-[11px] text-emerald-600/80 dark:text-emerald-400/80 font-medium mt-1 block">
                      {Math.round((totalPaid / totalPortfolioValue) * 100)}% Cleared
                    </span>
                  </div>

                  {/* Card 3: Remaining Due */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
                      {t('overviewRemainingDue')}
                    </span>
                    <span className="text-xl font-extrabold text-amber-600 dark:text-amber-400 font-mono mt-1 block">
                      {formatBDT(totalRemainingDue, language)}
                    </span>
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      24 Installments Remaining
                    </span>
                  </div>

                  {/* Card 4: Dividends Earned */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
                      {t('overviewDividendsReceived')}
                    </span>
                    <span className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono mt-1 block">
                      {formatBDT(totalDividendsAccrued, language)}
                    </span>
                    <span className="text-[11px] text-indigo-600/80 dark:text-indigo-400/80 font-medium mt-1 block">
                      +{formatBDT(monthlyDividendYield, language)} / month
                    </span>
                  </div>

                </div>

                {/* Next Installment Due Alert Banner */}
                {nextDueInstallment && nextDueInstallment.status === 'due' && (
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-300 dark:border-amber-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                          {t('nextInstallmentDue')}: {nextDueInstallment.title}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300">
                        Payable amount: <strong className="font-mono text-slate-900 dark:text-white">{formatBDT(nextDueInstallment.amount, language)}</strong> due on <strong className="font-mono">{nextDueInstallment.dueDate}</strong> for Plot #142 (Purbachal Sector 4).
                      </p>
                    </div>

                    <button
                      onClick={() => handleOpenPayment(nextDueInstallment)}
                      className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>{t('payNow')}</span>
                    </button>
                  </div>
                )}

                {/* 12-Month Double Profit Scheme Spotlight Card */}
                <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-5 border border-amber-400/40">
                  <div className="space-y-1.5 max-w-xl">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/25 border border-white/20 text-xs font-black uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                      <span>{language === 'bn' ? '১২ মাসে ডাবল প্রফিট প্রকল্প (মাসিক কিস্তি)' : '12-Month Double Profit Scheme'}</span>
                    </div>
                    <h3 className="text-base sm:text-xl font-black tracking-tight">
                      {language === 'bn'
                        ? 'আমাদের কোম্পানি দিচ্ছে ১২ মাসে নিশ্চিত ডাবল প্রফিট — প্রতি মাসে মাসিক কিস্তিতে সরাসরি রিটার্ন!'
                        : 'Our Company Delivers 2X Double Return in 12 Months — Paid in Monthly Installments!'}
                    </h3>
                    <p className="text-xs text-amber-50/90 leading-relaxed">
                      {language === 'bn'
                        ? '১০০% ব্যাংক সিকিউরিটি PDC চেক ও রেজিস্টার্ড চুক্তিপত্রের শতভাগ নিশ্চয়তা। প্রতি মাসের ১-৫ তারিখে সরাসরি আপনার হিসাবে মাসিক কিস্তির মুনাফা জমা হবে।'
                        : '100% Backed by Bank PDC Cheques & Notarized Deed. Consecutive monthly installments directly to your account.'}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('double_profit')}
                    className="px-5 py-3 rounded-2xl bg-slate-950 hover:bg-slate-900 text-amber-400 font-black text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 shrink-0 group"
                  >
                    <span>{language === 'bn' ? 'ডাবল প্রফিট কিস্তি ও হিসাব দেখুন' : 'View Installment Ledger'}</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>

                {/* Plot Progress & Details Card */}
                {activePlot && (
                  <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                      <div>
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                          Allocated Land Title
                        </span>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          {activePlot.projectName}
                        </h2>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={onOpenMasterPlan}
                          className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        >
                          View on Master Plan
                        </button>
                        <button
                          onClick={() => handleOpenCertificate('plot_allotment')}
                          className="px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-700 text-xs font-semibold hover:bg-amber-500/20 transition-colors"
                        >
                          Allotment Deed
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                      <div>
                        <span className="text-slate-400 block">Sector & Road</span>
                        <strong className="text-slate-900 dark:text-white">{activePlot.sector}, {activePlot.roadNo}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Plot Number</span>
                        <strong className="text-amber-600 dark:text-amber-400 font-mono font-bold">#{activePlot.plotNo} ({activePlot.katha} Katha)</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Target Handover</span>
                        <strong className="text-slate-900 dark:text-white">{activePlot.handoverDate}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Legal Deed No</span>
                        <strong className="text-slate-900 dark:text-white font-mono">{activePlot.allotmentLetterNo}</strong>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1.5 pt-2">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-600 dark:text-slate-300">{t('paymentProgress')}</span>
                        <span className="font-mono text-amber-700 dark:text-amber-400">
                          {formatBDT(activePlot.paidAmount, language)} / {formatBDT(activePlot.totalCost, language)} ({Math.round((activePlot.paidAmount / activePlot.totalCost) * 100)}%)
                        </span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full transition-all duration-500"
                          style={{ width: `${(activePlot.paidAmount / activePlot.totalCost) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* TAB: 12-MONTH DOUBLE PROFIT SCHEME */}
            {activeTab === 'double_profit' && (
              <DoubleProfitView
                user={user}
                language={language}
                onRefreshData={onRefreshData}
              />
            )}

            {/* TAB: PROFILE & KYC */}
            {activeTab === 'profile' && (
              <ProfileKYCView
                user={user}
                language={language}
                onProfileUpdated={() => onRefreshData()}
              />
            )}

            {/* TAB: MY PLOTS */}
            {activeTab === 'plots' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                      {t('dashPlots')}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {language === 'bn'
                        ? 'সিটি জোন স্কয়ার টাউনশিপে আপনার মেম্বারশিপের অধীনে সংরক্ষিত আবাসিক ও বাণিজ্যিক প্লট।'
                        : 'Residential and commercial land units booked under your membership in CITY ZONE SQUARE townships.'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsNewPlotModalOpen(true)}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{language === 'bn' ? 'নতুন প্লট বুকিং আবেদন' : 'Book New Plot'}</span>
                    </button>
                    <button
                      onClick={onOpenMasterPlan}
                      className="px-3 py-1.5 rounded-lg bg-amber-600 text-white text-xs font-semibold hover:bg-amber-700 transition-colors"
                    >
                      Open Sector 4 Map
                    </button>
                  </div>
                </div>

                {plots.map(plot => (
                  <div key={plot.id} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                      <div>
                        <span className="text-xs font-mono text-amber-600 dark:text-amber-400 font-semibold">
                          Sector 4 · Plot #{plot.plotNo} ({plot.katha} Katha)
                        </span>
                        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                          {plot.projectName}
                        </h3>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => setDeedModalOpen(true)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-700 text-xs font-semibold hover:bg-emerald-500/20"
                        >
                          {language === 'bn' ? 'বায়না দলিল' : 'Bayna Deed'}
                        </button>
                        <button
                          onClick={() => setTransferModalOpen(true)}
                          className="px-3 py-1.5 rounded-lg bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-300 dark:border-indigo-700 text-xs font-semibold hover:bg-indigo-500/20"
                        >
                          {language === 'bn' ? 'হস্তান্তর আবেদন' : 'Transfer / Resale'}
                        </button>
                        <button
                          onClick={() => handleOpenCertificate('plot_allotment')}
                          className="px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-700 text-xs font-semibold hover:bg-amber-500/20"
                        >
                          {language === 'bn' ? 'বরাদ্দপত্র' : 'Allotment Letter'}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                      <div>
                        <span className="text-slate-400 block">Facing:</span>
                        <strong>{plot.facing}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Total Plot Price:</span>
                        <strong className="font-mono">{formatBDT(plot.totalCost, language)}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Amount Paid:</span>
                        <strong className="font-mono text-emerald-600 dark:text-emerald-400">{formatBDT(plot.paidAmount, language)}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Remaining Due:</span>
                        <strong className="font-mono text-amber-600 dark:text-amber-400">{formatBDT(plot.totalCost - plot.paidAmount, language)}</strong>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span>CS, SA, RS, BS Mutation Chain Verified & AC Land Vetted</span>
                      </div>
                      <span className="font-mono text-slate-500">Deed No: {plot.allotmentLetterNo}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: PLOT 3D & ELEVATION VISUALIZER */}
            {activeTab === 'plot_visualizer' && (
              <PlotVisualizerView user={user} plot={activePlot} language={language} />
            )}

            {/* TAB: HOTEL SHARES */}
            {activeTab === 'shares' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    {t('dashShares')}
                  </h2>
                  <p className="text-xs text-slate-500">
                    Fractional resort unit shares with perpetual deed ownership and monthly profit distribution.
                  </p>
                </div>

                {shares.map(share => (
                  <div key={share.id} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                      <div>
                        <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                          Shares: {share.shareNumbers.join(', ')} ({share.shareUnits} Units)
                        </span>
                        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                          {share.projectName}
                        </h3>
                      </div>
                      <button
                        onClick={() => handleOpenCertificate('hotel_share')}
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-700 text-xs font-semibold hover:bg-emerald-500/20"
                      >
                        Official Share Certificate
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                      <div>
                        <span className="text-slate-400 block">Total Investment:</span>
                        <strong className="font-mono">{formatBDT(share.totalInvestment, language)}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Monthly Profit Disbursed:</span>
                        <strong className="font-mono text-emerald-600 dark:text-emerald-400">+{formatBDT(share.monthlyDividendAmount, language)} / mo</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Total Profit Earned:</span>
                        <strong className="font-mono text-indigo-600 dark:text-indigo-400">{formatBDT(share.totalDividendsEarned, language)}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Annual Yield (ROI):</span>
                        <strong className="font-mono text-emerald-600 font-bold">{share.annualRoiPercentage}% p.a.</strong>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs flex items-center justify-between">
                      <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>7 Days Complimentary VIP Family Vacation Stay Active for 2026</span>
                      </div>
                      <span className="font-mono text-emerald-700 dark:text-emerald-300 font-semibold">Certificate: {share.certificateNo}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: 7-DAY ANNUAL RESORT STAY BOOKING */}
            {activeTab === 'vacation' && (
              <VacationBookingView user={user} shares={shares} language={language} />
            )}

            {/* TAB: SITE PROGRESS & DRONE UPDATES */}
            {activeTab === 'site_progress' && (
              <SiteProgressView user={user} plot={activePlot} language={language} />
            )}

            {/* TAB: INSTALLMENTS & PAY */}
            {activeTab === 'installments' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                      {t('installmentsTitle')}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {t('installmentsSubtitle')}
                    </p>
                  </div>
                  <button
                    onClick={() => handleOpenPayment()}
                    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Pay Next Installment</span>
                  </button>
                </div>

                {/* Installments Table */}
                <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase font-semibold">
                        <tr>
                          <th className="p-3.5">{t('thInstallmentNo')}</th>
                          <th className="p-3.5">{t('thDueDate')}</th>
                          <th className="p-3.5">{t('thAmount')}</th>
                          <th className="p-3.5">{t('thStatus')}</th>
                          <th className="p-3.5 text-right">{t('thAction')}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {installments.map(inst => (
                          <tr key={inst.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                            <td className="p-3.5 font-medium text-slate-900 dark:text-white">
                              {inst.title}
                            </td>
                            <td className="p-3.5 font-mono text-slate-600 dark:text-slate-300">
                              {inst.dueDate}
                            </td>
                            <td className="p-3.5 font-mono font-bold text-slate-900 dark:text-white">
                              {formatBDT(inst.amount, language)}
                            </td>
                            <td className="p-3.5">
                              {inst.status === 'paid' ? (
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  {t('statusPaid')}
                                </span>
                              ) : inst.status === 'due' ? (
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400">
                                  <Clock className="w-3.5 h-3.5" />
                                  {t('statusDue')}
                                </span>
                              ) : (
                                <span className="text-[11px] font-medium text-slate-400">
                                  {t('statusUpcoming')}
                                </span>
                              )}
                            </td>
                            <td className="p-3.5 text-right">
                              {inst.status === 'paid' ? (
                                <button
                                  onClick={() => {
                                    setSelectedInstallmentForReceipt(inst);
                                    setReceiptModalOpen(true);
                                  }}
                                  className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold font-mono transition-colors flex items-center gap-1 ml-auto"
                                >
                                  <FileText className="w-3 h-3 text-emerald-600" />
                                  <span>{inst.receiptNo || 'MR Receipt'}</span>
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleOpenPayment(inst)}
                                  className="px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold transition-colors shadow-xs"
                                >
                                  {t('btnPayOnline')}
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: DEPOSIT SLIP UPLOAD */}
            {activeTab === 'slip_upload' && (
              <DepositSlipUploadView
                user={user}
                installments={installments}
                language={language}
              />
            )}

            {/* TAB: DIVIDENDS & PAYOUT MANAGER */}
            {activeTab === 'dividends' && (
              <DividendManagerView
                user={user}
                shares={shares}
                transactions={transactions}
                language={language}
                onRefreshData={onRefreshData}
              />
            )}

            {/* TAB: MEMBER-TO-MEMBER TRANSFER */}
            {activeTab === 'member_transfer' && (
              <MemberTransferView
                user={user}
                language={language}
                onRefreshData={onRefreshData}
              />
            )}

            {/* TAB: LEDGER & PASSBOOK */}
            {activeTab === 'ledger' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    {t('dashTransactions')}
                  </h2>
                  <p className="text-xs text-slate-500">
                    Real-time chronological passbook of installment debits, hotel dividend credits, and referral bonuses.
                  </p>
                </div>

                <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase font-semibold">
                        <tr>
                          <th className="p-3.5">Date</th>
                          <th className="p-3.5">Transaction Description</th>
                          <th className="p-3.5">Method / Channel</th>
                          <th className="p-3.5">Ref / TxID</th>
                          <th className="p-3.5 text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {transactions.map(tx => (
                          <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                            <td className="p-3.5 font-mono text-slate-600 dark:text-slate-400">
                              {tx.date}
                            </td>
                            <td className="p-3.5 font-medium text-slate-900 dark:text-white">
                              {language === 'bn' ? tx.titleBn : tx.title}
                            </td>
                            <td className="p-3.5 text-slate-600 dark:text-slate-300">
                              {tx.method}
                            </td>
                            <td className="p-3.5 font-mono text-slate-500">
                              {tx.referenceNo}
                            </td>
                            <td className="p-3.5 text-right font-mono font-bold">
                              {tx.type === 'credit' ? (
                                <span className="text-emerald-600 dark:text-emerald-400">
                                  +{formatBDT(tx.amount, language)}
                                </span>
                              ) : (
                                <span className="text-rose-600 dark:text-rose-400">
                                  -{formatBDT(tx.amount, language)}
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: DIGITAL CERTIFICATES */}
            {activeTab === 'certificates' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    {t('docsTitle')}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {t('docsSubtitle')}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Certificate 1: Plot Allotment */}
                  <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 mb-3">
                        <Award className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        Certificate of Plot Allotment
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Official allotment certificate for Sector 4, Plot #142 (5 Katha), City R Mega Town Purbachal.
                      </p>
                      <div className="mt-3 text-[11px] font-mono text-slate-400">
                        Ref: {activePlot?.allotmentLetterNo}
                      </div>
                    </div>

                    <button
                      onClick={() => handleOpenCertificate('plot_allotment')}
                      className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <span>{t('btnViewDoc')}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Certificate 2: Hotel Share */}
                  <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 mb-3">
                        <Hotel className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        Resort Share Ownership Deed
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Fractional ownership deed for Units #RB-204 & #RB-205, City Royal Bay Hotel & Suites Cox's Bazar.
                      </p>
                      <div className="mt-3 text-[11px] font-mono text-slate-400">
                        Certificate: {activeShare?.certificateNo}
                      </div>
                    </div>

                    <button
                      onClick={() => handleOpenCertificate('hotel_share')}
                      className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <span>{t('btnViewDoc')}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Certificate 3: Registered Bayna Deed */}
                  <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4 md:col-span-2">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 mb-3">
                        <Scale className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {language === 'bn' ? 'রেজিস্ট্রিকৃত চূড়ান্ত বায়না চুক্তিপত্র দলিল' : 'Registered Bayna Deed of Agreement'}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        {language === 'bn'
                          ? '১০০০ টাকার নন-জুডিশিয়াল স্ট্যাম্পে সরকারের রেজিস্ট্রেশন আইন অনুযায়ী উভয় পক্ষের স্বাক্ষরিত চুক্তিপত্র।'
                          : 'Official legal agreement executed on Non-Judicial Stamped paper under Registration Act 1908.'}
                      </p>
                      <div className="mt-3 text-[11px] font-mono text-slate-400">
                        Deed Ref: DEED-CSBD-{activePlot?.plotNo}-2024 · Sub-Registry Office Rupganj
                      </div>
                    </div>

                    <button
                      onClick={() => setDeedModalOpen(true)}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <span>{language === 'bn' ? 'সম্পূর্ণ স্ট্যাম্প দলিল দেখুন' : 'View Full Stamped Deed'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: KHATIAN & MUTATION RECORDS VAULT */}
            {activeTab === 'khatian_vault' && (
              <KhatianVaultView user={user} plot={activePlot} language={language} />
            )}

            {/* TAB: NBR INCOME TAX CERTIFICATE */}
            {activeTab === 'tax_certificate' && (
              <TaxCertificateView
                user={user}
                plots={plots}
                shares={shares}
                language={language}
              />
            )}

            {/* TAB: ANALYTICS & YIELD */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    Investment Growth & Cashflow Analytics
                  </h2>
                  <p className="text-xs text-slate-500">
                    5-year capital appreciation projection and monthly dividend yields.
                  </p>
                </div>

                {/* Visual Chart Card */}
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Portfolio Valuation Trajectory (BDT)
                  </h3>

                  {/* Simulated SVG Area Chart */}
                  <div className="h-48 w-full flex items-end gap-3 pt-6 pb-2 px-2 border-b border-slate-100 dark:border-slate-800">
                    {[
                      { year: '2024 (Purchase)', val: '৳47.0 Lac', height: '40%' },
                      { year: '2025 (Current)', val: '৳54.5 Lac', height: '52%' },
                      { year: '2026 (Dev)', val: '৳64.0 Lac', height: '65%' },
                      { year: '2027 (Handover)', val: '৳78.0 Lac', height: '82%' },
                      { year: '2028 (Mature)', val: '৳95.0 Lac', height: '100%' }
                    ].map((bar, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                        <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          {bar.val}
                        </span>
                        <div
                          className="w-full rounded-t-lg bg-gradient-to-t from-amber-600 to-amber-400 group-hover:from-amber-500 group-hover:to-amber-300 transition-all duration-300"
                          style={{ height: bar.height }}
                        />
                        <span className="text-[10px] text-slate-500 font-mono">
                          {bar.year}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Average Annual Capital Gain: +18.2%</span>
                    <span>Projected 5-Yr Net Gain: +৳48,00,000</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: REFERRAL & NETWORK */}
            {activeTab === 'affiliate' && (
              <ReferralProgramView
                user={user}
                language={language}
                onNavigateToTree={() => setActiveTab('referral_tree')}
              />
            )}

            {/* TAB: GENERATION TREE & TEAM */}
            {activeTab === 'referral_tree' && (
              <ReferralTreeView
                user={user}
                language={language}
                onNavigateToProgram={() => setActiveTab('affiliate')}
              />
            )}

            {/* TAB: SUPPORT DESK */}
            {activeTab === 'support' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    {t('dashSupport')}
                  </h2>
                  <p className="text-xs text-slate-500">
                    Submit customer requests for deed certified copies, nominee changes, or payment receipts.
                  </p>
                </div>

                {/* Open New Ticket */}
                <form onSubmit={handleCreateTicket} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Submit Inquiry / Support Request
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Subject / বিষয়
                      </label>
                      <input
                        type="text"
                        required
                        value={newTicketSubject}
                        onChange={e => setNewTicketSubject(e.target.value)}
                        placeholder="e.g. Request for Mutation Porcha Extract"
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Category
                      </label>
                      <select
                        value={newTicketCategory}
                        onChange={e => setNewTicketCategory(e.target.value as any)}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      >
                        <option value="mutation">Mutation & Legal Clearance</option>
                        <option value="payment">Payment & Bank Verification</option>
                        <option value="possession">Possession & Handover</option>
                        <option value="dividend">Hotel Dividend Disbursal</option>
                        <option value="general">General Support</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Message Details
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={newTicketMessage}
                      onChange={e => setNewTicketMessage(e.target.value)}
                      placeholder="Explain your inquiry in detail..."
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingTicket}
                    className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-xs"
                  >
                    Submit Ticket
                  </button>
                </form>

                {/* Existing Tickets */}
                <div className="space-y-4">
                  {tickets.map(tkt => (
                    <div key={tkt.id} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs text-amber-600 font-bold">{tkt.ticketNo}</span>
                        <span className="text-[11px] font-semibold uppercase text-emerald-600">{tkt.status}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{tkt.subject}</h4>
                      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                        {tkt.messages.map((m, idx) => (
                          <div key={idx} className={`p-3 rounded-xl text-xs ${m.sender === 'support' ? 'bg-amber-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200' : 'bg-slate-50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300'}`}>
                            <div className="flex justify-between text-[11px] font-semibold mb-1 text-slate-500">
                              <span>{m.senderName}</span>
                              <span className="font-mono">{m.timestamp}</span>
                            </div>
                            <p>{m.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: SECURITY, PASSWORD & TRANSACTION PIN */}
            {activeTab === 'security' && (
              <TransactionPinSecurityView user={user} language={language} />
            )}

          </div>

        </div>
      </div>

      {/* Payment Gateway Modal */}
      <PaymentGatewayModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        installment={selectedInstallmentForPay}
        language={language}
        onPaymentSuccess={() => {
          onRefreshData();
        }}
      />

      {/* Certificate Viewer Modal */}
      <CertificateViewerModal
        isOpen={certModalOpen}
        onClose={() => setCertModalOpen(false)}
        type={certType}
        user={user}
        plot={activePlot}
        share={activeShare}
        language={language}
      />

      {/* Official Money Receipt Modal */}
      {selectedInstallmentForReceipt && (
        <MoneyReceiptModal
          isOpen={receiptModalOpen}
          onClose={() => setReceiptModalOpen(false)}
          installment={selectedInstallmentForReceipt}
          user={user}
          language={language}
        />
      )}

      {/* Plot Transfer & NOC Modal */}
      {activePlot && (
        <PlotTransferModal
          isOpen={transferModalOpen}
          onClose={() => setTransferModalOpen(false)}
          plot={activePlot}
          user={user}
          language={language}
          onSuccess={() => {
            onRefreshData();
          }}
        />
      )}

      {/* New Plot Booking Application Modal */}
      {isNewPlotModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {language === 'bn' ? 'নতুন প্লট বুকিং আবেদন' : 'Apply for New Plot Booking'}
                  </h3>
                  <span className="text-[11px] text-slate-500">
                    CITY ZONE SQUARE Corporate Land Portfolio
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsNewPlotModalOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewPlotBooking} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  {language === 'bn' ? 'প্রকল্প নির্বাচন করুন' : 'Select Project'} *
                </label>
                <select
                  value={newPlotProject}
                  onChange={e => setNewPlotProject(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="City R Mega Town - Purbachal">City R Mega Town (Purbachal Expressway)</option>
                  <option value="Mawa Expressway Smart City">Mawa Expressway Smart City (Padma Bridge Enclave)</option>
                  <option value="Marine Drive Coastal Enclave">Marine Drive Coastal Residential Estate</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    {language === 'bn' ? 'প্লটের আকার (কাঠা)' : 'Plot Size (Katha)'} *
                  </label>
                  <select
                    value={newPlotKatha}
                    onChange={e => setNewPlotKatha(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value={3}>3 Katha</option>
                    <option value={5}>5 Katha</option>
                    <option value={7.5}>7.5 Katha</option>
                    <option value={10}>10 Katha (Commercial/Estate)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    {language === 'bn' ? 'প্লটের দিক' : 'Facing / Location'} *
                  </label>
                  <select
                    value={newPlotFacing}
                    onChange={e => setNewPlotFacing(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="South Facing (Park View)">South Facing (Park View)</option>
                    <option value="North Facing (60ft Road)">North Facing (60ft Road)</option>
                    <option value="Lakeside Avenue Corner">Lakeside Avenue Corner</option>
                    <option value="East Facing (Corner Plot)">East Facing (Corner Plot)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  {language === 'bn' ? 'প্রাথমিক ডাউনপেমেন্ট (টাকা)' : 'Downpayment Amount (BDT)'} *
                </label>
                <input
                  type="number"
                  min={100000}
                  step={50000}
                  value={newPlotDownpayment}
                  onChange={e => setNewPlotDownpayment(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  required
                />
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1 text-slate-600 dark:text-slate-300">
                <div className="flex justify-between">
                  <span>Estimated Total Price:</span>
                  <strong className="font-mono text-slate-900 dark:text-white">
                    ৳{((newPlotProject.includes('Mawa') ? 550000 : 700000) * newPlotKatha).toLocaleString()}
                  </strong>
                </div>
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                  <span>Booking Downpayment:</span>
                  <strong className="font-mono">৳{newPlotDownpayment.toLocaleString()}</strong>
                </div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Installment Plan:</span>
                  <span>48 Equal Monthly Installments</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsNewPlotModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 font-medium"
                >
                  {language === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xs transition-colors"
                >
                  {language === 'bn' ? 'বুকিং আবেদন নিশ্চিত করুন' : 'Confirm Plot Booking'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Registered Bayna Deed Modal */}
      {activePlot && (
        <RegisteredDeedModal
          isOpen={deedModalOpen}
          onClose={() => setDeedModalOpen(false)}
          plot={activePlot}
          user={user}
          language={language}
        />
      )}

    </div>
  );
};
