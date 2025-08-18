import React from "react";
import { paragraph } from "../font";
import { motion } from "framer-motion";

function Dresscode() {
  const colors = ["#FFFEFE", "#C3A87F", "#BC543B", "#6A2C0F", "#8F1910"];

  const animation = {
    initial: { y: "100%" },
    visible: (i: number) => ({
      y: "0",
      transition: {
        duration: 0.75,
        ease: [0.33, 1, 0.68, 1],
        delay: 0.075 * i,
      },
    }),
  };

  return (
    <div className="relative w-full h-full ">
      <div className="-bottom-5">
        <p
          className={`text-[#BB543B] text-[3rem] p-0 m-0 pl-8 leading-none font-black ${paragraph.className}`}
        >
          Tema Busana
        </p>
      </div>
      <div className="mb-8">
        <p
          className={`text-[#BB543B] text-[1rem] p-0 m-0 ml-12 leading-none font-black ${paragraph.className}`}
        >
          Warna Bumi
        </p>
      </div>
      <ul className="list-none pl-5 flex gap-2 justify-center items-center">
        {colors.map((color, index) => (
          <div key={index} className="overflow-hidden">
            <motion.span
              variants={animation}
              initial="initial"
              whileInView="visible"
              custom={index}
              transition={{
                delay: index * 4,
                duration: 2,
              }}
              className="inline-block mr-2 w-12 h-12 rounded-full relative border-[.5px] border-red-900"
              key={index}
              style={{ backgroundColor: color }}
            ></motion.span>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Dresscode;
