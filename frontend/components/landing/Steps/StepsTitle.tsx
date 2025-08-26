"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

const StepsTitle = () => {
  useGSAP(() => {
    const firstTextSplit = SplitText.create(".steps-text-split-1 h1", {
      type: "chars",
    });
    const secondTextSplit = SplitText.create(".steps-text-split-2 h1", {
      type: "chars",
    });
    gsap.from(firstTextSplit.chars, {
      yPercent: 200,
      stagger: 0.02,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".steps-section",
        start: "top 30%",
      },
    });
    gsap.to(".steps-text-scroll", {
      duration: 1,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      scrollTrigger: {
        trigger: ".steps-section",
        start: "top 10%",
      },
    });
    gsap.from(secondTextSplit.chars, {
      yPercent: 200,
      stagger: 0.02,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".steps-section",
        start: "top 1%",
      },
    });
  });
  return (
    <div className="lg:pl-20 text-h3 col-center h-full 2xl:gap-32 xl:gap-24 gap-16 text-text text-center lg:text-start">
      <div className="overflow-hidden 2xl:py-0 py-3 steps-text-split-1">
        <h1 className="">IN JUST 3</h1>
      </div>

      {/* <div className="bg-secondary pb-5 2xl:pt-0 pt-3 2xl:px-5 px-3">
        <h2 className="text-text">SIMPLE</h2>
      </div> */}

      <div
        style={{
          clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
        }}
        className="steps-text-scroll rotate-[-3deg] md:translate-y-5 border-[.5vw] border-primary absolute z-10"
      >
        <div className="bg-secondary pb-5 2xl:pt-0 pt-3 2xl:px-5 px-3">
          <h2 className="text-text">SIMPLE</h2>
        </div>
      </div>

      <div className="pb-5 2xl:pt-0 pt-3 2xl:px-5 px-3">
        <h2 className="text-text opacity-0">SIMPLE</h2>
      </div>

      <div className="overflow-hidden 2xl:py-0 py-3 steps-text-split-2">
        <h1>STEPS</h1>
      </div>
    </div>
  );
};

export default StepsTitle;
