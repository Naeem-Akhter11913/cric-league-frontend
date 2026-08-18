
import { useState, useMemo, useEffect, useRef } from "react";
import {
  Search, Star, Users, Swords, Trophy, X, Clock, Radio,
  ChevronLeft, ChevronRight, ArrowUpDown, Sparkles, Shield, Calendar
} from "lucide-react";
import { TOURNAMENTS } from "../data/tournaments";
import SkeletonCard from "../components/SkeletonCard";
import DetailDrawer from "../components/DetailDrawer";
import { daysUntil, FILTERS, fmtDateRange, ROWS_PER_PAGE, tier } from "../utils/tournaments.utils";
import ArenaBanner from "../components/ArenaBanner";
import Crest from "../components/Crest";
import TournamentsCard from "../components/TournamentsCard";
import Highlight from "../components/Highlight";
import Navbar from "../components/Navbar";

function useToast() {
  const [toast, setToast] = useState(null);
  const fire = (msg) => {
    setToast(msg);
    window.clearTimeout(fire._t);
    fire._t = window.setTimeout(() => setToast(null), 2600);
  };
  return [toast, fire];
}

export default function Tournaments() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortKey, setSortKey] = useState("start");
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState(() => new Set([1]));
  const [selected, setSelected] = useState(null);
  const [toast, fireToast] = useToast();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 650);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(search), 250);
    return () => clearTimeout(t);
  }, [search]);

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); fireToast("Removed from favorites"); }
      else { next.add(id); fireToast("Added to favorites"); }
      return next;
    });
  };

  const handleRegister = (t) => {
    fireToast(t.status === "Live" ? `Joining ${t.name} stream…` : `Registered interest in ${t.name}`);
    setSelected(null);
  };

  const handleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
    setPage(1);
  };

  const filtered = useMemo(() => {
    return TOURNAMENTS.filter((t) => {
      const matchesSearch = t.name.toLowerCase().includes(debounced.toLowerCase());
      const matchesFilter =
        activeFilter === "All" ? true :
          activeFilter === "Favorites" ? favorites.has(t.id) :
            t.status === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [debounced, activeFilter, favorites]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    copy.sort((a, b) => {
      let valA = a[sortKey], valB = b[sortKey];
      if (typeof valA === "string") { valA = valA.toLowerCase(); valB = valB.toLowerCase(); }
      if (valA < valB) return sortDir === "asc" ? -1 : 1;
      if (valA > valB) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return copy;
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / ROWS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginated = sorted.slice((currentPage - 1) * ROWS_PER_PAGE, currentPage * ROWS_PER_PAGE);

  const featured = useMemo(
    () => [...TOURNAMENTS].sort((a, b) => (a.status === "Live" ? -1 : 1) - (b.status === "Live" ? -1 : 1) || b.prize - a.prize).slice(0, 3),
    []
  );

  const columns = [
    { key: "name", label: "Tournament" },
    { key: "teams", label: "Teams" },
    { key: "matches", label: "Matches" },
    { key: "start", label: "Date" },
    { key: "status", label: "Status" },
    { key: "prize", label: "Prize Pool" },
  ];
  const statusStyle = { Live: "text-emerald-400", Upcoming: "text-amber-400", Completed: "text-[var(--color-text-onDark-muted)]" };

  return (
    <div className="bg-white min-h-screen">
      <style>{`
        @keyframes ping-slow { 0% { transform: scale(0.9); opacity: 0.7; } 80%,100% { transform: scale(1.6); opacity: 0; } }
        .animate-ping-slow { animation: ping-slow 2.4s cubic-bezier(0,0,0.2,1) infinite; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.25s ease-out; }
        @keyframes slide-in { from { transform: translateX(24px); opacity: 0.4; } to { transform: translateX(0); opacity: 1; } }
        .animate-slide-in { animation: slide-in 0.28s cubic-bezier(0.16,1,0.3,1); }
        @keyframes toast-in { from { transform: translate(-50%, 12px); opacity: 0; } to { transform: translate(-50%, 0); opacity: 1; } }
        .animate-toast { animation: toast-in 0.25s ease-out; }
      `}</style>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] animate-toast">
          <div className="flex items-center gap-2 bg-[#14121f] border border-[var(--color-border-dark)] text-white text-sm px-4 py-2.5 rounded-full shadow-xl">
            <Sparkles size={14} className="text-[var(--color-primary-light)]" /> {toast}
          </div>
        </div>
      )}

      {selected && (
        <DetailDrawer
          t={selected}
          onClose={() => setSelected(null)}
          favorited={favorites.has(selected.id)}
          onToggleFavorite={toggleFavorite}
          onRegister={handleRegister}
        />
      )}

      {/* Page header */}
      <div className="bg-[var(--color-bg-dark)] pb-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 900px 500px at 78% 15%, rgba(124,92,252,0.35), transparent 60%), radial-gradient(ellipse 600px 400px at 95% 60%, rgba(59,130,246,0.18), transparent 60%)"
        }} />
        <Navbar />
        <div className="max-w-[1280px] mx-auto pt-6 px-6 lg:px-10 relative">
          <div className="inline-flex items-center gap-1.5 text-[0.7rem] font-semibold text-[var(--color-primary-light)] uppercase tracking-wide mb-3">
            <Shield size={13} /> {TOURNAMENTS.filter((t) => t.status === "Live").length} tournament live now
          </div>
          <h1 className="text-4xl font-display font-extrabold text-white mb-2">Tournaments</h1>
          <p className="text-[var(--color-text-onDark-muted)] mb-8">Compete. Conquer. Create Legends.</p>

          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative w-full md:w-72">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-onDark-faint)]" />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search tournaments..."
                className="w-full pl-9 pr-4 py-2.5 rounded-[var(--radius-sm)] bg-white/5 border border-[var(--color-border-dark)] text-white placeholder:text-[var(--color-text-onDark-faint)] text-sm focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/30 transition"
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {FILTERS.map((filter) => (
                <button
                  key={filter}
                  onClick={() => { setActiveFilter(filter); setPage(1); }}
                  className={`px-4 py-2 rounded-[var(--radius-sm)] text-sm font-medium transition-all ${activeFilter === filter ? "grad-primary text-white shadow-[0_4px_14px_rgba(124,92,252,0.4)]" : "text-[var(--color-text-onDark-muted)] hover:text-white hover:bg-white/5"
                    }`}
                >
                  {filter === "Favorites" ? `★ Favorites (${favorites.size})` : filter}
                </button>
              ))}
            </div>

            <button
              onClick={() => fireToast("Opening tournament builder…")}
              className="md:ml-auto px-5 py-2.5 rounded-[var(--radius-sm)] grad-primary text-white text-sm font-semibold shadow-[0_4px_14px_rgba(124,92,252,0.4)] hover:brightness-110 active:scale-95 transition whitespace-nowrap"
            >
              + Create Tournament
            </button>
          </div>
        </div>
      </div>

      {/* Featured tournaments */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 -mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Featured Tournaments</h2>
          <span className="text-sm font-medium text-[var(--color-primary)]">Ranked by prize pool</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
            : featured.map((t) => (
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

        {/* All tournaments table */}
        <div className="mb-16">
          <h2 className="text-lg font-bold text-gray-900 mb-4">All Tournaments</h2>

          <div className="overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      onClick={() => handleSort(col.key)}
                      className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide cursor-pointer select-none hover:text-gray-800 transition-colors"
                    >
                      <span className="inline-flex items-center">
                        {col.label}
                        <ArrowUpDown size={11} className={`ml-1 transition-opacity ${sortKey === col.key ? "opacity-100 text-[var(--color-primary)]" : "opacity-30"}`} />
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length} className="text-center py-10 text-gray-400">No tournaments match your search.</td>
                  </tr>
                ) : (
                  paginated.map((t) => (
                    <tr
                      key={t.id}
                      onClick={() => setSelected(t)}
                      className="border-b border-gray-50 last:border-0 hover:bg-gray-50/70 cursor-pointer transition-colors"
                    >
                      <td className="px-5 py-4 font-medium text-gray-900">
                        <span className="inline-flex items-center gap-2">
                          {favorites.has(t.id) && <Star size={12} className="fill-[#f5c542] text-[#f5c542]" />}
                          <Highlight text={t.name} query={debounced} />
                        </span>
                      </td>
                      <td className="px-5 py-4 text-gray-600">{t.teams}</td>
                      <td className="px-5 py-4 text-gray-600">{t.matches}</td>
                      <td className="px-5 py-4 text-gray-600">{fmtDateRange(t.start, t.end)}</td>
                      <td className={`px-5 py-4 font-medium ${statusStyle[t.status]}`}>{t.status}</td>
                      <td className="px-5 py-4 text-gray-900 font-semibold">₹{t.prize.toLocaleString("en-IN")}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {sorted.length > 0 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-xs text-gray-500">
                Showing {(currentPage - 1) * ROWS_PER_PAGE + 1}–{Math.min(currentPage * ROWS_PER_PAGE, sorted.length)} of {sorted.length}
              </p>
              <div className="flex items-center gap-1.5">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-sm)] border border-gray-200 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition">
                  <ChevronLeft size={14} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-8 h-8 rounded-[var(--radius-sm)] text-sm font-medium transition ${p === currentPage ? "grad-primary text-white" : "text-gray-600 border border-gray-200 hover:bg-gray-50"}`}
                  >
                    {p}
                  </button>
                ))}
                <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-sm)] border border-gray-200 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition">
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}