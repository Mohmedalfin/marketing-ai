// src/hooks/useAiStudio.ts
import { useState } from "react";
import { generatePosterAPI } from "../services/aiService";
import type { AiGenerateRequest } from "../types/ai";


export const useAiStudio = () => {
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [loadingMessage, setLoadingMessage] = useState<string>('');
    const [generatedPoster, setGeneratedPoster] = useState<string | null>(null);
    const [captionText, setCaptionText] = useState<string>("");

    const restoreResult = (poster: string | null, caption: string) => {
        setGeneratedPoster(poster);
        setCaptionText(caption);
    };

    const generate = async (imageBase64: string, style: string, instruction: string) => {
        try {
            setIsGenerating(true);
            setLoadingMessage("Menganalisa objek produk...");
            setGeneratedPoster(null);
            setCaptionText("");

            // 1. Persiapan Data (Sudah Base64)
            const payload: AiGenerateRequest = {
                image_base64: imageBase64,
                category: style,
                prompt_design: instruction
            };

            // 3. Multi-Step Loading Simulator
            const messages = [
                "Merancang komposisi visual...",
                "Merender efek pencahayaan...",
                "Menulis caption marketing yang menjual...",
            ];
            
            let messageIndex = 0;
            const interval = setInterval(() => {
                if (messageIndex < messages.length) {
                    setLoadingMessage(messages[messageIndex]);
                    messageIndex++;
                }
            }, 2000);

            // 4. API Call
            try {
                const result = await generatePosterAPI(payload);
                
                setGeneratedPoster(result.data.image_url);
                setCaptionText(result.data.caption);
                
                return { success: true, data: result.data };
            } finally {
                clearInterval(interval);
            }

        } catch (error) {
            console.error("Error generation:", error);
            const errMsg = error instanceof Error ? error.message : "Terjadi kesalahan saat memproses AI.";
            alert(errMsg);
            return { success: false };
        } finally {
            setIsGenerating(false);
            setLoadingMessage("");
        }
    };

    return {
        isGenerating,
        loadingMessage,
        generatedPoster,
        captionText,
        setCaptionText,
        generate,
        restoreResult
    };
};
