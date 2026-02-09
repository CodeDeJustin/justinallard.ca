"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

type IconSnapshot = {
  el: HTMLLinkElement;
  href: string;
  rel: string;
  type: string | null;
  sizes: string | null;
};

function isAppleTouchIcon(el: HTMLLinkElement) {
  const rel = (el.getAttribute("rel") ?? "").toLowerCase();
  return rel.includes("apple-touch-icon");
}

function snapshotIcons(): IconSnapshot[] {
  const els = Array.from(
    document.querySelectorAll<HTMLLinkElement>("link[rel]"),
  ).filter((l) => {
    const rel = (l.getAttribute("rel") ?? "").toLowerCase();
    return rel.includes("icon") && !isAppleTouchIcon(l);
  });

  // Si aucun favicon n'est présent (rare mais possible), on en crée un
  if (els.length === 0) {
    const link = document.createElement("link");
    link.rel = "icon";
    link.href = "/icones/coffee-icon.ico";
    document.head.appendChild(link);
    els.push(link);
  }

  return els.map((el) => ({
    el,
    href: el.href,
    rel: el.getAttribute("rel") ?? "icon",
    type: el.getAttribute("type"),
    sizes: el.getAttribute("sizes"),
  }));
}

function applyFavicon(snapshots: IconSnapshot[], href: string) {
  const isSvg = href.toLowerCase().includes(".svg");

  // Cache-buster pour forcer le navigateur à recharger l’icône
  const busted = href.includes("?")
    ? `${href}&v=${Date.now()}`
    : `${href}?v=${Date.now()}`;

  for (const s of snapshots) {
    s.el.setAttribute("rel", s.rel); // garde le rel original
    s.el.href = busted;

    if (isSvg) {
      s.el.setAttribute("type", "image/svg+xml");
      s.el.setAttribute("sizes", "any");
    } else {
      // Laisse le navigateur décider (ico/png)
      if (s.type) s.el.setAttribute("type", s.type);
      else s.el.removeAttribute("type");

      if (s.sizes) s.el.setAttribute("sizes", s.sizes);
      else s.el.removeAttribute("sizes");
    }
  }
}

function restoreIcons(snapshots: IconSnapshot[]) {
  for (const s of snapshots) {
    s.el.href = s.href;

    if (s.type) s.el.setAttribute("type", s.type);
    else s.el.removeAttribute("type");

    if (s.sizes) s.el.setAttribute("sizes", s.sizes);
    else s.el.removeAttribute("sizes");

    s.el.setAttribute("rel", s.rel);
  }
}

export function TabAttention() {
  const pathname = usePathname() ?? "";
  const lastTitleRef = useRef<string>("");
  const awayRef = useRef(false);
  const iconsRef = useRef<IconSnapshot[]>([]);

  useEffect(() => {
    const isConfidentialite = pathname.includes("confidentialite");
    if (isConfidentialite) return;

    // Prend un snapshot des icons existants (ceux que le navigateur utilise vraiment)
    iconsRef.current = snapshotIcons();

    // Garde en mémoire le dernier "vrai" titre que Next met
    lastTitleRef.current = document.title;

    const titleEl = document.querySelector("title");
    const observer = new MutationObserver(() => {
      if (!awayRef.current) lastTitleRef.current = document.title;
    });
    if (titleEl) observer.observe(titleEl, { childList: true });

    const awayTitle = "Hey! Reviens ☕🙂";
    const awayFavicon = "/icones/away-happy.svg"; // ton fichier dans public/icones

    const setAway = () => {
      if (awayRef.current) return;
      awayRef.current = true;
      lastTitleRef.current = document.title;
      document.title = awayTitle;
      applyFavicon(iconsRef.current, awayFavicon);
    };

    const setBack = () => {
      if (!awayRef.current) return;
      awayRef.current = false;
      restoreIcons(iconsRef.current);
      if (lastTitleRef.current) document.title = lastTitleRef.current;
    };

    // Plus fiable que blur/focus pour les changements d’onglet
    const onVisibility = () => {
      if (document.visibilityState === "hidden") setAway();
      else setBack();
    };

    // Fallback
    const onBlur = () => setAway();
    const onFocus = () => setBack();

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocus);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocus);
      observer.disconnect();
      // Toujours restaurer au démontage
      restoreIcons(iconsRef.current);
    };
  }, [pathname]);

  return null;
}
