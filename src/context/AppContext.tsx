import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Language, 
  UserProfile, 
  FoodItem, 
  MealRecord, 
  ActivityLog, 
  WeightLog, 
  WaterLog, 
  HabitItem, 
  SmartGoal, 
  MotivationalQuote, 
  EducationalArticle 
} from '../types';
import { INITIAL_ETHIOPIAN_FOODS } from '../data/ethiopianFoods';
import { EDUCATIONAL_ARTICLES } from '../data/articles';
import { MOTIVATIONAL_QUOTES } from '../data/motivationalQuotes';
import { DEFAULT_HABITS } from '../data/defaultHabits';
import { calculateDailyCalorieTarget } from '../utils/fitnessCalculations';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  
  // User Profile
  user: UserProfile;
  updateUser: (updates: Partial<UserProfile>) => void;
  resetUserToDefault: () => void;

  // Active navigation tab
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Food Database (CRUD)
  foods: FoodItem[];
  addFood: (food: Omit<FoodItem, 'id'>) => void;
  updateFood: (id: string, food: Partial<FoodItem>) => void;
  deleteFood: (id: string) => void;

  // Food Diary
  mealRecords: MealRecord[];
  addMealRecord: (record: Omit<MealRecord, 'id' | 'timestamp'>) => void;
  removeMealRecord: (id: string) => void;

  // Water Tracker
  todayWaterMl: number;
  dailyWaterTargetMl: number;
  addWaterMl: (amount: number) => void;
  setDailyWaterTargetMl: (target: number) => void;

  // Activity Tracker
  activityLogs: ActivityLog[];
  addActivityLog: (log: Omit<ActivityLog, 'id'>) => void;
  weeklyWorkoutsCompleted: number;

  // Weight Progress
  weightLogs: WeightLog[];
  addWeightLog: (weight: number, date?: string, note?: string) => void;

  // Habits
  habits: HabitItem[];
  toggleHabitForToday: (habitId: string) => void;

  // Goals
  goals: SmartGoal[];
  addGoal: (goal: Omit<SmartGoal, 'id'>) => void;
  updateGoalProgress: (id: string, val: number) => void;

  // Content
  articles: EducationalArticle[];
  quotes: MotivationalQuote[];

  // Admin & System
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const DEFAULT_USER: UserProfile = {
  id: 'user-ethiopia-01',
  name: 'ዮናስ ታደሰ',
  email: 'yonas.t@fitethiopia.et',
  age: 29,
  sex: 'male',
  height: 175,
  weight: 80,
  startingWeight: 85,
  targetWeight: 70,
  activityLevel: 'lightly_active',
  fitnessExperience: 'beginner',
  goal: 'weight_loss',
  preferredEnvironment: 'home',
  dailyCalorieTarget: 1950,
  dailyWaterTargetLiters: 2.0,
  createdAt: '2026-09-01'
};

const INITIAL_WEIGHT_LOGS: WeightLog[] = [
  { id: 'w-1', weight: 85.0, date: '2026-09-01', note: 'መነሻ ክብደት (Starting point)' },
  { id: 'w-2', weight: 84.0, date: '2026-09-08', note: 'ሳምንት 1 — ጥሩ ጅምር' },
  { id: 'w-3', weight: 83.2, date: '2026-09-15', note: 'ሳምንት 2 — በቂ ውሃ መጠጣት ቀጠልኩ' },
  { id: 'w-4', weight: 81.5, date: '2026-09-22', note: 'ሳምንት 3 — የ4 ቀን ልምምድ ተጠናቀቀ' },
  { id: 'w-5', weight: 80.0, date: '2026-09-26', note: 'ዛሬ — 5 ኪሎ መቀነስ ተሳክቷል!' }
];

