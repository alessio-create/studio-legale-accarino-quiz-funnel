
import {
  ArrowRight, ArrowUpRight, Check, Star, Sparkles, type LucideIcon,
} from "lucide-react";
import Logo from "./Logo";
import Footer from "@/components/funnel/Footer";
import Reveal from "@/components/funnel/Reveal";
import Ticker from "@/components/funnel/Ticker";
import CountUp from "@/components/funnel/CountUp";
import heroIllustration from "@/assets/hero-illustration.png";
import { Button } from "@/components/ui/button";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

export type VerticalLPConfig = {
  vertical: "espropri" | "demolizione" | "tar";
  eyebrow: string;
  heroImage: string;
  heroImageAlt: string;
  heroTint?: string;
  solutionImage: string;
  solutionImageAlt: string;
  heroH1Plain: string;
  heroH1Accent: string;
  heroSub: string;
  heroStats: { to: number; suffix: string; label: string; caption: string }[];
  solutionH1Plain: string;
  solutionH1Accent: string;
  solutionItems: { title: string; desc: string }[];
  problemH1Plain: string;
  problemH1Accent: string;
  problemLead: string;
  problemQuote: { text: string; attr: string };
  problems: { icon: LucideIcon; title: string; body: string }[];
  processH1Plain: string;
  processH1Accent: string;
  processIntro: string;
  process: { title: string; desc: string }[];
  resultsTicker: string[];
  latinTicker: string[];
  reviewsH1Plain: string;
  reviewsH1Accent: string;
  reviews: { quote: string; author: string; role: string; hotel: string }[];
  faqs: { q: string; a: string }[];
  finalH1Plain: string;
  finalH1Accent: string;
  finalSub: string;
};

