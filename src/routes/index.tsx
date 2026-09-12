import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Heart, Music2, Pause, Sparkles, Volume2, VolumeX, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import photo1 from "@/assets/WhatsApp_Image_2026-09-12_at_8.06.58_PM.jpeg.asset.json";
import photo2 from "@/assets/WhatsApp_Image_2026-09-12_at_8.06.59_PM.jpeg.asset.json";
import photo3 from "@/assets/WhatsApp_Image_2026-09-12_at_8.07.01_PM.jpeg.asset.json";
import photo4 from "@/assets/WhatsApp_Image_2026-09-12_at_8.07.02_PM.jpeg.asset.json";
import photo5 from "@/assets/WhatsApp_Image_2026-09-12_at_8.07.05_PM.jpeg.asset.json";
import photo6 from "@/assets/WhatsApp_Image_2026-09-12_at_8.07.08_PM.jpeg.asset.json";
import photo7 from "@/assets/WhatsApp_Image_2026-09-12_at_8.07.11_PM.jpeg.asset.json";
import photo8 from "@/assets/WhatsApp_Image_2026-09-12_at_8.07.13_PM.jpeg.asset.json";
import photo9 from "@/assets/WhatsApp_Image_2026-09-12_at_8.07.34_PM.jpeg.asset.json";

const TARGET = new Date("2026-09-12T18:30:00.000Z").getTime();
const photos = [
  { src: photo7.url, alt: "Akkoww in a green saree holding a basket of flowers", caption: "you being you." },
  { src: photo1.url, alt: "Akkoww in a purple traditional outfit", caption: "one of my favourite memories ❤️" },
  { src: photo3.url, alt: "Akkoww smiling in a black dress", caption: "this moment >>>" },
  { src: photo4.url, alt: "Akkoww beneath green flowering vines", caption: "an ordinary day, made special." },
  { src: photo5.url, alt: "Akkoww in a festive red and green dress", caption: "another memory I never want to forget." },
  { src: photo6.url, alt: "Akkoww in warm sunlight wearing a saree", caption: "soft light, softer heart." },
  { src: photo2.url, alt: "Akkoww leaning against a balcony", caption: "the calm between all our chaos." },
  { src: photo8.url, alt: "Akkoww walking through a sunlit garden", caption: "sunshine found you." },
  { src: photo9.url, alt: "Akkoww smiling on a garden path", caption: "a smile worth remembering." },
] as const;

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "A Little World for Akkoww — Happy Birthday" },
    { name: "description", content: "A cinematic birthday surprise made with love, memories and a little bit of madness." },
    { property: "og:title", content: "A Little World for Akkoww" },
    { property: "og:description", content: "Something special is waiting for you…" },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: BirthdayPage,
});

function Particles() { return <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">{Array.from({ length: 18 }, (_, i) => <i className="particle" key={i} />)}</div>; }

function useReveals() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: .15 });
    const nodes = document.querySelectorAll(".reveal, .letter-lines");
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function BirthdayPage() {
  const [now, setNow] = useState(() => Date.now());
  const [stage, setStage] = useState<"countdown" | "transition" | "birthday">(() => Date.now() >= TARGET ? "transition" : "countdown");
  useReveals();
  useEffect(() => { const timer = window.setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(timer); }, []);
  useEffect(() => { if (stage === "countdown" && now >= TARGET) setStage("transition"); }, [now, stage]);
  useEffect(() => { if (stage !== "transition") return; const timer = window.setTimeout(() => setStage("birthday"), 4600); return () => clearTimeout(timer); }, [stage]);
  if (stage === "countdown") return <Countdown now={now} />;
  if (stage === "transition") return <MidnightReveal />;
  return <BirthdayWorld />;
}

