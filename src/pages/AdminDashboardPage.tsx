import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Database, 
  Dumbbell, 
  BookOpen, 
  Heart, 
  Users, 
  FileText, 
  Plus, 
  Trash2, 
  Edit3, 
  Download, 
  CheckCircle2,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { FoodItem, MotivationalQuote } from '../types';

export const AdminDashboardPage: React.FC = () => {
  const { 
    language, 
    foods, 
    deleteFood, 
    articles, 
    quotes, 
    activityLogs, 
    mealRecords, 
    user,
    setActiveTab,
    showToast
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'foods' | 'articles' | 'quotes' | 'users'>('overview');

  const stats = [
    { labelAm: 'የተመዘገቡ ምግቦች', labelEn: 'Total Foods in DB', value: foods.length, icon: Database, color: 'text-amber-600 bg-amber-50' },
    { labelAm: 'የተመዘገቡ ምግቦች (Logs)', labelEn: 'Total Meal Logs', value: mealRecords.length, icon: FileText, color: 'text-emerald-600 bg-emerald-50' },
    { labelAm: 'የስፖርት እንቅስቃሴዎች', labelEn: 'Completed Workouts', value: activityLogs.length, icon: Dumbbell, color: 'text-blue-600 bg-blue-50' },
    { labelAm: 'የትምህርት ጽሑፎች', labelEn: 'Educational Articles', value: articles.length, icon: BookOpen, color: 'text-purple-600 bg-purple-50' },
  ];

  const handleExportReport = () => {
    const reportData = {
      generatedAt: new Date().toISOString(),
      userProfile: user,
      totalFoods: foods.length,
      totalMealLogs: mealRecords.length,
      totalActivityLogs: activityLogs.length,
      recentActivities: activityLogs,
      recentMeals: mealRecords
    };
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fit-ethiopia-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    showToast(language === 'am' ? 'የእንቅስቃሴ ሪፖርት ዳውንሎድ ተደርጓል!' : 'Report exported successfully!');
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 text-xs font-bold border border-purple-400/30 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{language === 'am' ? 'የአስተዳዳሪ ክፍል (Admin Dashboard)' : 'Administrator Control Panel'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            {language === 'am' ? 'የFit Ethiopia አስተዳደር ማዕከል' : 'Fit Ethiopia Content & System Manager'}
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/80 mt-1">
            {language === 'am'
              ? 'ምግቦችን፣ ንጥረ-ነገሮችን፣ ልምምዶችን እና ጽሑፎችን በቀጥታ ያለ ኮድ ለውጥ ያስተዳድሩ።'
              : 'Manage foods, macros, workout programs, articles, and user reports without code edits.'}
          </p>
        </div>

        <button
          onClick={handleExportReport}
          className="self-start md:self-center px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md flex items-center gap-2 transition"
        >
          <Download className="w-4 h-4" />
          <span>{language === 'am' ? 'ሪፖርት አውርድ (JSON Export)' : 'Export System Report'}</span>
        </button>
      </div>

      {/* Admin Tab Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { id: 'overview', labelAm: 'አጠቃላይ እይታ', labelEn: 'Overview' },
          { id: 'foods', labelAm: 'የምግብ ዳታቤዝ ማስተዳደሪያ', labelEn: 'Manage Foods' },
          { id: 'articles', labelAm: 'የትምህርት ጽሑፎች', labelEn: 'Articles' },
          { id: 'quotes', labelAm: 'የማበረታቻ ቃላት', labelEn: 'Quotes' },
          { id: 'users', labelAm: 'ተጠቃሚዎች', labelEn: 'Users' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveAdminTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              activeAdminTab === tab.id
                ? 'bg-purple-700 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {language === 'am' ? tab.labelAm : tab.labelEn}
          </button>
        ))}
      </div>

      {/* Tab 1: Overview */}
      {activeAdminTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-semibold">
                      {language === 'am' ? s.labelAm : s.labelEn}
                    </span>
                    <div className={`p-2 rounded-xl ${s.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 block font-mono">
                    {s.value}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Recent System Activity */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card space-y-4">
            <h3 className="font-bold text-base text-slate-900">
              {language === 'am' ? 'የቅርብ ጊዜ እንቅስቃሴዎች' : 'Recent User Log Activities'}
            </h3>
            <div className="divide-y divide-slate-100 text-xs">
              {activityLogs.map((log) => (
                <div key={log.id} className="py-3 flex justify-between items-center">
                  <span className="font-bold text-slate-800">{log.typeNameAmharic}</span>
                  <span className="text-slate-500">{log.durationMinutes} min • {log.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Manage Foods */}
      {activeAdminTab === 'foods' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-base text-slate-900">
                {language === 'am' ? 'የምግብ ዳታቤዝ አያያዝ' : 'Food Database Control'}
              </h3>
              <span className="text-xs text-slate-500">
                {foods.length} {language === 'am' ? 'ምግቦች በዳታቤዝ ውስጥ ይገኛሉ' : 'foods currently registered'}
              </span>
            </div>
            <button
              onClick={() => setActiveTab('food-database')}
              className="px-3 py-1.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs"
            >
              {language === 'am' ? 'ወደ ሙሉ የዳታቤዝ ገጽ ሂድ' : 'Open Full Database'}
            </button>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {foods.slice(0, 8).map((f) => (
              <div key={f.id} className="py-3 flex items-center justify-between gap-3">
                <div>
                  <span className="font-bold text-slate-900">{f.nameAmharic}</span>
                  <span className="text-slate-500 text-[11px] ml-2">({f.nameEnglish})</span>
                  <span className="text-slate-400 block text-[10px] mt-0.5">{f.servingSize} • {f.calories} kcal</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold text-[10px]">
                    {f.category}
                  </span>
                  <button
                    onClick={() => deleteFood(f.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Articles */}
      {activeAdminTab === 'articles' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card space-y-4">
          <h3 className="font-bold text-base text-slate-900">
            {language === 'am' ? 'የትምህርት ጽሑፎች ዝርዝር' : 'Educational Articles Management'}
          </h3>
          <div className="divide-y divide-slate-100 text-xs">
            {articles.map((art) => (
              <div key={art.id} className="py-3 flex justify-between items-center">
                <div>
                  <span className="font-bold text-slate-800 block text-sm">{art.titleAmharic}</span>
                  <span className="text-slate-500 text-[11px]">{art.titleEnglish} • {art.readTimeMinutes} min</span>
                </div>
                <span className="px-2.5 py-1 rounded bg-purple-50 text-purple-700 font-bold text-[10px] uppercase">
                  {art.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Quotes */}
      {activeAdminTab === 'quotes' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card space-y-4">
          <h3 className="font-bold text-base text-slate-900">
            {language === 'am' ? 'የማበረታቻ መልዕክቶች' : 'Motivational Quotes Database'}
          </h3>
          <div className="divide-y divide-slate-100 text-xs">
            {quotes.map((q) => (
              <div key={q.id} className="py-3 space-y-1">
                <blockquote className="font-bold text-slate-800 text-sm">“{q.quoteAmharic}”</blockquote>
                <p className="text-slate-500 text-[11px]">“{q.quoteEnglish}”</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Users */}
      {activeAdminTab === 'users' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card space-y-4">
          <h3 className="font-bold text-base text-slate-900">
            {language === 'am' ? 'የተጠቃሚዎች ዝርዝር' : 'Registered Users Overview'}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase">
                  <th className="py-2.5 px-3">ስም (Name)</th>
                  <th className="py-2.5 px-3">ኢሜይል</th>
                  <th className="py-2.5 px-3">ቁመት / ክብደት</th>
                  <th className="py-2.5 px-3">ግብ (Goal)</th>
                  <th className="py-2.5 px-3">ሁኔታ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-3 px-3 font-bold text-slate-900">{user.name}</td>
                  <td className="py-3 px-3 text-slate-600">{user.email}</td>
                  <td className="py-3 px-3 font-mono">{user.height} cm / {user.weight} kg</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      {user.goal}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-emerald-600 font-bold">ንቁ (Active)</td>
                </tr>
                <tr className="opacity-75">
                  <td className="py-3 px-3 font-bold text-slate-900">ሰላም አበበ</td>
                  <td className="py-3 px-3 text-slate-600">selam.a@example.com</td>
                  <td className="py-3 px-3 font-mono">162 cm / 64 kg</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold text-[10px]">
                      healthy_lifestyle
                    </span>
                  </td>
                  <td className="py-3 px-3 text-emerald-600 font-bold">ንቁ (Active)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
