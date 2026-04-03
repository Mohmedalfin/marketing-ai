import { useState, useMemo } from "react";
import {
    Clock,
    ClipboardList,
    CheckSquare,
    Search,
    Heart,
    ChevronLeft,
    ChevronRight,
    Calendar,
    Hash,
    X,
    Filter
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";

const stats = [
    { title: "Konten Terjadwal", value: 12, icon: Clock, color: "text-blue-500", bg: "bg-blue-100" },
    { title: "Draft Aktif", value: 5, icon: ClipboardList, color: "text-yellow-500", bg: "bg-yellow-100" },
    { title: "Sudah Diposting", value: 8, icon: CheckSquare, color: "text-green-500", bg: "bg-green-100" },
];

const initialPosts = [
    {
        id: 1,
        title: "Promo Spesial Ramadhan Segera Hadir",
        date: "19 Maret 2026",
        time: "15:45",
        likes: 135,
        status: "Diposting",
        platform: "Instagram",
        tags: ["Promo", "Ramadhan"]
    },
    {
        id: 2,
        title: "Koleksi Terbaru Sepatu Lari Pria",
        date: "18 Maret 2026",
        time: "10:30",
        likes: 210,
        status: "Terjadwal",
        platform: "Instagram",
        tags: ["Koleksi Baru", "Sepatu"]
    },
    {
        id: 3,
        title: "Tips Produktivitas Ala Kreator",
        date: "15 Maret 2026",
        time: "19:00",
        likes: 450,
        status: "Diposting",
        platform: "Instagram",
        tags: ["Tips", "Edukasi"]
    },
    {
        id: 4,
        title: "Behind The Scene Pembuatan Produk",
        date: "12 Maret 2026",
        time: "13:00",
        likes: 320,
        status: "Draft",
        platform: "TikTok",
        tags: ["BTS", "Produk"]
    }
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    show: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 350, damping: 25 }
    }
};