export default function VerticalLanding(cfg: VerticalLPConfig) {
  const ctaHref = `/quiz?vertical=${cfg.vertical}` as const;

  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      {/* HERO */}
      <section
        className="relative isolate flex min-h-[70svh] items-end overflow-hidden text-primary-foreground"
        style={{ backgroundColor: cfg.heroTint ?? "var(--color-primary)" }}
      >
        <img
          src={cfg.heroImage}
          alt={cfg.heroImageAlt}
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, color-mix(in oklab, ${cfg.heroTint ?? "var(--color-primary)"} 95%, transparent), color-mix(in oklab, ${cfg.heroTint ?? "var(--color-primary)"} 85%, transparent), color-mix(in oklab, ${cfg.heroTint ?? "var(--color-primary)"} 55%, transparent))`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${cfg.heroTint ?? "var(--color-primary)"}, color-mix(in oklab, ${cfg.heroTint ?? "var(--color-primary)"} 70%, transparent), color-mix(in oklab, ${cfg.heroTint ?? "var(--color-primary)"} 20%, transparent))`,
          }}
        />
        <div className="absolute inset-0 grain opacity-25" />


        <div className="container relative z-10 pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-28 lg:pt-40">
          <div className="mx-auto max-w-4xl animate-fade-up text-center">
            <div className="mb-6 flex justify-center">
              <img
                src={heroIllustration}
                alt="Illustrazione dello Studio Legale Accarino"
                className="h-24 w-auto md:h-32"
                width={1024}
                height={768}
                loading="eager"
              />
            </div>
            <div className="mb-8 flex justify-center">
              <Logo variant="gold" className="h-10 w-auto md:h-12" />
            </div>
            <p className="eyebrow !text-gold">
              <span className="text-primary-foreground/70">Studio Legale Accarino · {cfg.eyebrow}</span>
            </p>
            <h1 className="mt-7 text-balance text-[clamp(2rem,5.2vw,4.25rem)] font-500 leading-[1.06] tracking-[-0.025em] text-primary-foreground">
              {cfg.heroH1Plain}{" "}
              <span className="italic-accent text-gold">{cfg.heroH1Accent}</span>
            </h1>
            <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-primary-foreground/80 sm:text-lg">
              {cfg.heroSub}
            </p>

            <div className="mt-10 flex justify-center">
              <Button asChild variant="cta" size="xl" className="group">
                <a href={ctaHref}>
                  Verifica il tuo caso
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAND */}
      <section className="relative overflow-hidden border-b border-border bg-background">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{ background: "radial-gradient(60% 80% at 50% 0%, var(--color-gold) 0%, transparent 60%)" }}
        />
        <div className="container relative py-16 sm:py-20 lg:py-24">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
            <span className="eyebrow-center text-gold-deep">Risultati su questa specializzazione</span>
          </Reveal>

          <div className="grid grid-cols-2 gap-y-12 lg:grid-cols-4 lg:gap-y-0">
            {cfg.heroStats.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 90}
                className="group flex flex-col items-center px-2 text-center lg:px-6"
              >
                <p
                  className="font-300 leading-none tracking-[-0.03em] tabular-nums text-gold-deep transition-transform duration-500 group-hover:-translate-y-0.5"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
                >
                  <CountUp to={s.to} suffix={s.suffix} />
                </p>
                <span
                  aria-hidden
                  className="mt-5 block h-px w-8 bg-gold/60 transition-all duration-500 group-hover:w-16 group-hover:bg-gold sm:w-10"
                />
                <p className="mt-5 text-base leading-snug text-primary sm:text-lg">{s.label}</p>
                <p className="mt-2 max-w-[20ch] text-[11px] uppercase tracking-[0.2em] leading-relaxed text-muted-foreground">
                  {s.caption}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="section-y bg-background">
        <div className="container">
          <div className="grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:items-start lg:gap-24">
            <Reveal>
              <span className="eyebrow">La soluzione</span>
              <h2 className="mt-6 text-balance text-display-sm text-primary">
                {cfg.solutionH1Plain}{" "}
                <span className="italic-accent text-gold-deep">{cfg.solutionH1Accent}</span>
              </h2>

              <ul className="mt-12 grid gap-8">
                {cfg.solutionItems.map((b, i) => (
                  <li key={b.title} className="group flex items-start gap-6 border-t border-border pt-6 first:border-t-0 first:pt-0">
                    <span className="mt-1 text-[11px] font-semibold tabular-nums tracking-[0.22em] text-gold-deep">
                      0{i + 1}
                    </span>
                    <div className="flex-1">
                      <p className="flex items-center gap-3 text-title text-primary transition-colors group-hover:text-gold-deep">
                        <Check className="h-4 w-4 text-gold" strokeWidth={2.5} />
                        {b.title}
                      </p>
                      <p className="mt-3 text-body-sm leading-relaxed text-muted-foreground">{b.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-12 flex items-center gap-6">
                <Button asChild variant="cta" size="lg">
                  <a href={ctaHref}>
                    Verifica idoneità <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <a
                  href={ctaHref}
                  className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary transition-colors hover:text-gold-deep"
                >
                  90 secondi · senza impegno
                  <ArrowUpRight className="h-3.5 w-3.5 text-gold-deep" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="relative">
                <span aria-hidden className="absolute -left-3 -top-3 z-10 h-10 w-10 border-l border-t border-gold" />
                <span aria-hidden className="absolute -bottom-3 -right-3 z-10 h-10 w-10 border-b border-r border-gold" />
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <img
                    src={cfg.solutionImage}
                    alt={cfg.solutionImageAlt}
                    className="animate-image-reveal absolute inset-0 h-full w-full object-cover"
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{ background: "linear-gradient(180deg, transparent 60%, color-mix(in oklab, var(--color-primary) 25%, transparent) 100%)" }}
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* LATIN TICKER */}
      <Ticker
        variant="dark"
        speed="slow"
        items={cfg.latinTicker.map((s) => <span key={s} className="text-gold">{s}</span>)}
      />

      {/* PROBLEM */}
      <section className="relative overflow-hidden bg-primary py-24 text-primary-foreground md:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{ background: "radial-gradient(60% 50% at 90% 0%, var(--color-gold) 0%, transparent 70%)" }}
        />
        <div className="container relative">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:items-start">
            <Reveal className="lg:sticky lg:top-32">
              <span className="eyebrow text-gold">Il problema</span>
              <h2 className="mt-6 text-balance text-display-sm text-primary-foreground">
                {cfg.problemH1Plain}{" "}
                <span className="italic-accent text-gold">{cfg.problemH1Accent}</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-primary-foreground/75">
                {cfg.problemLead}
              </p>
              <div className="mt-10 border-l-2 border-gold pl-6">
                <p className="text-sm leading-relaxed text-primary-foreground/85">
                  “{cfg.problemQuote.text}”
                </p>
                <p className="mt-3 text-[10px] uppercase tracking-[0.22em] text-gold">{cfg.problemQuote.attr}</p>
              </div>
            </Reveal>

            <ul className="grid gap-px bg-primary-foreground/10">
              {cfg.problems.map(({ icon: Icon, title, body }, i) => (
                <Reveal
                  key={title}
                  as="li"
                  delay={i * 90}
                  className="group relative bg-primary p-8 transition-luxe hover:bg-primary-foreground/[0.04]"
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full"
                  />
                  <div className="flex items-start gap-6">
                    <span className="font-300 text-[2.5rem] leading-none tabular-nums tracking-[-0.04em] text-gold/80">
                      0{i + 1}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
                        <h3 className="text-title text-primary-foreground">{title}</h3>
                      </div>
                      <p className="mt-3 text-body-sm leading-relaxed text-primary-foreground/70">{body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* RESULTS TICKER */}
      <Ticker
        variant="light"
        speed="slow"
        items={cfg.resultsTicker}
        separator={<Sparkles className="h-4 w-4 text-gold" />}
      />

      {/* PROCESS */}
      <section className="section-y bg-soft">
        <div className="container">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow-center">Il metodo</span>
            <h2 className="mt-6 text-balance text-display-sm text-primary">
              {cfg.processH1Plain}{" "}
              <span className="italic-accent text-gold-deep">{cfg.processH1Accent}</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{cfg.processIntro}</p>
          </Reveal>

          <div className="mt-16 grid gap-px border border-border bg-primary/10 md:grid-cols-2 lg:grid-cols-4">
            {cfg.process.map((step, i) => (
              <Reveal key={step.title} delay={i * 110} className="bg-background">
                <article className="group flex h-full flex-col p-8">
                  <span className="font-300 text-[2.5rem] leading-none tabular-nums tracking-[-0.04em] text-gold-deep">
                    0{i + 1}
                  </span>
                  <span
                    aria-hidden
                    className="mt-5 block h-px w-10 bg-gold/60 transition-all duration-500 group-hover:w-20 group-hover:bg-gold"
                  />
                  <h3 className="mt-5 text-title text-primary transition-colors group-hover:text-gold-deep">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-body-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14 text-center">
            <Button asChild variant="cta" size="xl">
              <a href={ctaHref}>
                Verifica il tuo caso <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section-y bg-background">
        <div className="container">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow-center">Dicono di noi</span>
            <h2 className="mt-6 text-balance text-display-sm text-primary">
              {cfg.reviewsH1Plain}{" "}
              <span className="italic-accent text-gold-deep">{cfg.reviewsH1Accent}</span>
            </h2>
            <div className="mx-auto mt-6 flex items-center justify-center gap-3 text-sm text-muted-foreground">
              <span className="font-semibold text-primary">5.0</span>
              <span className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-gold" strokeWidth={0} />
                ))}
              </span>
              <span>· Recensioni verificate</span>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-px border border-border bg-primary/10 md:grid-cols-3">
            {cfg.reviews.map((r, i) => (
              <Reveal key={r.author + i} delay={i * 100} className="bg-background">
                <article className="group flex h-full flex-col justify-between p-10 transition-colors hover:bg-soft">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1 text-gold">
                        {[...Array(5)].map((_, k) => (
                          <Star key={k} className="h-4 w-4 fill-gold" strokeWidth={0} />
                        ))}
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-deep">
                        0{i + 1}
                      </span>
                    </div>
                    <span aria-hidden className="mt-6 block h-px w-10 bg-gold/60 transition-all duration-500 group-hover:w-20 group-hover:bg-gold" />
                    <blockquote className="mt-6 text-balance text-lg leading-snug text-primary">
                      “{r.quote}”
                    </blockquote>
                  </div>
                  <footer className="mt-10 border-t border-border pt-6">
                    <p className="font-semibold text-primary">{r.author}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{r.role}</p>
                    <p className="mt-3 text-[10px] uppercase tracking-[0.22em] text-gold-deep">{r.hotel}</p>
                  </footer>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-y bg-soft">
        <div className="container max-w-3xl">
          <Reveal className="text-center">
            <span className="eyebrow-center">FAQ</span>
            <h2 className="mt-6 text-balance text-display-sm text-primary">
              Le domande che ci fanno tutti.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <Accordion type="single" collapsible className="mt-12 space-y-3">
              {cfg.faqs.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="group border border-border bg-card px-6 transition-luxe data-[state=open]:border-gold data-[state=open]:shadow-luxe"
                >
                  <AccordionTrigger className="py-6 text-left text-title text-primary hover:text-gold-deep hover:no-underline data-[state=open]:text-gold-deep">
                    <span className="flex items-center gap-4">
                      <span className="text-[11px] font-semibold tabular-nums tracking-[0.22em] text-gold-deep">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {f.q}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pl-12 text-base leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative isolate overflow-hidden bg-primary py-24 text-primary-foreground md:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.22]"
          style={{ background: "radial-gradient(50% 60% at 50% 100%, var(--color-gold) 0%, transparent 70%)" }}
        />
        <div className="absolute inset-0 grain opacity-25" />
        <div className="container relative text-center">
          <Reveal>
            <span className="eyebrow-center text-gold">L’ultimo passo</span>
            <h2 className="mx-auto mt-6 max-w-3xl text-balance text-display text-primary-foreground">
              {cfg.finalH1Plain}{" "}
              <span className="italic-accent text-gold">{cfg.finalH1Accent}</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/80">
              {cfg.finalSub}
            </p>
            <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-8">
              <Button asChild variant="cta" size="xl" className="group">
                <a href={ctaHref}>
                  Inizia ora
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-foreground/60">
                Risposta qualificata in 24h
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}

