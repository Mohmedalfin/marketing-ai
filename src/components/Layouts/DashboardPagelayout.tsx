import DashboardPageSection from "../Sections/DashboardPage/DashboardPageSection";
import Navbar from "../Fragments/Navbar";
import FooterSection from "../Fragments/Footer";
import bgLandingPage from "../../assets/bg-landingpage.svg";


export default function DashboardPageLayout() {
    return (
        <div className="relative min-h-screen bg-light-bg overflow-x-hidden">
            <Navbar variant="app" />

            <div 
                className="absolute inset-x-0 top-0 h-screen min-h-[800px] bg-cover bg-top bg-no-repeat pointer-events-none"
                style={{ backgroundImage: `url(${bgLandingPage})` }}
            />

            <main className="flex-1 w-full mt-32 md:mt-36 relative z-10">
                <DashboardPageSection />
            </main>
            <FooterSection />
        </div>
    );
}