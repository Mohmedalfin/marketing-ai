import { useState, useEffect, useRef } from 'react';
import { useAiStudio } from './useAiStudio';
import { schedulePostAPI } from '../services/aiService';
import { fileToBase64 } from '../utils/file';

// 1. CONSTANTS & HYDRATION HELPER (Global Scope)
export const STYLE_OPTIONS = [
    'Makanan',
    'Fashion',
    'Elektronik',
    'Minuman',
];

export const PLATFORM_OPTIONS = [
    'All',
    'Instagram',
    'Facebook',
    'Telegram',
];


export const TYPE_CONTENT = [
    'Foto',
    'Video',
];

const getInitialAiData = () => {
    if (typeof window === 'undefined') return null;
    
    const savedSession = localStorage.getItem('ai_studio_last_result');
    if (savedSession) {
        try {
            return JSON.parse(savedSession);
        } catch (e) {
            console.error("Gagal membaca memori AI", e);
            return null;
        }
    }
    return null;
};

const getPreviewUrl = (imgBase64: string | null) => {
    if (!imgBase64) return null;
    if (imgBase64.startsWith('data:') || imgBase64.startsWith('http') || imgBase64.startsWith('blob:')) {
        return imgBase64;
    }
    return `data:image/png;base64,${imgBase64}`;
};

