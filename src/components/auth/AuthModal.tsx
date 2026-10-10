import React, { useState } from 'react';
import {
  X,
  Lock,
  User as UserIcon,
  Eye,
  EyeOff,
  ShieldCheck,
  Building2,
  KeyRound,
  ArrowRight,
  Sparkles,
  Phone,
  Mail
} from 'lucide-react';
import { User, Language } from '../../types';
import { translations, getTranslation } from '../../services/i18n';
import { StorageService } from '../../services/storage';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
  language: Language;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  language
}) => {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [username, setUsername] = useState('Ziabulctg1');
  const [password, setPassword] = useState('123456');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [branch, setBranch] = useState('Chattogram Office (Agrabad)');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const t = (key: keyof typeof translations.en) => getTranslation(language, key);

  if (!isOpen) return null;

  const handleFillDemo = () => {
    setUsername('Ziabulctg1');
    setPassword('123456');
    setError(null);
  };

  const handleFillAdmin = () => {
    setUsername('admin');
    setPassword('admin123');
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (isLoginTab) {
      const loggedUser = StorageService.login(username, password);
      if (loggedUser) {
        onLoginSuccess(loggedUser);
        onClose();
      } else {
        setError(
          language === 'bn'
            ? 'ভুল ইউজারনেম বা পাসওয়ার্ড। ডেমো একাউন্ট ব্যবহার করুন: Ziabulctg1 / 123456'
            : 'Invalid credentials. Please test with provided login: Ziabulctg1 / 123456'
        );
      }
    } else {
      if (!username || !password || !fullName) {
        setError(language === 'bn' ? 'অনুগ্রহ করে সকল তথ্য পূরণ করুন।' : 'Please fill in all required fields.');
        return;
      }
      const registered = StorageService.register(
        {
          username,
          fullName,
          email,
          phone,
          branch
        },
        password
      );
      onLoginSuccess(registered);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
        
        {/* Top Banner */}
        <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 p-6 text-white text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 mx-auto rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center mb-3">
            <Building2 className="w-6 h-6 text-amber-300" />
          </div>

          <h2 className="text-lg font-bold tracking-tight">
            {t('authModalTitle')}
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xs mx-auto">
            {t('authModalSubtitle')}
          </p>

          {/* Quick Demo Fill Pills */}
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-[11px] font-semibold text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/30 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Investor: Ziabulctg1</span>
            </button>
            <button
              type="button"
              onClick={handleFillAdmin}
              className="text-[11px] font-semibold text-emerald-300 hover:text-emerald-200 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-400/30 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Admin: admin</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-1">
          <button
            type="button"
            onClick={() => { setIsLoginTab(true); setError(null); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${
              isLoginTab
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            {t('tabLogin')}
          </button>
          <button
            type="button"
            onClick={() => { setIsLoginTab(false); setError(null); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${
              !isLoginTab
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            {t('tabRegister')}
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-xs text-rose-700 dark:text-rose-300">
              {error}
            </div>
          )}

          {!isLoginTab && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Name / পুরো নাম
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="e.g. Md. Rafiqul Islam"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {t('usernameLabel')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <UserIcon className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Ziabulctg1"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
              />
            </div>
          </div>

          {!isLoginTab && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Phone / মোবাইল
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+880 1819..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Branch Office
                </label>
                <select
                  value={branch}
                  onChange={e => setBranch(e.target.value)}
                  className="w-full px-2 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option>Chattogram Office (Agrabad)</option>
                  <option>Dhaka Head Office (Mirpur)</option>
                  <option>Purbachal Site Office</option>
                </select>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {t('passwordLabel')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="123456"
                className="w-full pl-9 pr-9 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-amber-600 focus:ring-amber-500" />
              <span>{t('rememberMe')}</span>
            </label>
            <span className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              256-Bit SSL
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2 hover:shadow-amber-600/20"
          >
            <span>{isLoginTab ? t('btnSignIn') : t('btnRegister')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer info note */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 text-center">
          {language === 'bn'
            ? 'যেকোনো কারিগরি সহায়তায় সিটি স্কয়ার বিডি হটলাইনে যোগাযোগ করুন: ০৯৬১১-xxxxxx'
            : 'City Square BD 24/7 Investor Hotline: +880 1700-CITYBD'}
        </div>

      </div>
    </div>
  );
};
