import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, ArrowUpRight, Check, Scale,
  AlertTriangle, Clock, Landmark, FileWarning, Star, Sparkles,
} from "lucide-react";
import heroCourthouse from "@/assets/hero-courthouse.jpg";
import personLandowner from "@/assets/person-landowner.jpg";
import personHomeowner from "@/assets/person-homeowner.jpg";
import personBuilder from "@/assets/person-builder.jpg";
import lawBooks from "@/assets/law-books.jpg";
import Logo from "@/components/funnel/Logo";
import Footer from "@/components/funnel/Footer";
import Reveal from "@/components/funnel/Reveal";
import Ticker from "@/components/funnel/Ticker";
import CountUp from "@/components/funnel/CountUp";
import heroIllustration from "@/assets/hero-illustration.png";
import { Button } from "@/components/ui/button";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Studio Legale Accarino — Espropri, Edilizia & TAR" },
      {
        name: "description",
        content:
          "Avvocati specializzati in indennità di esproprio, ordinanze di demolizione e ricorsi al TAR. Difesa di proprietari e imprese contro la PA.",
      },
      { property: "og:title", content: "Studio Legale Accarino — Espropri, Edilizia & TAR" },
      {
        property: "og:description",
        content:
          "Difesa di proprietari e imprese nei conflitti con la PA. Espropri, abusi edilizi, dinieghi e ricorsi al TAR.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Studio Legale Accarino",
          url: "/",
          inLanguage: "it-IT",
          potentialAction: {
            "@type": "SearchAction",
            target: "/?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }),
      },
    ],
  }),
  component: Index,
});

/* ───────────────────────── DATA ───────────────────────── */

const credentials = [
  "Regione Campania",
  "Comune di Salerno",
  "ASL Salerno",
  "Consorzio ASI",
  "Autostrade Meridionali",
  "Ordine Avvocati Salerno",
];

const heroStats = [
  { to: 35, suffix: "%", label: "Indennità media in più", caption: "Sull’offerta iniziale della PA" },
  { to: 200, suffix: "+", label: "Procedure espropriative", caption: "Seguite dallo Studio" },
  { to: 20, suffix: "+", label: "Anni di specializzazione", caption: "In diritto amministrativo" },
  { to: 24, suffix: "h", label: "Tempo di risposta", caption: "Per le richieste qualificate" },
];

const solutionItems = [
  { title: "Calcolo indipendente dell’indennità", desc: "Stima tecnica autonoma confrontata con quella della PA: la differenza media a vantaggio dei nostri clienti supera il 35%." },
  { title: "Ricorso al TAR rapido e mirato", desc: "Impugnazioni di ordinanze, dinieghi e vincoli depositate nei termini, con sospensiva richiesta quando serve." },
  { title: "Difesa contro abusi edilizi recuperabili", desc: "Sanatorie, accertamenti di conformità, opposizione a demolizioni: una strategia per ogni livello di rischio." },
  { title: "Selezione esclusiva dei casi", desc: "Accettiamo solo casi con margini concreti di vittoria. Te lo diciamo già nella consulenza preventiva." },
];

const problems = [
  { icon: AlertTriangle, title: "Hai ricevuto un decreto di esproprio sotto valore", body: "L’indennità proposta dalla PA è quasi sempre molto inferiore al valore reale del bene. Senza opposizione tecnica, perdi anni di patrimonio in poche settimane." },
  { icon: FileWarning, title: "Ti è arrivata un’ordinanza di demolizione", body: "60 giorni per impugnare. Dopo, l’opera diventa acquisita gratuitamente al Comune. Un avvocato generalista non conosce le strategie urbanistiche specifiche." },
  { icon: Clock, title: "Il tuo permesso a costruire è bloccato da mesi", body: "Silenzio della PA, dinieghi pretestuosi, vincoli paesaggistici applicati a sproposito. Ogni mese di ritardo è margine perso sul cantiere." },
  { icon: Landmark, title: "Ti hanno opposto un vincolo che non aspettavi", body: "Vincoli idrogeologici, paesaggistici, archeologici. Esiste una procedura precisa per impugnarli o ottenerne la deroga al TAR." },
];

