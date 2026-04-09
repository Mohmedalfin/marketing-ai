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
    'Instagram',
    'Facebook',
    'TikTok',
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

// 3. IMPLEMENTASI CUSTOM HOOK UNTUK LOGIKA UTAMA
export const useAiStudioController = () => {
    // 2. CONSOLIDATION STATE: uiState
    const [uiState, setUiState] = useState({
        isVisible: false,
        isStyleDropdownOpen: false,
        isPlatformDropdownOpen: false,
        isPublishing: false,
    });

    // 2. CONSOLIDATION STATE: formData
    const [formData, setFormData] = useState<{
        title: string;
        style: string;
        platforms: string[];
        imagePreview: string | null;
        imageFile: File | null;
        persistedBase64: string | null;
        scheduledDate: string;
        scheduledTime: string;
    }>({
        title: '',
        style: 'Fashion',
        platforms: ['Instagram'],
        imagePreview: null,
        imageFile: null,
        persistedBase64: null,
        scheduledDate: new Date().toISOString().split('T')[0],
        scheduledTime: '12:00',
    });

    // Refs
    const fileInputRef = useRef<HTMLInputElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const instructionRef = useRef<HTMLTextAreaElement>(null);

    const aiStudio = useAiStudio();
    const { restoreResult, generate } = aiStudio;

    // 4. PERBAIKAN INISIALISASI (Local Storage Read Only Once)
    useEffect(() => {
        const initialData = getInitialAiData();
        if (!initialData) return;

        setFormData(prev => ({
            ...prev,
            style: initialData.style || 'Fashion',
            platforms: initialData.platforms || ['Instagram'],
            imagePreview: initialData.image ? getPreviewUrl(initialData.image) : null,
            persistedBase64: initialData.image || null,
        }));

        if (initialData.instruction && instructionRef.current) {
            instructionRef.current.value = initialData.instruction;
        }

        if (initialData.poster && initialData.caption) {
            restoreResult(initialData.poster, initialData.caption);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Intersection Observer Logic
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

    // UI Toggles
    const toggleStyleDropdown = (val?: boolean) => {
        setUiState(prev => ({ 
            ...prev, 
            isStyleDropdownOpen: val !== undefined ? val : !prev.isStyleDropdownOpen 
        }));
    };

    const togglePlatformDropdown = (val?: boolean) => {
        setUiState(prev => ({
            ...prev,
            isPlatformDropdownOpen: val !== undefined ? val : !prev.isPlatformDropdownOpen
        }));
    };

    // Form Handlers
    const setStyle = (style: string) => {
        setFormData(prev => ({ ...prev, style }));
        toggleStyleDropdown(false);
    };

    const setTitle = (title: string) => {
        setFormData(prev => ({ ...prev, title }));
    };

    const togglePlatform = (platform: string) => {
        // Hanya satu platform yang dipilih (sesuai req schema belakang)
        setFormData(prev => ({
            ...prev,
            platforms: [platform]
        }));
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
            alert("Silakan upload gambar produk terlebih dahulu untuk memulai keajaiban AI!");
            return;
        }

        const base64Str = formData.imageFile 
            ? await fileToBase64(formData.imageFile) 
            : formData.persistedBase64;
            
        if (!base64Str) return;

        const instruction = instructionRef.current?.value || "";
        const res = await generate(base64Str, formData.style, instruction);
        
        if (res?.success && res.data) {
            localStorage.setItem('ai_studio_last_result', JSON.stringify({
                image: base64Str,
                style: formData.style,
                instruction: instruction,
                platforms: formData.platforms,
                poster: res.data.image_url,
                caption: res.data.caption
            }));
            setFormData(prev => ({ ...prev, persistedBase64: base64Str }));
        }
    };

    const handlePublish = async () => {
        if (!formData.title) return alert("Judul postingan tidak boleh kosong.");
        if (!aiStudio.generatedPoster || !aiStudio.captionText) return alert("Anda harus melakukan generate AI terlebih dahulu.");
        
        try {
            setUiState(prev => ({ ...prev, isPublishing: true }));
            
            // Format time
            const dateTimeString = `${formData.scheduledDate}T${formData.scheduledTime}:00`;
            const isoString = new Date(dateTimeString).toISOString();
            
            const payload = {
                title: formData.title,
                caption: aiStudio.captionText,
                image_url: aiStudio.generatedPoster,
                platform: formData.platforms[0] || "Instagram",
                scheduled_time: isoString
            };
            
            await schedulePostAPI(payload);
            
            // Berhasil
            alert("Jadwal posting berhasil dikirim ke backend!");
            
            // Reset setelah sukses
            handleReset();
            
        } catch (error) {
            console.error(error);
            alert(error instanceof Error ? error.message : "Terjadi kesalahan sistem saat mempublikasikan data.");
        } finally {
            setUiState(prev => ({ ...prev, isPublishing: false }));
        }
    };

    const handleReset = () => {
        if (confirm("Ingin membersihkan semua data di studio?")) {
            localStorage.removeItem('ai_studio_last_result');
            setFormData({
                title: '',
                style: 'Fashion',
                platforms: ['Instagram'],
                imagePreview: null,
                imageFile: null,
                persistedBase64: null,
                scheduledDate: new Date().toISOString().split('T')[0],
                scheduledTime: '12:00',
            });
            if (instructionRef.current) instructionRef.current.value = "";
            restoreResult(null, "");
        }
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
        togglePlatformDropdown,
        setStyle,
        setTitle,
        setScheduledDate,
        setScheduledTime,
    };
};
