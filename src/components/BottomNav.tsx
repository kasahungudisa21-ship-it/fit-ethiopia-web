import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Dumbbell, Sparkles, Utensils, TrendingUp } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { language, activeTab, setActiveTab } = useApp();

  const primaryItems = [
    { id: 'home', labelAm: 'መነሻ', labelEn: 'Home', icon: Home },
    { id: 'workouts', labelAm: 'ልምምድ', labelEn: 'Workout', icon: Dumbbell },
    { id: 'food-analyzer', labelAm: 'ትንተና', labelEn: 'Analyzer', icon: Sparkles, featured: true },
    { id: 'food-diary', labelAm: 'ማስታወሻ', labelEn: 'Diary', icon: Utensils },
    { id: 'dashboard', labelAm: 'እድገት', labelEn: 'Progress', icon: TrendingUp },
  ];

  return (
    <nav className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 py-1.5 px-3 pb-safe shadow-lg">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {primaryItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          if (item.featured) {
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="flex flex-col items-center -mt-5 group"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform group-active:scale-95 ${
                  isActive 
                    ? 'bg-amber-600 text-white ring-4 ring-amber-100' 
                    : 'bg-emerald-600 text-white hover:bg-emerald-700 ring-4 ring-white'
                }`}>
                  <Icon className="w-6 h-6 animate-pulse" />
                </div>
                <span className={`text-[10px] font-bold mt-1 ${isActive ? 'text-amber-700' : 'text-slate-600'}`}>
                  {language === 'am' ? item.labelAm : item.labelEn}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center py-1 px-2.5 rounded-lg transition ${
                isActive ? 'text-emerald-700' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className={`text-[10px] mt-0.5 ${isActive ? 'font-bold' : 'font-medium'}`}>
                {language === 'am' ? item.labelAm : item.labelEn}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
