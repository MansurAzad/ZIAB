import {
  User,
  PlotBooking,
  ShareInvestment,
  InstallmentRecord,
  TransactionRecord,
  AppNotification,
  SupportTicket,
  ProjectInfo,
  NoticeItem,
  VacationBooking,
  ReferralSignup,
  DoubleProfitPlan
} from '../types';
import {
  AdminInvestor,
  AdminPlotItem,
  AdminDepositSlip,
  AdminPlotTransferRequest,
  AdminSiteTourBooking,
  AdminDividendRound,
  AdminAuditLog
} from '../types/admin';

// Pre-seeded user data matching user's requested login: Ziabulctg1 / 123456
export const INITIAL_USER: User = {
  id: 'usr-ctg-8842',
  username: 'Ziabulctg1',
  fullName: 'Ziabul Hoque Chowdhury',
  fullNameBn: 'জিয়াবুল হক চৌধুরী',
  referralCode: 'CSBD-8842',
  email: 'ziabul.ctg@gmail.com',
  phone: '+880 1819-745239',
  branch: 'Chattogram Office (Salma Centre, Muradpur)',
  memberId: 'CSBD-CTG-8842',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  address: 'House #42, Road #3, South Agrabad C/A',
  city: 'Chattogram',
  nidNo: '1984 1592 7831 44',
  role: 'investor',
  joinedDate: '15 March 2024',
  e2eEncryptionKey: 'CSBD-AES256-GCM-e8b2a19f9301ac77',
  twoFactorEnabled: true,
  nominee: {
    name: 'Mrs. Taslima Ziabul',
    relation: 'Spouse',
    phone: '+880 1819-745240',
    nid: '1988 2419 8832 91'
  }
};

export const INITIAL_ADMIN: User = {
  id: 'usr-admin-001',
  username: 'admin',
  fullName: 'Md. Ripon Hossain (Super Admin)',
  fullNameBn: 'মোঃ রিপন হোসেন (সুপার এডমিন)',
  email: 'admin@citysquarebd.com',
  phone: '+880 1819-001122',
  branch: 'Corporate Head Office (Mirpur-12, Dhaka)',
  memberId: 'CSBD-HQ-001',
  avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
  address: 'City Square Tower, Pallabi, Mirpur-12',
  city: 'Dhaka',
  nidNo: '1975 1209 8832 01',
  role: 'admin',
  joinedDate: '01 January 2020',
  e2eEncryptionKey: 'CSBD-ADMIN-ROOT-KEY-990182',
  twoFactorEnabled: true,
  nominee: {
    name: 'H. M. Ziaur Rahman',
    relation: 'Managing Director Partner',
    phone: '+880 1819-001123',
    nid: '1978 4429 8812 02'
  }
};

export const INITIAL_PLOTS: PlotBooking[] = [
  {
    id: 'plot-purbachal-142',
    projectName: 'City R Mega Town - Purbachal',
    projectNameBn: 'সিটি আর মেগা টাউন - পূর্বাচল',
    sector: 'Sector 4',
    roadNo: 'Road #12 (60ft Wide Avenue)',
    plotNo: '142',
    katha: 5,
    facing: 'South-East Facing (Corner Plot)',
    totalCost: 3500000,
    paidAmount: 2100000,
    bookingDate: '2024-04-10',
    handoverDate: 'December 2027',
    status: 'allotted',
    nextDueDate: '2026-10-25',
    nextDueAmount: 35000,
    installmentTenureMonths: 48,
    completedInstallments: 24,
    totalInstallments: 48,
    rajukApproved: true,
    csSaRsBsVerified: true,
    allotmentLetterNo: 'CSBD/AL/PUR/2024/0842',
    coordinates: { x: 42, y: 38 }
  }
];

export const INITIAL_SHARES: ShareInvestment[] = [
  {
    id: 'share-cox-204',
    projectName: 'City Royal Bay Hotel & Suites - Cox\'s Bazar',
    projectNameBn: 'সিটি রয়্যাল বে হোটেল অ্যান্ড স্যুটস - কক্সবাজার',
    shareCategory: 'luxury_suite',
    shareUnits: 2,
    shareNumbers: ['RB-204', 'RB-205'],
    unitCost: 600000,
    totalInvestment: 1200000,
    paidAmount: 1200000,
    monthlyDividendAmount: 18500,
    totalDividendsEarned: 224500,
    purchaseDate: '2024-05-18',
    certificateNo: 'CSBD/SHR/CXB/2024/1109',
    projectCompletionPercentage: 88,
    annualRoiPercentage: 18.5,
    status: 'active'
  }
];

export const INITIAL_INSTALLMENTS: InstallmentRecord[] = [
  {
    id: 'inst-25',
    bookingId: 'plot-purbachal-142',
    title: 'Installment #25 (October 2026)',
    installmentNo: 25,
    dueDate: '2026-10-25',
    amount: 35000,
    status: 'due'
  },
  {
    id: 'inst-26',
    bookingId: 'plot-purbachal-142',
    title: 'Installment #26 (November 2026)',
    installmentNo: 26,
    dueDate: '2026-11-25',
    amount: 35000,
    status: 'upcoming'
  },
  {
    id: 'inst-24',
    bookingId: 'plot-purbachal-142',
    title: 'Installment #24 (September 2026)',
    installmentNo: 24,
    dueDate: '2026-09-25',
    amount: 35000,
    status: 'paid',
    paidDate: '2026-09-22',
    paymentMethod: 'bKash',
    transactionId: 'BK9X88291A',
    receiptNo: 'REC-2026-09-881'
  },
  {
    id: 'inst-23',
    bookingId: 'plot-purbachal-142',
    title: 'Installment #23 (August 2026)',
    installmentNo: 23,
    dueDate: '2026-08-25',
    amount: 35000,
    status: 'paid',
    paidDate: '2026-08-20',
    paymentMethod: 'Bank Transfer',
    transactionId: 'CBL-FT-491028',
    receiptNo: 'REC-2026-08-412'
  },
  {
    id: 'inst-22',
    bookingId: 'plot-purbachal-142',
    title: 'Installment #22 (July 2026)',
    installmentNo: 22,
    dueDate: '2026-07-25',
    amount: 35000,
    status: 'paid',
    paidDate: '2026-07-24',
    paymentMethod: 'Nagad',
    transactionId: 'NG8812048B',
    receiptNo: 'REC-2026-07-109'
  }
];

export const INITIAL_TRANSACTIONS: TransactionRecord[] = [
  {
    id: 'tx-101',
    date: '2026-10-01',
    title: 'Hotel Suite Monthly Dividend Distribution (Sept)',
    titleBn: 'হোটেল স্যুট মাসিক লভ্যাংশ বণ্টন (সেপ্টেম্বর)',
    category: 'dividend',
    amount: 18500,
    type: 'credit',
    status: 'completed',
    method: 'City Bank Auto-Credit',
    referenceNo: 'DIV-2026-09-CXB'
  },
  {
    id: 'tx-102',
    date: '2026-09-22',
    title: 'Installment Payment #24 - Plot #142 Purbachal',
    titleBn: 'কিস্তি পরিশোধ #২৪ - প্লট #১৪২ পূর্বাচল',
    category: 'installment',
    amount: 35000,
    type: 'debit',
    status: 'completed',
    method: 'bKash Gateway',
    referenceNo: 'BK9X88291A'
  },
  {
    id: 'tx-103',
    date: '2026-09-01',
    title: 'Hotel Suite Monthly Dividend Distribution (Aug)',
    titleBn: 'হোটেল স্যুট মাসিক লভ্যাংশ বণ্টন (আগস্ট)',
    category: 'dividend',
    amount: 18500,
    type: 'credit',
    status: 'completed',
    method: 'City Bank Auto-Credit',
    referenceNo: 'DIV-2026-08-CXB'
  },
  {
    id: 'tx-104',
    date: '2026-08-20',
    title: 'Installment Payment #23 - Plot #142 Purbachal',
    titleBn: 'কিস্তি পরিশোধ #২৩ - প্লট #১৪২ পূর্বাচল',
    category: 'installment',
    amount: 35000,
    type: 'debit',
    status: 'completed',
    method: 'City Bank Online Transfer',
    referenceNo: 'CBL-FT-491028'
  },
  {
    id: 'tx-105',
    date: '2026-08-15',
    title: 'Associate Referral Commission (Ctg Client Plot Booking)',
    titleBn: 'অ্যাসোসিয়েট রেফারেল কমিশন (চট্টগ্রাম ক্লায়েন্ট বুকিং)',
    category: 'referral',
    amount: 25000,
    type: 'credit',
    status: 'completed',
    method: 'CSBD Wallet Credit',
    referenceNo: 'REF-COMM-8842-1'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Installment Due Reminder',
    titleBn: 'কিস্তি পরিশোধের স্মারক',
    message: 'Your monthly installment of ৳35,000 for Plot #142 (City R Mega Town) is due on 25 October 2026.',
    messageBn: 'আপনার প্লট #১৪২ (সিটি আর মেগা টাউন)-এর মাসিক কিস্তি ৩৫,০০০ টাকা ২৫ অক্টোবর ২০২৬-এর মধ্যে প্রদেয়।',
    date: '2026-10-08',
    read: false,
    type: 'installment',
    actionUrl: 'installments'
  },
  {
    id: 'notif-2',
    title: 'Monthly Dividend Disbursed',
    titleBn: 'মাসিক লভ্যাংশ প্রদান সম্পন্ন',
    message: '৳18,500 has been credited to your linked City Bank account for Cox\'s Bazar Royal Bay shares.',
    messageBn: 'কক্সবাজার রয়্যাল বে শেয়ারের মাসিক লভ্যাংশ ১৮,৫০০ টাকা আপনার সিটি ব্যাংক একাউন্টে জমা হয়েছে।',
    date: '2026-10-01',
    read: false,
    type: 'dividend',
    actionUrl: 'transactions'
  },
  {
    id: 'notif-3',
    title: 'Purbachal Mega Town Construction Milestone',
    titleBn: 'পূর্বাচল মেগা টাউন উন্নয়ন অগ্রগতি',
    message: 'Sector 4 60ft arterial avenue blacktopping and drainage culvert work completed. 100% boundary secure.',
    messageBn: 'সেক্টর ৪-এর ৬০ ফুট প্রশস্ত প্রধান এভিনিউ পিচ ঢালাই এবং ড্রেনেজ কাজ সম্পন্ন হয়েছে। সীমানা প্রাচীর সম্পূর্ণ।',
    date: '2026-09-28',
    read: true,
    type: 'project',
    actionUrl: 'masterplan'
  }
];

export const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: 'tkt-1',
    ticketNo: 'CSBD-TKT-9021',
    subject: 'Request for certified copy of Deed Mutation & Sub-Registry clearance',
    category: 'mutation',
    priority: 'medium',
    status: 'in_progress',
    createdAt: '2026-09-15',
    updatedAt: '2026-09-17',
    messages: [
      {
        sender: 'user',
        senderName: 'Ziabul Hoque',
        text: 'Dear City Square BD Support, kindly provide the certified mutation extract copy for Sector 4, Plot 142 for my bank file.',
        timestamp: '2026-09-15 11:30 AM'
      },
      {
        sender: 'support',
        senderName: 'Md. Kamrul Hasan (Legal Officer)',
        text: 'Assalamu Alaikum Mr. Ziabul. Your certified copy is generated. You can view the authenticated digital copy in the Digital Certificates section.',
        timestamp: '2026-09-17 03:45 PM'
      }
    ]
  }
];

