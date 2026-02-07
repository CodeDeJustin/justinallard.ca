"use client";
import React, { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import styles from "./style.module.css";

type BeamProps = {
  showBeam: boolean;
  className?: string;
};

const Beam = ({ showBeam, className }: BeamProps) => {
  const meteorRef = useRef<HTMLSpanElement | null>(null);

  const restartAnimation = () => {
    const meteor = meteorRef.current;
    if (!meteor) return;

    meteor.style.animation = "none";
    void meteor.offsetWidth;
    meteor.style.animation = "";
  };

  useEffect(() => {
    if (!showBeam) return;
    const meteor = meteorRef.current;
    if (!meteor) return;

    const handleAnimationEnd = () => {
      meteor.style.visibility = "hidden";
      const animationDelay = Math.floor(Math.random() * 3);
      const animationDuration = Math.floor(Math.random() * 4);
      const meteorWidth = Math.floor(Math.random() * (150 - 80) + 80);
      meteor.style.setProperty("--meteor-delay", `${animationDelay}s`);
      meteor.style.setProperty("--meteor-duration", `${animationDuration}s`);
      meteor.style.setProperty("--meteor-width", `${meteorWidth}px`);

      restartAnimation();
    };

    const handleAnimationStart = () => {
      meteor.style.visibility = "visible";
    };

    meteor.addEventListener("animationend", handleAnimationEnd);
    meteor.addEventListener("animationstart", handleAnimationStart);

    return () => {
      meteor.removeEventListener("animationend", handleAnimationEnd);
      meteor.removeEventListener("animationstart", handleAnimationStart);
    };
  }, [showBeam]);

  return (
    showBeam && (
      <span
        ref={meteorRef}
        className={twMerge(
          "absolute z-20  left-4  h-[0.1rem] w-[0.1rem] rounded-[9999px] bg-blue-700 shadow-[0_0_0_1px_#ffffff10] rotate-[180deg] before:bg-gradient-to-l before:from-transparent before:via-red-500 before:to-brand-500",
          styles.meteor,
          className,
        )}
      ></span>
    )
  );
};

export default Beam;
