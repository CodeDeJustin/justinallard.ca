import { Container } from "@/components/Container";
import { user } from "@/constants/user";
import { certifications } from "@/constants/certifications";
import Image from "next/image";

export const metadata = { title: "Certifications | Justin Allard" };

export default function CertificationsPage() {
  return (
    <Container>
      <div className="max-w-5xl mx-auto px-8 mt-10 md:mt-20 relative">
        <h1 className="font-bold text-3xl md:text-5xl md:leading-tight text-zinc-50 max-w-3xl">
          Certifications & <span className="text-cyan-500">attestations</span>
        </h1>

        <p className="text-zinc-400 text-sm md:text-base max-w-2xl mt-8 md:leading-loose tracking-wide">
          Le sérieux est dans les projets. Ici, c’est la paperasse utile.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
          {certifications.map((c) => {
            const credlyUrl = c.proofUrl ?? user.credly;

            return (
              <div
                key={`${c.issuer}-${c.title}`}
                className="group rounded-2xl border border-zinc-800 bg-zinc-950/40 p-5 hover:bg-zinc-950/60 transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs px-2 py-1 rounded-full border border-zinc-700 bg-zinc-900 text-zinc-200">
                        {c.short}
                      </span>

                      {c.status === "en_cours" ? (
                        <span className="text-xs px-2 py-1 rounded-full border border-amber-700/60 bg-amber-950/30 text-amber-200">
                          En cours
                        </span>
                      ) : (
                        <span className="text-xs px-2 py-1 rounded-full border border-emerald-700/40 bg-emerald-950/20 text-emerald-200">
                          Actif
                        </span>
                      )}
                    </div>

                    <h2 className="text-zinc-50 font-semibold mt-3 leading-snug">
                      {c.title}
                    </h2>
                    <p className="text-zinc-400 text-sm mt-2">{c.issuer}</p>
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

                <div className="mt-4 flex flex-wrap gap-3">
                  {c.proofUrl ? (
                    <a
                      href={credlyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-zinc-200 border border-zinc-700 bg-zinc-900 px-4 py-2 rounded-lg hover:border-zinc-600 hover:bg-zinc-800/[0.8] transition text-sm"
                    >
                      Voir sur Credly
                    </a>
                  ) : (
                    <a
                      href={user.credly}
                      target="_blank"
                      rel="noreferrer"
                      className="text-zinc-300 border border-zinc-800 bg-zinc-950/40 px-4 py-2 rounded-lg hover:border-zinc-700 hover:bg-zinc-900/30 transition text-sm"
                    >
                      Profil Credly
                    </a>
                  )}

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
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-10">
          <a
            href={user.credly}
            target="_blank"
            rel="noreferrer"
            className="text-zinc-200 border border-zinc-600 bg-zinc-900 px-8 py-2 rounded-lg hover:border-zinc-700 hover:bg-zinc-800/[0.8] transition duration-200"
          >
            Ouvrir mon profil Credly
          </a>
        </div>
      </div>
    </Container>
  );
}
