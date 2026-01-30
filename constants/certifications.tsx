export type Certification = {
  title: string;
  issuer: string;
  short: string;
  status?: "actif" | "en_cours";
  logoSrc?: string; // ex: /images/logos/pmp.png (dans public)
  proofUrl?: string; // lien Credly (badge dédié)
  certificatePdf?: string; // ex: /certificats/pmi-certification.pdf
};

export const certifications: Certification[] = [
  {
    short: "PMP",
    title: "Project Management Professional (PMP)",
    issuer: "Project Management Institute (PMI)",
    status: "actif",
    logoSrc: "/images/certifications/pmp.png",
    proofUrl:
      "https://www.credly.com/badges/dfb21b54-ce29-4c04-8651-02a70c019ecd",
    certificatePdf: "/certificats/pmp-certification.pdf",
  },
  {
    short: "PMI-CPMAI",
    title: "PMI Certified Professional in Managing AI (PMI-CPMAI)",
    issuer: "Project Management Institute (PMI)",
    status: "en_cours",
    logoSrc: "/images/certifications/pmi-cpmai.png",
    proofUrl:
      "https://www.credly.com/org/project-management-institute/badge/pmi-certified-professional-in-managing-ai-pmi-cpmai",
    // optionnel: si tu as un PDF pour celui-là, ajoute-le ici.
    // certificatePdf: "/certificats/pmi-cpmai.pdf",
  },
  {
    short: "PSM II",
    title: "Professional Scrum Master II",
    issuer: "Scrum.org",
    status: "actif",
    logoSrc: "/images/certifications/psm2.png",
    proofUrl:
      "https://www.credly.com/badges/64112321-212a-440a-b74e-b826d534d492",
    certificatePdf: "/certificats/professional-scrum-master-II.pdf",
  },
  {
    short: "PSPO I",
    title: "Professional Scrum Product Owner I",
    issuer: "Scrum.org",
    status: "actif",
    logoSrc: "/images/certifications/pspo1.png",
    proofUrl:
      "https://www.credly.com/badges/a5153edf-206d-421e-a835-421445f879e9",
    certificatePdf: "/certificats/professional-scrum-product-owner-I.pdf",
  },
  {
    short: "PSM I",
    title: "Professional Scrum Master I",
    issuer: "Scrum.org",
    status: "actif",
    logoSrc: "/images/certifications/psm1.png",
    proofUrl:
      "https://www.credly.com/badges/17091c84-6937-4f30-9b54-8ba6ec061a3c",
    certificatePdf: "/certificats/professional-scrum-master-I.pdf",
  },
  {
    short: "CSWA",
    title: "Certified SOLIDWORKS Associate – Mechanical Design (CSWA)",
    issuer: "SOLIDWORKS / Dassault Systèmes",
    status: "actif",
    logoSrc: "/images/certifications/cswa.png",
    // pas de badge Credly dans ton cas -> pas de proofUrl
    certificatePdf: "/certificats/cswa.pdf",
  },
];
