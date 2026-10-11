import React, { useState } from 'react';
import {
  Upload,
  FileCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  Building,
  Calendar,
  Image,
  CreditCard
} from 'lucide-react';
import { Language, User, InstallmentRecord } from '../../types';
import { formatBDT } from '../../services/i18n';
import { StorageService } from '../../services/storage';
import { Trash2 } from 'lucide-react';

interface DepositSlipUploadViewProps {
  user: User;
  installments: InstallmentRecord[];
  language: Language;
}

export const DepositSlipUploadView: React.FC<DepositSlipUploadViewProps> = ({
  user,
  installments,
  language
}) => {
  const [selectedInstallmentId, setSelectedInstallmentId] = useState('inst-25');
  const [paymentMode, setPaymentMode] = useState('Bank Cash Deposit');
  const [bankName, setBankName] = useState('The City Bank Limited (Agrabad Branch)');
  const [slipNumber, setSlipNumber] = useState('CBL-DEP-884291');
  const [depositDate, setDepositDate] = useState('2026-10-09');
  const [fileName, setFileName] = useState('bank_deposit_slip_cbl.jpg');
  const [slips, setSlips] = useState(() => StorageService.getDepositSlips().filter(s => s.memberUsername === user.username || s.memberId === user.memberId));
  const [success, setSuccess] = useState(false);

  const refreshSlips = () => {
    setSlips(StorageService.getDepositSlips().filter(s => s.memberUsername === user.username || s.memberId === user.memberId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const inst = installments.find(i => i.id === selectedInstallmentId) || installments[0];
    StorageService.createDepositSlip({
      memberUsername: user.username,
      memberName: user.fullName,
      memberId: user.memberId,
      bookingId: 'plot-purbachal-142',
      projectName: 'City R Mega Town - Purbachal',
      bankName,
      branchName: paymentMode,
      amount: inst.amount,
      depositDate,
      slipNo: slipNumber,
      transactionId: 'DEP-' + Math.floor(100000 + Math.random() * 900000),
      notes: `${paymentMode} for ${inst.title}`
    });

    refreshSlips();
    setSuccess(true);
    setSlipNumber('CBL-DEP-' + Math.floor(100000 + Math.random() * 900000));
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleDeleteSlip = (slipId: string) => {
    StorageService.deleteDepositSlip(slipId);
    refreshSlips();
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            {language === 'bn' ? 'অফলাইন ব্যাংক ডিপোজিট স্লিপ আপলোড ও যাচাই' : 'Manual Bank Deposit Slip Submission'}
          </h2>
          <p className="text-xs text-slate-500">
            {language === 'bn'
              ? 'ব্যাংকে নগদ জমা বা চেকে কিস্তি পরিশোধের পর মানি রসিদের ছবি আপলোড করে একাউন্টস থেকে দ্রুত অনুমোদন নিন।'
              : 'Upload scanned bank deposit counterfoils or cheques for instant reconciliation by CITY ZONE SQUARE accounts department.'}
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 text-xs font-semibold">
          <Clock className="w-4 h-4 text-amber-600" />
          <span>Average Approval Time: Under 2 Hours</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Upload Form */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Submit New Deposit Counterfoil
          </h3>

          {success && (
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Deposit slip submitted successfully! Our audit desk is verifying the bank clearing.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Select Due Installment
              </label>
              <select
                value={selectedInstallmentId}
                onChange={e => setSelectedInstallmentId(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                {installments.filter(i => i.status !== 'paid').map(i => (
                  <option key={i.id} value={i.id}>
                    {i.title} — {formatBDT(i.amount, language)} (Due: {i.dueDate})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Payment Mode
                </label>
                <select
                  value={paymentMode}
                  onChange={e => setPaymentMode(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option>Bank Cash Deposit</option>
                  <option>Account Transfer / IBFT</option>
                  <option>Cheque / Pay Order</option>
                  <option>bKash / Nagad Agent Counter</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Deposit Date
                </label>
                <input
                  type="date"
                  required
                  value={depositDate}
                  onChange={e => setDepositDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Bank Name & Branch
                </label>
                <input
                  type="text"
                  required
                  value={bankName}
                  onChange={e => setBankName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Slip No. / Scroll No. / Cheque No.
                </label>
                <input
                  type="text"
                  required
                  value={slipNumber}
                  onChange={e => setSlipNumber(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                />
              </div>
            </div>

            {/* Drag & Drop Simulation */}
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Attach Scanned Deposit Voucher / Slip Photo
              </label>
              <div className="p-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl text-center bg-slate-50 dark:bg-slate-800/50 space-y-2">
                <Image className="w-8 h-8 text-slate-400 mx-auto" />
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  <span className="font-semibold text-amber-600">Attached:</span> {fileName}
                </div>
                <span className="text-[10px] text-slate-400 block">
                  PNG, JPG, PDF up to 10MB accepted
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
            >
              Submit Deposit Slip for Verification
            </button>
          </form>
        </div>

        {/* History / Status List */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between">
            <span>{language === 'bn' ? 'জমা দেওয়া স্লিপের তালিকা' : 'Submission Status'}</span>
            <span className="font-mono text-xs text-amber-600 dark:text-amber-400 font-bold">
              {slips.length} {language === 'bn' ? 'টি স্লিপ' : 'Slips'}
            </span>
          </h3>

          <div className="space-y-3">
            {slips.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                {language === 'bn' ? 'এখনও কোনো স্লিপ জমা দেওয়া হয়নি।' : 'No deposit slips submitted yet.'}
              </div>
            ) : (
              slips.map(s => (
                <div
                  key={s.id}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white">{s.projectName}</span>
                    <div className="flex items-center gap-1.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        s.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : s.status === 'rejected'
                          ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 animate-pulse'
                      }`}>
                        {s.status}
                      </span>
                      {s.status === 'pending' && (
                        <button
                          onClick={() => handleDeleteSlip(s.id)}
                          className="p-1 rounded text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                          title="Cancel/Delete Slip"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between text-slate-500 font-mono">
                    <span>Slip: {s.slipNo}</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{formatBDT(s.amount, language)}</span>
                  </div>

                  <div className="text-[11px] text-slate-400 font-mono flex items-center justify-between">
                    <span>{s.bankName}</span>
                    <span>Date: {s.depositDate}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
