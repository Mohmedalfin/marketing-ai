import Navbar from "../Fragments/Navbar";
import Footer from "../Fragments/Footer";
import CustomCursor from "../Elements/Cursor";
import AiHeroSection from "../Sections/AiPage/AiHeroSection";
import AiStudioSection from "../Sections/AiPage/AiStudioSection";
import bgLandingPage from "../../assets/bg-landingpage.svg";

const AiPageLayout = () => {
    return (
        <div className="relative min-h-screen bg-light-bg overflow-x-hidden">  
            <CustomCursor />
            <Navbar variant="app" />
            
            {/* Background Layer (Fixed height to prevent stretching) */}
            <div 
                className="absolute inset-x-0 top-0 h-screen min-h-[800px] bg-cover bg-top bg-no-repeat pointer-events-none"
                style={{ backgroundImage: `url(${bgLandingPage})` }}
            />

            <main className="relative z-10">
                <AiHeroSection />  
                <AiStudioSection /> 
                <Footer />
            </main>
        </div>
    );
};

export default AiPageLayout;