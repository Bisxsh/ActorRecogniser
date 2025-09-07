"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CropIcon, RotateCcwIcon, UploadCloudIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { type ChangeEvent, useCallback, useRef, useState } from "react";
import { ImageCrop } from "../ui/shadcn-io/image-crop";
import { ImageCropApply } from "../ui/shadcn-io/image-crop/image-crop-apply";
import { ImageCropContent } from "../ui/shadcn-io/image-crop/image-crop-content";
import { ImageCropReset } from "../ui/shadcn-io/image-crop/image-crop-reset";
import { Image as ImageIcon } from "@mynaui/icons-react";
import { useMediaQuery } from "react-responsive";
import { cn } from "@/lib/utils";
import { useRecogniserStore } from "@/lib/stores";
import { useMutation } from "@tanstack/react-query";
import { apiIdentifiedActorsType } from "@/lib/schemas";

const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const isTouch = useMediaQuery({ query: "(hover: none)" });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    isUploading,
    setIsUploading,
    setIdentifiedActors,
    setSelectedActorId,
  } = useRecogniserStore();

  const identifyMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch("/api/identify", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Something went wrong");
      }

      return res.json();
    },
    onSuccess: (data) => {
      const formattedMatches = data.matches.map(
        (match: apiIdentifiedActorsType) => ({
          ...match,
          matchConfidence: match.match_confidence,
          imageUrl: match.image_url,
        })
      );
      setIdentifiedActors(formattedMatches);
      setIsUploading(false);
    },
    onError: (error) => {
      console.error("Upload failed:", error);
      setIsUploading(false);
      setIdentifiedActors(null);
    },
  });

  const handleUpload = async () => {
    if (croppedImage) {
      setIsUploading(true);
      const res = await fetch(croppedImage);
      const blob = await res.blob();
      const file = new File([blob], "cropped_image.png", { type: "image/png" });
      const formData = new FormData();
      formData.append("image", file);

      identifyMutation.mutate(formData);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setCroppedImage(null);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const event = {
        target: {
          files: [file],
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      handleFileChange(event);
    }
  }, []);

  const handleReset = () => {
    setIdentifiedActors(null);
    setSelectedActorId(null);
    setSelectedFile(null);
    setCroppedImage(null);
    setIsUploading(false);
  };

  if (!selectedFile) {
    return (
      <div className="gap-8 lg:gap-16 w-full">
        <div className="items-start space-y-2">
          <Input
            accept="image/*"
            type="file"
            id="image-upload"
            onChange={handleFileChange}
            className="hidden"
            ref={fileInputRef}
          />
          <div
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              "h-64 cursor-pointer gap-4 rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 transition-colors hover:bg-muted",
              isDragging && "border-primary/50 bg-primary/5"
            )}
          >
            <label
              htmlFor="image-upload"
              className="flex-center flex-col h-full"
            >
              <div className="rounded-full bg-background p-3 shadow-sm">
                <ImageIcon className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold font-proxima">
                  {isTouch ? "Tap" : "Click"} to upload
                </p>
                <p className="text-xs text-muted-foreground font-proxima">
                  or paste/drag the file here
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>
    );
  }
  if (!croppedImage) {
    return (
      <div className="space-y-4">
        <ImageCrop
          aspect={1}
          file={selectedFile}
          maxImageSize={1024 * 1024 * 3} // 3MB
          onCrop={setCroppedImage}
        >
          <ImageCropContent className="max-w-md" />
          <div className="grid grid-cols-11 gap-2">
            <Button
              onClick={handleReset}
              size="icon"
              type="button"
              variant="outline"
              className="w-full col-span-5 sm:col-span-3"
            >
              <XIcon className="size-4" />
              <p className="text-xs">Cancel</p>
            </Button>
            <ImageCropReset className="col-span-6 sm:col-span-4 w-full">
              <RotateCcwIcon />
              <p className="text-xs">Reset</p>
            </ImageCropReset>
            <ImageCropApply className="col-span-11 sm:col-span-4 w-full">
              <Button
                onClick={handleUpload}
                size="icon"
                type="button"
                variant="default"
                className="w-full col-span-3"
                disabled={isUploading}
              >
                <CropIcon />
                <p className="text-xs">Crop</p>
              </Button>
            </ImageCropApply>
          </div>
        </ImageCrop>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Image
        alt="Cropped"
        height={350}
        src={croppedImage}
        unoptimized
        width={350}
      />
      <div className="grid grid-cols-5 gap-4">
        <Button
          onClick={handleReset}
          size="icon"
          type="button"
          variant="outline"
          className="w-full col-span-2"
          disabled={isUploading}
        >
          <XIcon className="size-4" />
        </Button>
        <Button
          onClick={handleUpload}
          size="icon"
          type="button"
          variant="default"
          className="w-full col-span-3"
          disabled={isUploading}
        >
          {isUploading ? (
            <p>Uploading...</p>
          ) : (
            <UploadCloudIcon className="size-4" />
          )}
          <p className="text-xs">{isUploading ? "" : "Use image"}</p>
        </Button>
        {identifyMutation.isError && (
          <p className="text-sm text-red-500 col-span-5 text-center">
            Upload failed: {identifyMutation.error.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
