import { motion } from 'motion/react'
import type { WeddingDetails } from '@/lib/types'
import { formatDate, formatTime } from '@/lib/utils'
import { AnimatedSection, AnimatedLine, TextReveal, StaggerContainer, StaggerItem } from './AnimatedSection'

interface EventDetailsProps {
  details: WeddingDetails
}

function EventCard({
  icon,
  title,
  venue,
  address,
  time,
  mapQuery,
}: {
  icon: string
  title: string
  venue: string
  address: string
  time: string
  mapQuery: string
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative bg-white/60 backdrop-blur-sm border border-charcoal/5 rounded-2xl p-8 sm:p-10 text-center"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <span className="text-3xl mb-4 block">{icon}</span>
        <h3 className="font-serif text-xl sm:text-2xl text-charcoal mb-2">{title}</h3>
        <AnimatedLine className="w-12 mx-auto my-4" />
        <p className="font-serif text-lg text-charcoal font-medium">{venue}</p>
        <p className="font-sans text-sm text-charcoal/50 mt-2 leading-relaxed">
          {address}
        </p>
        <p className="font-sans text-sm text-gold font-medium mt-3 tracking-wide">
          {formatTime(time)}
        </p>
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(mapQuery)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-5 text-xs font-sans uppercase tracking-[0.2em] text-charcoal/40 hover:text-gold transition-colors duration-300"
        >
          View Map
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
        </a>
      </div>
    </motion.div>
  )
}

export function EventDetails({ details }: EventDetailsProps) {
  return (
    <section className="section-container">
      <div className="text-center mb-16">
        <AnimatedSection>
          <p className="text-xs font-sans uppercase tracking-[0.35em] text-gold/70 mb-4">
            Save the Date
          </p>
        </AnimatedSection>
        <TextReveal
          text="Celebrate With Us"
          as="h2"
          className="text-4xl sm:text-5xl font-serif text-charcoal"
        />
        <AnimatedSection delay={0.3}>
          <p className="font-sans text-charcoal/50 mt-4 max-w-md mx-auto text-sm leading-relaxed">
            We would be honored to have you share in this special day
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <p className="font-serif text-lg text-charcoal/70 mt-6">
            {formatDate(details.wedding_date)}
          </p>
        </AnimatedSection>
      </div>

      <StaggerContainer
        staggerDelay={0.2}
        className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto"
      >
        <StaggerItem>
          <EventCard
            icon="⛪"
            title="The Ceremony"
            venue={details.ceremony_venue}
            address={details.ceremony_address}
            time={details.ceremony_time}
            mapQuery={`${details.ceremony_venue} ${details.ceremony_address}`}
          />
        </StaggerItem>
        <StaggerItem>
          <EventCard
            icon="🥂"
            title="The Reception"
            venue={details.reception_venue}
            address={details.reception_address}
            time={details.reception_time}
            mapQuery={`${details.reception_venue} ${details.reception_address}`}
          />
        </StaggerItem>
      </StaggerContainer>
    </section>
  )
}
