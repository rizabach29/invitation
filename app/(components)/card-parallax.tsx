"use client";
import Image from "next/image";
import styles from "./style.module.scss";
import Mercure from "@/app/public/mercure.webp";
import { MotionValue, useTransform, motion } from "framer-motion";
import { paragraph } from "../font";

type Props = {
  title: string;
  description: string[];
  src?: string;
  color: string;
  i: number;
  progress: MotionValue<number>;
  range: number[];
  targetScale: number;
};

const CardParallax = ({
  title,
  description,
  src,
  i,
  progress,
  range,
  targetScale,
}: Props) => {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="rounded sticky top-0 h-screen flex flex-col items-center justify-center">
      <motion.div
        style={{
          // top: `calc(-5vh + ${i * 80}px)`,
          scale,
        }}
        className="rounded relative flex"
      >
        {/* <div className="relative rounded">
          <div className="h-32 overflow-clip">
            <Image
              src={Mercure}
              fill
              className="object-cover rounded-t grayscale"
              alt="img"
            />
          </div>
        </div> */}
        <h2
          className={`${paragraph.className} transform w-[7rem] top-48 absolute -rotate-90 text-[10rem] font-black tracking-tight text-right m-0 p-0 mix-blend-difference text-black/10`}
        >
          {title}
        </h2>
        <div className={`py-8 pl-24`}>
          <div
            className={`${(styles.description, paragraph.className)} p-8 px-16`}
          >
            {description.map((text, index) => (
              <p
                key={index}
                className="text-base md:text-lg lg:text-xl leading-relaxed pb-4 indent-8"
              >
                {text}
              </p>
            ))}
          </div>

          {src && (
            <div className={styles.imageContainer}>
              <div className={styles.inner}>
                <Image fill src={`/images/${src}`} alt="image" />
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default CardParallax;
