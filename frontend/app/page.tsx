import FirstSection from "@/components/landing/FirstSection";
import Hero from "@/components/landing/Hero";
import { SmoothScrollWrapper } from "@/components/SmoothScrollWrapper";

const page = () => {
  return (
    <main>
      <SmoothScrollWrapper>
        <Hero />
        <FirstSection />
        <div className="h-dvh" />
      </SmoothScrollWrapper>
    </main>
  );
};

export default page;
