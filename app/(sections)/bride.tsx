import React, { useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { PRIMARY_COLOR } from "../utils";
import RizaKecil from "@/app/public/rizakecil.jpeg";
import Image, { StaticImageData } from "next/image";
import { heading, paragraph } from "../font";

type ItemType = {
  type: string;
  name: string;
  image: StaticImageData;
  father: string;
  mother: string;
};

function Bride({
  scrollParentYProgress,
}: {
  scrollParentYProgress: MotionValue<number>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
  });

  console.log(scrollParentYProgress);
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  const data: ItemType[] = [
    {
      type: "Mempelai Wanita",
      name: "Dinnar Fatih Rahmatika Prasetya, S.E.",
      image: RizaKecil,
      father: "Andik Prasetyanto, S.E.",
      mother: "Setyo Murti Ningsih, S.H.",
    },
    {
      type: "Mempelai Pria",
      name: "Muhammad Riza Bachtiar, S.Tr.Kom.",
      image: RizaKecil,
      father: "Muhammad Bachtiar, S.T.",
      mother: "Dijah Lely Kartikarini, A.Md.",
    },
  ];

  return (
    <motion.div ref={ref} className="relative h-[800vh] py-[105vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex">
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
    <div
      className={`min-w-[100vw] bg-[${PRIMARY_COLOR}] w-full h-screen md:flex items-center justify-center relative`}
    >
      <div className="w-full">
        <Image
          src={item.image}
          alt="Riza"
          width={900}
          height={1600}
          className="h-full object-contain grayscale"
        />
      </div>
      <div className="flex flex-col justify-center p-8 w-full lg:absolute lg:left-[45vw]">
        <p className="uppercase tracking-[1.2rem] text-white">{item.type}</p>
        <h1
          className={`text-2xl lg:text-6xl font-bold text-white mt-2 ${heading.className}`}
        >
          {item.name}
        </h1>
        <h3
          className={`text-lg lg:text-3xl mt-4 lg:mt-8 text-white ${paragraph.className}`}
        >
          {item.father}
        </h3>
        <h3 className={`text-lg lg:text-3xl text-white ${paragraph.className}`}>
          {item.mother}
        </h3>
      </div>
    </div>
  );
}

export default Bride;
