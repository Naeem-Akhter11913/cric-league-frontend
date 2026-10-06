import React, { useEffect, useMemo, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import {
  Users, CheckCircle2, CalendarCheck2, Star, Trophy, Search, ChevronDown,
  ChevronLeft, ChevronRight, Phone, Mail, Plus, Pencil, Power, UserMinus,
} from "lucide-react";
import toast from "react-hot-toast";
import Modal from "../model/Modal";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchScorers, fetchScorerOverview, createScorer, updateScorer, removeScorer,
} from "../store/action/scorer.action";

/* ------------------------------ helpers ------------------------------ */

const RATING_STYLES = {
  Excellent: "text-emerald-600",
  Good: "text-sky-600",
  Average: "text-orange-500",
  Poor: "text-rose-600",
};

const SORT_OPTIONS = [
  { value: "name_asc", label: "Name (A-Z)" },
  { value: "name_desc", label: "Name (Z-A)" },
  { value: "matches", label: "Most matches" },
  { value: "accuracy", label: "Best accuracy" },
  { value: "newest", label: "Newest first" },
];

const experienceLabel = (y) => (!y ? "New" : `${y}+ ${y === 1 ? "Year" : "Years"}`);

const timeAgo = (d) => {
  const s = Math.max(1, Math.floor((Date.now() - new Date(d).getTime()) / 1000));
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
};

function Avatar({ name = "", src, size = 40, ring = false }) {
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() || "?";
  const cls = `shrink-0 rounded-full ${ring ? "ring-4 ring-indigo-100" : ""}`;
  if (src) return <img src={src} alt={name} style={{ width: size, height: size }} className={`${cls} object-cover`} />;
  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-indigo-400 to-purple-500 font-semibold text-white ${cls}`}
      style={{ width: size, height: size, fontSize: size * 0.36 }}
    >
      {initials}
    </div>
  );
}

function StatusPill({ status }) {
  const active = status === "active";
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${active ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"}`}>
      {active ? "Active" : "Inactive"}
    </span>
  );
}

const FilterSelect = ({ value, onChange, children }) => (
  <div className="relative">
    <select
      value={value}
      onChange={onChange}
      className="appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3.5 pr-9 text-sm font-medium text-slate-600 shadow-sm outline-none hover:bg-slate-50 focus:border-indigo-300"
    >
      {children}
    </select>
    <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
  </div>
);

const ActionBtn = ({ title, onClick, disabled, tone = "default", children }) => (
  <button
    title={title}
    onClick={onClick}
    disabled={disabled}
    className={`rounded-lg p-1.5 transition-colors disabled:opacity-40 ${
      tone === "danger" ? "text-slate-400 hover:bg-rose-50 hover:text-rose-500"
      : tone === "primary" ? "text-slate-400 hover:bg-indigo-50 hover:text-indigo-600"
      : "text-slate-400 hover:bg-slate-100 hover:text-slate-600"
    }`}
  >
    {children}
  </button>
);

/* ----------------------------- add / edit form ----------------------------- */

const fieldCls =
  "h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 disabled:bg-slate-50 disabled:text-slate-400";

const FormLabel = ({ children }) => (
  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">{children}</label>
);

