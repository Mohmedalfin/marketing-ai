import { useState, useMemo, useEffect } from "react";
import { FolderKanban, ClipboardList, CheckSquare } from "lucide-react";
import { getSchedulesAPI } from "../services/scheduleService";

// --- TIPE DATA ---
export type PostStatus = "PUBLISHED" | "DRAFT";

export interface PostItem {
    id: number;
    title: string;
    date: string;
    time: string;
    rawDate: Date | null;
    likes: number;
    status: PostStatus;
    platform: string[];
    tags: string[];
}

export interface ChartDataPoint {
    date: string;
    Diposting: number;
}

export interface PlatformStat {
    name: string;
    value: number;
    color: string;
}

export const useDashboardController = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState<"Semua" | PostStatus | "Diposting" | "Draft">("Semua");
    
    const [posts, setPosts] = useState<PostItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            setIsLoading(true);
            try {
                const data = await getSchedulesAPI();
                
                const mappedPosts: PostItem[] = data.map(item => {
                    let dateStr = "Unknown Date";
                    let timeStr = "00:00";
                    let rawDate = null;

                    if (item.scheduled_time) {
                        try {
                            const d = new Date(item.scheduled_time);
                            rawDate = d;
                            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
                            dateStr = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
                            timeStr = d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }).replace('.', ':');
                        } catch {}
                    }

                    let platArr: string[] = [];
                    if (Array.isArray(item.platform)) {
                        platArr = item.platform;
                    } else if (typeof item.platform === 'string') {
                        try {
                            const parsed = JSON.parse(item.platform);
                            platArr = Array.isArray(parsed) ? parsed : [item.platform];
                        } catch {
                            platArr = [item.platform];
                        }
                    }

                    return {
                        id: item.id,
                        title: item.title || "Tanpa Judul",
                        date: dateStr,
                        time: timeStr,
                        rawDate: rawDate,
                        likes: 0, 
                        status: item.status as PostStatus,
                        platform: platArr,
                        tags: item.category ? [item.category] : []
                    };
                });

                mappedPosts.sort((a, b) => {
                    if (b.rawDate && a.rawDate) {
                        return b.rawDate.getTime() - a.rawDate.getTime();
                    }
                    return b.id - a.id;
                });
                
                setPosts(mappedPosts);
            } catch (error) {
                console.error("Gagal memuat data dashboard", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const summaryStats = useMemo(() => {
        const draft = posts.filter(p => p.status === "DRAFT").length;
        const published = posts.filter(p => p.status === "PUBLISHED").length;
        const total = draft + published;

        return [
            { title: "Total Konten", value: total, icon: FolderKanban, color: "text-[#3B82F6]", bg: "bg-[#EBF5FF]" },
            { title: "Draft Aktif", value: draft, icon: ClipboardList, color: "text-[#D97706]", bg: "bg-[#FEF3C7]" },
            { title: "Diposting", value: published, icon: CheckSquare, color: "text-[#39B772]", bg: "bg-[#E3F2E1]" },
        ];
    }, [posts]);

    const platformStats = useMemo(() => {
        const platformCounts: Record<string, number> = {};
        
        posts.forEach(post => {
            post.platform.forEach(p => {
                const lower = p.toLowerCase();
                if (lower !== 'all') {
                    const formatted = lower.charAt(0).toUpperCase() + lower.slice(1);
                    platformCounts[formatted] = (platformCounts[formatted] || 0) + 1;
                }
            });
            if (post.platform.length === 1 && post.platform[0].toLowerCase() === 'all') {
                const allPlatforms = ['Instagram', 'Facebook', 'Telegram'];
                allPlatforms.forEach(p => {
                    platformCounts[p] = (platformCounts[p] || 0) + 1;
                });
            }
        });

        const colors = ["#E1306C", "#1877F2", "#24A1DE", "#D97706", "#39B772"];
        return Object.keys(platformCounts).map((name, index) => ({
            name,
            value: platformCounts[name],
            color: colors[index % colors.length]
        }));
    }, [posts]);

    const chartData = useMemo(() => {
        const buckets: Record<string, ChartDataPoint> = {};
        
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        for (let day = 1; day <= daysInMonth; day++) {
            const d = new Date(year, month, day);
            const dateKey = d.toLocaleDateString('en-CA'); 
            const shortDate = `${d.getDate()} ${d.toLocaleString('id-ID', { month: 'short' })}`;
            
            buckets[dateKey] = {
                date: shortDate,
                Diposting: 0
            };
        }

        posts.forEach(post => {
            if (post.rawDate) {
                const postDateKey = post.rawDate.toLocaleDateString('en-CA');
                if (buckets[postDateKey]) {
                    if (post.status === "PUBLISHED") {
                        buckets[postDateKey].Diposting += 1;
                    }
                }
            }
        });

        return Object.values(buckets);
    }, [posts]);

    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            const matchesSearch = 
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
                post.platform.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));
            
            let targetTab = activeTab;
            if (activeTab === "Diposting") targetTab = "PUBLISHED";
            if (activeTab === "Draft") targetTab = "DRAFT";
            
            const matchesTab = activeTab === "Semua" || post.status === targetTab;
            
            return matchesSearch && matchesTab;
        });
    }, [posts, searchQuery, activeTab]);

    return {
        isLoading,
        chartData,
        summaryStats,
        platformStats,
        filteredPosts,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
    };
};
