import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FOUR_DAY_WORKOUT_PLAN } from '../data/workoutPlans';
import { Exercise, WorkoutDay, FitnessExperience, WorkoutEnvironment } from '../types';
import { 
  Dumbbell, 
  Flame, 
  Clock, 
  RotateCcw, 
  CheckCircle2, 
  ShieldAlert, 
  Play, 
  Info, 
  Filter, 
  Heart, 
  Check, 
  ChevronRight,
  Smile,
  X
} from 'lucide-react';

export const WorkoutsPage: React.FC = () => {
  const { language, user, addActivityLog, weeklyWorkoutsCompleted, showToast } = useApp();

  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(1);
  const [selectedLevel, setSelectedLevel] = useState<FitnessExperience>(user.fitnessExperience || 'beginner');
  const [selectedEnvironment, setSelectedEnvironment] = useState<WorkoutEnvironment>(user.preferredEnvironment || 'home');
  const [activeModalExercise, setActiveModalExercise] = useState<Exercise | null>(null);

  // Completed exercises set for today's active session
  const [completedExerciseIds, setCompletedExerciseIds] = useState<string[]>([]);
  const [isWorkoutCompleted, setIsWorkoutCompleted] = useState<boolean>(false);

  const currentWorkoutDay: WorkoutDay = FOUR_DAY_WORKOUT_PLAN.find(d => d.dayNumber === selectedDayNumber) || FOUR_DAY_WORKOUT_PLAN[0];

  const handleToggleComplete = (exerciseId: string) => {
    if (completedExerciseIds.includes(exerciseId)) {
      setCompletedExerciseIds(prev => prev.filter(id => id !== exerciseId));
    } else {
      setCompletedExerciseIds(prev => [...prev, exerciseId]);
    }
  };

  const handleFinishDayWorkout = () => {
    addActivityLog({
      type: 'home_workout',
      typeNameAmharic: currentWorkoutDay.titleAmharic,
      durationMinutes: currentWorkoutDay.durationMinutes,
      caloriesBurned: Math.round(currentWorkoutDay.durationMinutes * 5.2),
      date: new Date().toISOString().split('T')[0],
      notes: `${selectedLevel} • ${selectedEnvironment}`
    });
    setIsWorkoutCompleted(true);
    showToast(
      language === 'am' 
        ? `🎉 እንኳን ደስ አለዎት! ${currentWorkoutDay.titleAmharic} ተጠናቋል!` 
        : `🎉 Congratulations! Finished ${currentWorkoutDay.titleEnglish}!`
    );
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md mb-2">
            <Dumbbell className="w-3.5 h-3.5" />
            <span>{language === 'am' ? 'የሳምንት የ4-ቀን የእንቅስቃሴ ፕሮግራም' : '4-Day Weekly Workout Plan'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {language === 'am' ? 'ቀላል፣ ውጤታማ እና የተመጣጠነ ልምምድ' : 'Balanced, Progressive Workouts'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {language === 'am'
              ? 'በሳምንት 4 ቀናት በመንቀሳቀስ የቀሩትን 3 ቀናት ለማገገም እና ለእረፍት እንመድባለን።'
              : '4 structured workout days with 3 active recovery days for joint and muscle restoration.'}
          </p>
        </div>

        {/* Weekly Progress Badge */}
        <div className="bg-emerald-50 border border-emerald-200/80 p-3.5 rounded-2xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black">
            {weeklyWorkoutsCompleted}/4
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase text-emerald-800 tracking-wider block">
              {language === 'am' ? 'የሳምንቱ ስኬት' : 'Weekly Completion'}
            </span>
            <span className="text-xs font-bold text-slate-800">
              {weeklyWorkoutsCompleted >= 4
                ? (language === 'am' ? 'ይህ ሳምንት 4/4 ቀናት ተጠናቋል! 🎉' : '4/4 Days Completed! 🎉')
                : (language === 'am' ? 'ቀጣይነትን አጥብቀው ይቀጥሉ!' : 'Keep up the consistency!')}
            </span>
          </div>
        </div>
      </div>

      {/* Filter / Preference Bar: Level & Environment */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-bold text-slate-700">
            {language === 'am' ? 'የልምምድ ደረጃ፦' : 'Level:'}
          </span>
          <div className="flex gap-1">
            {(['beginner', 'intermediate', 'advanced'] as FitnessExperience[]).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                  selectedLevel === lvl
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {lvl === 'beginner' 
                  ? (language === 'am' ? 'ጀማሪ' : 'Beginner')
                  : lvl === 'intermediate'
                  ? (language === 'am' ? 'መካከለኛ' : 'Intermediate')
                  : (language === 'am' ? 'ከፍተኛ' : 'Advanced')}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700">
            {language === 'am' ? 'ቦታ / ዕቃዎች፦' : 'Location / Equipment:'}
          </span>
          <div className="flex gap-1 flex-wrap">
            {([
              { id: 'home', labelAm: 'ቤት ውስጥ', labelEn: 'Home' },
              { id: 'gym', labelAm: 'ጂም', labelEn: 'Gym' },
              { id: 'no_equipment', labelAm: 'ያለ ዕቃ', labelEn: 'No Gear' },
              { id: 'limited_equipment', labelAm: 'በቀላል ዕቃ', labelEn: 'Light Gear' },
            ] as { id: WorkoutEnvironment; labelAm: string; labelEn: string }[]).map((env) => (
              <button
                key={env.id}
                onClick={() => setSelectedEnvironment(env.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                  selectedEnvironment === env.id
                    ? 'bg-slate-900 text-white font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {language === 'am' ? env.labelAm : env.labelEn}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4 Days Selector Tabs + Recovery Days info */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {FOUR_DAY_WORKOUT_PLAN.map((day) => {
          const isSelected = selectedDayNumber === day.dayNumber;
          return (
            <button
              key={day.dayNumber}
              onClick={() => {
                setSelectedDayNumber(day.dayNumber);
                setIsWorkoutCompleted(false);
              }}
              className={`p-4 rounded-2xl text-left border transition-all ${
                isSelected
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20'
                  : 'bg-white text-slate-800 border-slate-200 hover:border-emerald-300 shadow-2xs'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className={`text-[10px] uppercase font-extrabold tracking-wider ${isSelected ? 'text-emerald-100' : 'text-emerald-700'}`}>
                  {language === 'am' ? `ቀን ${day.dayNumber}` : `Day ${day.dayNumber}`}
                </span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${isSelected ? 'bg-white/20' : 'bg-slate-100 text-slate-600'}`}>
                  {day.durationMinutes} min
                </span>
              </div>
              <h3 className="font-bold text-sm leading-snug">
                {language === 'am' ? day.titleAmharic.split('—')[1] : day.titleEnglish.split('—')[1]}
              </h3>
            </button>
          );
        })}
      </div>

      {/* Current Selected Day Workout Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              {language === 'am' ? currentWorkoutDay.titleAmharic : currentWorkoutDay.titleEnglish}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-800 font-medium mt-1">
              🎯 {language === 'am' ? currentWorkoutDay.focusAmharic : currentWorkoutDay.focusEnglish}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-500">
              {completedExerciseIds.length}/{currentWorkoutDay.exercises.length} {language === 'am' ? 'ተጠናቋል' : 'completed'}
            </span>
            <button
              onClick={handleFinishDayWorkout}
              className={`px-4 py-2 rounded-xl text-xs font-black shadow-sm transition flex items-center gap-1.5 ${
                isWorkoutCompleted
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {isWorkoutCompleted
                  ? (language === 'am' ? 'ልምምዱ ተመዝግቧል ✓' : 'Workout Logged ✓')
                  : (language === 'am' ? 'የዕለቱን ልምምድ ጨርስ' : 'Finish & Log Workout')}
              </span>
            </button>
          </div>
        </div>

        {/* Exercises List */}
        <div className="space-y-4">
          {currentWorkoutDay.exercises.map((exercise, index) => {
            const isCompleted = completedExerciseIds.includes(exercise.id);
            return (
              <div
                key={exercise.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                  isCompleted
                    ? 'bg-emerald-50/50 border-emerald-300 text-slate-700'
                    : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 text-slate-900'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  {/* Left: Number + Details */}
                  <div className="flex items-start gap-3.5 flex-1">
                    <button
                      onClick={() => handleToggleComplete(exercise.id)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition ${
                        isCompleted
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'border-2 border-slate-300 hover:border-emerald-500 text-transparent'
                      }`}
                      title={isCompleted ? 'Mark incomplete' : 'Mark complete'}
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                    </button>

                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-black text-slate-400">#{index + 1}</span>
                        <h4 className={`text-base font-bold ${isCompleted ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                          {language === 'am' ? exercise.nameAmharic : exercise.nameEnglish}
                        </h4>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-200/80 text-slate-700">
                          {exercise.targetMuscles}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {language === 'am' ? exercise.descriptionAmharic : exercise.descriptionEnglish}
                      </p>

                      {/* Reps, Sets, Rest specs */}
                      <div className="flex items-center gap-4 text-xs font-semibold text-slate-700 pt-1">
                        <span className="bg-white px-2.5 py-1 rounded-md border border-slate-200">
                          {exercise.sets} Sets
                        </span>
                        <span className="bg-white px-2.5 py-1 rounded-md border border-slate-200">
                          {exercise.reps}
                        </span>
                        <span className="bg-white px-2.5 py-1 rounded-md border border-slate-200 text-slate-500">
                          {exercise.restSeconds}s {language === 'am' ? 'እረፍት' : 'rest'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Detail button */}
                  <button
                    onClick={() => setActiveModalExercise(exercise)}
                    className="self-end sm:self-center px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-xs font-bold text-slate-700 flex items-center gap-1 shadow-2xs transition"
                  >
                    <Info className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{language === 'am' ? 'ዝርዝር መመሪያ' : 'Instructions'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Rest Days Guidance Box */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-300/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-800 shrink-0">
              <Smile className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-950">
                {language === 'am' ? 'የቀሩት 3 ቀናት፦ የእረፍት እና የማገገሚያ ቀናት' : 'Remaining 3 Days: Active Recovery'}
              </h4>
              <p className="text-xs text-amber-900/80 leading-relaxed mt-0.5">
                {language === 'am'
                  ? 'በእረፍት ቀናት ጡንቻዎች ያድጋሉ፤ ዘና ያለ የእግር ጉዞ ማድረግ፣ በቂ ውሃ መጠጣትና ሰውነትዎን ማፍታታት ይመከራል።'
                  : 'Rest days allow muscle protein synthesis and nervous system reset. Gentle walking and stretching are encouraged.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Exercise Detail Modal */}
      {activeModalExercise && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 animate-scaleUp">
            <div className="flex justify-between items-start pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                  {activeModalExercise.category.toUpperCase()}
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-0.5">
                  {language === 'am' ? activeModalExercise.nameAmharic : activeModalExercise.nameEnglish}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalExercise(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Visual Demonstration Mock Card */}
            <div className="h-44 rounded-2xl bg-gradient-to-tr from-emerald-800 to-teal-700 text-white flex flex-col items-center justify-center p-4 text-center relative overflow-hidden shadow-inner">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-2 backdrop-blur-xs">
                <Dumbbell className="w-8 h-8 text-emerald-200" />
              </div>
              <span className="text-sm font-bold tracking-wide">
                {language === 'am' ? 'የእንቅስቃሴው ምስላዊ ማሳያ' : 'Demonstration Visual'}
              </span>
              <span className="text-[11px] text-emerald-200 mt-0.5">
                {activeModalExercise.targetMuscles}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                  {language === 'am' ? 'የአሰራር ቅደም ተከተል' : 'How to Perform'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {language === 'am' ? activeModalExercise.descriptionAmharic : activeModalExercise.descriptionEnglish}
                </p>
              </div>

              {/* Safety Instructions */}
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block mb-0.5">
                    {language === 'am' ? 'የደህንነት ጥንቃቄ፦' : 'Safety Precaution:'}
                  </span>
                  <span>
                    {language === 'am' ? activeModalExercise.safetyInstructionsAmharic : activeModalExercise.safetyInstructionsEnglish}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveModalExercise(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition"
              >
                {language === 'am' ? 'ተረድቻለሁ / ዝጋ' : 'Got it / Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
