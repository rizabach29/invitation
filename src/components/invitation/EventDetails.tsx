import { motion } from "motion/react";
import type { WeddingDetails } from "@/lib/types";
import { formatDate, formatTime } from "@/lib/utils";
import {
  AnimatedSection,
  AnimatedLine,
  TextReveal,
  StaggerContainer,
  StaggerItem,
} from "./AnimatedSection";

interface EventDetailsProps {
  details: WeddingDetails;
  dark?: boolean;
}

function EventCard({
  icon,
  title,
  venue,
  address,
  time,
  mapQuery,
  dark = false,
}: {
  icon: string;
  title: string;
  venue: string;
  address: string;
  time: string;
  mapQuery: string;
  dark?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`group relative backdrop-blur-sm rounded-2xl p-8 sm:p-10 text-center ${
        dark
          ? "bg-cream/5 border border-cream/10"
          : "bg-white/60 border border-charcoal/5"
      }`}
    >
      {/* Hover glow */}
      <div
        className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
          dark ? "bg-cream/5" : "bg-sage/5"
        }`}
      />

      <div className="relative z-10">
        <span className="text-3xl mb-4 block">{icon}</span>
        <h3
          className={`font-serif text-xl sm:text-2xl mb-2 ${dark ? "text-cream" : "text-charcoal"}`}
        >
          {title}
        </h3>
        <AnimatedLine className="w-12 mx-auto my-4" />
        <p
          className={`font-serif text-lg font-medium ${dark ? "text-cream" : "text-charcoal"}`}
        >
          {venue}
        </p>
        <p
          className={`font-sans text-sm mt-2 leading-relaxed ${dark ? "text-cream/50" : "text-charcoal/50"}`}
        >
          {address}
        </p>
        <p className="font-sans text-sm text-sage font-medium mt-3 tracking-wide">
          {formatTime(time)}
        </p>
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(mapQuery)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1.5 mt-5 text-xs font-sans uppercase tracking-[0.2em] transition-colors duration-300 hover:text-sage ${
            dark ? "text-cream/40" : "text-charcoal/40"
          }`}
        >
          View Map
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
            />
          </svg>
        </a>
      </div>
    </motion.div>
  );
}

export function EventDetails({ details, dark = false }: EventDetailsProps) {
  return (
    <section className="section-container">
      <div className="text-center mb-16">
        <AnimatedSection>
          <p className="text-xs font-sans uppercase tracking-[0.35em] text-sage/70 mb-4">
            Save the Date
          </p>
        </AnimatedSection>
        <TextReveal
          text="Celebrate With Us"
          as="h2"
          className={`text-4xl sm:text-5xl font-serif ${dark ? "text-cream" : "text-charcoal"}`}
        />
        <AnimatedSection delay={0.3}>
          <p
            className={`font-sans mt-4 max-w-md mx-auto text-sm leading-relaxed ${dark ? "text-cream/50" : "text-charcoal/50"}`}
          >
            We would be honored to have you share in this special day
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <p
            className={`font-serif text-lg mt-6 ${dark ? "text-cream/70" : "text-charcoal/70"}`}
          >
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
            dark={dark}
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
            dark={dark}
          />
        </StaggerItem>
      </StaggerContainer>
    </section>
  );
}
