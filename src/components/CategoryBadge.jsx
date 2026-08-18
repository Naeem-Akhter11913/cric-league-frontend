import React from "react";
import { CATEGORY_STYLE } from "../utils/blog.utils";


export default function CategoryBadge({ category, variant = "onImage" }) {
  const s = CATEGORY_STYLE[category] || CATEGORY_STYLE.News;
  return (
    <span
      className="inline-block px-2.5 py-1 rounded-[var(--radius-sm)] font-body font-bold uppercase tracking-wide"
      style={{
        backgroundColor: variant === "onImage" ? "rgba(10,10,20,0.6)" : s.bg,
        color: variant === "onImage" ? "#ffffff" : s.fg,
        fontSize: "9px",
      }}
    >
      {category}
    </span>
  );
}