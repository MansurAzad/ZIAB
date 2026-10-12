import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  MapPin,
  Hotel,
  Network,
  CreditCard,
  FileCheck2,
  Calendar,
  Bell,
  HelpCircle,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  Search,
  Filter,
  Plus,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Download,
  Printer,
  Sparkles,
  Phone,
  Mail,
  Building2,
  Car,
  Gift,
  Award,
  Wallet,
  Scale,
  RefreshCw,
  Eye,
  Check,
  X,
  UserCheck,
  UserX,
  KeyRound,
  FileText,
  Send,
  Trash2,
  ChevronRight,
  Edit2,
  MessageSquare,
  PlusCircle
} from 'lucide-react';
import { User, Language, PlotBooking, ShareInvestment, InstallmentRecord, TransactionRecord, SupportTicket, DoubleProfitPlan } from '../../types';
import { AdminInvestor, AdminPlotItem, AdminDepositSlip, AdminPlotTransferRequest, AdminSiteTourBooking, AdminDividendRound, AdminAuditLog } from '../../types/admin';
import { formatBDT } from '../../services/i18n';
import { StorageService } from '../../services/storage';
import {
  AddInvestorModal,
  EditInvestorModal,
  AddPlotModal,
  EditPlotModal,
  AddManualSlipModal,
  AddTourModal,
  ReplyTicketModal,
  AddDoublePlanModal
} from './AdminModals';

interface AdminDashboardProps {
  currentUser: User;
  language: Language;
  onLogout: () => void;
  onSwitchToUserPortal: () => void;
  onSwitchToPublic: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentUser,
  language,
  onLogout,
  onSwitchToUserPortal,
  onSwitchToPublic
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'investors' | 'plots' | 'double_profit' | 'shares' | 'mlm' | 'accounts' | 'site_tours' | 'notices' | 'support' | 'audit'
  >('overview');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // 12-Month Double Profit Schemes & Monthly Installment Disbursement
  const [doubleProfitPlans, setDoubleProfitPlans] = useState<DoubleProfitPlan[]>(() => {
    return StorageService.getDoubleProfitPlans();
  });
  const [isAddDoublePlanModalOpen, setIsAddDoublePlanModalOpen] = useState(false);

  const handleDisburseInstallment = (planId: string) => {
    const res = StorageService.disburseDoubleProfitInstallment(planId);
    if (res && res.success) {
      setDoubleProfitPlans(StorageService.getDoubleProfitPlans());
      showToast(res.message);
    } else {
      showToast(res?.message || 'Failed to disburse installment.');
    }
  };

  const handleDeleteDoublePlan = (planId: string) => {
    if (window.confirm('Are you sure you want to delete this Double Profit Plan?')) {
      StorageService.deleteDoubleProfitPlan(planId);
      setDoubleProfitPlans(StorageService.getDoubleProfitPlans());
      showToast('Double Profit Plan deleted successfully.');
    }
  };

  const handleCreateDoublePlan = (plan: Partial<DoubleProfitPlan>) => {
    StorageService.createDoubleProfitPlan(plan);
    setDoubleProfitPlans(StorageService.getDoubleProfitPlans());
    showToast('New 12-Month Double Profit Plan enrolled successfully!');
    setIsAddDoublePlanModalOpen(false);
  };

  // 1. INVESTORS CRM DATA
  const [investors, setInvestors] = useState<AdminInvestor[]>([
    {
      id: 'usr-ctg-8842',
      username: 'Ziabulctg1',
      fullName: 'Ziabul Hoque Chowdhury',
      fullNameBn: 'জিয়াবুল হক চৌধুরী',
      phone: '+880 1819-745239',
      email: 'ziabul.ctg@gmail.com',
      memberId: 'CSBD-CTG-8842',
      branch: 'Chattogram Office (Salma Centre)',
      rank: 'Gold Senior Associate',
      kycStatus: 'verified',
      nidNo: '1984 1592 7831 44',
      totalInvested: 4700000,
      commissionBalance: 25000,
      dividendBalance: 74000,
      status: 'active',
      joinedDate: '15 March 2024',
      nomineeName: 'Mrs. Taslima Ziabul',
      nomineeRelation: 'Spouse'
    },
    {
      id: 'usr-ctg-101',
      username: 'anwar_ctg',
      fullName: 'Md. Anwar Hossain',
      fullNameBn: 'মোঃ আনোয়ার হোসেন',
      phone: '+880 1819-334455',
      email: 'anwar.ctg@yahoo.com',
      memberId: 'CSBD-CTG-9021',
      branch: 'Chattogram Office',
      rank: 'Associate Member',
      kycStatus: 'verified',
      nidNo: '1979 4819 0012 33',
      totalInvested: 3500000,
      commissionBalance: 15000,
      dividendBalance: 32000,
      status: 'active',
      joinedDate: '15 August 2026',
      nomineeName: 'Salma Anwar',
      nomineeRelation: 'Spouse'
    },
    {
      id: 'usr-dhk-102',
      username: 'tanvir_eng',
      fullName: 'Engr. Tanvir Ahmed Chowdhury',
      fullNameBn: 'প্রকৌ. তানভীর আহমেদ চৌধুরী',
      phone: '+880 1711-889900',
      email: 'tanvir.engr@gmail.com',
      memberId: 'CSBD-DHK-4421',
      branch: 'Dhaka Head Office (Mirpur)',
      rank: 'Executive Associate',
      kycStatus: 'pending',
      nidNo: '1988 5591 2289 10',
      totalInvested: 600000,
      commissionBalance: 8000,
      dividendBalance: 18500,
      status: 'active',
      joinedDate: '04 September 2026',
      nomineeName: 'Farhana Tanvir',
      nomineeRelation: 'Spouse'
    },
    {
      id: 'usr-ctg-103',
      username: 'dr_farhana',
      fullName: 'Dr. Farhana Yasmin',
      fullNameBn: 'ডা. ফারহানা ইয়াসমিন',
      phone: '+880 1912-776655',
      email: 'farhana.doc@gmail.com',
      memberId: 'CSBD-CTG-6612',
      branch: 'Chattogram Office',
      rank: 'Associate Member',
      kycStatus: 'verified',
      nidNo: '1991 3329 8812 40',
      totalInvested: 2500000,
      commissionBalance: 12000,
      dividendBalance: 45000,
      status: 'active',
      joinedDate: '28 September 2026',
      nomineeName: 'Kabir Yasmin',
      nomineeRelation: 'Brother'
    },
    {
      id: 'usr-syl-104',
      username: 'mashiur_kazi',
      fullName: 'Kazi Mashiur Rahman',
      fullNameBn: 'কাজী মশিয়ুর রহমান',
      phone: '+880 1611-445566',
      email: 'mashiur.kazi@gmail.com',
      memberId: 'CSBD-DHK-7789',
      branch: 'Sylhet Regional Branch',
      rank: 'Associate Member',
      kycStatus: 'pending',
      nidNo: '1982 7712 9940 11',
      totalInvested: 4800000,
      commissionBalance: 0,
      dividendBalance: 0,
      status: 'active',
      joinedDate: '10 October 2026',
      nomineeName: 'Nasreen Kazi',
      nomineeRelation: 'Spouse'
    }
  ]);

  const [selectedInvestorForModal, setSelectedInvestorForModal] = useState<AdminInvestor | null>(null);
  const [investorSearchQuery, setInvestorSearchQuery] = useState('');
  const [investorFilterStatus, setInvestorFilterStatus] = useState<'all' | 'verified' | 'pending' | 'suspended'>('all');

  // 2. PLOTS MASTER INVENTORY DATA
  const [plots, setPlots] = useState<AdminPlotItem[]>([
    {
      id: 'plot-142',
      projectName: 'City R Mega Town - Purbachal',
      sector: 'Sector 4',
      roadNo: 'Road #12 (60ft Avenue)',
      plotNo: '142',
      katha: 5,
      facing: 'South-East Corner',
      totalCost: 3500000,
      paidAmount: 2100000,
      allotteeMemberId: 'CSBD-CTG-8842',
      allotteeName: 'Ziabul Hoque Chowdhury',
      allotteeUsername: 'Ziabulctg1',
      status: 'allotted',
      baynaStatus: 'registered',
      allotmentLetterNo: 'CSBD/AL/PUR/2024/0842'
    },
    {
      id: 'plot-168',
      projectName: 'City R Mega Town - Purbachal',
      sector: 'Sector 4',
      roadNo: 'Road #8',
      plotNo: '168',
      katha: 3,
      facing: 'North Facing',
      totalCost: 2100000,
      paidAmount: 700000,
      allotteeMemberId: 'CSBD-CTG-9021',
      allotteeName: 'Md. Anwar Hossain',
      allotteeUsername: 'anwar_ctg',
      status: 'booked',
      baynaStatus: 'registered',
      allotmentLetterNo: 'CSBD/AL/PUR/2026/1102'
    },
    {
      id: 'plot-92',
      projectName: 'City R Mega Town - Purbachal',
      sector: 'Sector 2',
      roadNo: 'Road #3 (Lakeview)',
      plotNo: '92',
      katha: 5,
      facing: 'South Lakeview',
      totalCost: 4800000,
      paidAmount: 1200000,
      allotteeMemberId: 'CSBD-DHK-7789',
      allotteeName: 'Kazi Mashiur Rahman',
      allotteeUsername: 'mashiur_kazi',
      status: 'booked',
      baynaStatus: 'pending',
      allotmentLetterNo: 'CSBD/AL/PUR/2026/1209'
    },
    {
      id: 'plot-maw-21',
      projectName: 'Mawa Project 1 (Expressway)',
      sector: 'Phase 1',
      roadNo: 'Avenue 1',
      plotNo: '21',
      katha: 3,
      facing: 'East Facing',
      totalCost: 2200000,
      paidAmount: 500000,
      status: 'available',
      baynaStatus: 'n/a'
    },
    {
      id: 'plot-maw-22',
      projectName: 'Mawa Project 1 (Expressway)',
      sector: 'Phase 1',
      roadNo: 'Avenue 1',
      plotNo: '22',
      katha: 3,
      facing: 'East Facing',
      totalCost: 2200000,
      paidAmount: 0,
      status: 'available',
      baynaStatus: 'n/a'
    }
  ]);

