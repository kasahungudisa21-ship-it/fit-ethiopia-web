import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Droplet, Plus, Minus, RotateCcw, Sparkles, ShieldAlert, Award } from 'lucide-react';

export const WaterTrackerPage: React.FC = () => {
  const { 
    language, 
    todayWaterMl, 
    dailyWaterTargetMl, 
    addWaterMl, 
    setDailyWaterTargetMl 
  } = useApp();

  const [isEditingTarget, setIsEditingTarget] = useState(false);
  const [customTargetLiters, setCustomTargetLiters] = useState((dailyWaterTargetMl / 1000).toFixed(1));

  const consumedLiters = (todayWaterMl / 1000).toFixed(1);
  const targetLiters = (dailyWaterTargetMl / 1000).toFixed(1);
  const progressPercent = Math.min(100, Math.round((todayWaterMl / dailyWaterTargetMl) * 100));

  const handleUpdateTarget = (e: React.FormEvent) => {
    e.preventDefault();
    const ml = Math.round(parseFloat(customTargetLiters) * 1000);
    if (!isNaN(ml) && ml > 500 && ml <= 6000) {
      setDailyWaterTargetMl(ml);
      setIsEditingTarget(false);
    }
  };

  return (
    <div className="space-y-8 pb-16 max-w-3xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md mb-2">
            <Droplet className="w-3.5 h-3.5" />
            <span>{language === 'am' ? 'የውሃ መጠጫ ክትትል' : 'Hydration Tracker'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {language === 'am' ? 'የዕለት የውሃ መጠጫ ክትትል' : 'Daily Water Tracker'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {language === 'am'
              ? 'በቂ ውሃ መጠጣት ሜታቦሊዝምን ያነቃቃል፣ የረሃብ ስሜትን ያስተካክላል እና ቆዳን ያጠራል!'
              : 'Hydration supports digestive vitality, prevents false hunger, and enhances workout energy.'}
          </p>
        </div>

        <button
          onClick={() => setIsEditingTarget(!isEditingTarget)}
          className="self-start sm:self-center px-3.5 py-2 rounded-xl border border-blue-200 text-blue-700 hover:bg-blue-50 text-xs font-bold transition"
        >
          {language === 'am' ? 'ዒላማ ቀይር (Adjust Target)' : 'Adjust Target'}
        </button>
      </div>

      {/* Target Edit Form if opened */}
      {isEditingTarget && (
        <form onSubmit={handleUpdateTarget} className="bg-blue-50/70 p-5 rounded-2xl border border-blue-200 flex items-center gap-3">
          <label className="text-xs font-bold text-blue-900">
            {language === 'am' ? 'አዲስ የውሃ ግብ (በሊትር)፦' : 'New Target (Liters):'}
          </label>
          <input
            type="number"
            step="0.1"
            min="1.0"
            max="6.0"
            value={customTargetLiters}
            onChange={(e) => setCustomTargetLiters(e.target.value)}
            className="w-24 px-3 py-1.5 rounded-lg border border-blue-300 text-sm font-bold bg-white"
          />
          <button
            type="submit"
            className="px-4 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700"
          >
            {language === 'am' ? 'አስቀምጥ' : 'Save'}
          </button>
        </form>
      )}

      {/* Main Hydration Showcase Card (Requirement 8) */}
      <div className="bg-gradient-to-br from-blue-900 via-sky-850 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sky-800/60">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-300">
              {language === 'am' ? 'የዛሬ የውሃ መጠን' : 'Today\'s Intake'}
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl sm:text-5xl font-black font-mono text-white">
                {consumedLiters}
              </span>
              <span className="text-base sm:text-lg text-sky-200 font-semibold">
                / {targetLiters} L
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-3xl font-black text-sky-300 font-mono">
              {progressPercent}%
            </span>
            <span className="text-xs text-sky-200 block font-medium">
              {language === 'am' ? 'የተጠናቀቀ' : 'Completed'}
            </span>
          </div>
        </div>

        {/* Progress Display Bar (Exact prompt visual) */}
        <div className="space-y-2">
          <div className="w-full h-4 bg-sky-950/80 rounded-full overflow-hidden p-0.5 border border-sky-700/60">
            <div
              className="h-full bg-gradient-to-r from-sky-400 via-blue-400 to-teal-300 rounded-full transition-all duration-700 relative"
              style={{ width: `${progressPercent}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
            </div>
          </div>

          {/* ASCII Bar requested in prompt */}
          <div className="p-3 bg-slate-950/70 rounded-xl font-mono text-xs text-sky-300 flex items-center justify-between">
            <span className="text-slate-400">Progress:</span>
            <span className="tracking-widest font-bold text-sm">
              {'█'.repeat(Math.round(progressPercent / 10))}
              {'░'.repeat(10 - Math.round(progressPercent / 10))} {progressPercent}%
            </span>
          </div>
        </div>

        {/* Goal Achieved Celebration */}
        {todayWaterMl >= dailyWaterTargetMl && (
          <div className="p-3.5 bg-emerald-500/20 border border-emerald-400/40 rounded-xl flex items-center gap-2.5 text-xs text-emerald-200">
            <Award className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="font-bold">
              {language === 'am'
                ? '🎉 ድንቅ ነው! የዕለቱን የውሃ ግብ ሙሉ በሙሉ አሳክተዋል!'
                : '🎉 Excellent! You have fully achieved your hydration goal for today!'}
            </span>
          </div>
        )}
      </div>

      {/* Quick Add Buttons */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-card space-y-5">
        <h3 className="text-base font-bold text-slate-900">
          {language === 'am' ? 'ውሃ ለመጨመር ይጫኑ፦' : 'Quickly Log Water Intake:'}
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => addWaterMl(250)}
            className="p-4 rounded-2xl border border-blue-200 hover:border-blue-400 bg-blue-50/50 hover:bg-blue-100 text-blue-900 flex flex-col items-center gap-2 transition hover:scale-[1.02] active:scale-95 shadow-2xs"
          >
            <div className="w-10 h-10 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center font-bold">
              <Droplet className="w-5 h-5" />
            </div>
            <span className="text-base font-black">+250 ml</span>
            <span className="text-[11px] text-blue-600 font-medium">
              {language === 'am' ? '1 ብርጭቆ' : '1 Glass'}
            </span>
          </button>

          <button
            onClick={() => addWaterMl(500)}
            className="p-4 rounded-2xl border border-blue-200 hover:border-blue-400 bg-blue-50/50 hover:bg-blue-100 text-blue-900 flex flex-col items-center gap-2 transition hover:scale-[1.02] active:scale-95 shadow-2xs"
          >
            <div className="w-10 h-10 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center font-bold">
              <Droplet className="w-5 h-5" />
            </div>
            <span className="text-base font-black">+500 ml</span>
            <span className="text-[11px] text-blue-600 font-medium">
              {language === 'am' ? '1 መካከለኛ ሃይላንድ' : '1 Medium Bottle'}
            </span>
          </button>

          <button
            onClick={() => addWaterMl(750)}
            className="p-4 rounded-2xl border border-blue-200 hover:border-blue-400 bg-blue-50/50 hover:bg-blue-100 text-blue-900 flex flex-col items-center gap-2 transition hover:scale-[1.02] active:scale-95 shadow-2xs"
          >
            <div className="w-10 h-10 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center font-bold">
              <Droplet className="w-5 h-5" />
            </div>
            <span className="text-base font-black">+750 ml</span>
            <span className="text-[11px] text-blue-600 font-medium">
              {language === 'am' ? 'የስፖርት ጠርሙስ' : 'Gym Bottle'}
            </span>
          </button>

          <button
            onClick={() => addWaterMl(1000)}
            className="p-4 rounded-2xl border border-blue-200 hover:border-blue-400 bg-blue-50/50 hover:bg-blue-100 text-blue-900 flex flex-col items-center gap-2 transition hover:scale-[1.02] active:scale-95 shadow-2xs"
          >
            <div className="w-10 h-10 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center font-bold">
              <Droplet className="w-5 h-5" />
            </div>
            <span className="text-base font-black">+1.0 L</span>
            <span className="text-[11px] text-blue-600 font-medium">
              {language === 'am' ? 'ትልቅ ሃይላንድ' : 'Large 1L Bottle'}
            </span>
          </button>
        </div>

        {/* Undo Button */}
        <div className="pt-2 flex justify-between items-center text-xs">
          <span className="text-slate-500">
            {language === 'am' ? 'ስህተት ከተመዘገበ፦' : 'Accidental entry?'}
          </span>
          <button
            onClick={() => addWaterMl(-250)}
            className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-rose-600 hover:bg-rose-50 font-bold transition flex items-center gap-1"
          >
            <Minus className="w-3.5 h-3.5" />
            <span>{language === 'am' ? '1 ብርጭቆ ቀንስ (-250ml)' : 'Undo 1 Cup (-250ml)'}</span>
          </button>
        </div>
      </div>

      {/* Adjustable Target Disclaimer (Requirement 8) */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          {language === 'am'
            ? 'አስፈላጊ ማስታወሻ፦ አንድ ወጥ የሆነ የውሃ መጠን ለሁሉም ሰው በሕክምና አይታዘዝም። የሰውነት ክብደትዎ፣ የአየር ሁኔታ እና የእንቅስቃሴዎ መጠን የውሃ ፍላጎትዎን ሊለውጠው ይችላል። ዒላማዎን እንደ ፍላጎትዎ ማስተካከል ይችላሉ።'
            : 'Important Note: A single universal water intake target is not medically mandated for everyone. Body weight, climate temperature, and exertion level influence individual hydration needs.'}
        </p>
      </div>
    </div>
  );
};
