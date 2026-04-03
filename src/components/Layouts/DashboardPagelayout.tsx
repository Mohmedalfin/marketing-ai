import DashboardPageSection from "../Sections/DashboardPage/DashboardPageSection";
import Navbar from "../Fragments/Navbar";
import FooterSection from "../Fragments/Footer";

export default function DashboardPageLayout() {
    return (
        <div className="min-h-screen bg-[linear-gradient(180deg,#B7D8B5_0%,#E8E6E0_68%,#B7D8B5_100%)] font-sans antialiased text-[#5C5C5C] flex flex-col">
            <Navbar variant="app" />
            <main className="flex-1 w-full mt-32 md:mt-36">
                <DashboardPageSection />
            </main>
            <FooterSection />
        </div>
    );
}