"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type Props = {
  title: string;
  description: string;
  byline: string;
};

export default function Card(props: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    const spotlight = spotlightRef.current;

    if (!container || !spotlight) {
      return;
    }

    gsap.set(spotlight, { opacity: 0 });

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top } = container.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;

      gsap.to(spotlight, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
        background: `radial-gradient(650px circle at ${x}px ${y}px, rgba(14, 165, 233, 0.15), transparent 80%)`,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(spotlight, { opacity: 0, duration: 0.3, ease: "power2.in" });
    };

    gsap.context(() => {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }, container);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="card w-full group relative rounded-xl border border-secondary/10 bg-gray-900 px-8 py-16 shadow-2xl"
    >
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute -inset-px rounded-xl"
      />
      <div className="flex-center flex-col gap-4">
        <h3 className="text-p font-semibold leading-7 text-primary">
          {props.title}
        </h3>
        <div className="flex items-center gap-x-2">
          <span className="text-p font-bold tracking-tight text-primary">
            {props.description}
          </span>
        </div>
        <p className="text-p leading-7 text-primary">{props.byline}</p>
      </div>
    </div>
  );
}
