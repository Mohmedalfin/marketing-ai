import { useState, useEffect } from 'react';
import draftImg1 from '../../../assets/ai-poster-preview.svg';

// =============================================================================
// 1. TYPE DEFINITIONS
//    Sesuaikan field ini dengan response JSON dari backend API nantinya.
// =============================================================================
export interface Draft {
    id: number;
    status: string;       // e.g. "Draft" | "Scheduled" | "Published"
    platform: string;     // e.g. "Instagram" | "TikTok" | "Facebook"
    title: string;
    description: string;
    date: string;         // Format: "YYYY-MM-DD" (dari API) atau display string (dummy)
    time: string;         // Format: "HH:MM"
    image: string;        // URL gambar dari API atau path lokal (dummy)
}

export interface EditDraftPayload {
    title: string;
    description: string;
    date: string;
    time: string;
}

// =============================================================================
// 2. DUMMY DATA
//    Hapus bagian ini saat sudah pakai API. Pindahkan ke file mock jika perlu.
// =============================================================================
const DUMMY_DRAFTS: Draft[] = [
    {
        id: 1,
        status: 'Draft',
        platform: 'Instagram',
        title: 'Promo Spesial Ramadhan Segera Hadir',
        description: 'Jangan lewatkan penawaran menarik kami menarik kami, Jangan lewatkan penawaran menarik kami menarik kami. #instagram #Aigency #tamaddan #proots',
        date: '2026-03-19',
        time: '15:45',
        image: draftImg1,
    },
    {
        id: 2,
        status: 'Draft',
        platform: 'TikTok',
        title: 'Koleksi Sepatu Kets Terbaru 2026',
        description: 'Tingkatkan gaya kasualmu dengan koleksi terbaru kami. Dapatkan diskon 20% khusus minggu ini! #SepatuKets #Diskon',
        date: '2026-03-20',
        time: '10:00',
        image: draftImg1,
    },
];

// =============================================================================
// 3. SERVICE LAYER (API ADAPTER)
//    Saat implementasi API, ganti isi fungsi-fungsi ini dengan fetch/axios call.
//    Komponen UI tidak perlu diubah sama sekali.
// =============================================================================
const draftService = {
    /**
     * Ambil semua draft milik user.
     * TODO (API): GET /api/drafts
     */
    fetchAll: async (): Promise<Draft[]> => {
        // -- GANTI dengan: return await api.get('/drafts');
        return new Promise((resolve) => setTimeout(() => resolve(DUMMY_DRAFTS), 500));
    },

    /**
     * Update konten & jadwal sebuah draft.
     * TODO (API): PUT /api/drafts/:id
     */
    update: async (id: number, payload: EditDraftPayload): Promise<Draft> => {
        // -- GANTI dengan: return await api.put(`/drafts/${id}`, payload);
        return new Promise((resolve) =>
            setTimeout(() => resolve({ ...DUMMY_DRAFTS.find((d) => d.id === id)!, ...payload }), 300)
        );
    },

    /**
     * Hapus sebuah draft.
     * TODO (API): DELETE /api/drafts/:id
     */
    remove: async (id: number): Promise<void> => {
        // -- GANTI dengan: return await api.delete(`/drafts/${id}`);
        return new Promise((resolve) => setTimeout(() => resolve(), 300));
    },
};

// =============================================================================
// 4. HELPER — Format tanggal ISO → tampilan Indonesia
// =============================================================================
const formatDisplayDate = (dateStr: string): string => {
    if (!dateStr) return '-';
    // Jika sudah berbentuk display string (legacy dummy), kembalikan apa adanya
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
    const months = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
    const [y, m, d] = dateStr.split('-').map(Number);
    return `${d} ${months[m - 1]} ${y}`;
};

