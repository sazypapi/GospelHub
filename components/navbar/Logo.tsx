"use client";
import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <>
      <Link href="/">
        <Image
          src="/img/gospelHub.png"
          priority
          alt="Logo"
          width={50}
          height={50}
        />
      </Link>
    </>
  );
}

export default Logo;
