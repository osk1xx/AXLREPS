import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

export type SelectOption = { value: string; label: string };

export function CustomSelect({
  value,
  onChange,
  options,
  placeholder,
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full inline-flex items-center justify-between gap-2 px-4 py-2.5 rounded-full border bg-card hover:bg-accent transition text-sm font-medium"
      >
        <span className={selected ? "" : "text-muted-foreground"}>
          {selected?.label ?? placeholder ?? "Wybierz…"}
        </span>
        <ChevronDown className={`h-4 w-4 opacity-70 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 left-0 mt-2 z-30 rounded-2xl border bg-popover shadow-2xl overflow-hidden max-h-80 overflow-y-auto animate-float-in">
          {options.map((o) => {
            const active = o.value === value;
            return (
              <button
                key={o.value}
                type="button"
                onClick={() => { onChange(o.value); setOpen(false); }}
                className={`w-full flex items-center justify-between gap-2 px-4 py-2.5 text-sm text-left transition ${
                  active ? "bg-litbuy/15 text-foreground" : "hover:bg-accent"
                }`}
              >
                <span>{o.label}</span>
                {active && <Check className="h-4 w-4 text-litbuy" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
