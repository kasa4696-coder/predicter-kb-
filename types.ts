export interface TeamStats {
  name: string;
  form: string; // e.g., "W-W-L-D-W"
  xgPerformance: number; // e.g. +1.2 (overperforming) or -0.5 (underperforming)
}

export interface PredictionResult {
  id: string;
  timestamp: number;
  leagueName?: string;
  homeTeam?: string;
  awayTeam?: string;
  matchWinner: string;
  winProbabilityHome: number;
  winProbabilityDraw: number;
  winProbabilityAway: number;
  doubleChance1X: number; // Home or Draw
  doubleChance12: number; // Home or Away
  doubleChanceX2: number; // Draw or Away
  predictedScore: string;
  totalGoals: number;
  probOver15Goals: number;
  probOver25Goals: number;
  probOver75Corners: number;
  probOver85Corners: number;
  keyReasoning: string;
  recentFormHome: string;
  recentFormAway: string;
  h2hSummary: string;
}

export interface League {
  id: string;
  name: string;
  country: string;
}

export enum AnalysisStatus {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}