export const PUBLIC_PROJECTS: ProjectInfo[] = [
  {
    id: 'city-r-mega-town',
    name: 'City R Mega Town - Purbachal',
    nameBn: 'সিটি আর মেগা টাউন - পূর্বাচল',
    tagline: 'Modern Planned Township Adjacent to 300 Feet Expressway',
    taglineBn: '৩০০ ফুট এক্সপ্রেসওয়ের সন্নিকটে আধুনিক পরিকল্পিত আবাসন',
    category: 'residential',
    location: 'Purbachal Sector 4 Extension, Dhaka',
    locationBn: 'পূর্বাচল সেক্টর ৪ এক্সটেনশন, ঢাকা',
    size: '350+ Acres Master Planned',
    startingPrice: '৳7,00,000 / Katha',
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80',
    description: 'City R Mega Town is an exceptional residential project by City Square BD offering RAJUK adjacent, 100% dispute-free land with modern utilities, 60ft/40ft wide internal avenues, international schools, central mosque, and waterfront lake view parks.',
    features: [
      '100% CS, SA, RS, BS Mutation Clean & Vetted',
      'Instant Allotment & Registration Guarantee',
      'Flexible 36 to 60 Months Zero-Interest Installments',
      '40% Land Dedicated to Greenery & Amenities',
      '24/7 Security & Gated Perimeter Fence'
    ],
    featuresBn: [
      '১০০% সিএস, এসএ, আরএস, বিএস খারিজকৃত নির্ভেজাল জমি',
      'তাৎক্ষণিক বরাদ্দ ও সাব-রেজিস্ট্রি গ্যারান্টি',
      '৩৬ থেকে ৬০ মাসের সহজ কিস্তির সুযোগ',
      '৪০% জায়গা সবুজায়ন ও নাগরিক সুবিধার জন্য সংরক্ষিত',
      '২৪/৭ নিরাপত্তা ও সুরক্ষিত বাউন্ডারি প্রাচীর'
    ],
    rajukApproved: true,
    status: 'booking_open',
    overallProgressPercentage: 68,
    expectedHandoverYear: 'December 2027',
    milestones: [
      {
        id: 'm-pur-1',
        title: 'Land Acquisition & CS/SA/RS Mutation Clearance',
        titleBn: 'জমি অধিগ্রহণ ও খতিয়ান নামজারি সম্পন্ন',
        phase: 'Phase 1',
        targetDate: 'Q1 2024',
        completionPercentage: 100,
        status: 'completed',
        description: 'Complete 350-acre perimeter surveyed, verified with AC Land, sub-registry clearance obtained with 0% dispute title.',
        descriptionBn: '৩৫০ একর জমি সফলভাবে জরিপ ও সহকারী কমিশনার (ভূমি) দ্বারা নিরবচ্ছিন্ন নামজারি সম্পন্ন।',
        inspectorNote: 'Vetted by Supreme Court Senior Advocate & Sub-Registry panel',
        verifiedDate: '15 Jan 2024'
      },
      {
        id: 'm-pur-2',
        title: 'Perimeter Boundary Wall & Sand Filling',
        titleBn: 'সীমানা প্রাচীর ও বালু ভরাট কাজ',
        phase: 'Phase 2',
        targetDate: 'Q4 2024',
        completionPercentage: 100,
        status: 'completed',
        description: 'Heavy machinery hydraulic earth filling to 18ft elevation above flood level with continuous reinforced concrete boundary wall.',
        descriptionBn: 'বন্যা স্তরের ১৮ ফুট উপরে ড্রেজার দ্বারা বালু ভরাট এবং আরসিসি নিরাপত্তা প্রাচীর নির্মাণ সমাপ্ত।',
        inspectorNote: 'Soil compaction test cleared by BUET Civil Engineering dept.',
        verifiedDate: '28 Nov 2024'
      },
      {
        id: 'm-pur-3',
        title: 'Sector 4 60ft Arterial Avenue & Box Culverts',
        titleBn: 'সেক্টর ৪-এর ৬০ ফুট প্রধান এভিনিউ ও ড্রেনেজ কালভার্ট',
        phase: 'Phase 3',
        targetDate: 'Q3 2025',
        completionPercentage: 100,
        status: 'completed',
        description: 'Primary 60ft arterial connecting boulevard macadam base, RCC storm drainage network, and plot demarcation pillars installed.',
        descriptionBn: '৬০ ফুট প্রধান রাস্তা এবং বৃষ্টির পানি নিষ্কাশনের সমন্বিত আরসিসি ড্রেনেজ নেটওয়ার্ক সম্পন্ন।',
        inspectorNote: 'Bitumen carpeting and drainage flow vetted by PWD consultant',
        verifiedDate: '20 Aug 2025'
      },
      {
        id: 'm-pur-4',
        title: 'Underground Power Grid & Gas/Water Utilities',
        titleBn: 'ভূগর্ভস্থ বিদ্যুৎ লাইন ও ওয়াসা সংযোগ',
        phase: 'Phase 4',
        targetDate: 'Q2 2027',
        completionPercentage: 65,
        status: 'in_progress',
        description: 'Underground conduit ducting, 33kV dedicated sub-station civil construction, and deep tube-well water reservoir currently in progress.',
        descriptionBn: 'ভূগর্ভস্থ বৈদ্যুতিক তারের ডাক্ট ও সাব-স্টেশন অবকাঠামো নির্মাণ চলমান।',
        inspectorNote: 'Substation civil foundation 80% complete; transformer orders placed.',
        verifiedDate: 'Current Active Phase'
      },
      {
        id: 'm-pur-5',
        title: 'Lakeside Promenade, Grand Mosque & Final Handover',
        titleBn: 'লেকফ্রন্ট প্রমেনেড, জামে মসজিদ ও প্লট হস্তান্তর',
        phase: 'Phase 5',
        targetDate: 'Dec 2027',
        completionPercentage: 15,
        status: 'upcoming',
        description: 'Waterfront recreation park, central architectural mosque, security gatehouses, and full sub-registry registration handovers to investors.',
        descriptionBn: 'নান্দনিক লেকভিউ পার্ক, সেন্ট্রাল মসজিদ ও বিনিয়োগকারীদের পূর্ণ সাব-রেজিস্ট্রি দখল বুঝিয়ে দেওয়া।',
        inspectorNote: 'Architectural landscape tender finalized; on schedule for target handover.',
        verifiedDate: 'Scheduled 2027'
      }
    ]
  },
  {
    id: 'city-royal-bay',
    name: 'City Royal Bay Luxury Hotel & Suites',
    nameBn: 'সিটি রয়্যাল বে লাক্সারি হোটেল অ্যান্ড স্যুটস',
    tagline: '5-Star Hospitality Fractional Ownership & Monthly Profit Sharing',
    taglineBn: '৫-তারকা মানের হোটেল শেয়ার বিনিয়োগ ও প্রতিমাসে নিশ্চিত মুনাফা',
    category: 'hospitality',
    location: 'Marine Drive Road, Inani, Cox\'s Bazar',
    locationBn: 'মেরিন ড্রাইভ রোড, ইনানী, কক্সবাজার',
    size: '320 Keys Luxury Beachfront Resort',
    startingPrice: '৳6,00,000 / Suite Share',
    heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80',
    description: 'A landmark beachfront hospitality venture providing secure fractional share investment with guaranteed legal deed, lifetime vacation privileges (7 days free stay annually), and high-yield monthly revenue distribution.',
    features: [
      '18.5% to 22% Projected Annual Dividend Payout',
      'Monthly Auto-Transfer to Any Bangladeshi Bank Account',
      'Sub-Registry Fractional Ownership Deed Provided',
      '7 Days Free Annual Stay for Family with VIP Access',
      'Professional International Hotel Management Operator'
    ],
    featuresBn: [
      '১৮.৫% থেকে ২২% পর্যন্ত বার্ষিক প্রাক্কলিত মুনাফা',
      'বাংলাদেশের যেকোনো ব্যাংকে প্রতিমাসে সরাসরি মুনাফা জমা',
      'রেজিস্ট্রিকৃত শেয়ার দলিল ও সার্টিফিকেট প্রদান',
      'পরিবারসহ বছরে ৭ দিন বিনামূল্যে অবকাশ যাপনের সুযোগ',
      'আন্তর্জাতিক মানসম্পন্ন পেশাদার হোটেল ম্যানেজমেন্ট'
    ],
    rajukApproved: true,
    status: 'under_development',
    overallProgressPercentage: 88,
    expectedHandoverYear: 'August 2027',
    milestones: [
      {
        id: 'm-cxb-1',
        title: 'Coastal Deep Piling & Seismic Raft Foundation',
        titleBn: 'ডিপ পাইলিং ও ভূমিকম্প সহনশীল রাফট ফাউন্ডেশন',
        phase: 'Phase 1',
        targetDate: 'Q1 2024',
        completionPercentage: 100,
        status: 'completed',
        description: 'Cast-in-situ bored piling to 35m depth with marine-grade sulphate-resistant concrete and seismic damper isolators.',
        descriptionBn: '৩৫ মিটার গভীরতায় মেরিন-গ্রেড কংক্রিট পাইলিং ও ভূমিকম্প প্রতিরোধী ফাউন্ডেশন কাজ সম্পন্ন।',
        inspectorNote: 'Load-bearing stress certified by Bureau Veritas Quality Assurance',
        verifiedDate: '12 March 2024'
      },
      {
        id: 'm-cxb-2',
        title: '12-Story Beachfront RCC Superstructure Frame',
        titleBn: '১২-তলা মূল আরসিসি কাঠামোর ছাদ ঢালাই',
        phase: 'Phase 2',
        targetDate: 'Q4 2024',
        completionPercentage: 100,
        status: 'completed',
        description: 'All 12 floors of reinforced architectural concrete structure completed including ballroom and panoramic ocean-view sky lounge.',
        descriptionBn: '১২ তলা পর্যন্ত মূল কাঠামোর ছাদ ঢালাই ও স্কাই লাউঞ্জ কাঠামো শতভাগ সম্পন্ন।',
        inspectorNote: 'Structural safety compliance certificate issued',
        verifiedDate: '18 Dec 2024'
      },
      {
        id: 'm-cxb-3',
        title: 'Double-Glazed Hurricane Façade & Infinity Pool',
        titleBn: 'হারিকেন-প্রতিরোধী গ্লাস ফ্যাসাড ও ইনফিনিটি পুল',
        phase: 'Phase 3',
        targetDate: 'Q3 2025',
        completionPercentage: 100,
        status: 'completed',
        description: 'Acoustic thermal double-glazed curtain glass installation and 5th-floor heated oceanfront infinity pool structural waterproofing.',
        descriptionBn: 'ঝড় প্রতিরোধী ডাবল-গ্লেজড গ্লাস স্থাপন ও ৫ম তলার সমুদ্রমুখী ইনফিনিটি পুলের ওয়াটারপ্রুফিং সম্পন্ন।',
        inspectorNote: 'Hydrostatic water pressure testing passed at 100% capacity',
        verifiedDate: '10 July 2025'
      },
      {
        id: 'm-cxb-4',
        title: 'Interior Luxury Suite Fitouts & Central VRF HVAC',
        titleBn: 'স্যুট ইন্টেরিয়র ফিটআউট ও সেন্ট্রাল ভিআরএফ এসি',
        phase: 'Phase 4',
        targetDate: 'Q2 2027',
        completionPercentage: 82,
        status: 'in_progress',
        description: 'Imported marble bathrooms, custom walnut millwork, high-efficiency Japanese Daikin VRF cooling, and elevators installation.',
        descriptionBn: 'বিলাসবহুল স্যুটের মার্বেল ফিটিংস ও সেন্ট্রাল এয়ার কন্ডিশনিং কাজ প্রায় সমাপ্তির পথে।',
        inspectorNote: 'Floors 2 to 9 fitouts complete; top suites and lobby styling ongoing.',
        verifiedDate: 'Current Active Phase'
      },
      {
        id: 'm-cxb-5',
        title: 'International Operator Trial Run & Grand Opening',
        titleBn: 'আন্তর্জাতিক অপারেটর ট্রায়াল রান ও গ্র্যান্ড ওপেনিং',
        phase: 'Phase 5',
        targetDate: 'Aug 2027',
        completionPercentage: 10,
        status: 'upcoming',
        description: 'Staff hospitality training, fire safety clearance, commercial booking engine launch, and investor dividend payout initiation.',
        descriptionBn: 'হোটেল স্টাফদের প্রশিক্ষণ, ফায়ার সেফটি অনুমোদন ও বিনিয়োগকারীদের মাসিক মুনাফা বিতরণ শুরু।',
        inspectorNote: 'Hospitality management contract signed with 5-star resort chain.',
        verifiedDate: 'Scheduled 2027'
      }
    ]
  },
  {
    id: 'city-pallabi-square',
    name: 'City Square Commercial Center - Mirpur',
    nameBn: 'সিটি স্কয়ার কমার্শিয়াল সেন্টার - মিরপুর',
    tagline: 'Prime Commercial Retail & Office Tower in Pallabi',
    taglineBn: 'পল্লবী মিরপুরে আধুনিক বাণিজ্যিক ও রিটেইল স্পেস',
    category: 'commercial',
    location: 'Section 12, Pallabi, Mirpur, Dhaka',
    locationBn: 'সেকশন ১২, পল্লবী, মিরপুর, ঢাকা',
    size: '14 Storied Modern Commercial Hub',
    startingPrice: '৳15,00,000 / Floor Share',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
    description: 'Strategically positioned next to the Pallabi Metro Station, City Square Commercial Center is designed for corporate headquarters, banking institutions, and premium brand showrooms with triple-level basement parking.',
    features: [
      'Direct 2-Minute Walk from Pallabi MRT Metro Station',
      'High Footfall Commercial Hotspot',
      'Central VRF Air Conditioning & High-Speed Elevators',
      'Guaranteed Rental Yield Agreement Option'
    ],
    featuresBn: [
      'পল্লবী মেট্রো স্টেশন থেকে মাত্র ২ মিনিটের হাঁটা দূরত্ব',
      'ব্যস্ত বাণিজ্যিক এলাকা ও বিশাল ক্রেতা সমাগম',
      'সেন্ট্রাল এসি ও উচ্চগতির আধুনিক লিফট',
      'নিশ্চিত ভাড়া আয়ের বিশেষ চুক্তি সুবিধা'
    ],
    rajukApproved: true,
    status: 'handover_started',
    overallProgressPercentage: 96,
    expectedHandoverYear: 'May 2027',
    milestones: [
      {
        id: 'm-pal-1',
        title: 'Triple-Basement Diaphragm Wall & Deep Excavation',
        titleBn: '৩-তলা বেসমেন্ট ডায়াফ্রাম ওয়াল ও গভীর খনন কাজ',
        phase: 'Phase 1',
        targetDate: '2023',
        completionPercentage: 100,
        status: 'completed',
        description: 'Deep 42ft excavation for 3-level automated car parking with perimeter soldier piles and water ingress barrier.',
        descriptionBn: '৩ স্তরের গাড়ি পার্কিংয়ের জন্য ৪২ ফুট খনন এবং পেরিমিটার ডায়াফ্রাম ওয়াল সফলভাবে সমাপ্ত।',
        inspectorNote: 'Geotechnical soil retention certified without neighborhood settlement',
        verifiedDate: '14 Dec 2023'
      },
      {
        id: 'm-pal-2',
        title: '14-Story Commercial Tower RCC Core & Slabs',
        titleBn: '১৪-তলা বাণিজ্যিক ভবনের মূল কাঠামো',
        phase: 'Phase 2',
        targetDate: '2024',
        completionPercentage: 100,
        status: 'completed',
        description: 'Seismic Grade-75 post-tensioned beam-free slabs for maximum corporate open floor-plate flexibility.',
        descriptionBn: 'পোস্ট-টেনশনড ওপেন ফ্লোরপ্লেট কাঠামো শতভাগ সম্পন্ন।',
        inspectorNote: 'Concrete cube compression tests exceeded 4,500 PSI requirements',
        verifiedDate: '10 Nov 2024'
      },
      {
        id: 'm-pal-3',
        title: 'High-Speed Elevators & Central VRF Mechanical Plant',
        titleBn: 'উচ্চগতির আধুনিক লিফট ও সেন্ট্রাল ভিআরএফ এসি প্ল্যান্ট',
        phase: 'Phase 3',
        targetDate: '2025',
        completionPercentage: 100,
        status: 'completed',
        description: '4x Schindler 2.5m/s passenger elevators, rooftop cooling towers, and dual standby 1,000kVA Cummins generator sets.',
        descriptionBn: '৪টি উচ্চগতির শিন্ডলার লিফট ও ব্যাকআপ জেনারেটর স্থাপন সম্পন্ন।',
        inspectorNote: 'Elevator safety and backup power commissioning passed',
        verifiedDate: '05 Aug 2025'
      },
      {
        id: 'm-pal-4',
        title: 'Mirpur Metro Station Skywalk & Showroom Handover',
        titleBn: 'মেট্রো স্টেশন স্কাইওয়াক ও শোরুম স্পেস হস্তান্তর',
        phase: 'Phase 4',
        targetDate: 'Dec 2026',
        completionPercentage: 92,
        status: 'in_progress',
        description: 'Ground and 1st floor bank & anchor tenant showroom interior fitouts and direct covered footbridge link.',
        descriptionBn: 'গ্রাউন্ড ও ১ম তলার রিটেইল স্পেস হস্তান্তর এবং সংযোগ ব্রিজের কাজ চলমান।',
        inspectorNote: 'Fire safety NFPA standards clearance received',
        verifiedDate: 'Current Active Phase'
      },
      {
        id: 'm-pal-5',
        title: 'Full Building Commercial Handover & Occupancy',
        titleBn: 'পূর্ণাঙ্গ ভবনের বাণিজ্যিক উদ্বোধন ও দখল প্রদান',
        phase: 'Phase 5',
        targetDate: 'May 2027',
        completionPercentage: 20,
        status: 'upcoming',
        description: 'Final municipal occupancy certificate issuance and rental yield cash disbursements to retail space owners.',
        descriptionBn: 'রাজউক অকুপেন্সি সার্টিফিকেট ও স্পেস মালিকদের মাসিক ভাড়া আয় প্রদান শুরু।',
        inspectorNote: 'Final inspection checklist on schedule',
        verifiedDate: 'Scheduled 2027'
      }
    ]
  }
];

