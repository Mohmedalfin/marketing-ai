import { useEffect, useState } from "react";
import bgLandingPage from "../../../assets/bg-landingpage.svg";
import heroImg1 from "../../../assets/cor-1.svg"; 
import heroImg2 from "../../../assets/cor-2.svg";

const HeroSection = () => {
    const heroData = [
        { line1: "Branding.", line2: "No Repot.", line3: "No Rempong.", image: heroImg1 },
        { line1: "Konten.", line2: "No Pusing.", line3: "Auto Posting.", image: heroImg2 },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % heroData.length);
        }, 4000); 
        return () => clearInterval(interval);
    }, [heroData.length]);

    return (
        <section 
            className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center pt-28 pb-12 lg:pt-0 lg:pb-0"
            style={{ backgroundImage: `url(${bgLandingPage})` }}
        >
            <div className="mx-auto flex w-full max-w-7xl items-center px-6 md:px-12 lg:px-16">
                <div className="grid w-full grid-cols-1 items-center gap-4 sm:gap-8 lg:grid-cols-2 lg:gap-16">
                    {/* Kolom Kiri: Teks Carousel & Tombol */}
                    <div className="flex flex-col items-start justify-center text-left lg:pr-10">
                        
                        {/* Wrapper Teks */}
                        <div className="relative w-full min-h-[180px] sm:min-h-[200px] md:min-h-[220px] lg:min-h-[280px]">
                            {heroData.map((data, index) => (
                                <div
                                    key={index}
                                    className={`absolute left-0 top-0 w-full flex flex-col items-start transition-all duration-700 ease-out
                                        ${index === currentIndex 
                                            ? 'translate-x-0 opacity-100 z-10' 
                                            : '-translate-x-12 opacity-0 z-0 pointer-events-none'
                                        }
                                    `}
                                >
                                    <h1 className="text-[2.75rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] font-extrabold leading-[1.1] lg:leading-[1.15] tracking-tight text-dark">
                                        {data.line1}<br />
                                        {data.line2}<br />
                                        {data.line3}
                                    </h1>
                                </div>
                            ))}
                        </div>

                        {/* Tombol - Hanya Desktop */}
                        <button className="hidden lg:block relative z-20 mt-4 md:mt-8 rounded-full bg-[#3BB77E] px-8 py-3.5 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#2fa36d] hover:shadow-xl focus:outline-hidden">
                            Get Started
                        </button>
                    </div>

                    {/* Kolom Kanan: Carousel Ilustrasi & Tombol Mobile */}
                    <div className="flex flex-col items-center w-full">
                        
                        {/* Wrapper Carousel */}
                        <div className="relative mt-0 flex h-[280px] w-full items-center justify-center sm:h-[350px] md:h-[450px] lg:mt-0 lg:h-[550px]">
                            {heroData.map((data, index) => (
                                <img
                                    key={index}
                                    src={data.image}
                                    alt={`Ilustrasi ${data.line1}`}
                                    className={`absolute h-full w-full object-contain transition-all duration-1000 ease-in-out
                                        ${index === currentIndex 
                                            ? 'scale-100 opacity-100 z-10' 
                                            : 'scale-95 opacity-0 z-0'
                                        }
                                    `}
                                />
                            ))}

                            {/* Dots */}
                            <div className="absolute bottom-0 lg:bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
                                {heroData.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`h-2.5 rounded-full transition-all duration-300 ${
                                            index === currentIndex ? 'w-8 bg-[#3BB77E]' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                                        }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Tombol - Hanya Mobile */}
                        <button className="block lg:hidden relative z-20 mt-8 rounded-full bg-[#3BB77E] px-4 py-2.5 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#2fa36d] hover:shadow-xl focus:outline-hidden w-full max-w-[280px]">
                            Get Started
                        </button>
                    </div>   
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
