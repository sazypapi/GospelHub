"use client";
import { SiApplemusic } from "react-icons/si";
import Link from "next/link";
import { FaSpotify } from "react-icons/fa";
import { IoHomeSharp } from "react-icons/io5";
import { MdFiberNew } from "react-icons/md";

function BottomNav() {
  return (
    <div className="flex justify-center w-full items-center z-999 pointer-events-auto">
      <div className="fixed bottom-1 w-[90%] sm:w-[50%] px-5 py-4 h-15 flex justify-between items-center bg-black/50 backdrop-blur-md backdrop-saturate-150 shadow-lg text-white rounded-4xl">
        <Link href="/">
          <IoHomeSharp className="w-9 h-9 text-white" />
        </Link>
        <Link href="/spotify">
          <FaSpotify className="h-9 w-9 text-white" />
        </Link>

        <Link href="/applemusic">
          <SiApplemusic className="h-9 w-9 text-white" />
        </Link>

        <Link href="/newgospelfriday">
          <MdFiberNew className="h-9 w-9 text-white" />
        </Link>
      </div>
    </div>
  );
}

export default BottomNav;
