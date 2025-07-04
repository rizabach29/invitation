import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLenis } from "@studio-freight/react-lenis";
import LogoType from "../sources/illustration/LogoType";

const BottomNav = () => {
  return (
    <motion.div className="fixed w-full bottom-0 mb-4 z-100">
      <SlideTabs />
    </motion.div>
  );
};

const SlideTabs = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className="relative mx-auto flex w-fit rounded-full border-2 border-black bg-white p-1"
    >
      <Tab setPosition={setPosition} anchorRef="header">
        <div className="h-8 w-8">
          <LogoType style={{ height: "100%", width: "100%" }} />
        </div>
      </Tab>
      <Tab setPosition={setPosition}>QR</Tab>
      <Tab setPosition={setPosition}>RSVP</Tab>

      <Cursor position={position} />
    </ul>
  );
};

const Tab = ({
  children,
  setPosition,
  anchorRef,
}: {
  children: React.ReactNode;
  anchorRef?: string;
  setPosition: React.Dispatch<
    React.SetStateAction<{
      left: number;
      width: number;
      opacity: number;
    }>
  >;
}) => {
  const ref = useRef<HTMLLIElement | null>(null);
  const lenis = useLenis();

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      onClick={() => {
        if (!anchorRef) return;
        lenis?.scrollTo(`#${anchorRef}`, { duration: 1 });
      }}
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base"
    >
      {children}
    </li>
  );
};

const Cursor = ({
  position,
}: {
  position: {
    left: number;
    width: number;
    opacity: number;
  };
}) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-7 rounded-full bg-black md:h-12"
    />
  );
};

export default BottomNav;
