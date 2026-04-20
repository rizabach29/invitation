import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { motion } from 'motion/react'
import { supabase } from '@/lib/supabase'
import type { Guest, WeddingDetails, GalleryImage } from '@/lib/types'
import { MOCK_DETAILS, MOCK_GUEST, MOCK_IMAGES, isSupabaseUnconfigured } from '@/lib/mockData'
import { HeroSection } from '@/components/invitation/HeroSection'
import { EventDetails } from '@/components/invitation/EventDetails'
import { LoveStory } from '@/components/invitation/LoveStory'
import { Gallery } from '@/components/invitation/Gallery'
import { RsvpForm } from '@/components/invitation/RsvpForm'
import { MessagesSection } from '@/components/invitation/Messages'
import { Footer } from '@/components/invitation/Footer'
import { FloralBackground } from '@/components/invitation/FloralBackground'

type LoaderData = {
  guest: Guest
  details: WeddingDetails
  images: GalleryImage[]
  isMock: boolean
}

export const Route = createFileRoute('/invite/$slug')({
  loader: async ({ params }): Promise<LoaderData> => {
    // ── Demo / no-Supabase fallback ──────────────────────────────────────────
    if (isSupabaseUnconfigured() || params.slug === 'demo') {
      return {
        guest: params.slug === 'demo' ? MOCK_GUEST : { ...MOCK_GUEST, slug: params.slug },
        details: MOCK_DETAILS,
        images: MOCK_IMAGES,
        isMock: true,
      }
    }

    // ── Live Supabase fetch ──────────────────────────────────────────────────
    const [guestRes, detailsRes, imagesRes] = await Promise.all([
      supabase.from('guests').select('*').eq('slug', params.slug).single(),
      supabase.from('wedding_details').select('*').limit(1).single(),
      supabase.from('gallery_images').select('*').order('sort_order'),
    ])

    // Fall back to mock details if wedding_details table is empty
    const details = (detailsRes.data as WeddingDetails) ?? MOCK_DETAILS

    if (guestRes.error || !guestRes.data) {
      // Unknown slug → show invitation with mock guest so the page still renders
      return {
        guest: { ...MOCK_GUEST, slug: params.slug, name: 'Dear Guest' },
        details,
        images: (imagesRes.data || MOCK_IMAGES) as GalleryImage[],
        isMock: true,
      }
    }

    return {
      guest: guestRes.data as Guest,
      details,
      images: (imagesRes.data || MOCK_IMAGES) as GalleryImage[],
      isMock: false,
    }
  },
  component: InvitationPage,
  pendingComponent: LoadingScreen,
  errorComponent: ErrorScreen,
})

