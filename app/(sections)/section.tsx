import React from "react";

function Section({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section className="min-h-[75vh]">{children}</section>;
}

export default Section;
