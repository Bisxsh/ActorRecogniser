"use client";
import { useGSAP } from "@gsap/react";
import ClipRevealText from "../ClipRevealText";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import { colours } from "@/constants";

const FirstSection = () => {
  useGSAP(() => {
    const wordsSplit = SplitText.create("#f-header", {
      type: "words",
    });

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#f-header",
        start: "top center",
        end: "bottom 70%",
        scrub: true,
      },
    });

    scrollTl.to(wordsSplit.words, {
      color: colours.altText,
      stagger: 1,
      ease: "power1.in",
    });

    const paraSplit = SplitText.create("#f-para", {
      type: "words, lines",
      linesClass: "paragraph-line",
    });

    const paraTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#f-para",
        start: "top 80%",
      },
    });

    paraTl
      .from(paraSplit.words, {
        opacity: 0,
        yPercent: 300,
        rotate: 3,
        ease: "power1.inOut",
        duration: 1,
        stagger: 0.01,
      })
      .from("#f-tagline", {
        opacity: 0,
        yPercent: 300,
        rotate: 3,
        ease: "power1.inOut",
        duration: 1,
      });
  });
  return (
    <div className="h-dvh flex-center flex-col bg-bg">
      <div className="text-center">
        <h1 className="text-h1 height-one" id="f-header">
          YOU KNOW THE FACE. <br />
          <span style={{ lineHeight: 1.5 }} className="relative">
            <span className="hidden">DISCOVER</span>
            <ClipRevealText
              className="absolute-center md:translate-y-8"
              rotate
              text="DISCOVER"
              id="f-clip-text"
            />
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
    </div>
  );
};

export default FirstSection;
