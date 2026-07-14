import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import { usePreferences } from "@/lib/preferences";
import { useSiteConfig } from "@/lib/use-site-config";
import { KakobuyLogo } from "./LitBuyLogo";

type Promo = {
  enabled: boolean;
  title: string;
  body: string;
  cta_url: string;
};

export const DEFAULT_PROMO: Promo = {
  enabled: true,
  title: "Odbierz -20% i 500$ w kuponach!",
  body:
    "KakoBuy to najlepszy chiński agent oferujący zaufanie, prędkość i przystępne ceny. Szybkie QC, sprawny support 24/7 i tańsza wysyłka do Polski — wszystko w jednym miejscu. Zarejestruj się przez nasz link i odbierz -20% zniżki oraz 500$ w kuponach na start.",
  cta_url: "https://www.kakobuy.com/register/?affcode=axelreps",
};

export function PromoPopup({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useTranslation();
  const prefs = usePreferences();
  const { value: promo } = useSiteConfig<Promo>("promo_popup", DEFAULT_PROMO);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !promo?.enabled) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-background/70 backdrop-blur-md p-4 animate-float-in">
      <div className="relative w-full max-w-md bg-card border rounded-3xl shadow-2xl p-8 animate-pop-in">
        <button onClick={onClose} aria-label="Zamknij" className="absolute top-4 right-4 p-2 rounded-full hover:bg-accent">
          <X className="h-4 w-4" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="mb-3 select-none"><KakobuyLogo size={56} /></div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs mb-5">
            {t("promo.header")}
          </div>
          <h2 className="font-display text-xl md:text-2xl font-bold leading-tight">
            {promo.title}
          </h2>
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
            {promo.body}
          </p>
        </div>

        <a
          href={promo.cta_url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className="mt-6 flex items-center justify-center gap-2 w-full text-center bg-litbuy text-litbuy-foreground py-3.5 rounded-full font-bold hover:brightness-110 transition"
        >
          <KakobuyLogo size={20} />
          {t("promo.cta")}
        </a>
        <button
          onClick={() => { prefs.remindLater(); onClose(); }}
          className="mt-3 block w-full text-center text-xs text-muted-foreground hover:text-foreground transition"
        >
          {t("common.remind_later")}
        </button>
      </div>
    </div>
  );
}
