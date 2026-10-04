import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Pencil, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchPlayingXIList, deletePlayingXI } from '../store/action/playingXI.action';
import { teamColors } from '../utils/teams.utils';



const Crest = ({ name, size = 40 }) => {
  const c = teamColors[name] || { bg: "#9CA3AF", fg: "#FFFFFF", label: (name || "NA").slice(0, 2).toUpperCase() };
  return (
    <div
      className="rounded-full flex items-center justify-center font-bold shrink-0 ring-2 ring-white"
      style={{ width: size, height: size, background: c.bg, color: c.fg, fontSize: size * 0.32 }}
    >
      {c.label}
    </div>
  );
};
const FORMAT_TABS = ['All', 'T20', 'T10', 'ODI', 'Test'];
const PER_PAGE = 10;

const formatDate = (d) =>
  d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '-';

const PlayingXITable = ({ onEdit, refreshKey = 0 }) => {
  const dispatch = useAppDispatch();
  const { list, total, listLoading } = useAppSelector((s) => s.playingXI);
  const [format, setFormat] = useState('All');
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  const from = total ? (page - 1) * PER_PAGE + 1 : 0;
  const to = Math.min(page * PER_PAGE, total);

  useEffect(() => {
    dispatch(fetchPlayingXIList({ page, limit: PER_PAGE, ...(format !== 'All' && { format }) }))
      .unwrap()
      .catch((err) => toast.error(typeof err === 'string' ? err : 'Failed to load Playing XIs'));
  }, [dispatch, page, format, refreshKey]);

  const handleDelete = async (row) => {
    const label = `${row.teamId?.name || 'this team'} (${row.format})`;
    if (!window.confirm(`Delete the Playing XI for ${label}?`)) return;
    try {
      await dispatch(deletePlayingXI(row._id)).unwrap();
      toast.success('Playing XI deleted');
      if (list.length === 1 && page > 1) setPage((p) => p - 1); // emptied this page
    } catch (err) {
      toast.error(typeof err === 'string' ? err : 'Failed to delete Playing XI');
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Format tabs */}
      <div className="flex items-center gap-5 px-4 sm:px-5 pt-4 pb-0 border-b border-gray-100 overflow-x-auto">
        {FORMAT_TABS.map((t) => (
          <button
            key={t}
            onClick={() => { setFormat(t); setPage(1); }}
            className={`pb-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${format === t ? 'text-[#4F46E5] border-[#4F46E5]' : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[860px]">
          <thead>
            <tr className="text-left text-[11px] tracking-wide text-gray-400 border-b border-gray-100">
              <th className="font-medium px-5 py-3">TEAM</th>
              <th className="font-medium px-3 py-3">FORMAT</th>
              <th className="font-medium px-3 py-3">PLAYING XI</th>
              <th className="font-medium px-3 py-3">SUBS</th>
              <th className="font-medium px-3 py-3">CAPTAIN</th>
              <th className="font-medium px-3 py-3">VICE CAPTAIN</th>
              <th className="font-medium px-3 py-3">LAST UPDATED</th>
              <th className="font-medium px-5 py-3 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {list.map((row) => (
              <tr key={row._id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Crest name={row.teamId?.name || 'NA'} size={30} />
                    <span className="text-gray-800 font-medium truncate">{row.teamId?.name || 'Deleted team'}</span>
                  </div>
                </td>
                <td className="px-3 py-3">
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    {row.format}
                  </span>
                </td>
                <td className="px-3 py-3 text-gray-600">{row.players?.length ?? 0} players</td>
                <td className="px-3 py-3 text-gray-600">{row.substitutes?.length ?? 0}</td>
                <td className="px-3 py-3 text-gray-600">{row.captain?.userId?.name || '-'}</td>
                <td className="px-3 py-3 text-gray-600">{row.viceCaptain?.userId?.name || '-'}</td>
                <td className="px-3 py-3 text-gray-500 whitespace-nowrap">{formatDate(row.updatedAt)}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      title="Edit"
                      disabled={!row.teamId}
                      onClick={() => onEdit(row)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-indigo-50 hover:text-[#4F46E5] transition-colors disabled:opacity-40"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      title="Delete"
                      onClick={() => handleDelete(row)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-rose-50 hover:text-rose-500 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!list.length && (
              <tr>
                <td colSpan={8} className="px-5 py-8 text-center text-sm text-gray-400">
                  {listLoading ? 'Loading Playing XIs...' : 'No Playing XIs saved yet.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-4 border-t border-gray-100">
        <span className="text-xs text-gray-500">Showing {from} to {to} of {total} Playing XIs</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40"
          >
            <ChevronLeft size={15} />
          </button>
          <span className="text-xs text-gray-600">Page {page} of {totalPages}</span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayingXITable;