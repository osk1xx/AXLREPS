import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as supabase, t as hasSupabaseConfig } from "./client-Zk1XYzmI.mjs";
import { t as useTranslation } from "../_libs/react-i18next.mjs";
import { E as ChevronLeft, T as ChevronRight } from "../_libs/lucide-react.mjs";
import { n as Skeleton } from "./Skeleton-DRUH6KYf.mjs";
import { t as Route } from "./tutorials._slug-C60evevE.mjs";
import { t as pickLang } from "./text-C7pVYd9y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tutorials._slug-B9OyDqsN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TutorialDetail() {
	const { slug } = Route.useParams();
	const { i18n } = useTranslation();
	const lang = i18n.language;
	const [title, setTitle] = (0, import_react.useState)(null);
	const [steps, setSteps] = (0, import_react.useState)(null);
	const [i, setI] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (!hasSupabaseConfig()) {
			setTitle({
				pl: "",
				en: ""
			});
			setSteps([]);
			return;
		}
		(async () => {
			try {
				const { data: tut } = await supabase.from("tutorials").select("id,title").eq("slug", slug).maybeSingle();
				if (!tut) {
					setTitle({
						pl: "",
						en: ""
					});
					setSteps([]);
					return;
				}
				setTitle(tut.title);
				const { data: st } = await supabase.from("tutorial_steps").select("id,step_index,title,body,image_urls,buttons").eq("tutorial_id", tut.id).order("step_index");
				setSteps(st ?? []);
			} catch {
				setTitle({
					pl: "",
					en: ""
				});
				setSteps([]);
			}
		})();
	}, [slug]);
	if (!steps || !title) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-3xl px-6 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-96" })
	});
	if (steps.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-3xl px-6 py-16",
		children: "Tutorial not found."
	});
	const s = steps[i];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-6 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-widest text-muted-foreground",
				children: pickLang(title, lang)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl font-bold mt-2 mb-6",
				children: pickLang(s.title, lang)
			}),
			s.image_urls?.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 mb-6",
				children: s.image_urls.map((u, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: u,
					alt: "",
					className: "rounded-lg border w-full"
				}, idx))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "prose prose-sm max-w-none whitespace-pre-wrap leading-relaxed",
				children: pickLang(s.body, lang)
			}),
			s.buttons?.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 flex flex-wrap gap-2",
				children: s.buttons.map((b, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: b.url,
					target: "_blank",
					rel: "noopener noreferrer",
					className: "px-4 py-2 rounded-md border hover:bg-accent",
					children: pickLang(b.label, lang)
				}, idx))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 flex items-center justify-between",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						disabled: i === 0,
						onClick: () => setI((v) => v - 1),
						className: "inline-flex items-center gap-1 px-4 py-2 rounded-md border disabled:opacity-40 hover:bg-accent",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" }), " Prev"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-sm text-muted-foreground",
						children: [
							"Step ",
							i + 1,
							" / ",
							steps.length
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						disabled: i === steps.length - 1,
						onClick: () => setI((v) => v + 1),
						className: "inline-flex items-center gap-1 px-4 py-2 rounded-md border disabled:opacity-40 hover:bg-accent",
						children: ["Next ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })]
					})
				]
			})
		]
	});
}
//#endregion
export { TutorialDetail as component };
