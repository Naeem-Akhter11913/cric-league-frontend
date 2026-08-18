import { FEATURES } from "./data";

export default function WhyJoin() {
  return (
    <section className="bg-[var(--color-bg-light)] py-16 px-6 lg:px-10">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display font-extrabold text-[1.6rem] text-[var(--color-text-onLight)] mb-2">
            WHY JOIN CRIC LEAGUE?
          </h2>
          <p className="text-[var(--color-text-onLight-muted)] text-[0.95rem]">
            Everything you need to live your cricket dream
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-[var(--radius-md)] border border-[var(--color-border-light)] p-6 text-center hover:shadow-[var(--shadow-card)] transition"
            >
              <div
                className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center text-xl"
                style={{ background: f.bg }}
              >
                {f.icon}
              </div>
              <h4 className="font-display font-bold text-[var(--fs-feature-h)] text-[var(--color-text-onLight)] mb-1.5">
                {f.title}
              </h4>
              <p className="text-[0.78rem] text-[var(--color-text-onLight-muted)] leading-snug">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
