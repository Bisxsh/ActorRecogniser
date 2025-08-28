"use client";

import { CropIcon } from "lucide-react";
import { Slot } from "radix-ui";
import { type ComponentProps, type MouseEvent } from "react";
import { Button } from "../../button";
import { useImageCrop } from ".";

export type ImageCropApplyProps = ComponentProps<"button"> & {
  asChild?: boolean;
};

export const ImageCropApply = ({
  asChild = false,
  children,
  onClick,
  ...props
}: ImageCropApplyProps) => {
  const { applyCrop } = useImageCrop();

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    await applyCrop();
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
      {children ?? <CropIcon className="size-4" />}
    </Button>
  );
};
