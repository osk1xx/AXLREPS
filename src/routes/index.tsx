import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Search, Package, Truck, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ProductCard, type Product } from "@/components/ProductCard";
import { ProductCardSkeleton } from "@/components/Skeleton";
import { PromoPopup } from "@/components/PromoPopup";
import { usePreferences } from "@/lib/preferences";
import { KakobuyLogo } from "@/components/LitBuyLogo";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  const { t } = useTranslation();
  const prefs = usePreferences();
  const [promoOpen, setPromoOpen] = useState(false);
  const [picks, setPicks] = useState<Product[] | null>(null);

  useEffect(() => {
    const to = setTimeout(() => { if (prefs.shouldShowPromo()) setPromoOpen(true); }, 900);
    return () => clearTimeout(to);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      supabase
        .from("products")
        .select("id,name,link,price_cny,image_url,category")
        .eq("is_draft", false)
        .limit(20)
        .then(({ data }) => setPicks((data ?? []) as Product[]))
        .catch(() => setPicks([]));
    } catch {
      // Keep the local preview usable before Supabase is configured.
      setPicks([]);
    }
  }, []);

  const items = picks && picks.length ? [...picks, ...picks] : [];

  return (
    <div>
      <section className="mx-auto max-w-6xl px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/60 text-xs">
          {t("landing.eyebrow")}
        </div>
        <h1 className="mt-8 font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] animate-float-in">
          {t("landing.title_1")}
          <br />
          <span className="text-litbuy">{t("landing.title_2")}</span>
        </h1>
        <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
          {t("landing.tagline")}
        </p>
        <button
          onClick={() => setPromoOpen(true)}
          className="mt-7 inline-flex items-center gap-3 rounded-full bg-litbuy px-5 py-3 text-sm font-bold text-litbuy-foreground shadow-[0_0_42px_color-mix(in_oklch,var(--litbuy)_35%,transparent)] hover:brightness-110 transition"
        >
          <KakobuyLogo size={22} />
          -20% + 500$ w kuponach
        </button>

        <div className="mt-12 flex flex-wrap items-stretch justify-center gap-3">
          <Link
            to="/qc"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-card border border-border px-8 py-5 text-base font-semibold hover:bg-accent transition"
          >
            <Search className="h-4 w-4" />
            QC FINDER
          </Link>
          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-foreground text-background px-10 py-5 text-lg font-bold shadow-2xl animate-glow hover:scale-[1.03] transition"
          >
            <Package className="h-5 w-5" />
            {t("landing.browse_products").toUpperCase()}
          </Link>
          <Link
            to="/tracking"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-card border border-border px-8 py-5 text-base font-semibold hover:bg-accent transition"
          >
            <Truck className="h-4 w-4" />
            {t("landing.tracking").toUpperCase()}
          </Link>
        </div>

        <Link
          to="/admin/login"
          className="mt-10 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition"
        >
          {t("landing.admin_login")} <ArrowRight className="h-3 w-3" />
        </Link>
      </section>

      {(picks === null || items.length > 0) && (
        <section className="border-y border-border/50 bg-card/30 py-10 overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 mb-6 flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold">{t("landing.latest_picks")}</h2>
            <Link to="/products" className="text-sm text-muted-foreground hover:text-foreground">
              {t("landing.browse_products")} →
            </Link>
          </div>
          {picks === null ? (
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-6">
              {Array.from({ length: 5 }).map((_, i) => <ProductCardSkeleton key={i} />)}
            </div>
          ) : (
            <div className="relative">
              <div className="flex gap-6 w-max animate-marquee px-6">
                {items.map((p, i) => (
                  <div key={p.id + "-" + i} className="w-64 shrink-0">
                    <ProductCard p={p} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      <PromoPopup open={promoOpen} onClose={() => setPromoOpen(false)} />
    </div>
  );
}
