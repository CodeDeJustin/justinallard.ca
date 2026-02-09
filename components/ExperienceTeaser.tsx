"use client";
import { workExperience } from "@/constants/workExperience";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import Beam from "./Beam/Beam";
import moment from "moment";
import "moment/locale/fr";
import { BsCheck2 } from "react-icons/bs";
import Image from "next/image";

export const ExperienceTeaser = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeWorkExperience, setActiveWorkExperience] = useState(
    workExperience[0],
  );

  return (
    <div className="max-w-5xl mx-auto px-8">
      <h1 className="text-2xl md:text-3xl text-white font-bold max-w-5xl mx-auto mt-20 md:mt-40">
        Expérience professionnelle
      </h1>

      <p className="text-zinc-400 text-sm md:text-base max-w-2xl mt-4 leading-loose tracking-wide">
        Des rôles et des mandats centrés sur la livraison: améliorer l’existant,
        automatiser ce qui ralentit et rendre les systèmes plus fiables.
      </p>

      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-2 mt-20 max-w-2xl mx-auto">
        {/* Liste employeurs (fix mobile) */}
        <div className="flex flex-row md:flex-col gap-2 md:gap-0 relative overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {/* Beam seulement sur desktop */}
          <div className="hidden md:block absolute -left-6 w-px h-full bg-zinc-800 overflow-hidden">
            <Beam
              showBeam={true}
              variant="experience"
              className="[--meteor-size:0.9rem] [--meteor-width:160px] [--meteor-tail:4px]"
            />
          </div>

          {workExperience.map((exp, idx) => (
            <div
              key={`exp-${idx}`}
              className="relative md:my-2 snap-start"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <AnimatePresence>
                {hoveredIndex === idx && (
                  <motion.span
                    className="absolute inset-0 h-full w-full bg-zinc-800 rounded-md"
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

              <button
                onClick={() => setActiveWorkExperience(exp)}
                className={clsx(
                  "px-3 py-2 text-zinc-300 relative z-20 rounded-md flex flex-row gap-2 items-center group w-auto shrink-0 min-w-[11rem] md:min-w-0 md:w-full md:text-left",
                  activeWorkExperience?.company === exp.company
                    ? "bg-zinc-800"
                    : null,
                )}
              >
                <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 ring-1 ring-white/10">
                  <Image
                    src={exp.logo}
                    alt={exp.company}
                    fill
                    sizes="24px"
                    className="object-cover"
                  />
                </div>

                <span className="truncate" title={exp.company}>
                  {exp.company}
                </span>
              </button>
            </div>
          ))}
        </div>

        {/* Panneau détails (inchangé) */}
        <div className="md:pl-10 flex-1">
          <div className="flex flex-col space-y-4">
            <AnimatePresence>
              <motion.div
                className="flex flex-col space-y-2"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15 },
                }}
                layoutId={activeWorkExperience?.company}
              >
                <h1 className="text-2xl font-bold text-zinc-100">
                  {activeWorkExperience?.role}{" "}
                  <span className="text-brand-500">
                    @ {activeWorkExperience?.company}
                  </span>
                </h1>

                <div className="text-zinc-400 text-sm tracking-widest">
                  {moment(activeWorkExperience?.startDate).format("MMM YYYY")} -{" "}
                  {moment(activeWorkExperience?.endDate).format("MMM YYYY")}
                </div>

                <p className="text-zinc-400 text-sm">
                  {activeWorkExperience?.location}
                </p>

                <div>
                  {activeWorkExperience?.description.map((bullet, idx) => (
                    <div
                      key={`bullet-${idx}`}
                      className="flex flex-row space-x-2 items-start my-2"
                    >
                      <BsCheck2 className="text-brand-500 mt-[3px] flex-shrink-0" />
                      <span className="text-zinc-400 text-sm">{bullet}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
