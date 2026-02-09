"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const OVERRIDE_ID = "tab-attention-override-icon";

function setOverrideFavicon(href: string) {
  let link = document.getElementById(OVERRIDE_ID) as HTMLLinkElement | null;

  if (!link) {
    link = document.createElement("link");
    link.id = OVERRIDE_ID;
    link.rel = "icon";
  }

  link.href = href;

  // On le ré-attache à la fin du <head> pour qu’il “gagne” en priorité.
  document.head.appendChild(link);
}

function clearOverrideFavicon() {
  const link = document.getElementById(OVERRIDE_ID);
  link?.parentNode?.removeChild(link);
}

export function TabAttention() {
  const pathname = usePathname() ?? "";
  const lastTitleRef = useRef<string>("");
  const awayRef = useRef(false);

  useEffect(() => {
    const isConfidentialite = pathname.includes("confidentialite");
    if (isConfidentialite) return;

    // Garde en mémoire le dernier "vrai" titre que Next met
    lastTitleRef.current = document.title;

    const titleEl = document.querySelector("title");
    const observer = new MutationObserver(() => {
      if (!awayRef.current) lastTitleRef.current = document.title;
    });
    if (titleEl) observer.observe(titleEl, { childList: true });

    const awayTitle = "NON! Reste avec moi! 😭";
    const awayFavicon = "icones/coffee-icon.ico";

    const onBlur = () => {
      awayRef.current = true;
      lastTitleRef.current = document.title;
      document.title = awayTitle;
      setOverrideFavicon(awayFavicon);
    };

    const onFocus = () => {
      awayRef.current = false;
      clearOverrideFavicon(); // ← laisse Next remettre le bon favicon de la page
      if (lastTitleRef.current) document.title = lastTitleRef.current;
    };

    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocus);

    return () => {
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocus);
      observer.disconnect();
      clearOverrideFavicon();
    };
  }, [pathname]);

  return null;
}
