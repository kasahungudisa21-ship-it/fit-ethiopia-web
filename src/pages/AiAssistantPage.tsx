import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Bot, 
  Send, 
  Sparkles, 
  ShieldAlert, 
  User, 
  Dumbbell, 
  Utensils, 
  Heart, 
  RotateCcw,
  HelpCircle
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  textAmharic: string;
  textEnglish: string;
  timestamp: string;
}

export const AiAssistantPage: React.FC = () => {
  const { language, user, foods, weeklyWorkoutsCompleted } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      textAmharic: `ሰላም ${user.name}! እኔ የFit Ethiopia የአካል ብቃት እና የምግብ ረዳት AI ነኝ። 

ዛሬ ስለሚመገቡት ምግብ፣ ስለ 4-ቀን እንቅስቃሴ ፕሮግራምዎ ወይም ስለ ጤናማ ልምዶች ማንኛውንም ጥያቄ በአማርኛ መጠየቅ ይችላሉ!`,
      textEnglish: `Hello ${user.name}! I am your Fit Ethiopia AI Fitness and Nutrition Coach. 

Ask me anything about healthy Ethiopian meals, daily workouts, or habit adjustments!`,
      timestamp: '10:00 AM'
    }
  ]);

  const quickQuestions = [
    { textAm: 'ዛሬ ምን እብላ?', textEn: 'What should I eat today?' },
    { textAm: 'ለክብደት መቀነስ ምን አይነት ምግብ እመርጥ?', textEn: 'Which foods are best for weight loss?' },
    { textAm: 'ዛሬ ምን እንቅስቃሴ ላድርግ?', textEn: 'What workout should I do today?' },
    { textAm: 'ሽሮ ስንት ካሎሪ አለው?', textEn: 'How many calories are in Shiro?' },
    { textAm: 'በቤት ውስጥ 30 ደቂቃ የማደርገው ልምምድ ስጠኝ።', textEn: 'Give me a 30-minute home workout.' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateAiResponse = (query: string): { am: string; en: string } => {
    const q = query.toLowerCase();

    if (q.includes('ምን እብላ') || q.includes('eat today')) {
      return {
        am: `ለዛሬው ቀን የሚከተለውን የተመጣጠነ የኢትዮጵያ ምግብ እቅድ እመክርዎታለሁ፦

• **ቁርስ፦** 2 የተቀቀለ እንቁላል ከ1 ሲኒ ንጹህ ቡና (ያለ ስኳር) እና ጥቂት ፍራፍሬ (~190 kcal)።
• **ምሳ፦** 1 የጤፍ እንጀራ በሽንብራ ሽሮ ወጥ እና በበሰለ ጎመን ወይም ሰላጣ ታጅቦ (~450 kcal)።
• **መክሰስ፦** 1/2 ኩባያ የተቀቀለ ሽንብራ ወይም 1 ፍሬ ሙዝ (~130 kcal)።
• **እራት፦** ቀለል ያለ ምስር ወጥ ወይም የዓሳ ጥብስ ከግማሽ እንጀራ ወይም አትክልት ጋር (~350 kcal)።

ይህ እቅድ ከፍተኛ ፕሮቲንና ፋይበር ያለው ሲሆን ለረጅም ሰዓት የጥጋብ ስሜት ይሰጥዎታል!`,
        en: `Here is a balanced Ethiopian meal plan for today:

• Breakfast: 2 boiled eggs with black coffee and fruit (~190 kcal).
• Lunch: 1 teff injera with shiro wat and steamed gomen (~450 kcal).
• Snack: 1/2 cup boiled chickpeas or 1 fresh fruit (~130 kcal).
• Dinner: Mild misir wat or grilled fish with half injera and greens (~350 kcal).`
      };
    }

    if (q.includes('ክብደት መቀነስ') || q.includes('weight loss') || q.includes('እመርጥ')) {
      return {
        am: `ለዘላቂ ክብደት መቀነስ የሚከተሉትን መርሆዎች እንዲከተሉ እመክራለሁ፦

1. **ከፍተኛ ፋይበር ያላቸውን ምግቦች ይምረጡ፦** ምስር፣ ሽሮ፣ ጤፍ፣ ሽንብራ እና አትክልቶች (ጎመን፣ ጥቅል ጎመን) ሆድዎን ሳይራቡ እንዲጠግቡ ያደርጋሉ።
2. **ዘይት እና ቅቤን በመጠኑ ያድርጉ፦** ወጦች በሚሰሩበት ወቅት የሚጨመረውን የዘይት መጠን በትንሹ መቀነስ ካሎሪን በእጅጉ ይቀንሳል።
3. **ከስኳር እና ከተጣፈጡ መጠጦች ይቆጠቡ፦** በምትኩ ንጹህ ውሃ እና ቡና (ያለ ስኳር) ይጠጡ።
4. **የተመጣጠነ የእጅ መዳፍ መጠን፦** በአንድ ጊዜ ከልክ በላይ ሳይሆን በመጠነኛ ሰሃን መመገብን ልምድ ያድርጉ።`,
        en: `For sustainable fat loss, focus on fiber-dense legumes (Misir, Shiro, Chickpeas), moderate the cooking oil in wots, choose pure teff injera, and hydrate consistently with water.`
      };
    }

    if (q.includes('ምን እንቅስቃሴ') || q.includes('work today') || q.includes('workout should i do')) {
      return {
        am: `የእርስዎ የሳምንት ሁኔታ፦ ${weeklyWorkoutsCompleted}/4 ልምምዶች ተጠናቀዋል!

ለዛሬው እንቅስቃሴ፦
• **ቀን 1 ወይም ቀን 3፦** የሰውነት ክብደት ስኳት (Squats)፣ ፑሽ አፕ (ግድግዳ ላይ)፣ ግሉት ብሪጅ (Glute Bridge) እና የ30 ደቂቃ ፈጣን የእግር ጉዞ።
• ከልምምድ በፊት 5 ደቂቃ ማሞቅና ማቀዝቀዝን አይርሱ።
• በቂ ውሃ መጠጣትዎን ያረጋግጡ!`,
        en: `Based on your weekly activity status (${weeklyWorkoutsCompleted}/4), try 3 sets of bodyweight squats, wall push-ups, glute bridges, and a 20-minute brisk walk.`
      };
    }

    if (q.includes('ሽሮ') || q.includes('shiro')) {
      return {
        am: `1 ኩባያ (Cup) ሽሮ ወጥ በአማካይ **285 ካሎሪ (kcal)** ይዟል፦

• **ፕሮቲን፦** 12 ግራም (ድንቅ የዕፅዋት ፕሮቲን!)
• **ካርቦሃይድሬት፦** 38 ግራም
• **ቅባት፦** 9 ግራም (እንደ ዘይቱ መጠን ይለያያል)
• **ፋይበር፦** 9 ግራም (በጣም ከፍተኛ!)

ሽሮ ለክብደት መቀነሻ በጣም ተስማሚና ረጅም ሰዓት የሚያጠግብ ምግብ ነው። ዘይቱ በመጠኑ ከተደረገ የጤናማ አመጋገብ ቁልፍ አካል ነው።`,
        en: `1 cup of standard Shiro wat contains approximately 285 calories, 12g protein, 38g carbs, 9g fat, and 9g fiber. High in prebiotic satiety!`
      };
    }

    if (q.includes('30 ደቂቃ') || q.includes('ቤት ውስጥ') || q.includes('home workout')) {
      return {
        am: `በቤት ውስጥ የሚሰራ ፈጣን የ30 ደቂቃ የእንቅስቃሴ ፕሮግራም፦

1. **ሞቅታ (5 ደቂቃ)፦** በቦታው ላይ መራመድ እና እጅን ማወዛወዝ።
2. **ስኳት (Bodyweight Squats)፦** 3 ዙር × 12 ድግግሞሽ (ለጭንና ዳሌ ጥንካሬ)።
3. **ግድግዳ ፑሽ አፕ (Wall Push-ups)፦** 3 ዙር × 10 ድግግሞሽ (ለደረትና ክንድ)።
4. **ግሉት ብሪጅ (Glute Bridge)፦** 3 ዙር × 12 ድግግሞሽ (ለወገብና ጀርባ)።
5. **በቦታው ፈጣን እርምጃ (High Knees)፦** 5 ደቂቃ የካርዲዮ ንቃት።
6. **ማቀዝቀዝ (5 ደቂቃ)፦** ጥልቅ አተነፋፈስና የጡንቻዎች መወጠር።

ምንም አይነት ልዩ መሣሪያ አያስፈልግዎትም!`,
        en: `Quick 30-Minute Equipment-free Home Workout:
1. Warm-up marching (5 min)
2. Bodyweight squats: 3 sets of 12
3. Incline/wall push-ups: 3 sets of 10
4. Glute bridges: 3 sets of 12
5. High knee brisk marching (5 min)
6. Cool-down & stretching (5 min).`
      };
    }

    // Default friendly response
    return {
      am: `ጥያቄዎ በጣም ጥሩ ነው! ${user.name}፣ እንደ እርስዎ ግብ (${user.goal === 'weight_loss' ? 'ክብደት መቀነስ' : 'ጤናማ አኗኗር'})፣ ዋናው መፍትሔ በየቀኑ በትንሹ መጓዝ፣ የተመጣጠነ የኢትዮጵያ ምግብ መመገብ እና በቂ ውሃ መጠጣት ነው። 

ስለ አንድ የተለየ ምግብ ካሎሪ (እንደ እንጀራ፣ ምስር፣ ዶሮ ወይም ዳቦ) ወይም ስለ እንቅስቃሴ ዝርዝር የበለጠ መጠየቅ ይችላሉ!`,
      en: `Great question! Staying mindful of your goal, consistency in eating whole foods and hydrating daily creates lasting results.`
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      textAmharic: text,
      textEnglish: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateAiResponse(text);
      const aiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        textAmharic: response.am,
        textEnglish: response.en,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="space-y-6 pb-16 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'am' ? 'የአማርኛ AI ረዳት' : 'AI Health & Food Assistant'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {language === 'am' ? 'የግል የአካል ብቃትና ምግብ ረዳት' : 'Personal AI Fitness Assistant'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {language === 'am'
              ? 'ስለ አመጋገብ፣ ካሎሪና እንቅስቃሴ ጥያቄዎችን ይጠይቁ፤ ለግል መገለጫዎ የተበጁ ምክሮችን ያግኙ።'
              : 'Ask questions in Amharic or English tailored to your biometric profile and progress.'}
          </p>
        </div>
      </div>

      {/* Suggested Quick Question Chips (Requirement 15) */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
        <span className="text-[11px] font-bold uppercase text-slate-600 tracking-wider flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
          <span>{language === 'am' ? 'ተደጋጋሚ ጥያቄዎች (ጠቅ አድርገው ይጠይቁ)፦' : 'Quick Prompt Starters:'}</span>
        </span>
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(q.textAm)}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 text-xs font-bold text-slate-700 hover:text-emerald-800 transition shadow-2xs text-left"
            >
              💬 {language === 'am' ? q.textAm : q.textEn}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card flex flex-col h-[520px] overflow-hidden">
        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => {
            const isMe = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    isMe
                      ? 'bg-slate-900 text-white'
                      : 'bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-xs'
                  }`}
                >
                  {isMe ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    isMe
                      ? 'bg-slate-900 text-white rounded-tr-none'
                      : 'bg-slate-50 border border-slate-200/80 text-slate-800 rounded-tl-none whitespace-pre-line'
                  }`}
                >
                  {language === 'am' ? msg.textAmharic : msg.textEnglish}
                  <span className={`block text-[10px] mt-1.5 text-right ${isMe ? 'text-slate-400' : 'text-slate-600'}`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-400 italic">
              <Bot className="w-4 h-4 text-emerald-600 animate-spin" />
              <span>{language === 'am' ? 'AI ረዳቱ በማሰብ ላይ ነው...' : 'AI is typing...'}</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
          className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={language === 'am' ? 'ጥያቄዎን በአማርኛ እዚህ ይጻፉ...' : 'Type your question in Amharic or English...'}
            className="flex-1 px-4 py-3 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm font-medium bg-white"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim()}
            className="p-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white transition shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Safety Medical Disclaimer (Requirement 15) */}
      <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          {language === 'am'
            ? 'ማስታወሻ፦ ይህ AI ረዳት ለአጠቃላይ የጤና፣ የአመጋገብ እና የእንቅስቃሴ መረጃ ብቻ ነው። በሽታዎችን አይመረምርም ወይም የሐኪም/የዲያቲሺያን ምክርን አይተካም።'
            : 'Safety Note: This AI assistant is for general educational lifestyle guidance only and does not diagnose disease or replace qualified healthcare consultations.'}
        </p>
      </div>
    </div>
  );
};
