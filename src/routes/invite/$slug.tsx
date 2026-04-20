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
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-2 h-2 rounded-full bg-gold mx-auto"
        />
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-charcoal/30 mt-4">
          Loading
        </p>
      </motion.div>
    </div>
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
      className="min-h-screen bg-cream overflow-x-hidden"
    >
      {isMock && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="fixed top-0 inset-x-0 z-50 bg-gold/90 backdrop-blur-sm text-white text-center py-2 px-4"
        >
          <p className="font-sans text-xs tracking-widest uppercase">
            Preview mode — connect Supabase to go live
          </p>
        </motion.div>
      )}
      <HeroSection details={details} guest={guest} />

      {/* Subtle section divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <EventDetails details={details} />

      <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <LoveStory entries={details.love_story || []} />

      <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <Gallery images={images} />

      <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <RsvpForm guest={guest} onUpdate={setGuest} />

      <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <MessagesSection guestName={guest.name} />

      <Footer details={details} />
    </motion.div>
  )
}
