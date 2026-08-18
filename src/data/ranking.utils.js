/* ============================================================
   DATA
   ============================================================ */
export const TABS = ["Team Rankings", "Player Rankings", "Tournaments"];

export const TEAM_RANKINGS = [
  { name: "Royal Warriors", crest: "#f5a623", matches: 15, wins: 12, losses: 3, nrr: "+1.235", points: 1568 },
  { name: "Super Kings", crest: "#f5a623", matches: 14, wins: 11, losses: 3, nrr: "+0.845", points: 1492 },
  { name: "Thunder Bolts", crest: "#3b82f6", matches: 16, wins: 10, losses: 6, nrr: "+0.123", points: 1431 },
  { name: "Green Warriors", crest: "#22c55e", matches: 15, wins: 9, losses: 6, nrr: "-0.250", points: 1380 },
  { name: "Blue Tigers", crest: "#3b82f6", matches: 14, wins: 8, losses: 6, nrr: "-1.125", points: 1275 },
  { name: "Strikers Club", crest: "#ef4444", matches: 15, wins: 7, losses: 8, nrr: "-0.650", points: 1180 },
  { name: "Lightning XI", crest: "#ef4444", matches: 14, wins: 6, losses: 8, nrr: "-1.300", points: 1020 },
  { name: "Rising Stars", crest: "#22c55e", matches: 13, wins: 5, losses: 8, nrr: "-1.789", points: 980 },
];

export const RANKING_FACTORS = ["Match Results", "Net Run Rate (NRR)", "Points System", "Head to Head Record"];

export const POINTS_SYSTEM = [
  { label: "Win", value: "2 Points" },
  { label: "Tie", value: "1 Point" },
  { label: "No Result", value: "1 Point" },
  { label: "Loss", value: "0 Points" },
];

export const MEDAL_COLORS = { 1: "#f5c542", 2: "#c7cdd9", 3: "#d08a52" };
