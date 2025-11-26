import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI = null;

if (API_KEY) {
    genAI = new GoogleGenerativeAI(API_KEY);
}

export const initializeGemini = (apiKey) => {
    genAI = new GoogleGenerativeAI(apiKey);
};

export const sendMessageToGemini = async (modelId, history, message) => {
    if (!genAI) {
        throw new Error("API Key not found. Please set VITE_GEMINI_API_KEY or provide it in settings.");
    }

    try {
        const model = genAI.getGenerativeModel({ model: modelId });

        // Convert history to Gemini format
        // History should be array of { role: 'user' | 'model', parts: [{ text: string }] }
        let chatHistory = history.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
        }));

        // Gemini requires the first message to be from the user
        if (chatHistory.length > 0 && chatHistory[0].role === 'model') {
            chatHistory = chatHistory.slice(1);
        }

        const chat = model.startChat({
            history: chatHistory,
            generationConfig: {
                maxOutputTokens: 2048,
            },
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw error;
    }
};
