import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as supabase, t as hasSupabaseConfig } from "./client-Zk1XYzmI.mjs";
import { t as useTranslation } from "../_libs/react-i18next.mjs";
import { n as Skeleton } from "./Skeleton-DRUH6KYf.mjs";
import { t as Route } from "./sellers._slug-BvIuERZU.mjs";
import { t as pickLang } from "./text-C7pVYd9y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sellers._slug-q4Ylg_HY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ratingColor(r) {
	if (r <= 3) return "bg-rating-low text-white";
	if (r <= 6) return "bg-rating-mid text-black";
	return "bg-rating-high text-white";
}
function SellerDetail() {
	const { slug } = Route.useParams();
	const { t, i18n } = useTranslation();
	const [s, setS] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!hasSupabaseConfig()) {
			setS(false);
			return;
		}
		supabase.from("sellers").select("id,name,photo_url,best_for_brand,rating,bio,product_photos").eq("slug", slug).maybeSingle().then(({ data }) => setS(data ? data : false)).catch(() => setS(false));
	}, [slug]);
	if (s === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-3xl px-6 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-80" })
	});
	if (s === false) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-3xl px-6 py-16",
		children: "Seller not found."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-6 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-28 w-28 rounded-full bg-muted overflow-hidden border",
					children: s.photo_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: s.photo_url,
						alt: s.name,
						className: "w-full h-full object-cover"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl font-bold",
						children: s.name
					}),
					s.best_for_brand && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted-foreground mt-1",
						children: [
							t("sellers.best_for"),
							": ",
							s.best_for_brand
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: `inline-block mt-3 px-3 py-1 rounded text-sm font-bold ${ratingColor(s.rating)}`,
						children: [
							t("sellers.rating"),
							": ",
							s.rating,
							"/10"
						]
					})
				] })]
			}),
			pickLang(s.bio, i18n.language) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 leading-relaxed whitespace-pre-wrap",
				children: pickLang(s.bio, i18n.language)
			}),
			s.product_photos?.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid grid-cols-3 gap-4",
				children: s.product_photos.slice(0, 3).map((u, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: u,
					alt: "",
					className: "aspect-square w-full object-cover rounded-lg border"
				}, i))
			})
		]
	});
}
//#endregion
export { SellerDetail as component };