// =============================================================================
// 5. KOMPONEN UTAMA
// =============================================================================
export default function DraftListSection() {
    // --- State UI ---
    const [isVisible, setIsVisible]     = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [editingId, setEditingId]     = useState<number | null>(null);
    const [editForm, setEditForm]       = useState<EditDraftPayload>({ title: '', description: '', date: '', time: '' });

    // --- State Data ---
    const [drafts, setDrafts]     = useState<Draft[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError]         = useState<string | null>(null);

    // --- Animasi masuk ---
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // --- Fetch data saat komponen mount ---
    useEffect(() => {
        const loadDrafts = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const data = await draftService.fetchAll();
                setDrafts(data);
            } catch {
                setError('Gagal memuat daftar draft. Silakan coba lagi.');
            } finally {
                setIsLoading(false);
            }
        };
        loadDrafts();
    }, []);

    // -------------------------------------------------------------------------
    // Handler: Mulai Edit
    // -------------------------------------------------------------------------
    const handleEditClick = (draft: Draft) => {
        setEditingId(draft.id);
        setEditForm({ title: draft.title, description: draft.description, date: draft.date, time: draft.time });
    };

    // -------------------------------------------------------------------------
    // Handler: Simpan Edit (optimistic update — UI langsung update, API di bg)
    // -------------------------------------------------------------------------
    const handleSaveEdit = async (id: number) => {
        // Optimistic: update UI dulu
        setDrafts((prev) =>
            prev.map((d) => (d.id === id ? { ...d, ...editForm } : d))
        );
        setEditingId(null);

        try {
            await draftService.update(id, editForm);
            // TODO: tampilkan toast sukses
        } catch {
            // Rollback jika gagal
            setError('Gagal menyimpan perubahan. Silakan coba lagi.');
            const original = await draftService.fetchAll();
            setDrafts(original);
        }
    };

    const handleCancelEdit = () => setEditingId(null);

    const handleDelete = async (id: number) => {
        if (!window.confirm('Yakin ingin menghapus draft ini?')) return;

        setDrafts((prev) => prev.filter((d) => d.id !== id));

        try {
            await draftService.remove(id);
        } catch {
            setError('Gagal menghapus draft. Silakan coba lagi.');
            const original = await draftService.fetchAll();
            setDrafts(original);
        }
    };

    const filteredDrafts = drafts.filter(
        (d) =>
            d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            d.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // ==========================================================================
    // RENDER
    // ==========================================================================
    return (
        <section className="min-h-screen w-full px-6 py-12 md:px-12 lg:px-20 lg:py-16">
            <div className="mx-auto max-w-5xl">

                {/* Header */}
                <div className={`mb-8 transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}`}>
                    <h1 className="text-4xl font-extrabold text-dark tracking-tight">Daftar Draft</h1>
                    <p className="mt-2 text-lg font-medium text-dark/80 max-w-4xl">
                        Kelola dan edit konten yang kamu simpan sebagai draft sebelum diposting ke sosial media.
                    </p>
                </div>

                {/* Search Bar */}
                <div className={`relative mb-10 w-full transition-all duration-700 delay-200 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                    <div className="flex w-full items-center justify-between rounded-full bg-white px-6 py-4 shadow-sm focus-within:ring-2 focus-within:ring-primary/50 transition-all">
                        <div className="flex flex-1 items-center gap-4">
                            <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Cari konten draft....."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-transparent text-base font-medium text-dark outline-hidden placeholder:text-gray-400"
                            />
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
                    <div className="flex flex-col gap-4">
                        {[1, 2].map((i) => (
                            <div key={i} className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm animate-pulse">
                                <div className="w-32 h-36 rounded-xl bg-gray-100 shrink-0" />
                                <div className="flex flex-1 flex-col gap-3 pt-1">
                                    <div className="h-4 w-24 rounded-full bg-gray-100" />
                                    <div className="h-5 w-3/4 rounded bg-gray-100" />
                                    <div className="h-4 w-full rounded bg-gray-100" />
                                    <div className="h-4 w-2/3 rounded bg-gray-100" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filteredDrafts.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-lg font-bold text-dark/60">
                            {searchQuery ? 'Draft tidak ditemukan.' : 'Belum ada draft.'}
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {filteredDrafts.map((draft, index) => {
                            const isEditing = editingId === draft.id;

                            return (
                                <div
                                    key={draft.id}
                                    style={{ transitionDelay: `${200 + index * 100}ms` }}
                                    className={`flex flex-col md:flex-row md:items-start w-full gap-4 rounded-2xl bg-white p-4 shadow-sm transition-all duration-500 ease-out hover:shadow-lg
                                        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
                                    `}
                                >
                                    <div className="w-full md:w-32 shrink-0 flex items-start justify-center">
                                        <img src={draft.image} alt={draft.title} className="w-full h-auto object-contain" />
                                    </div>

                                    <div className="flex flex-1 flex-col justify-between">
                                        <div>
                                            <div className="mb-2 flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <span className="rounded-full bg-[#F98C23] px-4 py-1 text-xs font-bold text-white">
                                                        {draft.status}
                                                    </span>
                                                    <span className="text-sm font-bold text-gray-500">{draft.platform}</span>
                                                </div>
                                                {!isEditing && (
                                                    <button
                                                        onClick={() => handleDelete(draft.id)}
                                                        className="text-red-400 hover:text-red-600 transition-colors"
                                                        title="Hapus Draft"
                                                    >
                                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                )}
                                            </div>

                                            {/* Edit Mode vs View Mode */}
                                            {isEditing ? (
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex flex-col gap-1">
                                                        <label className="text-xs font-bold text-primary">Judul</label>
                                                        <input
                                                            type="text"
                                                            value={editForm.title}
                                                            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                                            className="w-full rounded-lg border border-primary/50 px-4 py-2 text-sm font-bold text-dark focus:outline-hidden focus:ring-2 focus:ring-primary/30"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <label className="text-xs font-bold text-primary">Deskripsi / Caption</label>
                                                        <textarea
                                                            rows={2}
                                                            value={editForm.description}
                                                            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                                            className="w-full resize-none rounded-lg border border-primary/50 px-4 py-2 text-sm font-medium text-gray-600 focus:outline-hidden focus:ring-2 focus:ring-primary/30"
                                                        />
                                                    </div>
                                                    <div className="flex gap-3">
                                                        <div className="flex flex-1 flex-col gap-1">
                                                            <label className="text-xs font-bold text-primary">Tanggal</label>
                                                            <input
                                                                type="date"
                                                                value={editForm.date}
                                                                onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                                                                className="w-full rounded-lg border border-primary/50 px-3 py-2 text-sm font-medium text-dark focus:outline-hidden focus:ring-2 focus:ring-primary/30"
                                                            />
                                                        </div>
                                                        <div className="flex flex-1 flex-col gap-1">
                                                            <label className="text-xs font-bold text-primary">Waktu</label>
                                                            <input
                                                                type="time"
                                                                value={editForm.time}
                                                                onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                                                                className="w-full rounded-lg border border-primary/50 px-3 py-2 text-sm font-medium text-dark focus:outline-hidden focus:ring-2 focus:ring-primary/30"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                // bagian ini
                                                <>
                                                    <h2 className="text-base font-bold text-dark leading-tight">{draft.title}</h2>
                                                    <p
                                                        className="mt-1 text-sm font-medium text-gray-600 leading-relaxed"
                                                        style={{
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 2,
                                                            WebkitBoxOrient: 'vertical',
                                                            overflow: 'hidden',
                                                        }}
                                                    >
                                                        {draft.description}
                                                    </p>
                                                </>
                                            )}
                                        </div>

                                        {/* Footer: Tanggal & Tombol */}
                                        <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-gray-100 pt-3">
                                            <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                                                <svg className="h-4 w-4 text-primary/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <span>{formatDisplayDate(draft.date)}</span>
                                                <span className="text-gray-300">|</span>
                                                <svg className="h-4 w-4 text-primary/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span>{draft.time}</span>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                {isEditing ? (
                                                    <>
                                                        <button
                                                            onClick={handleCancelEdit}
                                                            className="rounded-xl bg-gray-100 px-5 py-2 text-sm font-bold text-gray-700 transition-all hover:bg-gray-200"
                                                        >
                                                            Batal
                                                        </button>
                                                        <button
                                                            onClick={() => handleSaveEdit(draft.id)}
                                                            className="rounded-xl bg-primary px-6 py-2 text-sm font-bold text-white transition-all hover:bg-primary-hover"
                                                        >
                                                            Simpan
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button
                                                        onClick={() => handleEditClick(draft)}
                                                        className="rounded-xl bg-[#F98C23] px-6 py-2 text-sm font-bold text-white transition-all hover:bg-[#e07a1b] hover:-translate-y-0.5"
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}
