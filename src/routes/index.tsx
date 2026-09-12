import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Calendar,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  ExternalLink,
  Heart,
  Image as ImageIcon,
  Layers,
  Music,
  Music2,
  Pause,
  Pizza,
  Play,
  ShieldAlert,
  Sparkles,
  Utensils,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  allPhotos,
  childhoodPhotos,
  primePhotos,
  recentPhotos,
  type PhotoItem,
} from "@/lib/photos";

// Target is 13 September 2026, 12:00:00 AM IST (18:30:00 UTC)
const TARGET = new Date("2026-09-12T18:30:00.000Z").getTime();

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A Little World for Akkoww — Happy Birthday" },
      {
        name: "description",
        content:
          "A cinematic birthday surprise made with love, childhood memories, golden prime years, and present celebrations.",
      },
      { property: "og:title", content: "A Little World for Akkoww" },
      { property: "og:description", content: "Happy Birthday, Akkoww ❤️" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BirthdayExperience,
});

function Particles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {Array.from({ length: 22 }, (_, i) => (
        <i className="particle" key={i} />
      ))}
    </div>
  );
}

function useReveals() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        }),
      { threshold: 0.12 }
    );
    const nodes = document.querySelectorAll(".reveal, .letter-lines");
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function BirthdayExperience() {
  const [now, setNow] = useState<number | null>(null);
  const [stage, setStage] = useState<"countdown" | "transition" | "birthday">("countdown");
  const [hasStartedAudio, setHasStartedAudio] = useState(false);

  // Audio elements references
  const heroAudioRef = useRef<HTMLAudioElement | null>(null);
  const siblingAudioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState<"hero" | "sibling" | "none">("hero");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useReveals();

  // Clock ticker
  useEffect(() => {
    setNow(Date.now());
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Check URL query parameters for dev testing: ?stage=countdown or ?stage=birthday
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlStage = params.get("stage");
      if (urlStage === "countdown" || urlStage === "birthday" || urlStage === "transition") {
        setStage(urlStage);
        return;
      }
      // If time has passed target, auto transition
      if (Date.now() >= TARGET) {
        setStage("birthday");
      }
    }
  }, []);

  // Automatic countdown transition at midnight IST
  useEffect(() => {
    if (stage === "countdown" && now !== null && now >= TARGET) {
      triggerMidnightReveal();
    }
  }, [now, stage]);

  const triggerMidnightReveal = () => {
    setStage("transition");
    playHeroSongOnce();
    // After 5 seconds transition to Birthday World
    window.setTimeout(() => {
      setStage("birthday");
    }, 5200);
  };

  // Function to play aftercountdown.mp3 for one time
  const playHeroSongOnce = () => {
    if (heroAudioRef.current) {
      siblingAudioRef.current?.pause();
      heroAudioRef.current.loop = false; // "play on after the count down for one time"
      heroAudioRef.current.currentTime = 0;
      heroAudioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setCurrentTrack("hero");
          setHasStartedAudio(true);
        })
        .catch(() => {
          // Autoplay blocked by browser policy until interaction
          setIsPlaying(false);
        });
    }
  };

  // Function to play me-nd-u.mp3 for sibling photo sections
  const playSiblingSong = () => {
    if (siblingAudioRef.current) {
      heroAudioRef.current?.pause();
      siblingAudioRef.current.loop = true;
      siblingAudioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setCurrentTrack("sibling");
          setHasStartedAudio(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  };

  // Observe scroll position to dynamically switch songs between Hero and Photos
  useEffect(() => {
    if (stage !== "birthday") return;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight * 0.85;

      // When near top (Hero section), Hero track plays
      if (scrollY < heroHeight) {
        if (currentTrack !== "hero" && isPlaying) {
          playHeroSongOnce();
        }
      } else {
        // When scrolled into Childhood/Photos/Story sections, Me & U plays
        if (currentTrack !== "sibling" && isPlaying) {
          playSiblingSong();
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [stage, currentTrack, isPlaying]);

  // Audio toggles
  const togglePlay = () => {
    if (isPlaying) {
      heroAudioRef.current?.pause();
      siblingAudioRef.current?.pause();
      setIsPlaying(false);
    } else {
      if (currentTrack === "hero") {
        playHeroSongOnce();
      } else {
        playSiblingSong();
      }
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (heroAudioRef.current) heroAudioRef.current.muted = nextMuted;
    if (siblingAudioRef.current) siblingAudioRef.current.muted = nextMuted;
  };

  const switchTrack = (track: "hero" | "sibling") => {
    if (track === "hero") {
      playHeroSongOnce();
    } else {
      playSiblingSong();
    }
  };

  return (
    <>
      {/* Real HTML5 Audio Elements */}
      <audio
        ref={heroAudioRef}
        src="/audio/aftercountdown.mp3"
        preload="auto"
        onEnded={() => {
          // If song ends and still in hero, mark finished
          if (currentTrack === "hero") {
            setIsPlaying(false);
          }
        }}
      />
      <audio
        ref={siblingAudioRef}
        src="/audio/me-nd-u.mp3"
        preload="auto"
        loop
      />

      {stage === "countdown" && (
        <Countdown
          now={now}
          onSimulateReveal={triggerMidnightReveal}
          onDirectUnlock={() => {
            setStage("birthday");
            playHeroSongOnce();
          }}
        />
      )}

      {stage === "transition" && <MidnightReveal />}

      {stage === "birthday" && (
        <BirthdayWorld
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          isMuted={isMuted}
          onTogglePlay={togglePlay}
          onToggleMute={toggleMute}
          onSwitchTrack={switchTrack}
          onScrollToChildhood={() => {
            playSiblingSong();
          }}
        />
      )}
    </>
  );
}

// STATE 1: COUNTDOWN PAGE
function Countdown({
  now,
  onSimulateReveal,
  onDirectUnlock,
}: {
  now: number | null;
  onSimulateReveal: () => void;
  onDirectUnlock: () => void;
}) {
  const total = now === null ? null : Math.max(0, TARGET - now);
  const units =
    total === null
      ? [null, null, null, null]
      : [
          Math.floor(total / 86400000),
          Math.floor(total / 3600000) % 24,
          Math.floor(total / 60000) % 60,
          Math.floor(total / 1000) % 60,
        ];

  return (
    <main className="film-grain relative grid min-h-[100svh] place-items-center overflow-hidden bg-background px-5 text-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,var(--rose-glow),transparent_38%)]" />
      <Particles />
      <section className="cinematic-enter relative z-10 mx-auto w-full max-w-4xl">
        <Sparkles className="mx-auto mb-8 size-5 text-gold animate-pulse" />
        <p className="mb-5 text-xs font-medium uppercase tracking-[.38em] text-gold">
          A little secret
        </p>
        <h1 className="font-display text-4xl leading-tight sm:text-6xl md:text-7xl">
          Something special is
          <br className="hidden sm:block" /> waiting for you…
        </h1>
        <p className="mt-6 text-base font-light text-muted-foreground sm:text-lg">
          Come back when the clock strikes 12.
        </p>

        {/* Live Timer */}
        <div
          className="mx-auto my-12 grid max-w-2xl grid-cols-4 gap-2 sm:gap-5"
          aria-label="Countdown to September 13, 2026 at midnight India time"
        >
          {units.map((unit, i) => (
            <div
              key={i}
              className="border-y border-border bg-card/30 py-5 backdrop-blur-sm sm:py-7 rounded-lg"
            >
              <span className="block font-display text-3xl tabular-nums sm:text-5xl text-foreground">
                {unit === null ? "––" : String(unit).padStart(2, "0")}
              </span>
              <span className="mt-2 block text-[9px] uppercase tracking-[.22em] text-muted-foreground sm:text-[10px]">
                {["Days", "Hours", "Minutes", "Seconds"][i]}
              </span>
            </div>
          ))}
        </div>

        <p className="text-xs uppercase tracking-[.28em] text-gold">Until her special day</p>
        <p className="mt-12 font-display text-base italic text-muted-foreground">
          The wait will be worth it.
        </p>

        {/* Preview / Dev Controls */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button
            variant="cinematic"
            size="sm"
            onClick={onSimulateReveal}
            className="gap-2 text-xs"
          >
            <Play className="size-3.5 fill-current" />
            <span>Play Reveal with Birthday Song</span>
          </Button>
          <Button
            variant="glass"
            size="sm"
            onClick={onDirectUnlock}
            className="text-xs"
          >
            <span>Open Birthday World Directly</span>
          </Button>
        </div>
      </section>
    </main>
  );
}

// TRANSITION: MIDNIGHT REVEAL (Plays aftercountdown.mp3 while displaying Happy Birthday)
function MidnightReveal() {
  return (
    <main className="film-grain relative grid min-h-[100svh] place-items-center overflow-hidden bg-ink px-6 text-center">
      <div className="absolute size-[55vw] rounded-full bg-rose-glow blur-[120px] motion-safe:animate-[breathe_3s_ease-in-out_infinite]" />
      <Particles />
      <div className="relative z-10">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[.35em] text-gold animate-pulse">
          <Sparkles className="size-4" />
          <span>The Wait is Over • 12:00 AM</span>
        </div>
        <p className="animate-[cinematic-in_1.6s_ease_.5s_both] font-display text-2xl italic text-muted-foreground sm:text-4xl">
          It’s finally your day…
        </p>
        <h1 className="mt-7 animate-[cinematic-in_1.7s_ease_1.8s_both] font-display text-4xl sm:text-7xl lg:text-8xl">
          HAPPY BIRTHDAY,
          <br />
          <span className="text-primary italic">AKKOWW</span>{" "}
          <Heart className="inline size-[.7em] fill-primary text-primary animate-bounce" />
        </h1>
        <p className="mt-7 animate-[cinematic-in_1.5s_ease_3s_both] text-sm font-light tracking-wide text-muted-foreground sm:text-xl">
          To one of the most special people in my life.
        </p>
      </div>
    </main>
  );
}

function SectionHeading({
  eyebrow,
  title,
  copy,
  icon: Icon = Sparkles,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  icon?: typeof Sparkles;
}) {
  return (
    <header className="reveal mb-14 max-w-3xl">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1 text-[11px] font-medium uppercase tracking-[.32em] text-gold backdrop-blur-md">
        <Icon className="size-3.5" />
        <span>{eyebrow}</span>
      </div>
      <h2 className="font-display text-4xl leading-tight sm:text-6xl">{title}</h2>
      {copy && (
        <p className="mt-5 max-w-xl font-light leading-relaxed text-muted-foreground sm:text-lg">
          {copy}
        </p>
      )}
    </header>
  );
}

// STATE 2: THE BIRTHDAY WORLD
function BirthdayWorld({
  currentTrack,
  isPlaying,
  isMuted,
  onTogglePlay,
  onToggleMute,
  onSwitchTrack,
  onScrollToChildhood,
}: {
  currentTrack: "hero" | "sibling" | "none";
  isPlaying: boolean;
  isMuted: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onSwitchTrack: (track: "hero" | "sibling") => void;
  onScrollToChildhood: () => void;
}) {
  const [activePhotoList, setActivePhotoList] = useState<PhotoItem[]>(allPhotos);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [surprise, setSurprise] = useState(false);

  const openLightbox = (list: PhotoItem[], index: number) => {
    setActivePhotoList(list);
    setLightboxIndex(index);
  };

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight")
        setLightboxIndex((lightboxIndex + 1) % activePhotoList.length);
      if (e.key === "ArrowLeft")
        setLightboxIndex(
          (lightboxIndex - 1 + activePhotoList.length) % activePhotoList.length
        );
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, activePhotoList]);

  return (
    <main className="film-grain min-h-screen bg-background text-foreground">
      {/* Dual Track Music Controller */}
      <DualTrackAudioBar
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        isMuted={isMuted}
        onTogglePlay={onTogglePlay}
        onToggleMute={onToggleMute}
        onSwitchTrack={onSwitchTrack}
      />

      <Hero onScrollDown={onScrollToChildhood} />
      <QuickNav />
      <ChildhoodSection onOpen={(idx) => openLightbox(childhoodPhotos, idx)} />
      <PrimeSection onOpen={(idx) => openLightbox(primePhotos, idx)} />
      <RecentSection onOpen={(idx) => openLightbox(recentPhotos, idx)} />
      <Story onOpenStoryPhoto={(photo) => openLightbox([photo], 0)} />
      <Letter />
      <SiblingTreatSection />
      <Polaroids onOpen={(photo) => openLightbox([photo], 0)} />

      {/* Surprise trigger section */}
      <section className="relative overflow-hidden py-32 text-center">
        <Particles />
        <div className="reveal relative z-10 mx-auto max-w-xl px-6">
          <Sparkles className="mx-auto mb-6 size-6 text-gold animate-pulse" />
          <h2 className="font-display text-4xl sm:text-6xl">Still not done.</h2>
          <p className="mt-5 text-muted-foreground sm:text-lg">
            There’s one tiny thing left just for you.
          </p>
          <Button
            variant="cinematic"
            size="lg"
            className="mt-9 text-base"
            onClick={() => setSurprise(true)}
          >
            One more surprise…
          </Button>
        </div>
      </section>

      <Finale />

      {lightboxIndex !== null && (
        <Lightbox
          list={activePhotoList}
          index={lightboxIndex}
          close={() => setLightboxIndex(null)}
          move={(dir) =>
            setLightboxIndex(
              (lightboxIndex + dir + activePhotoList.length) % activePhotoList.length
            )
          }
        />
      )}

      {surprise && <Surprise close={() => setSurprise(false)} />}
    </main>
  );
}

// FLOATING DUAL-TRACK AUDIO PLAYER
function DualTrackAudioBar({
  currentTrack,
  isPlaying,
  isMuted,
  onTogglePlay,
  onToggleMute,
  onSwitchTrack,
}: {
  currentTrack: "hero" | "sibling" | "none";
  isPlaying: boolean;
  isMuted: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onSwitchTrack: (track: "hero" | "sibling") => void;
}) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full border border-border/80 bg-background/90 p-2 shadow-2xl backdrop-blur-xl">
      {/* Current Track Pill */}
      <div className="hidden sm:flex items-center gap-2 px-3 text-xs">
        <span className="size-2 rounded-full bg-primary animate-ping" />
        <span className="font-medium text-foreground/90">
          {currentTrack === "hero" ? "🎵 Hero Song (aftercountdown.mp3)" : "🎵 Photos Song (Me & U)"}
        </span>
      </div>

      {/* Switch Track Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onSwitchTrack(currentTrack === "hero" ? "sibling" : "hero")}
        className="h-8 px-2.5 text-xs text-gold hover:text-gold"
        title="Switch song"
      >
        <Music className="size-3.5 mr-1" />
        <span>{currentTrack === "hero" ? "Play Me & U" : "Play Hero Song"}</span>
      </Button>

      {/* Play / Pause */}
      <Button
        variant="glass"
        size="icon"
        onClick={onTogglePlay}
        className="size-8 rounded-full"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? <Pause className="size-4" /> : <Play className="size-4 fill-current" />}
      </Button>

      {/* Mute / Unmute */}
      <Button
        variant="glass"
        size="icon"
        onClick={onToggleMute}
        className="size-8 rounded-full"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX className="size-4 text-rose-400" /> : <Volume2 className="size-4" />}
      </Button>
    </div>
  );
}

