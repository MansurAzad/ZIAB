import { Language } from '../types';

export const translations = {
  en: {
    // Brand
    brandName: 'CITY SQUARE BD',
    brandTagline: 'Secure Real Estate & Fractional Investment',
    
    // Nav
    navHome: 'Home',
    navProjects: 'Our Projects',
    navTimeline: 'Project Timeline',
    navMasterPlan: 'Interactive Master Plan',
    navCalculator: 'ROI Calculator',
    navLegal: 'Legal & Verification',
    navAbout: 'About Us',
    navNews: 'Notice Board',
    navGallery: 'Media Gallery',
    navSiteVisit: 'Free Site Visit',
    navContact: 'Contact',
    navPortal: 'Investor Portal',
    navLogin: 'Investor Login',
    navLogout: 'Sign Out',
    
    // Timeline
    timelineTitle: 'Construction Progress & Milestone Tracker',
    timelineSubtitle: 'Real-time verified engineering progress, on-site civil works, and handover schedules.',
    overallProgress: 'Overall Project Progress',
    expectedHandover: 'Expected Handover',
    filterAllMilestones: 'All Milestones',
    filterCompleted: 'Completed',
    filterActive: 'In Progress',
    filterUpcoming: 'Upcoming',
    inspectionVerified: 'Quality & Structural Assurance',
    
    // Hero
    heroBadge: 'Purbachal & Beachfront Hospitality Real Estate',
    heroTitle1: 'Build Generational Wealth with',
    heroTitleHighlight: '100% Legally Verified',
    heroTitle2: 'Real Estate in Bangladesh',
    heroSubtitle: 'Invest in prime residential plots at City R Mega Town Purbachal, or earn guaranteed monthly dividends from luxury 5-star hotel suite shares with full sub-registry legal security.',
    heroCtaExplore: 'Explore Projects',
    heroCtaPortal: 'Open Investor Portal',
    heroCtaLoginDemo: 'Quick Demo (Ziabulctg1)',
    statInvestors: 'Satisfied Investors',
    statAcres: 'Acres Master Planned',
    statClearance: 'Dispute Free Title',
    statYield: 'Projected Annual Yield',

    // Public Sections
    sectionProjectsTitle: 'Featured Landmark Developments',
    sectionProjectsSubtitle: 'Strategically located high-yield residential communities and hospitality assets.',
    viewPlotMap: 'Interactive Plot Map',
    bookNow: 'Enquire / Book',
    allotmentGuarantee: 'Guaranteed RAJUK / Sub-Registry Allotment',
    
    // Master Plan
    masterPlanTitle: 'City R Mega Town - Interactive Sector 4 Plan',
    masterPlanSubtitle: 'Explore plot locations, avenue widths, lakeside zones, and plot booking status in real-time.',
    statusAvailable: 'Available',
    statusBooked: 'Booked / Allotted',
    statusReserved: 'Reserved',
    legendAvenue: '60ft Arterial Boulevard',
    
    // Calculator
    calcTitle: 'Investment & Installment Calculator',
    calcSubtitle: 'Calculate monthly installment payments and projected 5-year capital appreciation.',
    calcPlotType: 'Select Asset Type',
    calcPlot3Katha: '3 Katha Residential Plot',
    calcPlot5Katha: '5 Katha Residential Plot',
    calcHotelShare: '1 Luxury Hotel Suite Share',
    calcTenure: 'Installment Tenure (Months)',
    calcDownPayment: 'Down Payment (BDT)',
    calcMonthlyInstallment: 'Monthly Installment',
    calcEstimatedValuation: 'Estimated 5-Yr Valuation',
    
    // Auth
    authModalTitle: 'Investor Access Portal',
    authModalSubtitle: 'Sign in to access your investment portfolio, payment passbook, and digital land deeds.',
    tabLogin: 'Sign In',
    tabRegister: 'New Investor Registration',
    usernameLabel: 'User Name / Member ID',
    passwordLabel: 'Password',
    rememberMe: 'Remember this device',
    btnSignIn: 'Sign In to Dashboard',
    btnRegister: 'Create Investor Account',
    demoNotice: 'Quick Test: Use preloaded credentials: User Name: Ziabulctg1 | Password: 123456',
    btnFillDemo: 'Fill Ziabulctg1 Credentials',
    
    // Dashboard Common
    dashGreeting: 'Assalamu Alaikum',
    dashMemberNo: 'Member ID',
    dashBranch: 'Branch Office',
    dashOverview: 'Overview',
    dashProfile: 'My Profile & KYC',
    dashPlots: 'My Plots',
    dashPlotVisualizer: 'Plot 3D & Elevation',
    dashShares: 'Hotel Shares',
    dashVacation: 'Claim 7-Day Resort Stay',
    dashSiteProgress: 'Site Cam & Drone Updates',
    dashInstallments: 'Installments & Pay',
    dashSlipUpload: 'Deposit Slip Upload',
    dashDividends: 'Dividend & Payouts',
    dashMemberTransfer: 'Member Fund Transfer',
    dashTransactions: 'Ledger & Passbook',
    dashCertificates: 'Digital Documents',
    dashKhatianVault: 'Mutation & Porcha Vault',
    dashTaxCert: 'Tax Certificate & Statement',
    dashAnalytics: 'Analytics & Yield',
    dashAffiliate: 'Referral & Network',
    dashReferralTree: 'Generation Tree & Team',
    dashSupport: 'Support Desk',
    dashSecurity: 'Security & T-PIN',

    // Dashboard Overview
    overviewTotalInvested: 'Total Portfolio Value',
    overviewTotalPaid: 'Total Amount Paid',
    overviewRemainingDue: 'Remaining Due',
    overviewDividendsReceived: 'Cumulative Dividends',
    nextInstallmentDue: 'Next Installment Due',
    daysRemaining: 'days remaining',
    payNow: 'Pay Now',
    paymentProgress: 'Overall Plot Payment Progress',

    // Installments
    installmentsTitle: 'Installment Schedule & Online Payment',
    installmentsSubtitle: 'Track scheduled installments, upload payment slips, or pay instantly with bKash / Cards / Bank.',
    thInstallmentNo: 'No.',
    thDueDate: 'Due Date',
    thAmount: 'Amount (BDT)',
    thStatus: 'Status',
    thAction: 'Receipt / Action',
    statusPaid: 'PAID',
    statusDue: 'DUE NOW',
    statusUpcoming: 'UPCOMING',
    btnDownloadReceipt: 'Download Receipt',
    btnPayOnline: 'Pay Online',

    // Payment Gateway Modal
    modalPayTitle: 'Secure Payment Gateway',
    modalPayDesc: 'Authorized payment integration for City Square BD installment clearance.',
    selectPaymentMethod: 'Select Payment Channel',
    bKashWallet: 'bKash Merchant Pay',
    nagadWallet: 'Nagad Direct',
    bankTransfer: 'City Bank / Islami Bank / DBBL',
    cardPay: 'Visa / MasterCard',
    inputTxId: 'Enter Transaction ID / Reference',
    btnConfirmPayment: 'Verify & Confirm Payment',

    // Digital Documents
    docsTitle: 'Digital Land Deeds & Share Certificates',
    docsSubtitle: 'End-to-end encrypted authenticated legal documents and allotment papers.',
    btnViewDoc: 'View Document',
    btnPrintDoc: 'Print / Save PDF',
    verifiedStamp: 'GOVT. SUB-REGISTRY & RAJUK COMPLIANT',

    // Glance Widget
    glanceTitle: 'City Square Portfolio Glance',
    glanceNextDue: 'Next Due',
    glanceDividend: 'Monthly Dividend',
    glanceSynced: 'Cloud Synced',
    glanceOffline: 'Offline Mode (Encrypted)',

    // Push Notifications
    notificationsTitle: 'Live Investment Alerts',
    markAllRead: 'Mark all as read',
    noNotifications: 'No unread alerts'
  },
  bn: {
    // Brand
    brandName: 'সিটি স্কয়ার বিডি',
    brandTagline: 'নিরাপদ রিয়েল এস্টেট ও শেয়ার বিনিয়োগ',
    
    // Nav
    navHome: 'হোম',
    navProjects: 'আমাদের প্রকল্পসমূহ',
    navTimeline: 'নির্মাণ অগ্রগতি',
    navMasterPlan: 'ইন্টারেক্টিভ মাস্টার প্ল্যান',
    navCalculator: 'বিনিয়োগ ক্যালকুলেটর',
    navLegal: 'আইনি ও দলিল যাচাই',
    navAbout: 'আমাদের সম্পর্কে',
    navNews: 'নোটিশ বোর্ড',
    navGallery: 'মিডিয়া গ্যালারি',
    navSiteVisit: 'ফ্রি সাইট ভিজিট',
    navContact: 'যোগাযোগ',
    navPortal: 'বিনিয়োগকারী পোর্টাল',
    navLogin: 'ইনভেস্টর লগইন',
    navLogout: 'লগআউট',
    
    // Timeline
    timelineTitle: 'নির্মাণ ও উন্নয়ন অগ্রগতির সময়রেখা',
    timelineSubtitle: 'প্রকৌশলগত বাস্তবায়ন অগ্রগতি, সাইট পরিদর্শন ও নির্ধারিত সময়সূচি।',
    overallProgress: 'সার্বিক প্রকল্পের অগ্রগতি',
    expectedHandover: 'প্রত্যাশিত হস্তান্তর',
    filterAllMilestones: 'সকল মাইলফলক',
    filterCompleted: 'সম্পন্ন',
    filterActive: 'চলমান',
    filterUpcoming: 'আসন্ন',
    inspectionVerified: 'গুণগত মান ও বুয়েট/পিডব্লিউডি অনুমোদন',
    
    // Hero
    heroBadge: 'পূর্বাচল ও সমুদ্রতীরবর্তী হোটেল আবাসন প্রকল্প',
    heroTitle1: 'নিরাপদ ভবিষ্যৎ গড়ুন',
    heroTitleHighlight: '১০০% নির্ভেজাল',
    heroTitle2: 'জমিতে বিনিয়োগের মাধ্যমে',
    heroSubtitle: 'পূর্বাচলে সিটি আর মেগা টাউনে নিরাপদ প্লট বুকিং করুন অথবা কক্সবাজারে বিলাসবহুল ৫-তারকা হোটেল শেয়ারে সাব-রেজিস্ট্রিকৃত মালিকানাসহ প্রতি মাসে নিশ্চিত মুনাফা অর্জন করুন।',
    heroCtaExplore: 'প্রকল্পসমূহ দেখুন',
    heroCtaPortal: 'ইনভেস্টর পোর্টালে যান',
    heroCtaLoginDemo: 'ডেমো লগইন (Ziabulctg1)',
    statInvestors: 'সন্তুষ্ট বিনিয়োগকারী',
    statAcres: 'একর পরিকল্পিত এলাকা',
    statClearance: 'মামলামুক্ত নির্ভেজাল দলিল',
    statYield: 'প্রাক্কলিত বার্ষিক মুনাফা',

    // Public Sections
    sectionProjectsTitle: 'প্রধান আবাসন ও বাণিজ্যিক প্রকল্পসমূহ',
    sectionProjectsSubtitle: 'সুবিধাজনক লোকেশনে ভবিষ্যৎমুখী দীর্ঘমেয়াদী নির্ভরযোগ্য বিনিয়োগের নিশ্চয়তা।',
    viewPlotMap: 'ইন্টারেক্টিভ প্লট ম্যাপ',
    bookNow: 'বুকিং / অনুসন্ধান',
    allotmentGuarantee: 'রাজউক সংলগ্ন ও সাব-রেজিস্ট্রি গ্যারান্টি',
    
    // Master Plan
    masterPlanTitle: 'সিটি আর মেগা টাউন - সেক্টর ৪ মাস্টার প্ল্যান',
    masterPlanSubtitle: 'প্লটের অবস্থান, প্রশস্ত এভিনিউ, লেক ভিউ এবং রিয়েল-টাইম বুকিং স্ট্যাটাস দেখুন।',
    statusAvailable: 'খালি আছে',
    statusBooked: 'বুকিং / বরাদ্দকৃত',
    statusReserved: 'সংরক্ষিত',
    legendAvenue: '৬০ ফুট প্রধান এভিনিউ',
    
    // Calculator
    calcTitle: 'বিনিয়োগ ও কিস্তি ক্যালকুলেটর',
    calcSubtitle: 'মাসিক কিস্তির পরিমাণ এবং আগামী ৫ বছরের মূলধন বৃদ্ধির হিসাব করুন।',
    calcPlotType: 'সম্পদের ধরন নির্বাচন করুন',
    calcPlot3Katha: '৩ কাঠা আবাসিক প্লট',
    calcPlot5Katha: '৫ কাঠা আবাসিক প্লট',
    calcHotelShare: '১টি লাক্সারি হোটেল স্যুট শেয়ার',
    calcTenure: 'কিস্তির মেয়াদ (মাস)',
    calcDownPayment: 'এককালীন ডাউন পেমেন্ট (টাকা)',
    calcMonthlyInstallment: 'মাসিক কিস্তি',
    calcEstimatedValuation: '৫ বছর পর আনুমানিক মূল্য',
    
    // Auth
    authModalTitle: 'ইনভেস্টর লগইন পোর্টাল',
    authModalSubtitle: 'আপনার পোর্টফোলিও, কিস্তির বিবরণ ও ডিজিটাল দলিল দেখতে লগইন করুন।',
    tabLogin: 'লগইন করুন',
    tabRegister: 'নতুন বিনিয়োগকারী নিবন্ধন',
    usernameLabel: 'ইউজার নেম / মেম্বার আইডি',
    passwordLabel: 'পাসওয়ার্ড',
    rememberMe: 'লগইন মনে রাখুন',
    btnSignIn: 'ড্যাশবোর্ডে প্রবেশ করুন',
    btnRegister: 'নতুন একাউন্ট খুলুন',
    demoNotice: 'পরীক্ষা করতে ব্যবহার করুন: ইউজার নেম: Ziabulctg1 | পাসওয়ার্ড: 123456',
    btnFillDemo: 'Ziabulctg1 তথ্য স্বয়ংক্রিয়ভাবে দিন',
    
    // Dashboard Common
    dashGreeting: 'আসসালামু আলাইকুম',
    dashMemberNo: 'সদস্য নম্বর',
    dashBranch: 'শাখা অফিস',
    dashOverview: 'ওভারভিউ',
    dashProfile: 'প্রোফাইল ও কেওয়াইসি',
    dashPlots: 'আমার প্লটসমূহ',
    dashPlotVisualizer: 'প্লট ৩ডি ও সীমানা নকশা',
    dashShares: 'হোটেল শেয়ার',
    dashVacation: 'বার্ষিক ৭ দিনের হোটেল বুকিং',
    dashSiteProgress: 'সাইট ড্রোন ও সিসিটিভি আপডেট',
    dashInstallments: 'কিস্তি ও পেমেন্ট',
    dashSlipUpload: 'ব্যাংক ডিপোজিট স্লিপ আপলোড',
    dashDividends: 'মুনাফা ও উত্তোলন',
    dashMemberTransfer: 'মেম্বার ব্যালেন্স ট্রান্সফার',
    dashTransactions: 'লেনদেন ও পাসবই',
    dashCertificates: 'ডিজিটাল দলিলপত্র',
    dashKhatianVault: 'খতিয়ান ও নামজারি রেকর্ড রুম',
    dashTaxCert: 'ট্যাক্স সার্টিফিকেট ও স্টেটমেন্ট',
    dashAnalytics: 'অ্যানালিটিক্স ও লাভ',
    dashAffiliate: 'রেফারেল ও নেটওয়ার্ক',
    dashReferralTree: 'জেনারেশন ট্রি ও টিম',
    dashSupport: 'সাপোর্ট ডেস্ক',
    dashSecurity: 'পাসওয়ার্ড ও টি-পিন নিরাপত্তা',

    // Dashboard Overview
    overviewTotalInvested: 'মোট পোর্টফোলিও মূল্য',
    overviewTotalPaid: 'পরিশোধিত মোট টাকা',
    overviewRemainingDue: 'অবশিষ্ট বকেয়া',
    overviewDividendsReceived: 'অর্জিত মোট লভ্যাংশ',
    nextInstallmentDue: 'পরবর্তী কিস্তির তারিখ',
    daysRemaining: 'দিন বাকি',
    payNow: 'এখনই পরিশোধ করুন',
    paymentProgress: 'প্লটের সামগ্রিক পরিশোধের অগ্রগতি',

    // Installments
    installmentsTitle: 'কিস্তির সময়সূচি ও অনলাইন পেমেন্ট',
    installmentsSubtitle: 'নির্ধারিত কিস্তি ট্র্যাক করুন বা বিকাশ/নগদ/ব্যাংকের মাধ্যমে তাৎক্ষণিক পরিশোধ করুন।',
    thInstallmentNo: 'নম্বর',
    thDueDate: 'প্রদেয় তারিখ',
    thAmount: 'পরিমাণ (টাকা)',
    thStatus: 'স্ট্যাটাস',
    thAction: 'রসিদ / করণীয়',
    statusPaid: 'পরিশোধিত',
    statusDue: 'বকেয়া আছে',
    statusUpcoming: 'আসন্ন',
    btnDownloadReceipt: 'রসিদ ডাউনলোড',
    btnPayOnline: 'অনলাইনে প্রদান',

    // Payment Gateway Modal
    modalPayTitle: 'নিরাপদ পেমেন্ট গেটওয়ে',
    modalPayDesc: 'সিটি স্কয়ার বিডি অনুমোদিত নিরাপদ পেমেন্ট চ্যানেল।',
    selectPaymentMethod: 'পেমেন্ট মাধ্যম বেছে নিন',
    bKashWallet: 'বিকাশ মার্চেন্ট পে',
    nagadWallet: 'নগদ ডিরেক্ট',
    bankTransfer: 'সিটি ব্যাংক / ইসলামী ব্যাংক / ডাচ-বাংলা',
    cardPay: 'ভিসা / মাস্টারকার্ড',
    inputTxId: 'ট্রানজেকশন আইডি / রেফারেন্স লিখুন',
    btnConfirmPayment: 'যাচাই ও নিশ্চিত করুন',

    // Digital Documents
    docsTitle: 'ডিজিটাল দলিল ও শেয়ার সার্টিফিকেট',
    docsSubtitle: 'এন্ড-টু-এন্ড এনক্রিপ্টেড ও কিউআর যাচাইকৃত সরকারি রেকর্ড অনুমোদিত দলিল।',
    btnViewDoc: 'দলিল দেখুন',
    btnPrintDoc: 'প্রিন্ট / পিডিএফ সংরক্ষণ',
    verifiedStamp: 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার ও রাজউক মানসম্পন্ন',

    // Glance Widget
    glanceTitle: 'সিটি স্কয়ার পোর্টফোলিও একনজরে',
    glanceNextDue: 'পরবর্তী কিস্তি',
    glanceDividend: 'মাসিক লভ্যাংশ',
    glanceSynced: 'ক্লাউড সিঙ্ক সক্রিয়',
    glanceOffline: 'অফলাইন মোড (এনক্রিপ্টেড)',

    // Push Notifications
    notificationsTitle: 'রিয়েল-টাইম নোটিফিকেশন',
    markAllRead: 'সবগুলো পঠিত চিহ্নিত করুন',
    noNotifications: 'নতুন কোনো বার্তা নেই'
  }
};

export function getTranslation(lang: Language, key: keyof typeof translations.en): string {
  return translations[lang]?.[key] || translations.en[key] || key;
}

export function formatBDT(amount: number, lang: Language): string {
  if (lang === 'bn') {
    return '৳' + amount.toLocaleString('bn-BD');
  }
  return '৳' + amount.toLocaleString('en-US');
}
