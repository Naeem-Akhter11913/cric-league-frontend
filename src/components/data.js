export const TOP_PLAYERS = [
  { rank: 1, name: "Naeem Akhtar", team: "Royal Warriors", matches: 18, runs: 862, rating: 732, gradient: "from-amber-300 to-orange-500" },
  { rank: 2, name: "Asad Pathan", team: "Thunder Bolts", matches: 20, runs: 815, rating: 715, gradient: "from-sky-300 to-indigo-500" },
  { rank: 3, name: "Asif Khan", team: "Super Kings", matches: 17, runs: 739, rating: 689, gradient: "from-emerald-300 to-teal-500" },
  { rank: 4, name: "Arif Malik", team: "Green Warriors", matches: 19, runs: 701, rating: 664, gradient: "from-rose-300 to-pink-500" },
  { rank: 5, name: "Sameer Ansari", team: "Strikers Club", matches: 18, runs: 642, rating: 615, gradient: "from-violet-300 to-purple-500" },
];

export const TOP_TEAMS = [
  { rank: 1, name: "Royal Warriors", matches: 15, wins: 12, rating: 1568, color: "bg-amber-400" },
  { rank: 2, name: "Super Kings", matches: 14, wins: 11, rating: 1492, color: "bg-red-400" },
  { rank: 3, name: "Thunder Bolts", matches: 16, wins: 10, rating: 1431, color: "bg-blue-400" },
  { rank: 4, name: "Green Warriors", matches: 15, wins: 9, rating: 1380, color: "bg-emerald-400" },
  { rank: 5, name: "Blue Tigers", matches: 14, wins: 8, rating: 1275, color: "bg-sky-400" },
];

export const TOP_TOURNAMENTS = [
  { rank: 1, name: "Naeem Premier League", teams: 16, status: "LIVE", prize: "₹52,000", color: "bg-purple-400" },
  { rank: 2, name: "City Champions Cup", teams: 32, status: "UPCOMING", prize: "₹1,00,000", color: "bg-indigo-400" },
  { rank: 3, name: "Summer Super Cup", teams: 24, status: "LIVE", prize: "₹75,000", color: "bg-teal-400" },
  { rank: 4, name: "District Premier League", teams: 40, status: "UPCOMING", prize: "₹1,50,000", color: "bg-orange-400" },
  { rank: 5, name: "Monsoon Challenge", teams: 20, status: "COMPLETED", prize: "₹31,000", color: "bg-lime-400" },
];

export const STATS = [
  { value: "500+", label: "Tournaments", icon: "🏆", color: "var(--color-primary-light)", bg: "rgba(124,92,252,0.15)" },
  { value: "1,500+", label: "Teams", icon: "👥", color: "var(--color-accent-green)", bg: "rgba(34,197,94,0.15)" },
  { value: "10,000+", label: "Players", icon: "👤", color: "var(--color-accent-blue)", bg: "rgba(59,130,246,0.15)" },
  { value: "25,000+", label: "Matches Played", icon: "🏏", color: "var(--color-accent-orange)", bg: "rgba(245,166,35,0.15)" },
  { value: "1M+", label: "Balls Bowled", icon: "🎯", color: "var(--color-accent-teal)", bg: "rgba(20,184,166,0.15)" },
  { value: "50K+", label: "Fans & Followers", icon: "❤️", color: "var(--color-accent-red)", bg: "rgba(239,68,68,0.15)" },
];

export const FEATURES = [
  { title: "Live Scoring", desc: "Real-time ball by ball updates with commentary", icon: "⏱️", bg: "rgba(34,197,94,0.12)" },
  { title: "Player Rankings", desc: "Compete and climb the leaderboards", icon: "📊", bg: "rgba(124,92,252,0.12)" },
  { title: "Detailed Statistics", desc: "Track your performance in depth", icon: "📈", bg: "rgba(245,166,35,0.12)" },
  { title: "Team Management", desc: "Manage your team, players & matches", icon: "🤝", bg: "rgba(59,130,246,0.12)" },
  { title: "Tournaments", desc: "Join exciting tournaments and win big", icon: "🏃", bg: "rgba(239,68,68,0.12)" },
  { title: "Awards & Rewards", desc: "Earn rewards and get recognized", icon: "🏆", bg: "rgba(245,166,35,0.12)" },
];

export const TESTIMONIALS = [
  { quote: "This platform has changed the way we play and follow local cricket. The live scoring is amazing!", name: "Imran Ali", role: "Captain, Thunder Bolts", gradient: "from-sky-300 to-indigo-500" },
  { quote: "Cric League helped our team grow and we even won the tournament! Highly recommended.", name: "Asif Khan", role: "Player, Super Kings", gradient: "from-emerald-300 to-teal-500" },
  { quote: "Best platform for tracking stats and improving my game. Love the experience!", name: "Arif Malik", role: "All Rounder, Green Warriors", gradient: "from-rose-300 to-pink-500" },
];

export const FOOTER_LINKS = {
  EXPLORE: ["Tournaments", "Teams", "Players", "Live Scores", "Rankings"],
  COMPANY: ["About Us", "Blog", "Careers", "Privacy Policy", "Terms & Conditions"],
  SUPPORT: ["Help Center", "Contact Us", "How It Works", "FAQs"],
};

export const STATUS_STYLES = {
  LIVE: { bg: "var(--color-badge-live-bg)", tx: "var(--color-badge-live-tx)" },
  UPCOMING: { bg: "var(--color-badge-up-bg)", tx: "var(--color-badge-up-tx)" },
  COMPLETED: { bg: "var(--color-badge-done-bg)", tx: "var(--color-badge-done-tx)" },
};
