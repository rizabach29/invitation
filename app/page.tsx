"use client";

import Counter from "./(sections)/counter";
import Section from "./(components)/section";
import Detail from "./(sections)/detail";
import { useEffect, useRef } from "react";
import { useScroll } from "framer-motion";
import Player from "./(components)/music";
import Lenis from "@studio-freight/lenis";

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
      <Section>
        <div className="">
          <img
            src="https://cdnpro.eraspace.com/media/mageplaza/blog/post/a/p/apaitustreetphotography_3.jpeg"
            alt="hero"
            className="w-screen h-auto"
          />
        </div>
      </Section>
      {/* <Section>
        <Bride />
      </Section> */}
      <Section>
        <div className="mt-24">
          <Counter />
        </div>
      </Section>
      <Section>
        <Detail scrollYProgress={scrollYProgress} />
      </Section>
      <Player url="https://cdn.pixabay.com/audio/2024/10/08/audio_095d37d4a6.mp3" />
    </div>
  );
}
