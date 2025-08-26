import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";

type VideoCardProps = {
  title: string;
  video: string;
  desc: string;
  image: string;
  imageClassName: string;
};

const VideoCard = ({
  title,
  video,
  desc,
  image,
  imageClassName,
}: VideoCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    const container = containerRef.current;
    const parallaxElement = imgRef.current;
    if (!container || !parallaxElement) {
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      const containerRect = container.getBoundingClientRect();
      const offsetX =
        event.clientX - containerRect.left - containerRect.width / 2;
      const offsetY =
        event.clientY - containerRect.top - containerRect.height / 2;

      gsap.to(parallaxElement, {
        x: offsetX * 0.1,
        y: offsetY * 0.1,
        ease: "power1.out",
        duration: 0.8,
      });
    };
    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="flex-center flex-col relative" ref={containerRef}>
      <video src={video} autoPlay loop muted className="rounded-md" />
      <h1 className="text-h4">{title}</h1>
      <br />
      <p className="text-p text-center">{desc}</p>
      <Image
        src={image}
        alt=""
        className={`step-img rounded-md absolute ${imageClassName}`}
        width={isMobile ? 100 : 200}
        height={isMobile ? 100 : 200}
        ref={imgRef}
      />
    </div>
  );
};

export default VideoCard;
