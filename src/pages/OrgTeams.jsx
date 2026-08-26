import React, { useEffect, useState } from 'react'
import {
  Users2,
  CheckCircle2,
  UserRound,
  Trophy,
  Star,
  Search,
  SlidersHorizontal,
  ChevronDown,
  Plus,
  Eye,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import Modal from '../model/Modal';
import CreateTeam from '../components/CreateTeam';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { playerList } from '../store/action/player.action';
import { createTeam } from '../store/action/teamActions';
import toast from 'react-hot-toast';
import { clearTeamError, clearTeamSuccess } from '../store/Slice/teamSlice';

const teamColors = {
  "Royal Warriors": { bg: "#F2B84B", fg: "#7A4B00", label: "RW" },
  "Super Kings": { bg: "#1E3A8A", fg: "#FFFFFF", label: "SK" },
  "Thunder Bolts": { bg: "#2563EB", fg: "#FFFFFF", label: "TB" },
  "Green Warriors": { bg: "#059669", fg: "#FFFFFF", label: "GW" },
  "Blue Tigers": { bg: "#4338CA", fg: "#FFFFFF", label: "BT" },
  "Strikers Club": { bg: "#16A34A", fg: "#FFFFFF", label: "SC" },
};

const captainAvatars = {
  "Naeem Akhter": "https://i.pravatar.cc/64?img=12",
  "Imran Ali": "https://i.pravatar.cc/64?img=13",
  "Asif Khan": "https://i.pravatar.cc/64?img=14",
  "Arif Malik": "https://i.pravatar.cc/64?img=15",
  "Sameer Ansari": "https://i.pravatar.cc/64?img=16",
  "Salman Khan": "https://i.pravatar.cc/64?img=17",
};

const stats = [
  { label: "Total Teams", value: "32", sub: "Across All Tournaments", icon: Users2, bg: "#EEF2FF", fg: "#4F46E5" },
  { label: "Active Teams", value: "24", sub: "Currently Active", icon: CheckCircle2, bg: "#ECFDF5", fg: "#16A34A" },
  { label: "Total Players", value: "256", sub: "Registered Players", icon: UserRound, bg: "#FFF7ED", fg: "#EA580C" },
  { label: "Tournaments Played", value: "148", sub: "Total Participation", icon: Trophy, bg: "#EFF6FF", fg: "#2563EB" },
];

const tabs = ["All Teams", "Active", "Inactive", "Blocked"];

const featuredTeams = [
  {
    name: "Royal Warriors", captain: "Naeem Akhter", players: 15, matches: 32, won: 24, points: 1568,
    tournament: "Naeem Premier League 2026", status: "ACTIVE",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=900&q=60",
  },
  {
    name: "Super Kings", captain: "Imran Ali", players: 14, matches: 28, won: 20, points: 1568,
    tournament: "City Champions Cup", status: "ACTIVE",
    image: "https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=900&q=60",
  },
  {
    name: "Thunder Bolts", captain: "Asif Khan", players: 16, matches: 30, won: 18, points: 1431,
    tournament: "Naeem Premier League 2026", status: "ACTIVE",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=60",
  },
  {
    name: "Green Warriors", captain: "Arif Malik", players: 15, matches: 29, won: 17, points: 1380,
    tournament: "City Champions Cup", status: "ACTIVE",
    image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=900&q=60",
  },
];

const allTeams = [
  { name: "Royal Warriors", captain: "Naeem Akhter", tournaments: 2, players: 15, matches: 32, won: 24, lost: 8, points: 1568, status: "Active" },
  { name: "Super Kings", captain: "Imran Ali", tournaments: 2, players: 14, matches: 28, won: 20, lost: 8, points: 1492, status: "Active" },
  { name: "Thunder Bolts", captain: "Asif Khan", tournaments: 2, players: 16, matches: 30, won: 18, lost: 12, points: 1431, status: "Active" },
  { name: "Green Warriors", captain: "Arif Malik", tournaments: 1, players: 15, matches: 29, won: 17, lost: 12, points: 1380, status: "Active" },
  { name: "Blue Tigers", captain: "Sameer Ansari", tournaments: 1, players: 14, matches: 25, won: 16, lost: 9, points: 1275, status: "Inactive" },
  { name: "Strikers Club", captain: "Salman Khan", tournaments: 1, players: 13, matches: 22, won: 12, lost: 10, points: 1180, status: "Inactive" },
];

const Crest = ({ name, size = 40 }) => {
  const c = teamColors[name] || { bg: "#9CA3AF", fg: "#FFFFFF", label: name.slice(0, 2).toUpperCase() };
  return (
    <div
      className="rounded-full flex items-center justify-center font-bold shrink-0 ring-2 ring-white"
      style={{ width: size, height: size, background: c.bg, color: c.fg, fontSize: size * 0.32 }}
    >
      {c.label}
    </div>
  );
};

const OrgTeams = () => {
  const [activeTab, setActiveTab] = useState("All Teams");
  const [search, setSearch] = useState("");
  const [listSearch, setListSearch] = useState("");
  const [sortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Points: High to Low");
  const [openMenu, setOpenMenu] = useState(null);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [openModel, setOpenModel] = useState(false);
  const dispatch = useAppDispatch();
  const { list: playersList } = useAppSelector(state => state.players)
  const { loading, error, success } = useAppSelector(state => state.team);


  const sortOptions = ["Points: High to Low", "Points: Low to High", "Name A-Z", "Most Matches"];

  const filteredList = allTeams.filter((t) => {
    const matchesTab =
      activeTab === "All Teams" ? true : t.status.toLowerCase() === activeTab.toLowerCase();
    const matchesSearch = t.name.toLowerCase().includes(listSearch.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const createTeamAction = (payload) => {
    dispatch(createTeam(payload))
  }

  useEffect(() => {
    dispatch(playerList({ page: 1, limit: 20 }))
  }, []);
  
  useEffect(() => {
    if (error) {
      toast.error(error);
      clearTeamError()
      return;
    }

    if (success) {
      toast.success(success);
      clearTeamSuccess();
      return;
    }
  }, [error, success])

  return (
    <>
      <div className="h-screen overflow-y-auto no-scrollbar bg-[#F7F7F9]">
        <style>{`
                .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
            `}</style>

        <div className="p-2 sm:p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Teams</h1>
              <p className="text-sm text-gray-500 mt-1">Manage and view all registered teams</p>
            </div>
            <button onClick={() => setOpenModel(true)} className="flex items-center justify-center gap-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shrink-0">
              <Plus size={16} />
              Register New Team
            </button>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            {stats.map((s, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 flex items-start gap-3 hover:shadow-sm transition-shadow">
                <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: s.bg }}>
                  <s.icon size={19} style={{ color: s.fg }} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm text-gray-500 truncate">{s.label}</div>
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">{s.value}</div>
                  <div className="text-xs text-gray-400 truncate">{s.sub}</div>
                </div>
              </div>
            ))}
            <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-start gap-3 hover:shadow-sm transition-shadow">
              <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: "#FDF2F8" }}>
                <Star size={19} style={{ color: "#DB2777" }} />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm text-gray-500 truncate">Top Performer</div>
                <div className="text-lg sm:text-xl font-bold text-gray-900 truncate">Royal Warriors</div>
                <div className="text-xs text-gray-400 truncate">Most Successful Team</div>
              </div>
            </div>
          </div>

          {/* Tabs + search/filter row */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-5">
            <div className="flex items-center gap-5 border-b border-gray-200 lg:border-0 w-full lg:w-auto overflow-x-auto no-scrollbar">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`pb-2.5 lg:pb-0 text-sm font-medium whitespace-nowrap border-b-2 lg:border-0 transition-colors ${activeTab === t ? "text-[#4F46E5] border-[#4F46E5]" : "text-gray-500 border-transparent hover:text-gray-700"
                    }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="relative">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Search teams..."
                  className="h-10 pl-9 pr-3 w-48 sm:w-56 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 focus:border-[#4F46E5] transition-all"
                />
              </div>
              <button className="flex items-center gap-1.5 h-10 px-3.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                <SlidersHorizontal size={15} />
                Filters
              </button>
              <div className="relative">
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  className="flex items-center gap-1.5 h-10 px-3.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Sort By
                  <ChevronDown size={15} className={`transition-transform ${sortOpen ? "rotate-180" : ""}`} />
                </button>
                {sortOpen && (
                  <div className="absolute right-0 mt-1 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
                    {sortOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => { setSortBy(opt); setSortOpen(false); }}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${sortBy === opt ? "text-[#4F46E5] font-medium" : "text-gray-600"
                          }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Featured team cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {featuredTeams.map((t, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                <div className="relative h-32">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                  <span className="absolute top-2.5 right-2.5 text-[10px] font-bold text-white px-2 py-1 rounded bg-[#16A34A]">
                    {t.status}
                  </span>
                  <div className="absolute -bottom-5 left-4">
                    <Crest name={t.name} />
                  </div>
                </div>
                <div className="p-4 pt-7 flex flex-col flex-1">
                  <h3 className="font-semibold text-gray-900 mb-0.5 truncate">{t.name}</h3>
                  <div className="text-xs text-gray-500 mb-3">
                    Captain: <span className="text-[#4F46E5] font-medium">{t.captain}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1 text-center border-y border-gray-100 py-3 mb-3">
                    <div>
                      <div className="text-sm font-bold text-gray-900">{t.players}</div>
                      <div className="text-[9px] text-gray-400">Players</div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">{t.matches}</div>
                      <div className="text-[9px] text-gray-400">Matches</div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">{t.won}</div>
                      <div className="text-[9px] text-gray-400">Won</div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">{t.points}</div>
                      <div className="text-[9px] text-gray-400">Points</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
                    <Trophy size={13} className="text-[#F2B84B]" />
                    {t.tournament}
                  </div>
                  <div className="flex items-center gap-1.5 mt-auto">
                    <button className="flex-1 text-xs font-medium text-[#4F46E5] border border-[#4F46E5]/30 rounded-lg px-3 py-2 hover:bg-[#EEF2FF] transition-colors">
                      View Team
                    </button>
                    <div className="relative">
                      <button
                        onClick={() => setOpenMenu(openMenu === i ? null : i)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50 transition-colors"
                      >
                        <MoreVertical size={15} />
                      </button>
                      {openMenu === i && (
                        <div className="absolute right-0 bottom-9 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
                          <button className="w-full text-left px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50">Edit</button>
                          <button className="w-full text-left px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50">Message</button>
                          <button className="w-full text-left px-3 py-1.5 text-xs text-red-500 hover:bg-gray-50">Remove</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* All Teams table */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="px-4 sm:px-5 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">All Teams</h2>
            </div>
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-sm min-w-[900px]">
                <thead>
                  <tr className="text-left text-[11px] tracking-wide text-gray-400 border-b border-gray-100">
                    <th className="font-medium px-5 py-3">TEAM</th>
                    <th className="font-medium px-3 py-3">CAPTAIN</th>
                    <th className="font-medium px-3 py-3">TOURNAMENTS</th>
                    <th className="font-medium px-3 py-3">PLAYERS</th>
                    <th className="font-medium px-3 py-3">MATCHES</th>
                    <th className="font-medium px-3 py-3">WON</th>
                    <th className="font-medium px-3 py-3">LOST</th>
                    <th className="font-medium px-3 py-3">POINTS</th>
                    <th className="font-medium px-3 py-3">STATUS</th>
                    <th className="font-medium px-5 py-3 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.map((row, i) => (
                    <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Crest name={row.name} size={30} />
                          <span className="text-gray-800 font-medium truncate">{row.name}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2 min-w-0">
                          <img
                            src={captainAvatars[row.captain]}
                            alt={row.captain}
                            className="w-6 h-6 rounded-full object-cover shrink-0"
                          />
                          <span className="text-gray-600 truncate">{row.captain}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-gray-600">{row.tournaments}</td>
                      <td className="px-3 py-3 text-gray-600">{row.players}</td>
                      <td className="px-3 py-3 text-gray-600">{row.matches}</td>
                      <td className="px-3 py-3 text-gray-600">{row.won}</td>
                      <td className="px-3 py-3 text-gray-600">{row.lost}</td>
                      <td className="px-3 py-3 text-gray-900 font-medium">{row.points}</td>
                      <td className="px-3 py-3">
                        <span
                          className={`flex items-center gap-1.5 text-xs font-medium w-fit px-2.5 py-1 rounded-full ${row.status === "Active" ? "bg-[#DCFCE7] text-[#16A34A]" : "bg-gray-100 text-gray-500"
                            }`}
                        >
                          {row.status === "Active" && <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span>}
                          {row.status}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 transition-colors">
                            <Eye size={15} />
                          </button>
                          <button className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 transition-colors">
                            <MoreVertical size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredList.length === 0 && (
                    <tr>
                      <td colSpan={10} className="px-5 py-8 text-center text-sm text-gray-400">
                        No teams found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-5 py-4 border-t border-gray-100">
              <span className="text-xs text-gray-500">Showing 1 to 6 of 32 teams</span>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <select
                    value={perPage}
                    onChange={(e) => setPerPage(Number(e.target.value))}
                    className="h-9 pl-3 pr-8 rounded-lg border border-gray-200 text-xs text-gray-600 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30"
                  >
                    <option value={10}>10 per page</option>
                    <option value={25}>25 per page</option>
                    <option value={50}>50 per page</option>
                  </select>
                  <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-40"
                  disabled={page === 1}
                >
                  <ChevronLeft size={15} />
                </button>
                {[1, 2, 3, 4].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium transition-colors ${page === p ? "bg-[#4F46E5] text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage(Math.min(4, page + 1))}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-40"
                  disabled={page === 4}
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={openModel}
        onClose={() => setOpenModel(false)}
        islogin
      >
        <CreateTeam
          players={playersList}
          submitTeam={createTeamAction}
          loading={loading}
        />
      </Modal>
    </>
  )
}

export default OrgTeams