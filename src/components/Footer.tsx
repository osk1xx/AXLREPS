import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="mt-24 border-t">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row gap-4 items-center justify-between text-sm text-muted-foreground">
        <p className="leading-relaxed text-center md:text-left">
          © 2026 AxelReps × KakoBuy. Wszelkie prawa zastrzeżone.
        </p>
        <Link
          to="/legal"
          className="inline-flex items-center rounded-full border border-foreground/20 px-4 py-2 text-foreground hover:bg-foreground hover:text-background transition"
        >
          {t("legal.button")}
        </Link>
      </div>
    </footer>
  );
}