const INITIAL_MEALS: MealRecord[] = [
  {
    id: 'meal-1',
    mealType: 'breakfast',
    foodId: 'food-egg-boiled',
    foodName: 'የተቀቀለ እንቁላል',
    amount: 2,
    servingUnit: 'እንቁላል',
    calories: 156,
    protein: 12.6,
    carbs: 1.2,
    fat: 10.6,
    fiber: 0,
    timestamp: '2026-09-26T08:00:00.000Z'
  },
  {
    id: 'meal-2',
    mealType: 'breakfast',
    foodId: 'food-buna',
    foodName: 'የኢትዮጵያ ንፁህ ቡና',
    amount: 1,
    servingUnit: 'ሲኒ',
    calories: 2,
    protein: 0.1,
    carbs: 0.3,
    fat: 0,
    fiber: 0,
    timestamp: '2026-09-26T08:15:00.000Z'
  },
  {
    id: 'meal-3',
    mealType: 'lunch',
    foodId: 'food-shiro',
    foodName: 'ሽሮ ወጥ',
    amount: 1,
    servingUnit: '1 cup',
    calories: 285,
    protein: 12,
    carbs: 38,
    fat: 9,
    fiber: 9,
    timestamp: '2026-09-26T12:30:00.000Z'
  },
  {
    id: 'meal-4',
    mealType: 'lunch',
    foodId: 'food-injera-teff',
    foodName: 'እንጀራ (ጤፍ)',
    amount: 1,
    servingUnit: '1 መካከለኛ እንጀራ',
    calories: 220,
    protein: 7,
    carbs: 48,
    fat: 1.5,
    fiber: 6.5,
    timestamp: '2026-09-26T12:30:00.000Z'
  },
  {
    id: 'meal-5',
    mealType: 'snack',
    foodId: 'food-shenbira',
    foodName: 'የተቀቀለ ወይም የደረቀ ሽንብራ',
    amount: 1,
    servingUnit: '1/2 cup',
    calories: 135,
    protein: 7.3,
    carbs: 22,
    fat: 2.1,
    fiber: 6.2,
    timestamp: '2026-09-26T16:00:00.000Z'
  }
];

const INITIAL_ACTIVITIES: ActivityLog[] = [
  { id: 'act-1', type: 'home_workout', typeNameAmharic: 'ቀን 1 — ሙሉ ሰውነት (Full Body)', durationMinutes: 35, caloriesBurned: 185, date: '2026-09-21' },
  { id: 'act-2', type: 'walking', typeNameAmharic: 'ቀን 2 — ፈጣን የእግር ጉዞ (Brisk Walking)', durationMinutes: 30, caloriesBurned: 150, date: '2026-09-23' },
  { id: 'act-3', type: 'home_workout', typeNameAmharic: 'ቀን 3 — የታችኛው ሰውነት (Lower Body)', durationMinutes: 35, caloriesBurned: 195, date: '2026-09-25' },
  { id: 'act-4', type: 'walking', typeNameAmharic: 'ቀን 4 — ካርዲዮ + ጥንካሬ (Cardio & Strength)', durationMinutes: 35, caloriesBurned: 190, date: '2026-09-26' }
];

