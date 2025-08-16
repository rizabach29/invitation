import React, { useRef } from "react";
import LogoType from "../sources/illustration/LogoType";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import { paragraph } from "../font";
import Guest from "./guest";
import { Database } from "../type";

function Bumper({
  guest,
}: {
  guest: Database["public"]["Tables"]["guests"]["Row"] | null;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scrollYProgressSpring = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
  });
  const scale = useTransform(scrollYProgressSpring, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgressSpring, [0, 0.3], [0, 1]);

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
    <div
      ref={ref}
      className="w-full h-[200vh] bg-[#BB543B] overflow-clip relative"
    >
      <motion.div className="top-0 sticky h-screen w-full flex flex-col items-center justify-center">
        <div className="w-full max-w-xs flex flex-col items-center justify-center relative">
          <div
            className={`text-left flex w-full tracking-[0.5rem] text-amber-50 ${paragraph.className}`}
          >
            {"DINNAR".split("").map((char, index) => (
              <div key={index} className="overflow-hidden">
                <motion.div
                  variants={animation}
                  custom={index}
                  animate="visible"
                  initial="initial"
                  transition={{
                    delay: index * 1.5,
                    duration: 2,
                  }}
                  className="relative"
                >
                  {char}
                </motion.div>
              </div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <LogoType reverseColor style={{ scale: 0.8 }} />
          </motion.div>
          <div
            className={`text-right flex justify-end w-full tracking-[0.5rem] text-amber-50 ${paragraph.className}`}
          >
            {"RIZA".split("").map((char, index) => (
              <div key={index} className="overflow-hidden">
                <motion.div
                  variants={animation}
                  custom={index}
                  animate="visible"
                  initial="initial"
                  transition={{
                    delay: index * 1.5,
                    duration: 2,
                  }}
                  className="relative"
                >
                  {char}
                </motion.div>
              </div>
            ))}
          </div>
          <div
            className={`text-amber-50 flex flex-col justify-between text-left w-full text-3xl ${paragraph.className}`}
          >
            <span className="overflow-hidden">
              <motion.p
                initial={{
                  x: "-50%",
                }}
                whileInView={{ x: 0 }}
                transition={{
                  duration: 1,
                }}
              >
                21
              </motion.p>
            </span>
            <span className="overflow-hidden">
              <motion.p
                initial={{
                  x: "-50%",
                }}
                whileInView={{ x: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.15,
                }}
              >
                SEP
              </motion.p>
            </span>
            <span className="overflow-hidden">
              <motion.p
                initial={{
                  x: "-50%",
                }}
                whileInView={{ x: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.25,
                }}
              >
                25
              </motion.p>
            </span>
          </div>
        </div>
        <div className="flex w-full">
          <motion.div
            className="absolute w-full flex items-center justify-center my-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <div className="flex justify-center items-center">
              {/* Mouse outline */}
              <div className="relative w-8 h-14 border-4 border-white rounded-full flex justify-center">
                {/* Animated dot */}
                <motion.span
                  className="absolute w-2 h-2 bg-white rounded-full"
                  initial={{ y: 0 }}
                  animate={{ y: [0, 16, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </div>
          </motion.div>
          <div className="w-full flex justify-center items-center">
            <Guest guest={guest} />
          </div>
        </div>
      </motion.div>
      <div className="sticky bottom-0 h-screen flex items-center justify-center inset-0">
        <svg
          width="433"
          height="216"
          viewBox="0 0 433 216"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-screen w-full max-w-2xl  text-center"
        >
          <motion.path
            d="M213.75 23.0302C221.18 22.5402 225.46 28.2702 223.7 35.3702C222.27 41.1502 216.55 46.1302 211.95 49.5202C210.14 50.8602 204.35 55.0902 202.4 55.1002C198.97 55.1102 192.15 49.4202 189.56 47.0602C185.45 43.3002 179.77 37.0502 180.7 31.0102C180.88 29.8302 182.22 28.5502 183.27 28.0602C188.96 25.4002 193.92 30.6802 198.28 33.4802C202.39 28.7202 206.99 23.4702 213.74 23.0302H213.75Z"
            fill="#FFFBEB"
            style={{ scale, opacity }}
            initial={{ scale: 0, opacity: 0 }}
            transition={{
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </svg>
      </div>
    </div>
  );
}

export default Bumper;