function Countdown({ now }: { now: number }) {
  const total = Math.max(0, TARGET - now);
  const units = [Math.floor(total / 86400000), Math.floor(total / 3600000) % 24, Math.floor(total / 60000) % 60, Math.floor(total / 1000) % 60];
  return <main className="film-grain relative grid min-h-[100svh] place-items-center overflow-hidden bg-background px-5 text-center">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,var(--rose-glow),transparent_38%)]" /><Particles />
    <section className="cinematic-enter relative z-10 mx-auto w-full max-w-4xl">
      <Sparkles className="mx-auto mb-8 size-5 text-gold" />
      <p className="mb-5 text-xs font-medium uppercase tracking-[.38em] text-gold">A little secret</p>
      <h1 className="font-display text-4xl leading-tight sm:text-6xl md:text-7xl">Something special is<br className="hidden sm:block" /> waiting for you…</h1>
      <p className="mt-6 text-base font-light text-muted-foreground sm:text-lg">Come back when the clock strikes 12.</p>
      <div className="mx-auto my-12 grid max-w-2xl grid-cols-4 gap-2 sm:gap-5" aria-label="Countdown to September 13, 2026 at midnight India time">
        {units.map((unit, i) => <div key={i} className="border-y border-border bg-card/30 py-5 backdrop-blur-sm sm:py-7"><span className="block font-display text-3xl tabular-nums sm:text-5xl">{String(unit).padStart(2,"0")}</span><span className="mt-2 block text-[9px] uppercase tracking-[.22em] text-muted-foreground sm:text-[10px]">{["Days","Hours","Minutes","Seconds"][i]}</span></div>)}
      </div>
      <p className="text-xs uppercase tracking-[.28em] text-gold">Until her special day</p>
      <p className="mt-12 font-display text-base italic text-muted-foreground">The wait will be worth it.</p>
    </section>
  </main>;
}

function MidnightReveal() { return <main className="film-grain relative grid min-h-[100svh] place-items-center overflow-hidden bg-ink px-6 text-center"><div className="absolute size-[45vw] rounded-full bg-rose-glow blur-[100px] motion-safe:animate-[breathe_3s_ease-in-out_infinite]"/><Particles/><div className="relative z-10"><p className="animate-[cinematic-in_1.6s_ease_.5s_both] font-display text-2xl italic text-muted-foreground sm:text-4xl">It’s finally your day…</p><h1 className="mt-7 animate-[cinematic-in_1.7s_ease_1.8s_both] font-display text-4xl sm:text-7xl">HAPPY BIRTHDAY,<br />AKKOWW <Heart className="inline size-[.7em] fill-primary text-primary" /></h1><p className="mt-7 animate-[cinematic-in_1.5s_ease_3s_both] text-sm font-light tracking-wide text-muted-foreground sm:text-lg">To one of the most special people in my life.</p></div></main>; }

function BirthdayWorld() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [surprise, setSurprise] = useState(false);
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); if (e.key === "ArrowRight") setLightbox((lightbox + 1) % photos.length); if (e.key === "ArrowLeft") setLightbox((lightbox - 1 + photos.length) % photos.length); };
    window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);
  return <main className="film-grain bg-background">
    <MusicControl />
    <Hero />
    <Gallery onOpen={setLightbox} />
    <Story />
    <Letter />
    <LoveNotes />
    <Polaroids />
    <section className="relative overflow-hidden py-32 text-center"><Particles/><div className="reveal relative z-10 mx-auto max-w-xl px-6"><Sparkles className="mx-auto mb-6 size-5 text-gold"/><h2 className="font-display text-4xl sm:text-6xl">Still not done.</h2><p className="mt-5 text-muted-foreground">There’s one tiny thing left for you.</p><Button variant="cinematic" size="lg" className="mt-9" onClick={() => setSurprise(true)}>One more surprise…</Button></div></section>
    <Finale />
    {lightbox !== null && <Lightbox index={lightbox} close={() => setLightbox(null)} move={(direction) => setLightbox((lightbox + direction + photos.length) % photos.length)} />}
    {surprise && <Surprise close={() => setSurprise(false)} />}
  </main>;
}

