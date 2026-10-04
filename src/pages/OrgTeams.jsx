
import React, { useEffect, useRef, useState } from 'react'
import {
  Users2,
  CheckCircle2,
  UserRound,
  Trophy,
  Star,
  Plus,
} from 'lucide-react'
import Modal from '../model/Modal';
import CreateTeam from '../components/CreateTeam';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { playerList } from '../store/action/player.action';
import { createTeam, updateTeam, teamList, deleteTeam, fetchTeamStats } from '../store/action/teamActions';
import toast from 'react-hot-toast';
import { clearTeamError, clearTeamSuccess } from '../store/Slice/teamSlice';
import TeamsTables from '../components/TeamsTables';
import PlayingXI from './PlayingXI';
import PlayingXITable from '../components/PlayingXITable';

const tabs = ["All Teams", "Active", "Inactive", "Blocked"];
const sortOptions = ["Points: High to Low", "Points: Low to High", "Name A-Z", "Most Matches"];

const OrgTeams = () => {
  const [xiEditor, setXiEditor] = useState(null);
  const [xiModal, setXiModal] = useState(null);
  const [xiRefresh, setXiRefresh] = useState(0);
  const [showTable, setShowTable] = useState('squad');
  const [activeTab, setActiveTab] = useState("All Teams");
  const [search, setSearch] = useState("");
  const [sortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Points: High to Low");
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [openModel, setOpenModel] = useState(false);
  const [xiOpenModel, setOpenXIModel] = useState(false)
  // Holds the team object being edited. null = the modal is in "create" mode.
  // Set this (and open the modal) from an Edit action in TeamCard/TeamsTables.
  const [editingTeam, setEditingTeam] = useState(null);
  const dispatch = useAppDispatch();
  const { list: playersList } = useAppSelector(state => state.players)
  const { loading, error, success, list: allTeamList, stats } = useAppSelector(state => state.team);

  // Derived, live stats computed straight from allTeamList (no more hardcoded numbers)
  const totalTeams = allTeamList?.length || 0;
  const activeTeams = (allTeamList || []).filter(
    (t) => (t.status || "").toLowerCase() === "active"
  ).length;
  const totalPlayers = (allTeamList || []).reduce(
    (sum, t) => sum + (t.players?.length || 0),
    0
  );
  const tournamentsPlayed = (allTeamList || []).filter((t) => t.tournament).length;
  // No win/points data comes back from the API yet, so "top performer" falls back
  // to the team with the most registered players.
  const topPerformer = (allTeamList || []).reduce((top, t) => {
    if (!top) return t;
    return (t.players?.length || 0) > (top.players?.length || 0) ? t : top;
  }, null);

  const val = (n) => (stats ? n ?? 0 : "–");   // dash until the first response arrives
  const activePct = stats?.totalTeams ? Math.round((stats.activeTeams / stats.totalTeams) * 100) : 0;

  const statCards = [
    { label: "Total Teams", value: val(stats?.totalTeams), sub: "Across All Tournaments", icon: Users2, bg: "#EEF2FF", fg: "#4F46E5" },
    { label: "Active Teams", value: val(stats?.activeTeams), sub: stats ? `${activePct}% of all teams` : "Currently Active", icon: CheckCircle2, bg: "#ECFDF5", fg: "#16A34A" },
    { label: "Total Players", value: val(stats?.totalPlayers), sub: "Registered in teams", icon: UserRound, bg: "#FFF7ED", fg: "#EA580C" },
    { label: "Tournaments Played", value: val(stats?.tournamentsPlayed), sub: "Total Participation", icon: Trophy, bg: "#EFF6FF", fg: "#2563EB" },
  ];

  // Real team data comes from the API (allTeamList) — no more static mock rows.
  // Fields not present in the API payload (tournaments, matches, won, lost, points)
  // are rendered as "-" in the table below.
  const filteredList = (allTeamList || []).filter((t) => {
    const matchesTab =
      activeTab === "All Teams"
        ? true
        : (t.status || "").toLowerCase() === activeTab.toLowerCase();
    const matchesSearch = (t.name || "")
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Single submit handler for the CreateTeam modal — CreateTeam tells us
  // whether it was in edit mode via the second argument, so we dispatch the
  // right thunk without needing two separate submit props.
  const createTeamAction = (payload, isEdit) => {
    if (isEdit) {
      const { _id, ...rest } = payload;
      dispatch(updateTeam({ id: _id, payload: rest }));
    } else {
      dispatch(createTeam(payload));
    }
  }

  // Opens the modal fresh, in create mode.
  const handleOpenCreate = () => {
    setEditingTeam(null);
    setOpenModel(true);
  };

  // Opens the modal pre-filled with the given team. Wired into the "Edit"
  // action inside TeamsTables' row menu, e.g. onClick={() => handleOpenEdit(team)}.
  const handleOpenEdit = (team) => {
    setEditingTeam(team);
    setOpenModel(true);
  };

  // Always clear the edit target when the modal closes so the next open
  // (e.g. clicking "Register New Team") starts from a blank form.
  const handleCloseModal = () => {
    setOpenModel(false);
    setEditingTeam(null);
  };

  useEffect(() => {
    dispatch(playerList({ page: 1, limit: 20 }));
    dispatch(teamList({ page: 1, limit: 20 }));
    dispatch(fetchTeamStats());
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearTeamError());
      return;
    }

    if (success) {
      toast.success(success);
      handleCloseModal();
      dispatch(clearTeamSuccess());
      dispatch(teamList({ page: 1, limit: 20 }))
      return;
    }
  }, [error, success]);

  const handleDelete = (team) => {
    if (!window.confirm(`Delete "${team.name}"? This can't be undone.`)) return;
    dispatch(deleteTeam(team._id));
  };

  const openCreateXI = () => setXiModal({ mode: 'create' });

  const openEditXI = (row) => {
    if (!row.teamId?._id) return;
    setXiModal({ mode: 'edit', teamId: row.teamId._id, format: row.format, row });
  };


  const closeXIModal = () => setXiModal(null);

  const handleXISaved = () => {
    setXiRefresh((n) => n + 1);   // table refetches
    setXiModal(null);             // close the modal
    setShowTable('playingxi');    // jump to the Playing XI tab so the new or updated row is visible
  };


  const tableTab = [{ id: 'squad', label: 'Squad' }, { id: 'playingxi', label: 'Playing XI' }];


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
            <div className='flex gap-3'>

              <button onClick={handleOpenCreate} className="flex items-center justify-center gap-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shrink-0">
                <Plus size={16} />
                Register Team
              </button>
              <button onClick={() => setOpenXIModel(true)} className="flex items-center justify-center gap-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shrink-0">
                <Plus size={16} />
                Create XI
              </button>
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            {statCards.map((s, i) => (
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
                <div className="text-lg sm:text-xl font-bold text-gray-900 truncate">{topPerformer?.name || "N/A"}</div>
                <div className="text-xs text-gray-400 truncate">Most Players Registered</div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-8 border-b border-gray-200 mb-3">
            {tableTab.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setShowTable(tab.id)}
                className={`relative pb-1 pt-1 text-[16px] font-normal transition-colors ${showTable === tab.id
                  ? "text-[#4F46E5] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#4F46E5]"
                  : "text-[#64748B] hover:text-[#334155]"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {showTable === 'squad' ? <TeamsTables
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            search={search}
            onSearchChange={(v) => { setSearch(v); setPage(1); }}
            sortOpen={sortOpen}
            setSortOpen={setSortOpen}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOptions={sortOptions}
            page={page}
            filteredList={filteredList}
            setPerPage={setPerPage}
            setPage={setPage}
            perPage={perPage}
            onEdit={handleOpenEdit}
            onDelete={handleDelete}
          /> :
            <PlayingXITable
              onEdit={openEditXI}
              refreshKey={xiRefresh}
            />
          }
        </div>
      </div>

      <Modal open={openModel} onClose={handleCloseModal} islogin>
        {openModel && (
          <CreateTeam
            key={editingTeam?._id || 'new'}
            players={playersList}
            submitTeam={createTeamAction}
            loading={loading}
            initialTeam={editingTeam}
          />
        )}
      </Modal>
      <Modal open={!!xiModal} onClose={closeXIModal} islogin>
        {xiModal && (
          <PlayingXI
            key={xiModal.mode === 'edit' ? `${xiModal.teamId}-${xiModal.format}` : 'new'}
            isEdit={xiModal.mode === 'edit'}
            initialTeamId={xiModal.teamId}
            initialFormat={xiModal.format}
            initialXI={xiModal.row}
            onSaved={handleXISaved}
          />
        )}
      </Modal>
      <Modal
        open={xiOpenModel}
        onClose={() => setOpenXIModel(false)}
        islogin
      >
        <PlayingXI />
      </Modal>
    </>
  )
}

export default OrgTeams