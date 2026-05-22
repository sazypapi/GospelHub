import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/global/Footer";
import Providers from "./Providers";
import { Toaster } from "@/components/ui/sonner";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const azonix = localFont({
  src: "../public/fonts/Azonix.otf",
  variable: "--font-azonix",
});

export const metadata: Metadata = {
  title: "Gospel Hub",
  description:
    "Your one-stop destination for gospel playlists across your favorite genres",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        azonix.variable,
        "font-sans",
        geist.variable,
      )}>
      <body className="min-h-full flex flex-col">
        <Providers>
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
