import kakobuyLogo from "@/assets/kakobuy-logo.png";

export const KAKOBUY_LOGO_URL = kakobuyLogo;
// Legacy re-export so existing imports keep working.
export const LITBUY_LOGO_URL = KAKOBUY_LOGO_URL;

export function KakobuyLogo({
  size = 22,
  className = "",
  invert = false,
}: {
  size?: number;
  className?: string;
  compact?: boolean;
  /** Set true when placing the logo on a white/light background so the white glyph flips to dark. */
  invert?: boolean;
}) {
  return (
    <img
      src={KAKOBUY_LOGO_URL}
      alt="KakoBuy"
      width={size}
      height={size}
      className={`inline-block object-contain ${invert ? "invert" : ""} ${className}`}
      style={{ height: size, width: "auto" }}
    />
  );
}

// Back-compat alias.
export const LitBuyLogo = KakobuyLogo;
