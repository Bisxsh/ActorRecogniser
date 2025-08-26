import type { Metadata } from "next";
import { Antonio } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const proximaNova = localFont({
  src: [
    {
      path: "../public/fonts/proximanova_regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/proximanova_bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/proximanova_extrabold.otf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-proxima-nova",
});

const antonio = Antonio({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-antonio",
});

export const metadata: Metadata = {
  title: "Actor Identifier | Instantly Identify Film & TV Cast",
  description:
    "Instantly identify actors from any movie or TV show. Simply upload a picture and discover their name and full filmography. Your essential guide to the cast and crew.",
  openGraph: {
    title: "Actor Identifier",
    description:
      "Instantly identify actors from film and TV with just a photo.",
    url: "https://actor-recogniser.vercel.app/",
    siteName: "Actor Identifier",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${antonio.variable} ${proximaNova.variable} antialiased`}
      >
        <div className="h-dvh w-dvw overflow-x-hidden">{children}</div>
      </body>
    </html>
  );
}
