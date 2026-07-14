import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { Settings, X } from "lucide-react";
import { CURRENCIES, usePreferences } from "@/lib/preferences";

export function SettingsMenu() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const prefs = usePreferences();

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const modal = open ? (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/70 backdrop-blur-md animate-float-in"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-md bg-card border rounded-3xl shadow-2xl p-7 animate-pop-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display text-xl font-bold">{t("settings.title")}</h3>
          <button onClick={() => setOpen(false)} className="p-1.5 hover:bg-accent rounded-full">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
              {t("settings.currency")}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {CURRENCIES.map((c) => (
                <button
                  key={c}
                  onClick={() => prefs.setCurrency(c)}
                  className={`px-3 py-3 rounded-xl border text-sm font-semibold transition ${
                    prefs.currency === c
                      ? "bg-foreground text-background border-foreground"
                      : "hover:bg-accent"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <label className="flex items-center justify-between gap-3 text-sm cursor-pointer pt-4 border-t">
            <span>{t("settings.turn_off_promo")}</span>
            <input
              type="checkbox"
              checked={prefs.promoOff}
              onChange={(e) => prefs.setPromoOff(e.target.checked)}
              className="osk-check"
            />
          </label>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Ustawienia"
        className="p-2 rounded-full hover:bg-accent transition"
      >
        <Settings className="h-5 w-5" />
      </button>
      {mounted && modal ? createPortal(modal, document.body) : null}
    </>
  );
}
