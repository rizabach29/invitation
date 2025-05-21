"use client";

import React from "react";
import { MotionValue } from "framer-motion";

function Detail({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  console.log(scrollYProgress);
  return (
    <div className="relative w-full">
      {/* <Image
        alt="mercure"
        src={MercureImage}
        className="grayscale w-full h-auto absolute"
      /> */}
      <div className="z-10 relative overflow-hidden">
        {/* <h3 className={`${heading.className} text-8xl font-black`}>Detail</h3> */}
        {/* <div className="absolute -top-20 -right-40">
          <Circle
            scrollYProgress={scrollYProgress}
            text="Dinnar Fatih Rahmatika Prasetya. Muhammad Riza Bachtiar."
          />
        </div>
        <Wave
          scrollYProgress={scrollYProgress}
          text="Dinnar Fatih Rahmatika Prasetya. Muhammad Riza Bachtiar."
        /> */}
      </div>
    </div>
  );
}

export default Detail;
