import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Clock, FileWarning, Landmark } from "lucide-react";
import VerticalLanding from "@/components/funnel/VerticalLanding";
import heroImg from "@/assets/practice-espropriazioni.jpg";
import solutionImg from "@/assets/law-books.jpg";

export const Route = createFileRoute("/espropri-indennita")({
  head: () => ({
    meta: [
      { title: "Indennità di esproprio — Avvocato Espropri | Studio Legale Accarino" },
      { name: "description", content: "Avvocato esperto in indennità di esproprio: opposizione alla stima, ricorso in Corte d’Appello e perizia indipendente. +35% medio sull’offerta iniziale della PA." },
      { property: "og:title", content: "Indennità di esproprio — Studio Legale Accarino" },
      { property: "og:description", content: "Difendiamo proprietari terrieri, aziende agricole e famiglie con proprietà ereditate. Indennità rinegoziata sul valore reale del bene." },
    ],
  }),
  component: () => <VerticalLanding {...config} />,
});

const config = {
  vertical: "espropri" as const,
  eyebrow: "Espropri & Indennità",
  heroImage: heroImg,
  heroImageAlt: "Terreno oggetto di procedura espropriativa",
  solutionImage: solutionImg,
  solutionImageAlt: "Codice di diritto amministrativo e perizie",

  heroH1Plain: "Indennità di esproprio sottostimata?",
  heroH1Accent: "Riprendi il valore reale del tuo bene.",
  heroSub:
    "La PA offre indennità basate su criteri standard. Con perizia indipendente, opposizione alla stima e ricorso in Corte d’Appello, otteniamo in media +35% sull’offerta iniziale.",

  heroStats: [
    { to: 35, suffix: "%", label: "Indennità in più", caption: "Media sull’offerta iniziale" },
    { to: 200, suffix: "+", label: "Procedure espropriative", caption: "Seguite dallo Studio" },
    { to: 70, suffix: "%", label: "Casi rinegoziati", caption: "Senza arrivare a sentenza" },
    { to: 9, suffix: " mesi", label: "Tempo medio", caption: "Dall’opposizione all’accordo" },
  ],

  solutionH1Plain: "Una perizia indipendente vale",
  solutionH1Accent: "centinaia di migliaia di euro.",
  solutionItems: [
    { title: "Stima tecnica autonoma del bene", desc: "Confrontiamo la nostra perizia con quella della PA. Sul tuo fondo, sul tuo immobile, sui valori reali di mercato — non sulle tabelle catastali." },
    { title: "Opposizione alla determinazione provvisoria", desc: "Depositata nei 30 giorni previsti dalla legge. Senza opposizione formale, l’indennità diventa definitiva e perdi ogni margine di trattativa." },
    { title: "Negoziazione diretta con l’ente espropriante", desc: "Nella maggior parte dei casi otteniamo l’accordo bonario prima della sentenza, con tempi e costi sensibilmente inferiori." },
    { title: "Ricorso in Corte d’Appello quando serve", desc: "Quando l’incremento atteso lo giustifica, portiamo il caso davanti al giudice. Selezioniamo solo i ricorsi con margine concreto." },
  ],

  problemH1Plain: "La prima offerta della PA è",
  problemH1Accent: "quasi sempre la più bassa possibile.",
  problemLead:
    "L’ente espropriante ha periti interni, tabelle precostituite e l’interesse a contenere la spesa pubblica. Tu hai 30 giorni per opporti — e un avvocato generalista che non conosce i criteri della Corte d’Appello.",
  problemQuote: {
    text: "Ci avevano offerto 420.000 euro per il fondo di famiglia. Con la perizia indipendente siamo arrivati a 890.000.",
    attr: "Cliente — Provincia di Salerno",
  },
  problems: [
    { icon: AlertTriangle, title: "L’indennità è calcolata sui valori agricoli, non su quelli edificabili", body: "La PA applica spesso criteri minimi. Un terreno edificabile o con vocazione urbanistica reale può valere 3–5 volte l’offerta iniziale." },
    { icon: Clock, title: "I termini per opporsi sono brevissimi", body: "30 giorni per la determinazione provvisoria, 60 giorni per il ricorso al TAR sulla procedura. Dopo, il provvedimento diventa intoccabile." },
    { icon: FileWarning, title: "Senza perizia tecnica, non hai argomenti", body: "Un’opposizione senza CTU di parte è destinata a essere ignorata. Serve un professionista qualificato che parli la lingua tecnica del giudice." },
    { icon: Landmark, title: "L’occupazione d’urgenza non blocca la trattativa", body: "Anche se il cantiere è già partito, il diritto all’indennità rimane integro. Si può negoziare a opera in corso e ottenere arretrati." },
  ],

  processH1Plain: "Dalla notifica all’indennità reale",
  processH1Accent: "in quattro passaggi.",
  processIntro:
    "Un metodo collaudato su oltre 200 procedure espropriative: analisi, perizia, opposizione, definizione. Trasparente sui tempi, chiaro sui costi.",
  process: [
    { title: "Analisi dell’atto e dei termini", desc: "Esaminiamo il decreto, la determinazione provvisoria e calcoliamo le scadenze critiche per la tua opposizione." },
    { title: "Perizia tecnica indipendente", desc: "Il nostro perito stima il valore reale del bene secondo i criteri della Cassazione e della Corte d’Appello competente." },
    { title: "Opposizione formale e trattativa", desc: "Depositiamo l’opposizione nei termini e avviamo la negoziazione diretta con l’ente. Nel 70% dei casi si chiude qui." },
    { title: "Ricorso e definizione", desc: "Quando l’accordo non c’è, portiamo il caso in Corte d’Appello e seguiamo la causa fino alla sentenza definitiva." },
  ],

  resultsTicker: [
    "Azienda agricola · indennità portata da €420k a €890k",
    "Famiglia · esproprio rinegoziato, +€280k riconosciuti",
    "Proprietario terriero · +52% sull’offerta iniziale",
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

  reviewsH1Plain: "Indennità raddoppiate,",
  reviewsH1Accent: "perizie che reggono in giudizio.",
  reviews: [
    { quote: "Indennità raddoppiata in 9 mesi senza arrivare a sentenza. La perizia ha fatto la differenza.", author: "Giovanni M.", role: "Imprenditore agricolo", hotel: "Provincia di Salerno" },
    { quote: "Ci avevano offerto cifre da fame per un fondo di famiglia. Hanno ottenuto +€280k riconosciuti.", author: "Famiglia C.", role: "Proprietà ereditata", hotel: "Cilento" },
    { quote: "Procedura impeccabile dalla prima opposizione alla definizione bonaria. Trasparenti su tempi e costi.", author: "Cooperativa A.", role: "Azienda agricola", hotel: "Piana del Sele" },
  ],

  faqs: [
    { q: "Quanto tempo ho per oppormi all’indennità offerta dalla PA?", a: "Hai 30 giorni dalla notifica della determinazione provvisoria per accettare o opporti. Se accetti, l’indennità diventa definitiva. Se ti opponi, si apre la fase peritale e poi, eventualmente, la Corte d’Appello. Senza opposizione formale, perdi ogni margine di trattativa." },
    { q: "Quanto può aumentare l’indennità con un buon ricorso?", a: "Dipende dal tipo di bene e dalla differenza tra offerta della PA e valore reale. Nei nostri casi, gli incrementi medi sono del 30–60%; in situazioni di terreni edificabili sottostimati o errori di classificazione, abbiamo ottenuto incrementi anche del 100–150%." },
    { q: "Quanto costa una procedura di opposizione all’indennità?", a: "I costi includono parcella professionale, perizia tecnica indipendente e contributo unificato per l’eventuale ricorso. Nella consulenza preventiva ti diamo una stima precisa basata sul valore del bene e sulla complessità del caso. Lavoriamo anche su parametri di successo." },
    { q: "L’occupazione d’urgenza è già stata fatta: posso ancora opporsi?", a: "Sì. L’occupazione d’urgenza è una procedura distinta dall’esproprio. Il tuo diritto all’indennità definitiva rimane integro anche se il cantiere è già aperto. Anzi, in caso di occupazione illegittima o protratta oltre i termini, hai diritto a indennità di occupazione aggiuntive." },
    { q: "Posso opporsi anche se è passato del tempo dall’atto?", a: "Dipende. Esistono termini di prescrizione e decadenza. Per la determinazione provvisoria, dopo 30 giorni dalla notifica l’opposizione diretta non è più possibile, ma rimangono percorsi alternativi (ricorso alla Corte d’Appello entro 30 giorni dalla determinazione definitiva). Una valutazione tempestiva è essenziale." },
    { q: "Lavorate in tutta Italia o solo a Salerno?", a: "Lo Studio ha sede a Salerno e Cava de’ Tirreni ma assiste clienti in tutta Italia. Le procedure espropriative seguono normative nazionali uniformi e gran parte degli atti si gestisce a distanza. Per le udienze ci spostiamo o ci avvaliamo di domiciliatari di fiducia." },
    { q: "Cosa succede dopo la consulenza preventiva?", a: "Ricevi una valutazione chiara dei margini reali del tuo caso, con tempi, costi e probabilità di successo. Decidi tu se procedere: nessun automatismo, nessuna pressione commerciale. Accettiamo solo casi con margini concreti di vittoria." },
    { q: "Che cos’è la perizia tecnica indipendente e perché è decisiva?", a: "È la stima del valore reale del bene fatta da un perito di parte (geometra, ingegnere, agronomo) secondo i criteri di legge e della Cassazione. È il documento tecnico su cui si gioca tutta la trattativa: senza, la PA continua a riferirsi solo alla sua stima interna." },
  ],

  finalH1Plain: "30 giorni per cambiare",
  finalH1Accent: "il valore della tua indennità.",
  finalSub:
    "Verifica in 90 secondi se il tuo caso ha margini reali di rinegoziazione. Senza impegno, con risposta dello Studio in 24 ore.",
};
