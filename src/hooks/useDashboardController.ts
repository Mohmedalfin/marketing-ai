import { useState, useMemo, useEffect } from "react";
import { FolderKanban, ClipboardList, CheckSquare } from "lucide-react";

// --- TIPE DATA ---
export type PostStatus = "Diposting" | "Draft";

export interface PostItem {
    id: number;
    title: string;
    date: string;
    time: string;
    likes: number;
    status: PostStatus;
    platform: string;
    tags: string[];
}

export interface ChartDataPoint {
    date: string;
    Diposting: number;
    Draft: number;
}

// --- DUMMY DATA UNTUK KERANGKA ---
const DUMMY_POSTS: PostItem[] = [
    {
        id: 1,
        title: "Promo Spesial Ramadhan Segera Hadir",
        date: "19 Mar 2026",
        time: "15:45",
        likes: 135,
        status: "Diposting",
        platform: "Instagram",
        tags: ["Promo", "Ramadhan"]
    },
    {
        id: 2,
        title: "Koleksi Terbaru Sepatu Lari Pria",
        date: "20 Mar 2026",
        time: "10:30",
        likes: 0,
        status: "Draft",
        platform: "Instagram",
        tags: ["Koleksi Baru", "Sepatu"]
    },
    {
        id: 3,
        title: "Tips Produktivitas Ala Kreator",
        date: "15 Mar 2026",
        time: "19:00",
        likes: 450,
        status: "Diposting",
        platform: "TikTok",
        tags: ["Tips", "Edukasi"]
    },
    {
        id: 4,
        title: "Behind The Scene Pembuatan Produk",
        date: "21 Mar 2026",
        time: "13:00",
        likes: 0,
        status: "Draft",
        platform: "TikTok",
        tags: ["BTS", "Produk"]
    },
    {
        id: 5,
        title: "Giveaway Akhir Bulan!",
        date: "25 Mar 2026",
        time: "16:00",
        likes: 0,
        status: "Draft",
        platform: "Facebook",
        tags: ["Event", "Giveaway"]
    }
];

// Data chart tren 7 hari terakhir (Bisa dikalkulasi dari DUMMY_POSTS sebenarnya, tapi kita siapkan kerangka statis dulu)
const DUMMY_CHART_DATA: ChartDataPoint[] = [
    { date: "15 Mar", Diposting: 2, Draft: 1 },
    { date: "16 Mar", Diposting: 1, Draft: 0 },
    { date: "17 Mar", Diposting: 3, Draft: 2 },
    { date: "18 Mar", Diposting: 1, Draft: 1 },
    { date: "19 Mar", Diposting: 4, Draft: 0 },
    { date: "20 Mar", Diposting: 0, Draft: 2 },
    { date: "21 Mar", Diposting: 0, Draft: 4 },
];

export const useDashboardController = () => {
    // State UI
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState<"Semua" | PostStatus>("Semua");
    
    // State Data (Kerangka untuk nantinya diisi dari API)
    const [posts, setPosts] = useState<PostItem[]>([]);
    const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Simulasi Fetching dari API
    useEffect(() => {
        const fetchDashboardData = async () => {
            setIsLoading(true);
            try {
                // Di masa depan: panggil fetch API di sini
                // const response = await getSchedulesAPI();
                // setPosts(response); 
                
                // --- Simulasi Delay 800ms ---
                await new Promise(res => setTimeout(res, 800));
                
                setPosts(DUMMY_POSTS);
                setChartData(DUMMY_CHART_DATA);

            } catch (error) {
                console.error("Gagal memuat data dashboard", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    // --- KALKULASI STATISTIK RINGKASAN ---
    const summaryStats = useMemo(() => {
        const total = posts.length;
        const draft = posts.filter(p => p.status === "Draft").length;
        const diposting = posts.filter(p => p.status === "Diposting").length;

        return [
            { title: "Total Konten", value: total, icon: FolderKanban, color: "text-[#3B82F6]", bg: "bg-[#EBF5FF]" },
            { title: "Draft Aktif", value: draft, icon: ClipboardList, color: "text-[#D97706]", bg: "bg-[#FEF3C7]" },
            { title: "Diposting", value: diposting, icon: CheckSquare, color: "text-[#39B772]", bg: "bg-[#E3F2E1]" },
        ];
    }, [posts]);

    // --- LOGIKA FILTERING PENCARIAN & TAB ---
    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            const matchesSearch = 
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
                post.platform.toLowerCase().includes(searchQuery.toLowerCase());
            
            const matchesTab = activeTab === "Semua" || post.status === activeTab;
            
            return matchesSearch && matchesTab;
        });
    }, [posts, searchQuery, activeTab]);

    return {
        // Data Mentah
        isLoading,
        chartData,
        summaryStats,
        
        // Data Terfilter
        filteredPosts,
        
        // State Filter
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
    };
};
