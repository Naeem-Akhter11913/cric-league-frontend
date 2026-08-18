import { STATS } from "./data";

export default function StatsBar() {
  return (
    <section style={{ background: "var(--color-bg-dark)" }} className="max-w-[1280px] mx-auto rounded-[var(--radius-lg)] p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
      <div style={{ background: "var(--color-bg-dark)" }} className="max-w-[1280px] mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
        {STATS.map((s) => (
          <div key={s.label} className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-lg"
              style={{ background: s.bg, color: s.color }}
            >
              {s.icon}
            </div>
            <div>
              <p className="font-display font-extrabold [font-size:var(--fs-stat-num)] text-[var(--color-text-onDark)] leading-none">
                {s.value}
              </p>
              <p className="text-[0.75rem] text-[var(--color-text-onDark-faint)] mt-1">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
