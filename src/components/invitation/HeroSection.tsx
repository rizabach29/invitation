import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import type { WeddingDetails, Guest } from '@/lib/types'
import { formatDate } from '@/lib/utils'
import { AnimatedLine, TextReveal } from './AnimatedSection'
import { CountdownTimer } from './CountdownTimer'

interface HeroSectionProps {
  details: WeddingDetails
  guest: Guest
}

export function HeroSection({ details, guest }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.92])

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #2C2C2C 1px, transparent 0)`,
          backgroundSize: '48px 48px',
        }}
      />

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        {/* Invitation label */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.1em' }}
          animate={{ opacity: 1, letterSpacing: '0.35em' }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.4, 0, 1] }}
          className="text-xs font-sans uppercase tracking-[0.35em] text-sage/70 mb-8"
        >
          Wedding Invitation
        </motion.p>

        {/* Guest greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.4, 0, 1] }}
          className="font-sans text-sm text-charcoal/60 mb-6 tracking-wide"
        >
          Dear <span className="text-charcoal font-medium">{guest.name}</span>,
          you are cordially invited
        </motion.p>

        {/* Groom name */}
        <TextReveal
          text={details.groom_name}
          as="h1"
          delay={0.8}
          className="text-5xl sm:text-7xl md:text-8xl font-serif font-bold text-charcoal leading-none"
        />

        {/* Ampersand */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -12 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{
            duration: 1,
            delay: 1.2,
            type: 'spring',
            stiffness: 100,
            damping: 12,
          }}
          className="my-4"
        >
          <span className="text-3xl sm:text-5xl font-serif text-sage italic">&</span>
        </motion.div>

        {/* Bride name */}
        <TextReveal
          text={details.bride_name}
          as="h1"
          delay={1.4}
          className="text-5xl sm:text-7xl md:text-8xl font-serif font-bold text-charcoal leading-none"
        />

        {/* Decorative line */}
        <div className="flex justify-center mt-10 mb-6">
          <AnimatedLine className="w-24" />
        </div>

        {/* Date */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2, ease: [0.25, 0.4, 0, 1] }}
          className="font-sans text-sm tracking-[0.2em] uppercase text-charcoal/70"
        >
          {formatDate(details.wedding_date)}
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.3, ease: [0.25, 0.4, 0, 1] }}
          className="mt-10"
        >
          <CountdownTimer weddingDate={details.wedding_date} />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-charcoal/40">
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-charcoal/30 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  )
}
