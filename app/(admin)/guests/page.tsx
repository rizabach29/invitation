"use client";
import { Scanner } from "@yudiel/react-qr-scanner";
import React from "react";
import TableGuest from "./table";

export default function Page() {
  return (
    <>
      <Scanner onScan={(result) => console.log(result)} />
      <TableGuest />
    </>
  );
}
