"use client";

import ActorDisplay from "@/components/app/ActorDisplay";
import AppCard from "@/components/app/AppCard";
import ImageUploader from "@/components/app/ImageUploader";
import Footer from "@/components/Footer";
import { CloudIcon, CropIcon, ScrollIcon } from "lucide-react";

const Page = () => {
  // const handleFinalCta = () => {
  //   // Scroll to top
  //   if (typeof window === "undefined") return;
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  //   document.getElementById("image-upload")?.click();
  // };

  return (
    <div className="bg-bg p-8 lg:p-16 min-h-screen">
      <div className="bg-alt-text rounded-md gap-8 p-8 lg:gap-16 lg:p-16 flex-center flex-col">
        <div className="text-center gap-2 lg:gap-4 flex flex-col items-center">
          <h1 className="text-h3">Upload an Image</h1>
          <p className="text-p">Take, upload or paste a picture</p>
          <p className="text-sm opacity-80">Supported formats: JPG, PNG</p>
        </div>
        <ImageUploader />
        <ActorDisplay />
      </div>

      <div className="flex-center flex-col gap-8 mt-8 lg:gap-16 lg:mt-16">
        <h1 className="text-h3 text-center text-alt-text">HOW IT WORKS</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 lg:mt-16 lg:gap-16">
          <AppCard
            icon={<CloudIcon />}
            title={"Upload an image"}
            description={
              "Click the upload section to take a picture or select one from your gallery."
            }
          />
          <AppCard
            icon={<CropIcon />}
            title={"Crop the image"}
            description={
              "Crop the image to select only the faces you want to search!"
            }
          />
          <AppCard
            icon={<ScrollIcon />}
            title={"Discover their story"}
            description={
              "Click on an actor to get a list of all TV shows and movies they have acted in before!"
            }
            className="md:col-span-2 md:w-1/2 md:justify-self-center xl:col-span-1 xl:w-full"
          />
        </div>

        {/* <h1 className="text-h3 text-center text-alt-text">TRY IT OUT NOW!</h1>

        <Button className="p-8" onClick={handleFinalCta}>
          <CloudUpload className="mr-2" width={100} />
          Upload your Image
        </Button> */}
        <Footer />
      </div>
    </div>
  );
};

export default Page;
