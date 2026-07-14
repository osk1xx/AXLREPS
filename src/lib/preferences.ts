import { useEffect, useState } from "react";

export type Currency = "CNY" | "PLN";
export const CURRENCIES: Currency[] = ["PLN", "CNY"];

const CURRENCY_KEY = "currency";
const PROMO_OFF_KEY = "promo_off";
const PROMO_LATER_KEY = "promo_remind_until";

const listeners = new Set<() => void>();
function emit() { listeners.forEach((l) => l()); }

export function getCurrency(): Currency {
  if (typeof window === "undefined") return "PLN";
  const v = localStorage.getItem(CURRENCY_KEY) as Currency | null;
  return v === "PLN" || v === "CNY" ? v : "PLN";
}
export function setCurrency(c: Currency) { localStorage.setItem(CURRENCY_KEY, c); emit(); }

export function usePreferences() {
  const [, tick] = useState(0);
  useEffect(() => {
    const l = () => tick((v) => v + 1);
    listeners.add(l); return () => { listeners.delete(l); };
  }, []);
  return {
    currency: getCurrency(),
    setCurrency,
    promoOff: typeof window !== "undefined" && localStorage.getItem(PROMO_OFF_KEY) === "1",
    setPromoOff: (v: boolean) => { localStorage.setItem(PROMO_OFF_KEY, v ? "1" : "0"); emit(); },
    remindLater: () => { localStorage.setItem(PROMO_LATER_KEY, String(Date.now() + 1000 * 60 * 60 * 24)); emit(); },
    shouldShowPromo: () => {
      if (typeof window === "undefined") return false;
      if (localStorage.getItem(PROMO_OFF_KEY) === "1") return false;
      const until = Number(localStorage.getItem(PROMO_LATER_KEY) || 0);
      if (until && Date.now() < until) return false;
      return true;
    },
  };
}

// Fixed CNY -> PLN rate (approx). Kept simple per request — no more DB rates.
const CNY_TO_PLN = 0.56;

export function formatPrice(cny: number | null | undefined, currency: Currency): string {
  if (cny == null) return "—";
  if (currency === "CNY") return `¥${Number(cny).toFixed(2)}`;
  return `${(Number(cny) * CNY_TO_PLN).toFixed(2)} zł`;
}
