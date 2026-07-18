export const CATEGORIES = [
  "Buty",
  "bluzy",
  "koszulki",
  "swetry",
  "kurtki",
  "paski",
  "intymne",
  "akcesoria",
  "torby",
  "spodnie",
  "spodenki",
  "czapki",
  "elektronika",
  "bizuteria",
  "inne",
] as const;

export type Category = (typeof CATEGORIES)[number];

const LABELS: Record<Category, string> = {
  bluzy: "Bluzy",
  koszulki: "Koszulki",
  swetry: "Swetry",
  kurtki: "Kurtki",
  paski: "Paski",
  intymne: "Intymne",
  akcesoria: "Akcesoria",
  torby: "Torby",
  spodnie: "Spodnie",
  spodenki: "Spodenki",
  czapki: "Czapki",
  elektronika: "Elektronika",
  bizuteria: "Biżuteria",
  inne: "Inne",
};

export function categoryLabel(c: string | null | undefined): string {
  if (!c) return "Inne";
  return LABELS[c as Category] ?? c;
}
