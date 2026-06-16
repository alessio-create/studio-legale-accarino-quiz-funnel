import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Clock, FileWarning, Landmark } from "lucide-react";
import VerticalLanding from "@/components/funnel/VerticalLanding";
import heroImg from "@/assets/practice-urbanistica.jpg";
import solutionImg from "@/assets/office.jpg";

export const Route = createFileRoute("/ordinanza-demolizione")({
  head: () => ({
    meta: [
      { title: "Ordinanza di demolizione: hai 60 giorni | Accarino" },
      {
        name: "description",
        content:
          "L'80% delle ordinanze di demolizione contiene vizi annullabili. Verifica in 90 secondi se la tua è impugnabile, prima che scadano i 60 giorni.",
      },
      { property: "og:title", content: "Ordinanza di demolizione? Verifica in 90 secondi" },
      {
        property: "og:description",
        content: "Hai 60 giorni per impugnare. Dopo, l'immobile passa al Comune.",
      },
      { property: "og:url", content: "/ordinanza-demolizione" },
    ],
    links: [{ rel: "canonical", href: "/ordinanza-demolizione" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Impugnazione ordinanza di demolizione",
          provider: { "@type": "LegalService", name: "Studio Legale Accarino" },
          areaServed: "IT",
          url: "/ordinanza-demolizione",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: config.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: () => <VerticalLanding {...config} />,
});

const config = {
  vertical: "demolizione" as const,
  eyebrow: "EMERGENZA EDILIZIA",
  heroImage: heroImg,
  heroTint: "#3d1f1a",
  heroImageAlt: "Edificio oggetto di contestazione urbanistica",
  solutionImage: solutionImg,
  solutionImageAlt: "Studio legale al lavoro su pratiche edilizie",

  heroH1Plain: "Ti è arrivata un’ordinanza di demolizione?",
  heroH1Accent: "L’80% di queste ordinanze è annullabile.",
  heroSub:
    "Hai 60 giorni. Dopo, l’ordinanza diventa esecutiva e il Comune può acquisire l’immobile gratuitamente. Scopri in 90 secondi se la tua è impugnabile, e cosa fare prima che scada il termine.",

  heroStats: [
    { to: 60, suffix: " gg", label: "Per impugnare al TAR", caption: "Termine perentorio" },
    { to: 80, suffix: "%", label: "Ordinanze con vizi annullabili", caption: "Su nostra esperienza diretta" },
    { to: 4, suffix: " mesi", label: "Tempo medio sospensiva", caption: "Dal deposito del ricorso" },
    { to: 120, suffix: "+", label: "Casi gestiti", caption: "Su ordinanze e abusi edilizi" },
  ],

  solutionH1Plain: "Ogni ordinanza ha un punto debole.",
  solutionH1Accent: "Il nostro lavoro è trovarlo per primi.",
  solutionItems: [
    { title: "Ti diciamo subito se la tua è impugnabile", desc: "Leggiamo l’atto in 24 ore e ti diamo una risposta chiara: vizi presenti, margini di ricorso, costi. Senza impegno." },
    { title: "Ricorso al TAR + sospensiva immediata", desc: "Blocchiamo l’esecutività dell’ordinanza nei primi 30–60 giorni. Demolizione e acquisizione comunale messe in pausa." },
    { title: "Sanatoria o accertamento di conformità", desc: "Quando l’opera è doppia-conforme, la regolarizzazione chiude la pratica una volta per tutte. Spesso è la via più rapida." },
    { title: "Salviamo l’immobile dall’acquisizione gratuita", desc: "Dopo 90 giorni di inadempienza, l’immobile passa al Comune senza un euro di indennizzo. Agire prima è decisivo." },
  ],

  problemH1Plain: "Un’ordinanza ignorata",
  problemH1Accent: "è una casa persa per sempre.",
  problemLead:
    "Sessanta giorni sembrano tanti finché non passano. Poi l’ordinanza diventa esecutiva. Dopo altri 90, l’immobile e tutta l’area di sedime entrano gratis nel patrimonio del Comune. Eppure quasi l’80% delle ordinanze contiene vizi formali o sostanziali che un ricorso fatto bene riesce ad annullare.",
  problemQuote: {
    text: "Pensavamo di non avere scampo. Quattro mesi dopo, l’ordinanza era annullata al TAR.",
    attr: "Cliente · Costiera Amalfitana",
  },
  problems: [
    { icon: AlertTriangle, title: "Stai pensando “tanto è solo un avviso, vediamo”", body: "Sbagliato. Il conteggio dei 60 giorni parte dalla notifica, non da quando decidi di prenderla sul serio. Una settimana persa è una settimana in meno per costruire la difesa." },
    { icon: FileWarning, title: "L’ordinanza è motivata in modo generico", body: "Motivazione copia-incolla, mancata comunicazione di avvio, classificazione errata dell’abuso: sono i vizi più frequenti e più facilmente opponibili. Il giudice li conosce bene." },
    { icon: Clock, title: "La sanatoria è possibile, ma non per sempre", body: "L’accertamento di conformità (art. 36 D.P.R. 380/2001) è uno strumento potente, ma va attivato prima della demolizione. Dopo, l’occasione è chiusa." },
    { icon: Landmark, title: "Acquisizione gratuita al patrimonio del Comune", body: "Dopo 90 giorni di inadempienza, il bene e l’area circostante (fino a 10 volte la superficie dell’abuso) passano al Comune. Senza un euro per te." },
  ],

  processH1Plain: "Dalla notifica al ricorso depositato",
  processH1Accent: "in dieci giorni.",
  processIntro:
    "I primi 10 giorni dopo la notifica decidono l’esito. Analisi tecnica, scelta della strategia, deposito. Lavoriamo in parallelo con geometri e ingegneri di fiducia.",
  process: [
    { title: "Analisi gratuita dell’ordinanza", desc: "Ce la mandi, la leggiamo, in 24 ore ti diciamo se ha senso impugnarla. Senza impegno e senza giri di parole." },
    { title: "Scelta della strategia", desc: "Ricorso al TAR, istanza di sanatoria, o entrambi in parallelo. Decidiamo insieme cosa massimizza le tue probabilità." },
    { title: "Ricorso con istanza di sospensiva", desc: "Depositiamo entro i termini. La sospensiva, quando concessa, arriva tipicamente in 30–60 giorni." },
    { title: "Decisione di merito", desc: "Sentenza in 8–18 mesi. Nei nostri casi, oltre la metà delle ordinanze viene annullata in tutto o in parte." },
  ],

  resultsTicker: [
    "Proprietario casa · ordinanza annullata al TAR in 4 mesi",
    "Costruttore · sanatoria ottenuta, opera regolarizzata",
    "Famiglia · sospensiva concessa in 38 giorni",
    "Villa storica · acquisizione comunale evitata in extremis",
    "Sopraelevazione · accertamento di conformità approvato",
  ],

  latinTicker: [
    "Art. 31 D.P.R. 380 / 2001",
    "L. 47 / 1985",
    "Art. 36 Testo Unico Edilizia",
    "Cod. Proc. Amm.",
    "Cons. Stato 2024",
    "Art. 7 L. 241 / 1990",
  ],

  reviewsH1Plain: "Ordinanze annullate.",
  reviewsH1Accent: "Case salvate. Abusi trasformati in sanatoria.",
  reviews: [
    { quote: "Ordinanza annullata al TAR in 4 mesi. Senza di loro avremmo perso la casa di famiglia.", author: "Marco R.", role: "Proprietario", hotel: "Costiera Amalfitana" },
    { quote: "Hanno trasformato un abuso in sanatoria piena. Lavoro di squadra con il geometra impeccabile.", author: "Luca B.", role: "Piccolo costruttore", hotel: "Salerno" },
    { quote: "Sospensiva ottenuta in 38 giorni. Da lì abbiamo lavorato con calma alla pratica di merito.", author: "Famiglia D.", role: "Proprietà ereditata", hotel: "Cilento" },
  ],

  faqs: [
    { q: "Ho ricevuto un’ordinanza di demolizione: cosa devo fare subito?", a: "Conta i giorni dalla notifica e contatta un avvocato amministrativo entro i primi 10–15. Hai 60 giorni perentori per impugnare al TAR. Senza ricorso depositato in tempo, l’ordinanza diventa esecutiva e non c’è più nulla da fare per via giudiziaria." },
    { q: "Cosa succede se i 60 giorni scadono?", a: "L’ordinanza diventa esecutiva. Dopo ulteriori 90 giorni di inadempienza, il Comune può procedere d’ufficio alla demolizione (a tue spese) e acquisire gratuitamente al patrimonio l’immobile e l’area di sedime, fino a 10 volte la superficie dell’abuso. Tutto questo senza alcun indennizzo." },
    { q: "L’ordinanza è davvero impugnabile o sto sperando in niente?", a: "Le ordinanze annullate al TAR sono la maggioranza, non l’eccezione. I vizi più frequenti, come motivazione generica, mancata comunicazione di avvio, qualificazione errata dell’abuso o incompetenza dell’organo, sono riconosciuti dai giudici amministrativi con costanza. Nella consulenza preventiva ti diciamo se il tuo caso rientra in queste categorie." },
    { q: "Meglio sanatoria o ricorso al TAR?", a: "Dipende dall’opera. Se l’abuso è doppia-conforme (alla normativa di quando è stato fatto e a quella attuale), l’accertamento di conformità chiude tutto con una sanzione. Se non lo è, il ricorso al TAR è la strada. Spesso si percorrono entrambe in parallelo: il ricorso blocca l’esecutività e dà tempo per istruire la sanatoria." },
    { q: "Quanto costa difendermi?", a: "Onorario legale + contributo unificato per il TAR + eventuale perizia tecnica. Nella consulenza preventiva ti diamo una stima precisa basata sulla complessità dell’abuso e sulla strategia scelta. Concordiamo i compensi prima di iniziare: niente sorprese." },
    { q: "Se la sospensiva è concessa, cosa cambia per me?", a: "Cambia tutto. L’ordinanza è temporaneamente disattivata: il Comune non può procedere alla demolizione fino alla decisione di merito. Hai mesi o anni di tempo per regolarizzare l’immobile, presentare una sanatoria, o difenderti nel merito senza la spada di Damocle." },
    { q: "L’abuso lo aveva fatto chi mi ha venduto la casa: cambia qualcosa?", a: "Purtroppo no, dal punto di vista urbanistico. L’ordinanza colpisce chi è oggi proprietario, indipendentemente da chi ha realizzato l’opera. Restano azioni civili contro il venditore (per vizi occulti o mancata dichiarazione), ma la difesa contro il Comune va comunque fatta subito." },
    { q: "Lavorate solo in Campania?", a: "Lo Studio ha sede a Salerno e Cava de’ Tirreni ma assiste clienti in tutta Italia. Il D.P.R. 380/2001 è normativa nazionale e gran parte degli atti si gestisce a distanza. Per le udienze ci spostiamo o usiamo domiciliatari di fiducia presso ogni TAR." },
  ],

  finalH1Plain: "60 giorni passano in fretta.",
  finalH1Accent: "La tua casa no.",
  finalSub:
    "Verifica adesso, in 90 secondi, se la tua ordinanza è annullabile. Risposta dello Studio in 24 ore, senza impegno.",
};
