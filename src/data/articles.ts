import { EducationalArticle } from '../types';

export const EDUCATIONAL_ARTICLES: EducationalArticle[] = [
  // 1. Weight Management
  {
    id: 'art-weight-basics',
    category: 'weight_management',
    titleAmharic: 'ጤናማ የክብደት አያያዝ ምንድን ነው?',
    titleEnglish: 'What is Sustainable Weight Management?',
    summaryAmharic: 'ፈጣን እና አስጨናቂ አመጋገብ ሳይሆን ዘላቂ እና ጤናማ የአኗኗር ዘይቤን የመገንባት መሠረታዊ መርሆዎች።',
    summaryEnglish: 'The core science of gradual, healthy fat loss without starvation diets or metabolic crash.',
    readTimeMinutes: 5,
    contentAmharic: `### ዘላቂ የክብደት አያያዝ መርህ

ብዙ ሰዎች ክብደት መቀነስ ማለት ራስን በረሃብ መቅጣት፣ አንድ አይነት ምግብ ብቻ መመገብ ወይም ከባድ አድካሚ ልምምድ ማድረግ ይመስላቸዋል። ነገር ግን ይህ አካሄድ ዘላቂነት የለውም፤ ብዙም ሳይቆይ ሰውነት ክብደቱን መልሶ እንዲጨምር ያደርጋል።

#### 1. የካሎሪ ሚዛን (Energy Balance)
ክብደት መቀነስ የሚጀምረው ሰውነታችን ከሚጠቀመው ኃይል በትንሹ ያነሰ ካሎሪ ስንመገብ ነው። ይህ ማለት ግን መራብ አለብን ማለት አይደለም። ከፍተኛ ፋይበር እና ፕሮቲን ያላቸውን ምግቦች (እንደ ሽሮ፣ ምስር፣ አትክልት እና እንቁላል) በመመገብ ጠግበን ካሎሪ መቀነስ እንችላለን።

#### 2. የክብደት መጠን ለውጥ ፍጥነት
በሳምንት ከ0.5 እስከ 1 ኪሎ ግራም መቀነስ ጤናማ እና ዘላቂ ነው። ከዚህ በላይ በፍጥነት የሚቀንስ ክብደት አብዛኛውን ጊዜ የውሃ እና የጡንቻ መጠን እንጂ የስብ መቀነስ አይደለም።

#### 3. ትኩረት በልምዶች ላይ እንጂ በሚዛን ቁጥር ላይ ብቻ አይደለም
ሚዛን በየቀኑ በውሃ መጠን፣ በጨው እና በሆድ ሁኔታ ምክንያት ሊለዋወጥ ይችላል። ዋናው ቁምነገር በየቀኑ የምናደርገው እንቅስቃሴ፣ የምንጠጣው ውሃ እና የምንመርጠው የተመጣጠነ ምግብ ነው።`,
    contentEnglish: `Sustainable weight management focuses on small, consistent behavioral adjustments rather than extreme restriction.`
  },
  {
    id: 'art-portion-control',
    category: 'weight_management',
    titleAmharic: 'የምግብ መጠን ቁጥጥር (Portion Control) በቀላሉ',
    titleEnglish: 'Practical Portion Control for Everyday Meals',
    summaryAmharic: 'ሳይራቡና የምግብ ሚዛን መሣሪያ ሳያስፈልግ የእጅ መዳፍን በመጠቀም የምግብ መጠንን ማስተካከል የሚቻልበት መንገድ።',
    summaryEnglish: 'How to use your hand as a practical portion guide without obsessive food weighing.',
    readTimeMinutes: 4,
    contentAmharic: `### የእጅ መዳፍ የምግብ መለኪያ መመሪያ

የምግብ ሚዛን ይዞ መዞር አድካሚ ሊሆን ይችላል። ነገር ግን የእርስዎ እጅ ሁልጊዜ ከእርስዎ ጋር አለ!

* **የእጅ መዳፍ ስፋት (Palm)፦** ለፕሮቲን ምግቦች (እንደ የበሰለ ዶሮ፣ ዓሳ፣ እንቁላል፣ አይብ ወይም ምስር)።
* **የተጨበጠ ቡጢ (Fist)፦** ለአትክልቶችና ሰላጣዎች (ጎመን፣ ጥቅል ጎመን፣ ካሮት)።
* **የታጠፈ መዳፍ (Cupped Hand)፦** ለካርቦሃይድሬት (እንደ ሩዝ፣ ድንች፣ በሶ ወይም የጤፍ እንጀራ ቁራጭ)።
* **የአውራ ጣት መጠን (Thumb)፦** ለጤናማ ቅባቶች (ዘይት፣ ቅቤ፣ ለውዝ)።

ይህ ቀላል ዘዴ ከመጠን በላይ የመመገብ አደጋን በመቀነስ የረጅም ጊዜ ጤናማ ልምድ ለመገንባት ይረዳል።`,
    contentEnglish: `Use your palm for protein, cupped hand for complex carbs, fist for vegetables, and thumb for healthy fats.`
  },
  {
    id: 'art-weight-myths',
    category: 'weight_management',
    titleAmharic: 'ስለ ክብደት መቀነስ የሚወሩ የተሳሳቱ አመለካከቶች (Myths)',
    titleEnglish: 'Debunking Common Weight Loss Myths',
    summaryAmharic: '“እንጀራ ያወፍራል?”፣ “ከምሽቱ 12 ሰዓት በኋላ መብላት ያስወፍራል?” እና ሌሎች እውነታዎች።',
    summaryEnglish: 'Separating cultural folklore from nutritional facts regarding Ethiopian staples and timing.',
    readTimeMinutes: 6,
    contentAmharic: `### የተሳሳቱ አመለካከቶች እና እውነታዎች

#### ተረት 1፦ “የጤፍ እንጀራ ያወፍራል፤ ጨርሶ መቆም አለበት!”
**እውነታ፦** እንጀራ በራሱ አያወፍርም! ጤፍ ከፍተኛ ፋይበር፣ ብረት እና ቀስ ብለው የሚፈጩ ውስብስብ ካርቦሃይድሬቶችን የያዘ ድንቅ እህል ነው። የሚያወፍረው ከእንጀራው ጋር የሚበላው ከመጠን በላይ ዘይትና ቅቤ የበዛበት ወጥ ወይም ከአቅም በላይ በርካታ እንጀራዎችን በአንድ ጊዜ መመገብ ነው።

#### ተረት 2፦ “ስብ የሚያቀልጡ ልዩ ሻዮችና መጠጦች አሉ!”
**እውነታ፦** ስብን በቀጥታ የሚያቀልጥ አንድም ተአምረኛ መጠጥ የለም። አብዛኞቹ “የማቅጠኛ ሻዮች” ሰውነት ውሃ እንዲያጣ የሚያደርጉ ንጥረ ነገሮች ብቻ ናቸው። እውነተኛ ስብ የሚቃጠለው በተመጣጠነ አመጋገብና በእንቅስቃሴ ብቻ ነው።

#### ተረት 3፦ “ከምሽቱ 12 ሰዓት በኋላ ከበሉ ወዲያውኑ ወደ ስብ ይቀየራል!”
**እውነታ፦** ሰውነታችን ሰዓት አይመለከትም፤ የሚመለከተው በቀኑ ውስጥ የተመገብነውን አጠቃላይ የካሎሪ መጠን ነው። ሆኖም ከመተኛታችን 2-3 ሰዓት በፊት ቀለል ያለ እራት መመገብ ለጥሩ እንቅልፍ እና ለምግብ መፈጨት እጅግ ይመረጣል።`,
    contentEnglish: `Discover the reality behind carbs, meal timing, and fat burners.`
  },

  // 2. Exercise
  {
    id: 'art-exercise-benefits',
    category: 'exercise',
    titleAmharic: 'የአካል ብቃት እንቅስቃሴ ድንቅ የጤና ጥቅሞች',
    titleEnglish: 'The Transformative Benefits of Regular Exercise',
    summaryAmharic: 'እንቅስቃሴ ለክብደት ብቻ ሳይሆን ለልብ፣ ለአእምሮ ንቃት እና ለስኳር መከላከያ የሚሰጠው ጥቅም።',
    summaryEnglish: 'Physical activity optimizes cardiovascular fitness, mood chemistry, and metabolic resilience.',
    readTimeMinutes: 5,
    contentAmharic: `### እንቅስቃሴ ለምን ያስፈልገናል?

የአካል ብቃት እንቅስቃሴ ማድረግ ክብደት ለመቀነስ ብቻ የሚደረግ ነገር አይደለም፤ የተሟላ የሕይወት ጥራትን የሚያመጣ መሠረት ነው።

1. **የልብ እና የደም ዝውውር ጤና፦** የደም ግፊትን ይቀንሳል፣ የልብ ጡንቻን ያጠነክራል።
2. **የስኳር በሽታ መከላከያ፦** የሰውነት ሴሎች ኢንሱሊን የተባለውን ሆርሞን በአግባቡ እንዲጠቀሙ በማድረግ የስኳር መጠንን ያስተካክላል።
3. **የአእምሮ ጤና እና የደስታ ስሜት፦** እንቅስቃሴ በሚደረግበት ወቅት አንጎላችን 'ኢንዶርፊን' (Endorphins) የተባሉ የደስታ ሆርሞኖችን ያመነጫል፤ ጭንቀትን እና ድብርትን በከፍተኛ ሁኔታ ይቀንሳል።
4. **የአጥንት እና የመገጣጠሚያ ጥንካሬ፦** እንደ ስኳት እና መራመድ ያሉ ልምምዶች የአጥንትን ጥንካሬ በመጠበቅ በእርጅና ወቅት የሚከሰትን ድካም ይከላከላሉ።`,
    contentEnglish: `Consistent activity boosts cardiovascular resilience, mental clarity, and metabolic function.`
  },
  {
    id: 'art-warmup-cooldown',
    category: 'exercise',
    titleAmharic: 'የሞቅታ (Warm-up) እና የማቀዝቀዝ (Cool-down) አስፈላጊነት',
    titleEnglish: 'Why Warm-ups and Cool-downs are Essential',
    summaryAmharic: 'ጉዳትን ለመከላከል እና ለጡንቻዎች ምቾት የሚረዱ ወሳኝ የልምምድ ቅድመ-ሁኔታዎች።',
    summaryEnglish: 'Protecting connective tissues and normalizing blood flow before and after exertion.',
    readTimeMinutes: 4,
    contentAmharic: `### ስፖርት ከመጀመር በፊት እና በኋላ የሚደረጉ ጥንቃቄዎች

#### ሞቅታ (Warm-up) ለምን ያስፈልጋል?
ቀዝቃዛ ላስቲክን ብንወጥረው እንደሚበጠሰው ሁሉ፣ ያልሞቁ ጡንቻዎችም ለድንገተኛ መሸማቀቅና ጉዳት የተጋለጡ ናቸው።
* የሰውነት ሙቀትን ያዘጋጃል።
* የደም ዝውውር ወደ ጡንቻዎች እንዲጨምር ያደርጋል።
* መገጣጠሚያዎች እንዳይቆስሉ ቅባት እንዲያመነጩ ያነቃቃል።
* **ምሳሌ፦** ከ5-8 ደቂቃ ፈጠን ያለ መራመድ፣ እጅን ማወዛወዝ እና ወገብን ማሽከርከር።

#### ማቀዝቀዝ (Cool-down) ለምን ይጠቅማል?
ስፖርቱን በድንገት ማቆም ደም በእግሮች ላይ እንዲረጋጋ እና የማዞር ስሜት እንዲፈጠር ሊያደርግ ይችላል።
* የልብ ምት ወደ ቀድሞ ሁኔታው ቀስ ብሎ እንዲመለስ ያደርጋል።
* በጡንቻዎች ውስጥ የተጠራቀመውን ድካም ያቃልላል።
* **ምሳሌ፦** ቀርፋፋ እርምጃ እና የጭን/የጀርባ ጡንቻዎችን ለ20 ሰከንድ መወጠር።`,
    contentEnglish: `Gentle warm-ups and stretches protect muscles and ensure rapid systemic recovery.`
  },

  // 3. Nutrition
  {
    id: 'art-protein-ethiopia',
    category: 'nutrition',
    titleAmharic: 'በኢትዮጵያ ምግቦች ውስጥ የሚገኙ የፕሮቲን ምንጮች',
    titleEnglish: 'Top Protein Sources in Ethiopian Cuisine',
    summaryAmharic: 'ለጡንቻ ጥንካሬና ለጥጋብ የሚረዱ በቀላሉ የሚገኙ የዕፅዋትና የእንስሳት ፕሮቲኖች።',
    summaryEnglish: 'Discover high-biological value proteins from both traditional fasting dishes and animal sources.',
    readTimeMinutes: 5,
    contentAmharic: `### ፕሮቲን ለምን ያስፈልገናል?

ፕሮቲን የጡንቻዎች ግንባታ ማገዶ፣ የሰውነት ህዋሳት መጠገኛ እና ለረጅም ሰዓት የጥጋብ ስሜት በመስጠት ከመጠን በላይ መብላትን የሚከላከል ቁልፍ ንጥረ-ነገር ነው።

#### 1. የዕፅዋት የፕሮቲን ምንጮች (በፆም ወቅትም ጭምር)
* **ምስር፦** 1 ኩባያ ምስር ወጥ ወደ 14 ግራም ፕሮቲን ያቀርባል።
* **ሽሮ፦** ከሽንብራ ወይም ከባቄላ የሚዘጋጅ በመሆኑ በ1 ኩባያ ውስጥ 12 ግራም ፕሮቲን አለው።
* **ሽንብራ እና ባቄላ (ፉል)፦** ለቁርስ ወይም ለመክሰስ እጅግ በጣም ጥሩ የፕሮቲን እና የፋይበር ምንጮች ናቸው።

#### 2. የእንስሳት የፕሮቲን ምንጮች
* **እንቁላል፦** 1 የተቀቀለ እንቁላል 6.3 ግራም ሙሉ ፕሮቲን ይዟል።
* **የሀበሻ አይብ (የጎጆ አይብ)፦** ዝቅተኛ ቅባትና ከፍተኛ ኬሲን ፕሮቲን አለው።
* **ዓሳ እና ዶሮ፦** ዝቅተኛ ቅባት ያላቸው ምርጥ የጡንቻ ገንቢ ምግቦች ናቸው።`,
    contentEnglish: `Combine lentils, chickpeas, fava beans, eggs, and lean meats to reach optimal daily protein goals.`
  },
  {
    id: 'art-fiber-digestion',
    category: 'nutrition',
    titleAmharic: 'የፋይበር (Fiber) ሚና ለክብደት መቀነስ እና ለሆድ ጤና',
    titleEnglish: 'Fiber: The Unsung Hero of Weight Loss & Gut Health',
    summaryAmharic: 'ፋይበር የሆድ ድርቀትን እንዴት እንደሚከላከል፣ ስኳርን እንደሚያስተካክልና ጥጋብ እንደሚሰጥ።',
    summaryEnglish: 'Learn how soluble and insoluble fibers stabilize blood sugar and foster gut microbiome diversity.',
    readTimeMinutes: 4,
    contentAmharic: `### ፋይበር ምንድን ነው?

ፋይበር ሰውነታችን የማይፈጨው ነገር ግን ለአንጀት ጤና እጅግ ወሳኝ የሆነ የእፅዋት ክፍል ነው።

1. **ረጅም ሰዓት የሚያጠግብ፦** ፋይበር ሆድ ውስጥ ውሃ በመምጠጥ ይሞላል፤ ይህም ቶሎ እንዳይርበን ያደርጋል።
2. **የስኳር መጠንን ያስተካክላል፦** ካርቦሃይድሬት ወደ ደም የሚገባበትን ፍጥነት በማዘግየት የኢንሱሊን መወዛወዝን ይቆጣጠራል።
3. **በኢትዮጵያ ውስጥ ያሉ ምርጥ የፋይበር ምንጮች፦**
   * የጤፍ እንጀራ
   * ጎመን፣ ጥቅል ጎመን እና ካሮት
   * ምስር፣ አተር እና ሽንብራ
   * አቮካዶ፣ ሙዝ እና ብርቱካን
   * በሶ እና ቆሎ`,
    contentEnglish: `Dietary fiber regulates digestion, prevents insulin spikes, and sustains satiety throughout the day.`
  },

  // 4. Lifestyle
  {
    id: 'art-sleep-stress',
    category: 'lifestyle',
    titleAmharic: 'የእንቅልፍ እና የጭንቀት ቁጥጥር ለክብደት መቀነስ',
    titleEnglish: 'Sleep and Stress: The Invisible Weight Loss Levers',
    summaryAmharic: 'እንቅልፍ ማጣት እና ጭንቀት እንዴት የረሃብ ሆርሞኖችን እንደሚያነሳሱ እና ክብደት እንዳይቀንስ እንደሚያደርጉ።',
    summaryEnglish: 'How cortisol and ghrelin undermine healthy weight loss when sleep is cut short.',
    readTimeMinutes: 5,
    contentAmharic: `### እንቅልፍ ሲያጥር ምን ይከሰታል?

በቀን ከ7-8 ሰዓት በቂ እንቅልፍ አለማግኘት በቀጥታ በክብደታችን ላይ ተፅዕኖ ያሳድራል።

1. **የረሃብ ሆርሞን (Ghrelin) ይጨምራል፦** ሰውነታችን ሲደክመው ኃይል ለማግኘት ሲል ጣፋጭ እና የሰባ ምግቦችን እንዲመኝ ያደርጋል።
2. **የጥጋብ ሆርሞን (Leptin) ይቀንሳል፦** ምንም ያህል ብንበላ የጥጋብ ስሜት እንዳይሰማን ያደርጋል።
3. **ኮርቲሶል (Cortisol - የጭንቀት ሆርሞን) ይጨምራል፦** ሰውነታችን በሆድ ዙሪያ ስብ እንዲያከማች ያነሳሳል።

#### ቀላል ምክሮች ለጥሩ እንቅልፍ፦
* ከመተኛትዎ 30 ደቂቃ በፊት ስልክ እና ስክሪን ያጥፉ።
* ምሽት ላይ ቡና እና ሻይ አይጠጡ።
* የመኝታ ክፍልዎ ጸጥ ያለና ጨለማ እንዲሆን ያድርጉ።`,
    contentEnglish: `Quality sleep keeps metabolic and satiety hormones balanced, safeguarding healthy body composition.`
  },
  {
    id: 'art-consistency-motivation',
    category: 'lifestyle',
    titleAmharic: 'ቀጣይነት (Consistency) ከፍጥነት ይበልጣል',
    titleEnglish: 'Why Consistency Always Outperforms Intensity',
    summaryAmharic: 'በሳምንት አንድ ቀን አድካሚ ስፖርት ከማድረግ ይልቅ በየቀኑ የሚደረግ ትንሽ ጥረት ትልቅ ለውጥ የሚያመጣበት ሚስጥር።',
    summaryEnglish: 'The compounding power of daily mini-habits over sporadic perfectionism.',
    readTimeMinutes: 4,
    contentAmharic: `### የትንንሽ እርምጃዎች ኃይል

ብዙ ሰዎች በጉጉት ተነስተው በመጀመሪያው ሳምንት በየቀኑ ለ2 ሰዓት ስፖርት ይሰራሉ፤ ከዚያም በድካም እና በህመም ተስፋ ቆርጠው ያቆማሉ።

ይህ የተሳሳተ አካሄድ ነው። እውነተኛው ለውጥ የሚመጣው፦
* በሳምንት 4 ቀን ለ25-30 ደቂቃ በቋሚነት መንቀሳቀስ።
* በየቀኑ በቂ ውሃ መጠጣት።
* በአንድ ቀን ያልተገባ ምግብ ብንበላ እንኳን ራስን ባለመውቀስ በሚቀጥለው ምግብ ላይ ወደ ጤናማው መንገድ መመለስ።

ፍጹም መሆን አይጠበቅብዎትም፤ በየቀኑ አንድ እርምጃ ወደ ፊት መራመድ ብቻ በቂ ነው!`,
    contentEnglish: `Small daily habits compound into profound lifetime health transformations.`
  }
];
