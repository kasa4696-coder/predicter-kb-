import React, { useState } from 'react';
import { MessageSquare, Send, Sparkles, X } from 'lucide-react';
import { searchFootballInfo } from '../services/geminiService';

const QuickQuery: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setResult(null);
    try {
      const answer = await searchFootballInfo(query);
      setResult(answer);
    } catch (error) {
      setResult("Sorry, I couldn't retrieve that information right now.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-emerald-600 hover:bg-emerald-500 text-white p-4 rounded-full shadow-lg shadow-emerald-900/50 transition-all z-50 flex items-center gap-2 group"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap font-semibold">Ask Analyst</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-full max-w-md bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="bg-slate-900/90 p-4 border-b border-slate-700 flex justify-between items-center">
        <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <h3 className="font-bold text-white text-sm">Quick Intelligence</h3>
        </div>
        <button 
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-white transition-colors"
        >
            <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 max-h-[60vh] overflow-y-auto flex flex-col gap-4 bg-slate-800/95">
        {result && (
          <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
            <p className="text-sm text-slate-200 leading-relaxed">{result}</p>
          </div>
        )}
        
        {isLoading && (
            <div className="flex items-center gap-2 text-slate-400 text-sm py-2">
                <div className="animate-pulse w-2 h-2 bg-emerald-500 rounded-full"></div>
                Searching live data...
            </div>
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={handleAsk} className="p-3 bg-slate-900 border-t border-slate-700 flex gap-2">
        <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., Who did Real Oviedo play last?"
            className="flex-1 bg-slate-800 border border-slate-600 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500"
        />
        <button 
            type="submit"
            disabled={isLoading || !query.trim()}
            className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 text-white p-2 rounded-lg transition-colors"
        >
            <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default QuickQuery;