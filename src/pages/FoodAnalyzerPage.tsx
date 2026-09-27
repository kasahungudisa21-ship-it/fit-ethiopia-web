import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FoodItem } from '../types';
import { 
  Sparkles, 
  Search, 
  Plus, 
  Utensils, 
  Scale, 
  ShieldAlert, 
  CheckCircle2, 
  Info, 
  HeartHandshake,
  Flame,
  ArrowRight
} from 'lucide-react';

export const FoodAnalyzerPage: React.FC = () => {
  const { language, foods, addMealRecord, showToast, setActiveTab } = useApp();

  const [selectedFoodId, setSelectedFoodId] = useState<string>('food-shiro');
  const [portionMultiplier, setPortionMultiplier] = useState<number>(1.0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mealTypeToLog, setMealTypeToLog] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('lunch');

  const selectedFood: FoodItem = foods.find(f => f.id === selectedFoodId) || foods[0];

  // Filtered foods for quick selector buttons or search
  const filteredFoods = foods.filter(f => 
    f.nameAmharic.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.nameEnglish.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Scaled nutrition values
  const scaledCalories = Math.round(selectedFood.calories * portionMultiplier);
  const scaledProtein = Math.round(selectedFood.protein * portionMultiplier * 10) / 10;
  const scaledCarbs = Math.round(selectedFood.carbohydrates * portionMultiplier * 10) / 10;
  const scaledFat = Math.round(selectedFood.fat * portionMultiplier * 10) / 10;
  const scaledFiber = Math.round(selectedFood.fiber * portionMultiplier * 10) / 10;
  const scaledSugar = selectedFood.sugar ? Math.round(selectedFood.sugar * portionMultiplier * 10) / 10 : undefined;
  const scaledSodium = selectedFood.sodium ? Math.round(selectedFood.sodium * portionMultiplier) : undefined;

  const handleAddToDiary = () => {
    addMealRecord({
      mealType: mealTypeToLog,
      foodId: selectedFood.id,
      foodName: language === 'am' ? selectedFood.nameAmharic : selectedFood.nameEnglish,
      amount: portionMultiplier,
      servingUnit: selectedFood.servingSize,
      calories: scaledCalories,
      protein: scaledProtein,
      carbs: scaledCarbs,
      fat: scaledFat,
      fiber: scaledFiber
    });
  };

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold tracking-wide backdrop-blur-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{language === 'am' ? 'ዋና የትንተና አገልግሎት' : 'Major Feature'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black">
          {language === 'am' ? 'የምግብ ትንተና (Food Analyzer)' : 'Amharic Food Analyzer'}
        </h1>
        <p className="text-xs sm:text-sm text-amber-100 max-w-2xl leading-relaxed">
          {language === 'am'
            ? 'የሚመገቡትን ምግብ በአማርኛ ይምረጡ ወይም ይፈልጉ፤ የካሎሪ፣ የፕሮቲን፣ የካርቦሃይድሬት እና የፋይበር ግምታዊ ትንተናን በቅጽበት ያግኙ።'
            : 'Select or search Ethiopian foods in Amharic to get instant macro estimates and practical dietary guidance.'}
        </p>
      </div>

      {/* Food Search & Quick Select */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'am' ? 'ምግብ በአማርኛ ይፈልጉ (ምሳሌ፦ ሽሮ፣ ምስር፣ እንጀራ፣ ዶሮ...)' : 'Search food (e.g. Shiro, Misir, Injera, Doro)...'}
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm font-medium transition"
          />
        </div>

        {/* Popular Ethiopian Food Pills */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-bold uppercase text-slate-600 tracking-wider">
            {language === 'am' ? 'በተደጋጋሚ የሚመረጡ የኢትዮጵያ ምግቦች፦' : 'Common Ethiopian Staples:'}
          </span>
          <div className="flex flex-wrap gap-2 pt-1 max-h-36 overflow-y-auto pr-1">
            {filteredFoods.map((food) => {
              const isSelected = food.id === selectedFoodId;
              return (
                <button
                  key={food.id}
                  onClick={() => {
                    setSelectedFoodId(food.id);
                    setSearchQuery('');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <span>{food.nameAmharic}</span>
                  <span className={`text-[10px] ${isSelected ? 'text-amber-100' : 'text-slate-600'}`}>
                    ({food.servingSize})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Portion Size Controller */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase text-emerald-700 tracking-wider block">
              {language === 'am' ? 'የተመረጠው ምግብ' : 'Selected Food'}
            </span>
            <h2 className="text-xl font-black text-slate-900 mt-0.5">
              {selectedFood.nameAmharic} <span className="text-sm font-normal text-slate-500">({selectedFood.nameEnglish})</span>
            </h2>
          </div>

          {/* Portion Multiplier Controls */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700">
              {language === 'am' ? 'መጠን (Portion):' : 'Portion:'}
            </span>
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              {[0.5, 1.0, 1.5, 2.0].map((multiplier) => (
                <button
                  key={multiplier}
                  onClick={() => setPortionMultiplier(multiplier)}
                  className={`px-3 py-1 rounded-lg text-xs font-extrabold transition ${
                    portionMultiplier === multiplier
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {multiplier === 0.5 ? '½' : multiplier === 1 ? '1' : multiplier === 1.5 ? '1½' : '2'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-500 flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
          <Scale className="w-4 h-4 text-emerald-600" />
          <span>
            {language === 'am' ? 'መሠረታዊ መጠን፦' : 'Standard Base Serving:'}{' '}
            <strong className="text-slate-800">{selectedFood.servingSize}</strong>
            {portionMultiplier !== 1 && ` × ${portionMultiplier} = የተሰላው መጠን`}
          </span>
        </div>
      </div>

      {/* Nutritional Analysis Results Card (Requirement 5) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700">
              {language === 'am' ? 'የንጥረ-ነገር ትንተና ውጤት' : 'Nutritional Breakdown'}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              {language === 'am' ? 'የምግቡ ግምገማ' : 'Estimated Nutritional Analysis'}
            </h3>
          </div>
          <div className="text-right">
            <span className="text-2xl sm:text-3xl font-black text-amber-600 font-mono">
              ~{scaledCalories}
            </span>
            <span className="text-xs font-bold text-slate-500 block">kcal (ካሎሪ)</span>
          </div>
        </div>

        {/* 4 Core Macros Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 text-center">
            <span className="text-xs font-bold text-emerald-800 uppercase block">
              {language === 'am' ? 'ፕሮቲን (Protein)' : 'Protein'}
            </span>
            <span className="text-2xl font-black text-emerald-900 mt-1 block">
              {scaledProtein} <span className="text-xs font-normal">g</span>
            </span>
          </div>

          <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-200 text-center">
            <span className="text-xs font-bold text-blue-800 uppercase block">
              {language === 'am' ? 'ካርቦሃይድሬት (Carbs)' : 'Carbohydrates'}
            </span>
            <span className="text-2xl font-black text-blue-900 mt-1 block">
              {scaledCarbs} <span className="text-xs font-normal">g</span>
            </span>
          </div>

          <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 text-center">
            <span className="text-xs font-bold text-amber-800 uppercase block">
              {language === 'am' ? 'ቅባት (Fat)' : 'Fat'}
            </span>
            <span className="text-2xl font-black text-amber-900 mt-1 block">
              {scaledFat} <span className="text-xs font-normal">g</span>
            </span>
          </div>

          <div className="bg-teal-50/70 p-4 rounded-2xl border border-teal-200 text-center">
            <span className="text-xs font-bold text-teal-800 uppercase block">
              {language === 'am' ? 'ፋይበር (Fiber)' : 'Fiber'}
            </span>
            <span className="text-2xl font-black text-teal-900 mt-1 block">
              {scaledFiber} <span className="text-xs font-normal">g</span>
            </span>
          </div>
        </div>

        {/* Secondary Micronutrients if available */}
        {(scaledSugar !== undefined || scaledSodium !== undefined) && (
          <div className="flex gap-4 text-xs font-semibold text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
            {scaledSugar !== undefined && (
              <span>
                {language === 'am' ? 'ስኳር፦' : 'Sugar:'} <strong>{scaledSugar}g</strong>
              </span>
            )}
            {scaledSodium !== undefined && (
              <span>
                {language === 'am' ? 'ሶዲየም (ጨው)፦' : 'Sodium:'} <strong>{scaledSodium}mg</strong>
              </span>
            )}
          </div>
        )}

        {/* Practical Compassionate Guidance Box (Exact requirement) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-500/10 border border-emerald-300 flex items-start gap-3">
          <HeartHandshake className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-emerald-950">
              {language === 'am' ? 'ተግባራዊ የምግብ ምክር፦' : 'Practical Dietary Guidance:'}
            </h4>
            <p className="text-xs text-emerald-900 font-semibold leading-relaxed">
              “{language === 'am' 
                ? (selectedFood.healthEvaluationAmharic || 'ይህ ምግብ በተመጣጠነ መጠን የጤናማ አመጋገብ አካል ሊሆን ይችላል።')
                : (selectedFood.healthEvaluationEnglish || 'This food can be part of a balanced, healthy dietary pattern.')}”
            </p>
            <p className="text-[11px] text-emerald-800/80 pt-1">
              {language === 'am'
                ? 'ምንም ዓይነት አንድ ምግብ ብቻውን በራሱ ውፍረት አያመጣም ወይም ክብደት አያቀንስም። ዋናው ነገር የተመጣጠነ ድምር መጠን ነው።'
                : 'No single food automatically causes weight gain or loss. Overall dietary variety and moderate portioning matter most.'}
            </p>
          </div>
        </div>

        {/* Estimation Disclaimer */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-500">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {language === 'am'
              ? 'ማስታወሻ፦ እነዚህ የንጥረ-ነገር እሴቶች ግምታዊ ናቸው። የምግብ አዘገጃጀት ዘዴ (የዘይት፣ የጨውና የቅቤ መጠን) እና የምግብ ይዘት በእውነተኛው ካሎሪ ላይ ልዩነት ሊያመጣ ይችላል።'
              : 'Note: Nutrition values are estimates. Cooking methods, added cooking oil, and varying ingredient portions significantly alter actual values.'}
          </p>
        </div>

        {/* 1-Click Add to Daily Food Diary */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700">
              {language === 'am' ? 'ወደ የትኛው ምግብ ይመዝገብ?' : 'Log to meal:'}
            </span>
            <select
              value={mealTypeToLog}
              onChange={(e) => setMealTypeToLog(e.target.value as any)}
              className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white focus:ring-2 focus:ring-emerald-500"
            >
              <option value="breakfast">{language === 'am' ? 'ቁርስ (Breakfast)' : 'Breakfast'}</option>
              <option value="lunch">{language === 'am' ? 'ምሳ (Lunch)' : 'Lunch'}</option>
              <option value="dinner">{language === 'am' ? 'እራት (Dinner)' : 'Dinner'}</option>
              <option value="snack">{language === 'am' ? 'መክሰስ (Snack)' : 'Snack'}</option>
            </select>
          </div>

          <button
            onClick={handleAddToDiary}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition hover:scale-[1.02] active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>{language === 'am' ? 'ወደ ዕለታዊ ማስታወሻ ጨምር' : 'Add to Food Diary'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
