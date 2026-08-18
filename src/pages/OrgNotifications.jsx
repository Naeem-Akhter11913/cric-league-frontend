import React, { useState } from "react";
import {
  Bell,
  CheckCircle2,
  Megaphone,
  CalendarCheck2,
  Trophy,
  MoreVertical,
  Settings,
  Monitor,
  Mail,
  Smartphone,
  Users,
  UserPlus,
  BellRing,
  Settings2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Save,
  MapPin,
  Check,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Static data — swap these out for API data as needed                */
/* ------------------------------------------------------------------ */

const STAT_CARDS = [
  { icon: Bell, label: "Total Notifications", value: "124", sub: "All Time", bg: "bg-violet-50", fg: "text-violet-500" },
  { icon: CheckCircle2, label: "Unread", value: "12", sub: "New", bg: "bg-emerald-50", fg: "text-emerald-500" },
  { icon: Megaphone, label: "Announcements", value: "5", sub: "Latest", bg: "bg-sky-50", fg: "text-sky-500" },
  { icon: CalendarCheck2, label: "Match Updates", value: "7", sub: "Latest", bg: "bg-orange-50", fg: "text-orange-500" },
  { icon: Trophy, label: "System Alerts", value: "0", sub: "No Alerts", bg: "bg-pink-50", fg: "text-pink-500" },
];

const CATEGORIES = [
  { icon: Bell, label: "All Notifications", count: 124, active: true },
  { icon: Megaphone, label: "Announcements", count: 5 },
  { icon: CalendarCheck2, label: "Match Updates", count: 7 },
  { icon: Users, label: "Team Updates", count: 8 },
  { icon: UserPlus, label: "Player Updates", count: 15 },
  { icon: MapPin, label: "System Alerts", count: 0 },
  { icon: BellRing, label: "Reminders", count: 6 },
  { icon: Settings2, label: "Others", count: 83 },
];

const NOTIFICATIONS = [
  {
    icon: Megaphone,
    bg: "bg-violet-50",
    fg: "text-violet-500",
    title: "New Tournament Created",
    description: '"Naeem Premier League 2026" has been created successfully.',
    time: "Today, 10:30 AM",
    unread: true,
  },
  {
    icon: CalendarCheck2,
    bg: "bg-emerald-50",
    fg: "text-emerald-500",
    title: "Match Completed",
    description: "Royal Warriors vs Super Kings has been completed.",
    badge: "Super Kings won by 18 runs",
    time: "Today, 09:15 AM",
    unread: true,
  },
  {
    icon: Trophy,
    bg: "bg-orange-50",
    fg: "text-orange-500",
    title: "Points Table Updated",
    description: "Points table has been updated after 3 matches.",
    time: "Today, 08:45 AM",
    unread: false,
  },
  {
    icon: Users,
    bg: "bg-sky-50",
    fg: "text-sky-500",
    title: "Team Registered",
    description: 'New team "Thunder Bolts" has been registered for the tournament.',
    time: "Yesterday, 06:20 PM",
    unread: false,
  },
  {
    icon: UserPlus,
    bg: "bg-rose-50",
    fg: "text-rose-500",
    title: "Player Added",
    description: "Arjun Verma has been added to Super Kings.",
    time: "Yesterday, 05:10 PM",
    unread: false,
  },
  {
    icon: BellRing,
    bg: "bg-violet-50",
    fg: "text-violet-500",
    title: "Match Reminder",
    description: "Royal Warriors vs Green Warriors will start in 30 minutes.",
    time: "Yesterday, 03:30 PM",
    unread: false,
  },
  {
    icon: Megaphone,
    bg: "bg-orange-50",
    fg: "text-orange-500",
    title: "Announcement",
    description: "All team managers meeting on 25 May 2026 at 7:00 PM.",
    time: "23 May 2026, 07:00 PM",
    unread: false,
  },
  {
    icon: Settings,
    bg: "bg-amber-50",
    fg: "text-amber-500",
    title: "System Update",
    description: "System maintenance completed successfully.",
    time: "23 May 2026, 02:15 PM",
    unread: false,
  },
];

const CHANNELS = [
  { icon: Monitor, label: "In-app Notifications", desc: "Receive notifications inside the app" },
  { icon: Mail, label: "Email Notifications", desc: "Receive notifications via email" },
  { icon: Smartphone, label: "Push Notifications", desc: "Receive push notifications on mobile" },
];

const PREF_CATEGORIES = [
  "Announcements",
  "Match Updates",
  "Team Updates",
  "Player Updates",
  "Reminders",
  "System Alerts",
];

/* ------------------------------------------------------------------ */
/* Small helpers                                                      */
/* ------------------------------------------------------------------ */

function Checkbox({ checked }) {
  return (
    <span
      className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-[5px] border ${
        checked ? "border-indigo-600 bg-indigo-600" : "border-slate-300 bg-white"
      }`}
      style={{ width: 18, height: 18 }}
    >
      {checked && <Check size={12} strokeWidth={3} className="text-white" />}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                     */
/* ------------------------------------------------------------------ */

export default function OrgNotifications() {
  const [activeCategory, setActiveCategory] = useState("All Notifications");
  const [channels, setChannels] = useState({
    "In-app Notifications": true,
    "Email Notifications": true,
    "Push Notifications": true,
  });
  const [prefCats, setPrefCats] = useState(
    Object.fromEntries(PREF_CATEGORIES.map((c) => [c, true]))
  );

  return (
    <div className="h-screen bg-[#F7F7F9] overflow-y-auto no-scrollbar p-6 lg:p-8">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
        <p className="mt-1 text-sm text-slate-500">
          Stay updated with all the activities and important updates.
        </p>
      </div>

      {/* Stat cards */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
        {STAT_CARDS.map((c) => (
          <div key={c.label} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className={`mb-3 flex h-11 w-11 items-center justify-center rounded-full ${c.bg}`}>
              <c.icon size={20} className={c.fg} />
            </div>
            <p className="text-sm text-slate-500">{c.label}</p>
            <p className="mt-0.5 text-2xl font-bold text-slate-900">{c.value}</p>
            <p className="text-xs text-slate-400">{c.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[220px_1fr_300px]">
        {/* Filter by category */}
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <h3 className="mb-3 px-1 text-[15px] font-semibold text-slate-800">Filter by Category</h3>
            <div className="flex flex-col gap-1">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.label;
                return (
                  <button
                    key={cat.label}
                    onClick={() => setActiveCategory(cat.label)}
                    className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors ${
                      isActive
                        ? "bg-indigo-50 font-semibold text-indigo-600"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <cat.icon size={16} className={isActive ? "text-indigo-500" : "text-slate-400"} />
                      {cat.label}
                    </span>
                    <span className={isActive ? "text-indigo-500" : "text-slate-400"}>{cat.count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <button className="flex items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-white py-2.5 text-sm font-medium text-indigo-600 shadow-sm hover:bg-indigo-50">
            <CheckCircle2 size={16} />
            Mark all as read
          </button>
        </div>

        {/* Notifications list */}
        <div className="min-w-0 rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
            <h3 className="text-[15px] font-semibold text-slate-800">All Notifications</h3>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700">
                <CheckCircle2 size={15} />
                Mark all as read
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 shadow-sm hover:bg-slate-50">
                Sort by: <span className="font-medium text-slate-800">Latest</span>
                <ChevronDown size={14} className="text-slate-400" />
              </button>
            </div>
          </div>

          <div className="divide-y divide-slate-50">
            {NOTIFICATIONS.map((n, i) => (
              <div key={i} className="flex items-start gap-3 px-5 py-4 hover:bg-slate-50/60">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${n.bg}`}>
                  <n.icon size={18} className={n.fg} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-slate-800">{n.title}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-slate-500">
                    {n.description}
                    {n.badge && (
                      <span className="ml-2 inline-block rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-600">
                        {n.badge}
                      </span>
                    )}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">{n.time}</p>
                </div>
                <div className="flex items-center gap-3 pt-1">
                  {n.unread ? (
                    <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" />
                  ) : (
                    <span className="h-2.5 w-2.5 rounded-full border border-slate-300" />
                  )}
                  <button className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination footer */}
          <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm text-slate-500">Showing 1 to 8 of 124 notifications</span>
            <div className="flex items-center gap-1.5">
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50">
                <ChevronLeft size={16} />
              </button>
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  className={`h-8 w-8 rounded-lg text-sm font-medium ${
                    p === 1 ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {p}
                </button>
              ))}
              <span className="px-1 text-slate-400">...</span>
              <button className="h-8 w-8 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100">
                16
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Notification preferences */}
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                <Settings size={18} className="text-slate-500" />
              </div>
              <div>
                <h3 className="text-[15px] font-semibold text-slate-800">Notification Preferences</h3>
                <p className="text-xs text-slate-400">Manage how you receive notifications</p>
              </div>
            </div>

            {/* Channels */}
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Channels
            </p>
            <div className="flex flex-col gap-4">
              {CHANNELS.map((ch) => (
                <label
                  key={ch.label}
                  className="flex cursor-pointer items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="pt-0.5">
                      <input
                        type="checkbox"
                        checked={channels[ch.label]}
                        onChange={() =>
                          setChannels((prev) => ({ ...prev, [ch.label]: !prev[ch.label] }))
                        }
                        className="hidden"
                      />
                      <Checkbox checked={channels[ch.label]} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">{ch.label}</p>
                      <p className="text-xs text-slate-400">{ch.desc}</p>
                    </div>
                  </div>
                  <ch.icon size={16} className="mt-0.5 shrink-0 text-slate-300" />
                </label>
              ))}
            </div>

            {/* Categories */}
            <p className="mb-3 mt-6 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Categories
            </p>
            <p className="mb-3 text-xs text-slate-400">Select what you want to be notified about</p>
            <div className="flex flex-col gap-3">
              {PREF_CATEGORIES.map((cat) => (
                <label key={cat} className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={prefCats[cat]}
                    onChange={() => setPrefCats((prev) => ({ ...prev, [cat]: !prev[cat] }))}
                    className="hidden"
                  />
                  <Checkbox checked={prefCats[cat]} />
                  <span className="text-sm text-slate-700">{cat}</span>
                </label>
              ))}
            </div>

            <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-white py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50">
              <Save size={15} />
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}