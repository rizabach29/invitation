import React, { useRef } from "react";
import CardParallax from "../(components)/card-parallax";
import { useScroll } from "framer-motion";

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

function Story() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={container}
      className="w-full h-full flex flex-col items-center jusitfy-center"
    >
      {stories.map((story, i) => {
        const targetScale = 1 - (stories.length - i) * 0.05;
        return (
          <CardParallax
            {...story}
            i={i}
            key={i}
            targetScale={targetScale}
            range={[i * 0.25, 1]}
            progress={scrollYProgress}
          />
        );
      })}
    </div>
  );
}

export default Story;
