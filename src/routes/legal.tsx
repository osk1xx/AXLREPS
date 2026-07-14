import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/legal")({
  component: Legal,
  head: () => ({
    meta: [
      { title: "Nota prawna — AxelReps × KakoBuy" },
      { name: "description", content: "Nota prawna serwisu AxelReps." },
    ],
  }),
});

function Legal() {
  const { t } = useTranslation();
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-4xl font-bold mb-8">{t("legal.title")}</h1>
      <div className="whitespace-pre-wrap leading-relaxed text-sm text-muted-foreground">
        {t("legal.body")}
      </div>
    </div>
  );
}
