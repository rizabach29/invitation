import { MotionValue } from "framer-motion";
import React, { useEffect, useRef } from "react";

function Wave({
  scrollYProgress,
  text,
}: {
  scrollYProgress: MotionValue<number>;
  text: string;
}) {
  const paths = useRef<(SVGTextPathElement | null)[]>([]);

  useEffect(() => {
    scrollYProgress.on("change", (e) => {
      console.log("e", e);
      paths.current.forEach((path, i) => {
        path?.setAttribute("startOffset", -50 + i * 50 + e * 50 + "%");
      });
    });
  }, []);

  return (
    <div className="w-full h-auto">
      <svg className="w-full mb-40" viewBox="0 0 250 90">
        <path
          fill="none"
          id="curve"
          d="m0,88.5c61.37,0,61.5-68,126.5-68,58,0,51,68,123,68"
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
                href="#curve"
              >
                {item}
              </textPath>
            );
          })}
        </text>
      </svg>
    </div>
  );
}

export default Wave;