  // 3. PLOT TRANSFER / RESALE NOC REQUESTS
  const [transferRequests, setTransferRequests] = useState<AdminPlotTransferRequest[]>([
    {
      id: 'trf-req-001',
      requestNo: 'NOC-2026-084',
      originalMemberUsername: 'Ziabulctg1',
      originalMemberName: 'Ziabul Hoque Chowdhury',
      plotNo: 'Plot #142 (Sector 4, Purbachal)',
      projectName: 'City R Mega Town - Purbachal',
      buyerName: 'Al-Haj Sirajul Islam',
      buyerPhone: '+880 1819-223344',
      buyerNid: '1970 8821 4490 22',
      transferFee: 87500,
      nocStatus: 'under_review',
      appliedDate: '08 October 2026'
    }
  ]);

  // 4. DEPOSIT SLIPS PENDING APPROVAL
  const [depositSlips, setDepositSlips] = useState<AdminDepositSlip[]>([
    {
      id: 'slip-101',
      slipNo: 'SLIP-PUR-8821',
      memberUsername: 'Ziabulctg1',
      memberName: 'Ziabul Hoque Chowdhury',
      memberId: 'CSBD-CTG-8842',
      bookingId: 'plot-purbachal-142',
      projectName: 'City R Mega Town - Purbachal',
      bankName: 'Islami Bank Bangladesh PLC',
      branchName: 'Agrabad Commercial Branch, Ctg',
      amount: 35000,
      depositDate: '2026-10-09',
      transactionId: 'IBBL-DEP-9940182',
      slipImageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&auto=format&fit=crop&q=80',
      notes: 'October 2026 Monthly Plot Installment #25 deposit pay-slip',
      status: 'pending',
      submittedAt: 'Yesterday 04:30 PM'
    },
    {
      id: 'slip-102',
      slipNo: 'SLIP-PUR-8822',
      memberUsername: 'anwar_ctg',
      memberName: 'Md. Anwar Hossain',
      memberId: 'CSBD-CTG-9021',
      bookingId: 'plot-purbachal-168',
      projectName: 'City R Mega Town - Purbachal',
      bankName: 'The City Bank Limited',
      branchName: 'GEC Circle Branch, Ctg',
      amount: 25000,
      depositDate: '2026-10-08',
      transactionId: 'CBL-FT-441029',
      slipImageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&auto=format&fit=crop&q=80',
      notes: 'Installment #03 slip attached',
      status: 'pending',
      submittedAt: '08 Oct 2026'
    }
  ]);

  // 5. SITE TOUR BOOKINGS (From public site)
  const [siteTours, setSiteTours] = useState<AdminSiteTourBooking[]>([
    {
      id: 'tour-01',
      clientName: 'Dr. Shahabuddin Mahmud',
      phone: '+880 1711-234567',
      preferredDate: 'Friday, 17 Oct 2026',
      timeSlot: 'Morning (09:30 AM)',
      projectInterested: 'City R Mega Town Purbachal',
      pickupLocation: 'Mirpur-10 Circle (City Square Head Office)',
      guestsCount: 4,
      assignedBus: 'AC Microbus #01 (Dhaka Metro-Cha 11-8921)',
      coordinator: 'Md. Rakibul Hasan (Senior Sales Executive)',
      status: 'confirmed',
      createdAt: '09 Oct 2026'
    },
    {
      id: 'tour-02',
      clientName: 'Kazi Mahbubul Alam (Businessman)',
      phone: '+880 1819-998877',
      preferredDate: 'Saturday, 18 Oct 2026',
      timeSlot: 'Morning (09:30 AM)',
      projectInterested: 'Mawa Project 1 (Expressway)',
      pickupLocation: 'Dhanmondi-27 (Sobhanbagh Masjid)',
      guestsCount: 3,
      status: 'pending',
      createdAt: '10 Oct 2026'
    },
    {
      id: 'tour-03',
      clientName: 'Farhana Afroze (Expatriate returning)',
      phone: '+880 1912-334455',
      preferredDate: 'Friday, 24 Oct 2026',
      timeSlot: 'Morning (09:30 AM)',
      projectInterested: 'City Royal Bay Kuakata (Resort Tour)',
      pickupLocation: 'Chattogram Office (Salma Centre)',
      guestsCount: 2,
      status: 'pending',
      createdAt: '10 Oct 2026'
    }
  ]);

  // 6. DIVIDEND DISTRIBUTION ROUNDS
  const [dividendRounds, setDividendRounds] = useState<AdminDividendRound[]>([
    {
      id: 'div-sep-2026',
      monthYear: 'September 2026',
      ratePerSuite: 18500,
      ratePerDeluxe: 9500,
      totalDisbursed: 1480000,
      investorsCount: 48,
      disbursedDate: '01 October 2026',
      status: 'completed'
    },
    {
      id: 'div-aug-2026',
      monthYear: 'August 2026',
      ratePerSuite: 18500,
      ratePerDeluxe: 9500,
      totalDisbursed: 1480000,
      investorsCount: 48,
      disbursedDate: '01 September 2026',
      status: 'completed'
    }
  ]);

  // New Dividend Disbursement Modal state
  const [disburseMonth, setDisburseMonth] = useState('October 2026');
  const [disburseSuiteRate, setDisburseSuiteRate] = useState(18500);
  const [isDisbursing, setIsDisbursing] = useState(false);

  // 7. SYSTEM AUDIT LOGS
  const [auditLogs, setAuditLogs] = useState<AdminAuditLog[]>([
    {
      id: 'log-01',
      timestamp: 'Today, 10:45 AM',
      adminUser: 'Ripon Hossain (Super Admin)',
      action: 'APPROVE_DEPOSIT_SLIP',
      target: 'Deposit Slip #SLIP-PUR-8820 (Md. Anwar)',
      details: 'Credited ৳35,000 to Plot #168 Installment #02. Official Money Receipt #MR-2026-10-881 generated.',
      status: 'success'
    },
    {
      id: 'log-02',
      timestamp: 'Yesterday, 05:20 PM',
      adminUser: 'Ripon Hossain (Super Admin)',
      action: 'PROMOTED_MLM_RANK',
      target: 'Ziabulctg1 (CSBD-CTG-8842)',
      details: 'Rank upgraded to Gold Senior Associate upon reaching ৳40 Lac team sales volume milestone.',
      status: 'info'
    },
    {
      id: 'log-03',
      timestamp: '08 Oct 2026, 02:15 PM',
      adminUser: 'Ripon Hossain (Super Admin)',
      action: 'NOC_REQUEST_LOGGED',
      target: 'NOC-2026-084 for Plot #142',
      details: 'Plot resale and ownership transfer application received from Ziabul Hoque Chowdhury.',
      status: 'warning'
    }
  ]);

