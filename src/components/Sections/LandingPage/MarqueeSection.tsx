import backendGuy from '../../../assets/eko.svg';
import frontendGuy from '../../../assets/eko.svg';
import uiuxGuy from '../../../assets/eko.svg';
import fbIcon from '../../../assets/facebook.svg';
import tiktokIcon from '../../../assets/tiktok.svg';
import igIcon from '../../../assets/instagram.svg';

// Komponen Card "BACKEND" (Supaya rapi dan tidak nulis ulang)
const BackendCard = () => (
    <div className="relative flex h-20 sm:h-24 w-64 sm:w-72 shrink-0 items-center rounded-[2.5rem] bg-primary px-6 sm:px-8 shadow-[0_4px_20px_rgb(0,0,0,0.05)]">
        <div className="relative z-10 flex flex-col">
            <span className="text-xl sm:text-2xl font-extrabold tracking-wide text-white">BACKEND</span>
            {/* Garis putih di bawah teks */}
            <div className="mt-1 h-0.5 w-full bg-white opacity-90"></div>
        </div>
        {/* Foto orang menembus batas atas (h-[130%]), tapi sejajar di bawah (bottom-0) */}
        <img
            src={backendGuy}
            alt="Backend Developer"
            className="absolute bottom-0 right-4 z-20 h-[130%] w-auto object-contain object-bottom drop-shadow-lg"
        />
    </div>
);

// Komponen Card "FRONTEND"
const FrontendCard = () => (
    <div className="relative flex h-20 sm:h-24 w-64 sm:w-72 shrink-0 items-center rounded-[2.5rem] bg-primary px-6 sm:px-8 shadow-[0_4px_20px_rgb(0,0,0,0.05)]">
        <div className="relative z-10 flex flex-col">
            <span className="text-xl sm:text-2xl font-extrabold tracking-wide text-white">FRONTEND</span>
            {/* Garis putih di bawah teks */}
            <div className="mt-1 h-0.5 w-full bg-white opacity-90"></div>
        </div>
        {/* Foto orang menembus batas atas (h-[130%]), tapi sejajar di bawah (bottom-0) */}
        <img
            src={frontendGuy}
            alt="Frontend Developer"
            className="absolute bottom-0 right-4 z-20 h-[130%] w-auto object-contain object-bottom drop-shadow-lg"
        />
    </div>
);

const UiUXCard = () => (
    <div className="relative flex h-20 sm:h-24 w-64 sm:w-72 shrink-0 items-center rounded-[2.5rem] bg-primary px-6 sm:px-8 shadow-[0_4px_20px_rgb(0,0,0,0.05)]">
        <div className="relative z-10 flex flex-col">
            <span className="text-xl sm:text-2xl font-extrabold tracking-wide text-white">UI/UX</span>
            {/* Garis putih di bawah teks */}
            <div className="mt-1 h-0.5 w-full bg-white opacity-90"></div>
        </div>
        {/* Foto orang menembus batas atas (h-[130%]), tapi sejajar di bawah (bottom-0) */}
        <img
            src={uiuxGuy}
            alt="Frontend Developer"
            className="absolute bottom-0 right-4 z-20 h-[130%] w-auto object-contain object-bottom drop-shadow-lg"
        />
    </div>
);

// Komponen untuk me-render satu set item di Baris 1
const RowOneItems = () => (
    <div className="flex shrink-0 items-center gap-8 sm:gap-12 px-4 sm:px-6">
        <BackendCard />
        <img src={fbIcon} alt="Facebook" className="h-12 w-12 sm:h-16 sm:w-16 shrink-0 object-contain hover:scale-110 transition-transform" />
        <UiUXCard />
        <img src={tiktokIcon} alt="TikTok" className="h-12 w-12 sm:h-16 sm:w-16 shrink-0 object-contain hover:scale-110 transition-transform" />
        <FrontendCard />
        <img src={igIcon} alt="Instagram" className="h-12 w-12 sm:h-16 sm:w-16 shrink-0 object-contain hover:scale-110 transition-transform" />
    </div>
);

// Komponen untuk me-render satu set item di Baris 2
const RowTwoItems = () => (
    <div className="flex shrink-0 items-center gap-8 sm:gap-12 px-4 sm:px-6">
        <img src={tiktokIcon} alt="TikTok" className="h-12 w-12 sm:h-16 sm:w-16 shrink-0 object-contain hover:scale-110 transition-transform" />
        <BackendCard />
        <img src={fbIcon} alt="Facebook" className="h-12 w-12 sm:h-16 sm:w-16 shrink-0 object-contain hover:scale-110 transition-transform" />
        <UiUXCard />
        <img src={igIcon} alt="Instagram" className="h-12 w-12 sm:h-16 sm:w-16 shrink-0 object-contain hover:scale-110 transition-transform" />
        <FrontendCard />
    </div>
);

const MarqueeSection = () => {
    return (
        <section className="w-full py-10 overflow-hidden relative">
            
            {/* CSS Keyframes khusus untuk animasi Marquee */}
            <style>
                {`
                    @keyframes scroll-left {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    @keyframes scroll-right {
                        0% { transform: translateX(-50%); }
                        100% { transform: translateX(0); }
                    }
                    .animate-marquee-left {
                        animation: scroll-left 35s linear infinite;
                    }
                    .animate-marquee-right {
                        animation: scroll-right 35s linear infinite;
                    }
                    /* Menghentikan animasi saat user mengarahkan kursor (Opsional tapi elegan) */
                    .pause-on-hover:hover {
                        animation-play-state: paused;
                    }
                `}
            </style>

            <div className="flex flex-col gap-12 sm:gap-16 pt-8 pb-12">
                
                {/* --- BARIS 1: Berjalan ke KIRI --- */}
                {/* W-max agar kontainer menyesuaikan lebar isinya, lalu kita duplikasi RowOneItems 2x */}
                <div className="flex w-max animate-marquee-left pause-on-hover">
                    <RowOneItems key="row1-1" />
                    <RowOneItems key="row1-2" /> {/* Duplikasi ini yang bikin efek loop tanpa putus */}
                </div>

                {/* --- BARIS 2: Berjalan ke KANAN --- */}
                {/* Untuk jalan ke kanan, posisi awal (0%) adalah -50%, lalu berjalan ke 0 */}
                <div className="flex w-max animate-marquee-right pause-on-hover">
                    <RowTwoItems key="row2-1" />
                    <RowTwoItems key="row2-2" /> {/* Duplikasi */}
                </div>

            </div>
        </section>
    );
};

export default MarqueeSection;
