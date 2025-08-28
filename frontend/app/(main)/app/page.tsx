import ImageUploader from "@/components/app/ImageUploader";

const Page = () => {
  return (
    <div className="bg-bg h-screen p-8 lg:p-16">
      <div className="bg-alt-text rounded-md gap-8 p-8 lg:gap-16 lg:p-16 flex-center flex-col">
        <div className="text-center gap-2 lg:gap-4 flex flex-col items-center">
          <h1 className="text-h3">Upload an Image</h1>
          <p className="text-p">Take, upload or paste a picture</p>
          <p className="text-sm opacity-80">Supported formats: JPG, PNG</p>
        </div>
        <ImageUploader />
      </div>
    </div>
  );
};

export default Page;
