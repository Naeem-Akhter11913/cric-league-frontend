import { UserMinus, Mail, Phone, BadgeCheck } from 'lucide-react'
import { teamColors } from '../data/orgPlayer.data';

const TABS = [
    { label: "All Players", type: "" },
    { label: "Batsmen", type: "batter" },
    { label: "Bowlers", type: "bowler" },
    { label: "All Rounders", type: "all_rounder" },
    { label: "Wicket Keepers", type: "wicket_keeper" },
];

const TYPE_LABEL = { batter: "Batter", bowler: "Bowler", all_rounder: "All Rounder", wicket_keeper: "Wicket Keeper" };
const STYLE_LABEL = { right_hand: "Right hand", left_hand: "Left hand" };
const AVAILABILITY_STYLE = {
    Available: "bg-[#DCFCE7] text-[#16A34A]",
    Injured: "bg-red-50 text-red-600",
    Unavailable: "bg-gray-100 text-gray-500",
    Rested: "bg-blue-50 text-blue-600",
    Retired: "bg-gray-100 text-gray-500",
};
const initials = (name = "") => name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase() || "?";
const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "-";

const selectCls =
    "h-10 pl-3.5 pr-8 rounded-lg border border-gray-200 text-sm text-gray-600 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30";
const ageFrom = (dob) => {
    if (!dob) return null;
    const d = new Date(dob);
    if (isNaN(d)) return null;
    return Math.floor((Date.now() - d.getTime()) / (365.25 * 24 * 3600 * 1000));
};

const capitalize = (s = "") => s.charAt(0).toUpperCase() + s.slice(1);

const Field = ({ label, value }) => (
    <div className="py-2">
        <div className="text-[11px] uppercase tracking-wide text-gray-400">{label}</div>
        <div className="text-sm text-gray-800 break-words">
            {value || <span className="text-gray-400">Not provided</span>}
        </div>
    </div>
);

const Section = ({ title, children }) => (
    <div className="rounded-xl border border-gray-100 p-4">
        <h3 className="text-xs font-bold tracking-wide text-gray-500 mb-1">{title}</h3>
        {children}
    </div>
);

const TeamCrest = ({ name, size = 22 }) => {
    const c = teamColors[name] || { bg: "#9CA3AF", fg: "#FFFFFF", label: name.slice(0, 2).toUpperCase() };
    return (
        <div
            className="rounded-full flex items-center justify-center font-bold shrink-0"
            style={{ width: size, height: size, background: c.bg, color: c.fg, fontSize: size * 0.34 }}
        >
            {c.label}
        </div>
    );
};

const PlayerDetails = ({ player, removing, onRemove, onClose }) => {
    const name = player.userId?.name || "Unknown";
    const active = player.status === "active";
    const info = player.personalInfo || {};
    const age = ageFrom(info.dob);
    const location = [info.city, info.country].filter(Boolean).join(", ");

    return (
        <div className="w-full min-w-[min(90vw,560px)] max-w-xl">
            {/* Header */}
            <div className="flex items-start gap-4 pb-5 border-b border-gray-100">
                {player.userId?.avatarUrl ? (
                    <img src={player.userId.avatarUrl} alt={name} className="w-14 h-14 rounded-full object-cover shrink-0" />
                ) : (
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 text-white text-lg font-semibold flex items-center justify-center shrink-0">
                        {initials(name)}
                    </div>
                )}
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                        <h2 className="text-lg font-bold text-gray-900 truncate">{name}</h2>
                        {player.verified && (
                            <span title="Verified"><BadgeCheck size={17} className="text-[#4F46E5]" /></span>
                        )}
                    </div>
                    <div className="mt-1 space-y-0.5 text-sm text-gray-500">
                        {player.userId?.email && (
                            <div className="flex items-center gap-1.5 truncate"><Mail size={13} />{player.userId.email}</div>
                        )}
                        {player.userId?.phone && (
                            <div className="flex items-center gap-1.5"><Phone size={13} />{player.userId.phone}</div>
                        )}
                    </div>
                    <div className="mt-2.5 flex flex-wrap items-center gap-2">
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-50 text-[#4F46E5]">
                            {TYPE_LABEL[player.playerType] || "Role not set"}
                        </span>
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${AVAILABILITY_STYLE[player.availability] || "bg-gray-100 text-gray-500"}`}>
                            {player.availability || "-"}
                        </span>
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${active ? "bg-[#DCFCE7] text-[#16A34A]" : "bg-orange-50 text-[#EA580C]"}`}>
                            {player.status}
                        </span>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="py-5 space-y-4 max-h-[60vh] overflow-y-auto no-scrollbar">
                <Section title="CRICKET PROFILE">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                        <Field label="Role" value={TYPE_LABEL[player.playerType]} />
                        <Field label="Batting style" value={STYLE_LABEL[player.battingStyle]} />
                        <Field label="Bowling style" value={player.bowlingStyle} />
                        <Field label="Availability" value={player.availability} />
                    </div>
                </Section>

                <Section title="PERSONAL DETAILS">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                        <Field
                            label="Date of birth"
                            value={info.dob ? `${formatDate(info.dob)}${age != null ? ` (${age} yrs)` : ""}` : ""}
                        />
                        <Field label="Gender" value={capitalize(info.gender)} />
                        <Field label="Location" value={location} />
                    </div>
                </Section>

                <Section title={`TEAMS (${player.teams?.length || 0})`}>
                    {player.teams?.length ? (
                        <div className="flex flex-wrap gap-2 py-2">
                            {player.teams.map((t) => (
                                <div key={t._id} className="flex items-center gap-2 rounded-full border border-gray-200 pl-1 pr-3 py-1">
                                    <TeamCrest name={t.name} size={22} />
                                    <span className="text-sm text-gray-700">{t.name}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="py-2 text-sm text-gray-400">Not in any team yet.</p>
                    )}
                </Section>

                <Section title="ACCOUNT">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                        <Field label="Added on" value={formatDate(player.createdAt)} />
                        <Field label="Profile verified" value={player.verified ? "Yes" : "No"} />
                    </div>
                </Section>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-100">
                <button
                    onClick={onRemove}
                    disabled={removing}
                    className="flex items-center gap-1.5 h-10 px-4 rounded-lg border border-rose-200 text-sm font-medium text-rose-500 hover:bg-rose-50 transition-colors disabled:opacity-40"
                >
                    <UserMinus size={15} />
                    {removing ? "Removing..." : "Remove from organization"}
                </button>
                <button
                    onClick={onClose}
                    className="h-10 px-5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                >
                    Close
                </button>
            </div>
        </div>
    );
};


export default PlayerDetails