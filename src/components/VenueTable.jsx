import React from 'react'
import { ChevronLeft, ChevronRight, MapPin, Pencil, Trash2, Users } from 'lucide-react'
import VenueThumb from './VenueThumb'
import StatusPill from './StatusPill'

const VenueTable = ({currentPage,filteredVenues,handleEdit,venueCount,limit,totalPages,setCurrentPage,handleDeleteClick}) => {
    return (
        <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[820px] text-left text-sm">
                    <thead>
                        <tr className="border-b border-slate-100 text-xs text-slate-400">
                            <th className="px-5 py-3 font-medium">Venue</th>
                            <th className="px-5 py-3 font-medium">City</th>
                            <th className="px-5 py-3 font-medium">Surface Type</th>
                            <th className="px-5 py-3 font-medium">Capacity</th>
                            <th className="px-5 py-3 font-medium">Status</th>
                            <th className="px-5 py-3 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {filteredVenues.map((v) => (
                            <tr key={v.id} className="text-slate-700 hover:bg-slate-50/60">
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <VenueThumb gradient={v.gradient} />
                                        <div>
                                            <p className="font-semibold text-slate-800">{v.name}</p>
                                            <p className="flex items-center gap-1 text-xs text-slate-400">
                                                <MapPin size={11} className="text-orange-400" />
                                                {v.address}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-5 py-4">
                                    <p className="font-medium text-slate-700">{v.city}</p>
                                    <p className="text-xs text-slate-400">{v.state}</p>
                                </td>
                                <td className="px-5 py-4">
                                    <span className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${v.surfaceColor}`}>
                                        {v.surface}
                                    </span>
                                    <p className="mt-1 text-xs text-slate-400">{v.surfaceType}</p>
                                </td>
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-1.5 text-slate-700">
                                        <Users size={13} className="text-slate-400" />
                                        {v.capacity}
                                    </div>
                                    <p className="text-xs text-slate-400">Spectators</p>
                                </td>
                                <td className="px-5 py-4">
                                    <StatusPill status={v.status} />
                                </td>
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => handleEdit(v)} className="rounded-lg border border-indigo-100 p-1.5 text-indigo-500 hover:bg-indigo-50">
                                            <Pencil size={14} />
                                        </button>
                                        <button onClick={() => handleDeleteClick(v)} className="rounded-lg border border-rose-100 p-1.5 text-rose-500 hover:bg-rose-50">
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination footer */}
            <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-sm text-slate-500">
                    Showing {venueCount === 0 ? 0 : (currentPage - 1) * limit + 1} to{" "}
                    {Math.min(currentPage * limit, venueCount)} of {venueCount} venues
                </span>

                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                        <button
                            onClick={() => setCurrentPage((prev) => prev - 1)}
                            disabled={currentPage === 1}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            <ChevronLeft size={16} />
                        </button>

                        {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map((p) => (
                            <button
                                key={p}
                                onClick={() => setCurrentPage(p)}
                                className={`h-8 w-8 rounded-lg text-sm font-medium ${p === currentPage ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100"
                                    }`}
                            >
                                {p}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                            disabled={currentPage === totalPages}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VenueTable