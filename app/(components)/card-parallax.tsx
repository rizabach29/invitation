"use client";
import Image from "next/image";
import styles from "./style.module.scss";
import Mercure from "@/app/public/mercure.webp";
import { MotionValue, useTransform, motion } from "framer-motion";
import { paragraph } from "../font";

type Props = {
  title: string;
  description: string;
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
  color,
  i,
  progress,
  range,
  targetScale,
}: Props) => {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className={styles.cardContainer}>
      <motion.div
        className={styles.card}
        style={{
          backgroundColor: color,
          top: `calc(-5vh + ${i * 80}px)`,
          scale,
        }}
      >
        <div className="relative rounded">
          <div className="h-52 overflow-clip">
            <Image
              src={Mercure}
              fill
              className="object-cover rounded-t-2xl grayscale"
              alt="img"
            />
          </div>
        </div>
        <h2 className="font-bold text-9xl m-0 p-0 absolute mix-blend-difference text-white">
          {title}
        </h2>
        <div className={`py-8`}>
          <div
            className={`${
              (styles.description, paragraph.className)
            } p-4 lg:p-8`}
          >
            <p className="text-xl leading-relaxed">{description}</p>
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
