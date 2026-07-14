import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { f as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as supabase, t as hasSupabaseConfig } from "./client-Zk1XYzmI.mjs";
import { t as useTranslation } from "../_libs/react-i18next.mjs";
import { n as Skeleton } from "./Skeleton-DRUH6KYf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sellers.index-BCtfBZgo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ratingColor(r) {
	if (r <= 3) return "bg-rating-low text-white";
	if (r <= 6) return "bg-rating-mid text-black";
	return "bg-rating-high text-white";
}
function SellersIndex() {
	const { t } = useTranslation();
	const [rows, setRows] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!hasSupabaseConfig()) {
			setRows([]);
			return;
		}
		supabase.from("sellers").select("id,slug,name,photo_url,best_for_brand,rating").order("rating", { ascending: false }).then(({ data }) => setRows(data ?? [])).catch(() => setRows([]));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl px-6 py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl font-bold mb-10",
			children: t("sellers.title")
		}), !rows ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid md:grid-cols-3 gap-6",
			children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-56" }, i))
		}) : rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground",
			children: "No sellers yet."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid md:grid-cols-3 gap-6",
			children: rows.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/sellers/$slug",
				params: { slug: s.slug },
				className: "border rounded-xl p-5 hover:shadow-lg transition bg-card animate-float-in",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-16 w-16 rounded-full bg-muted overflow-hidden",
							children: s.photo_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: s.photo_url,
								alt: s.name,
								className: "w-full h-full object-cover"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display font-bold",
								children: s.name
							}), s.best_for_brand && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									t("sellers.best_for"),
									": ",
									s.best_for_brand
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: `px-2 py-1 rounded text-xs font-bold ${ratingColor(s.rating)}`,
							children: [s.rating, "/10"]
						})
					]
				})
			}, s.id))
		})]
	});
}
//#endregion
export { SellersIndex as component };