  // 8. OFFICIAL NOTICES CMS
  const [notices, setNotices] = useState([
    {
      id: 'ntc-01',
      title: 'পূর্বাচল সিটি আর মেগা টাউন ৪র্থ সেক্টরের প্লট নম্বর লটারী ও বায়না রেজিস্ট্রেশন নোটিশ',
      category: 'Plot Draw & Allotment',
      date: '০৮ অক্টোবর ২০২৬',
      priority: 'high',
      status: 'published'
    },
    {
      id: 'ntc-02',
      title: 'সিটি রয়্যাল বে হোটেল কুয়াকাটার ৩য় ত্রৈমাসিক লভ্যাংশ বণ্টন সম্পন্ন',
      category: 'Dividend Distribution',
      date: '০১ অক্টোবর ২০২৬',
      priority: 'normal',
      status: 'published'
    },
    {
      id: 'ntc-03',
      title: 'শুক্রবার ও শনিবার পারিবারিক সাইট ভিজিটের জন্য এসি বাস পিক-আপ শিডিউল',
      category: 'Site Visit Schedule',
      date: '২৬ সেপ্টেম্বর ২০২৬',
      priority: 'normal',
      status: 'published'
    }
  ]);

  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeCategory, setNewNoticeCategory] = useState('Plot Allotment');

  // Quick Action Handlers
  const handleApproveSlip = (slip: AdminDepositSlip) => {
    setDepositSlips(prev => prev.map(s => s.id === slip.id ? { ...s, status: 'approved' } : s));
    
    // Add to audit logs
    const newLog: AdminAuditLog = {
      id: 'log-' + Date.now(),
      timestamp: 'Just Now',
      adminUser: currentUser.fullName,
      action: 'APPROVE_DEPOSIT_SLIP',
      target: `${slip.slipNo} (${slip.memberName})`,
      details: `Approved ৳${slip.amount.toLocaleString()} for ${slip.bookingId}. Official Money Receipt generated.`,
      status: 'success'
    };
    setAuditLogs(prev => [newLog, ...prev]);
    showToast(`Deposit Slip #${slip.slipNo} approved successfully! Installment updated.`);
  };

  const handleRejectSlip = (slip: AdminDepositSlip) => {
    setDepositSlips(prev => prev.map(s => s.id === slip.id ? { ...s, status: 'rejected' } : s));
    showToast(`Deposit Slip #${slip.slipNo} marked as rejected.`);
  };

  const handleApproveKYC = (investorId: string) => {
    setInvestors(prev => prev.map(inv => inv.id === investorId ? { ...inv, kycStatus: 'verified' } : inv));
    showToast('Investor KYC successfully approved & verified!');
  };

  const handleApproveTransferNOC = (reqId: string) => {
    setTransferRequests(prev => prev.map(r => r.id === reqId ? { ...r, nocStatus: 'approved' } : r));
    showToast('Plot Resale & Transfer NOC successfully approved! Official transfer deed initiated.');
  };

  const handleConfirmTour = (tourId: string) => {
    setSiteTours(prev => prev.map(t => t.id === tourId ? {
      ...t,
      status: 'confirmed',
      assignedBus: 'AC Microbus #02 (Dhaka Metro-Cha 12-4410)',
      coordinator: 'Md. Tariqul Islam (Relationship Manager)'
    } : t));
    showToast('Site tour confirmed and transport coordinator assigned!');
  };

  const handleExecuteDividendPayout = () => {
    setIsDisbursing(true);
    setTimeout(() => {
      const newRound: AdminDividendRound = {
        id: 'div-' + Date.now(),
        monthYear: disburseMonth,
        ratePerSuite: disburseSuiteRate,
        ratePerDeluxe: 9500,
        totalDisbursed: 1480000,
        investorsCount: investors.length * 12,
        disbursedDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
        status: 'completed'
      };
      setDividendRounds(prev => [newRound, ...prev]);

      // Credit investors
      setInvestors(prev => prev.map(inv => ({
        ...inv,
        dividendBalance: inv.dividendBalance + disburseSuiteRate
      })));

      setIsDisbursing(false);
      showToast(`Mass dividend payout of ৳14,80,000 for ${disburseMonth} executed successfully! All investor wallets credited.`);
    }, 1200);
  };

  const handleAddNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeTitle) return;
    const ntc = {
      id: 'ntc-' + Date.now(),
      title: newNoticeTitle,
      category: newNoticeCategory,
      date: 'আজকে ' + new Date().toLocaleDateString('bn-BD'),
      priority: 'normal',
      status: 'published'
    };
    setNotices(prev => [ntc, ...prev]);
    setNewNoticeTitle('');
    showToast('Official notice published to Notice Board successfully!');
  };

  // CRUD: Investors
  const [isAddInvestorModalOpen, setIsAddInvestorModalOpen] = useState(false);
  const [editingInvestor, setEditingInvestor] = useState<AdminInvestor | null>(null);

  const handleAddInvestor = (newInv: Omit<AdminInvestor, 'id'>) => {
    const inv: AdminInvestor = { id: 'usr-' + Date.now(), ...newInv };
    setInvestors(prev => [inv, ...prev]);
    showToast(`Investor @${inv.username} (${inv.fullName}) successfully registered in CRM!`);
  };

  const handleUpdateInvestor = (updated: AdminInvestor) => {
    setInvestors(prev => prev.map(i => i.id === updated.id ? updated : i));
    showToast(`Investor profile for ${updated.fullName} updated successfully!`);
  };

  const handleDeleteInvestor = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete/deactivate investor ${name}?`)) {
      setInvestors(prev => prev.filter(i => i.id !== id));
      showToast(`Investor ${name} has been removed from active CRM.`);
    }
  };

  // CRUD: Plots
  const [isAddPlotModalOpen, setIsAddPlotModalOpen] = useState(false);
  const [editingPlot, setEditingPlot] = useState<AdminPlotItem | null>(null);

  const handleAddPlot = (newPlot: Omit<AdminPlotItem, 'id'>) => {
    const plot: AdminPlotItem = { id: 'plot-' + Date.now(), ...newPlot };
    setPlots(prev => [plot, ...prev]);
    showToast(`Plot #${plot.plotNo} (${plot.projectName}) added to inventory!`);
  };

  const handleUpdatePlot = (updated: AdminPlotItem) => {
    setPlots(prev => prev.map(p => p.id === updated.id ? updated : p));
    showToast(`Plot #${updated.plotNo} record updated successfully!`);
  };

  const handleDeletePlot = (id: string, plotNo: string) => {
    if (window.confirm(`Remove plot #${plotNo} from inventory?`)) {
      setPlots(prev => prev.filter(p => p.id !== id));
      showToast(`Plot #${plotNo} deleted from master catalog.`);
    }
  };

  // CRUD: Slips
  const [isAddSlipModalOpen, setIsAddSlipModalOpen] = useState(false);

  const handleAddManualSlip = (slip: AdminDepositSlip) => {
    setDepositSlips(prev => [slip, ...prev]);
    showToast(`Manual deposit of ৳${slip.amount.toLocaleString()} recorded and credited!`);
  };

  const handleDeleteSlip = (id: string, slipNo: string) => {
    setDepositSlips(prev => prev.filter(s => s.id !== id));
    showToast(`Deposit Slip #${slipNo} removed.`);
  };

  // CRUD: Site Tours
  const [isAddTourModalOpen, setIsAddTourModalOpen] = useState(false);

  const handleAddTour = (tourData: Omit<AdminSiteTourBooking, 'id'>) => {
    const tour: AdminSiteTourBooking = { id: 'tour-' + Date.now(), ...tourData };
    setSiteTours(prev => [tour, ...prev]);
    showToast(`Weekend site tour for ${tour.clientName} successfully scheduled!`);
  };

  const handleDeleteTour = (id: string, clientName: string) => {
    setSiteTours(prev => prev.filter(t => t.id !== id));
    showToast(`Tour booking for ${clientName} cancelled.`);
  };

  // CRUD: Support Tickets
  const [tickets, setTickets] = useState<SupportTicket[]>(() => StorageService.getTickets());
  const [selectedTicketForReply, setSelectedTicketForReply] = useState<SupportTicket | null>(null);
  const [ticketFilterStatus, setTicketFilterStatus] = useState<'all' | 'open' | 'in_progress' | 'resolved'>('all');

  const handleReplyTicket = (ticketId: string, replyText: string) => {
    const updated = StorageService.replyTicket(ticketId, replyText, 'support', `${currentUser.fullName} (Support Admin)`);
    if (updated) {
      setTickets(StorageService.getTickets());
      showToast('Support reply sent and ticket updated!');
    }
  };

  const handleToggleTicketStatus = (ticket: SupportTicket) => {
    const newStatus = ticket.status === 'resolved' ? 'open' : 'resolved';
    StorageService.updateTicketStatus(ticket.id, newStatus);
    setTickets(StorageService.getTickets());
    showToast(`Ticket status updated to ${newStatus.toUpperCase()}`);
  };

  const handleDeleteTicket = (ticketId: string) => {
    StorageService.deleteTicket(ticketId);
    setTickets(StorageService.getTickets());
    showToast('Support ticket deleted.');
  };

  // Filtered Investors
  const filteredInvestors = investors.filter(inv => {
    const matchesSearch = inv.fullName.toLowerCase().includes(investorSearchQuery.toLowerCase()) ||
      inv.username.toLowerCase().includes(investorSearchQuery.toLowerCase()) ||
      inv.memberId.toLowerCase().includes(investorSearchQuery.toLowerCase()) ||
      inv.phone.includes(investorSearchQuery);
    const matchesStatus = investorFilterStatus === 'all' || 
      (investorFilterStatus === 'verified' && inv.kycStatus === 'verified') ||
      (investorFilterStatus === 'pending' && inv.kycStatus === 'pending') ||
      (investorFilterStatus === 'suspended' && inv.status === 'suspended');
    return matchesSearch && matchesStatus;
  });

  // Filtered Support Tickets
  const filteredTickets = tickets.filter(t => {
    if (ticketFilterStatus === 'all') return true;
    return t.status === ticketFilterStatus;
  });
  const openTicketsCount = tickets.filter(t => t.status === 'open' || t.status === 'in_progress').length;

  // KPI Calculations
  const totalRevenue = plots.reduce((acc, p) => acc + p.paidAmount, 0) + 1200000 * 3;
  const pendingSlipsCount = depositSlips.filter(s => s.status === 'pending').length;
  const pendingKycCount = investors.filter(i => i.kycStatus === 'pending').length;
  const pendingToursCount = siteTours.filter(t => t.status === 'pending').length;
  const pendingNocCount = transferRequests.filter(r => r.nocStatus === 'under_review').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col transition-colors pb-16">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 p-4 rounded-xl bg-emerald-600 text-white font-medium text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Admin Control Bar */}
      <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo & Badge */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-900/30">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-tight text-lg text-white">
                  CITY ZONE <span className="text-amber-500">SQUARE</span>
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  ADMIN 360°
                </span>
              </div>
              <span className="text-[10px] text-slate-400 block -mt-0.5">
                Central Operations, Real Estate & MLM Executive Engine
              </span>
            </div>
          </div>

          {/* Quick Switchers & Current User Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onSwitchToUserPortal}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors flex items-center gap-1.5"
              title="View as Ziabulctg1"
            >
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Investor Portal (/user)</span>
            </button>

            <button
              onClick={onSwitchToPublic}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors flex items-center gap-1.5"
            >
              <Building2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Public Website</span>
            </button>

            <div className="h-6 w-px bg-slate-800 hidden sm:block" />

            <div className="flex items-center gap-2 pl-2">
              <div className="text-right hidden md:block">
                <span className="text-xs font-bold text-white block leading-tight">
                  {currentUser.fullName}
                </span>
                <span className="text-[10px] text-amber-400 font-mono">
                  {currentUser.memberId} · Super Admin
                </span>
              </div>
              <button
                onClick={onLogout}
                className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-semibold transition-colors"
                title="Sign Out"
              >
                Sign Out
              </button>
            </div>

          </div>

        </div>
      </header>

      {/* Main Admin Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
        
        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-6 border-b border-slate-800 text-xs scrollbar-none">
          {[
            { id: 'overview', label: '360° Overview', icon: LayoutDashboard, badge: null },
            { id: 'investors', label: 'Investors & CRM', icon: Users, badge: pendingKycCount > 0 ? pendingKycCount : null },
            { id: 'plots', label: 'Plots & Land Inventory', icon: MapPin, badge: pendingNocCount > 0 ? pendingNocCount : null },
            { id: 'double_profit', label: '12-Month Double Profit (মাসিক কিস্তি)', icon: Sparkles, badge: null },
            { id: 'shares', label: 'Hotel Shares & Dividends', icon: Hotel, badge: null },
            { id: 'mlm', label: 'MLM Commission & Ranks', icon: Network, badge: null },
            { id: 'accounts', label: 'Bank Slips & Accounts', icon: CreditCard, badge: pendingSlipsCount > 0 ? pendingSlipsCount : null },
            { id: 'site_tours', label: 'Site Tour Coordination', icon: Car, badge: pendingToursCount > 0 ? pendingToursCount : null },
            { id: 'notices', label: 'Notice Board CMS', icon: Bell, badge: null },
            { id: 'support', label: 'Support Helpdesk', icon: HelpCircle, badge: openTicketsCount > 0 ? openTicketsCount : null },
            { id: 'audit', label: 'Audit Trail & Logs', icon: ShieldCheck, badge: null }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2.5 rounded-xl font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-amber-600 text-white shadow-lg shadow-amber-900/30'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-rose-500 text-white animate-pulse">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ============================================================ */}
        {/* TAB 1: 360° OVERVIEW (EXECUTIVE CONTROL ROOM) */}
        {/* ============================================================ */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            
            {/* Action Alert Bar */}
            {(pendingSlipsCount > 0 || pendingKycCount > 0 || pendingToursCount > 0 || pendingNocCount > 0) && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-amber-300 font-semibold">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Immediate Action Required:</span>
                  <div className="flex flex-wrap items-center gap-2">
                    {pendingSlipsCount > 0 && (
                      <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold">
                        {pendingSlipsCount} Pending Bank Slips
                      </span>
                    )}
                    {pendingKycCount > 0 && (
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                        {pendingKycCount} KYC Pending
                      </span>
                    )}
                    {pendingToursCount > 0 && (
                      <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 font-bold">
                        {pendingToursCount} Site Tours Unconfirmed
                      </span>
                    )}
                    {pendingNocCount > 0 && (
                      <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold">
                        {pendingNocCount} Plot Resale NOC Request
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('accounts')}
                  className="px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold transition-colors"
                >
                  Review Deposit Slips &rarr;
                </button>
              </div>
            )}

            {/* KPI Executive Summary Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
                <span className="text-[11px] font-medium text-slate-400 block">Total Collections</span>
                <span className="text-lg sm:text-xl font-extrabold text-emerald-400 font-mono block mt-1">
                  ৳৪.৮৫ কোটি
                </span>
                <span className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" /> +14.2% This Month
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
                <span className="text-[11px] font-medium text-slate-400 block">Total Plots Allotted</span>
                <span className="text-lg sm:text-xl font-extrabold text-white font-mono block mt-1">
                  ১৪২ / ২০০
                </span>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Purbachal & Mawa
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
                <span className="text-[11px] font-medium text-slate-400 block">Hotel Suites Sold</span>
                <span className="text-lg sm:text-xl font-extrabold text-amber-400 font-mono block mt-1">
                  ৪৮ / ৬০
                </span>
                <span className="text-[10px] text-amber-300 mt-1 block">
                  Kuakata & Cox's Bazar
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
                <span className="text-[11px] font-medium text-slate-400 block">Registered Investors</span>
                <span className="text-lg sm:text-xl font-extrabold text-white font-mono block mt-1">
                  ২৮৪ জন
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold mt-1 block">
                  ৯৮% Active Portfolios
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
                <span className="text-[11px] font-medium text-slate-400 block">MLM Commission Disbursed</span>
                <span className="text-lg sm:text-xl font-extrabold text-purple-400 font-mono block mt-1">
                  ৳৩৮.৪ লাখ
                </span>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Across 5 Generations
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
                <span className="text-[11px] font-medium text-slate-400 block">Monthly Dividends Distributed</span>
                <span className="text-lg sm:text-xl font-extrabold text-blue-400 font-mono block mt-1">
                  ৳১৪.৮ লাখ
                </span>
                <span className="text-[10px] text-blue-300 mt-1 block">
                  Paid to 48 Suite Owners
                </span>
              </div>

            </div>

            {/* Quick Control Center Panels */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Quick Deposit Slip Approval Queue */}
              <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-amber-400" />
                    Pending Bank Slips Approval Queue
                  </h3>
                  <span className="text-xs text-amber-400 font-mono font-bold">
                    {pendingSlipsCount} Pending Verification
                  </span>
                </div>

                <div className="space-y-3">
                  {depositSlips.filter(s => s.status === 'pending').map(slip => (
                    <div
                      key={slip.id}
                      className="p-4 rounded-xl bg-slate-800/70 border border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <strong className="text-white text-sm">{slip.memberName}</strong>
                          <span className="text-slate-400 font-mono">@{slip.memberUsername}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40">
                            {slip.slipNo}
                          </span>
                        </div>
                        <p className="text-slate-400">
                          {slip.projectName} · {slip.bankName} ({slip.branchName})
                        </p>
                        <div className="flex items-center gap-3 text-[11px] font-mono">
                          <span className="text-slate-300">TxID: {slip.transactionId}</span>
                          <span className="text-slate-400">Submitted: {slip.submittedAt}</span>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-700">
                        <span className="text-base font-extrabold text-emerald-400 font-mono">
                          ৳{slip.amount.toLocaleString()}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleRejectSlip(slip)}
                            className="px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 font-semibold transition-colors"
                          >
                            Reject
                          </button>
                          <button
                            onClick={() => handleApproveSlip(slip)}
                            className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors flex items-center gap-1 shadow-xs"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Approve & Credit</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {depositSlips.filter(s => s.status === 'pending').length === 0 && (
                    <div className="p-8 text-center text-slate-500 text-xs">
                      All deposit slips have been verified and processed!
                    </div>
                  )}
                </div>
              </div>

              {/* Mass Operations Quick Launcher */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  1-Click Operations Launcher
                </h3>

                <div className="space-y-3 text-xs">
                  
                  {/* Mass Dividend Button */}
                  <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
                    <div className="flex items-center justify-between">
                      <strong className="text-white">Monthly Dividend Distribution</strong>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">Ready</span>
                    </div>
                    <p className="text-slate-400 text-[11px]">
                      Disburse ৳18,500/suite to all verified hotel suite owners for {disburseMonth}.
                    </p>
                    <button
                      onClick={handleExecuteDividendPayout}
                      disabled={isDisbursing}
                      className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-700 text-white font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <Wallet className="w-3.5 h-3.5" />
                      <span>{isDisbursing ? 'Processing Payout...' : 'Disburse Monthly Dividends (৳14.8L)'}</span>
                    </button>
                  </div>

                  {/* Weekend Tour Confirmation */}
                  <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
                    <div className="flex items-center justify-between">
                      <strong className="text-white">Upcoming Weekend Tour Transport</strong>
                      <span className="text-[10px] font-mono text-blue-400 font-bold">2 Microbuses</span>
                    </div>
                    <p className="text-slate-400 text-[11px]">
                      Purbachal Mega Town weekend visit scheduled for Friday & Saturday.
                    </p>
                    <button
                      onClick={() => setActiveTab('site_tours')}
                      className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <Car className="w-3.5 h-3.5" />
                      <span>Manage Site Tour Bookings</span>
                    </button>
                  </div>

                  {/* Issue New Allotment */}
                  <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
                    <div className="flex items-center justify-between">
                      <strong className="text-white">Plot Allotment & Bayna Deed</strong>
                      <span className="text-[10px] font-mono text-amber-400 font-bold">Legal Desk</span>
                    </div>
                    <p className="text-slate-400 text-[11px]">
                      Register Bayna Deed or issue official Allotment Letter with seal.
                    </p>
                    <button
                      onClick={() => setActiveTab('plots')}
                      className="w-full py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Manage Plots & Allotments</span>
                    </button>
                  </div>

                </div>
              </div>

            </div>

            {/* Live Security & Operations Audit Feed */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Live Executive Activity & Audit Log
                </h3>
                <button
                  onClick={() => setActiveTab('audit')}
                  className="text-xs text-amber-400 hover:underline flex items-center gap-1"
                >
                  <span>View Full Audit Trail</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2">
                {auditLogs.slice(0, 3).map(log => (
                  <div
                    key={log.id}
                    className="p-3 rounded-xl bg-slate-800/50 border border-slate-800 flex items-start justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-amber-400 font-bold">{log.action}</span>
                        <span className="text-slate-400">·</span>
                        <strong className="text-white">{log.target}</strong>
                      </div>
                      <p className="text-slate-400 text-[11px] mt-0.5">{log.details}</p>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono whitespace-nowrap">
                      {log.timestamp}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: INVESTOR & CRM (KYC, WALLETS, RANKS) */}
        {/* ============================================================ */}
        {activeTab === 'investors' && (
          <div className="space-y-4">
            
            {/* Header and Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-white">
                  Investor CRM, KYC Verifications & Wallet Management
                </h2>
                <p className="text-xs text-slate-400">
                  Manage member portfolios, approve KYC identity docs, adjust balances and promote MLM ranks.
                </p>
              </div>

              {/* Search, Filters & Add Action */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search name, phone, member ID..."
                    value={investorSearchQuery}
                    onChange={e => setInvestorSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-700 bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <select
                  value={investorFilterStatus}
                  onChange={e => setInvestorFilterStatus(e.target.value as any)}
                  className="px-3 py-1.5 text-xs rounded-xl border border-slate-700 bg-slate-800 text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="all">All Status</option>
                  <option value="verified">KYC Verified</option>
                  <option value="pending">KYC Pending</option>
                  <option value="suspended">Suspended</option>
                </select>

                <button
                  onClick={() => setIsAddInvestorModalOpen(true)}
                  className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors whitespace-nowrap"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Investor</span>
                </button>
              </div>
            </div>

            {/* Investors Table */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800/80 border-b border-slate-800 text-slate-400 font-semibold uppercase">
                    <tr>
                      <th className="p-3.5">Investor & Member ID</th>
                      <th className="p-3.5">Branch / City</th>
                      <th className="p-3.5">Current Rank</th>
                      <th className="p-3.5">KYC Status</th>
                      <th className="p-3.5 font-mono">Portfolio Volume</th>
                      <th className="p-3.5 font-mono">Dividend Wallet</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {filteredInvestors.map(inv => (
                      <tr key={inv.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-3.5">
                          <div className="font-bold text-white text-sm">{inv.fullName}</div>
                          <div className="text-[11px] text-slate-400 font-mono">
                            @{inv.username} · ID: <strong className="text-amber-400">{inv.memberId}</strong>
                          </div>
                          <div className="text-[10px] text-slate-500">{inv.phone}</div>
                        </td>
                        <td className="p-3.5 text-slate-300">
                          {inv.branch}
                          <span className="block text-[10px] text-slate-500 font-mono">Joined {inv.joinedDate}</span>
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                            {inv.rank}
                          </span>
                        </td>
                        <td className="p-3.5">
                          {inv.kycStatus === 'verified' ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 w-fit">
                              <Check className="w-3 h-3" /> Verified
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center gap-1 w-fit animate-pulse">
                              Pending NID
                            </span>
                          )}
                        </td>
                        <td className="p-3.5 font-mono font-bold text-white">
                          ৳{inv.totalInvested.toLocaleString()}
                        </td>
                        <td className="p-3.5 font-mono font-bold text-emerald-400">
                          ৳{inv.dividendBalance.toLocaleString()}
                        </td>
                        <td className="p-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {inv.kycStatus === 'pending' && (
                              <button
                                onClick={() => handleApproveKYC(inv.id)}
                                className="px-2 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition-colors"
                                title="Approve KYC"
                              >
                                Approve KYC
                              </button>
                            )}
                            <button
                              onClick={() => setSelectedInvestorForModal(inv)}
                              className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-[11px] transition-colors flex items-center gap-1"
                              title="Inspect Investor Profile"
                            >
                              <Eye className="w-3 h-3 text-amber-400" />
                              <span className="hidden sm:inline">Inspect</span>
                            </button>
                            <button
                              onClick={() => setEditingInvestor(inv)}
                              className="px-2 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold text-[11px] transition-colors flex items-center gap-1"
                              title="Edit Investor Data"
                            >
                              <Edit2 className="w-3 h-3 text-amber-400" />
                              <span className="hidden sm:inline">Edit</span>
                            </button>
                            <button
                              onClick={() => handleDeleteInvestor(inv.id, inv.fullName)}
                              className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors"
                              title="Delete Investor"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Investor Inspection Modal */}
            {selectedInvestorForModal && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <h3 className="text-base font-bold text-white">
                        {selectedInvestorForModal.fullName} ({selectedInvestorForModal.memberId})
                      </h3>
                      <span className="text-xs text-amber-400 font-mono">
                        @{selectedInvestorForModal.username} · {selectedInvestorForModal.rank}
                      </span>
                    </div>
                    <button
                      onClick={() => setSelectedInvestorForModal(null)}
                      className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">National NID No:</span>
                      <strong className="text-white font-mono">{selectedInvestorForModal.nidNo}</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">Phone Number:</span>
                      <strong className="text-white font-mono">{selectedInvestorForModal.phone}</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">Authorized Nominee:</span>
                      <strong className="text-white">{selectedInvestorForModal.nomineeName} ({selectedInvestorForModal.nomineeRelation})</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">Office Branch:</span>
                      <strong className="text-white">{selectedInvestorForModal.branch}</strong>
                    </div>
                  </div>

                  {/* Financial Balances */}
                  <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 grid grid-cols-3 gap-2 text-center text-xs">
                    <div>
                      <span className="text-slate-400 text-[10px] block">Total Invested</span>
                      <strong className="text-white font-mono text-sm">৳{selectedInvestorForModal.totalInvested.toLocaleString()}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">Dividend Wallet</span>
                      <strong className="text-emerald-400 font-mono text-sm">৳{selectedInvestorForModal.dividendBalance.toLocaleString()}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">MLM Commission</span>
                      <strong className="text-amber-400 font-mono text-sm">৳{selectedInvestorForModal.commissionBalance.toLocaleString()}</strong>
                    </div>
                  </div>

                  {/* Admin Direct Control Buttons */}
                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <span className="text-xs font-bold text-slate-300 block">Admin Control Actions:</span>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button
                        onClick={() => {
                          handleApproveKYC(selectedInvestorForModal.id);
                          setSelectedInvestorForModal(null);
                        }}
                        className="py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center justify-center gap-1"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Confirm KYC Verified</span>
                      </button>
                      <button
                        onClick={() => {
                          showToast(`Transaction PIN reset to default (8842) for @${selectedInvestorForModal.username}`);
                          setSelectedInvestorForModal(null);
                        }}
                        className="py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold flex items-center justify-center gap-1"
                      >
                        <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                        <span>Reset T-PIN to 8842</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 3: PLOTS & LAND INVENTORY & TRANSFER NOC */}
        {/* ============================================================ */}
        {activeTab === 'plots' && (
          <div className="space-y-6">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-white">
                  Plots & Land Inventory, Bayna Deeds & Transfer NOCs
                </h2>
                <p className="text-xs text-slate-400">
                  Manage Purbachal City R Mega Town and Mawa Expressway plots, issue allotment letters, and review resale NOCs.
                </p>
              </div>
            </div>

            {/* Pending Resale / Plot Transfer NOC Applications */}
            {transferRequests.length > 0 && (
              <div className="p-5 rounded-2xl bg-purple-950/40 border border-purple-800/60 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Scale className="w-4 h-4 text-purple-400" />
                    Plot Resale & Transfer NOC Applications (Pending Review)
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300">
                    2.5% Transfer Fee Required
                  </span>
                </div>

                <div className="space-y-2">
                  {transferRequests.map(req => (
                    <div
                      key={req.id}
                      className="p-4 rounded-xl bg-slate-900 border border-purple-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <strong className="text-white text-sm">{req.plotNo}</strong>
                          <span className="text-slate-400 font-mono">({req.projectName})</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300">
                            Req #{req.requestNo}
                          </span>
                        </div>
                        <p className="text-slate-300">
                          Transferor: <strong>{req.originalMemberName}</strong> (@{req.originalMemberUsername}) &rarr; Transferee: <strong>{req.buyerName}</strong> ({req.buyerPhone})
                        </p>
                        <div className="text-[11px] text-slate-400 font-mono">
                          Buyer NID: {req.buyerNid} · Transfer Fee: ৳{req.transferFee.toLocaleString()} · Applied: {req.appliedDate}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {req.nocStatus === 'under_review' ? (
                          <button
                            onClick={() => handleApproveTransferNOC(req.id)}
                            className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold transition-colors flex items-center gap-1.5 shadow-xs"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Approve NOC & Transfer</span>
                          </button>
                        ) : (
                          <span className="px-2.5 py-1 rounded-lg text-emerald-400 bg-emerald-500/10 font-bold border border-emerald-500/30">
                            Approved
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Plots Master Inventory Table */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-sm overflow-hidden">
              <div className="p-4 bg-slate-800/70 border-b border-slate-800 flex items-center justify-between">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Master Plots Catalog & Handover Status
                </h3>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-amber-400 font-mono font-bold">
                    {plots.length} Recorded Units
                  </span>
                  <button
                    onClick={() => setIsAddPlotModalOpen(true)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Plot</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800/40 border-b border-slate-800 text-slate-400 font-semibold uppercase">
                    <tr>
                      <th className="p-3.5">Project Name</th>
                      <th className="p-3.5">Plot No & Katha</th>
                      <th className="p-3.5">Facing / Road</th>
                      <th className="p-3.5">Allottee Member</th>
                      <th className="p-3.5 font-mono">Total Cost</th>
                      <th className="p-3.5 font-mono">Paid Amount</th>
                      <th className="p-3.5">Bayna Status</th>
                      <th className="p-3.5 text-center">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {plots.map(plot => (
                      <tr key={plot.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-3.5 font-medium text-white">
                          {plot.projectName}
                          <span className="block text-[10px] text-slate-400">{plot.sector}</span>
                        </td>
                        <td className="p-3.5">
                          <strong className="text-amber-400 font-mono text-sm">Plot #{plot.plotNo}</strong>
                          <span className="block text-[10px] text-slate-400 font-mono">{plot.katha} Katha</span>
                        </td>
                        <td className="p-3.5 text-slate-300">
                          {plot.facing}
                          <span className="block text-[10px] text-slate-500">{plot.roadNo}</span>
                        </td>
                        <td className="p-3.5">
                          {plot.allotteeName ? (
                            <div>
                              <strong className="text-white">{plot.allotteeName}</strong>
                              <span className="block text-[10px] text-slate-400 font-mono">@{plot.allotteeUsername}</span>
                            </div>
                          ) : (
                            <span className="text-slate-500 italic">Unassigned (Available)</span>
                          )}
                        </td>
                        <td className="p-3.5 font-mono font-bold text-white">
                          ৳{plot.totalCost.toLocaleString()}
                        </td>
                        <td className="p-3.5 font-mono font-bold text-emerald-400">
                          ৳{plot.paidAmount.toLocaleString()}
                        </td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            plot.baynaStatus === 'registered'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                          }`}>
                            {plot.baynaStatus === 'registered' ? 'Registered Deed' : 'Pending Deed'}
                          </span>
                        </td>
                        <td className="p-3.5 text-center">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            plot.status === 'allotted'
                              ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                              : plot.status === 'booked'
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                              : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          }`}>
                            {plot.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setEditingPlot(plot)}
                              className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold text-[11px] flex items-center gap-1 transition-colors"
                              title="Edit Plot"
                            >
                              <Edit2 className="w-3 h-3 text-amber-400" />
                              <span className="hidden sm:inline">Edit</span>
                            </button>
                            <button
                              onClick={() => handleDeletePlot(plot.id, plot.plotNo)}
                              className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors"
                              title="Delete Plot"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ============================================================ */}
        {/* TAB: 12-MONTH DOUBLE PROFIT SCHEMES & MONTHLY DISBURSEMENT   */}
        {/* ============================================================ */}
        {activeTab === 'double_profit' && (
          <div className="space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white">
                    12-Month Double Profit & Monthly Installment Disbursement
                  </h2>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-slate-950 font-mono">
                    2X SCHEME
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Manage all investor 2X capital plans, track 12 PDC Bank Cheques, and disburse monthly installments directly into wallets/ledgers.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAddDoublePlanModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-lg flex items-center gap-1.5 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Enroll Investor in Double Profit Plan</span>
                </button>
              </div>
            </div>

            {/* KPI Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
                <span className="text-slate-400 text-xs font-medium block">Total Enrolled Plans</span>
                <span className="text-2xl font-black text-white font-mono mt-1 block">
                  {doubleProfitPlans.length} Plans
                </span>
                <span className="text-[11px] text-amber-400 mt-1 block">
                  {doubleProfitPlans.filter(p => p.status === 'active').length} Active Enrolments
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
                <span className="text-slate-400 text-xs font-medium block">Total Capital Invested</span>
                <span className="text-2xl font-black text-amber-400 font-mono mt-1 block">
                  ৳{doubleProfitPlans.reduce((acc, p) => acc + p.principalAmount, 0).toLocaleString()}
                </span>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  100% Principal Collateral
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
                <span className="text-slate-400 text-xs font-medium block">Total 2X Target Return (200%)</span>
                <span className="text-2xl font-black text-emerald-400 font-mono mt-1 block">
                  ৳{doubleProfitPlans.reduce((acc, p) => acc + p.totalReturnAmount, 0).toLocaleString()}
                </span>
                <span className="text-[11px] text-emerald-500/80 font-medium mt-1 block">
                  Disbursed in 12 Equal Installments
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
                <span className="text-slate-400 text-xs font-medium block">Monthly Installment Outflow</span>
                <span className="text-2xl font-black text-blue-400 font-mono mt-1 block">
                  ৳{doubleProfitPlans.filter(p => p.status === 'active').reduce((acc, p) => acc + p.monthlyInstallmentAmount, 0).toLocaleString()}
                </span>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Disbursed per Month
                </span>
              </div>
            </div>

            {/* Enrolled Plans Table */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-sm">
              <div className="p-4 bg-slate-800/70 border-b border-slate-800 flex items-center justify-between">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Active 12-Month Double Profit Portfolios & Monthly Installment Ledger
                </h3>
                <span className="text-xs font-mono text-slate-400">
                  Total Disbursed to Date: ৳{doubleProfitPlans.reduce((acc, p) => acc + p.totalPaidOut, 0).toLocaleString()}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800/50 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
                    <tr>
                      <th className="p-3.5">Investor Member</th>
                      <th className="p-3.5">Package & Capital</th>
                      <th className="p-3.5">12-Mo Total Return</th>
                      <th className="p-3.5">Monthly Installment</th>
                      <th className="p-3.5">Installment Progress</th>
                      <th className="p-3.5">Next Payout</th>
                      <th className="p-3.5">Deed & 12 PDC Cheques</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono">
                    {doubleProfitPlans.map(plan => {
                      const isCompleted = plan.status === 'completed' || plan.remainingInstallments <= 0;
                      const progressPct = Math.round((plan.paidInstallments / plan.totalMonths) * 100);

                      return (
                        <tr key={plan.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="p-3.5">
                            <strong className="text-white block font-sans text-xs">{plan.memberName}</strong>
                            <span className="text-slate-400 text-[11px]">{plan.memberId}</span>
                          </td>
                          <td className="p-3.5">
                            <span className="text-slate-200 font-sans block text-xs">{plan.packageName}</span>
                            <strong className="text-amber-400 text-xs">Capital: ৳{plan.principalAmount.toLocaleString()}</strong>
                          </td>
                          <td className="p-3.5">
                            <span className="text-emerald-400 font-bold text-sm block">৳{plan.totalReturnAmount.toLocaleString()}</span>
                            <span className="text-[10px] text-slate-400 font-sans">200% Payout</span>
                          </td>
                          <td className="p-3.5">
                            <span className="text-amber-300 font-bold text-xs block">৳{plan.monthlyInstallmentAmount.toLocaleString()}</span>
                            <span className="text-[10px] text-slate-400 font-sans">/ month</span>
                          </td>
                          <td className="p-3.5 min-w-36">
                            <div className="flex items-center justify-between text-[11px] mb-1">
                              <span className="text-slate-300 font-sans">{plan.paidInstallments}/12 Paid</span>
                              <span className="text-emerald-400">{progressPct}%</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full"
                                style={{ width: `${progressPct}%` }}
                              />
                            </div>
                          </td>
                          <td className="p-3.5">
                            <span className="text-slate-300 text-xs">{plan.nextPayoutDate}</span>
                            <span className={`block text-[10px] font-sans font-bold ${isCompleted ? 'text-emerald-400' : 'text-blue-400'}`}>
                              {isCompleted ? 'Completed' : 'Active'}
                            </span>
                          </td>
                          <td className="p-3.5">
                            <span className="text-[11px] text-slate-300 block">{plan.agreementDeedNo}</span>
                            <span className="text-[10px] text-amber-400/90 font-mono">
                              {plan.pdcCheckNumbers.length} PDC Cheques Backed
                            </span>
                          </td>
                          <td className="p-3.5 text-right font-sans">
                            <div className="flex items-center justify-end gap-1.5">
                              {!isCompleted && (
                                <button
                                  onClick={() => handleDisburseInstallment(plan.id)}
                                  className="px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 text-xs font-bold transition-all flex items-center gap-1"
                                  title="Disburse Next Monthly Installment"
                                >
                                  <CreditCard className="w-3.5 h-3.5" />
                                  <span>Disburse Inst #{plan.paidInstallments + 1}</span>
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteDoublePlan(plan.id)}
                                className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors"
                                title="Delete Plan"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 4: HOTEL SHARES & MASS DIVIDEND DISTRIBUTION ENGINE */}
        {/* ============================================================ */}
        {activeTab === 'shares' && (
          <div className="space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-white">
                  Hotel Shares & 1-Click Mass Dividend Distribution Engine
                </h2>
                <p className="text-xs text-slate-400">
                  Declare monthly profit rates and disburse returns directly into all hotel suite share investors' wallets.
                </p>
              </div>
            </div>

            {/* Mass Dividend Payout Panel */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950 border border-emerald-800/40 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">
                    MONTHLY PROFIT DISTRIBUTION ENGINE
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    Mass Disbursement for Hotel Suite Owners
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-300">
                  Next Cycle: {disburseMonth}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Disbursement Month
                  </label>
                  <input
                    type="text"
                    value={disburseMonth}
                    onChange={e => setDisburseMonth(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-700 bg-slate-800 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Rate per Luxury Suite Share (BDT)
                  </label>
                  <input
                    type="number"
                    value={disburseSuiteRate}
                    onChange={e => setDisburseSuiteRate(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-700 bg-slate-800 text-white font-mono"
                  />
                </div>

                <div className="flex flex-col justify-end">
                  <button
                    onClick={handleExecuteDividendPayout}
                    disabled={isDisbursing}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-700 text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Wallet className="w-4 h-4" />
                    <span>{isDisbursing ? 'Disbursing...' : 'Disburse ৳14,80,000 Now'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Dividend Disbursement History Log */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-sm overflow-hidden">
              <div className="p-4 bg-slate-800/70 border-b border-slate-800 flex items-center justify-between">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Historical Dividend Disbursement Rounds
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800/40 border-b border-slate-800 text-slate-400 font-semibold uppercase">
                    <tr>
                      <th className="p-3.5">Disbursement Month</th>
                      <th className="p-3.5">Rate / Suite Share</th>
                      <th className="p-3.5">Investors Benefited</th>
                      <th className="p-3.5 font-mono">Total Volume Disbursed</th>
                      <th className="p-3.5">Disbursed Date</th>
                      <th className="p-3.5 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {dividendRounds.map(round => (
                      <tr key={round.id} className="hover:bg-slate-800/40">
                        <td className="p-3.5 font-bold text-white text-sm">
                          {round.monthYear}
                        </td>
                        <td className="p-3.5 font-mono text-emerald-400 font-bold">
                          ৳{round.ratePerSuite.toLocaleString()} / Unit
                        </td>
                        <td className="p-3.5 text-slate-300">
                          {round.investorsCount} Verified Investors
                        </td>
                        <td className="p-3.5 font-mono font-bold text-white">
                          ৳{round.totalDisbursed.toLocaleString()}
                        </td>
                        <td className="p-3.5 font-mono text-slate-400">
                          {round.disbursedDate}
                        </td>
                        <td className="p-3.5 text-center">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            Completed
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 5: MLM COMMISSION & RANK REWARDS MANAGER */}
        {/* ============================================================ */}
        {activeTab === 'mlm' && (
          <div className="space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-white">
                  MLM Commission Rates & Leadership Rank Incentives
                </h2>
                <p className="text-xs text-slate-400">
                  Configure multi-level commission percentages across 5 generations and fulfill rank milestone rewards.
                </p>
              </div>
            </div>

            {/* Commission Config Matrix */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Network className="w-4 h-4 text-amber-400" />
                Active Multi-Generation Commission Matrix
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
                {[
                  { level: 'Generation 1 (Direct)', rate: '5.0%', role: 'Direct Sponsor', color: 'text-emerald-400' },
                  { level: 'Generation 2', rate: '2.5%', role: 'Team Sub-Tier', color: 'text-blue-400' },
                  { level: 'Generation 3', rate: '1.0%', role: '3rd Tier Network', color: 'text-purple-400' },
                  { level: 'Generation 4', rate: '0.5%', role: '4th Tier Network', color: 'text-amber-400' },
                  { level: 'Generation 5', rate: '0.5%', role: 'Extended Network', color: 'text-pink-400' }
                ].map((tier, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-center">
                    <span className="text-[10px] text-slate-400 block">{tier.level}</span>
                    <strong className={`text-lg font-mono font-extrabold ${tier.color} block mt-0.5`}>
                      {tier.rate}
                    </strong>
                    <span className="text-[10px] text-slate-500 font-mono">{tier.role}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rank Qualifiers & Reward Fulfillment Tracker */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-sm overflow-hidden">
              <div className="p-4 bg-slate-800/70 border-b border-slate-800 flex items-center justify-between">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Leadership Milestone Qualifiers & Incentive Delivery
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800/40 border-b border-slate-800 text-slate-400 font-semibold uppercase">
                    <tr>
                      <th className="p-3.5">Associate Member</th>
                      <th className="p-3.5">Achieved Rank</th>
                      <th className="p-3.5 font-mono">Team Turnover</th>
                      <th className="p-3.5">Milestone Incentive / Reward</th>
                      <th className="p-3.5 text-center">Fulfillment Status</th>
                      <th className="p-3.5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {[
                      {
                        name: 'Ziabul Hoque Chowdhury',
                        username: 'Ziabulctg1',
                        rank: 'Gold Senior Associate',
                        volume: '৳47,00,000',
                        reward: 'Bangkok / Thailand Couple Air Ticket & Tour',
                        status: 'delivered'
                      },
                      {
                        name: 'Engr. Tanvir Ahmed Chowdhury',
                        username: 'tanvir_eng',
                        rank: 'Executive Associate',
                        volume: '৳12,00,000',
                        reward: 'Executive Smart Watch & Leather Bag',
                        status: 'delivered'
                      },
                      {
                        name: 'Md. Anwar Hossain',
                        username: 'anwar_ctg',
                        rank: 'Senior Associate',
                        volume: '৳35,00,000',
                        reward: 'Cox’s Bazar 5-Star Couple Holiday (3D/2N)',
                        status: 'pending_dispatch'
                      }
                    ].map((qual, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40">
                        <td className="p-3.5">
                          <strong className="text-white text-sm">{qual.name}</strong>
                          <span className="block text-[10px] text-slate-400 font-mono">@{qual.username}</span>
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                            {qual.rank}
                          </span>
                        </td>
                        <td className="p-3.5 font-mono font-bold text-white">
                          {qual.volume}
                        </td>
                        <td className="p-3.5 font-medium text-amber-300 flex items-center gap-1.5 pt-4">
                          <Gift className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>{qual.reward}</span>
                        </td>
                        <td className="p-3.5 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            qual.status === 'delivered'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : 'bg-amber-500/10 text-amber-300 border border-amber-500/30 animate-pulse'
                          }`}>
                            {qual.status === 'delivered' ? 'Disbursed / Delivered' : 'Ready for Dispatch'}
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          {qual.status !== 'delivered' && (
                            <button
                              onClick={() => showToast(`Incentive voucher marked as delivered to ${qual.name}!`)}
                              className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px]"
                            >
                              Dispatch Reward
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

        {/* ============================================================ */}
        {/* TAB 6: BANK SLIPS & ACCOUNTS APPROVAL */}
        {/* ============================================================ */}
        {activeTab === 'accounts' && (
          <div className="space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-white">
                  Manual Bank Deposit Slips & Financial Approvals
                </h2>
                <p className="text-xs text-slate-400">
                  Review member bank deposit slips and pay orders to issue official Money Receipts (MR).
                </p>
              </div>
              <button
                onClick={() => setIsAddSlipModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors whitespace-nowrap"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Record Manual Deposit</span>
              </button>
            </div>

            <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800/80 border-b border-slate-800 text-slate-400 font-semibold uppercase">
                    <tr>
                      <th className="p-3.5">Slip # & Booking</th>
                      <th className="p-3.5">Investor</th>
                      <th className="p-3.5">Bank & Branch</th>
                      <th className="p-3.5">TxID / Reference</th>
                      <th className="p-3.5 font-mono">Amount (BDT)</th>
                      <th className="p-3.5 text-center">Status</th>
                      <th className="p-3.5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {depositSlips.map(slip => (
                      <tr key={slip.id} className="hover:bg-slate-800/40">
                        <td className="p-3.5">
                          <strong className="text-white text-sm">{slip.slipNo}</strong>
                          <span className="block text-[10px] text-amber-400 font-mono">{slip.bookingId}</span>
                        </td>
                        <td className="p-3.5">
                          <span className="font-bold text-white">{slip.memberName}</span>
                          <span className="block text-[10px] text-slate-400 font-mono">@{slip.memberUsername}</span>
                        </td>
                        <td className="p-3.5 text-slate-300">
                          {slip.bankName}
                          <span className="block text-[10px] text-slate-500">{slip.branchName}</span>
                        </td>
                        <td className="p-3.5 font-mono text-slate-400">
                          {slip.transactionId}
                          <span className="block text-[10px] text-slate-500">{slip.depositDate}</span>
                        </td>
                        <td className="p-3.5 font-mono font-extrabold text-emerald-400 text-sm">
                          ৳{slip.amount.toLocaleString()}
                        </td>
                        <td className="p-3.5 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            slip.status === 'approved'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : slip.status === 'rejected'
                              ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                              : 'bg-amber-500/10 text-amber-300 border border-amber-500/30 animate-pulse'
                          }`}>
                            {slip.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {slip.status === 'pending' ? (
                              <>
                                <button
                                  onClick={() => handleRejectSlip(slip)}
                                  className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 font-semibold text-[11px]"
                                >
                                  Reject
                                </button>
                                <button
                                  onClick={() => handleApproveSlip(slip)}
                                  className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px]"
                                >
                                  Approve
                                </button>
                              </>
                            ) : (
                              <span className="text-[11px] text-slate-500">Processed</span>
                            )}
                            <button
                              onClick={() => handleDeleteSlip(slip.id, slip.slipNo)}
                              className="p-1 rounded text-rose-400 hover:bg-rose-500/10 transition-colors"
                              title="Delete Slip"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 7: SITE TOUR COORDINATION */}
        {/* ============================================================ */}
        {activeTab === 'site_tours' && (
          <div className="space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-white">
                  Weekend Site Visit & AC Microbus Coordination
                </h2>
                <p className="text-xs text-slate-400">
                  Manage visitor bookings submitted from the website and assign transport coordinators.
                </p>
              </div>
              <button
                onClick={() => setIsAddTourModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors whitespace-nowrap"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Schedule New Tour</span>
              </button>
            </div>

            <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800/80 border-b border-slate-800 text-slate-400 font-semibold uppercase">
                    <tr>
                      <th className="p-3.5">Client & Phone</th>
                      <th className="p-3.5">Project Interested</th>
                      <th className="p-3.5">Tour Date & Slot</th>
                      <th className="p-3.5">Pickup Location</th>
                      <th className="p-3.5">Guests</th>
                      <th className="p-3.5">Assigned Transport</th>
                      <th className="p-3.5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {siteTours.map(tour => (
                      <tr key={tour.id} className="hover:bg-slate-800/40">
                        <td className="p-3.5">
                          <strong className="text-white text-sm">{tour.clientName}</strong>
                          <span className="block text-[11px] text-amber-400 font-mono">{tour.phone}</span>
                        </td>
                        <td className="p-3.5 text-slate-300 font-medium">
                          {tour.projectInterested}
                        </td>
                        <td className="p-3.5">
                          <strong className="text-white">{tour.preferredDate}</strong>
                          <span className="block text-[10px] text-slate-400">{tour.timeSlot}</span>
                        </td>
                        <td className="p-3.5 text-slate-300">
                          {tour.pickupLocation}
                        </td>
                        <td className="p-3.5 font-mono text-center">
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 font-bold">
                            {tour.guestsCount} Persons
                          </span>
                        </td>
                        <td className="p-3.5">
                          {tour.assignedBus ? (
                            <div>
                              <strong className="text-emerald-400">{tour.assignedBus}</strong>
                              <span className="block text-[10px] text-slate-400">{tour.coordinator}</span>
                            </div>
                          ) : (
                            <span className="text-rose-400 italic">Not Assigned</span>
                          )}
                        </td>
                        <td className="p-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {tour.status === 'pending' ? (
                              <button
                                onClick={() => handleConfirmTour(tour.id)}
                                className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] transition-colors"
                              >
                                Assign & Confirm
                              </button>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                                Confirmed
                              </span>
                            )}
                            <button
                              onClick={() => handleDeleteTour(tour.id, tour.clientName)}
                              className="p-1 rounded text-rose-400 hover:bg-rose-500/10 transition-colors"
                              title="Cancel / Delete Tour"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 8: NOTICE BOARD CMS */}
        {/* ============================================================ */}
        {activeTab === 'notices' && (
          <div className="space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-white">
                  Notice Board & Official Circular CMS
                </h2>
                <p className="text-xs text-slate-400">
                  Publish notices that appear on both the public website and investor portal.
                </p>
              </div>
            </div>

            {/* Create Notice Form */}
            <form onSubmit={handleAddNotice} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-white">Publish New Official Circular</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="sm:col-span-2">
                  <label className="block text-slate-300 font-semibold mb-1">Notice Title / শিরোনাম *</label>
                  <input
                    type="text"
                    required
                    value={newNoticeTitle}
                    onChange={e => setNewNoticeTitle(e.target.value)}
                    placeholder="e.g. পূর্বাচল মেগা টাউনে প্লট রেজিস্ট্রেশন ও দলিল ড্র সংক্রান্ত জরুরি বিজ্ঞপ্তি"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-700 bg-slate-800 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <select
                    value={newNoticeCategory}
                    onChange={e => setNewNoticeCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-700 bg-slate-800 text-white"
                  >
                    <option value="Plot Allotment">Plot Allotment & Lottery</option>
                    <option value="Dividend Distribution">Dividend Distribution</option>
                    <option value="AGM Circular">Annual General Meeting (AGM)</option>
                    <option value="Site Visit Schedule">Site Visit Schedule</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs"
              >
                Publish Notice to Portal
              </button>
            </form>

            {/* Active Notices Table */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800/80 border-b border-slate-800 text-slate-400 font-semibold uppercase">
                    <tr>
                      <th className="p-3.5">Circular Title</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Published Date</th>
                      <th className="p-3.5 text-center">Status</th>
                      <th className="p-3.5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {notices.map(ntc => (
                      <tr key={ntc.id} className="hover:bg-slate-800/40">
                        <td className="p-3.5 font-bold text-white text-sm">
                          {ntc.title}
                        </td>
                        <td className="p-3.5 text-amber-400 font-mono">
                          {ntc.category}
                        </td>
                        <td className="p-3.5 font-mono text-slate-400">
                          {ntc.date}
                        </td>
                        <td className="p-3.5 text-center">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            Active
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => {
                              setNotices(prev => prev.filter(n => n.id !== ntc.id));
                              showToast('Notice deleted successfully.');
                            }}
                            className="p-1 rounded text-rose-400 hover:bg-rose-500/10"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ============================================================ */}
        {/* TAB: SUPPORT HELPDESK & TICKET MANAGEMENT */}
        {/* ============================================================ */}
        {activeTab === 'support' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-white">
                  Investor Support Desk & Ticket Resolution
                </h2>
                <p className="text-xs text-slate-400">
                  Manage incoming inquiries, provide administrative replies, and resolve investor tickets.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={ticketFilterStatus}
                  onChange={e => setTicketFilterStatus(e.target.value as any)}
                  className="px-3 py-1.5 text-xs rounded-xl border border-slate-700 bg-slate-800 text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="all">All Ticket Status</option>
                  <option value="open">Open / Unresolved</option>
                  <option value="in_progress">In-Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800/80 border-b border-slate-800 text-slate-400 font-semibold uppercase">
                    <tr>
                      <th className="p-3.5">Ticket # & Subject</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Priority</th>
                      <th className="p-3.5">Latest Message</th>
                      <th className="p-3.5">Updated</th>
                      <th className="p-3.5 text-center">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {filteredTickets.map(t => (
                      <tr key={t.id} className="hover:bg-slate-800/40">
                        <td className="p-3.5">
                          <strong className="text-white text-sm block">{t.subject}</strong>
                          <span className="text-[10px] text-amber-400 font-mono">#{t.ticketNo}</span>
                        </td>
                        <td className="p-3.5 text-slate-300 font-medium">
                          {t.category.toUpperCase()}
                        </td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            t.priority === 'high'
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              : t.priority === 'medium'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-slate-800 text-slate-400'
                          }`}>
                            {t.priority.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-3.5 text-slate-300 max-w-xs truncate">
                          {t.messages[t.messages.length - 1]?.text || 'No message'}
                        </td>
                        <td className="p-3.5 font-mono text-slate-400">
                          {t.updatedAt}
                        </td>
                        <td className="p-3.5 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            t.status === 'resolved'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : t.status === 'in_progress'
                              ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/30 animate-pulse'
                          }`}>
                            {t.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedTicketForReply(t)}
                              className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] flex items-center gap-1 transition-colors"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>Reply</span>
                            </button>
                            <button
                              onClick={() => handleToggleTicketStatus(t)}
                              className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                                t.status === 'resolved'
                                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                  : 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600/30'
                              }`}
                            >
                              {t.status === 'resolved' ? 'Reopen' : 'Resolve'}
                            </button>
                            <button
                              onClick={() => handleDeleteTicket(t.id)}
                              className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
                              title="Delete Ticket"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredTickets.length === 0 && (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-slate-500 text-xs">
                          No support tickets found in this category.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 9: AUDIT TRAIL & SYSTEM LOGS */}
        {/* ============================================================ */}
        {activeTab === 'audit' && (
          <div className="space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-white">
                  Security Audit Trail & Administrative Logs
                </h2>
                <p className="text-xs text-slate-400">
                  Chronological tamper-evident audit record of approvals, payouts, and modifications.
                </p>
              </div>

              <button
                onClick={() => {
                  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(auditLogs, null, 2));
                  const downloadAnchor = document.createElement('a');
                  downloadAnchor.setAttribute('href', dataStr);
                  downloadAnchor.setAttribute('download', `citysquare_audit_${Date.now()}.json`);
                  document.body.appendChild(downloadAnchor);
                  downloadAnchor.click();
                  downloadAnchor.remove();
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Export Audit Log (JSON)</span>
              </button>
            </div>

            <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800/80 border-b border-slate-800 text-slate-400 font-semibold uppercase">
                    <tr>
                      <th className="p-3.5">Timestamp</th>
                      <th className="p-3.5">Admin Operator</th>
                      <th className="p-3.5">Action Code</th>
                      <th className="p-3.5">Target Entity</th>
                      <th className="p-3.5">Details & Changes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {auditLogs.map(log => (
                      <tr key={log.id} className="hover:bg-slate-800/40">
                        <td className="p-3.5 font-mono text-slate-400 whitespace-nowrap">
                          {log.timestamp}
                        </td>
                        <td className="p-3.5 font-bold text-white">
                          {log.adminUser}
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                            {log.action}
                          </span>
                        </td>
                        <td className="p-3.5 text-slate-200 font-semibold">
                          {log.target}
                        </td>
                        <td className="p-3.5 text-slate-400">
                          {log.details}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      {/* CRUD Modals */}
      <AddInvestorModal
        isOpen={isAddInvestorModalOpen}
        onClose={() => setIsAddInvestorModalOpen(false)}
        onAdd={handleAddInvestor}
      />

      <EditInvestorModal
        investor={editingInvestor}
        onClose={() => setEditingInvestor(null)}
        onSave={handleUpdateInvestor}
      />

      <AddPlotModal
        isOpen={isAddPlotModalOpen}
        onClose={() => setIsAddPlotModalOpen(false)}
        onAdd={handleAddPlot}
      />

      <EditPlotModal
        plot={editingPlot}
        onClose={() => setEditingPlot(null)}
        onSave={handleUpdatePlot}
      />

      <AddManualSlipModal
        isOpen={isAddSlipModalOpen}
        onClose={() => setIsAddSlipModalOpen(false)}
        onAdd={handleAddManualSlip}
      />

      <AddTourModal
        isOpen={isAddTourModalOpen}
        onClose={() => setIsAddTourModalOpen(false)}
        onAdd={handleAddTour}
      />

      <ReplyTicketModal
        ticket={selectedTicketForReply}
        onClose={() => setSelectedTicketForReply(null)}
        onReply={handleReplyTicket}
      />

      <AddDoublePlanModal
        isOpen={isAddDoublePlanModalOpen}
        onClose={() => setIsAddDoublePlanModalOpen(false)}
        investors={investors}
        onAdd={handleCreateDoublePlan}
      />

      </div>
    </div>
  );
};
