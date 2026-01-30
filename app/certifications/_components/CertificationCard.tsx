import Image from "next/image";
import { user } from "@/constants/user";
import type { Certification } from "@/constants/certifications";
import { CardSpotlight } from "@/components/ui/card-spotlight";

export function CertificationCard({ c }: { c: Certification }) {
  const status = c.status ?? "actif";
  const credlyUrl = c.proofUrl ?? user.credly;

  return (
    <CardSpotlight className="group rounded-2xl border border-zinc-800 bg-zinc-950/40 p-5 hover:bg-zinc-950/60 transition">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs px-2 py-1 rounded-full border border-zinc-700 bg-zinc-900 text-zinc-200">
              {c.short}
            </span>

            {status === "en_cours" ? (
              <span className="text-xs px-2 py-1 rounded-full border border-amber-700/60 bg-amber-950/30 text-amber-200">
                En cours
              </span>
            ) : (
              <span className="text-xs px-2 py-1 rounded-full border border-emerald-700/40 bg-emerald-950/20 text-emerald-200">
                Actif
              </span>
            )}
          </div>

          <h2 className="text-zinc-50 font-semibold mt-3 leading-snug min-h-[3.25rem]">
            {c.title}
          </h2>

          <p className="text-zinc-400 text-sm mt-1">{c.issuer}</p>
        </div>

        <div className="h-16 w-16 md:h-20 md:w-20 flex items-center justify-center shrink-0">
          {c.logoSrc ? (
            <Image
              src={c.logoSrc}
              width={80}
              height={80}
              alt={`Badge ${c.short}`}
              className="h-full w-full object-contain drop-shadow-sm"
              quality={100}
              unoptimized
            />
          ) : (
            <span className="text-[10px] font-semibold tracking-wide text-zinc-200">
              {c.short}
            </span>
          )}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-3">
        <a
          href={c.proofUrl ? credlyUrl : user.credly}
          target="_blank"
          rel="noreferrer"
          className={
            c.proofUrl
              ? "text-zinc-200 border border-zinc-700 bg-zinc-900 px-4 py-2 rounded-lg hover:border-zinc-600 hover:bg-zinc-800/[0.8] transition text-sm"
              : "text-zinc-300 border border-zinc-800 bg-zinc-950/40 px-4 py-2 rounded-lg hover:border-zinc-700 hover:bg-zinc-900/30 transition text-sm"
          }
        >
          {c.proofUrl ? "Voir sur Credly" : "Profil Credly"}
        </a>

        {c.certificatePdf ? (
          <a
            href={c.certificatePdf}
            target="_blank"
            rel="noreferrer"
            className="text-zinc-200 border border-zinc-700 bg-zinc-900 px-4 py-2 rounded-lg hover:border-zinc-600 hover:bg-zinc-800/[0.8] transition text-sm"
          >
            Voir le certificat (PDF)
          </a>
        ) : null}
      </div>
    </CardSpotlight>
  );
}
