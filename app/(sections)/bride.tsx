import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function Bride() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-100%"]);

  return (
    <div ref={ref} className="h-[1000vh]">
      <motion.div
        style={{ x }}
        className="sticky top-0 left-0 w-full h-screen bg-red-500 flex items-center justify-center"
      >
        {[...Array(10)].map((_, i) => (
          <div key={i} className="text-8xl font-bold text-white min-w-[100vw]">
            {i + 1}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default Bride;
