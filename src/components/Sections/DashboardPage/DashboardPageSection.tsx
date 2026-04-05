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
    Filter,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import type { Variants, Transition } from "framer-motion";

type PostStatus = "Diposting" | "Terjadwal" | "Draft";
type DashboardTab = "Semua" | PostStatus;

type StatItem = {
    title: string;
    value: number;
    icon: LucideIcon;
    color: string;
    bg: string;
};

type PostItem = {
    id: number;
    title: string;
    date: string;
    time: string;
    likes: number;
    status: PostStatus;
    platform: string;
    tags: string[];
};

const stats: StatItem[] = [
    {
        title: "Konten Terjadwal",
        value: 12,
        icon: Clock,
        color: "text-blue-500",
        bg: "bg-blue-100",
    },
    {
        title: "Draft Aktif",
        value: 5,
        icon: ClipboardList,
        color: "text-yellow-500",
        bg: "bg-yellow-100",
    },
    {
        title: "Sudah Diposting",
        value: 8,
        icon: CheckSquare,
        color: "text-green-500",
        bg: "bg-green-100",
    },
];

const initialPosts: PostItem[] = [
    {
        id: 1,
        title: "Promo Spesial Ramadhan Segera Hadir",
        date: "19 Maret 2026",
        time: "15:45",
        likes: 135,
        status: "Diposting",
        platform: "Instagram",
        tags: ["Promo", "Ramadhan"],
    },
    {
        id: 2,
        title: "Koleksi Terbaru Sepatu Lari Pria",
        date: "18 Maret 2026",
        time: "10:30",
        likes: 210,
        status: "Terjadwal",
        platform: "Instagram",
        tags: ["Koleksi Baru", "Sepatu"],
    },
    {
        id: 3,
        title: "Tips Produktivitas Ala Kreator",
        date: "15 Maret 2026",
        time: "19:00",
        likes: 450,
        status: "Diposting",
        platform: "Instagram",
        tags: ["Tips", "Edukasi"],
    },
    {
        id: 4,
        title: "Behind The Scene Pembuatan Produk",
        date: "12 Maret 2026",
        time: "13:00",
        likes: 320,
        status: "Draft",
        platform: "TikTok",
        tags: ["BTS", "Produk"],
    },
];

const tabs: DashboardTab[] = ["Semua", "Diposting", "Terjadwal", "Draft"];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    show: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 350, damping: 25 },
    },
};

const cardTransition: Transition = {
    type: "spring",
    stiffness: 300,
};

const postTransition: Transition = {
    type: "spring",
    stiffness: 400,
    damping: 25,
};

const buttonTransition: Transition = {
    type: "spring",
};

const tabTransition: Transition = {
    type: "spring",
    bounce: 0.2,
    duration: 0.6,
};

