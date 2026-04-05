import { useState, useEffect, useRef } from 'react';

// TODO: Import ilustrasi yang menembus batas (contoh: mbak-mbak/sepatu)
// Ganti path ini dengan gambar format .png transparan
import breakoutIllustration from './src/assets/ai-poster-preview.svg';

export default function ImageBreakout() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    // Observer untuk trigger animasi saat section masuk layar
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 } 
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full overflow-hidden bg-light-bg py-20 px-6 md:px-12 lg:px-16 lg:py-32">
            
            <div className="mx-auto max-w-7xl">
                
                {/* --- HEADER --- */}
                <div className={`mb-16 transition-all duration-1000 ease-out
                    ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}
                `}>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-primary leading-snug">
                        FOTO YANG<br />MENEMBUS BATAS
                    </h2>
                    <p className="mt-4 text-base md:text-lg font-medium text-dark leading-relaxed max-w-3xl">
                        Konsistensi Bentuk Wadah (Card) Dipertahankan, Namun Gambar Di Dalamnya Sengaja Keluar Dari Batas Atas Untuk Efek 3D Yang Dinamis.
                    </p>
                </div>

                {/* --- MAIN CONTENT (CARD & BREAKOUT IMAGE) --- */}
                <div className="relative w-full">
                    
                    {/* Wadah Card (Konsisten & Menentukan Ukuran) */}
                    <div className="relative w-full md:w-[60%] lg:w-[45%] aspect-[3/4] bg-white rounded-[2rem] shadow-sm p-6 sm:p-8 flex flex-col items-start justify-end">
                        {/* Area Teks di Bawah Card */}
                        <div className="relative z-20 w-full flex flex-col items-start gap-4">
                            <span className="rounded-full bg-primary-light px-6 py-2 text-base font-bold text-white shadow-sm">
                                BREAKOUT
                            </span>
                            <h3 className="text-xl md:text-2xl font-bold text-primary">
                                Ilustrasi Dinamis
                            </h3>
                            <button className="rounded-xl bg-primary px-8 py-3 text-sm font-bold text-white transition-all hover:bg-primary-hover hover:-translate-y-0.5 focus:outline-hidden">
                                Lihat Detail
                            </button>
                        </div>
                    </div>

                    {/* --- Gambar Ilustrasi (Yang Sengaja Keluar Batas) --- */}
                    <div className={`absolute bottom-0 right-[-50px] md:right-0 lg:right-[-50px] flex w-full justify-center md:justify-end items-end transition-all duration-1000 delay-300 ease-out origin-bottom
                        ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'}
                    `}>
                        {/* Di desktop tingginya diset 140% agar menembus batas atas kotak putih */}
                        <img 
                            src={breakoutIllustration} 
                            alt="Breakout Illustration" 
                            className="h-[380px] w-auto object-contain object-bottom drop-shadow-2xl sm:h-[450px] md:h-[500px] lg:h-[140%] lg:min-h-[500px]"
                        />
                    </div>

                </div>

            </div>
            
        </section>
    );
}