import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as formatPrice, r as usePreferences } from "./preferences-BWCVYk4L.mjs";
import { t as KakobuyLogo } from "./LitBuyLogo-D5ELNQH3.mjs";
import { t as useTranslation } from "../_libs/react-i18next.mjs";
import { C as ExternalLink } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ProductCard-BJ8fN98g.js
var import_jsx_runtime = require_jsx_runtime();
function ProductCard({ p }) {
	const { t } = useTranslation();
	const prefs = usePreferences();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "group border rounded-xl overflow-hidden bg-card hover:shadow-lg transition animate-float-in flex flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative aspect-square bg-muted overflow-hidden",
			children: p.image_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: p.image_url,
				alt: p.name,
				loading: "lazy",
				className: "w-full h-full object-cover group-hover:scale-105 transition duration-500"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-full h-full flex items-center justify-center text-muted-foreground text-xs",
				children: "brak zdjęcia"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4 space-y-3 flex-1 flex flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-medium leading-tight line-clamp-2 min-h-[2.5em]",
					children: p.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-between",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-lg font-bold",
						children: formatPrice(p.price_cny, prefs.currency)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: p.link,
					target: "_blank",
					rel: "noopener noreferrer",
					className: "mt-auto w-full inline-flex items-center justify-center gap-2 bg-litbuy text-litbuy-foreground py-2.5 rounded-full text-sm font-bold hover:brightness-110 transition",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KakobuyLogo, { size: 16 }),
						" ",
						t("product.buy"),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3.5 w-3.5" })
					]
				})
			]
		})]
	});
}
//#endregion
export { ProductCard as t };
