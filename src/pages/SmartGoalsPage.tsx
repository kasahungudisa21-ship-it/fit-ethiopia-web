import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Target, Plus, CheckCircle2, Clock, Calendar, Award, Sparkles } from 'lucide-react';

export const SmartGoalsPage: React.FC = () => {
  const { language, goals, addGoal, updateGoalProgress } = useApp();

  const [isCreating, setIsCreating] = useState(false);
  const [newTitleAm, setNewTitleAm] = useState('');
  const [newTitleEn, setNewTitleEn] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [targetValue, setTargetValue] = useState(4);
  const [unit, setUnit] = useState('ቀናት በሳምንት');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitleAm.trim()) return;

    addGoal({
      titleAmharic: newTitleAm,
      titleEnglish: newTitleEn || newTitleAm,
      startDate: new Date().toISOString().split('T')[0],
      targetDate: targetDate || new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      currentValue: 0,
      targetValue: Number(targetValue) || 1,
      unit: unit || 'ቀናት',
      completed: false
    });

    setNewTitleAm('');
    setNewTitleEn('');
    setIsCreating(false);
  };

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md mb-2">
            <Target className="w-3.5 h-3.5" />
            <span>{language === 'am' ? 'SMART ግቦች' : 'SMART Goals'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {language === 'am' ? 'የጤና እና አካል ብቃት ግቦችዎ' : 'Your SMART Health Goals'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {language === 'am'
              ? 'ግልጽ፣ የሚለካ እና ሊሳካ የሚችል ግብ በማስቀመጥ እድገትዎን በየቀኑ ያረጋግጡ።'
              : 'Set Specific, Measurable, Achievable, Relevant, and Time-bound fitness goals.'}
          </p>
        </div>

        <button
          onClick={() => setIsCreating(!isCreating)}
          className="self-start sm:self-center px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center gap-1.5 transition"
        >
          <Plus className="w-4 h-4" />
          <span>{language === 'am' ? 'አዲስ ግብ አውጣ' : 'Create New Goal'}</span>
        </button>
      </div>

      {/* Goal creation modal / form */}
      {isCreating && (
        <form onSubmit={handleCreate} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card space-y-4 animate-scaleUp">
          <h3 className="font-bold text-base text-slate-900 pb-2 border-b border-slate-100">
            {language === 'am' ? 'አዲስ SMART ግብ ማውጫ' : 'Set New SMART Goal'}
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {language === 'am' ? 'ግቤ፦ (የግብ መግለጫ በአማርኛ)' : 'Goal Title (Amharic):'}
              </label>
              <input
                type="text"
                required
                value={newTitleAm}
                onChange={(e) => setNewTitleAm(e.target.value)}
                placeholder="ምሳሌ፦ በሳምንት 4 ቀን ለ30 ደቂቃ እንቅስቃሴ ማድረግ።"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ዒላማ ዋጋ (Target Value)</label>
                <input
                  type="number"
                  required
                  value={targetValue}
                  onChange={(e) => setTargetValue(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">መለኪያ አሃድ (Unit)</label>
                <input
                  type="text"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  placeholder="ቀናት፣ ኪሎ፣ ሊትር..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ዒላማ ቀን (Target Date)</label>
                <input
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold"
            >
              ሰርዝ
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700"
            >
              አስቀምጥ
            </button>
          </div>
        </form>
      )}

      {/* Goals List */}
      <div className="space-y-4">
        {goals.map((goal) => {
          const progressPercent = Math.min(100, Math.round((goal.currentValue / goal.targetValue) * 100));
          return (
            <div
              key={goal.id}
              className={`p-6 rounded-3xl border transition-all ${
                goal.completed
                  ? 'bg-emerald-50/50 border-emerald-300'
                  : 'bg-white border-slate-200/80 shadow-xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {goal.completed ? 'ተጠናቋል ✓' : 'በሂደት ላይ'}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {goal.startDate} → {goal.targetDate}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    {language === 'am' ? goal.titleAmharic : goal.titleEnglish}
                  </h3>
                </div>

                <div className="text-right">
                  <span className="text-xl font-black text-emerald-700 font-mono">
                    {goal.currentValue} / {goal.targetValue}
                  </span>
                  <span className="text-[11px] text-slate-500 block font-medium">
                    {goal.unit}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2 pt-4">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-600">ስኬት (Progress)</span>
                  <span className="text-emerald-700 font-mono">{progressPercent}%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Quick Increment Control */}
              {!goal.completed && (
                <div className="pt-4 flex justify-end gap-2">
                  <button
                    onClick={() => updateGoalProgress(goal.id, goal.currentValue + 1)}
                    className="px-3 py-1.5 rounded-xl border border-emerald-200 text-emerald-700 hover:bg-emerald-50 text-xs font-bold transition flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+1 {goal.unit} ጨምር</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
