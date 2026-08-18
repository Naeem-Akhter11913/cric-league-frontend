import React from "react";
import PostThumb from "./PostThumb";
import CategoryBadge from "./CategoryBadge";
import { Calendar, User } from "lucide-react";


export default function BlogFeaturedPostCard({ post }) {
  return (
    <div
      className="rounded-[var(--radius-lg)] overflow-hidden cursor-pointer group"
      style={{ border: "1px solid var(--color-border-light)", boxShadow: "var(--shadow-card)" }}
    >
      <div className="relative h-52">
        <PostThumb accent={post.accent} big />
        <div className="absolute top-3 left-3">
          <CategoryBadge category={post.category} />
        </div>
      </div>
      <div className="p-5">
        <h3
          className="font-display font-bold mb-2 group-hover:text-[var(--color-primary)] transition-colors"
          style={{ color: "var(--color-text-onLight)", fontSize: "var(--fs-h2)", lineHeight: 1.3 }}
        >
          {post.title}
        </h3>
        <p className="font-body mb-3" style={{ color: "var(--color-text-onLight-muted)", fontSize: "var(--fs-sm)" }}>
          {post.excerpt}
        </p>
        <div className="flex items-center gap-3 font-body" style={{ color: "var(--color-text-onLight-faint)", fontSize: "var(--fs-xs)" }}>
          <span className="inline-flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
          <span>·</span>
          <span className="inline-flex items-center gap-1"><User size={12} /> By {post.author}</span>
        </div>
      </div>
    </div>
  );
}