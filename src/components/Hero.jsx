import BatsmanArt from "./BatsmanArt";
import LiveMatchCard from "./LiveMatchCard";

const MINI_FEATURES = [
  {
    label: "Live Scores",
    sub: "Ball by Ball Updates",
    color: "var(--color-accent-green)",
    bg: "rgba(34,197,94,0.15)",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M12 8v4l3 3M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: "Player Stats",
    sub: "Detailed Analytics",
    color: "var(--color-accent-blue)",
    bg: "rgba(59,130,246,0.15)",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M3 3v18h18M7 15l4-5 3 3 5-7" />
      </svg>
    ),
  },
  {
    label: "Tournaments",
    sub: "Compete & Win",
    color: "var(--color-accent-orange)",
    bg: "rgba(245,166,35,0.15)",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 01-10 0V4zM3 5h4v2a3 3 0 01-3 3H3V5zM21 5h-4v2a3 3 0 003 3h1V5z" />
      </svg>
    ),
  },
];

const AVATAR_GRADIENTS = [
  "from-orange-300 to-orange-500",
  "from-sky-300 to-sky-500",
  "from-rose-300 to-rose-500",
  "from-emerald-300 to-emerald-500",
];

export default function Hero() {
  return (
    <section className="max-w-[1280px] mx-auto px-6 lg:px-10 pt-6 pb-14 grid lg:grid-cols-[1.05fr_1fr] gap-10 items-center">
      <div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[var(--radius-pill)] border border-[var(--color-primary)]/40 bg-[var(--color-primary)]/10 [font-size:var(--fs-eyebrow)] font-bold tracking-wide text-[var(--color-primary-light)] mb-6">
          THE HOME OF LOCAL CRICKET
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </div>

        <h1 className="font-display font-extrabold text-[var(--color-text-onDark)] [font-size:2.1rem] sm:[font-size:2.5rem] lg:[font-size:var(--fs-hero-h1)] leading-[1.12] tracking-tight mb-5">
          WHERE EVERY MATCH
          <br />
          MAKES YOU <span className="text-gradient">A HERO</span>
        </h1>

        <p className="text-[var(--fs-hero-sub)] text-white leading-relaxed max-w-[480px] mb-8">
          Join thousands of players, teams and fans. Compete in tournaments, track your performance and make your
          cricketing journey legendary.
        </p>

        {/* mini feature row */}
        <div className="flex flex-wrap gap-7 mb-8">
          {MINI_FEATURES.map((f) => (
            <div key={f.label} className="flex items-center gap-2.5">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: f.bg, color: f.color }}
              >
                {f.icon}
              </div>
              <div className="leading-tight">
                <p className="text-[0.8rem] font-bold text-[var(--color-text-onDark)]">{f.label}</p>
                <p className="text-[0.7rem] text-[var(--color-text-onDark-faint)]">{f.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button className="px-6 py-3.5 rounded-[var(--radius-sm)] grad-primary text-white font-bold text-sm shadow-[0_8px_20px_rgba(124,92,252,0.35)] hover:brightness-110 transition">
            Join Now – It's Free!
          </button>
          <button className="px-6 py-3.5 rounded-[var(--radius-sm)] border border-[var(--color-border-dark)] text-[var(--color-text-onDark)] font-bold text-sm hover:bg-white/5 transition">
            Explore Tournaments
          </button>
        </div>

        {/* social proof */}
        <div className="flex items-center gap-3">
          <div className="flex -space-x-3">
            {AVATAR_GRADIENTS.map((g, i) => (
              <div
                key={i}
                className={`w-9 h-9 rounded-full ring-2 ring-[var(--color-bg-dark)] bg-gradient-to-br ${g}`}
              />
            ))}
          </div>
          <p className="text-[0.8rem] text-[var(--color-text-onDark-muted)]">
            <span className="text-[var(--color-text-onDark)] font-bold">10,000+</span> Players &nbsp;•&nbsp;{" "}
            <span className="text-[var(--color-text-onDark)] font-bold">1,500+</span> Teams &nbsp;•&nbsp;{" "}
            <span className="text-[var(--color-text-onDark)] font-bold">500+</span> Tournaments
          </p>
        </div>
      </div>

      {/* Right: hero art + live card */}
      <div className="relative">
        <BatsmanArt />
        <LiveMatchCard />
      </div>
    </section>
  );
}