function Hero() { return <section className="relative min-h-[100svh] overflow-hidden">
  <img src={photos[0].src} alt={photos[0].alt} className="absolute inset-0 h-full w-full object-cover object-[50%_28%] opacity-75" />
  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--ink)_0%,transparent_28%,transparent_52%,var(--background)_100%)]"/><div className="absolute inset-0 bg-[linear-gradient(to_right,var(--ink)_0%,transparent_70%)] opacity-80"/><Particles/>
  <div className="relative z-10 flex min-h-[100svh] max-w-7xl items-end px-6 pb-16 sm:px-10 sm:pb-20 lg:px-20">
    <div className="cinematic-enter max-w-3xl"><p className="mb-5 text-xs uppercase tracking-[.38em] text-gold">13 • 09 • 2026</p><h1 className="font-display text-5xl leading-[1.05] sm:text-7xl lg:text-8xl">Happy Birthday,<br/><span className="italic text-primary">Akkoww</span> <Heart className="inline size-[.65em] fill-primary text-primary" /></h1><p className="mt-7 max-w-xl text-base font-light leading-relaxed text-foreground/80 sm:text-xl">Another year of you being you — and somehow making life a little more beautiful.</p><Button asChild variant="glass" size="lg" className="mt-9"><a href="#memories">Our memories <ChevronDown /></a></Button></div>
  </div>
  </section>; }

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) { return <header className="reveal mb-14 max-w-2xl"><p className="mb-4 text-xs uppercase tracking-[.34em] text-gold">{eyebrow}</p><h2 className="font-display text-4xl sm:text-6xl">{title}</h2>{copy && <p className="mt-5 max-w-lg font-light leading-relaxed text-muted-foreground">{copy}</p>}</header>; }

