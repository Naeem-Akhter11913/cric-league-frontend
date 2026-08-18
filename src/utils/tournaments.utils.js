export const FILTERS = ["All", "Live", "Upcoming", "Completed", "Favorites"];
export const ROWS_PER_PAGE = 5;
export const NOW = new Date("2026-08-12T09:00:00");

export function tier(prize) {
  if (prize >= 100000) return { name: "Gold", ring: "#f5c542", glow: "rgba(245,197,66,0.55)" };
  if (prize >= 50000) return { name: "Silver", ring: "#c7cdd9", glow: "rgba(199,205,217,0.45)" };
  return { name: "Bronze", ring: "#d08a52", glow: "rgba(208,138,82,0.45)" };
}

export function daysUntil(dateStr) {
  const diff = new Date(dateStr) - NOW;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function fmtDateRange(start, end) {
  const s = new Date(start), e = new Date(end);
  const opts = { month: "short", day: "2-digit" };
  return `${s.toLocaleDateString("en-US", opts)} – ${e.toLocaleDateString("en-US", opts)}, ${e.getFullYear()}`;
}

