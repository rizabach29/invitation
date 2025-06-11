import React, { useRef } from "react";
import { motion, MotionValue } from "framer-motion";
import { paragraph } from "../font";
import Riza from "../sources/illustration/Riza";
import Dinnar from "../sources/illustration/Dinnar";

type ItemType = {
  type: string;
  name: string;
  image: React.ReactNode;
  father: string;
  mother: string;
};

function Bride({}: { scrollParentYProgress: MotionValue<number> }) {
  const ref = useRef<HTMLDivElement>(null);

  const data: ItemType[] = [
    {
      type: "Mempelai Wanita",
      name: "Dinnar Fatih Rahmatika Prasetya, S.E.",
      image: <Dinnar style={{ scale: 0.9 }} />,
      father: "Andik Prasetyanto, S.E.",
      mother: "Setyo Murti Ningsih, S.H.",
    },
    {
      type: "Mempelai Pria",
      name: "Muhammad Riza Bachtiar, S.Tr.Kom.",
      image: <Riza style={{ scale: 0.9 }} />,
      father: "Muhammad Bachtiar, S.T.",
      mother: "Dijah Lely Kartikarini, A.Md.",
    },
  ];

  return (
    <motion.div ref={ref}>
      <div className="w-full flex items-center bg-[#BB543B] overflow-clip">
        <motion.div className="w-full h-full">
          {data.map((item, i) => (
            <>
              <Slide key={i} {...item} />
            </>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

function Slide(item: ItemType) {
  return (
    <div className={`w-full h-screen flex items-center overflow-clip relative`}>
      <motion.div
        className="absolute bottom-24"
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          delay: 1.5,
          type: "spring",
        }}
        whileInView={{ right: "-5rem", rotate: -30 }}
        initial={{ right: "-9rem" }}
      >
        {item.image}
      </motion.div>
      <div className="flex flex-col justify-center p-8 w-full">
        <p className="uppercase tracking-[1.2rem] text-white text-xs md:text-sm">
          {item.type}
        </p>
        <h1
          className={`text-2xl lg:text-6xl text-white mt-2 ${paragraph.className}`}
        >
          {item.name}
        </h1>
        <p className="mt-4 lg:mt-8 text-white tracking-[1.2rem] text-xs md:text-sm">
          PUTRA DARI
        </p>
        <h3
          className={`text-lg lg:text-3xl  text-white font-light ${paragraph.className}`}
        >
          {item.father}
        </h3>
        <h3
          className={`text-lg lg:text-3xl text-white font-light ${paragraph.className}`}
        >
          {item.mother}
        </h3>
      </div>
    </div>
  );
}

export default Bride;
