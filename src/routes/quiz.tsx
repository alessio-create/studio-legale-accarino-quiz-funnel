import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import Logo from "@/components/funnel/Logo";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Verifica il tuo caso — Studio Legale Accarino" },
      { name: "description", content: "90 secondi per capire se il tuo caso ha margini reali in materia di esproprio, edilizia o ricorso al TAR." },
    ],
  }),
  component: Quiz,
});

interface Question {
  id: string;
  eyebrow: string;
  title: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: "role",
    eyebrow: "Iniziamo dalle basi",
    title: "Qual è la tua situazione?",
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
    options: [
      "Sotto i 50.000 €",
      "50.000 € – 250.000 €",
      "250.000 € – 1.000.000 €",
      "Oltre 1.000.000 €",
    ],
  },
];

function Quiz() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const total = questions.length;
  const current = questions[step];
  const progress = ((step + 1) / total) * 100;

  const select = (option: string) => {
    const next = { ...answers, [current.id]: option };
    setAnswers(next);
    setTimeout(() => {
      if (step < total - 1) setStep((s) => s + 1);
      else {
        try { sessionStorage.setItem("quiz_answers", JSON.stringify(next)); } catch {}
        navigate({ to: "/optin" });
      }
    }, 300);
  };

  const back = () => { if (step > 0) setStep((s) => s - 1); };

  return (
    <div className="flex min-h-screen flex-col bg-soft grain">
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="container flex h-20 items-center justify-center md:h-28">
          <Logo />
        </div>
        <div className="relative h-px w-full bg-border/60">
          <div
            className="absolute inset-y-0 left-0 bg-gold transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center section-y">
        <div key={current.id} className="container max-w-2xl animate-fade-up">
          <div className="flex items-center gap-5">
            <span className="chapter-num">{String(step + 1).padStart(2, "0")}</span>
            <span className="eyebrow">{current.eyebrow}</span>
          </div>

          <h1 className="mt-6 text-display-sm text-primary text-balance">{current.title}</h1>
          <div className="rule-gold mt-8 w-24 origin-left animate-draw-line" />

          <div className="mt-10 space-y-3.5">
            {current.options.map((option, i) => {
              const selected = answers[current.id] === option;
              return (
                <button
                  key={option}
                  onClick={() => select(option)}
                  style={{ animation: "fade-up 0.55s cubic-bezier(0.16,1,0.3,1) both", animationDelay: `${140 + i * 70}ms` }}
                  className={`group relative flex w-full items-center justify-between gap-4 overflow-hidden border bg-card p-5 text-left lift-luxe sm:p-6 md:p-7 ${
                    selected ? "border-gold shadow-amber" : "border-border hover:border-gold/60"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`absolute inset-y-0 left-0 w-[3px] bg-gold transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
                      selected ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100"
                    }`}
                  />
                  <span className="text-title text-primary">{option}</span>
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center border transition-luxe ${
                      selected ? "border-gold bg-amber text-gold-foreground" : "border-border text-muted-foreground group-hover:border-gold group-hover:text-gold"
                    }`}
                  >
                    {selected ? <Check className="h-4 w-4" strokeWidth={2.5} /> : <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-14 flex items-center justify-between">
            <Button variant="ghost" onClick={back} disabled={step === 0} className="text-muted-foreground hover:text-gold">
              <ArrowLeft className="h-4 w-4" /> Indietro
            </Button>
            <p className="flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.28em] text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-gold" />
              Risposte riservate
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
