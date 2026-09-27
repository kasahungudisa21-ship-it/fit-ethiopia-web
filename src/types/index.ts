export type Language = 'am' | 'en';

export type GoalType = 
  | 'weight_loss' 
  | 'general_fitness' 
  | 'healthy_lifestyle' 
  | 'muscle_development' 
  | 'weight_maintenance';

export type ActivityLevel = 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active';
export type FitnessExperience = 'beginner' | 'intermediate' | 'advanced';
export type WorkoutEnvironment = 'home' | 'gym' | 'no_equipment' | 'limited_equipment';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  age: number;
  sex: 'male' | 'female';
  height: number; // in cm
  weight: number; // current weight in kg
  startingWeight: number; // starting weight in kg
  targetWeight: number; // target weight in kg
  activityLevel: ActivityLevel;
  fitnessExperience: FitnessExperience;
  goal: GoalType;
  preferredEnvironment: WorkoutEnvironment;
  dailyCalorieTarget?: number;
  dailyWaterTargetLiters: number; // e.g. 2.0
  createdAt: string;
}

export interface FoodItem {
  id: string;
  nameAmharic: string;
  nameEnglish: string;
  category: 'wots' | 'grains' | 'snacks' | 'meat_dairy' | 'fruits_veggies' | 'beverages';
  servingSize: string; // e.g. "1 cup", "1 እንጀራ", "100g"
  servingSizeGrams?: number;
  calories: number; // kcal
  protein: number; // g
  carbohydrates: number; // g
  fat: number; // g
  fiber: number; // g
  sugar?: number; // g
  sodium?: number; // mg
  ingredients?: string[];
  preparationMethod?: string;
  healthEvaluationAmharic?: string;
  healthEvaluationEnglish?: string;
  isPopular?: boolean;
}

export interface MealRecord {
  id: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  foodId: string;
  foodName: string;
  amount: number; // portion multiplier, e.g. 1.0, 1.5, 0.5
  servingUnit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  timestamp: string; // ISO date
}

export interface Exercise {
  id: string;
  nameAmharic: string;
  nameEnglish: string;
  category: 'warmup' | 'fullbody' | 'cardio' | 'core' | 'lower' | 'upper' | 'cooldown';
  level: FitnessExperience;
  targetMuscles: string;
  descriptionAmharic: string;
  descriptionEnglish: string;
  sets: number;
  reps: string; // e.g. "10-12" or "30 sec"
  durationMinutes?: number;
  restSeconds: number;
  equipment: WorkoutEnvironment[];
  safetyInstructionsAmharic: string;
  safetyInstructionsEnglish: string;
  iconName?: string;
}

export interface WorkoutDay {
  dayNumber: number; // 1, 2, 3, 4
  titleAmharic: string;
  titleEnglish: string;
  focusAmharic: string;
  focusEnglish: string;
  durationMinutes: number;
  exercises: Exercise[];
}

export interface ActivityLog {
  id: string;
  type: 'walking' | 'running' | 'cycling' | 'gym' | 'home_workout' | 'sports' | 'stretching';
  typeNameAmharic: string;
  durationMinutes: number;
  caloriesBurned?: number;
  date: string; // YYYY-MM-DD
  notes?: string;
}

export interface WeightLog {
  id: string;
  weight: number;
  date: string; // YYYY-MM-DD
  note?: string;
}

export interface WaterLog {
  date: string; // YYYY-MM-DD
  amountMl: number;
  targetMl: number;
}

export interface HabitItem {
  id: string;
  titleAmharic: string;
  titleEnglish: string;
  category: 'fitness' | 'nutrition' | 'hydration' | 'recovery';
  completedDates: string[]; // ['2026-09-26', ...]
}

export interface SmartGoal {
  id: string;
  titleAmharic: string;
  titleEnglish: string;
  startDate: string;
  targetDate: string;
  currentValue: number;
  targetValue: number;
  unit: string;
  completed: boolean;
}

export interface MotivationalQuote {
  id: string;
  quoteAmharic: string;
  quoteEnglish: string;
  authorAmharic?: string;
  authorEnglish?: string;
}

export interface EducationalArticle {
  id: string;
  category: 'weight_management' | 'exercise' | 'nutrition' | 'lifestyle';
  titleAmharic: string;
  titleEnglish: string;
  summaryAmharic: string;
  summaryEnglish: string;
  contentAmharic: string;
  contentEnglish: string;
  readTimeMinutes: number;
}
