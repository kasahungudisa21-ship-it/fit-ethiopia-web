import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FoodItem } from '../types';
import { 
  Database, 
  Search, 
  Plus, 
  Filter, 
  Edit3, 
  Trash2, 
  Sparkles, 
  ShieldAlert, 
  X, 
  Check, 
  ChevronRight,
  Info
} from 'lucide-react';

export const FoodDatabasePage: React.FC = () => {
  const { language, foods, addFood, updateFood, deleteFood, isAdmin, setActiveTab } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [editingFood, setEditingFood] = useState<FoodItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [detailModalFood, setDetailModalFood] = useState<FoodItem | null>(null);

  // Form state for Add/Edit
  const [foodForm, setFoodForm] = useState<Partial<FoodItem>>({
    nameAmharic: '',
    nameEnglish: '',
    category: 'wots',
    servingSize: '1 cup (200g)',
    calories: 200,
    protein: 10,
    carbohydrates: 25,
    fat: 5,
    fiber: 5,
    sugar: 2,
    sodium: 300,
    ingredients: [],
    preparationMethod: '',
    healthEvaluationAmharic: 'ይህ ምግብ በተመጣጠነ መጠን የጤናማ አመጋገብ አካል ሊሆን ይችላል።',
    healthEvaluationEnglish: 'This food can be part of a balanced, healthy dietary pattern.'
  });

  const categories = [
    { id: 'all', labelAm: 'ሁሉም', labelEn: 'All' },
    { id: 'wots', labelAm: 'ወጦችና አልጫዎች', labelEn: 'Wots & Stews' },
    { id: 'grains', labelAm: 'እህሎችና እንጀራ', labelEn: 'Grains & Injera' },
    { id: 'snacks', labelAm: 'መክሰሶች (ቆሎ፣ ሽንብራ...)', labelEn: 'Snacks' },
    { id: 'meat_dairy', labelAm: 'ሥጋ፣ እንቁላልና አይብ', labelEn: 'Meat, Egg & Dairy' },
    { id: 'fruits_veggies', labelAm: 'አትክልትና ፍራፍሬ', labelEn: 'Fruits & Veggies' },
    { id: 'beverages', labelAm: 'ተፈጥሯዊ መጠጦች', labelEn: 'Beverages' },
  ];

  const filteredFoods = foods.filter(food => {
    const matchesCategory = selectedCategory === 'all' || food.category === selectedCategory;
    const matchesSearch = 
      food.nameAmharic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.nameEnglish.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleStartEdit = (food: FoodItem) => {
    setEditingFood(food);
    setFoodForm({ ...food });
    setIsAddingNew(false);
  };

  const handleStartAdd = () => {
    setEditingFood(null);
    setFoodForm({
      nameAmharic: '',
      nameEnglish: '',
      category: 'wots',
      servingSize: '1 cup',
      calories: 150,
      protein: 8,
      carbohydrates: 20,
      fat: 4,
      fiber: 4,
      sugar: 1,
      sodium: 250,
      ingredients: [''],
      preparationMethod: '',
      healthEvaluationAmharic: 'ይህ ምግብ በተመጣጠነ መጠን የጤናማ አመጋገብ አካል ሊሆን ይችላል።',
      healthEvaluationEnglish: 'This food can be part of a balanced, healthy dietary pattern.'
    });
    setIsAddingNew(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFood) {
      updateFood(editingFood.id, foodForm);
      setEditingFood(null);
    } else {
      addFood(foodForm as Omit<FoodItem, 'id'>);
      setIsAddingNew(false);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md mb-2">
            <Database className="w-3.5 h-3.5" />
            <span>{language === 'am' ? 'የኢትዮጵያ ምግቦች ዳታቤዝ' : 'Ethiopian Food Database'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {language === 'am' ? 'የተመጣጠነ ምግብ እና ካሎሪ ማውጫ' : 'Searchable Ethiopian Food Directory'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {language === 'am'
              ? 'በቀላሉ የሚፈለግ፣ በሳይንሳዊ ግምት የተጠናቀረ የባህላዊ ምግቦች ንጥረ-ነገር ዳታቤዝ።'
              : 'Database of commonly eaten Ethiopian dishes with estimated macronutrients, ingredients, and prep details.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isAdmin && (
            <button
              onClick={handleStartAdd}
              className="px-4 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition"
            >
              <Plus className="w-4 h-4" />
              <span>{language === 'am' ? 'አዲስ ምግብ ጨምር (Admin)' : 'Add New Food (Admin)'}</span>
            </button>
          )}
          <button
            onClick={() => setActiveTab('food-analyzer')}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm flex items-center gap-1.5 transition"
          >
            <Sparkles className="w-4 h-4" />
            <span>{language === 'am' ? 'የምግብ ትንተና' : 'Analyze Food'}</span>
          </button>
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'am' ? 'የምግብ ስም በአማርኛ ወይም በእንግሊዝኛ ይፈልጉ...' : 'Search food in Amharic or English...'}
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-medium transition"
          />
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                selectedCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {language === 'am' ? cat.labelAm : cat.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Foods Table Display (Requirement 6 Example Table) */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-extrabold uppercase tracking-wider">
                <th className="py-3.5 px-4">{language === 'am' ? 'ምግብ (Food)' : 'Food'}</th>
                <th className="py-3.5 px-4">{language === 'am' ? 'መጠን (Portion)' : 'Serving'}</th>
                <th className="py-3.5 px-4 text-right">Calories</th>
                <th className="py-3.5 px-4 text-right">Protein</th>
                <th className="py-3.5 px-4 text-right">Carbs</th>
                <th className="py-3.5 px-4 text-right">Fat</th>
                <th className="py-3.5 px-4 text-right">Fiber</th>
                <th className="py-3.5 px-4 text-center">{language === 'am' ? 'እርምጃ' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredFoods.map((food) => (
                <tr key={food.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 text-sm">{food.nameAmharic}</div>
                    <div className="text-slate-600 text-[11px] font-medium">{food.nameEnglish}</div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-700">{food.servingSize}</td>
                  <td className="py-3.5 px-4 text-right font-extrabold text-amber-700 font-mono">
                    ~{food.calories} kcal
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-emerald-700 font-mono">
                    {food.protein}g
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-blue-700 font-mono">
                    {food.carbohydrates}g
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-amber-600 font-mono">
                    {food.fat}g
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-teal-700 font-mono">
                    {food.fiber}g
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => setDetailModalFood(food)}
                        className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition"
                        title="View recipe & details"
                      >
                        <Info className="w-3.5 h-3.5" />
                      </button>

                      {isAdmin && (
                        <>
                          <button
                            onClick={() => handleStartEdit(food)}
                            className="p-1.5 rounded-lg border border-purple-200 text-purple-700 hover:bg-purple-50 transition"
                            title="Edit food"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteFood(food.id)}
                            className="p-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 transition"
                            title="Delete food"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredFoods.length === 0 && (
          <div className="p-8 text-center text-slate-500 text-xs italic">
            {language === 'am' ? 'ምንም የተገኘ ምግብ የለም' : 'No matching Ethiopian foods found.'}
          </div>
        )}
      </div>

      {/* Add / Edit Food Modal (Admin functionality) */}
      {(isAddingNew || editingFood) && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto animate-scaleUp">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="text-lg font-black text-slate-900">
                {isAddingNew
                  ? (language === 'am' ? 'አዲስ ምግብ ወደ ዳታቤዝ ማከያ' : 'Add New Food to Database')
                  : (language === 'am' ? 'የምግብ መረጃ ማሻሻያ' : 'Edit Food')}
              </h3>
              <button
                onClick={() => { setIsAddingNew(false); setEditingFood(null); }}
                className="text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">ስም በአማርኛ</label>
                  <input
                    type="text"
                    required
                    value={foodForm.nameAmharic}
                    onChange={(e) => setFoodForm({ ...foodForm, nameAmharic: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                    placeholder="ሽሮ ወጥ"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">English Name</label>
                  <input
                    type="text"
                    required
                    value={foodForm.nameEnglish}
                    onChange={(e) => setFoodForm({ ...foodForm, nameEnglish: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                    placeholder="Shiro Wat"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">ምድብ (Category)</label>
                  <select
                    value={foodForm.category}
                    onChange={(e) => setFoodForm({ ...foodForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                  >
                    <option value="wots">ወጥ (Wots)</option>
                    <option value="grains">እህልና እንጀራ (Grains)</option>
                    <option value="snacks">መክሰስ (Snacks)</option>
                    <option value="meat_dairy">ሥጋና ወተት (Meat/Dairy)</option>
                    <option value="fruits_veggies">አትክልትና ፍራፍሬ (Veggies)</option>
                    <option value="beverages">መጠጥ (Beverages)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">መጠን (Serving Size)</label>
                  <input
                    type="text"
                    required
                    value={foodForm.servingSize}
                    onChange={(e) => setFoodForm({ ...foodForm, servingSize: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                    placeholder="1 cup (240g)"
                  />
                </div>
              </div>

              {/* Macros */}
              <div className="grid grid-cols-4 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Calories</label>
                  <input
                    type="number"
                    required
                    value={foodForm.calories}
                    onChange={(e) => setFoodForm({ ...foodForm, calories: Number(e.target.value) })}
                    className="w-full px-2 py-1.5 rounded-lg border border-slate-300 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Protein (g)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={foodForm.protein}
                    onChange={(e) => setFoodForm({ ...foodForm, protein: Number(e.target.value) })}
                    className="w-full px-2 py-1.5 rounded-lg border border-slate-300 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Carbs (g)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={foodForm.carbohydrates}
                    onChange={(e) => setFoodForm({ ...foodForm, carbohydrates: Number(e.target.value) })}
                    className="w-full px-2 py-1.5 rounded-lg border border-slate-300 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Fat (g)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={foodForm.fat}
                    onChange={(e) => setFoodForm({ ...foodForm, fat: Number(e.target.value) })}
                    className="w-full px-2 py-1.5 rounded-lg border border-slate-300 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">የጤና ግምገማ (Health Evaluation)</label>
                <textarea
                  rows={2}
                  value={foodForm.healthEvaluationAmharic}
                  onChange={(e) => setFoodForm({ ...foodForm, healthEvaluationAmharic: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => { setIsAddingNew(false); setEditingFood(null); }}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold"
                >
                  ሰርዝ (Cancel)
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold"
                >
                  አስቀምጥ (Save Food)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Food Detail Modal */}
      {detailModalFood && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4 animate-scaleUp">
            <div className="flex justify-between items-start pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-black text-slate-900">{detailModalFood.nameAmharic}</h3>
                <span className="text-xs text-slate-500">{detailModalFood.nameEnglish}</span>
              </div>
              <button
                onClick={() => setDetailModalFood(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="bg-slate-50 p-2 rounded-xl">
                <span className="text-[10px] text-slate-400 block">Calories</span>
                <span className="font-extrabold text-amber-700">{detailModalFood.calories}</span>
              </div>
              <div className="bg-slate-50 p-2 rounded-xl">
                <span className="text-[10px] text-slate-400 block">Protein</span>
                <span className="font-extrabold text-emerald-700">{detailModalFood.protein}g</span>
              </div>
              <div className="bg-slate-50 p-2 rounded-xl">
                <span className="text-[10px] text-slate-400 block">Carbs</span>
                <span className="font-extrabold text-blue-700">{detailModalFood.carbohydrates}g</span>
              </div>
              <div className="bg-slate-50 p-2 rounded-xl">
                <span className="text-[10px] text-slate-400 block">Fat</span>
                <span className="font-extrabold text-amber-600">{detailModalFood.fat}g</span>
              </div>
            </div>

            {detailModalFood.ingredients && (
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-800">ግብዓቶች (Ingredients)፦</span>
                <div className="flex flex-wrap gap-1">
                  {detailModalFood.ingredients.map((ing, i) => (
                    <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {detailModalFood.preparationMethod && (
              <div className="space-y-1 text-xs">
                <span className="font-bold text-slate-800">የአዘገጃጀት ሁኔታ፦</span>
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {detailModalFood.preparationMethod}
                </p>
              </div>
            )}

            <div className="p-3 bg-emerald-50 rounded-xl text-xs text-emerald-900 border border-emerald-200">
              <strong>የጤና ግምገማ፦</strong> {detailModalFood.healthEvaluationAmharic}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setDetailModalFood(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
              >
                ዝጋ (Close)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
