import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { supabase } from "@/lib/supabase";
import type { Guest, WeddingDetails, GalleryImage } from "@/lib/types";
import {
  MOCK_DETAILS,
  MOCK_GUEST,
  MOCK_IMAGES,
  isSupabaseUnconfigured,
} from "@/lib/mockData";
import { HeroSection } from "@/components/invitation/HeroSection";
import { EventDetails } from "@/components/invitation/EventDetails";
import { LoveStory } from "@/components/invitation/LoveStory";
import { Gallery } from "@/components/invitation/Gallery";
import { RsvpForm } from "@/components/invitation/RsvpForm";
import { MessagesSection } from "@/components/invitation/Messages";
import { Footer } from "@/components/invitation/Footer";
import { FloralBackground } from "@/components/invitation/FloralBackground";
import { SectionReveal } from "@/components/invitation/AnimatedSection";

type LoaderData = {
  guest: Guest;
  details: WeddingDetails;
  images: GalleryImage[];
  isMock: boolean;
};

export const Route = createFileRoute("/invite/$slug")({
  loader: async ({ params }): Promise<LoaderData> => {
    // ── Demo / no-Supabase fallback ──────────────────────────────────────────
    if (isSupabaseUnconfigured() || params.slug === "demo") {
      return {
        guest:
          params.slug === "demo"
            ? MOCK_GUEST
            : { ...MOCK_GUEST, slug: params.slug },
        details: MOCK_DETAILS,
        images: MOCK_IMAGES,
        isMock: true,
      };
    }

    // ── Live Supabase fetch ──────────────────────────────────────────────────
    const [guestRes, detailsRes, imagesRes] = await Promise.all([
      supabase.from("guests").select("*").eq("slug", params.slug).single(),
      supabase.from("wedding_details").select("*").limit(1).single(),
      supabase.from("gallery_images").select("*").order("sort_order"),
    ]);

    // Fall back to mock details if wedding_details table is empty
    const details = (detailsRes.data as WeddingDetails) ?? MOCK_DETAILS;

    if (guestRes.error || !guestRes.data) {
      // Unknown slug → show invitation with mock guest so the page still renders
      return {
        guest: { ...MOCK_GUEST, slug: params.slug, name: "Dear Guest" },
        details,
        images: (imagesRes.data || MOCK_IMAGES) as GalleryImage[],
        isMock: true,
      };
    }

    return {
      guest: guestRes.data as Guest,
      details,
      images: (imagesRes.data || MOCK_IMAGES) as GalleryImage[],
      isMock: false,
    };
  },
  component: InvitationPage,
  pendingComponent: LoadingScreen,
  errorComponent: ErrorScreen,
});

const LOVE_WORDS = [
  { word: "Cinta", lang: "Indonesia" },
  { word: "Love", lang: "English" },
  { word: "Amour", lang: "Français" },
  { word: "사랑", lang: "한국어" },
  { word: "حب", lang: "العربية" },
  { word: "愛", lang: "日本語" },
  // { word: "爱", lang: "中文" },
  // { word: "Liefde", lang: "Nederlands" },
  // { word: "Amor", lang: "Español" },
  // { word: "Amore", lang: "Italiano" },
  // { word: "Liebe", lang: "Deutsch" },
];

function LoadingScreen() {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: "#1a3d2b" }}
    >
      <div className="w-6 h-6 rounded-full border-2 border-white/30 border-t-white animate-spin" />
    </div>
  );
}

