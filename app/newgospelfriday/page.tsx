import Containers from "@/components/global/Container";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { getNewGospelFridayPlaylist } from "@/utils/actions";
import Image from "next/image";
import Link from "next/link";
import { RxValueNone } from "react-icons/rx";
async function NewGospelFriday() {
  const newGospelFriday = await getNewGospelFridayPlaylist();
  if (!newGospelFriday) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <RxValueNone />
          </EmptyMedia>
          <EmptyTitle className="font-azonix">
            New Gospel Friday Not Available
          </EmptyTitle>
          <EmptyDescription>
            We&apos;re updating the playlist. Check back soon!
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }
  return (
    <div>
      <Containers className="px-5">
        <h1 className="font-azonix text-black text-lg lg:text-3xl font-bold text-center my-5">
          New Gospel Friday
        </h1>
        <div
          className="bg-cover bg-no-repeat bg-center rounded-xl shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px] p-4 flex flex-col items-center justify-center"
          style={{
            backgroundImage: `url(${newGospelFriday.backgroundImage})`,
          }}>
          <div className="flex flex-col lg:flex-row gap-5 lg:gap-0 justify-around items-center w-full">
            <section className="lg:w-[40%] w-full flex justify-center">
              <Image
                src={newGospelFriday.image}
                alt="New Gospel Friday"
                width={400}
                height={400}
                className="w-full"
              />
            </section>

            <section className="lg:w-[50%] w-full flex flex-col justify-center align-middle p-4 bg-black/40 lg:bg-transparent lg:backdrop-blur-none backdrop-blur-md lg:border-none border border-white/10 lg:shadow-none shadow-lg rounded-xl">
              <h2 className="font-montserrat font-black text-white text-2xl italic mb-[2vh] lg:text-left text-center">
                FRESH BEATS, DIVINE MELODIES, ENDLESS INSPIRATION!
              </h2>
              <h3 className="font-azonix text-white font-extrabold mb-[4vh] lg:text-left text-center">
                Get uplifted every Friday with the New Gospel Friday playlist
              </h3>
              <div className="flex flex-col">
                <a href={newGospelFriday.spotifyLink}>
                  <button className="text-lg font-black text-white italic font-montserrat lg:w-[20vw] w-full py-2 bg-[#1db954] border-none mb-[1vh]">
                    SPOTIFY
                  </button>
                </a>
                <a href={newGospelFriday.appleMusicLink}>
                  <button className="text-lg font-black text-white italic font-montserrat lg:w-[20vw] w-full py-2 bg-[#fc3c44] border-none mt-[1vh]">
                    APPLE MUSIC
                  </button>
                </a>
              </div>
            </section>
          </div>

          <section className="font-azonix text-white w-[90%] text-center mt-[4vh]">
            <p className="text-[0.9em]">{newGospelFriday.text}</p>
          </section>
        </div>
      </Containers>
    </div>
  );
}

export default NewGospelFriday;
