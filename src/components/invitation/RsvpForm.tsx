import { motion, AnimatePresence } from 'motion/react'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { isSupabaseUnconfigured } from '@/lib/mockData'
import type { Guest } from '@/lib/types'
import { AnimatedSection, TextReveal, AnimatedLine } from './AnimatedSection'

interface RsvpFormProps {
  guest: Guest
  onUpdate: (guest: Guest) => void
}

export function RsvpForm({ guest, onUpdate }: RsvpFormProps) {
  const [status, setStatus] = useState<Guest['rsvp_status']>(guest.rsvp_status)
  const [attendeeCount, setAttendeeCount] = useState(guest.attendee_count || 1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(guest.rsvp_status !== 'pending')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // In demo/preview mode, simulate a successful RSVP without hitting Supabase
    if (isSupabaseUnconfigured() || guest.id.startsWith('mock-')) {
      await new Promise((r) => setTimeout(r, 800))
      setIsSubmitting(false)
      const updated: Guest = {
        ...guest,
        rsvp_status: status,
        attendee_count: status === 'confirmed' ? attendeeCount : 0,
      }
      setSubmitted(true)
      onUpdate(updated)
      return
    }

    const { data, error } = await supabase
      .from('guests')
      .update({
        rsvp_status: status,
        attendee_count: status === 'confirmed' ? attendeeCount : 0,
        updated_at: new Date().toISOString(),
      })
      .eq('id', guest.id)
      .select()
      .single()

    setIsSubmitting(false)

    if (!error && data) {
      setSubmitted(true)
      onUpdate(data as Guest)
    }
  }

  return (
    <section className="section-container">
      <div className="text-center mb-16">
        <AnimatedSection>
          <p className="text-xs font-sans uppercase tracking-[0.35em] text-gold/70 mb-4">
            Will You Join Us?
          </p>
        </AnimatedSection>
        <TextReveal
          text="Répondez S'il Vous Plaît"
          as="h2"
          className="text-4xl sm:text-5xl font-serif text-charcoal"
        />
      </div>

      <AnimatedSection className="max-w-lg mx-auto">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              className="text-center py-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6"
              >
                <span className="text-2xl">
                  {status === 'confirmed' ? '💛' : '🙏'}
                </span>
              </motion.div>
              <h3 className="font-serif text-2xl text-charcoal mb-2">
                {status === 'confirmed' ? 'See You There!' : 'We Understand'}
              </h3>
              <p className="font-sans text-sm text-charcoal/50">
                {status === 'confirmed'
                  ? `Thank you for confirming. We can't wait to celebrate with you!`
                  : 'Thank you for letting us know. You will be missed!'}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 text-xs font-sans uppercase tracking-[0.2em] text-charcoal/30 hover:text-gold transition-colors"
              >
                Change Response
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              <div className="text-center">
                <p className="font-sans text-sm text-charcoal/60">
                  Dear <span className="font-medium text-charcoal">{guest.name}</span>
                </p>
              </div>

              {/* Status selection */}
              <div className="flex justify-center gap-4">
                {(['confirmed', 'declined'] as const).map((option) => (
                  <motion.button
                    key={option}
                    type="button"
                    onClick={() => setStatus(option)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className={`px-8 py-4 rounded-xl border-2 transition-all duration-300 font-sans text-sm tracking-wide ${
                      status === option
                        ? 'border-gold bg-gold/5 text-charcoal'
                        : 'border-charcoal/10 text-charcoal/40 hover:border-charcoal/20'
                    }`}
                  >
                    <span className="block text-lg mb-1">
                      {option === 'confirmed' ? '🎉' : '😢'}
                    </span>
                    {option === 'confirmed' ? 'Joyfully Accept' : 'Respectfully Decline'}
                  </motion.button>
                ))}
              </div>

              {/* Attendee count */}
              <AnimatePresence>
                {status === 'confirmed' && guest.max_attendees > 1 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="text-center pt-2">
                      <label className="font-sans text-xs uppercase tracking-[0.2em] text-charcoal/40 block mb-4">
                        Number of Guests
                      </label>
                      <div className="flex items-center justify-center gap-6">
                        <motion.button
                          type="button"
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setAttendeeCount(Math.max(1, attendeeCount - 1))}
                          className="w-10 h-10 rounded-full border border-charcoal/10 flex items-center justify-center text-charcoal/40 hover:border-gold hover:text-gold transition-colors"
                        >
                          −
                        </motion.button>
                        <span className="font-serif text-3xl text-charcoal w-12 text-center">
                          {attendeeCount}
                        </span>
                        <motion.button
                          type="button"
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setAttendeeCount(Math.min(guest.max_attendees, attendeeCount + 1))}
                          className="w-10 h-10 rounded-full border border-charcoal/10 flex items-center justify-center text-charcoal/40 hover:border-gold hover:text-gold transition-colors"
                        >
                          +
                        </motion.button>
                      </div>
                      <p className="text-[10px] font-sans text-charcoal/30 mt-2">
                        Maximum {guest.max_attendees} guests
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatedLine className="w-16 mx-auto" />

              {/* Submit */}
              <div className="text-center">
                <motion.button
                  type="submit"
                  disabled={isSubmitting || status === 'pending'}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-12 py-3 bg-charcoal text-cream font-sans text-sm tracking-[0.15em] uppercase rounded-lg disabled:opacity-30 transition-all duration-300 hover:bg-gold"
                >
                  {isSubmitting ? (
                    <motion.span
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      Sending...
                    </motion.span>
                  ) : (
                    'Confirm RSVP'
                  )}
                </motion.button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </AnimatedSection>
    </section>
  )
}
