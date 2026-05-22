/* eslint-disable @next/next/no-img-element */
import Containers from "@/components/global/Container";
import { Button } from "@/components/ui/button";
import { getSpotifyPlaylist } from "@/utils/actions";
import Link from "next/link";
import React from "react";

async function SpotifyPage() {
  const spotifyPlaylist = await getSpotifyPlaylist();
  return (
    <div className="py-10">
      <Containers className="px-2 grid grid-cols-1 gap-5">
        {spotifyPlaylist.map((playlist) => (
          <div
            key={playlist.id}
            className="border-2 border-neutral-200 px-4 py-5 flex align-middle items-center flex-col justify-center mb-4">
            <h2 className="text-lg lg:text-base w-fit font-azonix text-neutral-600 border-b-2 border-neutral-600 text-left self-start">
              {playlist.name}
            </h2>
            <div className="mt-4 flex flex-col lg:flex-row gap-3 lg:gap-10 justify-between items-center">
              <div className="basis-full flex justify-center lg:basis-2/5">
                <img
                  src="/img/landing-pagePic.png"
                  alt="Man listening to music"
                  className="w-[90%] lg:w-full self-center"
                />
              </div>
              <div className="basis-full flex flex-col justify-start lg:basis-2/5">
                <p className="lg:text-lg text-base text-black font-azonix mt-2">
                  {playlist.description}
                </p>
                <Link href={playlist.link} target="_blank" className="mt-5">
                  <Button className=" font-cocogoose font-extrabold hover:cursor-pointer transition duration-500 bg-white text-black rounded-none border-3 border-black hover:text-white hover:bg-black text-lg lg:text-base py-4 w-40 lg:w-50">
                    GO TO PLAYLIST
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Containers>
    </div>
  );
}

export default SpotifyPage;
