import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { a as useRouterState, c as Outlet, d as createRootRouteWithContext, f as Link, g as useRouter, i as HeadContent, l as lazyRouteComponent, p as require_react_dom, r as Scripts, s as createRouter, u as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as usePreferences, t as CURRENCIES } from "./preferences-BWCVYk4L.mjs";
import { t as KakobuyLogo } from "./LitBuyLogo-D5ELNQH3.mjs";
import { t as useTranslation } from "../_libs/react-i18next.mjs";
import { S as Gift, a as Store, b as House, c as Settings, d as Puzzle, l as Search, m as Menu, n as X, p as Package, r as Truck, x as GraduationCap } from "../_libs/lucide-react.mjs";
import { n as PromoPopup } from "./PromoPopup-SKwVVfpr.mjs";
import { t as content_png_asset_default } from "./content.png.asset-CUT0zvIv.mjs";
import { t as Route$11 } from "./tutorials._slug-C60evevE.mjs";
import { t as Route$12 } from "./sellers._slug-BvIuERZU.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-zHD-6txV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_react_dom = require_react_dom();
var styles_default = "/assets/styles-D0ncRG0g.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function SettingsMenu() {
	const { t } = useTranslation();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [mounted, setMounted] = (0, import_react.useState)(false);
	const prefs = usePreferences();
	(0, import_react.useEffect)(() => {
		setMounted(true);
	}, []);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => e.key === "Escape" && setOpen(false);
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	const modal = open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/70 backdrop-blur-md animate-float-in",
		onClick: () => setOpen(false),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md bg-card border rounded-3xl shadow-2xl p-7 animate-pop-in",
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mb-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-xl font-bold",
					children: t("settings.title")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setOpen(false),
					className: "p-1.5 hover:bg-accent rounded-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "text-xs uppercase tracking-wider text-muted-foreground mb-2 block",
					children: t("settings.currency")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-2",
					children: CURRENCIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => prefs.setCurrency(c),
						className: `px-3 py-3 rounded-xl border text-sm font-semibold transition ${prefs.currency === c ? "bg-foreground text-background border-foreground" : "hover:bg-accent"}`,
						children: c
					}, c))
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center justify-between gap-3 text-sm cursor-pointer pt-4 border-t",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("settings.turn_off_promo") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: prefs.promoOff,
						onChange: (e) => prefs.setPromoOff(e.target.checked),
						className: "osk-check"
					})]
				})]
			})]
		})
	}) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick: () => setOpen(true),
		"aria-label": "Ustawienia",
		className: "p-2 rounded-full hover:bg-accent transition",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-5 w-5" })
	}), mounted && modal ? (0, import_react_dom.createPortal)(modal, document.body) : null] });
}
var links = [
	{
		to: "/",
		key: "nav.home",
		icon: House,
		exact: true
	},
	{
		to: "/qc",
		key: "nav.qc",
		icon: Search
	},
	{
		to: "/products",
		key: "nav.products",
		icon: Package
	},
	{
		to: "/tutorials",
		key: "nav.tutorials",
		icon: GraduationCap
	},
	{
		to: "/sellers",
		key: "nav.sellers",
		icon: Store
	},
	{
		to: "/wtyczka",
		key: "nav.wtyczka",
		icon: Puzzle
	},
	{
		to: "/tracking",
		key: "nav.tracking",
		icon: Truck
	}
];
function Header() {
	const { t } = useTranslation();
	const path = useRouterState({ select: (s) => s.location.pathname });
	const [promoOpen, setPromoOpen] = (0, import_react.useState)(false);
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setMobileOpen(false);
	}, [path]);
	const isActive = (to, exact) => exact ? path === to : path === to || path.startsWith(to + "/");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40 bg-background/85 backdrop-blur border-b border-border/60",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 md:px-6 h-16 flex items-center gap-3 md:gap-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "font-display font-bold text-sm md:text-base flex items-center gap-2 whitespace-nowrap",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "AxelReps" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-litbuy/80 mx-1 font-normal",
							children: "×"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KakobuyLogo, { size: 22 })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden lg:flex items-center gap-0.5 flex-1 justify-center",
					children: links.map((l) => {
						const active = isActive(l.to, "exact" in l ? l.exact : false);
						const Icon = l.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: l.to,
							className: `relative px-3 py-2 text-sm rounded-full transition inline-flex items-center gap-1.5 ${active ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" }),
								t(l.key),
								active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute left-3 right-3 -bottom-[10px] h-[2px] rounded-full bg-litbuy shadow-[0_0_10px_var(--litbuy)] animate-nav-underline" })
							]
						}, l.to);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 lg:hidden" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setPromoOpen(true),
					className: "hidden sm:inline-flex items-center gap-2 rounded-full bg-litbuy px-3 md:px-4 py-2 text-sm font-bold text-litbuy-foreground hover:brightness-110 transition",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KakobuyLogo, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden md:inline",
						children: t("nav.register")
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsMenu, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					"aria-label": t("common.menu"),
					onClick: () => setMobileOpen((v) => !v),
					className: "lg:hidden p-2 rounded-full hover:bg-accent transition",
					children: mobileOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
				})
			]
		}), mobileOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "lg:hidden border-t border-border/60 bg-background/95 backdrop-blur animate-float-in",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "mx-auto max-w-7xl px-4 py-3 grid grid-cols-2 gap-2",
				children: links.map((l) => {
					const active = isActive(l.to, "exact" in l ? l.exact : false);
					const Icon = l.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: l.to,
						className: `inline-flex items-center gap-2 px-3 py-2.5 rounded-2xl text-sm transition ${active ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-accent/60"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" }), t(l.key)]
					}, l.to);
				})
			})
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromoPopup, {
		open: promoOpen,
		onClose: () => setPromoOpen(false)
	})] });
}
function Footer() {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "mt-24 border-t",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row gap-4 items-center justify-between text-sm text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "leading-relaxed text-center md:text-left",
				children: "© 2026 AxelReps × KakoBuy. Wszelkie prawa zastrzeżone."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/legal",
				className: "inline-flex items-center rounded-full border border-foreground/20 px-4 py-2 text-foreground hover:bg-foreground hover:text-background transition",
				children: t("legal.button")
			})]
		})
	});
}
function GiftFAB() {
	const [open, setOpen] = (0, import_react.useState)(false);
	if (useRouterState({ select: (s) => s.location.pathname }) === "/") return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick: () => setOpen(true),
		"aria-label": "Get a gift",
		className: "fixed bottom-6 left-6 z-40 h-14 w-14 rounded-full bg-litbuy text-litbuy-foreground flex items-center justify-center shadow-xl gift-pulse hover:scale-110 transition",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "h-6 w-6" })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromoPopup, {
		open,
		onClose: () => setOpen(false)
	})] });
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Nie znaleziono strony."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/",
					className: "mt-6 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground",
					children: "Wróć na start"
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "root" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold",
					children: "Ta strona się nie załadowała"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Coś poszło nie tak."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground",
						children: "Spróbuj ponownie"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "rounded-md border px-4 py-2 text-sm",
						children: "Wróć na start"
					})]
				})
			]
		})
	});
}
var Route$10 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "AxelReps × KakoBuy — chińskie repliki, QC i tracking" },
			{
				name: "description",
				content: "AxelReps × KakoBuy — niezależny hub o rynku replik. Szybkie QC, sprawdzone produkty, śledzenie paczek i tańsze haule."
			},
			{
				property: "og:title",
				content: "AxelReps × KakoBuy — chińskie repliki, QC i tracking"
			},
			{
				property: "og:description",
				content: "Znajdź, sprawdź QC i śledź paczki z KakoBuy — wszystko w jednym miejscu."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "pl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$10.useRouteContext();
	const isAdmin = useRouter().state.location.pathname.startsWith("/admin");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [
			!isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "min-h-[60vh]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			}),
			!isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
			!isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GiftFAB, {})
		]
	});
}
var $$splitComponentImporter$9 = () => import("./wtyczka-D1ZPw6oh.mjs");
var Route$9 = createFileRoute("/wtyczka")({
	component: lazyRouteComponent($$splitComponentImporter$9, "component"),
	head: () => ({ meta: [
		{ title: "AxelReps — KakoBuy Tools · nasza wtyczka do Chrome" },
		{
			name: "description",
			content: "AxelReps – KakoBuy Tools to darmowa wtyczka do Chrome, która konwertuje linki z 1688, Taobao i Weidian prosto na KakoBuy i pokazuje przewidywaną datę dostawy paczki."
		},
		{
			property: "og:image",
			content: content_png_asset_default.url
		}
	] })
});
var $$splitComponentImporter$8 = () => import("./tracking-9Sh29TGu.mjs");
var Route$8 = createFileRoute("/tracking")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./qc-ZihUYK9c.mjs");
var Route$7 = createFileRoute("/qc")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./products-DefoHm1h.mjs");
var Route$6 = createFileRoute("/products")({
	component: lazyRouteComponent($$splitComponentImporter$6, "component"),
	head: () => ({ meta: [{ title: "Produkty — AxelReps × KakoBuy" }, {
		name: "description",
		content: "Sprawdzone repliki z KakoBuy — bluzy, koszulki, kurtki i więcej. Filtruj i sortuj po kategorii i cenie."
	}] })
});
var $$splitComponentImporter$5 = () => import("./legal-CTagNULr.mjs");
var Route$5 = createFileRoute("/legal")({
	component: lazyRouteComponent($$splitComponentImporter$5, "component"),
	head: () => ({ meta: [{ title: "Nota prawna — AxelReps × KakoBuy" }, {
		name: "description",
		content: "Nota prawna serwisu AxelReps."
	}] })
});
var $$splitComponentImporter$4 = () => import("./routes-BXBq81Tc.mjs");
var Route$4 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./tutorials.index-BnW2_2HT.mjs");
var Route$3 = createFileRoute("/tutorials/")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./sellers.index-BCtfBZgo.mjs");
var Route$2 = createFileRoute("/sellers/")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./admin.index-CtxEo4Gw.mjs");
var Route$1 = createFileRoute("/admin/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./admin.login-BcslHv_x.mjs");
var Route = createFileRoute("/admin/login")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var WtyczkaRoute = Route$9.update({
	id: "/wtyczka",
	path: "/wtyczka",
	getParentRoute: () => Route$10
});
var TrackingRoute = Route$8.update({
	id: "/tracking",
	path: "/tracking",
	getParentRoute: () => Route$10
});
var QcRoute = Route$7.update({
	id: "/qc",
	path: "/qc",
	getParentRoute: () => Route$10
});
var ProductsRoute = Route$6.update({
	id: "/products",
	path: "/products",
	getParentRoute: () => Route$10
});
var LegalRoute = Route$5.update({
	id: "/legal",
	path: "/legal",
	getParentRoute: () => Route$10
});
var IndexRoute = Route$4.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$10
});
var TutorialsIndexRoute = Route$3.update({
	id: "/tutorials/",
	path: "/tutorials/",
	getParentRoute: () => Route$10
});
var SellersIndexRoute = Route$2.update({
	id: "/sellers/",
	path: "/sellers/",
	getParentRoute: () => Route$10
});
var AdminIndexRoute = Route$1.update({
	id: "/admin/",
	path: "/admin/",
	getParentRoute: () => Route$10
});
var TutorialsSlugRoute = Route$11.update({
	id: "/tutorials/$slug",
	path: "/tutorials/$slug",
	getParentRoute: () => Route$10
});
var SellersSlugRoute = Route$12.update({
	id: "/sellers/$slug",
	path: "/sellers/$slug",
	getParentRoute: () => Route$10
});
var rootRouteChildren = {
	IndexRoute,
	LegalRoute,
	ProductsRoute,
	QcRoute,
	TrackingRoute,
	WtyczkaRoute,
	AdminLoginRoute: Route.update({
		id: "/admin/login",
		path: "/admin/login",
		getParentRoute: () => Route$10
	}),
	SellersSlugRoute,
	TutorialsSlugRoute,
	AdminIndexRoute,
	SellersIndexRoute,
	TutorialsIndexRoute
};
var routeTree = Route$10._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
