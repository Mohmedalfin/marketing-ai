import { type FC } from "react";
import { MediaContent } from "./MediaContent";
import { PhotoIcon, MenuDotsIcon } from "@/components/Elements/icons/AiStudioIcons";

interface PosterResultViewerProps {
    formData: { mediaType: string };
    generatedMedia: string | null;
    isGenerating: boolean;
    loadingMessage: string;
}

export const PosterResultViewer: FC<PosterResultViewerProps> = ({
    formData,
    generatedMedia,
    isGenerating,
    loadingMessage
}) => {
    const isVideo = formData.mediaType === 'Video';

    return (
        <div className="flex flex-col self-start w-full rounded-2xl border border-primary p-4 overflow-hidden bg-primary-light/10">
            <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                        <PhotoIcon />
                    </div>
                    <span className="rounded-full bg-primary px-3 py-0.5 text-[10px] md:text-xs font-bold text-white">
                        {isVideo ? 'Video' : 'Foto'}
                    </span>
                </div>
                <MenuDotsIcon />
            </div>
            
            <div className="w-full flex-1 relative flex items-center justify-center">
                <div className={`relative w-full max-w-sm ${generatedMedia ? 'aspect-square' : 'h-24 lg:min-h-[350px] w-full'} transition-all duration-700 ease-in-out ring-1 ring-gray-900/5 shadow-2xl shadow-primary/20 rounded-xl overflow-hidden flex items-center justify-center p-2 bg-white`}>
                    
                    {/* Memanggil Komponen Logic di sini */}
                    <MediaContent 
                        isGenerating={isGenerating}
                        generatedMedia={generatedMedia}
                        mediaType={formData.mediaType}
                        loadingMessage={loadingMessage}
                    />

                </div>
            </div>
        </div>
    );
};