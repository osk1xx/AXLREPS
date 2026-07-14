import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as useTranslation } from "../_libs/react-i18next.mjs";
import { l as Search, y as ImageOff } from "../_libs/lucide-react.mjs";
import { n as Skeleton } from "./Skeleton-DRUH6KYf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/qc-ZihUYK9c.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function QC() {
	const { t } = useTranslation();
	const [link, setLink] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [images, setImages] = (0, import_react.useState)(null);
	const [touched, setTouched] = (0, import_react.useState)(false);
	const [unavailable, setUnavailable] = (0, import_react.useState)(false);
	const submit = async (e) => {
		e.preventDefault();
		if (!link.trim()) return;
		setUnavailable(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-4xl px-6 py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/60 text-xs",
						children: t("qc.eyebrow")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-6 font-display text-5xl md:text-6xl font-bold leading-tight",
						children: [
							t("qc.title_1"),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							t("qc.title_2")
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-muted-foreground max-w-lg mx-auto",
						children: t("qc.subtitle")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "mt-12 flex items-center gap-2 rounded-full border border-border bg-card p-2 shadow-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: link,
					onChange: (e) => setLink(e.target.value),
					placeholder: t("qc.placeholder"),
					className: "flex-1 bg-transparent px-4 py-2 focus:outline-none text-sm"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "submit",
					disabled: loading,
					className: "inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 font-semibold text-sm hover:opacity-90 transition disabled:opacity-60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4" }), t("qc.cta")]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12",
				children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 md:grid-cols-4 gap-4",
					children: Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "aspect-square rounded-2xl" }, i))
				}) : !touched ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { label: t("qc.empty") }) : images && images.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 md:grid-cols-4 gap-4",
					children: images.map((img, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: img.url,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "relative block aspect-square rounded-2xl overflow-hidden border border-border group animate-float-in bg-card",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: img.url,
							alt: "",
							loading: "lazy",
							className: "w-full h-full object-cover group-hover:scale-105 transition"
						})
					}, img.url + i))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { label: t("qc.no_results") })
			}),
			unavailable && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 grid place-items-center bg-background/80 px-6 backdrop-blur-sm",
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": "qc-unavailable-title",
				onClick: () => setUnavailable(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md rounded-3xl border border-border bg-card p-8 text-center shadow-2xl animate-pop-in",
					onClick: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageOff, { className: "mx-auto h-10 w-10 text-litbuy" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "qc-unavailable-title",
							className: "mt-5 font-display text-2xl font-bold",
							children: "QC Finder w przygotowaniu"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed text-muted-foreground",
							children: "Jeszcze pracujemy nad QC Finderem. Funkcja będzie dostępna już wkrótce."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setUnavailable(false),
							className: "mt-7 w-full rounded-full bg-foreground px-5 py-3 font-semibold text-background transition hover:opacity-90",
							children: "Rozumiem"
						})
					]
				})
			})
		]
	});
}
function EmptyState({ label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-3xl border border-border bg-card/40 py-20 flex flex-col items-center justify-center text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageOff, { className: "h-8 w-8 mb-3 opacity-60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm",
			children: label
		})]
	});
}
//#endregion
export { QC as component };
