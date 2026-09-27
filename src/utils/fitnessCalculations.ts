export interface BMIEvaluation {
  bmi: number;
  categoryAmharic: string;
  categoryEnglish: string;
  colorClass: string;
  healthyWeightMinKg: number;
  healthyWeightMaxKg: number;
  weightDifferenceKg: number;
  progressPercent: number;
  disclaimerAmharic: string;
  disclaimerEnglish: string;
}

export function calculateBMI(
  heightCm: number,
  currentWeightKg: number,
  startingWeightKg: number,
  targetWeightKg: number,
  goal: string = 'weight_loss'
): BMIEvaluation {
  const heightM = heightCm / 100;
  const bmiRaw = heightM > 0 ? currentWeightKg / (heightM * heightM) : 0;
  const bmi = Math.round(bmiRaw * 10) / 10;

  let categoryAmharic = 'መደበኛ ክብደት';
  let categoryEnglish = 'Normal Weight';
  let colorClass = 'text-emerald-600 bg-emerald-50 border-emerald-200';

  if (bmi < 18.5) {
    categoryAmharic = 'ዝቅተኛ ክብደት (የክብደት ማነስ)';
    categoryEnglish = 'Underweight';
    colorClass = 'text-blue-600 bg-blue-50 border-blue-200';
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    categoryAmharic = 'መደበኛ እና ጤናማ ክብደት';
    categoryEnglish = 'Normal / Healthy Weight';
    colorClass = 'text-emerald-600 bg-emerald-50 border-emerald-200';
  } else if (bmi >= 25.0 && bmi <= 29.9) {
    categoryAmharic = 'መጠነኛ ተጨማሪ ክብደት (Overweight)';
    categoryEnglish = 'Overweight';
    colorClass = 'text-amber-600 bg-amber-50 border-amber-200';
  } else {
    categoryAmharic = 'ከፍተኛ ተጨማሪ ክብደት (Obesity)';
    categoryEnglish = 'Obesity Range';
    colorClass = 'text-rose-600 bg-rose-50 border-rose-200';
  }

  const healthyWeightMinKg = Math.round(18.5 * heightM * heightM * 10) / 10;
  const healthyWeightMaxKg = Math.round(24.9 * heightM * heightM * 10) / 10;

  const weightDifferenceKg = Math.round(Math.abs(currentWeightKg - targetWeightKg) * 10) / 10;

  // Calculate progress percentage toward goal
  let progressPercent = 0;
  if (startingWeightKg !== targetWeightKg) {
    const totalDistance = Math.abs(startingWeightKg - targetWeightKg);
    const coveredDistance = Math.abs(startingWeightKg - currentWeightKg);
    progressPercent = Math.min(100, Math.max(0, Math.round((coveredDistance / totalDistance) * 100)));
  } else {
    progressPercent = 100;
  }

  return {
    bmi,
    categoryAmharic,
    categoryEnglish,
    colorClass,
    healthyWeightMinKg,
    healthyWeightMaxKg,
    weightDifferenceKg,
    progressPercent,
    disclaimerAmharic: 'አስፈላጊ ማስታወሻ፦ BMI የጤና መመርመሪያ (Screening indicator) እንጂ የሕክምና ምርመራ አይደለም። የጡንቻን፣ የአጥንትን እና የውሃ ይዘት ልዩነቶችን ከግምት ውስጥ አያስገባም።',
    disclaimerEnglish: 'Important Note: BMI is a general screening indicator, not a definitive medical diagnosis. It does not distinguish muscle mass from fat tissue.'
  };
}

export function calculateDailyCalorieTarget(
  weightKg: number,
  heightCm: number,
  age: number,
  sex: 'male' | 'female',
  activityLevel: string,
  goal: string
): number {
  // Mifflin-St Jeor formula
  let bmr = 10 * weightKg + 6.25 * heightCm - 5 * age;
  if (sex === 'male') {
    bmr += 5;
  } else {
    bmr -= 161;
  }

  let activityMultiplier = 1.2;
  if (activityLevel === 'lightly_active') activityMultiplier = 1.375;
  else if (activityLevel === 'moderately_active') activityMultiplier = 1.55;
  else if (activityLevel === 'very_active') activityMultiplier = 1.725;

  const tdee = bmr * activityMultiplier;

  if (goal === 'weight_loss') {
    return Math.round(tdee - 450); // safe 450-500 kcal deficit
  } else if (goal === 'muscle_development') {
    return Math.round(tdee + 300);
  }
  return Math.round(tdee);
}
