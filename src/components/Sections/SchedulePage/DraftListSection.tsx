import { useState, useEffect } from 'react';

// TODO: Ganti path gambar sesuai dengan yang ada di folder kamu
import draftImg1 from '../../../assets/ai-poster-preview.svg';

// --- TYPE DEFINITION ---
interface Draft {
    id: number;
    status: string;
    platform: string;
    title: string;
    description: string;
    date: string;
    time: string;
    image: string;
}

export default function DraftListSection() {
    const [isVisible, setIsVisible] = useState(false);

    // 1. STATE UNTUK DATA DRAFT (Memakai array agar bisa ditambah/dihapus/diedit)
    const [drafts, setDrafts] = useState<Draft[]>([
        {
            id: 1,
            status: "Draft",
            platform: "Instagram",
            title: "Promo Spesial Ramadhan Segera Hadir",
            description: "Jangan lewatkan penawaran menarik kami menarik kami. #instagram #Aigency #tamaddan #proots",
            date: "19 Maret 2026",
            time: "15:45",
            image: draftImg1
        },
        {
            id: 2,
            status: "Draft",
            platform: "TikTok",
            title: "Koleksi Sepatu Kets Terbaru 2026",
            description: "Tingkatkan gaya kasualmu dengan koleksi terbaru kami. Dapatkan diskon 20% khusus minggu ini! #SepatuKets #Diskon",
            date: "20 Maret 2026",
            time: "10:00",
            image: draftImg1 // Pakai gambar yang sama untuk contoh
        }
    ]);

    // 2. STATE UNTUK PENCARIAN (Search)
    const [searchQuery, setSearchQuery] = useState("");

    // 3. STATE UNTUK MODE EDIT
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState({ title: "", description: "", date: "", time: "" });

    // Animasi masuk saat komponen dimuat
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // --- FUNGSI-FUNGSI INTERAKTIF ---

    // Fungsi Mulai Edit
    const handleEditClick = (draft: Draft) => {
        setEditingId(draft.id);
        setEditForm({ title: draft.title, description: draft.description, date: draft.date, time: draft.time });
    };

    // Fungsi Simpan Hasil Edit
    const handleSaveEdit = (id: number) => {
        setDrafts(drafts.map(draft => 
            draft.id === id 
                ? { ...draft, title: editForm.title, description: editForm.description, date: editForm.date, time: editForm.time } 
                : draft
        ));
        setEditingId(null);
    };

    // Fungsi Batal Edit
    const handleCancelEdit = () => {
        setEditingId(null);
    };

    // Fungsi Hapus Draft
    const handleDelete = (id: number) => {
        const confirmDelete = window.confirm("Yakin ingin menghapus draft ini?");
        if (confirmDelete) {
            setDrafts(drafts.filter(draft => draft.id !== id));
        }
    };

    // Fungsi Cari (Filter data berdasarkan input search)
    const filteredDrafts = drafts.filter(draft => 
        draft.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        draft.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <section className="min-h-screen w-full px-6 py-12 md:px-12 lg:px-20 lg:py-16">
            <div className="mx-auto max-w-5xl">
                
                {/* --- HEADER TITLE --- */}
                <div className={`mb-8 transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}`}>
                    <h1 className="text-4xl font-extrabold text-dark tracking-tight">Daftar Draft</h1>
                    <p className="mt-2 text-lg font-medium text-dark/80 max-w-4xl">
                        Kelola dan edit konten yang kamu simpan sebagai draft sebelum diposting ke sosial media.
                    </p>
                </div>

                {/* --- SEARCH BAR DINAMIS --- */}
                <div className={`relative mb-10 w-full transition-all duration-700 delay-200 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                    <div className="flex w-full items-center justify-between rounded-full bg-white px-6 py-4 shadow-sm focus-within:ring-2 focus-within:ring-primary/50 transition-all">
                        <div className="flex flex-1 items-center gap-4">
                            <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            {/* Input diikat dengan state searchQuery */}
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

                {/* --- DRAFT LIST (Me-render hasil filter) --- */}
                <div className="flex flex-col gap-6">
                    {filteredDrafts.length === 0 ? (
                        <div className="text-center py-10">
                            <p className="text-lg font-bold text-dark/60">Draft tidak ditemukan.</p>
                        </div>
                    ) : (
                        filteredDrafts.map((draft, index) => {
                            const isEditing = editingId === draft.id;

                            return (
                                <div 
                                    key={draft.id}
                                    style={{ transitionDelay: `${400 + (index * 150)}ms` }}
                                    className={`flex flex-col md:flex-row md:items-start w-full gap-4 rounded-[1rem] bg-white p-5 shadow-sm transition-all duration-500 ease-out hover:shadow-lg
                                        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
                                    `}
                                >
                                    {/* Kiri: Gambar Thumbnail */}
                                    <div className="w-full md:w-32 shrink-0 flex items-start justify-center">
                                        <img src={draft.image} alt="Draft Preview" className="w-full h-auto object-contain" />
                                    </div>

                                    {/* Kanan: Detail Konten */}
                                    <div className="flex flex-1 flex-col justify-between">
                                        
                                        <div>
                                            <div className="mb-3 flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <span className="rounded-full bg-[#F98C23] px-6 py-1.5 text-sm font-bold text-white">
                                                        {draft.status}
                                                    </span>
                                                    <span className="text-sm font-bold text-gray-500">
                                                        {draft.platform}
                                                    </span>
                                                </div>
                                                
                                                {/* Tombol Hapus (Silang) di pojok kanan atas card */}
                                                {!isEditing && (
                                                    <button onClick={() => handleDelete(draft.id)} className="text-red-400 hover:text-red-600 transition-colors" title="Hapus Draft">
                                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                )}
                                            </div>

                                            {/* LOGIKA MODE EDIT vs MODE VIEW */}
                                            {isEditing ? (
                                                // Tampilan saat Mode Edit Aktif
                                                <div className="flex flex-col gap-3">
                                                    <div className="flex flex-col gap-1">
                                                        <label className="text-xs font-bold text-primary">Judul</label>
                                                        <input 
                                                            type="text" 
                                                            value={editForm.title}
                                                            onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                                                            className="w-full rounded-lg border border-primary/50 px-4 py-2 text-base font-bold text-dark focus:outline-hidden focus:ring-2 focus:ring-primary/30"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <label className="text-xs font-bold text-primary">Deskripsi / Caption</label>
                                                        <textarea 
                                                            rows={3}
                                                            value={editForm.description}
                                                            onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                                                            className="w-full resize-none rounded-lg border border-primary/50 px-4 py-2 text-sm font-medium text-gray-600 focus:outline-hidden focus:ring-2 focus:ring-primary/30"
                                                        />
                                                    </div>
                                                    {/* Edit Jadwal */}
                                                    <div className="flex gap-3">
                                                        <div className="flex flex-1 flex-col gap-1">
                                                            <label className="text-xs font-bold text-primary">Tanggal</label>
                                                            <input
                                                                type="date"
                                                                value={editForm.date}
                                                                onChange={(e) => setEditForm({...editForm, date: e.target.value})}
                                                                className="w-full rounded-lg border border-primary/50 px-4 py-2 text-sm font-medium text-dark focus:outline-hidden focus:ring-2 focus:ring-primary/30"
                                                            />
                                                        </div>
                                                        <div className="flex flex-1 flex-col gap-1">
                                                            <label className="text-xs font-bold text-primary">Waktu</label>
                                                            <input
                                                                type="time"
                                                                value={editForm.time}
                                                                onChange={(e) => setEditForm({...editForm, time: e.target.value})}
                                                                className="w-full rounded-lg border border-primary/50 px-4 py-2 text-sm font-medium text-dark focus:outline-hidden focus:ring-2 focus:ring-primary/30"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                // Tampilan Normal
                                                <>
                                                    <h2 className="text-xl md:text-xl font-bold text-dark leading-tight">
                                                        {draft.title}
                                                    </h2>
                                                    <p className="text-base font-medium text-gray-600 leading-relaxed line-clamp-2">
                                                        {draft.description}
                                                    </p>
                                                </>
                                            )}
                                        </div>

                                        {/* Bagian Bawah: Tanggal & Aksi */}
                                        <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-gray-200 pt-3">
                                            
                                            <div className="flex items-center gap-2 text-base font-medium text-dark">
                                                <span>{draft.date}</span>
                                                <span className="text-gray-300">|</span>
                                                <span>{draft.time}</span>
                                            </div>

                                            {/* Ganti Tombol Berdasarkan Mode */}
                                            <div className="flex items-center gap-3">
                                                {isEditing ? (
                                                    <>
                                                        <button 
                                                            onClick={handleCancelEdit}
                                                            className="rounded-xl bg-gray-200 px-6 py-2.5 text-sm font-bold text-gray-700 transition-all hover:bg-gray-300"
                                                        >
                                                            Batal
                                                        </button>
                                                        <button 
                                                            onClick={() => handleSaveEdit(draft.id)}
                                                            className="rounded-xl bg-primary px-8 py-2.5 text-sm font-bold text-white transition-all hover:bg-primary-hover"
                                                        >
                                                            Simpan
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button 
                                                            onClick={() => handleEditClick(draft)}
                                                            className="rounded-xl bg-[#F98C23] px-8 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#e07a1b] hover:-translate-y-0.5"
                                                        >
                                                            Edit
                                                        </button>
                                                    </>
                                                )}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </section>
    );
}