-- Create wedding_details table
CREATE TABLE IF NOT EXISTS wedding_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  groom_name TEXT NOT NULL,
  bride_name TEXT NOT NULL,
  wedding_date TIMESTAMP NOT NULL,
  ceremony_venue TEXT NOT NULL,
  ceremony_address TEXT NOT NULL,
  ceremony_time TEXT NOT NULL,
  reception_venue TEXT NOT NULL,
  reception_address TEXT NOT NULL,
  reception_time TEXT NOT NULL,
  love_story JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create guests table
CREATE TABLE IF NOT EXISTS guests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  phone TEXT,
  group_name TEXT,
  max_attendees INTEGER DEFAULT 1,
  rsvp_status TEXT DEFAULT 'pending' CHECK (rsvp_status IN ('pending', 'confirmed', 'declined')),
  attendee_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create gallery_images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  caption TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE wedding_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- RLS Policies for wedding_details (public read)
CREATE POLICY "Allow public select on wedding_details"
  ON wedding_details FOR SELECT
  USING (true);

-- RLS Policies for guests (public select and update RSVP)
CREATE POLICY "Allow public select on guests"
  ON guests FOR SELECT
  USING (true);

CREATE POLICY "Allow public update on guests RSVP"
  ON guests FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- RLS Policies for messages (public select and insert)
CREATE POLICY "Allow public select on messages"
  ON messages FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert on messages"
  ON messages FOR INSERT
  WITH CHECK (true);

-- RLS Policies for gallery_images (public read)
CREATE POLICY "Allow public select on gallery_images"
  ON gallery_images FOR SELECT
  USING (true);

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('gallery', 'gallery', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('hero', 'hero', true);

-- Set storage policies
CREATE POLICY "Allow public read on gallery"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'gallery');

CREATE POLICY "Allow public read on hero"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'hero');
