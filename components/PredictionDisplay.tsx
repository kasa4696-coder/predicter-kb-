import React from 'react';
import { PredictionResult } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Target, Flag, Activity, TrendingUp, Shield, Save, Check } from 'lucide-react';

interface PredictionDisplayProps {
  data: PredictionResult;
  homeTeam: string;
  awayTeam: string;
  onSave?: (data: PredictionResult) => void;
  isSaved?: boolean;
}

const PredictionDisplay: React.FC<PredictionDisplayProps> = ({ data, homeTeam, awayTeam, onSave, isSaved = false }) => {
  
  const winData = [
    { name: homeTeam, value: data.winProbabilityHome, color: '#10b981' }, // Home Green
    { name: 'Draw', value: data.winProbabilityDraw, color: '#94a3b8' },   // Draw Grey
    { name: awayTeam, value: data.winProbabilityAway, color: '#3b82f6' }, // Away Blue
  ];

  const ProbabilityBar = ({ label, value, colorClass }: { label: string, value: number, colorClass: string }) => (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-slate-300">{label}</span>
        <span className="text-sm font-bold text-white">{value}%</span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2.5">
        <div className={`h-2.5 rounded-full ${colorClass}`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Card: Score & Winner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Outcome Prediction */}
        <div className="lg:col-span-2 bg-slate-800 rounded-xl p-6 border border-slate-700 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <TrendingUp size={120} />
          </div>
          
          <div className="flex justify-between items-start relative z-10">
             <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-4">Match Outcome Model</h3>
             {onSave && (
                 <button 
                    onClick={() => onSave(data)}
                    disabled={isSaved}
                    className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        isSaved 
                        ? 'bg-emerald-500/20 text-emerald-400 cursor-default' 
                        : 'bg-slate-700 text-slate-300 hover:bg-emerald-600 hover:text-white'
                    }`}
                 >
                    {isSaved ? <Check className="w-3 h-3" /> : <Save className="w-3 h-3" />}
                    <span>{isSaved ? 'Saved' : 'Save Prediction'}</span>
                 </button>
             )}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
              <div className="flex-1 w-full h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={winData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {winData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 text-center md:text-right mt-4 md:mt-0">
                <div className="text-sm text-slate-400 mb-1">Predicted Score</div>
                <div className="text-5xl font-bold text-white mb-2 tracking-tight">{data.predictedScore}</div>
                <div className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold border border-emerald-500/30">
                  Favorite: {data.matchWinner}
                </div>
              </div>
            </div>

          {/* Double Chance Section */}
          <div className="mt-6 pt-4 border-t border-slate-700 relative z-10">
             <div className="flex items-center mb-3">
                <Shield className="w-4 h-4 text-slate-400 mr-2" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Double Chance</span>
             </div>
             <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-900/50 rounded-lg p-2 text-center border border-slate-700/50">
                    <div className="text-xs text-emerald-400/80 font-mono mb-1">1X</div>
                    <div className="font-bold text-white">{data.doubleChance1X}%</div>
                    <div className="text-[10px] text-slate-500">Home/Draw</div>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-2 text-center border border-slate-700/50">
                    <div className="text-xs text-slate-400 font-mono mb-1">12</div>
                    <div className="font-bold text-white">{data.doubleChance12}%</div>
                    <div className="text-[10px] text-slate-500">Home/Away</div>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-2 text-center border border-slate-700/50">
                    <div className="text-xs text-blue-400/80 font-mono mb-1">X2</div>
                    <div className="font-bold text-white">{data.doubleChanceX2}%</div>
                    <div className="text-[10px] text-slate-500">Draw/Away</div>
                </div>
             </div>
          </div>

        </div>

        {/* Key Reasoning */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 flex flex-col">
          <div className="flex items-center mb-4 text-emerald-400">
            <Activity className="w-5 h-5 mr-2" />
            <h3 className="font-bold text-white">AI Analysis</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed flex-grow">
            {data.keyReasoning}
          </p>
          <div className="mt-4 pt-4 border-t border-slate-700">
            <div className="text-xs text-slate-500 uppercase font-semibold mb-2">Recent Form</div>
            <div className="flex justify-between items-center text-sm">
                <span className="text-emerald-400 font-mono">{homeTeam}: {data.recentFormHome}</span>
                <span className="text-blue-400 font-mono">{awayTeam}: {data.recentFormAway}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Goal & Corner Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Goals */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center mb-6">
                <div className="p-2 bg-emerald-500/10 rounded-lg mr-3">
                    <Target className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Goals Analysis</h3>
            </div>
            <div className="space-y-6">
                <ProbabilityBar 
                    label="Over 1.5 Goals" 
                    value={data.probOver15Goals} 
                    colorClass="bg-emerald-500" 
                />
                 <ProbabilityBar 
                    label="Over 2.5 Goals" 
                    value={data.probOver25Goals} 
                    colorClass="bg-emerald-400" 
                />
                <div className="p-3 bg-slate-900 rounded-lg text-center">
                    <span className="text-slate-400 text-xs uppercase block mb-1">Expected Total Goals</span>
                    <span className="text-2xl font-bold text-white">{data.totalGoals}</span>
                </div>
            </div>
        </div>

        {/* Corners */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center mb-6">
                <div className="p-2 bg-blue-500/10 rounded-lg mr-3">
                    <Flag className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Corners Analysis</h3>
            </div>
            <div className="space-y-6">
                <ProbabilityBar 
                    label="Over 7.5 Corners" 
                    value={data.probOver75Corners} 
                    colorClass="bg-blue-500" 
                />
                 <ProbabilityBar 
                    label="Over 8.5 Corners" 
                    value={data.probOver85Corners} 
                    colorClass="bg-blue-400" 
                />
                 <div className="p-3 bg-slate-900 rounded-lg text-center">
                    <span className="text-slate-400 text-xs uppercase block mb-1">H2H Summary</span>
                    <span className="text-sm font-medium text-slate-200">{data.h2hSummary}</span>
                </div>
            </div>
        </div>
      </div>

    </div>
  );
};

export default PredictionDisplay;