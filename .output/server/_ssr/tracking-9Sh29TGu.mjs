import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { f as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useTranslation } from "../_libs/react-i18next.mjs";
import { k as BookOpen, r as Truck } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tracking-9Sh29TGu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Tracking() {
	const { t } = useTranslation();
	const [nr, setNr] = (0, import_react.useState)("");
	const submit = (e) => {
		e.preventDefault();
		if (!nr.trim()) return;
		window.open(`https://t.17track.net/en#nums=${encodeURIComponent(nr.trim())}`, "_blank", "noopener,noreferrer");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl px-6 py-20 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto h-16 w-16 rounded-2xl bg-card border border-border flex items-center justify-center shadow-2xl animate-glow",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-7 w-7" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-6 font-display text-5xl font-bold",
				children: t("tracking.title")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted-foreground",
				children: t("tracking.subtitle")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "mt-10 flex items-center gap-2 rounded-full border border-border bg-card p-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: nr,
					onChange: (e) => setNr(e.target.value),
					placeholder: t("tracking.placeholder"),
					className: "flex-1 bg-transparent px-4 py-2 focus:outline-none text-base"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					className: "px-6 py-2.5 rounded-full bg-foreground text-background font-semibold hover:opacity-90 transition",
					children: t("tracking.cta")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/tutorials",
				className: "mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-4 w-4" }), t("tracking.help")]
			})
		]
	});
}
//#endregion
export { Tracking as component };
