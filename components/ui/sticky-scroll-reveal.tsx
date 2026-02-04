"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

export type StickyScrollItem = {
  title: string;
  description: string;
  content?: React.ReactNode;
};

export function StickyScroll({
  content,
  contentClassName,
}: {
  content: StickyScrollItem[];
  contentClassName?: string;
}) {
  const [activeCard, setActiveCard] = useState(0);

  // Ref du panneau sticky (photo) pour connaître son centre à l'écran
  const previewRef = useRef<HTMLDivElement>(null);

  // Refs de chaque bloc texte (pour comparer leurs centres au centre de la photo)
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Détecter md+ (desktop/tablette) pour activer le sticky reveal seulement là
  const [isMdUp, setIsMdUp] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setIsMdUp(mq.matches);

    sync();

    // Compat moderne + fallback
    try {
      mq.addEventListener("change", sync);
      return () => mq.removeEventListener("change", sync);
    } catch {
      mq.addListener(sync);
      return () => mq.removeListener(sync);
    }
  }, []);

  useEffect(() => {
    // On ne fait pas de "reveal" en mobile.
    if (!isMdUp) return;
    if (!content.length) return;

    let ticking = false;

    const computeActive = () => {
      ticking = false;

      const previewEl = previewRef.current;
      if (!previewEl) return;

      const previewRect = previewEl.getBoundingClientRect();
      const previewCenterY = previewRect.top + previewRect.height / 2;

      let bestIdx = 0;
      let bestDist = Number.POSITIVE_INFINITY;

      for (let i = 0; i < content.length; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;

        const r = el.getBoundingClientRect();
        const centerY = r.top + r.height / 2;
        const dist = Math.abs(centerY - previewCenterY);

        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      }

      setActiveCard(bestIdx);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(computeActive);
    };

    // Première synchro
    computeActive();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [content.length, isMdUp]);

  return (
    <section className="w-full">
      {/* MOBILE: simple, lisible, images inline, aucune opacité variable */}
      <div className="md:hidden px-4">
        <div className="space-y-14">
          {content.map((item, index) => (
            <div key={`${item.title}-${index}`} className="space-y-4">
              <h2 className="text-xl font-bold text-zinc-100">{item.title}</h2>

              <p className="text-sm leading-relaxed text-zinc-300">
                {item.description}
              </p>

              {item.content ? (
                <div
                  className={clsx(
                    "relative h-[16rem] w-full overflow-hidden rounded-2xl",
                    "bg-zinc-900/30 border border-white/10 shadow-lg",
                    contentClassName,
                  )}
                >
                  <div className="relative h-full w-full">{item.content}</div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {/* DESKTOP (md+): sticky reveal */}
      <div className="hidden md:block">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_26rem] gap-10 items-start">
          {/* Colonne texte */}
          <div className="min-w-0">
            {content.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                className="py-16 md:py-24"
              >
                <motion.h2
                  animate={{
                    opacity: activeCard === index ? 1 : 0.35,
                    filter: activeCard === index ? "blur(0px)" : "blur(0.2px)",
                  }}
                  transition={{ duration: 0.18 }}
                  className="text-xl md:text-2xl font-bold text-zinc-100"
                >
                  {item.title}
                </motion.h2>

                <motion.p
                  animate={{
                    opacity: activeCard === index ? 1 : 0.35,
                  }}
                  transition={{ duration: 0.18 }}
                  className="mt-4 md:mt-8 text-sm md:text-base leading-relaxed text-zinc-300"
                >
                  {item.description}
                </motion.p>
              </div>
            ))}
          </div>

          {/* Panneau sticky (photo) */}
          <div
            ref={previewRef}
            className={clsx(
              "relative md:sticky md:top-28",
              "h-[16rem] md:h-[22rem] w-full overflow-hidden rounded-2xl",
              "bg-zinc-900/30 border border-white/10 shadow-lg",
              contentClassName,
            )}
          >
            <div className="relative h-full w-full">
              <AnimatePresence initial={false}>
                <motion.div
                  key={activeCard}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  {content[activeCard]?.content ?? null}
                </motion.div>
              </AnimatePresence>

              {/* Shading pendant la transition */}
              <motion.div
                key={`shade-${activeCard}`}
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.28, 0] }}
                transition={{
                  duration: 0.35,
                  times: [0, 0.45, 1],
                  ease: "easeOut",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
