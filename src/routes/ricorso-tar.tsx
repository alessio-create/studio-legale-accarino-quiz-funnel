import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Clock, FileWarning, Landmark } from "lucide-react";
import VerticalLanding from "@/components/funnel/VerticalLanding";
import heroImg from "@/assets/hero-columns.jpg";
import solutionImg from "@/assets/practice-urbanistica.jpg";

export const Route = createFileRoute("/ricorso-tar")({
  head: () => ({
    meta: [
      { title: "Ricorso TAR — Diniego Permessi & Silenzio PA | Studio Legale Accarino" },
      { name: "description", content: "Permesso di costruire negato, silenzio della PA, vincoli paesaggistici opposti: ricorso al TAR con sospensiva. Sblocchiamo progetti fermi da mesi." },
      { property: "og:title", content: "Ricorso al TAR — Studio Legale Accarino" },
      { property: "og:description", content: "Diniego permessi, silenzio inadempimento, vincoli illegittimi. Ricorso al TAR mirato per sbloccare permessi e progetti edilizi." },
    ],
  }),
  component: () => <VerticalLanding {...config} />,
});

const config = {
  vertical: "tar" as const,
  eyebrow: "Sblocco Progetti & TAR",
  heroImage: heroImg,
  heroImageAlt: "Colonnato di tribunale amministrativo",
  solutionImage: solutionImg,
  solutionImageAlt: "Pratiche urbanistiche e progettuali",

  heroH1Plain: "Permesso negato o silenzio della PA?",
  heroH1Accent: "Sblocchiamo il tuo progetto al TAR.",
  heroSub:
    "Dinieghi pretestuosi, silenzio-inadempimento, vincoli paesaggistici applicati a sproposito: ricorso al TAR con sospensiva e, dove serve, nomina del commissario ad acta. Margini di cantiere salvati.",

  heroStats: [
    { to: 60, suffix: " gg", label: "Termine impugnazione", caption: "Dal diniego o dal silenzio" },
    { to: 90, suffix: " gg", label: "Tempo medio sblocco", caption: "Dal deposito del ricorso" },
    { to: 150, suffix: "+", label: "Ricorsi al TAR", caption: "Depositati dallo Studio" },
    { to: 75, suffix: "%", label: "Esito favorevole", caption: "Su sospensive richieste" },
  ],

  solutionH1Plain: "Quando la PA si ferma,",
  solutionH1Accent: "il TAR la rimette in moto.",
  solutionItems: [
    { title: "Ricorso contro il diniego del permesso di costruire", desc: "Analizziamo le motivazioni del rigetto, mappiamo i vizi di legittimità e depositiamo ricorso al TAR con istanza di sospensiva nei 60 giorni." },
    { title: "Azione contro il silenzio-inadempimento", desc: "Quando la PA non risponde entro i termini, agiamo con il rito speciale del silenzio: il giudice obbliga l’ente a provvedere entro una data certa." },
    { title: "Impugnazione di vincoli paesaggistici e ambientali", desc: "Vincoli sproporzionati, perimetrazioni errate, dinieghi della Soprintendenza: si impugnano al TAR con perizia tecnica di parte." },
    { title: "Nomina del commissario ad acta", desc: "Quando la PA continua a non eseguire la sentenza, chiediamo al giudice un commissario che provveda al suo posto. Strumento decisivo nei casi di inerzia." },
  ],

  problemH1Plain: "Ogni mese di blocco",
  problemH1Accent: "è margine perso sul cantiere.",
  problemLead:
    "La PA ha tempi suoi, periti interni e zero costi per ritardare. Tu hai mutui, contratti firmati con i committenti, costruzioni ferme. Il diritto amministrativo prevede strumenti rapidi per rimettere in moto la pratica: vanno usati subito e bene.",
  problemQuote: {
    text: "Avevamo un permesso fermo da 14 mesi per un vincolo paesaggistico. Sbloccato in 90 giorni dopo il ricorso.",
    attr: "Cliente — PMI edile · Campania",
  },
  problems: [
    { icon: AlertTriangle, title: "Dinieghi motivati su pareri non vincolanti", body: "Tantissimi dinieghi si fondano su pareri istruttori (Soprintendenza, Genio Civile) che la PA tratta come vincolanti senza esserlo. È un vizio classico, opponibile." },
    { icon: Clock, title: "Silenzio della PA oltre i termini di legge", body: "La conferenza dei servizi, il SUE, il SUAP hanno termini precisi. Superati, scatta il silenzio-inadempimento o il silenzio-assenso. Pochi sanno come farli valere." },
    { icon: FileWarning, title: "Vincoli applicati senza istruttoria tecnica", body: "Vincoli paesaggistici, idrogeologici, archeologici imposti per analogia o per cautela, senza un’istruttoria reale sul bene. Si impugnano e nel 60% dei casi si annullano." },
    { icon: Landmark, title: "Cantieri fermi mentre il diritto resta sulla carta", body: "La sentenza del TAR è esecutiva, ma se la PA non la attua serve il commissario ad acta. Lo strumento esiste: pochi avvocati lo usano correttamente." },
  ],

  processH1Plain: "Dal diniego al cantiere riaperto",
  processH1Accent: "in tempi prevedibili.",
  processIntro:
    "Diffida, ricorso, sospensiva, esecuzione. Un metodo collaudato su oltre 150 ricorsi al TAR, con tempi medi misurabili e trasparenti.",
  process: [
    { title: "Diffida e messa in mora", desc: "Quando possibile, partiamo con una diffida formale all’ente: spesso basta per sbloccare la pratica senza arrivare al ricorso." },
    { title: "Ricorso al TAR con sospensiva", desc: "Depositiamo il ricorso entro i 60 giorni. La sospensiva, quando concessa, arriva tipicamente in 30–60 giorni." },
    { title: "Sentenza nel merito", desc: "La causa di merito si chiude in 8–18 mesi a seconda del TAR territorialmente competente. L’esito favorevole è esecutivo." },
    { title: "Esecuzione e commissario ad acta", desc: "Se la PA non attua la sentenza, chiediamo il giudizio di ottemperanza e la nomina del commissario ad acta che provveda al suo posto." },
  ],

  resultsTicker: [
    "PMI costruzioni · permesso sbloccato al TAR in 90 giorni",
    "Developer · diniego annullato, progetto ripartito",
    "Cantiere fermo da 14 mesi · sospensiva concessa in 45 giorni",
    "Vincolo paesaggistico · riformulato dopo ricorso",
    "Silenzio PA · commissario ad acta nominato in 5 mesi",
  ],

  latinTicker: [
    "Cod. Proc. Amm.",
    "L. 241 / 1990",
    "D.lgs. 104 / 2010",
    "Art. 117 Cost.",
    "Cons. Stato Plen.",
    "D.P.R. 380 / 2001",
  ],

  reviewsH1Plain: "Permessi sbloccati,",
  reviewsH1Accent: "progetti rimessi in cantiere.",
  reviews: [
    { quote: "Permesso bloccato da 14 mesi, sbloccato in 90 giorni dopo il ricorso. Margini di cantiere salvati.", author: "Antonio P.", role: "Amministratore", hotel: "PMI edile · Campania" },
    { quote: "Diniego pretestuoso annullato al TAR. La PA ha riemesso il permesso senza ulteriori obiezioni.", author: "Stefano D.", role: "Developer", hotel: "Provincia di Napoli" },
    { quote: "Vincolo paesaggistico riformulato dopo il ricorso. Il progetto è ripartito senza modifiche sostanziali.", author: "Famiglia V.", role: "Committenza privata", hotel: "Costiera Sorrentina" },
  ],

  faqs: [
    { q: "Quanto tempo ho per impugnare un diniego della PA?", a: "60 giorni dalla notifica o dalla piena conoscenza dell’atto. Il termine è perentorio per il ricorso al TAR. In alcuni casi è possibile attivare strumenti alternativi (ricorso straordinario al Capo dello Stato in 120 giorni), ma il TAR resta la via più efficace per ottenere la sospensiva." },
    { q: "Cos’è il silenzio-inadempimento e come si fa valere?", a: "Quando la PA non risponde a un’istanza entro i termini di legge, si forma il silenzio. Per il silenzio-inadempimento serve un’azione specifica al TAR (artt. 31 e 117 c.p.a.) con cui si chiede al giudice di obbligare la PA a provvedere entro una data certa. Esito tipico: 90–120 giorni." },
    { q: "La sospensiva blocca davvero la situazione?", a: "Sì. Se concessa, sospende l’efficacia del provvedimento impugnato. Per i dinieghi non basta sospendere: si chiede una misura cautelare positiva (ad esempio l’obbligo della PA di rinnovare l’istruttoria). Per le ordinanze e i vincoli, la sospensiva blocca l’esecuzione." },
    { q: "Cosa succede se vinco al TAR ma il Comune non rilascia il permesso?", a: "Si attiva il giudizio di ottemperanza: si chiede al giudice di nominare un commissario ad acta che agisca al posto della PA inerte. È uno strumento potente ma sottoutilizzato. Nei nostri casi, anche la sola minaccia formale del commissario sblocca la pratica." },
    { q: "Quanto costa un ricorso al TAR?", a: "I costi includono parcella professionale, contributo unificato (variabile in base al valore del progetto e al tipo di ricorso) e perizia tecnica quando necessaria. Nella consulenza preventiva ti diamo una stima precisa. Lavoriamo anche con compensi legati al risultato sui progetti di valore." },
    { q: "Si può ricorrere contro un parere della Soprintendenza?", a: "Sì. Il parere della Soprintendenza, anche quando vincolante, è impugnabile al TAR per vizi propri (eccesso di potere, difetto di motivazione, violazione di legge). In molti casi otteniamo l’annullamento del parere e, di conseguenza, la riedizione del provvedimento finale." },
    { q: "I tempi del TAR sono lunghi: posso ottenere risultati rapidi?", a: "Sì, grazie alla cautelare. La sospensiva si decide tipicamente in 30–60 giorni dal deposito del ricorso. Per le situazioni davvero urgenti esiste anche il decreto cautelare monocratico (decisione in pochi giorni). Il merito è più lento, ma spesso quando la sospensiva è concessa la PA si adegua subito." },
    { q: "Lavorate solo a Salerno o in tutta Italia?", a: "Lo Studio ha sede a Salerno e Cava de’ Tirreni ma assiste clienti in tutta Italia. Il diritto amministrativo è nazionale e la quasi totalità degli atti si gestisce a distanza. Per le udienze ci spostiamo o ci avvaliamo di domiciliatari di fiducia presso ogni TAR territoriale." },
  ],

  finalH1Plain: "Il TAR esiste per questo.",
  finalH1Accent: "Per rimettere in moto la PA.",
  finalSub:
    "Verifica in 90 secondi se il tuo diniego o il silenzio della PA hanno margini di ricorso. Risposta dello Studio in 24 ore.",
};
