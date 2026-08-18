import { useEffect, useMemo, useState } from "react";
import PlayersCard from "./PlayersCard";
import TeamsCard from "./TeamsCard";
import TournamentsCard from "./TournamentsCard";
import { TOURNAMENTS } from "../data/tournaments";
import SkeletonCard from "./SkeletonCard";


function useToast() {
  const [toast, setToast] = useState(null);
  const fire = (msg) => {
    setToast(msg);
    window.clearTimeout(fire._t);
    fire._t = window.setTimeout(() => setToast(null), 2600);
  };
  return [toast, fire];
}
export default function TopLists() {
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(() => new Set([1]));
  const [toast, fireToast] = useToast();
  const [selected, setSelected] = useState(null);

   const handleRegister = (t) => {
    fireToast(t.status === "Live" ? `Joining ${t.name} stream…` : `Registered interest in ${t.name}`);
    setSelected(null);
  };

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 650);
    return () => clearTimeout(t);
  }, []);
  const featured = useMemo(
    () => [...TOURNAMENTS].sort((a, b) => (a.status === "Live" ? -1 : 1) - (b.status === "Live" ? -1 : 1) || b.prize - a.prize).slice(0, 3),
    []
  );
  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); fireToast("Removed from favorites"); }
      else { next.add(id); fireToast("Added to favorites"); }
      return next;
    });
  };
  return (
    <section className="bg-[var(--color-bg-light)] py-14 px-6 lg:px-10">
      <div className="max-w-[1280px] mx-auto grid lg:grid-cols-3 gap-6">
        <PlayersCard />
        <TeamsCard />
        {/* <TournamentsCard /> */}
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
          : [featured[0]].map((t) => (
            <TournamentsCard
              key={t.id}
              t={t}
              favorited={favorites.has(t.id)}
              onToggleFavorite={toggleFavorite}
              onOpen={setSelected}
              query=""
            />
          ))}
      </div>
    </section>
  );
}
