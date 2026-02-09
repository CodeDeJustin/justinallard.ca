"use client";
import React, { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import styles from "./style.module.css";

type BeamVariant = "experience" | "timeline";

type BeamProps = {
  showBeam: boolean;
  className?: string;
  variant?: BeamVariant;
};

const Beam = ({ showBeam, className, variant = "experience" }: BeamProps) => {
  const meteorRef = useRef<HTMLSpanElement | null>(null);

  const restartAnimation = () => {
    const meteor = meteorRef.current;
    if (!meteor) return;

    meteor.style.animation = "none";
    void meteor.offsetWidth; // force reflow
    meteor.style.animation = "";
  };

  useEffect(() => {
    if (!showBeam) return;
    const meteor = meteorRef.current;
    if (!meteor) return;

    const handleAnimationEnd = () => {
      meteor.style.visibility = "hidden";

      const animationDelay = Math.floor(Math.random() * 3); // 0..2
      const animationDuration = Math.floor(Math.random() * 4) + 2; // 2..5
      const meteorWidth = Math.floor(Math.random() * (150 - 80) + 80); // 80..149

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

  if (!showBeam) return null;

  // IMPORTANT:
  // - On centre toujours via left-1/2 + translate (et on évite tout transform en CSS)
  // - On gère la rotation en Tailwind pour ne pas écraser translate
  const base =
    "absolute z-20 left-1/2 -translate-x-1/2 -rotate-90 rounded-full " +
    "h-[var(--meteor-size)] w-[var(--meteor-size)] ring-1 ring-white/10 " +
    "before:content-[''] before:absolute before:top-1/2 before:-translate-y-1/2 " +
    "before:left-1/2 before:rounded-full " +
    "before:w-[var(--meteor-width)] before:h-[var(--meteor-tail)] before:opacity-100";

  // Variantes EXACTES selon ta demande:
  // - Timeline: météore rouge + traînée rouge (aucun bleu)
  // - Experience: météore bleue + traînée rouge
  const variantClasses =
    variant === "timeline"
      ? "bg-red-500 shadow-[0_0_18px_rgba(239,68,68,0.95)] " +
        "before:bg-gradient-to-r before:from-red-500 before:via-red-500 before:to-transparent " +
        "before:shadow-[0_0_22px_rgba(239,68,68,0.75)]"
      : "bg-blue-700 shadow-[0_0_14px_rgba(59,130,246,0.65)] " +
        // Dégradé bleu -> rouge -> transparent (comme avant: transition entre la météore bleue et la traînée rouge)
        "before:bg-gradient-to-r before:from-blue-700 before:via-red-500 before:to-transparent " +
        "before:shadow-[0_0_18px_rgba(239,68,68,0.55)]";

  // Ordre voulu:
  // - className peut fournir les variables CSS ([--meteor-size:...]) sans casser le centrage
  // - base à la fin pour écraser un éventuel left-* qui décalerait encore la météore
  return (
    <span
      ref={meteorRef}
      aria-hidden="true"
      className={twMerge(variantClasses, styles.meteor, className, base)}
    />
  );
};

export default Beam;
