import Image from "next/image";
import Link from "next/link";
import { certifications } from "@/constants/certifications";

export function CertificationsTeaser() {
  return (
    <section className="max-w-5xl mx-auto px-8 mt-20 md:mt-40">
      <div className="flex items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl text-white font-bold">
            Certifications
          </h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-2xl mt-4 leading-loose tracking-wide">
            Des repères concrets: gestion de projet, agilité et livraison.
          </p>
        </div>

        <Link
          href="/certifications"
          className="text-sm text-brand-500 hover:text-brand-400 whitespace-nowrap"
        >
          Voir tout
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {certifications.map((cert) => {
          const href =
            cert.proofUrl ?? cert.certificatePdf ?? "/profil#certifications";
          const isExternal = href.startsWith("http");
          const isPdf = href.toLowerCase().endsWith(".pdf");
          const target = isExternal || isPdf ? "_blank" : undefined;
          const rel = target ? "noreferrer" : undefined;

          const isInProgress = cert.status === "en_cours";
          const statusLabel = isInProgress ? "En cours" : "Actif";

          return (
            <a
              key={cert.short}
              href={href}
              target={target}
              rel={rel}
              className="group rounded-2xl border border-white/10 bg-zinc-800 p-3 hover:border-white/20 transition
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50
                         focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
              title={`${cert.title} — ${cert.issuer}`}
            >
              <div className="flex items-start gap-2">
                <span className="text-sm font-semibold text-zinc-100 leading-tight flex-1 min-w-0 truncate whitespace-nowrap">
                  {cert.short}
                </span>

                <span
                  className={[
                    "text-[10px] px-2 py-0.5 rounded-full border inline-flex items-center whitespace-nowrap leading-none flex-none",
                    isInProgress
                      ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-400"
                      : "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
                  ].join(" ")}
                >
                  {statusLabel}
                </span>
              </div>

              <div className="mt-3 flex items-center gap-3">
                {cert.logoSrc ? (
                  <Image
                    src={cert.logoSrc}
                    alt={cert.short}
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-lg object-contain bg-white/5 p-1"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-lg bg-white/5" />
                )}

                <div className="min-w-0">
                  <div className="text-xs text-zinc-300 leading-snug line-clamp-2">
                    {cert.title}
                  </div>
                  <div className="text-[11px] text-zinc-500 mt-1 line-clamp-1">
                    {cert.issuer}
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
