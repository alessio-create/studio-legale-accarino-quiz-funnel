import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useState } from "react";
import { getCalSlots, createCalBooking, type CalSlotsByDate } from "@/lib/cal.functions";
import monogramGold from "@/assets/monogram-gold.svg";
import Footer from "@/components/funnel/Footer";
import Reveal from "@/components/funnel/Reveal";
import { Button } from "@/components/ui/button";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, Check, ChevronLeft, ChevronRight } from "lucide-react";
import francescoPhoto from "@/assets/team-francesco-accarino.png";
import paoloPhoto from "@/assets/team-paolo-accarino.png";
import danielePhoto from "@/assets/team-daniele-accarino.png";
import antoniaPhoto from "@/assets/team-antonia-bacco.png";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Prenota la consulenza · Studio Legale Accarino" },
      { name: "description", content: "Scegli data e ora per la tua consulenza preventiva con lo Studio Legale Accarino." },
      { name: "robots", content: "noindex,follow" },
    ],
  }),
  component: Booking,
});

const months = ["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"];
const weekdays = ["L","M","M","G","V","S","D"];

const pad = (n: number) => String(n).padStart(2, "0");
const dateKey = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`;
const formatSlotTime = (iso: string) => {
  try {
    return new Intl.DateTimeFormat("it-IT", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Rome",
    }).format(new Date(iso));
  } catch {
    return iso.slice(11, 16);
  }
};

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
  { q: "Cosa succede dopo aver prenotato la consulenza?", a: "Ricevi un’email di conferma con il link Zoom e un mini-briefing di 3 minuti da compilare. Lo Studio Legale Accarino arriva alla call con risposte già pronte sulla tua situazione." },
  { q: "Quanto dura la consulenza preventiva?", a: "30 minuti netti. Niente sales pitch: analisi del tuo caso, risposta a 2–3 domande concrete e, se ci sono margini reali, proposta di collaborazione con tempi e costi chiari." },
  { q: "Cosa devo preparare?", a: "Idealmente: copia dell’atto ricevuto (decreto di esproprio, ordinanza, diniego), eventuali planimetrie o titoli edilizi. Se non li hai pronti, parliamo lo stesso." },
  { q: "La consulenza è davvero senza impegno?", a: "Sì. È un’analisi del tuo caso senza alcun obbligo di proseguire. Esci con una valutazione tecnica chiara anche se non lavoreremo insieme." },
];

function Booking() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null); // ISO start
  const [confirmed, setConfirmed] = useState(false);
  const [slotsByDate, setSlotsByDate] = useState<CalSlotsByDate>({});
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [booking, setBooking] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  const fetchSlots = useServerFn(getCalSlots);
  const bookSlot = useServerFn(createCalBooking);

  useEffect(() => {
    let cancelled = false;
    setLoadingSlots(true);
    const start = new Date(viewYear, viewMonth, 1).toISOString().slice(0, 10);
    const endDate = new Date(viewYear, viewMonth + 1, 0);
    const end = endDate.toISOString().slice(0, 10);
    fetchSlots({ data: { start, end } })
      .then((data) => { if (!cancelled) setSlotsByDate(data ?? {}); })
      .catch((err) => { console.error("Cal slots error", err); if (!cancelled) setSlotsByDate({}); })
      .finally(() => { if (!cancelled) setLoadingSlots(false); });
    return () => { cancelled = true; };
  }, [viewYear, viewMonth, fetchSlots]);

  const cells = generateMonthDays(viewYear, viewMonth);
  const isPast = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return d < t;
  };
  const hasSlots = (day: number) => {
    const k = dateKey(viewYear, viewMonth, day);
    return Array.isArray(slotsByDate[k]) && slotsByDate[k].length > 0;
  };

  const daySlots = useMemo(() => {
    if (selectedDay == null) return [];
    return slotsByDate[dateKey(viewYear, viewMonth, selectedDay)] ?? [];
  }, [selectedDay, slotsByDate, viewYear, viewMonth]);

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

  const handleConfirm = async () => {
    if (!selectedSlot || booking) return;
    setBookingError(null);
    setBooking(true);
    let contact: { name?: string; email?: string; phone?: string; location?: string } = {};
    try {
      const raw = sessionStorage.getItem("contact");
      if (raw) contact = JSON.parse(raw);
    } catch {}
    if (!contact.name || !contact.email) {
      setBookingError("Dati di contatto mancanti. Compila prima il form.");
      setBooking(false);
      return;
    }
    try {
      await bookSlot({
        data: {
          start: selectedSlot,
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          notes: contact.location ? `Località: ${contact.location}` : undefined,
        },
      });
      setConfirmed(true);
    } catch (err) {
      console.error("Cal booking failed", err);
      setBookingError("Non siamo riusciti a confermare lo slot. Riprova o scegli un altro orario.");
    } finally {
      setBooking(false);
    }
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

      {/* Header with progress hairline */}
      <header className="relative z-10">
        <div className="container flex h-20 items-center justify-between md:h-24">
          <div className="flex items-center gap-4">
            <img src={monogramGold} alt="Studio Legale Accarino" className="h-9 w-auto md:h-10" />
            <span className="hidden text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground sm:inline">
              Prenotazione
            </span>
          </div>
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
            06 / 06
          </span>
        </div>
        <div className="relative h-1 w-full bg-primary/[0.06] rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gold transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] rounded-full"
            style={{ width: "100%" }}
          />
        </div>
      </header>


      {/* CALENDAR */}
      <section id="calendar" className="relative z-10">
        <div className="container py-16 sm:py-20 lg:py-24">
          <div className="grid grid-cols-12 items-start gap-6 lg:gap-8">
            <div className="col-span-12 mx-auto max-w-5xl animate-fade-up lg:col-start-2 lg:col-span-10">

              <div className="flex items-center gap-5">
                <span className="font-serif text-[11px] uppercase tracking-[0.3em] text-gold/80">VIII</span>

                <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  Calendario
                </span>
              </div>

              <h1 className="mt-6 max-w-3xl text-balance text-[clamp(1.85rem,4.6vw,3.4rem)] font-500 leading-[1.06] tracking-[-0.02em] text-primary">
                Scegli il momento per la tua call con
                {" "}<span className="text-gold-deep">lo Studio Legale Accarino.</span>
              </h1>
              

              <Reveal delay={120} className="relative mt-12 bg-primary/[0.02] backdrop-blur-sm md:mt-14">
                
                

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
                    
                    <p className="mt-6 text-lg text-primary">
                      {selectedDay} {months[viewMonth]} {viewYear} · {selectedSlot ? formatSlotTime(selectedSlot) : ""}
                    </p>
                    <p className="mt-5 text-sm text-muted-foreground">
                      Riceverai a breve un’email di conferma con il link e il mini-briefing di preparazione.
                    </p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-[1.4fr_1fr]">
                    <div className=" p-6 sm:p-7 md:border-b-0 md:border-r md:p-9">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-gold">·</span>
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
                          const past = isPast(day);
                          const available = !past && hasSlots(day);
                          const disabled = !available;
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
                      {loadingSlots && (
                        <p className="mt-4 text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                          Caricamento disponibilità…
                        </p>
                      )}
                    </div>

                    <div className="p-6 sm:p-7 md:p-9">
                      <div className="flex items-center gap-3">
                        <span className="text-gold">·</span>
                        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                          Orari disponibili
                        </span>
                      </div>
                      {selectedDay ? (
                        <div className="animate-fade-in">
                          <p className="mt-5 text-xl font-500 text-primary tracking-[-0.015em]">
                            {selectedDay} {months[viewMonth]}
                          </p>

                          <div className="mt-6 grid grid-cols-2 gap-2.5">
                            {daySlots.length === 0 && !loadingSlots && (
                              <p className="col-span-2 text-sm text-muted-foreground">
                                Nessuno slot disponibile in questo giorno.
                              </p>
                            )}
                            {daySlots.map((slot, idx) => {
                              const iso = slot.start;
                              const label = formatSlotTime(iso);
                              const isSelected = selectedSlot === iso;
                              return (
                              <button
                                key={iso}
                                onClick={() => setSelectedSlot(iso)}
                                style={{ animationDelay: `${idx * 50}ms` }}
                                className={`group relative overflow-hidden border px-3 py-3.5 text-base font-medium tabular-nums transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] animate-fade-in ${
                                  isSelected
                                    ? "border-gold bg-gold/10 text-gold-deep shadow-[0_0_0_1px_var(--color-gold)]"
                                    : "border-primary/15 bg-primary/[0.02] text-primary hover:border-gold/60 hover:text-gold-deep"
                                }`}
                              >
                                <span
                                  aria-hidden
                                  className={`absolute inset-y-0 left-0 w-[2px] bg-gold transition-transform duration-500 origin-center ${
                                    isSelected ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100"
                                  }`}
                                />
                                {label}
                              </button>
                            );})}
                          </div>
                          {selectedSlot && (
                            <Button onClick={handleConfirm} disabled={booking} variant="cta" size="lg" className="group mt-7 w-full animate-scale-in">
                              {booking ? "Conferma in corso…" : `Conferma ${formatSlotTime(selectedSlot)}`}
                              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                            </Button>
                          )}
                          {bookingError && (
                            <p className="mt-4 text-sm text-destructive">{bookingError}</p>
                          )}
                        </div>
                      ) : (
                        <div className="mt-14 flex flex-col items-center justify-center text-center">
                          <div className="flex items-center gap-3">

                            <span className="text-gold">·</span>

                          </div>
                          <p className="mt-5 text-sm text-muted-foreground">
                            Seleziona un giorno per vedere gli orari disponibili.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </Reveal>

              <p className="mt-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                <span className="text-gold">·</span>

                Consulenza preventiva · 30 minuti · senza impegno
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* WHO */}
      <section className="relative z-10  py-20 md:py-28">
        <div className="container max-w-6xl">
          <div className="grid gap-10 md:gap-14 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-20">
            <Reveal className="relative mx-auto w-full max-w-sm lg:max-w-none">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "Francesco Accarino", role: "Founding Partner", photo: francescoPhoto },
                  { name: "Paolo Accarino", role: "Senior Partner", photo: paoloPhoto },
                  { name: "Daniele Accarino", role: "Partner", photo: danielePhoto },
                  { name: "Antonia Bacco", role: "Avvocato", photo: antoniaPhoto },
                ].map((member) => (
                  <div key={member.name} className="group relative overflow-hidden transition-all duration-500">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent p-3 pt-10">
                      <p className="text-xs font-500 text-primary-foreground">{member.name}</p>
                      <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="flex items-center gap-5">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">·</span>

                <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  Chi ti risponderà
                </span>
              </div>
              <h2 className="mt-6 text-balance text-[clamp(1.85rem,4.6vw,3.4rem)] font-500 leading-[1.06] tracking-[-0.02em] text-primary">
                Studio Legale{"\u00a0"}Accarino.
              </h2>
              <p className="mt-6 text-lg leading-[1.55] text-muted-foreground">
                Quattro professionisti, un’unica struttura. Dal 1975 lo Studio Legale Accarino
                accompagna privati, imprese e Pubbliche Amministrazioni nel diritto amministrativo,
                con particolare focus su espropri, urbanistica e appalti.
              </p>
              <p className="mt-5 text-base text-muted-foreground">
                Quando prenoti, parli direttamente con noi. Niente filtri, niente
                assistenti generici, niente “le farò sapere”.
              </p>
              <div className="mt-10 grid grid-cols-3 gap-6  pt-8 md:mt-12 md:pt-10">
                {[
                  { v: "50+", l: "Anni di esperienza" },
                  { v: "600+", l: "Mandati seguiti" },
                  { v: "4", l: "Professionisti" },
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
      <section className="relative z-10 bg-primary py-24 text-primary-foreground md:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.10]"
          style={{ background: "radial-gradient(60% 50% at 10% 100%, var(--color-gold) 0%, transparent 70%)" }}
        />

        <div className="container relative z-10 max-w-7xl">
          <Reveal>
            <div className="mb-16 md:mb-20">
              <span className="mb-6 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
                <span className="h-1 w-1 rounded-full bg-gold" />
                Prossimi step
              </span>
              <h2 className="max-w-3xl text-balance text-[clamp(2rem,5vw,3.75rem)] font-300 leading-[1.05] tracking-[-0.02em] text-primary-foreground">
                Cosa succede dopo aver{" "}
                <span className="italic-accent text-gold">prenotato.</span>
              </h2>
            </div>
          </Reveal>

          <ol className="grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-12">
            {[
              { num: "01", when: "Subito", title: "Email di conferma", body: "Ricevi data, ora e link Zoom. Più un mini-briefing di 3 minuti da compilare." },
              { num: "02", when: "Il giorno della call", title: "Call di 30 minuti", body: "Lo Studio Legale Accarino analizza il tuo caso e risponde a 2–3 domande concrete." },
              { num: "03", when: "Entro 48 ore", title: "Proposta su misura", body: "Se ci sono margini, ricevi proposta scritta con piano, costi e timeline." },
              { num: "04", when: "Entro 7 giorni", title: "Avvio", body: "Audit degli atti, prima istanza o ricorso depositato nei termini di legge." },
            ].map(({ num, when, title, body }, i) => (
              <Reveal as="li" key={num} delay={i * 120} className="group relative flex flex-col">
                <div className="mb-7 flex items-baseline justify-between">
                  <span className="font-300 text-5xl tracking-[-0.02em] text-gold opacity-90 tabular-nums md:text-6xl">
                    {num}
                  </span>
                  <span className="text-[9px] font-semibold uppercase tracking-[0.28em] text-primary-foreground/40">
                    {when}
                  </span>
                </div>
                <div className="relative mb-7 h-px w-full overflow-hidden bg-primary-foreground/10">
                  <span className="absolute inset-y-0 left-0 w-0 bg-gold transition-all duration-700 ease-out group-hover:w-full" />
                </div>
                <h3 className="text-lg font-500 tracking-[-0.01em] text-primary-foreground md:text-xl">
                  {title}
                </h3>
                <p className="mt-4 text-sm leading-[1.65] font-300 text-primary-foreground/60">
                  {body}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>


      {/* FAQ */}
      <section className="relative z-10  bg-soft py-20 md:py-28">
        <div className="container max-w-3xl">
          <Reveal className="text-center">
            <span className="eyebrow-center">FAQ</span>
            <h2 className="mt-6 text-balance text-display-sm text-primary">
              Tutto quello che vuoi sapere <span className="text-gold-deep">prima della call.</span>
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

      {/* FINAL CTA */}
      <section className="relative z-10  bg-primary py-20 text-primary-foreground md:py-28">
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
              consulenza preventiva.
            </h2>
            <span className="text-gold">Prenota ora la tua consulenza preventiva.</span>
            
            <p className="mt-6 text-lg text-primary-foreground/70">
              30 minuti con lo Studio Legale Accarino. Senza impegno. Valore concreto garantito.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <Button asChild variant="cta" size="xl" className="group mt-10">
              <a href="#calendar">
                Scegli data e ora
                <ArrowRight className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-1" />
              </a>
            </Button>
          </Reveal>

        </div>
      </section>

      <Footer />
    </div>
  );
}
