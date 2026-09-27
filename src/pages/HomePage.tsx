import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Dumbbell, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Droplet, 
  Flame, 
  Heart, 
  ShieldCheck, 
  Users, 
  Apple, 
  Calculator, 
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { calculateBMI } from '../utils/fitnessCalculations';

export const HomePage: React.FC = () => {
  const { language, setActiveTab, user, quotes, weeklyWorkoutsCompleted } = useApp();

  // Quick interactive BMI preview for guests
  const [quickHeight, setQuickHeight] = useState(user.height || 175);
  const [quickWeight, setQuickWeight] = useState(user.weight || 80);
  const quickBmiResult = calculateBMI(quickHeight, quickWeight, quickWeight, 70);

  const todaysQuote = quotes[0] || {
    quoteAmharic: 'ትንሽ እርምጃ በየቀኑ ትልቅ ለውጥ ያመጣል።',
    quoteEnglish: 'Small daily steps create massive transformations.'
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-950 text-white shadow-2xl p-6 sm:p-12 lg:p-16">
        {/* Subtle decorative glow circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>
              {language === 'am' ? 'ለኢትዮጵያውያን የተዘጋጀ የጤና እና የአካል ብቃት መመሪያ' : 'Tailored Health & Fitness for Ethiopians'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-none text-white drop-shadow-sm">
            {language === 'am' ? (
              <>
                የተሻለ አካል፣ <span className="text-emerald-300">የተሻለ ጤና፣</span> <br className="hidden sm:inline" />
                የተሻለ ሕይወት
              </>
            ) : (
              <>
                Better Body, <span className="text-emerald-300">Better Health,</span> <br className="hidden sm:inline" />
                Better Life
              </>
            )}
          </h1>

          <p className="text-base sm:text-xl text-emerald-100/90 leading-relaxed font-normal max-w-2xl">
            {language === 'am'
              ? '“በቀላል የእንቅስቃሴ ፕሮግራም፣ በተመጣጠነ አመጋገብ እና በየቀኑ ጤናማ ልምዶች ወደ ተሻለ ጤና ይጓዙ።”'
              : '“Embark on a healthier life journey through gentle activity plans, balanced Ethiopian nutrition, and sustainable daily habits.”'}
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
            <button
              onClick={() => setActiveTab('workouts')}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-black text-base shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <Dumbbell className="w-5 h-5 text-slate-950" />
              <span>{language === 'am' ? 'የእኔን ፕሮግራም ጀምር' : 'Start My Program'}</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>

            <button
              onClick={() => setActiveTab('food-analyzer')}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-base shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <Sparkles className="w-5 h-5 text-slate-950" />
              <span>{language === 'am' ? 'የምግብ ትንተና አድርግ' : 'Analyze Ethiopian Food'}</span>
            </button>
          </div>

          {/* Quick Trust Highlights */}
          <div className="pt-6 border-t border-emerald-700/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-emerald-100/80 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{language === 'am' ? 'የ4-ቀን ሳምንታዊ እቅድ' : '4-Day Weekly Plan'}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{language === 'am' ? 'የኢትዮጵያ ምግቦች ካሎሪ' : 'Ethiopian Food Data'}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{language === 'am' ? 'የአማርኛ AI ረዳት' : 'Amharic AI Assistant'}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{language === 'am' ? 'ያለ ጫና ጤናማ ልምድ' : 'No Shame / Sustainable'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Motivation Card */}
      <section className="bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-emerald-500/10 border border-amber-200/80 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20">
            <Heart className="w-6 h-6 fill-white" />
          </div>
          <div>
            <div className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">
              {language === 'am' ? 'የዕለቱ አዎንታዊ ማበረታቻ' : 'Daily Positive Affirmation'}
            </div>
            <blockquote className="text-lg sm:text-xl font-bold text-slate-800 leading-snug">
              “{language === 'am' ? todaysQuote.quoteAmharic : todaysQuote.quoteEnglish}”
            </blockquote>
            <p className="text-xs text-slate-500 mt-1">
              {language === 'am' ? 'ፍጥነት ሳይሆን በየቀኑ በትንሹ መቀጠል ትልቅ ለውጥ ያመጣል!' : 'Consistency over intensity transforms your life.'}
            </p>
          </div>
        </div>
        <button
          onClick={() => setActiveTab('dashboard')}
          className="shrink-0 px-4 py-2.5 rounded-xl bg-white border border-amber-300 text-amber-900 hover:bg-amber-50 text-xs sm:text-sm font-bold shadow-xs transition"
        >
          {language === 'am' ? 'የእኔን እድገት እይ →' : 'View My Progress →'}
        </button>
      </section>

      {/* Quick Interactive BMI Screener */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-card">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md mb-2">
              <Calculator className="w-3.5 h-3.5" />
              <span>{language === 'am' ? 'ቅጽበታዊ BMI መመርመሪያ' : 'Instant BMI Screener'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              {language === 'am' ? 'የሰውነት ክብደትዎን ሁኔታ በፍጥነት ይፈትሹ' : 'Quickly Check Your BMI Screening'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {language === 'am'
                ? 'BMI የጤና መመርመሪያ እንጂ የሕክምና ምርመራ አይደለም። ቁመትዎንና ክብደትዎን በማስገባት ደረጃዎን ይመልከቱ።'
                : 'BMI is an initial screening indicator, not a medical diagnosis. Adjust sliders to see where you stand.'}
            </p>
          </div>
          <button
            onClick={() => setActiveTab('profile')}
            className="self-start lg:self-auto px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold transition shadow-xs"
          >
            {language === 'am' ? 'ሙሉ መገለጫዬን አስተካክል' : 'Edit Full Profile'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 items-center">
          {/* Height Slider */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-slate-700">{language === 'am' ? 'ቁመት (Height)' : 'Height'}</span>
              <span className="text-base font-extrabold text-emerald-700">{quickHeight} cm</span>
            </div>
            <input
              type="range"
              min="130"
              max="210"
              value={quickHeight}
              onChange={(e) => setQuickHeight(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-600 mt-1">
              <span>130 cm</span>
              <span>210 cm</span>
            </div>
          </div>

          {/* Weight Slider */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-slate-700">{language === 'am' ? 'ክብደት (Weight)' : 'Weight'}</span>
              <span className="text-base font-extrabold text-emerald-700">{quickWeight} kg</span>
            </div>
            <input
              type="range"
              min="40"
              max="150"
              value={quickWeight}
              onChange={(e) => setQuickWeight(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-600 mt-1">
              <span>40 kg</span>
              <span>150 kg</span>
            </div>
          </div>

          {/* Result Card */}
          <div className={`p-4 rounded-xl border ${quickBmiResult.colorClass}`}>
            <div className="text-xs font-bold uppercase tracking-wider mb-1">
              {language === 'am' ? 'የእርስዎ BMI ግምት' : 'Estimated BMI'}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black">{quickBmiResult.bmi}</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/80 shadow-2xs">
                {language === 'am' ? quickBmiResult.categoryAmharic : quickBmiResult.categoryEnglish}
              </span>
            </div>
            <div className="text-[11px] mt-2 font-medium">
              {language === 'am' ? 'ተስማሚ ጤናማ ክብደት ክልል፦' : 'Healthy weight range:'}{' '}
              <strong className="font-bold">{quickBmiResult.healthyWeightMinKg} - {quickBmiResult.healthyWeightMaxKg} kg</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Main Core Features Grid */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            {language === 'am' ? 'የFit Ethiopia ዋና አገልግሎቶች' : 'Core Fit Ethiopia Services'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {language === 'am'
              ? 'ለኢትዮጵያ አኗኗርና ባሕል ተስማሚ ሆነው የተቀረጹ የጤና መሣሪያዎች'
              : 'Evidence-based wellness tools adapted to Ethiopian daily life'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Feature 1: 4-Day Fitness Plan */}
          <div 
            onClick={() => setActiveTab('workouts')}
            className="group cursor-pointer bg-white rounded-2xl p-6 border border-slate-200 hover:border-emerald-500 shadow-sm hover:shadow-card transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Dumbbell className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition">
                {language === 'am' ? 'የ4-ቀን ሳምንታዊ የእንቅስቃሴ ፕሮግራም' : '4-Day Weekly Workout Plan'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'am'
                  ? 'ለጀማሪዎች ተስማሚ የሆነ፣ ሙሉ ሰውነትን፣ ካርዲዮን እና ጥንካሬን ያካተተ በቤት ውስጥም ሆነ በጂም የሚሰራ ልምምድ።'
                  : 'Beginner-friendly structure covering Full Body, Cardio + Core, Lower Body, and Conditioning at home or gym.'}
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
              <span>{language === 'am' ? 'ልምምዶችን ይመልከቱ' : 'Explore Workouts'}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Feature 2: Amharic Food Analyzer */}
          <div 
            onClick={() => setActiveTab('food-analyzer')}
            className="group cursor-pointer bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-2xl p-6 border border-amber-200 hover:border-amber-400 shadow-sm hover:shadow-card transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-md shadow-amber-500/20">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="inline-block px-2 py-0.5 rounded bg-amber-200 text-amber-900 text-[10px] font-extrabold uppercase tracking-wider">
                {language === 'am' ? 'ቁልፍ ገጽታ' : 'Major Feature'}
              </div>
              <h3 className="text-lg font-bold text-amber-950 group-hover:text-amber-800 transition">
                {language === 'am' ? 'የምግብ ትንተና (Food Analyzer)' : 'Amharic Food Analyzer'}
              </h3>
              <p className="text-xs text-amber-900/80 leading-relaxed">
                {language === 'am'
                  ? 'የኢትዮጵያ ምግቦችን በአማርኛ ይፈልጉ፤ የካሎሪ፣ ፕሮቲን፣ ካርቦሃይድሬት እና ፋይበር ግምገማን በቅጽበት ያግኙ።'
                  : 'Analyze traditional Ethiopian dishes (Injera, Shiro, Misir, Doro, etc.) with estimated macros and supportive guidance.'}
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-amber-200/60 flex items-center justify-between text-xs font-bold text-amber-900">
              <span>{language === 'am' ? 'አሁን ይተንትኑ' : 'Analyze Now'}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Feature 3: Daily Food Diary */}
          <div 
            onClick={() => setActiveTab('food-diary')}
            className="group cursor-pointer bg-white rounded-2xl p-6 border border-slate-200 hover:border-emerald-500 shadow-sm hover:shadow-card transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Apple className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition">
                {language === 'am' ? 'የዕለት ምግብ ማስታወሻ (Food Diary)' : 'Daily Food Diary'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'am'
                  ? 'ቁርስ፣ ምሳ፣ እራትና መክሰስን በቀላሉ ይመዝገቡ፤ የዕለቱን ጠቅላላ ካሎሪና ንጥረ-ነገር በራስ-ሰር ያሰሉ።'
                  : 'Log breakfast, lunch, dinner, and snacks. Live aggregation of total daily calories, protein, and fibers.'}
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-700">
              <span>{language === 'am' ? 'ማስታወሻ ክፈት' : 'Open Diary'}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Feature 4: Water Tracker */}
          <div 
            onClick={() => setActiveTab('water-tracker')}
            className="group cursor-pointer bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-500 shadow-sm hover:shadow-card transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Droplet className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition">
                {language === 'am' ? 'የውሃ መጠጫ ክትትል (Water Tracker)' : 'Daily Water Tracker'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'am'
                  ? 'በቀላሉ በአንድ ጠቅታ ብርጭቆዎችን ይመዝገቡ፤ የዕለቱን የውሃ ግብ በምስል እና በመቶኛ ይከታተሉ።'
                  : 'Log cups and bottles with 1-click. Visual progress toward your personalized hydration target.'}
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-700">
              <span>{language === 'am' ? 'ውሃ መዝግብ' : 'Track Hydration'}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Feature 5: Healthy Habits Checklist */}
          <div 
            onClick={() => setActiveTab('habits')}
            className="group cursor-pointer bg-white rounded-2xl p-6 border border-slate-200 hover:border-emerald-500 shadow-sm hover:shadow-card transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-700 transition">
                {language === 'am' ? 'የ8 ዕለታዊ ልማዶች ማረጋገጫ' : 'Daily Habits Checklist'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'am'
                  ? '30 ደቂቃ እንቅስቃሴ፣ አትክልት፣ ውሃ፣ እንቅልፍ እና ሌሎች ጤናማ ልማዶችን በሳምንታዊ ሠንጠረዥ ይከታተሉ።'
                  : 'Track 8 foundational healthy habits across physical activity, sleep, hydration, and meal mindfulness.'}
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-700">
              <span>{language === 'am' ? 'ልማዶችን ፈትሽ' : 'Check Habits'}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Feature 6: Amharic AI Assistant */}
          <div 
            onClick={() => setActiveTab('ai-assistant')}
            className="group cursor-pointer bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200 hover:border-emerald-400 shadow-sm hover:shadow-card transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-md shadow-emerald-700/20">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-emerald-950 group-hover:text-emerald-800 transition">
                {language === 'am' ? 'የአማርኛ AI የአካል ብቃት ረዳት' : 'Amharic AI Fitness Coach'}
              </h3>
              <p className="text-xs text-emerald-900/80 leading-relaxed">
                {language === 'am'
                  ? '“ዛሬ ምን እብላ?”፣ “ሽሮ ስንት ካሎሪ አለው?” ወይም “በቤት ውስጥ 30 ደቂቃ ልምምድ ስጠኝ” ብለው በአማርኛ ይጠይቁ።'
                  : 'Interactive AI answering nutrition, workout alternatives, and healthy habit questions in native Amharic.'}
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-emerald-200/60 flex items-center justify-between text-xs font-bold text-emerald-800">
              <span>{language === 'am' ? 'AIን አነጋግር' : 'Chat with AI'}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* Sustainable Philosophy Banner */}
      <section className="bg-slate-900 rounded-3xl text-white p-8 sm:p-12 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
            <Award className="w-3.5 h-3.5" />
            <span>{language === 'am' ? 'የFit Ethiopia ጤና ፍልስፍና' : 'The Fit Ethiopia Mindset'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">
            {language === 'am' ? 'ምንም አይነት ጫና የሌለበት ዘላቂ የአኗኗር ለውጥ' : 'Compassionate, Sustainable Living'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {language === 'am'
              ? 'Fit Ethiopia የተገነባው ፍጹምነትን ሳይሆን ቀጣይነትን ለማበረታታት ነው። ራስን መውቀስ፣ እጅግ ከባድ የረሃብ አመጋገብ ወይም ከእውነታው የራቁ ቃል ኪዳኖች የሉም። በባህላችንና በምግባችን እየተደሰትን ወደ ተሻለ ጤና በጋራ እንጓዛለን።'
              : 'Fit Ethiopia is built on self-compassion and realistic consistency. No guilt, no extreme starvation diets, and no unrealistic body pressure. We celebrate Ethiopian food culture while cultivating vibrant health.'}
          </p>
        </div>
      </section>
    </div>
  );
};
