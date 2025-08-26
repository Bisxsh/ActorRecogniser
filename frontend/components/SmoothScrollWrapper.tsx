// components/scroll-smoother-wrapper.tsx
"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger, SplitText);

export const SmoothScrollWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const wrapperRef = useRef(null);

  useLayoutEffect(() => {
    const smoother = ScrollSmoother.create({
      smooth: 2,
      effects: true,
    });

    return () => {
      smoother.kill();
    };
  }, []);

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content">{children}</div>
    </div>
  );
};
