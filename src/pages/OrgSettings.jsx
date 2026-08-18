import React, { useState } from "react";
import {
  Settings as SettingsIcon,
  UserCircle2,
  Shield,
  Bell,
  Users,
  Trophy,
  Target,
  Blocks,
  ArrowRightLeft,
  Info,
  Save,
  Upload,
  ChevronRight,
  ArrowRight,
  Flame,
  FileText,
  KeyRound,
  Mail,
  Download,
  Clock,
  Database,
  HardDrive,
  ChevronDown,
} from "lucide-react";
import DashboardFooter from "../components/DashboardFooter";

/* ------------------------------------------------------------------ */
/* Static data — swap these out for API data as needed                */
/* ------------------------------------------------------------------ */

const MENU_ITEMS = [
  { icon: SettingsIcon, label: "General", desc: "Basic application settings", active: true },
  { icon: UserCircle2, label: "Profile", desc: "Manage your profile" },
  { icon: Shield, label: "Security", desc: "Password and security options" },
  { icon: Bell, label: "Notifications", desc: "Notification preferences" },
  { icon: Users, label: "Users & Roles", desc: "Manage users and roles" },
  { icon: Trophy, label: "Tournament Settings", desc: "Default tournament settings" },
  { icon: Target, label: "Scoring Settings", desc: "Scoring and match preferences" },
  { icon: Blocks, label: "Integrations", desc: "Third-party integrations" },
  { icon: ArrowRightLeft, label: "Backup & Restore", desc: "Backup and restore data" },
  { icon: Info, label: "About", desc: "App information and updates" },
];

const QUICK_ACTIONS = [
  { icon: Flame, label: "Clear Cache", desc: "Clear application cache", bg: "bg-orange-50", fg: "text-orange-500" },
  { icon: FileText, label: "System Logs", desc: "View system logs", bg: "bg-orange-50", fg: "text-orange-500" },
  { icon: KeyRound, label: "Manage API Keys", desc: "View and manage API keys", bg: "bg-sky-50", fg: "text-sky-500" },
  { icon: Mail, label: "Email Templates", desc: "Manage email templates", bg: "bg-violet-50", fg: "text-violet-500" },
  { icon: Download, label: "Data Export", desc: "Export system data", bg: "bg-violet-50", fg: "text-violet-500" },
];

const SYSTEM_INFO = [
  { icon: Info, label: "Application Version", value: "v2.4.1" },
  { icon: SettingsIcon, label: "Environment", value: "Production" },
  { icon: Clock, label: "Last Backup", value: "25 May 2026, 02:30 AM" },
  { icon: Database, label: "Database Status", value: "Connected", badge: true },
];

/* ------------------------------------------------------------------ */
/* Small helpers                                                      */
/* ------------------------------------------------------------------ */

