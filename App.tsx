import React, { useState, useEffect } from 'react';
import LeagueSelector from './components/LeagueSelector';
import MatchInput from './components/MatchInput';
import PredictionDisplay from './components/PredictionDisplay';
import QuickQuery from './components/QuickQuery';
import { LEAGUES } from './constants';
import { analyzeMatch } from './services/geminiService';
import { PredictionResult, AnalysisStatus } from './types';
import { BrainCircuit, History, LineChart, Trash2, Calendar, ArrowRight } from 'lucide-react';

const App: React.FC = () => {
  const [selectedLeagueId, setSelectedLeagueId] = useState(LEAGUES[0].id);
  const [analysisStatus, setAnalysisStatus] = useState<AnalysisStatus>(AnalysisStatus.IDLE);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [teams, setTeams] = useState<{home: string, away: string}>({ home: '', away: '' });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'predict' | 'history'>('predict');
  const [savedPredictions, setSavedPredictions] = useState<PredictionResult[]>([]);

  // Load from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('probet_history');
    if (saved) {
        try {
            setSavedPredictions(JSON.parse(saved));
        } catch (e) {
            console.error("Failed to parse history", e);
        }
    }
  }, []);

  // Save to LocalStorage whenever history changes
  useEffect(() => {
      localStorage.setItem('probet_history', JSON.stringify(savedPredictions));
  }, [savedPredictions]);

  const handleAnalyze = async (home: string, away: string) => {
    setAnalysisStatus(AnalysisStatus.ANALYZING);
    setPrediction(null);
    setErrorMsg(null);
    setTeams({ home, away });
    setActiveTab('predict');

    try {
      const leagueName = LEAGUES.find(l => l.id === selectedLeagueId)?.name || 'Unknown League';
      const result = await analyzeMatch(leagueName, home, away);
      setPrediction(result);
      setAnalysisStatus(AnalysisStatus.COMPLETE);
    } catch (err) {
      console.error(err);
      setAnalysisStatus(AnalysisStatus.ERROR);
      setErrorMsg("Failed to generate prediction. Please try again or check your connection.");
    }
  };

  const savePrediction = (pred: PredictionResult) => {
      if (!savedPredictions.some(p => p.id === pred.id)) {
          setSavedPredictions([pred, ...savedPredictions]);
      }
  };

  const deletePrediction = (id: string) => {
      setSavedPredictions(savedPredictions.filter(p => p.id !== id));
  };

  const viewPrediction = (pred: PredictionResult) => {
      setPrediction(pred);
      setTeams({ home: pred.homeTeam || 'Home', away: pred.awayTeam || 'Away' });
      setAnalysisStatus(AnalysisStatus.COMPLETE);
      setActiveTab('predict');
  };

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <LeagueSelector 
        leagues={LEAGUES} 
        selectedLeagueId={selectedLeagueId}
        onSelectLeague={(id) => {
            setSelectedLeagueId(id);
            if (activeTab === 'predict') {
                setAnalysisStatus(AnalysisStatus.IDLE);
                setPrediction(null);
            }
        }}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 z-0 opacity-5 pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>

        {/* Header */}
        <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700 p-6 z-10 flex justify-between items-center">
          <div className="flex items-center space-x-3">
             <div className="bg-gradient-to-tr from-emerald-500 to-teal-400 p-2 rounded-lg shadow-lg shadow-emerald-500/20">
                <BrainCircuit className="w-6 h-6 text-white" />
             </div>
             <div>
               <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-200">
                 ProBet AI Analyst
               </h1>
               <p className="text-xs text-slate-400 font-medium tracking-wide">ADVANCED PREDICTIVE MODELING ENGINE</p>
             </div>
          </div>

          {/* Tabs */}
          <div className="flex bg-slate-800 p-1 rounded-lg border border-slate-700">
              <button 
                onClick={() => setActiveTab('predict')}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-semibold transition-all ${activeTab === 'predict' ? 'bg-slate-700 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
              >
                  <LineChart className="w-4 h-4 mr-2" />
                  Analysis
              </button>
              <button 
                onClick={() => setActiveTab('history')}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-semibold transition-all ${activeTab === 'history' ? 'bg-slate-700 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
              >
                  <History className="w-4 h-4 mr-2" />
                  History
                  <span className="ml-2 bg-slate-900 px-2 py-0.5 rounded-full text-xs text-slate-500">{savedPredictions.length}</span>
              </button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 z-10 scroll-smooth">
          <div className="max-w-5xl mx-auto">
            
            {activeTab === 'predict' ? (
                <>
                    <MatchInput 
                    leagueId={selectedLeagueId} 
                    onAnalyze={handleAnalyze} 
                    isLoading={analysisStatus === AnalysisStatus.ANALYZING}
                    />

                    {analysisStatus === AnalysisStatus.ERROR && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-4 rounded-lg mb-6 text-center">
                            {errorMsg}
                        </div>
                    )}

                    {analysisStatus === AnalysisStatus.COMPLETE && prediction && (
                    <PredictionDisplay 
                        data={prediction} 
                        homeTeam={teams.home} 
                        awayTeam={teams.away} 
                        onSave={savePrediction}
                        isSaved={savedPredictions.some(p => p.id === prediction.id)}
                    />
                    )}

                    {analysisStatus === AnalysisStatus.IDLE && (
                        <div className="text-center mt-20 opacity-30">
                            <BrainCircuit size={64} className="mx-auto mb-4" />
                            <p className="text-xl font-light">Select a league and teams to begin analysis</p>
                        </div>
                    )}
                </>
            ) : (
                <div className="space-y-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-white">Saved Analyses</h2>
                        {savedPredictions.length > 0 && (
                            <button 
                                onClick={() => {
                                    if(window.confirm('Clear all history?')) setSavedPredictions([]);
                                }}
                                className="text-xs text-red-400 hover:text-red-300 underline"
                            >
                                Clear All
                            </button>
                        )}
                    </div>

                    {savedPredictions.length === 0 ? (
                        <div className="text-center py-20 bg-slate-800/50 rounded-xl border border-slate-700 border-dashed">
                            <History className="w-12 h-12 mx-auto text-slate-600 mb-4" />
                            <p className="text-slate-400">No saved predictions yet.</p>
                            <p className="text-slate-500 text-sm mt-2">Analyze a match and click 'Save' to track it here.</p>
                            <button 
                                onClick={() => setActiveTab('predict')}
                                className="mt-6 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm text-white transition-colors"
                            >
                                Start Analysis
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {savedPredictions.map(pred => (
                                <div key={pred.id} className="bg-slate-800 border border-slate-700 rounded-xl p-5 hover:border-emerald-500/50 transition-all group relative">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider mb-1">{pred.leagueName}</div>
                                            <div className="text-xs text-slate-500 flex items-center">
                                                <Calendar className="w-3 h-3 mr-1" />
                                                {new Date(pred.timestamp).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); deletePrediction(pred.id); }}
                                            className="text-slate-600 hover:text-red-400 p-1 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                    
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="text-right flex-1">
                                            <span className="font-bold text-white block">{pred.homeTeam}</span>
                                        </div>
                                        <div className="px-3 text-xs text-slate-500 font-mono">VS</div>
                                        <div className="text-left flex-1">
                                            <span className="font-bold text-white block">{pred.awayTeam}</span>
                                        </div>
                                    </div>

                                    <div className="bg-slate-900/50 rounded-lg p-3 mb-4 flex justify-between items-center border border-slate-700/50">
                                        <div>
                                            <span className="text-xs text-slate-500 block">Winner</span>
                                            <span className="text-emerald-400 font-bold text-sm">{pred.matchWinner}</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xs text-slate-500 block">Score</span>
                                            <span className="text-white font-bold text-sm">{pred.predictedScore}</span>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => viewPrediction(pred)}
                                        className="w-full py-2 bg-slate-700 hover:bg-emerald-600 text-slate-300 hover:text-white rounded-lg text-sm font-medium transition-all flex items-center justify-center group-hover:shadow-lg"
                                    >
                                        View Full Analysis
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

          </div>
        </main>
      </div>

      {/* Floating Chat Interface */}
      <QuickQuery />
    </div>
  );
};

export default App;