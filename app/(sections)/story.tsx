import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";
import { motion } from "framer-motion";
import Image from "next/image";
import Mercure from "@/app/public/mercure.webp";

type TStory = {
  title: string;
  description: string[];
  color: string;
};

const stories = [
  {
    title: "2009",
    description: [
      "Pertama kali dipertemukan di kelas 4B SD Muhammadiyah 4 Surabaya. ",
      "Teman sekelas dan teman les yang bersaing untuk mendapatkan ranking 1, yang berebut perhatian guru dengan olokan lucu.",
      "Teman sekelas yang diam-diam saling naksir dibalik cibiran dan keusilan, cinta monyet yang membekas hingga bertahun-tahun kemudian.",
    ],
    color: "#fef3c7",
  },
  {
    title: "2022",
    description: [
      "Selepas SD, tidak pernah bertemu dan tidak ada kontak antara keduanya. Dipisahkan sekolah, universitas, dan domisili yang berbeda. ",
      "Hingga suatu hari, Riza mengucapkan selamat wisuda kepada Dinnar melalui reply story instagram yang selanjutnya menjadi awal kisah berdua. ",
      "Dua minggu sejak pertemuan pertama setelah lebih dari 10 tahun, pada 1 Oktober 2022 Dinnar dan Riza memutuskan untuk menjalin hubungan. ",
    ],
    color: "#fde68a",
  },
  {
    title: "2025",
    description: [
      "Walaupun sempat dipisahkan jarak 782 km selama 1 tahun, hubungan terus bertumbuh dan merekah. Kasih sayang dan ketulusan yang semakin menguat. ",
      "Pada 6 April 2025, diiringi restu orang tua, Riza melamar Dinnar di hadapan keluarga dengan suasana hangat dan khidmat. ",
      "Dengan ridho-Nya, memulai perjalanan teman kecil yang menjadi teman hidup selamanya. ",
    ],
    color: "#fcd34d",
  },
];

function HeaderStory(item: {
  story: TStory;
  index: number;
  currIndex: number;
}) {
  const descVariants = {
    hidden: { y: "100%" },
    visible: () => ({
      y: 0,
      transition: {
        duration: 0.75,
        ease: [0.33, 1, 0.68, 1],
        delay: 0.075,
      },
    }),
  };

  return (
    <div className="px-8 absolute">
      <div key={item.index} className="overflow-hidden">
        <motion.h4
          key={item.index}
          initial="hidden"
          className="text-[10rem] w-full font-bold -rotate-90 text-black/5"
          animate={item.currIndex === item.index ? "visible" : "hidden"}
          variants={descVariants}
        >
          {item.story.title}
        </motion.h4>
      </div>
    </div>
  );
}

function DescStory(item: { story: TStory; index: number; currIndex: number }) {
  const descVariants = {
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
    <motion.div className="px-8 absolute">
      {item.story.description.map((desc, index) => (
        <div key={index} className="overflow-hidden">
          <motion.p
            variants={descVariants}
            initial="hidden"
            custom={index}
            animate={item.currIndex == item.index ? "visible" : "hidden"}
            className="text-base md:text-lg lg:text-xl pb-4 indent-8 relative"
          >
            {desc}
          </motion.p>
        </div>
      ))}
    </motion.div>
  );
}

function Story() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["110%", "-100%"]); // Adjust as needed

  const currIndex = useTransform(scrollYProgress, (v) => {
    if (v <= 0.35) return 0;
    if (v <= 0.65) return 1;
    return 2;
  });

  const [currIndexVal, setCurrIndexVal] = useState(0);

  useEffect(() => {
    const unsub = currIndex.on("change", (val) => setCurrIndexVal(val));
    return () => unsub();
  }, [currIndex]);

  return (
    <div ref={container} className="w-full h-[300vh] flex jusitfy-center">
      <div className="h-screen sticky top-0 w-full pt-32 overflow-x-clip">
        <div className="px-8">
          {stories.map((story, index) => (
            <>
              <HeaderStory
                story={story}
                index={index}
                currIndex={currIndexVal}
              />
            </>
          ))}
        </div>
        <div className="px-8">
          {stories.map((story, index) => (
            <>
              <DescStory story={story} index={index} currIndex={currIndexVal} />
            </>
          ))}
        </div>
        <motion.div
          className="flex items-center justify-center h-full gap-10 pt-48"
          style={{ x }}
        >
          {[0, 1, 2].map((index) => (
            <Image
              key={index}
              src={Mercure}
              alt={stories[index].title}
              width={96}
              className={`w-96 h-56 object-cover rounded-tr-3xl rounded-tl-md rounded-bl-3xl rounded-br-md transition-transform duration-300 grayscale`}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Story;
