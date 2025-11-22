import React from 'react';
import { League } from '../types';
import { Trophy } from 'lucide-react';

interface LeagueSelectorProps {
  leagues: League[];
  selectedLeagueId: string;
  onSelectLeague: (id: string) => void;
}

const LeagueSelector: React.FC<LeagueSelectorProps> = ({ leagues, selectedLeagueId, onSelectLeague }) => {
  return (
    <div className="w-full md:w-64 bg-slate-800/50 border-r border-slate-700 flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-slate-700 flex items-center space-x-2">
        <Trophy className="w-5 h-5 text-emerald-400" />
        <h2 className="font-bold text-emerald-50 tracking-wider">LEAGUES</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {leagues.map((league) => (
          <button
            key={league.id}
            onClick={() => onSelectLeague(league.id)}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all duration-200 flex items-center justify-between group ${
              selectedLeagueId === league.id
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50'
                : 'text-slate-400 hover:bg-slate-700 hover:text-slate-200'
            }`}
          >
            <span>{league.name}</span>
            <span className={`text-xs px-2 py-0.5 rounded ${selectedLeagueId === league.id ? 'bg-emerald-700' : 'bg-slate-800 text-slate-500 group-hover:bg-slate-600'}`}>
              {league.country.substring(0, 3).toUpperCase()}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LeagueSelector;