import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Dumbbell, 
  Utensils, 
  BookOpen, 
  Activity, 
  User, 
  Bot, 
  Menu, 
  X, 
  Globe, 
  ShieldCheck, 
  Droplet, 
  CheckSquare, 
  TrendingUp, 
  Sparkles,
  LayoutDashboard,
  Smartphone
} from 'lucide-react';
import { InstallAppModal } from './InstallAppModal';

export const Navbar: React.FC = () => {
  const { 
    language, 
    toggleLanguage, 
    activeTab, 
    setActiveTab, 
    user, 
    isAdmin, 
    setIsAdmin,
    toastMessage 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [installModalOpen, setInstallModalOpen] = useState(false);

  const navItems = [
    { id: 'home', labelAm: 'መነሻ', labelEn: 'Home', icon: Activity },
    { id: 'dashboard', labelAm: 'የእኔ እድገት', labelEn: 'Dashboard', icon: LayoutDashboard },
    { id: 'workouts', labelAm: 'የ4-ቀን ልምምድ', labelEn: 'Workouts', icon: Dumbbell },
    { id: 'food-analyzer', labelAm: 'የምግብ ትንተና', labelEn: 'Food Analyzer', icon: Sparkles, highlight: true },
    { id: 'food-diary', labelAm: 'የምግብ ማስታወሻ', labelEn: 'Food Diary', icon: Utensils },
    { id: 'water-tracker', labelAm: 'የውሃ መጠጫ', labelEn: 'Water Tracker', icon: Droplet },
    { id: 'habits', labelAm: 'ጤናማ ልማዶች', labelEn: 'Habits', icon: CheckSquare },
    { id: 'progress', labelAm: 'ክብደት ክትትል', labelEn: 'Weight Progress', icon: TrendingUp },
    { id: 'education', labelAm: 'የእውቀት ማዕከል', labelEn: 'Education', icon: BookOpen },
    { id: 'ai-assistant', labelAm: 'AI ረዳት', labelEn: 'AI Assistant', icon: Bot },
    { id: 'profile', labelAm: 'መገለጫ', labelEn: 'Profile', icon: User },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 right-4 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-emerald-500/50 animate-bounce transition-all">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Brand Logo */}
            <div 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-emerald-700 via-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
                <Dumbbell className="w-6 h-6 transform -rotate-12" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-emerald-700 transition">
                    Fit Ethiopia
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">
                    ኢትዮጵያ
                  </span>
                </div>
                <span className="text-[11px] sm:text-xs font-medium text-emerald-700 -mt-0.5">
                  የጤና እና አካል ብቃት መመሪያ
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : item.highlight
                        ? 'text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200'
                        : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : item.highlight ? 'text-amber-600' : 'text-slate-400'}`} />
                    <span>{language === 'am' ? item.labelAm : item.labelEn}</span>
                  </button>
                );
              })}
            </nav>

            {/* Action Buttons: Language Switcher, Admin Toggle, User Badge */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-emerald-500 bg-slate-50 hover:bg-white text-xs font-bold text-slate-700 transition shadow-2xs"
                title={language === 'am' ? 'Switch to English' : 'ወደ አማርኛ ቀይር'}
              >
                <Globe className="w-3.5 h-3.5 text-emerald-600" />
                <span>{language === 'am' ? 'English' : 'አማርኛ'}</span>
              </button>

              {/* Admin Mode Switcher */}
              <button
                onClick={() => {
                  setIsAdmin(!isAdmin);
                  if (!isAdmin) setActiveTab('admin');
                }}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition ${
                  isAdmin 
                    ? 'bg-purple-700 text-white border-purple-800 shadow-sm' 
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-purple-50 hover:text-purple-700'
                }`}
                title={language === 'am' ? 'የአስተዳዳሪ ክፍል' : 'Admin Panel'}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="hidden md:inline">{language === 'am' ? 'አድሚን' : 'Admin'}</span>
              </button>

              {/* User Avatar & Status */}
              <button
                onClick={() => handleNavClick('profile')}
                className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 hover:border-emerald-400 transition"
              >
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                  {user.name.charAt(0)}
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-800 leading-tight">
                    {user.name.split(' ')[0]}
                  </span>
                  <span className="text-[10px] text-emerald-700 font-medium">
                    {user.weight} kg → {user.targetWeight} kg
                  </span>
                </div>
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Flyout Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-fadeIn">
            <div className="grid grid-cols-2 gap-2 mb-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-2 p-2.5 rounded-lg text-xs font-medium text-left transition ${
                      isActive
                        ? 'bg-emerald-600 text-white font-bold'
                        : item.highlight
                        ? 'bg-amber-50 text-amber-900 border border-amber-200 font-semibold'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-amber-600' : 'text-slate-400'}`} />
                    <span>{language === 'am' ? item.labelAm : item.labelEn}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Fit Ethiopia v1.0 • የጤና እና አካል ብቃት</span>
              <button
                onClick={() => {
                  setIsAdmin(!isAdmin);
                  setActiveTab('admin');
                  setMobileMenuOpen(false);
                }}
                className="text-purple-700 font-bold hover:underline"
              >
                {language === 'am' ? 'የአስተዳዳሪ ገጽ' : 'Admin Panel'}
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
