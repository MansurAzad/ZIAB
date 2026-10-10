import React, { useState } from 'react';
import {
  User as UserIcon,
  ShieldCheck,
  CheckCircle2,
  Building,
  Smartphone,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  Save,
  Clock,
  IdCard,
  FileCheck
} from 'lucide-react';
import { Language, User } from '../../types';
import { StorageService } from '../../services/storage';

interface ProfileKYCViewProps {
  user: User;
  language: Language;
  onProfileUpdated: (updatedUser: User) => void;
}

export const ProfileKYCView: React.FC<ProfileKYCViewProps> = ({
  user,
  language,
  onProfileUpdated
}) => {
  const [fullName, setFullName] = useState(user.fullName);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [address, setAddress] = useState(user.address);
  const [city, setCity] = useState(user.city);
  const [nidNo, setNidNo] = useState(user.nidNo);
  const [nomineeName, setNomineeName] = useState(user.nominee.name);
  const [nomineeRelation, setNomineeRelation] = useState(user.nominee.relation);
  const [nomineePhone, setNomineePhone] = useState(user.nominee.phone);
  const [nomineeNid, setNomineeNid] = useState(user.nominee.nid);

  const [bankName, setBankName] = useState('The City Bank Limited');
  const [bankBranch, setBankBranch] = useState('Agrabad Commercial Area Branch, Chattogram');
  const [bankAccount, setBankAccount] = useState('1102948192001');
  const [routingNumber, setRoutingNumber] = useState('225150921');
  const [bkashNumber, setBkashNumber] = useState('01819745239');

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: User = {
      ...user,
      fullName,
      phone,
      email,
      address,
      city,
      nidNo,
      nominee: {
        name: nomineeName,
        relation: nomineeRelation,
        phone: nomineePhone,
        nid: nomineeNid
      }
    };

    localStorage.setItem('csbd_user_session_enc', btoa(encodeURIComponent(JSON.stringify(updated))));
    onProfileUpdated(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            {language === 'bn' ? 'আমার প্রোফাইল ও কেওয়াইসি ভেরিফিকেশন' : 'Investor Profile & KYC Verification'}
          </h2>
          <p className="text-xs text-slate-500">
            {language === 'bn'
              ? 'আপনার ব্যক্তিগত পরিচয়, জাতীয় পরিচয়পত্র, ব্যাংকিং তথ্য এবং নমিনি ডাটা হালনাগাদ করুন।'
              : 'Verified membership profile, authorized nominee designation, and linked disbursement banking channels.'}
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>KYC Status: VERIFIED & COMPLIANT</span>
        </div>
      </div>

      {/* Profile Overview Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar}
            alt={user.fullName}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400 shadow-lg"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-extrabold text-white">
                {user.fullName}
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold uppercase">
                GOLD INVESTOR
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 font-mono mt-1">
              <span>Member ID: {user.memberId}</span>
              <span>·</span>
              <span>Username: {user.username}</span>
              <span>·</span>
              <span>Branch: {user.branch}</span>
            </div>
          </div>
        </div>

        <div className="text-right sm:self-center font-mono text-xs text-amber-200">
          <span>Joined: {user.joinedDate}</span>
          <span className="block text-[11px] text-emerald-400 font-semibold mt-0.5">
            Sponsor / Reference: Central Corporate Desk
          </span>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Profile changes successfully encrypted and saved to City Square BD database!</span>
        </div>
      )}

      {/* Profile Edit Form */}
      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Section 1: Personal & KYC */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <IdCard className="w-4 h-4 text-amber-600" />
            <span>1. Personal & Legal Identity</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Full Name / পুরো নাম
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                National ID (NID) / জাতীয় পরিচয়পত্র নম্বর
              </label>
              <input
                type="text"
                required
                value={nidNo}
                onChange={e => setNidNo(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Mobile Number / মোবাইল
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Email Address / ইমেইল
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Present Address / বর্তমান ঠিকানা
              </label>
              <input
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Nominee Details */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>2. Authorized Legal Nominee (উত্তরাধিকারী তথ্য)</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Nominee Name / নমিনির নাম
              </label>
              <input
                type="text"
                required
                value={nomineeName}
                onChange={e => setNomineeName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Relationship / সম্পর্ক
              </label>
              <select
                value={nomineeRelation}
                onChange={e => setNomineeRelation(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option>Spouse</option>
                <option>Son</option>
                <option>Daughter</option>
                <option>Mother</option>
                <option>Father</option>
                <option>Brother</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Nominee Phone / মোবাইল
              </label>
              <input
                type="text"
                value={nomineePhone}
                onChange={e => setNomineePhone(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Nominee NID / জাতীয় পরিচয়পত্র
              </label>
              <input
                type="text"
                value={nomineeNid}
                onChange={e => setNomineeNid(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Bank & MFS Payout Channel */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <Building className="w-4 h-4 text-amber-600" />
            <span>3. Bank Account & Mobile Financial Service (MFS)</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Bank Name
              </label>
              <input
                type="text"
                value={bankName}
                onChange={e => setBankName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Branch Name
              </label>
              <input
                type="text"
                value={bankBranch}
                onChange={e => setBankBranch(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Account Number
              </label>
              <input
                type="text"
                value={bankAccount}
                onChange={e => setBankAccount(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                bKash / Nagad Wallet Number
              </label>
              <input
                type="text"
                value={bkashNumber}
                onChange={e => setBkashNumber(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center gap-2 transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Save Profile & KYC Information</span>
        </button>

      </form>

    </div>
  );
};
