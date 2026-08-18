import React from "react"
import Avatar from "./Avatar";

export default function LeaderboardTable({ players }) {
    return (
        <div className="rounded-[var(--radius-lg)] overflow-hidden" style={{ border: "1px solid var(--color-border-light)" }}>
            <table className="w-full border-collapse">
                <thead>
                    <tr style={{ borderBottom: "1px solid var(--color-border-light)" }}>
                        {["#", "PLAYER", "TEAM", "MATCHES", "RUNS", "AVG", "SR"].map((h, i) => (
                            <th
                                key={h}
                                className="font-body font-semibold px-4 py-3 whitespace-nowrap"
                                style={{
                                    color: "var(--color-text-onLight-faint)",
                                    fontSize: "var(--fs-xs)",
                                    letterSpacing: "0.03em",
                                    textAlign: i === 0 ? "center" : i >= 3 ? "center" : "left",
                                }}
                            >
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {players.map((p, idx) => (
                        <tr
                            key={p.name}
                            className="hover:bg-[var(--color-bg-light-2)] transition-colors"
                            style={{ borderBottom: idx === players.length - 1 ? "none" : "1px solid var(--color-border-light)" }}
                        >
                            <td className="px-4 py-3 text-center font-body" style={{ color: "var(--color-text-onLight-faint)", fontSize: "var(--fs-sm)" }}>
                                {idx + 1}
                            </td>
                            <td className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                    <Avatar name={p.name} team={p.team} size={28} />
                                    <span className="font-body font-semibold" style={{ color: "var(--color-text-onLight)", fontSize: "var(--fs-sm)" }}>
                                        {p.name}
                                    </span>
                                </div>
                            </td>
                            <td className="px-4 py-3 font-body" style={{ color: "var(--color-text-onLight-muted)", fontSize: "var(--fs-sm)" }}>
                                {p.team}
                            </td>
                            <td className="px-4 py-3 text-center font-body" style={{ color: "var(--color-text-onLight)", fontSize: "var(--fs-sm)" }}>
                                {p.matches}
                            </td>
                            <td className="px-4 py-3 text-center font-body font-semibold" style={{ color: "var(--color-text-onLight)", fontSize: "var(--fs-sm)" }}>
                                {p.runs}
                            </td>
                            <td className="px-4 py-3 text-center font-body" style={{ color: "var(--color-text-onLight)", fontSize: "var(--fs-sm)" }}>
                                {p.avg}
                            </td>
                            <td className="px-4 py-3 text-center font-body" style={{ color: "var(--color-text-onLight)", fontSize: "var(--fs-sm)" }}>
                                {p.sr}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="text-center py-3" style={{ borderTop: "1px solid var(--color-border-light)" }}>
                <a href="#" className="font-body font-semibold" style={{ color: "var(--color-primary)", fontSize: "var(--fs-sm)" }}>
                    View Full Leaderboard
                </a>
            </div>
        </div>
    );
}