import React from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { HealthDisclaimerBanner } from './components/HealthDisclaimerBanner';

// Pages
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { WorkoutsPage } from './pages/WorkoutsPage';
import { FoodAnalyzerPage } from './pages/FoodAnalyzerPage';
import { FoodDiaryPage } from './pages/FoodDiaryPage';
import { FoodDatabasePage } from './pages/FoodDatabasePage';
import { WaterTrackerPage } from './pages/WaterTrackerPage';
import { ActivityTrackerPage } from './pages/ActivityTrackerPage';
import { WeightProgressPage } from './pages/WeightProgressPage';
import { HabitsPage } from './pages/HabitsPage';
import { EducationPage } from './pages/EducationPage';
import { SmartGoalsPage } from './pages/SmartGoalsPage';
import { AiAssistantPage } from './pages/AiAssistantPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { Dumbbell, ShieldAlert, Heart, Globe } from 'lucide-react';

export const App: React.FC = () => {
  const { language, activeTab, setActiveTab } = useApp();

  const renderActivePage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'workouts':
        return <WorkoutsPage />;
      case 'food-analyzer':
        return <FoodAnalyzerPage />;
      case 'food-diary':
        return <FoodDiaryPage />;
      case 'food-database':
        return <FoodDatabasePage />;
      case 'water-tracker':
        return <WaterTrackerPage />;
      case 'activity-tracker':
        return <ActivityTrackerPage />;
      case 'progress':
        return <WeightProgressPage />;
      case 'habits':
        return <HabitsPage />;
      case 'education':
        return <EducationPage />;
      case 'smart-goals':
        return <SmartGoalsPage />;
      case 'ai-assistant':
        return <AiAssistantPage />;
      case 'profile':
        return <ProfilePage />;
      case 'admin':
        return <AdminDashboardPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
      {/* Universal Mandatory Health Disclaimer Banner (Requirement 17) */}
      <HealthDisclaimerBanner />

      {/* Main Top Header Navigation */}
      <Navbar />

      {/* Main Page Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {renderActivePage()}
      </main>

      {/* Mobile Bottom Navigation Bar (Requirement 19) */}
      <BottomNav />

      {/* Desktop & Mobile Comprehensive Footer */}
      <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-24 xl:pb-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Col 1: Brand & Subtitle */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                  <Dumbbell className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-lg font-black text-white block">Fit Ethiopia</span>
                  <span className="text-[11px] text-emerald-400 font-medium">የጤና እና አካል ብቃት መመሪያ</span>
                </div>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                {language === 'am'
                  ? 'ለኢትዮጵያውያን የተዘጋጀ፣ በሳይንሳዊ መርሆዎች ላይ የተመሰረተ፣ ጫና የሌለበት ዘላቂ የአኗኗር ዘይቤ መመሪያ።'
                  : 'Culturally adapted, evidence-based health and fitness guidance promoting sustainable vitality without restrictive shame.'}
              </p>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                {language === 'am' ? 'ፈጣን ማውጫ' : 'Quick Navigation'}
              </h4>
              <ul className="space-y-1.5 text-slate-400 font-medium">
                <li>
                  <button onClick={() => setActiveTab('workouts')} className="hover:text-emerald-400 transition">
                    {language === 'am' ? 'የ4-ቀን ልምምድ (Workouts)' : '4-Day Workout Plan'}
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('food-analyzer')} className="hover:text-emerald-400 transition">
                    {language === 'am' ? 'የምግብ ትንተና (Food Analyzer)' : 'Amharic Food Analyzer'}
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('food-database')} className="hover:text-emerald-400 transition">
                    {language === 'am' ? 'የኢትዮጵያ ምግቦች ዳታቤዝ' : 'Ethiopian Food Database'}
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('food-diary')} className="hover:text-emerald-400 transition">
                    {language === 'am' ? 'የዕለት ምግብ ማስታወሻ' : 'Daily Food Diary'}
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Health & Wellness Tools */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                {language === 'am' ? 'የጤና መሣሪያዎች' : 'Wellness Tools'}
              </h4>
              <ul className="space-y-1.5 text-slate-400 font-medium">
                <li>
                  <button onClick={() => setActiveTab('water-tracker')} className="hover:text-emerald-400 transition">
                    {language === 'am' ? 'የውሃ መጠጫ ክትትል' : 'Water Tracker'}
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('habits')} className="hover:text-emerald-400 transition">
                    {language === 'am' ? '8ቱ ጤናማ ልማዶች' : '8 Healthy Habits'}
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('progress')} className="hover:text-emerald-400 transition">
                    {language === 'am' ? 'የክብደት እድገት ግራፍ' : 'Weight Progress Chart'}
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('ai-assistant')} className="hover:text-emerald-400 transition">
                    {language === 'am' ? 'የአማርኛ AI ረዳት' : 'Amharic AI Assistant'}
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Medical Safety Notice */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <span>{language === 'am' ? 'የሕክምና ማሳሰቢያ' : 'Medical Advisory'}</span>
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {language === 'am'
                  ? 'ይህ ድረ-ገጽ ለአጠቃላይ የጤና፣ የአመጋገብ እና የእንቅስቃሴ መረጃ ብቻ ነው። የሐኪም ወይም የብቁ የጤና ባለሙያ ምክርን አይተካም።'
                  : 'This application is for educational lifestyle guidance only and does not replace medical advice from a qualified physician.'}
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
            <div>
              © 2026 Fit Ethiopia (የጤና እና አካል ብቃት መመሪያ). All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <span>Amharic & English Supported</span>
              <span>•</span>
              <button onClick={() => setActiveTab('admin')} className="hover:text-purple-400 transition font-bold">
                Admin Console
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default App;
