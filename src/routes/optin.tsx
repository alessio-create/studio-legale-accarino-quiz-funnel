import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import Logo from "@/components/funnel/Logo";
import Review from "@/components/funnel/Review";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowRight, BadgeCheck, Users, Building2, Target, Sparkles, CheckCircle2, ShieldCheck,
} from "lucide-react";

export const Route = createFileRoute("/optin")({
  head: () => ({
    meta: [
      { title: "Il tuo caso è idoneo — Studio Legale Accarino" },
      { name: "description", content: "Lascia i tuoi dati per accedere alla consulenza preventiva con l'Avv. Accarino." },
      { name: "robots", content: "noindex,follow" },
    ],
  }),
  component: Optin,
});

type Answers = { role?: string; pain?: string; urgency?: string; value?: string };

type ReviewItem = { quote: string; author: string; role: string; hotel: string };

const painCopy: Record<string, { headline: string; how: string; actions: string[]; reviews: ReviewItem[] }> = {
  "Esproprio o indennità da rinegoziare": {
    headline: "Indennità di esproprio rinegoziata sul valore reale del bene.",
    how: "Perizia tecnica indipendente, opposizione alla stima della PA e, dove serve, ricorso alla Corte d’Appello: trasformiamo cifre arbitrarie in indennità di mercato.",
    actions: [
      "Stima indipendente del bene confrontata con quella della PA",
      "Opposizione alla determinazione provvisoria nei termini",
      "Negoziazione diretta con l’ente espropriante",
      "Ricorso in Corte d’Appello quando l’incremento atteso lo giustifica",
    ],
    reviews: [
      { quote: "Indennità raddoppiata in 9 mesi senza arrivare a sentenza. La perizia ha fatto la differenza.", author: "Giovanni M.", role: "Imprenditore agricolo", hotel: "Provincia di Salerno" },
      { quote: "Ci avevano offerto cifre da fame per un fondo di famiglia. Hanno ottenuto +€280k.", author: "Famiglia C.", role: "Proprietà ereditata", hotel: "Cilento" },
    ],
  },
  "Ordinanza di demolizione / abuso edilizio": {
    headline: "Ordinanze di demolizione impugnate, abusi recuperabili messi in sicurezza.",
    how: "Analisi tecnica dell’atto, valutazione di sanatoria o accertamento di conformità, ricorso al TAR con sospensiva quando i presupposti ci sono.",
    actions: [
      "Analisi dell’ordinanza e mappatura dei vizi formali e sostanziali",
      "Valutazione di accertamento di conformità o sanatoria edilizia",
      "Ricorso al TAR con istanza di sospensiva",
      "Difesa contro acquisizione gratuita al patrimonio comunale",
    ],
    reviews: [
      { quote: "Ordinanza annullata al TAR in 4 mesi. Senza di loro avremmo perso la casa.", author: "Marco R.", role: "Proprietario", hotel: "Costiera Amalfitana" },
      { quote: "Hanno trasformato un abuso in sanatoria piena. Lavoro di squadra con il geometra impeccabile.", author: "Luca B.", role: "Piccolo costruttore", hotel: "Salerno" },
    ],
  },
  "Diniego permessi / silenzio della PA": {
    headline: "Permessi sbloccati, dinieghi annullati, progetti rimessi in cantiere.",
    how: "Diffida formale, ricorso al TAR contro diniego o silenzio-inadempimento, nomina commissario ad acta: rimettiamo in moto la PA con gli strumenti giusti.",
    actions: [
      "Diffida e messa in mora dell’ente competente",
      "Ricorso al TAR contro diniego o silenzio-inadempimento",
      "Istanza di sospensiva per evitare ulteriori ritardi",
      "Richiesta di commissario ad acta in caso di inerzia continua",
    ],
    reviews: [
      { quote: "Permesso bloccato da 14 mesi, sbloccato in 90 giorni dopo il ricorso. Margini di cantiere salvati.", author: "Antonio P.", role: "Amministratore", hotel: "PMI edile · Campania" },
      { quote: "Diniego pretestuoso annullato al TAR. La PA ha riemesso il permesso senza ulteriori obiezioni.", author: "Stefano D.", role: "Developer", hotel: "Provincia di Napoli" },
    ],
  },
  "Vincolo paesaggistico o ambientale": {
    headline: "Vincoli impugnati, deroghe ottenute, progetti compatibili difesi.",
    how: "Analisi del provvedimento di vincolo, ricorso al TAR e collaborazione con tecnici qualificati per dimostrare compatibilità ambientale e paesaggistica.",
    actions: [
      "Analisi del provvedimento di vincolo e dei suoi presupposti",
      "Ricorso al TAR contro vincoli illegittimi o sproporzionati",
      "Istanze di autorizzazione paesaggistica in deroga",
      "Coordinamento con architetti e periti ambientali",
    ],
    reviews: [
      { quote: "Vincolo paesaggistico riformulato dopo il ricorso. Il progetto è ripartito senza modifiche sostanziali.", author: "Famiglia V.", role: "Committenza privata", hotel: "Costiera Sorrentina" },
      { quote: "Difesa tecnica e giuridica al massimo livello. La pratica è andata come avevano previsto.", author: "Arch. R. T.", role: "Studio tecnico associato", hotel: "Salerno" },
    ],
  },
  "Più di uno dei precedenti": {
    headline: "Una difesa unitaria su tutti i fronti del diritto amministrativo.",
    how: "Un solo studio segue esproprio, edilizia e ricorsi al TAR con strategia coordinata. Niente passaggi tra più consulenti, niente costi imprevisti.",
    actions: [
      "Audit completo di tutti gli atti pendenti e dei termini",
      "Strategia coordinata su procedure parallele",
      "Un unico referente per tutti i fronti aperti",
      "Reportistica chiara su tempi, costi e probabilità di successo",
    ],
    reviews: [
      { quote: "Avevo tre fronti aperti con la PA. Un solo team, un solo piano: tutto sotto controllo.", author: "Antonio P.", role: "Amministratore", hotel: "PMI edile · Campania" },
      { quote: "Approccio strategico, non burocratico. Si vede che il diritto amministrativo è il loro mestiere.", author: "Marco R.", role: "Proprietario", hotel: "Costiera Amalfitana" },
    ],
  },
};

