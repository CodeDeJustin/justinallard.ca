import { user } from "@/constants/user";
import { certifications } from "@/constants/certifications";
import { CertificationCard } from "./CertificationCard";

export function CertificationsGrid() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 items-start">
        {certifications.map((c) => (
          <CertificationCard key={`${c.issuer}-${c.title}`} c={c} />
        ))}
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
    </>
  );
}
