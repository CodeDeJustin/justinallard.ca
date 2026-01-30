"use client";

import { projects } from "@/constants/projets";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BsTerminal } from "react-icons/bs";

export const ProjectsGrid = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = (idx: number) => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
    setHoveredIndex(idx);
  };

  const handleLeave = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    // Petit tampon: évite le "off → on" quand tu passes d'une card à l'autre
    leaveTimer.current = setTimeout(() => setHoveredIndex(null), 70);
  };

  useEffect(() => {
    return () => {
      if (leaveTimer.current) clearTimeout(leaveTimer.current);
    };
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-8">
      <LayoutGroup id="projects-hover">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-20">
          {projects.map((project, idx) => (
            <a
              href={project.link}
              key={project.link}
              className="relative group block p-2 h-full w-full rounded-3xl
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50
                         focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
              onPointerEnter={() => handleEnter(idx)}
              onPointerLeave={handleLeave}
            >
              <AnimatePresence>
                {hoveredIndex === idx && (
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 h-full w-full rounded-3xl bg-neutral-200 dark:bg-slate-800/[0.8] block"
                    layoutId="hoverBackground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.15 } }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.15, delay: 0.2 },
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Card: bordure exactement "template-like" */}
              <div className="rounded-2xl h-full w-full overflow-hidden bg-zinc-900/60 border border-white/10 group-hover:border-white/20 relative z-20">
                <div className="relative z-50 flex h-full flex-col">
                  <div className="relative h-44 sm:h-60 md:h-44 w-full transition duration-500 bg-black/10 group-hover:bg-transparent">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center"
                    />
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <h4 className="text-zinc-100 font-bold tracking-wide mt-4">
                      {project.title}
                    </h4>

                    <p className="mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm">
                      {project.description}
                    </p>

                    <div className="mt-auto">
                      {/* Tech stack: slot centré (largeur = 5 icônes + gaps), icônes alignées à gauche */}
                      <div className="pt-6">
                        <div
                          className="mx-auto flex flex-wrap justify-start gap-x-4 gap-y-2"
                          style={{ width: "calc(5 * 28px + 4 * 1rem)" }} // 5 icônes (28px) + 4 gaps (gap-x-4 = 1rem)
                        >
                          {project.stack.map((s, i) => (
                            <span
                              key={`stack-${project.title}-${i}`}
                              className="inline-flex"
                              title={s.name}
                            >
                              {s.icon}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-row space-x-2 mt-4 items-center px-0.5">
                        <BsTerminal className="h-3 w-3 stroke-1.5 text-zinc-500 group-hover:text-brand-500 group-focus-visible:text-brand-500" />
                        <p className="text-zinc-500 group-hover:text-brand-500 group-focus-visible:text-brand-500 text-xs">
                          Consulter le projet
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </LayoutGroup>
    </div>
  );
};
