"use client";
import { useGSAP } from "@gsap/react";
import Card from "../Card";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import { colours } from "@/constants";

const StatsSection = () => {
  useGSAP(() => {
    const titleSplit = SplitText.create("#s-heading", {
      type: "lines, words",
    });

    const titleTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#s-heading",
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
    });

    titleTl.to(titleSplit.words, {
      color: colours.altText,
      stagger: 0.5,
    });

    gsap.from("#s-card-container .card", {
      scrollTrigger: {
        trigger: "#s-card-container",
        start: "top 80%",
        end: "bottom center",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      yPercent: 100,
      stagger: 0.3,
    });
  });

  return (
    <div className="w-full flex-center flex-col text-text bg-bg min-h-screen h-fit pb-20">
      <h1 className="text-h3 text-center pb-10" id="s-heading">
        POWERED BY THE LARGEST COMMUNITY DATABASE
      </h1>
      <div className="w-full flex-center p-4 max-w-[80vw] self-center">
        <div
          id="s-card-container"
          className="flex-1 w-fit grid grid-cols-1 gap-4 max-w-[70vw] md:grid-cols-3 md:max-w-[60vw] lg:mt-10 max-w-50vw justify-items-center justify-center"
        >
          <Card title="👨‍🎤" description="4,000,000+" byline="ACTORS" />
          <Card title="📺" description="200,000+" byline="SHOWS" />
          <Card title="🎬" description="1,000,000+" byline="MOVIES" />
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
