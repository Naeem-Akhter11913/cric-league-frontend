import React from 'react'

export default function ArenaBanner({ t, mouse }) {
  const tx = mouse ? (mouse.x - 0.5) * 10 : 0;
  const ty = mouse ? (mouse.y - 0.5) * 6 : 0;
  return (
    <div className="relative h-40 overflow-hidden">
      <div
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${tx}px, ${ty}px) scale(1.12)`,
          background:
            "radial-gradient(ellipse 70% 60% at 30% 0%, rgba(124,92,252,0.55), transparent 60%)," +
            "radial-gradient(ellipse 55% 50% at 90% 10%, rgba(59,130,246,0.30), transparent 65%)," +
            "linear-gradient(180deg,#241a45 0%,#150f2e 65%,#0d0b1c 100%)",
        }}
      />
      {/* spotlight beams */}
      <svg className="absolute inset-0 w-full h-full opacity-30 mix-blend-screen" viewBox="0 0 300 160" preserveAspectRatio="none">
        <polygon points="40,0 90,0 160,160 60,160" fill="white" opacity="0.10" />
        <polygon points="180,0 230,0 260,160 150,160" fill="white" opacity="0.08" />
      </svg>
      {/* crowd silhouette */}
      <svg className="absolute bottom-0 left-0 w-full h-10 opacity-80" viewBox="0 0 300 40" preserveAspectRatio="none">
        {Array.from({ length: 30 }).map((_, i) => (
          <circle key={i} cx={5 + i * 10} cy={34 - ((i * 37) % 9)} r={4 + ((i * 13) % 3)} fill="#0a0714" />
        ))}
        <rect y="30" width="300" height="10" fill="#0a0714" />
      </svg>
      {/* grain */}
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 0.5px, transparent 0.5px)", backgroundSize: "3px 3px" }} />
    </div>
  );
}