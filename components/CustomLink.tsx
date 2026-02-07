import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type CustomLinkProps = ComponentPropsWithoutRef<"a"> & {
  href: string;
};

export const CustomLink = ({ href, rel, target, ...props }: CustomLinkProps) => {
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));

  if (isInternalLink) {
    return <Link href={href} rel={rel} target={target} {...props} />;
  }

  return (
    <a
      href={href}
      target={target ?? "_blank"}
      rel={rel ?? "noopener noreferrer"}
      {...props}
    />
  );
};
