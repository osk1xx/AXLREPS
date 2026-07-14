import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { f as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as supabase } from "./client-Zk1XYzmI.mjs";
import { r as usePreferences } from "./preferences-BWCVYk4L.mjs";
import { t as KakobuyLogo } from "./LitBuyLogo-D5ELNQH3.mjs";
import { t as useTranslation } from "../_libs/react-i18next.mjs";
import { A as ArrowRight, l as Search, p as Package, r as Truck } from "../_libs/lucide-react.mjs";
import { n as PromoPopup } from "./PromoPopup-SKwVVfpr.mjs";
import { t as ProductCard } from "./ProductCard-BJ8fN98g.mjs";
import { t as ProductCardSkeleton } from "./Skeleton-DRUH6KYf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BXBq81Tc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Landing() {
	const { t } = useTranslation();
	const prefs = usePreferences();
	const [promoOpen, setPromoOpen] = (0, import_react.useState)(false);
	const [picks, setPicks] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const to = setTimeout(() => {
			if (prefs.shouldShowPromo()) setPromoOpen(true);
		}, 900);
		return () => clearTimeout(to);
	}, []);
	(0, import_react.useEffect)(() => {
		try {
			supabase.from("products").select("id,name,link,price_cny,image_url,category").eq("is_draft", false).limit(20).then(({ data }) => setPicks(data ?? [])).catch(() => setPicks([]));
		} catch {
			setPicks([]);
		}
	}, []);
	const items = picks && picks.length ? [...picks, ...picks] : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-6 pt-24 pb-20 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/60 text-xs",
					children: t("landing.eyebrow")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-8 font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] animate-float-in",
					children: [
						t("landing.title_1"),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-litbuy",
							children: t("landing.title_2")
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-base md:text-lg text-muted-foreground max-w-xl mx-auto",
					children: t("landing.tagline")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setPromoOpen(true),
					className: "mt-7 inline-flex items-center gap-3 rounded-full bg-litbuy px-5 py-3 text-sm font-bold text-litbuy-foreground shadow-[0_0_42px_color-mix(in_oklch,var(--litbuy)_35%,transparent)] hover:brightness-110 transition",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KakobuyLogo, { size: 22 }), "-20% + 500$ w kuponach"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-12 flex flex-wrap items-stretch justify-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/qc",
							className: "inline-flex items-center justify-center gap-3 rounded-full bg-card border border-border px-8 py-5 text-base font-semibold hover:bg-accent transition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4" }), "QC FINDER"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/products",
							className: "inline-flex items-center justify-center gap-3 rounded-full bg-foreground text-background px-10 py-5 text-lg font-bold shadow-2xl animate-glow hover:scale-[1.03] transition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-5 w-5" }), t("landing.browse_products").toUpperCase()]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/tracking",
							className: "inline-flex items-center justify-center gap-3 rounded-full bg-card border border-border px-8 py-5 text-base font-semibold hover:bg-accent transition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-4 w-4" }), t("landing.tracking").toUpperCase()]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/admin/login",
					className: "mt-10 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition",
					children: [
						t("landing.admin_login"),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3 w-3" })
					]
				})
			]
		}),
		(picks === null || items.length > 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "border-y border-border/50 bg-card/30 py-10 overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-6xl mx-auto px-6 mb-6 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-bold",
					children: t("landing.latest_picks")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/products",
					className: "text-sm text-muted-foreground hover:text-foreground",
					children: [t("landing.browse_products"), " →"]
				})]
			}), picks === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-6",
				children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCardSkeleton, {}, i))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-6 w-max animate-marquee px-6",
					children: items.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-64 shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { p })
					}, p.id + "-" + i))
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromoPopup, {
			open: promoOpen,
			onClose: () => setPromoOpen(false)
		})
	] });
}
//#endregion
export { Landing as component };
