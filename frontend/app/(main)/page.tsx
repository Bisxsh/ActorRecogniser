import Footer from "@/components/Footer";
import FinalCta from "@/components/landing/FinalCta";
import FirstSection from "@/components/landing/FirstSection";
import Hero from "@/components/landing/Hero";
import StatsSection from "@/components/landing/StatsSection";
import StepsSection from "@/components/landing/StepsSection";
import { SmoothScrollWrapper } from "@/components/SmoothScrollWrapper";
import { printTag } from "@/lib/utils";

const page = () => {
  printTag();
  return (
    <main>
      <SmoothScrollWrapper>
        <Hero />
        <FirstSection />
        <StatsSection />
        <StepsSection />
        <FinalCta />
        <Footer />
      </SmoothScrollWrapper>
    </main>
  );
};

export default page;
