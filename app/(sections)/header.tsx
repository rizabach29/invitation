"use client";

import React, { useRef } from "react";
import {
  motion,
  MotionValue,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { paragraph, script } from "../font";
import { PRIMARY_COLOR } from "../utils";
import Couple from "../sources/illustration/Couple";

function Header({}: { scrollParentYProgress: MotionValue<number> }) {
  const target = useRef<HTMLDivElement>(null);
  const isInView = useInView(target, { margin: "-60%", once: true });

  const { scrollYProgress } = useScroll({
    target,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -420]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -395]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -355]);

  return (
    <div className=" overflow-clip w-full h-[100vh] sticky top-0" ref={target}>
      {/* <div className="absolute flex justify-center items-center w-full mt-6 opacity-5">
        <LogoType style={{ scale: 6.5 }} />
      </div> */}
      <div
        className="flex flex-col w-full h-screen sticky top-0 items-center justify-center pb-24"
        style={{ scale: 0.85 }}
      >
        <motion.div
          style={{ y: y }}
          variants={{ init: { scale: 0.85 }, animate: { scale: 0.85 } }}
          initial="init"
          animate={isInView ? "animate" : "init"}
          transition={{
            duration: 1.5,
            type: "spring",
            delay: 0.7,
            stiffness: 200,
            damping: 5,
            bounce: 0.5,
          }}
        >
          <Couple />
        </motion.div>
        <motion.div className="overflow-y-clip" style={{ y: y2 }}>
          <motion.h3
            animate={isInView ? "animate" : "init"}
            variants={{
              init: { y: 0 },
              animate: { y: 0 },
            }}
            transition={{ duration: 1.5, type: "spring", delay: 1 }}
            className={`text-6xl tracking-tight text-[#BB543B] font-medium text-center ${paragraph.className} text-[${PRIMARY_COLOR}]`}
          >
            Pernikahan
          </motion.h3>
        </motion.div>
        <motion.div className="overflow-y-clip pb-6" style={{ y: y3 }}>
          <div className="flex gap-3">
            <motion.h3
              animate={isInView ? "animate" : "init"}
              variants={{
                init: { y: 0 },
                animate: { y: 0 },
              }}
              transition={{ duration: 1.5, type: "spring", delay: 1 }}
              className={`text-6xl tracking-tight text-[#BB543B] font-medium text-center ${script.className} text-[${PRIMARY_COLOR}]`}
            >
              Dinnar
            </motion.h3>
            <motion.h3
              animate={isInView ? "animate" : "init"}
              variants={{
                init: { y: 0 },
                animate: { y: 0 },
              }}
              transition={{ duration: 1.5, type: "spring", delay: 1 }}
              className={`text-6xl tracking-tight text-[#BB543B] font-medium text-center ${paragraph.className} text-[${PRIMARY_COLOR}]`}
            >
              &
            </motion.h3>
            <motion.h3
              animate={isInView ? "animate" : "init"}
              variants={{
                init: { y: 0 },
                animate: { y: 0 },
              }}
              transition={{ duration: 1.5, type: "spring", delay: 1 }}
              className={`text-6xl tracking-tight text-[#BB543B] font-medium text-center ${script.className} text-[${PRIMARY_COLOR}]`}
            >
              Riza
            </motion.h3>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Header;
