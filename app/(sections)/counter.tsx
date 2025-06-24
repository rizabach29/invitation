"use client";

import { useAnimate, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { paragraph } from "../font";
import Image from "next/image";
import Mercure from "@/app/public/mercure.webp";

// NOTE: Change this date to whatever date you want to countdown to :)
const COUNTDOWN_FROM = "2025-09-21";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const ShiftingCountdown = () => {
  const target = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -420]);

  return (
    <div
      className="py-4 relative w-full flex flex-col justify-center overflow-x-clip gap-2 "
      ref={target}
    >
      <div className="absolute -right-5 -bottom-5">
        <p
          className={`text-black/5 text-[12rem] p-0 m-0 leading-none text-right font-black`}
        >
          21
          <br />
          SEP
          <br />
          25
        </p>
      </div>
      <motion.div style={{ y }}>
        <Image
          src={Mercure}
          alt="mercure"
          width={500}
          height={500}
          className="w-full h-[200px] grayscale object-cover object-center rounded-l-full absolute left-48"
        />
      </motion.div>
      <div
        className={`w-full ${paragraph.className} py-24 px-8 text-[#BB543B] `}
      >
        <p className="text-4xl uppercase">Trimurti Resto</p>
        <p className="text-2xl mt-2 font-bold tracking-wider">
          Mercure Surabaya Grand Mirama
        </p>
        <p className="mt-4">
          Jl. Raya Darmo No.68 - 78, DR. Soetomo, <br />
          Kec. Tegalsari, Surabaya, Jawa Timur 60264
        </p>
      </div>
      <div
        className={`w-full ${paragraph.className} pb-24 px-8 text-[#BB543B] flex items-center justify-between gap-4 md:gap-8 lg:gap-12`}
      >
        <div className="text-5xl md:text-7xl">
          <p>21</p>
          <p>Sept</p>
          <p>2025</p>
        </div>
        <div className="text-right">
          <div className="text-7xl md:text-9xl">11.00</div>
          <div className="text-3xl md:text-5xl">Akad</div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 w-full">
        <CountdownItem unit="Day" text="Hari" />
        <CountdownItem unit="Hour" text="Jam" />
        <CountdownItem unit="Minute" text="Menit" />
        <CountdownItem unit="Second" text="Detik" />
      </div>
    </div>
  );
};

const CountdownItem = ({
  unit,
  text,
}: {
  unit: "Day" | "Hour" | "Minute" | "Second";
  text: string;
}) => {
  const { ref, time } = useTimer(unit);

  return (
    <div className="flex flex-col items-center justify-center gap-1 md:h-36 md:gap-2">
      <div className="relative w-full overflow-hidden text-center">
        <span
          ref={ref}
          className={`block text-3xl font-bold text-[#BB543B] md:text-4xl lg:text-6xl xl:text-7xl`}
        >
          {time}
        </span>
      </div>
      <span
        className={`text-lg font-thin text-[#BB543B] md:text-sm lg:text-base`}
      >
        {text}
      </span>
    </div>
  );
};

export default ShiftingCountdown;

// NOTE: Framer motion exit animations can be a bit buggy when repeating
// keys and tabbing between windows. Instead of using them, we've opted here
// to build our own custom hook for handling the entrance and exit animations
const useTimer = (unit: "Day" | "Hour" | "Minute" | "Second") => {
  const [ref, animate] = useAnimate();

  const timeRef = useRef(0);

  const [time, setTime] = useState(0);

  useEffect(() => {
    const res = setInterval(handleCountdown, 1000);

    return () => clearInterval(res);
  }, []);

  const handleCountdown = async () => {
    const end = new Date(COUNTDOWN_FROM);
    const now = new Date();
    const distance = +end - +now;

    let newTime = 0;

    if (unit === "Day") {
      newTime = Math.floor(distance / DAY);
    } else if (unit === "Hour") {
      newTime = Math.floor((distance % DAY) / HOUR);
    } else if (unit === "Minute") {
      newTime = Math.floor((distance % HOUR) / MINUTE);
    } else {
      newTime = Math.floor((distance % MINUTE) / SECOND);
    }

    if (newTime !== timeRef.current) {
      // Exit animation
      await animate(
        ref.current,
        { y: ["0%", "-50%"], opacity: [1, 0] },
        { duration: 0.35 }
      );

      timeRef.current = newTime;
      setTime(newTime);

      // Enter animation
      await animate(
        ref.current,
        { y: ["50%", "0%"], opacity: [0, 1] },
        { duration: 0.35 }
      );
    }
  };

  return { ref, time };
};
