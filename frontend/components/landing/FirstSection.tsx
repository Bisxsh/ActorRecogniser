import React, { lazy, Suspense } from "react";
import { colours } from "@/constants";

const FirstSectionAnimations = lazy(() => import("./FirstSectionAnimations"));

const FirstSection = () => {
  return (
    <div className="h-dvh flex-center flex-col bg-bg">
      <Suspense fallback={<FirstSectionFallback />}>
        <FirstSectionAnimations />
      </Suspense>
    </div>
  );
};

const FirstSectionFallback = () => (
  <div className="text-center">
    <h1 className="text-h1 height-one" id="f-header">
      YOU KNOW THE FACE. <br />
      <span style={{ lineHeight: 1.5 }} className="relative">
        <span className="hidden">DISCOVER</span>
        <span className="absolute-center md:translate-y-8">DISCOVER</span>
      </span>
      <br />
      THE NAME.
    </h1>
    <p className="text-p text-alt-text mt-8 md:mt-16" id="f-para">
      Instantly identify any actor by their face.
      <br />
      Take a picture. Get the details.
      <br />
      All the information you need.
      <br />
    </p>
    <span
      className="text-p text-gradient-animate paragraph-line font-black"
      id="f-tagline"
    >
      Delivered instantly.
    </span>
  </div>
);

export default FirstSection;
