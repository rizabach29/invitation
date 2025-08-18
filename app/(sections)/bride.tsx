import React, { useRef } from "react";
import { motion, MotionValue, useInView } from "framer-motion";
import { paragraph } from "../font";
import Riza from "../sources/illustration/Riza";
import Dinnar from "../sources/illustration/Dinnar";

type ItemType = {
  type: string;
  name: string;
  child: string;
  father: string;
  mother: string;
};

function Bride({}: { scrollParentYProgress: MotionValue<number> }) {
  const ref = useRef<HTMLDivElement>(null);

  const data: ItemType[] = [
    {
      type: "Mempelai Wanita",
      name: "Dinnar Fatih Rahmatika Prasetya",
      child: "Putri dari",
      father: "Andik Prasetyanto",
      mother: "Setyo Murti Ningsih",
    },
    {
      type: "Mempelai Pria",
      name: "Muhammad Riza Bachtiar",
      child: "Putra dari",
      father: "Muhammad Bachtiar",
      mother: "Dijah Lely Kartikarini",
    },
  ];

  return (
    <motion.div className="flex justify-center">
      <div className="w-full flex items-center overflow-clip max-w-xl">
        <motion.div className="w-full h-full">
          <Slide {...data[0]} />
          <div
            className="flex relative overflow-x-clip justify-center items-center h-[35vh] my-20"
            ref={ref}
          >
            <motion.div
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                delay: 1,
                type: "spring",
                once: true,
              }}
              className="top-0"
              whileInView={{ rotate: 40, x: "-100%" }}
              initial={{ rotate: 0, x: "-100%" }}
            >
              <Dinnar style={{ scale: 1 }} />
            </motion.div>
            <svg
              width="433"
              height="216"
              viewBox="0 0 433 216"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 w-full h-full text-center text-amber-50"
            >
              <motion.path
                d="M213.75 23.0302C221.18 22.5402 225.46 28.2702 223.7 35.3702C222.27 41.1502 216.55 46.1302 211.95 49.5202C210.14 50.8602 204.35 55.0902 202.4 55.1002C198.97 55.1102 192.15 49.4202 189.56 47.0602C185.45 43.3002 179.77 37.0502 180.7 31.0102C180.88 29.8302 182.22 28.5502 183.27 28.0602C188.96 25.4002 193.92 30.6802 198.28 33.4802C202.39 28.7202 206.99 23.4702 213.74 23.0302H213.75Z"
                fill="#F4D9AA"
                initial={{ scale: 1.5 }}
                animate={{ scale: 2.3 }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            </svg>
            <motion.div
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                delay: 1,
                type: "spring",
                once: true,
              }}
              className="top-0 mt-2"
              whileInView={{ rotate: -40, x: "100%" }}
              initial={{ rotate: 0, x: "100%" }}
            >
              <Riza style={{ scale: 0.9 }} />
            </motion.div>
          </div>
          <div className="text-right">
            <Slide {...data[1]} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function Slide(item: ItemType) {
  const body = useRef(null);
  const isInView = useInView(body, { margin: "-20%", once: true });

  const animation = {
    initial: { y: "100%" },
    enter: (i: number) => ({
      y: "0",
      transition: {
        duration: 0.75,
        ease: [0.33, 1, 0.68, 1],
        delay: 0.075 * i,
      },
    }),
  };

  return (
    <div
      className={`w-full flex items-center overflow-clip relative px-12`}
      ref={body}
    >
      <div className="flex flex-col justify-center p-8 w-full">
        <span className="overflow-y-hidden">
          <motion.p
            custom={0}
            variants={animation}
            initial="initial"
            animate={isInView ? "enter" : ""}
            className="uppercase tracking-[0.8rem] text-white text-xs"
          >
            {item.type}
          </motion.p>
        </span>
        <span className="overflow-y-hidden">
          <motion.h1
            custom={1}
            variants={animation}
            initial="initial"
            animate={isInView ? "enter" : ""}
            className={`text-5xl text-white mt-2 ${paragraph.className}`}
          >
            {item.name}
          </motion.h1>
        </span>
        <span className="overflow-y-hidden">
          <motion.p
            custom={2}
            variants={animation}
            initial="initial"
            animate={isInView ? "enter" : ""}
            className="mt-4 lg:mt-8 text-white tracking-[0.8rem] text-xs uppercase"
          >
            {item.child}
          </motion.p>
        </span>
        <span className="overflow-y-hidden">
          <motion.h3
            custom={3}
            variants={animation}
            initial="initial"
            animate={isInView ? "enter" : ""}
            className={`text-lg lg:text-3xl  text-white font-light ${paragraph.className}`}
          >
            {item.father}
          </motion.h3>
        </span>
        <span className="overflow-y-hidden">
          <motion.h3
            custom={4}
            variants={animation}
            initial="initial"
            animate={isInView ? "enter" : ""}
            className={`text-lg lg:text-3xl text-white font-light ${paragraph.className}`}
          >
            {item.mother}
          </motion.h3>
        </span>
      </div>
    </div>
  );
}

export default Bride;
