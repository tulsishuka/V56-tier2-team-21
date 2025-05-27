import { GoogleGenerativeAI, GenerativeModel, type GenerateContentResult } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY as string);
const model: GenerativeModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateContent = async (prompt: string): Promise<string> => {
  const result: GenerateContentResult = await model.generateContent(prompt);
  const text = result.response.text();
  return text;
};

// client/src/utils/api.ts
// generateContent.ts
// export async function generateContent(prompt: string): Promise<string> {
//   const response = await fetch('http://localhost:3001/gemini', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ prompt }),
//   });

//   if (!response.ok) {
//     throw new Error('Failed to fetch from backend');
//   }

//   const data = await response.json();
//   return data.text;
// }
