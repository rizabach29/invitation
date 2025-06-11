import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

function MaskText({ phrases }: { phrases: string[] }) {
  const body = useRef(null);
  const isInView = useInView(body, { once: true, margin: "-75%" });

  const variants = {
    hidden: { y: "100%" },
    visible: (i: number) => ({
      y: 0,
      transition: {
        duration: 0.75,
        ease: [0.33, 1, 0.68, 1],
        delay: i * 0.075,
      },
    }),
  };

  return (
    <motion.div>
      {phrases.map((phrase, index) => {
        return (
          <div key={index}>
            <motion.p
              custom={index}
              variants={variants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {phrase}
            </motion.p>
          </div>
        );
      })}
    </motion.div>
  );
}

export default MaskText;
