import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import {
    LayoutDashboard,
    Trophy,
    Users,
    UserRound,
    Swords,
    Radio,
    Table2,
    BarChart3,
    MapPin,
    ClipboardList,
    Bell,
    Settings,
    Menu,
    X,
    Search,
    Mail,
    Moon,
    ChevronDown,
} from 'lucide-react'
import ShowModel from '../model/ShowModel';
import UserLogout from '../components/UserLogout';
import { useAppDispatch } from '../store/hooks';
import { logoutUser } from '../store/action/auth.action';

const CricDashboard = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [modelOpen, setModalOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();
    const dispatch = useAppDispatch()


    const sidebarItems = [
        {
            label: "Dashboard",
            icon: LayoutDashboard,
            to: "/dashboard"
        },
        {
            label: "Tournaments",
            icon: Trophy,
            to: "/dashboard/tournaments"
        },
        {
            label: "Teams",
            icon: Users,
            to: "/dashboard/teams"
        },
        {
            label: "Players",
            icon: UserRound,
            to: "/dashboard/players"
        },
        {
            label: "Matches",
            icon: Swords,
            to: "/dashboard/matches"
        },
        {
            label: "Live Scores",
            icon: Radio,
            to: "/dashboard/live-scores"
        },
        {
            label: "Points Table",
            icon: Table2,
            to: "/dashboard/points-table"
        },
        {
            label: "Statistics",
            icon: BarChart3,
            to: "/dashboard/statistics"
        },
        {
            label: "Venues",
            icon: MapPin,
            to: "/dashboard/venues"
        },
        {
            label: "Scorers",
            icon: ClipboardList,
            to: "/dashboard/scorers"
        },
        // { label: "Reports", icon: FileText, to: "/dashboard/reports" },
        {
            label: "Notifications",
            icon: Bell,
            to: "/dashboard/notifications",
            badge: 8
        },
        {
            label: "Settings",
            icon: Settings,
            to: "/dashboard/settings",
            click: true,
        },
    ];

    const handleMenuClick = () => {
        setCollapsed(!collapsed);
        setMobileOpen(!mobileOpen);
    };
    const handleNavigate = (i, to) => {
        setActiveIndex(i);
        setMobileOpen(false);
        navigate(to);
    }

    
    const handleLogout = () =>{
        dispatch(logoutUser());
        console.log("Clicked")
    }

    return (
        <>
            <div className="flex h-screen w-full border border-gray-400 relative overflow-hidden bg-[#F7F7F9]">
                <style>{`
                .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
            `}</style>

                {mobileOpen && (
                    <div onClick={() => setMobileOpen(false)} className="fixed inset-0 bg-black/40 z-20 md:hidden" />
                )}

                {/* SIDEBAR */}
                <div
                    className={`bg-white flex flex-col transition-transform md:transition-all duration-300 fixed md:relative inset-y-0 left-0 z-30 h-full w-60 ${collapsed ? "md:w-16" : "md:w-60"
                        } transform ${mobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
                >
                    <div className="p-4 flex items-center justify-between h-[57px]">
                        <div className={`text-[#0B2818] font-bold tracking-wide ${collapsed ? "md:text-xs" : "text-sm"}`}>
                            <span className="md:hidden">CRIC LEAGUE</span>
                            <span className="hidden md:inline">{collapsed ? "CL" : "CRIC LEAGUE"}</span>
                        </div>
                        <button onClick={() => setMobileOpen(false)} className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg text-[#1F2933] hover:bg-[#F5F1E6]">
                            <X size={18} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto py-2 px-2 no-scrollbar">
                        {sidebarItems.map((item, i) => {
                            const isActive = i === activeIndex;
                            return (
                                <button
                                    key={i}
                                    onClick={() => handleNavigate(i, item.to)}
                                    className={`w-full mb-1 p-2.5 flex items-center gap-3 rounded-lg text-sm transition-colors ${isActive ? "bg-[#F2B84B]/15 text-[#8A5E10]" : "text-[#4B5563] hover:bg-[#F5F1E6] hover:text-[#1F2933]"
                                        }`}
                                >
                                    <item.icon size={18} className="shrink-0" />
                                    <span className={`flex-1 text-left truncate ${collapsed ? "md:hidden" : ""}`}>{item.label}</span>
                                    {item.badge && (
                                        <span className={`bg-[#C1272D] text-white text-[10px] font-semibold min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full ${collapsed ? "md:hidden" : ""}`}>
                                            {item.badge}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <div className="border-t border-[#E5E1D8] p-3">
                        <button className="border border-[#E5E1D8] hover:bg-[#F5F1E6] w-full h-9 rounded-lg flex items-center justify-start gap-3 text-[#1F2933] transition-colors">
                            <Moon size={18} className='ml-2' />
                            <p className={collapsed ? "md:hidden" : ""}>Dark Mode</p>
                        </button>
                    </div>

                    <div className="cursor-pointer border-t border-[#E5E1D8] p-3 flex items-center gap-2" onClick={e =>{
                        e.stopPropagation();
                        setModalOpen(true);
                    }}>
                        <div className="bg-[#0B2818]/10 w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-[#0B2818] text-xs font-semibold">NA</div>
                        <div className={`flex flex-col text-sm min-w-0 ${collapsed ? "md:hidden" : ""}`}>
                            <span className="text-[#1F2933] truncate">Naeem Akhter</span>
                            <span className="text-xs text-[#6B7280] truncate">Role</span>
                        </div>
                    </div>
                </div>

                {/* MAIN */}
                <div className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
                    {/* TOP BAR */}
                    <div className="sticky top-0 z-20 bg-white p-[8px] flex items-center justify-between gap-2 sm:gap-3 shrink-0">
                        <button onClick={handleMenuClick} className="flex items-center justify-center border border-[#E5E1D8] hover:bg-[#F5F1E6] w-9 h-9 shrink-0 rounded-lg px-3 py-1 text-sm text-[#1F2933] transition-colors">
                            <Menu size={18} />
                        </button>
                        <div className="relative w-full min-w-0 flex justify-end">
                            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
                            <input
                                type="text"
                                placeholder="Search tournaments, teams, players..."
                                className="w-full sm:w-[300px] md:w-[350px] lg:w-[400px] h-10 pl-9 pr-4 rounded-lg bg-[#F5F1E6] border border-[#E5E1D8] text-sm text-[#1F2933] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#F2B84B] focus:border-transparent transition-all"
                            />
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
                            <button className="hidden sm:flex border border-[#E5E1D8] hover:bg-[#F5F1E6] w-9 h-9 rounded-lg items-center justify-center text-[#1F2933] transition-colors">
                                <Mail size={18} />
                            </button>
                            <button className="relative border border-[#E5E1D8] hover:bg-[#F5F1E6] w-9 h-9 rounded-lg flex items-center justify-center text-[#1F2933] transition-colors">
                                <Bell size={18} />
                                <span className="absolute -top-1.5 -right-1.5 bg-[#C1272D] text-white text-[10px] font-semibold w-[18px] h-[18px] flex items-center justify-center rounded-full">8</span>
                            </button>
                            <div className="hidden sm:block border-l border-[#E5E1D8] h-6 mx-1"></div>
                            <button className="flex items-center gap-2 hover:bg-[#F5F1E6] rounded-lg pl-1 pr-0 sm:pr-2 py-1 transition-colors">
                                <div className="bg-[#0B2818] w-9 h-9 rounded-full shrink-0 flex items-center justify-center text-[#F2B84B] text-xs font-semibold">NA</div>
                                <ChevronDown size={16} className="hidden sm:block text-[#1F2933]" />
                            </button>
                        </div>
                    </div>

                    {/* <DashTournaments /> */}
                    <Outlet />
                </div>
            </div>

            
            <ShowModel open={modelOpen} onClose={() => setModalOpen(false)} title="Confirm logout">
                < UserLogout onCancel={() => setModalOpen(false)} onLogout ={handleLogout}/>
            </ShowModel>
        </>
    )
}

export default CricDashboard