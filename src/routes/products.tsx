import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";
import { hasSupabaseConfig, supabase } from "@/integrations/supabase/client";
import { ProductCard, type Product } from "@/components/ProductCard";
import { ProductCardSkeleton } from "@/components/Skeleton";
import { CustomSelect } from "@/components/CustomSelect";
import { CATEGORIES, categoryLabel } from "@/lib/categories";

export const Route = createFileRoute("/products")({
  component: ProductsPage,
  head: () => ({
    meta: [
      { title: "Produkty — AxelReps × KakoBuy" },
      { name: "description", content: "Sprawdzone repliki z KakoBuy — bluzy, koszulki, kurtki i więcej. Filtruj i sortuj po kategorii i cenie." },
    ],
  }),
});

type P = Product & { category: string | null; created_at: string };
type Sort = "new" | "az" | "za" | "price_asc" | "price_desc";

const SORT_OPTIONS = [
  { value: "new", label: "Najnowsze" },
  { value: "az", label: "Nazwa: A → Z" },
  { value: "za", label: "Nazwa: Z → A" },
  { value: "price_asc", label: "Cena: rosnąco" },
  { value: "price_desc", label: "Cena: malejąco" },
];

const CATEGORY_OPTIONS = [
  { value: "", label: "Wszystkie kategorie" },
  ...CATEGORIES.map((c) => ({ value: c, label: categoryLabel(c) })),
];

function ProductsPage() {
  const { t } = useTranslation();
  const [products, setProducts] = useState<P[] | null>(null);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("");
  const [sort, setSort] = useState<Sort>("new");

  useEffect(() => {
    if (!hasSupabaseConfig()) {
      setProducts([]);
      return;
    }
    supabase
      .from("products")
      .select("id,name,link,price_cny,image_url,category,created_at")
      .eq("is_draft", false)
      .then(({ data }) => setProducts((data ?? []) as P[]))
      .catch(() => setProducts([]));
  }, []);

  const filtered = useMemo(() => {
    if (!products) return null;
    let arr = products.filter((p) => {
      if (q && !p.name.toLowerCase().includes(q.toLowerCase())) return false;
      if (cat && p.category !== cat) return false;
      return true;
    });
    switch (sort) {
      case "az": arr = [...arr].sort((a, b) => a.name.localeCompare(b.name)); break;
      case "za": arr = [...arr].sort((a, b) => b.name.localeCompare(a.name)); break;
      case "price_asc": arr = [...arr].sort((a, b) => (a.price_cny ?? 0) - (b.price_cny ?? 0)); break;
      case "price_desc": arr = [...arr].sort((a, b) => (b.price_cny ?? 0) - (a.price_cny ?? 0)); break;
      default: arr = [...arr].sort((a, b) => (b.created_at ?? "").localeCompare(a.created_at ?? ""));
    }
    return arr;
  }, [products, q, cat, sort]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="font-display text-4xl font-bold mb-4">{t("nav.products")}</h1>
      <div className="mb-8 rounded-2xl border border-litbuy/40 bg-litbuy/10 p-4 text-sm">
        <p className="font-semibold text-foreground mb-1">{t("product.price_warning_title")}</p>
        <p className="text-muted-foreground leading-relaxed">{t("product.price_warning_body")}</p>
      </div>

      <div className="grid gap-3 md:grid-cols-[1fr_220px_220px] mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("common.search")}
            className="w-full pl-10 pr-4 py-2.5 rounded-full border bg-card"
          />
        </div>
        <CustomSelect value={cat} onChange={setCat} options={CATEGORY_OPTIONS} />
        <CustomSelect value={sort} onChange={(v) => setSort(v as Sort)} options={SORT_OPTIONS} />
      </div>

      {filtered === null ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-muted-foreground">Brak produktów.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filtered.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      )}
    </div>
  );
}
