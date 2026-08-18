const TRUST_BADGES = [
  { title: "100% Free", sub: "Always & Forever", icon: "💚", bg: "rgba(34,197,94,0.15)" },
  { title: "Easy to Use", sub: "Simple & Fast", icon: "⚡", bg: "rgba(59,130,246,0.15)" },
  { title: "For Everyone", sub: "Players, Captains & Fans", icon: "🏅", bg: "rgba(245,166,35,0.15)" },
];

export default function CTABanner() {
  return (
    <section className="px-6 lg:px-10 pb-16">
      <div
        className="max-w-[1280px] mx-auto rounded-[var(--radius-lg)] p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-8"
        style={{
          background:
            "radial-gradient(ellipse 700px 300px at 15% 30%, rgba(124,92,252,0.35), transparent 60%), linear-gradient(120deg,#120a2e,#1b1040 60%, #0b0720)",
        }}
      >
        <div>
          <h3 className="font-display font-extrabold text-[1.35rem] text-white mb-2">READY TO MAKE YOUR MARK?</h3>
          <p className="text-[var(--color-text-onDark-muted)] text-[0.9rem]">
            Join now and be a part of the fastest growing cricket community.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-8">
          {TRUST_BADGES.map((b) => (
            <div key={b.title} className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: b.bg }}>
                {b.icon}
              </div>
              <div className="leading-tight">
                <p className="text-white text-[0.8rem] font-bold">{b.title}</p>
                <p className="text-[0.68rem] text-[var(--color-text-onDark-faint)]">{b.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="px-6 py-3.5 rounded-[var(--radius-sm)] grad-primary text-white font-bold text-sm shadow-[0_8px_20px_rgba(124,92,252,0.4)] hover:brightness-110 transition whitespace-nowrap">
            Join Now – It's Free! 🚀
          </button>
          <p className="text-[0.68rem] text-[var(--color-text-onDark-faint)] mt-2">No credit card required</p>
        </div>
      </div>
    </section>
  );
}
