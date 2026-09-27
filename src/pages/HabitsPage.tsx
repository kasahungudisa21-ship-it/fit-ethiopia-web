import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  CheckSquare, 
  Check, 
  Calendar, 
  Award, 
  Heart, 
  Sparkles, 
  TrendingUp,
  Activity,
  Smile
} from 'lucide-react';

export const HabitsPage: React.FC = () => {
  const { language, habits, toggleHabitForToday } = useApp();

  const todayStr = new Date().toISOString().split('T')[0];

  // Generate the last 7 days dates for weekly consistency grid
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split('T')[0];
  });

  const dayNamesAm = ['እሁድ', 'ሰኞ', 'ማክሰኞ', 'ረቡዕ', 'ሐሙስ', 'አርብ', 'ቅዳሜ'];
  const dayNamesEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const completedTodayCount = habits.filter(h => h.completedDates.includes(todayStr)).length;
  const completionPercentage = Math.round((completedTodayCount / habits.length) * 100);

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md mb-2">
            <CheckSquare className="w-3.5 h-3.5" />
            <span>{language === 'am' ? 'የዕለት ጤናማ ልማዶች' : 'Healthy Habits'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {language === 'am' ? 'የ8 ዕለታዊ ጤናማ ልማዶች ማረጋገጫ' : 'Daily Habits Checklist'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {language === 'am'
              ? 'ቀጣይነት ያለው ጤና የሚገነባው በእነዚህ ቀላል ዕለታዊ ተግባራት ጥንካሬ ነው።'
              : 'Sustainable vitality and effortless fat loss are anchored in small daily habits.'}
          </p>
        </div>

        <div className="bg-purple-50 border border-purple-200 p-4 rounded-2xl text-center">
          <span className="text-[10px] uppercase font-bold text-purple-800 tracking-wider block">
            {language === 'am' ? 'የዛሬ ውጤት' : 'Today\'s Score'}
          </span>
          <span className="text-2xl font-black text-purple-700 mt-0.5 block">
            {completedTodayCount} / {habits.length}
          </span>
          <span className="text-[10px] text-purple-600 font-bold block mt-0.5">
            {completionPercentage}% {language === 'am' ? 'ተጠናቋል' : 'done'}
          </span>
        </div>
      </div>

      {/* Today's Checklist (Requirement 11) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h2 className="font-bold text-lg text-slate-900">
            {language === 'am' ? 'የዛሬ ማረጋገጫ ዝርዝር (Today\'s Habits)' : 'Today\'s Checklist'}
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            {todayStr}
          </span>
        </div>

        <div className="space-y-3">
          {habits.map((habit) => {
            const isCompleted = habit.completedDates.includes(todayStr);
            return (
              <div
                key={habit.id}
                onClick={() => toggleHabitForToday(habit.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                  isCompleted
                    ? 'bg-purple-50/50 border-purple-300 text-slate-700 shadow-2xs'
                    : 'bg-slate-50/70 border-slate-200 hover:border-purple-300 text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                      isCompleted
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'border-2 border-slate-300 bg-white'
                    }`}
                  >
                    {isCompleted && <Check className="w-4 h-4 stroke-[3]" />}
                  </div>
                  <div>
                    <span className={`text-sm font-bold block ${isCompleted ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                      {language === 'am' ? habit.titleAmharic : habit.titleEnglish}
                    </span>
                    <span className="text-[10px] text-slate-600 uppercase font-semibold">
                      {habit.category}
                    </span>
                  </div>
                </div>

                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  isCompleted ? 'bg-purple-100 text-purple-800' : 'text-slate-600'
                }`}>
                  {isCompleted
                    ? (language === 'am' ? 'ተጠናቋል ✓' : 'Done ✓')
                    : (language === 'am' ? 'ጠቅ ያድርጉ' : 'Tap to mark')}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weekly Consistency Matrix (Requirement 11: Show weekly consistency) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-lg text-slate-900">
              {language === 'am' ? 'የሳምንታዊ ቀጣይነት ሰንጠረዥ (Weekly Consistency)' : 'Weekly Consistency Matrix'}
            </h3>
            <p className="text-xs text-slate-500">
              {language === 'am' ? 'ባለፉት 7 ቀናት ያሳዩትን ተከታታይነት ይከታተሉ' : 'Track your consistency over the last 7 days'}
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="w-3 h-3 rounded bg-purple-600" /> {language === 'am' ? 'ተጠናቋል' : 'Done'}
            </span>
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="w-3 h-3 rounded bg-slate-200" /> {language === 'am' ? 'ያልተጠናቀቀ' : 'Pending'}
            </span>
          </div>
        </div>

        {/* Responsive Table Grid */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="py-2.5 px-3 font-bold text-slate-700">
                  {language === 'am' ? 'ልማድ' : 'Habit'}
                </th>
                {last7Days.map((dateStr) => {
                  const dayObj = new Date(dateStr);
                  const dayIdx = dayObj.getDay();
                  const isToday = dateStr === todayStr;
                  return (
                    <th key={dateStr} className={`py-2.5 px-2 text-center ${isToday ? 'bg-purple-50 font-black text-purple-900 rounded-t-lg' : 'text-slate-600'}`}>
                      <div className="text-[10px] uppercase font-bold">
                        {language === 'am' ? dayNamesAm[dayIdx] : dayNamesEn[dayIdx]}
                      </div>
                      <div className="text-[11px] font-semibold">{dateStr.slice(8)}</div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {habits.map((habit) => (
                <tr key={habit.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3 font-bold text-slate-800 text-xs max-w-[200px] truncate">
                    {language === 'am' ? habit.titleAmharic : habit.titleEnglish}
                  </td>
                  {last7Days.map((dateStr) => {
                    const isDone = habit.completedDates.includes(dateStr);
                    const isToday = dateStr === todayStr;
                    return (
                      <td key={dateStr} className={`py-3 px-2 text-center ${isToday ? 'bg-purple-50/50' : ''}`}>
                        <div
                          className={`w-6 h-6 mx-auto rounded-md flex items-center justify-center transition-all ${
                            isDone
                              ? 'bg-purple-600 text-white font-bold shadow-2xs'
                              : 'bg-slate-100 text-slate-300'
                          }`}
                        >
                          {isDone ? '✓' : '·'}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