// Initial data constants for Admin CRM and shared tables:
export const INITIAL_ADMIN_INVESTORS: AdminInvestor[] = [
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
    username: 'tanvir_engr',
    fullName: 'Engr. Tanvir Ahmed',
    fullNameBn: 'প্রকৌঃ তানভীর আহমেদ',
    phone: '+880 1711-223344',
    email: 'tanvir.ahmed@buet.ac.bd',
    memberId: 'CSBD-DHK-5512',
    branch: 'Dhaka Principal Branch',
    rank: 'Silver Associate',
    kycStatus: 'verified',
    nidNo: '1986 2819 0451 90',
    totalInvested: 5200000,
    commissionBalance: 42000,
    dividendBalance: 92500,
    status: 'active',
    joinedDate: '01 June 2024',
    nomineeName: 'Farhana Ahmed',
    nomineeRelation: 'Spouse'
  },
  {
    id: 'usr-dhk-103',
    username: 'farhana_doc',
    fullName: 'Dr. Farhana Yasmin',
    fullNameBn: 'ডাঃ ফারহানা ইয়াসমিন',
    phone: '+880 1712-998877',
    email: 'farhana.dr@dmc.edu.bd',
    memberId: 'CSBD-DHK-6623',
    branch: 'Dhaka Corporate Office',
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
];

export const INITIAL_DEPOSIT_SLIPS: AdminDepositSlip[] = [
  {
    id: 'slip-01',
    slipNo: 'CBL-DEP-741982',
    memberUsername: 'Ziabulctg1',
    memberName: 'Ziabul Hoque Chowdhury',
    memberId: 'CSBD-CTG-8842',
    bookingId: 'plot-purbachal-142',
    projectName: 'City R Mega Town - Purbachal',
    bankName: 'The City Bank Ltd',
    branchName: 'Agrabad Commercial Branch, Ctg',
    amount: 35000,
    depositDate: '2026-09-22',
    transactionId: 'CBL-FT-491028',
    slipImageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
    notes: 'Installment #24 Cash Deposit at Bank counter verified.',
    status: 'approved',
    submittedAt: '22 Sep 2026, 02:40 PM'
  },
  {
    id: 'slip-02',
    slipNo: 'SLIP-PUR-8820',
    memberUsername: 'anwar_ctg',
    memberName: 'Md. Anwar Hossain',
    memberId: 'CSBD-CTG-9021',
    bookingId: 'plot-168',
    projectName: 'City R Mega Town - Purbachal',
    bankName: 'Islami Bank Bangladesh Ltd',
    branchName: 'Khatungonj Corporate Branch',
    amount: 35000,
    depositDate: '2026-10-09',
    transactionId: 'IBBL-CHQ-990142',
    slipImageUrl: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=600&auto=format&fit=crop&q=80',
    notes: 'Installment #02 cheque deposit voucher pending reconciliation.',
    status: 'pending',
    submittedAt: '09 Oct 2026, 11:15 AM'
  },
  {
    id: 'slip-03',
    slipNo: 'SLIP-HOTEL-4412',
    memberUsername: 'tanvir_engr',
    memberName: 'Engr. Tanvir Ahmed',
    memberId: 'CSBD-DHK-5512',
    bookingId: 'share-coxbazar-204',
    projectName: "City Royal Bay Cox's Bazar",
    bankName: 'Dutch-Bangla Bank Ltd',
    branchName: 'Uttara Branch, Dhaka',
    amount: 50000,
    depositDate: '2026-10-08',
    transactionId: 'DBBL-NPSB-88310',
    slipImageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80',
    notes: 'Fractional Suite 2nd downpayment bank deposit slip.',
    status: 'pending',
    submittedAt: '08 Oct 2026, 04:30 PM'
  }
];

