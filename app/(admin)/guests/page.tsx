"use client";

import React from "react";
import TableGuest from "./table";
import Logo from "@/app/sources/Logo";

export default function Page() {
  return (
    <>
      <div className="flex items-center justify-center w-full">
        <div className="w-auto py-4">
          <Logo color="#000000" />
        </div>
      </div>
      <TableGuest />
    </>
  );
}
