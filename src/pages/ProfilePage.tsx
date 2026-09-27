import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { calculateBMI } from '../utils/fitnessCalculations';
import { 
  User, 
  Target, 
  Scale, 
  Activity, 
  Flame, 
  ShieldAlert, 
  Save, 
  RotateCcw,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { ActivityLevel, FitnessExperience, GoalType, WorkoutEnvironment } from '../types';

export const ProfilePage: React.FC = () => {
  const { language, user, updateUser, resetUserToDefault } = useApp();

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    age: user.age,
    sex: user.sex,
    height: user.height,
    weight: user.weight,
    startingWeight: user.startingWeight,
    targetWeight: user.targetWeight,
    activityLevel: user.activityLevel,
    fitnessExperience: user.fitnessExperience,
    goal: user.goal,
    preferredEnvironment: user.preferredEnvironment,
    dailyWaterTargetLiters: user.dailyWaterTargetLiters || 2.0
  });

  const bmiData = calculateBMI(
    formData.height,
    formData.weight,
    formData.startingWeight,
    formData.targetWeight,
    formData.goal
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(formData);
  };

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md mb-2">
            <User className="w-3.5 h-3.5" />
            <span>{language === 'am' ? 'የተጠቃሚ መገለጫ እና ምዝገባ' : 'User Registration & Profile'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {language === 'am' ? 'የግል መረጃዎ እና የጤና ግቦችዎ' : 'Your Health Profile & Goals'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {language === 'am'
              ? 'መረጃዎን በማስገባት የተበጁ የካሎሪ፣ የልምምድ እና የክብደት ምክሮችን ያግኙ።'
              : 'Enter your biometric details to generate tailored workout and caloric guidance.'}
          </p>
        </div>

        <button
          type="button"
          onClick={resetUserToDefault}
          className="self-start sm:self-center px-3.5 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold flex items-center gap-1.5 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{language === 'am' ? 'ወደ መደበኛ መልስ' : 'Reset Sample User'}</span>
        </button>
      </div>

      {/* Dynamic BMI & Healthy Weight Screening Card (Prominent & Real-time) */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-700/60">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              {language === 'am' ? 'የክብደት ሁኔታ ግምገማ (BMI Screening)' : 'Biometric Screening'}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
              {language === 'am' ? 'የእርስዎ BMI እና ጤናማ ክብደት ክልል' : 'Your BMI & Healthy Weight Range'}
            </h2>
          </div>
          <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            {language === 'am' ? bmiData.categoryAmharic : bmiData.categoryEnglish}
          </div>
        </div>

        {/* 4 Diagnostic Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
            <span className="text-[11px] text-slate-400 font-semibold block">BMI (Body Mass Index)</span>
            <span className="text-3xl font-black text-white mt-1 block">{bmiData.bmi}</span>
            <span className="text-[10px] text-slate-400 block mt-1">
              {language === 'am' ? 'መደበኛ፦ 18.5 - 24.9' : 'Normal: 18.5 - 24.9'}
            </span>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
            <span className="text-[11px] text-slate-400 font-semibold block">
              {language === 'am' ? 'ተስማሚ ጤናማ ክብደት' : 'Healthy Weight Range'}
            </span>
            <span className="text-xl sm:text-2xl font-black text-emerald-400 mt-1 block">
              {bmiData.healthyWeightMinKg} - {bmiData.healthyWeightMaxKg} <span className="text-xs">kg</span>
            </span>
            <span className="text-[10px] text-slate-400 block mt-1">
              {language === 'am' ? 'ለቁመትዎ የሚመከር' : 'For your height'}
            </span>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
            <span className="text-[11px] text-slate-400 font-semibold block">
              {language === 'am' ? 'ከግብ የሚለየው ክብደት' : 'Difference from Target'}
            </span>
            <span className="text-2xl sm:text-3xl font-black text-amber-300 mt-1 block">
              {bmiData.weightDifferenceKg} <span className="text-xs">kg</span>
            </span>
            <span className="text-[10px] text-slate-400 block mt-1">
              {language === 'am' ? 'ወደ ዒላማው ለመድረስ' : 'To reach target'}
            </span>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
            <span className="text-[11px] text-slate-400 font-semibold block">
              {language === 'am' ? 'የእድገት መቶኛ' : 'Progress Percentage'}
            </span>
            <span className="text-2xl sm:text-3xl font-black text-teal-300 mt-1 block font-mono">
              {bmiData.progressPercent}%
            </span>
            <span className="text-[10px] text-slate-400 block mt-1">
              {language === 'am' ? 'የተሸፈነ ርቀት' : 'Milestone achieved'}
            </span>
          </div>
        </div>

        {/* Screening Disclaimer */}
        <div className="p-3.5 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-start gap-2.5 text-xs text-amber-200">
          <ShieldAlert className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {language === 'am' ? bmiData.disclaimerAmharic : bmiData.disclaimerEnglish}
          </p>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card space-y-6">
        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
          {language === 'am' ? 'የመገለጫ ዝርዝሮች' : 'Personal Details'}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {language === 'am' ? 'ሙሉ ስም' : 'Full Name'}
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-medium transition"
              placeholder="ዮናስ ታደሰ"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {language === 'am' ? 'ኢሜይል' : 'Email Address'}
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-medium transition"
              placeholder="yonas@example.com"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {language === 'am' ? 'ዕድሜ (ዓመት)' : 'Age (Years)'}
            </label>
            <input
              type="number"
              min="14"
              max="99"
              required
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-medium transition"
            />
          </div>

          {/* Sex */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {language === 'am' ? 'ጾታ' : 'Sex'}
            </label>
            <select
              value={formData.sex}
              onChange={(e) => setFormData({ ...formData, sex: e.target.value as 'male' | 'female' })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-medium transition bg-white"
            >
              <option value="male">{language === 'am' ? 'ወንድ (Male)' : 'Male'}</option>
              <option value="female">{language === 'am' ? 'ሴት (Female)' : 'Female'}</option>
            </select>
          </div>

          {/* Height */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {language === 'am' ? 'ቁመት (ሴንቲሜትር - cm)' : 'Height (cm)'}
            </label>
            <input
              type="number"
              min="120"
              max="220"
              required
              value={formData.height}
              onChange={(e) => setFormData({ ...formData, height: Number(e.target.value) })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-medium transition"
            />
          </div>

          {/* Current Weight */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {language === 'am' ? 'የአሁኑ ክብደት (ኪሎ ግራም - kg)' : 'Current Weight (kg)'}
            </label>
            <input
              type="number"
              step="0.1"
              min="30"
              max="250"
              required
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-medium transition"
            />
          </div>

          {/* Starting Weight */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {language === 'am' ? 'የመነሻ ክብደት (ኪሎ ግራም - Starting kg)' : 'Starting Weight (kg)'}
            </label>
            <input
              type="number"
              step="0.1"
              min="30"
              max="250"
              required
              value={formData.startingWeight}
              onChange={(e) => setFormData({ ...formData, startingWeight: Number(e.target.value) })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-medium transition"
            />
          </div>

          {/* Target Weight */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {language === 'am' ? 'የታለመው ክብደት (ኪሎ ግራም - Target kg)' : 'Target Weight (kg)'}
            </label>
            <input
              type="number"
              step="0.1"
              min="30"
              max="250"
              required
              value={formData.targetWeight}
              onChange={(e) => setFormData({ ...formData, targetWeight: Number(e.target.value) })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-medium transition"
            />
          </div>
        </div>

        {/* Goals & Preferences */}
        <h3 className="text-lg font-bold text-slate-900 border-t border-slate-100 pt-6 pb-2">
          {language === 'am' ? 'ግቦች እና የእንቅስቃሴ ደረጃ' : 'Fitness Goals & Experience'}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Goal selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {language === 'am' ? 'ዋና የጤና ግብ (Fitness Goal)' : 'Primary Goal'}
            </label>
            <select
              value={formData.goal}
              onChange={(e) => setFormData({ ...formData, goal: e.target.value as GoalType })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-medium transition bg-white"
            >
              <option value="weight_loss">{language === 'am' ? 'ክብደት መቀነስ (Weight loss)' : 'Weight loss'}</option>
              <option value="general_fitness">{language === 'am' ? 'አጠቃላይ ብቃት (General fitness)' : 'General fitness'}</option>
              <option value="healthy_lifestyle">{language === 'am' ? 'ጤናማ የአኗኗር ዘይቤ (Healthy lifestyle)' : 'Healthy lifestyle'}</option>
              <option value="muscle_development">{language === 'am' ? 'የጡንቻ ግንባታ (Muscle development)' : 'Muscle development'}</option>
              <option value="weight_maintenance">{language === 'am' ? 'ክብደት መጠበቅ (Weight maintenance)' : 'Weight maintenance'}</option>
            </select>
          </div>

          {/* Activity Level */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {language === 'am' ? 'የአሁኑ እንቅስቃሴ ደረጃ (Activity Level)' : 'Activity Level'}
            </label>
            <select
              value={formData.activityLevel}
              onChange={(e) => setFormData({ ...formData, activityLevel: e.target.value as ActivityLevel })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-medium transition bg-white"
            >
              <option value="sedentary">{language === 'am' ? 'እንቅስቃሴ የሌለው / አነስተኛ (Sedentary)' : 'Sedentary'}</option>
              <option value="lightly_active">{language === 'am' ? 'መጠነኛ እንቅስቃሴ (በሳምንት 1-3 ቀን)' : 'Lightly active (1-3 days/wk)'}</option>
              <option value="moderately_active">{language === 'am' ? 'ንቁ እንቅስቃሴ (በሳምንት 3-5 ቀን)' : 'Moderately active (3-5 days/wk)'}</option>
              <option value="very_active">{language === 'am' ? 'በጣም ንቁ (በሳምንት 6-7 ቀን)' : 'Very active (6-7 days/wk)'}</option>
            </select>
          </div>

          {/* Fitness Experience */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {language === 'am' ? 'የስፖርት ልምድ (Fitness Experience)' : 'Fitness Experience'}
            </label>
            <select
              value={formData.fitnessExperience}
              onChange={(e) => setFormData({ ...formData, fitnessExperience: e.target.value as FitnessExperience })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-medium transition bg-white"
            >
              <option value="beginner">{language === 'am' ? 'ጀማሪ (Beginner)' : 'Beginner'}</option>
              <option value="intermediate">{language === 'am' ? 'መካከለኛ (Intermediate)' : 'Intermediate'}</option>
              <option value="advanced">{language === 'am' ? 'ከፍተኛ (Advanced)' : 'Advanced'}</option>
            </select>
          </div>

          {/* Workout Environment */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {language === 'am' ? 'ተመራጭ የስፖርት ቦታ' : 'Preferred Environment'}
            </label>
            <select
              value={formData.preferredEnvironment}
              onChange={(e) => setFormData({ ...formData, preferredEnvironment: e.target.value as WorkoutEnvironment })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-medium transition bg-white"
            >
              <option value="home">{language === 'am' ? 'ቤት ውስጥ (Home)' : 'Home'}</option>
              <option value="gym">{language === 'am' ? 'ጂም ውስጥ (Gym)' : 'Gym'}</option>
              <option value="no_equipment">{language === 'am' ? 'ያለ ምንም ዕቃ (No Equipment)' : 'No Equipment'}</option>
              <option value="limited_equipment">{language === 'am' ? 'በቀላል ዕቃዎች (Limited Equipment)' : 'Limited Equipment'}</option>
            </select>
          </div>
        </div>

        {/* Save button */}
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md shadow-emerald-600/30 flex items-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>{language === 'am' ? 'መረጃዬን አስቀምጥ' : 'Save Profile'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
