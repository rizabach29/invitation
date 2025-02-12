import React from "react";
import { heading } from "../font";

function Footer() {
  return (
    <div
      className="relative h-screen"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed bottom-0 h-screen w-full bg-stone-200 flex flex-col justify-end p-4">
        <h3 className={`${heading.className} text-9xl font-black`}>Footer</h3>
      </div>
    </div>
  );
}

export default Footer;
