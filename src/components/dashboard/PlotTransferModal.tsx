import React, { useState } from 'react';
import {
  X,
  Send,
  Building2,
  CheckCircle2,
  ShieldCheck,
  UserCheck,
  Scale,
  AlertCircle
} from 'lucide-react';
import { User, PlotBooking, Language } from '../../types';
import { formatBDT } from '../../services/i18n';

interface PlotTransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  plot: PlotBooking;
  user: User;
  language: Language;
  onSuccess: () => void;
}

export const PlotTransferModal: React.FC<PlotTransferModalProps> = ({
  isOpen,
  onClose,
  plot,
  user,
  language,
  onSuccess
}) => {
  if (!isOpen) return null;
  const isBn = language === 'bn';

  const [transferForm, setTransferForm] = useState({
    transferType: 'resale',
    transfereeName: '',
    transfereePhone: '',
    transfereeNid: '',
    transfereeAddress: '',
    relationship: 'buyer',
    declarationAccepted: false
  });

  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  // Transfer fee calculation: standard ৳25,000 per Katha for NOC & deed amendment
  const transferFee = plot.katha * 25000;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transferForm.declarationAccepted) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCompleted(true);
      onSuccess();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400">
              {isBn ? 'প্লট হস্তান্তর ও এনওসি আবেদন' : 'Plot Ownership Transfer & NOC'}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1">
              Plot #{plot.plotNo} ({plot.katha} Katha) · {plot.projectName}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {completed ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              {isBn ? 'হস্তান্তর আবেদন জমা সম্পন্ন হয়েছে!' : 'Transfer Request Submitted!'}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
              {isBn
                ? `আবেদন রেফারেন্স নম্বর CSBD-TRF-8842-99। আমাদের লিগ্যাল ও সাব-রেজিস্ট্রি টিম আবেদনপত্র যাচাই করে ৩ কার্যদিবসের মধ্যে যোগাযোগ করবে।`
                : `Application Reference: CSBD-TRF-8842-99. The legal cell will verify the buyer details and prepare the sub-registry NOC.`}
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs"
            >
              {isBn ? 'সম্পন্ন করুন' : 'Done'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-300 flex items-center justify-between">
              <div>
                <span className="font-bold block">
                  {isBn ? 'আনুষ্ঠানিক হস্তান্তর ফি:' : 'Official Transfer & NOC Fee:'}
                </span>
                <span className="text-[11px] text-amber-700 dark:text-amber-400">
                  {plot.katha} Katha × ৳25,000 / Katha
                </span>
              </div>
              <span className="text-base font-extrabold font-mono">
                {formatBDT(transferFee, language)}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  {isBn ? 'হস্তান্তরের ধরন' : 'Transfer Type'}
                </label>
                <select
                  value={transferForm.transferType}
                  onChange={e => setTransferForm({ ...transferForm, transferType: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="resale">{isBn ? 'তৃতীয় পক্ষের নিকট বিক্রয়' : 'Third Party Resale'}</option>
                  <option value="gift">{isBn ? 'রক্তের সম্পর্কে হেবা / উপহার' : 'Blood Relation Gift/Heba'}</option>
                  <option value="nominee">{isBn ? 'নমিনির নামে নামজারি' : 'Transfer to Nominee'}</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  {isBn ? 'গ্রহীতার পুরো নাম *' : 'New Buyer / Transferee Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={transferForm.transfereeName}
                  onChange={e => setTransferForm({ ...transferForm, transfereeName: e.target.value })}
                  placeholder="e.g. Mohammad Arman"
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  {isBn ? 'গ্রহীতার জাতীয় পরিচয়পত্র (NID) *' : 'Transferee NID No *'}
                </label>
                <input
                  type="text"
                  required
                  value={transferForm.transfereeNid}
                  onChange={e => setTransferForm({ ...transferForm, transfereeNid: e.target.value })}
                  placeholder="19852691029481"
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  {isBn ? 'গ্রহীতার মোবাইল নম্বর *' : 'Transferee Phone *'}
                </label>
                <input
                  type="tel"
                  required
                  value={transferForm.transfereePhone}
                  onChange={e => setTransferForm({ ...transferForm, transfereePhone: e.target.value })}
                  placeholder="+880 1711-000000"
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                {isBn ? 'গ্রহীতার স্থায়ী ঠিকানা *' : 'Transferee Permanent Address *'}
              </label>
              <textarea
                rows={2}
                required
                value={transferForm.transfereeAddress}
                onChange={e => setTransferForm({ ...transferForm, transfereeAddress: e.target.value })}
                placeholder={isBn ? 'গ্রাম, ডাকঘর, থানা ও জেলা...' : 'Village, Police Station, District...'}
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="transferDecl"
                checked={transferForm.declarationAccepted}
                onChange={e => setTransferForm({ ...transferForm, declarationAccepted: e.target.checked })}
                className="mt-1 rounded text-amber-600 focus:ring-amber-500"
              />
              <label htmlFor="transferDecl" className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight">
                {isBn
                  ? 'আমি ঘোষণা করছি যে বর্তমান প্লট সংক্রান্ত সকল তথ্য নির্ভুল এবং হস্তান্তর প্রক্রিয়ায় কোম্পানির নিয়মাবলী মানতে সম্মত।'
                  : 'I hereby confirm that I am the genuine allotted owner of Plot #142 and agree to the sub-registry transfer terms.'}
              </label>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100"
              >
                {isBn ? 'বাতিল' : 'Cancel'}
              </button>
              <button
                type="submit"
                disabled={loading || !transferForm.declarationAccepted}
                className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs shadow-md transition-colors flex items-center gap-1.5 disabled:opacity-50"
              >
                {loading ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>{isBn ? 'আবেদন দাখিল করুন' : 'Submit Application'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
