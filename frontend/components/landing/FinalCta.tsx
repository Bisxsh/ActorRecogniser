"use client";
import { colours } from "@/constants";
import { useGSAP } from "@gsap/react";
import ClipRevealText from "../ClipRevealText";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import Button from "../Button";
import { useRouter } from "next/navigation";

const FinalCta = () => {
  const router = useRouter();
  useGSAP(() => {
    const wordsSplit = SplitText.create("#footer-header", {
      type: "words",
    });

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#footer-header",
        start: "top center",
        end: "bottom 70%",
        scrub: true,
      },
    });

    scrollTl.to(wordsSplit.words, {
      color: colours.primary,
      stagger: 1,
      ease: "power1.in",
    });
  });
  return (
    <div className="h-dvh flex-center flex-col">
      <div className="text-center">
        <h1 className="text-h1 height-one" id="footer-header">
          WHO WILL YOU <br />
          <span style={{ lineHeight: 1.5 }} className="relative">
            <span className="hidden">DISCOVER</span>
            <ClipRevealText
              className="absolute-center md:translate-y-8"
              rotate
              text="DISCOVER"
              id="footer-clip-text"
              bgColor="bg-bg"
            />
          </span>
          <br />
          NEXT?
        </h1>
        <div className="h-8 lg:h-16" />
        <Button
          text={"Start Your Search"}
          onClick={() => router.push("/app")}
          primary
          className="font-black"
        />
      </div>
    </div>
  );
};

export default FinalCta;
