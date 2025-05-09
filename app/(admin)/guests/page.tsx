"use client";
import { Scanner } from "@yudiel/react-qr-scanner";
import React from "react";

export default function Page() {
  return <Scanner onScan={(result) => console.log(result)} />;
}
