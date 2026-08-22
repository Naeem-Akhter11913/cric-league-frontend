import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Model from "../model/Modal";
import Login from "../pages/Login";
import Register from "../pages/Register";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Tournaments", path: "/tournaments" },
  { label: "Teams", path: "/teams" },
  { label: "Players", path: "/players" },
  { label: "Live Scores", path: "/liveScores" },
  { label: "Rankings", path: "/rankings" },
  { label: "Blog", path: "/blog" },
];

export default function Navbar() {
  const location = useLocation();

  const [showModal, setShowModal] = useState(false);
  const [modalPage, setModalPage] = useState("login");

  const openLogin = () => {
    setModalPage("login");
    setShowModal(true);
  };

  const openRegister = () => {
    setModalPage("register");
    setShowModal(true);
  };


  return (
    <>
      <nav className="max-w-[1280px] mx-auto flex items-center justify-between px-6 lg:px-10 py-5">
        <Link to="/" className="flex items-center gap-2.5">
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
            <circle cx="17" cy="17" r="17" fill="url(#logoGradNav)" />
            <path d="M10 24 L22 10" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
            <circle cx="23" cy="9" r="2.6" fill="white" />
            <defs>
              <linearGradient id="logoGradNav" x1="0" y1="0" x2="34" y2="34">
                <stop stopColor="#a78bfa" />
                <stop offset="1" stopColor="#7c5cfc" />
              </linearGradient>
            </defs>
          </svg>
          <div className="leading-none">
            <p className="font-display font-extrabold tracking-wide text-[1.05rem] text-[var(--color-text-onDark)]">
              CRIC LEAGUE
            </p>
            <p className="text-[0.55rem] tracking-[0.2em] text-[var(--color-text-onDark-faint)] font-semibold">
              PLAY. COMPETE. WIN.
            </p>
          </div>
        </Link>

        {/* Links */}
        <ul className="hidden lg:flex items-center gap-8 text-[var(--color-text-onDark-muted)] [font-size:var(--fs-nav)] font-medium">
          {NAV_LINKS.map(({ label, path }) => {
            const isActive = location.pathname === path;
            return (
              <li key={label} className="relative">
                <Link
                  to={path}
                  className={`cursor-pointer hover:text-white transition-colors ${isActive ? "text-[var(--color-text-onDark)]" : ""
                    }`}
                >
                  {label}
                  {isActive && (
                    <span
                      className="absolute -bottom-[18px] left-0 right-0 h-[2px] rounded-full"
                      style={{ background: "var(--color-primary)" }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Auth buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button onClick={openLogin} command="show-modal" commandfor="dialog" className="px-5 py-2 rounded-[var(--radius-sm)] border border-[var(--color-border-dark)] text-[var(--color-text-onDark)] text-sm font-semibold hover:bg-white/5 transition-colors">
            Login
          </button>
          <button onClick={openRegister} command="show-modal" commandfor="dialog" className="px-5 py-2 rounded-[var(--radius-sm)] grad-primary text-white text-sm font-semibold shadow-[0_4px_14px_rgba(124,92,252,0.4)] hover:brightness-110 transition">
            Sign Up
          </button>
        </div>
      </nav>
      {showModal && (
        <Model open={() =>setShowModal(true)} onClose={() =>setShowModal(false)} islogin >
          {modalPage === "login" ? (
            <Login setModalPage={setModalPage} />
          ) : (
            <Register setModalPage={setModalPage}/>
          )}
        </Model>
      )}
    </>
  );
}