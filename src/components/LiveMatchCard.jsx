export default function LiveMatchCard() {
  return (
    <div
      className="absolute -bottom-6 right-0 w-[86%] sm:w-[80%] rounded-[var(--radius-md)] p-5 shadow-2xl"
      style={{ background: "var(--color-card-dark)", border: "1px solid var(--color-border-dark)" }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="flex items-center gap-1.5 text-[var(--color-accent-red)] text-[0.7rem] font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-red)] animate-pulse" />
          LIVE MATCH
        </span>
      </div>
      <p className="text-[0.7rem] text-[var(--color-text-onDark-faint)] mb-3">Naeem Premier League</p>

      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full grad-primary flex items-center justify-center text-white text-[0.6rem] font-bold">
            RW
          </div>
          <span className="text-[0.85rem] font-semibold text-[var(--color-text-onDark)]">Royal Warriors</span>
        </div>
        <div className="text-right">
          <p className="text-[var(--color-text-onDark)] font-bold text-[1.05rem] leading-none">128/4</p>
          <p className="text-[0.65rem] text-[var(--color-text-onDark-faint)]">15.3 Overs</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[var(--color-accent-blue)] flex items-center justify-center text-white text-[0.6rem] font-bold">
            TB
          </div>
          <span className="text-[0.85rem] font-semibold text-[var(--color-text-onDark)]">Thunder Bolts</span>
        </div>
        <div className="text-right">
          <p className="text-[var(--color-text-onDark)] font-bold text-[1.05rem] leading-none">125/8</p>
          <p className="text-[0.65rem] text-[var(--color-text-onDark-faint)]">20 Overs</p>
        </div>
      </div>

      <div className="pt-3 border-t" style={{ borderColor: "var(--color-border-dark)" }}>
        <p className="text-[0.72rem] text-[var(--color-text-onDark-muted)]">
          Royal Warriors need <span className="text-white font-semibold">43 runs</span> in{" "}
          <span className="text-white font-semibold">27 balls</span>
        </p>
      </div>
    </div>
  );
}
