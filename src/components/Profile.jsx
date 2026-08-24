// import { useState } from "react";
// import {
//   User,
//   Info,
//   UserSquare2,
//   Calendar,
//   MapPin,
//   Globe,
//   Swords,
//   CircleDot,
//   Repeat2,
//   Hand,
//   ShieldCheck,
//   ChevronDown,
//   Save,
//   Users,
//   Search,
//   CheckCircle2,
// } from "lucide-react";
// import Toggle from "./Toggle";
// import SectionHeader from "./SectionHeader";
// import SelectInput from "./SelectInput";
// import TextInput from "./TextInput";
// import Field from "./Field";

// // Mock user list — wire this up to your real user search endpoint.
// const MOCK_USERS = [
//   { id: "u1", name: "Rohit Sharma" },
//   { id: "u2", name: "Smriti Mandhana" },
//   { id: "u3", name: "Arjun Verma" },
//   { id: "u4", name: "Kavya Reddy" },
// ];

// const GENDERS = ["Male", "Female", "Other", "Prefer not to say"];
// const STATUSES = [
//   { value: "active", label: "Active" },
//   { value: "suspended", label: "Suspended" },
// ];
// // Matches schema enum: ['right_hand', 'left_hand']
// const BATTING_STYLES = [
//   { value: "right_hand", label: "Right Hand" },
//   { value: "left_hand", label: "Left Hand" },
// ];
// const PLAYER_TYPES = [
//   {
//     value: "batter",
//     label: "Batter",
//     sub: "Specialized in batting",
//     icon: Swords,
//   },
//   {
//     value: "bowler",
//     label: "Bowler",
//     sub: "Specialized in bowling",
//     icon: CircleDot,
//   },
//   {
//     value: "all_rounder",
//     label: "All Rounder",
//     sub: "Contributes in both",
//     icon: Repeat2,
//   },
// ];
// const BOWLING_TYPES = [
//   "Right Arm Fast",
//   "Right Arm Fast Medium",
//   "Right Arm Medium Fast",
//   "Right Arm Medium",
//   "Right Arm Off Spin",
//   "Right Arm Leg Spin",
//   "Left Arm Fast",
//   "Left Arm Fast Medium",
//   "Left Arm Medium Fast",
//   "Left Arm Medium",
//   "Left Arm Orthodox",
//   "Left Arm Wrist Spin",
// ];

// const availability = [
//   "Available",
//   "Injured",
//   "Unavailable",
//   "Rested",
//   "Retired",
// ];


// export default function Profile() {
//   const [dob, setDob] = useState("");
//   const [gender, setGender] = useState("");
//   const [city, setCity] = useState("");
//   const [country, setCountry] = useState("");

//   const [battingStyle, setBattingStyle] = useState("");
//   const [bowlingStyle, setBowlingStyle] = useState("");
//   const [playerType, setPlayerType] = useState("batter");
//   const [isWicketKeeper, setIsWicketKeeper] = useState(false);

//   const [isIndependent, setIsIndependent] = useState(true);
//   const [forPlayer, setForPlayer] = useState("");
//   const [status, setStatus] = useState("Available");

//   const forPlayerName = MOCK_USERS.find((u) => u.id === forPlayer)?.name;

//   const handleSave = () => {
//     const payload = {
//       forPlayer: isIndependent ? undefined : forPlayer || undefined,
//       personalInfo: { dob, gender, city, country },
//       battingStyle,
//       bowlingStyle,
//       playerType: !playerType && isWicketKeeper ? "wicket_keeper" : playerType,
//       isWicketKeeper,
//       isIndependent,
//       status,
//     };
//     console.log("Save profile payload:", payload);
//   };

//   return (
//     <div className="min-h-screen min-w-0 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
//       {/* <div className="min-h-screen bg-slate-50 px-4 py-10"> */}
//       <div className="mx-auto max-w-4xl">
//         {/* Header */}
//         <div className="mb-6 flex items-start justify-between rounded-2xl border border-slate-200 bg-white p-6">
//           <div className="flex items-center gap-3">
//             <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
//               <User className="h-5 w-5" />
//             </div>
//             <div>
//               <h1 className="text-xl font-bold text-slate-900">Player Profile</h1>
//               <p className="text-sm text-slate-400">
//                 Create and manage player information
//               </p>
//             </div>
//           </div>

