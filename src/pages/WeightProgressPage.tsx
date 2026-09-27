import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { WeightLog } from '../types';
import { 
  TrendingDown, 
  Scale, 
  Plus, 
  Calendar, 
  Heart, 
  Sparkles, 
  Info, 
  ShieldCheck, 
  Award,
  ChevronRight
} from 'lucide-react';

export const WeightProgressPage: React.FC = () => {
  const { language, user, weightLogs, addWeightLog } = useApp();

  const [inputWeight, setInputWeight] = useState<number>(user.weight);
  const [inputDate, setInputDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [inputNote, setInputNote] = useState<string>('');

  const handleAddWeight = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputWeight > 30 && inputWeight < 250) {
      addWeightLog(inputWeight, inputDate, inputNote);
      setInputNote('');
    }
  };

  // Sort logs chronologically for charting
  const sortedLogs = [...weightLogs].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const startingWeight = sortedLogs[0]?.weight || user.startingWeight;
  const currentWeight = sortedLogs[sortedLogs.length - 1]?.weight || user.weight;
  const targetWeight = user.targetWeight;
  const totalChange = Math.round((startingWeight - currentWeight) * 10) / 10;
  const remaining = Math.round(Math.abs(currentWeight - targetWeight) * 10) / 10;

  // Chart calculation (SVG Responsive Line Chart)
  const minW = Math.min(...sortedLogs.map(l => l.weight), targetWeight) - 2;
  const maxW = Math.max(...sortedLogs.map(l => l.weight), startingWeight) + 2;
  const rangeW = maxW - minW || 1;

  const chartWidth = 600;
  const chartHeight = 220;
  const paddingX = 40;
  const paddingY = 30;

  const points = sortedLogs.map((log, index) => {
    const x = paddingX + (index / Math.max(1, sortedLogs.length - 1)) * (chartWidth - paddingX * 2);
    const y = chartHeight - paddingY - ((log.weight - minW) / rangeW) * (chartHeight - paddingY * 2);
    return { x, y, ...log };
  });

  const pathD = points.length > 0 
    ? `M ${points[0].x} ${points[0].y} ` + points.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ')
    : '';

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md mb-2">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>{language === 'am' ? 'የክብደት እድገት ክትትል' : 'Weight Progress'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {language === 'am' ? 'የረጅም ጊዜ የክብደት ጉዞዎን ይከታተሉ' : 'Long-term Weight Progress'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {language === 'am'
              ? 'በየቀኑ በሚከሰት የውሃና የምግብ መወዛወዝ ሳይረበሹ ሳምንታዊውን አጠቃላይ አቅጣጫ ይመልከቱ።'
              : 'Focus on gradual weekly trends rather than temporary daily water fluctuations.'}
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-center">
          <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider block">
            {language === 'am' ? 'እስካሁን የተገኘ ለውጥ' : 'Total Progress'}
          </span>
          <span className="text-2xl font-black text-emerald-700 mt-0.5 block">
            {totalChange > 0 ? `-${totalChange} kg` : `${totalChange} kg`}
          </span>
        </div>
      </div>

      {/* Interactive Visual Line Chart (Requirement 10) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-lg text-slate-900">
              {language === 'am' ? 'የክብደት ለውጥ ግራፍ (Date → Weight)' : 'Weight Trend Line Chart'}
            </h3>
            <span className="text-xs text-slate-500">
              {language === 'am' ? 'የሳምንታዊ ምዝገባዎች ሂደት' : 'Weekly check-in trajectory over time'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block" />
              <span className="text-slate-700">{language === 'am' ? 'የተመዘገበ ክብደት' : 'Logged Weight'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-amber-500 inline-block border-t-2 border-dashed border-amber-500" />
              <span className="text-slate-700">{language === 'am' ? `ግብ፦ ${targetWeight} kg` : `Target: ${targetWeight} kg`}</span>
            </div>
          </div>
        </div>

        {/* SVG Chart */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[500px]">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-56">
              {/* Background grid lines */}
              <line x1={paddingX} y1={paddingY} x2={chartWidth - paddingX} y2={paddingY} stroke="#f1f5f9" strokeWidth="1" />
              <line x1={paddingX} y1={chartHeight / 2} x2={chartWidth - paddingX} y2={chartHeight / 2} stroke="#f1f5f9" strokeWidth="1" />
              <line x1={paddingX} y1={chartHeight - paddingY} x2={chartWidth - paddingX} y2={chartHeight - paddingY} stroke="#f1f5f9" strokeWidth="1" />

              {/* Target weight dashed line */}
              {(() => {
                const targetY = chartHeight - paddingY - ((targetWeight - minW) / rangeW) * (chartHeight - paddingY * 2);
                return (
                  <line
                    x1={paddingX}
                    y1={targetY}
                    x2={chartWidth - paddingX}
                    y2={targetY}
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                );
              })()}

              {/* Shaded Area under Curve */}
              {points.length > 1 && (
                <path
                  d={`${pathD} L ${points[points.length - 1].x} ${chartHeight - paddingY} L ${points[0].x} ${chartHeight - paddingY} Z`}
                  fill="url(#emeraldGradient)"
                  opacity="0.15"
                />
              )}

              {/* Line path */}
              <path
                d={pathD}
                fill="none"
                stroke="#059669"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points */}
              {points.map((pt, i) => (
                <g key={pt.id}>
                  <circle cx={pt.x} cy={pt.y} r="6" fill="#059669" stroke="#ffffff" strokeWidth="2.5" />
                  <text
                    x={pt.x}
                    y={pt.y - 12}
                    textAnchor="middle"
                    className="text-[11px] font-bold fill-slate-800 font-mono"
                  >
                    {pt.weight}kg
                  </text>
                  <text
                    x={pt.x}
                    y={chartHeight - 10}
                    textAnchor="middle"
                    className="text-[10px] font-semibold fill-slate-600"
                  >
                    {pt.date.slice(5)}
                  </text>
                </g>
              ))}

              <defs>
                <linearGradient id="emeraldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Milestone Statistics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 text-center">
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-600 block">
              {language === 'am' ? 'የመነሻ ክብደት' : 'Starting Weight'}
            </span>
            <span className="text-lg font-black text-slate-800 mt-0.5 block">{startingWeight} kg</span>
          </div>

          <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-200">
            <span className="text-[10px] uppercase font-bold text-emerald-800 block">
              {language === 'am' ? 'የአሁኑ ክብደት' : 'Current Weight'}
            </span>
            <span className="text-xl font-black text-emerald-700 mt-0.5 block">{currentWeight} kg</span>
          </div>

          <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200">
            <span className="text-[10px] uppercase font-bold text-amber-800 block">
              {language === 'am' ? 'የታለመው ክብደት' : 'Target Weight'}
            </span>
            <span className="text-lg font-black text-amber-700 mt-0.5 block">{targetWeight} kg</span>
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-600 block">
              {language === 'am' ? 'የቀረ ርቀት' : 'Remaining Gap'}
            </span>
            <span className="text-lg font-black text-teal-700 mt-0.5 block">{remaining} kg</span>
          </div>
        </div>
      </div>

      {/* Log New Weight Entry Form */}
      <form onSubmit={handleAddWeight} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
          <Scale className="w-4 h-4 text-emerald-600" />
          <span>{language === 'am' ? 'ሳምንታዊ የክብደት ምዝገባ ማድረጊያ' : 'Log Weekly Weight'}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {language === 'am' ? 'ክብደት (ኪሎ ግራም - kg)' : 'Weight (kg)'}
            </label>
            <input
              type="number"
              step="0.1"
              required
              min="30"
              max="250"
              value={inputWeight}
              onChange={(e) => setInputWeight(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {language === 'am' ? 'ቀን (Date)' : 'Date'}
            </label>
            <input
              type="date"
              required
              value={inputDate}
              onChange={(e) => setInputDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {language === 'am' ? 'ማስታወሻ / አስተያየት' : 'Reflection Note'}
            </label>
            <input
              type="text"
              value={inputNote}
              onChange={(e) => setInputNote(e.target.value)}
              placeholder={language === 'am' ? 'ምሳሌ፦ ሳምንት 4 — በቂ ውሃ መጠጣት ቀጠልኩ' : 'e.g. Week 4 — feeling lighter'}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition"
          >
            <Plus className="w-4 h-4" />
            <span>{language === 'am' ? 'ክብደት መዝግብ' : 'Record Weight'}</span>
          </button>
        </div>
      </form>

      {/* Historical Entries List (Requirement 10 Example) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-emerald-600" />
          <span>{language === 'am' ? 'የሳምንታዊ ምዝገባዎች ዝርዝር' : 'Historical Check-in Log'}</span>
        </h3>

        <div className="divide-y divide-slate-100">
          {sortedLogs.slice().reverse().map((log, index) => (
            <div key={log.id} className="py-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-xs">
                  {sortedLogs.length - index}
                </span>
                <div>
                  <span className="font-bold text-slate-900 text-sm">{log.weight} kg</span>
                  <span className="text-slate-500 text-[11px] ml-2">({log.date})</span>
                  {log.note && <p className="text-slate-600 text-[11px] mt-0.5">{log.note}</p>}
                </div>
              </div>
              <span className="text-emerald-700 font-bold text-xs bg-emerald-50 px-2.5 py-1 rounded-lg">
                {language === 'am' ? 'ተመዝግቧል' : 'Recorded'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