export const useAiStudioController = () => {
    const [uiState, setUiState] = useState<{
        isVisible: boolean;
        isStyleDropdownOpen: boolean;
        isMediaTypeDropdownOpen: boolean;
        isPlatformDropdownOpen: boolean;
        isPublishing: boolean;
        toast: { isVisible: boolean; message: string; type: 'success' | 'error' };
    }>({
        isVisible: false,
        isStyleDropdownOpen: false,
        isMediaTypeDropdownOpen: false,
        isPlatformDropdownOpen: false,
        isPublishing: false,
        toast: { isVisible: false, message: '', type: 'success' }
    });

    const [formData, setFormData] = useState<{
        title: string;
        style: string;
        mediaType: string;
        platforms: string[];
        imagePreview: string | null;
        imageFile: File | null;
        persistedBase64: string | null;
        scheduledDate: string;
        scheduledTime: string;
    }>({
        title: '',
        style: 'Fashion',
        mediaType: 'Foto',
        platforms: ['Instagram'],
        imagePreview: null,
        imageFile: null,
        persistedBase64: null,
        scheduledDate: new Date().toISOString().split('T')[0],
        scheduledTime: '12:00',
    });

    const fileInputRef = useRef<HTMLInputElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const instructionRef = useRef<HTMLTextAreaElement>(null);

    const aiStudio = useAiStudio();
    const { restoreResult, generate } = aiStudio;

    useEffect(() => {
        const initialData = getInitialAiData();
        if (!initialData) return;

        setFormData(prev => ({
            ...prev,
            style: initialData.style || 'Fashion',
            mediaType: initialData.mediaType || 'Foto',
            platforms: initialData.platforms || ['Instagram'],
            imagePreview: initialData.image ? getPreviewUrl(initialData.image) : null,
            persistedBase64: initialData.image || null,
        }));

        if (initialData.instruction && instructionRef.current) {
            instructionRef.current.value = initialData.instruction;
        }

        if (initialData.poster && initialData.caption) {
            restoreResult(initialData.poster, initialData.caption, initialData.video || null);
        }
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setUiState(prev => ({ ...prev, isVisible: true }));
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const toggleStyleDropdown = (val?: boolean) => {
        setUiState(prev => ({ 
            ...prev, 
            isStyleDropdownOpen: val !== undefined ? val : !prev.isStyleDropdownOpen 
        }));
    };

    const toggleMediaTypeDropdown = (val?: boolean) => {
        setUiState(prev => ({ 
            ...prev, 
            isMediaTypeDropdownOpen: val !== undefined ? val : !prev.isMediaTypeDropdownOpen 
        }));
    };

    const togglePlatformDropdown = (val?: boolean) => {
        setUiState(prev => ({
            ...prev,
            isPlatformDropdownOpen: val !== undefined ? val : !prev.isPlatformDropdownOpen
        }));
    };

    const showToast = (message: string, type: 'success' | 'error') => {
        setUiState(prev => ({ ...prev, toast: { isVisible: true, message, type } }));
        setTimeout(() => hideToast(), 3000);
    };

    const hideToast = () => setUiState(prev => ({ ...prev, toast: { ...prev.toast, isVisible: false } }));

    // Form Handlers
    const setStyle = (style: string) => {
        setFormData(prev => ({ ...prev, style }));
        toggleStyleDropdown(false);
    };

    const setMediaType = (mediaType: string) => {
        setFormData(prev => ({ ...prev, mediaType }));
        toggleMediaTypeDropdown(false);
    };

    const setTitle = (title: string) => {
        setFormData(prev => ({ ...prev, title }));
    };

    const togglePlatform = (platform: string) => {
        setFormData(prev => {
            const currentPlatforms = prev.platforms;
            if (platform === 'All') {
                return { ...prev, platforms: ['All'] };
            }

            const newPlatforms = currentPlatforms.includes(platform)
                ? currentPlatforms.filter(p => p !== platform)
                : [...currentPlatforms.filter(p => p !== 'All'), platform];

            return { ...prev, platforms: newPlatforms };
        });
    };

    const setScheduledDate = (date: string) => setFormData(prev => ({ ...prev, scheduledDate: date }));
    const setScheduledTime = (time: string) => setFormData(prev => ({ ...prev, scheduledTime: time }));

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                imageFile: file,
                imagePreview: URL.createObjectURL(file)
            }));
        }
    };

    // Actions
    const handleGenerate = async () => {
        if (!formData.imageFile && !formData.persistedBase64) {
            showToast("Silakan upload gambar produk terlebih dahulu untuk memulai!", 'error');
            return;
        }

        const base64Str = formData.imageFile 
            ? await fileToBase64(formData.imageFile) 
            : formData.persistedBase64;
            
        if (!base64Str) return;

        const instruction = instructionRef.current?.value || "";
        const res = await generate(base64Str, formData.style, formData.mediaType, instruction);
        
        if (res?.success && res.data) {
            localStorage.setItem('ai_studio_last_result', JSON.stringify({
                image: base64Str,
                style: formData.style,
                mediaType: formData.mediaType,
                instruction: instruction,
                platforms: formData.platforms,
                poster: res.data.image_url,
                video: res.data.video_url,
                caption: res.data.caption
            }));
            setFormData(prev => ({ ...prev, persistedBase64: base64Str }));
            showToast("Generasi konten AI berhasil dilakukan!", 'success');
        } else if (res?.success === false) {
            showToast("Terjadi kesalahan saat melakukan generasi poster", 'error');
        }
    };

    const handlePublish = async () => {
        if (!formData.title) return showToast("Judul postingan tidak boleh kosong.", 'error');
        const isVideo = formData.mediaType.toLowerCase() === 'video';
        const hasMedia = isVideo ? !!aiStudio.generatedVideo : !!aiStudio.generatedPoster;
        if (!hasMedia || !aiStudio.captionText) return showToast("Anda harus melakukan generate AI terlebih dahulu.", 'error');
        
        try {
            setUiState(prev => ({ ...prev, isPublishing: true }));
            
            // Format time - Kirim strings mentah tanpa toISOString() 
            // agar backend menerimanya secara naïve localtime.
            const dateTimeString = `${formData.scheduledDate}T${formData.scheduledTime}:00`;
            
            const payload = {
                title: formData.title,
                caption: aiStudio.captionText,
                image_url: isVideo ? '' : (aiStudio.generatedPoster ?? ''),
                video_url: isVideo ? (aiStudio.generatedVideo ?? '') : '',
                media_type: formData.mediaType.toLowerCase(),
                platform: formData.platforms.map(p => p.toLowerCase()),
                scheduled_time: dateTimeString
            };
            
            await schedulePostAPI(payload);
            
            // Berhasil
            showToast("Jadwal posting berhasil dikirim ke backend!", 'success');
            
            // Reset setelah sukses
            handleReset();
            
        } catch (error) {
            console.error(error);
            showToast(error instanceof Error ? error.message : "Terjadi kesalahan sistem.", 'error');
        } finally {
            setUiState(prev => ({ ...prev, isPublishing: false }));
        }
    };

    const handleReset = () => {
        localStorage.removeItem('ai_studio_last_result');
        setFormData({
            title: '',
            style: 'Fashion',
            mediaType: 'foto',
            platforms: ['Instagram'],
            imagePreview: null,
            imageFile: null,
            persistedBase64: null,
            scheduledDate: new Date().toISOString().split('T')[0],
            scheduledTime: '12:00',
        });
        if (instructionRef.current) instructionRef.current.value = "";
        restoreResult(null, "");
    };

    return {
        // State
        formData,
        uiState,
        aiStudio,

        // Refs
        fileInputRef,
        sectionRef,
        instructionRef,

        // Actions
        handleImageUpload,
        handleGenerate,
        handleReset,
        handlePublish,
        togglePlatform,
        toggleStyleDropdown,
        toggleMediaTypeDropdown,
        togglePlatformDropdown,
        setStyle,
        setMediaType,
        setTitle,
        setScheduledDate,
        setScheduledTime,
        hideToast,
    };
};
