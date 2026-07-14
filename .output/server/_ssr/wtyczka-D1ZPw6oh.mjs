import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as KakobuyLogo } from "./LitBuyLogo-D5ELNQH3.mjs";
import { d as Puzzle, s as ShieldCheck, t as Zap, v as Link, w as Download } from "../_libs/lucide-react.mjs";
import { t as content_png_asset_default } from "./content.png.asset-CUT0zvIv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/wtyczka-D1ZPw6oh.js
var import_jsx_runtime = require_jsx_runtime();
var co1ntent_png_asset_default = { url: "/src/assets/co1ntent.png" };
var co2ntent_png_asset_default = { url: "/src/assets/co2ntent.png" };
var STORE_URL = "https://chromewebstore.google.com/detail/piacoinkgpkkccfldddaajfpdconkfmb?utm_source=item-share-cb";
function Wtyczka() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-6 py-16 md:py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid md:grid-cols-2 gap-12 items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/60 text-xs uppercase tracking-wider",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Puzzle, { className: "h-3.5 w-3.5" }), " Wtyczka do Chrome"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-6 font-display text-5xl md:text-6xl font-bold leading-[1.02]",
						children: [
							"AxelReps ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-litbuy",
								children: "KakoBuy"
							}),
							" Tool"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-5 text-muted-foreground text-base md:text-lg leading-relaxed",
						children: [
							"Nasza autorska wtyczka do Chrome — najszybszy sposób, żeby wygodnie kupować na KakoBuy. Konwertuje linki z ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-foreground font-medium",
								children: "1688, Taobao i Weidian"
							}),
							" jednym kliknięciem i od razu pokazuje przewidywaną datę dostawy Twojej paczki. Zero kombinowania, zero kopiowania linków tam i z powrotem."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-muted-foreground leading-relaxed",
						children: "Zrobiliśmy ją dla społeczności AxelReps — jest w pełni po polsku, darmowa i bez żadnych ukrytych trackerów. Instalacja to 5 sekund, a oszczędza godziny przy każdym haulu."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: STORE_URL,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "inline-flex items-center gap-3 rounded-full bg-litbuy text-litbuy-foreground px-7 py-4 text-base font-bold shadow-[0_0_42px_color-mix(in_oklch,var(--litbuy)_30%,transparent)] hover:brightness-110 transition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-5 w-5" }), "Zainstaluj wtyczkę"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inline-flex items-center gap-2 text-sm text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KakobuyLogo, { size: 18 }), " działa z KakoBuy"]
						})]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-3xl overflow-hidden border bg-card/40 shadow-2xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: content_png_asset_default.url,
						alt: "AxelReps KakoBuy Tool — wtyczka do Chrome",
						className: "w-full h-auto"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mt-20 grid md:grid-cols-3 gap-5",
				children: [
					{
						icon: Link,
						title: "Konwersja jednym klikiem",
						body: "Wklej link z Taobao, Weidian lub 1688 — wtyczka automatycznie zamienia go w link KakoBuy z Twoim kodem partnerskim."
					},
					{
						icon: Zap,
						title: "Wynik w sekundę",
						body: "Bez czekania, bez otwierania kolejnych zakładek. Klik i już jesteś na KakoBuy gotowy do zakupu."
					},
					{
						icon: ShieldCheck,
						title: "Bezpiecznie i po polsku",
						body: "Pełne polskie tłumaczenie, brak śledzenia, brak reklam. Kod jest po naszej stronie, kontrola po Twojej."
					}
				].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl border bg-card p-6 hover:border-litbuy/50 transition",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-11 w-11 rounded-2xl bg-litbuy/10 border border-litbuy/40 flex items-center justify-center mb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "h-5 w-5 text-litbuy" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display font-bold text-lg",
							children: f.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground mt-2 leading-relaxed",
							children: f.body
						})
					]
				}, f.title))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-20 grid md:grid-cols-2 gap-10 items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-3xl overflow-hidden border bg-card/40 shadow-2xl order-2 md:order-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: co1ntent_png_asset_default.url,
						alt: "Konwersja linków 1688, Taobao, Weidian → KakoBuy",
						className: "w-full h-auto"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "order-1 md:order-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-3xl md:text-4xl font-bold leading-tight",
						children: ["Konwertuj ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-litbuy",
							children: "bez wysiłku"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-muted-foreground leading-relaxed",
						children: "Znalazłeś świetną ofertę na 1688, Taobao albo Weidian? Wtyczka od razu podmienia link na KakoBuy — nie musisz już ręcznie wklejać, kopiować ani sprawdzać, czy dobrze zamieniłeś domenę. Klikasz „Kup przez KakoBuy\" i lecisz dalej."
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-20 grid md:grid-cols-2 gap-10 items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-3xl md:text-4xl font-bold leading-tight",
						children: ["Wiedz, zanim ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-litbuy",
							children: "Twoja paczka dotrze"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-muted-foreground leading-relaxed",
						children: "Wtyczka pokazuje przewidywaną datę dostawy prosto na stronie KakoBuy — nie musisz się już zastanawiać, kiedy przyjdzie haul. Sprawdzasz numer, widzisz kiedy paczka wyjdzie z Chin, odprawi się w Polsce i trafi do Ciebie."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: STORE_URL,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "mt-6 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-bold hover:brightness-110 transition",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), "Pobierz z Chrome Web Store"]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-3xl overflow-hidden border bg-card/40 shadow-2xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: co2ntent_png_asset_default.url,
						alt: "Przewidywana data dostawy paczki KakoBuy",
						className: "w-full h-auto"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-24 rounded-3xl border bg-gradient-to-br from-litbuy/15 to-transparent p-10 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "inline-flex items-center gap-2 mb-3 text-xs uppercase tracking-wider text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KakobuyLogo, { size: 16 }), " AxelReps × KakoBuy"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl md:text-4xl font-bold",
						children: "Zainstaluj wtyczkę i haul mądrzej"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-muted-foreground max-w-xl mx-auto",
						children: "Darmowa, po polsku, gotowa w 5 sekund. Zrób sobie prezent i przestań tracić czas na kopiowanie linków."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: STORE_URL,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "mt-6 inline-flex items-center gap-3 rounded-full bg-litbuy text-litbuy-foreground px-8 py-4 text-base font-bold hover:brightness-110 transition",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-5 w-5" }), "Zainstaluj z Chrome Web Store"]
					})
				]
			})
		]
	});
}
//#endregion
export { Wtyczka as component };
