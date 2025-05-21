"use client";

import Counter from "./(sections)/counter";
import Section from "./(components)/section";
import Detail from "./(sections)/detail";
import { useEffect, useRef } from "react";
import { useScroll } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import Header from "./(sections)/header";
import Footer from "./(sections)/footer";
import NavBottom from "./(components)/nav-bottom";
import Bride from "./(sections)/bride";

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: any) {
      lenis.raf(time);

      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="" ref={ref}>
      <Section id="head">
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
      <Section id="bride">
        <Bride scrollParentYProgress={scrollYProgress} />
      </Section>
      <Section id="detail">
        <div className="mt-24 md:flex md:justify-center md:items-center">
          <Detail scrollYProgress={scrollYProgress} />
          <Counter />
        </div>
      </Section>
      {/* <Player url="https://cdn.pixabay.com/audio/2024/10/08/audio_095d37d4a6.mp3" /> */}
      <NavBottom />
      <Footer />
    </div>
  );
}