function Gallery({ onOpen }: { onOpen: (i:number) => void }) { return <section id="memories" className="mx-auto max-w-7xl px-5 py-28 sm:px-10 lg:py-40"><SectionHeading eyebrow="Her world" title="Moments that feel like home." copy="Some memories arrive quietly. Somehow, they stay forever."/><div className="columns-1 gap-5 sm:columns-2 lg:columns-3">{photos.map((photo, i) => <button key={photo.src} onClick={() => onOpen(i)} className="group relative mb-5 block w-full cursor-zoom-in break-inside-avoid overflow-hidden rounded-lg bg-card text-left shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><img src={photo.src} alt={photo.alt} loading={i > 1 ? "lazy" : "eager"} className="w-full object-cover transition duration-700 group-hover:scale-[1.035] group-focus-visible:scale-[1.035]"/><span className="absolute inset-x-0 bottom-0 bg-[linear-gradient(transparent,var(--ink))] px-5 pb-5 pt-16 text-sm opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">{photo.caption}</span></button>)}</div></section>; }

function Story() { const entries = [
  ["How it started", "Two lives sharing a home, before either of us knew how much the other would come to mean.", photos[1]],
  ["The chaos", "The noise, the nonsense, the random moments no one else would ever understand.", photos[2]],
  ["The laughs", "The kind that arrive at the worst time and make it impossible to stay serious.", photos[7]],
  ["The fights", "Brief storms. Dramatic silences. And somehow, always finding our way back.", photos[5]],
  ["The unforgettable moments", "Little snapshots that became the story of us without asking permission.", photos[4]],
  ["And everything in between…", "Every ordinary day that became extraordinary simply because you were there.", photos[8]],
  ] as const; return <section className="border-y border-border bg-ink/55 py-28 sm:py-40"><div className="mx-auto max-w-6xl px-6 sm:px-10"><SectionHeading eyebrow="Our story" title="A thousand little chapters."/><div className="relative ml-3 border-l border-gold/30 sm:ml-0">{entries.map(([title, copy, photo], i) => <article key={title} className="reveal relative grid gap-7 py-12 pl-8 sm:grid-cols-2 sm:items-center sm:gap-16 sm:pl-16"><span className="absolute -left-[5px] top-16 size-2.5 rounded-full bg-gold shadow-[0_0_18px_var(--gold)]"/><div className={i%2 ? "sm:order-2" : ""}><p className="text-xs uppercase tracking-[.3em] text-primary">Chapter {String(i+1).padStart(2,"0")}</p><h3 className="mt-3 font-display text-3xl sm:text-5xl">{title}</h3><p className="mt-5 max-w-md font-light leading-7 text-muted-foreground">{copy}</p></div><img src={photo.src} alt={photo.alt} loading="lazy" className="aspect-[4/3] w-full rounded-md object-cover shadow-2xl"/></article>)}</div></div></section>; }

function Letter() { return <section className="relative overflow-hidden px-5 py-28 sm:py-40"><div className="absolute left-1/2 top-1/2 size-[65vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-glow blur-[140px]"/><div className="relative mx-auto max-w-4xl"><SectionHeading eyebrow="A little something from me" title="For you, always."/><article className="letter-lines cinematic-glow rounded-lg border border-border bg-card/70 p-7 backdrop-blur-xl sm:p-14"><p className="font-hand text-3xl text-primary sm:text-4xl">Happy Birthday ❤️</p><p>Life would honestly be a lot more boring without you.</p><p>From the random conversations and stupid laughs to the little fights and unforgettable moments, every memory with you has become a part of my life that I wouldn&apos;t trade for anything.</p><p>You may annoy me sometimes, drive me crazy occasionally, and somehow still manage to make me laugh five minutes later.</p><p>But that&apos;s what makes our bond special.</p><p>I hope this year brings you everything you&apos;ve been wishing for — happiness, peace, success, amazing memories and people who genuinely value you.</p><p>Keep smiling, keep being yourself, and never forget how special you are.</p><p>Happy Birthday once again ❤️</p><p>Here&apos;s to another year of memories.</p></article></div></section>; }

function LoveNotes() { const notes = ["Your smile ❤️","Your craziness 😂","Your kindness ✨","Your strength 💫","Your unforgettable energy 🌙","The way you make ordinary moments special ❤️"]; return <section className="bg-ink/60 py-28 sm:py-40"><div className="mx-auto max-w-6xl px-6 sm:px-10"><SectionHeading eyebrow="Things I love about you" title="The little things. The big things. All of it."/><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{notes.map((note,i) => <div key={note} className="reveal group flex min-h-44 items-end rounded-lg border border-border bg-card/60 p-6 backdrop-blur-lg transition duration-500 hover:-translate-y-2 hover:border-primary/50 hover:bg-card"><span className="font-display text-2xl transition-transform duration-500 group-hover:translate-x-2">{note}</span><span className="ml-auto text-xs text-gold">0{i+1}</span></div>)}</div></div></section>; }

function Polaroids() { const picks = [photos[3], photos[1], photos[6], photos[8], photos[2]]; return <section className="overflow-hidden px-5 py-28 sm:py-44"><div className="mx-auto max-w-7xl"><SectionHeading eyebrow="Keep these close" title="Little pieces of us."/><div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-3">{picks.map((photo,i) => <figure key={photo.src} className={`reveal group bg-foreground p-2 pb-9 shadow-2xl transition duration-500 hover:z-10 hover:rotate-0 hover:-translate-y-4 hover:scale-105 sm:p-3 sm:pb-12 ${["-rotate-3","rotate-2","-rotate-1","rotate-3","-rotate-2"][i]}`}><img src={photo.src} alt={photo.alt} loading="lazy" className="aspect-[3/4] w-full object-cover"/><figcaption className="mt-2 text-center font-hand text-base text-ink opacity-70 transition-opacity group-hover:opacity-100 sm:text-xl">{photo.caption}</figcaption></figure>)}</div></div></section>; }

function Finale() { return <section className="relative grid min-h-[100svh] place-items-center overflow-hidden text-center"><img src={photos[7].src} alt={photos[7].alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-center opacity-45"/><div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--background),transparent_35%,var(--ink)_95%)]"/><div className="reveal relative z-10 max-w-4xl px-6"><p className="font-display text-2xl leading-relaxed sm:text-4xl">Some people enter your life.</p><p className="mt-7 font-display text-2xl leading-relaxed sm:text-4xl">Some people become a part of it.</p><p className="mt-7 font-display text-3xl italic leading-relaxed text-primary sm:text-5xl">And some become impossible to imagine life without.</p><Heart className="mx-auto my-10 size-6 fill-primary text-primary"/><h2 className="font-display text-5xl sm:text-7xl">Happy Birthday ❤️</h2><p className="mt-6 text-xs tracking-[.4em] text-gold">13 • 09 • 2026</p></div><p className="absolute bottom-8 z-10 text-[10px] uppercase tracking-[.2em] text-foreground/60 sm:text-xs">Made with love, memories &amp; a little bit of madness.</p></section>; }

function Lightbox({ index, close, move }: { index:number; close:()=>void; move:(n:number)=>void }) { return <div className="fixed inset-0 z-[70] grid place-items-center bg-ink/90 p-4 backdrop-blur-xl" role="dialog" aria-modal="true" aria-label="Photo viewer"><Button variant="glass" size="icon" onClick={close} className="absolute right-4 top-4 z-10" aria-label="Close photo"><X/></Button><Button variant="glass" size="icon" onClick={() => move(-1)} className="absolute left-3 top-1/2 z-10 -translate-y-1/2" aria-label="Previous photo"><ChevronLeft/></Button><figure className="animate-scale-in max-h-[88svh] max-w-5xl"><img src={photos[index].src} alt={photos[index].alt} className="max-h-[78svh] max-w-full rounded-md object-contain shadow-2xl"/><figcaption className="mt-4 text-center font-hand text-xl text-foreground/80">{photos[index].caption}</figcaption></figure><Button variant="glass" size="icon" onClick={() => move(1)} className="absolute right-3 top-1/2 z-10 -translate-y-1/2" aria-label="Next photo"><ChevronRight/></Button></div>; }

function Surprise({ close }: { close:()=>void }) { return <div className="fixed inset-0 z-[80] grid place-items-center overflow-y-auto bg-ink/90 px-5 py-16 text-center backdrop-blur-xl" role="dialog" aria-modal="true"><Particles/><Button variant="glass" size="icon" onClick={close} className="absolute right-4 top-4 z-20" aria-label="Close surprise"><X/></Button><div className="cinematic-enter relative z-10 max-w-3xl"><Sparkles className="mx-auto mb-7 size-7 text-gold"/><h2 className="font-display text-4xl leading-tight text-primary sm:text-7xl">You deserve all the happiness in the world. ❤️</h2><img src={photos[5].src} alt={photos[5].alt} className="cinematic-glow mx-auto mt-9 max-h-[48svh] rounded-lg object-contain"/><p className="mt-7 font-display text-2xl italic">Happy Birthday, always.</p></div></div>; }

function MusicControl() {
  const [playing,setPlaying] = useState(false); const [muted,setMuted] = useState(false); const ctx = useRef<AudioContext | null>(null); const timer = useRef<number | null>(null);
  const stop = () => { if (timer.current) window.clearInterval(timer.current); timer.current=null; ctx.current?.close(); ctx.current=null; setPlaying(false); };
  const play = () => { const AudioCtx = window.AudioContext || window.webkitAudioContext; const audio = new AudioCtx(); ctx.current=audio; let step=0; const notes=[261.63,329.63,392,523.25,392,329.63]; const chime=()=>{ const osc=audio.createOscillator(); const gain=audio.createGain(); osc.type="sine"; osc.frequency.value=notes[step%notes.length] ?? 261.63; gain.gain.setValueAtTime(0.0001,audio.currentTime); gain.gain.exponentialRampToValueAtTime(muted?0.0001:0.035,audio.currentTime+.08); gain.gain.exponentialRampToValueAtTime(0.0001,audio.currentTime+1.4); osc.connect(gain).connect(audio.destination); osc.start(); osc.stop(audio.currentTime+1.5); step++;}; chime(); timer.current=window.setInterval(chime,900); setPlaying(true); };
  useEffect(() => () => { if(timer.current) window.clearInterval(timer.current); ctx.current?.close(); }, []);
  useEffect(() => { if(ctx.current) ctx.current.destination.channelCount = muted ? 1 : 2; }, [muted]);
  return <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2"><Button variant="glass" size="sm" onClick={() => playing ? stop() : play()}>{playing?<Pause/>:<Music2/>}<span className="hidden sm:inline">{playing?"Pause our song":"Play our song"}</span></Button>{playing && <Button variant="glass" size="icon" onClick={() => { setMuted(!muted); if(muted && !playing) play(); }} aria-label={muted?"Unmute":"Mute"}>{muted?<VolumeX/>:<Volume2/>}</Button>}</div>;
}

declare global { interface Window { webkitAudioContext: typeof AudioContext; } }