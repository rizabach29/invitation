import { motion } from 'motion/react'
import type { WeddingDetails } from '@/lib/types'
import { AnimatedSection, AnimatedLine } from './AnimatedSection'

interface FooterProps {
  details: WeddingDetails
}

export function Footer({ details }: FooterProps) {
  return (
    <footer className="section-container text-center pb-12">
      <AnimatedLine className="w-24 mx-auto mb-16" />

      <AnimatedSection>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.4, 0, 1] }}
        >
          <p className="text-xs font-sans uppercase tracking-[0.35em] text-sage/70 mb-6">
            With Love
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal">
            {details.groom_name} <span className="text-sage italic">&</span>{' '}
            {details.bride_name}
          </h2>
          <p className="font-sans text-sm text-charcoal/30 mt-8 tracking-wide">
            We can't wait to celebrate with you
          </p>
        </motion.div>
      </AnimatedSection>

      {/* Decorative bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-16 pt-8 border-t border-charcoal/5"
      >
        <p className="text-[10px] font-sans text-charcoal/20 tracking-wider uppercase">
          Made with love
        </p>
      </motion.div>
    </footer>
  )
}
