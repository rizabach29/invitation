"use client";

import { MotionValue } from "framer-motion";
import React, { useRef } from "react";
import { motion } from "framer-motion";

function Circle({
  //   scrollYProgress,
  text,
}: {
  scrollYProgress: MotionValue<number>;
  text: string;
}) {
  const paths = useRef<(SVGTextPathElement | null)[]>([]);

  //   useEffect(() => {
  //     scrollYProgress.on("change", (e) => {
  //       paths.current.forEach((path, i) => {
  //         path?.setAttribute("startOffset", i * 20 + e * 40 + "%");
  //       });
  //     });
  //   }, []);

  return (
    <div className="left-0 w-full h-auto flex items-center justify-center relative scale-50">
      <motion.svg
        viewBox="0 0 500 500"
        animate={{
          rotate: 360,
          transition: { repeat: Infinity, ease: "linear", duration: 10 },
        }}
        className={"absolute w-full h-auto pt-16 pb-10 px-20"}
      >
        {/* love path */}
        <path
          id="love"
          d="M140 20C73 20 20 74 20 140c0 135 136 170 228 303 88-132 229-173 229-303 0-66-54-120-120-120-48 0-90 28-109 69-19-41-60-69-108-69z"
          fill="red"
          stroke="red"
        />
      </motion.svg>
      <motion.svg
        viewBox="0 0 100 100"
        animate={{
          rotate: 360,
          transition: { repeat: Infinity, ease: "linear", duration: 10 },
        }}
        className="w-full bg-transparent"
      >
        <path
          id="circle"
          d="M 10, 50 a 40,40 0 1,1 80,0 40,40 0 1,1 -80,0"
          fill="none"
        />

        <text className="text-[6px] uppercase" style={{ fill: "red" }}>
          {text.split(".").map((item, i) => {
            return (
              <textPath
                key={i}
                ref={(ref) => {
                  paths.current[i] = ref;
                }}
                startOffset={i * 50 + "%"}
                href="#circle"
              >
                {item}
              </textPath>
            );
          })}
        </text>
      </motion.svg>
    </div>
  );
}

export default Circle;
