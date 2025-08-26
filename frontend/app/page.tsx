import FirstSection from "@/components/landing/FirstSection";
import Hero from "@/components/landing/Hero";
import StatsSection from "@/components/landing/StatsSection";
import StepsSection from "@/components/landing/StepsSection";
import { SmoothScrollWrapper } from "@/components/SmoothScrollWrapper";

const page = () => {
  return (
    <main>
      <SmoothScrollWrapper>
        <Hero />
        <FirstSection />
        <StatsSection />
        <StepsSection />
        <div className="h-dvh" />
        <div className="h-dvh" />
        <div className="h-dvh" />
      </SmoothScrollWrapper>
    </main>
  );
};

export default page;
