import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Truck, BookOpen } from "lucide-react";

export const Route = createFileRoute("/tracking")({ component: Tracking });

function Tracking() {
  const { t } = useTranslation();
  const [nr, setNr] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nr.trim()) return;
    window.open(`https://t.17track.net/en#nums=${encodeURIComponent(nr.trim())}`, "_blank", "noopener,noreferrer");
  };
  return (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center">
      <div className="mx-auto h-16 w-16 rounded-2xl bg-card border border-border flex items-center justify-center shadow-2xl animate-glow">
        <Truck className="h-7 w-7" />
      </div>
      <h1 className="mt-6 font-display text-5xl font-bold">{t("tracking.title")}</h1>
      <p className="mt-3 text-muted-foreground">{t("tracking.subtitle")}</p>
      <form onSubmit={submit} className="mt-10 flex items-center gap-2 rounded-full border border-border bg-card p-2">
        <input
          value={nr}
          onChange={(e) => setNr(e.target.value)}
          placeholder={t("tracking.placeholder")}
          className="flex-1 bg-transparent px-4 py-2 focus:outline-none text-base"
        />
        <button type="submit" className="px-6 py-2.5 rounded-full bg-foreground text-background font-semibold hover:opacity-90 transition">
          {t("tracking.cta")}
        </button>
      </form>
      <Link
        to="/tutorials"
        className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition"
      >
        <BookOpen className="h-4 w-4" />
        {t("tracking.help")}
      </Link>
    </div>
  );
}
