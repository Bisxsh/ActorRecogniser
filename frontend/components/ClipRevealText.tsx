"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";

type Props = {
  text: string;
  className?: string;
  rotate?: boolean;
  bgColor?: string;
  id: string;
};

const ClipRevealText = (props: Props) => {
  useGSAP(() => {
    const revealTl = gsap.timeline({
      scrollTrigger: {
        trigger: `#${props.id}`,
        start: "top center",
        end: "bottom center",
        toggleActions: "play none none reverse",
      },
    });
    revealTl.to(`#${props.id}`, {
      duration: 1,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: "circ.out",
    });
  });
  return (
    <div
      className={`px-8 ${props.className} ${props.bgColor || "bg-primary"} ${
        props.rotate ? "rotate-3" : ""
      }`}
      style={{ clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)" }}
      id={props.id}
    >
      {props.text}
    </div>
  );
};

export default ClipRevealText;