//           <span
//             className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${isIndependent
//               ? "bg-emerald-50 text-emerald-600"
//               : "bg-indigo-50 text-indigo-600"
//               }`}
//           >
//             {isIndependent ? (
//               <User className="h-3.5 w-3.5" />
//             ) : (
//               <Users className="h-3.5 w-3.5" />
//             )}
//             {isIndependent
//               ? "Independent Player"
//               : forPlayerName
//                 ? `For ${forPlayerName}`
//                 : "Team Player"}
//           </span>
//         </div>

//         {/* Info banner */}
//         <div className="mb-6 flex gap-3 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4">
//           <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-500" />
//           <p className="text-sm leading-relaxed text-indigo-700">
//             Provide accurate details to complete your player profile. This
//             information will be used for team management and match
//             participation.
//           </p>
//         </div>

//         {/* Personal Information */}
//         <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6">
//           <SectionHeader
//             icon={UserSquare2}
//             title="Personal Information"
//             subtitle="Basic personal details of the player"
//           />
//           <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
//             <Field label="Date of Birth">
//               <TextInput
//                 icon={Calendar}
//                 type="date"
//                 value={dob}
//                 onChange={(e) => setDob(e.target.value)}
//               />
//             </Field>
//             <Field label="Gender">
//               <SelectInput
//                 icon={User}
//                 value={gender}
//                 onChange={(e) => setGender(e.target.value)}
//                 placeholder="Select gender"
//                 options={GENDERS}
//               />
//             </Field>
//             <Field label="City">
//               <TextInput
//                 icon={MapPin}
//                 placeholder="Enter city"
//                 value={city}
//                 onChange={(e) => setCity(e.target.value)}
//               />
//             </Field>
//             <Field label="Country">
//               <SelectInput
//                 icon={Globe}
//                 value={country}
//                 onChange={(e) => setCountry(e.target.value)}
//                 placeholder="Enter country"
//                 options={["India", "Australia", "England", "Pakistan", "South Africa"]}
//               />
//             </Field>
//           </div>
//         </div>

//         {/* Playing Details */}
//         <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6">
//           <SectionHeader
//             icon={Swords}
//             title="Playing Details"
//             subtitle="Information about the player's cricket skills and role"
//           />

//           <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
//             <Field label="Batting Style" hint="Select the player's batting preference">
//               <SelectInput
//                 icon={Swords}
//                 value={battingStyle}
//                 onChange={(e) => setBattingStyle(e.target.value)}
//                 placeholder="Select batting style"
//                 options={BATTING_STYLES}
//               />
//             </Field>
//             <Field label="Bowling Style" hint="e.g., Fast Bowler, Off Break, Left Arm Spin">
//               {/* <TextInput
//                 icon={CircleDot}
//                 placeholder="Enter bowling style"
//                 value={bowlingStyle}
//                 onChange={(e) => setBowlingStyle(e.target.value)}
//               /> */}
//               <SelectInput
//                 icon={CircleDot}
//                 value={CircleDot}
//                 onChange={(e) => setBowlingStyle(e.target.value)}
//                 placeholder="Select batting style"
//                 options={BOWLING_TYPES}
//               />
//             </Field>
//           </div>

//           {/* Player Type — batting/bowling roles only */}
//           <div className="mt-6">
//             <label className="mb-3 block text-sm font-medium text-slate-800">
//               Player Type
//             </label>
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
//               {PLAYER_TYPES.map(({ value, label, sub, icon: Icon }) => {
//                 const selected = playerType === value;
//                 return (
//                   <button
//                     key={value}
//                     type="button"
//                     onClick={() => setPlayerType(value)}
//                     className={`relative rounded-xl border p-5 text-center transition ${selected
//                       ? "border-indigo-300 bg-indigo-50/40 ring-1 ring-indigo-200"
//                       : "border-slate-200 bg-white hover:border-slate-300"
//                       }`}
//                   >
//                     <span
//                       className={`absolute left-4 top-4 flex h-4 w-4 items-center justify-center rounded-full border-2 ${selected ? "border-indigo-500" : "border-slate-300"
//                         }`}
//                     >
//                       {selected && (
//                         <span className="h-2 w-2 rounded-full bg-indigo-500" />
//                       )}
//                     </span>
//                     <Icon
//                       className={`mx-auto mb-3 h-6 w-6 ${selected ? "text-indigo-500" : "text-slate-400"
//                         }`}
//                     />
//                     <p className="text-sm font-semibold text-slate-800">{label}</p>
//                     <p className="mt-0.5 text-xs text-slate-400">{sub}</p>
//                   </button>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Wicket Keeper — kept separate since keeping is an extra skill,
//               not mutually exclusive with the role picked above */}
//           <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50/60 p-5">
//             <div className="flex items-start justify-between gap-4">
//               <div className="flex gap-3">
//                 <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
//                   <Hand className="h-5 w-5" />
//                 </div>
//                 <div>
//                   <p className="text-sm font-semibold text-slate-800">
//                     Wicket Keeper
//                   </p>
//                   <p className="text-xs text-slate-400">
//                     Turn this on if the player also keeps wicket, in addition
//                     to their role above
//                   </p>
//                 </div>
//               </div>
//               <Toggle checked={isWicketKeeper} onChange={setIsWicketKeeper} />
//             </div>
//           </div>
//         </div>

