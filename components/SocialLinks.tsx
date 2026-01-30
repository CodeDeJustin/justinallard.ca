import { socialLinks } from "@/constants/social-links";

type SocialLinksProps = {
  className?: string;
  iconClassName?: string;
};

export function SocialLinks({
  className = "",
  iconClassName = "h-5 w-5 hover:text-primary transition duration-150",
}: SocialLinksProps) {
  return (
    <div className={className}>
      {socialLinks.map(({ name, href, Icon }) => (
        <a
          key={name}
          href={href}
          className="text-zinc-500 text-sm relative"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
          title={name}
        >
          <span className="relative z-10 px-2 py-2 inline-block hover:text-brand-500">
            <Icon className={iconClassName} />
          </span>
        </a>
      ))}
    </div>
  );
}
