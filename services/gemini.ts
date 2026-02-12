import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateRomanticPoem = async (): Promise<string> => {
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