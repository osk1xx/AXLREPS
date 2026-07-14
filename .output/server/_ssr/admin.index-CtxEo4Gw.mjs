import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { m as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as adminUpsertGeneric, c as getAdminToken, i as adminSetConfig, n as adminDelete, o as adminUpsertProduct, s as clearAdminToken, t as adminCheck, u as useServerFn } from "./admin-session-BMAqXtyQ.mjs";
import { n as supabase } from "./client-Zk1XYzmI.mjs";
import { _ as LoaderCircle, a as Store, f as Plus, g as LogOut, h as Megaphone, i as Trash2, n as X, o as SquarePen, p as Package, u as Save, x as GraduationCap } from "../_libs/lucide-react.mjs";
import { r as useSiteConfig, t as DEFAULT_PROMO } from "./PromoPopup-SKwVVfpr.mjs";
import { n as categoryLabel, t as CATEGORIES } from "./categories-DhU2p8gY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.index-CtxEo4Gw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminPanel() {
	const nav = useNavigate();
	const check = useServerFn(adminCheck);
	const [ready, setReady] = (0, import_react.useState)(false);
	const [tab, setTab] = (0, import_react.useState)("products");
	(0, import_react.useEffect)(() => {
		const tok = getAdminToken();
		if (!tok) {
			nav({ to: "/admin/login" });
			return;
		}
		check({ data: { token: tok } }).then((r) => {
			if (!r.ok) {
				clearAdminToken();
				nav({ to: "/admin/login" });
				return;
			}
			setReady(true);
		});
	}, [check, nav]);
	const logout = () => {
		clearAdminToken();
		nav({ to: "/admin/login" });
	};
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "border-b bg-card",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl px-6 h-16 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-xl font-bold",
					children: "AxelReps · Panel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Zarządzaj produktami, sprzedawcami, poradnikami i promocją"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: logout,
					className: "inline-flex items-center gap-2 text-sm hover:text-destructive",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), " Wyloguj"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-6xl px-6 flex gap-1 overflow-x-auto",
				children: [
					{
						id: "products",
						label: "Produkty",
						icon: Package
					},
					{
						id: "sellers",
						label: "Sprzedawcy",
						icon: Store
					},
					{
						id: "tutorials",
						label: "Poradniki",
						icon: GraduationCap
					},
					{
						id: "promo",
						label: "Popup promocyjny",
						icon: Megaphone
					}
				].map((tb) => {
					const Icon = tb.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setTab(tb.id),
						className: `px-4 py-3 text-sm border-b-2 -mb-px whitespace-nowrap inline-flex items-center gap-2 transition ${tab === tb.id ? "border-litbuy text-foreground font-semibold" : "border-transparent text-muted-foreground hover:text-foreground"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" }), tb.label]
					}, tb.id);
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-6 py-8",
			children: [
				tab === "products" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductsAdmin, {}),
				tab === "sellers" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SellersAdmin, {}),
				tab === "tutorials" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TutorialsAdmin, {}),
				tab === "promo" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromoAdmin, {})
			]
		})]
	});
}
function ProductsAdmin() {
	const upsert = useServerFn(adminUpsertProduct);
	const del = useServerFn(adminDelete);
	const [rows, setRows] = (0, import_react.useState)([]);
	const emptyForm = {
		id: "",
		name: "",
		link: "",
		price_cny: "",
		image_url: "",
		category: "inne"
	};
	const [form, setForm] = (0, import_react.useState)(emptyForm);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const token = getAdminToken();
	const load = () => supabase.from("products").select("id,name,link,price_cny,image_url,category").order("created_at", { ascending: false }).then(({ data }) => setRows(data ?? []));
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	const save = async () => {
		if (!form.name.trim() || !form.link.trim()) return;
		setBusy(true);
		try {
			await upsert({ data: {
				token,
				product: {
					...form.id ? { id: form.id } : {},
					name: form.name.trim(),
					link: form.link.trim(),
					price_cny: form.price_cny ? Number(form.price_cny) : null,
					image_url: form.image_url.trim() || null,
					category: form.category || "inne"
				}
			} });
			setForm(emptyForm);
			load();
		} finally {
			setBusy(false);
		}
	};
	const edit = (r) => setForm({
		id: r.id,
		name: r.name,
		link: r.link,
		price_cny: r.price_cny != null ? String(r.price_cny) : "",
		image_url: r.image_url ?? "",
		category: r.category ?? "inne"
	});
	const remove = async (id) => {
		if (!confirm("Usunąć produkt?")) return;
		await del({ data: {
			token,
			table: "products",
			id
		} });
		load();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border rounded-2xl p-6 bg-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display font-bold text-lg",
						children: form.id ? "Edytuj produkt" : "Dodaj nowy produkt"
					}), form.id && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setForm(emptyForm),
						className: "inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" }), " Anuluj edycję"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid md:grid-cols-2 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "md:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs text-muted-foreground",
								children: "Nazwa produktu"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: form.name,
								onChange: (e) => setForm({
									...form,
									name: e.target.value
								}),
								className: "w-full px-3 py-2.5 border rounded-lg bg-background mt-1",
								placeholder: "np. Nike Tech Fleece"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "md:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs text-muted-foreground",
								children: "Link (Weidian / Taobao / 1688 / KakoBuy)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: form.link,
								onChange: (e) => setForm({
									...form,
									link: e.target.value
								}),
								className: "w-full px-3 py-2.5 border rounded-lg bg-background mt-1",
								placeholder: "https://..."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs text-muted-foreground",
							children: "Cena (CNY ¥)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							inputMode: "decimal",
							value: form.price_cny,
							onChange: (e) => setForm({
								...form,
								price_cny: e.target.value
							}),
							className: "w-full px-3 py-2.5 border rounded-lg bg-background mt-1",
							placeholder: "149"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs text-muted-foreground",
							children: "Kategoria"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: form.category,
							onChange: (e) => setForm({
								...form,
								category: e.target.value
							}),
							className: "w-full px-3 py-2.5 border rounded-lg bg-background mt-1",
							children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: c,
								children: categoryLabel(c)
							}, c))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "md:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs text-muted-foreground",
								children: "URL zdjęcia"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: form.image_url,
								onChange: (e) => setForm({
									...form,
									image_url: e.target.value
								}),
								className: "w-full px-3 py-2.5 border rounded-lg bg-background mt-1",
								placeholder: "https://..."
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					disabled: busy,
					onClick: save,
					className: "mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-litbuy text-litbuy-foreground font-bold disabled:opacity-50 hover:brightness-110 transition",
					children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : form.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), form.id ? "Zapisz zmiany" : "Dodaj produkt"]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border rounded-2xl overflow-hidden bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-secondary text-left",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "p-3",
							children: "Produkt"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "p-3",
							children: "Kategoria"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "p-3",
							children: "CNY"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "p-3" })
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					colSpan: 4,
					className: "p-8 text-center text-muted-foreground",
					children: "Brak produktów. Dodaj pierwszy powyżej."
				}) }), rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t hover:bg-accent/40 transition",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [r.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: r.image_url,
									alt: "",
									className: "h-12 w-12 object-cover rounded-lg border"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-medium",
									children: r.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: r.link,
									target: "_blank",
									rel: "noreferrer",
									className: "text-xs text-muted-foreground underline",
									children: "link"
								})] })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-3 text-muted-foreground",
							children: categoryLabel(r.category)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-3",
							children: r.price_cny ?? "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-end gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => edit(r),
									className: "p-2 hover:text-litbuy",
									title: "Edytuj",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "h-4 w-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => remove(r.id),
									className: "p-2 hover:text-destructive",
									title: "Usuń",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
								})]
							})
						})
					]
				}, r.id))] })]
			})
		})]
	});
}
function SellersAdmin() {
	const upsert = useServerFn(adminUpsertGeneric);
	const del = useServerFn(adminDelete);
	const token = getAdminToken();
	const [rows, setRows] = (0, import_react.useState)([]);
	const emptyForm = {
		id: "",
		name: "",
		bio_pl: "",
		best_for_brand: "",
		rating: "8",
		photo_url: "",
		photo1: "",
		photo2: "",
		photo3: ""
	};
	const [form, setForm] = (0, import_react.useState)(emptyForm);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const load = () => supabase.from("sellers").select("id,slug,name,photo_url,best_for_brand,rating,bio,product_photos").order("rating", { ascending: false }).then(({ data }) => setRows(data ?? []));
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	const save = async () => {
		if (!form.name.trim()) return;
		setBusy(true);
		try {
			const photos = [
				form.photo1,
				form.photo2,
				form.photo3
			].map((p) => p.trim()).filter(Boolean);
			const row = {
				name: form.name.trim(),
				best_for_brand: form.best_for_brand.trim() || null,
				rating: Math.min(10, Math.max(1, Number(form.rating) || 1)),
				bio: { pl: form.bio_pl },
				photo_url: form.photo_url.trim() || null,
				product_photos: photos
			};
			if (form.id) row.id = form.id;
			await upsert({ data: {
				token,
				table: "sellers",
				row
			} });
			setForm(emptyForm);
			load();
		} finally {
			setBusy(false);
		}
	};
	const edit = (s) => setForm({
		id: s.id,
		name: s.name,
		bio_pl: s.bio && s.bio.pl || "",
		best_for_brand: s.best_for_brand ?? "",
		rating: String(s.rating),
		photo_url: s.photo_url ?? "",
		photo1: s.product_photos?.[0] ?? "",
		photo2: s.product_photos?.[1] ?? "",
		photo3: s.product_photos?.[2] ?? ""
	});
	const remove = async (id) => {
		if (!confirm("Usunąć sprzedawcę?")) return;
		await del({ data: {
			token,
			table: "sellers",
			id
		} });
		load();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border rounded-2xl p-6 bg-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display font-bold text-lg",
						children: form.id ? "Edytuj sprzedawcę" : "Dodaj nowego sprzedawcę"
					}), form.id && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setForm(emptyForm),
						className: "inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" }), " Anuluj edycję"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid md:grid-cols-2 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs text-muted-foreground",
							children: "Nazwa sprzedawcy"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: form.name,
							onChange: (e) => setForm({
								...form,
								name: e.target.value
							}),
							className: "w-full px-3 py-2.5 border rounded-lg bg-background mt-1",
							placeholder: "np. Mr. Hou"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs text-muted-foreground",
							children: "Najlepsze dla (marki, np. Nike, Jordan)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: form.best_for_brand,
							onChange: (e) => setForm({
								...form,
								best_for_brand: e.target.value
							}),
							className: "w-full px-3 py-2.5 border rounded-lg bg-background mt-1",
							placeholder: "Nike, Jordan, Yeezy"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "md:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs text-muted-foreground",
								children: "Krótki opis"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: form.bio_pl,
								onChange: (e) => setForm({
									...form,
									bio_pl: e.target.value
								}),
								rows: 3,
								className: "w-full px-3 py-2.5 border rounded-lg bg-background mt-1",
								placeholder: "Krótki opis sprzedawcy…"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs text-muted-foreground",
							children: "Ocena (1–10)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							inputMode: "numeric",
							value: form.rating,
							onChange: (e) => setForm({
								...form,
								rating: e.target.value
							}),
							className: "w-full px-3 py-2.5 border rounded-lg bg-background mt-1",
							placeholder: "8"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs text-muted-foreground",
							children: "URL zdjęcia profilowego"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: form.photo_url,
							onChange: (e) => setForm({
								...form,
								photo_url: e.target.value
							}),
							className: "w-full px-3 py-2.5 border rounded-lg bg-background mt-1",
							placeholder: "https://..."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "md:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs text-muted-foreground",
								children: "3 zdjęcia referencyjne (URL)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid md:grid-cols-3 gap-2 mt-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: form.photo1,
										onChange: (e) => setForm({
											...form,
											photo1: e.target.value
										}),
										className: "px-3 py-2.5 border rounded-lg bg-background",
										placeholder: "Zdjęcie 1 URL"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: form.photo2,
										onChange: (e) => setForm({
											...form,
											photo2: e.target.value
										}),
										className: "px-3 py-2.5 border rounded-lg bg-background",
										placeholder: "Zdjęcie 2 URL"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: form.photo3,
										onChange: (e) => setForm({
											...form,
											photo3: e.target.value
										}),
										className: "px-3 py-2.5 border rounded-lg bg-background",
										placeholder: "Zdjęcie 3 URL"
									})
								]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					disabled: busy,
					onClick: save,
					className: "mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-litbuy text-litbuy-foreground font-bold disabled:opacity-50 hover:brightness-110 transition",
					children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : form.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), form.id ? "Zapisz zmiany" : "Dodaj sprzedawcę"]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border rounded-2xl overflow-hidden bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-secondary text-left",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "p-3",
							children: "Sprzedawca"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "p-3",
							children: "Najlepsze dla"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "p-3",
							children: "Ocena"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "p-3" })
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					colSpan: 4,
					className: "p-8 text-center text-muted-foreground",
					children: "Brak sprzedawców."
				}) }), rows.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t hover:bg-accent/40 transition",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [s.photo_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: s.photo_url,
									alt: "",
									className: "h-12 w-12 object-cover rounded-full border"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-medium",
									children: s.name
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-3 text-muted-foreground",
							children: s.best_for_brand || "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "p-3",
							children: [s.rating, "/10"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-end gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => edit(s),
									className: "p-2 hover:text-litbuy",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "h-4 w-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => remove(s.id),
									className: "p-2 hover:text-destructive",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
								})]
							})
						})
					]
				}, s.id))] })]
			})
		})]
	});
}
function TutorialsAdmin() {
	const upsert = useServerFn(adminUpsertGeneric);
	const del = useServerFn(adminDelete);
	const token = getAdminToken();
	const [rows, setRows] = (0, import_react.useState)([]);
	const [selected, setSelected] = (0, import_react.useState)(null);
	const load = () => supabase.from("tutorials").select("id,slug,title,description,cover_url,is_published").order("created_at", { ascending: false }).then(({ data }) => setRows(data ?? []));
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	const emptyForm = {
		id: "",
		title_pl: "",
		description_pl: "",
		cover_url: "",
		is_published: true
	};
	const [form, setForm] = (0, import_react.useState)(emptyForm);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const save = async () => {
		if (!form.title_pl.trim()) return;
		setBusy(true);
		try {
			const row = {
				title: { pl: form.title_pl },
				description: { pl: form.description_pl },
				cover_url: form.cover_url.trim() || null,
				is_published: form.is_published
			};
			if (form.id) row.id = form.id;
			await upsert({ data: {
				token,
				table: "tutorials",
				row
			} });
			setForm(emptyForm);
			load();
		} finally {
			setBusy(false);
		}
	};
	const edit = (t) => setForm({
		id: t.id,
		title_pl: t.title?.pl ?? "",
		description_pl: t.description?.pl ?? "",
		cover_url: t.cover_url ?? "",
		is_published: t.is_published
	});
	const remove = async (id) => {
		if (!confirm("Usunąć poradnik i wszystkie jego kroki?")) return;
		await del({ data: {
			token,
			table: "tutorials",
			id
		} });
		if (selected?.id === id) setSelected(null);
		load();
	};
	if (selected) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepsEditor, {
		tutorial: selected,
		onBack: () => {
			setSelected(null);
			load();
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border rounded-2xl p-6 bg-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display font-bold text-lg",
						children: form.id ? "Edytuj poradnik" : "Dodaj nowy poradnik"
					}), form.id && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setForm(emptyForm),
						className: "inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" }), " Anuluj edycję"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid md:grid-cols-2 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "md:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs text-muted-foreground",
								children: "Tytuł poradnika"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: form.title_pl,
								onChange: (e) => setForm({
									...form,
									title_pl: e.target.value
								}),
								className: "w-full px-3 py-2.5 border rounded-lg bg-background mt-1"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "md:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs text-muted-foreground",
								children: "Krótki opis"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: form.description_pl,
								onChange: (e) => setForm({
									...form,
									description_pl: e.target.value
								}),
								rows: 2,
								className: "w-full px-3 py-2.5 border rounded-lg bg-background mt-1"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs text-muted-foreground",
							children: "URL okładki"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: form.cover_url,
							onChange: (e) => setForm({
								...form,
								cover_url: e.target.value
							}),
							className: "w-full px-3 py-2.5 border rounded-lg bg-background mt-1",
							placeholder: "https://..."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 mt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								className: "osk-check",
								checked: form.is_published,
								onChange: (e) => setForm({
									...form,
									is_published: e.target.checked
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm",
								children: "Opublikowany"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					disabled: busy,
					onClick: save,
					className: "mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-litbuy text-litbuy-foreground font-bold disabled:opacity-50 hover:brightness-110 transition",
					children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : form.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), form.id ? "Zapisz zmiany" : "Dodaj poradnik"]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border rounded-2xl overflow-hidden bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-secondary text-left",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "p-3",
							children: "Poradnik"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "p-3",
							children: "Slug"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "p-3",
							children: "Status"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "p-3" })
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					colSpan: 4,
					className: "p-8 text-center text-muted-foreground",
					children: "Brak poradników."
				}) }), rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t hover:bg-accent/40 transition",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-3 font-medium",
							children: r.title?.pl || "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-3 text-xs text-muted-foreground",
							children: r.slug
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-3",
							children: r.is_published ? "Publiczny" : "Szkic"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-end gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setSelected(r),
										className: "px-3 py-1.5 rounded-md border text-xs hover:bg-accent",
										children: "Kroki"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => edit(r),
										className: "p-2 hover:text-litbuy",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "h-4 w-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => remove(r.id),
										className: "p-2 hover:text-destructive",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
									})
								]
							})
						})
					]
				}, r.id))] })]
			})
		})]
	});
}
function StepsEditor({ tutorial, onBack }) {
	const upsert = useServerFn(adminUpsertGeneric);
	const del = useServerFn(adminDelete);
	const token = getAdminToken();
	const [steps, setSteps] = (0, import_react.useState)([]);
	const emptyForm = {
		id: "",
		step_index: "1",
		title_pl: "",
		body_pl: "",
		image_url: "",
		btn_label_pl: "",
		btn_url: ""
	};
	const [form, setForm] = (0, import_react.useState)(emptyForm);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const load = () => supabase.from("tutorial_steps").select("id,tutorial_id,step_index,title,body,image_urls,buttons").eq("tutorial_id", tutorial.id).order("step_index").then(({ data }) => setSteps(data ?? []));
	(0, import_react.useEffect)(() => {
		load();
	}, [tutorial.id]);
	const save = async () => {
		if (!form.title_pl.trim()) return;
		setBusy(true);
		try {
			const buttons = form.btn_url.trim() ? [{
				label: { pl: form.btn_label_pl.trim() || "Otwórz" },
				url: form.btn_url.trim()
			}] : [];
			const row = {
				tutorial_id: tutorial.id,
				step_index: Number(form.step_index) || 1,
				title: { pl: form.title_pl },
				body: { pl: form.body_pl },
				image_urls: form.image_url.trim() ? [form.image_url.trim()] : [],
				buttons
			};
			if (form.id) row.id = form.id;
			await upsert({ data: {
				token,
				table: "tutorial_steps",
				row
			} });
			setForm({
				...emptyForm,
				step_index: String((Number(form.step_index) || 1) + 1)
			});
			load();
		} finally {
			setBusy(false);
		}
	};
	const edit = (s) => setForm({
		id: s.id,
		step_index: String(s.step_index),
		title_pl: s.title?.pl ?? "",
		body_pl: s.body?.pl ?? "",
		image_url: s.image_urls?.[0] ?? "",
		btn_label_pl: s.buttons?.[0]?.label?.pl ?? "",
		btn_url: s.buttons?.[0]?.url ?? ""
	});
	const remove = async (id) => {
		if (!confirm("Usunąć krok?")) return;
		await del({ data: {
			token,
			table: "tutorial_steps",
			id
		} });
		load();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center justify-between",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onBack,
					className: "text-xs text-muted-foreground hover:text-foreground",
					children: "← Wróć do poradników"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "font-display font-bold text-lg mt-1",
					children: ["Kroki: ", tutorial.title?.pl]
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border rounded-2xl p-6 bg-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display font-bold",
							children: form.id ? "Edytuj krok" : "Dodaj nowy krok"
						}), form.id && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setForm(emptyForm),
							className: "inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" }), " Anuluj edycję"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid md:grid-cols-2 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs text-muted-foreground",
								children: "Numer kroku"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								inputMode: "numeric",
								value: form.step_index,
								onChange: (e) => setForm({
									...form,
									step_index: e.target.value
								}),
								className: "w-full px-3 py-2.5 border rounded-lg bg-background mt-1"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs text-muted-foreground",
								children: "Tytuł kroku"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: form.title_pl,
								onChange: (e) => setForm({
									...form,
									title_pl: e.target.value
								}),
								className: "w-full px-3 py-2.5 border rounded-lg bg-background mt-1"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "md:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs text-muted-foreground",
									children: "Treść"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: form.body_pl,
									onChange: (e) => setForm({
										...form,
										body_pl: e.target.value
									}),
									rows: 4,
									className: "w-full px-3 py-2.5 border rounded-lg bg-background mt-1"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "md:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs text-muted-foreground",
									children: "Zdjęcie do kroku (URL)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: form.image_url,
									onChange: (e) => setForm({
										...form,
										image_url: e.target.value
									}),
									className: "w-full px-3 py-2.5 border rounded-lg bg-background mt-1",
									placeholder: "https://..."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs text-muted-foreground",
								children: "Etykieta przycisku"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: form.btn_label_pl,
								onChange: (e) => setForm({
									...form,
									btn_label_pl: e.target.value
								}),
								className: "w-full px-3 py-2.5 border rounded-lg bg-background mt-1",
								placeholder: "np. Otwórz link"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs text-muted-foreground",
								children: "Link przycisku"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: form.btn_url,
								onChange: (e) => setForm({
									...form,
									btn_url: e.target.value
								}),
								className: "w-full px-3 py-2.5 border rounded-lg bg-background mt-1",
								placeholder: "https://..."
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						disabled: busy,
						onClick: save,
						className: "mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-litbuy text-litbuy-foreground font-bold disabled:opacity-50 hover:brightness-110 transition",
						children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : form.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), form.id ? "Zapisz krok" : "Dodaj krok"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border rounded-2xl overflow-hidden bg-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-secondary text-left",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-3",
								children: "#"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-3",
								children: "Tytuł"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-3",
								children: "Zdjęcie"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-3",
								children: "Przycisk"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "p-3" })
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [steps.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 5,
						className: "p-8 text-center text-muted-foreground",
						children: "Brak kroków."
					}) }), steps.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t hover:bg-accent/40 transition",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "p-3",
								children: s.step_index
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "p-3 font-medium",
								children: s.title?.pl || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "p-3",
								children: s.image_urls?.[0] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: s.image_urls[0],
									alt: "",
									className: "h-10 w-10 object-cover rounded"
								}) : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "p-3 text-xs text-muted-foreground",
								children: s.buttons?.[0]?.url ? "✓" : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "p-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-end gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => edit(s),
										className: "p-2 hover:text-litbuy",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "h-4 w-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => remove(s.id),
										className: "p-2 hover:text-destructive",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
									})]
								})
							})
						]
					}, s.id))] })]
				})
			})
		]
	});
}
function PromoAdmin() {
	const setConfig = useServerFn(adminSetConfig);
	const { value: promo, loading } = useSiteConfig("promo_popup", DEFAULT_PROMO);
	const [form, setForm] = (0, import_react.useState)(DEFAULT_PROMO);
	const [saved, setSaved] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const token = getAdminToken();
	(0, import_react.useEffect)(() => {
		if (!loading) setForm({
			...DEFAULT_PROMO,
			...promo
		});
	}, [loading, promo]);
	const save = async () => {
		setBusy(true);
		try {
			await setConfig({ data: {
				token,
				key: "promo_popup",
				value: form
			} });
			setSaved(true);
			setTimeout(() => setSaved(false), 2e3);
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display font-bold text-lg mb-2",
				children: "Popup promocyjny KakoBuy"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground mb-6",
				children: "Edytuj wygląd i treść popupu który widzą użytkownicy. Wszystko jest już po polsku — bez JSON-a, tylko zwykłe pola."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border rounded-2xl p-6 bg-card space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center justify-between gap-4 pb-4 border-b",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-medium",
							children: "Popup włączony"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground",
							children: "Wyłącz, aby ukryć popup na całej stronie."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: form.enabled,
							onChange: (e) => setForm({
								...form,
								enabled: e.target.checked
							}),
							className: "osk-check"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs uppercase tracking-wider text-muted-foreground",
						children: "Tytuł"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: form.title,
						onChange: (e) => setForm({
							...form,
							title: e.target.value
						}),
						className: "w-full mt-1 px-3 py-2.5 border rounded-lg bg-background"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs uppercase tracking-wider text-muted-foreground",
						children: "Treść"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: form.body,
						onChange: (e) => setForm({
							...form,
							body: e.target.value
						}),
						rows: 5,
						className: "w-full mt-1 px-3 py-2.5 border rounded-lg bg-background"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs uppercase tracking-wider text-muted-foreground",
						children: "Link przycisku"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: form.cta_url,
						onChange: (e) => setForm({
							...form,
							cta_url: e.target.value
						}),
						className: "w-full mt-1 px-3 py-2.5 border rounded-lg bg-background font-mono text-xs"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						disabled: busy,
						onClick: save,
						className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-litbuy text-litbuy-foreground font-bold disabled:opacity-50 hover:brightness-110 transition",
						children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), saved ? "Zapisano ✓" : "Zapisz zmiany"]
					})
				]
			})
		]
	});
}
//#endregion
export { AdminPanel as component };
