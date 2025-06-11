"use client";

import React from "react";
import TableGuest from "./table";
import ButtonScan from "./button-scan";

export default function Page() {
  return (
    <>
      {/* <Scanner onScan={(result) => console.log(result)} /> */}
      <TableGuest />
      <ButtonScan />
    </>
  );
}
