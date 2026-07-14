import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { m as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as setAdminToken, r as adminLogin, u as useServerFn } from "./admin-session-BMAqXtyQ.mjs";
import { t as useTranslation } from "../_libs/react-i18next.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.login-BcslHv_x.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminLogin() {
	const { t } = useTranslation();
	const nav = useNavigate();
	const login = useServerFn(adminLogin);
	const [pin, setPin] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [err, setErr] = (0, import_react.useState)("");
	const submit = async (e) => {
		e.preventDefault();
		setBusy(true);
		setErr("");
		try {
			const r = await login({ data: { pin } });
			if (!r.ok) {
				setErr(t("admin.wrong"));
				return;
			}
			setAdminToken(r.token);
			nav({ to: "/admin" });
		} catch {
			setErr(t("admin.wrong"));
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center px-6 bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			className: "w-full max-w-sm border rounded-3xl p-8 bg-card shadow-xl animate-pop-in",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl font-bold mb-6 text-center",
					children: t("admin.login")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "text-xs uppercase tracking-wider text-muted-foreground",
					children: t("admin.pin")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "password",
					autoFocus: true,
					value: pin,
					onChange: (e) => setPin(e.target.value),
					className: "w-full mt-1 mb-4 px-3 py-3 rounded-xl border bg-background text-center tracking-[0.4em] font-mono",
					placeholder: "••••••"
				}),
				err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-destructive mb-3 text-center",
					children: err
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					disabled: busy,
					className: "w-full py-2.5 rounded-full bg-foreground text-background font-medium disabled:opacity-50",
					children: busy ? "…" : t("admin.sign_in")
				})
			]
		})
	});
}
//#endregion
export { AdminLogin as component };
