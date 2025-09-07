"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { lazy, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
// import VideoCard from "./StepsVideoCard";
import { stepVideos } from "@/constants";
import { useWindowDimensions } from "@/hooks/UseWindowDimensions";

const VideoCard = lazy(() => import("./StepsVideoCard"));

const StepsSlider = () => {
  const isTablet = useMediaQuery({ maxWidth: 1024 });
  const sliderRef = useRef<HTMLDivElement>(null);
  const windowDims = useWindowDimensions();
  const [scrollAmount, setScrollAmount] = useState(
    (sliderRef.current?.scrollWidth || 0) - (windowDims.width || 0)
  );

  useEffect(() => {
    setScrollAmount(
      (sliderRef.current?.scrollWidth || 0) - (windowDims.width || 0)
    );
  }, [sliderRef.current?.scrollWidth, windowDims.width]);

  useGSAP(() => {
    if (isTablet) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".steps-section",
        start: "2% top",
        end: `+=${scrollAmount + 800}px`,
        scrub: true,
        pin: true,
      },
    });

    tl.to(".steps-section", {
      x: `-${scrollAmount + 800}px`,
      ease: "power1.inOut",
    });
  }, [scrollAmount]);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".steps-section",
        start: "top top",
        end: "bottom 80%",
        scrub: true,
      },
    });

    tl.to(".steps-text-split-1", {
      xPercent: -30,
      ease: "power1.inOut",
    })
      .to(
        ".steps-text-scroll",
        {
          xPercent: -22,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        ".steps-text-split-2",
        {
          xPercent: -10,
          ease: "power1.inOut",
        },
        "<"
      );
  });

  return (
    <div
      className="slider-wrapper lg:h-dvh min-h-dvh md:min-h-fit w-full mt-0 md:mt-20 xl:mt-0"
      ref={sliderRef}
    >
      <div className="h-full w-full flex md:flex-row flex-col items-center 2xl:gap-72 lg:gap-52 md:gap-24 gap-7 flex-nowrap">
        {stepVideos.map((video) => (
          <div
            key={video.title}
            className={`relative z-30 lg:w-[50vw] w-96 lg:h-[70vh] md:w-[90vw] h-80 flex-none`}
          >
            <VideoCard
              title={video.title}
              video={video.video}
              desc={video.desc}
              image={video.image}
              imageClassName={video.imgClass}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepsSlider;
