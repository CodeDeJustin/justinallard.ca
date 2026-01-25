"use client";
import { projects } from "@/constants/projets";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";

import { BsTerminal } from "react-icons/bs";

export const Projets = () => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="max-w-5xl mx-auto px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-20">
        {projects.map((project, idx) => (
          <a
            href={project.link}
            key={project.link}
            className="relative group block p-2"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-zinc-800/[0.8] rounded-3xl"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>

            <div className="rounded-2xl overflow-hidden bg-zinc-800 border border-transparent group-hover:border-zinc-700 relative z-50 h-full">
              <div className="relative z-50 flex h-full flex-col">
                <div className="h-44 sm:h-60 md:h-44 w-full relative transition duration-500 bg-black/10 group-hover:bg-transparent">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="absolute inset-0 object-cover object-center mix-blend-multiply"
                  />
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <h4 className="text-zinc-100 font-bold tracking-wide mt-4">
                    {project.title}
                  </h4>

                  <p className="mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm">
                    {project.description}
                  </p>

                  {/* Ancre le bloc "stack + CTA" en bas */}
                  <div className="mt-auto">
                    {/* STACK: toujours juste au-dessus du CTA */}
                    <div className="flex flex-row flex-wrap gap-x-4 gap-y-2 pt-6 text-zinc-500">
                      {project.stack.map((s, i) => (
                        <span
                          key={`stack-${project.title}-${i}`}
                          className="inline-flex transition-colors"
                          style={{
                            color: hoveredIndex === idx ? s.color : undefined,
                          }}
                          title={s.name}
                        >
                          {/* Force une taille uniforme (un peu plus grosse) */}
                          <span className="pointer-events-none inline-flex [&>svg]:h-8 [&>svg]:w-8 [&>svg]:stroke-[1.25]">
                            {s.icon}
                          </span>
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-row space-x-2 mt-4 items-center px-0.5">
                      <BsTerminal className="h-3 w-3 stroke-1.5 text-zinc-500 group-hover:text-cyan-500" />
                      <p className="text-zinc-500 group-hover:text-cyan-500 text-xs">
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
    </div>
  );
};
