// import React from 'react'
// import { getPlayerName, teamColors } from '../utils/teams.utils';
// import FeaturedBanner from './FeaturedBanner';
// import { MoreVertical, Trophy } from 'lucide-react';


// const Crest = ({ name, size = 40 }) => {
//   const c = teamColors[name] || { bg: "#9CA3AF", fg: "#FFFFFF", label: (name || "NA").slice(0, 2).toUpperCase() };
//   return (
//     <div
//       className="rounded-full flex items-center justify-center font-bold shrink-0 ring-2 ring-white"
//       style={{ width: size, height: size, background: c.bg, color: c.fg, fontSize: size * 0.32 }}
//     >
//       {c.label}
//     </div>
//   );
// };
// const TeamCard = ({allTeamList,setOpenMenu,openMenu}) => {
//     return (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
//             {(allTeamList || []).slice(0, 4).map((t, i) => {
//                 const captainName = getPlayerName(t.players, t.captain);
//                 const isActive = (t.status || "").toLowerCase() === "active";
//                 return (
//                     <div key={t._id || i} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-col">
//                         <div className="relative h-32">
//                             {t.logoUrl ? (
//                                 <img src={t.logoUrl} alt={t.name} className="w-full h-full object-cover" />
//                             ) : (
//                                 <FeaturedBanner name={t.name} />
//                             )}
//                             <span
//                                 className={`absolute top-2.5 right-2.5 text-[10px] font-bold text-white px-2 py-1 rounded capitalize ${isActive ? "bg-[#16A34A]" : "bg-gray-400"
//                                     }`}
//                             >
//                                 {t.status || "N/A"}
//                             </span>
//                             <div className="absolute -bottom-5 left-4">
//                                 <Crest name={t.name} />
//                             </div>
//                         </div>
//                         <div className="p-4 pt-7 flex flex-col flex-1">
//                             <h3 className="font-semibold text-gray-900 mb-0.5 truncate">{t.name}</h3>
//                             <div className="text-xs text-gray-500 mb-3">
//                                 Captain: <span className="text-[#4F46E5] font-medium">{captainName}</span>
//                             </div>
//                             <div className="grid grid-cols-4 gap-1 text-center border-y border-gray-100 py-3 mb-3">
//                                 <div>
//                                     <div className="text-sm font-bold text-gray-900">{t.players?.length ?? "-"}</div>
//                                     <div className="text-[9px] text-gray-400">Players</div>
//                                 </div>
//                                 <div>
//                                     <div className="text-sm font-bold text-gray-900">-</div>
//                                     <div className="text-[9px] text-gray-400">Matches</div>
//                                 </div>
//                                 <div>
//                                     <div className="text-sm font-bold text-gray-900">-</div>
//                                     <div className="text-[9px] text-gray-400">Won</div>
//                                 </div>
//                                 <div>
//                                     <div className="text-sm font-bold text-gray-900">-</div>
//                                     <div className="text-[9px] text-gray-400">Points</div>
//                                 </div>
//                             </div>
//                             <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
//                                 <Trophy size={13} className="text-[#F2B84B]" />
//                                 {t.tournament || "No tournament assigned"}
//                             </div>
//                             <div className="flex items-center gap-1.5 mt-auto">
//                                 <button className="flex-1 text-xs font-medium text-[#4F46E5] border border-[#4F46E5]/30 rounded-lg px-3 py-2 hover:bg-[#EEF2FF] transition-colors">
//                                     View Team
//                                 </button>
//                                 <div className="relative">
//                                     <button
//                                         onClick={() => setOpenMenu(openMenu === i ? null : i)}
//                                         className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50 transition-colors"
//                                     >
//                                         <MoreVertical size={15} />
//                                     </button>
//                                     {openMenu === i && (
//                                         <div className="absolute right-0 bottom-9 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
//                                             <button className="w-full text-left px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50">Edit</button>
//                                             <button className="w-full text-left px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50">Message</button>
//                                             <button className="w-full text-left px-3 py-1.5 text-xs text-red-500 hover:bg-gray-50">Remove</button>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 );
//             })}
//             {(!allTeamList || allTeamList.length === 0) && (
//                 <div className="col-span-full text-center text-sm text-gray-400 py-8">
//                     No teams to feature yet.
//                 </div>
//             )}
//         </div>
//     )
// }

// export default TeamCard


import React from 'react'
import { getPlayerName, teamColors } from '../utils/teams.utils';
import FeaturedBanner from './FeaturedBanner';
import { MoreVertical, Trophy } from 'lucide-react';


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
// NOTE: prop renamed from `onClick` -> `onEdit` to match what OrgTeams passes down.
// This was the bug: OrgTeams passed onEdit={handleOpenEdit}, but this component
// was destructuring `onClick`, so clicking "Edit" called undefined(t) and threw
// before setOpenModel/setEditingTeam ever ran — modal never opened.
const TeamCard = ({ allTeamList, setOpenMenu, openMenu, onEdit }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {(allTeamList || []).slice(0, 4).map((t, i) => {
                const captainName = getPlayerName(t.players, t.captain);
                const isActive = (t.status || "").toLowerCase() === "active";
                return (
                    <div key={t._id || i} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                        <div className="relative h-32">
                            {t.logoUrl ? (
                                <img src={t.logoUrl} alt={t.name} className="w-full h-full object-cover" />
                            ) : (
                                <FeaturedBanner name={t.name} />
                            )}
                            <span
                                className={`absolute top-2.5 right-2.5 text-[10px] font-bold text-white px-2 py-1 rounded capitalize ${isActive ? "bg-[#16A34A]" : "bg-gray-400"
                                    }`}
                            >
                                {t.status || "N/A"}
                            </span>
                            <div className="absolute -bottom-5 left-4">
                                <Crest name={t.name} />
                            </div>
                        </div>
                        <div className="p-4 pt-7 flex flex-col flex-1">
                            <h3 className="font-semibold text-gray-900 mb-0.5 truncate">{t.name}</h3>
                            <div className="text-xs text-gray-500 mb-3">
                                Captain: <span className="text-[#4F46E5] font-medium">{captainName}</span>
                            </div>
                            <div className="grid grid-cols-4 gap-1 text-center border-y border-gray-100 py-3 mb-3">
                                <div>
                                    <div className="text-sm font-bold text-gray-900">{t.players?.length ?? "-"}</div>
                                    <div className="text-[9px] text-gray-400">Players</div>
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-gray-900">-</div>
                                    <div className="text-[9px] text-gray-400">Matches</div>
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-gray-900">-</div>
                                    <div className="text-[9px] text-gray-400">Won</div>
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-gray-900">-</div>
                                    <div className="text-[9px] text-gray-400">Points</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
                                <Trophy size={13} className="text-[#F2B84B]" />
                                {t.tournament || "No tournament assigned"}
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
                                            <button
                                                onClick={() => {
                                                    onEdit(t);
                                                    setOpenMenu(null);
                                                }}
                                                className="w-full text-left px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50"
                                            >
                                                Edit
                                            </button>
                                            <button className="w-full text-left px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50">Message</button>
                                            <button className="w-full text-left px-3 py-1.5 text-xs text-red-500 hover:bg-gray-50">Remove</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
            {(!allTeamList || allTeamList.length === 0) && (
                <div className="col-span-full text-center text-sm text-gray-400 py-8">
                    No teams to feature yet.
                </div>
            )}
        </div>
    )
}

export default TeamCard