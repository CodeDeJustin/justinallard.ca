"use client";

import clsx from "clsx";
import React from "react";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export const Container = ({ children, className }: ContainerProps) => {
  return (
    <main
      className={clsx("min-h-screen antialiased bg-transparent", className)}
    >
      {children}
    </main>
  );
};
