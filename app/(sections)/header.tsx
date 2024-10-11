"use client";

import React, { useRef } from "react";
import * as motion from "framer-motion/client";
import { useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { heading, paragraph } from "../font";

const DURATION = 0.5;
const STAGGER = 0.025;

function Header() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scaleTemplate = useMotionTemplate`scale-${scale}`;

  return (
    <div
      ref={containerRef}
      className="sticky top-4 flex flex-row justify-between items-start px-8"
    >
      <motion.div className={`border-t-2 pt-4 ${scaleTemplate}`}>
        <p
          className={`${paragraph.className}font-thin text-2xl mix-blend-hard-light left-0`}
        >
          12
        </p>
        <p
          className={`${paragraph.className}font-thin text-2xl mix-blend-hard-light left-0`}
        >
          AUG
        </p>
        <p
          className={`${paragraph.className}font-thin text-2xl mix-blend-hard-light left-0`}
        >
          25
        </p>
      </motion.div>
      <motion.div className={`flex flex-col items-end ${scaleTemplate}`}>
        <div className="relative overflow-hidden">
          <motion.h1
            initial="initial"
            animate="hovered"
            className="text-8xl font-black block right-0"
          >
            {"Jane".split("").map((l, i) => (
              <motion.div
                variants={{
                  initial: {
                    y: "-100%",
                  },
                  hovered: {
                    y: 0,
                  },
                }}
                transition={{
                  duration: DURATION,
                  ease: "easeInOut",
                  delay: STAGGER * i,
                }}
                className={`${heading.className} inline-block mix-blend-hard-light p-0`}
                key={i}
              >
                {l}
              </motion.div>
            ))}
          </motion.h1>
        </div>
        <div className="relative overflow-hidden">
          <motion.h1
            initial="initial"
            animate="hovered"
            className="text-8xl font-black block"
          >
            {"Jhon".split("").map((l, i) => (
              <motion.div
                variants={{
                  initial: {
                    y: "100%",
                  },
                  hovered: {
                    y: 0,
                  },
                }}
                transition={{
                  duration: DURATION,
                  ease: "easeInOut",
                  delay: STAGGER * i,
                }}
                className={`${heading.className} inline-block mix-blend-hard-light p-0`}
                key={i}
              >
                {l}
              </motion.div>
            ))}
          </motion.h1>
        </div>
      </motion.div>
    </div>
  );
}

export default Header;
