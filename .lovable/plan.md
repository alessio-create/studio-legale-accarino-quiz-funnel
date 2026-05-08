## Funnel for Studio Legale Accarino — Edilizia, Urbanistica & Espropri

Mirroring the structure of the Burchi & Partners hotel funnel, but rebranded
to Studio Legale Accarino (Legal Compass identity) and verticalized on
**Edilizia, Urbanistica & Espropri**.

### Brand & design system
- Replace `src/styles.css` tokens with the Accarino palette ported from Legal Compass:
  Primary Deep Blue `#14213D`, Accent Bright Yellow `#FDA311`, neutral white surfaces,
  Inter sans typography, sharp `--radius: 0`, editorial container & section tokens,
  reveal / draw-line / fade-up animations.
- Add helper component classes (`eyebrow`, `rule-gold`, `lift-luxe`, `grain`, `bg-soft`,
  `text-display`, `text-display-sm`, `text-heading`, `text-title`, `text-lead`,
  `text-body`, `text-body-sm`, `text-caption`, `chapter-num`, `shadow-luxe`, etc.)
  used by the ported page templates.
- Extend the shadcn `<Button>` with `cta`, `ctaDark`, `hero`, and `xl` variants.

### Assets ported from Legal Compass
- `logo-horizontal.svg`, `logo-monogram.svg`, `logo-full.svg` → `src/assets/`
- `hero-courthouse.jpg`, `hero-columns.jpg`, `law-books.jpg`,
  `practice-espropriazioni.jpg`, `practice-urbanistica.jpg`, `lawyer-1.jpg`, `office.jpg`
  → reused for hero, audience cards, founder section.

### Shared funnel components (`src/components/funnel/`)
- `Logo.tsx` — Accarino horizontal mark
- `Banner.tsx` — slim brand bar (reused on landing)
- `Footer.tsx` — minimal Accarino footer
- `Reveal.tsx` — IntersectionObserver fade-up
- `Ticker.tsx` — marquee for stats / results
- `Review.tsx`, `ReviewCard.tsx` — testimonial cards
- `GoogleIcon.tsx` — inline Google G

### Routes (file-based, TanStack Start)
1. `src/routes/index.tsx` — Landing
   Hero → Solution → Stats ticker → Problem → Results ticker → Audience (3 ICPs:
   proprietari/aziende agricole, proprietari di casa/piccoli costruttori, PMI/costruttori)
   → Reviews → FAQ → Final CTA. CTA → `/quiz`.
2. `src/routes/quiz.tsx` — 4-step quiz, sessionStorage handoff:
   - Ruolo (Proprietario terriero, Proprietario di casa / piccolo costruttore, PMI / costruttore, Altro)
   - Tipo di problema (Esproprio / indennità, Ordinanza demolizione / abuso edilizio, Diniego permessi / ricorso TAR, Vincolo paesaggistico / silenzio PA)
   - Urgenza (in corso, atto ricevuto <30gg, in valutazione, preventivo)
   - Valore in gioco (<50k, 50–250k, 250k–1M, >1M)
3. `src/routes/optin.tsx` — Personalized headline + actions per pain key,
   form (nome, email, telefono, comune/provincia), privacy checkbox → `/booking`.
4. `src/routes/booking.tsx` — Calendar + slots, founder section
   (Avv. Accarino), next steps, FAQ, final CTA.

### Copy strategy (Italian, vertical on the 3 pillars)
- Espropri & Indennità — pillar "indennità esproprio". ICP: proprietari terrieri,
  aziende agricole, famiglie con proprietà ereditate.
- Emergenza Edilizia — pillar "ordinanza demolizione". ICP: proprietari di casa,
  piccoli costruttori, imprese con strutture non autorizzate.
- Sblocco Progetti PA — pillar "ricorso TAR". ICP: PMI, costruttori,
  cittadini con dinieghi PA.

Each section, problem item, audience card, and quiz pain branch maps to one of
these three pillars so the funnel reads as a focused offer, not a generalist firm.

### Out of scope (this iteration)
- Lovable Cloud / form persistence (form goes straight to `/booking`).
- Privacy & Cookie pages (link as `/privacy-policy`, can be added next).
- Real Google reviews widget — replaced by static testimonial grid.
- Pixel tracking (`fbqTrack` calls dropped).
