import React, { useState, useMemo } from 'react';
import { Search, PlayCircle } from 'lucide-react';
import { MOCK_TEAMS } from '../constants';

interface MatchInputProps {
  leagueId: string;
  onAnalyze: (home: string, away: string) => void;
  isLoading: boolean;
}

const MatchInput: React.FC<MatchInputProps> = ({ leagueId, onAnalyze, isLoading }) => {
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  
  // Combine all teams for cross-league prediction capability
  const allTeams = useMemo(() => {
    const teamSet = new Set<string>();
    Object.values(MOCK_TEAMS).forEach(leagueTeams => {
      leagueTeams.forEach(team => teamSet.add(team));
    });
    return Array.from(teamSet).sort();
  }, []);

  const handleAnalyze = () => {
    if (homeTeam && awayTeam && homeTeam !== awayTeam) {
      onAnalyze(homeTeam, awayTeam);
    }
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-xl border border-slate-700 mb-8">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
        <Search className="w-5 h-5 mr-2 text-emerald-400" />
        Match Selector
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-end">
        
        {/* Home Team Input */}
        <div className="md:col-span-3">
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Home Team</label>
          <div className="relative">
            <input
              type="text"
              value={homeTeam}
              onChange={(e) => setHomeTeam(e.target.value)}
              placeholder="Select Team..."
              list="all-teams-suggestions"
              className="w-full bg-slate-900 border border-slate-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-slate-600"
            />
          </div>
        </div>

        {/* VS Badge */}
        <div className="hidden md:flex md:col-span-1 justify-center items-center pb-3">
            <div className="bg-slate-700 text-slate-300 font-bold rounded-full w-10 h-10 flex items-center justify-center text-xs">VS</div>
        </div>

        {/* Away Team Input */}
        <div className="md:col-span-3">
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Away Team</label>
          <div className="relative">
             <input
              type="text"
              value={awayTeam}
              onChange={(e) => setAwayTeam(e.target.value)}
              placeholder="Select Team..."
              list="all-teams-suggestions"
              className="w-full bg-slate-900 border border-slate-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-slate-600"
            />
          </div>
        </div>
      </div>

      {/* Global Datalist for Cross-League Support */}
      <datalist id="all-teams-suggestions">
        {allTeams.map(team => <option key={team} value={team} />)}
      </datalist>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleAnalyze}
          disabled={!homeTeam || !awayTeam || isLoading}
          className={`flex items-center px-6 py-3 rounded-lg font-bold text-white transition-all ${
            !homeTeam || !awayTeam || isLoading
              ? 'bg-slate-700 cursor-not-allowed text-slate-400'
              : 'bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-900/50 hover:shadow-emerald-900/80'
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Searching Live Stats...
            </>
          ) : (
            <>
              <PlayCircle className="w-5 h-5 mr-2" />
              Generate Prediction
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default MatchInput;