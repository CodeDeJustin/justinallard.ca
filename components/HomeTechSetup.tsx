import Image from "next/image";
import Link from "next/link";
import { TechnologiesTeaser } from "@/components/TechnologiesTeaser";
import { materielContent } from "@/constants/materiel";

function SetupTeaser() {
  const items = materielContent.slice(0, 3);

  return (
    <div>
      <div className="flex items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl text-white font-bold">
            Matériel
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Aperçu de mon setup dev + CAO.
          </p>
        </div>

        <Link
          href="/materiel"
          className="text-sm text-brand-500 hover:text-brand-400 whitespace-nowrap"
        >
          Voir tout
        </Link>
      </div>

      {/* Mosaïque d’images, sans scrollbar */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        {items.map((it) => (
          <div
            key={it.title}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40"
          >
            <Image
              src={it.image}
              alt={it.title}
              fill
              sizes="200px"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Extrait, cohérent avec la page Matériel */}
      <div className="mt-6 space-y-4">
        {items.map((it) => (
          <div key={it.title}>
            <div className="text-zinc-200 font-semibold">{it.title}</div>
            <div className="text-sm text-zinc-400 leading-relaxed line-clamp-2">
              {it.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HomeTechSetup() {
  return (
    <section className="max-w-5xl mx-auto px-8 mt-40">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-8">
          <TechnologiesTeaser embedded />
        </div>

        <div className="lg:col-span-4">
          <SetupTeaser />
        </div>
      </div>
    </section>
  );
}
