"use client";
import React from "react";
import { useLenisEverywhere } from "./useLenisEverywhere";

function SmoothScrollProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useLenisEverywhere();

  return <>{children}</>;
}

export default SmoothScrollProvider;
