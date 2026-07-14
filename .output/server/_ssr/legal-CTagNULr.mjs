import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as useTranslation } from "../_libs/react-i18next.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/legal-CTagNULr.js
var import_jsx_runtime = require_jsx_runtime();
function Legal() {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-6 py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl font-bold mb-8",
			children: t("legal.title")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "whitespace-pre-wrap leading-relaxed text-sm text-muted-foreground",
			children: t("legal.body")
		})]
	});
}
//#endregion
export { Legal as component };
