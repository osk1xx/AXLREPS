import { useTranslation } from "react-i18next";
import { formatPrice, usePreferences } from "@/lib/preferences";
import { ExternalLink } from "lucide-react";
import { KakobuyLogo } from "./LitBuyLogo";

export type Product = {
  id: string;
  name: string;
  link: string;
  price_cny: number | null;
  image_url: string | null;
  category?: string | null;
};

export function ProductCard({ p }: { p: Product }) {
  const { t } = useTranslation();
  const prefs = usePreferences();

  return (
    <div className="group border rounded-xl overflow-hidden bg-card hover:shadow-lg transition animate-float-in flex flex-col">
      <div className="relative aspect-square bg-muted overflow-hidden">
        {p.image_url ? (
          <img
            src={p.image_url}
            alt={p.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
            brak zdjęcia
          </div>
        )}
      </div>
      <div className="p-4 space-y-3 flex-1 flex flex-col">
        <h3 className="font-medium leading-tight line-clamp-2 min-h-[2.5em]">{p.name}</h3>
        <div className="flex items-center justify-between">
          <span className="font-display text-lg font-bold">
            {formatPrice(p.price_cny, prefs.currency)}
          </span>
        </div>
        <a
          href={p.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto w-full inline-flex items-center justify-center gap-2 bg-litbuy text-litbuy-foreground py-2.5 rounded-full text-sm font-bold hover:brightness-110 transition"
        >
          <KakobuyLogo size={16} /> {t("product.buy")} <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