export default function DashboardPageSection() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("Semua");

    const tabs = ["Semua", "Diposting", "Terjadwal", "Draft"];

    const filteredPosts = useMemo(() => {
        return initialPosts.filter(post => {
            const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                  post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesTab = activeTab === "Semua" || post.status === activeTab;
            return matchesSearch && matchesTab;
        });
    }, [searchQuery, activeTab]);

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="w-full px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto font-sans pb-16 text-[#5C5C5C]"
        >
            {/* Header Area */}
            <motion.div variants={itemVariants} className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <div className="inline-flex items-center rounded-full border border-[#D9DED8] bg-[#F7F7F5] px-2.5 py-1 text-xs font-semibold text-[#3FBA6B] mb-3">
                        <span className="flex h-2 w-2 rounded-full bg-[#3FBA6B] mr-2 animate-pulse"></span>
                        Dashboard Kreator
                    </div>
                    <h1 className="text-4xl font-extrabold text-[#5C5C5C] tracking-tight">
                        Manajemen Konten
                    </h1>
                    <p className="mt-2 text-base font-medium text-[#5C5C5C]/70">
                        Pantau dan kelola semua aktivitas konten Anda di satu tempat.
                    </p>
                </div>
            </motion.div>

            {/* Stats */}
            <motion.div variants={containerVariants} className="grid gap-5 md:grid-cols-3 mb-10">
                {stats.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02, y: -4 }}
                            transition={{ type: "spring", stiffness: 300 } as any}
                            className="relative overflow-hidden rounded-3xl border border-[#D9DED8] bg-white p-6 shadow-sm hover:shadow-md transition-all group"
                        >
                            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-[#F7F7F5] to-transparent opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                            <div className="relative flex items-start justify-between">
                                <div className="flex flex-col">
                                    <p className="text-sm font-bold text-[#5C5C5C]/60 mb-1">
                                        {item.title}
                                    </p>
                                    <h3 className="text-4xl font-black text-[#5C5C5C] tracking-tight">
                                        {item.value}
                                    </h3>
                                </div>
                                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.bg}`}>
                                    <Icon className={`h-7 w-7 ${item.color}`} strokeWidth={2} />
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Filter & Search Bar */}
            <motion.div variants={itemVariants} className="sticky top-0 z-10 bg-[#FAFAFA]/80 backdrop-blur-xl py-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:bg-transparent sm:backdrop-blur-none sm:py-0 mb-6 transition-all duration-300">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                    {/* Tabs */}
                    <div className="flex w-full sm:w-auto items-center gap-1 rtl:space-x-reverse overflow-x-auto pb-2 sm:pb-0 rounded-2xl bg-[#F7F7F5] p-1.5 border border-[#D9DED8]">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`relative px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors duration-200 ${activeTab === tab ? "text-white" : "text-[#5C5C5C] hover:text-[#3FBA6B]"}`}
                            >
                                {activeTab === tab && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-[#3FBA6B] rounded-xl shadow-sm"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">{tab}</span>
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative w-full sm:w-[320px] group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-[#5C5C5C]/40 group-focus-within:text-[#3FBA6B] transition-colors" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Coba cari 'Promo' atau 'Tips'..."
                            className="block w-full pl-11 pr-10 py-3 rounded-2xl border border-[#D9DED8] bg-white text-sm font-semibold text-[#5C5C5C] placeholder:text-[#5C5C5C]/40 focus:outline-none focus:ring-2 focus:ring-[#3FBA6B]/30 focus:border-[#3FBA6B]/50 transition-all shadow-sm"
                        />
                        {searchQuery && (
                            <button 
                                onClick={() => setSearchQuery("")}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center"
                            >
                                <X className="h-4 w-4 text-[#5C5C5C]/40 hover:text-red-400 transition-colors" />
                            </button>
                        )}
                        {!searchQuery && (
                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                <Filter className="h-4 w-4 text-[#5C5C5C]/40" />
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Posts List */}
            <motion.div variants={containerVariants} className="flex flex-col gap-4 min-h-[300px]">
                <AnimatePresence mode="popLayout">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                            <motion.div
                                key={post.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                                whileHover={{ scale: 1.01, backgroundColor: "#ffffff", boxShadow: "0 8px 30px rgba(0,0,0,0.06)" }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 } as any}
                                className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 rounded-3xl border border-[#D9DED8]/70 bg-[#FAFAFA] p-5 shadow-sm cursor-pointer group"
                            >
                                <div className="flex items-start sm:items-center gap-5">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F0F2EB] to-[#D9E6D8] border border-[#D9DED8]/50 shadow-inner group-hover:rotate-6 transition-transform duration-300">
                                        <Hash className="h-6 w-6 text-[#3FBA6B]" strokeWidth={2.5} />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <h3 className="text-[17px] font-black text-[#4A4A4A] line-clamp-1 group-hover:text-[#3FBA6B] transition-colors">{post.title}</h3>
                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-bold text-[#5C5C5C]/60">
                                            <div className="flex items-center gap-1.5 bg-[#F7F7F5] px-2 py-1 rounded-md border border-[#D9DED8]/50">
                                                <Calendar className="h-3.5 w-3.5" />
                                                <span>{post.date}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 bg-[#F7F7F5] px-2 py-1 rounded-md border border-[#D9DED8]/50">
                                                <Clock className="h-3.5 w-3.5" />
                                                <span>{post.time}</span>
                                            </div>
                                            <div className="flex items-center gap-1 mt-1 sm:mt-0">
                                                {post.tags.map(tag => (
                                                    <span key={tag} className="text-[10px] uppercase tracking-wider bg-[#E8E6E0] text-[#5C5C5C] px-1.5 py-0.5 rounded">&middot; {tag}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-auto w-full pt-4 border-t border-[#D9DED8]/40 sm:border-t-0 sm:pt-0">
                                    <div className="flex shrink-0 items-center gap-5">
                                        <div className="flex items-center gap-1.5 text-sm font-bold text-[#5C5C5C] group/like">
                                            <div className="p-1.5 rounded-full bg-[#F7F7F5] group-hover/like:bg-red-50 transition-colors">
                                                <Heart className="h-4 w-4 fill-transparent text-[#5C5C5C]/60 group-hover/like:fill-red-500 group-hover/like:text-red-500 transition-all" />
                                            </div>
                                            {post.likes}
                                        </div>
                                        <span className={`rounded-xl px-3 py-1.5 text-[11px] font-extrabold shadow-sm flex items-center gap-1.5 border
                                            ${post.status === 'Diposting' ? 'bg-[#E3F2E1] text-[#3FBA6B] border-[#B7D8B5]/50' : 
                                              post.status === 'Terjadwal' ? 'bg-[#EBF5FF] text-[#3B82F6] border-[#93C5FD]/50' : 
                                              'bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]/50'}`}
                                        >
                                            <span className={`h-1.5 w-1.5 rounded-full ${post.status === 'Diposting' ? 'bg-[#3FBA6B]' : post.status === 'Terjadwal' ? 'bg-[#3B82F6]' : 'bg-[#D97706]'}`}></span>
                                            {post.status}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center text-center px-4 py-20 border-2 border-dashed border-[#D9DED8] rounded-3xl bg-[#FAFAFA]"
                        >
                            <div className="h-16 w-16 mb-4 rounded-full bg-[#F7F7F5] flex items-center justify-center border border-[#D9DED8]/60">
                                <Search className="h-8 w-8 text-[#5C5C5C]/30" />
                            </div>
                            <h3 className="text-xl font-bold text-[#5C5C5C]">Tidak ada konten ditemukan</h3>
                            <p className="text-sm font-medium text-[#5C5C5C]/60 mt-2 max-w-sm">
                                Kami tidak bisa menemukan konten yang sesuai dengan pencarian "{searchQuery}". Coba kata kunci lain atau ubah filter Anda.
                            </p>
                            <button 
                                onClick={() => { setSearchQuery(""); setActiveTab("Semua"); }}
                                className="mt-6 px-6 py-2.5 bg-white border border-[#D9DED8] rounded-xl text-sm font-bold text-[#5C5C5C] hover:text-[#3FBA6B] hover:border-[#3FBA6B] hover:shadow-sm transition-all"
                            >
                                Reset Pencarian
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Pagination Box */}
            <motion.div variants={itemVariants} className="mt-12 flex flex-col items-center justify-center gap-5">
                <div className="h-[1px] w-full max-w-md bg-gradient-to-r from-transparent via-[#D9DED8] to-transparent opacity-60"></div>
                
                <div className="flex items-center gap-3">
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring" } as any} className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#5C5C5C] shadow-sm border border-[#D9DED8] hover:bg-[#F7F7F5] transition-colors">
                        <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
                    </motion.button>
                    <div className="flex items-center gap-2">
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring" } as any} className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#3FBA6B] text-sm font-black text-white shadow-md shadow-[#3FBA6B]/20">
                            1
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring" } as any} className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#5C5C5C] shadow-sm border border-[#D9DED8] hover:bg-[#F7F7F5] transition-colors font-bold text-sm">
                            2
                        </motion.button>
                    </div>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring" } as any} className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#5C5C5C] shadow-sm border border-[#D9DED8] hover:bg-[#F7F7F5] transition-colors">
                        <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
                    </motion.button>
                </div>
                
                <p className="text-xs font-bold text-[#5C5C5C]/60 uppercase tracking-widest">
                    Menampilkan {filteredPosts.length} dari {filteredPosts.length > 0 ? filteredPosts.length : 0} postingan
                </p>
            </motion.div>
        </motion.div>
    );
}