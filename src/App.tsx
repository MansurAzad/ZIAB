import React, { useState, useEffect } from 'react';
import {
  User,
  Language,
  Theme,
  PlotBooking,
  ShareInvestment,
  InstallmentRecord,
  TransactionRecord,
  SupportTicket,
  AppNotification
} from './types';
import { StorageService, INITIAL_USER, INITIAL_ADMIN } from './services/storage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ShieldCheck } from 'lucide-react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/public/HeroSection';
import { ProjectsExplorer } from './components/public/ProjectsExplorer';
import { MasterPlanViewer } from './components/public/MasterPlanViewer';
import { InvestmentCalculator } from './components/public/InvestmentCalculator';
import { LegalSecurity } from './components/public/LegalSecurity';
import { ProjectTimeline } from './components/public/ProjectTimeline';
import { AboutUs } from './components/public/AboutUs';
import { NoticeBoard } from './components/public/NoticeBoard';
import { MediaGallery } from './components/public/MediaGallery';
import { SiteVisitBooking } from './components/public/SiteVisitBooking';
import { ContactUs } from './components/public/ContactUs';
import { ProjectDetailModal } from './components/public/ProjectDetailModal';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { GlanceWidget } from './components/widget/GlanceWidget';
import { AuthModal } from './components/auth/AuthModal';
import { PushNotificationPrompt } from './components/common/PushNotificationPrompt';
import { PaymentGatewayModal } from './components/dashboard/PaymentGatewayModal';
import { ProjectInfo } from './types';

