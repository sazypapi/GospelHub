"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/spotify", label: "Spotify" },
  { href: "/applemusic", label: "Apple Music" },
  { href: "/newgospelfriday", label: "New Music Friday" },
];

function Links() {
  const pathname = usePathname();

  return (
    <div className="grid grid-cols-3 gap-5">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`font-azonix text-sm relative after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-black after:transition-all after:duration-300 w-fit
            ${pathname === href ? "after:w-full" : "after:w-0 hover:after:w-full"}`}>
          {label}
        </Link>
      ))}
    </div>
  );
}

export default Links;
