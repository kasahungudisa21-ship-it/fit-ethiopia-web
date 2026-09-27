import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldAlert, X, ChevronDown, ChevronUp } from 'lucide-react';

export const HealthDisclaimerBanner: React.FC = () => {
  const { language } = useApp();
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div className="bg-amber-500/10 border-b border-amber-500/20 text-slate-800 text-xs sm:text-sm px-4 py-2 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-start sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-2.5 flex-1">
          <div className="p-1 rounded bg-amber-500/20 text-amber-700 shrink-0 mt-0.5 sm:mt-0">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-amber-900 mr-1.5">
              {language === 'am' ? 'የጤና እና ደህንነት ማሳሰቢያ፦' : 'Health & Safety Disclaimer:'}
            </span>
            {!isMinimized ? (
              <span className="text-slate-700 leading-relaxed">
                {language === 'am'
                  ? 'ይህ ድረ-ገጽ ለአጠቃላይ የጤና፣ የአመጋገብ እና የእንቅስቃሴ መረጃ ብቻ ነው። የሐኪም፣ የዲያቲሺያን ወይም የሌላ ብቁ የጤና ባለሙያ ምክርን አይተካም። በተለይ የጤና ችግር፣ ጉዳት፣ እርግዝና ወይም ልዩ የሕክምና ሁኔታ ካለ የጤና ባለሙያን ያማክሩ።'
                  : 'This website is for general health, nutrition, and exercise information only. It does not replace the advice of a physician, dietitian, or qualified healthcare professional. Consult a healthcare provider if you have any medical condition, injury, pregnancy, or special health conditions.'}
              </span>
            ) : (
              <span className="text-slate-500 italic">
                {language === 'am' ? 'የሕክምና ምክርን አይተካም...' : 'Not a substitute for professional medical advice...'}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 text-slate-500 hover:text-slate-800 hover:bg-amber-500/20 rounded transition"
            title={isMinimized ? 'Expand disclaimer' : 'Minimize disclaimer'}
          >
            {isMinimized ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