const defaultPainKey = "Più di uno dei precedenti";

function Optin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", location: "" });
  const [acceptPolicy, setAcceptPolicy] = useState(true);
  const [answers, setAnswers] = useState<Answers>({});

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("quiz_answers");
      if (raw) setAnswers(JSON.parse(raw));
    } catch {}
  }, []);

  const painData = useMemo(() => {
    const key = answers.pain && painCopy[answers.pain] ? answers.pain : defaultPainKey;
    return painCopy[key];
  }, [answers.pain]);

  const summaryItems = [
    { icon: Users, label: "Profilo", value: answers.role ?? "Proprietario / impresa" },
    { icon: Building2, label: "Caso", value: answers.pain ?? "Diritto amministrativo" },
    { icon: Sparkles, label: "Stato", value: answers.urgency ?? "—" },
    { icon: Target, label: "Valore", value: answers.value ?? "—" },
  ];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptPolicy) return;
    navigate({ to: "/booking" });
  };

  const fields: { id: keyof typeof form; label: string; type: string; placeholder: string; pattern?: string; minLength?: number; maxLength?: number }[] = [
    { id: "name", label: "Nome e cognome", type: "text", placeholder: "Mario Rossi", minLength: 2, maxLength: 100 },
    { id: "location", label: "Comune / provincia", type: "text", placeholder: "Salerno (SA)" },
    { id: "email", label: "Email", type: "email", placeholder: "nome@email.it", maxLength: 255 },
    { id: "phone", label: "Telefono", type: "tel", placeholder: "+39 ...", pattern: "[0-9+\\s().-]{6,20}", minLength: 6, maxLength: 20 },
  ];

  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* Ambient gold glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
        style={{ background: "radial-gradient(60% 50% at 90% 0%, var(--color-gold) 0%, transparent 70%)" }}
      />
      <div className="absolute inset-0 grain opacity-40 pointer-events-none" />

      {/* Corner brackets */}
      <span aria-hidden className="absolute left-6 top-6 z-10 h-4 w-4 border-l border-t border-gold/30 lg:left-12 lg:top-12" />
      <span aria-hidden className="absolute bottom-6 right-6 z-10 h-4 w-4 border-b border-r border-gold/30 lg:bottom-12 lg:right-12" />

      {/* Header */}
      <header className="relative z-10 border-b border-primary/10">
        <div className="container flex h-20 items-center justify-between md:h-24">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Logo variant="gold" logomarkOnly className="h-9 w-auto md:h-10" />
              <span aria-hidden className="absolute -inset-2 border border-gold/20" />
            </div>
            <div className="hidden h-px w-8 bg-gold/40 sm:block" />
            <span className="hidden text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground sm:inline">
              Pratica idonea
            </span>
          </div>
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
            05 / 06
          </span>
        </div>
        <div className="relative h-px w-full bg-primary/10">
          <div className="absolute inset-y-0 left-0 bg-gold" style={{ width: "83%" }} />
        </div>
      </header>

      <main className="relative z-10">
        <div className="container py-16 sm:py-20 lg:py-24">
          <div className="grid grid-cols-12 items-start gap-6 lg:gap-8">
            {/* Left vertical meta */}
            <div className="hidden lg:col-span-1 lg:flex flex-col items-start gap-12 pt-2">
              <div className="flex flex-col items-start gap-3">
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold"
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                  Capitolo 05
                </span>
                <div className="ml-1 h-12 w-px bg-gold/30" />
              </div>
              <span
                className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                Accesso al calendario
              </span>
            </div>

            {/* Main content */}
            <div className="col-span-12 lg:col-span-10">
              <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
                {/* LEFT: form */}
                <div className="min-w-0 animate-fade-up">
                  <div className="flex items-center gap-5">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">V</span>
                    <div className="h-px w-8 bg-gold/40" />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                      Idoneità verificata
                    </span>
                  </div>

                  <div className="relative mt-6">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -left-6 -top-16 select-none font-serif text-[180px] leading-none text-primary/[0.04] lg:-left-12 lg:text-[220px]"
                    >
                      ✓
                    </span>
                    <h1 className="relative text-balance text-[clamp(1.85rem,4.6vw,3.4rem)] font-500 leading-[1.06] tracking-[-0.02em] text-primary">
                      Il tuo caso è <span className="text-gold-deep">idoneo.</span>
                    </h1>
                  </div>
                  <div className="mt-6 h-px w-24 origin-left bg-gold animate-draw-line" />
                  <p className="mt-6 max-w-xl text-lg leading-[1.55] text-muted-foreground">
                    Lascia i tuoi dati per accedere alla consulenza preventiva con l’Avv. Accarino.
                  </p>

                  <form onSubmit={submit} className="relative mt-10 border border-primary/15 bg-primary/[0.02] p-6 backdrop-blur-sm sm:p-8 md:p-10">
                    <span aria-hidden className="absolute -left-px -top-px h-3 w-3 border-l border-t border-gold" />
                    <span aria-hidden className="absolute -bottom-px -right-px h-3 w-3 border-b border-r border-gold" />

                    <div className="flex items-center gap-3 border-b border-primary/10 pb-4">
                      <BadgeCheck className="h-4 w-4 text-gold" strokeWidth={2} />
                      <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-deep">
                        Dati di contatto
                      </span>
                    </div>

                    <div className="mt-7 grid gap-5 sm:grid-cols-2">
                      {fields.map((f, i) => (
                        <div
                          key={f.id}
                          className={`space-y-2 ${f.id === "email" || f.id === "phone" ? "sm:col-span-2" : ""}`}
                        >
                          <Label htmlFor={f.id} className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                            <span className="font-serif text-[11px] text-gold/70">
                              {String.fromCharCode(65 + i)}
                            </span>
                            {f.label}
                          </Label>
                          <Input
                            id={f.id}
                            type={f.type}
                            required
                            minLength={f.minLength}
                            maxLength={f.maxLength}
                            pattern={f.pattern}
                            value={form[f.id]}
                            onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
                            placeholder={f.placeholder}
                            className="h-12 rounded-none border-0 border-b border-primary/20 bg-transparent px-0 text-base text-primary placeholder:text-muted-foreground/50 shadow-none focus-visible:border-gold focus-visible:ring-0"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 flex items-start gap-3 border-t border-primary/10 pt-6">
                      <Checkbox
                        id="accept-policy"
                        checked={acceptPolicy}
                        onCheckedChange={(v) => setAcceptPolicy(v === true)}
                        className="mt-0.5"
                      />
                      <Label htmlFor="accept-policy" className="text-sm leading-relaxed text-muted-foreground font-normal cursor-pointer">
                        Accetto la Privacy Policy e acconsento al trattamento dei miei dati per essere ricontattato dallo Studio Legale Accarino.
                      </Label>
                    </div>

                    <Button
                      type="submit"
                      variant="cta"
                      size="xl"
                      className="group mt-7 w-full"
                      disabled={!acceptPolicy}
                    >
                      Accedi al calendario
                      <ArrowRight className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-1" />
                    </Button>

                    <p className="mt-5 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                      <ShieldCheck className="h-3.5 w-3.5 text-gold" />
                      Dati riservati · uso esclusivo dello studio
                    </p>
                  </form>
                </div>

                {/* RIGHT: profile + actions */}
                <aside className="min-w-0 space-y-10 lg:sticky lg:top-28">
                  <section className="relative border border-primary/15 bg-primary/[0.02] p-6 backdrop-blur-sm sm:p-8">
                    <span aria-hidden className="absolute -right-px -top-px h-3 w-3 border-r border-t border-gold" />

                    <div className="flex items-center gap-5">
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">·</span>
                      <div className="h-px w-8 bg-gold/40" />
                      <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                        Il tuo profilo
                      </span>
                    </div>

                    <dl className="mt-7 grid gap-3 sm:grid-cols-2">
                      {summaryItems.map(({ icon: Icon, label, value }, i) => (
                        <div
                          key={label}
                          className="group relative border border-primary/10 bg-background/40 p-4 transition-colors hover:border-gold/50"
                        >
                          <span aria-hidden className="absolute inset-y-0 left-0 w-[2px] origin-center scale-y-0 bg-gold transition-transform duration-500 group-hover:scale-y-100" />
                          <div className="flex items-center gap-3">
                            <span className="font-serif text-[10px] uppercase tracking-[0.3em] text-gold/70">
                              {String.fromCharCode(65 + i)}
                            </span>
                            <Icon className="h-3.5 w-3.5 text-gold/80" strokeWidth={2} />
                            <dt className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                              {label}
                            </dt>
                          </div>
                          <dd className="mt-3 text-sm font-medium text-primary leading-snug">
                            {value}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <div className="relative mt-8">
                      <h2 className="text-balance text-xl font-500 leading-snug tracking-[-0.01em] text-primary md:text-2xl">
                        {painData.headline}
                      </h2>
                      <div className="mt-4 h-px w-16 bg-gold" />
                      <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                        {painData.how}
                      </p>
                    </div>

                    <div className="mt-7 border-t border-primary/10 pt-6">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-deep">
                        Cosa facciamo per te
                      </p>
                      <ul className="mt-5 space-y-3">
                        {painData.actions.map((action, i) => (
                          <li key={action} className="flex items-start gap-3">
                            <span className="mt-0.5 font-serif text-[10px] uppercase tracking-[0.3em] text-gold/70">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" strokeWidth={2} />
                            <span className="text-sm leading-snug text-primary">{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </section>

                  <div className="space-y-5">
                    <div className="flex items-center gap-5">
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">·</span>
                      <div className="h-px w-8 bg-gold/40" />
                      <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                        Chi ha già risolto come te
                      </span>
                    </div>
                    {painData.reviews.map((r) => (
                      <Review key={r.author + r.hotel} quote={r.quote} author={r.author} role={r.role} hotel={r.hotel} />
                    ))}
                  </div>
                </aside>
              </div>
            </div>

            {/* Right vertical mark */}
            <div className="hidden lg:col-span-1 lg:flex flex-col items-end justify-between gap-12 pt-2">
              <span
                className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground"
                style={{ writingMode: "vertical-rl" }}
              >
                Studio Legale Accarino · Optin
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
