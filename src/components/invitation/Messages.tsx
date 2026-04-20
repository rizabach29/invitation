import { motion, AnimatePresence } from 'motion/react'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { isSupabaseUnconfigured } from '@/lib/mockData'
import type { Message } from '@/lib/types'
import { AnimatedSection, TextReveal, StaggerContainer, StaggerItem } from './AnimatedSection'

interface MessageFormProps {
  guestName: string
}

export function MessageForm({ guestName }: MessageFormProps) {
  const [name, setName] = useState(guestName)
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    setIsSubmitting(true)

    // Demo/preview mode — simulate submit
    if (isSupabaseUnconfigured()) {
      await new Promise((r) => setTimeout(r, 700))
      setIsSubmitting(false)
      setSubmitted(true)
      setMessage('')
      return
    }

    const { error } = await supabase.from('messages').insert({
      guest_name: name.trim(),
      message: message.trim(),
    })
    setIsSubmitting(false)

    if (!error) {
      setSubmitted(true)
      setMessage('')
    }
  }

  return (
    <AnimatedSection className="max-w-lg mx-auto mb-16">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="thanks"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8"
          >
            <p className="font-serif text-xl text-charcoal mb-2">Thank You!</p>
            <p className="font-sans text-sm text-charcoal/50">
              Your message means the world to us
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 text-xs font-sans uppercase tracking-[0.2em] text-charcoal/30 hover:text-sage transition-colors"
            >
              Send Another
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              required
              className="w-full px-0 py-3 bg-transparent border-b border-charcoal/10 font-sans text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-sage transition-colors"
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your wishes for the couple..."
              required
              rows={4}
              className="w-full px-0 py-3 bg-transparent border-b border-charcoal/10 font-sans text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-sage transition-colors resize-none"
            />
            <div className="text-center pt-2">
              <motion.button
                type="submit"
                disabled={isSubmitting || !message.trim()}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="px-10 py-3 bg-charcoal text-cream font-sans text-sm tracking-[0.15em] uppercase rounded-lg disabled:opacity-30 transition-all hover:bg-sage"
              >
                {isSubmitting ? 'Sending...' : 'Send Wishes'}
              </motion.button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </AnimatedSection>
  )
}

export function MessageWall() {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    if (isSupabaseUnconfigured()) return

    const fetchMessages = async () => {
      const { data } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50)
      if (data) setMessages(data)
    }
    fetchMessages()

    // Real-time subscription
    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          setMessages((prev) => [payload.new as Message, ...prev])
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  if (!messages.length) return null

  return (
    <StaggerContainer staggerDelay={0.06} className="max-w-2xl mx-auto">
      <div className="space-y-4">
        {messages.map((msg) => (
          <StaggerItem key={msg.id} direction="up">
            <motion.div
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group pl-5 border-l-2 border-sage/20 hover:border-sage/50 transition-colors"
            >
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed italic">
                "{msg.message}"
              </p>
              <p className="font-sans text-xs text-charcoal/30 mt-2">
                — {msg.guest_name}
              </p>
            </motion.div>
          </StaggerItem>
        ))}
      </div>
    </StaggerContainer>
  )
}

export function MessagesSection({ guestName }: { guestName: string }) {
  return (
    <section className="section-container">
      <div className="text-center mb-16">
        <AnimatedSection>
          <p className="text-xs font-sans uppercase tracking-[0.35em] text-sage/70 mb-4">
            Words of Love
          </p>
        </AnimatedSection>
        <TextReveal
          text="Leave Your Wishes"
          as="h2"
          className="text-4xl sm:text-5xl font-serif text-charcoal"
        />
      </div>

      <MessageForm guestName={guestName} />
      <MessageWall />
    </section>
  )
}
