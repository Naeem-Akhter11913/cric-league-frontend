import React, { useEffect, useState } from "react";
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
} from "lucide-react";
import DashboardFooter from "../components/DashboardFooter";
import GeneralSettings from "../components/GeneralSettings";
import Profile from "../components/Profile";
import Security from "../components/Security";
import Notifications from "../components/Notifications";
import UsersRoles from "../components/UsersRoles";
import TournamentSettings from "../components/TournamentSettings";
import Integrations from "../components/Integrations";
import BackupRestore from "../components/BackupRestore";
import About from "../components/About";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import toast from "react-hot-toast";
import { createProfile, updateMyProfile } from "../store/action/player.action";
import { clearPlayerSuccess, clearSelectedPlayer } from "../store/Slice/playerSlice";
import { organizerList } from "../store/action/organizer.action";

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
  // { icon: Target, label: "Scoring Settings", desc: "Scoring and match preferences" },
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

const INITIAL_STATE = {
  personalInfo: { dob: "", gender: "", city: "", country: "" },
  playingDetails: {
    battingStyle: "",
    bowlingStyle: "",
    playerType: "batter",
    isWicketKeeper: false,
  },
  additionalInfo: {
    isIndependent: true,
    forPlayer: "",
    availability: "Available",
  },
};

const validation = (dataToValidate) => {
  for (const [key, value] of Object.entries(dataToValidate)) {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      const nestedError = validation(value);
      if (nestedError) return nestedError;
      continue;
    }

    if (key === 'forPlayer' || key === 'isWicketKeeper' || key === "isIndependent") continue;

    if (!value || value === null || value === undefined || value === '') {
      const fieldName = key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase());

      return `Please fill the ${fieldName}`;
    }
  }

  return null;
};


export default function OrgSettings() {
  const { profile, list, loading, error, success } = useAppSelector(state => state.players);

  const {
    profile: organizerProfile,
    organizerList: organizerListData,
    loading: organizerLoading,
    error: organizerError,
    success: organizerSuccess,
  } = useAppSelector(state => state.organizer);
  const dispatch = useAppDispatch()
  const [form, setForm] = useState(INITIAL_STATE);
  // console.log("LIDT",organizerListData)
  useEffect(() => {
    // profile
    if (!Boolean(profile)) return;
    const { personalInfo, battingStyle, availability, bowlingStyle, isIndependent, playerType, forPlayer = null, isWicketKeeper = false } = profile;

    const personal = { dob: "", gender: "", city: "", country: "" }

    if (Object.keys(personalInfo).length !== 0) {
      const { dob, gender, city, country } = personalInfo
      if (dob) {
        personal.dob = dob.split("T")[0]
        personal.city = city;
        personal.country = country;
        personal.gender = gender
      }
    }

    const data = {
      personalInfo: personal,
      playingDetails: {
        battingStyle,
        bowlingStyle,
        playerType,
        isWicketKeeper,
      },
      additionalInfo: {
        isIndependent,
        forPlayer,
        availability,
      },
    };
    setForm(data);
  }, [profile])

  const handleSubmit = (dataTobeSave) => {
    const errorValue = validation(dataTobeSave);
    if (errorValue) {
      toast.error(errorValue)
      return;
    }
    Boolean(profile) ? dispatch(updateMyProfile(dataTobeSave)) : dispatch(createProfile(dataTobeSave))

  }

  const settingsMap = {
    General: <GeneralSettings />,
    Profile: <Profile profile={profile} form={form} setForm={setForm} handleSubmit={handleSubmit} loading={loading} organizerList={organizerListData} />,
    Security: <Security />,
    Notifications: <Notifications />,
    "Users & Roles": <UsersRoles />,
    "Tournament Settings": <TournamentSettings />,
    Integrations: <Integrations />,
    "Backup & Restore": <BackupRestore />,
    // "Scoring Settings": <p>Scoring Settings</p>,
    About: <About />
  }

  const [activeTab, setActiveTab] = useState(Object.keys(settingsMap)[0]);
  // console.log(activeTab);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearSelectedPlayer()
      return;
    }
    if (success) {
      toast.success(success);
      clearPlayerSuccess();
      return;
    }
  }, [error, success]);



  useEffect(() => {
    dispatch(organizerList({ page: 1, limit: 20 }));
  }, []);


  return (
    <div className="h-screen bg-[#F7F7F9] overflow-y-auto no-scrollbar p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your account, preferences and system settings
        </p>
      </div>

      {/* <div className="grid grid-cols-1 gap-6 xl:grid-cols-[260px_1fr_300px]">
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <h3 className="mb-3 px-1 text-[15px] font-semibold text-slate-800">Settings Menu</h3> */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[260px_1fr_300px] items-start">
        <div className="sticky top-6 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <h3 className="mb-3 px-1 text-[15px] font-semibold text-slate-800">Settings Menu</h3>
          <div className="flex flex-col gap-1">
            {MENU_ITEMS.map((item) => (
              <button
                onClick={() => setActiveTab(item.label)}
                key={item.label}
                className={`flex items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${activeTab === item.label ? "bg-indigo-50" : "hover:bg-slate-50"
                  // className={`flex items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${item.active ? "bg-indigo-50" : "hover:bg-slate-50"
                  }`}
              >
                <item.icon
                  size={17}
                  className={`mt-0.5 shrink-0 ${activeTab === item.label ? "text-indigo-600" : "text-slate-400"}`}
                />
                <div>
                  <p className={`text-sm font-semibold ${activeTab === item.label ? "text-indigo-600" : "text-slate-800"}`}>
                    {item.label}
                  </p>
                  <p className="text-xs text-slate-400">{item.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* <GeneralSettings /> */}
        {settingsMap[activeTab]}

        <div className="sticky top-1 flex flex-col gap-6">
          {/* <div className="flex flex-col gap-6"> */}
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