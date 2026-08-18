import { FOOTER_LINKS } from "./data";

const SOCIALS = ["f", "ig", "yt", "tw"];

export default function Footer() {
  return (
    <footer style={{ background: "var(--color-bg-dark)" }} className="pt-14 pb-8 px-6 lg:px-10">
      <div
        className="max-w-[1280px] mx-auto grid sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-10 border-b"
        style={{ borderColor: "var(--color-border-dark)" }}
      >
        {/* Brand column */}
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <svg width="28" height="28" viewBox="0 0 34 34" fill="none">
              <circle cx="17" cy="17" r="17" fill="url(#logoGradFooter)" />
              <path d="M10 24 L22 10" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
              <circle cx="23" cy="9" r="2.6" fill="white" />
              <defs>
                <linearGradient id="logoGradFooter" x1="0" y1="0" x2="34" y2="34">
                  <stop stopColor="#a78bfa" />
                  <stop offset="1" stopColor="#7c5cfc" />
                </linearGradient>
              </defs>
            </svg>
            <div className="leading-none">
              <p className="font-display font-extrabold text-[0.95rem] text-[var(--color-text-onDark)]">
                CRIC LEAGUE
              </p>
              <p className="text-[0.5rem] tracking-[0.2em] text-[var(--color-text-onDark-faint)] font-semibold">
                PLAY. COMPETE. WIN.
              </p>
            </div>
          </div>
          <p className="text-[0.8rem] text-[var(--color-text-onDark-faint)] leading-relaxed mb-5">
            Building the future of cricket, one match at a time.
          </p>
          <div className="flex gap-3">
            {SOCIALS.map((s) => (
              <div
                key={s}
                className="w-8 h-8 rounded-full border flex items-center justify-center text-[var(--color-text-onDark-muted)] text-xs"
                style={{ borderColor: "var(--color-border-dark)" }}
              >
                {s}
              </div>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
          <div key={heading}>
            <p className="text-[0.75rem] font-bold tracking-wider text-[var(--color-text-onDark)] mb-4">{heading}</p>
            <ul className="space-y-2.5 text-[0.82rem] text-[var(--color-text-onDark-faint)]">
              {links.map((l) => (
                <li key={l} className="hover:text-white cursor-pointer">
                  {l}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* App download column */}
        <div>
          <p className="text-[0.75rem] font-bold tracking-wider text-[var(--color-text-onDark)] mb-4">
            DOWNLOAD OUR APP
          </p>
          <p className="text-[0.8rem] text-[var(--color-text-onDark-faint)] mb-4 leading-relaxed">
            Get live scores, stats and more on the go.
          </p>
          <div className="flex flex-col gap-2.5">
            <div
              className="flex items-center gap-2 px-3.5 py-2 rounded-[var(--radius-sm)] border"
              style={{ borderColor: "var(--color-border-dark)" }}
            >
              <span>▶</span>
              <div className="leading-none">
                <p className="text-[0.6rem] text-[var(--color-text-onDark-faint)]">GET IT ON</p>
                <p className="text-[0.78rem] font-semibold text-white">Google Play</p>
              </div>
            </div>
            <div
              className="flex items-center gap-2 px-3.5 py-2 rounded-[var(--radius-sm)] border"
              style={{ borderColor: "var(--color-border-dark)" }}
            >
              <span></span>
              <div className="leading-none">
                <p className="text-[0.6rem] text-[var(--color-text-onDark-faint)]">Download on the</p>
                <p className="text-[0.78rem] font-semibold text-white">App Store</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-[0.75rem] text-[var(--color-text-onDark-faint)] pt-6">
        © 2026 Cric League. All rights reserved.
      </p>
    </footer>
  );
}
