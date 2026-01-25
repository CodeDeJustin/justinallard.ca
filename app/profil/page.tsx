import { Container } from "@/components/Container";
import { Timeline } from "@/components/Timeline";
import { user } from "@/constants/user";
import Image from "next/image";
import { SiCredly } from "react-icons/si";
import {
  AiOutlineGithub,
  AiOutlineLinkedin,
  AiOutlineMedium,
} from "react-icons/ai";

export const metadata = {
  title: "Profil | Justin Allard",
  description:
    "Développeur logiciel Full Stack avec un profil hybride CAO/PLM et gestion de projets.",
};

type SocialLink = {
  name: string;
  link: string;
  icon: React.ReactNode;
};

export default function ProfilPage() {
  const socials: SocialLink[] = [
    {
      name: "Medium",
      link: user.medium,
      icon: (
        <AiOutlineMedium className="h-5 w-5 hover:text-primary transition duration-150" />
      ),
    },
    {
      name: "LinkedIn",
      link: user.linkedin,
      icon: (
        <AiOutlineLinkedin className="h-5 w-5 hover:text-primary transition duration-150" />
      ),
    },
    {
      name: "GitHub",
      link: user.github,
      icon: (
        <AiOutlineGithub className="h-5 w-5 hover:text-primary transition duration-150" />
      ),
    },
    {
      name: "Credly",
      link: user.credly,
      icon: (
        <SiCredly className="h-5 w-5 hover:text-primary transition duration-150" />
      ),
    },
  ];

  return (
    <Container>
      <div className="max-w-5xl mx-auto px-8 md:mt-20 relative flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-10 justify-between">
        <div>
          <h1 className="font-bold text-3xl md:text-5xl md:leading-tight text-zinc-50 max-w-3xl">
            Salut! Moi c’est{" "}
            <span className="text-cyan-500">Justin Allard</span>. Développeur
            logiciel Full Stack avec un profil hybride CAO/PLM et gestion de
            projets.
          </h1>

          <p className="text-zinc-400 text-sm md:text-base max-w-2xl mt-8 md:leading-loose tracking-wide">
            Passionné par la programmation et l’automatisation, je conçois des
            solutions concrètes, robustes et agréables à utiliser. Je combine
            une approche technique (Full Stack) avec une rigueur de livraison
            (PMP®, PSM II, PSPO I) pour transformer des besoins réels en
            produits qui tiennent la route.
          </p>

          <p className="text-zinc-400 text-sm md:text-base max-w-2xl mt-4 md:leading-loose tracking-wide">
            Mon parcours inclut aussi l’automatisation CAO et l’intégration PLM
            (PTC Creo, Windchill), ce qui me rend à l’aise autant côté “écran et
            API” que côté ingénierie et processus. Si une solution dépend d’un
            miracle en prod, je préfère qu’on en parle tout de suite.
          </p>
        </div>

        <div className="order-first md:order-last">
          <Image
            src="/images/JustinAllardProfil.jpg"
            width={200}
            height={200}
            alt="Avatar de Justin Allard"
            className="rounded-2xl"
            priority
          />

          <div className="flex flex-row justify-start md:justify-center space-x-2 mt-2">
            {socials.map((socialLink, idx) => (
              <a
                key={`social-link-${idx}`}
                href={socialLink.link}
                className="text-zinc-500 text-sm relative"
                target="_blank"
                rel="noreferrer"
                aria-label={socialLink.name}
              >
                <span className="relative z-10 px-2 py-2 inline-block hover:text-cyan-500">
                  {socialLink.icon}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 mt-10 relative">
        <p className="text-zinc-400 text-sm md:text-base mt-8 md:leading-loose tracking-wide">
          Voici un aperçu chronologique de mon parcours, entre développement
          logiciel, intégration, automatisation et projets. C’est moins glamour
          qu’un “full stack soap engineer”, mais c’est un brin plus vrai.
        </p>

        <p className="text-zinc-400 text-sm md:text-base mt-8 md:leading-loose tracking-wide">
          Timeline
        </p>

        <Timeline />
      </div>
    </Container>
  );
}