//         {/* Additional Information */}
//         <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6">
//           <SectionHeader
//             icon={ShieldCheck}
//             title="Additional Information"
//             subtitle="Other status details"
//           />

//           <div className="rounded-xl border border-slate-200 p-4">
//             <div className="flex items-start justify-between gap-4">
//               <div>
//                 <p className="text-sm font-semibold text-slate-800">
//                   Independent Player
//                 </p>
//                 <p className="mt-0.5 text-xs text-slate-400">
//                   {isIndependent
//                     ? "Yes, I am an independent player"
//                     : "No, this profile is being created for another player"}
//                 </p>
//                 <p className="mt-1 text-xs text-slate-400">
//                   Independent players can participate without being
//                   associated with any team or organization.
//                 </p>
//               </div>
//               <Toggle checked={isIndependent} onChange={setIsIndependent} />
//             </div>
//           </div>

//           {/* For Player — only shown when NOT an independent player */}
//           {!isIndependent && (
//             <div className="mt-5">
//               <Field
//                 label="For Player"
//                 hint="Search and select the player this profile is being created for"
//               >
//                 <SelectInput
//                   icon={Search}
//                   value={forPlayer}
//                   onChange={(e) => setForPlayer(e.target.value)}
//                   placeholder="Select player"
//                   options={MOCK_USERS.map((u) => ({ value: u.id, label: u.name }))}
//                 />
//               </Field>
//             </div>
//           )}

//           <div className="mt-5">
//             <Field label="availability" hint="Current status of the player profile">
//               <div className="relative">
//                 <span
//                   className={`pointer-events-none absolute left-3 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full ${status === "Available" ? "bg-emerald-500" : "bg-rose-500"
//                     }`}
//                 />
//                 <select
//                   value={status}
//                   onChange={(e) => setStatus(e.target.value)}
//                   className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-8 pr-9 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
//                 >
//                   {availability.map((s) => (
//                     <option key={s} value={s}>
//                       {s}
//                     </option>
//                   ))}
//                 </select>
//                 <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
//               </div>
//             </Field>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5">
//           <p className="flex items-center gap-2 text-xs text-slate-400">
//             <CheckCircle2 className="h-4 w-4 text-emerald-500" />
//             Your information is secure and will only be used for cricket
//             platform purposes.
//           </p>
//           <div className="flex gap-3">
//             <button
//               type="button"
//               className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               onClick={handleSave}
//               className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700"
//             >
//               <Save className="h-4 w-4" />
//               Save Profile
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




import { useState } from "react";
import {
  User,
  Info,
  UserSquare2,
  Calendar,
  MapPin,
  Globe,
  Swords,
  CircleDot,
  Repeat2,
  Hand,
  ShieldCheck,
  ChevronDown,
  Save,
  Users,
  Search,
  CheckCircle2,
} from "lucide-react";
import Toggle from "./Toggle";
import SectionHeader from "./SectionHeader";
import SelectInput from "./SelectInput";
import TextInput from "./TextInput";
import Field from "./Field";

// Mock user list — wire this up to your real user search endpoint.
const MOCK_USERS = [
  { id: "u1", name: "Rohit Sharma" },
  { id: "u2", name: "Smriti Mandhana" },
  { id: "u3", name: "Arjun Verma" },
  { id: "u4", name: "Kavya Reddy" },
];

