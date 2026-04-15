import { Clock, Calendar, Hash, Search, Heart, X } from "lucide-react";

import headerAsset from "../../../assets/prob2.svg";
import {
  FacebookIcon,
  InstagramIcon,
  TelegramIcon,
} from "../../Elements/icons/SosialMedia";

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
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

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

const TABS = ["Semua", "Diposting", "Draft"] as const;

export default function DashboardPageSection() {
  const {
    isLoading,
    chartData,
    summaryStats,
    platformStats,
    filteredPosts,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
  } = useDashboardController();

  return (
    <section className="w-full px-6 md:px-12 lg:px-16 pb-16 py-10 md:py-20 font-sans text-[#5C5C5C]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-7xl"
      >
        <motion.div
          variants={itemVariants}
          className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="flex items-start gap-5 md:gap-6">
            <div className="hidden sm:flex h-20 w-20 md:h-[120px] md:w-[120px] shrink-0 overflow-hidden">
              <img
                src={headerAsset}
                alt="Dashboard Dekorasi"
                className="h-full w-full object-cover md:pb-8"
              />
            </div>

            <div className="flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-3 mb-2 md:mb-3">
                <h1 className="text-3xl md:text-5xl font-extrabold text-[#545454] tracking-tight">
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
                Pusat komando Anda untuk memantau performa konten serta mengevaluasi karya terbaru dari AI
                Studio.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Update yang ini dulu */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5 mb-8"
        >
          <div className="lg:col-span-8 grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
            {isLoading
              ? [1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-[110px] sm:h-[140px] rounded-2xl sm:rounded-3xl bg-gray-100 animate-pulse border border-gray-200"
                  />
                ))
              : summaryStats.map((item, index) => {
                  const isFeatured = index === 0;

                  return (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ y: -4 }}
                      className={`relative overflow-hidden rounded-[18px] sm:rounded-[24px] p-2.5 sm:p-4 md:p-5 shadow-sm transition-all duration-300 flex flex-col justify-between group min-h-[110px] sm:min-h-[140px] ${
                        isFeatured
                          ? "bg-primary text-white shadow-primary/20 border-transparent"
                          : "bg-white border border-[#D9DED8]/70 text-[#2b2b2b]"
                      }`}
                    >
                      {isFeatured && (
                        <div className="absolute -right-5 -top-5 sm:-right-8 sm:-top-8 h-20 w-20 sm:h-32 sm:w-32 rounded-full bg-white/10 blur-2xl group-hover:bg-white/20 transition-all duration-700" />
                      )}

                      <div className="relative flex items-start justify-between gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                        <h3
                          className={`text-[10px] sm:text-sm font-semibold tracking-wide leading-tight pr-1 break-words ${
                            isFeatured ? "text-white/90" : "text-[#2b2b2b]"
                          }`}
                        >
                          {item.title}
                        </h3>

                        <button
                          className={`flex h-5 w-5 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 ${
                            isFeatured
                              ? "bg-white/20 text-white backdrop-blur-md border border-white/30 hover:bg-white/30 shadow-sm"
                              : "bg-white text-[#2b2b2b] border border-gray-200 hover:bg-gray-50 shadow-sm"
                          }`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="10"
                            className="sm:w-[14px] sm:h-[14px]"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="7" y1="17" x2="17" y2="7"></line>
                            <polyline points="7 7 17 7 17 17"></polyline>
                          </svg>
                        </button>
                      </div>

                      <div className="relative mb-2 sm:mb-3">
                        <h2 className="text-3xl font-semibold sm:text-4xl md:text-6xl md:font-bold tracking-tighter leading-none break-words">
                          {item.value}
                        </h2>
                      </div>

                      <div className="relative flex items-center gap-1 mt-auto flex-wrap">
                        <div
                          className={`flex items-center gap-0.5 rounded px-1 py-0.5 sm:px-1.5 text-[8px] sm:text-[10px] font-bold border ${
                            isFeatured
                              ? "bg-white/20 border-white/30 text-white backdrop-blur-sm"
                              : "bg-[#E8F5E9] border-[#A5D6A7] text-[#2E7D32]"
                          }`}
                        >
                          <span>{index === 0 ? "5" : index === 1 ? "6" : "2"}</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="7"
                            height="7"
                            className="sm:w-2 sm:h-2"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="18 15 12 9 6 15"></polyline>
                          </svg>
                        </div>

                        <span
                          className={`hidden sm:inline text-[10px] font-medium truncate ${
                            isFeatured ? "text-white/80" : "text-[#545454]/70"
                          }`}
                        >
                          Increased from last month
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
          </div>

          <motion.div
            variants={itemVariants}
            className="lg:col-span-4 rounded-[24px] border border-[#D9DED8]/70 bg-white p-4 md:p-5 shadow-sm flex flex-col relative overflow-hidden group"
          >
            <div className="relative z-10 mb-3 w-full text-left">
              <h2 className="text-sm md:text-base font-extrabold text-[#545454]">
                Distribusi Platform
              </h2>
            </div>

            {isLoading ? (
              <div className="flex-1 flex items-center gap-4 py-2">
                <div className="h-28 w-28 shrink-0 rounded-full bg-gray-100 animate-pulse border-8 border-gray-50" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-full bg-gray-100 rounded animate-pulse" />
                  <div className="h-3 w-3/4 bg-gray-100 rounded animate-pulse" />
                </div>
              </div>
            ) : (
              <div className="flex flex-1 items-center justify-between gap-3 md:gap-5 w-full relative py-1">
                <div className="relative h-28 w-28 md:h-[120px] md:w-[120px] shrink-0 transition-transform duration-500 group-hover:scale-105">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={platformStats}
                        cx="50%"
                        cy="50%"
                        innerRadius={35}
                        outerRadius={52}
                        paddingAngle={4}
                        dataKey="value"
                        strokeWidth={0}
                        cornerRadius={4}
                      >
                        {platformStats.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.color}
                            className="transition-all duration-300 hover:opacity-90 outline-none"
                          />
                        ))}
                      </Pie>

                      <Tooltip
                        cursor={false}
                        offset={16}
                        wrapperStyle={{ zIndex: 20 }}
                        contentStyle={{
                          borderRadius: "12px",
                          border: "1px solid rgba(0,0,0,0.05)",
                          boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                          padding: "8px 10px",
                          backgroundColor: "#ffffff",
                        }}
                        itemStyle={{
                          fontSize: "12px",
                          fontWeight: 800,
                          color: "#545454",
                        }}
                        formatter={(value) => {
                            const safeValue = typeof value === "number" ? value : Number(value ?? 0);
                            return [`${safeValue} Konten`];
                        }}
                        labelStyle={{
                          fontSize: "10px",
                          color: "#888",
                          fontWeight: 600,
                          marginBottom: "2px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
                    <div className="rounded-full bg-white/95 px-2 py-1 backdrop-blur-[2px]">
                      <span className="block text-2xl md:text-3xl font-black text-[#545454] leading-none tracking-[-0.03em] text-center">
                        {platformStats.reduce((sum, p) => sum + p.value, 0)}
                      </span>
                      <span className="block text-[8px] md:text-[9px] font-bold text-[#545454]/40 mt-0.5 uppercase tracking-widest text-center">
                        Total
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center gap-2.5 flex-1 min-w-0">
                  {platformStats.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className="h-2.5 w-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-[10px] md:text-[11px] font-bold text-[#545454] truncate">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-[11px] md:text-xs font-black text-[#2b2b2b]">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* --- AREA CHART  --- */}
        <motion.div
          variants={itemVariants}
          className="mb-6 md:mb-10 rounded-2xl md:rounded-3xl border border-[#D9DED8]/70 bg-white p-3 sm:p-4 md:p-8 shadow-sm"
        >
          <div className="flex items-start justify-between mb-4 md:mb-6 gap-3">
            <div>
              <h2 className="text-sm sm:text-base md:text-xl font-extrabold text-[#545454] leading-tight">
                Tren Produksi Konten
              </h2>
              <p className="text-[10px] sm:text-xs md:text-sm font-medium text-[#545454]/60 mt-1 leading-relaxed">
                Distribusi status konten selama bulan ini.
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="w-full h-[220px] sm:h-64 md:h-80 flex items-center justify-center bg-gray-50/50 rounded-2xl animate-pulse">
              <span className="text-xs sm:text-sm font-bold text-gray-400">
                Memuat Grafik...
              </span>
            </div>
          ) : (
            <div className="overflow-x-auto overflow-y-hidden pb-2">
              <div className="min-w-[560px] sm:min-w-0 w-full h-[220px] sm:h-64 md:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{ top: 10, right: 16, left: -16, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorDiposting"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="5%" stopColor="#39B772" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#39B772" stopOpacity={0} />
                      </linearGradient>
                    </defs>

                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#E5E7EB"
                    />

                    <XAxis
                      dataKey="date"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#9CA3AF", fontSize: 9, fontWeight: 600 }}
                      dy={8}
                      minTickGap={20}
                    />

                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#9CA3AF", fontSize: 10, fontWeight: 600 }}
                      dx={-4}
                      allowDecimals={false}
                      width={28}
                    />

                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border: "none",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                        fontSize: "12px",
                      }}
                      itemStyle={{ fontWeight: 600, fontSize: "12px" }}
                      labelStyle={{
                        fontWeight: 800,
                        color: "#545454",
                        marginBottom: "4px",
                        fontSize: "12px",
                      }}
                    />

                    <Legend
                      iconType="circle"
                      wrapperStyle={{
                        paddingTop: "12px",
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "#545454",
                      }}
                    />

                    <Area
                      type="monotone"
                      dataKey="Diposting"
                      stroke="#39B772"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#colorDiposting)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </motion.div>

        {/*   */}
        <motion.div
          variants={itemVariants}
          className="sticky top-0 z-10 bg-[#FAF9F5]/90 backdrop-blur-xl py-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:bg-transparent sm:backdrop-blur-none sm:py-0 mb-6 transition-all duration-300"
        >
          <div className="flex flex-col xl:flex-row gap-3 xl:gap-4 items-stretch xl:items-center justify-between">
            <div className="w-full xl:flex-1">
              <div className="flex w-full items-center justify-between rounded-full bg-white px-4 md:px-5 py-4 md:py-5 shadow-sm focus-within:ring-2 focus-within:ring-[#39B772]/50 transition-all border border-[#D9DED8]/70">
                <div className="flex flex-1 items-center gap-3">
                  <Search
                    className="h-5 w-5 text-gray-400 shrink-0"
                    strokeWidth={2.5}
                  />
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
                  <div className="flex shrink-0 ml-2 items-center pointer-events-none"></div>
                )}
              </div>
            </div>

            <div className="w-full xl:w-auto xl:max-w-[360px]">
              <div className="w-full rounded-[28px] bg-white p-2 border border-[#D9DED8]/70 shadow-sm">
                <div className="grid grid-cols-3 gap-2">
                  {TABS.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`relative flex items-center justify-center px-3 py-3 rounded-full text-xs sm:text-sm font-bold text-center whitespace-nowrap transition-colors duration-200 focus:outline-none ${
                        activeTab === tab
                          ? "text-white"
                          : "text-[#545454] hover:text-[#39B772]"
                      }`}
                    >
                      {activeTab === tab && (
                        <motion.div
                          layoutId="activeTabOutline"
                          className="absolute inset-0 bg-[#39B772] rounded-full shadow-md"
                          initial={false}
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        />
                      )}
                      <span className="relative z-10">{tab}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Riwayat Konten  */}
        <motion.div
        variants={itemVariants}
        className="overflow-hidden rounded-[28px] border border-white/40 bg-white/50 backdrop-blur-xl shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
        >
        <div className="flex items-center justify-between border-b border-white/35 bg-white/20 px-4 py-3 sm:px-5">
            <div>
            <h2 className="text-sm sm:text-base md:text-xl font-bold text-[#3E4A42] pt-2">
                Riwayat Konten
            </h2>
            <p className="text-[11px] sm:text-xs text-[#6B756F]">
                Konten yang sudah diposting dan yang masih draft
            </p>
            </div>

            <span className="rounded-full border border-white/40 bg-white/60 px-2.5 py-1 text-[10px] md:text-xs font-semibold text-[#526058]">
            {filteredPosts.length} item
            </span>
        </div>

        <AnimatePresence mode="popLayout">
            {filteredPosts.length > 0 ? (
            <div className="flex flex-col gap-2 p-2 sm:gap-3 sm:p-3">
                {filteredPosts.map((post) => (
                <motion.div
                    key={post.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ type: "spring", stiffness: 320, damping: 28 }}
                    className="group rounded-2xl border border-white/40 bg-white/30 px-4 py-3.5 sm:px-5 sm:py-4 shadow-sm transition-all hover:bg-white/50"
                >
                    <div className="grid grid-cols-[auto_1fr] gap-3 sm:grid-cols-[auto_1fr_auto] sm:gap-4">
                    {/* Icon platform */}
                    <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-2xl border border-white/50 bg-white/70 shadow-sm">
                        {post.platform.some((p) => p.toLowerCase() === "instagram") ? (
                        <InstagramIcon className="h-5 w-5 sm:h-6 sm:w-6 object-contain" />
                        ) : post.platform.some((p) => p.toLowerCase() === "facebook") ? (
                        <FacebookIcon className="h-5 w-5 sm:h-6 sm:w-6 object-contain" />
                        ) : post.platform.some((p) => p.toLowerCase() === "telegram") ? (
                        <TelegramIcon className="h-5 w-5 sm:h-6 sm:w-6 object-contain" />
                        ) : (
                        <Hash className="h-5 w-5 text-[#39B772]" strokeWidth={2.4} />
                        )}
                    </div>

                    {/* Content utama */}
                    <div className="min-w-0">
                        <h3 className="line-clamp-1 sm:line-clamp-2 text-sm sm:text-[15px] font-semibold leading-snug text-[#2F3A33] transition-colors group-hover:text-[#2E7D5B]">
                        {post.title}
                        </h3>

                        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium text-[#6B756F]">
                        <span className="inline-flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {post.date}
                        </span>

                        <span className="inline-flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {post.time}
                        </span>

                        {post.status === "PUBLISHED" && (
                            <span className="inline-flex items-center gap-1 text-[#5F6B65]">
                            <Heart className="h-3.5 w-3.5" />
                            {post.likes}
                            </span>
                        )}
                        </div>

                        <div className="mt-2 flex flex-wrap items-center gap-1.5">
                        {post.tags.slice(0, 2).map((tag, idx) => (
                            <span
                            key={idx}
                            className="rounded-full border border-white/40 bg-white/55 px-2 py-0.5 text-[10px] font-semibold text-[#5B665F]"
                            >
                            {tag}
                            </span>
                        ))}

                        {post.tags.length > 2 && (
                            <span className="text-[10px] font-semibold text-[#7A857F]">
                            +{post.tags.length - 2}
                            </span>
                        )}
                        </div>
                    </div>

                    {/* Status area */}
                    <div className="col-span-2 mt-2 flex items-center justify-between sm:col-span-1 sm:mt-0 sm:flex-col sm:items-end sm:justify-start sm:gap-2">
                        <span
                        className={`inline-flex h-8 items-center rounded-full border px-3 text-[11px] font-semibold backdrop-blur-md ${
                            post.status === "PUBLISHED"
                            ? "border-emerald-200/70 bg-emerald-50/80 text-emerald-700"
                            : "border-amber-200/70 bg-amber-50/80 text-amber-700"
                        }`}
                        >
                        <span
                            className={`mr-2 h-1.5 w-1.5 rounded-full ${
                            post.status === "PUBLISHED"
                                ? "bg-emerald-500"
                                : "bg-amber-500"
                            }`}
                        />
                        {post.status === "PUBLISHED" ? "Diposting" : "Draft"}
                        </span>

                        <span className="text-[10px] sm:text-[11px] font-medium text-[#7A857F]">
                        {post.platform.join(", ")}
                        </span>
                    </div>
                    </div>
                </motion.div>
                ))}
            </div>
            ) : (
            <div className="px-4 py-14 text-center sm:px-6">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-white/50">
                <Search className="h-6 w-6 text-[#545454]/35" />
                </div>
                <h3 className="text-lg font-bold text-[#545454]">Tidak ada hasil</h3>
                <p className="mt-2 text-sm text-[#545454]/60">
                Konten dengan filter dan kata kunci "{searchQuery}" tidak ditemukan.
                </p>
            </div>
            )}
        </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
}
