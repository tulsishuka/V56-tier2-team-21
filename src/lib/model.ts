import { GoogleGenerativeAI, GenerativeModel, type GenerateContentResult } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY as string);
const model: GenerativeModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateContent = async (prompt: string): Promise<string> => {
  const result: GenerateContentResult = await model.generateContent(prompt);
  const text = result.response.text();
  console.log(text);
  return text;
};