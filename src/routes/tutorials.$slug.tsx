import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { hasSupabaseConfig, supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/Skeleton";
import { pickLang } from "@/lib/text";
import type { Lang } from "@/lib/i18n";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/tutorials/$slug")({ component: TutorialDetail });

type Step = {
  id: string;
  step_index: number;
  title: Record<string, string>;
  body: Record<string, string>;
  image_urls: string[];
  buttons: { label: Record<string, string>; url: string }[];
};

function TutorialDetail() {
  const { slug } = Route.useParams();
  const { i18n } = useTranslation();
  const lang = i18n.language as Lang;
  const [title, setTitle] = useState<Record<string, string> | null>(null);
  const [steps, setSteps] = useState<Step[] | null>(null);
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!hasSupabaseConfig()) {
      setTitle({ pl: "", en: "" });
      setSteps([]);
      return;
    }
    (async () => {
      try {
        const { data: tut } = await supabase.from("tutorials").select("id,title").eq("slug", slug).maybeSingle();
        if (!tut) { setTitle({ pl: "", en: "" }); setSteps([]); return; }
        setTitle(tut.title as Record<string, string>);
        const { data: st } = await supabase.from("tutorial_steps").select("id,step_index,title,body,image_urls,buttons").eq("tutorial_id", tut.id).order("step_index");
        setSteps((st ?? []) as Step[]);
      } catch {
        setTitle({ pl: "", en: "" });
        setSteps([]);
      }
    })();
  }, [slug]);

  if (!steps || !title) return <div className="mx-auto max-w-3xl px-6 py-16"><Skeleton className="h-96" /></div>;
  if (steps.length === 0) return <div className="mx-auto max-w-3xl px-6 py-16">Tutorial not found.</div>;
  const s = steps[i];

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-xs uppercase tracking-widest text-muted-foreground">{pickLang(title, lang)}</p>
      <h2 className="font-display text-3xl font-bold mt-2 mb-6">{pickLang(s.title, lang)}</h2>
      {s.image_urls?.length > 0 && (
        <div className="grid gap-3 mb-6">
          {s.image_urls.map((u, idx) => <img key={idx} src={u} alt="" className="rounded-lg border w-full" />)}
        </div>
      )}
      <div className="prose prose-sm max-w-none whitespace-pre-wrap leading-relaxed">{pickLang(s.body, lang)}</div>
      {s.buttons?.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {s.buttons.map((b, idx) => (
            <a key={idx} href={b.url} target="_blank" rel="noopener noreferrer"
               className="px-4 py-2 rounded-md border hover:bg-accent">{pickLang(b.label, lang)}</a>
          ))}
        </div>
      )}
      <div className="mt-10 flex items-center justify-between">
        <button disabled={i === 0} onClick={() => setI((v) => v - 1)}
          className="inline-flex items-center gap-1 px-4 py-2 rounded-md border disabled:opacity-40 hover:bg-accent">
          <ChevronLeft className="h-4 w-4" /> Prev
        </button>
        <span className="text-sm text-muted-foreground">Step {i + 1} / {steps.length}</span>
        <button disabled={i === steps.length - 1} onClick={() => setI((v) => v + 1)}
          className="inline-flex items-center gap-1 px-4 py-2 rounded-md border disabled:opacity-40 hover:bg-accent">
          Next <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
