# Fit Ethiopia | የጤና እና አካል ብቃት መመሪያ

A modern, professional, mobile-friendly health and fitness web application designed specifically for Ethiopian users seeking to lose excess weight, build physical activity habits, improve nutritional choices, and develop a sustainable lifestyle.

---

## 🌟 Key Features

1. **Bilingual Support (አማርኛ & English)**:
   - Amharic as the primary language with full Ge'ez typography support (`Noto Sans Ethiopic`).
   - Seamless one-click English toggle for global accessibility.

2. **Hero & Welcome Experience**:
   - Hero: *"የተሻለ አካል፣ የተሻለ ጤና፣ የተሻለ ሕይወት"*
   - Subtitle: *"በቀላል የእንቅስቃሴ ፕሮግራም፣ በተመጣጠነ አመጋገብ እና በየቀኑ ጤናማ ልምዶች ወደ ተሻለ ጤና ይጓዙ።"*
   - Interactive instant BMI screening tool for visitors.

3. **User Registration & Profile**:
   - Biometric inputs: Name, Email, Age, Sex, Height (cm), Weight (kg), Target Weight (kg), Activity Level, Fitness Experience, and Goal.
   - Real-time calculations: BMI, BMI Category, Estimated Healthy Weight Range, Difference from Target, and Progress Percentage.
   - Prominent disclaimer: *BMI is presented as a screening indicator, not a definitive medical diagnosis.*

4. **Personal Weight-Loss Dashboard (“የእኔ እድገት”)**:
   - Starting Weight (85 kg) → Current Weight (80 kg) → Target Weight (70 kg).
   - Progress bar (`████████░░ 50%`).
   - Weekly activity tracker (4/4 days completion indicator).
   - Daily water goal tracker (e.g. 1.5 L / 2.0 L - 75%).
   - Daily macronutrients aggregate (Calories, Protein, Carbs, Fat, Fiber).
   - Weekly habit consistency metrics.

5. **4-Day-a-Week Structured Fitness Program**:
   - **Day 1**: Full Body (Warm-up, Bodyweight Squat, Wall/Incline Push-up, Glute Bridge, Walking, Cool-down).
   - **Day 2**: Cardio + Core (Brisk walking, High-knee Marching, Step-ups, Plank, Stretching).
   - **Day 3**: Lower Body + Full Body (Squat with pause, Reverse lunge, Calf raise, Glute bridge hold, Cool-down).
   - **Day 4**: Cardio + Strength (Interval brisk walk, Rhythmic step-ups, Doorframe row, Standing crunch, Weekly completion stretch).
   - Days 5, 6, 7 dedicated to active recovery and restorative walking.
   - Adaptable for Beginner / Intermediate / Advanced and Home / Gym / No Equipment / Light Gear.
   - Detailed modal for each exercise with sets, reps, duration, rest times, and safety cues.

6. **Amharic Food Analyzer (“የምግብ ትንተና”)**:
   - Instant search/selection of Ethiopian foods in Amharic (ሽሮ፣ እንጀራ፣ ዳቦ፣ ሩዝ፣ ምስር፣ በቆሎ፣ ድንች፣ እንቁላል፣ ዶሮ፣ ዓሳ፣ ሥጋ፣ አቮካዶ፣ ሙዝ፣ ወተት፣ እርጎ፣ ወዘተ).
   - Interactive portion multiplier (½, 1, 1½, 2x).
   - Estimated Calories, Protein, Carbohydrates, Fat, Fiber, Sugar, and Sodium.
   - Practical dietary guidance: *“ይህ ምግብ በተመጣጠነ መጠን የጤናማ አመጋገብ አካል ሊሆን ይችላል።”* (No shaming; foods are not labeled as universally fat-causing or fat-melting).
   - 1-Click logging to today's Food Diary.

7. **Ethiopian Food Database**:
   - Searchable, categorized repository of traditional dishes with serving sizes, ingredients, preparation methods, and nutritional values.
   - Admin CRUD capabilities: administrators can add, update, and remove foods dynamically.

8. **Daily Food Diary**:
   - Categorized meal logs: Breakfast (ቁርስ), Lunch (ምሳ), Dinner (እራት), Snacks & Drinks (መክሰስና መጠጦች).
   - Automated live aggregation of daily calories and macronutrients.

9. **Water Tracker (“የውሃ መጠጫ ክትትል”)**:
   - Visual and ASCII hydration progress bar (`███████░░░ 75%`).
   - Quick +250ml (ብርጭቆ), +500ml (ሃይላንድ), +750ml, +1L logging buttons.
   - Adjustable personal water target.

10. **Activity Tracker**:
    - Record Walking, Running, Cycling, Gym, Home Workouts, Sports, and Stretching.
    - Tracks minutes, estimated calories burned, and weekly streaks with positive reinforcement (*“ይህ ሳምንት 4/4 የእንቅስቃሴ ቀናት ተጠናቋል!”*).

11. **Weight Progress Tracker**:
    - Weekly weight check-ins with an interactive SVG trend line chart (`Date → Weight`).
    - Focuses on long-term trajectories rather than daily water fluctuations.

12. **8 Healthy Habits Checklist**:
    - 30 min activity, eat vegetables/fruits, drink water, adequate sleep, limit processed foods, complete workout, record meals, take recovery time.
    - Weekly 7-day consistency matrix.

13. **Education Center (“የእውቀት ማዕከል”)**:
    - Searchable guides written in simple, friendly Amharic across Weight Management, Exercise, Nutrition, and Lifestyle.

14. **Amharic AI Fitness & Food Assistant**:
    - Interactive assistant understanding and responding in conversational Amharic.
    - Pre-configured prompt shortcuts (*“ዛሬ ምን እብላ?”*, *“ለክብደት መቀነስ ምን አይነት ምግብ እመርጥ?”*, *“ዛሬ ምን እንቅስቃሴ ላድርግ?”*, *“ሽሮ ስንት ካሎሪ አለው?”*, *“በቤት ውስጥ 30 ደቂቃ የማደርገው ልምምድ ስጠኝ።”*).
    - Clear medical disclaimers on every recommendation.

15. **Administrator Dashboard**:
    - Overview metrics, food database management, articles, quotes, user monitoring, and JSON system report export.

16. **Safety & Health Disclaimers**:
    - Prominent top banner, modal warnings, and footer advisory:
      *“ይህ ድረ-ገጽ ለአጠቃላይ የጤና፣ የአመጋገብ እና የእንቅስቃሴ መረጃ ብቻ ነው። የሐኪም፣ የዲያቲሺያን ወይም የሌላ ብቁ የጤና ባለሙያ ምክርን አይተካም። በተለይ የጤና ችግር፣ ጉዳት፣ እርግዝና ወይም ልዩ የሕክምና ሁኔታ ካለ የጤና ባለሙያን ያማክሩ።”*

---

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite 5
- **State & Storage**: React Context API with LocalStorage persistence

---

## 🚀 Running the Application Locally

1. Open PowerShell or Terminal in this folder:
   ```powershell
   cd C:\Users\kasahun\.gemini\antigravity\scratch\fit-ethiopia
   ```

2. Start the development server:
   ```powershell
   npm run dev
   ```

3. Open your browser at:
   ```
   http://localhost:3000
   ```
