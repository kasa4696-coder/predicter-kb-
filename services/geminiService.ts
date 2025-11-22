import { GoogleGenAI } from "@google/genai";
import { PredictionResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeMatch = async (
  leagueName: string,
  homeTeam: string,
  awayTeam: string
): Promise<PredictionResult> => {
  
  const model = "gemini-2.5-flash";

  const prompt = `
    You are a professional soccer betting analyst.
    Analyze the upcoming match between ${homeTeam} (Home) and ${awayTeam} (Away) in the ${leagueName}.
    
    Step 1: PERFORM A GOOGLE SEARCH to find the most recent data (current season):
    - Recent form (Last 5 matches) for both teams.
    - Head-to-Head (H2H) history (Last 5 meetings).
    - Home vs Away performance stats for the current season.
    - Expected Goals (xG) stats: Specifically look for data on whether ${homeTeam} over/underperforms xG at home, and if ${awayTeam} over/underperforms xG away.
    - Average corners per game for both teams.

    Step 2: Based on the search results, generate a probabilistic prediction.
    - Determine the likely winner.
    - Estimate the scoreline.
    - Calculate probabilities for Over 1.5/2.5 Goals and Over 7.5/8.5 Corners.
    - Calculate probabilities for Double Chance: 
        - 1X (Home Win or Draw)
        - 12 (Home Win or Away Win)
        - X2 (Draw or Away Win)

    Step 3: OUTPUT FORMAT
    Return the result as valid, raw JSON. 
    Do NOT use Markdown code blocks (like \`\`\`json). 
    Do NOT include any text outside the JSON object.
    
    JSON Structure:
    {
      "matchWinner": "String (Team Name or 'Draw')",
      "winProbabilityHome": Number (integer 0-100),
      "winProbabilityDraw": Number (integer 0-100),
      "winProbabilityAway": Number (integer 0-100),
      "doubleChance1X": Number (integer 0-100),
      "doubleChance12": Number (integer 0-100),
      "doubleChanceX2": Number (integer 0-100),
      "predictedScore": "String (e.g. '2-1')",
      "totalGoals": Number (decimal, e.g. 2.8),
      "probOver15Goals": Number (integer 0-100),
      "probOver25Goals": Number (integer 0-100),
      "probOver75Corners": Number (integer 0-100),
      "probOver85Corners": Number (integer 0-100),
      "keyReasoning": "String (Concise analysis citing xG performance, form, and H2H trends found in search)",
      "recentFormHome": "String (e.g. 'W-L-D-W-W')",
      "recentFormAway": "String (e.g. 'L-D-L-W-L')",
      "h2hSummary": "String (e.g. 'Home team won 3 of last 5')"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        // responseMimeType and responseSchema are NOT supported with tools in the current API version
        // We rely on the prompt to enforce JSON structure
      }
    });

    let jsonText = response.text;
    
    if (!jsonText) {
      throw new Error("No data returned from AI");
    }

    // Cleaning logic to handle potential Markdown wrapping
    const start = jsonText.indexOf('{');
    const end = jsonText.lastIndexOf('}');
    
    if (start !== -1 && end !== -1) {
      jsonText = jsonText.substring(start, end + 1);
    } else {
      // Fallback cleanup if braces aren't clear, though unlikely with prompt instructions
      jsonText = jsonText.replace(/```json/g, '').replace(/```/g, '').trim();
    }
    
    const parsedData = JSON.parse(jsonText);

    // Inject metadata
    return {
      ...parsedData,
      id: Date.now().toString(),
      timestamp: Date.now(),
      leagueName,
      homeTeam,
      awayTeam
    } as PredictionResult;

  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    throw error;
  }
};

export const searchFootballInfo = async (query: string): Promise<string> => {
  const model = "gemini-2.5-flash";
  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: `You are a professional soccer analyst. Answer this query using the latest data found via Google Search: "${query}". Keep it concise and relevant to soccer stats, scores, or news.`,
      config: {
        tools: [{ googleSearch: {} }],
      }
    });
    return response.text || "No information found.";
  } catch (error) {
    console.error("Query failed:", error);
    throw error;
  }
};