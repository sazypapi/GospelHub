"use client";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { RiMenu5Fill } from "react-icons/ri";
import Link from "next/link";

function Menu() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/spotify", label: "Spotify" },
    { href: "/applemusic", label: "Apple Music" },
    { href: "/newgospelfriday", label: "New Music Friday" },
  ];
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="flex align-middle items-center border-none focus:outline-none">
          <RiMenu5Fill className="w-8 h-8 text-black" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="bg-black/30 pt-10 backdrop-blur-md backdrop-saturate-150 border-none focus:outline-none z-[9999]"
        showCloseButton={false}>
        {/* <SheetTitle className="text-white px-2 mb-6">Menu</SheetTitle> */}
        <div className="flex flex-col gap-4 px-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="capitalize text-white text-lg hover:text-neutral-300 active:text-neutral-400 active:scale-95 transition duration-150">
              {link.label}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default Menu;
