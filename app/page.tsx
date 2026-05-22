import Containers from "@/components/global/Container";
import HomeCarousel from "@/components/home/Carousel";
import Hero from "@/components/home/Hero";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Containers className="px-2">
        <Hero />
        <div className="flex justify-center items-center gap-5 mt-10">
          <Link href="#">
            <Button className="font-cocogoose font-extrabold hover:cursor-pointer transition duration-500 bg-white text-black rounded-none border-3 border-black hover:text-white hover:bg-black text-sm sm:text-base py-4 w-40 sm:w-50">
              SPOTIFY
            </Button>
          </Link>
          <Link href="#">
            <Button className="font-cocogoose font-extrabold hover:cursor-pointer transition duration-500 bg-white text-black rounded-none border-3 border-black hover:text-white hover:bg-black text-sm sm:text-base py-4 w-40 sm:w-50">
              APPLE MUSIC
            </Button>
          </Link>
        </div>
        <HomeCarousel />
      </Containers>
    </div>
  );
}