const audience = [
  { image: personLandowner, alt: "Proprietario terriero davanti al proprio fondo", role: "Audience 01", title: "Proprietari terrieri & aziende agricole", desc: "Famiglie con proprietà ereditate, imprese agricole, fondi attraversati da nuove infrastrutture. Difendiamo l’indennità reale, non quella offerta dalla PA." },
  { image: personHomeowner, alt: "Proprietaria di casa davanti alla propria abitazione", role: "Audience 02", title: "Proprietari di casa & piccoli costruttori", desc: "Strutture esistenti, sopraelevazioni, ampliamenti, sanatorie. Impugniamo ordinanze di demolizione e blocchi su abusi recuperabili." },
  { image: personBuilder, alt: "Imprenditore edile in cantiere", role: "Audience 03", title: "PMI & imprese di costruzione", desc: "Costruttori e developer fermati da dinieghi, vincoli o silenzio della PA. Sblocchiamo permessi e progetti con ricorsi mirati al TAR." },
];

const tickerResults = [
  "Azienda agricola · indennità portata da €420k a €890k",
  "Proprietario casa · ordinanza demolizione annullata in 4 mesi",
  "PMI costruzioni · permesso sbloccato al TAR in 90 giorni",
  "Famiglia · esproprio rinegoziato, +€280k riconosciuti",
];

const reviews = [
  { quote: "Ci hanno fatto raddoppiare l'indennità sull'esproprio del fondo. Senza di loro non avremmo mai opposto i conteggi della PA.", author: "Giovanni M.", role: "Imprenditore agricolo", hotel: "Provincia di Salerno" },
  { quote: "Ordinanza di demolizione annullata al TAR. Approccio tecnico, tempi rispettati, sempre raggiungibili nei momenti chiave.", author: "Marco R.", role: "Proprietario", hotel: "Costiera Amalfitana" },
  { quote: "Avevamo un permesso fermo da 14 mesi per un vincolo paesaggistico. Ricorso depositato e progetto sbloccato in 3 mesi.", author: "Antonio P.", role: "Amministratore", hotel: "PMI edile · Campania" },
];

const faqs = [
  { q: "Ho ricevuto un’ordinanza di demolizione: cosa devo fare?", a: "Hai 60 giorni dalla notifica per impugnarla al TAR. È fondamentale agire subito: una valutazione tecnica preventiva ci dice se esistono margini di sospensiva e/o sanatoria. Nella consulenza preventiva analizziamo l’atto e ti diciamo con chiarezza se ha senso opporsi." },
  { q: "L’indennità di esproprio è davvero negoziabile?", a: "Sì, in oltre il 70% dei casi quella offerta dalla PA è significativamente inferiore al valore di mercato. Esistono procedure di opposizione alla stima e ricorso alla Corte d’Appello che, con la giusta perizia, portano spesso a incrementi del 30–60% sull’indennità iniziale." },
  { q: "Quanto tempo serve per un ricorso al TAR?", a: "Il ricorso va depositato entro 60 giorni. Noi tipicamente lo prepariamo e depositiamo in 7–14 giorni. La sospensiva, quando concessa, arriva in 30–60 giorni; il merito in 8–18 mesi a seconda del TAR." },
  { q: "Lavorate in tutta Italia?", a: "Lo studio ha sede a Salerno ma assistiamo clienti in tutta Italia: il diritto amministrativo è uniforme e la quasi totalità degli atti si gestisce a distanza. Per le udienze ci spostiamo o ci avvaliamo di domiciliatari di fiducia." },
  { q: "Cosa succede dopo la consulenza preventiva?", a: "Ricevi una valutazione chiara dei margini reali del tuo caso, con tempi e costi indicativi. Decidi tu se procedere: nessun automatismo, nessuna pressione commerciale." },
];

