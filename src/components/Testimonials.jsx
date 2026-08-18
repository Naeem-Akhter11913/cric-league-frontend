import { useState } from "react";
import { TESTIMONIALS } from "./data";

export default function Testimonials() {
  const [activeDot, setActiveDot] = useState(0);

  return (
    <section className="bg-[var(--color-bg-light)] pb-16 px-6 lg:px-10">
      <div className="max-w-[1280px] mx-auto">
        <h2 className="text-center font-display font-extrabold text-[1.4rem] text-[var(--color-text-onLight)] mb-10">
          WHAT PLAYERS SAY
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="rounded-[var(--radius-md)] border border-[var(--color-border-light)] p-6 shadow-[var(--shadow-card)]"
            >
              <p className="text-2xl mb-2" style={{ color: "var(--color-primary-light)" }}>
                &ldquo;
              </p>
              <p className="text-[0.88rem] text-[var(--color-text-onLight-muted)] leading-relaxed mb-5">
                {t.quote}
              </p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient}`} />
                <div className="leading-tight">
                  <p className="font-bold text-[0.85rem] text-[var(--color-text-onLight)]">– {t.name}</p>
                  <p className="text-[0.7rem] text-[var(--color-text-onLight-faint)]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => setActiveDot(i)}
              className="w-2 h-2 rounded-full transition-colors"
              style={{ background: activeDot === i ? "var(--color-primary)" : "var(--color-border-light)" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
