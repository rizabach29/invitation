"use client";

import Counter from "./(sections)/counter";
import Section from "./(components)/section";
import { useEffect, useRef, useState } from "react";
import { useScroll } from "framer-motion";
import Header from "./(sections)/header";
import Footer from "./(sections)/footer";
import Bride from "./(sections)/bride";
import Verse from "./(sections)/verse";
// import Story from "./(sections)/story";
import Wiggle from "./(components)/svg-path/wiggle";
import SmoothScrollProvider from "./smoothscroll-provider";
import { paragraph } from "./font";
import { motion } from "framer-motion";
import Bumper from "./(sections)/bumper";
import Player from "./(components)/music";
import StoryCard from "./(sections)/story-card";
import Qr from "./qr-code";
import Dresscode from "./(sections)/dresscode";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Database } from "./type";

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  const [guest, setGuest] = useState<
    Database["public"]["Tables"]["guests"]["Row"] | null
  >(null);

  const fetchGuest = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("guests")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching guest:", error);
      return;
    }

    setGuest(data);
  };

  useEffect(() => {
    if (!id) {
      setGuest(null);
      return;
    }

    fetchGuest();
  }, [id]);

  return (
    <SmoothScrollProvider>
      <div className="w-full flex flex-col items-center">
        <div className="snap-y snap-mandatory max-w-2xl" ref={ref}>
          <Section id="bumper">
            <Bumper guest={guest} />
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
              <h3
                className={`text-7xl md:text-8xl lg:text-9xl text-white/30 text-right pb-24 pr-8 tracking-tighter ${paragraph.className}`}
              >
                Mempelai
              </h3>
              <Bride scrollParentYProgress={scrollYProgress} />
            </div>
          </Section>
          <Section id="story">
            <motion.div
              className="h-[350vh] w-full bg-amber-100 py-52 rounded-bl-[350px] rounded-tr-[350px] rounded-tl-[50px] rounded-br-[50px] flex flex-col"
              initial={{ y: 100 }}
              whileInView={{ y: 0 }}
              transition={{ duration: 1, reverse: true, type: "spring" }}
            >
              <div className="h-full w-full bottom-0 relative">
                <div className="overflow-clip absolute h-full top-0 left-0">
                  <Wiggle scale={1.5} />
                </div>
                <h3
                  className={`text-7xl md:text-8xl lg:text-9xl overflow-x-clip pl-8 text-[#BB543B] tracking-tighter ${paragraph.className}`}
                >
                  Perjalanan
                  <br />
                  Cinta
                </h3>
                {/* <Story /> */}
                <div className="mt-8">
                  <StoryCard />
                </div>
              </div>
            </motion.div>
          </Section>
          <Section id="detail">
            <div className="mt-24 md:flex md:justify-center md:items-center pb-24">
              <Counter />
            </div>
            <div className="pb-48">
              <Dresscode />
            </div>
          </Section>
          <Player url="/music/september-ceria.mp3" />
          <Qr />
          <Footer guest={guest} />
        </div>
      </div>
    </SmoothScrollProvider>
  );
}
