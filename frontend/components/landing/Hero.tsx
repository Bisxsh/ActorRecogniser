"use client";
import Button from "@/components/Button";
import { colours } from "@/constants";
import { useGSAP } from "@gsap/react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import MediaQuery, { useMediaQuery } from "react-responsive";

export default function Hero() {
  const isSmall = useMediaQuery({ maxWidth: 1024 });

  useGSAP(() => {
    const introTl = gsap.timeline();
    const introSplitText = SplitText.create("#intro-title", {
      type: `${isSmall ? "chars,words" : "chars"}`,
    });
    introTl
      .from(introSplitText.chars, {
        yPercent: 20,
        opacity: 0,
        duration: 1,
        ease: "power1.inOut",
        stagger: 0.01,
        color: colours.primary,
      })
      .to("#intro-vertical-clip", {
        clipPath: "polygon(0% 45%, 100% 45%, 100% 50%, 0% 50%)",
        delay: 0.25,
        duration: 1,
        ease: "power1.in",
      })
      .to(
        "#intro-horizontal-clip",
        {
          clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)",
          delay: 0.5,
          duration: 0.5,
          ease: "power1.in",
        },
        "<"
      )
      .to("#intro-circle-clip", {
        delay: 0.25,
        duration: 0.35,
        clipPath: "circle(100% at 50% 50%)",
        filter: "blur(100px)",
        ease: "power4.in",
      })
      .to("#intro-circle-clip", {
        opacity: 0,
        duration: 0.25,
        ease: "power4.in",
        display: "none",
      })
      .from(
        "#hero-main-container",
        {
          opacity: 0,
          duration: 0.25,
          ease: "power1.inOut",
        },
        "<"
      )
      .to("#intro-container", { display: "none", duration: 0.25 }, "<");
  });
  return (
    <>
      <div
        className="h-full w-full flex-center relative absolute-center z-1"
        id="intro-container"
      >
        <div
          style={{
            clipPath: "circle(0.0% at 50% 50%)",
          }}
          className="w-full h-full absolute-center bg-alt-text"
          id="intro-circle-clip"
        />
        <div
          className=""
          style={{
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          }}
          id="intro-vertical-clip"
        >
          <div
            style={{
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            }}
            id="intro-horizontal-clip"
          >
            <h1
              className="text-h1 text-alt-text text-center break-words"
              id="intro-title"
            >
              ACTOR RECOGNISER
            </h1>
          </div>
        </div>
      </div>
      <div className="relative w-full h-full" id="hero-main-container">
        <div className="absolute inset-0 noise z-1 pointer-events-none" />
        <video
          src={"/videos/hero.mp4"}
          autoPlay
          loop
          muted
          className="absolute-center object-cover w-full h-full blur-xs"
        />
        <div className="gap-8 flex flex-col relative h-dvh pt-20 md:pt-0">
          <h1 className="text-h1 text-center">WHO&apos;S THAT ACTOR</h1>
          <h2 className="text-h2 text-center text-text">
            Find any actor in any <br />
            movie or show. <br />
            <MediaQuery maxWidth={768}>
              <br />
            </MediaQuery>
            Instantly. <br />
            <MediaQuery maxWidth={768}>
              <br />
            </MediaQuery>
            Just take a picture.
          </h2>
          <div className="flex-1 items-center flex justify-center mb-10">
            <Button text="Get Started" onClick={() => {}} />
          </div>

          <p className="text-alt-text absolute bottom-0 left-0 m-8">
            Actor Recogniser <br className="md:hidden" />© 2025
          </p>
          <DotLottieReact
            className="xl:scale-100 lg:scale-80 md:scale-70 scale-60 absolute bottom-0 md:bottom-10 -right-30 md:-right-20"
            src={process.env.LOTTIE_SCROLL_URL}
            loop
            autoplay
          />
        </div>
      </div>
    </>
  );
}
