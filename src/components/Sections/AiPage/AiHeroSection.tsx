import { useState, useEffect, useRef } from 'react';
import aiHeroIllustration from '../../../assets/ai-hero.svg';

const AiHeroSection = () => {
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
            { threshold: 0.15 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const tags = ['#fyp', '#viral', '#marketing'];

    return (
        // Background menggunakan SVG landing page yang dilanjuti ke section berikutnya (diatur di Layout)
        <section 
            ref={sectionRef} 
            className="w-full min-h-[70vh] flex items-center justify-center pt-24 px-6 md:px-12 lg:px-16 overflow-hidden"
        >
            
            {/* CSS Custom Keyframes untuk animasi gambar melayang terus-menerus */}
            <style>
                {`
                    @keyframes float-dynamic {
                        0% { transform: translateY(0px) rotate(0deg); }
                        50% { transform: translateY(-15px) rotate(1deg); }
                        100% { transform: translateY(0px) rotate(0deg); }
                    }
                    .animate-float-dynamic {
                        animation: float-dynamic 5s ease-in-out infinite;
                    }
                `}
            </style>

            {/* MAIN CARD: Kotak putih besar dengan shadow */}
            <div className={`mx-auto w-full max-w-7xl bg-white rounded-2xl p-8 sm:p-10 lg:px-12 lg:py-8 shadow-[0_8px_40px_rgb(0,0,0,0.06)] transition-all duration-1000 ease-out
                ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-16 opacity-0 scale-95'}
            `}>
                <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
                    
                    {/* --- KOLOM KIRI: Teks & Tags --- */}
                    <div className="flex flex-col items-start gap-4 lg:pr-8">
                        
                        {/* Headline */}
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark leading-[1.15] tracking-tight">
                            Branding.<br />
                            No. Repot<br />
                            No. Rempong
                        </h1>
                        
                        {/* Subheadline Hijau */}
                        <p className="text-base md:text-lg lg:text-xl font-bold text-primary leading-snug">
                            Konten Sosmed Berjalan Otomatis. AiGency Urus Postingan, Anda Fokus Bisnis.
                        </p>

                        {/* Tags Pill (#fyp, dll) */}
                        <div className="flex flex-wrap items-center gap-3 mt-2">
                            {tags.map((tag, index) => (
                                <span 
                                    key={index}
                                    style={{ transitionDelay: `${600 + (index * 150)}ms` }}
                                    className={`rounded-full bg-primary px-5 py-2 text-sm sm:text-base font-bold text-white shadow-sm transition-all duration-700 ease-out
                                        ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}
                                    `}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* --- KOLOM KANAN: Ilustrasi (Animasi Bergerak Terus Menerus) --- */}
                    <div className={`relative hidden md:none-hidden lg:flex w-full items-center justify-center lg:justify-end transition-all duration-1000 delay-300 ease-out
                        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-16 opacity-0'}
                    `}>
                        {/* Gambar ini akan melayang-layang tiada henti karena class animate-float-dynamic */}
                        <img 
                            src={aiHeroIllustration} 
                            alt="AI Content Generation" 
                            className="w-full max-w-[350px] lg:max-w-[550px] object-contain animate-float-dynamic drop-shadow-xl"
                        />
                    </div>

                </div>
            </div>
            
        </section>
    );
};

export default AiHeroSection;