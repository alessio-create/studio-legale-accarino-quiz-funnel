import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import Logo from "@/components/funnel/Logo";
import Footer from "@/components/funnel/Footer";
import Reveal from "@/components/funnel/Reveal";
import { Button } from "@/components/ui/button";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight, Calendar as CalendarIcon, Check, ChevronLeft, ChevronRight,
  Clock, MessageSquare, FileSignature, Sparkles,
} from "lucide-react";
import founder from "@/assets/founder.jpg";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Prenota la consulenza — Studio Legale Accarino" },
      { name: "description", content: "Scegli data e ora per la tua consulenza preventiva con l'Avv. Accarino." },
      { name: "robots", content: "noindex,follow" },
    ],
  }),
  component: Booking,
});

const months = ["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"];
const weekdays = ["L","M","M","G","V","S","D"];
const slots = ["10:00","11:30","14:00","15:30","17:00","18:30"];

const generateMonthDays = (year: number, month: number) => {
  const first = new Date(year, month, 1);
  const startWeekday = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(startWeekday).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
};

const faqs = [
  { q: "Cosa succede dopo aver prenotato la consulenza?", a: "Ricevi un’email di conferma con il link Zoom e un mini-briefing di 3 minuti da compilare. L’Avv. Accarino arriva alla call con risposte già pronte sulla tua situazione." },
  { q: "Quanto dura la consulenza preventiva?", a: "30 minuti netti. Niente sales pitch: analisi del tuo caso, risposta a 2–3 domande concrete, e — se ci sono margini reali — proposta di collaborazione con tempi e costi chiari." },
  { q: "Cosa devo preparare?", a: "Idealmente: copia dell’atto ricevuto (decreto di esproprio, ordinanza, diniego), eventuali planimetrie o titoli edilizi. Se non li hai pronti, parliamo lo stesso." },
  { q: "La consulenza è davvero senza impegno?", a: "Sì. È un’analisi del tuo caso senza alcun obbligo di proseguire. Esci con una valutazione tecnica chiara anche se non lavoreremo insieme." },
];

