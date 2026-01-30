import { CustomLink } from "./CustomLink";
import { navItems } from "@/constants/navItems";
import { Logo } from "./Logo";
import { SocialLinks } from "@/components/SocialLinks";

type NavItem = {
  name: string;
  link: string;
};

export const Footer = () => {
  return (
    <div className="border-t border-slate-900/5 py-10 max-w-6xl mx-auto px-8">
      <div className="flex flex-col justify-center items-center py-10">
        <Logo textClassName="text-white text-xl" />

        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-4">
          {(navItems as NavItem[]).map((navItem) => (
            <CustomLink
              key={navItem.link}
              href={navItem.link}
              className="text-zinc-100 text-sm relative"
            >
              <span className="relative z-10 px-2 py-2 inline-block">
                {navItem.name}
              </span>
            </CustomLink>
          ))}
        </div>

        <p className="text-zinc-200 text-sm font-light text-center mt-8 border-t border-zinc-800 pt-4">
          © {new Date().getFullYear()} Justin Allard
        </p>

        <SocialLinks className="flex flex-row justify-center space-x-2 mt-2" />
      </div>
    </div>
  );
};
