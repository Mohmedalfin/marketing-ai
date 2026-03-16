import { useEffect, useState, useRef } from "react";
import featureImg from '../../../assets/featurImg.svg';

const FeatureSection = () => {
    // 1. State untuk Trigger Animasi Scroll Awal
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    // 2. State untuk Tab Menu & Efek Transisi Konten
    const [activeTab, setActiveTab] = useState('ai-poster');
    const [isFading, setIsFading] = useState(false); 

    // Data Konten Dinamis berdasarkan Tab
    const tabData = {
        'ai-poster': {
            title: "Sulap Foto Mentah Jadi Poster Profesional",
            description: "Tidak Perlu Sewa Desainer Mahal Atau Pusing Memikirkan Layout. Cukup Unggah Foto Produk Anda, Ketik Gaya Yang Diinginkan, Dan Biarkan AI Merancang Visual Memukau Dalam Hitungan Detik.",
            features: ["HAPUS BACKGROUND OTOMATIS", "SESUAIKAN WARNA BRAND"]
        },
        'smart-caption': {
            title: "Caption Cerdas yang Mengubah Audience Jadi Pembeli",
            description: "Lupakan kebuntuan menulis! AI kami menganalisis gambar dan target pasar Anda untuk menghasilkan caption yang engaging, lengkap dengan hashtag viral dan Call-To-Action yang kuat.",
            features: ["GENERATE CAPTION OTOMATIS", "REKOMENDASI HASHTAG VIRAL"]
        },
        'auto-schedule': {
            title: "Jadwalkan Konten Sebulan Penuh Dalam Hitungan Menit",
            description: "Konsistensi adalah kunci. Atur kalender konten Anda, pilih waktu tayang terbaik, dan sistem kami akan mempublikasikannya secara otomatis ke semua platform sosial media Anda.",
            features: ["KALENDER KONTEN VISUAL", "PUBLIKASI MULTI-PLATFORM"]
        }
    };

    // Fungsi untuk mengganti tab dengan efek Fade Out -> Ganti Data -> Fade In
    const handleTabChange = (tabId: string) => {
        if (tabId === activeTab) return; 
        
        setIsFading(true); 
        
        setTimeout(() => {
            setActiveTab(tabId); 
            setIsFading(false); 
        }, 300);
    };

    // Observer untuk efek scroll pertama kali
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    // Ambil data yang sedang aktif
    const currentData = tabData[activeTab as keyof typeof tabData];

    return (
        <section ref={sectionRef} className="w-full py-20 lg:py-32 overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
                
                {/* --- TOP RIGHT: HEADLINE & TOGGLE TAB --- */}
                <div className="flex flex-col items-start lg:items-end w-full mb-16 lg:mb-24">
                    <h2 className={`text-3xl font-extrabold uppercase tracking-tight text-primary text-right sm:text-4xl md:text-5xl leading-[1.15] max-w-2xl transition-all duration-1000 ease-out
                        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}
                    `}>
                        Satu Platform Pintar<br />
                        Untuk Semua Konten Anda
                    </h2>
                    
                    {/* Toggle Bar Menu Berubah Sesuai Gambar */}
                    <div className={`mt-8 flex flex-wrap sm:flex-nowrap justify-center items-center gap-1 sm:gap-2 rounded-[2rem] bg-white p-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-1000 delay-300 ease-out w-full sm:w-auto
                        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}
                    `}>
                        {[
                            { id: 'ai-poster', label: 'AI POSTER' },
                            { id: 'smart-caption', label: 'SMART CAPTION' },
                            { id: 'auto-schedule', label: 'AUTO SCHEDULE' }
                        ].map((tab) => (
                            <button 
                                key={tab.id}
                                onClick={() => handleTabChange(tab.id)}
                                className={`rounded-full px-3 py-2 sm:px-6 sm:py-3 text-[11px] sm:text-sm font-bold transition-all duration-300 focus:outline-hidden whitespace-nowrap flex-1 sm:flex-none
                                    ${activeTab === tab.id 
                                        ? 'bg-primary-light text-white shadow-sm' // Aktif: Background Hijau Muda, Text Putih
                                        : 'bg-transparent text-dark hover:text-primary' // Inaktif: Transparan, Text Gelap
                                    }
                                `}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- BOTTOM: 2 COLUMNS (TEXT & ILLUSTRATION) --- */}
                <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    
                    {/* Kolom Kiri: Teks Dinamis */}
                    {/* Wrapper ini menggunakan isFading untuk mengatur transisi saat tab diklik */}
                    <div className={`flex flex-col items-start lg:pr-10 transition-all duration-300 ease-in-out
                        ${isFading ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'}
                    `}>
                        <h3 className="text-xl md:text-2xl font-bold text-primary mb-4">
                            {currentData.title}
                        </h3>
                        
                        <p className="text-base font-medium text-dark leading-relaxed mb-10">
                            {currentData.description}
                        </p>

                        <div className="flex flex-col gap-4 w-full max-w-md">
                            {currentData.features.map((text, index) => (
                                <div 
                                    key={index}
                                    className="flex items-center gap-4 rounded-full bg-white px-6 py-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                                >
                                    <div className="h-4 w-4 rounded-full bg-primary-light shrink-0"></div>
                                    <span className="text-sm md:text-base font-bold text-primary">
                                        {text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Kolom Kanan: Ilustrasi Statis */}
                    <div className={`hidden lg:block relative flex w-full items-center justify-center lg:justify-end mt-10 lg:mt-0 transition-all duration-1000 delay-300 ease-out
                        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-16 opacity-0'}
                    `}>
                        <img 
                            src={featureImg} 
                            alt="AI Platform Illustration" 
                            className="w-full max-w-[400px] lg:max-w-[550px] object-contain relative z-10"
                        />
                    </div>

                </div>

                {/* Garis hijau — mentok kanan, di luar div ilustrasi */}
                <div className={`mt-10 lg:mt-16 ml-auto h-1 w-3/4 lg:w-[26%] bg-primary rounded-full transition-all duration-1000 delay-500 ease-out origin-right
                    ${isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}
                `}></div>
            </div>
        </section>
    );
};

export default FeatureSection;
