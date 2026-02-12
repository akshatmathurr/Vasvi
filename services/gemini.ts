import { GoogleGenAI } from "@google/genai";

// Safely access process.env to prevent browser crashes
const getApiKey = () => {
  try {
    return process.env.API_KEY || '';
  } catch (e) {
    return '';
  }
};

const apiKey = getApiKey();
const ai = new GoogleGenAI({ apiKey });

export const generateRomanticPoem = async (): Promise<string> => {
  // If no API key is present (static host), return fallback immediately
  if (!apiKey) {
    return "Vasvi, my love, my heart, my soul,\nYou make my life completely whole.\nWill you be my Valentine today,\nAnd walk with me forever, come what may?";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Write a short, very romantic, 4-line poem asking my wife Vasvi to be my valentine. It should be sweet, playful, and mention 'us' against the world. Do not include markdown formatting.",
    });
    return response.text || "Vasvi, my love, my heart, my soul,\nYou make my life completely whole.\nWill you be my Valentine today,\nAnd walk with me forever, come what may?";
  } catch (error) {
    console.error("Gemini generation error:", error);
    return "Vasvi, my love, my heart, my soul,\nYou make my life completely whole.\nWill you be my Valentine today,\nAnd walk with me forever, come what may?";
  }
};