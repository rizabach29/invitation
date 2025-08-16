import React from "react";
import { paragraph } from "../font";
import { motion } from "framer-motion";

function Dresscode() {
  const colors = ["#fefdfc", "#f0ddad", "#c29b73", "#822611", "#7e5230"];

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
      <div className=" -bottom-5">
        <p
          className={`text-black/5 text-[5rem] p-0 m-0 leading-none font-black ${paragraph.className}`}
        >
          Dresscode
        </p>
      </div>{" "}
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
              className="inline-block mr-2 w-20 h-20 rounded-full relative border-4 border-red-900"
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
