import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, Check, ShieldCheck, Scale, Gavel, Building2, FileWarning,
  AlertTriangle, Clock, Landmark, Star, Sparkles,
} from "lucide-react";
import heroCourthouse from "@/assets/hero-courthouse.jpg";
import personLandowner from "@/assets/person-landowner.jpg";
import personHomeowner from "@/assets/person-homeowner.jpg";
import personBuilder from "@/assets/person-builder.jpg";
import lawBooks from "@/assets/law-books.jpg";
import founder from "@/assets/founder.jpg";
import Banner from "@/components/funnel/Banner";
import Footer from "@/components/funnel/Footer";
import Reveal from "@/components/funnel/Reveal";
import Ticker from "@/components/funnel/Ticker";
import GoogleIcon from "@/components/funnel/GoogleIcon";
import { Button } from "@/components/ui/button";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Studio Legale Accarino — Espropri, Edilizia & Urbanistica" },
      { name: "description", content: "Avvocati specializzati in indennità di esproprio, ordinanze di demolizione e ricorsi al TAR. Difesa di proprietari e imprese contro la PA." },
      { property: "og:title", content: "Studio Legale Accarino — Espropri, Edilizia & Urbanistica" },
      { property: "og:description", content: "Difesa di proprietari e imprese nei conflitti con la PA. Espropri, abusi edilizi, dinieghi e ricorsi al TAR." },
    ],
  }),
  component: Index,
});

const problems = [
  {
    icon: AlertTriangle,
    title: "Hai ricevuto un decreto di esproprio sotto valore",
    body: "L’indennità proposta dalla PA è quasi sempre molto inferiore al valore reale del bene. Senza opposizione tecnica, perdi anni di patrimonio in poche settimane.",
  },
  {
    icon: FileWarning,
    title: "Ti è arrivata un’ordinanza di demolizione",
    body: "60 giorni per impugnare. Dopo, l’opera diventa acquisita gratuitamente al Comune. Un avvocato generalista non conosce le strategie urbanistiche specifiche.",
  },
  {
    icon: Clock,
    title: "Il tuo permesso a costruire è bloccato da mesi",
    body: "Silenzio della PA, dinieghi pretestuosi, vincoli paesaggistici applicati a sproposito. Ogni mese di ritardo è margine perso sul cantiere.",
  },
  {
    icon: Landmark,
    title: "Ti hanno opposto un vincolo che non aspettavi",
    body: "Vincoli idrogeologici, paesaggistici, archeologici. Esiste una procedura precisa per impugnarli o ottenerne la deroga al TAR.",
  },
];

const audience = [
  {
    image: personLandowner,
    alt: "Proprietario terriero davanti al proprio fondo",
    title: "Proprietari terrieri & aziende agricole",
    desc: "Famiglie con proprietà ereditate, imprese agricole, fondi attraversati da nuove infrastrutture. Difendiamo l’indennità reale, non quella offerta dalla PA.",
  },
  {
    image: personHomeowner,
    alt: "Proprietaria di casa davanti alla propria abitazione",
    title: "Proprietari di casa & piccoli costruttori",
    desc: "Strutture esistenti, sopraelevazioni, ampliamenti, sanatorie. Impugniamo ordinanze di demolizione e blocchi su abusi recuperabili.",
  },
  {
    image: personBuilder,
    alt: "Imprenditore edile in cantiere",
    title: "PMI & imprese di costruzione",
    desc: "Costruttori e developer fermati da dinieghi, vincoli o silenzio della PA. Sblocchiamo permessi e progetti con ricorsi mirati al TAR.",
  },
];

const solutionItems = [
  { title: "Calcolo indipendente dell’indennità", desc: "Stima tecnica autonoma confrontata con quella della PA: la differenza media a vantaggio dei nostri clienti supera il 35%." },
  { title: "Ricorso al TAR rapido e mirato", desc: "Impugnazioni di ordinanze, dinieghi e vincoli depositate nei termini, con sospensiva richiesta quando serve." },
  { title: "Difesa contro abusi edilizi recuperabili", desc: "Sanatorie, accertamenti di conformità, opposizione a demolizioni: una strategia per ogni livello di rischio." },
  { title: "Selezione esclusiva dei casi", desc: "Accettiamo solo casi con margini concreti di vittoria. Te lo diciamo già nella consulenza preventiva." },
];