export default function DashboardPageSection() {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [activeTab, setActiveTab] = useState<DashboardTab>("Semua");

    const filteredPosts = useMemo<PostItem[]>(() => {
        return initialPosts.filter((post) => {
            const query = searchQuery.toLowerCase();

            const matchesSearch =
                post.title.toLowerCase().includes(query) ||
                post.tags.some((tag) => tag.toLowerCase().includes(query));

            const matchesTab = activeTab === "Semua" || post.status === activeTab;

            return matchesSearch && matchesTab;
        });
    }, [searchQuery, activeTab]);

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="mx-auto w-full max-w-7xl px-4 pb-16 font-sans text-[#5C5C5C] sm:px-6 lg:px-8"
        >
            <motion.div
                variants={itemVariants}
                className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end"
            >
                <div>
                    <div className="mb-3 inline-flex items-center rounded-full border border-[#D9DED8] bg-[#F7F7F5] px-2.5 py-1 text-xs font-semibold text-[#3FBA6B]">
                        <span className="mr-2 flex h-2 w-2 animate-pulse rounded-full bg-[#3FBA6B]"></span>
                        Dashboard Kreator
                    </div>

                    <h1 className="text-4xl font-extrabold tracking-tight text-[#5C5C5C]">
                        Manajemen Konten
                    </h1>

                    <p className="mt-2 text-base font-medium text-[#5C5C5C]/70">
                        Pantau dan kelola semua aktivitas konten Anda di satu tempat.
                    </p>
                </div>
            </motion.div>

            <motion.div
                variants={containerVariants}
                className="mb-10 grid gap-5 md:grid-cols-3"
            >
                {stats.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02, y: -4 }}
                            transition={cardTransition}
                            className="group relative overflow-hidden rounded-3xl border border-[#D9DED8] bg-white p-6 shadow-sm transition-all hover:shadow-md"
                        >
                            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-[#F7F7F5] to-transparent opacity-50 transition-transform duration-500 group-hover:scale-150"></div>

                            <div className="relative flex items-start justify-between">
                                <div className="flex flex-col">
                                    <p className="mb-1 text-sm font-bold text-[#5C5C5C]/60">
                                        {item.title}
                                    </p>

                                    <h3 className="text-4xl font-black tracking-tight text-[#5C5C5C]">
                                        {item.value}
                                    </h3>
                                </div>

                                <div
                                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.bg}`}
                                >
                                    <Icon className={`h-7 w-7 ${item.color}`} strokeWidth={2} />
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>

            <motion.div
                variants={itemVariants}
                className="sticky top-0 z-10 -mx-4 mb-6 bg-[#FAFAFA]/80 px-4 py-4 backdrop-blur-xl transition-all duration-300 sm:mx-0 sm:bg-transparent sm:px-0 sm:py-0 sm:backdrop-blur-none"
            >
                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <div className="rtl:space-x-reverse flex w-full items-center gap-1 overflow-x-auto rounded-2xl border border-[#D9DED8] bg-[#F7F7F5] p-1.5 pb-2 sm:w-auto sm:pb-0">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`relative whitespace-nowrap rounded-xl px-4 py-2 text-sm font-bold transition-colors duration-200 ${activeTab === tab
                                    ? "text-white"
                                    : "text-[#5C5C5C] hover:text-[#3FBA6B]"
                                    }`}
                            >
                                {activeTab === tab && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 rounded-xl bg-[#3FBA6B] shadow-sm"
                                        transition={tabTransition}
                                    />
                                )}
                                <span className="relative z-10">{tab}</span>
                            </button>
                        ))}
                    </div>

                    <div className="group relative w-full sm:w-[320px]">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                            <Search className="h-5 w-5 text-[#5C5C5C]/40 transition-colors group-focus-within:text-[#3FBA6B]" />
                        </div>

                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Coba cari 'Promo' atau 'Tips'..."
                            className="block w-full rounded-2xl border border-[#D9DED8] bg-white py-3 pl-11 pr-10 text-sm font-semibold text-[#5C5C5C] shadow-sm transition-all placeholder:text-[#5C5C5C]/40 focus:border-[#3FBA6B]/50 focus:outline-none focus:ring-2 focus:ring-[#3FBA6B]/30"
                        />

                        {searchQuery ? (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute inset-y-0 right-0 flex items-center pr-4"
                            >
                                <X className="h-4 w-4 text-[#5C5C5C]/40 transition-colors hover:text-red-400" />
                            </button>
                        ) : (
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                                <Filter className="h-4 w-4 text-[#5C5C5C]/40" />
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>

            <motion.div
                variants={containerVariants}
                className="flex min-h-[300px] flex-col gap-4"
            >
                <AnimatePresence mode="popLayout">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                            <motion.div
                                key={post.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.95,
                                    transition: { duration: 0.2 },
                                }}
                                whileHover={{
                                    scale: 1.01,
                                    backgroundColor: "#ffffff",
                                    boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
                                }}
                                transition={postTransition}
                                className="group flex cursor-pointer flex-col justify-between gap-5 rounded-3xl border border-[#D9DED8]/70 bg-[#FAFAFA] p-5 shadow-sm sm:flex-row sm:items-center"
                            >
                                <div className="flex items-start gap-5 sm:items-center">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#D9DED8]/50 bg-gradient-to-br from-[#F0F2EB] to-[#D9E6D8] shadow-inner transition-transform duration-300 group-hover:rotate-6">
                                        <Hash className="h-6 w-6 text-[#3FBA6B]" strokeWidth={2.5} />
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <h3 className="line-clamp-1 text-[17px] font-black text-[#4A4A4A] transition-colors group-hover:text-[#3FBA6B]">
                                            {post.title}
                                        </h3>

                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-bold text-[#5C5C5C]/60">
                                            <div className="flex items-center gap-1.5 rounded-md border border-[#D9DED8]/50 bg-[#F7F7F5] px-2 py-1">
                                                <Calendar className="h-3.5 w-3.5" />
                                                <span>{post.date}</span>
                                            </div>

                                            <div className="flex items-center gap-1.5 rounded-md border border-[#D9DED8]/50 bg-[#F7F7F5] px-2 py-1">
                                                <Clock className="h-3.5 w-3.5" />
                                                <span>{post.time}</span>
                                            </div>

                                            <div className="mt-1 flex items-center gap-1 sm:mt-0">
                                                {post.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="rounded bg-[#E8E6E0] px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-[#5C5C5C]"
                                                    >
                                                        &middot; {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex w-full items-center justify-between gap-6 border-t border-[#D9DED8]/40 pt-4 sm:w-auto sm:justify-end sm:border-t-0 sm:pt-0">
                                    <div className="flex shrink-0 items-center gap-5">
                                        <div className="group/like flex items-center gap-1.5 text-sm font-bold text-[#5C5C5C]">
                                            <div className="rounded-full bg-[#F7F7F5] p-1.5 transition-colors group-hover/like:bg-red-50">
                                                <Heart className="h-4 w-4 fill-transparent text-[#5C5C5C]/60 transition-all group-hover/like:fill-red-500 group-hover/like:text-red-500" />
                                            </div>
                                            {post.likes}
                                        </div>

                                        <span
                                            className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-[11px] font-extrabold shadow-sm ${post.status === "Diposting"
                                                ? "border-[#B7D8B5]/50 bg-[#E3F2E1] text-[#3FBA6B]"
                                                : post.status === "Terjadwal"
                                                    ? "border-[#93C5FD]/50 bg-[#EBF5FF] text-[#3B82F6]"
                                                    : "border-[#FDE68A]/50 bg-[#FEF3C7] text-[#D97706]"
                                                }`}
                                        >
                                            <span
                                                className={`h-1.5 w-1.5 rounded-full ${post.status === "Diposting"
                                                    ? "bg-[#3FBA6B]"
                                                    : post.status === "Terjadwal"
                                                        ? "bg-[#3B82F6]"
                                                        : "bg-[#D97706]"
                                                    }`}
                                            ></span>
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
                            className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-[#D9DED8] bg-[#FAFAFA] px-4 py-20 text-center"
                        >
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[#D9DED8]/60 bg-[#F7F7F5]">
                                <Search className="h-8 w-8 text-[#5C5C5C]/30" />
                            </div>

                            <h3 className="text-xl font-bold text-[#5C5C5C]">
                                Tidak ada konten ditemukan
                            </h3>

                            <p className="mt-2 max-w-sm text-sm font-medium text-[#5C5C5C]/60">
                                Kami tidak bisa menemukan konten yang sesuai dengan pencarian "
                                {searchQuery}". Coba kata kunci lain atau ubah filter Anda.
                            </p>

                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setActiveTab("Semua");
                                }}
                                className="mt-6 rounded-xl border border-[#D9DED8] bg-white px-6 py-2.5 text-sm font-bold text-[#5C5C5C] transition-all hover:border-[#3FBA6B] hover:text-[#3FBA6B] hover:shadow-sm"
                            >
                                Reset Pencarian
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <motion.div
                variants={itemVariants}
                className="mt-12 flex flex-col items-center justify-center gap-5"
            >
                <div className="h-[1px] w-full max-w-md bg-gradient-to-r from-transparent via-[#D9DED8] to-transparent opacity-60"></div>

                <div className="flex items-center gap-3">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={buttonTransition}
                        className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#D9DED8] bg-white text-[#5C5C5C] shadow-sm transition-colors hover:bg-[#F7F7F5]"
                    >
                        <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
                    </motion.button>

                    <div className="flex items-center gap-2">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={buttonTransition}
                            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#3FBA6B] text-sm font-black text-white shadow-md shadow-[#3FBA6B]/20"
                        >
                            1
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={buttonTransition}
                            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#D9DED8] bg-white text-sm font-bold text-[#5C5C5C] shadow-sm transition-colors hover:bg-[#F7F7F5]"
                        >
                            2
                        </motion.button>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={buttonTransition}
                        className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#D9DED8] bg-white text-[#5C5C5C] shadow-sm transition-colors hover:bg-[#F7F7F5]"
                    >
                        <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
                    </motion.button>
                </div>

                <p className="text-xs font-bold uppercase tracking-widest text-[#5C5C5C]/60">
                    Menampilkan {filteredPosts.length} dari{" "}
                    {filteredPosts.length > 0 ? filteredPosts.length : 0} postingan
                </p>
            </motion.div>
        </motion.div>
    );
}