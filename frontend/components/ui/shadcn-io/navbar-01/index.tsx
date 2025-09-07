"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

export interface NavbarNavLink {
  href: string;
  label: string;
  active?: boolean;
}

export const Navbar = () => {
  const router = useRouter();
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-bg backdrop-blur supports-[backdrop-filter]:bg-bg/90 px-4 md:px-6 [&_*]:no-underline"
      )}
    >
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-6">
            <button
              onClick={(e) => e.preventDefault()}
              className="flex items-center space-x-2 text-primary hover:text-secondary transition-colors cursor-pointer"
            >
              <div className="text-2xl" onClick={() => router.push("/")}>
                <Image
                  src="/images/logo.svg"
                  alt="Logo"
                  width={32}
                  height={32}
                />
              </div>
              <span className="font-bold text-xl">Actor Recogniser</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
