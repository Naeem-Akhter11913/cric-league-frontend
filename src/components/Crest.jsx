import { tier } from "../utils/tournaments.utils";

export default function Crest({ t, size = 64 }) {
  const tr = tier(t.prize);
  return (
    <div className="relative" style={{ width: size, height: size }}>
      {t.status === "Live" && (
        <span
          className="absolute inset-0 rounded-full animate-ping-slow"
          style={{ background: tr.glow }}
        />
      )}
      <div
        className="absolute inset-0 rounded-full"
        style={{ boxShadow: `0 0 0 2px ${tr.ring}, 0 0 18px 2px ${tr.glow}` }}
      />
      <div className="absolute inset-[3px] rounded-full bg-[#0d0b1c] flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 64 64" className="absolute inset-0 w-full h-full opacity-70">
          <defs>
            <radialGradient id={`crest-${t.id}`} cx="50%" cy="35%" r="70%">
              <stop offset="0%" stopColor="var(--color-primary-light)" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#0d0b1c" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="64" height="64" fill={`url(#crest-${t.id})`} />
        </svg>
        <span className="relative font-display font-extrabold text-white tracking-wide" style={{ fontSize: size * 0.26 }}>
          {t.short}
        </span>
      </div>
    </div>
  );
}