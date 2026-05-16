import { motion, AnimatePresence } from "motion/react";
import { useState, useCallback } from "react";
import type { GalleryImage } from "@/lib/types";
import { AnimatedSection, TextReveal } from "./AnimatedSection";

// Auto aesthetic bento layout:
// i=0 → cinematic hero (full-width)
// remaining images cycle through two 5-image blocks:
//   Block A: [wide-2col, narrow-1col, sq, sq, sq]
//   Block B: [sq, sq, sq, narrow-1col, wide-2col]
// Heights in mixed rows are mathematically matched:
//   wide col-span-2 aspect-[3/2] == narrow col-span-1 aspect-[3/4]
function getLayout(i: number): { spanClass: string; aspectClass: string } {
  if (i === 0) {
    return {
      spanClass: "col-span-2 md:col-span-3",
      aspectClass: "aspect-[4/3] md:aspect-[21/9]",
    };
  }
  const blockA = [
    { span: "md:col-span-2", aspect: "md:aspect-[3/2]" },
    { span: "md:col-span-1", aspect: "md:aspect-[3/4]" },
    { span: "md:col-span-1", aspect: "md:aspect-square" },
    { span: "md:col-span-1", aspect: "md:aspect-square" },
    { span: "md:col-span-1", aspect: "md:aspect-square" },
  ];
  const blockB = [
    { span: "md:col-span-1", aspect: "md:aspect-square" },
    { span: "md:col-span-1", aspect: "md:aspect-square" },
    { span: "md:col-span-1", aspect: "md:aspect-square" },
    { span: "md:col-span-1", aspect: "md:aspect-[3/4]" },
    { span: "md:col-span-2", aspect: "md:aspect-[3/2]" },
  ];
  const adj = i - 1;
  const { span, aspect } = (Math.floor(adj / 5) % 2 === 0 ? blockA : blockB)[
    adj % 5
  ];
  return {
    spanClass: `col-span-1 ${span}`,
    aspectClass: `aspect-[3/4] ${aspect}`,
  };
}

interface GalleryProps {
  images: GalleryImage[];
  dark?: boolean;
}

function LightboxModal({
  image,
  onClose,
  onPrev,
  onNext,
}: {
  image: GalleryImage;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/90 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.4, 0, 1] }}
        className="relative max-w-4xl max-h-[85vh] mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image.image_url}
          alt={image.caption || ""}
          className="w-full h-full object-contain rounded-lg"
        />
        {image.caption && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center font-sans text-sm text-cream/70 mt-4"
          >
            {image.caption}
          </motion.p>
        )}

        {/* Navigation */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-10 h-10 flex items-center justify-center text-cream/60 hover:text-cream transition-colors"
          aria-label="Previous"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-10 h-10 flex items-center justify-center text-cream/60 hover:text-cream transition-colors"
          aria-label="Next"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-cream/60 hover:text-cream transition-colors"
          aria-label="Close"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </motion.div>
    </motion.div>
  );
}

export function Gallery({ images, dark = false }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const sorted = [...images].sort((a, b) => a.sort_order - b.sort_order);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + sorted.length) % sorted.length : null,
    );
  }, [sorted.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % sorted.length : null,
    );
  }, [sorted.length]);

  if (!sorted.length) return null;

  return (
    <section className="section-container">
      <div className="text-center mb-16">
        <AnimatedSection>
          <p className="text-xs font-sans uppercase tracking-[0.35em] text-sage/70 mb-4">
            Captured Moments
          </p>
        </AnimatedSection>
        <TextReveal
          text="Our Gallery"
          as="h2"
          className={`text-4xl sm:text-5xl font-serif ${dark ? "text-cream" : "text-charcoal"}`}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 max-w-5xl mx-auto">
        {sorted.map((image, index) => {
          const { spanClass, aspectClass } = getLayout(index);
          return (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.08 }}
              transition={{
                duration: 0.7,
                delay: (index % 5) * 0.07,
                ease: [0.25, 0.4, 0, 1],
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`${spanClass} ${aspectClass} overflow-hidden rounded-xl cursor-pointer group relative`}
              onClick={() => setSelectedIndex(index)}
            >
              <img
                src={image.image_url}
                alt={image.caption || ""}
                loading={index === 0 ? "eager" : "lazy"}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/25 transition-colors duration-500 flex items-end justify-center pb-4">
                {image.caption && (
                  <span className="font-sans text-xs text-cream/0 group-hover:text-cream/90 transition-all duration-500 tracking-wide px-3 text-center leading-relaxed">
                    {image.caption}
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <LightboxModal
            image={sorted[selectedIndex]}
            onClose={() => setSelectedIndex(null)}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
