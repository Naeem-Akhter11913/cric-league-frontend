import React from "react";
import PostThumb from "./PostThumb";
import CategoryBadge from "./CategoryBadge";


export default function SidePostRow({ post }) {
    return (
        <div className="flex items-center gap-4 py-3 cursor-pointer group">
            <div className="w-20 h-16 rounded-[var(--radius-sm)] overflow-hidden shrink-0">
                <PostThumb accent={post.accent} />
            </div>
            <div className="min-w-0">
                <div className="mb-1.5">
                    <CategoryBadge category={post.category} variant="pill" />
                </div>
                <h4
                    className="font-display font-semibold mb-1 truncate group-hover:text-[var(--color-primary)] transition-colors"
                    style={{ color: "var(--color-text-onLight)", fontSize: "var(--fs-sm)" }}
                >
                    {post.title}
                </h4>
                <p className="font-body" style={{ color: "var(--color-text-onLight-faint)", fontSize: "var(--fs-xs)" }}>
                    {post.date} · By {post.author}
                </p>
            </div>
        </div>
    );
}