function ScorerForm({ initial, saving, onSubmit, onClose }) {
  const isEdit = !!initial;
  const [f, setF] = useState(() => ({
    email: initial?.userId?.email || "",
    name: initial?.userId?.name || "",
    phone: initial?.userId?.phone || "",
    city: initial?.city || "",
    experienceYears: initial?.experienceYears ?? 0,
    isChief: !!initial?.isChief,
  }));
  const [error, setError] = useState("");
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));

  const submit = () => {
    const email = f.email.trim();
    if (!isEdit && !/^\S+@\S+\.\S+$/.test(email)) return setError("Enter a valid email");
    if (f.name.trim() && f.name.trim().length < 2) return setError("Name must be at least 2 characters");
    if (isEdit && f.name.trim().length < 2) return setError("Name must be at least 2 characters");
    const years = Number(f.experienceYears);
    if (!(years >= 0 && years <= 60)) return setError("Experience must be between 0 and 60 years");
    setError("");
    onSubmit({
      ...(isEdit ? {} : { email }),
      name: f.name.trim(),
      phone: f.phone.trim(),
      city: f.city.trim(),
      experienceYears: years,
      isChief: f.isChief,
    });
  };

  return (
    <div className="w-full min-w-[min(90vw,520px)] max-w-lg">
      <h2 className="mb-4 text-lg font-bold text-slate-900">{isEdit ? "Edit Scorer" : "Add New Scorer"}</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <FormLabel>Email</FormLabel>
          <input type="email" value={f.email} disabled={isEdit} onChange={(e) => set("email", e.target.value)} placeholder="scorer@example.com" className={fieldCls} />
        </div>
        <div>
          <FormLabel>Name {isEdit ? "" : "(optional)"}</FormLabel>
          <input value={f.name} onChange={(e) => set("name", e.target.value)} placeholder={isEdit ? "Full name" : "Defaults to the email name"} className={fieldCls} />
        </div>
        <div>
          <FormLabel>Phone</FormLabel>
          <input value={f.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+91 98765 43210" className={fieldCls} />
        </div>
        <div>
          <FormLabel>City</FormLabel>
          <input value={f.city} onChange={(e) => set("city", e.target.value)} placeholder="Lucknow, UP" className={fieldCls} />
        </div>
        <div>
          <FormLabel>Experience (years)</FormLabel>
          <input type="number" min={0} max={60} value={f.experienceYears} onChange={(e) => set("experienceYears", e.target.value)} className={fieldCls} />
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-600 sm:col-span-2">
          <input type="checkbox" checked={f.isChief} onChange={(e) => set("isChief", e.target.checked)} className="h-4 w-4 rounded border-slate-300" />
          Chief Scorer <span className="text-xs text-slate-400">(only one per organization)</span>
        </label>
      </div>

      {!isEdit && (
        <p className="mt-3 text-xs text-slate-400">
          A new account is created with the default password. Ask the scorer to change it after the first login.
        </p>
      )}
      {error && <p className="mt-3 text-sm text-rose-500">{error}</p>}

      <div className="mt-5 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
        <button onClick={onClose} className="h-10 rounded-lg border border-slate-200 px-5 text-sm font-medium text-slate-600 hover:bg-slate-50">
          Cancel
        </button>
        <button
          onClick={submit}
          disabled={saving}
          className="h-10 rounded-lg bg-indigo-600 px-5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : isEdit ? "Save Changes" : "Add Scorer"}
        </button>
      </div>
    </div>
  );
}

/* --------------------------------- page --------------------------------- */