export default function App() {
  // Theme state
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('csbd_theme_preference');
    return (saved as Theme) || 'light';
  });

  // Language state
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('csbd_lang_preference');
    return (saved as Language) || 'en';
  });

  // User state - preloads Ziabulctg1 by default as requested in prompt, or loads from local storage
  const [user, setUser] = useState<User | null>(() => {
    const existing = StorageService.getUser();
    if (existing) return existing;
    // Auto-login Ziabulctg1 initially so the user immediately sees the requested /user dashboard
    const demo = StorageService.login('Ziabulctg1', '123456');
    return demo || INITIAL_USER;
  });

  // Active view: 'home' | 'projects' | 'masterplan' | 'calculator' | 'legal' | 'about' | 'dashboard'
  const [activeView, setActiveView] = useState<string>('dashboard');

  // Domain data
  const [plots, setPlots] = useState<PlotBooking[]>(() => StorageService.getPlots());
  const [shares, setShares] = useState<ShareInvestment[]>(() => StorageService.getShares());
  const [installments, setInstallments] = useState<InstallmentRecord[]>(() => StorageService.getInstallments());
  const [transactions, setTransactions] = useState<TransactionRecord[]>(() => StorageService.getTransactions());
  const [tickets, setTickets] = useState<SupportTicket[]>(() => StorageService.getTickets());
  const [notifications, setNotifications] = useState<AppNotification[]>(() => StorageService.getNotifications());

  // UI state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isGlanceWidgetOpen, setIsGlanceWidgetOpen] = useState(true);
  const [isCloudSynced, setIsCloudSynced] = useState(true);
  const [quickPaymentModalOpen, setQuickPaymentModalOpen] = useState(false);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [selectedProjectModal, setSelectedProjectModal] = useState<ProjectInfo | null>(null);

  // Sync theme to HTML class
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('csbd_theme_preference', theme);
  }, [theme]);

  // Sync language
  useEffect(() => {
    localStorage.setItem('csbd_lang_preference', language);
  }, [language]);

  // Online / Offline listener
  useEffect(() => {
    const handleOnline = () => setIsCloudSynced(true);
    const handleOffline = () => setIsCloudSynced(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const refreshAllData = () => {
    setPlots(StorageService.getPlots());
    setShares(StorageService.getShares());
    setInstallments(StorageService.getInstallments());
    setTransactions(StorageService.getTransactions());
    setTickets(StorageService.getTickets());
    setNotifications(StorageService.getNotifications());
    setIsCloudSynced(true);
  };

  const handleLogout = () => {
    StorageService.logout();
    setUser(null);
    setActiveView('home');
  };

  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
    refreshAllData();
    setActiveView('dashboard');
  };

  const handleTriggerSync = () => {
    setIsCloudSynced(false);
    setTimeout(() => {
      StorageService.updateLastSync();
      setIsCloudSynced(true);
      refreshAllData();
    }, 700);
  };

  return (
    <div className={`min-h-screen flex flex-col ${language === 'bn' ? 'font-bangla' : ''}`}>
      
      {/* Top Navigation */}
      <Navbar
        user={user}
        language={language}
        onLanguageChange={setLanguage}
        theme={theme}
        onThemeToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        notifications={notifications}
        onMarkNotificationsRead={() => {
          StorageService.markNotificationsAsRead();
          setNotifications(StorageService.getNotifications());
        }}
        activeView={activeView}
        onNavigate={view => {
          if (view === 'dashboard' && !user) {
            setAuthModalOpen(true);
          } else if (view === 'admin') {
            setActiveView('admin');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else if (['projects', 'timeline', 'masterplan', 'calculator', 'legal', 'about', 'gallery', 'news', 'site-visit', 'contact'].includes(view)) {
            setActiveView('home');
            setTimeout(() => {
              const el = document.getElementById(view);
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }, 60);
          } else {
            setActiveView(view);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        onOpenAuth={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
        isGlanceWidgetOpen={isGlanceWidgetOpen}
        onToggleGlanceWidget={() => setIsGlanceWidgetOpen(!isGlanceWidgetOpen)}
        isCloudSynced={isCloudSynced}
      />

      {/* Main View Area */}
      <main className="flex-1">
        
        {/* ROUTE 0: ADMIN DASHBOARD 360° (/admin) */}
        {activeView === 'admin' ? (
          <AdminDashboard
            currentUser={user?.role === 'admin' ? user : INITIAL_ADMIN}
            language={language}
            onLogout={handleLogout}
            onSwitchToUserPortal={() => {
              if (!user || user.role === 'admin') {
                const ziabul = StorageService.login('Ziabulctg1', '123456');
                if (ziabul) setUser(ziabul);
              }
              setActiveView('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSwitchToPublic={() => {
              setActiveView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : activeView === 'dashboard' ? (
          /* ROUTE 1: INVESTOR DASHBOARD (/user) */
          user ? (
            <DashboardLayout
              user={user}
              language={language}
              plots={plots}
              shares={shares}
              installments={installments}
              transactions={transactions}
              tickets={tickets}
              onRefreshData={refreshAllData}
              onOpenMasterPlan={() => {
                setActiveView('masterplan');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              isCloudSynced={isCloudSynced}
              onTriggerSync={handleTriggerSync}
            />
          ) : (
            <div className="max-w-md mx-auto my-20 p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Investor Authentication Required
              </h3>
              <p className="text-xs text-slate-500">
                Please log in with the provided credentials <strong>Ziabulctg1 / 123456</strong> to access your real estate portfolio.
              </p>
              <button
                onClick={() => setAuthModalOpen(true)}
                className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs"
              >
                Sign In as Ziabulctg1
              </button>
            </div>
          )
        ) : (
          /* ROUTE 2: PUBLIC WEBSITE PAGES */
          <>
            <HeroSection
              language={language}
              user={user}
              onOpenAuth={() => setAuthModalOpen(true)}
              onExploreProjects={() => {
                const el = document.getElementById('projects');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenPortal={() => setActiveView('dashboard')}
              onOpenDemo={() => {
                const demo = StorageService.login('Ziabulctg1', '123456');
                if (demo) setUser(demo);
                setActiveView('dashboard');
              }}
            />

            <ProjectsExplorer
              language={language}
              onSelectProject={() => setActiveView('calculator')}
              onOpenMasterPlan={() => {
                const el = document.getElementById('masterplan');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onViewDetails={proj => {
                setSelectedProjectModal(proj);
                setProjectModalOpen(true);
              }}
            />

            <ProjectTimeline
              language={language}
              onSelectProjectForBooking={() => {
                setActiveView('calculator');
                const el = document.getElementById('calculator');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            <MasterPlanViewer
              language={language}
              onSelectPlotForBooking={() => setActiveView('calculator')}
            />

            <AboutUs
              language={language}
              onBookSiteVisit={() => {
                const el = document.getElementById('site-visit');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenProjects={() => {
                const el = document.getElementById('projects');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            <MediaGallery language={language} />

            <NoticeBoard language={language} />

            <SiteVisitBooking language={language} />

            <InvestmentCalculator
              language={language}
              onEnquire={() => {
                if (!user) setAuthModalOpen(true);
                else setActiveView('dashboard');
              }}
            />

            <LegalSecurity language={language} />

            <ContactUs language={language} />
          </>
        )}

      </main>

      {/* Floating Quick Glance Portfolio Widget */}
      <GlanceWidget
        isOpen={isGlanceWidgetOpen}
        onClose={() => setIsGlanceWidgetOpen(false)}
        user={user}
        plots={plots}
        shares={shares}
        language={language}
        onOpenPayment={() => setQuickPaymentModalOpen(true)}
        onOpenPortal={() => {
          setActiveView('dashboard');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isCloudSynced={isCloudSynced}
      />

      {/* Push Notification Banner */}
      <PushNotificationPrompt language={language} />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        language={language}
      />

      {/* Quick Pay Modal from Widget */}
      <PaymentGatewayModal
        isOpen={quickPaymentModalOpen}
        onClose={() => setQuickPaymentModalOpen(false)}
        installment={installments.find(i => i.status === 'due') || installments[0]}
        language={language}
        onPaymentSuccess={() => {
          refreshAllData();
        }}
      />

      {/* Project Detail Specifications Modal */}
      <ProjectDetailModal
        isOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
        project={selectedProjectModal}
        language={language}
        onBookNow={() => {
          setProjectModalOpen(false);
          setActiveView('calculator');
          const el = document.getElementById('calculator');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onBookTour={() => {
          setProjectModalOpen(false);
          const el = document.getElementById('site-visit');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Footer */}
      <Footer
        language={language}
        onNavigate={view => {
          if (view === 'dashboard' && !user) setAuthModalOpen(true);
          else setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

    </div>
  );
}