const GENDERS = ["Male", "Female", "Other", "Prefer not to say"];
const STATUSES = [
  { value: "active", label: "Active" },
  { value: "suspended", label: "Suspended" },
];
// Matches schema enum: ['right_hand', 'left_hand']
const BATTING_STYLES = [
  { value: "right_hand", label: "Right Hand" },
  { value: "left_hand", label: "Left Hand" },
];
const PLAYER_TYPES = [
  {
    value: "batter",
    label: "Batter",
    sub: "Specialized in batting",
    icon: Swords,
  },
  {
    value: "bowler",
    label: "Bowler",
    sub: "Specialized in bowling",
    icon: CircleDot,
  },
  {
    value: "all_rounder",
    label: "All Rounder",
    sub: "Contributes in both",
    icon: Repeat2,
  },
];
const BOWLING_TYPES = [
  "Right Arm Fast",
  "Right Arm Fast Medium",
  "Right Arm Medium Fast",
  "Right Arm Medium",
  "Right Arm Off Spin",
  "Right Arm Leg Spin",
  "Left Arm Fast",
  "Left Arm Fast Medium",
  "Left Arm Medium Fast",
  "Left Arm Medium",
  "Left Arm Orthodox",
  "Left Arm Wrist Spin",
];

const AVAILABILITY = [
  "Available",
  "Injured",
  "Unavailable",
  "Rested",
  "Retired",
];

// Single source of truth for the whole form, grouped to mirror the
// sections in the UI (and roughly the payload shape you'll POST).
// const INITIAL_STATE = {
//   personalInfo: { dob: "", gender: "", city: "", country: "" },
//   playingDetails: {
//     battingStyle: "",
//     bowlingStyle: "",
//     playerType: "batter",
//     isWicketKeeper: false,
//   },
//   additionalInfo: {
//     isIndependent: true,
//     forPlayer: "",
//     status: "Available",
//   },
// };