function QuickNav() {
  const links = [
    { href: "#childhood", label: "Childhood", count: "10" },
    { href: "#prime", label: "The Prime Era", count: "38" },
    { href: "#recent", label: "2024–26 Bloom", count: "15" },
    { href: "#story", label: "Our Story", count: "6 Chapters" },
    { href: "#letter", label: "The Letter", count: "❤️" },
    { href: "#treat", label: "Treat Tax", count: "🍕" },
  ];

  return (
    <nav className="sticky top-4 z-40 mx-auto -mt-6 max-w-fit px-4">
      <div className="flex flex-wrap items-center justify-center gap-2 rounded-full border border-border/80 bg-background/80 p-1.5 shadow-2xl backdrop-blur-xl">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="group inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium text-foreground/80 transition-all hover:bg-card hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span>{link.label}</span>
            <span className="rounded-full bg-gold/15 px-1.5 py-0.5 text-[10px] font-semibold text-gold group-hover:bg-primary/20 group-hover:text-primary">
              {link.count}
            </span>
          </a>
        ))}
      </div>
    </nav>
  );
}

function Hero({ onScrollDown }: { onScrollDown: () => void }) {
  return (
    <section id="hero" className="relative min-h-[100svh] overflow-hidden">
      <img
        src="/photos/2024-26/07_recent.jpeg"
        alt="Akkoww in a green saree holding flowers"
        className="absolute inset-0 h-full w-full object-cover object-[50%_24%] opacity-65 transition-transform duration-1000 ease-out hover:scale-105"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,transparent_20%,var(--background)_85%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--ink)_0%,transparent_35%,var(--background)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--ink)_0%,transparent_60%)] opacity-85" />
      <Particles />

      <div className="relative z-10 flex min-h-[100svh] max-w-7xl items-end px-6 pb-20 sm:px-10 sm:pb-24 lg:px-20">
        <div className="cinematic-enter max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[.38em] text-gold backdrop-blur-md">
            <Sparkles className="size-3.5" />
            <span>13 • 09 • 2026</span>
          </div>
          <h1 className="font-display text-5xl leading-[1.08] sm:text-7xl lg:text-8xl">
            Happy Birthday,
            <br />
            <span className="italic text-primary">Akkoww</span>{" "}
            <Heart className="inline size-[.65em] fill-primary text-primary" />
          </h1>
          <p className="mt-7 max-w-xl text-base font-light leading-relaxed text-foreground/90 sm:text-xl">
            From playful childhood steps to your golden prime and the beautiful person you are today —
            here is your world, preserved forever.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button
              asChild
              variant="cinematic"
              size="lg"
              className="text-sm cursor-pointer"
              onClick={onScrollDown}
            >
              <a href="#childhood">
                Step into Childhood <ChevronDown className="ml-1 size-4" />
              </a>
            </Button>
            <Button asChild variant="glass" size="lg" className="text-sm">
              <a href="#prime">The Prime Era</a>
            </Button>
            <Button asChild variant="glass" size="lg" className="text-sm">
              <a href="#treat">Pay Treat Tax 🍕</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// SECTION 1: CHILDHOOD PHOTOS (Exact chronological order: young to older childhood)