/* ───────────────────────── PAGE ───────────────────────── */

function Index() {
  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      {/* ───────────── HERO — editorial legal asymmetry ───────────── */}
      <section className="relative isolate flex min-h-[80svh] items-center overflow-hidden bg-primary text-primary-foreground">
        <img
          src={heroCourthouse}
          alt="Tribunale amministrativo"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/70" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{ background: "radial-gradient(60% 50% at 90% 0%, var(--color-gold) 0%, transparent 70%)" }}
        />
        <div className="absolute inset-0 grain opacity-25" />

        {/* Corner brackets */}
        
        

        <div className="container relative z-10 py-20 sm:py-24 lg:py-28">
          <div className="grid grid-cols-12 items-start gap-6 lg:gap-8">
            {/* Left vertical meta */}
            <div className="hidden lg:col-span-1 lg:flex flex-col items-start gap-12 pt-2">
              <div className="flex flex-col items-start gap-3">
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold"
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                  Studio · 2025
                </span>
                <div className="ml-1 hidden" />
              </div>
              <span
                className="text-[10px] font-medium uppercase tracking-[0.3em] text-primary-foreground/40"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                Diritto Amministrativo
              </span>
            </div>

            {/* Main content */}
            <div className="col-span-12 flex animate-fade-up flex-col items-center text-center lg:col-span-10">
              {/* Monogram + eyebrow */}
              <div className="mb-10 flex items-center gap-5">
                <div className="relative">
                  <Logo variant="gold" logomarkOnly className="h-20 w-auto md:h-24" />
                </div>

                <span className="hidden text-[11px] font-semibold uppercase tracking-[0.3em] text-primary-foreground/60 md:inline">
                  Salerno &amp; Cava de’ Tirreni
                </span>
              </div>

              {/* Headline */}
              <div className="relative max-w-4xl">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -left-8 -top-20 hidden select-none font-serif text-[220px] leading-none text-gold/5 md:block lg:-left-16"
                >
                  A
                </span>
                <h1 className="relative text-balance text-[clamp(2rem,5.4vw,4.5rem)] font-500 leading-[1.05] tracking-[-0.025em] text-primary-foreground">
                  Difendi il tuo patrimonio dalle{" "}
                  <span className="italic-accent px-1 text-gold">decisioni della PA.</span>
                </h1>
              </div>

              {/* Sub + CTA */}
              <div className="mt-12 flex w-full flex-col items-center gap-10 pt-10 text-center md:flex-row md:items-center md:justify-center md:gap-16">
                <p className="max-w-md text-base leading-relaxed text-primary-foreground/75 sm:text-lg">
                  Espropri sotto valore, ordinanze di demolizione, dinieghi pretestuosi:
                  quando lo Stato sbaglia, esistono i ricorsi giusti. Verifica in 90 secondi
                  se il tuo caso ha margini reali.
                </p>

                <div className="flex flex-col items-center gap-5">
                  <Button asChild variant="cta" size="xl" className="group">
                    <Link to="/quiz">
                      <div className="text-[10px] font-bold tracking-[0.2em]">INIZIA ORA</div>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <div className="flex items-center gap-3 text-primary-foreground/50">

                    <span className="text-[10px] uppercase tracking-[0.22em]">
                      90 secondi · senza impegno
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right vertical mark */}
            <div className="hidden lg:col-span-1 lg:flex justify-end">
              <div className="flex flex-col items-center gap-4 pt-2">
                <div className="hidden" />
                <span
                  className="whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.4em] text-gold"
                  style={{ writingMode: "vertical-rl" }}
                >
                  Studio Legale Accarino
                </span>
              </div>
            </div>
          </div>
        </div>


        {/* Credentials micro-ticker pinned to hero bottom */}
        <div className="absolute inset-x-0 bottom-0 z-10 border-t border-primary-foreground/10 bg-primary/80 backdrop-blur-md">
          <div className="container flex items-center gap-4 py-4 sm:gap-8 sm:py-5">
            <span className="hidden flex-shrink-0 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold sm:inline-flex">
              Hanno scelto lo Studio
            </span>
            <div
              className="relative flex-1 overflow-hidden"
              style={{
                maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
                WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
              }}
            >
              <div
                className="marquee flex w-max items-center gap-10 whitespace-nowrap text-[12px] uppercase tracking-[0.14em] text-primary-foreground/60"
                style={{ animationDuration: "50s" }}
              >
                {[...credentials, ...credentials, ...credentials].map((c, i) => (
                  <span key={`${c}-${i}`} className="flex items-center gap-3 pr-6">
                    <span className="h-1 w-1 bg-gold" />
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── STATS BAND — editorial counts ───────────── */}
      <section className="relative overflow-hidden bg-background">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{ background: "radial-gradient(60% 80% at 50% 0%, var(--color-gold) 0%, transparent 60%)" }}
        />
        <div className="container relative py-16 sm:py-20 lg:py-24">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
            <span className="eyebrow-center text-gold-deep">Lo Studio in cifre</span>
          </Reveal>

          <div className="grid grid-cols-2 gap-y-12 lg:grid-cols-4 lg:gap-y-0">
            {heroStats.map((s, i) => (
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
                  className="hidden"
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

      {/* ───────────── SOLUTION — editorial split with gold-corner image ───────────── */}
      <section className="section-y bg-background">
        <div className="container">
          <div className="grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:items-start lg:gap-24">
            <Reveal>
              <span className="eyebrow">La soluzione</span>
              <h2 className="mt-6 text-balance text-display-sm text-primary">
                Difendiamo proprietari e imprese{" "}
                <span className="italic-accent text-gold-deep">nei conflitti con la Pubblica Amministrazione.</span>
              </h2>

              <ul className="mt-12 grid gap-8">
                {solutionItems.map((b, i) => (
                  <li key={b.title} className="group flex items-start gap-6 pt-6 first:pt-0">
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

              <div className="mt-12 flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:gap-6">
                <Button asChild variant="cta" size="lg">
                  <Link to="/quiz">
                    Verifica idoneità <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Link
                  to="/quiz"
                  className="inline-flex items-center gap-2 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.18em] text-primary transition-colors hover:text-gold-deep"
                >
                  90 secondi · senza impegno
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-gold-deep" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="relative">
                
                
                <div className="relative overflow-hidden">
                  <img
                    src={lawBooks}
                    alt="Codice di diritto amministrativo e fascicoli"
                    className="animate-image-reveal h-full w-full object-cover"
                    loading="lazy"
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

      {/* Latin/source maxim ticker — gravitas band */}
      <Ticker
        variant="dark"
        speed="slow"
        items={[
          "Audiatur et altera pars",
          "Art. 42 Cost.",
          "Pacta sunt servanda",
          "L. 241 / 1990",
          "In claris non fit interpretatio",
          "D.lgs. 50 / 2016",
          "Iura novit curia",
          "D.P.R. 327 / 2001",
          "Nemo iudex in causa sua",
          "Cod. Proc. Amm.",
        ].map((s) => <span key={s} className="text-gold">{s}</span>)}
      />

      {/* ───────────── PROBLEM — deep navy, sticky header, numbered grid ───────────── */}
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
                Sei solo davanti alla{" "}
                <span className="italic-accent text-gold">macchina dello Stato.</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-primary-foreground/75">
                La PA ha ufficio legale, periti interni e tempi a suo favore.
                Tu hai 60 giorni e un avvocato generalista. Lo squilibrio è
                strutturale — e si batte solo con specialisti del diritto amministrativo.
              </p>
              <div className="mt-10 pl-6">
                <p className="text-sm leading-relaxed text-primary-foreground/85">
                  “Pensavamo che l’indennità offerta fosse l’unica possibile.
                  Era meno della metà del valore reale del fondo.”
                </p>
                <p className="mt-3 text-[10px] uppercase tracking-[0.22em] text-gold">Cliente — Provincia di Salerno</p>
              </div>
            </Reveal>

            <ul className="grid gap-0">
              {problems.map(({ icon: Icon, title, body }, i) => (
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

      <Ticker
        variant="light"
        speed="slow"
        items={tickerResults}
        separator={<Sparkles className="h-4 w-4 text-gold" />}
      />

      {/* ───────────── AUDIENCE — portrait grid, grayscale → color ───────────── */}
      <section className="section-y bg-soft">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-8 sm:mb-16">
            <Reveal className="max-w-2xl">
              <span className="eyebrow">Per chi è</span>
              <h2 className="mt-6 text-balance text-display-sm text-primary">
                Lavoriamo con chi affronta la PA,{" "}
                <span className="italic-accent text-gold-deep">non con chi la subisce.</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Selezioniamo i casi: prendiamo solo quelli con margini concreti
                di vittoria, e te lo diciamo già nella consulenza preventiva.
              </p>
            </Reveal>
            <Link
              to="/quiz"
              className="hidden items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary transition-colors hover:text-gold-deep md:inline-flex"
            >
              Verifica il tuo caso <ArrowRight className="h-4 w-4 text-gold-deep" />
            </Link>
          </div>

          <div className="mt-14 grid md:grid-cols-3">
            {audience.map((a, i) => (
              <Reveal key={a.title} delay={i * 120} className="bg-background">
                <article className="group flex h-full flex-col">
                  <div className="relative aspect-[3/4] overflow-hidden bg-primary">
                    <img
                      src={a.image}
                      alt={a.alt}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover object-top grayscale transition-all duration-[1200ms] ease-out group-hover:scale-[1.04] group-hover:grayscale-0"
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-primary/40"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-8">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold-deep">
                      {a.role}
                    </p>
                    <h3 className="mt-4 text-2xl leading-tight text-primary transition-colors duration-500 group-hover:text-gold-deep">
                      {a.title}
                    </h3>
                    <span
                      aria-hidden
                      className="hidden"
                    />
                    <p className="mt-5 text-body-sm leading-relaxed text-muted-foreground">{a.desc}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14 text-center">
            <Button asChild variant="cta" size="xl">
              <Link to="/quiz">
                Verifica il tuo caso <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* ───────────── REVIEWS — editorial cards ───────────── */}
      <section className="section-y bg-background">
        <div className="container">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow-center">Dicono di noi</span>
            <h2 className="mt-6 text-balance text-display-sm text-primary">
              Casi reali,{" "}
              <span className="italic-accent text-gold-deep">risultati misurabili.</span>
            </h2>
            <div className="mx-auto mt-6 flex items-center justify-center gap-3 text-sm text-muted-foreground">
              <span className="font-semibold text-primary">5.0</span>
              <span className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-gold" strokeWidth={0} />
                ))}
              </span>
              <span>· Testimonianze dirette</span>
            </div>
          </Reveal>

          <div className="mt-14 grid md:grid-cols-3">
            {reviews.map((r, i) => (
              <Reveal key={r.author} delay={i * 100} className="bg-background">
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
                    <span aria-hidden className="hidden" />
                    <blockquote className="mt-6 text-balance text-lg leading-snug text-primary">
                      “{r.quote}”
                    </blockquote>
                  </div>
                  <footer className="mt-10 pt-6">
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

      {/* ───────────── FAQ ───────────── */}
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
              {faqs.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="group bg-card px-6 transition-luxe data-[state=open]:shadow-luxe"
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

      {/* ───────────── FINAL CTA — deep navy with gold ambient wash ───────────── */}
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
              La PA ha tempo, struttura e potere.{" "}
              <span className="italic-accent text-gold">Tu hai bisogno del legale giusto.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/80">
              Verifica in 90 secondi se il tuo caso ha margini reali. Senza impegno.
            </p>
            <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-8">
              <Button asChild variant="cta" size="xl" className="group">
                <Link to="/quiz">
                  Inizia ora
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-foreground/60">
                {"\n"}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