const tickerStats = [
  "20+ anni in diritto amministrativo",
  "+35% indennità media ottenuta",
  "Ricorsi TAR depositati in 7–14 giorni",
  "200+ procedure espropriative seguite",
  "Risposta entro 24h",
  "Solo casi con reali margini di successo",
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
  {
    q: "Ho ricevuto un’ordinanza di demolizione: cosa devo fare?",
    a: "Hai 60 giorni dalla notifica per impugnarla al TAR. È fondamentale agire subito: una valutazione tecnica preventiva ci dice se esistono margini di sospensiva e/o sanatoria. Nella consulenza preventiva analizziamo l’atto e ti diciamo con chiarezza se ha senso opporsi.",
  },
  {
    q: "L’indennità di esproprio è davvero negoziabile?",
    a: "Sì, in oltre il 70% dei casi quella offerta dalla PA è significativamente inferiore al valore di mercato. Esistono procedure di opposizione alla stima e ricorso alla Corte d’Appello che, con la giusta perizia, portano spesso a incrementi del 30–60% sull’indennità iniziale.",
  },
  {
    q: "Quanto tempo serve per un ricorso al TAR?",
    a: "Il ricorso va depositato entro 60 giorni. Noi tipicamente lo prepariamo e depositiamo in 7–14 giorni. La sospensiva, quando concessa, arriva in 30–60 giorni; il merito in 8–18 mesi a seconda del TAR.",
  },
  {
    q: "Lavorate in tutta Italia?",
    a: "Lo studio ha sede a Salerno ma assistiamo clienti in tutta Italia: il diritto amministrativo è uniforme e la quasi totalità degli atti si gestisce a distanza. Per le udienze ci spostiamo o ci avvaliamo di domiciliatari di fiducia.",
  },
  {
    q: "Cosa succede dopo la consulenza preventiva?",
    a: "Ricevi una valutazione chiara dei margini reali del tuo caso, con tempi e costi indicativi. Decidi tu se procedere: nessun automatismo, nessuna pressione commerciale.",
  },
];

