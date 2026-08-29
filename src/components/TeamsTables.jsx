// import React from 'react'
// import { ChevronDown, ChevronLeft, ChevronRight, Eye, MoreVertical } from 'lucide-react'
// import { getPlayerAvatar, getPlayerName, teamColors } from '../utils/teams.utils';

// const Crest = ({ name, size = 40 }) => {
//     const c = teamColors[name] || { bg: "#9CA3AF", fg: "#FFFFFF", label: (name || "NA").slice(0, 2).toUpperCase() };
//     return (
//         <div
//             className="rounded-full flex items-center justify-center font-bold shrink-0 ring-2 ring-white"
//             style={{ width: size, height: size, background: c.bg, color: c.fg, fontSize: size * 0.32 }}
//         >
//             {c.label}
//         </div>
//     );
// };

// const TeamsTables = ({ page, filteredList, setPerPage, setPage,perPage }) => {
//     return (
//         <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
//             <div className="px-4 sm:px-5 py-4 border-b border-gray-100">
//                 <h2 className="text-lg font-semibold text-gray-900">All Teams</h2>
//             </div>
//             <div className="overflow-x-auto no-scrollbar">
//                 <table className="w-full text-sm min-w-[900px]">
//                     <thead>
//                         <tr className="text-left text-[11px] tracking-wide text-gray-400 border-b border-gray-100">
//                             <th className="font-medium px-5 py-3">TEAM</th>
//                             <th className="font-medium px-3 py-3">CAPTAIN</th>
//                             <th className="font-medium px-3 py-3">TOURNAMENTS</th>
//                             <th className="font-medium px-3 py-3">PLAYERS</th>
//                             <th className="font-medium px-3 py-3">MATCHES</th>
//                             <th className="font-medium px-3 py-3">WON</th>
//                             <th className="font-medium px-3 py-3">LOST</th>
//                             <th className="font-medium px-3 py-3">POINTS</th>
//                             <th className="font-medium px-3 py-3">STATUS</th>
//                             <th className="font-medium px-5 py-3 text-right">ACTIONS</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredList.map((row, i) => {
//                             const captainName = getPlayerName(row.players, row.captain);
//                             const captainAvatar = getPlayerAvatar(row.players, row.captain);
//                             const isActive = (row.status || "").toLowerCase() === "active";
//                             return (
//                                 <tr key={row._id || i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors">
//                                     <td className="px-5 py-3">
//                                         <div className="flex items-center gap-2.5 min-w-0">
//                                             <Crest name={row.name} size={30} />
//                                             <span className="text-gray-800 font-medium truncate">{row.name}</span>
//                                         </div>
//                                     </td>
//                                     <td className="px-3 py-3">
//                                         <div className="flex items-center gap-2 min-w-0">
//                                             <img
//                                                 src={captainAvatar}
//                                                 alt={captainName}
//                                                 className="w-6 h-6 rounded-full object-cover shrink-0"
//                                             />
//                                             <span className="text-gray-600 truncate">{captainName}</span>
//                                         </div>
//                                     </td>
//                                     <td className="px-3 py-3 text-gray-600">-</td>
//                                     <td className="px-3 py-3 text-gray-600">{row.players?.length ?? "-"}</td>
//                                     <td className="px-3 py-3 text-gray-600">-</td>
//                                     <td className="px-3 py-3 text-gray-600">-</td>
//                                     <td className="px-3 py-3 text-gray-600">-</td>
//                                     <td className="px-3 py-3 text-gray-900 font-medium">-</td>
//                                     <td className="px-3 py-3">
//                                         <span
//                                             className={`flex items-center gap-1.5 text-xs font-medium w-fit px-2.5 py-1 rounded-full capitalize ${isActive ? "bg-[#DCFCE7] text-[#16A34A]" : "bg-gray-100 text-gray-500"
//                                                 }`}
//                                         >
//                                             {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span>}
//                                             {row.status || "N/A"}
//                                         </span>
//                                     </td>
//                                     <td className="px-5 py-3">
//                                         <div className="flex items-center justify-end gap-2">
//                                             <button className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 transition-colors">
//                                                 <Eye size={15} />
//                                             </button>
//                                             <button className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 transition-colors">
//                                                 <MoreVertical size={15} />
//                                             </button>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             );
//                         })}
//                         {filteredList.length === 0 && (
//                             <tr>
//                                 <td colSpan={10} className="px-5 py-8 text-center text-sm text-gray-400">
//                                     No teams found.
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Pagination */}
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-5 py-4 border-t border-gray-100">
//                 <span className="text-xs text-gray-500">Showing 1 to {filteredList.length} of {filteredList.length} teams</span>
//                 <div className="flex items-center gap-2">
//                     <div className="relative">
//                         <select
//                             value={perPage}
//                             onChange={(e) => setPerPage(Number(e.target.value))}
//                             className="h-9 pl-3 pr-8 rounded-lg border border-gray-200 text-xs text-gray-600 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30"
//                         >
//                             <option value={10}>10 per page</option>
//                             <option value={25}>25 per page</option>
//                             <option value={50}>50 per page</option>
//                         </select>
//                         <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//                     </div>
//                     <button
//                         onClick={() => setPage(Math.max(1, page - 1))}
//                         className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-40"
//                         disabled={page === 1}
//                     >
//                         <ChevronLeft size={15} />
//                     </button>
//                     {[1, 2, 3, 4].map((p) => (
//                         <button
//                             key={p}
//                             onClick={() => setPage(p)}
//                             className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium transition-colors ${page === p ? "bg-[#4F46E5] text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"
//                                 }`}
//                         >
//                             {p}
//                         </button>
//                     ))}
//                     <button
//                         onClick={() => setPage(Math.min(4, page + 1))}
//                         className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-40"
//                         disabled={page === 4}
//                     >
//                         <ChevronRight size={15} />
//                     </button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default TeamsTables


