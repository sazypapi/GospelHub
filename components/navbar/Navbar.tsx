import React from "react";
import Containers from "../global/Container";
import Logo from "./Logo";
import Links from "./Links";

function Navbar() {
  return (
    <nav>
      <Containers className="border-b-2 border-neutral-200 hidden sm:flex justify-between align-middle h-15 items-center">
        <Logo />
        <Links />
      </Containers>
      <Containers className="border-b-2 border-neutral-200 sm:hidden flex justify-center align-middle h-14 items-center">
        <Logo />
      </Containers>
    </nav>
  );
}

export default Navbar;
