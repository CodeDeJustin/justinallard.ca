"use client";

import React from "react";
import { technologiesSections } from "@/constants/technologies";
import { TechLogo } from "@/components/TechLogo";
import { TechnologiesIconCloud } from "@/app/technologies/_components/TechnologiesIconCloud";

export function TechnologiesShowcase() {
  return (
    <div className="mt-10 flex flex-col gap-10">
      {/* Cards: 1er sur mobile, 2e sur desktop */}
      <div className="order-1 md:order-2 space-y-10">
        {technologiesSections.map((section) => (
          <section key={section.title}>
            <h2 className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
              {section.title}
            </h2>

            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {section.items.map(({ file, label }) => (
                <button
                  key={file}
                  type="button"
                  title={label}
                  className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-zinc-900/60 p-3
                             text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50
                             focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
                >
                  <TechLogo
                    src={`/images/logos/${file}`}
                    alt={label}
                    size={28}
                    className="opacity-100 grayscale-0 brightness-100"
                  />
                  <span className="text-sm text-zinc-200 leading-tight line-clamp-2">
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Cloud: 2e sur mobile, 1er sur desktop */}
      <div className="order-2 md:order-1">
        <TechnologiesIconCloud />
      </div>
    </div>
  );
}
