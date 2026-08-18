import { ChevronDown, Search } from "lucide-react";
import React from "react";
import { CATEGORIES } from "../utils/blog.utils";
import Navbar from "./Navbar";


export default function BlogHero({ query, setQuery, category, setCategory }) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 900px 500px at 78% 15%, rgba(124,92,252,0.35), transparent 60%), radial-gradient(ellipse 600px 400px at 95% 60%, rgba(59,130,246,0.18), transparent 60%), linear-gradient(180deg, var(--color-bg-dark) 0%, var(--color-bg-dark-2) 100%)",
      }}
    >
        <Navbar />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-[55%] hidden md:block opacity-90">
        <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="xMaxYMid slice">
          <defs>
            <linearGradient id="blogCrowdGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary-light)" stopOpacity="0.85" />
              <stop offset="100%" stopColor="var(--color-primary-700)" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <g fill="url(#blogCrowdGrad)" opacity="0.7">
            {[240, 270, 300, 330, 360].map((x, i) => (
              <g key={x}>
                <path
                  d={`M${x} 200 C${x - 2} 150 ${x + 6} 130 ${x} 100 C${x - 6} 82 ${x + 2} 62 ${x + 16} 58 C${x + 32} 54 ${x + 46} 68 ${x + 42} 86 C${x + 40} 104 ${x + 30} 116 ${x + 34} 136 C${x + 38} 160 ${x + 42} 182 ${x + 42} 200 Z`}
                  opacity={0.55 + (i % 3) * 0.12}
                />
                <circle cx={x + 20} cy={44} r={12} opacity={0.55 + (i % 3) * 0.12} />
              </g>
            ))}
          </g>
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 pt-14 pb-16">
        <h1 className="font-display font-bold" style={{ color: "var(--color-text-onDark)", fontSize: "var(--fs-hero-h1)" }}>
          Blog
        </h1>
        <p className="font-body mt-2 mb-8" style={{ color: "var(--color-text-onDark-muted)", fontSize: "var(--fs-hero-sub)" }}>
          News. Stories. Insights.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
          <div
            className="flex items-center gap-2 px-4 py-3 rounded-[var(--radius-md)] flex-1"
            style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid var(--color-border-dark)" }}
          >
            <Search size={16} color="var(--color-text-onDark-faint)" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search blog posts..."
              className="bg-transparent outline-none font-body w-full"
              style={{ color: "var(--color-text-onDark)", fontSize: "var(--fs-sm)" }}
            />
          </div>

          <div
            className="flex items-center justify-between gap-2 px-4 py-3 rounded-[var(--radius-md)] cursor-pointer"
            style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid var(--color-border-dark)", minWidth: "160px" }}
          >
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-transparent outline-none font-body w-full appearance-none cursor-pointer"
              style={{ color: "var(--color-text-onDark)", fontSize: "var(--fs-sm)" }}
            >
              {CATEGORIES.map((c) => (
                <option key={c} style={{ color: "#000" }}>{c}</option>
              ))}
            </select>
            <ChevronDown size={15} color="var(--color-text-onDark-faint)" />
          </div>
        </div>
      </div>
    </div>
  );
}