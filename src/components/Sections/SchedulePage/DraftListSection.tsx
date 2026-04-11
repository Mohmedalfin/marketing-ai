import { useState, useEffect } from 'react';
import headerAsset from '../../../assets/faq-illustration.svg';
import { useScheduleController } from '../../../hooks/useScheduleController';
import type { ScheduleItem } from '../../../types/schedule';
import { ToastNotification } from '../../Elements/ToastNotification';
import { confirmAction } from '../../../utils/swal';
import { Search, X } from "lucide-react";
import { FacebookIcon, InstagramIcon, TelegramIcon } from '../../Elements/icons/SosialMedia';
import { motion } from "framer-motion";

const PLATFORMS = ["Semua", "Instagram", "Facebook", "Telegram"] as const;

// Nanti akan dipindah/ubah saat kita menggarap PUT Edit
export interface EditDraftPayload {
    title: string;
    description: string;
    date: string;
    time: string;
}

const formatDisplayDate = (isoStr: string): string => {
    if (!isoStr) return '-';
    try {
        const dateObj = new Date(isoStr);
        const months = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
        return `${dateObj.getDate()} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
    } catch {
        return '-';
    }
};

const formatDisplayTime = (isoStr: string): string => {
    if (!isoStr) return '-';
    try {
        const dateObj = new Date(isoStr);
        return dateObj.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }).replace('.', ':');
    } catch {
        return '-';
    }
};

export default function DraftListSection() {
    const [isVisible, setIsVisible]     = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activePlatform, setActivePlatform] = useState<"Semua" | "Instagram" | "Facebook" | "Telegram">("Semua");
    const [editingId, setEditingId]     = useState<number | null>(null);
    const [editForm, setEditForm]       = useState<EditDraftPayload>({ title: '', description: '', date: '', time: '' });
    const [isSaving, setIsSaving]       = useState(false);

    const { schedules: drafts, isLoading, error, updateSchedule, deleteSchedule, toast, showToast, hideToast } = useScheduleController();

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const handleEditClick = (draft: ScheduleItem) => {
        setEditingId(draft.id);
        
        const rawScheduledTime = draft.scheduled_time || '';
        const [dDate, dTimeRaw] = rawScheduledTime.split('T');
        
        const dateInput = dDate || new Date().toISOString().split('T')[0];
        const timeInput = dTimeRaw ? dTimeRaw.slice(0, 5) : '00:00';

        setEditForm({ 
            title: draft.title || '', 
            description: draft.caption || '', 
            date: dateInput, 
            time: timeInput 
        });
    };

    const handleSaveEdit = async (id: number) => {
        if (!editForm.title.trim()) {
            return showToast("Judul tidak boleh kosong.", 'error');
        }

        try {
            setIsSaving(true);
            const payloadTime = `${editForm.date}T${editForm.time}:00`;
            
            const payload = {
                title: editForm.title,
                caption: editForm.description,
                scheduled_time: payloadTime
            };

            const result = await updateSchedule(id, payload);
            
            if (result.success) {
                setEditingId(null);
                showToast("Berhasil menyimpan perubahan jadwal!", 'success');
            } else {
                showToast(result.error || "Gagal menyimpan", 'error');
            }
        } catch (err) {
            console.error(err);
            showToast("Kesalahan format waktu atau jaringan.", 'error');
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancelEdit = () => setEditingId(null);

    const handleDelete = async (id: number) => {
        const isConfirmed = await confirmAction('Hapus Draft?', 'Draft ini akan dihapus permanen dan tidak bisa dikembalikan.', 'Ya, Hapus');
        if (!isConfirmed) return;
        
        try {
            const result = await deleteSchedule(id);
            if (result.success) {
                showToast("Draft berhasil dihapus!", 'success');
            } else {
                showToast(result.error || "Gagal menghapus draft.", 'error');
            }
        } catch (err) {
            console.error(err);
            showToast("Kesalahan jaringan saat menghapus.", 'error');
        }
    };

    const filteredDrafts = drafts.filter((d) => {
        const matchesSearch = (d.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                              (d.caption || '').toLowerCase().includes(searchQuery.toLowerCase());
        
        let platArr: string[] = [];
        if (Array.isArray(d.platform)) {
            platArr = d.platform;
        } else if (typeof d.platform === 'string') {
            try {
                const parsed = JSON.parse(d.platform);
                platArr = Array.isArray(parsed) ? parsed : [d.platform];
            } catch {
                 platArr = [d.platform];
            }
        }

        const matchesPlatform = activePlatform === "Semua" || platArr.some(p => 
            p.toLowerCase() === activePlatform.toLowerCase() || p.toLowerCase() === 'all'
        );
        
        return matchesSearch && matchesPlatform;
    });

    return (
        <section className="min-h-screen w-full py-10 md:py-20 px-6 md:px-12 lg:px-16">
            <div className="mx-auto max-w-7xl">

                <div className={`mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}`}>
                    
                    <div className="flex items-start gap-5 md:gap-6">
                        <div className="hidden sm:flex h-20 w-20 md:h-30 md:w-30 shrink-0 overflow-hidden">
                            <img 
                                src={headerAsset} 
                                alt="Header Dekorasi" 
                                className="h-full w-full object-cover" 
                            />
                        </div>

                        <div className="flex flex-col justify-center">
                            <div className="flex flex-wrap items-center gap-3 mb-2 md:mb-3">
                                <h1 className="text-4xl md:text-5xl font-extrabold text-dark tracking-tight">
                                    Daftar Draft
                                </h1>
                                
                                <span className="flex items-center gap-1.5 rounded-full bg-primary-light/30 px-3 py-1 text-xs font-bold text-primary border border-primary/20">
                                    <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                    </span>
                                    {drafts.length} Tersimpan
                                </span>
                            </div>
                            
                            <p className="text-sm md:text-base font-medium text-dark/70 max-w-2xl leading-relaxed">
                                Ruang kerjamu untuk mengelola, mengedit, dan menyempurnakan postingan sebelum diterbitkan ke audiens.
                            </p>
                        </div>
                    </div>

                </div>

                {/* Search & Filter Bar */}
                <div
                    className={`relative mb-10 w-full transition-all duration-700 delay-200 ease-out ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                    }`}
                    >
                    <div className="flex flex-col xl:flex-row gap-3 md:gap-4 items-stretch xl:items-center justify-between">
                        
                        {/* Search Input */}
                        <div className="w-full xl:flex-1">
                        <div className="flex w-full items-center justify-between rounded-full bg-white px-4 md:px-5 py-4 md:py-5 shadow-sm focus-within:ring-2 focus-within:ring-primary/50 transition-all border border-gray-200">
                            <div className="flex flex-1 items-center gap-3 min-w-0">
                            <Search className="h-5 w-5 text-gray-400 shrink-0" strokeWidth={2.5} />
                            <input
                                type="text"
                                placeholder="Cari konten draft..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full min-w-0 bg-transparent text-sm font-semibold text-dark focus:outline-hidden placeholder:text-gray-400"
                            />
                            </div>

                            {searchQuery ? (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="flex shrink-0 ml-2 items-center"
                            >
                                <X className="h-4 w-4 text-gray-400 hover:text-red-400 transition-colors" />
                            </button>
                            ) : (
                            <div className="flex shrink-0 ml-2 items-center pointer-events-none" />
                            )}
                        </div>
                        </div>

                        {/* Platform Tabs */}
                        <div className="w-full xl:w-auto xl:max-w-[320px]">
                        <div className="w-full rounded-[24px] bg-white p-2 border border-gray-200 shadow-sm">
                            <div className="grid grid-cols-4 gap-2 xl:flex xl:items-center">
                            {PLATFORMS.map((platform) => (
                                <button
                                key={platform}
                                onClick={() => setActivePlatform(platform as any)}
                                className={`relative flex items-center justify-center ${
                                    platform === 'Semua'
                                    ? 'px-3 py-2.5'
                                    : 'h-10 w-full xl:w-10 xl:h-10 sm:h-11'
                                } rounded-full text-sm font-bold whitespace-nowrap transition-colors duration-200 focus:outline-none ${
                                    activePlatform === platform
                                    ? 'text-white'
                                    : 'text-dark hover:text-primary'
                                }`}
                                >
                                {activePlatform === platform && (
                                    <motion.div
                                    layoutId="activePlatformOutlineDraft"
                                    className="absolute inset-0 bg-primary rounded-full shadow-md"
                                    initial={false}
                                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                    />
                                )}

                                <span className="relative z-10 flex items-center justify-center">
                                    {platform === 'Instagram' ? (
                                    <InstagramIcon
                                        className={`w-5 h-5 sm:w-[22px] sm:h-[22px] object-contain ${
                                        activePlatform === platform ? 'drop-shadow-sm' : ''
                                        }`}
                                    />
                                    ) : platform === 'Facebook' ? (
                                    <FacebookIcon
                                        className={`w-5 h-5 sm:w-[22px] sm:h-[22px] object-contain ${
                                        activePlatform === platform ? 'drop-shadow-sm' : ''
                                        }`}
                                    />
                                    ) : platform === 'Telegram' ? (
                                        <TelegramIcon
                                            className={`w-5 h-5 sm:w-[22px] sm:h-[22px] object-contain ${
                                            activePlatform === platform ? 'drop-shadow-sm' : ''
                                            }`}
                                        />
                                    ) : (
                                    platform
                                    )}
                                </span>
                                </button>
                            ))}
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                

                {error && (
                    <div className="mb-6 rounded-xl bg-red-50 border border-red-200 px-5 py-3 text-sm font-medium text-red-600 flex items-center gap-2">
                        <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                        </svg>
                        {error}
                    </div>
                )}

                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex gap-4 rounded-3xl bg-gray-100 shadow-sm animate-pulse aspect-[4/5] sm:aspect-[3/4]" />
                        ))}
                    </div>
                ) : filteredDrafts.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-lg font-bold text-dark/60">
                            {searchQuery ? 'Draft tidak ditemukan.' : 'Belum ada draft.'}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                        {filteredDrafts.map((draft, index) => {
                            const isEditing = editingId === draft.id;

                            return (
                                <div
                                    key={draft.id}
                                    style={{ transitionDelay: `${200 + index * 100}ms` }}
                                    className={`relative w-full aspect-[4/5] sm:aspect-[3/4] rounded-3xl overflow-hidden shadow-md group transition-all duration-1000 ease-out
                                        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
                                    `}
                                >
                                    {/* Media Background - Gambar atau Video */}
                                    {(draft.media_type?.toLowerCase() === 'video' || (!draft.media_type && draft.video_url)) && draft.video_url ? (
                                        <video
                                            src={draft.video_url}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            style={{
                                                filter: isEditing ? 'blur(8px) brightness(0.6)' : 'none'
                                            }}
                                            autoPlay muted loop playsInline
                                        />
                                    ) : (
                                        <img 
                                            src={draft.image_url} 
                                            alt={draft.title} 
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            style={{
                                                filter: isEditing ? 'blur(8px) brightness(0.6)' : 'none'
                                            }}
                                        />
                                    )}
                                    
                                    {/* Gradient Overlay untuk teks agar mudah dibaca */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/5 pointer-events-none" />

                                    <div className="relative z-10 w-full h-full flex flex-col justify-end p-4 md:p-5">
                                        
                                        <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-40">
                                            {(() => {
                                                let platArr: string[] = [];
                                                if (Array.isArray(draft.platform)) platArr = draft.platform;
                                                else if (typeof draft.platform === 'string') {
                                                    try {
                                                        const parsed = JSON.parse(draft.platform);
                                                        platArr = Array.isArray(parsed) ? parsed : [draft.platform];
                                                    } catch {
                                                        platArr = [draft.platform];
                                                    }
                                                }
                                                
                                                if (platArr.some(p => p.toLowerCase() === 'all')) {
                                                    return (
                                                        <span className="rounded-full bg-white/20 backdrop-blur-md border border-white/20 px-2.5 py-1 text-[9px] font-bold text-white shadow-sm flex items-center gap-1.5">
                                                            Semua Platform
                                                        </span>
                                                    );
                                                }
                                                
                                                return platArr.map((p, i) => {
                                                    const pl = p.toLowerCase();
                                                    let Icon = null;
                                                    if (pl === 'instagram') Icon = InstagramIcon;
                                                    else if (pl === 'facebook') Icon = FacebookIcon;
                                                    else if (pl === 'telegram') Icon = TelegramIcon;
                                                    
                                                    return (
                                                        <span key={`${draft.id}-plat-${i}`} className="rounded-full bg-white/20 backdrop-blur-md border border-white/20 pl-1.5 pr-2.5 py-1 text-[9px] font-bold text-white shadow-sm flex items-center gap-1.5 w-max">
                                                            {Icon && <Icon className="w-3.5 h-3.5 object-contain" />}
                                                            <span className="capitalize">{p}</span>
                                                        </span>
                                                    );
                                                });
                                            })()}
                                        </div>

                                        <div className="absolute top-4 right-4 flex items-center gap-2">
                                            <span className="rounded-full bg-[#F98C23] px-3 py-1 text-[9px] md:text-[10px] font-bold text-white shadow-md backdrop-blur-sm">
                                                {draft.status}
                                            </span>
                                            {!isEditing && (
                                                <button
                                                    onClick={() => handleDelete(draft.id)}
                                                    className="text-white/80 hover:text-red-500 transition-colors bg-black/40 hover:bg-black/60 backdrop-blur-sm p-1.5 rounded-full z-40 focus:outline-none"
                                                    title="Hapus Draft"
                                                >
                                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>

                                        {isEditing ? (
                                            <div className="flex flex-col gap-2 w-full bg-white/95 backdrop-blur-md p-3 rounded-xl border border-white/20 shadow-xl z-40 relative text-dark">
                                                <div className="flex flex-col gap-1 w-full">
                                                    <label className="text-[10px] sm:text-xs font-bold text-primary">Judul</label>
                                                    <input
                                                        type="text"
                                                        value={editForm.title}
                                                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                                        className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-bold text-dark focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 bg-white"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-1 w-full flex-1">
                                                    <label className="text-[10px] sm:text-xs font-bold text-primary">Deskripsi</label>
                                                    <textarea
                                                        rows={7}
                                                        value={editForm.description}
                                                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                                        className="w-full resize-none overflow-y-auto [&::-webkit-scrollbar]:hidden rounded-lg border border-gray-300 px-3 py-1.5 text-[11px] sm:text-xs font-medium text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 bg-white"
                                                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                                    />
                                                </div>
                                                <div className="flex gap-2 w-full">
                                                    <div className="flex flex-1 flex-col gap-1">
                                                        <label className="text-[10px] font-bold text-primary">Tanggal</label>
                                                        <input
                                                            type="date"
                                                            value={editForm.date}
                                                            onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                                                            className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-[10px] font-medium text-dark focus:outline-none focus:ring-2 focus:ring-primary/40 bg-white"
                                                        />
                                                    </div>
                                                    <div className="flex flex-1 flex-col gap-1">
                                                        <label className="text-[10px] font-bold text-primary">Waktu</label>
                                                        <input
                                                            type="time"
                                                            value={editForm.time}
                                                            onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                                                            className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-[10px] font-medium text-dark focus:outline-none focus:ring-2 focus:ring-primary/40 bg-white"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 mt-1 w-full">
                                                    <button
                                                        onClick={handleCancelEdit}
                                                        disabled={isSaving}
                                                        className={`flex-1 rounded-lg bg-gray-200 px-3 py-2 text-[10px] font-bold text-gray-700 transition-all hover:bg-gray-300 focus:outline-none ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                    >
                                                        Batal
                                                    </button>
                                                    <button
                                                        onClick={() => handleSaveEdit(draft.id)}
                                                        disabled={isSaving}
                                                        className={`flex-1 rounded-lg bg-primary px-3 py-2 text-[10px] font-bold text-white transition-all shadow-md focus:outline-none flex justify-center items-center ${isSaving ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary-hover'}`}
                                                    >
                                                        {isSaving ? (
                                                            <svg className="animate-spin h-3.5 w-3.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                        ) : "Simpan"}
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col justify-end w-full gap-2 transition-transform duration-300">
                                                <div className="flex flex-col gap-1.5 w-full">
                                                    <h3 className="text-base md:text-lg font-bold text-white drop-shadow-md leading-tight line-clamp-2">
                                                        {draft.title}
                                                    </h3>
                                                    <p
                                                        className="text-[11px] md:text-xs font-medium text-white/80 leading-relaxed drop-shadow-sm break-words overflow-hidden"
                                                        style={{
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 2,
                                                            WebkitBoxOrient: 'vertical',
                                                            overflow: 'hidden',
                                                        }}
                                                    >
                                                        {draft.caption || draft.title || "Tanpa keterangan"}
                                                    </p>
                                                    {/* Tanggal & Waktu */}
                                                    <div className="flex items-center gap-1.5 text-[10px] font-medium text-white/70 mt-1">
                                                        <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        <span className="truncate">{formatDisplayDate(draft.scheduled_time)}</span>
                                                        <span className="opacity-50">|</span>
                                                        <span className="shrink-0">{formatDisplayTime(draft.scheduled_time)}</span>
                                                    </div>
                                                </div>
                                                
                                                <div className="w-full mt-3">
                                                    <button
                                                        onClick={() => handleEditClick(draft)}
                                                        className="w-full rounded-xl bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-white hover:text-dark hover:-translate-y-0.5 focus:outline-none shadow-lg"
                                                    >
                                                        Edit Draft
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            
            <ToastNotification 
                message={toast.message}
                isVisible={toast.isVisible}
                onClose={hideToast}
                type={toast.type}
            />
        </section>
    );
}
