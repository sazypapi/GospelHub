import React from "react";
import Containers from "../global/Container";
import Logo from "./Logo";
import Links from "./Links";
import Menu from "./Menu";

function Navbar() {
  return (
    <nav>
      <Containers className="border-b-2 border-neutral-200 hidden sm:flex justify-between align-middle h-15 items-center">
        <Logo />
        <Links />
      </Containers>
      <Containers className="border-b-2 border-neutral-200 sm:hidden flex justify-between px-2 align-middle h-14 items-center">
        <Logo />
        <Menu />
      </Containers>
    </nav>
  );
}

export default Navbar;
