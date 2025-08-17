import { motion } from "framer-motion";

export default function SmoothMarquee({ text }: { text: string }) {
  return (
    <span className="relative overflow-hidden whitespace-nowrap">
      <motion.span
        className="flex gap-8 px-4"
        animate={{ x: ["0%", "-70%"] }}
        transition={{
          duration: 5,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        <span className="inline-block">{text}</span>
        <span className="inline-block">{text}</span>
        <span className="inline-block">{text}</span>
      </motion.span>
    </span>
  );
}
