import { useRef, useEffect, useState, useCallback } from 'react';

interface DraftMediaCardProps {
    isVideo: boolean;
    videoUrl?: string;
    imageUrl?: string;
    title?: string;
    isEditing: boolean;
}

export function DraftMediaCard({ isVideo, videoUrl, imageUrl, title, isEditing }: DraftMediaCardProps) {
    const containerRef  = useRef<HTMLDivElement>(null);
    const srcLoadedRef = useRef(false);
    const videoRef      = useRef<HTMLVideoElement>(null);
    const [isVisible, setIsVisible]     = useState(false);

    const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
        const entry = entries[0];
        setIsVisible(entry.isIntersecting);
    }, []);

    // Setup observer sekali saat mount
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(handleIntersection, {
            threshold: [0, 0.15],   
            rootMargin: '100px 0px' 
        });

        observer.observe(el);
        return () => observer.disconnect();
    }, [handleIntersection]);

    useEffect(() => {
        srcLoadedRef.current = false;

        const video = videoRef.current;
        if (video) {
            video.pause();
            video.removeAttribute('src');
            video.load();
        }
    }, [videoUrl]);

    // Kontrol play/pause berdasarkan visibility
    useEffect(() => {
        const video = videoRef.current;
        if (!isVideo || !video) return;

        if (isVisible) {
            if (!srcLoadedRef.current && videoUrl) {
                video.src = videoUrl;
                srcLoadedRef.current = true;
            }

            video.play().catch(() => {});
        } else {
            if (!video.paused) {
                video.pause();
            }
        }
    }, [isVisible, isVideo, videoUrl]);

    const filterStyle = isEditing ? 'blur(8px) brightness(0.6)' : 'none';
    const mediaClass  = 'absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105';

    return (
        <div ref={containerRef} className="absolute inset-0">
            {isVideo ? (
                <video
                    ref={videoRef}
                    className={mediaClass}
                    style={{ filter: filterStyle }}
                    muted
                    loop
                    playsInline
                    preload="none"   
                />
            ) : (
                <img
                    src={imageUrl}
                    alt={title}
                    className={mediaClass}
                    style={{ filter: filterStyle }}
                    loading="lazy"   
                    decoding="async" 
                />
            )}
        </div>
    );
}
