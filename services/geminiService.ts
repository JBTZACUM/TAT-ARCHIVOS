
import { GoogleGenAI, Type, Chat } from "@google/genai";
import type { BrandIdentity, LogoData, ChatMessage } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
let chatInstance: Chat | null = null;

const brandIdentitySchema = {
  type: Type.OBJECT,
  properties: {
    palette: {
      type: Type.ARRAY,
      description: "A 5-color palette. Provide descriptive names, hex codes, and usage notes.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          hex: { type: Type.STRING },
          usage: { type: Type.STRING },
        },
        required: ["name", "hex", "usage"],
      },
    },
    typography: {
      type: Type.OBJECT,
      description: "A typography pairing using fonts from Google Fonts.",
      properties: {
        header: { type: Type.STRING },
        body: { type: Type.STRING },
      },
      required: ["header", "body"],
    },
  },
  required: ["palette", "typography"],
};

export const generateBrandIdentity = async (mission: string): Promise<BrandIdentity> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are a world-class branding expert. Based on the following company mission, generate a complete brand identity. The output MUST be a valid JSON object that adheres to the provided schema.

      Company Mission: "${mission}"
      
      Generate the following:
      1. A 5-color palette. For each color, provide a descriptive name, the hex code (e.g., #RRGGBB), and a brief description of its intended use (e.g., "Primary Call-to-Action", "Background", "Accent").
      2. A typography pairing using popular and aesthetically pleasing fonts available on Google Fonts. Suggest one font for headers and one for body text.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: brandIdentitySchema,
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Error generating brand identity:", error);
    throw new Error("Failed to generate brand identity. Please try again.");
  }
};


export const generateLogos = async (mission: string): Promise<LogoData> => {
    try {
        const prompt = `A primary logo and three secondary icon variations for a brand with the mission: '${mission}'. The design should be modern, minimalist, clean, and iconic. Vector style on a plain white background.`;

        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
                numberOfImages: 4,
                outputMimeType: 'image/png',
                aspectRatio: '1:1',
            },
        });

        if (!response.generatedImages || response.generatedImages.length < 4) {
            throw new Error("Not enough images were generated.");
        }

        const images = response.generatedImages.map(img => img.image.imageBytes);

        return {
            primary: images[0],
            secondaries: images.slice(1),
        };

    } catch (error) {
        console.error("Error generating logos:", error);
        throw new Error("Failed to generate logos. Please try again.");
    }
};

export const initializeChat = () => {
  chatInstance = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: 'You are a friendly and knowledgeable branding assistant. Help users with their questions about branding, design, and marketing.',
    },
  });
};

export const chatWithBot = async (message: string): Promise<string> => {
  if (!chatInstance) {
    initializeChat();
  }
  try {
    const response = await chatInstance!.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Error in chat:", error);
    throw new Error("The chatbot is currently unavailable. Please try again later.");
  }
};
