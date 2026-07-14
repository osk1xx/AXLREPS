import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { f as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as supabase, t as hasSupabaseConfig } from "./client-Zk1XYzmI.mjs";
import { t as useTranslation } from "../_libs/react-i18next.mjs";
import { n as Skeleton } from "./Skeleton-DRUH6KYf.mjs";
import { t as pickLang } from "./text-C7pVYd9y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tutorials.index-BnW2_2HT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TutorialsIndex() {
	const { t, i18n } = useTranslation();
	const [rows, setRows] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!hasSupabaseConfig()) {
			setRows([]);
			return;
		}
		supabase.from("tutorials").select("id,slug,title,description,cover_url").eq("is_published", true).then(({ data }) => setRows(data ?? [])).catch(() => setRows([]));
	}, []);
	const lang = i18n.language;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl px-6 py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl font-bold mb-10",
			children: t("tutorials.title")
		}), !rows ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid md:grid-cols-3 gap-6",
			children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-64" }, i))
		}) : rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground",
			children: "No tutorials yet."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid md:grid-cols-3 gap-6",
			children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/tutorials/$slug",
				params: { slug: r.slug },
				className: "group border rounded-xl overflow-hidden hover:shadow-lg transition animate-float-in bg-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "aspect-video bg-muted overflow-hidden",
					children: r.cover_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: r.cover_url,
						alt: "",
						className: "w-full h-full object-cover group-hover:scale-105 transition"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display font-bold text-lg",
						children: pickLang(r.title, lang)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground mt-2 line-clamp-3",
						children: pickLang(r.description, lang)
					})]
				})]
			}, r.id))
		})]
	});
}
//#endregion
export { TutorialsIndex as component };