export default function OrgScorer() {
  const dispatch = useAppDispatch();
  const { list, overview } = useAppSelector((s) => s.scorer);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState("");
  const [tournamentId, setTournamentId] = useState("");
  const [city, setCity] = useState("");
  const [sort, setSort] = useState("name_asc");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [refreshKey, setRefreshKey] = useState(0);
  const [modal, setModal] = useState(null);       // { mode: 'create' } | { mode: 'edit', row }
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState(null);

  const onLoadError = (err) => toast.error(typeof err === "string" ? err : "Failed to load scorers");
  const refresh = () => {
    setRefreshKey((n) => n + 1);
    dispatch(fetchScorerOverview()).unwrap().catch(onLoadError);
  };

  useEffect(() => { dispatch(fetchScorerOverview()).unwrap().catch(onLoadError); }, [dispatch]);

  useEffect(() => {
    const id = setTimeout(() => { setDebouncedSearch(search.trim()); setPage(1); }, 350);
    return () => clearTimeout(id);
  }, [search]);

  useEffect(() => {
    dispatch(fetchScorers({
      page, limit: perPage, sort,
      search: debouncedSearch || undefined,
      status: status || undefined,
      city: city || undefined,
      tournamentId: tournamentId || undefined,
    })).unwrap().catch(onLoadError);
  }, [dispatch, page, perPage, sort, debouncedSearch, status, city, tournamentId, refreshKey]);

  const totalPages = Math.max(1, Math.ceil(list.total / perPage));
  const from = list.total ? (page - 1) * perPage + 1 : 0;
  const to = Math.min(page * perPage, list.total);
  useEffect(() => { if (page > totalPages) setPage(totalPages); }, [page, totalPages]);

  const pageNumbers = useMemo(() => {
    const set = new Set([1, totalPages, page - 1, page, page + 1]);
    const nums = [...set].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);
    const out = [];
    nums.forEach((p, i) => {
      if (i && p - nums[i - 1] > 1) out.push(`gap-${p}`);
      out.push(p);
    });
    return out;
  }, [page, totalPages]);

  /* cards */
  const s = overview?.stats;
  const dash = (n) => (s ? n ?? 0 : "–");
  const statCards = [
    { icon: Users, label: "Total Scorers", value: dash(s?.total), sub: "Registered", bg: "bg-violet-50", fg: "text-violet-500" },
    { icon: CheckCircle2, label: "Active Scorers", value: dash(s?.active), sub: "Currently Active", bg: "bg-emerald-50", fg: "text-emerald-500" },
    { icon: CalendarCheck2, label: "Matches Scored", value: dash(s?.matchesScored), sub: "Completed matches", bg: "bg-sky-50", fg: "text-sky-500" },
    { icon: Star, label: "Top Accuracy", value: s?.topAccuracy ? `${s.topAccuracy.accuracy.toFixed(1)}%` : "–", sub: s?.topAccuracy?.name || "Not enough data yet", bg: "bg-orange-50", fg: "text-orange-500" },
    { icon: Trophy, label: "Most Matches", value: s?.mostMatches ? s.mostMatches.count : "–", sub: s?.mostMatches?.name || "No matches scored yet", bg: "bg-pink-50", fg: "text-pink-500" },
  ];

  const performance = overview?.performance || [];
  const donutTotal = performance.reduce((n, d) => n + d.value, 0);
  const donutData = donutTotal ? performance.filter((d) => d.value > 0) : [{ name: "No data", value: 1, color: "#E5E7EB" }];
  const top = overview?.topScorer;

  /* actions */
  const handleSave = async (payload) => {
    try {
      setSaving(true);
      if (modal.mode === "edit") {
        await dispatch(updateScorer({ id: modal.row._id, payload })).unwrap();
        toast.success("Scorer updated");
      } else {
        await dispatch(createScorer(payload)).unwrap();
        toast.success("Scorer added to your organization");
      }
      setModal(null);
      refresh();
    } catch (err) {
      toast.error(typeof err === "string" ? err : "Failed to save scorer");
    } finally {
      setSaving(false);
    }
  };

  const toggleStatus = async (row) => {
    const next = row.status === "active" ? "inactive" : "active";
    try {
      setBusyId(row._id);
      await dispatch(updateScorer({ id: row._id, payload: { status: next } })).unwrap();
      toast.success(next === "active" ? "Scorer activated" : "Scorer deactivated");
      refresh();
    } catch (err) {
      toast.error(typeof err === "string" ? err : "Failed to update scorer");
    } finally {
      setBusyId(null);
    }
  };

  const handleRemove = async (row) => {
    const n = row.upcomingMatches || 0;
    const warn = n ? ` They will be unassigned from ${n} upcoming match${n > 1 ? "es" : ""}.` : "";
    if (!window.confirm(`Remove ${row.userId.name} from your organization?${warn}`)) return;
    try {
      setBusyId(row._id);
      await dispatch(removeScorer(row._id)).unwrap();
      toast.success(`${row.userId.name} removed from your organization`);
      refresh();
    } catch (err) {
      toast.error(typeof err === "string" ? err : "Failed to remove scorer");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="h-screen overflow-y-auto bg-[#F7F7F9] p-6 no-scrollbar lg:p-8">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Scorers</h1>
          <p className="mt-1 text-sm text-slate-500">Manage scorers and their performance</p>
        </div>
        <button
          onClick={() => setModal({ mode: "create" })}
          className="flex items-center gap-2 self-start rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 lg:self-auto"
        >
          <Plus size={16} />
          Add New Scorer
        </button>
      </div>

      {/* Stat cards */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
        {statCards.map((c) => (
          <div key={c.label} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${c.bg}`}>
              <c.icon size={18} className={c.fg} />
            </div>
            <p className="text-xs text-slate-400">{c.label}</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{c.value}</p>
            <p className="truncate text-xs text-slate-400">{c.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_340px]">
        {/* Left column */}
        <div className="min-w-0">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <div className="relative min-w-[220px] flex-1">
              <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, email or phone..."
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-700 shadow-sm outline-none placeholder:text-slate-400 focus:border-indigo-300"
              />
            </div>

            <FilterSelect value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </FilterSelect>
            <FilterSelect value={tournamentId} onChange={(e) => { setTournamentId(e.target.value); setPage(1); }}>
              <option value="">All Tournaments</option>
              {(overview?.filters?.tournaments || []).map((t) => <option key={t._id} value={t._id}>{t.name}</option>)}
            </FilterSelect>
            <FilterSelect value={city} onChange={(e) => { setCity(e.target.value); setPage(1); }}>
              <option value="">All Cities</option>
              {(overview?.filters?.cities || []).map((c) => <option key={c} value={c}>{c}</option>)}
            </FilterSelect>

            <div className="ml-auto flex items-center gap-2">
              <span className="text-sm text-slate-400">Sort By</span>
              <FilterSelect value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); }}>
                {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </FilterSelect>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[860px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-[11px] uppercase tracking-wide text-slate-400">
                    <th className="px-5 py-3 font-medium">Scorer</th>
                    <th className="px-5 py-3 font-medium">Contact</th>
                    <th className="px-5 py-3 font-medium">Experience</th>
                    <th className="px-5 py-3 font-medium">Matches Scored</th>
                    <th className="px-5 py-3 font-medium">Accuracy</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {list.items.map((r) => (
                    <tr key={r._id} className="text-slate-700 hover:bg-slate-50/60">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar name={r.userId.name} src={r.userId.avatarUrl} size={38} />
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-slate-800">{r.userId.name}</span>
                              {r.isChief && (
                                <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[11px] font-medium text-indigo-600">Chief Scorer</span>
                              )}
                            </div>
                            <span className="text-xs text-slate-400">{r.city || "City not set"}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Phone size={12} className="text-slate-400" />
                          {r.userId.phone || "Not provided"}
                        </div>
                        <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                          <Mail size={12} className="text-slate-400" />
                          {r.userId.email}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-slate-600">{experienceLabel(r.experienceYears)}</td>
                      <td className="px-5 py-4 font-semibold text-slate-800">{r.matchesScored}</td>
                      <td className="px-5 py-4">
                        {r.accuracy !== null ? (
                          <>
                            <div className="font-semibold text-slate-800">{r.accuracy.toFixed(1)}%</div>
                            <div className={`text-xs font-medium ${RATING_STYLES[r.rating]}`}>{r.rating}</div>
                          </>
                        ) : (
                          <div className="text-xs text-slate-400">Not rated yet</div>
                        )}
                      </td>
                      <td className="px-5 py-4"><StatusPill status={r.status} /></td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <ActionBtn title="Edit" tone="primary" onClick={() => setModal({ mode: "edit", row: r })}>
                            <Pencil size={15} />
                          </ActionBtn>
                          <ActionBtn
                            title={r.status === "active" ? "Deactivate" : "Activate"}
                            disabled={busyId === r._id}
                            onClick={() => toggleStatus(r)}
                          >
                            <Power size={15} />
                          </ActionBtn>
                          <ActionBtn title="Remove from organization" tone="danger" disabled={busyId === r._id} onClick={() => handleRemove(r)}>
                            <UserMinus size={15} />
                          </ActionBtn>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {list.items.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-5 py-10 text-center text-sm text-slate-400">
                        {list.loading ? "Loading scorers..." : "No scorers found."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm text-slate-500">Showing {from} to {to} of {list.total} scorers</span>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <select
                    value={perPage}
                    onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}
                    className="appearance-none rounded-lg border border-slate-200 bg-white py-1.5 pl-3 pr-8 text-sm text-slate-600 shadow-sm outline-none"
                  >
                    <option value={10}>10 per page</option>
                    <option value={25}>25 per page</option>
                    <option value={50}>50 per page</option>
                  </select>
                  <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 disabled:opacity-40"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  {pageNumbers.map((p) =>
                    typeof p === "number" ? (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`h-8 w-8 rounded-lg text-sm font-medium ${p === page ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
                      >
                        {p}
                      </button>
                    ) : (
                      <span key={p} className="flex h-8 w-8 items-center justify-center text-xs text-slate-400">…</span>
                    )
                  )}
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 disabled:opacity-40"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          {/* Top scorer */}
          <div className="rounded-2xl border border-indigo-100 bg-gradient-to-b from-indigo-50/60 to-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-[15px] font-semibold text-slate-800">Top Scorer</h3>
              <Trophy size={18} className="text-indigo-300" />
            </div>
            {top ? (
              <>
                <div className="flex items-center gap-3">
                  <Avatar name={top.name} src={top.avatarUrl} size={56} ring />
                  <div>
                    <p className="font-semibold text-slate-800">{top.name}</p>
                    <p className="text-xs text-slate-400">{top.city || "City not set"}</p>
                    <span className="mt-1 inline-block rounded-full bg-indigo-600 px-2.5 py-0.5 text-[11px] font-medium text-white">
                      Top Performer
                    </span>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 border-t border-indigo-100 pt-4 text-center">
                  <div>
                    <p className="text-lg font-bold text-slate-900">{top.matchesScored}</p>
                    <p className="text-[11px] text-slate-400">Matches</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-slate-900">{top.accuracy !== null ? `${top.accuracy.toFixed(1)}%` : "–"}</p>
                    <p className="text-[11px] text-slate-400">Accuracy</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-slate-900">{top.ballsRecorded}</p>
                    <p className="text-[11px] text-slate-400">Balls</p>
                  </div>
                </div>
              </>
            ) : (
              <p className="py-6 text-center text-sm text-slate-400">The top scorer appears once matches have been scored.</p>
            )}
          </div>

          {/* Performance overview */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-[15px] font-semibold text-slate-800">Scorer Performance Overview</h3>
            <div className="flex items-center gap-4">
              <div className="relative h-[130px] w-[130px] shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={donutData} dataKey="value" innerRadius={42} outerRadius={62} paddingAngle={donutTotal ? 2 : 0} stroke="none">
                      {donutData.map((d, i) => <Cell key={i} fill={d.color} />)}
                    </Pie>
                    {donutTotal > 0 && <Tooltip formatter={(v, n) => [v, n]} contentStyle={{ borderRadius: 8, fontSize: 12 }} />}
                  </PieChart>
                </ResponsiveContainer>
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold text-slate-800">{donutTotal}</span>
                  <span className="text-center text-[10px] leading-tight text-slate-400">Matches<br />Scored</span>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-2.5">
                {performance.map((d) => (
                  <div key={d.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-600">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                      {d.name}
                    </div>
                    <div className="font-medium text-slate-700">
                      {d.value} <span className="text-slate-400">({d.pct})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent activity */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-[15px] font-semibold text-slate-800">Recent Activity</h3>
            {overview?.recentActivity?.length ? (
              <div className="flex flex-col gap-4">
                {overview.recentActivity.map((a) => (
                  <div key={a._id} className="flex items-start gap-3">
                    <Avatar name={a.name} size={34} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-slate-700">
                        <span className="font-semibold text-slate-800">{a.name}</span> {a.action}
                      </p>
                      <p className="truncate text-xs text-slate-400">{a.detail}</p>
                    </div>
                    <div className="flex items-center gap-1.5 whitespace-nowrap text-xs text-slate-400">
                      {timeAgo(a.at)}
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="py-4 text-center text-sm text-slate-400">No scoring activity yet.</p>
            )}
          </div>
        </div>
      </div>

      <Modal open={!!modal} onClose={() => setModal(null)} islogin>
        {modal && (
          <ScorerForm
            key={modal.mode === "edit" ? modal.row._id : "new"}
            initial={modal.mode === "edit" ? modal.row : null}
            saving={saving}
            onSubmit={handleSave}
            onClose={() => setModal(null)}
          />
        )}
      </Modal>
    </div>
  );
}