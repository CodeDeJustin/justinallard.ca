"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type FlippingTextProps = {
  words: string[];
  className?: string;
  caretClassName?: string;
  typingSpeedMs?: number;
  deletingSpeedMs?: number;
  pauseMs?: number;
};

export function FlippingText({
  words,
  className,
  caretClassName,
  typingSpeedMs = 40,
  deletingSpeedMs = 35,
  pauseMs = 900,
}: FlippingTextProps) {
  const safeWords = words.filter(Boolean);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [visibleCharacters, setVisibleCharacters] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentWord = safeWords[currentWordIndex] ?? "";

  useEffect(() => {
    if (safeWords.length === 0) return;

    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && visibleCharacters < currentWord.length) {
      timeout = setTimeout(
        () => setVisibleCharacters((prev) => prev + 1),
        typingSpeedMs,
      );
    } else if (!isDeleting && visibleCharacters === currentWord.length) {
      timeout = setTimeout(() => setIsDeleting(true), pauseMs);
    } else if (isDeleting && visibleCharacters > 0) {
      timeout = setTimeout(
        () => setVisibleCharacters((prev) => prev - 1),
        deletingSpeedMs,
      );
    } else if (isDeleting && visibleCharacters === 0) {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % safeWords.length);
    }

    return () => clearTimeout(timeout);
  }, [
    currentWord,
    deletingSpeedMs,
    isDeleting,
    pauseMs,
    safeWords.length,
    typingSpeedMs,
    visibleCharacters,
  ]);

  return (
    <span className={cn("relative inline-flex items-baseline", className)}>
      <span className="tracking-tight whitespace-nowrap">
        {currentWord
          .substring(0, visibleCharacters)
          .split("")
          .map((char, index) => {
            const displayChar = char === " " ? "\u00A0" : char;

            return (
              <motion.span
                key={`${currentWordIndex}-${index}-${char}`}
                initial={{ opacity: 0, rotateY: 90, y: 8, filter: "blur(8px)" }}
                animate={{ opacity: 1, rotateY: 0, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.18 }}
                className="inline-block"
              >
                {displayChar}
              </motion.span>
            );
          })}
      </span>

      <motion.span
        aria-hidden="true"
        className={cn(
          "ml-2 inline-block rounded-full bg-black",
          caretClassName,
        )}
        style={{
          width: isDeleting ? "0.45em" : "0.25em",
          height: "0.25em",
        }}
        animate={{
          backgroundColor: isDeleting
            ? "#ef4444"
            : ["#60a5fa", "#22c55e", "#3b82f6"],
        }}
        transition={{ duration: 0.1 }}
      />
    </span>
  );
}
