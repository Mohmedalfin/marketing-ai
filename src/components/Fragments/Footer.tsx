import { useState, useEffect, useRef } from 'react';

// TODO: Import ilustrasi HP raksasa dan logo AiGency
import ctaIllustration from '../../assets/cta-illustration.svg';
import logoAigency from '../../assets/logo.png';

const FooterSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

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
        // Padding top ekstra besar (pt-32/pt-48) untuk memberi ruang bagi kepala ilustrasi yang tembus ke atas
        <section ref={sectionRef} className="relative w-full overflow-hidden bg-light-bg pt-32 lg:pt-48">
            
            {/* --- BOX HIJAU MUDA (TENGAH) --- */}
            <div className="relative w-full bg-primary-light px-6 pb-16 pt-10 md:px-12 lg:px-16">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-end lg:flex-row relative">

                    {/* --- KOLOM KIRI: Ilustrasi Keluar Batas (Breakout Effect) --- */}
                    <div className={`relative z-10 flex w-full justify-center lg:absolute lg:bottom-0 lg:left-0 lg:w-auto lg:justify-start -mt-40 lg:mt-0 transition-all duration-1000 ease-out origin-bottom
                        ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'}
                    `}>
                        {/* Di desktop tingginya diset 140% agar menembus batas atas kotak hijau */}
                        <img
                            src={ctaIllustration}
                            alt="AI-Gency App"
                            className="h-[380px] w-auto object-contain object-bottom drop-shadow-2xl sm:h-[450px] md:h-[500px] lg:h-[140%] lg:min-h-[500px]"
                        />
                    </div>

                    {/* --- KOLOM KANAN: Typography CTA --- */}
                    <div className={`z-20 mt-12 flex w-full flex-col items-center text-center lg:mt-0 lg:w-[55%] lg:items-end lg:text-right transition-all duration-1000 delay-300 ease-out
                        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-16 opacity-0'}
                    `}>
                        <h2 className="text-4xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-5xl md:text-7xl drop-shadow-sm">
                            Branding<br />
                            Sosmed Beres<br />
                            Bebas Stres
                        </h2>
                        
                        {/* Logo AI-Gency di bawah teks */}
                        <img
                            src={logoAigency}
                            alt="AiGency Logo"
                            className="mt-6 h-8 w-auto object-contain sm:h-10 transition-transform hover:scale-105 duration-300"
                        />
                    </div>

                </div>
            </div>

            {/* --- FOOTER GELAP (BAWAH) --- */}
            <footer className="relative z-30 w-full bg-primary px-6 py-5">
                <div className="mx-auto flex max-w-7xl items-center justify-center text-center">
                    <p className={`text-sm font-medium text-white sm:text-base transition-all duration-1000 delay-500 ease-out
                        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                    `}>
                        © 2026 AiGency • Syarat & Ketentuan • Kebijakan Privasi
                    </p>
                </div>
            </footer>
            
        </section>
    );
};

export default FooterSection;
