import React from 'react'
import RankBadge from './RankBadge';
import RankingCrest from './RankingCrest';

const RankingsTable = ({ teams }) => {
   return (
    <table className="w-full border-collapse">
      <thead>
        <tr style={{ borderBottom: "1px solid var(--color-border-light)" }}>
          {["#", "TEAM", "MATCHES", "WINS", "LOSSES", "NRR", "POINTS"].map((h, i) => (
            <th
              key={h}
              className="font-body font-semibold px-5 py-3 whitespace-nowrap"
              style={{
                color: "var(--color-text-onLight-faint)",
                fontSize: "var(--fs-xs)",
                letterSpacing: "0.03em",
                textAlign: i === 0 ? "center" : i >= 2 ? "center" : "left",
              }}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {teams.map((t, idx) => {
          const rank = idx + 1;
          return (
            <tr
              key={t.name}
              className="hover:bg-[var(--color-bg-light-2)] transition-colors"
              style={{ borderBottom: idx === teams.length - 1 ? "none" : "1px solid var(--color-border-light)" }}
            >
              <td className="px-5 py-3.5 text-center">
                <RankBadge rank={rank} />
              </td>
              <td className="px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <RankingCrest color={t.crest} size={26} />
                  <span className="font-body font-semibold" style={{ color: "var(--color-text-onLight)", fontSize: "var(--fs-sm)" }}>
                    {t.name}
                  </span>
                </div>
              </td>
              <td className="px-5 py-3.5 text-center font-body" style={{ color: "var(--color-text-onLight)", fontSize: "var(--fs-sm)" }}>
                {t.matches}
              </td>
              <td className="px-5 py-3.5 text-center font-body" style={{ color: "var(--color-text-onLight)", fontSize: "var(--fs-sm)" }}>
                {t.wins}
              </td>
              <td className="px-5 py-3.5 text-center font-body" style={{ color: "var(--color-text-onLight)", fontSize: "var(--fs-sm)" }}>
                {t.losses}
              </td>
              <td
                className="px-5 py-3.5 text-center font-body font-semibold"
                style={{
                  color: t.nrr.startsWith("+") ? "var(--color-accent-green)" : "var(--color-accent-red)",
                  fontSize: "var(--fs-sm)",
                }}
              >
                {t.nrr}
              </td>
              <td className="px-5 py-3.5 text-center font-body font-bold" style={{ color: "var(--color-text-onLight)", fontSize: "var(--fs-sm)" }}>
                {t.points}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default RankingsTable