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
  Clock, MessageSquare, FileSignature, Sparkles, ShieldCheck,
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
    <div className="relative isolate min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* Ambient gold glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[80vh] opacity-[0.10]"
        style={{ background: "radial-gradient(60% 50% at 90% 0%, var(--color-gold) 0%, transparent 70%)" }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[80vh] grain opacity-40" />

      {/* Corner brackets */}
      <span aria-hidden className="absolute left-6 top-6 z-10 h-4 w-4 border-l border-t border-gold/30 lg:left-12 lg:top-12" />
      <span aria-hidden className="absolute right-6 top-6 z-10 h-4 w-4 border-r border-t border-gold/30 lg:right-12 lg:top-12" />

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
              Prenotazione
            </span>
          </div>
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
            06 / 06
          </span>
        </div>
        <div className="relative h-px w-full bg-primary/10">
          <div className="absolute inset-y-0 left-0 bg-gold" style={{ width: "100%" }} />
        </div>
      </header>

      {/* CALENDAR */}
      <section className="relative z-10">
        <div className="container py-16 sm:py-20 lg:py-24">
          <div className="grid grid-cols-12 items-start gap-6 lg:gap-8">
            {/* Left vertical meta */}
            <div className="hidden lg:col-span-1 lg:flex flex-col items-start gap-12 pt-2">
              <div className="flex flex-col items-start gap-3">
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold"
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                  Capitolo 06
                </span>
                <div className="ml-1 h-12 w-px bg-gold/30" />
              </div>
              <span
                className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                Step finale
              </span>
            </div>

            <div className="col-span-12 lg:col-span-10">
              <div className="flex items-center gap-5">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">VI</span>
                <div className="h-px w-8 bg-gold/40" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  Calendario
                </span>
              </div>

              <div className="relative mt-6 max-w-3xl">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -left-6 -top-16 select-none font-serif text-[180px] leading-none text-primary/[0.04] lg:-left-12 lg:text-[220px]"
                >
                  ☉
                </span>
                <h1 className="relative text-balance text-[clamp(1.85rem,4.6vw,3.4rem)] font-500 leading-[1.06] tracking-[-0.02em] text-primary">
                  Scegli il momento per la tua call con
                  {" "}<span className="text-gold-deep">l’Avv. Accarino.</span>
                </h1>
              </div>
              <div className="mt-6 h-px w-24 origin-left bg-gold animate-draw-line" />

              <Reveal delay={120} className="relative mt-12 border border-primary/15 bg-primary/[0.02] backdrop-blur-sm md:mt-14">
                <span aria-hidden className="absolute -left-px -top-px h-3 w-3 border-l border-t border-gold" />
                <span aria-hidden className="absolute -bottom-px -right-px h-3 w-3 border-b border-r border-gold" />

                {confirmed ? (
                  <div className="px-6 py-14 text-center animate-scale-in sm:px-10 md:py-20">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center border border-gold bg-gold/10 text-gold-deep">
                      <Check className="h-7 w-7" strokeWidth={2.5} />
                    </div>
                    <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-deep">
                      Conferma ricevuta
                    </p>
                    <h2 className="mt-5 text-balance text-3xl font-500 tracking-[-0.02em] text-primary md:text-4xl">
                      Consulenza preventiva confermata
                    </h2>
                    <div className="mx-auto mt-6 h-px w-16 bg-gold" />
                    <p className="mt-6 text-lg text-primary">
                      {selectedDay} {months[viewMonth]} {viewYear} · {selectedSlot}
                    </p>
                    <p className="mt-5 text-sm text-muted-foreground">
                      Riceverai a breve un’email di conferma con il link e il mini-briefing di preparazione.
                    </p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-[1.4fr_1fr]">
                    <div className="border-b border-primary/10 p-6 sm:p-7 md:border-b-0 md:border-r md:p-9">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-serif text-[11px] uppercase tracking-[0.3em] text-gold/70">A</span>
                          <h3 className="text-lg font-500 tracking-[-0.01em] text-primary md:text-xl">
                            {months[viewMonth]} {viewYear}
                          </h3>
                        </div>
                        <div className="flex gap-1">
                          <button onClick={prevMonth} aria-label="Mese precedente" className="flex h-9 w-9 items-center justify-center border border-primary/20 text-muted-foreground transition-colors hover:border-gold hover:text-gold">
                            <ChevronLeft className="h-4 w-4" />
                          </button>
                          <button onClick={nextMonth} aria-label="Mese successivo" className="flex h-9 w-9 items-center justify-center border border-primary/20 text-muted-foreground transition-colors hover:border-gold hover:text-gold">
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-7 grid grid-cols-7 gap-1 text-center text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
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
                              className={`aspect-square border text-sm font-medium tabular-nums transition-all duration-300 ${
                                disabled ? "cursor-not-allowed border-transparent text-muted-foreground/30"
                                : selected ? "border-gold bg-gold text-primary shadow-[0_0_0_1px_var(--color-gold)]"
                                : "border-transparent text-primary hover:border-gold/60 hover:text-gold-deep"
                              }`}
                            >{day}</button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="p-6 sm:p-7 md:p-9">
                      <div className="flex items-center gap-3">
                        <span className="font-serif text-[11px] uppercase tracking-[0.3em] text-gold/70">B</span>
                        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                          Orari disponibili
                        </span>
                      </div>
                      {selectedDay ? (
                        <div className="animate-fade-in">
                          <p className="mt-5 text-xl font-500 text-primary tracking-[-0.015em]">
                            {selectedDay} {months[viewMonth]}
                          </p>
                          <div className="mt-3 h-px w-12 bg-gold" />
                          <div className="mt-6 grid grid-cols-2 gap-2.5">
                            {slots.map((s, idx) => (
                              <button
                                key={s}
                                onClick={() => setSelectedSlot(s)}
                                style={{ animationDelay: `${idx * 50}ms` }}
                                className={`group relative overflow-hidden border px-3 py-3.5 text-base font-medium tabular-nums transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] animate-fade-in ${
                                  selectedSlot === s
                                    ? "border-gold bg-gold/10 text-gold-deep shadow-[0_0_0_1px_var(--color-gold)]"
                                    : "border-primary/15 bg-primary/[0.02] text-primary hover:border-gold/60 hover:text-gold-deep"
                                }`}
                              >
                                <span
                                  aria-hidden
                                  className={`absolute inset-y-0 left-0 w-[2px] bg-gold transition-transform duration-500 origin-center ${
                                    selectedSlot === s ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100"
                                  }`}
                                />
                                {s}
                              </button>
                            ))}
                          </div>
                          {selectedSlot && (
                            <Button onClick={() => setConfirmed(true)} variant="cta" size="lg" className="group mt-7 w-full animate-scale-in">
                              Conferma {selectedSlot}
                              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                            </Button>
                          )}
                        </div>
                      ) : (
                        <div className="mt-14 flex flex-col items-center justify-center text-center">
                          <CalendarIcon className="h-10 w-10 text-muted-foreground/40 animate-float-soft" strokeWidth={1.5} />
                          <p className="mt-5 text-sm text-muted-foreground">
                            Seleziona un giorno per vedere gli orari disponibili.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </Reveal>

              <p className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-gold" />
                Consulenza preventiva · 30 minuti · senza impegno
              </p>
            </div>

            <div className="hidden lg:col-span-1 lg:flex flex-col items-end gap-12 pt-2">
              <span
                className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground"
                style={{ writingMode: "vertical-rl" }}
              >
                Studio Legale Accarino · Booking
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* WHO */}
      <section className="relative z-10 border-t border-primary/10 py-20 md:py-28">
        <div className="container max-w-6xl">
          <div className="grid gap-10 md:gap-14 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-20">
            <Reveal className="relative group mx-auto w-full max-w-sm lg:max-w-none">
              <div className="absolute -left-2 -top-2 h-full w-full border border-gold transition-all duration-700 group-hover:-left-5 group-hover:-top-5" aria-hidden />
              <img src={founder} alt="Avv. Accarino" className="relative w-full object-cover shadow-luxe transition-transform duration-700 group-hover:scale-[1.01]" loading="lazy" />
            </Reveal>
            <Reveal delay={150}>
              <div className="flex items-center gap-5">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">·</span>
                <div className="h-px w-8 bg-gold/40" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  Chi ti risponderà
                </span>
              </div>
              <h2 className="mt-6 text-balance text-[clamp(1.85rem,4.6vw,3.4rem)] font-500 leading-[1.06] tracking-[-0.02em] text-primary">
                Avv. <span className="text-gold-deep">Accarino.</span>
              </h2>
              <div className="mt-6 h-px w-24 bg-gold" />
              <p className="mt-6 text-lg leading-[1.55] text-muted-foreground">
                Founder dello Studio Legale Accarino e responsabile dell’area
                Edilizia, Urbanistica & Espropri. Da oltre 20 anni difende proprietari,
                aziende agricole e imprese di costruzione nei procedimenti contro la PA.
              </p>
              <p className="mt-5 text-base text-muted-foreground">
                Quando prenoti, parli direttamente con lui. Niente filtri, niente
                assistenti, niente “le farò sapere”.
              </p>
              <div className="mt-10 grid grid-cols-3 gap-6 border-t border-primary/10 pt-8 md:mt-12 md:pt-10">
                {[
                  { v: "20+", l: "Anni di esperienza" },
                  { v: "+35%", l: "Indennità media ottenuta" },
                  { v: "200+", l: "Casi seguiti" },
                ].map((s, i) => (
                  <Reveal key={s.l} delay={300 + i * 100}>
                    <p className="text-3xl font-500 tracking-[-0.02em] text-gold-deep md:text-4xl">{s.v}</p>
                    <p className="mt-3 text-[10px] uppercase tracking-[0.24em] text-muted-foreground">{s.l}</p>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* NEXT STEPS */}
      <section className="relative z-10 border-t border-primary/10 bg-primary py-20 text-primary-foreground md:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{ background: "radial-gradient(60% 50% at 10% 100%, var(--color-gold) 0%, transparent 70%)" }}
        />
        <span aria-hidden className="absolute left-6 top-6 h-4 w-4 border-l border-t border-gold/40 lg:left-12 lg:top-12" />
        <span aria-hidden className="absolute bottom-6 right-6 h-4 w-4 border-b border-r border-gold/40 lg:bottom-12 lg:right-12" />

        <div className="container relative z-10 max-w-5xl">
          <Reveal>
            <div className="flex items-center gap-5">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">·</span>
              <div className="h-px w-8 bg-gold/40" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary-foreground/70">
                Prossimi step
              </span>
            </div>
            <h2 className="mt-6 text-balance text-[clamp(1.85rem,4.6vw,3.4rem)] font-500 leading-[1.06] tracking-[-0.02em]">
              Cosa succede dopo aver <span className="text-gold">prenotato.</span>
            </h2>
            <div className="mt-6 h-px w-24 bg-gold" />
          </Reveal>

          <ol className="mt-12 grid gap-px overflow-hidden border border-primary-foreground/15 bg-primary-foreground/15 sm:grid-cols-2 md:mt-16 md:grid-cols-4">
            {[
              { icon: MessageSquare, title: "Email di conferma", body: "Ricevi data, ora e link Zoom. Più un mini-briefing di 3 minuti da compilare." },
              { icon: Clock, title: "Call di 30 minuti", body: "L’Avv. Accarino analizza il tuo caso e risponde a 2–3 domande concrete." },
              { icon: FileSignature, title: "Proposta su misura", body: "Se ci sono margini, ricevi proposta scritta con piano, costi e timeline." },
              { icon: Sparkles, title: "Avvio in 7 giorni", body: "Audit degli atti, prima istanza o ricorso depositato nei termini di legge." },
            ].map(({ icon: Icon, title, body }, i) => (
              <Reveal as="li" key={title} delay={i * 120} className="relative bg-primary p-7 group transition-colors hover:bg-primary/70 md:p-9">
                <div className="flex items-center gap-4">
                  <span className="font-serif text-2xl text-gold tabular-nums">0{i + 1}</span>
                  <div className="h-px w-6 bg-gold/40" />
                  <Icon className="h-4 w-4 text-gold transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 text-lg font-500 tracking-[-0.01em] text-primary-foreground md:mt-7">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-primary-foreground/70">{body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 border-t border-primary/10 py-20 md:py-28">
        <div className="container max-w-3xl">
          <Reveal>
            <div className="flex items-center gap-5">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">·</span>
              <div className="h-px w-8 bg-gold/40" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                FAQ
              </span>
            </div>
            <h2 className="mt-6 text-balance text-[clamp(1.85rem,4.6vw,3.4rem)] font-500 leading-[1.06] tracking-[-0.02em] text-primary">
              Tutto quello che vuoi sapere <span className="text-gold-deep">prima della call.</span>
            </h2>
            <div className="mt-6 h-px w-24 bg-gold" />
          </Reveal>
          <Reveal delay={120}>
            <Accordion type="single" collapsible className="mt-12 border-t border-primary/10 md:mt-16">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b border-primary/10">
                  <AccordionTrigger className="py-6 text-left text-lg font-500 tracking-[-0.01em] text-primary hover:text-gold hover:no-underline md:py-7">
                    <span className="flex items-baseline gap-4">
                      <span className="font-serif text-[10px] uppercase tracking-[0.3em] text-gold/70">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {f.q}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-base text-muted-foreground md:pb-7">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative z-10 border-t border-primary/10 bg-primary py-20 text-primary-foreground md:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{ background: "radial-gradient(50% 60% at 50% 0%, var(--color-gold) 0%, transparent 70%)" }}
        />
        <div className="container relative z-10 max-w-4xl text-center">
          <Reveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
              Pronto a iniziare?
            </span>
            <h2 className="mt-5 text-balance text-[clamp(1.85rem,4.6vw,3.4rem)] font-500 leading-[1.06] tracking-[-0.02em]">
              Prenota ora la tua <span className="text-gold">consulenza preventiva.</span>
            </h2>
            <div className="mx-auto mt-6 h-px w-24 bg-gold" />
            <p className="mt-6 text-lg text-primary-foreground/70">
              30 minuti con l’Avv. Accarino. Senza impegno. Valore concreto garantito.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <Button asChild variant="cta" size="xl" className="group mt-10">
              <Link to="/quiz">
                Verifica il tuo caso
                <ArrowRight className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
