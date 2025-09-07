"use client";

import Image from "next/image";

export enum ButtonType {
  GITHUB,
  FIGMA,
  DRIBBLE,
  DISCORD,
  LINKED_IN,
  EMAIL,
}

type ProjectLinkProps = {
  buttonType: ButtonType;
  link: string;
  className?: string;
};

const ProjectLink = (props: ProjectLinkProps) => {
  //   const { setMouseHovering } = useContext(MouseContext);

  function openLink() {
    if (props.link) {
      window.open(props.link, "_blank")?.focus();
    }
  }

  let imageSrc = "";
  let alt = "";

  switch (props.buttonType) {
    case ButtonType.GITHUB:
      imageSrc = "/images/github.svg";
      alt = "GitHub";
      break;
    case ButtonType.DRIBBLE:
      imageSrc = "/images/dribbble.svg";
      alt = "Dribbble";
      break;
    case ButtonType.LINKED_IN:
      imageSrc = "/images/linkedin.svg";
      alt = "LinkedIn";
      break;
    case ButtonType.EMAIL:
      imageSrc = "/images/email.svg";
      alt = "Email";
      break;
  }

  return (
    <div
      onClick={openLink}
      //   onMouseEnter={() => mouseEntered(setMouseHovering)}
      //   onMouseLeave={() => mouseLeft(setMouseHovering)}
      className="inline-block cursor-pointer mx-1" // Wrapper for margin and cursor
    >
      <div
        className={`bg-white p-2 aspect-square rounded-full flex items-center justify-center ${
          props.className || ""
        }`}
      >
        <div className="w-6 max-w-[4vw] aspect-square flex-center">
          <Image src={imageSrc} alt={alt} width={24} height={24} />
        </div>
      </div>
    </div>
  );
};

// Main Footer Component
const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center text-center mb-[3vw] py-4">
      <Image
        className="aspect-square w-16 cursor-pointer"
        src="/images/logo.png"
        alt="logo"
        width={64}
        height={64}
        onClick={() => window.open("https://bisesh.dev", "_blank")?.focus()}
      />

      <div className="flex items-center justify-center my-5">
        <ProjectLink
          className="bg-white external-link"
          buttonType={ButtonType.GITHUB}
          link={"https://github.com/Bisxsh"}
        />
        <ProjectLink
          className="bg-white external-link"
          buttonType={ButtonType.DRIBBLE}
          link={"https://dribbble.com/bisxsh"}
        />
        <ProjectLink
          className="bg-white external-link"
          buttonType={ButtonType.LINKED_IN}
          link={"https://www.linkedin.com/in/bisesh-sitaula/"}
        />
        <ProjectLink
          className="bg-white external-link"
          buttonType={ButtonType.EMAIL}
          link={"mailto:bisesh.sitaula@gmail.com"}
        />
      </div>

      <p>Designed and built by Bisesh Sitaula © {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
