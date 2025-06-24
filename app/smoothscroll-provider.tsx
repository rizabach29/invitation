"use client";
import { Lenis } from "@studio-freight/react-lenis";
import React from "react";

function SmoothScrollProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Lenis
      options={{
        // Higher = more sensitive to touch
        smoothWheel: true,
        syncTouch: true,
        easing: (t) => 1 - Math.pow(1 - t, 4),
        lerp: 0.02,
      }}
      root
    >
      {children}
    </Lenis>
  );
}

export default SmoothScrollProvider;
