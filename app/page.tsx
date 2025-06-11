"use client";

import Counter from "./(sections)/counter";
import Section from "./(components)/section";
import Detail from "./(sections)/detail";
import { useRef } from "react";
import { useScroll } from "framer-motion";
import Header from "./(sections)/header";
import Footer from "./(sections)/footer";
import Bride from "./(sections)/bride";
import Verse from "./(sections)/verse";
import Story from "./(sections)/story";
import Wiggle from "./(components)/svg-path/wiggle";
import SmoothScrollProvider from "./smoothscroll-provider";
import { paragraph } from "./font";

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <div className="" ref={ref}>
      <SmoothScrollProvider>
        <Section id="header">
          <Header scrollParentYProgress={scrollYProgress} />
        </Section>
        {/* <Section>
        <div className="">
          <img
            src="https://cdnpro.eraspace.com/media/mageplaza/blog/post/a/p/apaitustreetphotography_3.jpeg"
            alt="hero"
            className="w-screen h-auto"
          />
        </div>
      </Section> */}
        <Section id="verse">
          <div className="w-full h-full bg-[#BB543B]">
            <Verse />
          </div>
        </Section>
        <Section id="bride">
          <div className="w-full h-full bg-[#BB543B]">
            <Bride scrollParentYProgress={scrollYProgress} />
          </div>
        </Section>
        <Section id="story">
          <div className="relative">
            <h3
              className={`text-6xl md:text-7xl lg:text-9xl absolute tracking-tighter ${paragraph.className}`}
            >
              Cerita
              <br />
              Perkenalan
            </h3>
            <div className="overflow-clip w-full h-full">
              <Wiggle scrollYParentProgress={scrollYProgress} scale={0.5} />
            </div>
            <div className="absolute top-0 left-0 w-full h-full py-[75vh]">
              <Story />
            </div>
          </div>
        </Section>
        <Section id="detail">
          <div className="mt-24 md:flex md:justify-center md:items-center">
            <Detail scrollYProgress={scrollYProgress} />
            <Counter />
          </div>
        </Section>
        {/* <Player url="https://cdn.pixabay.com/audio/2024/10/08/audio_095d37d4a6.mp3" /> */}
        {/* <NavBottom /> */}
        <Footer />
      </SmoothScrollProvider>
    </div>
  );
}
