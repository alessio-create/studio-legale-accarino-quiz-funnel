import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Clock, FileWarning, Landmark } from "lucide-react";
import VerticalLanding from "@/components/funnel/VerticalLanding";
import heroImg from "@/assets/hero-columns.jpg";
import solutionImg from "@/assets/practice-urbanistica.jpg";

export const Route = createFileRoute("/ricorso-tar")({
  head: () => ({
    meta: [
      { title: "Permesso negato o silenzio della PA? Sblocca al TAR | Accarino" },
      {
        name: "description",
        content:
          "Diniego permesso, silenzio della PA, vincoli pretestuosi? Verifica in 90 secondi se hai margini di ricorso al TAR. Tempo medio di sblocco: 90 giorni.",
      },
      { property: "og:title", content: "Ricorso al TAR per sbloccare permessi e progetti" },
      {
        property: "og:description",
        content: "Diniego, silenzio, vincoli: gli strumenti del TAR per rimettere in moto la PA.",
      },
      { property: "og:url", content: "/ricorso-tar" },
    ],
    links: [{ rel: "canonical", href: "/ricorso-tar" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Ricorso al TAR contro dinieghi e silenzio della PA",
          provider: { "@type": "LegalService", name: "Studio Legale Accarino" },
          areaServed: "IT",
          url: "/ricorso-tar",
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
  vertical: "tar" as const,
  eyebrow: "SBLOCCO PROGETTI & TAR",
  heroImage: heroImg,
  heroTint: "#101a35",
  heroImageAlt: "Colonnato di tribunale amministrativo",
  solutionImage: solutionImg,
  solutionImageAlt: "Pratiche urbanistiche e progettuali",

  heroH1Plain: "Permesso negato o PA che non risponde?",
  heroH1Accent: "Il TAR esiste esattamente per questo.",
  heroSub:
    "Diniego pretestuoso, silenzio del Comune, vincolo della Soprintendenza arrivato all’ultimo minuto: 60 giorni per agire, 90 in media per sbloccare. Verifica adesso se il tuo caso ha margini reali.",

  heroStats: [
    { to: 60, suffix: " gg", label: "Per impugnare diniego o silenzio", caption: "Termine perentorio" },
    { to: 90, suffix: " gg", label: "Tempo medio sblocco", caption: "Dal deposito del ricorso" },
    { to: 75, suffix: "%", label: "Esito favorevole su sospensive", caption: "Nostri ricorsi 2022–2024" },
    { to: 150, suffix: "+", label: "Ricorsi al TAR depositati", caption: "Materia urbanistica ed edilizia" },
  ],

  solutionH1Plain: "Quando la PA si ferma,",
  solutionH1Accent: "il TAR è lo strumento per rimetterla in moto.",
  solutionItems: [
    { title: "Ti diciamo subito se il ricorso è fondato", desc: "Leggiamo il diniego (o documentiamo il silenzio) in 24 ore e ti diamo una risposta chiara: margini, tempi, costi. Senza impegno." },
    { title: "Ricorso contro il diniego di permesso", desc: "Mappiamo i vizi di legittimità, depositiamo entro 60 giorni con istanza di sospensiva. Il diniego si blocca, l’istruttoria si riapre." },
    { title: "Azione contro il silenzio-inadempimento", desc: "Quando la PA non risponde nei termini, il rito speciale del silenzio obbliga il Comune a provvedere entro una data fissata dal giudice." },
    { title: "Commissario ad acta quando il Comune ignora la sentenza", desc: "Se anche dopo aver vinto la PA resta ferma, chiediamo al giudice un commissario che provveda al suo posto. È lo strumento che chiude davvero la pratica." },
  ],

  problemH1Plain: "Ogni mese di blocco",
  problemH1Accent: "è margine che evapora dal tuo cantiere.",
  problemLead:
    "La PA non ha fretta. Ha periti interni, zero costi di ritardo e una motivazione strutturale a temporeggiare. Tu hai mutui, committenti, scadenze contrattuali. Il diritto amministrativo prevede strumenti rapidi per sbloccare la pratica — vanno usati subito, e bene.",
  problemQuote: {
    text: "Permesso fermo da 14 mesi per un vincolo paesaggistico. Sbloccato in 90 giorni dopo il ricorso.",
    attr: "Cliente — PMI edile · Campania",
  },
  problems: [
    { icon: AlertTriangle, title: "Il diniego si fonda su pareri trattati come vincolanti", body: "Soprintendenza, Genio Civile, Asl: spesso esprimono pareri istruttori non vincolanti che la PA usa come scudo. È un vizio classico, riconosciuto dal giudice amministrativo." },
    { icon: Clock, title: "Stai aspettando “che si sblocchi da sola”", body: "Non succederà. Conferenza dei servizi, SUE, SUAP hanno termini precisi: una volta scaduti, è già silenzio-inadempimento. E ogni mese che aspetti è un mese in meno di cantiere." },
    { icon: FileWarning, title: "Il vincolo è arrivato senza istruttoria reale", body: "Vincoli paesaggistici, idrogeologici, archeologici imposti per analogia o per cautela, senza valutare il singolo bene. Impugnati al TAR, nel 60% dei casi vengono ridimensionati o annullati." },
    { icon: Landmark, title: "Il TAR ti dà ragione ma la PA ignora la sentenza", body: "Capita più spesso di quanto si pensi. Per questo esiste il giudizio di ottemperanza e il commissario ad acta: pochi avvocati li usano davvero. Noi sì." },
  ],

  processH1Plain: "Dal diniego al cantiere riaperto",
  processH1Accent: "in tempi prevedibili.",
  processIntro:
    "Diffida, ricorso, sospensiva, esecuzione. Quattro tappe, tempi misurabili, costi concordati prima. Niente sorprese.",
  process: [
    { title: "Analisi del diniego o del silenzio", desc: "Leggiamo l’atto (o documentiamo l’inerzia) e ti diciamo in 24 ore se il ricorso ha margine. Senza impegno." },
    { title: "Diffida formale alla PA", desc: "Quando ha senso, partiamo con una messa in mora: spesso basta per riaprire l’istruttoria senza arrivare al TAR." },
    { title: "Ricorso con istanza di sospensiva", desc: "Deposito entro i 60 giorni. Sospensiva tipicamente in 30–60 giorni. Per i casi più urgenti, decreto cautelare monocratico in pochi giorni." },
    { title: "Esecuzione e commissario ad acta", desc: "Se dopo la sentenza la PA non si muove, ottemperanza e commissario ad acta. È lo strumento che trasforma la vittoria in cantiere aperto." },
  ],

  resultsTicker: [
    "PMI costruzioni · permesso sbloccato al TAR in 90 giorni",
    "Developer · diniego annullato, progetto ripartito",
    "Cantiere fermo da 14 mesi · sospensiva concessa in 45 giorni",
    "Vincolo paesaggistico · riformulato dopo ricorso",
    "Silenzio della PA · commissario ad acta nominato in 5 mesi",
  ],

  latinTicker: [
    "Cod. Proc. Amm.",
    "L. 241 / 1990",
    "D.lgs. 104 / 2010",
    "Art. 117 Cost.",
    "Cons. Stato Plen.",
    "D.P.R. 380 / 2001",
  ],

  reviewsH1Plain: "Permessi sbloccati.",
  reviewsH1Accent: "Progetti rimessi in cantiere. Margini salvati.",
  reviews: [
    { quote: "Permesso bloccato da 14 mesi, sbloccato in 90 giorni dopo il ricorso. Margini di cantiere salvati.", author: "Antonio P.", role: "Amministratore", hotel: "PMI edile · Campania" },
    { quote: "Diniego pretestuoso annullato al TAR. La PA ha riemesso il permesso senza ulteriori obiezioni.", author: "Stefano D.", role: "Developer", hotel: "Provincia di Napoli" },
    { quote: "Vincolo paesaggistico riformulato dopo il ricorso. Progetto ripartito senza modifiche sostanziali.", author: "Famiglia V.", role: "Committenza privata", hotel: "Costiera Sorrentina" },
  ],

  faqs: [
    { q: "Mi hanno negato il permesso di costruire: ho davvero margini di ricorso?", a: "Nella maggior parte dei casi sì. I dinieghi si fondano spesso su pareri istruttori non vincolanti, motivazioni standardizzate o interpretazioni rigide dei vincoli. Il giudice amministrativo riconosce con costanza vizi di eccesso di potere, difetto di motivazione, violazione di legge. Nella consulenza preventiva ti diciamo se il tuo caso rientra in queste categorie." },
    { q: "La PA non mi risponde da mesi: cosa posso fare?", a: "Si chiama silenzio-inadempimento. Si attiva con un ricorso specifico al TAR (artt. 31 e 117 c.p.a.) con cui si chiede al giudice di obbligare la PA a provvedere entro una data certa. Tempi tipici: 90–120 giorni. È uno degli strumenti più rapidi del diritto amministrativo." },
    { q: "Quanto tempo serve per sbloccare la mia pratica?", a: "Dipende dal tipo di ricorso e dal TAR competente. Sospensiva: 30–60 giorni. Per i casi davvero urgenti, decreto cautelare monocratico in pochi giorni. Quando la sospensiva è concessa, la PA spesso si adegua subito senza aspettare il merito. Il tempo medio di sblocco effettivo è di 90 giorni." },
    { q: "Cosa succede se vinco al TAR ma il Comune non rilascia il permesso?", a: "Si attiva il giudizio di ottemperanza: si chiede al giudice di nominare un commissario ad acta che agisca al posto della PA inerte. È uno strumento potente ma sottoutilizzato. Spesso anche la sola minaccia formale del commissario basta a sbloccare la pratica." },
    { q: "Si può ricorrere contro un parere della Soprintendenza?", a: "Sì. Anche quando il parere è vincolante, è impugnabile al TAR per vizi propri (eccesso di potere, difetto di motivazione, contraddittorietà). In molti casi otteniamo l’annullamento del parere e, di conseguenza, la riedizione del provvedimento finale in senso favorevole." },
    { q: "Quanto costa un ricorso al TAR?", a: "Onorario legale + contributo unificato (variabile in base al valore del progetto) + eventuale perizia tecnica. Nella consulenza preventiva ti diamo una stima precisa. Sui progetti di valore elevato lavoriamo anche con compensi parzialmente legati al risultato." },
    { q: "Posso ricorrere anche se sono passati alcuni mesi?", a: "Il termine standard è 60 giorni dalla notifica o dalla piena conoscenza dell’atto. Se è passato di più, esistono strumenti alternativi (ricorso straordinario al Capo dello Stato entro 120 giorni, contestazione di atti sopravvenuti). Una valutazione tempestiva è essenziale: ogni settimana persa chiude opzioni." },
    { q: "Lavorate solo in Campania?", a: "Lo Studio ha sede a Salerno e Cava de’ Tirreni ma assiste clienti in tutta Italia. Il diritto amministrativo è nazionale e gran parte degli atti si gestisce a distanza. Per le udienze ci spostiamo o usiamo domiciliatari di fiducia presso ogni TAR territoriale." },
  ],

  finalH1Plain: "Ogni mese di blocco costa.",
  finalH1Accent: "Sbloccare costa molto meno.",
  finalSub:
    "Verifica adesso, in 90 secondi, se il tuo diniego o il silenzio della PA hanno margini reali di ricorso. Risposta dello Studio in 24 ore.",
};
