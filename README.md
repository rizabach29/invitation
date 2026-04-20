# Interactive Wedding Invitation

A minimalistic, elegant wedding invitation SPA built with **TanStack Router**, **Supabase**, **Motion for React**, and **Tailwind CSS**.

## Features

- 🎨 Elegant, minimalistic design with serif/sans-serif typography
- 🎬 Smooth animations with Motion for React
- 🛏️ Each guest gets a unique invitation URL
- 💬 Message board for guests
- 🖼️ Pre-wedding gallery with animations
- 📊 Admin dashboard for managing guests and wedding details
- 📱 Fully responsive design

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env
```

Fill in your Supabase credentials in `.env`.

### 3. Set up Supabase

Create a new Supabase project and run the migrations in `supabase/migrations/`.

### 4. Run development server
```bash
npm run dev
```

Visit `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── invitation/      # Invitation page components
│   └── dashboard/       # Dashboard components
├── lib/
│   ├── supabase.ts     # Supabase client
│   └── types.ts        # TypeScript types
├── routes/
│   ├── __root.tsx      # Root layout
│   ├── index.tsx       # Home page
│   ├── invite/$slug.tsx # Invitation page
│   └── dashboard/      # Dashboard
├── main.tsx
└── index.css
```

## Environment Variables

- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key
- `VITE_ADMIN_PASSWORD` - Admin dashboard password

## Building

```bash
npm run build
npm run preview
```

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Routing**: TanStack Router
- **Animations**: Motion for React
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **Fonts**: Playfair Display (serif) + Inter (sans-serif)
- **Build**: Vite
