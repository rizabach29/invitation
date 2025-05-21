"use client";

import React from "react";
import { motion, MotionValue } from "framer-motion";
import { heading } from "../font";
import Logo from "../sources/Logo";
import { PRIMARY_COLOR } from "../utils";

function Header({
  scrollParentYProgress,
}: {
  scrollParentYProgress: MotionValue<number>;
}) {
  return (
    <div className="relative w-full overflow-x-clip">
      <div className="opacity-10">
        <Logo color={PRIMARY_COLOR} scale={60} />
      </div>
      <motion.div
        style={{ y: scrollParentYProgress }}
        className={`flex w-full h-[75vh] flex-col justify-center items-center pb-4 pr-4 sticky top-0 z-10 text-[${PRIMARY_COLOR}] pb-12`}
      >
        <motion.h1
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 2, duration: 1.5, type: "spring" }}
          className={`text-8xl ${heading.className} font-medium text-center`}
        >
          Dinnar <br />
          Riza
        </motion.h1>
      </motion.div>
    </div>
  );
}

export default Header;
