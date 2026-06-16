import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Clock, FileWarning, Landmark } from "lucide-react";
import VerticalLanding from "@/components/funnel/VerticalLanding";
import heroImg from "@/assets/practice-espropriazioni.jpg";
import solutionImg from "@/assets/law-books.jpg";

export const Route = createFileRoute("/espropri-indennita")({
  head: () => ({
    meta: [
      { title: "Indennità di esproprio sotto valore? Verifica in 90s | Accarino" },
      {
        name: "description",
        content:
          "L'indennità che ti ha offerto la PA è quasi sempre sotto valore. Scopri in 90 secondi quanto puoi davvero ottenere. +35% medio sull'offerta iniziale.",
      },
      { property: "og:title", content: "Indennità di esproprio sotto valore? · Studio Accarino" },
      {
        property: "og:description",
        content: "L'offerta della PA è quasi mai quella giusta. Verifica i margini reali in 90 secondi.",
      },
      { property: "og:url", content: "/espropri-indennita" },
    ],
    links: [{ rel: "canonical", href: "/espropri-indennita" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Rinegoziazione indennità di esproprio",
          provider: { "@type": "LegalService", name: "Studio Legale Accarino" },
          areaServed: "IT",
          url: "/espropri-indennita",
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
  vertical: "espropri" as const,
  eyebrow: "ESPROPRI & INDENNITÀ",
  heroImage: heroImg,
  heroTint: "#1f3a2b",
  heroImageAlt: "Terreno oggetto di procedura espropriativa",
  solutionImage: solutionImg,
  solutionImageAlt: "Codice di diritto amministrativo e perizie",

  // TRIGGER: nomina la paura concreta. ACTION: confidence boost immediato.
  heroH1Plain: "L'offerta che ti hanno fatto",
  heroH1Accent: "vale davvero il tuo terreno?",
  heroSub:
    "Hai 30 giorni per non accettare cifre che ti porteresti dietro per sempre. Scopri in 90 secondi quanto vale davvero il tuo terreno, e di quanto si può rinegoziare l'indennità della PA.",

  // CONSUMPTION: numeri grossi, immediati.
  heroStats: [
    { to: 35, suffix: "%", label: "Indennità in più", caption: "Media sull'offerta iniziale della PA" },
    { to: 70, suffix: "%", label: "Casi chiusi prima della sentenza", caption: "Con accordo bonario" },
    { to: 200, suffix: "+", label: "Procedure seguite", caption: "Solo in materia di espropri" },
    { to: 30, suffix: " gg", label: "Termine per oppormi", caption: "Dopo, il valore è bloccato" },
  ],

  solutionH1Plain: "Una perizia indipendente",
  solutionH1Accent: "può valerti centinaia di migliaia di euro.",
  // CONSUMPTION: bullet brevi, ognuno con beneficio chiaro.
  solutionItems: [
    { title: "Sappiamo subito se il tuo caso ha margini", desc: "In 90 secondi capisci se vale la pena opporsi. Se non ci sono margini, te lo diciamo. Senza promesse vuote." },
    { title: "Perizia tecnica indipendente del tuo bene", desc: "Una stima vera, fatta al valore reale di mercato, non sulle tabelle catastali che la PA usa per pagare il meno possibile." },
    { title: "Opposizione formale nei termini", desc: "Depositata entro i 30 giorni di legge. Senza opposizione, l'offerta diventa definitiva e non puoi più toccarla." },
    { title: "Negoziamo prima di andare in causa", desc: "Nel 70% dei casi chiudiamo con accordo bonario. Meno tempo, meno costi, indennità ribilanciata." },
  ],

  // SELECTION: snippet emotivi e belief-confirming ("è davvero così").
  problemH1Plain: "La PA conta sul fatto che",
  problemH1Accent: "tu non sappia quanto vale davvero.",
  problemLead:
    "Periti interni, tabelle precostituite, tempi a suo favore. Tu hai 30 giorni e un'offerta che sembra già definitiva. Non lo è. La prima cifra che ti mettono davanti è quasi sempre la più bassa che possono provarci a offrirti.",
  problemQuote: {
    text: "Ci avevano offerto 420.000 euro per il fondo di famiglia. Era meno della metà. Con la perizia siamo arrivati a 890.000.",
    attr: "Cliente · Provincia di Salerno",
  },
  problems: [
    { icon: AlertTriangle, title: "Ti stanno pagando da terreno agricolo un bene che vale come edificabile", body: "È l'errore (o la scelta) più comune. Un terreno con vocazione urbanistica reale può valere 3–5 volte l'offerta che hai sul tavolo." },
    { icon: Clock, title: "Stai pensando 'magari accetto, almeno chiudo'", body: "Capita a tutti. Ma una volta accettata, l'indennità è blindata: nessun ricorso, nessuna trattativa, nessun ripensamento. Trenta giorni decidono anni di patrimonio." },
    { icon: FileWarning, title: "Hai parlato con un avvocato che 'se ne occupa anche'", body: "Il diritto degli espropri ha criteri tecnici precisi (Corte d'Appello, Cassazione, DPR 327/2001). Senza specializzazione, l'opposizione viene ignorata." },
    { icon: Landmark, title: "Il cantiere è già partito e pensi di aver perso tutto", body: "Falso. L'occupazione d'urgenza non chiude la partita: il diritto all'indennità reale resta intatto, e in molti casi maturano anche indennità di occupazione." },
  ],

  // CONVERSION: closure + controllo.
  processH1Plain: "Dalla notifica all'indennità giusta",
  processH1Accent: "in quattro passi, senza sorprese.",
  processIntro:
    "Niente promesse, niente burocratese. Quattro tappe chiare, con tempi misurabili e costi concordati prima.",
  process: [
    { title: "Analisi gratuita dell'atto", desc: "Ci mandi il decreto, lo leggiamo, ti diciamo se ha senso opporsi. In 24 ore, senza impegno." },
    { title: "Perizia indipendente sul tuo bene", desc: "Un perito di parte stima il valore reale secondo i criteri della Cassazione. È il documento che cambia tutto." },
    { title: "Opposizione e trattativa con la PA", desc: "Depositiamo nei termini e apriamo la negoziazione. Nel 70% dei casi si chiude qui, con accordo bonario." },
    { title: "Ricorso in Corte d'Appello se serve", desc: "Quando l'incremento atteso lo giustifica, portiamo il caso davanti al giudice. Solo casi con margini concreti." },
  ],

  resultsTicker: [
    "Azienda agricola · indennità portata da €420k a €890k",
    "Famiglia · esproprio rinegoziato, +€280k riconosciuti",
    "Proprietario terriero · +52% sull'offerta iniziale",
    "Cooperativa · indennità di occupazione recuperata in 7 mesi",
    "Eredità familiare · €1,2M ottenuti contro €640k offerti",
  ],

  latinTicker: [
    "Art. 42 Cost.",
    "D.P.R. 327 / 2001",
    "Cassazione SS.UU. 2010",
    "Corte Cost. 348 / 2007",
    "Art. 37 T.U. Espropri",
    "L. 865 / 1971",
  ],

  reviewsH1Plain: "Indennità raddoppiate.",
  reviewsH1Accent: "Famiglie che hanno smesso di accettare la prima offerta.",
  reviews: [
    { quote: "Indennità raddoppiata in 9 mesi senza arrivare a sentenza. La perizia ha fatto la differenza.", author: "Giovanni M.", role: "Imprenditore agricolo", hotel: "Provincia di Salerno" },
    { quote: "Ci avevano offerto cifre da fame per un fondo di famiglia. Hanno ottenuto +€280k riconosciuti.", author: "Famiglia C.", role: "Proprietà ereditata", hotel: "Cilento" },
    { quote: "Trasparenti su tempi e costi dall'inizio. Procedura impeccabile fino all'accordo bonario.", author: "Cooperativa A.", role: "Azienda agricola", hotel: "Piana del Sele" },
  ],

  // SELECTION: domande che l'utente sta letteralmente digitando su Google.
  faqs: [
    { q: "L'indennità che mi hanno offerto è davvero negoziabile?", a: "Nella maggior parte dei casi sì. La cifra della determinazione provvisoria è quasi sempre più bassa del valore reale: la PA usa criteri standard, spesso tabellari. Con perizia indipendente e opposizione formale si ottengono incrementi medi del 30–60%, fino al 100–150% per terreni edificabili sottostimati." },
    { q: "Quanto tempo ho per oppormi prima che diventi definitiva?", a: "30 giorni dalla notifica della determinazione provvisoria. Se accetti (anche solo non opponendoti), l'indennità diventa definitiva e non potrai più rinegoziarla. È il termine più importante di tutta la procedura." },
    { q: "Cosa rischio se rifiuto e perdo il ricorso?", a: "Poco, se il caso è stato selezionato con criterio. Per questo nella consulenza preventiva ti diciamo subito se ha senso opporsi o no. Se non ci sono margini, te lo diciamo: non accettiamo casi senza prospettive concrete." },
    { q: "Quanto costa farmi assistere?", a: "Onorario legale + perizia tecnica + contributo unificato per l'eventuale ricorso. Nella consulenza preventiva ti diamo una stima precisa basata sul valore del bene. Su pratiche di valore elevato lavoriamo anche con compensi legati al risultato." },
    { q: "Il cantiere è già aperto: posso ancora fare qualcosa?", a: "Sì. L'occupazione d'urgenza è una procedura distinta: il diritto all'indennità definitiva rimane integro. Anzi, se l'occupazione si protrae oltre i termini, maturano indennità aggiuntive significative." },
    { q: "Posso oppormi anche se è passato qualche mese?", a: "Dipende dai termini. Per la determinazione provvisoria il termine è 30 giorni, ma esistono percorsi alternativi (ricorso alla Corte d'Appello entro 30 giorni dalla determinazione definitiva, contestazione della procedura espropriativa). Più si aspetta, meno strumenti restano: una valutazione tempestiva è decisiva." },
    { q: "Lavorate solo in Campania?", a: "Lo Studio ha sede a Salerno e Cava de' Tirreni ma assiste clienti in tutta Italia. La normativa sugli espropri è nazionale e gran parte degli atti si gestisce a distanza. Per le udienze ci spostiamo o ci avvaliamo di domiciliatari di fiducia." },
    { q: "Cosa succede dopo la consulenza preventiva?", a: "Ricevi una valutazione chiara dei margini reali, con tempi, costi e probabilità di successo. Decidi tu se procedere. Nessun automatismo, nessuna pressione commerciale." },
  ],

  finalH1Plain: "30 giorni separano",
  finalH1Accent: "il prezzo offerto dal valore reale.",
  finalSub:
    "Verifica adesso, in 90 secondi, di quanto si può rinegoziare la tua indennità. Senza impegno, risposta dello Studio in 24 ore.",
};
