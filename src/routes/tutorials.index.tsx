import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { hasSupabaseConfig, supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/Skeleton";
import { pickLang } from "@/lib/text";
import type { Lang } from "@/lib/i18n";

export const Route = createFileRoute("/tutorials/")({ component: TutorialsIndex });

type T = { id: string; slug: string; title: Record<string, string>; description: Record<string, string>; cover_url: string | null };

function TutorialsIndex() {
  const { t, i18n } = useTranslation();
  const [rows, setRows] = useState<T[] | null>(null);
  useEffect(() => {
    if (!hasSupabaseConfig()) {
      setRows([]);
      return;
    }
    supabase.from("tutorials").select("id,slug,title,description,cover_url").eq("is_published", true)
      .then(({ data }) => setRows((data ?? []) as T[]))
      .catch(() => setRows([]));
  }, []);
  const lang = i18n.language as Lang;
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="font-display text-4xl font-bold mb-10">{t("tutorials.title")}</h1>
      {!rows ? (
        <div className="grid md:grid-cols-3 gap-6">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-64" />)}</div>
      ) : rows.length === 0 ? (
        <p className="text-muted-foreground">No tutorials yet.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {rows.map((r) => (
            <Link key={r.id} to="/tutorials/$slug" params={{ slug: r.slug }}
              className="group border rounded-xl overflow-hidden hover:shadow-lg transition animate-float-in bg-card">
              <div className="aspect-video bg-muted overflow-hidden">
                {r.cover_url && <img src={r.cover_url} alt="" className="w-full h-full object-cover group-hover:scale-105 transition" />}
              </div>
              <div className="p-5">
                <h3 className="font-display font-bold text-lg">{pickLang(r.title, lang)}</h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{pickLang(r.description, lang)}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
