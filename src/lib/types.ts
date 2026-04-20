export type WeddingDetails = {
  id: string
  groom_name: string
  bride_name: string
  wedding_date: string
  ceremony_venue: string
  ceremony_address: string
  ceremony_time: string
  reception_venue: string
  reception_address: string
  reception_time: string
  love_story: LoveStoryEntry[]
  created_at: string
  updated_at: string
}

export type LoveStoryEntry = {
  year: number
  title: string
  description: string
}

export type Guest = {
  id: string
  name: string
  slug: string
  phone: string
  group_name: string
  max_attendees: number
  rsvp_status: 'pending' | 'confirmed' | 'declined'
  attendee_count: number
  created_at: string
  updated_at: string
}

export type Message = {
  id: string
  guest_name: string
  message: string
  created_at: string
}

export type GalleryImage = {
  id: string
  image_url: string
  caption: string
  sort_order: number
  created_at: string
}