function ChildhoodSection({ onOpen }: { onOpen: (i: number) => void }) {
  return (
    <section id="childhood" className="mx-auto max-w-7xl px-5 py-28 sm:px-10 lg:py-36">
      <SectionHeading
        eyebrow="Childhood • Where it all began"
        title="Little steps, pure smiles."
        copy="Arranged in chronological order from her very first birthday celebration and toddler years to classical dance and school days."
        icon={Calendar}
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {childhoodPhotos.map((photo, i) => (
          <article
            key={photo.id}
            className="reveal group relative flex flex-col overflow-hidden rounded-xl border border-border/70 bg-card/60 shadow-xl backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10"
          >
            <div
              className="relative aspect-[4/3] w-full cursor-zoom-in overflow-hidden bg-muted"
              onClick={() => onOpen(i)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading={i > 2 ? "lazy" : "eager"}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />

              <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-black/60 px-3 py-1 text-[11px] font-medium text-gold backdrop-blur-md">
                <span className="size-1.5 rounded-full bg-gold animate-pulse" />
                {photo.badge}
              </div>

              <div className="absolute right-3 top-3 font-display text-xs font-semibold tracking-wider text-white/70">
                #{String(i + 1).padStart(2, "0")}
              </div>
            </div>

            <div className="flex flex-1 flex-col p-5">
              <div className="mb-2 flex items-center justify-between text-xs text-primary">
                <span className="uppercase tracking-[.22em] font-medium">{photo.year}</span>
                <span className="text-muted-foreground text-[11px]">Chapter 0{i + 1}</span>
              </div>
              <p className="text-sm font-light leading-relaxed text-foreground/85">
                {photo.caption}
              </p>
              <button
                onClick={() => onOpen(i)}
                className="mt-4 flex items-center gap-1.5 text-xs font-medium text-gold transition-colors hover:text-primary"
              >
                <ImageIcon className="size-3.5" />
                <span>View high resolution</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// SECTION 2: THE PRIME ERA (38 Photos)
function PrimeSection({ onOpen }: { onOpen: (i: number) => void }) {
  const [expanded, setExpanded] = useState(false);
  const visiblePhotos = expanded ? primePhotos : primePhotos.slice(0, 12);

  return (
    <section id="prime" className="border-y border-border/80 bg-ink/50 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="The Prime Era • 38 Memories"
            title="The golden years & nonstop laughs."
            copy="The school uniforms, the matching red shirts, goofy teenage selfies, family trips, and the moments when life felt unstoppable."
            icon={Layers}
          />
          <div className="mb-14">
            <Button
              variant="cinematic"
              size="default"
              onClick={() => setExpanded(!expanded)}
              className="gap-2"
            >
              <span>{expanded ? "Show Curated (12)" : `View All 38 Photos`}</span>
              <ChevronDown className={`size-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
            </Button>
          </div>
        </div>

        <div className="columns-2 gap-4 sm:columns-3 lg:columns-4 [column-fill:_balance]">
          {visiblePhotos.map((photo, i) => (
            <figure
              key={photo.id}
              onClick={() => onOpen(i)}
              className="reveal group relative mb-4 block cursor-zoom-in break-inside-avoid overflow-hidden rounded-lg border border-border/60 bg-card shadow-lg transition duration-500 hover:-translate-y-1.5 hover:border-primary/60 hover:shadow-2xl"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 p-3 text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="block text-[10px] uppercase tracking-wider text-gold">
                  Prime #{i + 1}
                </span>
                <p className="line-clamp-2 mt-1 font-light text-white/90">{photo.caption}</p>
              </div>
            </figure>
          ))}
        </div>

        {!expanded && (
          <div className="mt-10 text-center">
            <Button
              variant="glass"
              size="lg"
              onClick={() => setExpanded(true)}
              className="gap-2 text-sm"
            >
              <Sparkles className="size-4 text-gold" />
              <span>Explore remaining {primePhotos.length - 12} Prime memories</span>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

// SECTION 3: 2024–2026 RECENT BLOOM (15 Photos)
function RecentSection({ onOpen }: { onOpen: (i: number) => void }) {
  return (
    <section id="recent" className="mx-auto max-w-7xl px-5 py-28 sm:px-10 lg:py-36">
      <SectionHeading
        eyebrow="2024 – 2026 • The Present Bloom"
        title="Her world right now."
        copy="The calm, the poise, and the graceful moments that make today so special."
        icon={Heart}
      />

      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [column-fill:_balance]">
        {recentPhotos.map((photo, i) => (
          <button
            key={photo.id}
            onClick={() => onOpen(i)}
            className="reveal group relative mb-5 block w-full cursor-zoom-in break-inside-avoid overflow-hidden rounded-xl border border-border/60 bg-card text-left shadow-2xl transition duration-500 hover:-translate-y-1.5 hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading={i > 2 ? "lazy" : "eager"}
              className="w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute inset-x-0 bottom-0 p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="inline-block rounded-full bg-primary/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                {photo.badge}
              </span>
              <p className="mt-2 text-sm font-light text-foreground">{photo.caption}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

// SECTION 4: STORY TIMELINE
function Story({ onOpenStoryPhoto }: { onOpenStoryPhoto: (photo: PhotoItem) => void }) {
  const entries: [string, string, PhotoItem][] = [
    [
      "How it started",
      "Two lives sharing a home, before either of us knew how much the other would come to mean.",
      childhoodPhotos[2],
    ],
    [
      "The chaos",
      "The noise, the nonsense, the random moments no one else would ever understand.",
      primePhotos[1],
    ],
    [
      "The laughs",
      "The kind that arrive at the worst time and make it impossible to stay serious.",
      recentPhotos[8],
    ],
    [
      "The fights",
      "Brief storms. Dramatic silences. And somehow, always finding our way back.",
      recentPhotos[4],
    ],
    [
      "The unforgettable moments",
      "Little snapshots that became the story of us without asking permission.",
      recentPhotos[3],
    ],
    [
      "And everything in between…",
      "Every ordinary day that became extraordinary simply because you were there.",
      recentPhotos[6],
    ],
  ];

  return (
    <section id="story" className="border-y border-border bg-ink/60 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionHeading
          eyebrow="Our story"
          title="A thousand little chapters."
          copy="A chronicle of the moments that made us who we are."
        />
        <div className="relative ml-3 border-l border-gold/30 sm:ml-0">
          {entries.map(([title, copy, photo], i) => (
            <article
              key={title}
              className="reveal relative grid gap-7 py-12 pl-8 sm:grid-cols-2 sm:items-center sm:gap-16 sm:pl-16"
            >
              <span className="absolute -left-[5px] top-16 size-2.5 rounded-full bg-gold shadow-[0_0_18px_var(--gold)]" />
              <div className={i % 2 ? "sm:order-2" : ""}>
                <p className="text-xs uppercase tracking-[.3em] text-primary">
                  Chapter {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-3xl sm:text-5xl">{title}</h3>
                <p className="mt-5 max-w-md font-light leading-7 text-muted-foreground">{copy}</p>
              </div>
              <button
                onClick={() => onOpenStoryPhoto(photo)}
                className="group relative cursor-zoom-in overflow-hidden rounded-lg shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 transition-opacity group-hover:opacity-100" />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// SECTION 5: HANDWRITTEN LETTER
function Letter() {
  return (
    <section id="letter" className="relative overflow-hidden px-5 py-28 sm:py-36">
      <div className="absolute left-1/2 top-1/2 size-[65vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-glow blur-[140px]" />
      <div className="relative mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="A little something from me"
          title="For you, always."
          copy="A small note from the heart that words can barely capture."
        />
        <article className="letter-lines cinematic-glow rounded-xl border border-border bg-card/75 p-7 backdrop-blur-xl sm:p-14">
          <p className="font-hand text-3xl text-primary sm:text-4xl">Happy Birthday ❤️</p>
          <p>Life would honestly be a lot more boring without you.</p>
          <p>
            From the random conversations and stupid laughs to the little fights and unforgettable
            moments, every memory with you has become a part of my life that I wouldn&apos;t trade for
            anything.
          </p>
          <p>
            You may annoy me sometimes, drive me crazy occasionally, and somehow still manage to make me
            laugh five minutes later.
          </p>
          <p>But that&apos;s what makes our bond special.</p>
          <p>
            I hope this year brings you everything you&apos;ve been wishing for — happiness, peace,
            success, amazing memories and people who genuinely value you.
          </p>
          <p>Keep smiling, keep being yourself, and never forget how special you are.</p>
          <p>Happy Birthday once again ❤️</p>
          <p className="font-display italic text-gold">Here&apos;s to another year of memories.</p>
        </article>
      </div>
    </section>
  );
}

// SECTION 6: HILARIOUS SIBLING TREAT / UPI QR SECTION (Replaces "Things I Love About You")
function SiblingTreatSection() {
  const [copied, setCopied] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number>(250);
  const upiId = "9344227218@yespop";
  const upiName = "Dhanush S";

  const treatOptions = [
    { amount: 100, label: "Ice Cream & Chocolates 🍫", emoji: "🍦" },
    { amount: 250, label: "Hot Pizza & Coke 🍕", emoji: "🍕" },
    { amount: 500, label: "Grand Biryani Feast 🍗", emoji: "🍗" },
    { amount: 1000, label: "Best Sister of the Century Tax 👑", emoji: "👑" },
  ];

  const upiPayLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
    upiName
  )}&am=${selectedAmount}&cu=INR&tn=${encodeURIComponent(
    `Birthday Treat from Akkoww (₹${selectedAmount})`
  )}`;

  const copyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="treat" className="relative overflow-hidden border-y border-border bg-ink/75 py-28 sm:py-36">
      <div className="pointer-events-none absolute -left-20 top-20 size-80 rounded-full bg-orange-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 bottom-20 size-96 rounded-full bg-rose-500/10 blur-[140px]" />
      <Particles />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-10">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[.32em] text-orange-400 backdrop-blur-md">
            <Pizza className="size-3.5" />
            <span>Mandatory Sibling Tax • Official Law</span>
          </div>
          <h2 className="font-display text-4xl leading-tight sm:text-6xl">
            Emotional drama over.
            <br />
            <span className="italic text-orange-400">Now give me my treat!</span> 😂🍕
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-light leading-relaxed text-muted-foreground sm:text-lg">
            You just saw all 63 photos, your cute childhood pics, and my sweet letter...
            Did you really think that was free?! Sibling treat tax is now officially due.
          </p>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* POP UPI QR CARD (Exact Pop App Design from Screenshot) */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -left-6 -top-6 flex size-12 items-center justify-center rounded-full border-2 border-orange-300 bg-gradient-to-br from-orange-400 to-orange-600 shadow-xl shadow-orange-500/40 animate-bounce">
                <span className="text-xs font-black text-white">pop</span>
              </div>
              <div className="absolute -right-4 top-1/2 flex size-10 items-center justify-center rounded-full border-2 border-orange-300 bg-gradient-to-br from-orange-400 to-orange-600 shadow-xl shadow-orange-500/40 animate-pulse">
                <span className="text-[10px] font-black text-white">P</span>
              </div>

              <div className="rounded-3xl border border-white/20 bg-white p-7 text-center shadow-[0_25px_70px_-15px_rgba(240,68,28,0.35)] sm:p-9">
                <div className="mb-5 flex justify-center">
                  <span className="font-display text-4xl font-extrabold tracking-tighter text-black">
                    pop
                  </span>
                </div>

                <div className="mx-auto mb-3 flex size-14 items-center justify-center rounded-full bg-[#F0441C] shadow-md shadow-orange-500/30">
                  <span className="text-lg font-bold tracking-wider text-white">DS</span>
                </div>

                <h3 className="font-display text-2xl font-bold italic tracking-wide text-neutral-900">
                  {upiName}
                </h3>

                <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3.5 py-1 text-xs font-medium text-neutral-600">
                  <span>UPI ID: {upiId}</span>
                  <button
                    onClick={copyUpi}
                    className="cursor-pointer text-[#F0441C] hover:text-[#d33a15]"
                    title="Copy UPI ID"
                    aria-label="Copy UPI ID"
                  >
                    {copied ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
                  </button>
                </div>

                <hr className="my-6 border-neutral-200" />

                <div className="relative mx-auto size-64 overflow-hidden rounded-2xl border-2 border-neutral-100 p-2 shadow-inner bg-white">
                  <img
                    src="/photos/dhanush-pop-qr.png"
                    alt="Dhanush S UPI QR Code - Scan to send birthday treat"
                    className="size-full object-contain"
                  />
                </div>

                <p className="mt-4 text-xs font-medium text-neutral-500">
                  Scan using GPay, PhonePe, Paytm or POP
                </p>

                <div className="mt-5">
                  <a
                    href={upiPayLink}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#F0441C] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/30 transition-all hover:bg-[#d83c16] hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <ExternalLink className="size-4" />
                    <span>Pay ₹{selectedAmount} via Any UPI App</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* SIBLING TREAT TERMS & CALCULATOR */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="rounded-2xl border border-border/80 bg-card/70 p-6 backdrop-blur-xl shadow-xl">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[.22em] text-orange-400">
                  Select Treat Tier
                </span>
                <span className="font-display text-xl font-bold text-foreground">
                  ₹{selectedAmount}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {treatOptions.map((opt) => (
                  <button
                    key={opt.amount}
                    onClick={() => setSelectedAmount(opt.amount)}
                    className={`cursor-pointer flex flex-col rounded-xl border p-3.5 text-left transition-all ${
                      selectedAmount === opt.amount
                        ? "border-orange-500 bg-orange-500/15 shadow-md shadow-orange-500/10"
                        : "border-border/60 bg-background/50 hover:border-orange-500/50"
                    }`}
                  >
                    <span className="text-lg">{opt.emoji}</span>
                    <span className="mt-1 font-display text-base font-bold text-foreground">
                      ₹{opt.amount}
                    </span>
                    <span className="text-xs text-muted-foreground">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3.5 rounded-xl border border-border/60 bg-card/50 p-4 backdrop-blur-md">
                <Pizza className="mt-0.5 size-5 shrink-0 text-orange-400" />
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Clause 1: The Birthday Treat Mandate</h4>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    Under Sibling Law Article 420, turning a year older requires an immediate treat to the brother. Excuses like &quot;later&quot; are legally non-binding.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 rounded-xl border border-border/60 bg-card/50 p-4 backdrop-blur-md">
                <ShieldAlert className="mt-0.5 size-5 shrink-0 text-amber-400" />
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Clause 2: Photo Collateral Notice</h4>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    I still possess 38 unreleased goofy prime photos and tonsure ceremony clips. Pay promptly to prevent further leaks! 😂
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 rounded-xl border border-border/60 bg-card/50 p-4 backdrop-blur-md">
                <Utensils className="mt-0.5 size-5 shrink-0 text-emerald-400" />
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Clause 3: 100% Snack Deployment</h4>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    All funds received will be strictly converted into Biryani, Shawarma, Pizza, and Cold Coffee with zero administrative delays.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-dashed border-orange-500/40 bg-orange-500/5 px-4 py-3 text-xs text-muted-foreground">
              <span>UPI: <strong className="text-foreground">{upiId}</strong></span>
              <button
                onClick={copyUpi}
                className="inline-flex cursor-pointer items-center gap-1.5 font-semibold text-orange-400 hover:text-orange-300"
              >
                {copied ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
                <span>{copied ? "Copied to clipboard!" : "Copy UPI ID"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// SECTION 7: POLAROIDS
function Polaroids({ onOpen }: { onOpen: (photo: PhotoItem) => void }) {
  const picks = [
    recentPhotos[3],
    recentPhotos[1],
    recentPhotos[6],
    recentPhotos[8],
    recentPhotos[2],
  ];

  return (
    <section className="overflow-hidden px-5 py-28 sm:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Keep these close"
          title="Little pieces of us."
          copy="Scattered memories that will always hold a piece of my heart."
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-3">
          {picks.map((photo, i) => (
            <figure
              key={photo.id}
              onClick={() => onOpen(photo)}
              className={`reveal group cursor-zoom-in bg-foreground p-2 pb-9 shadow-2xl transition duration-500 hover:z-10 hover:rotate-0 hover:-translate-y-4 hover:scale-105 sm:p-3 sm:pb-12 ${
                ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3", "-rotate-2"][i]
              }`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="aspect-[3/4] w-full object-cover"
              />
              <figcaption className="mt-2 text-center font-hand text-base text-ink opacity-75 transition-opacity group-hover:opacity-100 sm:text-xl">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

// FINALE
function Finale() {
  return (
    <section className="relative grid min-h-[100svh] place-items-center overflow-hidden text-center">
      <img
        src="/photos/2024-26/08_recent.jpeg"
        alt="Akkoww walking in sunlight"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-40"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--background),transparent_35%,var(--ink)_95%)]" />
      <div className="reveal relative z-10 max-w-4xl px-6">
        <p className="font-display text-2xl leading-relaxed sm:text-4xl">
          Some people enter your life.
        </p>
        <p className="mt-7 font-display text-2xl leading-relaxed sm:text-4xl">
          Some people become a part of it.
        </p>
        <p className="mt-7 font-display text-3xl italic leading-relaxed text-primary sm:text-5xl">
          And some become impossible to imagine life without.
        </p>
        <Heart className="mx-auto my-10 size-7 fill-primary text-primary animate-pulse" />
        <h2 className="font-display text-5xl sm:text-7xl">Happy Birthday ❤️</h2>
        <p className="mt-6 text-xs tracking-[.4em] text-gold">13 • 09 • 2026</p>
      </div>
      <p className="absolute bottom-8 z-10 text-[10px] uppercase tracking-[.2em] text-foreground/60 sm:text-xs">
        Made with love, memories &amp; a little bit of madness.
      </p>
    </section>
  );
}

// UNIVERSAL LIGHTBOX MODAL
function Lightbox({
  list,
  index,
  close,
  move,
}: {
  list: PhotoItem[];
  index: number;
  close: () => void;
  move: (direction: number) => void;
}) {
  const photo = list[index];
  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 z-[70] grid place-items-center bg-ink/95 p-4 backdrop-blur-2xl animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
    >
      <Button
        variant="glass"
        size="icon"
        onClick={close}
        className="absolute right-4 top-4 z-10 size-10 rounded-full"
        aria-label="Close photo"
      >
        <X className="size-5" />
      </Button>

      {list.length > 1 && (
        <>
          <Button
            variant="glass"
            size="icon"
            onClick={() => move(-1)}
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 size-11 rounded-full"
            aria-label="Previous photo"
          >
            <ChevronLeft className="size-6" />
          </Button>
          <Button
            variant="glass"
            size="icon"
            onClick={() => move(1)}
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 size-11 rounded-full"
            aria-label="Next photo"
          >
            <ChevronRight className="size-6" />
          </Button>
        </>
      )}

      <figure className="animate-scale-in flex max-h-[90svh] max-w-5xl flex-col items-center">
        <img
          src={photo.src}
          alt={photo.alt}
          className="max-h-[75svh] max-w-full rounded-lg object-contain shadow-2xl"
        />
        <figcaption className="mt-4 text-center">
          <div className="mb-1 flex items-center justify-center gap-2">
            <span className="rounded-full bg-gold/20 px-2.5 py-0.5 text-[10px] font-semibold text-gold">
              {photo.badge ?? photo.category}
            </span>
            <span className="text-xs text-muted-foreground">
              {index + 1} of {list.length}
            </span>
          </div>
          <p className="max-w-xl font-hand text-xl text-foreground/90 sm:text-2xl">
            {photo.caption}
          </p>
        </figcaption>
      </figure>
    </div>
  );
}

// SURPRISE POPUP MODAL
function Surprise({ close }: { close: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[80] grid place-items-center overflow-y-auto bg-ink/95 px-5 py-16 text-center backdrop-blur-2xl animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <Particles />
      <Button
        variant="glass"
        size="icon"
        onClick={close}
        className="absolute right-4 top-4 z-20 size-10 rounded-full"
        aria-label="Close surprise"
      >
        <X className="size-5" />
      </Button>
      <div className="cinematic-enter relative z-10 max-w-3xl">
        <Sparkles className="mx-auto mb-7 size-8 text-gold animate-bounce" />
        <h2 className="font-display text-4xl leading-tight text-primary sm:text-7xl">
          You deserve all the happiness in the world. ❤️
        </h2>
        <img
          src="/photos/2024-26/05_recent.jpeg"
          alt="Festive celebration"
          className="cinematic-glow mx-auto mt-9 max-h-[50svh] rounded-xl object-contain shadow-2xl"
        />
        <p className="mt-8 font-display text-2xl italic text-foreground/90 sm:text-3xl">
          Happy Birthday, always.
        </p>
      </div>
    </div>
  );
}