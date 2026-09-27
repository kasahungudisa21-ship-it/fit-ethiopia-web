import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Download, 
  Smartphone, 
  Share2, 
  PlusSquare, 
  Check, 
  X, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const InstallAppModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { language } = useApp();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Detect if already installed / running in standalone mode
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      setIsStandalone(true);
    }

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isAppleDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isAppleDevice);

    // Listen for Chrome/Android install prompt
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
      onClose();
    }
    setDeferredPrompt(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 animate-scaleUp">
        {/* Header */}
        <div className="flex justify-between items-start pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/30">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900">
                {language === 'am' ? 'መተግበሪያውን ስልክዎ ላይ ይጫኑ' : 'Install Fit Ethiopia App'}
              </h3>
              <span className="text-xs text-emerald-700 font-semibold">
                {language === 'am' ? 'ለAndroid እና iPhone ተስማሚ' : 'Available for Android & iPhone'}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status: Already running in standalone */}
        {isStandalone ? (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
              <Check className="w-5 h-5 stroke-[3]" />
            </div>
            <h4 className="font-bold text-sm text-emerald-950">
              {language === 'am' ? 'መተግበሪያው በስልክዎ ላይ ተጭኗል!' : 'App is already installed!'}
            </h4>
            <p className="text-xs text-emerald-800/80">
              {language === 'am'
                ? 'አሁን በሙሉ ስክሪን ሁነታ ከመነሻ ገጽዎ በቀጥታ እየተጠቀሙ ነው።'
                : 'You are currently using Fit Ethiopia in standalone native app mode.'}
            </p>
          </div>
        ) : isIOS ? (
          /* iOS Safari Specific Instructions */
          <div className="space-y-4">
            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
              <span className="font-bold block mb-1">
                {language === 'am' ? '📱 በiPhone / iPad ላይ ለመጫን፦' : '📱 On iPhone / iPad (Safari):'}
              </span>
              {language === 'am'
                ? 'በSafari ብሮውዘር ውስጥ የሚከተሉትን 3 ቀላል እርምጃዎች ይከተሉ፦'
                : 'Follow these 3 quick steps in Safari:'}
            </div>

            <ol className="space-y-3 text-xs text-slate-700">
              <li className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-black flex items-center justify-center shrink-0">
                  1
                </span>
                <div>
                  <span className="font-bold block">
                    {language === 'am' ? 'የማጋሪያ ምልክቱን (Share Button) ይጫኑ' : 'Tap the Share Button'}
                  </span>
                  <span className="text-slate-500 flex items-center gap-1 mt-0.5">
                    <Share2 className="w-3.5 h-3.5 text-blue-600" />
                    {language === 'am' ? 'በስክሪኑ ታችኛው ክፍል ላይ የሚገኘውን ሳጥንና ቀስት' : 'Square with arrow pointing up'}
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-black flex items-center justify-center shrink-0">
                  2
                </span>
                <div>
                  <span className="font-bold block">
                    {language === 'am' ? '“ወደ መነሻ ገጽ ጨምር” (Add to Home Screen) ይምረጡ' : 'Select "Add to Home Screen"'}
                  </span>
                  <span className="text-slate-500 flex items-center gap-1 mt-0.5">
                    <PlusSquare className="w-3.5 h-3.5 text-emerald-600" />
                    {language === 'am' ? 'ዝርዝሩን ወደ ታች በማንሸራተት ያገኙታል' : 'Scroll down to find Add to Home Screen'}
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-black flex items-center justify-center shrink-0">
                  3
                </span>
                <div>
                  <span className="font-bold block">
                    {language === 'am' ? '“ጨምር” (Add) የሚለውን ይጫኑ' : 'Tap "Add" in top-right'}
                  </span>
                  <span className="text-slate-500 mt-0.5 block">
                    {language === 'am' ? 'መተግበሪያው እንደ ማናቸውም ስልክ አፕ ሆኖ ይቀመጣል!' : 'The app icon will appear on your phone home screen!'}
                  </span>
                </div>
              </li>
            </ol>
          </div>
        ) : (
          /* Android / Desktop Chrome PWA Install */
          <div className="space-y-4">
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'am'
                ? 'Fit Ethiopiaን በቀጥታ በስልክዎ ላይ በመጫን ያለ ኢንተርኔት (Offline)፣ ፈጣን እና ልክ እንደ Play Store መተግበሪያ ይጠቀሙ።'
                : 'Install Fit Ethiopia directly onto your home screen for instant loading, full offline capabilities, and a full-screen app experience.'}
            </p>

            {deferredPrompt ? (
              <button
                onClick={handleInstallClick}
                className="w-full py-3.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
              >
                <Download className="w-5 h-5" />
                <span>{language === 'am' ? 'አሁን ስልክዎ ላይ ይጫኑ (Install App)' : 'Install App Now'}</span>
              </button>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
                <span className="font-bold block text-slate-900">
                  {language === 'am' ? 'በChrome ወይም Samsung Internet ላይ፦' : 'On Chrome or Browser Menu:'}
                </span>
                <p>
                  {language === 'am'
                    ? 'የብሮውዘሩን 3 ነጥቦች (⋮) ተጭነው “Install app” ወይም “Add to Home screen” (ወደ መነሻ ገጽ ጨምር) የሚለውን ይምረጡ።'
                    : 'Tap the 3 dots menu (⋮) in your browser and choose "Install app" or "Add to Home screen".'}
                </p>
              </div>
            )}

            {/* Android APK Build notice for developers */}
            <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-[11px] text-purple-900 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">
                  {language === 'am' ? 'Capacitor Native Android APK ድጋፍ፦' : 'Capacitor Android APK Ready:'}
                </span>
                <span>
                  {language === 'am'
                    ? 'ይህ ፕሮጀክት ወደ Android Studio ተቀይሮ ቀጥተኛ `.apk` ፋይል ለማውጣት በሚያስችል መልኩ በCapacitor ተዋቅሯል!'
                    : 'Configured with @capacitor/android so you can build standalone .apk files with Android Studio.'}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
          >
            {language === 'am' ? 'ዝጋ' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
