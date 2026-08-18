import { CalendarPlus, ClipboardCheck, Plus, Radio, Trophy, UserCog, UserPlus, Users2 } from "lucide-react";

export const stats = [
    { label: "Total Tournaments", value: "5", sub: "2 Live • 3 Completed", icon: Trophy, color: "#7C3AED" },
    { label: "Total Teams", value: "32", sub: "24 Active • 8 Inactive", icon: Users2, color: "#16A34A" },
    { label: "Live Matches", value: "3", sub: "Ongoing Now", icon: Radio, color: "#EC4899" },
    { label: "Upcoming Matches", value: "7", sub: "Next 7 Days", icon: CalendarPlus, color: "#F97316" },
    { label: "Completed Matches", value: "28", sub: "This Season", icon: ClipboardCheck, color: "#2563EB" },
];

export const liveMatches = [
    {
        overs: "15.3 Overs",
        teamA: "Royal Warriors", scoreA: "128/4", oversA: "(15.3)",
        teamB: "Super Kings", scoreB: "125/8", oversB: "(20)",
        rrr: "8.25", target: "171",
        note: "Royal Warriors need 43 runs in 27 balls",
        tournament: "Naeem Premier League 2026",
    },
    {
        overs: "12.0 Overs",
        teamA: "Thunder Bolts", scoreA: "", oversA: "(12.0)",
        teamB: "Strikers Club", scoreB: "–", oversB: "",
        rrr: "8.16", target: "165", rrrLabel: "CRR",
        note: null,
        tournament: "City Champions Cup 2026",
    },
    {
        overs: "8.4 Overs",
        teamA: "Green Warriors", scoreA: "74/2", oversA: "(8.4)",
        teamB: "Blue Tigers", scoreB: "–", oversB: "",
        rrr: "8.54", target: "143", rrrLabel: "CRR",
        note: null,
        tournament: "Summer Cup 2026",
    },
];

export const upcomingMatches = [
    { date: "24", month: "MAY", teamA: "Royal Warriors", teamB: "Thunder Bolts", time: "10:00 AM", meta: "NPL 2026 • Match 12" },
    { date: "24", month: "MAY", teamA: "Super Kings", teamB: "Green Warriors", time: "02:00 PM", meta: "NPL 2026 • Match 13" },
    { date: "25", month: "MAY", teamA: "Strikers Club", teamB: "Blue Tigers", time: "10:00 AM", meta: "NPL 2026 • Match 14" },
    { date: "25", month: "MAY", teamA: "Royal Warriors", teamB: "Green Warriors", time: "02:00 PM", meta: "NPL 2026 • Match 15" },
];

export const topScorers = [
    { rank: 1, name: "Naeem", team: "Royal Warriors", runs: "321 Runs", sr: "167.7" },
    { rank: 2, name: "Asif", team: "Super Kings", runs: "289 Runs", sr: "154.2" },
    { rank: 3, name: "Imran", team: "Thunder Bolts", runs: "245 Runs", sr: "148.6" },
    { rank: 4, name: "Arif", team: "Green Warriors", runs: "212 Runs", sr: "136.8" },
    { rank: 5, name: "Sameer", team: "Strikers Club", runs: "198 Runs", sr: "128.9" },
];

export const pointsTable = [
    { pos: 1, team: "Royal Warriors", p: 4, w: 3, l: 1, nrr: "+1.25", pts: 6 },
    { pos: 2, team: "Super Kings", p: 4, w: 3, l: 1, nrr: "+0.78", pts: 6 },
    { pos: 3, team: "Thunder Bolts", p: 4, w: 2, l: 2, nrr: "+0.10", pts: 4 },
    { pos: 4, team: "Strikers Club", p: 4, w: 2, l: 2, nrr: "-0.25", pts: 4 },
    { pos: 5, team: "Green Warriors", p: 4, w: 1, l: 3, nrr: "-0.80", pts: 2 },
    { pos: 6, team: "Blue Tigers", p: 4, w: 1, l: 3, nrr: "-1.30", pts: 2 },
];

export const battingRows = [
    { name: "Naeem *", r: 52, b: 31, fours: 4, sixes: 3, sr: "167.7" },
    { name: "Asif", r: 28, b: 19, fours: 2, sixes: 1, sr: "147.4" },
];

export const bowlingRows = [
    { name: "Imran", o: "3.3", m: 0, r: 18, w: 2, econ: "5.14" },
];

export const lastBalls = [
    { v: "1", bg: "#16A34A" },
    { v: "4", bg: "#2563EB" },
    { v: "W", bg: "#DC2626" },
    { v: "0", bg: "#9CA3AF" },
    { v: "6", bg: "#7C3AED" },
    { v: "2", bg: "#16A34A" },
];

export const quickActions = [
    { label: "Create Tournament", sub: "Start a new tournament", icon: Plus, color: "#7C3AED" },
    { label: "Add Team", sub: "Register new team", icon: UserPlus, color: "#16A34A" },
    { label: "Add Match", sub: "Schedule new match", icon: CalendarPlus, color: "#DC2626" },
    { label: "Assign Scorer", sub: "Manage scorers", icon: UserCog, color: "#F97316" },
];

export const teamColors = {
    "Royal Warriors": { bg: "#F2B84B", text: "#7A4B00" },
    "Super Kings": { bg: "#1E3A8A", text: "#FFFFFF" },
    "Thunder Bolts": { bg: "#2563EB", text: "#FFFFFF" },
    "Strikers Club": { bg: "#16A34A", text: "#FFFFFF" },
    "Green Warriors": { bg: "#059669", text: "#FFFFFF" },
    "Blue Tigers": { bg: "#4338CA", text: "#FFFFFF" },
};