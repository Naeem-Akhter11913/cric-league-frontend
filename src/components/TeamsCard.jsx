import { TOP_TEAMS } from "./data";

export default function TeamsCard() {
  return (
    <div className="rounded-[var(--radius-md)] border border-[var(--color-border-light)] p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex items-center gap-2 font-display font-bold text-[0.95rem] text-[var(--color-text-onLight)]">
          <span style={{ color: "var(--color-accent-blue)" }}>👥</span> TOP 10 TEAMS
        </h3>
        <a className="text-[var(--fs-xs)] font-semibold" style={{ color: "var(--color-primary)" }} href="#">
          View All
        </a>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-[var(--fs-xs)] text-[var(--color-text-onLight-faint)] font-semibold">
            <th className="pb-2 font-semibold">#</th>
            <th className="pb-2 font-semibold">TEAM</th>
            <th className="pb-2 font-semibold text-right">MATCHES</th>
            <th className="pb-2 font-semibold text-right">WINS</th>
            <th className="pb-2 font-semibold text-right">RATING</th>
          </tr>
        </thead>
        <tbody className="text-[var(--fs-sm)]">
          {TOP_TEAMS.map((t) => (
            <tr key={t.rank} className="border-t border-[var(--color-border-light)]">
              <td className="py-2.5 font-semibold text-[var(--color-text-onLight-faint)]">{t.rank}</td>
              <td className="py-2.5">
                <div className="flex items-center gap-2.5">
                  <div className={`w-7 h-7 rounded-full ${t.color}`} />
                  <span className="font-semibold">{t.name}</span>
                </div>
              </td>
              <td className="py-2.5 text-right text-[var(--color-text-onLight-muted)]">{t.matches}</td>
              <td className="py-2.5 text-right text-[var(--color-text-onLight-muted)]">{t.wins}</td>
              <td className="py-2.5 text-right font-bold" style={{ color: "var(--color-primary)" }}>
                {t.rating}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="w-full mt-4 py-2.5 rounded-[var(--radius-sm)] text-[0.8rem] font-bold"
        style={{ backgroundColor: "#efeaff", color: "var(--color-primary)" }}
      >
        View Top 10 Teams
      </button>
    </div>
  );
}
