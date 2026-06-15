import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Clock, FileWarning, Landmark } from "lucide-react";
import VerticalLanding from "@/components/funnel/VerticalLanding";
import heroImg from "@/assets/practice-urbanistica.jpg";
import solutionImg from "@/assets/office.jpg";

export const Route = createFileRoute("/ordinanza-demolizione")({
  head: () => ({
    meta: [
      { title: "Ordinanza di demolizione — Avvocato Abusi Edilizi | Studio Legale Accarino" },
      { name: "description", content: "Hai ricevuto un’ordinanza di demolizione? 60 giorni per impugnarla al TAR. Ricorso, sospensiva, sanatoria edilizia. Difesa specializzata in abusi recuperabili." },
      { property: "og:title", content: "Ordinanza di demolizione — Studio Legale Accarino" },
      { property: "og:description", content: "Impugnazione ordinanza demolizione, accertamento di conformità, sanatoria edilizia. Strategia tecnica per proteggere il tuo immobile." },
    ],
  }),
  component: () => <VerticalLanding {...config} />,
});

const config = {
  vertical: "demolizione" as const,
  eyebrow: "Emergenza Edilizia",
  heroImage: heroImg,
  heroImageAlt: "Edificio oggetto di contestazione urbanistica",
  solutionImage: solutionImg,
  solutionImageAlt: "Studio legale al lavoro su pratiche edilizie",

  heroH1Plain: "Ordinanza di demolizione?",
  heroH1Accent: "Hai 60 giorni per non perdere la casa.",
  heroSub:
    "Impugnazione al TAR con istanza di sospensiva, accertamento di conformità, sanatoria edilizia. Mappiamo i vizi dell’atto e trasformiamo l’abuso recuperabile in immobile regolare.",

  heroStats: [
    { to: 60, suffix: " gg", label: "Termine perentorio", caption: "Per impugnare al TAR" },
    { to: 80, suffix: "%", label: "Ordinanze viziate", caption: "Per difetti formali o sostanziali" },
    { to: 120, suffix: "+", label: "Casi gestiti", caption: "Su ordinanze e abusi edilizi" },
    { to: 4, suffix: " mesi", label: "Tempo medio sospensiva", caption: "Dal deposito del ricorso" },
  ],

  solutionH1Plain: "Ogni ordinanza ha un vizio.",
  solutionH1Accent: "Il nostro lavoro è trovarlo.",
  solutionItems: [
    { title: "Mappatura dei vizi formali e sostanziali", desc: "Difetto di motivazione, mancata comunicazione di avvio, errori sulla natura dell’abuso, incompetenza del Comune: ogni ordinanza ha punti deboli identificabili." },
    { title: "Ricorso al TAR con istanza di sospensiva", desc: "Depositiamo il ricorso entro i 60 giorni perentori e chiediamo la sospensione dell’esecutività. La sospensiva blocca demolizione e acquisizione." },
    { title: "Accertamento di conformità o sanatoria", desc: "Quando l’opera è doppia-conforme alla normativa vigente e a quella dell’epoca, presentiamo l’istanza che chiude definitivamente la pratica." },
    { title: "Difesa contro acquisizione gratuita al patrimonio", desc: "Dopo 90 giorni dall’ordinanza inadempiuta, l’immobile entra nel patrimonio del Comune. Agire prima di quel termine è decisivo." },
  ],

  problemH1Plain: "Un’ordinanza ignorata",
  problemH1Accent: "è una casa persa.",
  problemLead:
    "Scaduti i 60 giorni per impugnare, l’ordinanza diventa esecutiva. Dopo altri 90, l’immobile passa al Comune senza indennizzo. Eppure l’80% delle ordinanze contiene vizi che un ricorso ben fatto fa annullare.",
  problemQuote: {
    text: "Pensavamo di non avere scampo. L’ordinanza è stata annullata al TAR in quattro mesi.",
    attr: "Cliente — Costiera Amalfitana",
  },
  problems: [
    { icon: AlertTriangle, title: "60 giorni che decidono tutto", body: "Il termine per impugnare è perentorio. Scaduto, nessun giudice può più riaprire la pratica. La maggior parte delle persone scopre questo termine troppo tardi." },
    { icon: FileWarning, title: "Difetti di motivazione e iter procedurale", body: "Tantissime ordinanze sono adottate senza comunicazione di avvio, con motivazioni standardizzate o classificazioni errate dell’abuso. Sono vizi che le rendono annullabili." },
    { icon: Clock, title: "Sanatoria possibile ma fuori tempo massimo", body: "L’accertamento di conformità è uno strumento potente, ma va attivato prima dell’esecuzione. Dopo la demolizione, l’occasione è persa per sempre." },
    { icon: Landmark, title: "Acquisizione gratuita al patrimonio comunale", body: "Dopo 90 giorni dall’ordinanza non eseguita, il bene e l’area di sedime passano gratis al Comune. Recuperarli a posteriori è quasi impossibile." },
  ],

  processH1Plain: "Dall’ordinanza alla difesa",
  processH1Accent: "in dieci giorni.",
  processIntro:
    "I primi 10 giorni dopo la notifica sono decisivi: analisi tecnica, scelta strategica tra ricorso e sanatoria, deposito formale. Lavoriamo in parallelo con geometri e ingegneri di fiducia.",
  process: [
    { title: "Analisi dell’atto e dei termini", desc: "Esaminiamo l’ordinanza, la documentazione catastale e urbanistica. Calcoliamo i termini critici e identifichiamo i vizi opponibili." },
    { title: "Scelta strategica", desc: "Valutiamo se conviene impugnare al TAR, presentare istanza di sanatoria, o procedere su entrambi i fronti in parallelo." },
    { title: "Deposito del ricorso e sospensiva", desc: "Ricorso al TAR con istanza di sospensiva cautelare. In 30–60 giorni si ottiene la sospensione dell’esecutività." },
    { title: "Definizione nel merito", desc: "Sentenza di merito in 8–18 mesi. Nei nostri casi, oltre la metà delle ordinanze viene annullata in tutto o in parte." },
  ],

  resultsTicker: [
    "Proprietario casa · ordinanza demolizione annullata in 4 mesi",
    "Costruttore · sanatoria ottenuta, opera regolarizzata",
    "Famiglia · sospensiva concessa in 38 giorni",
    "Villa storica · acquisizione comunale evitata",
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

  reviewsH1Plain: "Ordinanze annullate,",
  reviewsH1Accent: "abusi trasformati in sanatoria.",
  reviews: [
    { quote: "Ordinanza annullata al TAR in 4 mesi. Senza di loro avremmo perso la casa di famiglia.", author: "Marco R.", role: "Proprietario", hotel: "Costiera Amalfitana" },
    { quote: "Hanno trasformato un abuso in sanatoria piena. Lavoro di squadra con il geometra impeccabile.", author: "Luca B.", role: "Piccolo costruttore", hotel: "Salerno" },
    { quote: "Sospensiva ottenuta in 38 giorni. Da quel momento abbiamo lavorato con calma alla pratica di merito.", author: "Famiglia D.", role: "Proprietà ereditata", hotel: "Cilento" },
  ],

  faqs: [
    { q: "Quanto tempo ho per impugnare un’ordinanza di demolizione?", a: "60 giorni dalla data di notifica. Il termine è perentorio: scaduto, il ricorso è inammissibile. Per questo è fondamentale rivolgersi a un avvocato amministrativo subito, idealmente entro i primi 15 giorni, per avere tempo di preparare il ricorso al TAR con istanza di sospensiva." },
    { q: "Cosa rischio se non impugno l’ordinanza nei 60 giorni?", a: "L’ordinanza diventa esecutiva. Dopo ulteriori 90 giorni di inadempimento, il Comune può procedere d’ufficio alla demolizione (a tue spese) e acquisire gratuitamente al patrimonio comunale l’immobile e l’area di sedime, con un raggio fino a 10 volte la superficie dell’abuso." },
    { q: "Quando conviene la sanatoria invece del ricorso al TAR?", a: "Quando l’opera è doppia-conforme: conforme sia alla normativa urbanistica vigente al momento della realizzazione, sia a quella attuale. In quei casi l’accertamento di conformità (art. 36 D.P.R. 380/2001) chiude definitivamente la pratica con il pagamento di una sanzione." },
    { q: "Posso impugnare al TAR e chiedere la sanatoria contemporaneamente?", a: "Sì, e in molti casi è la strategia migliore. Il ricorso al TAR blocca l’esecutività dell’ordinanza e ti dà il tempo tecnico per istruire la pratica di sanatoria. Se la sanatoria viene accolta, il ricorso può essere ritirato; in caso contrario, prosegue." },
    { q: "Quanto costa difendersi da un’ordinanza di demolizione?", a: "I costi includono parcella legale, contributo unificato per il ricorso al TAR e, se necessaria, perizia tecnica. Nella consulenza preventiva ti diamo una stima precisa basata sulla complessità dell’abuso contestato e sulla strategia scelta. Concordiamo sempre i compensi prima di iniziare." },
    { q: "I vizi formali bastano davvero per annullare un’ordinanza?", a: "Spesso sì. Difetto di motivazione, mancata comunicazione di avvio del procedimento, errori sulla qualificazione dell’abuso, incompetenza dell’organo che ha emesso l’atto: sono vizi che il giudice amministrativo riconosce con frequenza e che portano all’annullamento dell’ordinanza." },
    { q: "Cosa succede dopo che il TAR concede la sospensiva?", a: "L’ordinanza è temporaneamente disattivata: il Comune non può procedere alla demolizione fino alla decisione di merito. La sospensiva dura tipicamente per tutta la durata del giudizio. In quel tempo si può lavorare sulla sanatoria o sulla difesa di merito in tranquillità." },
    { q: "Lavorate solo in Campania o anche fuori regione?", a: "Lo Studio ha sede a Salerno e Cava de’ Tirreni ma assiste clienti in tutta Italia. La materia urbanistica ha radici nazionali (D.P.R. 380/2001) e la maggior parte degli atti si gestisce a distanza. Per le udienze ci spostiamo o ci avvaliamo di domiciliatari di fiducia." },
  ],

  finalH1Plain: "60 giorni passano in fretta.",
  finalH1Accent: "La tua casa no.",
  finalSub:
    "Verifica in 90 secondi se la tua ordinanza è impugnabile. Risposta dello Studio in 24 ore, senza impegno.",
};
