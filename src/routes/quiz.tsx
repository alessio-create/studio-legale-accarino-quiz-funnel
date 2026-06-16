import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import monogramGold from "@/assets/monogram-gold.svg";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Verifica il tuo caso · Studio Legale Accarino" },
      { name: "description", content: "90 secondi per capire se il tuo caso ha margini reali in materia di esproprio, edilizia o ricorso al TAR." },
      { name: "robots", content: "noindex,follow" },
    ],
  }),
  component: Quiz,
});

type VerticalKey = "espropri" | "demolizione" | "tar" | "generic";

interface Question {
  id: string;
  eyebrow: string;
  title: string;
  watermark: string;
  options: string[];
}

const verticalToPain: Record<Exclude<VerticalKey, "generic">, string> = {
  espropri: "Esproprio o indennità da rinegoziare",
  demolizione: "Ordinanza di demolizione / abuso edilizio",
  tar: "Diniego permessi / silenzio della PA",
};

const verticalMeta: Record<VerticalKey, { chapter: string; mark: string; watermarkLetter: string }> = {
  espropri:    { chapter: "Verifica espropri",   mark: "Studio Legale Accarino · Espropri",   watermarkLetter: "E" },
  demolizione: { chapter: "Verifica edilizia",   mark: "Studio Legale Accarino · Edilizia",   watermarkLetter: "D" },
  tar:         { chapter: "Verifica ricorso TAR",mark: "Studio Legale Accarino · TAR",        watermarkLetter: "T" },
  generic:     { chapter: "Verifica del caso",   mark: "Studio Legale Accarino",              watermarkLetter: "A" },
};

// Generic (no vertical) — original questions
const genericQuestions: Question[] = [
  {
    id: "role",
    eyebrow: "Iniziamo dalle basi",
    title: "Qual è la tua situazione?",
    watermark: "I",
    options: [
      "Proprietario terriero / azienda agricola",
      "Proprietario di casa / piccolo costruttore",
      "PMI o impresa di costruzioni",
      "Altro / sono un consulente",
    ],
  },
  {
    id: "pain",
    eyebrow: "Il tuo caso",
    title: "Qual è il problema che stai affrontando?",
    watermark: "II",
    options: [
      "Esproprio o indennità da rinegoziare",
      "Ordinanza di demolizione / abuso edilizio",
      "Diniego permessi / silenzio della PA",
      "Vincolo paesaggistico o ambientale",
      "Più di uno dei precedenti",
    ],
  },
  {
    id: "urgency",
    eyebrow: "Tempistiche",
    title: "A che punto sei della procedura?",
    watermark: "III",
    options: [
      "Ho ricevuto un atto negli ultimi 30 giorni",
      "Procedimento in corso da mesi",
      "Sto valutando se agire",
      "Voglio una valutazione preventiva",
    ],
  },
  {
    id: "value",
    eyebrow: "Posta in gioco",
    title: "Qual è il valore approssimativo del bene o del progetto?",
    watermark: "IV",
    options: [
      "Sotto i 50.000 €",
      "50.000 € – 250.000 €",
      "250.000 € – 1.000.000 €",
      "Oltre 1.000.000 €",
    ],
  },
];

