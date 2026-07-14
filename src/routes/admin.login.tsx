import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useServerFn } from "@tanstack/react-start";
import { adminLogin } from "@/lib/server.functions";
import { setAdminToken } from "@/lib/admin-session";

export const Route = createFileRoute("/admin/login")({ component: AdminLogin });

function AdminLogin() {
  const { t } = useTranslation();
  const nav = useNavigate();
  const login = useServerFn(adminLogin);
  const [pin, setPin] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setBusy(true); setErr("");
    try {
      const r = await login({ data: { pin } });
      if (!r.ok) { setErr(t("admin.wrong")); return; }
      setAdminToken(r.token);
      nav({ to: "/admin" });
    } catch { setErr(t("admin.wrong")); }
    finally { setBusy(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-background">
      <form onSubmit={submit} className="w-full max-w-sm border rounded-3xl p-8 bg-card shadow-xl animate-pop-in">
        <h1 className="font-display text-2xl font-bold mb-6 text-center">{t("admin.login")}</h1>
        <label className="text-xs uppercase tracking-wider text-muted-foreground">{t("admin.pin")}</label>
        <input
          type="password"
          autoFocus
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className="w-full mt-1 mb-4 px-3 py-3 rounded-xl border bg-background text-center tracking-[0.4em] font-mono"
          placeholder="••••••"
        />
        {err && <p className="text-sm text-destructive mb-3 text-center">{err}</p>}
        <button disabled={busy} className="w-full py-2.5 rounded-full bg-foreground text-background font-medium disabled:opacity-50">
          {busy ? "…" : t("admin.sign_in")}
        </button>
      </form>
    </div>
  );
}
