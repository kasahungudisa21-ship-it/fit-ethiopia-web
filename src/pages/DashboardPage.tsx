import React from 'react';
import { useApp } from '../context/AppContext';
import { calculateBMI } from '../utils/fitnessCalculations';
import { 
  TrendingDown, 
  Flame, 
  Droplet, 
  Dumbbell, 
  Utensils, 
  Calendar, 
  ArrowUpRight, 
  Plus, 
  Award, 
  CheckCircle2, 
  Smile, 
  Zap,
  Target
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { 
    language, 
    user, 
    mealRecords, 
    todayWaterMl, 
    dailyWaterTargetMl, 
    activityLogs, 
    weeklyWorkoutsCompleted, 
    habits, 
    setActiveTab, 
    addWaterMl 
  } = useApp();

  const bmiData = calculateBMI(
    user.height, 
    user.weight, 
    user.startingWeight, 
    user.targetWeight, 
    user.goal
  );

  const weightLost = Math.round((user.startingWeight - user.weight) * 10) / 10;
  const remainingWeight = Math.round((user.weight - user.targetWeight) * 10) / 10;

  // Calculate today's totals from meal records
  const todayMeals = mealRecords; // recent logs
  const todayCalories = todayMeals.reduce((acc, m) => acc + m.calories, 0);
  const todayProtein = Math.round(todayMeals.reduce((acc, m) => acc + m.protein, 0));
  const todayCarbs = Math.round(todayMeals.reduce((acc, m) => acc + m.carbs, 0));
  const todayFat = Math.round(todayMeals.reduce((acc, m) => acc + m.fat, 0));
  const todayFiber = Math.round(todayMeals.reduce((acc, m) => acc + m.fiber, 0));

  const waterPercent = Math.min(100, Math.round((todayWaterMl / dailyWaterTargetMl) * 100));

  // Habit completion today
  const todayDate = new Date().toISOString().split('T')[0];
  const completedHabitsToday = habits.filter(h => h.completedDates.includes(todayDate)).length;
  const habitPercent = Math.round((completedHabitsToday / habits.length) * 100);

  return (
    <div className="space-y-8 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md mb-1.5">
            <Target className="w-3.5 h-3.5" />
            <span>{language === 'am' ? 'የግል ዳሽቦርድ' : 'Personal Health Dashboard'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {language === 'am' ? `እንኳን ደህና መጡ፣ ${user.name}!` : `Welcome back, ${user.name}!`}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {language === 'am'
              ? 'የዕለት ተዕለት እድገትዎን፣ የተመገቡትን ምግብ እና የውሃ መጠንዎን እዚህ ይከታተሉ።'
              : 'Monitor your weight trend, logged nutrition, daily activity, and hydration.'}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setActiveTab('food-diary')}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{language === 'am' ? 'ምግብ መዝግብ' : 'Log Food'}</span>
          </button>
          <button
            onClick={() => setActiveTab('workouts')}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
          >
            <Dumbbell className="w-3.5 h-3.5" />
            <span>{language === 'am' ? 'የዛሬ ልምምድ' : 'Today\'s Workout'}</span>
          </button>
        </div>
      </div>

      {/* Main Weight Progress Showcase Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-700/60">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              {language === 'am' ? 'የእኔ እድገት (My Progress)' : 'My Weight Journey'}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
              {weightLost > 0 ? (
                <span>
                  {language === 'am'
                    ? `እስካሁን ${weightLost} ኪሎ ቀንሰዋል! ድንቅ ጅምር ነው!`
                    : `You have lost ${weightLost} kg so far! Great job!`}
                </span>
              ) : (
                <span>{language === 'am' ? 'የክብደት ጉዞዎ በመሻሻል ላይ ነው' : 'Your fitness journey is on track'}</span>
              )}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              {language === 'am' ? bmiData.categoryAmharic : bmiData.categoryEnglish}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700">
              BMI: {bmiData.bmi}
            </span>
          </div>
        </div>

        {/* 3 Weight Stat Pillars */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 text-center">
          <div className="bg-slate-800/80 p-3 sm:p-4 rounded-2xl border border-slate-700/60">
            <span className="text-[10px] sm:text-xs text-slate-400 font-semibold block">
              {language === 'am' ? 'የመነሻ ክብደት' : 'Starting Weight'}
            </span>
            <span className="text-lg sm:text-3xl font-black text-slate-200 mt-1 block">
              {user.startingWeight} <span className="text-xs font-normal">kg</span>
            </span>
          </div>

          <div className="bg-emerald-950/80 p-3 sm:p-4 rounded-2xl border border-emerald-500/40 shadow-inner">
            <span className="text-[10px] sm:text-xs text-emerald-300 font-bold block">
              {language === 'am' ? 'የአሁኑ ክብደት' : 'Current Weight'}
            </span>
            <span className="text-xl sm:text-4xl font-black text-emerald-400 mt-1 block">
              {user.weight} <span className="text-xs font-normal">kg</span>
            </span>
          </div>

          <div className="bg-slate-800/80 p-3 sm:p-4 rounded-2xl border border-slate-700/60">
            <span className="text-[10px] sm:text-xs text-slate-400 font-semibold block">
              {language === 'am' ? 'የታለመው ክብደት' : 'Target Weight'}
            </span>
            <span className="text-lg sm:text-3xl font-black text-amber-300 mt-1 block">
              {user.targetWeight} <span className="text-xs font-normal">kg</span>
            </span>
          </div>
        </div>

        {/* Progress Bar Display */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs sm:text-sm font-bold">
            <span className="text-slate-300">
              {language === 'am' ? 'የግብ ስኬት መቶኛ (Progress)' : 'Progress towards goal'}
            </span>
            <span className="text-emerald-400 font-mono text-base">{bmiData.progressPercent}%</span>
          </div>

          <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 rounded-full transition-all duration-1000 relative shadow-sm"
              style={{ width: `${Math.max(5, bmiData.progressPercent)}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
            </div>
          </div>

          <div className="flex justify-between text-[11px] text-slate-400 font-medium pt-1">
            <span>
              {language === 'am' ? `የተቀነሰ፦ ${weightLost} kg` : `Lost: ${weightLost} kg`}
            </span>
            <span>
              {language === 'am' ? `የቀረ፦ ${remainingWeight} kg` : `Remaining: ${remainingWeight} kg`}
            </span>
          </div>
        </div>

        {/* Visual Progress Blocks representation */}
        <div className="p-3 bg-slate-950/60 rounded-xl font-mono text-xs text-emerald-300 flex items-center justify-between">
          <span className="text-slate-400">{language === 'am' ? 'የእድገት አሞሌ፦' : 'Progress Bar:'}</span>
          <span className="tracking-widest font-bold text-sm">
            {'█'.repeat(Math.round(bmiData.progressPercent / 10))}
            {'░'.repeat(10 - Math.round(bmiData.progressPercent / 10))} {bmiData.progressPercent}%
          </span>
        </div>
      </div>

      {/* 4 Core Trackers Quick Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Weekly Activity Tracker */}
        <div 
          onClick={() => setActiveTab('workouts')}
          className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-500 cursor-pointer transition shadow-xs space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Dumbbell className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
              {weeklyWorkoutsCompleted}/4 {language === 'am' ? 'ቀናት' : 'days'}
            </span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800">
              {language === 'am' ? 'የሳምንቱ እንቅስቃሴ' : 'Weekly Activity'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {weeklyWorkoutsCompleted >= 4
                ? (language === 'am' ? 'ይህ ሳምንት 4/4 የእንቅስቃሴ ቀናት ተጠናቋል!' : 'All 4 workout days completed this week!')
                : (language === 'am' ? `${4 - weeklyWorkoutsCompleted} ልምምዶች ቀርተዋል` : `${4 - weeklyWorkoutsCompleted} workouts remaining`)}
            </p>
          </div>
          <div className="flex gap-1.5 pt-1">
            {[1, 2, 3, 4].map((day) => (
              <div
                key={day}
                className={`h-2 flex-1 rounded-full ${
                  day <= weeklyWorkoutsCompleted ? 'bg-emerald-500' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* 2. Water Tracker */}
        <div 
          onClick={() => setActiveTab('water-tracker')}
          className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-500 cursor-pointer transition shadow-xs space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Droplet className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
              {waterPercent}%
            </span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800">
              {language === 'am' ? 'የዕለት የውሃ መጠጫ' : 'Daily Water Goal'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {(todayWaterMl / 1000).toFixed(1)} L / {(dailyWaterTargetMl / 1000).toFixed(1)} L
            </p>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${waterPercent}%` }}
            />
          </div>
        </div>

        {/* 3. Calories & Nutrition Summary */}
        <div 
          onClick={() => setActiveTab('food-diary')}
          className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-amber-500 cursor-pointer transition shadow-xs space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Flame className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-700">
              {todayCalories} kcal
            </span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800">
              {language === 'am' ? 'የተመገቡት ካሎሪ' : 'Daily Calories'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === 'am' ? `ከታለመው ${user.dailyCalorieTarget || 1950} kcal` : `Target: ${user.dailyCalorieTarget || 1950} kcal`}
            </p>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full"
              style={{ width: `${Math.min(100, Math.round((todayCalories / (user.dailyCalorieTarget || 1950)) * 100))}%` }}
            />
          </div>
        </div>

        {/* 4. Healthy Habits */}
        <div 
          onClick={() => setActiveTab('habits')}
          className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-purple-500 cursor-pointer transition shadow-xs space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-700">
              {completedHabitsToday}/{habits.length}
            </span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800">
              {language === 'am' ? 'የዕለት ልማዶች' : 'Daily Habits'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === 'am' ? `${habitPercent}% ተጠናቋል` : `${habitPercent}% completed`}
            </p>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-purple-500 h-full rounded-full"
              style={{ width: `${habitPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Two Column Layout: Today's Nutrients & Recent Food Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Nutrients Breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Utensils className="w-4 h-4 text-emerald-600" />
              <span>{language === 'am' ? 'የዕለት ንጥረ-ነገሮች ድምር' : 'Today\'s Macro Breakdown'}</span>
            </h3>
            <span className="text-xs text-slate-600">
              {todayMeals.length} {language === 'am' ? 'ምግቦች ተመዝግበዋል' : 'meals logged'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-600 block">
                {language === 'am' ? 'ፕሮቲን' : 'Protein'}
              </span>
              <span className="text-xl font-extrabold text-emerald-700 mt-1 block">{todayProtein}g</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-600 block">
                {language === 'am' ? 'ካርቦሃይድሬት' : 'Carbs'}
              </span>
              <span className="text-xl font-extrabold text-blue-700 mt-1 block">{todayCarbs}g</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-600 block">
                {language === 'am' ? 'ቅባት' : 'Fat'}
              </span>
              <span className="text-xl font-extrabold text-amber-700 mt-1 block">{todayFat}g</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-600 block">
                {language === 'am' ? 'ፋይበር' : 'Fiber'}
              </span>
              <span className="text-xl font-extrabold text-teal-700 mt-1 block">{todayFiber}g</span>
            </div>
          </div>

          <div className="p-3.5 bg-emerald-50/70 border border-emerald-200/70 rounded-xl text-xs text-emerald-900 leading-relaxed">
            <span className="font-bold mr-1">💡 {language === 'am' ? 'የአመጋገብ ግምገማ፦' : 'Nutritional Note:'}</span>
            {language === 'am'
              ? 'የዛሬው ምግብዎ ጥሩ የፋይበር እና የፕሮቲን መጠን ይዟል። ተጨማሪ ንጹህ ውሃ በመጠጣት የምግብ መፈጨትን ማገዝ ይችላሉ።'
              : 'Your meals today provide excellent prebiotic fiber and steady protein. Continue drinking water throughout the afternoon.'}
          </div>
        </div>

        {/* Quick Water Tracker Widget */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Droplet className="w-4 h-4 text-blue-600" />
              <span>{language === 'am' ? 'ፈጣን የውሃ መጨመሪያ' : 'Quick Water Logger'}</span>
            </h3>
            <span className="text-xs font-bold text-blue-700">
              {(todayWaterMl / 1000).toFixed(1)} L / {(dailyWaterTargetMl / 1000).toFixed(1)} L
            </span>
          </div>

          <p className="text-xs text-slate-500">
            {language === 'am'
              ? 'በየቀኑ የሚጠጡትን ውሃ በአንድ ጠቅታ ይመዝገቡ። በቂ ውሃ መጠጣት ሜታቦሊዝምን ያነቃቃል!'
              : 'Add water intake with single tap. Adequate hydration optimizes metabolism and digestive efficiency.'}
          </p>

          <div className="grid grid-cols-3 gap-2.5">
            <button
              onClick={() => addWaterMl(250)}
              className="p-3 rounded-xl border border-blue-200 hover:border-blue-400 bg-blue-50/60 hover:bg-blue-100 text-blue-900 font-bold text-xs flex flex-col items-center gap-1 transition"
            >
              <Droplet className="w-4 h-4 text-blue-600" />
              <span>+250 ml</span>
              <span className="text-[10px] text-blue-600 font-normal">
                {language === 'am' ? '1 ብርጭቆ' : '1 Cup'}
              </span>
            </button>

            <button
              onClick={() => addWaterMl(500)}
              className="p-3 rounded-xl border border-blue-200 hover:border-blue-400 bg-blue-50/60 hover:bg-blue-100 text-blue-900 font-bold text-xs flex flex-col items-center gap-1 transition"
            >
              <Droplet className="w-4 h-4 text-blue-600" />
              <span>+500 ml</span>
              <span className="text-[10px] text-blue-600 font-normal">
                {language === 'am' ? '1 ሃይላንድ' : '1 Bottle'}
              </span>
            </button>

            <button
              onClick={() => addWaterMl(1000)}
              className="p-3 rounded-xl border border-blue-200 hover:border-blue-400 bg-blue-50/60 hover:bg-blue-100 text-blue-900 font-bold text-xs flex flex-col items-center gap-1 transition"
            >
              <Droplet className="w-4 h-4 text-blue-600" />
              <span>+1000 ml</span>
              <span className="text-[10px] text-blue-600 font-normal">
                {language === 'am' ? '1 ሊትር' : '1 Liter'}
              </span>
            </button>
          </div>

          <div className="pt-2 flex justify-between items-center text-xs">
            <button
              onClick={() => setActiveTab('water-tracker')}
              className="text-blue-700 hover:underline font-bold"
            >
              {language === 'am' ? 'ሙሉ የውሃ ገጽ ክፈት →' : 'View Full Water Page →'}
            </button>
            <button
              onClick={() => addWaterMl(-250)}
              className="text-slate-600 hover:text-rose-600 transition"
              title="Undo last cup"
            >
              {language === 'am' ? 'ቀንስ (-250ml)' : 'Undo (-250ml)'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
