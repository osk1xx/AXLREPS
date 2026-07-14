import { createFileRoute } from "@tanstack/react-router";
import { Download, Puzzle, Zap, ShieldCheck, Link as LinkIcon } from "lucide-react";
import { KakobuyLogo } from "@/components/LitBuyLogo";
import heroAsset from "@/assets/content.png.asset.json";
import convertAsset from "@/assets/co1ntent.png.asset.json";
import trackerAsset from "@/assets/co2ntent.png.asset.json";

const STORE_URL =
  "https://chromewebstore.google.com/detail/piacoinkgpkkccfldddaajfpdconkfmb?utm_source=item-share-cb";

export const Route = createFileRoute("/wtyczka")({
  component: Wtyczka,
  head: () => ({
    meta: [
      { title: "AxelReps — KakoBuy Tools · nasza wtyczka do Chrome" },
      {
        name: "description",
        content:
          "AxelReps – KakoBuy Tools to darmowa wtyczka do Chrome, która konwertuje linki z 1688, Taobao i Weidian prosto na KakoBuy i pokazuje przewidywaną datę dostawy paczki.",
      },
      { property: "og:image", content: heroAsset.url },
    ],
  }),
});

function Wtyczka() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      {/* Hero */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/60 text-xs uppercase tracking-wider">
            <Puzzle className="h-3.5 w-3.5" /> Wtyczka do Chrome
          </div>
          <h1 className="mt-6 font-display text-5xl md:text-6xl font-bold leading-[1.02]">
            AxelReps <span className="text-litbuy">KakoBuy</span> Tool
          </h1>
          <p className="mt-5 text-muted-foreground text-base md:text-lg leading-relaxed">
            Nasza autorska wtyczka do Chrome — najszybszy sposób, żeby wygodnie kupować na KakoBuy.
            Konwertuje linki z <span className="text-foreground font-medium">1688, Taobao i Weidian</span> jednym kliknięciem
            i od razu pokazuje przewidywaną datę dostawy Twojej paczki. Zero kombinowania, zero kopiowania linków tam i z powrotem.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Zrobiliśmy ją dla społeczności AxelReps — jest w pełni po polsku, darmowa i bez żadnych ukrytych
            trackerów. Instalacja to 5 sekund, a oszczędza godziny przy każdym haulu.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-litbuy text-litbuy-foreground px-7 py-4 text-base font-bold shadow-[0_0_42px_color-mix(in_oklch,var(--litbuy)_30%,transparent)] hover:brightness-110 transition"
            >
              <Download className="h-5 w-5" />
              Zainstaluj wtyczkę
            </a>
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <KakobuyLogo size={18} /> działa z KakoBuy
            </div>
          </div>
        </div>
        <div className="rounded-3xl overflow-hidden border bg-card/40 shadow-2xl">
          <img src={heroAsset.url} alt="AxelReps KakoBuy Tool — wtyczka do Chrome" className="w-full h-auto" />
        </div>
      </section>

      {/* Features */}
      <section className="mt-20 grid md:grid-cols-3 gap-5">
        {[
          {
            icon: LinkIcon,
            title: "Konwersja jednym klikiem",
            body:
              "Wklej link z Taobao, Weidian lub 1688 — wtyczka automatycznie zamienia go w link KakoBuy z Twoim kodem partnerskim.",
          },
          {
            icon: Zap,
            title: "Wynik w sekundę",
            body: "Bez czekania, bez otwierania kolejnych zakładek. Klik i już jesteś na KakoBuy gotowy do zakupu.",
          },
          {
            icon: ShieldCheck,
            title: "Bezpiecznie i po polsku",
            body: "Pełne polskie tłumaczenie, brak śledzenia, brak reklam. Kod jest po naszej stronie, kontrola po Twojej.",
          },
        ].map((f) => (
          <div key={f.title} className="rounded-3xl border bg-card p-6 hover:border-litbuy/50 transition">
            <div className="h-11 w-11 rounded-2xl bg-litbuy/10 border border-litbuy/40 flex items-center justify-center mb-4">
              <f.icon className="h-5 w-5 text-litbuy" />
            </div>
            <h3 className="font-display font-bold text-lg">{f.title}</h3>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{f.body}</p>
          </div>
        ))}
      </section>

      {/* Showcase image 1 */}
      <section className="mt-20 grid md:grid-cols-2 gap-10 items-center">
        <div className="rounded-3xl overflow-hidden border bg-card/40 shadow-2xl order-2 md:order-1">
          <img src={convertAsset.url} alt="Konwersja linków 1688, Taobao, Weidian → KakoBuy" className="w-full h-auto" />
        </div>
        <div className="order-1 md:order-2">
          <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight">
            Konwertuj <span className="text-litbuy">bez wysiłku</span>
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Znalazłeś świetną ofertę na 1688, Taobao albo Weidian? Wtyczka od razu podmienia link
            na KakoBuy — nie musisz już ręcznie wklejać, kopiować ani sprawdzać, czy dobrze zamieniłeś domenę.
            Klikasz „Kup przez KakoBuy" i lecisz dalej.
          </p>
        </div>
      </section>

      {/* Showcase image 2 */}
      <section className="mt-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight">
            Wiedz, zanim <span className="text-litbuy">Twoja paczka dotrze</span>
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Wtyczka pokazuje przewidywaną datę dostawy prosto na stronie KakoBuy — nie musisz się już
            zastanawiać, kiedy przyjdzie haul. Sprawdzasz numer, widzisz kiedy paczka wyjdzie z Chin,
            odprawi się w Polsce i trafi do Ciebie.
          </p>
          <a
            href={STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-bold hover:brightness-110 transition"
          >
            <Download className="h-4 w-4" />
            Pobierz z Chrome Web Store
          </a>
        </div>
        <div className="rounded-3xl overflow-hidden border bg-card/40 shadow-2xl">
          <img src={trackerAsset.url} alt="Przewidywana data dostawy paczki KakoBuy" className="w-full h-auto" />
        </div>
      </section>

      {/* Final CTA */}
      <section className="mt-24 rounded-3xl border bg-gradient-to-br from-litbuy/15 to-transparent p-10 text-center">
        <div className="inline-flex items-center gap-2 mb-3 text-xs uppercase tracking-wider text-muted-foreground">
          <KakobuyLogo size={16} /> AxelReps × KakoBuy
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-bold">Zainstaluj wtyczkę i haul mądrzej</h2>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
          Darmowa, po polsku, gotowa w 5 sekund. Zrób sobie prezent i przestań tracić czas na kopiowanie linków.
        </p>
        <a
          href={STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-3 rounded-full bg-litbuy text-litbuy-foreground px-8 py-4 text-base font-bold hover:brightness-110 transition"
        >
          <Download className="h-5 w-5" />
          Zainstaluj z Chrome Web Store
        </a>
      </section>
    </div>
  );
}
