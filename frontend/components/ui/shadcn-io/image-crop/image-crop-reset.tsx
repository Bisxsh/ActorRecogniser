"use client";

import { RotateCcwIcon } from "lucide-react";
import { Slot } from "radix-ui";
import { type ComponentProps, type MouseEvent } from "react";
import { Button } from "../../button";
import { useImageCrop } from ".";

export type ImageCropResetProps = ComponentProps<"button"> & {
  asChild?: boolean;
};

export const ImageCropReset = ({
  asChild = false,
  children,
  onClick,
  ...props
}: ImageCropResetProps) => {
  const { resetCrop } = useImageCrop();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    resetCrop();
    onClick?.(e);
  };

  if (asChild) {
    return (
      <Slot.Root onClick={handleClick} {...props}>
        {children}
      </Slot.Root>
    );
  }

  return (
    <Button onClick={handleClick} size="icon" variant="outline" {...props}>
      {children ?? <RotateCcwIcon className="size-4" />}
    </Button>
  );
};
