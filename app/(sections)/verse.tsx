import React from "react";
import GradientScrollText from "../(components)/gradient-scroll-text";
import { motion } from "framer-motion";
import { paragraph } from "../font";

function Verse() {
  return (
    <div className="min-h-[175vh] flex flex-col items-center justify-center">
      <div className="h-auto w-full flex flex-col items-center justify-center pb-24">
        <GradientScrollText paragraph="Mahasuci Allah yang telah menciptakan berpasang-pasangan semua makhluk, baik dari apa yang ditumbuhkan bumi, maupun dari diri mereka sendiri, dan apa yang tidak mereka ketahui." />
        <motion.p
          className={`text-white text-lg ${paragraph.className} mt-8`}
          whileInView={{
            opacity: 1,
          }}
          initial={{ opacity: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Yasin 36
        </motion.p>
      </div>
    </div>
  );
}

export default Verse;
