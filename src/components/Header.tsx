import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Home, Package, Search, GraduationCap, Store, Puzzle, Truck, Menu, X } from "lucide-react";
import { SettingsMenu } from "./SettingsMenu";
import { PromoPopup } from "./PromoPopup";
import { KakobuyLogo } from "./LitBuyLogo";

const links = [
  { to: "/", key: "nav.home", icon: Home, exact: true },
  { to: "/qc", key: "nav.qc", icon: Search },
  { to: "/products", key: "nav.products", icon: Package },
  { to: "/tutorials", key: "nav.tutorials", icon: GraduationCap },
  { to: "/sellers", key: "nav.sellers", icon: Store },
  { to: "/wtyczka", key: "nav.wtyczka", icon: Puzzle },
  { to: "/tracking", key: "nav.tracking", icon: Truck },
] as const;

export function Header() {
  const { t } = useTranslation();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [promoOpen, setPromoOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => { setMobileOpen(false); }, [path]);

  const isActive = (to: string, exact?: boolean) =>
    exact ? path === to : path === to || path.startsWith(to + "/");

  return (
    <>
      <header className="sticky top-0 z-40 bg-background/85 backdrop-blur border-b border-border/60">
        <div className="mx-auto max-w-7xl px-4 md:px-6 h-16 flex items-center gap-3 md:gap-6">
          <Link to="/" className="font-display font-bold text-sm md:text-base flex items-center gap-2 whitespace-nowrap">
            <span>AxelReps</span>
            <span className="text-litbuy/80 mx-1 font-normal">×</span>
            <KakobuyLogo size={22} />
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {links.map((l) => {
              const active = isActive(l.to, "exact" in l ? l.exact : false);
              const Icon = l.icon;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`relative px-3 py-2 text-sm rounded-full transition inline-flex items-center gap-1.5 ${
                    active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {t(l.key)}
                  {active && (
                    <span className="pointer-events-none absolute left-3 right-3 -bottom-[10px] h-[2px] rounded-full bg-litbuy shadow-[0_0_10px_var(--litbuy)] animate-nav-underline" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex-1 lg:hidden" />

          <button
            onClick={() => setPromoOpen(true)}
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-litbuy px-3 md:px-4 py-2 text-sm font-bold text-litbuy-foreground hover:brightness-110 transition"
          >
            <KakobuyLogo size={18} />
            <span className="hidden md:inline">{t("nav.register")}</span>
          </button>

          <SettingsMenu />

          <button
            aria-label={t("common.menu")}
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden p-2 rounded-full hover:bg-accent transition"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t border-border/60 bg-background/95 backdrop-blur animate-float-in">
            <nav className="mx-auto max-w-7xl px-4 py-3 grid grid-cols-2 gap-2">
              {links.map((l) => {
                const active = isActive(l.to, "exact" in l ? l.exact : false);
                const Icon = l.icon;
                return (
                  <Link
                    key={l.to}
                    to={l.to}
                    className={`inline-flex items-center gap-2 px-3 py-2.5 rounded-2xl text-sm transition ${
                      active ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-accent/60"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {t(l.key)}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </header>
      <PromoPopup open={promoOpen} onClose={() => setPromoOpen(false)} />
    </>
  );
}
