"use client";
import { navItems } from "@/constants/navItems";

import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";

const Navbar = () => {
  return (
    <div className="relative z-[100] w-full">
      <div className="mx-auto w-full max-w-5xl px-8 py-8">
        {/* Desktop: centre le pill */}
        <div className="hidden w-full justify-center lg:flex">
          <DesktopNav navItems={navItems} />
        </div>

        {/* Mobile: prend toute la largeur, MobileNav gère déjà le justify-between */}
        <div className="flex w-full lg:hidden">
          <MobileNav navItems={navItems} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
