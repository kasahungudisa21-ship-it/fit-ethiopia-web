import { HabitItem } from '../types';

export const DEFAULT_HABITS: HabitItem[] = [
  {
    id: 'habit-activity-30m',
    titleAmharic: 'ለ30 ደቂቃ ያህል መንቀሳቀስ (መራመድ/ስፖርት)',
    titleEnglish: '30 minutes of physical activity',
    category: 'fitness',
    completedDates: []
  },
  {
    id: 'habit-eat-veggies',
    titleAmharic: 'አትክልትና ፍራፍሬ መመገብ',
    titleEnglish: 'Eat vegetables and whole fruits',
    category: 'nutrition',
    completedDates: []
  },
  {
    id: 'habit-drink-water',
    titleAmharic: 'የዕለቱን የውሃ ግብ ማሟላት (2+ ሊትር)',
    titleEnglish: 'Drink adequate water (2+ Liters)',
    category: 'hydration',
    completedDates: []
  },
  {
    id: 'habit-good-sleep',
    titleAmharic: 'ከ7-8 ሰዓት በቂና ጥራት ያለው እንቅልፍ መተኛት',
    titleEnglish: 'Get 7-8 hours of restful sleep',
    category: 'recovery',
    completedDates: []
  },
  {
    id: 'habit-limit-processed',
    titleAmharic: 'የተቀነባበሩና የጣፈጡ ምግቦችን መገደብ',
    titleEnglish: 'Limit highly processed foods & added sugars',
    category: 'nutrition',
    completedDates: []
  },
  {
    id: 'habit-workout',
    titleAmharic: 'የታቀደውን የዕለቱን ልምምድ ማጠናቀቅ',
    titleEnglish: 'Complete today\'s planned workout session',
    category: 'fitness',
    completedDates: []
  },
  {
    id: 'habit-log-meals',
    titleAmharic: 'የተመገቡትን ምግቦች ማስታወሻ ላይ መመዝገብ',
    titleEnglish: 'Record meals in daily food diary',
    category: 'nutrition',
    completedDates: []
  },
  {
    id: 'habit-recovery-time',
    titleAmharic: 'ለሰውነትና አእምሮ የእረፍትና የማገገሚያ ጊዜ መስጠት',
    titleEnglish: 'Take intentional rest and recovery time',
    category: 'recovery',
    completedDates: []
  }
];
