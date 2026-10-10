import React, { useState } from 'react';
import {
  X,
  CreditCard,
  Building,
  CheckCircle2,
  ShieldCheck,
  Smartphone,
  ArrowRight,
  Receipt,
  Download
} from 'lucide-react';
import { InstallmentRecord, Language, TransactionRecord } from '../../types';
import { formatBDT, getTranslation, translations } from '../../services/i18n';
import { StorageService } from '../../services/storage';

interface PaymentGatewayModalProps {
  isOpen: boolean;
  onClose: () => void;
  installment: InstallmentRecord | null;
  language: Language;
  onPaymentSuccess: (tx: TransactionRecord) => void;
}

export const PaymentGatewayModal: React.FC<PaymentGatewayModalProps> = ({
  isOpen,
  onClose,
  installment,
  language,
  onPaymentSuccess
}) => {
  const [selectedChannel, setSelectedChannel] = useState<'bKash' | 'Nagad' | 'Rocket' | 'Bank Transfer' | 'Card'>('bKash');
  const [accountNumber, setAccountNumber] = useState('01819745239');
  const [transactionId, setTransactionId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedTx, setCompletedTx] = useState<TransactionRecord | null>(null);

  const t = (key: keyof typeof translations.en) => getTranslation(language, key);

  if (!isOpen || !installment) return null;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      try {
        const genTxId = transactionId.trim() || `${selectedChannel.substring(0, 2).toUpperCase()}${Math.floor(1000000 + Math.random() * 9000000)}`;
        const result = StorageService.payInstallment(installment.id, selectedChannel, genTxId);
        setIsProcessing(false);
        setCompletedTx(result.transaction);
        onPaymentSuccess(result.transaction);
      } catch (err) {
        setIsProcessing(false);
        console.error(err);
      }
    }, 1200);
  };

  const handleResetAndClose = () => {
    setCompletedTx(null);
    setTransactionId('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 p-5 text-white flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold tracking-tight">
              {t('modalPayTitle')}
            </h3>
            <p className="text-xs text-amber-200/80 mt-0.5">
              {installment.title} - {formatBDT(installment.amount, language)}
            </p>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {completedTx ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h4 className="text-lg font-extrabold text-slate-900 dark:text-white">
                {language === 'bn' ? 'পেমেন্ট সফলভাবে গৃহীত হয়েছে!' : 'Payment Successful!'}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {language === 'bn' ? 'আপনার কিস্তি পরিশোধের টাকা সিটি স্কয়ার বিডি লেজারে আপডেট হয়েছে।' : 'Transaction successfully recorded in City Square BD ledger.'}
              </p>
            </div>

            {/* Receipt Card */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Money Receipt No:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{completedTx.referenceNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Channel / Method:</span>
                <span className="font-medium text-slate-900 dark:text-white">{completedTx.method}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Amount Paid:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{formatBDT(completedTx.amount, language)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date & Timestamp:</span>
                <span className="text-slate-900 dark:text-white font-mono">{completedTx.date} 23:50 BDT</span>
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-colors"
            >
              {language === 'bn' ? 'ড্যাশবোর্ডে ফিরে যান' : 'Return to Dashboard'}
            </button>
          </div>
        ) : (
          <form onSubmit={handlePay} className="p-6 space-y-4">
            
            {/* Amount Banner */}
            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-amber-800 dark:text-amber-300 block uppercase tracking-wider">
                  Payable Amount
                </span>
                <span className="text-lg font-extrabold text-amber-900 dark:text-amber-100">
                  {formatBDT(installment.amount, language)}
                </span>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-amber-200/60 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 font-mono font-semibold">
                Due: {installment.dueDate}
              </span>
            </div>

            {/* Select Channel */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                {t('selectPaymentMethod')}
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'bKash', label: 'bKash Pay', icon: '🇧🇩', desc: 'Merchant 01700-xxx' },
                  { id: 'Nagad', label: 'Nagad Direct', icon: '⚡', desc: 'Instant 0.99%' },
                  { id: 'Rocket', label: 'Rocket (DBBL)', icon: '🚀', desc: 'Mobile Banking' },
                  { id: 'Bank Transfer', label: 'Bank Transfer', icon: '🏛️', desc: 'City Bank / CBL' },
                  { id: 'Card', label: 'Visa / Master', icon: '💳', desc: 'Debit / Credit' }
                ].map(c => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedChannel(c.id as any)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      selectedChannel === c.id
                        ? 'border-amber-500 bg-amber-500/10 text-slate-900 dark:text-white ring-1 ring-amber-500'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-sm">{c.icon}</div>
                    <span className="text-xs font-bold block mt-1 leading-tight">{c.label}</span>
                    <span className="text-[10px] text-slate-600 dark:text-slate-300 block">{c.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Channel specific inputs */}
            {selectedChannel === 'bKash' || selectedChannel === 'Nagad' || selectedChannel === 'Rocket' ? (
              <div className="space-y-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                  <span>Merchant Wallet:</span>
                  <span className="font-mono font-bold text-amber-700 dark:text-amber-400">01700-CITYBD (01700-248923)</span>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your {selectedChannel} Mobile Number
                  </label>
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={e => setAccountNumber(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Transaction ID (TrxID) / রেফারেন্স
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. BK9X88291A (or leave blank to auto-generate)"
                    value={transactionId}
                    onChange={e => setTransactionId(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono uppercase"
                  />
                </div>
              </div>
            ) : selectedChannel === 'Bank Transfer' ? (
              <div className="space-y-2 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-xs">
                <p className="font-semibold text-slate-900 dark:text-white">City Square BD Principal Bank Accounts:</p>
                <div className="text-[11px] space-y-1 text-slate-600 dark:text-slate-300 font-mono">
                  <p>• The City Bank Ltd (Agrabad/Mirpur) A/C: 1102948192001</p>
                  <p>• Islami Bank Bangladesh PLC A/C: 2050218940023</p>
                </div>
                <div className="pt-2">
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Bank Deposit Slip No / Online Ref
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. CBL-FT-94021"
                    value={transactionId}
                    onChange={e => setTransactionId(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                <input
                  type="text"
                  placeholder="Card Number: 4532 •••• •••• 8842"
                  defaultValue="4532 9182 7364 8842"
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    defaultValue="09/28"
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  />
                  <input
                    type="password"
                    placeholder="CVV"
                    defaultValue="842"
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  />
                </div>
              </div>
            )}

            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                PCI-DSS Compliant Gateway
              </span>
              <span>Instant Digital Receipt</span>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:bg-amber-600/50 text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <span>{language === 'bn' ? 'পেমেন্ট যাচাই করা হচ্ছে...' : 'Processing Payment Securely...'}</span>
              ) : (
                <>
                  <span>{t('btnConfirmPayment')}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