function IntroOverlay({ onDone }: { onDone: () => void }) {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorOn, setCursorOn] = useState(true);
  const wordCountRef = useRef(0);
  const doneCalledRef = useRef(false);

  // Typing / deleting loop
  useEffect(() => {
    const current = LOVE_WORDS[wordIndex].word;
    let t: ReturnType<typeof setTimeout>;
    if (!isDeleting && displayText === current) {
      t = setTimeout(() => setIsDeleting(true), 950);
    } else if (isDeleting && displayText === "") {
      wordCountRef.current += 1;
      if (wordCountRef.current >= LOVE_WORDS.length && !doneCalledRef.current) {
        doneCalledRef.current = true;
        onDone();
        return;
      }
      setIsDeleting(false);
      setWordIndex((i) => (i + 1) % LOVE_WORDS.length);
    } else if (isDeleting) {
      t = setTimeout(() => setDisplayText((s) => s.slice(0, -1)), 42);
    } else {
      t = setTimeout(
        () => setDisplayText(current.slice(0, displayText.length + 1)),
        85,
      );
    }
    return () => clearTimeout(t);
  }, [displayText, wordIndex, isDeleting, onDone]);

  // Blinking cursor
  useEffect(() => {
    const id = setInterval(() => setCursorOn((v) => !v), 520);
    return () => clearInterval(id);
  }, []);

  const isRTL = LOVE_WORDS[wordIndex].lang === "العربية";

  return (
    <motion.div
      key="intro-overlay"
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#1a3d2b" }}
      initial={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.18 }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Subtle vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.35) 100%)",
        }}
      />

      <div className="relative flex flex-col items-center gap-4">
        {/* Typed word + cursor */}
        <div
          className="font-serif text-5xl sm:text-6xl text-white tracking-[0.1em] min-w-[240px] text-center"
          style={{ direction: isRTL ? "rtl" : "ltr" }}
        >
          {displayText}
          <span
            className="inline-block w-[3px] h-10 bg-white/80 align-middle ml-1 translate-y-[-2px] rounded-full"
            style={{ opacity: cursorOn ? 1 : 0, transition: "opacity 0.08s" }}
          />
        </div>

        {/* Language label */}
        <motion.p
          key={wordIndex}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 0.45, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="font-sans text-[0.6rem] tracking-[0.38em] uppercase text-white/50"
        >
          {LOVE_WORDS[wordIndex].lang}
        </motion.p>
      </div>

      {/* Bottom decorative line */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 h-px bg-white/20"
        initial={{ width: 0 }}
        animate={{ width: 100 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  );
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
          This invitation link may be incorrect or has expired. Please check
          with the couple for the right link.
        </p>
      </motion.div>
    </div>
  );
}

function InvitationPage() {
  const {
    guest: initialGuest,
    details,
    images,
    isMock,
  } = Route.useLoaderData();
  const [guest, setGuest] = useState(initialGuest);
  const [introVisible, setIntroVisible] = useState(true);
  const [entered, setEntered] = useState(false);

  const handleIntroDone = () => {
    setIntroVisible(false);
    // Delay matches parent fade-in (0.9s) so curtain splits as page zooms in
    setTimeout(() => setEntered(true), 900);
  };

  return (
    <>
      <AnimatePresence>
        {introVisible && <IntroOverlay onDone={handleIntroDone} />}
      </AnimatePresence>

      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{
          scale: introVisible ? 0.96 : 1,
          opacity: introVisible ? 0 : 1,
        }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
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
        <HeroSection details={details} guest={guest} entered={entered} />

        {/* ── Event Details — charcoal dark ────────────────────────────── */}
        <SectionReveal className="relative bg-charcoal overflow-hidden">
          {/* subtle texture overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.5) 2px,rgba(255,255,255,0.5) 3px)",
            }}
          />
          <EventDetails details={details} dark />
        </SectionReveal>

        {/* ── Love Story — warm cream ───────────────────────────────────── */}
        <SectionReveal className="relative bg-cream overflow-hidden">
          <FloralBackground />
          <LoveStory entries={details.love_story || []} />
        </SectionReveal>

        {/* ── Gallery — near-black with grain ──────────────────────────── */}
        <SectionReveal
          className="relative overflow-hidden"
          style={{ backgroundColor: "#18211a" } as React.CSSProperties}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
              backgroundSize: "128px",
              opacity: 0.5,
            }}
          />
          <Gallery images={images} dark />
        </SectionReveal>

        {/* ── RSVP — sage-tinted cream ──────────────────────────────────── */}
        <SectionReveal className="relative bg-[#eef0ea] overflow-hidden">
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-sage/5 via-transparent to-transparent" />
          <RsvpForm guest={guest} onUpdate={setGuest} />
        </SectionReveal>

        {/* ── Messages — white ──────────────────────────────────────────── */}
        <SectionReveal className="relative bg-white overflow-hidden">
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-cream/40 to-transparent" />
          <MessagesSection guestName={guest.name} />
        </SectionReveal>

        {/* ── Footer — charcoal dark ────────────────────────────────────── */}
        <SectionReveal className="relative bg-charcoal overflow-hidden">
          <Footer details={details} dark />
        </SectionReveal>
      </motion.div>
    </>
  );
}