export default function Profile({form, setForm, handleSubmit}) {


  // Generic setter for any nested field: updateField("personalInfo", "dob", val)
  const updateField = (section, field, value) => {
    setForm((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const { personalInfo, playingDetails, additionalInfo } = form;
  const forPlayerName = MOCK_USERS.find(
    (u) => u.id === additionalInfo.forPlayer
  )?.name;

  const handleSave = () => {
    const payload = {
      forPlayer: additionalInfo.isIndependent
        ? undefined
        : additionalInfo.forPlayer || undefined,
      personalInfo,
      battingStyle: playingDetails.battingStyle,
      bowlingStyle: playingDetails.bowlingStyle,
      playerType: playingDetails.playerType,
      isWicketKeeper: playingDetails.isWicketKeeper,
      isIndependent: additionalInfo.isIndependent,
      status: additionalInfo.status,
    };
    handleSubmit(payload);
  };

  return (
    <div className="min-h-screen min-w-0 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Player Profile</h1>
              <p className="text-sm text-slate-400">
                Create and manage player information
              </p>
            </div>
          </div>

          <span
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${
              additionalInfo.isIndependent
                ? "bg-emerald-50 text-emerald-600"
                : "bg-indigo-50 text-indigo-600"
            }`}
          >
            {additionalInfo.isIndependent ? (
              <User className="h-3.5 w-3.5" />
            ) : (
              <Users className="h-3.5 w-3.5" />
            )}
            {additionalInfo.isIndependent
              ? "Independent Player"
              : forPlayerName
              ? `For ${forPlayerName}`
              : "Team Player"}
          </span>
        </div>

        {/* Info banner */}
        <div className="mb-6 flex gap-3 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4">
          <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-500" />
          <p className="text-sm leading-relaxed text-indigo-700">
            Provide accurate details to complete your player profile. This
            information will be used for team management and match
            participation.
          </p>
        </div>

        {/* Personal Information */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6">
          <SectionHeader
            icon={UserSquare2}
            title="Personal Information"
            subtitle="Basic personal details of the player"
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Date of Birth">
              <TextInput
                icon={Calendar}
                type="date"
                value={personalInfo.dob}
                onChange={(e) => updateField("personalInfo", "dob", e.target.value)}
              />
            </Field>
            <Field label="Gender">
              <SelectInput
                icon={User}
                value={personalInfo.gender}
                onChange={(e) => updateField("personalInfo", "gender", e.target.value)}
                placeholder="Select gender"
                options={GENDERS}
              />
            </Field>
            <Field label="City">
              <TextInput
                icon={MapPin}
                placeholder="Enter city"
                value={personalInfo.city}
                onChange={(e) => updateField("personalInfo", "city", e.target.value)}
              />
            </Field>
            <Field label="Country">
              <SelectInput
                icon={Globe}
                value={personalInfo.country}
                onChange={(e) => updateField("personalInfo", "country", e.target.value)}
                placeholder="Enter country"
                options={["India", "Australia", "England", "Pakistan", "South Africa"]}
              />
            </Field>
          </div>
        </div>

        {/* Playing Details */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6">
          <SectionHeader
            icon={Swords}
            title="Playing Details"
            subtitle="Information about the player's cricket skills and role"
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Batting Style" hint="Select the player's batting preference">
              <SelectInput
                icon={Swords}
                value={playingDetails.battingStyle}
                onChange={(e) => updateField("playingDetails", "battingStyle", e.target.value)}
                placeholder="Select batting style"
                options={BATTING_STYLES}
              />
            </Field>
            <Field label="Bowling Style" hint="e.g., Fast Bowler, Off Break, Left Arm Spin">
              <SelectInput
                icon={CircleDot}
                value={playingDetails.bowlingStyle}
                onChange={(e) => updateField("playingDetails", "bowlingStyle", e.target.value)}
                placeholder="Select bowling style"
                options={BOWLING_TYPES}
              />
            </Field>
          </div>

          {/* Player Type — batting/bowling roles only */}
          <div className="mt-6">
            <label className="mb-3 block text-sm font-medium text-slate-800">
              Player Type
            </label>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {PLAYER_TYPES.map(({ value, label, sub, icon: Icon }) => {
                const selected = playingDetails.playerType === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => updateField("playingDetails", "playerType", value)}
                    className={`relative rounded-xl border p-5 text-center transition ${
                      selected
                        ? "border-indigo-300 bg-indigo-50/40 ring-1 ring-indigo-200"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <span
                      className={`absolute left-4 top-4 flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                        selected ? "border-indigo-500" : "border-slate-300"
                      }`}
                    >
                      {selected && (
                        <span className="h-2 w-2 rounded-full bg-indigo-500" />
                      )}
                    </span>
                    <Icon
                      className={`mx-auto mb-3 h-6 w-6 ${
                        selected ? "text-indigo-500" : "text-slate-400"
                      }`}
                    />
                    <p className="text-sm font-semibold text-slate-800">{label}</p>
                    <p className="mt-0.5 text-xs text-slate-400">{sub}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Wicket Keeper — kept separate since keeping is an extra skill,
              not mutually exclusive with the role picked above */}
          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50/60 p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Hand className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Wicket Keeper
                  </p>
                  <p className="text-xs text-slate-400">
                    Turn this on if the player also keeps wicket, in addition
                    to their role above
                  </p>
                </div>
              </div>
              <Toggle
                checked={playingDetails.isWicketKeeper}
                onChange={(val) => updateField("playingDetails", "isWicketKeeper", val)}
              />
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6">
          <SectionHeader
            icon={ShieldCheck}
            title="Additional Information"
            subtitle="Other status details"
          />

          <div className="rounded-xl border border-slate-200 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Independent Player
                </p>
                <p className="mt-0.5 text-xs text-slate-400">
                  {additionalInfo.isIndependent
                    ? "Yes, I am an independent player"
                    : "No, this profile is being created for another player"}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Independent players can participate without being
                  associated with any team or organization.
                </p>
              </div>
              <Toggle
                checked={additionalInfo.isIndependent}
                onChange={(val) => updateField("additionalInfo", "isIndependent", val)}
              />
            </div>
          </div>

          {/* For Player — only shown when NOT an independent player */}
          {!additionalInfo.isIndependent && (
            <div className="mt-5">
              <Field
                label="For Player"
                hint="Search and select the player this profile is being created for"
              >
                <SelectInput
                  icon={Search}
                  value={additionalInfo.forPlayer}
                  onChange={(e) => updateField("additionalInfo", "forPlayer", e.target.value)}
                  placeholder="Select player"
                  options={MOCK_USERS.map((u) => ({ value: u.id, label: u.name }))}
                />
              </Field>
            </div>
          )}

          <div className="mt-5">
            <Field label="Availability" hint="Current status of the player profile">
              <div className="relative">
                <span
                  className={`pointer-events-none absolute left-3 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full ${
                    additionalInfo.status === "Available" ? "bg-emerald-500" : "bg-rose-500"
                  }`}
                />
                <select
                  value={additionalInfo.status}
                  onChange={(e) => updateField("additionalInfo", "status", e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-8 pr-9 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                >
                  {AVAILABILITY.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>
            </Field>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5">
          <p className="flex items-center gap-2 text-xs text-slate-400">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            Your information is secure and will only be used for cricket
            platform purposes.
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700"
            >
              <Save className="h-4 w-4" />
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}