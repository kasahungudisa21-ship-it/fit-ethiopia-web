import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EducationalArticle } from '../types';
import { 
  BookOpen, 
  Search, 
  Clock, 
  ChevronRight, 
  Scale, 
  Dumbbell, 
  Apple, 
  Heart, 
  Sparkles,
  ArrowLeft
} from 'lucide-react';

export const EducationPage: React.FC = () => {
  const { language, articles } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [readingArticle, setReadingArticle] = useState<EducationalArticle | null>(null);

  const categories = [
    { id: 'all', labelAm: 'ሁሉም ጽሑፎች', labelEn: 'All Articles', icon: BookOpen },
    { id: 'weight_management', labelAm: 'የክብደት አያያዝ', labelEn: 'Weight Management', icon: Scale },
    { id: 'exercise', labelAm: 'እንቅስቃሴ እና ስፖርት', labelEn: 'Exercise & Training', icon: Dumbbell },
    { id: 'nutrition', labelAm: 'የተመጣጠነ አመጋገብ', labelEn: 'Nutrition', icon: Apple },
    { id: 'lifestyle', labelAm: 'የአኗኗር ዘይቤና እንቅልፍ', labelEn: 'Lifestyle & Sleep', icon: Heart },
  ];

  const filteredArticles = articles.filter(art => {
    const matchesCat = selectedCategory === 'all' || art.category === selectedCategory;
    const matchesSearch = 
      art.titleAmharic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.titleEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summaryAmharic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{language === 'am' ? 'የእውቀት ማዕከል' : 'Education Center'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {language === 'am' ? 'የጤና እና አካል ብቃት ትምህርታዊ መመሪያ' : 'Health & Nutrition Academy'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {language === 'am'
              ? 'በቀላል እና ግልጽ አማርኛ የተዘጋጁ የክብደት አያያዝ፣ የአካል ብቃት፣ የአመጋገብ እና የአኗኗር መመሪያዎች።'
              : 'Evidence-based guides in accessible Amharic on sustainable fat loss, nutrition, and workout form.'}
          </p>
        </div>
      </div>

      {readingArticle ? (
        /* Single Article In-depth Reader */
        <article className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-card space-y-6 animate-fadeIn">
          <button
            onClick={() => setReadingArticle(null)}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'am' ? 'ወደ ጽሑፎች ዝርዝር ተመለስ' : 'Back to Articles'}</span>
          </button>

          <div className="space-y-2 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
              <span className="uppercase tracking-wider font-extrabold">{readingArticle.category}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {readingArticle.readTimeMinutes} min read
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {language === 'am' ? readingArticle.titleAmharic : readingArticle.titleEnglish}
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              {language === 'am' ? readingArticle.summaryAmharic : readingArticle.summaryEnglish}
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm whitespace-pre-line font-normal">
            {language === 'am' ? readingArticle.contentAmharic : readingArticle.contentEnglish}
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
            <span>Fit Ethiopia • የጤና እና አካል ብቃት መመሪያ</span>
            <button
              onClick={() => setReadingArticle(null)}
              className="text-emerald-700 font-bold hover:underline"
            >
              {language === 'am' ? 'ተጠናቋል ✓' : 'Finished Reading ✓'}
            </button>
          </div>
        </article>
      ) : (
        /* Articles List View */
        <>
          {/* Search & Categories */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'am' ? 'ርዕስ ወይም ቁልፍ ቃል ይፈልጉ (ምሳሌ፦ እንጀራ፣ ካሎሪ፣ ሞቅታ...)' : 'Search articles...'}
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 text-sm font-medium transition"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{language === 'am' ? cat.labelAm : cat.labelEn}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => setReadingArticle(article)}
                className="group cursor-pointer bg-white rounded-3xl p-6 border border-slate-200/80 hover:border-emerald-500 shadow-xs hover:shadow-card transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold">
                    <span className="uppercase tracking-wider text-emerald-700 font-bold">
                      {article.category.replace('_', ' ')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {article.readTimeMinutes} min
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition leading-snug">
                    {language === 'am' ? article.titleAmharic : article.titleEnglish}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {language === 'am' ? article.summaryAmharic : article.summaryEnglish}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                  <span>{language === 'am' ? 'ሙሉ ጽሑፉን አንብብ' : 'Read Full Guide'}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8 text-slate-500 text-xs italic">
              {language === 'am' ? 'የተፈለገው ጽሑፍ አልተገኘም' : 'No articles match your query.'}
            </div>
          )}
        </>
      )}
    </div>
  );
};
