"use client";

import Button from "@/components/Button";
import { useRouter } from "next/navigation";

const Loading = () => {
  const router = useRouter();
  return (
    <div className="flex-center flex-col h-screen w-screen">
      <h1 className="text-h1">Loading...</h1>
      <br />
      <br />
      <p className="text-p">Want to go directly to the app?</p>
      <br />
      <div className="items-center flex justify-center mb-10">
        <Button
          text="Launch App"
          onClick={() => {
            router.push("/app");
          }}
          className="bg-text"
          primary
        />
      </div>
      <p className="text-[1px] text-secondary">
        This is additional text to make the loading page hit the minimum
        threshold for Safari. If you found this well done :D
      </p>
    </div>
  );
};

export default Loading;
