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

-- Disable Row Level Security
ALTER TABLE wedding_details DISABLE ROW LEVEL SECURITY;
ALTER TABLE guests DISABLE ROW LEVEL SECURITY;
ALTER TABLE messages DISABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images DISABLE ROW LEVEL SECURITY;

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('gallery', 'gallery', true)
  ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('hero', 'hero', true)
  ON CONFLICT (id) DO NOTHING;

-- Storage policies (public access — no auth required)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public select gallery' AND tablename = 'objects') THEN
    CREATE POLICY "Public select gallery" ON storage.objects FOR SELECT USING (bucket_id = 'gallery');
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public insert gallery' AND tablename = 'objects') THEN
    CREATE POLICY "Public insert gallery" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'gallery');
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public update gallery' AND tablename = 'objects') THEN
    CREATE POLICY "Public update gallery" ON storage.objects FOR UPDATE USING (bucket_id = 'gallery');
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public delete gallery' AND tablename = 'objects') THEN
    CREATE POLICY "Public delete gallery" ON storage.objects FOR DELETE USING (bucket_id = 'gallery');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public select hero' AND tablename = 'objects') THEN
    CREATE POLICY "Public select hero" ON storage.objects FOR SELECT USING (bucket_id = 'hero');
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public insert hero' AND tablename = 'objects') THEN
    CREATE POLICY "Public insert hero" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'hero');
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public update hero' AND tablename = 'objects') THEN
    CREATE POLICY "Public update hero" ON storage.objects FOR UPDATE USING (bucket_id = 'hero');
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public delete hero' AND tablename = 'objects') THEN
    CREATE POLICY "Public delete hero" ON storage.objects FOR DELETE USING (bucket_id = 'hero');
  END IF;
END $$;
