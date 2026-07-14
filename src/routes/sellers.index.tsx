import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { hasSupabaseConfig, supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/Skeleton";

export const Route = createFileRoute("/sellers/")({ component: SellersIndex });

type Seller = { id: string; slug: string; name: string; photo_url: string | null; best_for_brand: string | null; rating: number };

function ratingColor(r: number) {
  if (r <= 3) return "bg-rating-low text-white";
  if (r <= 6) return "bg-rating-mid text-black";
  return "bg-rating-high text-white";
}

function SellersIndex() {
  const { t } = useTranslation();
  const [rows, setRows] = useState<Seller[] | null>(null);
  useEffect(() => {
    if (!hasSupabaseConfig()) {
      setRows([]);
      return;
    }
    supabase.from("sellers").select("id,slug,name,photo_url,best_for_brand,rating").order("rating", { ascending: false })
      .then(({ data }) => setRows((data ?? []) as Seller[]))
      .catch(() => setRows([]));
  }, []);
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="font-display text-4xl font-bold mb-10">{t("sellers.title")}</h1>
      {!rows ? (
        <div className="grid md:grid-cols-3 gap-6">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-56" />)}</div>
      ) : rows.length === 0 ? (
        <p className="text-muted-foreground">No sellers yet.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {rows.map((s) => (
            <Link key={s.id} to="/sellers/$slug" params={{ slug: s.slug }}
              className="border rounded-xl p-5 hover:shadow-lg transition bg-card animate-float-in">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-muted overflow-hidden">
                  {s.photo_url && <img src={s.photo_url} alt={s.name} className="w-full h-full object-cover" />}
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-bold">{s.name}</h3>
                  {s.best_for_brand && <p className="text-xs text-muted-foreground">{t("sellers.best_for")}: {s.best_for_brand}</p>}
                </div>
                <span className={`px-2 py-1 rounded text-xs font-bold ${ratingColor(s.rating)}`}>{s.rating}/10</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
