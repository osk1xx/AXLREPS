import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as supabase } from "./client-Zk1XYzmI.mjs";
import { r as usePreferences } from "./preferences-BWCVYk4L.mjs";
import { t as KakobuyLogo } from "./LitBuyLogo-D5ELNQH3.mjs";
import { t as useTranslation } from "../_libs/react-i18next.mjs";
import { n as X } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/PromoPopup-SKwVVfpr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useSiteConfig(key, fallback) {
	const [value, setValue] = (0, import_react.useState)(fallback);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		let alive = true;
		try {
			supabase.from("site_config").select("value").eq("key", key).maybeSingle().then(({ data }) => {
				if (alive && data) setValue(data.value);
				if (alive) setLoading(false);
			}).catch(() => {
				if (alive) setLoading(false);
			});
		} catch {
			setLoading(false);
		}
		return () => {
			alive = false;
		};
	}, [key]);
	return {
		value,
		loading
	};
}
var DEFAULT_PROMO = {
	enabled: true,
	title: "Odbierz -20% i 500$ w kuponach!",
	body: "KakoBuy to najlepszy chiński agent oferujący zaufanie, prędkość i przystępne ceny. Szybkie QC, sprawny support 24/7 i tańsza wysyłka do Polski — wszystko w jednym miejscu. Zarejestruj się przez nasz link i odbierz -20% zniżki oraz 500$ w kuponach na start.",
	cta_url: "https://www.kakobuy.com/register/?affcode=axelreps"
};
function PromoPopup({ open, onClose }) {
	const { t } = useTranslation();
	const prefs = usePreferences();
	const { value: promo } = useSiteConfig("promo_popup", DEFAULT_PROMO);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onKey = (e) => e.key === "Escape" && onClose();
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, onClose]);
	if (!open || !promo?.enabled) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[60] flex items-center justify-center bg-background/70 backdrop-blur-md p-4 animate-float-in",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-md bg-card border rounded-3xl shadow-2xl p-8 animate-pop-in",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					"aria-label": "Zamknij",
					className: "absolute top-4 right-4 p-2 rounded-full hover:bg-accent",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-3 select-none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KakobuyLogo, { size: 56 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs mb-5",
							children: t("promo.header")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl md:text-2xl font-bold leading-tight",
							children: promo.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground mt-3 leading-relaxed",
							children: promo.body
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: promo.cta_url,
					target: "_blank",
					rel: "noopener noreferrer",
					onClick: onClose,
					className: "mt-6 flex items-center justify-center gap-2 w-full text-center bg-litbuy text-litbuy-foreground py-3.5 rounded-full font-bold hover:brightness-110 transition",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KakobuyLogo, { size: 20 }), t("promo.cta")]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => {
						prefs.remindLater();
						onClose();
					},
					className: "mt-3 block w-full text-center text-xs text-muted-foreground hover:text-foreground transition",
					children: t("common.remind_later")
				})
			]
		})
	});
}
//#endregion
export { PromoPopup as n, useSiteConfig as r, DEFAULT_PROMO as t };
