import { createFileRoute, Link } from "@tanstack/react-router";
import monogramGold from "@/assets/monogram-gold.svg";

const TITOLARE = "Studio Legale Accarino";
const EMAIL = "studioassociato@accarino.it";
const DOMAIN = "lp.studiolegaleaccarino.it";

export const Route = createFileRoute("/cookie-policy")({
  head: () => ({
    meta: [
      { title: "Cookie Policy · Studio Legale Accarino" },
      { name: "description", content: `Cookie Policy di ${DOMAIN}: Strumenti di Tracciamento utilizzati, finalità, gestione del consenso e modalità di opt-out.` },
      { name: "robots", content: "index,follow" },
    ],
  }),
  component: CookiePolicy,
});

function CookiePolicy() {
  return (
    <div className="relative isolate flex min-h-screen flex-col overflow-x-hidden bg-background text-foreground">
      <div className="absolute inset-0 grain opacity-40 pointer-events-none" />

      {/* Header */}
      <header className="relative z-10">
        <div className="container flex h-20 items-center justify-between md:h-24">
          <Link to="/" className="flex items-center gap-4">
            <img src={monogramGold} alt="Studio Legale Accarino" className="h-9 w-auto md:h-10" />
            <span className="hidden text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground sm:inline">
              Cookie Policy
            </span>
          </Link>
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
            Tracciamento
          </span>
        </div>
        <div className="relative h-px w-full bg-primary/10" />
      </header>

      <main className="relative z-10 flex-1">
        <div className="container py-14 lg:py-20">
          <div className="mx-auto max-w-3xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-5">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">02</span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Informativa Strumenti di Tracciamento
              </span>
            </div>

            <div className="relative mt-8">
              <span
                aria-hidden
                className="pointer-events-none absolute -left-4 -top-12 select-none font-serif text-[140px] leading-none text-primary/[0.04] lg:-left-8 lg:text-[180px]"
              >
                C
              </span>
              <h1 className="relative text-balance text-[clamp(1.75rem,3.6vw,2.6rem)] font-500 leading-[1.1] tracking-[-0.02em] text-primary">
                Cookie <span className="text-gold-deep">Policy</span>
              </h1>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Cookie Policy di {DOMAIN}. Informazioni sulle tecnologie che consentono a questo Sito Web di raggiungere gli scopi descritti di seguito.
            </p>

            <div className="mt-14 space-y-10">
              <section>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Tali tecnologie permettono al Titolare di raccogliere e salvare informazioni (per esempio tramite l'utilizzo di Cookie) o di utilizzare risorse (per esempio eseguendo uno script) sul dispositivo dell'Utente quando quest'ultimo interagisce con questo Sito Web.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Per semplicità, in questo documento tali tecnologie sono sinteticamente definite "Strumenti di Tracciamento", salvo vi sia ragione di differenziare. Alcune delle finalità per le quali vengono impiegati Strumenti di Tracciamento potrebbero richiedere il consenso dell'Utente. Se viene prestato il consenso, esso può essere revocato liberamente in qualsiasi momento seguendo le istruzioni contenute in questo documento.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Questo Sito Web utilizza Strumenti di Tracciamento gestiti direttamente dal Titolare (Strumenti di Tracciamento "di prima parte") e Strumenti di Tracciamento che abilitano servizi forniti da terzi ("di terza parte").
                </p>
              </section>

              <div className="h-px bg-primary/10" />

              <section>
                <h2 className="text-heading font-500 text-primary">Attività strettamente necessarie al funzionamento</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Questo Sito Web utilizza Cookie comunemente detti "tecnici" o altri Strumenti di Tracciamento analoghi per svolgere attività strettamente necessarie a garantire il funzionamento o la fornitura del Servizio.
                </p>

                <h3 className="mt-6 text-title font-500 text-primary">Gestione dei tag</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  <strong className="text-primary font-500">Google Tag Manager (Google Ireland Limited)</strong> — servizio di gestione dei tag. Dati Personali trattati: Dati di utilizzo e Strumento di Tracciamento. Luogo del trattamento: Irlanda –{" "}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="link-gold">Privacy Policy</a>.
                </p>
              </section>

              <div className="h-px bg-primary/10" />

              <section>
                <h2 className="text-heading font-500 text-primary">Altre attività che prevedono l'utilizzo di Strumenti di Tracciamento</h2>

                <h3 className="mt-6 text-title font-500 text-primary">Miglioramento dell'esperienza · Visualizzazione di contenuti da piattaforme esterne</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  <strong className="text-primary font-500">Google Fonts (Google Ireland Limited)</strong> — servizio di visualizzazione di stili di carattere. Dati Personali trattati: Dati di utilizzo e Strumento di Tracciamento. Luogo del trattamento: Irlanda –{" "}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="link-gold">Privacy Policy</a>.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  <strong className="text-primary font-500">Font Awesome (Fonticons, Inc.)</strong> — servizio di visualizzazione di stili di carattere. Dati Personali trattati: Dati di utilizzo e Strumento di Tracciamento. Luogo del trattamento: Stati Uniti –{" "}
                  <a href="https://fontawesome.com/privacy" target="_blank" rel="noreferrer" className="link-gold">Privacy Policy</a>.
                </p>

                <h3 className="mt-6 text-title font-500 text-primary">Misurazione · Servizi di statistica anonimizzata</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  <strong className="text-primary font-500">Google Analytics con IP anonimizzato (Google Ireland Limited)</strong>{" "}
                  — servizio di analisi web. Questa integrazione rende anonimo l'indirizzo IP dell'Utente. Dati Personali trattati: Dati di utilizzo e Strumento di Tracciamento. Luogo del trattamento: Irlanda –{" "}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="link-gold">Privacy Policy</a> –{" "}
                  <a href="https://tools.google.com/dlpage/gaoptout?hl=en" target="_blank" rel="noreferrer" className="link-gold">Opt Out</a>.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Durata di archiviazione:</p>
                <ul className="mt-2 space-y-1 text-sm leading-relaxed text-muted-foreground">
                  <li>AMP_TOKEN: 1 ora</li>
                  <li>_ga: 2 anni</li>
                  <li>_gac*: 3 mesi</li>
                  <li>_gat: 1 minuto</li>
                  <li>_gid: 1 giorno</li>
                </ul>

                <h3 className="mt-6 text-title font-500 text-primary">Statistica</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  <strong className="text-primary font-500">Google Analytics (Google Ireland Limited)</strong> — servizio di analisi web. Dati Personali trattati: Dati di utilizzo e Strumento di Tracciamento. Luogo del trattamento: Irlanda –{" "}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="link-gold">Privacy Policy</a> –{" "}
                  <a href="https://tools.google.com/dlpage/gaoptout?hl=en" target="_blank" rel="noreferrer" className="link-gold">Opt Out</a>.
                  Durata di archiviazione: fino a 12 mesi.
                </p>
              </section>

              <div className="h-px bg-primary/10" />

              <section>
                <h2 className="text-heading font-500 text-primary">Come gestire le preferenze e prestare o revocare il consenso</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Esistono vari modi per gestire le preferenze relative agli Strumenti di Tracciamento e per prestare o revocare il consenso, ove necessario. Gli Utenti possono gestire le preferenze direttamente tramite le impostazioni dei propri dispositivi – per esempio, possono impedire l'uso o l'archiviazione di Strumenti di Tracciamento.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  In aggiunta, ogni qualvolta l'utilizzo di Strumenti di Tracciamento dipenda da consenso, l'Utente può prestare o revocare tale consenso impostando le proprie preferenze all'interno dell'informativa sui cookie o aggiornando tali preferenze tramite il widget delle impostazioni di tracciamento, se presente.
                </p>

                <h3 className="mt-6 text-title font-500 text-primary">Individuare le impostazioni relative agli Strumenti di Tracciamento</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Gli Utenti possono trovare informazioni su come gestire i Cookie in alcuni dei browser più diffusi ai seguenti indirizzi:
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                  <li><a href="https://support.google.com/chrome/answer/95647?hl=it&p=cpn_cookies" target="_blank" rel="noreferrer" className="link-gold">Google Chrome</a></li>
                  <li><a href="https://support.mozilla.org/it/kb/Attivare%20e%20disattivare%20i%20cookie" target="_blank" rel="noreferrer" className="link-gold">Mozilla Firefox</a></li>
                  <li><a href="https://support.apple.com/it-it/guide/safari/manage-cookies-and-website-data-sfri11471/" target="_blank" rel="noreferrer" className="link-gold">Apple Safari</a></li>
                  <li><a href="https://support.microsoft.com/it-it/help/4027947" target="_blank" rel="noreferrer" className="link-gold">Microsoft Edge</a></li>
                  <li><a href="https://support.brave.com/hc/articles/360022806212-How-do-I-use-Shields-while-browsing" target="_blank" rel="noreferrer" className="link-gold">Brave</a></li>
                  <li><a href="https://help.opera.com/latest/web-preferences/#cookies" target="_blank" rel="noreferrer" className="link-gold">Opera</a></li>
                </ul>

                <h3 className="mt-6 text-title font-500 text-primary">Come disattivare la pubblicità basata sugli interessi</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Gli Utenti possono avvalersi delle informazioni presenti su{" "}
                  <a href="http://www.youronlinechoices.eu/" target="_blank" rel="noreferrer" className="link-gold">YourOnlineChoices</a> (EU),{" "}
                  <a href="https://thenai.org/about-online-advertising/" target="_blank" rel="noreferrer" className="link-gold">Network Advertising Initiative</a> (USA),{" "}
                  <a href="https://www.aboutads.info/consumers/" target="_blank" rel="noreferrer" className="link-gold">Digital Advertising Alliance</a> (USA),{" "}
                  <a href="https://youradchoices.ca/understanding-online-advertising/" target="_blank" rel="noreferrer" className="link-gold">DAAC</a> (Canada),{" "}
                  <a href="http://www.ddai.info/optout" target="_blank" rel="noreferrer" className="link-gold">DDAI</a> (Giappone) o altri servizi analoghi.
                </p>
              </section>

              <div className="h-px bg-primary/10" />

              <section>
                <h2 className="text-heading font-500 text-primary">Conseguenze del rifiuto del consenso</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Gli Utenti sono liberi di decidere se prestare o meno il consenso. Tuttavia, gli Strumenti di Tracciamento consentono a questo Sito Web di fornire una migliore esperienza e funzionalità avanzate. In assenza del consenso dell'Utente, il Titolare potrebbe non essere in grado di fornire le relative funzionalità.
                </p>
              </section>

              <div className="h-px bg-primary/10" />

              <section>
                <h2 className="text-heading font-500 text-primary">Titolare del Trattamento dei Dati</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{TITOLARE}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  <strong className="text-primary font-500">Indirizzo email del Titolare:</strong>{" "}
                  <a href={`mailto:${EMAIL}`} className="link-gold">{EMAIL}</a>
                </p>
              </section>

              <p className="mt-8 text-sm text-muted-foreground">
                Per maggiori informazioni sul trattamento dei Dati Personali consulta la{" "}
                <Link to="/privacy-policy" className="link-gold">Privacy Policy</Link>.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
