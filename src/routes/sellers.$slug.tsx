import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { hasSupabaseConfig, supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/Skeleton";
import { pickLang } from "@/lib/text";
import type { Lang } from "@/lib/i18n";

export const Route = createFileRoute("/sellers/$slug")({ component: SellerDetail });

type Seller = {
  id: string; name: string; photo_url: string | null; best_for_brand: string | null;
  rating: number; bio: Record<string, string>; product_photos: string[];
};

function ratingColor(r: number) {
  if (r <= 3) return "bg-rating-low text-white";
  if (r <= 6) return "bg-rating-mid text-black";
  return "bg-rating-high text-white";
}

function SellerDetail() {
  const { slug } = Route.useParams();
  const { t, i18n } = useTranslation();
  const [s, setS] = useState<Seller | null | false>(null);
  useEffect(() => {
    if (!hasSupabaseConfig()) {
      setS(false);
      return;
    }
    supabase.from("sellers").select("id,name,photo_url,best_for_brand,rating,bio,product_photos").eq("slug", slug).maybeSingle()
      .then(({ data }) => setS(data ? (data as Seller) : false))
      .catch(() => setS(false));
  }, [slug]);

  if (s === null) return <div className="mx-auto max-w-3xl px-6 py-16"><Skeleton className="h-80" /></div>;
  if (s === false) return <div className="mx-auto max-w-3xl px-6 py-16">Seller not found.</div>;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="flex items-center gap-6">
        <div className="h-28 w-28 rounded-full bg-muted overflow-hidden border">
          {s.photo_url && <img src={s.photo_url} alt={s.name} className="w-full h-full object-cover" />}
        </div>
        <div>
          <h1 className="font-display text-4xl font-bold">{s.name}</h1>
          {s.best_for_brand && <p className="text-sm text-muted-foreground mt-1">{t("sellers.best_for")}: {s.best_for_brand}</p>}
          <span className={`inline-block mt-3 px-3 py-1 rounded text-sm font-bold ${ratingColor(s.rating)}`}>{t("sellers.rating")}: {s.rating}/10</span>
        </div>
      </div>
      {pickLang(s.bio, i18n.language as Lang) && (
        <p className="mt-8 leading-relaxed whitespace-pre-wrap">{pickLang(s.bio, i18n.language as Lang)}</p>
      )}
      {s.product_photos?.length > 0 && (
        <div className="mt-10 grid grid-cols-3 gap-4">
          {s.product_photos.slice(0, 3).map((u, i) => (
            <img key={i} src={u} alt="" className="aspect-square w-full object-cover rounded-lg border" />
          ))}
        </div>
      )}
    </div>
  );
}
