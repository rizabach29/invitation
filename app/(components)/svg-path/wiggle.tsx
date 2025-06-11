import React from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";

function Wiggle({}: {
  scrollYParentProgress: MotionValue<number>;
  scale?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref}>
      <svg
        width="1682"
        height="4047"
        viewBox="0 0 1682 4047"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M1 1C239.833 26.1667 690.6 203.6 583 712C448.5 1347.5 1299 323.5 1374.5 625.5C1450 927.5 -155.5 1627.5 356.5 2096C868.5 2564.5 1423 943.5 1428.5 2053C1434 3162.5 -193 2036.5 475 2947C1009.4 3675.4 1502 3983.17 1681.5 4046"
          stroke="#BB543B"
          strokeWidth={50}
          initial={{ pathLength: 0 }}
          style={{ pathLength: progress }}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export default Wiggle;
