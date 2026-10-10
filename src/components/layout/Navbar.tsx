import React, { useState } from 'react';
import {
  Building2,
  Globe,
  Moon,
  Sun,
  Bell,
  User as UserIcon,
  LogOut,
  Menu,
  X,
  CreditCard,
  ShieldCheck,
  Compass,
  CheckCircle2,
  CloudCheck,
  TrendingUp,
  LayoutDashboard
} from 'lucide-react';
import { User, Language, Theme, AppNotification } from '../../types';
import { translations, getTranslation, formatBDT } from '../../services/i18n';

interface NavbarProps {
  user: User | null;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  theme: Theme;
  onThemeToggle: () => void;
  notifications: AppNotification[];
  onMarkNotificationsRead: () => void;
  activeView: string;
  onNavigate: (view: string) => void;
  onOpenAuth: () => void;
  onLogout: () => void;
  isGlanceWidgetOpen: boolean;
  onToggleGlanceWidget: () => void;
  isCloudSynced: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  language,
  onLanguageChange,
  theme,
  onThemeToggle,
  notifications,
  onMarkNotificationsRead,
  activeView,
  onNavigate,
  onOpenAuth,
  onLogout,
  isGlanceWidgetOpen,
  onToggleGlanceWidget,
  isCloudSynced
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const t = (key: keyof typeof translations.en) => getTranslation(language, key);

  const navLinks = [
    { id: 'home', label: t('navHome') },
    { id: 'projects', label: t('navProjects') },
    { id: 'timeline', label: t('navTimeline') },
    { id: 'masterplan', label: t('navMasterPlan') },
    { id: 'about', label: t('navAbout') },
    { id: 'gallery', label: t('navGallery') },
    { id: 'news', label: t('navNews') },
    { id: 'site-visit', label: t('navSiteVisit') },
    { id: 'calculator', label: t('navCalculator') },
    { id: 'legal', label: t('navLegal') },
    { id: 'contact', label: t('navContact') }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/90 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
              className="flex items-center gap-3 group text-left focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 via-amber-700 to-slate-900 flex items-center justify-center shadow-md shadow-amber-900/10 group-hover:scale-105 transition-transform">
                <Building2 className="w-5 h-5 text-amber-200" />
              </div>
              <div>
                <span className="font-extrabold tracking-tight text-lg sm:text-xl text-slate-900 dark:text-white block leading-tight">
                  CITY SQUARE <span className="text-amber-600 dark:text-amber-500">BD</span>
                </span>
                <span className="text-[10px] tracking-wider uppercase font-semibold text-slate-600 dark:text-slate-300 block -mt-0.5">
                  Real Estate & Investment
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`text-sm font-medium transition-colors ${
                  activeView === link.id
                    ? 'text-amber-700 dark:text-amber-400 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action Items: Lang, Theme, Sync, Notifications, Glance Widget, Auth */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Cloud Sync State Indicator */}
            <div
              title={isCloudSynced ? 'End-to-End Encrypted Cloud Synced' : 'Offline Cached'}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            >
              <span className={`w-2 h-2 rounded-full ${isCloudSynced ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              <span className="text-[11px] font-mono">
                {isCloudSynced ? 'SYNCED' : 'OFFLINE'}
              </span>
            </div>

            {/* Language Switcher */}
            <button
              onClick={() => onLanguageChange(language === 'en' ? 'bn' : 'en')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>{language === 'en' ? 'বাংলা' : 'EN'}</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={onThemeToggle}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* Quick Glance Widget Toggle Button */}
            <button
              onClick={onToggleGlanceWidget}
              className={`hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                isGlanceWidgetOpen
                  ? 'bg-amber-50 border-amber-300 text-amber-800 dark:bg-amber-950/40 dark:border-amber-700 dark:text-amber-300'
                  : 'bg-white border-slate-200 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 hover:bg-slate-50'
              }`}
              title="Toggle Quick Glance Widget"
            >
              <TrendingUp className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Glance</span>
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  if (!notificationsOpen && unreadCount > 0) {
                    onMarkNotificationsRead();
                  }
                }}
                className="relative p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
                )}
              </button>

              {/* Notification Dropdown */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700 z-50 overflow-hidden">
                  <div className="p-3 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                    <span className="font-semibold text-xs text-slate-900 dark:text-white uppercase tracking-wider">
                      {t('notificationsTitle')}
                    </span>
                    <button
                      onClick={() => setNotificationsOpen(false)}
                      className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700/50">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-xs text-slate-500">
                        {t('noNotifications')}
                      </div>
                    ) : (
                      notifications.map(n => (
                        <div
                          key={n.id}
                          className="p-3 hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors text-left"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-semibold text-xs text-slate-900 dark:text-slate-100">
                              {language === 'bn' ? n.titleBn : n.title}
                            </span>
                            <span className="text-[10px] text-slate-600 dark:text-slate-300 font-mono">
                              {n.date}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                            {language === 'bn' ? n.messageBn : n.message}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Session / Auth Action */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-amber-400 dark:hover:border-amber-500 transition-colors bg-white dark:bg-slate-800 text-left"
                >
                  <img
                    src={user.avatar}
                    alt={user.fullName}
                    className="w-7 h-7 rounded-full object-cover border border-amber-500/30"
                  />
                  <div className="hidden sm:block">
                    <span className="text-xs font-semibold text-slate-900 dark:text-white block leading-tight truncate max-w-[100px]">
                      {user.username}
                    </span>
                    <span className="text-[10px] text-amber-600 dark:text-amber-400 font-mono block">
                      {user.memberId}
                    </span>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700 z-50 py-1 overflow-hidden">
                    <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-700">
                      <p className="text-xs font-semibold text-slate-900 dark:text-white">
                        {language === 'bn' && user.fullNameBn ? user.fullNameBn : user.fullName}
                      </p>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 font-mono mt-0.5">
                        {user.branch}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        onNavigate('dashboard');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-left"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 text-amber-600" />
                      <span>{t('navPortal')}</span>
                    </button>

                    <button
                      onClick={() => {
                        onNavigate('admin');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-colors text-left font-semibold"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                      <span>{language === 'bn' ? 'এডমিন ড্যাশবোর্ড ৩৬০°' : 'Admin 360° Control'}</span>
                    </button>

                    <button
                      onClick={() => {
                        onLogout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors text-left"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>{t('navLogout')}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenAuth}
                  className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  <span>{t('navLogin')}</span>
                </button>
              </div>
            )}

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-2">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => {
                onNavigate(link.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                activeView === link.id
                  ? 'bg-amber-50 text-amber-700 dark:bg-slate-800 dark:text-amber-400 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              {link.label}
            </button>
          ))}

          {user && (
            <button
              onClick={() => {
                onNavigate('dashboard');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold bg-amber-600 text-white flex items-center justify-between"
            >
              <span>{t('navPortal')}</span>
              <span className="text-xs bg-amber-700/60 px-2 py-0.5 rounded font-mono">
                {user.memberId}
              </span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
