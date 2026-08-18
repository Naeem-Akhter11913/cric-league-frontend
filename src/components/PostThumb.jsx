import React from "react";


export default function PostThumb({ accent, big = false }) {
    return (
        <div
            className="relative w-full h-full overflow-hidden"
            style={{
                background: `linear-gradient(160deg, ${accent}55 0%, var(--color-bg-dark) 80%)`,
            }}
        >
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-90" preserveAspectRatio="xMidYMax slice">
                <circle cx="70" cy="30" r={big ? 14 : 9} fill={accent} opacity="0.5" />
                <path
                    d={big ? "M20 100 C20 70 32 55 50 55 C68 55 80 70 80 100 Z" : "M25 100 C25 78 34 66 50 66 C66 66 75 78 75 100 Z"}
                    fill={accent}
                    opacity="0.85"
                />
                <rect x="46" y="20" width={big ? 5 : 3} height={big ? 40 : 26} rx="2" fill="#e8e8f0" transform={`rotate(24 ${big ? 48.5 : 47.5} ${big ? 40 : 33})`} />
            </svg>
            <div
                className="absolute inset-0 opacity-[0.05]"
                style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 0.5px, transparent 0.5px)", backgroundSize: "3px 3px" }}
            />
        </div>
    );
}