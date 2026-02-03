import Link from "next/link";
import { technologiesTeaser } from "@/constants/technologies";
import { TechLogo } from "@/components/TechLogo";

type TechItem = { file: string; label: string };

const MAX_ITEMS = 12;

export function TechnologiesTeaser({
  embedded = false,
}: {
  embedded?: boolean;
}) {
  // On utilise la sélection explicite + tri du fichier constants
  const items: TechItem[] = (technologiesTeaser as TechItem[]).slice(
    0,
    MAX_ITEMS,
  );

  const Wrapper = embedded ? "div" : "section";
  const wrapperClass = embedded ? "" : "max-w-5xl mx-auto px-8 mt-40";

  const gridClass = embedded
    ? "mt-6 grid grid-cols-2 gap-4 md:grid-cols-3"
    : "mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6";

  return (
    <Wrapper className={wrapperClass}>
      <div className="flex items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl text-white font-bold">
            Technologies
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Aperçu rapide de mon stack principal.
          </p>
        </div>

        <Link
          href="/technologies"
          className="text-sm text-brand-500 hover:text-brand-400 whitespace-nowrap"
        >
          Voir tout
        </Link>
      </div>

      <div className={gridClass}>
        {items.map(({ file, label }, idx) => (
          <div
            key={`${file}-${idx}`}
            className="group flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-zinc-800 p-4"
            title={label}
          >
            <TechLogo
              src={`/images/logos/${file}`}
              alt={label}
              size={26}
              className="opacity-100 grayscale-0 brightness-100"
            />
            <span className="min-w-0 text-sm text-zinc-200 leading-tight line-clamp-2">
              {label}
            </span>
          </div>
        ))}
      </div>
    </Wrapper>
  );
}
