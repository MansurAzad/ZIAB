import React, { useState } from 'react';
import {
  Lock,
  KeyRound,
  ShieldCheck,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Laptop,
  Clock
} from 'lucide-react';
import { Language, User } from '../../types';

interface TransactionPinSecurityViewProps {
  user: User;
  language: Language;
}

export const TransactionPinSecurityView: React.FC<TransactionPinSecurityViewProps> = ({
  user,
  language
}) => {
  const [currentPassword, setCurrentPassword] = useState('123456');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [passSuccess, setPassSuccess] = useState(false);

  const [currentPin, setCurrentPin] = useState('8842');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [pinSuccess, setPinSuccess] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(user.twoFactorEnabled);

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword !== confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    setPassSuccess(true);
    setTimeout(() => setPassSuccess(false), 3000);
  };

  const handleUpdatePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPin || newPin !== confirmPin || newPin.length !== 4) {
      alert('T-PIN must be exactly 4 digits and match confirmation!');
      return;
    }
    setPinSuccess(true);
    setTimeout(() => setPinSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            {language === 'bn' ? 'নিরাপত্তা, পাসওয়ার্ড ও ৪-সংখ্যার টি-পিন (T-PIN)' : 'Account Security, Password & Transaction PIN'}
          </h2>
          <p className="text-xs text-slate-500">
            {language === 'bn'
              ? 'আপনার লগইন পাসওয়ার্ড, ফান্ড ট্রান্সফার টি-পিন ও টু-ফ্যাক্টর নিরাপত্তা সেটিংস পরিচালনা করুন।'
              : 'Manage login credentials, 4-digit transfer PIN, and multi-factor authentication protocols.'}
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>E2E ENCRYPTED VAULT: ACTIVE</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: Change Login Password */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-600" />
            <span>Change Login Password</span>
          </h3>

          {passSuccess && (
            <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Password successfully updated!</span>
            </div>
          )}

          <form onSubmit={handleUpdatePassword} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Current Password
              </label>
              <input
                type={showPass ? 'text' : 'password'}
                required
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                New Password
              </label>
              <input
                type={showPass ? 'text' : 'password'}
                required
                placeholder="At least 6 characters"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Confirm New Password
              </label>
              <input
                type={showPass ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 text-[11px]"
              >
                {showPass ? 'Hide Password' : 'Show Password'}
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-colors"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>

        {/* Card 2: 4-Digit Transaction PIN (T-PIN) */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-emerald-600" />
            <span>4-Digit Transaction PIN (T-PIN)</span>
          </h3>

          <p className="text-xs text-slate-500">
            Required for approving fund withdrawals, member balance transfers, and nominee updates.
          </p>

          {pinSuccess && (
            <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>T-PIN successfully updated!</span>
            </div>
          )}

          <form onSubmit={handleUpdatePin} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Current T-PIN (Default: 8842)
              </label>
              <input
                type="password"
                maxLength={4}
                required
                value={currentPin}
                onChange={e => setCurrentPin(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-center tracking-widest text-base"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  New 4-Digit T-PIN
                </label>
                <input
                  type="password"
                  maxLength={4}
                  required
                  placeholder="••••"
                  value={newPin}
                  onChange={e => setNewPin(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-center tracking-widest text-base"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Confirm T-PIN
                </label>
                <input
                  type="password"
                  maxLength={4}
                  required
                  placeholder="••••"
                  value={confirmPin}
                  onChange={e => setConfirmPin(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-center tracking-widest text-base"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors"
            >
              Update Transaction PIN
            </button>
          </form>
        </div>

      </div>

      {/* Two-Factor Authentication & Device Log Strip */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-amber-600" />
              <span>SMS / Mobile Two-Factor Authentication (2FA)</span>
            </h4>
            <p className="text-xs text-slate-500">
              Receive a 6-digit one-time passcode on {user.phone} whenever signing in from a new browser.
            </p>
          </div>

          <button
            onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              twoFactorEnabled
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            {twoFactorEnabled ? '2FA Active' : 'Enable 2FA'}
          </button>
        </div>

        {/* Active Session Devices */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
          <span className="font-semibold text-slate-700 dark:text-slate-300 block">
            Active Verified Login Sessions:
          </span>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 gap-2">
            <div className="flex items-center gap-3">
              <Laptop className="w-4 h-4 text-emerald-600" />
              <div>
                <strong className="text-slate-900 dark:text-white block">Current Device (Chrome on Linux / Web Preview)</strong>
                <span className="text-[10px] text-slate-400 font-mono">IP: 103.205.71.x · Chattogram / Dhaka Gateway</span>
              </div>
            </div>
            <span className="text-[11px] font-mono font-bold text-emerald-600">THIS SESSION (ACTIVE)</span>
          </div>
        </div>
      </div>

    </div>
  );
};
