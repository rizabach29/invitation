import { motion } from 'motion/react'
import type { LoveStoryEntry } from '@/lib/types'
import { AnimatedSection, TextReveal, StaggerContainer, StaggerItem } from './AnimatedSection'

interface LoveStoryProps {
  entries: LoveStoryEntry[]
}

function TimelineNode({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
      className="absolute -translate-x-1/2 top-0 z-10"
    >
      <div className="w-3 h-3 rounded-full bg-gold ring-4 ring-cream" />
      <motion.span
        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className={`absolute top-1/2 -translate-y-1/2 text-[10px] font-sans tracking-[0.2em] text-gold/60 whitespace-nowrap ${
          index % 2 === 0 ? 'right-8' : 'left-8'
        } hidden md:block`}
      />
    </motion.div>
  )
}

function TimelineEntry({ entry, index }: { entry: LoveStoryEntry; index: number }) {
  const isEven = index % 2 === 0
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-[1fr_40px_1fr]">
      {/* Left column — content for even entries only */}
      <div className="hidden md:block md:pr-10 md:text-right">
        {isEven && <TimelineContent entry={entry} align="right" />}
      </div>

      {/* Center column — dot + connecting line */}
      <div className="hidden md:flex flex-col items-center relative">
        <TimelineNode index={index} />
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0, 1] }}
          className="w-px bg-gold/20 h-full origin-top"
        />
      </div>

      {/* Right column — content for odd entries only */}
      <div className="hidden md:block md:pl-10">
        {!isEven && <TimelineContent entry={entry} align="left" />}
      </div>

      {/* Mobile — always show content */}
      <div className="md:hidden">
        <TimelineContent entry={entry} align="left" />
      </div>
    </div>
  )
}

function TimelineContent({ entry, align }: { entry: LoveStoryEntry; align: 'left' | 'right' }) {
  return (
    <AnimatedSection direction={align === 'left' ? 'left' : 'right'}>
      <div className="pb-12">
        <span className="text-xs font-sans uppercase tracking-[0.3em] text-gold/60">
          {entry.year}
        </span>
        <h3 className="font-serif text-xl sm:text-2xl text-charcoal mt-2 mb-3">
          {entry.title}
        </h3>
        <p className="font-sans text-sm text-charcoal/50 leading-relaxed max-w-sm">
          {entry.description}
        </p>
      </div>
    </AnimatedSection>
  )
}

export function LoveStory({ entries }: LoveStoryProps) {
  if (!entries || entries.length === 0) return null

  return (
    <section className="section-container">
      <div className="text-center mb-16">
        <AnimatedSection>
          <p className="text-xs font-sans uppercase tracking-[0.35em] text-gold/70 mb-4">
            How It All Began
          </p>
        </AnimatedSection>
        <TextReveal
          text="Our Love Story"
          as="h2"
          className="text-4xl sm:text-5xl font-serif text-charcoal"
        />
      </div>

      <StaggerContainer staggerDelay={0.15} className="max-w-3xl mx-auto">
        {entries.map((entry, index) => (
          <StaggerItem key={index}>
            <TimelineEntry entry={entry} index={index} />
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* End node */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="flex justify-center mt-4"
      >
        <div className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-gold" />
        </div>
      </motion.div>
    </section>
  )
}