function FieldLabel({ title, subtitle }) {
  return (
    <div className="mb-2">
      <p className="text-sm font-semibold text-slate-800">{title}</p>
      {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
    </div>
  );
}

function Select({ value, options = [] }) {
  return (
    <div className="relative">
      <select
        defaultValue={value}
        className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 pr-9 text-sm text-slate-700 shadow-sm outline-none focus:border-indigo-300"
      >
        <option>{value}</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <ChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
    </div>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? "bg-indigo-600" : "bg-slate-200"
        }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-[22px]" : "translate-x-0.5"
          }`}
      />
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                     */
/* ------------------------------------------------------------------ */

export default function OrgSettings() {
  const [maintenance, setMaintenance] = useState(false);

  return (
    <div className="h-screen bg-[#F7F7F9] overflow-y-auto no-scrollbar p-6 lg:p-8">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your account, preferences and system settings
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[260px_1fr_300px]">
        {/* Settings menu */}
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <h3 className="mb-3 px-1 text-[15px] font-semibold text-slate-800">Settings Menu</h3>
          <div className="flex flex-col gap-1">
            {MENU_ITEMS.map((item) => (
              <button
                key={item.label}
                className={`flex items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${item.active ? "bg-indigo-50" : "hover:bg-slate-50"
                  }`}
              >
                <item.icon
                  size={17}
                  className={`mt-0.5 shrink-0 ${item.active ? "text-indigo-600" : "text-slate-400"}`}
                />
                <div>
                  <p className={`text-sm font-semibold ${item.active ? "text-indigo-600" : "text-slate-800"}`}>
                    {item.label}
                  </p>
                  <p className="text-xs text-slate-400">{item.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* General settings form */}
        <div className="min-w-0 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">General Settings</h3>
              <p className="text-sm text-slate-400">Configure basic application settings</p>
            </div>
            <button className="flex items-center gap-2 rounded-xl border border-indigo-200 bg-white px-4 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50">
              <Save size={15} />
              Save Changes
            </button>
          </div>

          {/* Application name */}
          <div className="border-b border-slate-100 pb-6">
            <FieldLabel title="Application Name" subtitle="This name will be shown across the application" />
            <input
              defaultValue="Cric League"
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 shadow-sm outline-none focus:border-indigo-300"
            />
          </div>

          {/* Application logo */}
          <div className="border-b border-slate-100 py-6">
            <FieldLabel title="Application Logo" subtitle="Upload your tournament or organization logo" />
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 text-2xl">
                🏏
              </div>
              <div>
                <button className="flex items-center gap-2 rounded-xl border border-indigo-200 bg-white px-4 py-2 text-sm font-medium text-indigo-600 shadow-sm hover:bg-indigo-50">
                  <Upload size={15} />
                  Change Logo
                </button>
                <p className="mt-1.5 text-xs text-slate-400">PNG, JPG or SVG (Max. 2MB)</p>
              </div>
            </div>
          </div>

          {/* Timezone / Date format */}
          <div className="grid grid-cols-1 gap-6 border-b border-slate-100 py-6 sm:grid-cols-2">
            <div>
              <FieldLabel title="Default Timezone" subtitle="Set the default timezone for the application" />
              <Select value="(UTC+05:30) Asia/Kolkata" options={["(UTC+00:00) London", "(UTC-05:00) New York"]} />
            </div>
            <div>
              <FieldLabel title="Date Format" subtitle="Select the date format" />
              <Select value="DD MMM YYYY (25 May 2026)" options={["MM/DD/YYYY", "YYYY-MM-DD"]} />
            </div>
          </div>

          {/* Time format / Currency */}
          <div className="grid grid-cols-1 gap-6 border-b border-slate-100 py-6 sm:grid-cols-2">
            <div>
              <FieldLabel title="Time Format" subtitle="Select the time format" />
              <Select value="12 Hour (01:30 PM)" options={["24 Hour (13:30)"]} />
            </div>
            <div>
              <FieldLabel title="Currency" subtitle="Select default currency" />
              <Select value="INR (₹) - Indian Rupee" options={["USD ($) - US Dollar", "EUR (€) - Euro"]} />
            </div>
          </div>

          {/* Language */}
          <div className="border-b border-slate-100 py-6 sm:w-1/2 sm:pr-3">
            <FieldLabel title="Language" subtitle="Select application language" />
            <Select value="English" options={["Hindi", "Spanish"]} />
          </div>

          {/* Maintenance mode */}
          <div className="flex items-center justify-between pt-6">
            <div>
              <p className="text-sm font-semibold text-slate-800">Maintenance Mode</p>
              <p className="text-xs text-slate-400">
                Enable maintenance mode to restrict access to the application
              </p>
            </div>
            <Toggle checked={maintenance} onChange={() => setMaintenance((v) => !v)} />
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          {/* Profile summary */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-[15px] font-semibold text-slate-800">Profile Summary</h3>
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 text-lg font-semibold text-white">
                NA
              </div>
              <div className="min-w-0">
                <p className="truncate font-semibold text-slate-800">Naeem Akhter</p>
                <p className="text-xs text-slate-400">Tournament Organizer</p>
                <p className="truncate text-xs text-slate-400">naeem@example.com</p>
              </div>
            </div>
            <button className="mt-4 flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700">
              View Profile <ArrowRight size={14} />
            </button>
          </div>

          {/* Quick actions */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-[15px] font-semibold text-slate-800">Quick Actions</h3>
            <div className="flex flex-col">
              {QUICK_ACTIONS.map((a) => (
                <button
                  key={a.label}
                  className="flex items-center gap-3 rounded-xl px-1 py-2.5 text-left hover:bg-slate-50"
                >
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${a.bg}`}>
                    <a.icon size={16} className={a.fg} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-800">{a.label}</p>
                    <p className="text-xs text-slate-400">{a.desc}</p>
                  </div>
                  <ChevronRight size={16} className="shrink-0 text-slate-300" />
                </button>
              ))}
            </div>
          </div>

          {/* System information */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-[15px] font-semibold text-slate-800">System Information</h3>
            <div className="flex flex-col gap-3.5">
              {SYSTEM_INFO.map((info) => (
                <div key={info.label} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-500">
                    <info.icon size={14} className="text-slate-400" />
                    {info.label}
                  </span>
                  {info.badge ? (
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-600">
                      {info.value}
                    </span>
                  ) : (
                    <span className="font-medium text-slate-700">{info.value}</span>
                  )}
                </div>
              ))}
              <div className="text-sm">
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-slate-500">
                    <HardDrive size={14} className="text-slate-400" />
                    Storage Used
                  </span>
                  <span className="font-medium text-slate-700">3.2 GB / 10 GB</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[32%] rounded-full bg-indigo-600" />
                </div>
              </div>
            </div>
            <button className="mt-4 flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700">
              View Detailed Info <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <DashboardFooter />
    </div>
  );
}