function Index() {
  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      <Banner variant="light" showCta={false} />

      {/* HERO */}
      <section className="relative isolate flex min-h-[calc(100svh-5rem)] items-center overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 -z-10">
          <img src={heroCourthouse} alt="Tribunale amministrativo" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/80 to-primary/95" />
          <div className="absolute inset-0 animate-hero-shift bg-[radial-gradient(circle_at_20%_20%,color-mix(in_oklab,var(--color-gold)_18%,transparent),transparent_55%)]" />
        </div>

        <div className="container relative w-full py-20">
          <div className="mx-auto max-w-4xl text-center animate-fade-up">
            <span className="eyebrow-center text-gold">
              <Scale className="h-3.5 w-3.5" />
              Edilizia · Urbanistica · Espropri
            </span>
            <h1 className="mt-6 text-display text-balance text-primary-foreground">
              Difendi il tuo patrimonio dalle
              <br className="md:hidden" />
              <span className="md:inline"> </span>
              <span className="text-gold">decisioni della PA.</span>
            </h1>
            <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-primary-foreground/80">
              Espropri sotto valore, ordinanze di demolizione, dinieghi pretestuosi:
              quando lo Stato sbaglia, esistono i ricorsi giusti. Verifica in 90 secondi
              se il tuo caso ha margini reali.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild variant="cta" size="xl" className="group">
                <Link to="/quiz">
                  Verifica il tuo caso
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-primary-foreground/70 md:text-sm">
              <span className="inline-flex items-center gap-2">
                <GoogleIcon className="h-4 w-4" />
                <span className="font-semibold text-primary-foreground">5.0</span>
                <span className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-gold" strokeWidth={0} />
                  ))}
                </span>
                <span>· Clienti verificati in tutta Italia</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="section-y">
        <div className="container">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-24">
            <Reveal>
              <span className="eyebrow">La soluzione</span>
              <h2 className="mt-5 text-display-sm text-primary text-balance">
                Difendiamo proprietari e imprese
                {" "}
                <span className="text-gold-deep">nei conflitti con la Pubblica Amministrazione.</span>
              </h2>

              <ul className="mt-12 grid gap-8">
                {solutionItems.map((b) => (
                  <li key={b.title} className="flex items-start gap-5">
                    <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center border-2 border-gold bg-gold text-primary">
                      <Check className="h-4 w-4" strokeWidth={3} />
                    </span>
                    <div className="flex-1">
                      <p className="text-title text-primary">{b.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-12">
                <Button asChild variant="cta" size="lg">
                  <Link to="/quiz">
                    Verifica idoneità <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="relative">
                <div className="absolute -left-3 -top-3 h-full w-full border border-gold" aria-hidden />
                <img
                  src={lawBooks}
                  alt="Codice di diritto amministrativo e fascicoli"
                  className="relative w-full object-cover shadow-luxe"
                  loading="lazy"
                />
              </div>
              <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
                {[
                  { v: "20+", l: "Anni in diritto amministrativo" },
                  { v: "+35%", l: "Indennità media ottenuta" },
                  { v: "200+", l: "Procedure espropriative" },
                ].map((s) => (
                  <div key={s.l}>
                    <p className="text-stat text-gold-deep">{s.v}</p>
                    <p className="mt-2 text-caption uppercase tracking-[0.22em] text-muted-foreground">{s.l}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Ticker variant="dark" speed="slow" items={tickerStats.map((s) => <span key={s} className="text-gold">{s}</span>)} />

      {/* PROBLEM */}
      <section className="bg-primary py-24 text-primary-foreground md:py-32">
        <div className="container">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:items-start">
            <Reveal className="lg:sticky lg:top-32">
              <span className="eyebrow text-gold">Il problema</span>
              <h2 className="mt-5 text-display-sm text-primary-foreground text-balance">
                Sei solo davanti alla macchina dello Stato.
              </h2>
              <p className="mt-6 text-lg text-primary-foreground/70">
                La PA ha ufficio legale, periti interni e tempi a suo favore.
                Tu hai 60 giorni e un avvocato generalista. Lo squilibrio è strutturale —
                e si batte solo con specialisti del diritto amministrativo.
              </p>
              <div className="mt-10 border-l-2 border-gold pl-5">
                <p className="text-sm italic text-primary-foreground/80">
                  “Pensavamo che l’indennità offerta fosse l’unica possibile.
                  Era meno della metà del valore reale del fondo.”
                </p>
              </div>
            </Reveal>

            <div className="space-y-px bg-primary-foreground/10">
              {problems.map(({ icon: Icon, title, body }, i) => (
                <Reveal
                  key={title}
                  delay={i * 80}
                  className="flex items-start gap-6 bg-primary p-8 transition-luxe hover:bg-primary-foreground/5"
                >
                  <span className="text-stat text-gold">0{i + 1}</span>
                  <div>
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
                      <h3 className="text-title text-primary-foreground">{title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-primary-foreground/70">{body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Ticker variant="light" speed="slow" items={tickerResults} separator={<Sparkles className="h-4 w-4 text-gold" />} />

      {/* AUDIENCE */}
      <section className="bg-soft section-y">
        <div className="container">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="eyebrow-center">Per chi è</span>
            <h2 className="mt-5 text-display-sm text-primary text-balance">
              Lavoriamo con chi affronta la PA, non con chi la subisce.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Selezioniamo i casi: prendiamo solo quelli con margini concreti di vittoria,
              e te lo diciamo già nella consulenza preventiva.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {audience.map(({ image, alt, title, desc }) => (
              <Reveal key={title} delay={80}>
                <div className="group h-full overflow-hidden border border-border bg-card shadow-card transition-luxe hover:border-gold hover:shadow-luxe">
                  <div className="aspect-[3/4] w-full overflow-hidden bg-muted">
                    <img src={image} alt={alt} loading="lazy" className="h-full w-full object-cover object-top transition-luxe group-hover:scale-105" />
                  </div>
                  <div className="p-8">
                    <h3 className="text-title text-primary">{title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 text-center">
            <Button asChild variant="cta" size="xl">
              <Link to="/quiz">
                Verifica il tuo caso <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section-y">
        <div className="container">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow-center">Dicono di noi</span>
            <h2 className="mt-5 text-display-sm text-primary text-balance">
              Casi reali, risultati misurabili.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {reviews.map((r) => (
              <Reveal key={r.author} delay={80}>
                <article className="flex h-full flex-col justify-between border border-border bg-card p-8 shadow-card transition-luxe hover:shadow-luxe">
                  <div>
                    <div className="flex gap-1 text-gold">
                      {[...Array(5)].map((_, i) => (<Star key={i} className="h-4 w-4 fill-gold" strokeWidth={0} />))}
                    </div>
                    <blockquote className="mt-6 text-lg leading-snug text-primary text-balance">“{r.quote}”</blockquote>
                  </div>
                  <footer className="mt-8 border-t border-border pt-5">
                    <p className="font-semibold text-primary">{r.author}</p>
                    <p className="text-sm text-muted-foreground">{r.role}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gold">{r.hotel}</p>
                  </footer>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-soft section-y">
        <div className="container max-w-3xl">
          <Reveal className="text-center">
            <span className="eyebrow-center">FAQ</span>
            <h2 className="mt-5 text-display-sm text-primary text-balance">
              Le domande che ci fanno tutti.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <Accordion type="single" collapsible className="mt-12 space-y-3">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border border-border bg-card px-6 shadow-card transition-luxe data-[state=open]:border-gold">
                  <AccordionTrigger className="py-5 text-left text-title text-primary hover:text-gold hover:no-underline data-[state=open]:text-gold">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground">
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
        <div className="container relative text-center">
          <Reveal>
            <h2 className="mx-auto max-w-3xl text-display text-primary-foreground text-balance">
              La PA ha tempo, struttura e potere.
              {" "}
              <span className="text-gold">Tu hai bisogno del legale giusto.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/80">
              Verifica in 90 secondi se il tuo caso ha margini reali. Senza impegno.
            </p>
            <Button asChild variant="cta" size="xl" className="mt-10">
              <Link to="/quiz">
                Inizia ora <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
