/** Helpers for bookable service labels like "Haircut (Adults) — K130". */

export function parseServiceLabel(label: string): { name: string; price: number | null } {
  const match = label.match(/^(.*?)\s*[—–-]\s*K\s*(\d+)\s*$/i);
  if (match) {
    return { name: match[1].trim(), price: Number(match[2]) };
  }
  return { name: label.trim(), price: null };
}

export function formatServiceLabel(name: string, price: number | null | undefined): string {
  const trimmed = name.trim();
  if (price == null || Number.isNaN(price)) return trimmed;
  return `${trimmed} — K${price}`;
}

export function formatPriceDisplay(price: number | null | undefined, label: string): string {
  if (price != null && !Number.isNaN(price)) return `K${price}`;
  const match = label.match(/[—–-]\s*(.+)$/);
  if (match) return match[1].trim();
  return "—";
}
