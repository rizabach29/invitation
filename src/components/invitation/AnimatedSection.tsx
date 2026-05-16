import { motion, useInView, type Variants } from "motion/react";
import { useRef, type ReactNode } from "react";
import type React from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  once?: boolean;
  amount?: number;
}

const getVariants = (direction: string, distance = 60): Variants => {
  const directions: Record<string, { x?: number; y?: number }> = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };
  const offset = directions[direction] || {};
  return {
    hidden: { opacity: 0, filter: "blur(8px)", ...offset },
    visible: { opacity: 1, filter: "blur(0px)", x: 0, y: 0 },
  };
};

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.8,
  once = true,
  amount = 0.2,
}: AnimatedSectionProps) {
  return (
    <motion.div
      variants={getVariants(direction)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0, 1], // custom cubic-bezier for silk-smooth feel
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Staggered children wrapper
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
  once = true,
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.15 }}
      transition={{ staggerChildren: staggerDelay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
}) {
  return (
    <motion.div
      variants={getVariants(direction)}
      transition={{ duration: 0.7, ease: [0.25, 0.4, 0, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Text reveal animation — splits text and animates each word
export function TextReveal({
  text,
  className = "",
  delay = 0,
  as: Tag = "p",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}) {
  const words = text.split(" ");
  return (
    <Tag className={className}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ staggerChildren: 0.04, delayChildren: delay }}
        className="inline"
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.15em]">
            <motion.span
              variants={{
                hidden: { y: "110%", rotate: 3, opacity: 0 },
                visible: { y: 0, rotate: 0, opacity: 1 },
              }}
              transition={{ duration: 0.6, ease: [0.25, 0.4, 0, 1] }}
              className="inline-block pt-[0.15em]"
            >
              {word}
            </motion.span>
            {i < words.length - 1 && "\u00A0"}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

// Cinematic mask-wipe reveal — linen overlay slides off from right, exposing content
export function MaskReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  return (
    <div
      ref={ref}
      className={`relative inline-block overflow-hidden ${className}`}
    >
      {children}
      <motion.div
        aria-hidden
        initial={{ scaleX: 1 }}
        animate={isInView ? { scaleX: 0 } : { scaleX: 1 }}
        transition={{
          duration: 0.85,
          delay,
          ease: [0.76, 0, 0.24, 1],
        }}
        style={{ originX: 1 }}
        className="absolute inset-0 bg-linen"
      />
    </div>
  );
}

// Animated horizontal rule that draws from left to right
export function AnimatedLine({ className = "" }: { className?: string }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1.2, ease: [0.25, 0.4, 0, 1] }}
      className={`h-px bg-sage/40 origin-left ${className}`}
    />
  );
}

// Full-section reveal wrapper — slides up from below with opacity fade on scroll entry
export function SectionReveal({
  children,
  className = "",
  id,
  style,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.06 });

  return (
    <motion.div
      ref={ref}
      id={id}
      style={style}
      initial={{ opacity: 0, y: 56 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 56 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
