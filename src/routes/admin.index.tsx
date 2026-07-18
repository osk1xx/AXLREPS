import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import {
  adminCheck, adminDelete, adminSetConfig, adminUpsertProduct, adminUpsertGeneric,
} from "@/lib/server.functions";
import { clearAdminToken, getAdminToken } from "@/lib/admin-session";
import { useSiteConfig } from "@/lib/use-site-config";
import { DEFAULT_PROMO } from "@/components/PromoPopup";
import { CATEGORIES, categoryLabel } from "@/lib/categories";
import { Edit, LogOut, Plus, Trash2, Loader2, X, Save, Package, Megaphone, Store, GraduationCap } from "lucide-react";

export const Route = createFileRoute("/admin/")({ component: AdminPanel });

type Tab = "products" | "sellers" | "tutorials" | "promo";

function AdminPanel() {
  const nav = useNavigate();
  const check = useServerFn(adminCheck);
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState<Tab>("products");

  useEffect(() => {
    const tok = getAdminToken();
    if (!tok) { nav({ to: "/admin/login" }); return; }
    check({ data: { token: tok } }).then((r) => {
      if (!r.ok) { clearAdminToken(); nav({ to: "/admin/login" }); return; }
      setReady(true);
    });
  }, [check, nav]);

  const logout = () => { clearAdminToken(); nav({ to: "/admin/login" }); };

  if (!ready) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

  const tabs: { id: Tab; label: string; icon: typeof Package }[] = [
    { id: "products", label: "Produkty", icon: Package },
    { id: "sellers", label: "Sprzedawcy", icon: Store },
    { id: "tutorials", label: "Poradniki", icon: GraduationCap },
    { id: "promo", label: "Popup promocyjny", icon: Megaphone },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-bold">AxelReps · Panel</h1>
            <p className="text-xs text-muted-foreground">Zarządzaj produktami, sprzedawcami, poradnikami i promocją</p>
          </div>
          <button onClick={logout} className="inline-flex items-center gap-2 text-sm hover:text-destructive">
            <LogOut className="h-4 w-4" /> Wyloguj
          </button>
        </div>
        <div className="mx-auto max-w-6xl px-6 flex gap-1 overflow-x-auto">
          {tabs.map((tb) => {
            const Icon = tb.icon;
            return (
              <button
                key={tb.id}
                onClick={() => setTab(tb.id)}
                className={`px-4 py-3 text-sm border-b-2 -mb-px whitespace-nowrap inline-flex items-center gap-2 transition ${
                  tab === tb.id ? "border-litbuy text-foreground font-semibold" : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tb.label}
              </button>
            );
          })}
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-6 py-8">
        {tab === "products" && <ProductsAdmin />}
        {tab === "sellers" && <SellersAdmin />}
        {tab === "tutorials" && <TutorialsAdmin />}
        {tab === "promo" && <PromoAdmin />}
      </div>
    </div>
  );
}

/* ---------------------- Products ---------------------- */
type ProductRow = {
  id: string;
  name: string;
  link: string;
  price_cny: number | null;
  image_url: string | null;
  category: string | null;
};

function ProductsAdmin() {
  const upsert = useServerFn(adminUpsertProduct);
  const del = useServerFn(adminDelete);
  const [rows, setRows] = useState<ProductRow[]>([]);
  const emptyForm = { id: "", name: "", link: "", price_cny: "", image_url: "", category: "inne" };
  const [form, setForm] = useState(emptyForm);
  const [busy, setBusy] = useState(false);
  const token = getAdminToken()!;

  const load = () => supabase
    .from("products")
    .select("id,name,link,price_cny,image_url,category")
    .order("created_at", { ascending: false })
    .then(({ data }) => setRows((data ?? []) as ProductRow[]));
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!form.name.trim() || !form.link.trim()) return;
    setBusy(true);
    try {
      await upsert({
        data: {
          token,
          product: {
            ...(form.id ? { id: form.id } : {}),
            name: form.name.trim(),
            link: form.link.trim(),
            price_cny: form.price_cny ? Number(form.price_cny) : null,
            image_url: form.image_url.trim() || null,
            category: form.category || "inne",
          },
        },
      });
      setForm(emptyForm);
      load();
    } finally { setBusy(false); }
  };

  const edit = (r: ProductRow) => setForm({
    id: r.id,
    name: r.name,
    link: r.link,
    price_cny: r.price_cny != null ? String(r.price_cny) : "",
    image_url: r.image_url ?? "",
    category: r.category ?? "inne",
  });

  const remove = async (id: string) => {
    if (!confirm("Usunąć produkt?")) return;
    await del({ data: { token, table: "products", id } });
    load();
  };

  return (
    <div className="space-y-6">
      <div className="border rounded-2xl p-6 bg-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-lg">
            {form.id ? "Edytuj produkt" : "Dodaj nowy produkt"}
          </h2>
          {form.id && (
            <button onClick={() => setForm(emptyForm)} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
              <X className="h-3 w-3" /> Anuluj edycję
            </button>
          )}
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="md:col-span-2">
            <label className="text-xs text-muted-foreground">Nazwa produktu</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2.5 border rounded-lg bg-background mt-1" placeholder="np. Nike Tech Fleece" />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs text-muted-foreground">Link (KakoBuy)</label>
            <input value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} className="w-full px-3 py-2.5 border rounded-lg bg-background mt-1" placeholder="https://..." />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Cena (CNY ¥)</label>
            <input inputMode="decimal" value={form.price_cny} onChange={(e) => setForm({ ...form, price_cny: e.target.value })} className="w-full px-3 py-2.5 border rounded-lg bg-background mt-1" placeholder="149" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Kategoria</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2.5 border rounded-lg bg-background mt-1">
              {CATEGORIES.map((c) => <option key={c} value={c}>{categoryLabel(c)}</option>)}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="text-xs text-muted-foreground">URL zdjęcia</label>
            <input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className="w-full px-3 py-2.5 border rounded-lg bg-background mt-1" placeholder="https://..." />
          </div>
        </div>
        <button disabled={busy} onClick={save} className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-litbuy text-litbuy-foreground font-bold disabled:opacity-50 hover:brightness-110 transition">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : form.id ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {form.id ? "Zapisz zmiany" : "Dodaj produkt"}
        </button>
      </div>

      <div className="border rounded-2xl overflow-hidden bg-card">
        <table className="w-full text-sm">
          <thead className="bg-secondary text-left">
            <tr>
              <th className="p-3">Produkt</th>
              <th className="p-3">Kategoria</th>
              <th className="p-3">CNY</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr><td colSpan={4} className="p-8 text-center text-muted-foreground">Brak produktów. Dodaj pierwszy powyżej.</td></tr>
            )}
            {rows.map((r) => (
              <tr key={r.id} className="border-t hover:bg-accent/40 transition">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    {r.image_url && <img src={r.image_url} alt="" className="h-12 w-12 object-cover rounded-lg border" />}
                    <div>
                      <div className="font-medium">{r.name}</div>
                      <a href={r.link} target="_blank" rel="noreferrer" className="text-xs text-muted-foreground underline">link</a>
                    </div>
                  </div>
                </td>
                <td className="p-3 text-muted-foreground">{categoryLabel(r.category)}</td>
                <td className="p-3">{r.price_cny ?? "—"}</td>
                <td className="p-3">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => edit(r)} className="p-2 hover:text-litbuy" title="Edytuj"><Edit className="h-4 w-4" /></button>
                    <button onClick={() => remove(r.id)} className="p-2 hover:text-destructive" title="Usuń"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------------- Sellers ---------------------- */
type SellerRow = {
  id: string;
  slug: string;
  name: string;
  photo_url: string | null;
  best_for_brand: string | null;
  rating: number;
  bio: Record<string, string> | null;
  product_photos: string[] | null;
};

function SellersAdmin() {
  const upsert = useServerFn(adminUpsertGeneric);
  const del = useServerFn(adminDelete);
  const token = getAdminToken()!;
  const [rows, setRows] = useState<SellerRow[]>([]);
  const emptyForm = {
    id: "", name: "", bio_pl: "", best_for_brand: "", rating: "8",
    photo_url: "", photo1: "", photo2: "", photo3: "",
  };
  const [form, setForm] = useState(emptyForm);
  const [busy, setBusy] = useState(false);

  const load = () => supabase
    .from("sellers")
    .select("id,slug,name,photo_url,best_for_brand,rating,bio,product_photos")
    .order("rating", { ascending: false })
    .then(({ data }) => setRows((data ?? []) as SellerRow[]));
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!form.name.trim()) return;
    setBusy(true);
    try {
      const photos = [form.photo1, form.photo2, form.photo3].map((p) => p.trim()).filter(Boolean);
      const row: Record<string, unknown> = {
        name: form.name.trim(),
        best_for_brand: form.best_for_brand.trim() || null,
        rating: Math.min(10, Math.max(1, Number(form.rating) || 1)),
        bio: { pl: form.bio_pl },
        photo_url: form.photo_url.trim() || null,
        product_photos: photos,
      };
      if (form.id) row.id = form.id;
      await upsert({ data: { token, table: "sellers", row } });
      setForm(emptyForm);
      load();
    } finally { setBusy(false); }
  };

  const edit = (s: SellerRow) => setForm({
    id: s.id,
    name: s.name,
    bio_pl: (s.bio && s.bio.pl) || "",
    best_for_brand: s.best_for_brand ?? "",
    rating: String(s.rating),
    photo_url: s.photo_url ?? "",
    photo1: s.product_photos?.[0] ?? "",
    photo2: s.product_photos?.[1] ?? "",
    photo3: s.product_photos?.[2] ?? "",
  });

  const remove = async (id: string) => {
    if (!confirm("Usunąć sprzedawcę?")) return;
    await del({ data: { token, table: "sellers", id } });
    load();
  };

  return (
    <div className="space-y-6">
      <div className="border rounded-2xl p-6 bg-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-lg">
            {form.id ? "Edytuj sprzedawcę" : "Dodaj nowego sprzedawcę"}
          </h2>
          {form.id && (
            <button onClick={() => setForm(emptyForm)} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
              <X className="h-3 w-3" /> Anuluj edycję
            </button>
          )}
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-muted-foreground">Nazwa sprzedawcy</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2.5 border rounded-lg bg-background mt-1" placeholder="np. Mr. Hou" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Najlepsze dla (marki, np. Nike, Jordan)</label>
            <input value={form.best_for_brand} onChange={(e) => setForm({ ...form, best_for_brand: e.target.value })} className="w-full px-3 py-2.5 border rounded-lg bg-background mt-1" placeholder="Nike, Jordan, Yeezy" />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs text-muted-foreground">Krótki opis</label>
            <textarea value={form.bio_pl} onChange={(e) => setForm({ ...form, bio_pl: e.target.value })} rows={3} className="w-full px-3 py-2.5 border rounded-lg bg-background mt-1" placeholder="Krótki opis sprzedawcy…" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Ocena (1–10)</label>
            <input inputMode="numeric" value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} className="w-full px-3 py-2.5 border rounded-lg bg-background mt-1" placeholder="8" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">URL zdjęcia profilowego</label>
            <input value={form.photo_url} onChange={(e) => setForm({ ...form, photo_url: e.target.value })} className="w-full px-3 py-2.5 border rounded-lg bg-background mt-1" placeholder="https://..." />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs text-muted-foreground">3 zdjęcia referencyjne (URL)</label>
            <div className="grid md:grid-cols-3 gap-2 mt-1">
              <input value={form.photo1} onChange={(e) => setForm({ ...form, photo1: e.target.value })} className="px-3 py-2.5 border rounded-lg bg-background" placeholder="Zdjęcie 1 URL" />
              <input value={form.photo2} onChange={(e) => setForm({ ...form, photo2: e.target.value })} className="px-3 py-2.5 border rounded-lg bg-background" placeholder="Zdjęcie 2 URL" />
              <input value={form.photo3} onChange={(e) => setForm({ ...form, photo3: e.target.value })} className="px-3 py-2.5 border rounded-lg bg-background" placeholder="Zdjęcie 3 URL" />
            </div>
          </div>
        </div>
        <button disabled={busy} onClick={save} className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-litbuy text-litbuy-foreground font-bold disabled:opacity-50 hover:brightness-110 transition">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : form.id ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {form.id ? "Zapisz zmiany" : "Dodaj sprzedawcę"}
        </button>
      </div>

      <div className="border rounded-2xl overflow-hidden bg-card">
        <table className="w-full text-sm">
          <thead className="bg-secondary text-left">
            <tr>
              <th className="p-3">Sprzedawca</th>
              <th className="p-3">Najlepsze dla</th>
              <th className="p-3">Ocena</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr><td colSpan={4} className="p-8 text-center text-muted-foreground">Brak sprzedawców.</td></tr>
            )}
            {rows.map((s) => (
              <tr key={s.id} className="border-t hover:bg-accent/40 transition">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    {s.photo_url && <img src={s.photo_url} alt="" className="h-12 w-12 object-cover rounded-full border" />}
                    <div className="font-medium">{s.name}</div>
                  </div>
                </td>
                <td className="p-3 text-muted-foreground">{s.best_for_brand || "—"}</td>
                <td className="p-3">{s.rating}/10</td>
                <td className="p-3">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => edit(s)} className="p-2 hover:text-litbuy"><Edit className="h-4 w-4" /></button>
                    <button onClick={() => remove(s.id)} className="p-2 hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------------- Tutorials ---------------------- */
type TutorialRow = {
  id: string;
  slug: string;
  title: Record<string, string>;
  description: Record<string, string>;
  cover_url: string | null;
  is_published: boolean;
};
type StepRow = {
  id: string;
  tutorial_id: string;
  step_index: number;
  title: Record<string, string>;
  body: Record<string, string>;
  image_urls: string[];
  buttons: { label: Record<string, string>; url: string }[];
};

function TutorialsAdmin() {
  const upsert = useServerFn(adminUpsertGeneric);
  const del = useServerFn(adminDelete);
  const token = getAdminToken()!;
  const [rows, setRows] = useState<TutorialRow[]>([]);
  const [selected, setSelected] = useState<TutorialRow | null>(null);

  const load = () => supabase
    .from("tutorials")
    .select("id,slug,title,description,cover_url,is_published")
    .order("created_at", { ascending: false })
    .then(({ data }) => setRows((data ?? []) as TutorialRow[]));
  useEffect(() => { load(); }, []);

  const emptyForm = { id: "", title_pl: "", description_pl: "", cover_url: "", is_published: true };
  const [form, setForm] = useState(emptyForm);
  const [busy, setBusy] = useState(false);

  const save = async () => {
    if (!form.title_pl.trim()) return;
    setBusy(true);
    try {
      const row: Record<string, unknown> = {
        title: { pl: form.title_pl },
        description: { pl: form.description_pl },
        cover_url: form.cover_url.trim() || null,
        is_published: form.is_published,
      };
      if (form.id) row.id = form.id;
      await upsert({ data: { token, table: "tutorials", row } });
      setForm(emptyForm);
      load();
    } finally { setBusy(false); }
  };

  const edit = (t: TutorialRow) => setForm({
    id: t.id,
    title_pl: t.title?.pl ?? "",
    description_pl: t.description?.pl ?? "",
    cover_url: t.cover_url ?? "",
    is_published: t.is_published,
  });

  const remove = async (id: string) => {
    if (!confirm("Usunąć poradnik i wszystkie jego kroki?")) return;
    await del({ data: { token, table: "tutorials", id } });
    if (selected?.id === id) setSelected(null);
    load();
  };

  if (selected) {
    return <StepsEditor tutorial={selected} onBack={() => { setSelected(null); load(); }} />;
  }

  return (
    <div className="space-y-6">
      <div className="border rounded-2xl p-6 bg-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-lg">
            {form.id ? "Edytuj poradnik" : "Dodaj nowy poradnik"}
          </h2>
          {form.id && (
            <button onClick={() => setForm(emptyForm)} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
              <X className="h-3 w-3" /> Anuluj edycję
            </button>
          )}
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="md:col-span-2">
            <label className="text-xs text-muted-foreground">Tytuł poradnika</label>
            <input value={form.title_pl} onChange={(e) => setForm({ ...form, title_pl: e.target.value })} className="w-full px-3 py-2.5 border rounded-lg bg-background mt-1" />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs text-muted-foreground">Krótki opis</label>
            <textarea value={form.description_pl} onChange={(e) => setForm({ ...form, description_pl: e.target.value })} rows={2} className="w-full px-3 py-2.5 border rounded-lg bg-background mt-1" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">URL okładki</label>
            <input value={form.cover_url} onChange={(e) => setForm({ ...form, cover_url: e.target.value })} className="w-full px-3 py-2.5 border rounded-lg bg-background mt-1" placeholder="https://..." />
          </div>
          <label className="flex items-center gap-2 mt-6">
            <input type="checkbox" className="osk-check" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} />
            <span className="text-sm">Opublikowany</span>
          </label>
        </div>
        <button disabled={busy} onClick={save} className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-litbuy text-litbuy-foreground font-bold disabled:opacity-50 hover:brightness-110 transition">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : form.id ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {form.id ? "Zapisz zmiany" : "Dodaj poradnik"}
        </button>
      </div>

      <div className="border rounded-2xl overflow-hidden bg-card">
        <table className="w-full text-sm">
          <thead className="bg-secondary text-left">
            <tr>
              <th className="p-3">Poradnik</th>
              <th className="p-3">Slug</th>
              <th className="p-3">Status</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr><td colSpan={4} className="p-8 text-center text-muted-foreground">Brak poradników.</td></tr>
            )}
            {rows.map((r) => (
              <tr key={r.id} className="border-t hover:bg-accent/40 transition">
                <td className="p-3 font-medium">{r.title?.pl || "—"}</td>
                <td className="p-3 text-xs text-muted-foreground">{r.slug}</td>
                <td className="p-3">{r.is_published ? "Publiczny" : "Szkic"}</td>
                <td className="p-3">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => setSelected(r)} className="px-3 py-1.5 rounded-md border text-xs hover:bg-accent">Kroki</button>
                    <button onClick={() => edit(r)} className="p-2 hover:text-litbuy"><Edit className="h-4 w-4" /></button>
                    <button onClick={() => remove(r.id)} className="p-2 hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StepsEditor({ tutorial, onBack }: { tutorial: TutorialRow; onBack: () => void }) {
  const upsert = useServerFn(adminUpsertGeneric);
  const del = useServerFn(adminDelete);
  const token = getAdminToken()!;
  const [steps, setSteps] = useState<StepRow[]>([]);
  const emptyForm = { id: "", step_index: "1", title_pl: "", body_pl: "", image_url: "", btn_label_pl: "", btn_url: "" };
  const [form, setForm] = useState(emptyForm);
  const [busy, setBusy] = useState(false);

  const load = () => supabase
    .from("tutorial_steps")
    .select("id,tutorial_id,step_index,title,body,image_urls,buttons")
    .eq("tutorial_id", tutorial.id)
    .order("step_index")
    .then(({ data }) => setSteps((data ?? []) as StepRow[]));
  useEffect(() => { load(); }, [tutorial.id]);

  const save = async () => {
    if (!form.title_pl.trim()) return;
    setBusy(true);
    try {
      const buttons = form.btn_url.trim()
        ? [{ label: { pl: form.btn_label_pl.trim() || "Otwórz" }, url: form.btn_url.trim() }]
        : [];
      const row: Record<string, unknown> = {
        tutorial_id: tutorial.id,
        step_index: Number(form.step_index) || 1,
        title: { pl: form.title_pl },
        body: { pl: form.body_pl },
        image_urls: form.image_url.trim() ? [form.image_url.trim()] : [],
        buttons,
      };
      if (form.id) row.id = form.id;
      await upsert({ data: { token, table: "tutorial_steps", row } });
      setForm({ ...emptyForm, step_index: String((Number(form.step_index) || 1) + 1) });
      load();
    } finally { setBusy(false); }
  };

  const edit = (s: StepRow) => setForm({
    id: s.id,
    step_index: String(s.step_index),
    title_pl: s.title?.pl ?? "",
    body_pl: s.body?.pl ?? "",
    image_url: s.image_urls?.[0] ?? "",
    btn_label_pl: s.buttons?.[0]?.label?.pl ?? "",
    btn_url: s.buttons?.[0]?.url ?? "",
  });

  const remove = async (id: string) => {
    if (!confirm("Usunąć krok?")) return;
    await del({ data: { token, table: "tutorial_steps", id } });
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <button onClick={onBack} className="text-xs text-muted-foreground hover:text-foreground">← Wróć do poradników</button>
          <h2 className="font-display font-bold text-lg mt-1">Kroki: {tutorial.title?.pl}</h2>
        </div>
      </div>

      <div className="border rounded-2xl p-6 bg-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold">{form.id ? "Edytuj krok" : "Dodaj nowy krok"}</h3>
          {form.id && (
            <button onClick={() => setForm(emptyForm)} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
              <X className="h-3 w-3" /> Anuluj edycję
            </button>
          )}
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-muted-foreground">Numer kroku</label>
            <input inputMode="numeric" value={form.step_index} onChange={(e) => setForm({ ...form, step_index: e.target.value })} className="w-full px-3 py-2.5 border rounded-lg bg-background mt-1" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Tytuł kroku</label>
            <input value={form.title_pl} onChange={(e) => setForm({ ...form, title_pl: e.target.value })} className="w-full px-3 py-2.5 border rounded-lg bg-background mt-1" />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs text-muted-foreground">Treść</label>
            <textarea value={form.body_pl} onChange={(e) => setForm({ ...form, body_pl: e.target.value })} rows={4} className="w-full px-3 py-2.5 border rounded-lg bg-background mt-1" />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs text-muted-foreground">Zdjęcie do kroku (URL)</label>
            <input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className="w-full px-3 py-2.5 border rounded-lg bg-background mt-1" placeholder="https://..." />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Etykieta przycisku</label>
            <input value={form.btn_label_pl} onChange={(e) => setForm({ ...form, btn_label_pl: e.target.value })} className="w-full px-3 py-2.5 border rounded-lg bg-background mt-1" placeholder="np. Otwórz link" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Link przycisku</label>
            <input value={form.btn_url} onChange={(e) => setForm({ ...form, btn_url: e.target.value })} className="w-full px-3 py-2.5 border rounded-lg bg-background mt-1" placeholder="https://..." />
          </div>
        </div>
        <button disabled={busy} onClick={save} className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-litbuy text-litbuy-foreground font-bold disabled:opacity-50 hover:brightness-110 transition">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : form.id ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {form.id ? "Zapisz krok" : "Dodaj krok"}
        </button>
      </div>

      <div className="border rounded-2xl overflow-hidden bg-card">
        <table className="w-full text-sm">
          <thead className="bg-secondary text-left">
            <tr><th className="p-3">#</th><th className="p-3">Tytuł</th><th className="p-3">Zdjęcie</th><th className="p-3">Przycisk</th><th className="p-3"></th></tr>
          </thead>
          <tbody>
            {steps.length === 0 && (
              <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">Brak kroków.</td></tr>
            )}
            {steps.map((s) => (
              <tr key={s.id} className="border-t hover:bg-accent/40 transition">
                <td className="p-3">{s.step_index}</td>
                <td className="p-3 font-medium">{s.title?.pl || "—"}</td>
                <td className="p-3">{s.image_urls?.[0] ? <img src={s.image_urls[0]} alt="" className="h-10 w-10 object-cover rounded" /> : "—"}</td>
                <td className="p-3 text-xs text-muted-foreground">{s.buttons?.[0]?.url ? "✓" : "—"}</td>
                <td className="p-3">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => edit(s)} className="p-2 hover:text-litbuy"><Edit className="h-4 w-4" /></button>
                    <button onClick={() => remove(s.id)} className="p-2 hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------------- Promo popup ---------------------- */
function PromoAdmin() {
  const setConfig = useServerFn(adminSetConfig);
  const { value: promo, loading } = useSiteConfig("promo_popup", DEFAULT_PROMO);
  const [form, setForm] = useState(DEFAULT_PROMO);
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);
  const token = getAdminToken()!;

  useEffect(() => { if (!loading) setForm({ ...DEFAULT_PROMO, ...promo }); }, [loading, promo]);

  const save = async () => {
    setBusy(true);
    try {
      await setConfig({ data: { token, key: "promo_popup", value: form } });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally { setBusy(false); }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="font-display font-bold text-lg mb-2">Popup promocyjny KakoBuy</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Edytuj wygląd i treść popupu który widzą użytkownicy. Wszystko jest już po polsku — bez JSON-a, tylko zwykłe pola.
      </p>

      <div className="border rounded-2xl p-6 bg-card space-y-5">
        <label className="flex items-center justify-between gap-4 pb-4 border-b">
          <div>
            <div className="font-medium">Popup włączony</div>
            <div className="text-xs text-muted-foreground">Wyłącz, aby ukryć popup na całej stronie.</div>
          </div>
          <input
            type="checkbox"
            checked={form.enabled}
            onChange={(e) => setForm({ ...form, enabled: e.target.checked })}
            className="osk-check"
          />
        </label>

        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground">Tytuł</label>
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full mt-1 px-3 py-2.5 border rounded-lg bg-background" />
        </div>

        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground">Treść</label>
          <textarea value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} rows={5} className="w-full mt-1 px-3 py-2.5 border rounded-lg bg-background" />
        </div>

        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground">Link przycisku</label>
          <input value={form.cta_url} onChange={(e) => setForm({ ...form, cta_url: e.target.value })} className="w-full mt-1 px-3 py-2.5 border rounded-lg bg-background font-mono text-xs" />
        </div>

        <button
          disabled={busy}
          onClick={save}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-litbuy text-litbuy-foreground font-bold disabled:opacity-50 hover:brightness-110 transition"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saved ? "Zapisano ✓" : "Zapisz zmiany"}
        </button>
      </div>
    </div>
  );
}
