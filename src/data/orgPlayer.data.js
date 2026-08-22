import { PersonStanding, UserCheck2, UserRound, Users2 } from "lucide-react";

export const teamColors = {
    "Royal Warriors": { bg: "#F2B84B", fg: "#7A4B00", label: "RW" },
    "Super Kings": { bg: "#1E3A8A", fg: "#FFFFFF", label: "SK" },
    "Thunder Bolts": { bg: "#2563EB", fg: "#FFFFFF", label: "TB" },
    "Green Warriors": { bg: "#059669", fg: "#FFFFFF", label: "GW" },
    "Blue Tigers": { bg: "#4338CA", fg: "#FFFFFF", label: "BT" },
    "Strikers Club": { bg: "#16A34A", fg: "#FFFFFF", label: "SC" },
};

export const roleBadge = {
    "Batsman": "#2563EB",
    "Bowler": "#7C3AED",
    "All Rounder": "#16A34A",
    "Wicket Keeper": "#F97316",
};

export const stats = [
    { label: "Total Players", value: "256", sub: "Across All Tournaments", icon: Users2, bg: "#EEF2FF", fg: "#4F46E5" },
    { label: "Active Players", value: "240", sub: "Currently Active", icon: UserCheck2, bg: "#ECFDF5", fg: "#16A34A" },
    { label: "Batsmen", value: "128", sub: "Players", icon: UserRound, bg: "#FFF7ED", fg: "#EA580C" },
    { label: "Bowlers", value: "98", sub: "Players", icon: PersonStanding, bg: "#EFF6FF", fg: "#2563EB" },
    { label: "All Rounders", value: "30", sub: "Players", icon: PersonStanding, bg: "#FDF2F8", fg: "#DB2777" },
];

export const tabs = ["All Players", "Batsmen", "Bowlers", "All Rounders", "Wicket Keepers"];

export const featuredPlayers = [
    {
        name: "Naeem Akhter", team: "Royal Warriors", role: "Batsman",
        photo: "https://i.pravatar.cc/300?img=12",
        line: [["Matches", "15"], ["Runs", "862"], ["HS", "147*"], ["SR", "167.7"]],
    },
    {
        name: "Imran Ali", team: "Super Kings", role: "Batsman",
        photo: "https://i.pravatar.cc/300?img=13",
        line: [["Matches", "16"], ["Runs", "815"], ["HS", "132"], ["SR", "154.2"]],
    },
    {
        name: "Asif Khan", team: "Thunder Bolts", role: "Bowler",
        photo: "https://i.pravatar.cc/300?img=14",
        line: [["Matches", "16"], ["Wickets", "21"], ["BBI", "4/25"], ["Econ", "6.91"]],
    },
    {
        name: "Arif Malik", team: "Green Warriors", role: "All Rounder",
        photo: "https://i.pravatar.cc/300?img=15",
        line: [["Matches", "15"], ["Runs", "701"], ["Wickets", "11"], ["SR", "128.3"]],
    },
    {
        name: "Sameer Ansari", team: "Blue Tigers", role: "Wicket Keeper",
        photo: "https://i.pravatar.cc/300?img=16",
        line: [["Matches", "13"], ["Runs", "642"], ["Ct", "11"], ["St", "5"]],
    },
    {
        name: "Salman Khan", team: "Strikers Club", role: "All Rounder",
        photo: "https://i.pravatar.cc/300?img=17",
        line: [["Matches", "14"], ["Runs", "512"], ["Wickets", "14"], ["SR", "142.1"]],
    },
];

export const allPlayers = [
    { name: "Naeem Akhter", avatar: "https://i.pravatar.cc/64?img=12", team: "Royal Warriors", role: "Batsman", matches: 15, runs: 862, wickets: 2, hsBb: "147*", avg: "90.50", srEcon: "167.7", rating: 732, status: "Active" },
    { name: "Imran Ali", avatar: "https://i.pravatar.cc/64?img=13", team: "Super Kings", role: "Batsman", matches: 16, runs: 815, wickets: 4, hsBb: "132", avg: "67.91", srEcon: "154.2", rating: 715, status: "Active" },
    { name: "Asif Khan", avatar: "https://i.pravatar.cc/64?img=14", team: "Thunder Bolts", role: "Bowler", matches: 16, runs: 210, wickets: 21, hsBb: "4/25", avg: "10.00", srEcon: "6.91", rating: 688, status: "Active" },
    { name: "Arif Malik", avatar: "https://i.pravatar.cc/64?img=15", team: "Green Warriors", role: "All Rounder", matches: 15, runs: 701, wickets: 11, hsBb: "98*/3-18", avg: "53.92", srEcon: "128.3/5.32", rating: 664, status: "Active" },
    { name: "Sameer Ansari", avatar: "https://i.pravatar.cc/64?img=16", team: "Blue Tigers", role: "Wicket Keeper", matches: 13, runs: 642, wickets: null, hsBb: "68*", avg: "58.36", srEcon: "121.6", rating: 615, status: "Injured" },
    { name: "Salman Khan", avatar: "https://i.pravatar.cc/64?img=17", team: "Strikers Club", role: "All Rounder", matches: 14, runs: 512, wickets: 14, hsBb: "74*/3-22", avg: "46.55", srEcon: "142.1/5.14", rating: 598, status: "Active" },
];