export const INITIAL_SITE_TOURS: AdminSiteTourBooking[] = [
  {
    id: 'tour-01',
    clientName: 'Alhajj Mustafizur Rahman (accompanied by son)',
    phone: '+880 1715-889900',
    preferredDate: 'Friday, 17 Oct 2026',
    timeSlot: 'Morning (08:30 AM)',
    projectInterested: 'City R Mega Town (Purbachal Expressway)',
    pickupLocation: 'Mirpur-12 Corporate Head Office, Dhaka',
    guestsCount: 4,
    assignedBus: 'AC Microbus #01 (Dhaka Metro-Cha 11-8842)',
    coordinator: 'Engr. Masum Billah (Assistant General Manager)',
    status: 'confirmed',
    createdAt: '09 Oct 2026'
  },
  {
    id: 'tour-02',
    clientName: 'Dr. Shahabuddin & Family',
    phone: '+880 1819-223344',
    preferredDate: 'Saturday, 18 Oct 2026',
    timeSlot: 'Morning (09:00 AM)',
    projectInterested: 'Mawa Project 1 (Padma Bridge Expressway)',
    pickupLocation: 'Dhanmondi 27 (Rapa Plaza Point)',
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
];

export const INITIAL_NOTICES: NoticeItem[] = [
  {
    id: 'ntc-01',
    title: 'পূর্বাচল সিটি আর মেগা টাউন ৪র্থ সেক্টরের প্লট নম্বর লটারী ও বায়না রেজিস্ট্রেশন নোটিশ',
    category: 'Plot Draw & Allotment',
    content: 'সকল সম্মানিত বিনিয়োগকারীগণের অবগতির জন্য জানানো যাচ্ছে যে, আগামী ২৫ অক্টোবর ২০২৬ তারিখ সকাল ১০টায় হেড অফিসে প্লট লটারী ড্র ও বায়না দলিল রেজিস্ট্রেশন অনুষ্ঠিত হবে।',
    date: '০৮ অক্টোবর ২০২৬',
    priority: 'high',
    status: 'published'
  },
  {
    id: 'ntc-02',
    title: 'সিটি রয়্যাল বে হোটেল কুয়াকাটার ৩য় ত্রৈমাসিক লভ্যাংশ বণ্টন সম্পন্ন',
    category: 'Dividend Distribution',
    content: 'কুয়াকাটা সানসেট বে ও কক্সবাজার রয়্যাল বে প্রকল্পের সম্মানিত সকল শেয়ারহোল্ডারদের সেপ্টেম্বর ২০২৬ মাসের লভ্যাংশ তাঁদের লিঙ্কড ব্যাংক একাউন্টে সফলভাবে জমা করা হয়েছে।',
    date: '০১ অক্টোবর ২০২৬',
    priority: 'normal',
    status: 'published'
  },
  {
    id: 'ntc-03',
    title: 'শুক্রবার ও শনিবার পারিবারিক সাইট ভিজিটের জন্য এসি বাস পিক-আপ শিডিউল',
    category: 'Site Visit Schedule',
    content: 'প্রতি শুক্রবার ও শনিবার পরিবারসহ পূর্বাচল সিটি আর মেগা টাউন ও পদ্মা এক্সপ্রেসওয়ে প্রজেক্ট ভিজিটের জন্য মিরপুর-১২ ও উত্তরা হাউজবিল্ডিং থেকে শীতাতপ নিয়ন্ত্রিত মাইক্রোবাস যাত্রা করবে।',
    date: '২৬ সেপ্টেম্বর ২০২৬',
    priority: 'normal',
    status: 'published'
  }
];

export const INITIAL_VACATION_BOOKINGS: VacationBooking[] = [
  {
    id: 'vac-01',
    memberId: 'CSBD-CTG-8842',
    memberName: 'Ziabul Hoque Chowdhury',
    checkInDate: '2026-11-12',
    checkOutDate: '2026-11-15',
    guestsCount: 2,
    roomType: 'Royal Suite (Ocean Front, 6th Floor)',
    specialRequest: 'High floor ocean-view suite requested with complimentary airport pickup.',
    bookingStatus: 'confirmed',
    confirmationCode: 'RB-VAC-2026-8842',
    createdAt: '2026-10-05'
  }
];

export const INITIAL_TRANSFER_REQUESTS: AdminPlotTransferRequest[] = [
  {
    id: 'noc-01',
    requestNo: 'NOC-2026-084',
    originalMemberUsername: 'Ziabulctg1',
    originalMemberName: 'Ziabul Hoque Chowdhury',
    plotNo: '142',
    projectName: 'City R Mega Town - Purbachal',
    buyerName: 'Mohammed Rashedul Karim',
    buyerPhone: '+880 1817-654321',
    buyerNid: '1979 1592 7831 00',
    transferFee: 50000,
    nocStatus: 'under_review',
    appliedDate: '08 Oct 2026'
  }
];

export const INITIAL_AUDIT_LOGS: AdminAuditLog[] = [
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
];

export const INITIAL_DOUBLE_PROFIT_PLANS: DoubleProfitPlan[] = [
  {
    id: 'dplan-8842-1',
    memberId: 'CSBD-CTG-8842',
    memberName: 'Ziabul Hoque Chowdhury',
    packageName: 'Executive Gold Double Profit (12 Months)',
    packageNameBn: 'গোল্ড প্যাকেজ: ১২ মাসে দ্বিগুণ নিশ্চিত মুনাফা',
    principalAmount: 500000,
    totalReturnAmount: 1000000, // 2x principal in 12 months
    monthlyInstallmentAmount: 83333,
    totalMonths: 12,
    paidInstallments: 5,
    remainingInstallments: 7,
    totalPaidOut: 416665,
    startDate: '2026-05-01',
    nextPayoutDate: '2026-11-01',
    status: 'active',
    agreementDeedNo: 'CZS-DP-2026-8842-A',
    pdcCheckNumbers: ['IBBL-PDC-092141', 'IBBL-PDC-092142', 'IBBL-PDC-092143', 'IBBL-PDC-092144', 'IBBL-PDC-092145', 'IBBL-PDC-092146', 'IBBL-PDC-092147']
  },
  {
    id: 'dplan-9021-2',
    memberId: 'CSBD-CTG-9021',
    memberName: 'Md. Anwar Hossain',
    packageName: 'Silver Wealth Booster (12 Months)',
    packageNameBn: 'সিলভার প্যাকেজ: ১২ মাসে দ্বিগুণ কিস্তিভিত্তিক মুনাফা',
    principalAmount: 250000,
    totalReturnAmount: 500000,
    monthlyInstallmentAmount: 41666,
    totalMonths: 12,
    paidInstallments: 3,
    remainingInstallments: 9,
    totalPaidOut: 124998,
    startDate: '2026-07-01',
    nextPayoutDate: '2026-11-01',
    status: 'active',
    agreementDeedNo: 'CZS-DP-2026-9021-B',
    pdcCheckNumbers: ['CBL-PDC-441021', 'CBL-PDC-441022', 'CBL-PDC-441023']
  }
];

export const INITIAL_REFERRAL_SIGNUPS: ReferralSignup[] = [
  {
    id: 'ref-101',
    name: 'Md. Anwar Hossain',
    nameBn: 'মোঃ আনোয়ার হোসেন',
    username: 'anwar_ctg',
    memberId: 'CSBD-CTG-9021',
    email: 'anwar.ctg@yahoo.com',
    phone: '+880 1819-334455',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    sponsorUsername: 'Ziabulctg1',
    sponsorName: 'Ziabul Hoque Chowdhury',
    generation: 1,
    signupDate: '15 Aug 2026',
    signupTime: '02:40 PM',
    status: 'active',
    assetBooked: 'City R Mega Town Purbachal (Sector 4, Plot #168)',
    investmentValue: 3500000,
    commissionEarned: 175000,
    commissionRate: 5,
    payoutStatus: 'credited',
    rank: 'Associate Member',
    location: 'Chattogram (Panchlaish)',
    kycVerified: true,
    notes: 'Down payment of ৳10 Lac verified. Monthly installment ongoing.'
  },
  {
    id: 'ref-102',
    name: 'Engr. Tanvir Ahmed Chowdhury',
    nameBn: 'প্রকৌঃ তানভীর আহমেদ চৌধুরী',
    username: 'tanvir_eng',
    memberId: 'CSBD-CTG-9104',
    email: 'tanvir.engr@gmail.com',
    phone: '+880 1711-889900',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    sponsorUsername: 'Ziabulctg1',
    sponsorName: 'Ziabul Hoque Chowdhury',
    generation: 1,
    signupDate: '04 Sep 2026',
    signupTime: '11:15 AM',
    status: 'active',
    assetBooked: 'City Royal Bay Kuakata (1 Suite Share)',
    investmentValue: 600000,
    commissionEarned: 30000,
    commissionRate: 5,
    payoutStatus: 'credited',
    rank: 'Executive Associate',
    location: 'Dhaka (Uttara Sector 7)',
    kycVerified: true,
    notes: 'Hotel suite share booked with one-time full settlement.'
  },
  {
    id: 'ref-103',
    name: 'Dr. Farhana Yasmin',
    nameBn: 'ডাঃ ফারহানা ইয়াসমিন',
    username: 'dr_farhana',
    memberId: 'CSBD-CTG-9218',
    email: 'farhana.dr@hospital.com',
    phone: '+880 1912-776655',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    sponsorUsername: 'Ziabulctg1',
    sponsorName: 'Ziabul Hoque Chowdhury',
    generation: 1,
    signupDate: '28 Sep 2026',
    signupTime: '04:50 PM',
    status: 'active',
    assetBooked: 'City Pallabi Square (Commercial Shop #304)',
    investmentValue: 2500000,
    commissionEarned: 125000,
    commissionRate: 5,
    payoutStatus: 'credited',
    rank: 'Associate Member',
    location: 'Chattogram (Nasirabad H/S)',
    kycVerified: true,
    notes: 'Commercial space in Mirpur-12 tower. Possession target 2027.'
  },
  {
    id: 'ref-201',
    name: 'Kazi Mashiur Rahman',
    nameBn: 'কাজী মশিউর রহমান',
    username: 'mashiur_kazi',
    memberId: 'CSBD-CTG-9355',
    email: 'mashiur.kazi@outlook.com',
    phone: '+880 1611-445566',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    sponsorUsername: 'anwar_ctg',
    sponsorName: 'Md. Anwar Hossain',
    generation: 2,
    signupDate: '10 Oct 2026',
    signupTime: '01:20 PM',
    status: 'active',
    assetBooked: 'City R Mega Town Purbachal (Sector 2, Plot #92)',
    investmentValue: 4800000,
    commissionEarned: 120000,
    commissionRate: 2.5,
    payoutStatus: 'available',
    rank: 'Associate Member',
    location: 'Cumilla Cantonment',
    kycVerified: true,
    notes: 'Secondary generation referral through Md. Anwar Hossain.'
  },
  {
    id: 'ref-202',
    name: 'Saiful Islam Sumon',
    nameBn: 'সাইফুল ইসলাম সুমন',
    username: 'saiful_sumon',
    memberId: 'CSBD-CTG-9410',
    email: 'saiful.sumon@gmail.com',
    phone: '+880 1822-112233',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    sponsorUsername: 'tanvir_eng',
    sponsorName: 'Engr. Tanvir Ahmed Chowdhury',
    generation: 2,
    signupDate: '14 Oct 2026',
    signupTime: '06:10 PM',
    status: 'active',
    assetBooked: 'City Royal Bay Kuakata (2 Suite Shares)',
    investmentValue: 1200000,
    commissionEarned: 30000,
    commissionRate: 2.5,
    payoutStatus: 'available',
    rank: 'Associate Member',
    location: 'Chattogram (Agrabad)',
    kycVerified: true,
    notes: 'Referred by Engr. Tanvir Ahmed. 2 Shares booked.'
  },
  {
    id: 'ref-301',
    name: 'Rubel Hossain',
    nameBn: 'রুবেল হোসেন',
    username: 'rubel_agrabad',
    memberId: 'CSBD-CTG-9502',
    email: 'rubel.ctg99@gmail.com',
    phone: '+880 1515-998877',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    sponsorUsername: 'mashiur_kazi',
    sponsorName: 'Kazi Mashiur Rahman',
    generation: 3,
    signupDate: '22 Oct 2026',
    signupTime: '10:05 AM',
    status: 'pending',
    assetBooked: 'City Padma Expressway (Plot #21, 3 Katha)',
    investmentValue: 2200000,
    commissionEarned: 22000,
    commissionRate: 1,
    payoutStatus: 'pending',
    rank: 'Member (In Review)',
    location: 'Chattogram (GEC Circle)',
    kycVerified: false,
    notes: 'Signed up via referral code. Initial booking form submitted, token verification in progress.'
  }
];

// Persistent state wrapper with End-to-End Encryption simulation
const STORAGE_KEYS = {
  USER: 'csbd_user_session_enc',
  PLOTS: 'csbd_plot_bookings_enc',
  SHARES: 'csbd_share_investments_enc',
  INSTALLMENTS: 'csbd_installments_enc',
  TRANSACTIONS: 'csbd_transactions_enc',
  NOTIFICATIONS: 'csbd_notifications_enc',
  TICKETS: 'csbd_tickets_enc',
  ADMIN_INVESTORS: 'csbd_admin_investors_enc',
  DEPOSIT_SLIPS: 'csbd_deposit_slips_enc',
  NOTICES: 'csbd_notices_enc',
  SITE_TOURS: 'csbd_site_tours_enc',
  VACATION_BOOKINGS: 'csbd_vacation_bookings_enc',
  TRANSFER_REQUESTS: 'csbd_transfer_requests_enc',
  AUDIT_LOGS: 'csbd_audit_logs_enc',
  REFERRAL_SIGNUPS: 'csbd_referral_signups_enc',
  DOUBLE_PROFIT_PLANS: 'csbd_double_profit_plans_enc',
  THEME: 'csbd_theme_preference',
  LANGUAGE: 'csbd_lang_preference',
  LAST_SYNC: 'csbd_last_cloud_sync'
};

// Simple AES-style cipher masking simulation for secure offline client persistence
function encryptPayload(data: unknown): string {
  try {
    const raw = JSON.stringify(data);
    return btoa(encodeURIComponent(raw));
  } catch {
    return '';
  }
}

function decryptPayload<T>(cipher: string | null, fallback: T): T {
  if (!cipher) return fallback;
  try {
    const raw = decodeURIComponent(atob(cipher));
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export class StorageService {
  static getUser(): User | null {
    const saved = localStorage.getItem(STORAGE_KEYS.USER);
    if (!saved) {
      // Default to null until logged in or preloaded
      return null;
    }
    return decryptPayload<User | null>(saved, null);
  }

  static login(usernameInput: string, passwordInput: string): User | null {
    const cleanedUser = usernameInput.trim().toLowerCase();
    const cleanedPass = passwordInput.trim();

    // Check pre-seeded credentials: Ziabulctg1 / 123456 (case-insensitive username)
    if (cleanedUser === 'ziabulctg1' && cleanedPass === '123456') {
      const user = INITIAL_USER;
      localStorage.setItem(STORAGE_KEYS.USER, encryptPayload(user));
      this.ensureDataInitialized();
      return user;
    }

    // Check pre-seeded admin credentials: admin / admin123 or 123456
    if ((cleanedUser === 'admin' || cleanedUser === 'citysquare') && (cleanedPass === 'admin123' || cleanedPass === '123456' || cleanedPass === 'admin')) {
      const admin = INITIAL_ADMIN;
      localStorage.setItem(STORAGE_KEYS.USER, encryptPayload(admin));
      this.ensureDataInitialized();
      return admin;
    }

    // Check if another custom registered user exists in localStorage
    const customUserJson = localStorage.getItem('csbd_registered_account_' + cleanedUser);
    if (customUserJson) {
      const parsed = JSON.parse(customUserJson);
      if (parsed.password === cleanedPass) {
        localStorage.setItem(STORAGE_KEYS.USER, encryptPayload(parsed.user));
        return parsed.user;
      }
    }

    return null;
  }

  static register(newUser: Partial<User>, password: string): User {
    const user: User = {
      id: 'usr-' + Date.now(),
      username: newUser.username || 'investor_' + Math.floor(Math.random() * 1000),
      fullName: newUser.fullName || 'Valued Investor',
      fullNameBn: newUser.fullNameBn || newUser.fullName || 'সম্মানিত বিনিয়োগকারী',
      email: newUser.email || 'investor@citysquarebd.com',
      phone: newUser.phone || '+880 1700-000000',
      branch: newUser.branch || 'Dhaka Head Office (Mirpur)',
      memberId: 'CSBD-' + Math.floor(1000 + Math.random() * 9000),
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      address: newUser.address || 'Dhaka, Bangladesh',
      city: newUser.city || 'Dhaka',
      nidNo: newUser.nidNo || '1990 0000 0000 00',
      role: 'investor',
      joinedDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      e2eEncryptionKey: 'CSBD-AES256-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
      twoFactorEnabled: false,
      nominee: newUser.nominee || {
        name: 'Authorized Nominee',
        relation: 'Family',
        phone: '+880 1700-000000',
        nid: '1995 0000 0000 00'
      }
    };

    localStorage.setItem(
      'csbd_registered_account_' + user.username.toLowerCase(),
      JSON.stringify({ user, password })
    );
    localStorage.setItem(STORAGE_KEYS.USER, encryptPayload(user));
    this.ensureDataInitialized();
    return user;
  }

  static updateUser(updates: Partial<User>): User {
    const current = this.getUser() || INITIAL_USER;
    const updated: User = { ...current, ...updates };
    localStorage.setItem(STORAGE_KEYS.USER, encryptPayload(updated));

    // Also sync with admin investors CRM if matching
    const investors = this.getAdminInvestors();
    const idx = investors.findIndex(i => i.username.toLowerCase() === current.username.toLowerCase() || i.id === current.id);
    if (idx !== -1) {
      investors[idx] = {
        ...investors[idx],
        fullName: updated.fullName,
        fullNameBn: updated.fullNameBn || investors[idx].fullNameBn,
        phone: updated.phone,
        email: updated.email,
        nidNo: updated.nidNo,
        nomineeName: updated.nominee?.name || investors[idx].nomineeName,
        nomineeRelation: updated.nominee?.relation || investors[idx].nomineeRelation
      };
      localStorage.setItem(STORAGE_KEYS.ADMIN_INVESTORS, encryptPayload(investors));
    }

    this.updateLastSync();
    return updated;
  }

  static logout(): void {
    localStorage.removeItem(STORAGE_KEYS.USER);
  }

  static ensureDataInitialized(): void {
    if (!localStorage.getItem(STORAGE_KEYS.PLOTS)) {
      localStorage.setItem(STORAGE_KEYS.PLOTS, encryptPayload(INITIAL_PLOTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SHARES)) {
      localStorage.setItem(STORAGE_KEYS.SHARES, encryptPayload(INITIAL_SHARES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.INSTALLMENTS)) {
      localStorage.setItem(STORAGE_KEYS.INSTALLMENTS, encryptPayload(INITIAL_INSTALLMENTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.TRANSACTIONS)) {
      localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, encryptPayload(INITIAL_TRANSACTIONS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, encryptPayload(INITIAL_NOTIFICATIONS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.TICKETS)) {
      localStorage.setItem(STORAGE_KEYS.TICKETS, encryptPayload(INITIAL_TICKETS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ADMIN_INVESTORS)) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_INVESTORS, encryptPayload(INITIAL_ADMIN_INVESTORS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.DEPOSIT_SLIPS)) {
      localStorage.setItem(STORAGE_KEYS.DEPOSIT_SLIPS, encryptPayload(INITIAL_DEPOSIT_SLIPS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.NOTICES)) {
      localStorage.setItem(STORAGE_KEYS.NOTICES, encryptPayload(INITIAL_NOTICES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SITE_TOURS)) {
      localStorage.setItem(STORAGE_KEYS.SITE_TOURS, encryptPayload(INITIAL_SITE_TOURS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.VACATION_BOOKINGS)) {
      localStorage.setItem(STORAGE_KEYS.VACATION_BOOKINGS, encryptPayload(INITIAL_VACATION_BOOKINGS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.TRANSFER_REQUESTS)) {
      localStorage.setItem(STORAGE_KEYS.TRANSFER_REQUESTS, encryptPayload(INITIAL_TRANSFER_REQUESTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS)) {
      localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, encryptPayload(INITIAL_AUDIT_LOGS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.REFERRAL_SIGNUPS)) {
      localStorage.setItem(STORAGE_KEYS.REFERRAL_SIGNUPS, encryptPayload(INITIAL_REFERRAL_SIGNUPS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.DOUBLE_PROFIT_PLANS)) {
      localStorage.setItem(STORAGE_KEYS.DOUBLE_PROFIT_PLANS, encryptPayload(INITIAL_DOUBLE_PROFIT_PLANS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.LAST_SYNC)) {
      localStorage.setItem(STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
    }
  }

  // --- PLOTS CRUD ---
  static getPlots(): PlotBooking[] {
    this.ensureDataInitialized();
    return decryptPayload<PlotBooking[]>(localStorage.getItem(STORAGE_KEYS.PLOTS), INITIAL_PLOTS);
  }

  static createPlot(plotData: Partial<PlotBooking>): PlotBooking {
    const plots = this.getPlots();
    const newPlot: PlotBooking = {
      id: plotData.id || 'plot-' + Date.now(),
      projectName: plotData.projectName || 'City R Mega Town - Purbachal',
      projectNameBn: plotData.projectNameBn || 'সিটি আর মেগা টাউন - পূর্বাচল',
      sector: plotData.sector || 'Sector 5',
      roadNo: plotData.roadNo || 'Road #4 (40ft Avenue)',
      plotNo: plotData.plotNo || String(Math.floor(100 + Math.random() * 900)),
      katha: plotData.katha || 5,
      facing: plotData.facing || 'South Facing',
      totalCost: plotData.totalCost || 3500000,
      paidAmount: plotData.paidAmount || 500000,
      bookingDate: plotData.bookingDate || new Date().toISOString().split('T')[0],
      handoverDate: plotData.handoverDate || 'December 2028',
      status: plotData.status || 'booked',
      nextDueDate: plotData.nextDueDate || '2026-11-15',
      nextDueAmount: plotData.nextDueAmount || 35000,
      installmentTenureMonths: plotData.installmentTenureMonths || 48,
      rajukApproved: plotData.rajukApproved !== undefined ? plotData.rajukApproved : true,
      csSaRsBsVerified: plotData.csSaRsBsVerified !== undefined ? plotData.csSaRsBsVerified : true,
      coordinates: plotData.coordinates || { x: 340, y: 190 },
      baynaRegistered: plotData.baynaRegistered || false,
      allotmentLetterNo: plotData.allotmentLetterNo || `CSBD/AL/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`,
      csDaagNo: plotData.csDaagNo || 'CS-940',
      saDaagNo: plotData.saDaagNo || 'SA-1182',
      rsDaagNo: plotData.rsDaagNo || 'RS-3490',
      bsDaagNo: plotData.bsDaagNo || 'BS-7812',
      mouza: plotData.mouza || 'Nagorgaon',
      jlNo: plotData.jlNo || 'JL-34',
      totalInstallments: plotData.totalInstallments || 48,
      completedInstallments: plotData.completedInstallments || 1,
      monthlyInstallmentAmount: plotData.monthlyInstallmentAmount || 35000
    };
    const updated = [newPlot, ...plots];
    localStorage.setItem(STORAGE_KEYS.PLOTS, encryptPayload(updated));
    this.updateLastSync();
    return newPlot;
  }

  static updatePlot(id: string, updates: Partial<PlotBooking>): PlotBooking | null {
    const plots = this.getPlots();
    const idx = plots.findIndex(p => p.id === id);
    if (idx === -1) return null;
    plots[idx] = { ...plots[idx], ...updates };
    localStorage.setItem(STORAGE_KEYS.PLOTS, encryptPayload(plots));
    this.updateLastSync();
    return plots[idx];
  }

  static deletePlot(id: string): boolean {
    const plots = this.getPlots();
    const filtered = plots.filter(p => p.id !== id);
    if (filtered.length !== plots.length) {
      localStorage.setItem(STORAGE_KEYS.PLOTS, encryptPayload(filtered));
      this.updateLastSync();
      return true;
    }
    return false;
  }

  // --- SHARES CRUD ---
  static getShares(): ShareInvestment[] {
    this.ensureDataInitialized();
    return decryptPayload<ShareInvestment[]>(localStorage.getItem(STORAGE_KEYS.SHARES), INITIAL_SHARES);
  }

  static createShare(shareData: Partial<ShareInvestment>): ShareInvestment {
    const shares = this.getShares();
    const newShare: ShareInvestment = {
      id: shareData.id || 'share-' + Date.now(),
      projectName: shareData.projectName || "City Royal Bay Hotel & Suites",
      projectNameBn: shareData.projectNameBn || "সিটি রয়্যাল বে হোটেল অ্যান্ড স্যুটস",
      location: shareData.location || "Marine Drive, Inani, Cox's Bazar",
      locationBn: shareData.locationBn || "মেরিন ড্রাইভ, ইনানী, কক্সবাজার",
      suiteNo: shareData.suiteNo || `Suite #${Math.floor(200 + Math.random() * 300)}`,
      shareCategory: shareData.shareCategory || 'luxury_suite',
      shareUnits: shareData.shareUnits || 1,
      shareNumbers: shareData.shareNumbers || [`SH-${Math.floor(1000 + Math.random() * 9000)}`],
      unitCost: shareData.unitCost || 600000,
      totalInvestment: shareData.totalInvestment || 600000,
      paidAmount: shareData.paidAmount || 600000,
      monthlyDividendAmount: shareData.monthlyDividendAmount || 9250,
      totalDividendsEarned: shareData.totalDividendsEarned || 0,
      purchaseDate: shareData.purchaseDate || new Date().toISOString().split('T')[0],
      certificateNo: shareData.certificateNo || `CSBD-SH-CERT-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      projectCompletionPercentage: shareData.projectCompletionPercentage || 95,
      annualRoiPercentage: shareData.annualRoiPercentage || 18.5,
      status: shareData.status || 'active'
    };
    const updated = [newShare, ...shares];
    localStorage.setItem(STORAGE_KEYS.SHARES, encryptPayload(updated));
    this.updateLastSync();
    return newShare;
  }

  static updateShare(id: string, updates: Partial<ShareInvestment>): ShareInvestment | null {
    const shares = this.getShares();
    const idx = shares.findIndex(s => s.id === id);
    if (idx === -1) return null;
    shares[idx] = { ...shares[idx], ...updates };
    localStorage.setItem(STORAGE_KEYS.SHARES, encryptPayload(shares));
    this.updateLastSync();
    return shares[idx];
  }

  static deleteShare(id: string): boolean {
    const shares = this.getShares();
    const filtered = shares.filter(s => s.id !== id);
    if (filtered.length !== shares.length) {
      localStorage.setItem(STORAGE_KEYS.SHARES, encryptPayload(filtered));
      this.updateLastSync();
      return true;
    }
    return false;
  }

  // --- 12-MONTH DOUBLE PROFIT PLANS CRUD & MONTHLY INSTALLMENT DISBURSEMENT ---
  static getDoubleProfitPlans(): DoubleProfitPlan[] {
    this.ensureDataInitialized();
    return decryptPayload<DoubleProfitPlan[]>(localStorage.getItem(STORAGE_KEYS.DOUBLE_PROFIT_PLANS), INITIAL_DOUBLE_PROFIT_PLANS);
  }

  static createDoubleProfitPlan(plan: Partial<DoubleProfitPlan>): DoubleProfitPlan {
    const plans = this.getDoubleProfitPlans();
    const user = this.getUser() || INITIAL_USER;
    const principal = plan.principalAmount || 100000;
    const totalReturn = principal * 2; // Guaranteed 2x Double Profit in 12 Months
    const monthlyInstallment = Math.round(totalReturn / 12);
    
    const newPlan: DoubleProfitPlan = {
      id: plan.id || 'dplan-' + Date.now(),
      memberId: plan.memberId || user.memberId,
      memberName: plan.memberName || user.fullName,
      packageName: plan.packageName || `৳${principal.toLocaleString()} 12-Month Double Return Plan`,
      packageNameBn: plan.packageNameBn || `৳${principal.toLocaleString()} ১২ মাসে ডাবল প্রফিট প্রকল্প`,
      principalAmount: principal,
      totalReturnAmount: totalReturn,
      monthlyInstallmentAmount: monthlyInstallment,
      totalMonths: 12,
      paidInstallments: 0,
      remainingInstallments: 12,
      totalPaidOut: 0,
      startDate: new Date().toISOString().split('T')[0],
      nextPayoutDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'active',
      agreementDeedNo: 'CZS-DP-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000),
      pdcCheckNumbers: Array.from({ length: 12 }, (_, i) => `IBBL-PDC-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000) + i}`)
    };

    const updated = [newPlan, ...plans];
    localStorage.setItem(STORAGE_KEYS.DOUBLE_PROFIT_PLANS, encryptPayload(updated));

    // Also record transaction
    const tx: TransactionRecord = {
      id: 'tx-dp-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      title: `Double Profit Plan Activation - ${newPlan.packageName}`,
      titleBn: `১২ মাসে দ্বিগুণ মুনাফা প্রকল্প সক্রিয়করণ`,
      category: 'booking',
      amount: principal,
      type: 'debit',
      status: 'completed',
      method: 'Online Investment Wallet',
      referenceNo: newPlan.agreementDeedNo
    };
    const txs = this.getTransactions();
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, encryptPayload([tx, ...txs]));

    this.addAuditLog('DOUBLE_PROFIT_PLAN_CREATED', newPlan.packageName, `User ${newPlan.memberName} enrolled in ৳${principal.toLocaleString()} 12-month double return plan.`);
    this.updateLastSync();
    return newPlan;
  }

  static disburseDoubleProfitInstallment(planId: string): { success: boolean; installmentAmount: number; message: string } | null {
    const plans = this.getDoubleProfitPlans();
    const idx = plans.findIndex(p => p.id === planId);
    if (idx === -1) return null;

    const plan = plans[idx];
    if (plan.remainingInstallments <= 0 || plan.status === 'completed') {
      return { success: false, installmentAmount: 0, message: 'Plan is already fully disbursed.' };
    }

    const installmentAmt = plan.monthlyInstallmentAmount;
    plan.paidInstallments += 1;
    plan.remainingInstallments -= 1;
    plan.totalPaidOut += installmentAmt;
    if (plan.remainingInstallments === 0) {
      plan.status = 'completed';
    }

    // Set next payout date 30 days ahead
    plan.nextPayoutDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    localStorage.setItem(STORAGE_KEYS.DOUBLE_PROFIT_PLANS, encryptPayload(plans));

    // Record credit transaction to member's account
    const payoutTx: TransactionRecord = {
      id: 'tx-payout-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      title: `Monthly Double Profit Installment #${plan.paidInstallments}/12 - ${plan.packageName}`,
      titleBn: `১২ মাসে ডাবল প্রফিট মাসিক কিস্তি #${plan.paidInstallments}/১২ বণ্টন`,
      category: 'dividend',
      amount: installmentAmt,
      type: 'credit',
      status: 'completed',
      method: 'Monthly Auto Installment Credit',
      referenceNo: `DP-INS-${plan.paidInstallments}-${Math.floor(1000 + Math.random() * 9000)}`
    };
    const currentTxs = this.getTransactions();
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, encryptPayload([payoutTx, ...currentTxs]));

    this.addAuditLog('DOUBLE_PROFIT_INSTALLMENT_DISBURSED', plan.packageName, `Disbursed installment #${plan.paidInstallments} of ৳${installmentAmt.toLocaleString()} to ${plan.memberName}`);
    this.updateLastSync();
    return { success: true, installmentAmount: installmentAmt, message: `Installment #${plan.paidInstallments} of ৳${installmentAmt.toLocaleString()} disbursed successfully!` };
  }

  static deleteDoubleProfitPlan(planId: string): boolean {
    const plans = this.getDoubleProfitPlans();
    const filtered = plans.filter(p => p.id !== planId);
    if (filtered.length !== plans.length) {
      localStorage.setItem(STORAGE_KEYS.DOUBLE_PROFIT_PLANS, encryptPayload(filtered));
      this.updateLastSync();
      return true;
    }
    return false;
  }

  // --- INSTALLMENTS CRUD ---
  static getInstallments(): InstallmentRecord[] {
    this.ensureDataInitialized();
    return decryptPayload<InstallmentRecord[]>(localStorage.getItem(STORAGE_KEYS.INSTALLMENTS), INITIAL_INSTALLMENTS);
  }

  static payInstallment(
    installmentId: string,
    method: 'bKash' | 'Nagad' | 'Rocket' | 'Bank Transfer' | 'Card',
    txId: string
  ): { success: boolean; transaction: TransactionRecord } {
    const installments = this.getInstallments();
    const instIndex = installments.findIndex(i => i.id === installmentId);
    if (instIndex === -1) {
      throw new Error('Installment not found');
    }

    const inst = installments[instIndex];
    const receiptNo = 'REC-' + new Date().getFullYear() + '-' + Math.floor(10000 + Math.random() * 90000);
    const paidDate = new Date().toISOString().split('T')[0];

    installments[instIndex] = {
      ...inst,
      status: 'paid',
      paidDate,
      paymentMethod: method,
      transactionId: txId || 'TX-' + Math.floor(100000 + Math.random() * 900000),
      receiptNo
    };

    localStorage.setItem(STORAGE_KEYS.INSTALLMENTS, encryptPayload(installments));

    // Update plot paid amount
    const plots = this.getPlots();
    if (plots.length > 0) {
      plots[0].paidAmount += inst.amount;
      plots[0].completedInstallments += 1;
      localStorage.setItem(STORAGE_KEYS.PLOTS, encryptPayload(plots));
    }

    // Add transaction record
    const newTx: TransactionRecord = {
      id: 'tx-' + Date.now(),
      date: paidDate,
      title: `Installment #${inst.installmentNo} Payment - City R Mega Town`,
      titleBn: `কিস্তি #${inst.installmentNo} পরিশোধ - সিটি আর মেগা টাউন`,
      category: 'installment',
      amount: inst.amount,
      type: 'debit',
      status: 'completed',
      method: `${method} (${txId || 'Online'})`,
      referenceNo: receiptNo
    };

    const transactions = [newTx, ...this.getTransactions()];
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, encryptPayload(transactions));

    // Add notification
    const newNotif: AppNotification = {
      id: 'notif-' + Date.now(),
      title: 'Payment Successful',
      titleBn: 'কিস্তি পরিশোধ সফল হয়েছে',
      message: `৳${inst.amount.toLocaleString()} received via ${method}. Receipt: ${receiptNo}`,
      messageBn: `৳${inst.amount.toLocaleString()} প্রদান গৃহীত হয়েছে (${method})। রসিদ নং: ${receiptNo}`,
      date: paidDate,
      read: false,
      type: 'installment',
      actionUrl: 'installments'
    };
    const notifications = [newNotif, ...this.getNotifications()];
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, encryptPayload(notifications));

    this.updateLastSync();
    return { success: true, transaction: newTx };
  }

  // --- TRANSACTIONS CRUD ---
  static getTransactions(): TransactionRecord[] {
    this.ensureDataInitialized();
    return decryptPayload<TransactionRecord[]>(localStorage.getItem(STORAGE_KEYS.TRANSACTIONS), INITIAL_TRANSACTIONS);
  }

  static addTransaction(tx: Partial<TransactionRecord>): TransactionRecord {
    const list = this.getTransactions();
    const newTx: TransactionRecord = {
      id: tx.id || 'tx-' + Date.now(),
      date: tx.date || new Date().toISOString().split('T')[0],
      title: tx.title || 'Ledger Transaction',
      titleBn: tx.titleBn || 'লেজার লেনদেন',
      category: tx.category || 'installment',
      amount: tx.amount || 0,
      type: tx.type || 'credit',
      status: tx.status || 'completed',
      method: tx.method || 'System Entry',
      referenceNo: tx.referenceNo || 'TXN-' + Math.floor(100000 + Math.random() * 900000)
    };
    const updated = [newTx, ...list];
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, encryptPayload(updated));
    this.updateLastSync();
    return newTx;
  }

  static deleteTransaction(id: string): boolean {
    const list = this.getTransactions();
    const filtered = list.filter(t => t.id !== id);
    if (filtered.length !== list.length) {
      localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, encryptPayload(filtered));
      this.updateLastSync();
      return true;
    }
    return false;
  }

  // --- ADMIN INVESTORS CRM CRUD ---
  static getAdminInvestors(): AdminInvestor[] {
    this.ensureDataInitialized();
    return decryptPayload<AdminInvestor[]>(localStorage.getItem(STORAGE_KEYS.ADMIN_INVESTORS), INITIAL_ADMIN_INVESTORS);
  }

  static createAdminInvestor(inv: Partial<AdminInvestor>): AdminInvestor {
    const list = this.getAdminInvestors();
    const newInv: AdminInvestor = {
      id: inv.id || 'usr-' + Date.now(),
      username: inv.username || 'member_' + Math.floor(100 + Math.random() * 900),
      fullName: inv.fullName || 'New Investor',
      fullNameBn: inv.fullNameBn,
      phone: inv.phone || '+880 1700-000000',
      email: inv.email || 'investor@example.com',
      memberId: inv.memberId || `CSBD-${inv.branch?.includes('Ctg') ? 'CTG' : 'DHK'}-${Math.floor(1000 + Math.random() * 9000)}`,
      branch: inv.branch || 'Corporate Head Office, Dhaka',
      rank: inv.rank || 'Associate Member',
      kycStatus: inv.kycStatus || 'pending',
      nidNo: inv.nidNo || '1990 0000 0000 00',
      totalInvested: inv.totalInvested || 0,
      commissionBalance: inv.commissionBalance || 0,
      dividendBalance: inv.dividendBalance || 0,
      status: inv.status || 'active',
      joinedDate: inv.joinedDate || new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      nomineeName: inv.nomineeName || 'N/A',
      nomineeRelation: inv.nomineeRelation || 'Spouse'
    };
    const updated = [newInv, ...list];
    localStorage.setItem(STORAGE_KEYS.ADMIN_INVESTORS, encryptPayload(updated));
    this.addAuditLog('CREATE_INVESTOR', `${newInv.memberId} (${newInv.fullName})`, 'New investor profile created via Admin CRM.');
    this.updateLastSync();
    return newInv;
  }

  static updateAdminInvestor(id: string, updates: Partial<AdminInvestor>): AdminInvestor | null {
    const list = this.getAdminInvestors();
    const idx = list.findIndex(i => i.id === id);
    if (idx === -1) return null;
    list[idx] = { ...list[idx], ...updates };
    localStorage.setItem(STORAGE_KEYS.ADMIN_INVESTORS, encryptPayload(list));
    this.addAuditLog('UPDATE_INVESTOR', `${list[idx].memberId} (${list[idx].fullName})`, 'Investor details updated via Admin CRM.');
    this.updateLastSync();
    return list[idx];
  }

  static deleteAdminInvestor(id: string): boolean {
    const list = this.getAdminInvestors();
    const target = list.find(i => i.id === id);
    const filtered = list.filter(i => i.id !== id);
    if (filtered.length !== list.length) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_INVESTORS, encryptPayload(filtered));
      if (target) {
        this.addAuditLog('DELETE_INVESTOR', `${target.memberId} (${target.fullName})`, 'Investor profile deleted from system.');
      }
      this.updateLastSync();
      return true;
    }
    return false;
  }

  static adjustInvestorWallet(id: string, type: 'commission' | 'dividend', amount: number, note?: string): boolean {
    const list = this.getAdminInvestors();
    const idx = list.findIndex(i => i.id === id);
    if (idx === -1) return false;
    if (type === 'commission') {
      list[idx].commissionBalance = Math.max(0, list[idx].commissionBalance + amount);
    } else {
      list[idx].dividendBalance = Math.max(0, list[idx].dividendBalance + amount);
    }
    localStorage.setItem(STORAGE_KEYS.ADMIN_INVESTORS, encryptPayload(list));
    this.addAuditLog('WALLET_ADJUSTMENT', `${list[idx].memberId} (${list[idx].fullName})`, `Adjusted ${type} balance by ৳${amount.toLocaleString()}. Note: ${note || 'Admin adjustment'}`);
    this.updateLastSync();
    return true;
  }

  // --- DEPOSIT SLIPS CRUD ---
  static getDepositSlips(): AdminDepositSlip[] {
    this.ensureDataInitialized();
    return decryptPayload<AdminDepositSlip[]>(localStorage.getItem(STORAGE_KEYS.DEPOSIT_SLIPS), INITIAL_DEPOSIT_SLIPS);
  }

  static createDepositSlip(slip: Partial<AdminDepositSlip>): AdminDepositSlip {
    const list = this.getDepositSlips();
    const user = this.getUser() || INITIAL_USER;
    const newSlip: AdminDepositSlip = {
      id: slip.id || 'slip-' + Date.now(),
      slipNo: slip.slipNo || 'SLIP-' + Math.floor(100000 + Math.random() * 900000),
      memberUsername: slip.memberUsername || user.username,
      memberName: slip.memberName || user.fullName,
      memberId: slip.memberId || user.memberId,
      bookingId: slip.bookingId || 'plot-purbachal-142',
      projectName: slip.projectName || 'City R Mega Town - Purbachal',
      bankName: slip.bankName || 'The City Bank Ltd',
      branchName: slip.branchName || 'Agrabad Branch',
      amount: slip.amount || 35000,
      depositDate: slip.depositDate || new Date().toISOString().split('T')[0],
      transactionId: slip.transactionId || 'DEP-' + Math.floor(100000 + Math.random() * 900000),
      slipImageUrl: slip.slipImageUrl || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
      notes: slip.notes || 'Offline bank deposit voucher submitted.',
      status: 'pending',
      submittedAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    const updated = [newSlip, ...list];
    localStorage.setItem(STORAGE_KEYS.DEPOSIT_SLIPS, encryptPayload(updated));
    this.addAuditLog('SUBMIT_SLIP', `${newSlip.slipNo} (${newSlip.memberName})`, `Deposit slip of ৳${newSlip.amount.toLocaleString()} submitted for verification.`);
    this.updateLastSync();
    return newSlip;
  }

  static updateDepositSlip(id: string, updates: Partial<AdminDepositSlip>): AdminDepositSlip | null {
    const list = this.getDepositSlips();
    const idx = list.findIndex(s => s.id === id);
    if (idx === -1) return null;
    list[idx] = { ...list[idx], ...updates };
    localStorage.setItem(STORAGE_KEYS.DEPOSIT_SLIPS, encryptPayload(list));
    this.updateLastSync();
    return list[idx];
  }

  static deleteDepositSlip(id: string): boolean {
    const list = this.getDepositSlips();
    const filtered = list.filter(s => s.id !== id);
    if (filtered.length !== list.length) {
      localStorage.setItem(STORAGE_KEYS.DEPOSIT_SLIPS, encryptPayload(filtered));
      this.updateLastSync();
      return true;
    }
    return false;
  }

  static approveDepositSlip(id: string): boolean {
    const slips = this.getDepositSlips();
    const idx = slips.findIndex(s => s.id === id);
    if (idx === -1) return false;
    const slip = slips[idx];
    slips[idx].status = 'approved';
    localStorage.setItem(STORAGE_KEYS.DEPOSIT_SLIPS, encryptPayload(slips));

    // Update installment if corresponding
    const installments = this.getInstallments();
    const pendingInst = installments.find(i => i.status === 'due') || installments[0];
    if (pendingInst) {
      this.payInstallment(pendingInst.id, 'Bank Transfer', slip.transactionId);
    }

    this.addAuditLog('APPROVE_DEPOSIT_SLIP', `${slip.slipNo} (${slip.memberName})`, `Approved ৳${slip.amount.toLocaleString()}. Official Money Receipt generated.`, 'success');
    this.updateLastSync();
    return true;
  }

  static rejectDepositSlip(id: string, reason: string): boolean {
    const slips = this.getDepositSlips();
    const idx = slips.findIndex(s => s.id === id);
    if (idx === -1) return false;
    const slip = slips[idx];
    slips[idx].status = 'rejected';
    slips[idx].notes = `Rejected: ${reason}`;
    localStorage.setItem(STORAGE_KEYS.DEPOSIT_SLIPS, encryptPayload(slips));
    this.addAuditLog('REJECT_DEPOSIT_SLIP', `${slip.slipNo} (${slip.memberName})`, `Rejected. Reason: ${reason}`, 'warning');
    this.updateLastSync();
    return true;
  }

  // --- NOTICES CMS CRUD ---
  static getNotices(): NoticeItem[] {
    this.ensureDataInitialized();
    return decryptPayload<NoticeItem[]>(localStorage.getItem(STORAGE_KEYS.NOTICES), INITIAL_NOTICES);
  }

  static createNotice(notice: Partial<NoticeItem>): NoticeItem {
    const list = this.getNotices();
    const newNotice: NoticeItem = {
      id: notice.id || 'ntc-' + Date.now(),
      title: notice.title || 'Official Announcement',
      category: notice.category || 'General',
      content: notice.content || '',
      date: notice.date || new Date().toLocaleDateString('bn-BD'),
      priority: notice.priority || 'normal',
      status: notice.status || 'published',
      documentUrl: notice.documentUrl
    };
    const updated = [newNotice, ...list];
    localStorage.setItem(STORAGE_KEYS.NOTICES, encryptPayload(updated));
    this.addAuditLog('PUBLISH_NOTICE', newNotice.title, `Published circular in category: ${newNotice.category}`);
    this.updateLastSync();
    return newNotice;
  }

  static updateNotice(id: string, updates: Partial<NoticeItem>): NoticeItem | null {
    const list = this.getNotices();
    const idx = list.findIndex(n => n.id === id);
    if (idx === -1) return null;
    list[idx] = { ...list[idx], ...updates };
    localStorage.setItem(STORAGE_KEYS.NOTICES, encryptPayload(list));
    this.updateLastSync();
    return list[idx];
  }

  static deleteNotice(id: string): boolean {
    const list = this.getNotices();
    const filtered = list.filter(n => n.id !== id);
    if (filtered.length !== list.length) {
      localStorage.setItem(STORAGE_KEYS.NOTICES, encryptPayload(filtered));
      this.updateLastSync();
      return true;
    }
    return false;
  }

  // --- SITE TOURS CRUD ---
  static getSiteTours(): AdminSiteTourBooking[] {
    this.ensureDataInitialized();
    return decryptPayload<AdminSiteTourBooking[]>(localStorage.getItem(STORAGE_KEYS.SITE_TOURS), INITIAL_SITE_TOURS);
  }

  static createSiteTour(tour: Partial<AdminSiteTourBooking>): AdminSiteTourBooking {
    const list = this.getSiteTours();
    const newTour: AdminSiteTourBooking = {
      id: tour.id || 'tour-' + Date.now(),
      clientName: tour.clientName || 'Valued Client',
      phone: tour.phone || '+880 1700-000000',
      preferredDate: tour.preferredDate || 'Friday, Upcoming',
      timeSlot: tour.timeSlot || 'Morning (09:00 AM)',
      projectInterested: tour.projectInterested || 'City R Mega Town (Purbachal Expressway)',
      pickupLocation: tour.pickupLocation || 'Mirpur-12 Corporate Head Office',
      guestsCount: tour.guestsCount || 2,
      assignedBus: tour.assignedBus,
      coordinator: tour.coordinator,
      status: tour.status || 'pending',
      createdAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    };
    const updated = [newTour, ...list];
    localStorage.setItem(STORAGE_KEYS.SITE_TOURS, encryptPayload(updated));
    this.updateLastSync();
    return newTour;
  }

  static updateSiteTour(id: string, updates: Partial<AdminSiteTourBooking>): AdminSiteTourBooking | null {
    const list = this.getSiteTours();
    const idx = list.findIndex(t => t.id === id);
    if (idx === -1) return null;
    list[idx] = { ...list[idx], ...updates };
    localStorage.setItem(STORAGE_KEYS.SITE_TOURS, encryptPayload(list));
    this.updateLastSync();
    return list[idx];
  }

  static deleteSiteTour(id: string): boolean {
    const list = this.getSiteTours();
    const filtered = list.filter(t => t.id !== id);
    if (filtered.length !== list.length) {
      localStorage.setItem(STORAGE_KEYS.SITE_TOURS, encryptPayload(filtered));
      this.updateLastSync();
      return true;
    }
    return false;
  }

  // --- VACATION BOOKINGS CRUD ---
  static getVacationBookings(): VacationBooking[] {
    this.ensureDataInitialized();
    return decryptPayload<VacationBooking[]>(localStorage.getItem(STORAGE_KEYS.VACATION_BOOKINGS), INITIAL_VACATION_BOOKINGS);
  }

  static createVacationBooking(booking: Partial<VacationBooking>): VacationBooking {
    const list = this.getVacationBookings();
    const user = this.getUser() || INITIAL_USER;
    const newBooking: VacationBooking = {
      id: booking.id || 'vac-' + Date.now(),
      memberId: booking.memberId || user.memberId,
      memberName: booking.memberName || user.fullName,
      checkInDate: booking.checkInDate || '2026-11-12',
      checkOutDate: booking.checkOutDate || '2026-11-15',
      guestsCount: booking.guestsCount || 2,
      roomType: booking.roomType || 'Royal Suite (Ocean Front, 6th Floor)',
      specialRequest: booking.specialRequest,
      bookingStatus: 'confirmed',
      confirmationCode: `RB-VAC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    const updated = [newBooking, ...list];
    localStorage.setItem(STORAGE_KEYS.VACATION_BOOKINGS, encryptPayload(updated));
    this.updateLastSync();
    return newBooking;
  }

  static updateVacationBooking(id: string, updates: Partial<VacationBooking>): VacationBooking | null {
    const list = this.getVacationBookings();
    const idx = list.findIndex(b => b.id === id);
    if (idx === -1) return null;
    list[idx] = { ...list[idx], ...updates };
    localStorage.setItem(STORAGE_KEYS.VACATION_BOOKINGS, encryptPayload(list));
    this.updateLastSync();
    return list[idx];
  }

  static deleteVacationBooking(id: string): boolean {
    const list = this.getVacationBookings();
    const filtered = list.filter(b => b.id !== id);
    if (filtered.length !== list.length) {
      localStorage.setItem(STORAGE_KEYS.VACATION_BOOKINGS, encryptPayload(filtered));
      this.updateLastSync();
      return true;
    }
    return false;
  }

  // --- SUPPORT TICKETS CRUD ---
  static getTickets(): SupportTicket[] {
    this.ensureDataInitialized();
    return decryptPayload<SupportTicket[]>(localStorage.getItem(STORAGE_KEYS.TICKETS), INITIAL_TICKETS);
  }

  static createTicket(subject: string, category: SupportTicket['category'], messageText: string, priority: SupportTicket['priority'] = 'medium'): SupportTicket {
    const user = this.getUser() || INITIAL_USER;
    const newTicket: SupportTicket = {
      id: 'tkt-' + Date.now(),
      ticketNo: 'CSBD-TKT-' + Math.floor(1000 + Math.random() * 9000),
      subject,
      category,
      priority,
      status: 'open',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      messages: [
        {
          sender: 'user',
          senderName: user.fullName,
          text: messageText,
          timestamp: 'Just now'
        }
      ]
    };

    const tickets = [newTicket, ...this.getTickets()];
    localStorage.setItem(STORAGE_KEYS.TICKETS, encryptPayload(tickets));
    this.updateLastSync();
    return newTicket;
  }

  static replyTicket(ticketId: string, replyText: string, sender: 'user' | 'support', senderName: string): SupportTicket | null {
    const tickets = this.getTickets();
    const idx = tickets.findIndex(t => t.id === ticketId);
    if (idx === -1) return null;
    tickets[idx].messages.push({
      sender,
      senderName,
      text: replyText,
      timestamp: 'Just now'
    });
    tickets[idx].updatedAt = new Date().toISOString().split('T')[0];
    if (sender === 'support') {
      tickets[idx].status = 'in_progress';
    }
    localStorage.setItem(STORAGE_KEYS.TICKETS, encryptPayload(tickets));
    this.updateLastSync();
    return tickets[idx];
  }

  static updateTicketStatus(ticketId: string, status: SupportTicket['status'], priority?: SupportTicket['priority']): SupportTicket | null {
    const tickets = this.getTickets();
    const idx = tickets.findIndex(t => t.id === ticketId);
    if (idx === -1) return null;
    tickets[idx].status = status;
    if (priority) tickets[idx].priority = priority;
    tickets[idx].updatedAt = new Date().toISOString().split('T')[0];
    localStorage.setItem(STORAGE_KEYS.TICKETS, encryptPayload(tickets));
    this.updateLastSync();
    return tickets[idx];
  }

  static deleteTicket(ticketId: string): boolean {
    const tickets = this.getTickets();
    const filtered = tickets.filter(t => t.id !== ticketId);
    if (filtered.length !== tickets.length) {
      localStorage.setItem(STORAGE_KEYS.TICKETS, encryptPayload(filtered));
      this.updateLastSync();
      return true;
    }
    return false;
  }

  // --- PLOT RESALE & TRANSFER NOC REQUESTS CRUD ---
  static getTransferRequests(): AdminPlotTransferRequest[] {
    this.ensureDataInitialized();
    return decryptPayload<AdminPlotTransferRequest[]>(localStorage.getItem(STORAGE_KEYS.TRANSFER_REQUESTS), INITIAL_TRANSFER_REQUESTS);
  }

  static createTransferRequest(req: Partial<AdminPlotTransferRequest>): AdminPlotTransferRequest {
    const list = this.getTransferRequests();
    const user = this.getUser() || INITIAL_USER;
    const newReq: AdminPlotTransferRequest = {
      id: req.id || 'noc-' + Date.now(),
      requestNo: req.requestNo || 'NOC-' + new Date().getFullYear() + '-' + Math.floor(100 + Math.random() * 900),
      originalMemberUsername: req.originalMemberUsername || user.username,
      originalMemberName: req.originalMemberName || user.fullName,
      plotNo: req.plotNo || '142',
      projectName: req.projectName || 'City R Mega Town - Purbachal',
      buyerName: req.buyerName || 'New Buyer Name',
      buyerPhone: req.buyerPhone || '+880 1700-000000',
      buyerNid: req.buyerNid || '1980 0000 0000 00',
      transferFee: req.transferFee || 50000,
      nocStatus: 'under_review',
      appliedDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    };
    const updated = [newReq, ...list];
    localStorage.setItem(STORAGE_KEYS.TRANSFER_REQUESTS, encryptPayload(updated));
    this.addAuditLog('SUBMIT_NOC', newReq.requestNo, `Transfer NOC requested for Plot #${newReq.plotNo} to ${newReq.buyerName}`);
    this.updateLastSync();
    return newReq;
  }

  static approveTransferRequest(id: string): boolean {
    const list = this.getTransferRequests();
    const idx = list.findIndex(r => r.id === id);
    if (idx === -1) return false;
    list[idx].nocStatus = 'approved';
    localStorage.setItem(STORAGE_KEYS.TRANSFER_REQUESTS, encryptPayload(list));
    this.addAuditLog('APPROVE_NOC', list[idx].requestNo, `Transfer NOC approved for Plot #${list[idx].plotNo} to ${list[idx].buyerName}`, 'success');
    this.updateLastSync();
    return true;
  }

  // --- AUDIT LOGS CRUD ---
  static getAuditLogs(): AdminAuditLog[] {
    this.ensureDataInitialized();
    return decryptPayload<AdminAuditLog[]>(localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS), INITIAL_AUDIT_LOGS);
  }

  static addAuditLog(action: string, target: string, details: string, status: 'success' | 'warning' | 'info' = 'info'): AdminAuditLog {
    const user = this.getUser() || INITIAL_ADMIN;
    const newLog: AdminAuditLog = {
      id: 'log-' + Date.now(),
      timestamp: 'Just now',
      adminUser: user.fullName,
      action,
      target,
      details,
      status
    };
    const list = [newLog, ...this.getAuditLogs()];
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, encryptPayload(list));
    return newLog;
  }

  // --- NOTIFICATIONS ---
  static getNotifications(): AppNotification[] {
    this.ensureDataInitialized();
    return decryptPayload<AppNotification[]>(localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS), INITIAL_NOTIFICATIONS);
  }

  static markNotificationsAsRead(): void {
    const notifs = this.getNotifications().map(n => ({ ...n, read: true }));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, encryptPayload(notifs));
  }

  // --- REFERRAL & NETWORK SIGNUPS CRUD ---
  static getReferralSignups(): ReferralSignup[] {
    this.ensureDataInitialized();
    return decryptPayload<ReferralSignup[]>(localStorage.getItem(STORAGE_KEYS.REFERRAL_SIGNUPS), INITIAL_REFERRAL_SIGNUPS);
  }

  static addReferralSignup(data: Omit<ReferralSignup, 'id'>): ReferralSignup {
    const list = this.getReferralSignups();
    const newSignup: ReferralSignup = {
      ...data,
      id: 'ref-' + Date.now()
    };
    const updated = [newSignup, ...list];
    localStorage.setItem(STORAGE_KEYS.REFERRAL_SIGNUPS, encryptPayload(updated));
    this.addAuditLog(
      'NEW_REFERRAL_SIGNUP',
      `${newSignup.name} (@${newSignup.username})`,
      `New referral signup recorded under sponsor ${newSignup.sponsorUsername}. Asset: ${newSignup.assetBooked}. Commission: ৳${newSignup.commissionEarned.toLocaleString()}`,
      'success'
    );
    this.updateLastSync();
    return newSignup;
  }

  static updateReferralSignup(id: string, updates: Partial<ReferralSignup>): ReferralSignup | null {
    const list = this.getReferralSignups();
    const idx = list.findIndex(item => item.id === id);
    if (idx === -1) return null;
    list[idx] = { ...list[idx], ...updates };
    localStorage.setItem(STORAGE_KEYS.REFERRAL_SIGNUPS, encryptPayload(list));
    this.updateLastSync();
    return list[idx];
  }

  static deleteReferralSignup(id: string): boolean {
    const list = this.getReferralSignups();
    const filtered = list.filter(item => item.id !== id);
    if (filtered.length === list.length) return false;
    localStorage.setItem(STORAGE_KEYS.REFERRAL_SIGNUPS, encryptPayload(filtered));
    this.updateLastSync();
    return true;
  }

  static updateLastSync(): void {
    localStorage.setItem(STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
  }

  static getLastSync(): string {
    return localStorage.getItem(STORAGE_KEYS.LAST_SYNC) || new Date().toISOString();
  }
}
