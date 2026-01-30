"use client";
import { Logo } from "@/components/Logo";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoIosCloseCircleOutline, IoIosMenu } from "react-icons/io";
import { CustomLink } from "../CustomLink";

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

export const MobileNav = ({ navItems }: any) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Ferme le menu dès que la route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const item = {
    exit: {
      opacity: 0,
      transition: { ease: EASE, duration: 0.2 },
    },
    show: {
      height: "100vh",
      opacity: 1,
      transition: { duration: 0.1, staggerChildren: 0.1 },
    },
    hidden: {
      opacity: 0,
      height: 0,
    },
  };

  const childItems = {
    hidden: { x: "-2vw", opacity: 0 },
    show: { x: 0, opacity: 1 },
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center w-full">
        <Logo textClassName="text-zinc-100" />
        <IoIosMenu onClick={() => setOpen(!open)} className="text-zinc-100" />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            variants={item}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed inset-0 bg-zinc-800 z-50 flex flex-col justify-center items-center space-y-10 text-xl font-bold text-zinc-600 hover:text-zinc-800 transition duration-200"
          >
            <IoIosCloseCircleOutline
              className="absolute right-8 top-14 h-5 w-5 text-zinc-100"
              onClick={() => setOpen(false)}
            />

            {navItems.map((navItem: any, idx: number) => (
              <CustomLink
                key={`link=${idx}`}
                href={navItem.link}
                className="text-zinc-200"
              >
                <motion.span
                  variants={childItems}
                  className="block"
                  onClick={() => setOpen(false)}
                >
                  {navItem.name}
                </motion.span>
              </CustomLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
