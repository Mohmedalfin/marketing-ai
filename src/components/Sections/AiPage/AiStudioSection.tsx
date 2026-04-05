import { useState, useEffect, useRef } from 'react';

// TODO: Sesuaikan path asset ini dengan folder kamu
import posterPreview from '../../../assets/ai-poster-preview.svg'; 
import iconIg from '../../../assets/instagram.svg';

const AiStudioSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedStyle, setSelectedStyle] = useState('Modern');
    const [isStyleDropdownOpen, setIsStyleDropdownOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [captionText, setCaptionText] = useState("");
    
    // Platform & Schedule State
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['Instagram']);
    const [isPlatformDropdownOpen, setIsPlatformDropdownOpen] = useState(false);
    
    // AI Generation State (Mock API)
    const [isGenerating, setIsGenerating] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [generatedPoster, setGeneratedPoster] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const instructionRef = useRef<HTMLTextAreaElement>(null);
    
    const togglePlatform = (platform: string) => {
        setSelectedPlatforms(prev => 
            prev.includes(platform) 
                ? prev.filter(p => p !== platform)
                : [...prev, platform]
        );
    };
    
    const handleGenerate = async () => {
        if (!selectedImage) {
            alert("Silakan upload gambar produk terlebih dahulu untuk memulai keajaiban AI!");
            return;
        }

        setIsGenerating(true);
        try {
            // STEP 1: Simulasi POST request ke API AI
            setLoadingMessage("Menganalisa objek produk...");
            console.log("POST /api/generate-poster", {
                image: selectedImage,
                style: selectedStyle,
                instruction: instructionRef.current?.value || "",
                platforms: selectedPlatforms
            });
            await new Promise(resolve => setTimeout(resolve, 1500));

            // STEP 2: Simulasi Polling process (AI sedang bekerja)
            setLoadingMessage("Merancang komposisi visual...");
            await new Promise(resolve => setTimeout(resolve, 2000));

            setLoadingMessage("Merender efek pencahayaan...");
            await new Promise(resolve => setTimeout(resolve, 2000));

            setLoadingMessage("Menulis caption marketing yang menjual...");
            await new Promise(resolve => setTimeout(resolve, 1500));

            // STEP 3: API selesai, ambil hasil JSON dari GET status endpoint
            const mockApiResult = {
                status: "success",
                data: {
                    imageUrl: posterPreview, // DUMMY: Pakai ilustrasi statis dari mockup sebagai hasil
                    caption: "🚀 BOOM! Tingkatkan Gayamu Dengan Sepatu Kets Edisi Terbatas Ini!\n\nDidesain khusus untuk kamu yang mengutamakan kenyamanan tanpa mengorbankan style. Cocok untuk lari pagi, atau sekadar tampil beda.\n\n🔥 Stok menipis, amankan size kamu sekarang sebelum kehabisan! Klik link di bio untuk order via WhatsApp.\n\n#SepatuKece #SneakersLokal #OOTDIndo"
                }
            };

            setGeneratedPoster(mockApiResult.data.imageUrl);
            setCaptionText(mockApiResult.data.caption);

        } catch (error) {
            console.error("Error generation:", error);
            alert("Terjadi kesalahan saat memproses AI.");
        } finally {
            setIsGenerating(false);
            setLoadingMessage("");
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };

    const styleOptions = [
        'Makanan',
        'Fashion',
        'Elektronik',
        'Minuman',
    ];

    const platformOptions = [
        'Instagram',
        'Facebook',
        'TikTok',
    ];

    // Observer untuk trigger animasi saat section terlihat di layar
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="w-full py-10 px-6 md:px-12 lg:px-16 overflow-hidden">
            <div className="mx-auto max-w-7xl">
                
                {/* --- HEADER --- */}
                <div className={`mb-10 transition-all duration-1000 ease-out
                    ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}
                `}>
                    <h1 className="text-2xl md:text-4xl font-extrabold uppercase text-primary tracking-tight">
                        MULAI SIHIR KREATIFMU DI SINI
                    </h1>
                    <p className="mt-2 text-sm md:text-lg font-medium text-dark max-w-3xl">
                        Unggah Foto Produk, Ketik Idemu, Dan Saksikan AI Kami Mengubahnya Menjadi Konten Level Agensi Dalam Hitungan Detik.
                    </p>
                </div>

                {/* --- MAIN GRID LAYOUT (12 Columns) --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    
                    {/* ==========================================
                        KOLOM KIRI: INPUT (Porsi 4/12 Kolom)
                    ========================================== */}
                    <div className={`lg:col-span-4 flex flex-col rounded-[2rem] border-2 border-primary bg-white p-6 shadow-sm transition-all duration-1000 delay-300 ease-out
                        ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-16 opacity-0'}
                    `}>
                        <h2 className="text-lg md:text-xl font-bold text-primary text-center mb-6">
                            AI STUDIO PINTAR
                        </h2>

                        {/* Drag & Drop Upload Area */}
                        <div 
                            className="group relative flex flex-1 min-h-48 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-primary bg-light-bg/50 transition-all hover:bg-light-bg overflow-hidden shrink-0"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                className="hidden" 
                                accept="image/*" 
                                onChange={handleImageUpload} 
                            />
                            {selectedImage ? (
                                <>
                                    <img src={selectedImage} alt="Uploaded" className="absolute inset-0 w-full h-full object-cover" />
                                    {/* Hover overlay for changing image */}
                                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <svg className="w-8 h-8 text-white mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                        <span className="text-sm font-bold text-white">Ganti Gambar</span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <span className="text-xs md:text-sm font-bold text-dark mb-1">Upload Gambar Di Sini</span>
                                    <span className="text-[10px] md:text-xs font-semibold text-primary underline decoration-primary/50 group-hover:decoration-primary transition-all text-center px-4">
                                        Klik Untuk Memilih File Atau Drag & Drop
                                    </span>
                                    {/* Efek pinggiran hijau yang membesar perlahan saat di-hover */}
                                    <div className="absolute inset-0 rounded-2xl border-2 border-primary opacity-0 scale-95 transition-all duration-300 group-hover:scale-100 group-hover:opacity-20"></div>
                                </>
                            )}
                        </div>

                        {/* Instruksi Desain */}
                        <div className="mt-6 flex flex-col flex-1 shrink-0 min-h-56">
                            <h3 className="text-xs md:text-sm font-bold text-primary uppercase mb-3 shrink-0">
                                INTRUKSI DESAIN DAN CAPTION
                            </h3>
                            
                            {/* Text Area Card */}
                            <div className="rounded-2xl border border-primary p-4 bg-white focus-within:ring-2 focus-within:ring-primary/20 transition-all flex flex-col flex-1">
                                {/* Style Selector */}
                                <div className="mb-3 flex relative">
                                    <button 
                                        onClick={() => setIsStyleDropdownOpen(!isStyleDropdownOpen)}
                                        onBlur={() => setTimeout(() => setIsStyleDropdownOpen(false), 200)}
                                        className="flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-[10px] md:text-xs font-bold text-white focus:outline-hidden hover:bg-primary/90 transition-colors"
                                    >
                                        Kategori : {selectedStyle} 
                                        <svg className={`w-3 h-3 transition-transform duration-300 ${isStyleDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                                    </button>

                                    {/* Dropdown Menu */}
                                    <div className={`absolute top-full left-0 mt-2 w-48 rounded-xl border border-gray-100 bg-white shadow-xl py-2 z-10 transition-all duration-200 origin-top-left ${isStyleDropdownOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                                        {styleOptions.map((style) => (
                                            <button
                                                key={style}
                                                onClick={() => {
                                                    setSelectedStyle(style);
                                                    setIsStyleDropdownOpen(false);
                                                }}
                                                className={`w-full text-left px-4 py-2 text-xs md:text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary ${selectedStyle === style ? 'text-primary bg-primary/5' : 'text-[#2b2b2b]'}`}
                                            >
                                                {style}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <textarea 
                                    ref={instructionRef}
                                    className="w-full flex-1 resize-none text-xs md:text-sm font-medium text-dark bg-transparent outline-hidden placeholder:text-gray-400 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                                    defaultValue="Buatkan Poster Produk Sepatu Kets Di Atas Podium Melingkar Yang Mewah. Berikan Efek Dua Lampu Sorot (Spotlight) Dari Atas Yang Menyoroti Produk Dengan Tajam."
                                ></textarea>
                            </div>
                        </div>

                        {/* Tombol Selanjutnya */}
                        <div className="mt-auto pt-8">
                            <button 
                                onClick={handleGenerate}
                                disabled={isGenerating}
                                className={`w-full rounded-full py-3 md:py-3.5 text-base md:text-lg font-bold text-white shadow-md transition-all duration-300 focus:outline-hidden flex items-center justify-center gap-2 ${isGenerating ? 'bg-gray-400 cursor-not-allowed shadow-none transform-none' : 'bg-[#F98C23] hover:bg-[#e07a1b] hover:-translate-y-1 hover:shadow-lg'}`}
                            >
                                {isGenerating ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Memproses...
                                    </>
                                ) : (
                                    "Generate"
                                )}
                            </button>
                        </div>
                    </div>

                    {/* ==========================================
                        KOLOM KANAN: OUTPUT (Porsi 8/12 Kolom)
                    ========================================== */}
                    <div className={`relative lg:col-span-8 flex flex-col rounded-[2rem] border-2 border-primary bg-white p-6 sm:p-8 shadow-sm transition-all duration-1000 delay-500 ease-out
                        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-16 opacity-0'}
                    `}>
                        {/* Tombol Refresh (Pojok Kanan Atas) */}
                        <button className="absolute right-6 top-6 text-dark hover:text-primary hover:rotate-180 transition-all duration-500 focus:outline-hidden">
                            <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 flex-1">
                            
                            {/* Kiri: Preview Poster */}
                            <div className="flex flex-col self-start w-full rounded-2xl border border-primary p-4 overflow-hidden bg-primary-light/10">
                                <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3 shrink-0">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                                            <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                                        </div>
                                        <span className="rounded-full bg-primary px-3 py-0.5 text-[10px] md:text-xs font-bold text-white">Foto</span>
                                    </div>
                                    <svg className="w-5 h-5 text-primary cursor-pointer hover:opacity-70" fill="currentColor" viewBox="0 0 20 20"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" /></svg>
                                </div>
                                
                                {/* Frame Poster (Bentuk Pakem, Anti Potong) */}
                                <div className="w-full flex-1 relative flex items-center justify-center">
                                    <div className="relative w-full max-w-sm aspect-3/4 ring-1 ring-gray-900/5 shadow-2xl shadow-primary/20 rounded-xl overflow-hidden flex items-center justify-center p-2 bg-white">
                                        {isGenerating ? (
                                            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-50/90 backdrop-blur-sm p-6 text-center">
                                                <svg className="w-10 h-10 md:w-12 md:h-12 text-primary/50 mb-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                </svg>
                                                <span className="text-xs md:text-sm font-bold text-primary animate-pulse">
                                                    {loadingMessage}
                                                </span>
                                            </div>
                                        ) : generatedPoster ? (
                                            <img src={generatedPoster} alt="Generated Poster Preview" className="w-full h-full object-contain transition-opacity duration-500" />
                                        ) : (
                                            <div className="flex items-center justify-center text-gray-400 w-full h-full text-xs text-center p-4">
                                                Belum ada poster. Klik Generate untuk memulai.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Kanan: Caption & Pengaturan Jadwal */}
                            <div className="flex flex-col h-full">
                                
                                {/* Box Caption */}
                                <div className="flex flex-col flex-1 min-h-[220px] md:min-h-0 rounded-2xl border border-primary p-4 bg-white relative">
                                    {/* Header Caption Box */}
                                    <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3 shrink-0">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                                                <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                                            </div>
                                            <span className="rounded-full bg-primary px-3 py-0.5 text-[10px] md:text-xs font-bold text-white">Caption</span>
                                        </div>
                                        <svg className="w-5 h-5 text-primary cursor-pointer hover:opacity-70" fill="currentColor" viewBox="0 0 20 20"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" /></svg>
                                    </div>
                                    
                                    {/* Isi Caption (Editable) */}
                                    {isGenerating ? (
                                        <div className="w-full flex-1 flex flex-col gap-2.5 animate-pulse mt-2 px-1">
                                            <div className="h-2.5 md:h-3 bg-gray-200 rounded-full w-3/4"></div>
                                            <div className="h-2.5 md:h-3 bg-gray-200 rounded-full w-full"></div>
                                            <div className="h-2.5 md:h-3 bg-gray-200 rounded-full w-full"></div>
                                            <div className="h-2.5 md:h-3 bg-gray-200 rounded-full w-5/6"></div>
                                            <div className="h-2.5 md:h-3 bg-gray-200 rounded-full w-1/2 mt-4"></div>
                                            <div className="h-2.5 md:h-3 bg-gray-200 rounded-full w-2/3 mt-2"></div>
                                        </div>
                                    ) : (
                                        <textarea 
                                            className="w-full flex-1 resize-none text-[11px] md:text-sm font-medium text-dark leading-relaxed bg-transparent outline-hidden placeholder:text-gray-300 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                                            value={captionText}
                                            onChange={(e) => setCaptionText(e.target.value)}
                                            placeholder="Belum ada caption. Hasil tulisan AI akan muncul di sini..."
                                        />
                                    )}
                                </div>

                                {/* Platform Selector */}
                                <div className="mt-6 flex flex-col relative">
                                    <span className="text-xs md:text-sm font-bold text-primary mb-2">Platform</span>
                                    
                                    {/* Transparent backdrop overlay for click outside */}
                                    {isPlatformDropdownOpen && (
                                        <div 
                                            className="fixed inset-0 z-10" 
                                            onClick={() => setIsPlatformDropdownOpen(false)} 
                                        />
                                    )}

                                    <button 
                                        onClick={() => setIsPlatformDropdownOpen(!isPlatformDropdownOpen)}
                                        className="relative z-20 flex items-center gap-3 rounded-full border border-primary px-4 py-2 md:py-2.5 bg-white cursor-pointer hover:bg-light-bg transition-colors focus:outline-hidden"
                                    >
                                        {selectedPlatforms.length === 1 && selectedPlatforms[0] === 'Instagram' && (
                                            <img src={iconIg} alt="Instagram" className="w-4 h-4 md:w-5 md:h-5 object-contain" />
                                        )}
                                        <span className={`text-xs md:text-sm font-bold text-dark grow text-left ${!(selectedPlatforms.length === 1 && selectedPlatforms[0] === 'Instagram') ? 'pl-2' : ''}`}>
                                            {selectedPlatforms.length === 0 ? 'Pilih Platform' 
                                                : selectedPlatforms.length === 1 ? selectedPlatforms[0] 
                                                : `${selectedPlatforms.length} Platform Terpilih`}
                                        </span>
                                        <svg className={`w-4 h-4 text-dark transition-transform duration-300 ${isPlatformDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                                    </button>

                                    {/* Dropdown Menu */}
                                    <div className={`absolute top-18 left-0 w-full rounded-xl border border-gray-100 bg-white shadow-xl py-2 z-20 transition-all duration-200 origin-top ${isPlatformDropdownOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                                        {platformOptions.map((platform) => {
                                            const isSelected = selectedPlatforms.includes(platform);
                                            return (
                                                <button
                                                    key={platform}
                                                    onClick={() => togglePlatform(platform)}
                                                    className={`flex items-center justify-between w-full text-left px-4 py-2 text-xs md:text-sm font-bold transition-colors hover:bg-primary/10 hover:text-primary ${isSelected ? 'text-primary bg-primary/5' : 'text-dark'}`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        {platform === 'Instagram' && <img src={iconIg} alt="Instagram" className="w-5 h-5 object-contain" />}
                                                        <span className={`${platform !== 'Instagram' ? 'pl-8' : ''}`}>{platform}</span>
                                                    </div>
                                                    <div className={`shrink-0 flex items-center justify-center w-5 h-5 rounded border ${isSelected ? 'bg-primary border-primary text-white' : 'border-gray-300 bg-white'}`}>
                                                        {isSelected && <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Jadwal Posting */}
                                <div className="mt-4 flex flex-col">
                                    <span className="text-xs md:text-sm font-bold text-primary mb-2">JADWAL POSTING</span>
                                    <div className="flex gap-2 md:gap-3">
                                        <div className="relative flex items-center justify-between w-1/2 rounded-full border border-primary px-3 md:px-4 bg-white cursor-pointer focus-within:ring-2 focus-within:ring-primary/20 transition-all overflow-hidden h-9 md:h-10">
                                            <input 
                                                type="time" 
                                                defaultValue="12:00" 
                                                className="w-full h-full text-[11px] md:text-sm font-semibold text-dark outline-hidden bg-transparent cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer z-10" 
                                            />
                                            <svg className="w-4 h-4 md:w-5 md:h-5 text-primary absolute right-3 md:right-4 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        </div>
                                        <div className="relative flex items-center justify-between w-1/2 rounded-full border border-primary px-3 md:px-4 bg-white cursor-pointer hover:bg-light-bg focus-within:ring-2 focus-within:ring-primary/20 transition-all overflow-hidden h-9 md:h-10">
                                            <input 
                                                type="date" 
                                                className="w-full h-full text-[11px] md:text-xs font-semibold text-dark outline-hidden bg-transparent cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer z-10" 
                                            />
                                            <svg className="w-4 h-4 md:w-5 md:h-5 text-primary absolute right-3 md:right-4 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Tombol Posting */}
                                <button className="mt-auto pt-6 w-full focus:outline-hidden">
                                    <div className="w-full rounded-full bg-[#F98C23] py-3 md:py-3.5 text-base md:text-lg font-bold text-white shadow-md transition-all duration-300 hover:bg-[#e07a1b] hover:-translate-y-1 hover:shadow-lg">
                                        Posting
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AiStudioSection;