// Per-vertical questions — same structure (role / urgency / value), tailored answers.
// The "pain" question is pre-filled from the vertical and skipped.
const verticalQuestions: Record<Exclude<VerticalKey, "generic">, Question[]> = {
  espropri: [
    {
      id: "role",
      eyebrow: "Il tuo profilo",
      title: "L'offerta che hai ricevuto è davvero il valore del tuo bene?",
      watermark: "I",
      options: [
        "Proprietario terriero o azienda agricola",
        "Proprietario di immobile / fabbricato",
        "Impresa con bene strumentale espropriato",
        "Erede o comproprietario coinvolto",
      ],
    },
    {
      id: "urgency",
      eyebrow: "Tempistiche",
      title: "A che punto sei della procedura espropriativa?",
      watermark: "II",
      options: [
        "Ho ricevuto un'offerta di indennità negli ultimi 30 giorni",
        "Decreto di esproprio già emesso",
        "Occupazione d'urgenza in corso",
        "Sto valutando come muovermi prima dell'atto",
      ],
    },
    {
      id: "value",
      eyebrow: "Posta in gioco",
      title: "Qual è il valore stimato del bene espropriato?",
      watermark: "III",
      options: [
        "Sotto i 50.000 €",
        "50.000 € – 250.000 €",
        "250.000 € – 1.000.000 €",
        "Oltre 1.000.000 €",
      ],
    },
  ],
  demolizione: [
    {
      id: "role",
      eyebrow: "Il tuo profilo",
      title: "Chi ha ricevuto l'ordinanza?",
      watermark: "I",
      options: [
        "Proprietario dell'immobile",
        "Costruttore o impresa edile",
        "Acquirente che ha ereditato l'abuso",
        "Comproprietario o erede",
      ],
    },
    {
      id: "urgency",
      eyebrow: "Tempistiche",
      title: "Quando ti è stata notificata l'ordinanza?",
      watermark: "II",
      options: [
        "Negli ultimi 30 giorni",
        "Tra 30 e 90 giorni fa",
        "Più di 90 giorni fa",
        "Non è ancora arrivata, ma me l'aspetto",
      ],
    },
    {
      id: "value",
      eyebrow: "Posta in gioco",
      title: "Qual è il valore dell'immobile a rischio?",
      watermark: "III",
      options: [
        "Sotto i 100.000 €",
        "100.000 € – 300.000 €",
        "300.000 € – 1.000.000 €",
        "Oltre 1.000.000 €",
      ],
    },
  ],
  tar: [
    {
      id: "role",
      eyebrow: "Il tuo profilo",
      title: "In quale veste vuoi ricorrere?",
      watermark: "I",
      options: [
        "Privato cittadino / proprietario",
        "Impresa o società che ha subito un diniego",
        "Professionista che assiste il committente",
        "Ente o associazione",
      ],
    },
    {
      id: "urgency",
      eyebrow: "Tempistiche",
      title: "Quando è stato adottato l'atto della PA?",
      watermark: "II",
      options: [
        "Meno di 30 giorni fa",
        "Tra 30 e 60 giorni fa (termine in scadenza)",
        "Silenzio della PA che si protrae",
        "Sto valutando un'azione preventiva",
      ],
    },
    {
      id: "value",
      eyebrow: "Posta in gioco",
      title: "Qual è il valore economico del progetto bloccato?",
      watermark: "III",
      options: [
        "Sotto i 100.000 €",
        "100.000 € – 500.000 €",
        "500.000 € – 2.000.000 €",
        "Oltre 2.000.000 €",
      ],
    },
  ],
};

function getInitialVertical(): VerticalKey {
  if (typeof window === "undefined") return "generic";
  const v = new URLSearchParams(window.location.search).get("vertical");
  if (v && v in verticalToPain) return v as VerticalKey;
  return "generic";
}