import React, { useState } from 'react'
import { ChevronDown, ChevronLeft, ChevronRight, Eye, MoreVertical } from 'lucide-react'
import { getPlayerAvatar, getPlayerName, teamColors } from '../utils/teams.utils';

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

// NOTE: added `onEdit` prop + a local `openMenu` state so the MoreVertical
// button actually opens something. Previously it rendered an icon with no
// menu behind it at all, so there was no way to trigger edit from the table.
const TeamsTables = ({ page, filteredList, setPerPage, setPage, perPage, onEdit }) => {
    const [openMenu, setOpenMenu] = useState(null);

    return (
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
                        {filteredList.map((row, i) => {
                            const captainName = getPlayerName(row.players, row.captain);
                            const captainAvatar = getPlayerAvatar(row.players, row.captain);
                            const isActive = (row.status || "").toLowerCase() === "active";
                            return (
                                <tr key={row._id || i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors">
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-2.5 min-w-0">
                                            <Crest name={row.name} size={30} />
                                            <span className="text-gray-800 font-medium truncate">{row.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-3 py-3">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <img
                                                src={captainAvatar}
                                                alt={captainName}
                                                className="w-6 h-6 rounded-full object-cover shrink-0"
                                            />
                                            <span className="text-gray-600 truncate">{captainName}</span>
                                        </div>
                                    </td>
                                    <td className="px-3 py-3 text-gray-600">-</td>
                                    <td className="px-3 py-3 text-gray-600">{row.players?.length ?? "-"}</td>
                                    <td className="px-3 py-3 text-gray-600">-</td>
                                    <td className="px-3 py-3 text-gray-600">-</td>
                                    <td className="px-3 py-3 text-gray-600">-</td>
                                    <td className="px-3 py-3 text-gray-900 font-medium">-</td>
                                    <td className="px-3 py-3">
                                        <span
                                            className={`flex items-center gap-1.5 text-xs font-medium w-fit px-2.5 py-1 rounded-full capitalize ${isActive ? "bg-[#DCFCE7] text-[#16A34A]" : "bg-gray-100 text-gray-500"
                                                }`}
                                        >
                                            {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span>}
                                            {row.status || "N/A"}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 transition-colors">
                                                <Eye size={15} />
                                            </button>
                                            <div className="relative">
                                                <button
                                                    onClick={() => setOpenMenu(openMenu === i ? null : i)}
                                                    className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"
                                                >
                                                    <MoreVertical size={15} />
                                                </button>
                                                {openMenu === i && (
                                                    <>
                                                        {/* click-catcher so the menu closes on any outside click */}
                                                        <div className="fixed inset-0 z-9999" onClick={() => setOpenMenu(null)} />
                                                        <div className="absolute right-0 top-9 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1">
                                                            <button
                                                                onClick={() => {
                                                                    onEdit(row);
                                                                    console.log(row)
                                                                    // setOpenMenu(null);
                                                                }}
                                                                className="w-full text-left px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button className="w-full text-left px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50">Message</button>
                                                            <button className="w-full text-left px-3 py-1.5 text-xs text-red-500 hover:bg-gray-50">Remove</button>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
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
                <span className="text-xs text-gray-500">Showing 1 to {filteredList.length} of {filteredList.length} teams</span>
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
    )
}

export default TeamsTables