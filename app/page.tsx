"use client";

import Counter from "./(sections)/counter";
import Section from "./(components)/section";
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
import { motion } from "framer-motion";
import Bumper from "./(sections)/bumper";

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <SmoothScrollProvider>
      <div className="w-full flex flex-col items-center ">
        <div className="snap-y snap-mandatory max-w-2xl" ref={ref}>
          <Section id="bumper">
            <Bumper />
          </Section>
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
            <div className="w-full h-full bg-[#BB543B] rounded-t-full py-32">
              <Verse />
            </div>
          </Section>
          <Section id="bride">
            <div className="w-full h-full bg-[#BB543B] pt-24 pb-48 rounded-b-full">
              <Bride scrollParentYProgress={scrollYProgress} />
            </div>
          </Section>
          <Section id="story">
            <div
              className="relative -top-24"
              style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
            >
              <motion.div
                className="h-[300vh] w-full bg-amber-100 py-52 rounded-bl-[350px] rounded-tr-[350px] rounded-tl-[50px] rounded-br-[50px] flex flex-col"
                initial={{ y: 100 }}
                whileInView={{ y: 0 }}
                transition={{ duration: 1 }}
              >
                <div className="h-full w-full bottom-0 relative">
                  <div className="overflow-clip absolute h-full top-0 left-0">
                    <Wiggle scale={1.5} />
                  </div>
                  <h3
                    className={`text-6xl md:text-7xl lg:text-9xl text-[#BB543B] tracking-tighter ${paragraph.className}`}
                  >
                    Perjalanan Cinta
                  </h3>
                  <Story />
                </div>
              </motion.div>
            </div>
          </Section>
          <Section id="detail">
            <div className="mt-24 md:flex md:justify-center md:items-center">
              {/* <Detail scrollYProgress={scrollYProgress} /> */}
              <Counter />
            </div>
          </Section>
          {/* <Player url="https://cdn.pixabay.com/audio/2024/10/08/audio_095d37d4a6.mp3" /> */}
          {/* <NavBottom /> */}
          <Footer />
        </div>
      </div>
    </SmoothScrollProvider>
  );
}
