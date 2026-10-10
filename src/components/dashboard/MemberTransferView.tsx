import React, { useState } from 'react';
import {
  Send,
  UserCheck,
  ShieldCheck,
  CheckCircle2,
  KeyRound,
  AlertCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { Language, User, TransactionRecord } from '../../types';
import { formatBDT } from '../../services/i18n';
import { StorageService } from '../../services/storage';

interface MemberTransferViewProps {
  user: User;
  language: Language;
  onRefreshData: () => void;
}

export const MemberTransferView: React.FC<MemberTransferViewProps> = ({
  user,
  language,
  onRefreshData
}) => {
  const [recipientUsername, setRecipientUsername] = useState('');
  const [transferAmount, setTransferAmount] = useState<number>(5000);
  const [transactionPin, setTransactionPin] = useState('');
  const [transferNote, setTransferNote] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successTx, setSuccessTx] = useState<TransactionRecord | null>(null);

  const availableBalance = 74000;

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (transferAmount <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    if (transferAmount > availableBalance) {
      setError('Insufficient dividend balance.');
      return;
    }
    if (transactionPin !== '8842' && transactionPin !== '1234') {
      setError('Invalid Transaction PIN. (Demo T-PIN is: 8842)');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const tx: TransactionRecord = {
        id: 'tx-trf-' + Date.now(),
        date: new Date().toISOString().split('T')[0],
        title: `P2P Fund Transfer to @${recipientUsername}`,
        titleBn: `@${recipientUsername}-কে অভ্যন্তরীণ ব্যালেন্স স্থানান্তর`,
        category: 'payout',
        amount: transferAmount,
        type: 'debit',
        status: 'completed',
        method: `Internal P2P Wallet Transfer`,
        referenceNo: 'TRF-' + Math.floor(100000 + Math.random() * 900000)
      };

      const existing = StorageService.getTransactions();
      localStorage.setItem('csbd_transactions_enc', btoa(encodeURIComponent(JSON.stringify([tx, ...existing]))));
      
      setIsProcessing(false);
      setSuccessTx(tx);
      onRefreshData();
    }, 1000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            {language === 'bn' ? 'মেম্বার টু মেম্বার ফান্ড ও ব্যালেন্স ট্রান্সফার' : 'Member-to-Member Balance Transfer'}
          </h2>
          <p className="text-xs text-slate-500">
            {language === 'bn'
              ? 'সিটি স্কয়ার বিডির অন্য যেকোনো রেজিস্টার্ড বিনিয়োগকারীকে লভ্যাংশ বা কমিশন ব্যালেন্স তাৎক্ষণিক ট্রান্সফার করুন।'
              : 'Transfer wallet funds to another verified member ID or investor account using your 4-digit Transaction PIN.'}
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-mono">
          <span>Available Wallet: <strong>{formatBDT(availableBalance, language)}</strong></span>
        </div>
      </div>

      <div className="max-w-xl mx-auto p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        {successTx ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Transfer Successful!</h3>
              <p className="text-xs text-slate-500 mt-1">
                Ref: <strong className="font-mono">{successTx.referenceNo}</strong>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs space-y-1.5 text-left">
              <div className="flex justify-between">
                <span className="text-slate-500">Recipient Member:</span>
                <strong className="text-slate-900 dark:text-white">@{recipientUsername}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Transferred Amount:</span>
                <strong className="text-emerald-600">{formatBDT(successTx.amount, language)}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date & Timestamp:</span>
                <span className="font-mono">{successTx.date}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setSuccessTx(null);
                setRecipientUsername('');
                setTransactionPin('');
              }}
              className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-colors"
            >
              Make Another Transfer
            </button>
          </div>
        ) : (
          <form onSubmit={handleTransfer} className="space-y-4 text-xs">
            {error && (
              <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Recipient Username / প্রাপক ইউজারনেম
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. ctg_investor_02 or admin"
                  value={recipientUsername}
                  onChange={e => setRecipientUsername(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                />
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Instant verification across City Square BD member registry.
              </span>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Amount to Transfer (BDT) / টাকার পরিমাণ
              </label>
              <input
                type="number"
                min="500"
                max={availableBalance}
                required
                value={transferAmount}
                onChange={e => setTransferAmount(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                4-Digit Security Transaction PIN (T-PIN)
              </label>
              <input
                type="password"
                maxLength={4}
                required
                placeholder="•••• (Demo T-PIN is 8842)"
                value={transactionPin}
                onChange={e => setTransactionPin(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-center tracking-widest text-base"
              />
              <span className="text-[10px] text-amber-600 dark:text-amber-400 mt-1 block">
                Pre-configured Transaction PIN: <strong>8842</strong>
              </span>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Transfer Note / রেফারেন্স নোট (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Plot installment co-share"
                value={transferNote}
                onChange={e => setTransferNote(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <span>Verifying T-PIN & Transferring...</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Execute Member Transfer</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>

    </div>
  );
};
