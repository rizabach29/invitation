import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

function MaskText({ phrases }: { phrases: string[] }) {
  const body = useRef(null);
  const isInView = useInView(body, { margin: "-75%" });

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
    <span ref={body}>
      {phrases.map((phrase, index) => {
        return (
          <motion.span
            key={index}
            custom={index}
            variants={variants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {phrase}
          </motion.span>
        );
      })}
    </span>
  );
}

export default MaskText;
