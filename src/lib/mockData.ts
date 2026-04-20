import type { Guest, WeddingDetails, GalleryImage } from '@/lib/types'

export const MOCK_DETAILS: WeddingDetails = {
  id: 'mock-1',
  groom_name: 'Raka Pratama',
  bride_name: 'Ayu Sari',
  wedding_date: '2026-09-20T08:00:00+07:00',
  ceremony_venue: 'Pura Tirta Empul',
  ceremony_address: 'Jl. Tirta, Tampaksiring, Gianyar, Bali 80552',
  ceremony_time: '08:00',
  reception_venue: 'The Royal Pita Maha',
  reception_address: 'Jl. Kedewatan, Ubud, Gianyar, Bali 80571',
  reception_time: '11:00',
  love_story: [
    {
      year: 2019,
      title: 'First Meeting',
      description:
        'We first crossed paths at a friend\'s rooftop gathering in Jakarta. A shared laugh over a bad pun turned into hours of conversation neither of us wanted to end.',
    },
    {
      year: 2020,
      title: 'Distance Made Us Closer',
      description:
        'Lockdown kept us apart but our daily calls grew longer. We read the same books, watched the same sunsets through our screens, and fell deeper in love.',
    },
    {
      year: 2022,
      title: 'Adventures Together',
      description:
        'Our first trip together — a spontaneous drive to Yogyakarta. We got lost twice, found a hidden waterfall, and realised we were exactly where we needed to be.',
    },
    {
      year: 2024,
      title: 'The Proposal',
      description:
        'Under a canopy of stars in the Ubud rice fields, with fireflies as witnesses, Raka asked the question Ayu had been hoping for.',
    },
    {
      year: 2026,
      title: 'Forever Begins',
      description:
        'After two years of planning every detail with love, we are ready to begin the most beautiful chapter of our lives — together.',
    },
  ],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

export const MOCK_GUEST: Guest = {
  id: 'mock-guest-1',
  name: 'Dear Guest',
  slug: 'demo',
  phone: '',
  group_name: 'Family',
  max_attendees: 2,
  rsvp_status: 'pending',
  attendee_count: 0,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

export const MOCK_IMAGES: GalleryImage[] = [
  {
    id: 'img-1',
    image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    caption: 'A quiet morning walk',
    sort_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: 'img-2',
    image_url: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80',
    caption: 'Golden hour together',
    sort_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: 'img-3',
    image_url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',
    caption: 'Laughing in the rain',
    sort_order: 3,
    created_at: new Date().toISOString(),
  },
  {
    id: 'img-4',
    image_url: 'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=800&q=80',
    caption: 'Sunrise in the rice fields',
    sort_order: 4,
    created_at: new Date().toISOString(),
  },
  {
    id: 'img-5',
    image_url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
    caption: 'Holding on',
    sort_order: 5,
    created_at: new Date().toISOString(),
  },
  {
    id: 'img-6',
    image_url: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&q=80',
    caption: 'Our happy place',
    sort_order: 6,
    created_at: new Date().toISOString(),
  },
]

/** Returns true when Supabase env vars are not configured */
export function isSupabaseUnconfigured(): boolean {
  const url = import.meta.env.VITE_SUPABASE_URL
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY
  return !url || url === 'your_supabase_url' || !key || key === 'your_supabase_anon_key'
}
