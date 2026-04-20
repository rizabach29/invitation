## Plan: Interactive Wedding Invitation App

Build a minimalistic, elegant wedding invitation SPA using **TanStack Router** (Vite, file-based routing), **Supabase** (DB + Storage), **Motion for React** (animations), and **Tailwind CSS**. Each guest gets a unique URL (`/invite/$slug`). A password-protected admin dashboard manages everything.

---

### Steps

**Phase 1: Project Scaffolding**
1. Initialize with `npx @tanstack/cli create --router-only` (Vite + TypeScript + Tailwind)
2. Install `motion`, `@supabase/supabase-js`
3. Configure Google Fonts — **Playfair Display** (serif, headings) + **Inter** (sans-serif, body)
4. Set up Supabase client + TypeScript types
5. Create `.env` with `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_ADMIN_PASSWORD`

**Phase 2: Supabase Setup** (SQL migrations provided)
6. Create tables: `wedding_details`, `guests`, `messages`, `gallery_images`
7. RLS policies: public SELECT on all tables, public INSERT on `messages`, public UPDATE on `guests` (RSVP fields only)
8. Storage buckets (`gallery`, `hero`) with public read

**Phase 3: Invitation Page** — *depends on Phase 1 & 2*
9. `AnimatedSection` — reusable `whileInView` wrapper using Motion
10. `HeroSection` — full-viewport with names, date, fade-in + scale animation
11. `CountdownTimer` — live countdown to wedding date
12. `EventDetails` — ceremony/reception venue with map link
13. `LoveStory` — vertical timeline with staggered entrance animations
14. `Gallery` — responsive grid with hover zoom, lightbox
15. `RsvpForm` — fetch guest by slug, submit RSVP to Supabase
16. `MessageForm` + `MessageWall` — submit and display messages
17. `Footer` — closing section
18. Wire all into `/invite/$slug` route with loader

**Phase 4: Dashboard** — *parallel with Phase 3*
19. Password gate layout (check against env var, store in sessionStorage)
20. Stats overview — total, confirmed, pending, declined
21. Guest management — CRUD, search/filter, bulk slug generation
22. Wedding details editor — all fields including love story entries (JSONB)
23. Gallery manager — upload to Supabase Storage, reorder, delete
24. Messages viewer — read and delete

**Phase 5: Polish**
25. Page transition animations
26. Mobile-first responsive pass
27. Loading states + error boundaries

---

### Supabase Schema

| Table | Key Columns |
|-------|------------|
| `wedding_details` | `groom_name`, `bride_name`, `wedding_date`, `ceremony_venue`, `ceremony_address`, `reception_venue`, `love_story` (JSONB array of `{year, title, description}`) |
| `guests` | `name`, `slug` (unique), `phone`, `group_name`, `max_attendees`, `rsvp_status`, `attendee_count` |
| `messages` | `guest_name`, `message` |
| `gallery_images` | `image_url`, `caption`, `sort_order` |

---

### Design Details

- **Typography**: Playfair Display (serif) for headings + Inter (sans-serif) for body
- **Colors**: Off-white `#FAFAF5` background, dark charcoal `#2C2C2C` text, warm gold accent `#B8860B`, muted rose `#C4A484`
- **Motion patterns**: `whileInView` fade-up reveals, staggered timeline items, hover zoom on gallery, `AnimatePresence` for page transitions

---

### Project Structure (key files)

- `src/routes/invite/$slug.tsx` — Main invitation page
- `src/routes/dashboard/route.tsx` — Dashboard layout with password gate
- `src/components/invitation/` — HeroSection, LoveStory, Gallery, RsvpForm, MessageForm, etc.
- `src/components/dashboard/` — GuestTable, GuestForm, WeddingDetailsForm, GalleryManager
- `src/lib/supabase.ts` — Client init
- `src/lib/types.ts` — Shared types

---

### Verification
1. `npm run dev` — app starts clean
2. `/invite/test-guest` — all sections render with animations
3. RSVP submit → Supabase updates
4. Message submit → appears in wall
5. `/dashboard` — password gate, CRUD for guests/details/gallery/messages
6. Mobile responsive at 375px / 768px / 1024px
7. Lighthouse 90+ mobile

---

### Decisions
- **Auth**: Simple env password (not Supabase Auth)
- **No SSR**: Pure SPA — fine for invitations
- **Excluded**: Email/WhatsApp notifications, QR codes, multi-language, music player

### Further Considerations
1. **Color theme** — I suggested warm gold + off-white. Prefer sage green, dusty blue, or blush pink?
2. **Map integration** — Embed Google Maps iframe or just link out?
3. **TanStack Table** — Use `@tanstack/react-table` for guest management or keep a simple custom table?
