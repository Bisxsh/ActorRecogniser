import React from "react";

type Props = {
  text: string;
  onClick: () => void;
  primary?: boolean;
  className?: string;
};

const Button = (props: Props) => {
  return (
    <button
      onClick={props.onClick}
      className={`${
        props.primary ? "bg-primary" : "bg-secondary"
      } px-4 py-3 rounded text-text text-cta cursor-pointer ${props.className}`}
    >
      {props.text}
    </button>
  );
};

export default Button;
