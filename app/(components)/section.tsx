import React from "react";

function Section({
  children,
  id,
}: Readonly<{
  children: React.ReactNode;
  id?: string;
}>) {
  return (
    <section id={id} className="min-h-[150vh]">
      {children}
    </section>
  );
}

export default Section;
