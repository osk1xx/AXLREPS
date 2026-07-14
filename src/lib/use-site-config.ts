import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useSiteConfig<T = unknown>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let alive = true;
    try {
      supabase
        .from("site_config")
        .select("value")
        .eq("key", key)
        .maybeSingle()
        .then(({ data }) => {
          if (alive && data) setValue(data.value as T);
          if (alive) setLoading(false);
        })
        .catch(() => {
          if (alive) setLoading(false);
        });
    } catch {
      // Use the supplied fallback until Supabase is configured.
      setLoading(false);
    }
    return () => { alive = false; };
  }, [key]);
  return { value, loading };
}
