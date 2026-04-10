import {
    Clock,
    Calendar,
    Hash,
    Search,
    Heart,
    ChevronLeft,
    ChevronRight,
    X
} from "lucide-react";

import headerAsset from "../../../assets/faq-illustration.svg";
import { FacebookIcon, InstagramIcon, TikTokIcon } from '../../Elements/icons/SosialMedia';

import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";

import { useDashboardController } from "../../../hooks/useDashboardController";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';

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

const TABS = ["Semua", "Diposting", "Draft"] as const;

export default function DashboardPageSection() {
    const {
        isLoading,
        chartData,
        summaryStats,
        filteredPosts,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
    } = useDashboardController();

    return (
        <section className="w-full px-6 md:px-12 lg:px-16 pb-16 pt-20 font-sans text-[#5C5C5C]">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="mx-auto max-w-7xl"
            >
            {/* --- Header Area --- */}
            <motion.div variants={itemVariants} className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="flex items-start gap-5 md:gap-6">
                    <div className="hidden sm:flex h-20 w-20 md:h-[120px] md:w-[120px] shrink-0 overflow-hidden">
                        <img 
                            src={headerAsset} 
                            alt="Dashboard Dekorasi" 
                            className="h-full w-full object-cover" 
                        />
                    </div>

                    <div className="flex flex-col justify-center">
                        <div className="flex flex-wrap items-center gap-3 mb-2 md:mb-3">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-[#545454] tracking-tight">
                                Ringkasan Aktivitas
                            </h1>
                            
                            <span className="mt-3 flex items-center gap-1.5 rounded-full bg-[#39B772]/10 px-3 py-1 text-xs font-bold text-[#39B772] border border-[#39B772]/20">
                                <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39B772] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#39B772]"></span>
                                </span>
                                Indikator Aktif
                            </span>
                        </div>
                        
                        <p className="text-sm md:text-base font-medium text-[#545454]/70 max-w-2xl leading-relaxed">
                            Pusat komando Anda untuk memantau performa konten, melihat kalender produksi, serta mengevaluasi karya terbaru dari AI Studio.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* --- Info Statistics (Card Grid) --- */}
            <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 mb-8">
                {isLoading ? (
                    // Loader Skeleton Cards
                    [1, 2, 3].map((i) => (
                        <div key={i} className="h-32 rounded-3xl bg-gray-100 animate-pulse border border-gray-200"></div>
                    ))
                ) : (
                    summaryStats.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ scale: 1.02, y: -4 }}
                                className="relative overflow-hidden rounded-3xl border border-[#D9DED8]/70 bg-white p-6 shadow-sm hover:shadow-md transition-all group flex"
                            >
                                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-[#F7F7F5] to-transparent opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                                <div className="relative flex flex-1 items-start justify-between">
                                    <div className="flex flex-col">
                                        <p className="text-xs md:text-sm font-bold text-[#545454]/60 mb-1">
                                            {item.title}
                                        </p>
                                        <h3 className="text-3xl md:text-4xl font-black text-[#545454] tracking-tight">
                                            {item.value}
                                        </h3>
                                    </div>
                                    <div className={`flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-2xl ${item.bg}`}>
                                        <Icon className={`h-6 w-6 md:h-7 md:w-7 ${item.color}`} strokeWidth={2.5} />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })
                )}
            </motion.div>

            {/* --- AREA CHART (TREN KONTEN 7 HARI) --- */}
            <motion.div variants={itemVariants} className="mb-10 rounded-3xl border border-[#D9DED8]/70 bg-white p-5 md:p-8 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-lg md:text-xl font-extrabold text-[#545454]">Tren Produksi Konten</h2>
                        <p className="text-xs md:text-sm font-medium text-[#545454]/60 mt-1">Distribusi status konten selama 7 hari terakhir.</p>
                    </div>
                </div>
                
                <div className="w-full h-72 md:h-80">
                    {isLoading ? (
                        <div className="w-full h-full flex items-center justify-center bg-gray-50/50 rounded-2xl animate-pulse">
                            <span className="text-sm font-bold text-gray-400">Memuat Grafik...</span>
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={chartData}
                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                            >
                                <defs>
                                    <linearGradient id="colorDiposting" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#39B772" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#39B772" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="colorTerjadwal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="colorDraft" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#D97706" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#D97706" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis 
                                    dataKey="date" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 600 }}
                                    dy={10}
                                />
                                <YAxis 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 600 }}
                                    dx={-10}
                                    allowDecimals={false}
                                />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                                    itemStyle={{ fontWeight: 600, fontSize: '13px' }}
                                    labelStyle={{ fontWeight: 800, color: '#545454', marginBottom: '4px' }}
                                />
                                <Legend iconType="circle" wrapperStyle={{ paddingTop: '15px', fontSize: '13px', fontWeight: 600, color: '#545454' }} />
                                
                                <Area type="monotone" dataKey="Diposting" stroke="#39B772" strokeWidth={3} fillOpacity={1} fill="url(#colorDiposting)" />
                                <Area type="monotone" dataKey="Terjadwal" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorTerjadwal)" />
                                <Area type="monotone" dataKey="Draft" stroke="#D97706" strokeWidth={3} fillOpacity={1} fill="url(#colorDraft)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </motion.div>

            {/* --- SECTION: DAFTAR KONTEN --- */}
            
            {/* Filter & Search Bar */}
            <motion.div variants={itemVariants} className="sticky top-0 z-10 bg-[#FAF9F5]/90 backdrop-blur-xl py-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:bg-transparent sm:backdrop-blur-none sm:py-0 mb-6 transition-all duration-300">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                    {/* Search Input */}
                    <div className="flex w-full sm:w-[400px] md:w-[910px] items-center justify-between rounded-full bg-white px-5 py-5 shadow-sm focus-within:ring-2 focus-within:ring-[#39B772]/50 transition-all border border-[#D9DED8]/70">
                        <div className="flex flex-1 items-center gap-3">
                            <Search className="h-5 w-5 text-gray-400 shrink-0" strokeWidth={2.5} />
                            <input
                                type="text"
                                placeholder="Cari konten mis. 'Promo'..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-transparent text-sm font-semibold text-[#545454] focus:outline-hidden placeholder:text-gray-400"
                            />
                        </div>
                        {searchQuery ? (
                            <button 
                                onClick={() => setSearchQuery("")}
                                className="flex shrink-0 ml-2 items-center"
                            >
                                <X className="h-4 w-4 text-gray-400 hover:text-red-400 transition-colors" />
                            </button>
                        ) : (
                            <div className="flex shrink-0 ml-2 items-center pointer-events-none">
                            </div>
                        )}
                    </div>

                    {/* Tabs */}
                    <div className="flex w-full sm:w-auto items-center gap-2 overflow-x-auto rounded-full bg-white p-2 border border-[#D9DED8]/70 shadow-sm">
                        {TABS.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`relative px-6 py-3 rounded-full text-sm font-bold whitespace-nowrap transition-colors duration-200 focus:outline-none ${activeTab === tab ? "text-white" : "text-[#545454] hover:text-[#39B772]"}`}
                            >
                                {activeTab === tab && (
                                    <motion.div
                                        layoutId="activeTabOutline"
                                        className="absolute inset-0 bg-[#39B772] rounded-full shadow-md"
                                        initial={false}
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">{tab}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Posts Grid Layout (Bikin lebih mirip card ketimbang list ke bawah kalau layar besar) */}
            <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 min-h-[300px] auto-rows-max content-start items-start">
                {isLoading ? (
                    [1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-32 sm:h-36 rounded-3xl bg-gray-50 animate-pulse border border-gray-100"></div>
                    ))
                ) : (
                    <AnimatePresence mode="popLayout">
                        {filteredPosts.length > 0 ? (
                            filteredPosts.map((post) => (
                                <motion.div
                                    key={post.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                                    whileHover={{ scale: 1.02, backgroundColor: "#ffffff", boxShadow: "0 10px 40px rgba(0,0,0,0.06)" }}
                                    transition={{ type: "spring", stiffness: 400, damping: 25 } as any}
                                    className="flex flex-col justify-between gap-4 rounded-3xl border border-[#D9DED8]/60 bg-[#FAFAFA] p-5 shadow-sm cursor-pointer group"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex shrink-0 items-center justify-center group-hover:scale-105 transition-transform duration-300">
                                            {post.platform.toLowerCase() === 'instagram' ? <InstagramIcon className="w-12 h-12 sm:w-[50px] sm:h-[50px] object-contain drop-shadow-sm" /> :
                                             post.platform.toLowerCase() === 'facebook' ? <FacebookIcon className="w-12 h-12 sm:w-[50px] sm:h-[50px] object-contain drop-shadow-sm" /> :
                                             post.platform.toLowerCase() === 'tiktok' ? <TikTokIcon className="w-12 h-12 sm:w-[50px] sm:h-[50px] object-contain drop-shadow-sm" /> :
                                             <div className="flex h-12 w-12 sm:h-[50px] sm:w-[50px] items-center justify-center rounded-2xl bg-gradient-to-br from-[#F0F2EB] to-[#D9E6D8] border border-[#D9DED8]/50 shadow-inner group-hover:rotate-6 transition-transform duration-300"><Hash className="h-5 w-5 sm:h-6 sm:w-6 text-[#39B772]" strokeWidth={2.5} /></div>}
                                        </div>
                                        <div className="flex flex-col gap-1 overflow-hidden">
                                            <h3 className="text-sm sm:text-base font-extrabold text-[#545454] line-clamp-2 group-hover:text-[#39B772] transition-colors leading-snug">
                                                {post.title}
                                            </h3>
                                            <div className="flex items-center gap-1 mt-1 text-[10px] md:text-[11px] font-bold text-[#545454]/60">
                                                <Calendar className="h-3 w-3" />
                                                <span>{post.date}</span>
                                                <span className="mx-1">&bull;</span>
                                                <Clock className="h-3 w-3" />
                                                <span>{post.time}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-3 border-t border-[#D9DED8]/50 mt-auto">
                                        <div className="flex flex-col items-start gap-1">
                                            <div className="flex gap-1.5 flex-wrap">
                                                 {post.tags.slice(0, 2).map((tag, idx) => (
                                                    <span key={idx} className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wide bg-[#E8E6E0]/60 text-[#545454] px-1.5 py-0.5 rounded">
                                                        {tag}
                                                    </span>
                                                ))}
                                                {post.tags.length > 2 && (
                                                     <span className="text-[9px] font-extrabold text-[#545454]/50">+{post.tags.length - 2}</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex shrink-0 items-center justify-end gap-3 sm:gap-4">
                                            {post.status === "Diposting" && (
                                                <div className="flex items-center gap-1 text-xs font-bold text-[#545454] group/like" title="Likes">
                                                    <Heart className="h-4 w-4 fill-transparent text-[#545454]/50 group-hover/like:fill-red-500 group-hover/like:text-red-500 transition-all" />
                                                    {post.likes}
                                                </div>
                                            )}
                                            
                                            <span className={`rounded-xl px-3 py-1.5 text-[10px] sm:text-[11px] font-extrabold shadow-sm flex items-center gap-1.5 border min-w-[90px] justify-center
                                                ${post.status === 'Diposting' ? 'bg-[#E3F2E1] text-[#39B772] border-[#B7D8B5]/50' : 
                                                'bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]/50'}`}
                                            >
                                                <span className={`h-1.5 w-1.5 rounded-full ${post.status === 'Diposting' ? 'bg-[#39B772]' : 'bg-[#D97706]'}`}></span>
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
                                className="col-span-1 md:col-span-2 flex flex-col items-center justify-center text-center px-4 py-16 border-2 border-dashed border-[#D9DED8] rounded-3xl bg-transparent"
                            >
                                <div className="h-16 w-16 mb-4 rounded-full bg-[#F7F7F5] flex items-center justify-center border border-[#D9DED8]/60">
                                    <Search className="h-8 w-8 text-[#545454]/30" />
                                </div>
                                <h3 className="text-xl font-bold text-[#545454]">Tidak ada hasil.</h3>
                                <p className="text-sm font-medium text-[#545454]/60 mt-2 max-w-sm">
                                    Konten dengan filter dan kata kunci "{searchQuery}" tidak dapat ditemukan.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            </motion.div>

            {/* Pagination Box */}
            <motion.div variants={itemVariants} className="mt-10 flex flex-col items-center justify-center gap-5">
                <div className="flex items-center gap-2">
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring" } as any} className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-white text-[#545454] shadow-sm border border-[#D9DED8]/80 hover:bg-[#F7F7F5] transition-colors">
                        <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
                    </motion.button>
                    <div className="flex items-center gap-1 sm:gap-2">
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring" } as any} className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-[#39B772] text-sm font-black text-white shadow-md shadow-[#39B772]/20">
                            1
                        </motion.button>
                        {filteredPosts.length > 5 && (
                             <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring" } as any} className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-white text-[#545454] shadow-sm border border-[#D9DED8]/80 hover:bg-[#F7F7F5] transition-colors font-bold text-sm">
                                 2
                             </motion.button>
                        )}
                    </div>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring" } as any} className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-white text-[#545454] shadow-sm border border-[#D9DED8]/80 hover:bg-[#F7F7F5] transition-colors">
                        <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
        </section>
    );
}