# Cinematic Birthday Surprise

## Experience
- Build one responsive page with a live IST countdown to 13 September 2026, 12:00 AM, switching automatically at the exact moment.
- Before midnight, show a mysterious full-screen countdown with restrained stars, particles, warm glow, and emotional typography.
- After midnight, play a short cinematic reveal before opening the complete birthday experience. Returning visitors after midnight enter the revealed site correctly.

## Birthday world
- Create a full-screen photo-led opening with “Happy Birthday, Akkoww ❤️” and smooth navigation to the memories.
- Use all nine supplied photos in an editorial masonry gallery with captions, zoom, keyboard/touch-friendly full-screen viewing, and previous/next controls.
- Add the vertical “Our Story” sequence, gradually revealed birthday letter, interactive love-note cards, scattered Polaroid memories, surprise overlay, and emotional final photo scene.
- Include a fixed optional music control. Since no song file was supplied, use a gentle original browser-generated ambient melody that begins only after a click and supports mute/unmute.

## Visual direction
- Deep midnight and ink surfaces, warm ivory type, restrained rose light, and fine gold details.
- Editorial serif headings paired with a clean humanist sans and handwritten letter accents.
- Glass details, subtle grain, soft depth, cinematic image treatment, and restrained scroll/hover motion with reduced-motion support.

## Technical details
- Use a fixed timestamp equivalent to midnight IST (`2026-09-12T18:30:00Z`) so the unlock is independent of the visitor’s timezone.
- Build reusable React sections and lightweight CSS/IntersectionObserver animation; avoid heavy animation dependencies.
- Serve uploaded photos through optimized CDN assets, lazy-load non-critical images, and use responsive object positioning.
- Add route-specific page title, description, Open Graph, and Twitter metadata.
- Verify the page at desktop and mobile sizes, including countdown rendering, scrolling, gallery controls, surprise interaction, and console output.
