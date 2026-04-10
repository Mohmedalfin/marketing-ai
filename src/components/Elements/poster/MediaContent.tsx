import { type FC } from "react";
import { SpinnerIcon } from "@/components/Elements/icons/AiStudioIcons";

interface MediaContentProps {
    isGenerating: boolean;
    generatedMedia: string | null;
    mediaType: string;
    loadingMessage: string;
}

export const MediaContent: FC<MediaContentProps> = ({ 
    isGenerating, 
    generatedMedia, 
    mediaType, 
    loadingMessage 
}) => {
    // Early Return 1: Loading State
    if (isGenerating) {
        return (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-50/90 backdrop-blur-sm p-6 text-center">
                <SpinnerIcon className="w-8 h-8 md:w-10 md:h-10 text-primary/50 mb-4 animate-spin" />
                <span className="text-[10px] md:text-xs font-bold text-primary animate-pulse">{loadingMessage}</span>
            </div>
        );
    }

    // Early Return 2: Empty State
    if (!generatedMedia) {
        return (
            <div className="flex items-center justify-center text-gray-400 w-full h-full text-[10px] md:text-xs text-center p-4">
                Belum ada hasil. Klik Generate.
            </div>
        );
    }

    // Early Return 3: Video State
    if (mediaType === 'Video') {
        return (
            <video 
                src={generatedMedia} 
                className="w-full h-full object-contain transition-opacity duration-500 rounded-lg"
                autoPlay muted loop playsInline
            />
        );
    }

    // Default Return: Photo State
    return (
        <img 
            src={generatedMedia} 
            alt="Generated Preview" 
            className="w-full h-full object-contain transition-opacity duration-500" 
        />
    );
};