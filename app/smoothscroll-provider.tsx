"use client";
import { ReactLenis } from "@studio-freight/react-lenis";
import React from "react";

function SmoothScrollProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ReactLenis root>{children}</ReactLenis>;
}

export default SmoothScrollProvider;
