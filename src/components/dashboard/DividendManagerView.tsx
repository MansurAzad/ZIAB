import React, { useState } from 'react';
import {
  TrendingUp,
  CreditCard,
  Building,
  CheckCircle2,
  ArrowDownRight,
  ArrowUpRight,
  Clock,
  Sparkles,
  Wallet,
  ShieldCheck,
  X,
  ChevronRight
} from 'lucide-react';
import { Language, User, ShareInvestment, TransactionRecord } from '../../types';
import { formatBDT } from '../../services/i18n';
import { StorageService } from '../../services/storage';

interface DividendManagerViewProps {
  user: User;
  shares: ShareInvestment[];
  transactions: TransactionRecord[];
  language: Language;
  onRefreshData: () => void;
}

export const DividendManagerView: React.FC<DividendManagerViewProps> = ({
  user,
  shares,
  transactions,
  language,
  onRefreshData
}) => {
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(18500);
  const [withdrawDestination, setWithdrawDestination] = useState<'bank' | 'bkash' | 'installment_offset'>('bank');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const activeShare = shares[0];
  const monthlyYield = shares.reduce((acc, s) => acc + s.monthlyDividendAmount, 0);
  const totalEarned = shares.reduce((acc, s) => acc + s.totalDividendsEarned, 0);
  
  // Available balance simulated based on recent dividends
  const availableBalance = 74000;

  const dividendTransactions = transactions.filter(t => t.category === 'dividend' || t.category === 'payout');

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    if (withdrawAmount <= 0 || withdrawAmount > availableBalance) return;
    setIsProcessing(true);

    setTimeout(() => {
      let desc = `Dividend Payout to The City Bank (A/C: ...2001)`;
      let descBn = `সিটি ব্যাংক একাউন্টে লভ্যাংশ উত্তোলন স্থানান্তর`;
      let method = 'Bank Wire (The City Bank)';

      if (withdrawDestination === 'bkash') {
        desc = `Instant Dividend Disbursement to bKash (${user.phone})`;
        descBn = `বিকাশ ওয়ালেটে (${user.phone}) তাৎক্ষণিক মুনাফা উত্তোলন`;
        method = 'bKash Direct';
      } else if (withdrawDestination === 'installment_offset') {
        desc = `Dividend Auto-Adjustment to Plot #142 Installment`;
        descBn = `প্লট #১৪২-এর কিস্তিতে লভ্যাংশের টাকা সমন্বয়`;
        method = 'Internal Ledger Offset';
      }

      const tx: TransactionRecord = {
        id: 'tx-with-' + Date.now(),
        date: new Date().toISOString().split('T')[0],
        title: desc,
        titleBn: descBn,
        category: 'payout',
        amount: withdrawAmount,
        type: 'debit',
        status: 'completed',
        method,
        referenceNo: 'WTH-' + Math.floor(100000 + Math.random() * 900000)
      };

      const existing = StorageService.getTransactions();
      localStorage.setItem('csbd_transactions_enc', btoa(encodeURIComponent(JSON.stringify([tx, ...existing]))));
      
      setIsProcessing(false);
      setSuccessMessage(
        language === 'bn'
          ? `৳${withdrawAmount.toLocaleString()} সফলভাবে উত্তোলন প্রক্রিয়াকরণ সম্পন্ন হয়েছে!`
          : `৳${withdrawAmount.toLocaleString()} payout successfully processed!`
      );
      onRefreshData();
    }, 1000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            {language === 'bn' ? 'হোটেল শেয়ার মাসিক লভ্যাংশ ও উত্তোলন ম্যানেজার' : 'Hotel Share Dividend & Yield Manager'}
          </h2>
          <p className="text-xs text-slate-500">
            {language === 'bn'
              ? 'সিটি রয়্যাল বে হোটেল অ্যান্ড স্যুটস-এর মাসিক লভ্যাংশ ট্র্যাক করুন বা সরাসরি ব্যাংকে উত্তোলন করুন।'
              : 'Monitor monthly resort room yield distributions and withdraw payouts directly to your linked bank account.'}
          </p>
        </div>

        <button
          onClick={() => {
            setSuccessMessage(null);
            setWithdrawModalOpen(true);
          }}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors self-start sm:self-auto"
        >
          <Wallet className="w-3.5 h-3.5" />
          <span>{language === 'bn' ? 'মুনাফা উত্তোলন করুন' : 'Withdraw Dividends'}</span>
        </button>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Card 1: Available Balance */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-xs text-slate-500 font-medium block">
            {language === 'bn' ? 'উত্তোলনযোগ্য অবশিষ্ট ব্যালেন্স' : 'Withdrawable Dividend Balance'}
          </span>
          <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono block">
            {formatBDT(availableBalance, language)}
          </span>
          <span className="text-[11px] text-slate-400 font-mono block">
            Ready for instant bank credit
          </span>
        </div>

        {/* Card 2: Monthly Yield */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-xs text-slate-500 font-medium block">
            {language === 'bn' ? 'মাসিক নিশ্চিত মুনাফা' : 'Monthly Recurring Yield'}
          </span>
          <span className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono block">
            +{formatBDT(monthlyYield, language)}
            <span className="text-xs text-slate-400 font-normal"> /mo</span>
          </span>
          <span className="text-[11px] text-emerald-600 font-semibold block">
            18.5% Annual ROI (2 Units: RB-204, RB-205)
          </span>
        </div>

        {/* Card 3: Total Accrued */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-xs text-slate-500 font-medium block">
            {language === 'bn' ? 'সর্বমোট অর্জিত মুনাফা' : 'Cumulative Lifetime Dividends'}
          </span>
          <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono block">
            {formatBDT(totalEarned, language)}
          </span>
          <span className="text-[11px] text-slate-400 font-mono block">
            Since purchase: 18 May 2024
          </span>
        </div>

      </div>

      {/* Linked Accounts Banner */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Primary Linked Bank Account for Auto-Disbursement
          </span>
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-amber-600" />
            <strong className="text-sm text-slate-900 dark:text-white">
              The City Bank Limited — Agrabad Commercial Branch, Chattogram
            </strong>
          </div>
          <p className="text-xs text-slate-500 font-mono">
            A/C: 1102948192001 · Title: {user.fullName} · Routing: 225150921
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800 self-start md:self-auto">
          <ShieldCheck className="w-4 h-4" />
          <span>BEFTN / NPSB Direct Deposit Active</span>
        </div>
      </div>

      {/* Dividend Ledger History */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            {language === 'bn' ? 'সাম্প্রতিক লভ্যাংশ বণ্টন বিবরণী' : 'Dividend Distribution Statements'}
          </h3>
          <span className="text-[11px] font-mono text-slate-400">Auto-Disbursed on 1st of every month</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase font-semibold">
              <tr>
                <th className="p-3.5">Disbursement Date</th>
                <th className="p-3.5">Hotel Asset / Period</th>
                <th className="p-3.5">Method</th>
                <th className="p-3.5">Reference No</th>
                <th className="p-3.5 text-right">Yield Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {dividendTransactions.map(tx => (
                <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3.5 font-mono text-slate-600 dark:text-slate-400">{tx.date}</td>
                  <td className="p-3.5 font-medium text-slate-900 dark:text-white">
                    {language === 'bn' ? tx.titleBn : tx.title}
                  </td>
                  <td className="p-3.5 text-slate-600 dark:text-slate-300">{tx.method}</td>
                  <td className="p-3.5 font-mono text-slate-500">{tx.referenceNo}</td>
                  <td className="p-3.5 text-right font-mono font-bold">
                    {tx.type === 'credit' ? (
                      <span className="text-emerald-600 dark:text-emerald-400">+{formatBDT(tx.amount, language)}</span>
                    ) : (
                      <span className="text-amber-600 dark:text-amber-400">-{formatBDT(tx.amount, language)}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Withdrawal Modal */}
      {withdrawModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
            
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
              <div>
                <h3 className="text-sm font-bold">Dividend Withdrawal Request</h3>
                <p className="text-xs text-slate-400 mt-0.5">Available Balance: {formatBDT(availableBalance, language)}</p>
              </div>
              <button
                onClick={() => setWithdrawModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {successMessage ? (
              <div className="p-6 text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">Request Dispatched</h4>
                <p className="text-xs text-slate-500">{successMessage}</p>
                <button
                  onClick={() => setWithdrawModalOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-amber-600 text-white font-semibold text-xs"
                >
                  Return
                </button>
              </div>
            ) : (
              <form onSubmit={handleWithdraw} className="p-6 space-y-4 text-xs">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    Withdrawal Amount (BDT)
                  </label>
                  <input
                    type="number"
                    min="1000"
                    max={availableBalance}
                    required
                    value={withdrawAmount}
                    onChange={e => setWithdrawAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm"
                  />
                  <div className="flex gap-2 mt-1.5">
                    {[18500, 37000, availableBalance].map(amt => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setWithdrawAmount(amt)}
                        className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                      >
                        ৳{amt.toLocaleString()}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-2">
                    Payout Destination
                  </label>
                  <div className="space-y-2">
                    <label className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer ${
                      withdrawDestination === 'bank' ? 'border-amber-500 bg-amber-500/10' : 'border-slate-200 dark:border-slate-700'
                    }`}>
                      <input
                        type="radio"
                        name="dest"
                        checked={withdrawDestination === 'bank'}
                        onChange={() => setWithdrawDestination('bank')}
                        className="text-amber-600"
                      />
                      <div>
                        <strong className="block text-slate-900 dark:text-white">The City Bank (A/C: ...2001)</strong>
                        <span className="text-[10px] text-slate-500">Agrabad Branch · NPSB Direct Transfer</span>
                      </div>
                    </label>

                    <label className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer ${
                      withdrawDestination === 'bkash' ? 'border-amber-500 bg-amber-500/10' : 'border-slate-200 dark:border-slate-700'
                    }`}>
                      <input
                        type="radio"
                        name="dest"
                        checked={withdrawDestination === 'bkash'}
                        onChange={() => setWithdrawDestination('bkash')}
                        className="text-amber-600"
                      />
                      <div>
                        <strong className="block text-slate-900 dark:text-white">bKash Personal ({user.phone})</strong>
                        <span className="text-[10px] text-slate-500">Instant Mobile Disbursement</span>
                      </div>
                    </label>

                    <label className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer ${
                      withdrawDestination === 'installment_offset' ? 'border-amber-500 bg-amber-500/10' : 'border-slate-200 dark:border-slate-700'
                    }`}>
                      <input
                        type="radio"
                        name="dest"
                        checked={withdrawDestination === 'installment_offset'}
                        onChange={() => setWithdrawDestination('installment_offset')}
                        className="text-amber-600"
                      />
                      <div>
                        <strong className="block text-slate-900 dark:text-white">Offset Against Next Plot Installment</strong>
                        <span className="text-[10px] text-slate-500">Auto-deduct from upcoming ৳35,000 installment due</span>
                      </div>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-md transition-colors"
                >
                  {isProcessing ? 'Processing Transfer...' : 'Confirm Withdrawal'}
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
