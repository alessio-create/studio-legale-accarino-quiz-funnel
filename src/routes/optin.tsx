import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import Logo from "@/components/funnel/Logo";
import Review from "@/components/funnel/Review";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowRight, BadgeCheck, Users, Building2, Target, Sparkles, CheckCircle2, MapPin,
} from "lucide-react";

export const Route = createFileRoute("/optin")({
  head: () => ({
    meta: [
      { title: "Il tuo caso è idoneo — Studio Legale Accarino" },
      { name: "description", content: "Lascia i tuoi dati per accedere alla consulenza preventiva con l'Avv. Accarino." },
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

  return (
    <div className="min-h-screen overflow-x-hidden bg-soft grain">
      <header className="border-b border-border bg-background/85 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-center md:h-20">
          <Logo />
        </div>
        <div className="rule-gold" />
      </header>

      <main className="container section-y">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-20">
          <div className="min-w-0 animate-fade-up">
            <span className="inline-flex items-center gap-2.5 border border-gold/40 bg-gold-soft px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-deep">
              <span className="flex h-5 w-5 items-center justify-center bg-gold text-primary">
                <BadgeCheck className="h-3 w-3" strokeWidth={2.75} />
              </span>
              Idoneità verificata
            </span>
            <h1 className="mt-7 text-display-sm text-primary text-balance">
              Il tuo caso è
              <br className="md:hidden" />
              <span className="md:inline"> </span>
              <span className="text-gold-deep">idoneo.</span>
            </h1>
            <div className="rule-gold mt-6 w-24 origin-left animate-draw-line" />
            <p className="mt-6 text-lead">
              Lascia i tuoi dati per accedere alla consulenza preventiva
              {" "}con l’Avv. Accarino.
            </p>

            <form onSubmit={submit} className="mt-10 space-y-6 border border-border bg-card p-6 shadow-card lift-luxe sm:p-8 md:p-10">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-eyebrow text-muted-foreground">Nome e cognome</Label>
                  <Input id="name" required minLength={2} maxLength={100} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="h-12 border-border bg-background text-base" placeholder="Mario Rossi" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-eyebrow text-muted-foreground">Comune / provincia</Label>
                  <Input id="location" required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="h-12 border-border bg-background text-base" placeholder="Salerno (SA)" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-eyebrow text-muted-foreground">Email</Label>
                <Input id="email" type="email" required maxLength={255} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="h-12 w-full min-w-0 border-border bg-background text-base" placeholder="nome@email.it" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-eyebrow text-muted-foreground">Telefono</Label>
                <Input id="phone" type="tel" required pattern="[0-9+\s().-]{6,20}" minLength={6} maxLength={20} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="h-12 border-border bg-background text-base" placeholder="+39 ..." />
              </div>

              <div className="flex items-start gap-3 border border-border bg-background/60 p-4">
                <Checkbox id="accept-policy" checked={acceptPolicy} onCheckedChange={(v) => setAcceptPolicy(v === true)} className="mt-0.5" />
                <Label htmlFor="accept-policy" className="text-body-sm text-muted-foreground font-normal cursor-pointer">
                  Accetto la Privacy Policy e acconsento al trattamento dei miei dati per essere ricontattato dallo Studio Legale Accarino.
                </Label>
              </div>

              <Button type="submit" variant="cta" size="xl" className="group w-full animate-pulse-amber" disabled={!acceptPolicy}>
                Accedi al calendario
                <ArrowRight className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-1" />
              </Button>
            </form>
          </div>

          <aside className="min-w-0 space-y-10 lg:sticky lg:top-28">
            <section className="border border-gold/40 bg-card p-6 shadow-luxe sm:p-8 md:p-9">
              <div className="eyebrow">
                <Sparkles className="h-3.5 w-3.5" />
                Il tuo profilo
              </div>

              <dl className="mt-6 grid gap-3 sm:grid-cols-2">
                {summaryItems.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="group flex items-start gap-3 border border-border bg-gold-soft/40 px-4 py-4 transition-luxe hover:border-gold/60">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center bg-gold text-primary">
                      <Icon className="h-4 w-4" strokeWidth={2} />
                    </span>
                    <div className="min-w-0 flex-1 pr-1">
                      <dt className="text-caption uppercase tracking-[0.22em] text-muted-foreground">{label}</dt>
                      <dd className="mt-1 text-body-sm font-semibold text-primary break-words leading-snug">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>

              <h2 className="mt-8 text-heading text-primary text-balance">{painData.headline}</h2>
              <div className="rule-gold mt-5 w-16" />
              <p className="mt-5 text-body text-muted-foreground">{painData.how}</p>

              <div className="mt-8 border-t border-border pt-7">
                <p className="eyebrow">Cosa facciamo per te</p>
                <ul className="mt-5 space-y-3.5">
                  {painData.actions.map((action) => (
                    <li key={action} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" />
                      <span className="text-body-sm text-primary">{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <div className="space-y-5">
              <p className="eyebrow">Chi ha già risolto come te</p>
              {painData.reviews.map((r) => (
                <Review key={r.author + r.hotel} quote={r.quote} author={r.author} role={r.role} hotel={r.hotel} />
              ))}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
