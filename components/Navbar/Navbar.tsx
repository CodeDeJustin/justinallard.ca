"use client";
import { navItems } from "@/constants/navItems";

import React from "react";

import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";

const Navbar = () => {
  return (
    <div className="flex flex-row items-center justify-between sm:justify-between py-8 max-w-5xl mx-auto relative z-[100] px-8 ">
      <div className="hidden lg:flex w-full justify-between">
        <DesktopNav navItems={navItems} />
      </div>

      <div className="flex lg:hidden w-full">
        <MobileNav navItems={navItems} />
      </div>
    </div>
  );
};

export default Navbar;
