import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ActivityLog } from '../types';
import { 
  Activity, 
  Plus, 
  Dumbbell, 
  Flame, 
  Clock, 
  Calendar, 
  Award, 
  Heart, 
  Footprints, 
  Bike, 
  Smile,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const ActivityTrackerPage: React.FC = () => {
  const { language, activityLogs, addActivityLog, weeklyWorkoutsCompleted } = useApp();

  const [activityType, setActivityType] = useState<ActivityLog['type']>('walking');
  const [durationMinutes, setDurationMinutes] = useState<number>(30);
  const [customNotes, setCustomNotes] = useState<string>('');

  const activityTypesConfig = [
    { type: 'walking', labelAm: 'የእግር ጉዞ (Walking)', labelEn: 'Walking', icon: Footprints, met: 3.5 },
    { type: 'running', labelAm: 'ሩጫ (Running)', labelEn: 'Running', icon: Flame, met: 7.5 },
    { type: 'cycling', labelAm: 'ብስክሌት (Cycling)', labelEn: 'Cycling', icon: Bike, met: 6.0 },
    { type: 'home_workout', labelAm: 'የቤት ውስጥ እንቅስቃሴ (Home Workout)', labelEn: 'Home Workout', icon: Dumbbell, met: 5.0 },
    { type: 'gym', labelAm: 'የጂም ልምምድ (Gym / Weights)', labelEn: 'Gym / Weights', icon: Dumbbell, met: 5.5 },
    { type: 'sports', labelAm: 'ስፖርት / ኳስ (Sports)', labelEn: 'Sports', icon: Activity, met: 6.5 },
    { type: 'stretching', labelAm: 'መወጠርና ዮጋ (Stretching)', labelEn: 'Stretching', icon: Smile, met: 2.5 },
  ];

  const selectedConfig = activityTypesConfig.find(a => a.type === activityType) || activityTypesConfig[0];
  const estimatedCaloriesBurned = Math.round(durationMinutes * (selectedConfig.met * 1.15));

  const handleLogActivity = (e: React.FormEvent) => {
    e.preventDefault();
    addActivityLog({
      type: activityType,
      typeNameAmharic: selectedConfig.labelAm,
      durationMinutes,
      caloriesBurned: estimatedCaloriesBurned,
      date: new Date().toISOString().split('T')[0],
      notes: customNotes
    });
    setCustomNotes('');
  };

  const totalMinutesAllTime = activityLogs.reduce((acc, log) => acc + log.durationMinutes, 0);
  const totalCaloriesAllTime = activityLogs.reduce((acc, log) => acc + (log.caloriesBurned || 0), 0);

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md mb-2">
            <Activity className="w-3.5 h-3.5" />
            <span>{language === 'am' ? 'የእንቅስቃሴ ክትትል' : 'Activity Tracker'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {language === 'am' ? 'የዕለት እና የሳምንት እንቅስቃሴ ምዝገባ' : 'Log Physical Activity'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {language === 'am'
              ? 'መራመድ፣ ሩጫ፣ የቤት ውስጥ ስፖርት ወይም መወጠር... ማንኛውም ትንሽ እንቅስቃሴ ዋጋ አለው!'
              : 'Record your walking, running, home workouts, or stretching. Every bit of movement counts!'}
          </p>
        </div>

        {/* 4/4 Target Banner (Exact Requirement 9) */}
        <div className="bg-emerald-50 border border-emerald-200/80 p-4 rounded-2xl flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-lg">
            {weeklyWorkoutsCompleted}/4
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase text-emerald-800 tracking-wider block">
              {language === 'am' ? 'የሳምንቱ ሁኔታ' : 'Weekly Status'}
            </span>
            <span className="text-sm font-black text-slate-900 block">
              {weeklyWorkoutsCompleted >= 4
                ? (language === 'am' ? 'ይህ ሳምንት 4/4 የእንቅስቃሴ ቀናት ተጠናቋል!' : 'This week 4/4 activity days completed!')
                : (language === 'am' ? `${weeklyWorkoutsCompleted}/4 ቀናት ተጠናቀዋል • በርቱ!` : `${weeklyWorkoutsCompleted}/4 days completed • Keep going!`)}
            </span>
          </div>
        </div>
      </div>

      {/* Encouragement Banner (Non-shaming philosophy) */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-6 rounded-3xl shadow-xl flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
          <Heart className="w-6 h-6 fill-white" />
        </div>
        <div className="space-y-0.5">
          <h3 className="font-bold text-base">
            {language === 'am' ? 'አዎንታዊ ማበረታቻ፦' : 'Empowering Mindset:'}
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-medium">
            {language === 'am'
              ? '“ዛሬ ያደረጉት ትንሽ እንቅስቃሴ ከምንም ይሻላል! ራስዎን ሳያስጨንቁ በየቀኑ በጥቂቱ መጓዝ ወደ ተሻለ ጤና ይመራል።”'
              : '“The movement you completed today is infinitely better than staying still. Celebrate your momentum without guilt.”'}
          </p>
        </div>
      </div>

      {/* Log Activity Form */}
      <form onSubmit={handleLogActivity} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card space-y-6">
        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <Plus className="w-4 h-4 text-emerald-600" />
          <span>{language === 'am' ? 'አዲስ እንቅስቃሴ መዝግብ' : 'Log New Activity'}</span>
        </h3>

        {/* Activity Type Selection */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2">
            {language === 'am' ? 'የእንቅስቃሴው ዓይነት' : 'Activity Type'}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {activityTypesConfig.map((item) => {
              const Icon = item.icon;
              const isSelected = activityType === item.type;
              return (
                <button
                  key={item.type}
                  type="button"
                  onClick={() => setActivityType(item.type as any)}
                  className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                  <span className="text-xs font-bold">
                    {language === 'am' ? item.labelAm.split('(')[0] : item.labelEn}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Duration Slider / Number */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-center">
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-slate-700">
                {language === 'am' ? 'የቆይታ ጊዜ (ደቂቃ)' : 'Duration (Minutes)'}
              </label>
              <span className="text-sm font-extrabold text-emerald-700">{durationMinutes} min</span>
            </div>
            <input
              type="range"
              min="5"
              max="120"
              step="5"
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200/80 text-center">
            <span className="text-[10px] font-bold uppercase text-amber-800 tracking-wider block">
              {language === 'am' ? 'የተቃጠለ ግምታዊ ካሎሪ' : 'Estimated Calories Burned'}
            </span>
            <span className="text-2xl font-black text-amber-900 font-mono mt-0.5 block">
              ~{estimatedCaloriesBurned} kcal
            </span>
          </div>
        </div>

        {/* Optional Notes */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            {language === 'am' ? 'ማስታወሻ (አማራጭ)' : 'Optional Note'}
          </label>
          <input
            type="text"
            value={customNotes}
            onChange={(e) => setCustomNotes(e.target.value)}
            placeholder={language === 'am' ? 'ምሳሌ፦ ጠዋት በንጹህ አየር የተደረገ ፈጣን የእግር ጉዞ' : 'e.g. Morning fresh air brisk walk'}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium"
          />
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition hover:scale-[1.02] active:scale-95 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>{language === 'am' ? 'እንቅስቃሴውን መዝግብ' : 'Log Activity'}</span>
          </button>
        </div>
      </form>

      {/* Activity Logs History */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span>{language === 'am' ? 'የቅርብ ጊዜ የእንቅስቃሴ ታሪክ' : 'Recent Activity Logs'}</span>
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            {totalMinutesAllTime} min • ~{totalCaloriesAllTime} kcal total
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {activityLogs.map((log) => (
            <div key={log.id} className="py-3.5 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{log.typeNameAmharic}</h4>
                  <div className="text-slate-500 text-[11px] flex items-center gap-2 mt-0.5">
                    <span>{log.date}</span>
                    {log.notes && <span>• {log.notes}</span>}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="font-extrabold text-slate-800 text-sm block">
                  {log.durationMinutes} min
                </span>
                {log.caloriesBurned && (
                  <span className="text-[11px] font-bold text-amber-600 font-mono">
                    ~{log.caloriesBurned} kcal
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
