export default function BatsmanArt() {
  return (
    <div
      className="relative rounded-[var(--radius-lg)] overflow-hidden aspect-[4/3.1]"
      style={{
        background:
          "radial-gradient(circle at 60% 30%, rgba(124,92,252,0.35), transparent 55%), linear-gradient(180deg,#1a1530,#0a0a14 75%)",
      }}
    >
      {/* floodlight glows */}
      <div className="absolute -top-6 left-6 w-24 h-24 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute top-0 right-10 w-32 h-32 rounded-full bg-[var(--color-primary)]/30 blur-3xl" />

      {/* Batsman illustration (original artwork) */}
      <svg viewBox="0 0 400 420" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[92%] h-[92%]">
        <ellipse cx="200" cy="405" rx="150" ry="14" fill="black" opacity="0.35" />
        <rect x="150" y="270" width="34" height="120" rx="14" fill="#e8e8ef" />
        <rect x="215" y="270" width="34" height="120" rx="14" fill="#e8e8ef" />
        <rect x="150" y="270" width="34" height="24" rx="10" fill="#3b3660" />
        <rect x="215" y="270" width="34" height="24" rx="10" fill="#3b3660" />
        <path d="M150 175 L250 175 L262 285 L138 285 Z" fill="#1c2b52" />
        <path d="M150 175 L250 175 L246 205 L154 205 Z" fill="#243a73" />
        <path d="M150 190 Q95 190 78 130" stroke="#1c2b52" strokeWidth="28" strokeLinecap="round" fill="none" />
        <path d="M250 190 Q300 150 300 105" stroke="#1c2b52" strokeWidth="28" strokeLinecap="round" fill="none" />
        <circle cx="76" cy="122" r="18" fill="#f5a623" />
        <circle cx="300" cy="98" r="18" fill="#f5a623" />
        <rect x="285" y="20" width="26" height="95" rx="10" fill="#e8c088" transform="rotate(18 298 67)" />
        <circle cx="200" cy="145" r="34" fill="#0d1b3a" />
        <path d="M170 135 a34 34 0 0 1 62 -4" fill="none" stroke="#2b4380" strokeWidth="4" />
        <rect x="188" y="150" width="24" height="18" rx="4" fill="#0d1b3a" />
        <path d="M182 145 h34 M182 152 h34 M182 159 h34" stroke="#4a5c8f" strokeWidth="2" />
        <rect x="154" y="300" width="26" height="10" rx="4" fill="#c8c8d6" />
        <rect x="219" y="300" width="26" height="10" rx="4" fill="#c8c8d6" />
      </svg>
    </div>
  );
}