function Quiz() {
  const navigate = useNavigate();
  const [vertical] = useState<VerticalKey>(getInitialVertical);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>(() =>
    vertical !== "generic" ? { pain: verticalToPain[vertical] } : {},
  );



  const activeQuestions = useMemo<Question[]>(
    () => (vertical === "generic" ? genericQuestions : verticalQuestions[vertical]),
    [vertical],
  );
  const meta = verticalMeta[vertical];

  const total = activeQuestions.length;
  const current = activeQuestions[Math.min(step, total - 1)];
  const progress = ((step + 1) / total) * 100;

  const select = (option: string) => {
    const next = { ...answers, [current.id]: option };
    setAnswers(next);
    setTimeout(() => {
      if (step < total - 1) setStep((s) => s + 1);
      else {
        try { sessionStorage.setItem("quiz_answers", JSON.stringify(next)); } catch {}
        try { sessionStorage.setItem("quiz_vertical", vertical); } catch {}
        navigate({ to: "/optin" });
      }
    }, 300);
  };

  const back = () => { if (step > 0) setStep((s) => s - 1); };

  return (
    <div className="relative isolate flex min-h-screen flex-col overflow-hidden bg-background text-foreground">
      {/* Warm ambient gold glow — top-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
        style={{ background: "radial-gradient(60% 50% at 90% 0%, var(--color-gold) 0%, transparent 70%)" }}
      />
      <div className="absolute inset-0 grain opacity-40" />

      {/* Corner brackets */}
      
      

      {/* Header with progress hairline */}
      <header className="relative z-10 ">
        <div className="container flex h-20 items-center justify-between md:h-24">
          <div className="flex items-center">
            <img
              src={monogramGold}
              alt="Studio Legale Accarino"
              className="h-12 w-auto md:h-16"
            />
          </div>
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
            {String(step + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
        <div className="relative h-1 w-full bg-primary/[0.06] rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gold transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 flex flex-1 items-center justify-center py-16 sm:py-20 lg:py-24">
        <div className="container">
          <div className="grid grid-cols-12 items-start gap-6 lg:gap-8">
            {/* Main content */}
            <div key={current.id} className="col-span-12 mx-auto max-w-3xl animate-fade-up lg:col-start-2 lg:col-span-10">
              <div className="flex items-center gap-5">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
                  {String(step + 1).padStart(2, "0")}
                </span>

                <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  {current.eyebrow}
                </span>
              </div>

              <div className="relative mt-6">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -left-6 -top-16 select-none font-serif text-[180px] leading-none text-primary/[0.04] lg:-left-12 lg:text-[220px]"
                >
                  {current.watermark}
                </span>
                <h1 className="relative text-balance text-[clamp(1.25rem,3.2vw,2.25rem)] font-500 leading-[1.15] tracking-[-0.02em] text-primary">
                  {current.title}
                </h1>
              </div>
              

              <div className="mt-10 space-y-3">
                {current.options.map((option, i) => {
                  const selected = answers[current.id] === option;
                  return (
                    <button
                      key={option}
                      onClick={() => select(option)}
                      style={{ animation: "fade-up 0.55s cubic-bezier(0.16,1,0.3,1) both", animationDelay: `${140 + i * 70}ms` }}
                      className={`group relative flex w-full items-center justify-between gap-4 overflow-hidden border bg-primary/[0.03] p-5 text-left backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-primary/[0.06] sm:p-6 ${
                        selected
                          ? "border-gold shadow-[0_0_0_1px_var(--color-gold)]"
                          : "border-primary/15 hover:border-gold/60"
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`absolute inset-y-0 left-0 w-[2px] bg-gold transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
                          selected ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100"
                        }`}
                      />
                      <div className="flex items-center gap-4">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-primary/20 bg-background/50 text-[10px] font-bold tracking-[0.2em] text-gold/80 transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-primary">
                          {String.fromCharCode(65 + i)}
                        </div>
                        <span className="text-sm text-foreground sm:text-base">{option}</span>
                      </div>
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center border transition-all duration-500 ${
                          selected
                            ? "border-gold bg-gold text-primary"
                            : "border-primary/20 text-muted-foreground group-hover:border-gold group-hover:text-gold"
                        }`}
                      >
                        {selected ? (
                          <Check className="h-4 w-4" strokeWidth={2.5} />
                        ) : (
                          <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-12 flex items-center justify-between  pt-6">
                <Button
                  variant="ghost"
                  onClick={back}
                  disabled={step === 0}
                  className="text-muted-foreground hover:bg-transparent hover:text-gold disabled:opacity-30"
                >
                  <ArrowLeft className="h-4 w-4" /> Indietro
                </Button>
                <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  <ShieldCheck className="h-3.5 w-3.5 text-gold" />
                  Risposte riservate
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
