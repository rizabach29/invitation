import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'motion/react'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <motion.p
        initial={{ opacity: 0, letterSpacing: '0.1em' }}
        animate={{ opacity: 1, letterSpacing: '0.35em' }}
        transition={{ duration: 1.2, ease: [0.25, 0.4, 0, 1] }}
        className="text-xs font-sans uppercase tracking-[0.35em] text-gold/70 mb-8"
      >
        Interactive Wedding Invitation
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.4, 0, 1] }}
        className="text-5xl sm:text-7xl font-serif font-bold text-charcoal leading-tight"
      >
        Elegant &<br />
        <span className="text-gold italic">Memorable</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.4, 0, 1] }}
        className="text-sm font-sans text-charcoal/50 mt-6 mb-12 max-w-md leading-relaxed"
      >
        Beautiful wedding invitations with stunning animations,
        RSVP tracking, and a full management dashboard
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1, ease: [0.25, 0.4, 0, 1] }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Link to="/invite/$slug" params={{ slug: 'test-guest' }} className="btn-primary">
          View Sample
        </Link>
        <Link to="/dashboard" className="btn-secondary">
          Dashboard
        </Link>
      </motion.div>
    </div>
  )
}
