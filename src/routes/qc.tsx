import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageOff, Search } from "lucide-react";

export const Route = createFileRoute("/qc")({ component: QC });

type QCImage = { url: string };

function QC() {
  const { t } = useTranslation();
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<QCImage[] | null>(null);
  const [touched, setTouched] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!link.trim()) return;
    setUnavailable(true);
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/60 text-xs">
          {t("qc.eyebrow")}
        </div>
        <h1 className="mt-6 font-display text-5xl md:text-6xl font-bold leading-tight">
          {t("qc.title_1")}
          <br />
          {t("qc.title_2")}
        </h1>
        <p className="mt-5 text-muted-foreground max-w-lg mx-auto">{t("qc.subtitle")}</p>
      </div>

      <form onSubmit={submit} className="mt-12 flex items-center gap-2 rounded-full border border-border bg-card p-2 shadow-2xl">
        <input
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder={t("qc.placeholder")}
          className="flex-1 bg-transparent px-4 py-2 focus:outline-none text-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 font-semibold text-sm hover:opacity-90 transition disabled:opacity-60"
        >
          <Search className="h-4 w-4" />
          {t("qc.cta")}
        </button>
      </form>

      <div className="mt-12">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="aspect-square rounded-2xl" />)}
          </div>
        ) : !touched ? (
          <EmptyState label={t("qc.empty")} />
        ) : images && images.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((img, i) => (
              <a
                key={img.url + i}
                href={img.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block aspect-square rounded-2xl overflow-hidden border border-border group animate-float-in bg-card"
              >
                <img src={img.url} alt="" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition" />
              </a>
            ))}
          </div>
        ) : (
          <EmptyState label={t("qc.no_results")} />
        )}
      </div>

      {unavailable && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-background/80 px-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="qc-unavailable-title"
          onClick={() => setUnavailable(false)}
        >
          <div
            className="w-full max-w-md rounded-3xl border border-border bg-card p-8 text-center shadow-2xl animate-pop-in"
            onClick={(e) => e.stopPropagation()}
          >
            <ImageOff className="mx-auto h-10 w-10 text-litbuy" />
            <h2 id="qc-unavailable-title" className="mt-5 font-display text-2xl font-bold">
              QC Finder w przygotowaniu
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Jeszcze pracujemy nad QC Finderem. Funkcja będzie dostępna już wkrótce.
            </p>
            <button
              type="button"
              onClick={() => setUnavailable(false)}
              className="mt-7 w-full rounded-full bg-foreground px-5 py-3 font-semibold text-background transition hover:opacity-90"
            >
              Rozumiem
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="rounded-3xl border border-border bg-card/40 py-20 flex flex-col items-center justify-center text-muted-foreground">
      <ImageOff className="h-8 w-8 mb-3 opacity-60" />
      <p className="text-sm">{label}</p>
    </div>
  );
}
