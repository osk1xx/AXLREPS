import { useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Gift } from "lucide-react";
import { PromoPopup } from "./PromoPopup";

export function GiftFAB() {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  if (path === "/") return null;
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Get a gift"
        className="fixed bottom-6 left-6 z-40 h-14 w-14 rounded-full bg-litbuy text-litbuy-foreground flex items-center justify-center shadow-xl gift-pulse hover:scale-110 transition"
      >
        <Gift className="h-6 w-6" />
      </button>
      <PromoPopup open={open} onClose={() => setOpen(false)} />
    </>
  );
}
