"use client";

import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import type { EmblaCarouselType } from "embla-carousel";
import { Button } from "../ui/button";
import Link from "next/link";

function HomeCarousel() {
  const [api, setApi] = useState<EmblaCarouselType | undefined>(undefined);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!api) return;

    const onInit = () => {
      setScrollSnaps(api.scrollSnapList());
      setSelectedIndex(api.selectedScrollSnap());
    };

    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());

    api.on("init", onInit);
    api.on("select", onSelect);

    onInit();

    return () => {
      api.off("init", onInit);
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="relative w-full mb-20">
      <Carousel
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
        setApi={setApi}
        className="w-full mt-[10vh]"
      >
        <CarouselContent>
       <CarouselItem className="basis-full">
            <div className="bg-gradient-to-r from-neutral-700 via-neutral-500 to-neutral-700 w-full rounded-2xl shadow-2xl h-40 px-5 align-middle justify-center flex flex-col items-center gap-2 ">
              <h3 className="font-cocogoose font-black text-white text-xs text-center sm:text-base">
                IGNITE YOUR FAITH! <br />
                FOLLOW WORSHIPPERS&apos; HAVEN ON INSTAGRAM FOR INSPIRING
                CHRISTIAN CONTENT DAILY. <br />
              </h3>
              <a href="https://www.instagram.com/worshippers_haven?igsh=MTF1cnBiZThncDF6ag==">
                 <Button className="font-cocogoose font-extrabold hover:cursor-pointer transition duration-500 bg-transparent text-white rounded-none border-3 border-white hover:text-black hover:bg-white text-xs sm:text-base py-4 px-2 mt-2">FOLLOW OUR INSTAGRAM</Button>
              </a>
            </div>
          </CarouselItem>
         <CarouselItem className="basis-full">
            <div className="bg-gradient-to-r from-neutral-800 via-neutral-500 to-neutral-400 w-full rounded-2xl shadow-2xl h-40 px-5 align-middle justify-center flex flex-col items-center gap-2 ">
              <h3 className="font-azonix font-black text-white text-xs text-center sm:text-base">
               Get uplifted every Friday with the New Gospel Friday playlist

              </h3>
              <Link href="#">
                 <Button className="font-azonix font-extrabold hover:cursor-pointer transition duration-500 bg-transparent text-white rounded-none border-3 border-white hover:text-black hover:bg-white text-xs sm:text-base py-4 px-2 mt-2">New Gospel Friday</Button>
              </Link>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>

      {/* Dot Navigation */}
      <div className="absolute  bottom-[-5vh] left-1/2 -translate-x-1/2 flex gap-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === selectedIndex
                ? "bg-black scale-110"
                : "bg-black/40 hover:bg-black/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default HomeCarousel;