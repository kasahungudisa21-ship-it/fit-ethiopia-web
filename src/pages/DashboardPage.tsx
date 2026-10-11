import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Flame, 
  Droplets, 
  Dumbbell, 
  Target, 
  Sparkles, 
  BookOpen, 
  Moon, 
  Activity, 
  Apple, 
  Trophy, 
  CheckCircle2, 
  CreditCard,
  Play,
  RotateCcw,
  Check,
  ChevronRight,
  ShieldCheck,
  Zap
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { userProfile, waterLogs, mealLogs, workoutLogs } = useApp();

  // Active Tab View
  const [activeTab, setActiveTab] = useState<'overview' | 'science' | 'fasting' | 'pricing'>('overview');
  const [goalMode, setGoalMode] = useState<'muscle' | 'fat_loss'>('muscle');

  // Interactive Workout Timer State
  const [timerSeconds, setTimerSeconds] = useState(45);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Stats
  const totalWater = waterLogs.reduce((acc, log) => acc + log.amountMl, 0);
  const totalCaloriesConsumed = mealLogs.reduce((acc, m) => acc + m.calories, 0);

  // Targets based on Goal
  const calorieTarget = goalMode === 'muscle' ? 2450 : 1850;
  const proteinTarget = goalMode === 'muscle' ? 140 : 95;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* 1. TOP HERO BANNER */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-cyan-900 rounded-3xl p-6 md:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Fit Ethiopia • የጤና እና አካል ብቃት መመሪያ</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black mb-2">
          ሰላም {userProfile?.name || 'ጓደኛ'} 👋
        </h1>
        <p className="text-emerald-100 text-sm md:text-base max-w-2xl leading-relaxed">
          የአካል ብቃት፣ የጡንቻ ግንባታ፣ የተመጣጠነ ምግብ እና የስፖርት ሳይንስ መመሪያዎ።
        </p>

        {/* Goal Switcher (Muscle Gain vs Fat Loss) */}
        <div className="flex flex-wrap gap-3 mt-6 items-center">
          <span className="text-xs font-bold text-emerald-200">የአሁን ግብዎ፡</span>
          <button
            onClick={() => setGoalMode('muscle')}
            className={`px-4 py-2 rounded-xl font-bold text-xs md:text-sm transition-all flex items-center gap-2 ${
              goalMode === 'muscle'
                ? 'bg-amber-400 text-gray-900 shadow-lg scale-105'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <span>💪 የጡንቻ ግንባታ (Muscle Gain)</span>
          </button>
          <button
            onClick={() => setGoalMode('fat_loss')}
            className={`px-4 py-2 rounded-xl font-bold text-xs md:text-sm transition-all flex items-center gap-2 ${
              goalMode === 'fat_loss'
                ? 'bg-amber-400 text-gray-900 shadow-lg scale-105'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <span>⚖️ ስብ ማቃጠል (Fat Loss)</span>
          </button>
        </div>
      </div>

      {/* 2. NAVIGATION TABS */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-gray-200 dark:border-gray-700">
        {[
          { id: 'overview', label: '📊 ዋና ዳሽቦርድ (Overview)' },
          { id: 'science', label: '🧠 ስፖርት ሳይንስና አናቶሚ (Science)' },
          { id: 'fasting', label: '🌙 የጾም እና ረመዳን መመሪያ (Fasting)' },
          { id: 'pricing', label: '💳 የደንበኝነት ክፍያ (Telebirr / CBE)' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3. TAB CONTENT */}

      {/* TAB A: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Calories Card */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-gray-500 uppercase">ዕለታዊ ካሎሪ</span>
                <Flame className="w-5 h-5 text-amber-500" />
              </div>
              <div className="text-2xl font-black text-gray-900 dark:text-white">
                {totalCaloriesConsumed} <span className="text-xs text-gray-400 font-normal">/ {calorieTarget} kcal</span>
              </div>
              <p className="text-[11px] text-emerald-600 font-bold mt-2">
                {goalMode === 'muscle' ? '+350 kcal የጡንቻ ሰርፕለስ' : '-450 kcal የስብ ዴፊሲት'}
              </p>
            </div>

            {/* Protein Card */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-gray-500 uppercase">የፕሮቲን መጠን</span>
                <Activity className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="text-2xl font-black text-gray-900 dark:text-white">
                45g <span className="text-xs text-gray-400 font-normal">/ {proteinTarget}g</span>
              </div>
              <p className="text-[11px] text-gray-500 mt-2">እንቁላል፣ ስጋ፣ አተር፣ አጃ</p>
            </div>

            {/* Water Card */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-gray-500 uppercase">የውሃ ፍጆታ</span>
                <Droplets className="w-5 h-5 text-cyan-500" />
              </div>
              <div className="text-2xl font-black text-gray-900 dark:text-white">
                {(totalWater / 1000).toFixed(1)}L <span className="text-xs text-gray-400 font-normal">/ 2.8L</span>
              </div>
              <p className="text-[11px] text-cyan-600 font-bold mt-2">የጡንቻ ጥንካሬን ይጠብቃል</p>
            </div>

            {/* Workouts Card */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-gray-500 uppercase">የስፖርት ሁኔታ</span>
                <Trophy className="w-5 h-5 text-purple-500" />
              </div>
              <div className="text-2xl font-black text-gray-900 dark:text-white">
                {workoutLogs.length} <span className="text-xs text-gray-400 font-normal">ክፍለ-ጊዜዎች</span>
              </div>
              <p className="text-[11px] text-emerald-600 font-bold mt-2 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>በጥሩ ሂደት ላይ ነዎት!</span>
              </p>
            </div>
          </div>

          {/* Quick Workout Timer Section */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-6 md:p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full text-xs font-bold mb-2">
                <Zap className="w-3.5 h-3.5" />
                <span>የቀጥታ ስፖርት ሰዓት ቆጣሪ (Live Interval Timer)</span>
              </div>
              <h3 className="text-xl md:text-2xl font-black">
                የዛሬውን ፑሽ አፕ ወይም ፕላንክ አሁን ይጀምሩ!
              </h3>
              <p className="text-xs text-gray-400 mt-1 max-w-md">
                ለእያንዳንዱ ሴት 45 ሰከንድ በመስራትና 60 ሰከንድ በማረፍ ጡንቻዎን ያሳድጉ።
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-4xl font-black bg-gray-950 px-6 py-3 rounded-2xl border border-gray-700 text-emerald-400">
                00:{timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}
              </div>
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-gray-950 rounded-2xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{isTimerRunning ? 'አቁም' : 'ጀምር (Start)'}</span>
              </button>
            </div>
          </div>

          {/* Home vs Gym Workouts Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🏠</span>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">የቤት ውስጥ ስፖርት (Home Bodyweight)</h3>
                  <p className="text-xs text-gray-500">ያለ ምንም እቃ የሚሰሩ ልምምዶች</p>
                </div>
              </div>
              <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-300">
                <li className="p-2.5 bg-gray-50 dark:bg-gray-900 rounded-xl flex justify-between">
                  <span>• ፑሽ አፕ (Push-ups) - ለደረት እና ትከሻ</span>
                  <strong className="text-emerald-600">3 × 12 ድግግሞሽ</strong>
                </li>
                <li className="p-2.5 bg-gray-50 dark:bg-gray-900 rounded-xl flex justify-between">
                  <span>• ስኳት (Bodyweight Squats) - ለእግር እና ዳሌ</span>
                  <strong className="text-emerald-600">4 × 15 ድግግሞሽ</strong>
                </li>
                <li className="p-2.5 bg-gray-50 dark:bg-gray-900 rounded-xl flex justify-between">
                  <span>• ፕላንክ (Plank) - ለሆድ እና ወገብ ጥንካሬ</span>
                  <strong className="text-emerald-600">3 × 45 ሰከንድ</strong>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🏋️‍♂️</span>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">የጂም ስፖርት (Gym Weights)</h3>
                  <p className="text-xs text-gray-500">በክብደት የሚሰሩ የጡንቻ ማሳደጊያዎች</p>
                </div>
              </div>
              <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-300">
                <li className="p-2.5 bg-gray-50 dark:bg-gray-900 rounded-xl flex justify-between">
                  <span>• ቤንች ፕሬስ (Bench Press) - ለደረት</span>
                  <strong className="text-emerald-600">4 × 8-10</strong>
                </li>
                <li className="p-2.5 bg-gray-50 dark:bg-gray-900 rounded-xl flex justify-between">
                  <span>• ላት ፑልዳውን (Lat Pulldown) - ለጀርባ</span>
                  <strong className="text-emerald-600">4 × 10-12</strong>
                </li>
                <li className="p-2.5 bg-gray-50 dark:bg-gray-900 rounded-xl flex justify-between">
                  <span>• ባርቤል ስኳት (Barbell Squat) - ለእግር</span>
                  <strong className="text-emerald-600">4 × 8-10</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB B: SPORTS SCIENCE & ANATOMY */}
      {activeTab === 'science' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">
              የጡንቻ ህዋሳት እድገት (Hypertrophy Science)
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              ክብደት ስናነሳ በጡንቻ ሴሎች ላይ ጥቃቅን ስብራቶች (Micro-tears) ይፈጠራሉ። በእረፍት ሰዓት በምንመገበው ፕሮቲን አማካኝነት ሴሎቹ ተመልሰው ሲገነቡ ከበፊቱ በበለጠ ወፍረውና ጠንክረው ያድጋሉ።
            </p>
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl text-xs text-emerald-800 dark:text-emerald-300 border border-emerald-200">
              <strong>ቁልፍ መርህ፡</strong> ተከታታይ የጫና ጭማሪ (Progressive Overload) - በየሳምንቱ ድግግሞሽን ወይም ክብደትን ማሳደግ።
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">
              ዞን 2 ካርዲዮ እና ስብ ማቃጠል (Zone 2 Cardio)
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              ስብ ለማቃጠል በከፍተኛ ፍጥነት መሮጥ አያስፈልግም! እየተነጋገሩ መስራት በሚያስችል የልብ ምት ፍጥነት (ፈጣን እርምጃ ወይም ረጋ ያለ ብስክሌት) ለ30-45 ደቂቃ መስራት ሰውነት በቀጥታ የተከማቸ ስብን እንዲያቃጥል ያደርጋል።
            </p>
            <div className="p-4 bg-cyan-50 dark:bg-cyan-950/40 rounded-2xl text-xs text-cyan-800 dark:text-cyan-300 border border-cyan-200">
              <strong>ምክር፡</strong> በቀን ከ7,000 እስከ 10,000 እርምጃዎችን በእግር መጓዝ።
            </div>
          </div>
        </div>
      )}

      {/* TAB C: FASTING GUIDE */}
      {activeTab === 'fasting' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="text-xl font-black text-emerald-700 dark:text-emerald-400 mb-2">
              የኦርቶዶክስ አጽዋማት የአመጋገብ ስልት
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              በጾም ወቅት የእንስሳት ተዋጽኦ ስለማይበላ ፕሮቲን እንዳይቀንስ ጥራጥሬዎችን አዋህደው ይመገቡ።
            </p>
            <ul className="space-y-2 text-xs text-gray-700 dark:text-gray-300">
              <li className="p-2 bg-gray-50 dark:bg-gray-900 rounded-xl">🌱 <strong>አኩሪ አተር፡</strong> በ100 ግራም 36 ግራም ከፍተኛ ፕሮቲን</li>
              <li className="p-2 bg-gray-50 dark:bg-gray-900 rounded-xl">🍲 <strong>የተቀቀለ ሽምብራ፡</strong> በ100 ግራም 19 ግራም ፕሮቲን</li>
              <li className="p-2 bg-gray-50 dark:bg-gray-900 rounded-xl">🥣 <strong>ምስር ወጥ ከጤፍ እንጀራ ጋር፡</strong> የተሟላ አሚኖ አሲድ ይሰጣል</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="text-xl font-black text-cyan-700 dark:text-cyan-400 mb-2">
              የረመዳን ወቅት ስፖርት እና አመጋገብ
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              በሱሁር ሰዓት በፋይበር እና በፕሮቲን የበለጸጉ ምግቦች (አጃ፣ እንቁላል) መመገብ የውሃ ጥምን ይቀንሳል።
            </p>
            <div className="p-4 bg-amber-50 dark:bg-amber-950/40 rounded-2xl text-xs text-amber-800 dark:text-amber-300 border border-amber-200">
              <strong>የስፖርት ሰዓት፡</strong> ከኢፍጣር 1 ሰዓት በፊት ቀለል ያለ ካርዲዮ፤ ወይም ከኢፍጣር ምግብ ከ2 ሰዓት በኋላ የክብደት ስፖርት መስራት ይመረጣል።
            </div>
          </div>
        </div>
      )}

      {/* TAB D: PRICING (TELEBIRR / CBE) */}
      {activeTab === 'pricing' && (
        <div className="bg-white dark:bg-gray-800 p-6 md:p-10 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold">
              👑 የደንበኝነት ምዝገባ (Pricing)
            </span>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mt-2">
              የፕሮ አባልነት በቴሌብር እና በሲቢኢ ብር
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="p-6 rounded-3xl border-2 border-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/20">
              <h3 className="font-bold text-lg text-emerald-800 dark:text-emerald-300">ወርሃዊ ፕሮ (Monthly Pro)</h3>
              <div className="text-3xl font-black text-gray-900 dark:text-white my-2">299 ብር <span className="text-xs text-gray-400 font-normal">/በወር</span></div>
              <ul className="space-y-1.5 text-xs text-gray-600 dark:text-gray-300 mt-4">
                <li>✔️ ሁሉም የቤትና ጂም ስፖርቶች</li>
                <li>✔️ ያልተገደበ AI አሰልጣኝ</li>
                <li>✔️ የጾም እና ረመዳን እቅዶች</li>
              </ul>
            </div>

            <div className="p-6 rounded-3xl border-2 border-amber-400 bg-amber-50/30 dark:bg-amber-950/20">
              <span className="text-[10px] bg-amber-400 text-gray-900 font-black px-2 py-0.5 rounded-full uppercase">30% ቅናሽ</span>
              <h3 className="font-bold text-lg text-amber-800 dark:text-amber-300 mt-1">ዓመታዊ ቪአይፒ (Yearly VIP)</h3>
              <div className="text-3xl font-black text-gray-900 dark:text-white my-2">1,999 ብር <span className="text-xs text-gray-400 font-normal">/በዓመት</span></div>
              <ul className="space-y-1.5 text-xs text-gray-600 dark:text-gray-300 mt-4">
                <li>✔️ ሁሉንም የፕሮ ጥቅሞች</li>
                <li>✔️ የግል የአመጋገብ ማክሮ እቅድ</li>
                <li>✔️ የ24/7 የቪአይፒ ድጋፍ</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl flex items-center justify-between text-xs font-bold text-gray-700 dark:text-gray-300">
            <span>ክፍያ የሚፈጸምበት፡</span>
            <div className="flex gap-2">
              <span className="px-2.5 py-1 bg-blue-600 text-white rounded-lg">Telebirr</span>
              <span className="px-2.5 py-1 bg-purple-700 text-white rounded-lg">CBE Birr</span>
              <span className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg">Chapa</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};