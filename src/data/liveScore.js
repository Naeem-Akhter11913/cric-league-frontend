export const TABS = ["All Matches", "Live", "Upcoming", "Completed"];

export const FEATURED_MATCH = {
  tournament: "Naeem Premier League 2026 · Match 18",
  teamA: { name: "Royal Warriors", crest: "#f5a623", score: "128/4", overs: "15.3 Overs" },
  teamB: { name: "Thunder Bolts", crest: "#3b82f6", score: "125/8", overs: "20 Overs" },
  rrr: "8.25",
  crr: "8.25",
  situation: "Royal Warriors need 43 runs in 27 balls",
};

export const RECENT_BALLS = [
  { over: "15.3", value: "4", label: "FOUR", kind: "boundary" },
  { over: "15.2", value: "1", label: "1 RUN", kind: "run" },
  { over: "15.1", value: "W", label: "WICKET", kind: "wicket" },
  { over: "15.0", value: "6", label: "SIX", kind: "six" },
  { over: "14.6", value: "1", label: "1 RUN", kind: "run" },
  { over: "14.5", value: "2", label: "2 RUNS", kind: "run" },
];

export const OTHER_LIVE_MATCHES = [
  {
    tournament: "City Champions Cup · Match 32",
    teamA: { name: "Super Kings", crest: "#f5a623", score: "98/3 (12.1)" },
    teamB: { name: "Green Warriors", crest: "#22c55e", score: "--/--" },
    note: "Super Kings elected to bat",
    noteColor: "var(--color-accent-green)",
    status: "live",
  },
  {
    tournament: "Summer Super Cup · Match 12",
    teamA: { name: "Blue Tigers", crest: "#3b82f6", score: "--/--" },
    teamB: { name: "Strikers Club", crest: "#ef4444", score: "--/--" },
    note: "Match yet to start",
    noteColor: "var(--color-text-onLight-faint)",
    status: "upcoming",
  },
];