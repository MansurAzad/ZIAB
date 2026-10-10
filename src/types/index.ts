export type Language = 'en' | 'bn';
export type Theme = 'light' | 'dark';

export interface UserNominee {
  name: string;
  relation: string;
  phone: string;
  nid: string;
}

export interface User {
  id: string;
  username: string;
  fullName: string;
  fullNameBn?: string;
  email: string;
  phone: string;
  branch: string;
  memberId: string;
  avatar: string;
  address: string;
  city: string;
  nidNo: string;
  role: 'investor' | 'associate' | 'admin';
  joinedDate: string;
  e2eEncryptionKey: string;
  twoFactorEnabled: boolean;
  nominee: UserNominee;
}

export interface PlotBooking {
  id: string;
  projectName: string;
  projectNameBn: string;
  sector: string;
  roadNo: string;
  plotNo: string;
  katha: number;
  facing: string;
  totalCost: number;
  paidAmount: number;
  bookingDate: string;
  handoverDate: string;
  status: 'booked' | 'allotted' | 'registered' | 'handed_over';
  nextDueDate: string;
  nextDueAmount: number;
  installmentTenureMonths: number;
  completedInstallments: number;
  totalInstallments: number;
  rajukApproved: boolean;
  csSaRsBsVerified: boolean;
  allotmentLetterNo: string;
  coordinates: { x: number; y: number };
}

export interface ShareInvestment {
  id: string;
  projectName: string;
  projectNameBn: string;
  shareCategory: 'luxury_suite' | 'deluxe_room' | 'commercial_retail';
  shareUnits: number;
  shareNumbers: string[];
  unitCost: number;
  totalInvestment: number;
  paidAmount: number;
  monthlyDividendAmount: number;
  totalDividendsEarned: number;
  purchaseDate: string;
  certificateNo: string;
  projectCompletionPercentage: number;
  annualRoiPercentage: number;
  status: 'active' | 'in_progress';
}

export interface InstallmentRecord {
  id: string;
  bookingId: string;
  title: string;
  installmentNo: number;
  dueDate: string;
  amount: number;
  status: 'paid' | 'due' | 'upcoming';
  paidDate?: string;
  paymentMethod?: 'bKash' | 'Nagad' | 'Rocket' | 'Bank Transfer' | 'Card';
  transactionId?: string;
  receiptNo?: string;
}

export interface TransactionRecord {
  id: string;
  date: string;
  title: string;
  titleBn: string;
  category: 'installment' | 'dividend' | 'referral' | 'booking' | 'payout';
  amount: number;
  type: 'credit' | 'debit';
  status: 'completed' | 'pending' | 'processing';
  method: string;
  referenceNo: string;
}

export interface AppNotification {
  id: string;
  title: string;
  titleBn: string;
  message: string;
  messageBn: string;
  date: string;
  read: boolean;
  type: 'installment' | 'dividend' | 'project' | 'security';
  actionUrl?: string;
}

export interface SupportTicket {
  id: string;
  ticketNo: string;
  subject: string;
  category: 'payment' | 'mutation' | 'possession' | 'dividend' | 'general';
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in_progress' | 'resolved';
  createdAt: string;
  updatedAt: string;
  messages: {
    sender: 'user' | 'support';
    senderName: string;
    text: string;
    timestamp: string;
  }[];
}

export interface ConstructionMilestone {
  id: string;
  title: string;
  titleBn: string;
  phase: string;
  targetDate: string;
  completionPercentage: number;
  status: 'completed' | 'in_progress' | 'upcoming';
  description: string;
  descriptionBn: string;
  inspectorNote?: string;
  verifiedDate?: string;
}

export interface ProjectInfo {
  id: string;
  name: string;
  nameBn: string;
  tagline: string;
  taglineBn: string;
  category: 'residential' | 'commercial' | 'hospitality';
  location: string;
  locationBn: string;
  size: string;
  startingPrice: string;
  heroImage: string;
  description: string;
  features: string[];
  featuresBn: string[];
  rajukApproved: boolean;
  status: 'booking_open' | 'under_development' | 'handover_started';
  overallProgressPercentage: number;
  expectedHandoverYear: string;
  milestones: ConstructionMilestone[];
}
