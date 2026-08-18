import { useState, useMemo } from "react";
import { Search, ChevronDown, User, Calendar } from "lucide-react";
import ContactFooter from "../components/ContactFooter";
import CategoryBadge from "../components/CategoryBadge";
import SidePostRow from "../components/SidePostRow";
import BlogFeaturedPostCard from "../components/BlogFeaturedPostCard";
import BlogHero from "../components/BlogHero";
import { FEATURED_POST, SIDE_POSTS } from "../utils/blog.utils";

export default function Blog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Categories");

  const filteredSidePosts = useMemo(() => {
    return SIDE_POSTS.filter((p) => {
      const matchesQuery = p.title.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "All Categories" || p.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  return (
    <div className="min-h-screen font-body" style={{ backgroundColor: "var(--color-bg-light-2)" }}>
      <BlogHero query={query} setQuery={setQuery} category={category} setCategory={setCategory} />

      <div className="max-w-6xl mx-auto px-6 pt-10 pb-14">
        <h2 className="font-display font-bold mb-5" style={{ color: "var(--color-text-onLight)", fontSize: "var(--fs-h2)" }}>
          Featured Posts
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6 mb-4">
          <BlogFeaturedPostCard post={FEATURED_POST} />

          <div
            className="rounded-[var(--radius-lg)] p-2 divide-y"
            style={{ border: "1px solid var(--color-border-light)", boxShadow: "var(--shadow-card)" }}
          >
            {filteredSidePosts.map((p, i) => (
              <div key={p.title} className="px-3" style={{ borderColor: "var(--color-border-light)" }}>
                <SidePostRow post={p} />
              </div>
            ))}
            {filteredSidePosts.length === 0 && (
              <div className="text-center py-8 font-body" style={{ color: "var(--color-text-onLight-faint)" }}>
                No posts match your search.
              </div>
            )}
          </div>
        </div>
      <ContactFooter />
      </div>
    </div>
  );
}