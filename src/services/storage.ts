import {
  User,
  PlotBooking,
  ShareInvestment,
  InstallmentRecord,
  TransactionRecord,
  AppNotification,
  SupportTicket,
  ProjectInfo
} from '../types';

// Pre-seeded user data matching user's requested login: Ziabulctg1 / 123456
export const INITIAL_USER: User = {
  id: 'usr-ctg-8842',
  username: 'Ziabulctg1',
  fullName: 'Ziabul Hoque Chowdhury',
  fullNameBn: 'জিয়াবুল হক চৌধুরী',
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

// Persistent state wrapper with End-to-End Encryption simulation
const STORAGE_KEYS = {
  USER: 'csbd_user_session_enc',
  PLOTS: 'csbd_plot_bookings_enc',
  SHARES: 'csbd_share_investments_enc',
  INSTALLMENTS: 'csbd_installments_enc',
  TRANSACTIONS: 'csbd_transactions_enc',
  NOTIFICATIONS: 'csbd_notifications_enc',
  TICKETS: 'csbd_tickets_enc',
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
    if (!localStorage.getItem(STORAGE_KEYS.LAST_SYNC)) {
      localStorage.setItem(STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
    }
  }

  static getPlots(): PlotBooking[] {
    this.ensureDataInitialized();
    return decryptPayload<PlotBooking[]>(localStorage.getItem(STORAGE_KEYS.PLOTS), INITIAL_PLOTS);
  }

  static getShares(): ShareInvestment[] {
    this.ensureDataInitialized();
    return decryptPayload<ShareInvestment[]>(localStorage.getItem(STORAGE_KEYS.SHARES), INITIAL_SHARES);
  }

  static getInstallments(): InstallmentRecord[] {
    this.ensureDataInitialized();
    return decryptPayload<InstallmentRecord[]>(localStorage.getItem(STORAGE_KEYS.INSTALLMENTS), INITIAL_INSTALLMENTS);
  }

  static getTransactions(): TransactionRecord[] {
    this.ensureDataInitialized();
    return decryptPayload<TransactionRecord[]>(localStorage.getItem(STORAGE_KEYS.TRANSACTIONS), INITIAL_TRANSACTIONS);
  }

  static getNotifications(): AppNotification[] {
    this.ensureDataInitialized();
    return decryptPayload<AppNotification[]>(localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS), INITIAL_NOTIFICATIONS);
  }

  static getTickets(): SupportTicket[] {
    this.ensureDataInitialized();
    return decryptPayload<SupportTicket[]>(localStorage.getItem(STORAGE_KEYS.TICKETS), INITIAL_TICKETS);
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

  static createTicket(subject: string, category: SupportTicket['category'], messageText: string): SupportTicket {
    const user = this.getUser() || INITIAL_USER;
    const newTicket: SupportTicket = {
      id: 'tkt-' + Date.now(),
      ticketNo: 'CSBD-TKT-' + Math.floor(1000 + Math.random() * 9000),
      subject,
      category,
      priority: 'medium',
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

  static markNotificationsAsRead(): void {
    const notifs = this.getNotifications().map(n => ({ ...n, read: true }));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, encryptPayload(notifs));
  }

  static updateLastSync(): void {
    localStorage.setItem(STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
  }

  static getLastSync(): string {
    return localStorage.getItem(STORAGE_KEYS.LAST_SYNC) || new Date().toISOString();
  }
}