function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] bg-cream flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Ambient blobs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(123,148,115,0.08) 0%, transparent 70%)', top: '10%', left: '10%' }}
        animate={{ scale: [1, 1.15, 1], x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(196,164,132,0.07) 0%, transparent 70%)', bottom: '15%', right: '10%' }}
        animate={{ scale: [1, 1.2, 1], x: [0, -15, 0], y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut', delay: 2 }}
      />

      {/* Heart draw + fill animation */}
      <motion.svg
        viewBox="0 0 200 200"
        className="w-44 h-44 mb-8"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Outer orbiting dashes */}
        <motion.circle
          cx="100" cy="105" r="82"
          fill="none" stroke="#7B9473" strokeWidth="0.4" strokeDasharray="3 10"
          initial={{ rotate: 0, opacity: 0 }}
          animate={{ rotate: 360, opacity: 0.25 }}
          transition={{ rotate: { repeat: Infinity, duration: 18, ease: 'linear' }, opacity: { duration: 0.8, delay: 0.4 } }}
          style={{ transformOrigin: '100px 105px' }}
        />

        {/* Heart group — draws first, then heartbeats forever after */}
        <motion.g
          style={{ transformOrigin: '100px 92px' }}
          animate={{ scale: [1, 1.13, 0.97, 1.07, 1] }}
          transition={{
            duration: 0.65,
            ease: [0.34, 1.56, 0.64, 1],
            delay: 2.1,          // starts just after draw + fill completes
            repeat: Infinity,
            repeatDelay: 1.4,    // pause between beats
          }}
        >
          {/* Heart outline — draws from top-centre along both arcs to the bottom point */}
          <motion.path
            d="M100 145
               C 60 115, 30 95, 30 72
               C 30 50, 48 38, 65 38
               C 80 38, 92 48, 100 58
               C 108 48, 120 38, 135 38
               C 152 38, 170 50, 170 72
               C 170 95, 140 115, 100 145 Z"
            fill="none"
            stroke="#7B9473"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ pathLength: { duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }, opacity: { duration: 0.01, delay: 0.3 } }}
          />

          {/* Heart fill — fades in after outline completes */}
          <motion.path
            d="M100 145
               C 60 115, 30 95, 30 72
               C 30 50, 48 38, 65 38
               C 80 38, 92 48, 100 58
               C 108 48, 120 38, 135 38
               C 152 38, 170 50, 170 72
               C 170 95, 140 115, 100 145 Z"
            fill="#7B9473"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 0.15, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1], delay: 1.7 }}
            style={{ transformOrigin: '100px 95px' }}
          />

          {/* Inner decorative heart */}
          <motion.path
            d="M100 130
               C 72 110, 52 96, 52 78
               C 52 64, 63 56, 74 56
               C 84 56, 93 63, 100 71
               C 107 63, 116 56, 126 56
               C 137 56, 148 64, 148 78
               C 148 96, 128 110, 100 130 Z"
            fill="none"
            stroke="#7B9473"
            strokeWidth="0.7"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.35 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.8 }}
          />
        </motion.g>

        {/* Pulse rings — radiate outward on each heartbeat */}
        {[0, 0.15].map((delay, i) => (
          <motion.circle
            key={i}
            cx="100" cy="92" r="52"
            fill="none" stroke="#7B9473" strokeWidth="1.2"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: [0.9, 1.55], opacity: [0, 0.22, 0] }}
            transition={{
              duration: 0.9,
              ease: 'easeOut',
              delay: 2.15 + delay,
              repeat: Infinity,
              repeatDelay: 1.4 - delay,
            }}
            style={{ transformOrigin: '100px 92px' }}
          />
        ))}
      </motion.svg>

      {/* Text reveal */}
      <div className="relative overflow-hidden">
        <motion.p
          className="font-serif text-2xl text-charcoal/80 tracking-[0.25em]"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 1.4 }}
        >
          Loading
        </motion.p>
      </div>

      {/* Animated dots */}
      <div className="flex gap-1.5 mt-4">
        {[0, 1, 2].map(i => (
          <motion.span
            key={i}
            className="w-1 h-1 rounded-full bg-sage/50 inline-block"
            animate={{ opacity: [0.2, 1, 0.2], y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 1.2, delay: 1.8 + i * 0.2, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Bottom edge rule */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 h-px bg-sage/20"
        initial={{ width: 0 }}
        animate={{ width: 120 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
      />
    </motion.div>
  )
}

function ErrorScreen() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <h1 className="font-serif text-3xl text-charcoal mb-3">
          Invitation Not Found
        </h1>
        <p className="font-sans text-sm text-charcoal/50">
          This invitation link may be incorrect or has expired.
          Please check with the couple for the right link.
        </p>
      </motion.div>
    </div>
  )
}

function InvitationPage() {
  const { guest: initialGuest, details, images, isMock } = Route.useLoaderData()
  const [guest, setGuest] = useState(initialGuest)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative min-h-screen bg-cream overflow-x-hidden"
    >
      <FloralBackground />
      {isMock && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="fixed top-0 inset-x-0 z-50 bg-sage/90 backdrop-blur-sm text-white text-center py-2 px-4"
        >
          <p className="font-sans text-xs tracking-widest uppercase">
            Preview mode — connect Supabase to go live
          </p>
        </motion.div>
      )}
      <HeroSection details={details} guest={guest} />

      {/* Subtle section divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-sage/20 to-transparent" />

      <EventDetails details={details} />

      <div className="h-px bg-gradient-to-r from-transparent via-sage/20 to-transparent" />

      <LoveStory entries={details.love_story || []} />

      <div className="h-px bg-gradient-to-r from-transparent via-sage/20 to-transparent" />

      <Gallery images={images} />

      <div className="h-px bg-gradient-to-r from-transparent via-sage/20 to-transparent" />

      <RsvpForm guest={guest} onUpdate={setGuest} />

      <div className="h-px bg-gradient-to-r from-transparent via-sage/20 to-transparent" />

      <MessagesSection guestName={guest.name} />

      <Footer details={details} />
    </motion.div>
  )
}
