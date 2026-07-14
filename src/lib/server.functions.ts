import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// ---- Admin auth ----
async function getAdmin() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

function randToken() {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function verifyAdminToken(token: string | null | undefined): Promise<boolean> {
  if (!token) return false;
  const db = await getAdmin();
  const { data } = await db
    .from("admin_sessions")
    .select("token, expires_at")
    .eq("token", token)
    .maybeSingle();
  if (!data) return false;
  return new Date(data.expires_at as unknown as string).getTime() > Date.now();
}

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((d: { pin: string }) => z.object({ pin: z.string() }).parse(d))
  .handler(async ({ data }) => {
    const adminPin = process.env.ADMIN_PIN || "xvzaxl";
    if (data.pin !== adminPin) return { ok: false as const };
    const db = await getAdmin();
    const token = randToken();
    await db.from("admin_sessions").insert({ token });
    return { ok: true as const, token };
  });

export const adminCheck = createServerFn({ method: "POST" })
  .inputValidator((d: { token: string }) => z.object({ token: z.string() }).parse(d))
  .handler(async ({ data }) => ({ ok: await verifyAdminToken(data.token) }));

function collectImageUrls(value: unknown, out: Set<string>) {
  if (!value) return;
  if (typeof value === "string") {
    if (/^https?:\/\/.+\.(jpe?g|png|webp)(\?|$)/i.test(value) || /^https?:\/\/.+\/api\/proxy/i.test(value)) {
      out.add(value);
    }
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item) => collectImageUrls(item, out));
    return;
  }
  if (typeof value === "object") {
    const record = value as Record<string, unknown>;
    collectImageUrls(record.url, out);
    collectImageUrls(record.src, out);
    collectImageUrls(record.image, out);
    collectImageUrls(record.image_url, out);
    collectImageUrls(record.image_list, out);
    collectImageUrls(record.photos, out);
    Object.values(record).forEach((item) => collectImageUrls(item, out));
  }
}

function normalizeQcUrl(url: string) {
  if (url.startsWith("https://qcitems.com/api/proxy")) return url;
  return url.startsWith("//") ? `https:${url}` : url;
}

export const scrapeQC = createServerFn({ method: "POST" })
  .inputValidator((d: { link: string }) => z.object({ link: z.string() }).parse(d))
  .handler(async ({ data }) => {
    const normalized = data.link.trim().replace(/^(https?:\/\/)m\./i, "$1");
    const imageSet = new Set<string>();
    try {
      const res = await fetch(`https://www.tymixfinds.pl/api/qc?url=${encodeURIComponent(normalized)}`, {
        headers: {
          "User-Agent": "Mozilla/5.0",
          Accept: "application/json",
          Referer: "https://www.tymixfinds.pl/qc-finder",
        },
        redirect: "follow",
      });
      if (res.ok) collectImageUrls(await res.json(), imageSet);
    } catch { /* empty */ }
    const images = Array.from(imageSet)
      .map(normalizeQcUrl)
      .filter((url) => !/logo|icon|favicon|sprite/i.test(url))
      .slice(0, 80)
      .map((url) => ({ url }));
    return { images };
  });

// ---- Admin CRUD helpers ----
const AdminHeader = z.object({ token: z.string() });

async function requireAdmin(token: string) {
  if (!(await verifyAdminToken(token))) throw new Error("Unauthorized");
  return getAdmin();
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ł/g, "l")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || `item-${Date.now().toString(36)}`;
}

export const adminUpsertProduct = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    AdminHeader.extend({
      product: z.object({
        id: z.string().uuid().optional(),
        name: z.string().min(1),
        link: z.string().min(1),
        price_cny: z.number().nullable().optional(),
        image_url: z.string().nullable().optional(),
        category: z.string().nullable().optional(),
      }),
    }).parse(d),
  )
  .handler(async ({ data }) => {
    const db = await requireAdmin(data.token);
    const row = {
      ...data.product,
      brand_id: null,
      category_id: null,
      badge: null,
      is_draft: false,
    };
    const { data: saved, error } = await db.from("products").upsert(row).select().single();
    if (error) throw new Error(error.message);
    return saved;
  });

export const adminDelete = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    AdminHeader.extend({
      table: z.enum(["products", "tutorials", "tutorial_steps", "sellers"]),
      id: z.string().uuid(),
    }).parse(d),
  )
  .handler(async ({ data }) => {
    const db = await requireAdmin(data.token);
    const { error } = await db.from(data.table).delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminUpsertGeneric = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    AdminHeader.extend({
      table: z.enum(["sellers", "tutorials", "tutorial_steps"]),
      row: z.record(z.string(), z.any()),
    }).parse(d),
  )
  .handler(async ({ data }) => {
    const db = await requireAdmin(data.token);
    const row = { ...data.row };
    // Auto-generate slug if missing on tables that use it.
    if ((data.table === "tutorials" || data.table === "sellers") && !row.slug) {
      const source =
        (typeof row.title === "object" && row.title && (row.title.pl || row.title.en)) ||
        row.name || row.title || "";
      row.slug = slugify(String(source));
    }
    const { data: saved, error } = await db.from(data.table).upsert(row).select().single();
    if (error) throw new Error(error.message);
    return saved;
  });

export const adminSetConfig = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    AdminHeader.extend({ key: z.string(), value: z.any() }).parse(d),
  )
  .handler(async ({ data }) => {
    const db = await requireAdmin(data.token);
    const { error } = await db.from("site_config").upsert({
      key: data.key,
      value: data.value,
      updated_at: new Date().toISOString(),
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });
