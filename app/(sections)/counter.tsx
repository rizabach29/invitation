"use client";

import { useAnimate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// NOTE: Change this date to whatever date you want to countdown to :)
const COUNTDOWN_FROM = "2025-09-21";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const ShiftingCountdown = () => {
  return (
    <div className="bg-gradient-to-br py-4 relative flex flex-col justify-center items-center w-full overflow-clip">
      <div className="absolute -right-5 -bottom-5">
        <p className={`text-black/5 text-9xl text-right font-black`}>21</p>
        <p className={`text-black/5 text-9xl text-right font-black`}>SEP</p>
        <p className={`text-black/5 text-9xl text-right font-black`}>25</p>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <CountdownItem unit="Day" text="Days" />
        <CountdownItem unit="Hour" text="Hours" />
        <CountdownItem unit="Minute" text="Minutes" />
        <CountdownItem unit="Second" text="Seconds" />
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
          className={`block text-4xl font-bold text-red-800 md:text-4xl lg:text-6xl xl:text-7xl`}
        >
          {time}
        </span>
      </div>
      <span
        className={`text-xl font-thin text-red-800 md:text-sm lg:text-base`}
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
