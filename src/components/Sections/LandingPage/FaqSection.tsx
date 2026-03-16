import { useState, useEffect, useRef } from 'react';

// TODO: Sesuaikan path gambar ilustrasi mbak-mbak duduk di atas kertas
import faqIllustration from '../../../assets/faq-illustration.svg'; 

const FaqSection = () => {
    // State untuk memicu animasi saat di-scroll
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    // State untuk mengatur FAQ mana yang sedang terbuka. 
    // Saya set default angka 2 (artinya pertanyaan ke-3 terbuka, sesuai gambar desainmu).
    const [openIndex, setOpenIndex] = useState<number | null>(2);

    const toggleFaq = (index: number) => {
        // Jika yang diklik adalah yang sedang terbuka, maka tutup. Jika tidak, buka yang baru.
        setOpenIndex(openIndex === index ? null : index);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.15 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const faqs = [
        {
            question: "Apakah Aman Menghubungkan Akun Sosial Media Saya Ke AiGency?",
            answer: "Sangat Aman! AiGency Menggunakan Jalur API Resmi Dari Masing Masing Platform (Meta, TikTok, Dan X). Kami Tidak Pernah Meminta Atau Menyimpan Password Anda. Selain Itu, Sistem Auto-Posting Kami Dirancang Mematuhi Batas Aman Algoritma Agar Akun Anda Terhindar Dari Risiko Shadowban Atau Blokir."
        },
        {
            question: "Apakah AiGency Bisa Digunakan Untuk Semua Jenis Bisnis?",
            answer: "Tentu saja! AiGency telah dilatih dengan berbagai data industri, mulai dari F&B, Fashion, Jasa, hingga B2B. Anda cukup menyesuaikan 'Brand Voice' di pengaturan awal, dan AI akan menyesuaikan gaya bahasanya."
        },
        {
            question: "Bagaimana Jika Saya Tidak Puas Dengan Hasil Generate AI?",
            answer: "Anda memegang kendali penuh! AiGency menyediakan fitur 'Regenerate' tanpa batas. Anda juga bisa mengedit teks caption atau mengganti elemen visual secara manual sebelum konten tersebut masuk ke jadwal auto-posting."
        }
    ];

    return (
        <section ref={sectionRef} className="w-full bg-light-bg py-20 lg:py-22 overflow-hidden relative">
            
            {/* Custom Keyframe untuk efek ilustrasi melayang (Floating) */}
            <style>
                {`
                    @keyframes float {
                        0% { transform: translateY(0px); }
                        50% { transform: translateY(-15px); }
                        100% { transform: translateY(0px); }
                    }
                    .animate-float {
                        animation: float 5s ease-in-out infinite;
                    }
                `}
            </style>

            <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
                {/* Garis hijau standar (Sama dengan Problem/Feature Section) */}
                <div className={`mb-10 lg:mt-16 h-1 w-3/4 lg:w-[26%] bg-primary rounded-full transition-all duration-1000 delay-500 ease-out origin-left
                    ${isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}
                `}></div>
                {/* --- HEADER: Teks & Garis Kiri Atas --- */}
                <div className={`mb-10 sm:mb-12 max-w-3xl transition-all duration-1000 ease-out
                    ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}
                `}>
                    
                    <h2 className="text-[1.75rem] sm:text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-primary leading-[1.15] sm:leading-snug">
                        HILANGKAN KERAGUAN ANDA <br className="hidden sm:block" /> BERSAMA AIGENCY
                    </h2>
                    <p className="mt-4 text-sm sm:text-base md:text-lg font-medium text-dark leading-relaxed">
                        Pelajari Lebih Lanjut Bagaimana Kami Menjaga Keamanan Akun Dan Kualitas Konten Anda.
                    </p>
                </div>

                {/* --- MAIN CARD: Box Hijau Besar --- */}
                <div className={`relative w-full rounded-3xl sm:rounded-[2.5rem] bg-primary-light p-6 sm:p-8 md:p-12 lg:p-16 shadow-2xl transition-all duration-1000 delay-300 ease-out
                    ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}
                `}>
                    
                    <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16 items-start">
                        
                        {/* Kolom Kiri: Ilustrasi (Porsi 5 kolom) */}
                        <div className="lg:col-span-5 flex justify-center lg:justify-start lg:sticky mt-5 lg:top-32 ">
                            <img 
                                src={faqIllustration} 
                                alt="FAQ Illustration" 
                                className="w-full max-w-[220px] sm:max-w-[300px] lg:max-w-full object-contain animate-float drop-shadow-xl"
                            />
                        </div>

                        {/* Kolom Kanan: List Accordion FAQ (Porsi 7 kolom) */}
                        <div className="lg:col-span-7 flex flex-col pt-2 sm:pt-4">
                            {faqs.map((faq, index) => {
                                const isOpen = openIndex === index;

                                return (
                                    <div 
                                        key={index} 
                                        className="flex flex-col border-t border-white/40 first:border-t-0"
                                    >
                                        {/* Pertanyaan (Tombol Toggle) */}
                                        <button 
                                            onClick={() => toggleFaq(index)}
                                            className="flex w-full items-center justify-between py-4 sm:py-6 text-left focus:outline-hidden group"
                                            aria-expanded={isOpen}
                                        >
                                            <span className={`text-base sm:text-lg md:text-xl font-bold pr-4 sm:pr-8 transition-colors duration-300
                                                ${isOpen ? 'text-white' : 'text-white/90 group-hover:text-white'}
                                            `}>
                                                {faq.question}
                                            </span>
                                            
                                            {/* Icon Plus / Minus */}
                                            <div className="relative flex shrink-0 items-center justify-center size-5 sm:size-6 text-white">
                                                <svg 
                                                    className={`absolute size-5 sm:size-6 transition-all duration-300 ease-in-out ${isOpen ? 'rotate-180 opacity-0 scale-50' : 'rotate-0 opacity-100 scale-100'}`} 
                                                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                                </svg>
                                                <svg 
                                                    className={`absolute size-5 sm:size-6 transition-all duration-300 ease-in-out ${isOpen ? 'rotate-0 opacity-100 scale-100' : '-rotate-180 opacity-0 scale-50'}`} 
                                                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                                                </svg>
                                            </div>
                                        </button>

                                        {/* Jawaban dengan Animasi Grid Smooth Collapse */}
                                        <div 
                                            className={`grid transition-all duration-500 ease-in-out
                                                ${isOpen ? 'grid-rows-[1fr] opacity-100 pb-4 sm:pb-6' : 'grid-rows-[0fr] opacity-0 pb-0'}
                                            `}
                                        >
                                            <div className="overflow-hidden">
                                                <p className="text-sm sm:text-base font-medium text-white/90 leading-relaxed">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>                       
                    </div>
                </div>              
            </div>
        </section>
    );
};

export default FaqSection;