function Booking() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const cells = generateMonthDays(viewYear, viewMonth);
  const isPast = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return d < t;
  };
  const isWeekend = (day: number) => {
    const wd = new Date(viewYear, viewMonth, day).getDay();
    return wd === 0 || wd === 6;
  };

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
    setSelectedDay(null); setSelectedSlot(null);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
    setSelectedDay(null); setSelectedSlot(null);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <header className="border-b border-border bg-background/85 backdrop-blur-md">
        <div className="container flex h-20 items-center justify-center md:h-28">
          <Logo />
        </div>
        <div className="rule-gold" />
      </header>

      <section className="bg-soft grain section-y">
        <div className="container max-w-5xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow-center">Step finale</span>
            <h1 className="mt-5 text-display text-primary text-balance">
              Scegli il momento per la tua call con
              {" "}<span className="text-gold">l’Avv. Accarino.</span>
            </h1>
            <div className="rule-gold mx-auto mt-6 w-24 animate-draw-line" />
          </Reveal>

          <Reveal delay={120} className="mt-10 overflow-hidden border border-border bg-card shadow-luxe md:mt-14">
            {confirmed ? (
              <div className="px-6 py-14 text-center animate-scale-in sm:px-10 md:py-20">
                <div className="mx-auto flex h-16 w-16 items-center justify-center bg-amber text-gold-foreground animate-pulse-amber">
                  <Check className="h-8 w-8" strokeWidth={2.5} />
                </div>
                <h2 className="mt-7 text-display-sm text-primary">Consulenza preventiva confermata</h2>
                <p className="mt-4 text-lead">{selectedDay} {months[viewMonth]} {viewYear} · {selectedSlot}</p>
                <p className="mt-7 text-body-sm text-muted-foreground">
                  Riceverai a breve un’email di conferma con il link e il mini-briefing di preparazione.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-[1.4fr_1fr]">
                <div className="border-b border-border p-6 sm:p-7 md:border-b-0 md:border-r md:p-9">
                  <div className="flex items-center justify-between">
                    <h3 className="text-heading text-primary">{months[viewMonth]} {viewYear}</h3>
                    <div className="flex gap-1">
                      <button onClick={prevMonth} aria-label="Mese precedente" className="flex h-9 w-9 items-center justify-center border border-border text-muted-foreground transition-luxe hover:border-gold hover:text-gold">
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button onClick={nextMonth} aria-label="Mese successivo" className="flex h-9 w-9 items-center justify-center border border-border text-muted-foreground transition-luxe hover:border-gold hover:text-gold">
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-7 grid grid-cols-7 gap-1 text-center text-caption uppercase tracking-[0.18em] text-muted-foreground">
                    {weekdays.map((w, i) => (<div key={i} className="py-2">{w}</div>))}
                  </div>
                  <div className="mt-1 grid grid-cols-7 gap-1">
                    {cells.map((day, i) => {
                      if (day === null) return <div key={i} />;
                      const disabled = isPast(day) || isWeekend(day);
                      const selected = selectedDay === day;
                      return (
                        <button
                          key={i}
                          disabled={disabled}
                          onClick={() => { setSelectedDay(day); setSelectedSlot(null); }}
                          className={`aspect-square text-sm font-medium tabular-nums transition-luxe ${
                            disabled ? "cursor-not-allowed text-muted-foreground/30"
                            : selected ? "bg-amber text-gold-foreground shadow-amber scale-105"
                            : "text-primary hover:bg-secondary hover:text-gold hover:scale-105"
                          }`}
                        >{day}</button>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-soft p-6 sm:p-7 md:p-9">
                  <span className="eyebrow">Orari disponibili</span>
                  {selectedDay ? (
                    <div className="animate-fade-in">
                      <p className="mt-4 text-xl font-600 text-primary tracking-[-0.015em]">
                        {selectedDay} {months[viewMonth]}
                      </p>
                      <div className="mt-7 grid grid-cols-2 gap-2.5">
                        {slots.map((s, idx) => (
                          <button
                            key={s}
                            onClick={() => setSelectedSlot(s)}
                            style={{ animationDelay: `${idx * 50}ms` }}
                            className={`border px-3 py-3.5 text-base font-medium tabular-nums transition-luxe animate-fade-in ${
                              selectedSlot === s ? "border-gold bg-amber text-gold-foreground" : "border-border bg-card text-primary hover:border-gold hover:text-gold hover:-translate-y-0.5"
                            }`}
                          >{s}</button>
                        ))}
                      </div>
                      {selectedSlot && (
                        <Button onClick={() => setConfirmed(true)} variant="cta" size="lg" className="mt-7 w-full animate-scale-in">
                          Conferma {selectedSlot} <ArrowRight className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="mt-14 flex flex-col items-center justify-center text-center">
                      <CalendarIcon className="h-10 w-10 text-muted-foreground/40 animate-float-soft" strokeWidth={1.5} />
                      <p className="mt-5 text-body-sm text-muted-foreground">
                        Seleziona un giorno per vedere gli orari disponibili.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* WHO */}
      <section className="section-y">
        <div className="container max-w-6xl">
          <div className="grid gap-10 md:gap-14 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-20">
            <Reveal className="relative group mx-auto w-full max-w-sm lg:max-w-none">
              <div className="absolute -left-2 -top-2 h-full w-full border border-gold transition-all duration-700 group-hover:-left-5 group-hover:-top-5" aria-hidden />
              <img src={founder} alt="Avv. Accarino" className="relative w-full object-cover shadow-luxe transition-transform duration-700 group-hover:scale-[1.01]" loading="lazy" />
            </Reveal>
            <Reveal delay={150}>
              <span className="eyebrow">Chi ti risponderà</span>
              <h2 className="mt-5 text-display text-primary text-balance">
                Avv. <span className="text-gold">Accarino.</span>
              </h2>
              <div className="rule-gold mt-6 w-24 origin-left animate-draw-line" />
              <p className="mt-6 text-lead">
                Founder dello Studio Legale Accarino e responsabile dell’area
                Edilizia, Urbanistica & Espropri. Da oltre 20 anni difende proprietari,
                aziende agricole e imprese di costruzione nei procedimenti contro la PA.
              </p>
              <p className="mt-5 text-body text-muted-foreground">
                Quando prenoti, parli direttamente con lui. Niente filtri, niente
                assistenti, niente “le farò sapere”.
              </p>
              <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8 md:mt-12 md:pt-10">
                {[
                  { v: "20+", l: "Anni di esperienza" },
                  { v: "+35%", l: "Indennità media ottenuta" },
                  { v: "200+", l: "Casi seguiti" },
                ].map((s, i) => (
                  <Reveal key={s.l} delay={300 + i * 100}>
                    <p className="text-stat text-gold">{s.v}</p>
                    <p className="mt-3 text-caption uppercase tracking-[0.24em] text-muted-foreground">{s.l}</p>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* NEXT STEPS */}
      <section className="bg-primary section-y text-primary-foreground">
        <div className="container max-w-5xl">
          <Reveal className="text-center">
            <span className="eyebrow-center">Prossimi step</span>
            <h2 className="mt-5 text-display text-primary-foreground text-balance">
              Cosa succede dopo aver <span className="text-gold">prenotato.</span>
            </h2>
            <div className="rule-gold mx-auto mt-6 w-24 animate-draw-line" />
          </Reveal>

          <ol className="mt-12 grid gap-px overflow-hidden border border-primary-foreground/15 bg-primary-foreground/15 sm:grid-cols-2 md:mt-16 md:grid-cols-4">
            {[
              { icon: MessageSquare, title: "Email di conferma", body: "Ricevi data, ora e link Zoom. Più un mini-briefing di 3 minuti da compilare." },
              { icon: Clock, title: "Call di 30 minuti", body: "L’Avv. Accarino analizza il tuo caso e risponde a 2–3 domande concrete." },
              { icon: FileSignature, title: "Proposta su misura", body: "Se ci sono margini, ricevi proposta scritta con piano, costi e timeline." },
              { icon: Sparkles, title: "Avvio in 7 giorni", body: "Audit degli atti, prima istanza o ricorso depositato nei termini di legge." },
            ].map(({ icon: Icon, title, body }, i) => (
              <Reveal as="li" key={title} delay={i * 120} className="relative bg-primary p-7 group transition-luxe hover:bg-primary/70 md:p-9">
                <div className="flex items-center gap-4">
                  <span className="text-stat text-gold">0{i + 1}</span>
                  <Icon className="h-5 w-5 text-gold transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 text-title text-primary-foreground md:mt-7">{title}</h3>
                <p className="mt-3 text-body-sm text-primary-foreground/70">{body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-soft grain section-y">
        <div className="container max-w-3xl">
          <Reveal className="text-center">
            <span className="eyebrow-center">FAQ</span>
            <h2 className="mt-5 text-display text-primary text-balance">
              Tutto quello che vuoi sapere <span className="text-gold">prima della call.</span>
            </h2>
            <div className="rule-gold mx-auto mt-6 w-24 animate-draw-line" />
          </Reveal>
          <Reveal delay={120}>
            <Accordion type="single" collapsible className="mt-12 border-t border-border md:mt-16">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b border-border">
                  <AccordionTrigger className="py-6 text-left text-title text-primary hover:text-gold hover:no-underline md:py-7">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-body text-muted-foreground md:pb-7">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-primary py-20 md:py-28">
        <div className="container max-w-4xl text-center">
          <Reveal>
            <span className="eyebrow-center">Pronto a iniziare?</span>
            <h2 className="mt-5 text-display text-primary-foreground text-balance">
              Prenota ora la tua <span className="text-gold">consulenza preventiva.</span>
            </h2>
            <div className="rule-gold mx-auto mt-6 w-24 animate-draw-line" />
            <p className="mt-6 text-lead text-primary-foreground/70">
              30 minuti con l’Avv. Accarino. Senza impegno. Valore concreto garantito.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <Button asChild variant="cta" size="xl" className="mt-10">
              <Link to="/quiz">
                Verifica il tuo caso <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
