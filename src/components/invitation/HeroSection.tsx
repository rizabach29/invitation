import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useRef, type ReactNode } from "react";
import type { WeddingDetails, Guest } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { AnimatedLine } from "./AnimatedSection";
import { CountdownTimer } from "./CountdownTimer";

// ── Awwwards-grade easing curves ─────────────────────────────────────────────
const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
const SILK: [number, number, number, number] = [0.76, 0, 0.24, 1];

// ── Clip-slide line reveal ────────────────────────────────────────────────────
function Clip({
  children,
  delay = 0,
  duration = 0.88,
  entered,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  entered: boolean;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{ paddingBottom: "0.12em" }}
    >
      <motion.div
        initial={{ y: "108%" }}
        animate={{ y: entered ? 0 : "108%" }}
        transition={{ duration, delay: entered ? delay : 0, ease: EXPO }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ── Word-by-word stagger reveal ───────────────────────────────────────────────
function NameReveal({
  text,
  delay = 0,
  entered,
  className = "",
}: {
  text: string;
  delay?: number;
  entered: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden mr-[0.22em] pb-[0.12em]"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "115%" }}
            animate={{ y: entered ? 0 : "115%" }}
            transition={{
              duration: 0.9,
              delay: entered ? delay + i * 0.055 : 0,
              ease: EXPO,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

interface HeroSectionProps {
  details: WeddingDetails;
  guest: Guest;
  entered?: boolean;
}

export function HeroSection({
  details,
  guest,
  entered = false,
}: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.92]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #2C2C2C 1px, transparent 0)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* ── Curtain: two halves split open ───────────────────────────────────── */}
      <AnimatePresence>
        {!entered && (
          <>
            {/* Top panel — collapses toward top edge */}
            <motion.div
              key="curtain-top"
              className="absolute inset-x-0 top-0 z-30 bg-cream"
              style={{ height: "50%", originY: 0 }}
              initial={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 0.9, ease: SILK }}
            />
            {/* Bottom panel — collapses toward bottom edge */}
            <motion.div
              key="curtain-bottom"
              className="absolute inset-x-0 bottom-0 z-30 bg-cream"
              style={{ height: "50%", originY: 1 }}
              initial={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 0.9, ease: SILK }}
            />
          </>
        )}
      </AnimatePresence>

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto w-full"
      >
        {/* ── Label ── */}
        <div className="overflow-hidden mb-8">
          <motion.p
            className="text-xs font-sans uppercase tracking-[0.35em] text-sage/70"
            initial={{ y: "100%", opacity: 0 }}
            animate={entered ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
            transition={{
              duration: 1.0,
              delay: entered ? 0.12 : 0,
              ease: EXPO,
            }}
          >
            Wedding Invitation
          </motion.p>
        </div>

        {/* ── Guest greeting ── */}
        <Clip delay={0.22} entered={entered} className="mb-6">
          <p className="font-sans text-sm text-charcoal/60 tracking-wide">
            Dear <span className="text-charcoal font-medium">{guest.name}</span>
            , you are cordially invited
          </p>
        </Clip>

        {/* ── Groom name ── */}
        <NameReveal
          text={details.groom_name}
          delay={0.34}
          entered={entered}
          className="text-5xl sm:text-7xl md:text-8xl font-serif font-bold text-charcoal leading-tight"
        />

        {/* ── Ampersand ── */}
        <div className="overflow-hidden my-4">
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={entered ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
            transition={{
              duration: 0.75,
              delay: entered ? 0.6 : 0,
              ease: EXPO,
            }}
          >
            <span className="text-3xl sm:text-5xl font-serif text-sage italic">
              &
            </span>
          </motion.div>
        </div>

        {/* ── Bride name ── */}
        <NameReveal
          text={details.bride_name}
          delay={0.7}
          entered={entered}
          className="text-5xl sm:text-7xl md:text-8xl font-serif font-bold text-charcoal leading-tight"
        />

        {/* ── Decorative line ── */}
        <motion.div
          className="flex justify-center mt-10 mb-6"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={
            entered ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }
          }
          transition={{ duration: 0.7, delay: entered ? 1.02 : 0, ease: EXPO }}
        >
          <AnimatedLine className="w-24" />
        </motion.div>

        {/* ── Date ── */}
        <Clip delay={1.12} entered={entered}>
          <p className="font-sans text-sm tracking-[0.2em] uppercase text-charcoal/70">
            {formatDate(details.wedding_date)}
          </p>
        </Clip>

        {/* ── Countdown ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.8, delay: entered ? 1.28 : 0, ease: EXPO }}
          className="mt-10"
        >
          <CountdownTimer weddingDate={details.wedding_date} />
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: entered ? 1 : 0 }}
        transition={{ delay: entered ? 1.8 : 0, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-charcoal/40">
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-charcoal/30 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
