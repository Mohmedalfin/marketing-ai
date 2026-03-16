import { useEffect, useState, useRef } from "react";
import prob1 from "../../../assets/prob1.svg";
import prob2 from "../../../assets/prob2.svg";
import prob3 from "../../../assets/prob3.svg";
import prob4 from "../../../assets/prob4.svg";

const smallCards = [
    { img: prob1, text: "Lost to manual uploads",   label: "Problem 01", desc: "Kamu buang waktu berjam-jam hanya untuk upload konten satu per satu ke setiap platform.", mt: "mt-0", accent: "from-[#3BB77E] to-[#2da86e]" },
    { img: prob2, text: "Stuck on a blank screen.", label: "Problem 02", desc: "Kehabisan ide tiap hari dan tidak tahu harus posting konten apa berikutnya.", mt: "mt-4", accent: "from-[#4f46e5] to-[#6366f1]" },
    { img: prob3, text: "Growth Over Fees.",         label: "Problem 03", desc: "Budget marketing habis ke agency tapi hasilnya tidak setimpal dengan yang kamu bayar.", mt: "mt-0", accent: "from-[#f59e0b] to-[#f97316]" },
];

// Konten dalam kartu dengan hover reveal effect
const CardContent = ({ card }: { card: typeof smallCards[0] }) => (
    <div className="p-5 flex flex-col h-full overflow-hidden">
        {/* Badge label — selalu tampil di normal flow */}
        <span
            className={`self-start mb-2 px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase bg-gradient-to-r ${card.accent} text-transparent bg-clip-text border border-current opacity-70 flex-shrink-0`}
            style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        >
            {card.label}
        </span>

        {/* Container yang menampung kedua layer — relatif terhadap sisa ruang */}
        <div className="relative flex-1 mt-1">
            {/* === LAYER ICON === tampil default, hilang saat hover */}
            <div className="absolute inset-0 flex flex-col justify-between
                transition-all duration-500 ease-out
                group-hover:opacity-0 group-hover:-translate-y-3 group-hover:scale-95
            ">
                <div className="flex-1 flex items-center justify-center">
                    <img src={card.img} alt={card.text} className="h-38 sm:h-42 object-contain" />
                </div>
                <p className="text-[14px] font-bold text-gray-800 leading-snug pb-1 text-center">
                    {card.text}
                </p>
            </div>

            {/* === LAYER TEXT === tersembunyi default, muncul saat hover */}
            <div className="absolute inset-0 flex flex-col justify-center gap-2
                opacity-0 translate-y-4
                transition-all duration-500 ease-out
                group-hover:opacity-100 group-hover:translate-y-0
            ">
                <p
                    className={`text-2xl sm:text-3xl font-black bg-gradient-to-br ${card.accent} text-transparent bg-clip-text leading-tight`}
                    style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                >
                    {card.text}
                </p>
                <p className="text-[12px] sm:text-[13px] text-gray-500 leading-relaxed">
                    {card.desc}
                </p>
            </div>
        </div>
    </div>
);

const ProblemSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 } 
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    // State carousel khusus mobile
    const [carouselIndex, setCarouselIndex] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCarouselIndex((prev) => (prev + 1) % smallCards.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [smallCards.length]);

    // Sync scroll position dengan carouselIndex — center mode
    useEffect(() => {
        if (scrollRef.current) {
            const container = scrollRef.current;
            const cards = container.children;
            const targetCard = cards[carouselIndex + 1] as HTMLElement;
            if (targetCard) {
                const containerRect = container.getBoundingClientRect();
                const targetRect = targetCard.getBoundingClientRect();
                const scrollPos = container.scrollLeft + (targetRect.left - containerRect.left) - (containerRect.width / 2) + (targetRect.width / 2);
                
                container.scrollTo({
                    left: scrollPos,
                    behavior: 'smooth'
                });
            }
        }
    }, [carouselIndex]);

    return (
        <section ref={sectionRef} className="w-full py-20 lg:py-32 overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
                
                {/* --- HEADER --- */}
                <div className={`mb-12 max-w-2xl transition-all duration-1000 ease-out
                    ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}
                `}>
                    <h2 className="text-3xl font-extrabold uppercase tracking-tight text-primary sm:text-4xl md:text-5xl leading-[1.15]">
                        Masih Ngelakuin<br />Semuanya Manual?
                    </h2>
                    <p className="mt-4 text-base font-medium text-gray-600 sm:text-lg leading-relaxed max-w-xl">
                        Mengurus Banyak Akun Sosmed Tiap Hari Nggak Seharusnya Bikin Kamu Stres, Kehabisan Ide, Dan Buang-Buang Waktu.
                    </p>
                </div>

                {/* --- CARDS --- */}
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
                    {/* Kartu Besar (Kiri) */}
                    <div className={`relative flex w-full h-72 lg:w-[35%] flex-col justify-center lg:mt-4 rounded-3xl bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-1000 ease-out hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]
                        ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}
                    `}>
                        <div className="flex items-center justify-between h-full gap-4">
                            <img src={prob4} alt="Problem Manual" className="w-1/2 object-contain" />
                            <h3 className="w-1/2 text-2xl md:text-3xl font-bold text-dark text-center lg:text-left">
                                Problem ?
                            </h3>
                        </div>
                    </div>

                    {/* ======= MOBILE: Peek Carousel (scroll-snap) ======= */}
                    <div className="block lg:hidden w-full">
                        {/* Scroll track dengan snap center */}
                        <div
                            ref={scrollRef}
                            className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                        >
                            {/* Spacer awal — agar kartu pertama bisa di-center */}
                            <div className="flex-none w-[10%] shrink-0" aria-hidden="true" />

                            {smallCards.map((card, index) => (
                                <div
                                    key={index}
                                    onClick={() => setCarouselIndex(index)}
                                    className="group snap-center flex-none w-[80%] h-72 rounded-3xl bg-white overflow-hidden
                                        shadow-[0_4px_24px_rgb(0,0,0,0.06)] cursor-pointer
                                        transition-shadow duration-300 hover:shadow-[0_12px_32px_rgb(0,0,0,0.1)]"
                                >
                                    <CardContent card={card} />
                                </div>
                            ))}

                            {/* Spacer akhir — agar kartu terakhir bisa di-center tanpa ruang kosong */}
                            <div className="flex-none w-[10%] shrink-0" aria-hidden="true" />
                        </div>

                        {/* Dots Indikator */}
                        <div className="mt-5 flex items-center justify-center gap-2">
                            {smallCards.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCarouselIndex(index)}
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        index === carouselIndex ? 'w-7 bg-primary' : 'w-2 bg-gray-300 hover:bg-gray-400'
                                    }`}
                                    aria-label={`Slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* ======= DESKTOP: Zigzag Layout ======= */}
                    <div className="hidden lg:flex w-full lg:w-[62%] flex-row gap-5 items-start">
                        {smallCards.map((card, index) => (
                            <div 
                                key={index}
                                style={{ transitionDelay: `${400 + (index * 200)}ms` }}
                                className={`group relative flex flex-col flex-1 h-72 rounded-3xl bg-white overflow-hidden
                                    shadow-[0_4px_24px_rgb(0,0,0,0.06)] transition-all duration-700 ease-out
                                    hover:-translate-y-3 hover:shadow-[0_16px_40px_rgb(0,0,0,0.12)]
                                    ${card.mt}
                                    ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
                                `}
                            >
                                <CardContent card={card} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Garis hijau — mentok kiri, di luar div layout */}
                <div className={`mt-10 lg:mt-16 h-1 w-3/4 lg:w-[26%] bg-primary rounded-full transition-all duration-1000 delay-500 ease-out origin-left
                    ${isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}
                `}></div>
            </div>
        </section>
    );
};

export default ProblemSection;
