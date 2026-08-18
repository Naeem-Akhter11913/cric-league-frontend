import { TOP_PLAYERS } from "./data";

export default function PlayersCard() {
  return (
    <div className="rounded-[var(--radius-md)] border border-[var(--color-border-light)] p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex items-center gap-2 font-display font-bold text-[0.95rem] text-[var(--color-text-onLight)]">
          <span className="text-[var(--color-accent-orange)]">🏆</span> TOP 50 PLAYERS
        </h3>
        <a className="text-[var(--fs-xs)] font-semibold" style={{ color: "var(--color-primary)" }} href="#">
          View All
        </a>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-[var(--fs-xs)] text-[var(--color-text-onLight-faint)] font-semibold">
            <th className="pb-2 font-semibold">#</th>
            <th className="pb-2 font-semibold">PLAYER</th>
            <th className="pb-2 font-semibold text-right">MATCHES</th>
            <th className="pb-2 font-semibold text-right">RUNS</th>
            <th className="pb-2 font-semibold text-right">RATING</th>
          </tr>
        </thead>
        <tbody className="text-[var(--fs-sm)]">
          {TOP_PLAYERS.map((p) => (
            <tr key={p.rank} className="border-t border-[var(--color-border-light)]">
              <td className="py-2.5 font-semibold text-[var(--color-text-onLight-faint)]">{p.rank}</td>
              <td className="py-2.5">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${p.gradient}`} />
                  <div className="leading-tight">
                    <p className="font-semibold text-[var(--color-text-onLight)]">{p.name}</p>
                    <p className="text-[0.68rem] text-[var(--color-text-onLight-faint)]">({p.team})</p>
                  </div>
                </div>
              </td>
              <td className="py-2.5 text-right text-[var(--color-text-onLight-muted)]">{p.matches}</td>
              <td className="py-2.5 text-right text-[var(--color-text-onLight-muted)]">{p.runs}</td>
              <td className="py-2.5 text-right font-bold" style={{ color: "var(--color-primary)" }}>
                {p.rating}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="w-full mt-4 py-2.5 rounded-[var(--radius-sm)] text-[0.8rem] font-bold"
        style={{ backgroundColor: "#efeaff", color: "var(--color-primary)" }}
      >
        View Top 50 Players
      </button>
    </div>
  );
}
