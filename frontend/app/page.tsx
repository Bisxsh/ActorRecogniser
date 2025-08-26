import FirstSection from "@/components/landing/FirstSection";
import Hero from "@/components/landing/Hero";
import StatsSection from "@/components/landing/StatsSection";
import { SmoothScrollWrapper } from "@/components/SmoothScrollWrapper";

const page = () => {
  return (
    <main>
      <SmoothScrollWrapper>
        <Hero />
        <div className="h-[20vh]" />
        <FirstSection />
        <div className="h-[20vh]" />
        <StatsSection />
        <div className="h-dvh" />
      </SmoothScrollWrapper>
    </main>
  );
};

export default page;
