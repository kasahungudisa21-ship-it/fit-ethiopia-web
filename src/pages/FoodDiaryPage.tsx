import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FoodItem, MealRecord } from '../types';
import { 
  Utensils, 
  Plus, 
  Trash2, 
  Flame, 
  Coffee, 
  Sun, 
  Moon, 
  Cookie, 
  Droplet, 
  Scale, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const FoodDiaryPage: React.FC = () => {
  const { 
    language, 
    foods, 
    mealRecords, 
    addMealRecord, 
    removeMealRecord, 
    user, 
    setActiveTab,
    todayWaterMl,
    addWaterMl
  } = useApp();

  const [activeModalMealType, setActiveModalMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack' | null>(null);
  const [modalSelectedFoodId, setModalSelectedFoodId] = useState<string>('food-injera-teff');
  const [modalAmount, setModalAmount] = useState<number>(1.0);

  // Group meals
  const breakfastMeals = mealRecords.filter(m => m.mealType === 'breakfast');
  const lunchMeals = mealRecords.filter(m => m.mealType === 'lunch');
  const dinnerMeals = mealRecords.filter(m => m.mealType === 'dinner');
  const snackMeals = mealRecords.filter(m => m.mealType === 'snack');

  // Aggregated totals
  const totalCalories = mealRecords.reduce((acc, m) => acc + m.calories, 0);
  const totalProtein = Math.round(mealRecords.reduce((acc, m) => acc + m.protein, 0) * 10) / 10;
  const totalCarbs = Math.round(mealRecords.reduce((acc, m) => acc + m.carbs, 0) * 10) / 10;
  const totalFat = Math.round(mealRecords.reduce((acc, m) => acc + m.fat, 0) * 10) / 10;
  const totalFiber = Math.round(mealRecords.reduce((acc, m) => acc + m.fiber, 0) * 10) / 10;

  const targetCalories = user.dailyCalorieTarget || 1950;
  const calPercent = Math.min(100, Math.round((totalCalories / targetCalories) * 100));

  const handleModalAddFood = () => {
    if (!activeModalMealType) return;
    const food = foods.find(f => f.id === modalSelectedFoodId) || foods[0];
    addMealRecord({
      mealType: activeModalMealType,
      foodId: food.id,
      foodName: language === 'am' ? food.nameAmharic : food.nameEnglish,
      amount: modalAmount,
      servingUnit: food.servingSize,
      calories: Math.round(food.calories * modalAmount),
      protein: Math.round(food.protein * modalAmount * 10) / 10,
      carbs: Math.round(food.carbohydrates * modalAmount * 10) / 10,
      fat: Math.round(food.fat * modalAmount * 10) / 10,
      fiber: Math.round(food.fiber * modalAmount * 10) / 10
    });
    setActiveModalMealType(null);
  };

  const mealSections = [
    { 
      type: 'breakfast' as const, 
      titleAm: 'ቁርስ (Breakfast)', 
      titleEn: 'Breakfast', 
      icon: Coffee, 
      meals: breakfastMeals, 
      color: 'text-amber-600 bg-amber-50 border-amber-200' 
    },
    { 
      type: 'lunch' as const, 
      titleAm: 'ምሳ (Lunch)', 
      titleEn: 'Lunch', 
      icon: Sun, 
      meals: lunchMeals, 
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200' 
    },
    { 
      type: 'dinner' as const, 
      titleAm: 'እራት (Dinner)', 
      titleEn: 'Dinner', 
      icon: Moon, 
      meals: dinnerMeals, 
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200' 
    },
    { 
      type: 'snack' as const, 
      titleAm: 'መክሰስ እና መጠጦች (Snacks & Drinks)', 
      titleEn: 'Snacks & Drinks', 
      icon: Cookie, 
      meals: snackMeals, 
      color: 'text-teal-600 bg-teal-50 border-teal-200' 
    }
  ];

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md mb-2">
            <Utensils className="w-3.5 h-3.5" />
            <span>{language === 'am' ? 'የዕለት ምግብ ማስታወሻ' : 'Daily Food Diary'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {language === 'am' ? 'የዛሬ የተመጣጠነ አመጋገብ ክትትል' : 'Today\'s Nutrition Log'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {language === 'am'
              ? 'የተመገቡትን ቁርስ፣ ምሳ፣ እራትና መክሰስ በመመዝገብ የዕለቱን ድምር በራስ-ሰር ያሰሉ።'
              : 'Log your meals and review daily calories, protein, carbohydrates, and fiber.'}
          </p>
        </div>

        <button
          onClick={() => setActiveTab('food-analyzer')}
          className="self-start sm:self-center px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black shadow-xs flex items-center gap-1.5 transition"
        >
          <Sparkles className="w-4 h-4" />
          <span>{language === 'am' ? 'የምግብ ትንተና ክፈት' : 'Food Analyzer'}</span>
        </button>
      </div>

      {/* Daily Nutrition Summary Bar (Exact Requirement 7) */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-700/60">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              {language === 'am' ? 'የዕለት ጠቅላላ ንጥረ-ነገር (Daily Nutrition)' : 'Daily Nutrition Totals'}
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-3xl font-black text-white">{totalCalories}</span>
              <span className="text-xs font-semibold text-slate-400">
                / {targetCalories} kcal {language === 'am' ? 'ዒላማ' : 'target'}
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {calPercent}% {language === 'am' ? 'የዕለቱ ካሎሪ' : 'of daily goal'}
            </span>
          </div>
        </div>

        {/* 4 Core Macro Blocks */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              {language === 'am' ? 'ፕሮቲን' : 'Protein'}
            </span>
            <span className="text-xl sm:text-2xl font-black text-emerald-400 mt-1 block">
              {totalProtein}g
            </span>
          </div>

          <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              {language === 'am' ? 'ካርቦሃይድሬት' : 'Carbohydrates'}
            </span>
            <span className="text-xl sm:text-2xl font-black text-blue-400 mt-1 block">
              {totalCarbs}g
            </span>
          </div>

          <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              {language === 'am' ? 'ቅባት' : 'Fat'}
            </span>
            <span className="text-xl sm:text-2xl font-black text-amber-400 mt-1 block">
              {totalFat}g
            </span>
          </div>

          <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              {language === 'am' ? 'ፋይበር' : 'Fiber'}
            </span>
            <span className="text-xl sm:text-2xl font-black text-teal-400 mt-1 block">
              {totalFiber}g
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 rounded-full transition-all duration-700"
              style={{ width: `${Math.min(100, calPercent)}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>0 kcal</span>
            <span>{targetCalories} kcal</span>
          </div>
        </div>
      </div>

      {/* 4 Meal Category Sections */}
      <div className="space-y-5">
        {mealSections.map((section) => {
          const Icon = section.icon;
          const sectionCals = section.meals.reduce((acc, m) => acc + m.calories, 0);

          return (
            <div
              key={section.type}
              className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl border ${section.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900">
                      {language === 'am' ? section.titleAm : section.titleEn}
                    </h3>
                    <span className="text-xs text-slate-600 font-medium">
                      {section.meals.length} {language === 'am' ? 'ምግቦች' : 'items'} • {sectionCals} kcal
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveModalMealType(section.type)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 text-xs font-bold text-slate-700 flex items-center gap-1 transition shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{language === 'am' ? 'ምግብ መዝግብ' : 'Add Food'}</span>
                </button>
              </div>

              {/* Meal Items List */}
              {section.meals.length === 0 ? (
                <div className="text-center py-6 text-slate-400 text-xs italic">
                  {language === 'am' ? 'እስካሁን ምንም ምግብ አልተመዘገበም' : 'No foods logged for this meal yet.'}
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {section.meals.map((meal) => (
                    <div
                      key={meal.id}
                      className="py-3 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">
                            {meal.foodName}
                          </span>
                          <span className="text-slate-600 font-medium">
                            ({meal.amount} × {meal.servingUnit})
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-600 font-medium">
                          <span>P: {meal.protein}g</span>
                          <span>C: {meal.carbs}g</span>
                          <span>F: {meal.fat}g</span>
                          <span>Fiber: {meal.fiber}g</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-bold text-sm text-slate-800 font-mono">
                          {meal.calories} kcal
                        </span>
                        <button
                          onClick={() => removeMealRecord(meal.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                          title="Delete entry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Add Food Modal */}
      {activeModalMealType && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-scaleUp">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="text-lg font-black text-slate-900">
                {language === 'am' ? 'ምግብ ወደ ማስታወሻ ይጨምሩ' : 'Add Food to Diary'}
              </h3>
              <button
                onClick={() => setActiveModalMealType(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {language === 'am' ? 'የኢትዮጵያ ምግብ ይምረጡ' : 'Select Ethiopian Food'}
                </label>
                <select
                  value={modalSelectedFoodId}
                  onChange={(e) => setModalSelectedFoodId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  {foods.map((food) => (
                    <option key={food.id} value={food.id}>
                      {food.nameAmharic} ({food.calories} kcal / {food.servingSize})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {language === 'am' ? 'መጠን (Portion Multiplier)' : 'Portion Multiplier'}
                </label>
                <div className="flex items-center gap-2">
                  {[0.5, 1.0, 1.5, 2.0].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setModalAmount(amt)}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition ${
                        modalAmount === amt
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {amt}x
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button
                onClick={() => setActiveModalMealType(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                {language === 'am' ? 'ሰርዝ' : 'Cancel'}
              </button>
              <button
                onClick={handleModalAddFood}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition"
              >
                {language === 'am' ? 'ወደ ማስታወሻ ጨምር' : 'Add to Diary'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