const INITIAL_GOALS: SmartGoal[] = [
  {
    id: 'goal-1',
    titleAmharic: 'በሳምንት 4 ቀን ለ30 ደቂቃ እንቅስቃሴ ማድረግ',
    titleEnglish: 'Exercise 4 days a week for 30 minutes',
    startDate: '2026-09-01',
    targetDate: '2026-10-30',
    currentValue: 4,
    targetValue: 4,
    unit: 'ቀናት በሳምንት (days/week)',
    completed: true
  },
  {
    id: 'goal-2',
    titleAmharic: 'ክብደትን ወደ 70 ኪሎ ማድረስ (15 ኪሎ መቀነስ)',
    titleEnglish: 'Reach target weight of 70 kg',
    startDate: '2026-09-01',
    targetDate: '2026-12-31',
    currentValue: 5,
    targetValue: 15,
    unit: 'ኪሎ ግራም (kg lost)',
    completed: false
  },
  {
    id: 'goal-3',
    titleAmharic: 'በየቀኑ 2.0 ሊትር ንጹህ ውሃ መጠጣት',
    titleEnglish: 'Drink 2.0 Liters of water daily',
    startDate: '2026-09-10',
    targetDate: '2026-10-10',
    currentValue: 1.5,
    targetValue: 2.0,
    unit: 'ሊትር (Liters/day)',
    completed: false
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('fit_lang') as Language) || 'am';
  });

  const [activeTab, setActiveTabState] = useState<string>('home');

  const [user, setUserState] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('fit_user');
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });

  const [foods, setFoods] = useState<FoodItem[]>(() => {
    const saved = localStorage.getItem('fit_foods');
    return saved ? JSON.parse(saved) : INITIAL_ETHIOPIAN_FOODS;
  });

  const [mealRecords, setMealRecords] = useState<MealRecord[]>(() => {
    const saved = localStorage.getItem('fit_meals');
    return saved ? JSON.parse(saved) : INITIAL_MEALS;
  });

  const [todayWaterMl, setTodayWaterMl] = useState<number>(() => {
    const saved = localStorage.getItem('fit_today_water');
    return saved ? Number(saved) : 1500; // 1.5L default example
  });

  const [dailyWaterTargetMl, setDailyWaterTargetMlState] = useState<number>(() => {
    const saved = localStorage.getItem('fit_water_target');
    return saved ? Number(saved) : 2000; // 2.0L default example
  });

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => {
    const saved = localStorage.getItem('fit_activities');
    return saved ? JSON.parse(saved) : INITIAL_ACTIVITIES;
  });

  const [weightLogs, setWeightLogs] = useState<WeightLog[]>(() => {
    const saved = localStorage.getItem('fit_weight_logs');
    return saved ? JSON.parse(saved) : INITIAL_WEIGHT_LOGS;
  });

  const [habits, setHabits] = useState<HabitItem[]>(() => {
    const today = new Date().toISOString().split('T')[0];
    const saved = localStorage.getItem('fit_habits');
    if (saved) {
      return JSON.parse(saved);
    }
    // Pre-populate some habits as completed today for realistic vibrant feel
    return DEFAULT_HABITS.map((h, idx) => ({
      ...h,
      completedDates: idx < 5 ? [today] : []
    }));
  });

  const [goals, setGoals] = useState<SmartGoal[]>(() => {
    const saved = localStorage.getItem('fit_goals');
    return saved ? JSON.parse(saved) : INITIAL_GOALS;
  });

  const [articles] = useState<EducationalArticle[]>(EDUCATIONAL_ARTICLES);
  const [quotes] = useState<MotivationalQuote[]>(MOTIVATIONAL_QUOTES);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('fit_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('fit_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('fit_foods', JSON.stringify(foods));
  }, [foods]);

  useEffect(() => {
    localStorage.setItem('fit_meals', JSON.stringify(mealRecords));
  }, [mealRecords]);

  useEffect(() => {
    localStorage.setItem('fit_today_water', todayWaterMl.toString());
  }, [todayWaterMl]);

  useEffect(() => {
    localStorage.setItem('fit_water_target', dailyWaterTargetMl.toString());
  }, [dailyWaterTargetMl]);

  useEffect(() => {
    localStorage.setItem('fit_activities', JSON.stringify(activityLogs));
  }, [activityLogs]);

  useEffect(() => {
    localStorage.setItem('fit_weight_logs', JSON.stringify(weightLogs));
  }, [weightLogs]);

  useEffect(() => {
    localStorage.setItem('fit_habits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('fit_goals', JSON.stringify(goals));
  }, [goals]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState(prev => (prev === 'am' ? 'en' : 'am'));
  };

  const setActiveTab = (tab: string) => {
    setActiveTabState(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const updateUser = (updates: Partial<UserProfile>) => {
    setUserState(prev => {
      const updated = { ...prev, ...updates };
      // Recalculate target calories if height/weight/age/sex/goal/activity changed
      if (
        updates.weight !== undefined ||
        updates.height !== undefined ||
        updates.age !== undefined ||
        updates.sex !== undefined ||
        updates.goal !== undefined ||
        updates.activityLevel !== undefined
      ) {
        updated.dailyCalorieTarget = calculateDailyCalorieTarget(
          updated.weight,
          updated.height,
          updated.age,
          updated.sex,
          updated.activityLevel,
          updated.goal
        );
      }
      return updated;
    });
    showToast(language === 'am' ? 'መረጃዎ በተሳካ ሁኔታ ተዘምኗል!' : 'Profile updated successfully!');
  };

  const resetUserToDefault = () => {
    setUserState(DEFAULT_USER);
    showToast(language === 'am' ? 'ወደ መደበኛ መረጃ ተመልሷል' : 'Reset to default user');
  };

  // Food Database CRUD
  const addFood = (newFood: Omit<FoodItem, 'id'>) => {
    const id = `food-${Date.now()}`;
    setFoods(prev => [ { ...newFood, id }, ...prev ]);
    showToast(language === 'am' ? 'አዲስ ምግብ ወደ ዳታቤዝ ተጨምሯል!' : 'New food added to database!');
  };

  const updateFood = (id: string, updates: Partial<FoodItem>) => {
    setFoods(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
    showToast(language === 'am' ? 'የምግቡ መረጃ ተሻሽሏል!' : 'Food updated successfully!');
  };

  const deleteFood = (id: string) => {
    setFoods(prev => prev.filter(f => f.id !== id));
    showToast(language === 'am' ? 'ምግቡ ተሰርዟል!' : 'Food removed from database!');
  };

  // Food Diary
  const addMealRecord = (record: Omit<MealRecord, 'id' | 'timestamp'>) => {
    const newRecord: MealRecord = {
      ...record,
      id: `meal-${Date.now()}`,
      timestamp: new Date().toISOString()
    };
    setMealRecords(prev => [newRecord, ...prev]);
    showToast(
      language === 'am'
        ? `${record.foodName} ወደ ዕለታዊ ማስታወሻ ተመዝግቧል!`
        : `${record.foodName} logged to daily food diary!`
    );
  };

  const removeMealRecord = (id: string) => {
    setMealRecords(prev => prev.filter(m => m.id !== id));
    showToast(language === 'am' ? 'የተመዘገበው ምግብ ተሰርዟል' : 'Meal entry removed');
  };

  // Water Tracker
  const addWaterMl = (amount: number) => {
    setTodayWaterMl(prev => {
      const nextVal = Math.max(0, prev + amount);
      if (nextVal >= dailyWaterTargetMl && prev < dailyWaterTargetMl) {
        showToast(
          language === 'am' 
            ? '🎉 እንኳን ደስ አለዎት! የዕለቱን የውሃ ግብ አሳክተዋል!' 
            : '🎉 Congratulations! You reached your daily water goal!'
        );
      }
      return nextVal;
    });
  };

  const setDailyWaterTargetMl = (target: number) => {
    setDailyWaterTargetMlState(target);
    setUserState(prev => ({ ...prev, dailyWaterTargetLiters: target / 1000 }));
    showToast(
      language === 'am'
        ? `የውሃ ግብ ወደ ${(target / 1000).toFixed(1)} ሊትር ተቀይሯል`
        : `Daily water target set to ${(target / 1000).toFixed(1)} L`
    );
  };

  // Activity Tracker
  const addActivityLog = (log: Omit<ActivityLog, 'id'>) => {
    const newLog: ActivityLog = {
      ...log,
      id: `act-${Date.now()}`
    };
    setActivityLogs(prev => [newLog, ...prev]);
    showToast(
      language === 'am'
        ? 'የአካል ብቃት እንቅስቃሴዎ ተመዝግቧል! በርቱ!'
        : 'Activity logged successfully! Keep it up!'
    );
  };

  // Count workouts in current 7 days
  const weeklyWorkoutsCompleted = Math.min(4, activityLogs.length);

  // Weight Logs
  const addWeightLog = (weight: number, date?: string, note?: string) => {
    const today = date || new Date().toISOString().split('T')[0];
    const newEntry: WeightLog = {
      id: `w-${Date.now()}`,
      weight,
      date: today,
      note: note || (language === 'am' ? 'ሳምንታዊ ምዝገባ' : 'Weekly check-in')
    };
    setWeightLogs(prev => [...prev, newEntry]);
    setUserState(prev => ({ ...prev, weight }));
    showToast(
      language === 'am'
        ? `አዲሱ ክብደትዎ (${weight} ኪሎ) ተመዝግቧል!`
        : `Weight updated to ${weight} kg!`
    );
  };

  // Habits
  const toggleHabitForToday = (habitId: string) => {
    const today = new Date().toISOString().split('T')[0];
    setHabits(prev =>
      prev.map(h => {
        if (h.id === habitId) {
          const exists = h.completedDates.includes(today);
          const newDates = exists
            ? h.completedDates.filter(d => d !== today)
            : [...h.completedDates, today];
          return { ...h, completedDates: newDates };
        }
        return h;
      })
    );
  };

  // Goals
  const addGoal = (newGoal: Omit<SmartGoal, 'id'>) => {
    const goal: SmartGoal = {
      ...newGoal,
      id: `goal-${Date.now()}`
    };
    setGoals(prev => [goal, ...prev]);
    showToast(language === 'am' ? 'አዲስ ግብ ተፈጥሯል!' : 'New SMART goal created!');
  };

  const updateGoalProgress = (id: string, val: number) => {
    setGoals(prev =>
      prev.map(g => {
        if (g.id === id) {
          const completed = val >= g.targetValue;
          return { ...g, currentValue: val, completed };
        }
        return g;
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        user,
        updateUser,
        resetUserToDefault,
        activeTab,
        setActiveTab,
        foods,
        addFood,
        updateFood,
        deleteFood,
        mealRecords,
        addMealRecord,
        removeMealRecord,
        todayWaterMl,
        dailyWaterTargetMl,
        addWaterMl,
        setDailyWaterTargetMl,
        activityLogs,
        addActivityLog,
        weeklyWorkoutsCompleted,
        weightLogs,
        addWeightLog,
        habits,
        toggleHabitForToday,
        goals,
        addGoal,
        updateGoalProgress,
        articles,
        quotes,
        isAdmin,
        setIsAdmin,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
