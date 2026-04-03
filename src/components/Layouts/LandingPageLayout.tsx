import Navbar from "../Fragments/Navbar";
import HeroSection from "../Sections/LandingPage/HeroSection";
import ProblemSection from "../Sections/LandingPage/ProblemSection";
import FeatureSection from "../Sections/LandingPage/FeatureSection";
import MarqueeSection from "../Sections/LandingPage/MarqueeSection";
import FaqSection from "../Sections/LandingPage/FaqSection";
import FooterSection from "../Fragments/Footer";
import CustomCursor from "../Elements/Cursor";

export default function LandingPageLayout() {
  return (
    <div className="min-h-screen bg-primary-light font-poppins">
      <CustomCursor />
      <Navbar variant="landing" />
      <main className="bg-light-bg">
        <HeroSection />
        <div id="features" className="h-px scroll-mt-28 md:scroll-mt-32" />
        <ProblemSection />
        <div id="how-it-works" className="h-px scroll-mt-28 md:scroll-mt-32" />
        <FeatureSection />
        <MarqueeSection />
        <div id="solutions" className="h-px scroll-mt-28 md:scroll-mt-32" />
        <FaqSection />
        <FooterSection />
      </main>
    </div>
  );
}
