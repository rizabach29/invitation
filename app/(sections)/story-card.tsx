import React from "react";
import { heading, paragraph } from "../font";
import { motion } from "framer-motion";
import SdImage from "@/app/public/sd_2.png";
import PsTuri from "@/app/public/psturi-resize.jpeg";
import Lamaran from "@/app/public/lamaran-resize.jpeg";
import Image from "next/image";

const stories = [
  {
    title: "2009",
    description: [
      "Pertama kali dipertemukan di kelas 4B SD Muhammadiyah 4 Surabaya. ",
      "Teman sekelas dan teman les yang bersaing untuk mendapatkan ranking 1, yang berebut perhatian guru dengan olokan lucu.",
      "Teman sekelas yang diam-diam saling naksir dibalik cibiran dan keusilan, cinta monyet yang membekas hingga bertahun-tahun kemudian.",
    ],
    color: "#fef3c7",
    image: SdImage,
  },
  {
    title: "2022",
    description: [
      "Selepas SD, tidak pernah bertemu dan tidak ada kontak antara keduanya. Dipisahkan sekolah, universitas, dan domisili yang berbeda. ",
      "Hingga suatu hari, Riza mengucapkan selamat wisuda kepada Dinnar melalui reply story instagram yang selanjutnya menjadi awal kisah berdua. ",
      "Dua minggu sejak pertemuan pertama setelah lebih dari 10 tahun, pada 1 Oktober 2022 Dinnar dan Riza memutuskan untuk menjalin hubungan. ",
    ],
    color: "#fde68a",
    image: PsTuri,
  },
  {
    title: "2025",
    description: [
      "Walaupun sempat dipisahkan jarak 782 km selama 1 tahun, hubungan terus bertumbuh dan merekah. Kasih sayang dan ketulusan yang semakin menguat. ",
      "Pada 6 April 2025, diiringi restu orang tua, Riza melamar Dinnar di hadapan keluarga dengan suasana hangat dan khidmat. ",
      "Dengan ridho-Nya, memulai perjalanan teman kecil yang menjadi teman hidup selamanya. ",
    ],
    color: "#fef3c7",
    image: Lamaran,
  },
];

function StoryCard() {
  return (
    <div className="min-h-[240vh]">
      {stories.map((story, index) => (
        <motion.div
          className={`${paragraph.className} sticky top-4 min-h-[80vh] h-full py-2 px-12 rounded-tr-3xl rounded-b-3xl rounded-tl-[100px]`}
          key={index}
          style={{
            backgroundColor: story.color,
            top: `calc(5vh + ${index * 60}px)`,
          }}
        >
          <h2
            className={`text-6xl w-full text-right tracking-widest text-lime-900 ${heading.className}`}
          >
            {story.title}
          </h2>
          <div className="flex items-center justify-center">
            <motion.ul
              className="h-full mt-8 max-w-md"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {story.description.map((desc, i) => (
                <p key={i} className="mb-2 indent-8 text-sm text-lime-900">
                  {desc}
                </p>
              ))}
            </motion.ul>
          </div>
          <motion.div
            className="mt-8 pb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <Image
              key={index}
              src={story.image}
              alt={story.title}
              width={2000}
              className={`w-full h-64 rounded-2xl object-cover transition-transform duration-300 grayscale`}
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

export default StoryCard;
