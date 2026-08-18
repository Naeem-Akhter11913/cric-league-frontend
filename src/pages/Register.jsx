import React, { useState } from 'react'

const Register = ({setModalPage}) => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        agree: false,
    });

    const update = (key) => (e) =>
        setForm((f) => ({ ...f, [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        // TODO: wire up to your auth API
        console.log(form);
    };
    return (
        <div className="min-h-screen w-full bg-[#0a0a12] flex p-0">
            {/* Left: branded panel */}
            <div className="hidden lg:flex w-[50%] relative overflow-hidden bg-gradient-to-br from-[#14102b] via-[#1a1030] to-[#0a0a12] items-center justify-center p-12">
                <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-violet-600/20 blur-3xl" />
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-purple-600/10 blur-3xl" />

                <div className="relative z-10 max-w-md">
                    <a href="/" className="flex items-center gap-3 mb-12">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center">
                            <span className="text-white font-bold text-sm">/</span>
                        </div>
                        <div className="leading-tight">
                            <p className="text-white font-extrabold tracking-wide text-sm">CRIC LEAGUE</p>
                            <p className="text-gray-500 text-[10px] tracking-widest">PLAY. COMPETE. WIN.</p>
                        </div>
                    </a>

                    <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
                        Join thousands making their cricketing journey <span className="text-violet-400">legendary</span>.
                    </h2>
                    <p className="text-gray-400 mb-10">
                        Free to join. Track stats, join tournaments, and compete with local teams.
                    </p>

                    <div className="grid grid-cols-3 gap-4">
                        {[
                            { label: "Players", value: "10,000+" },
                            { label: "Teams", value: "1,500+" },
                            { label: "Tournaments", value: "500+" },
                        ].map((stat) => (
                            <div key={stat.label} className="rounded-2xl bg-black/40 border border-white/10 backdrop-blur px-4 py-5 text-center">
                                <p className="text-white font-extrabold text-lg">{stat.value}</p>
                                <p className="text-gray-500 text-xs mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right: form */}
            <div className="w-full lg:w-[50%] flex flex-col justify-center px-8 sm:px-16 py-12">
                <div className="max-w-sm w-full mx-auto">
                    <h1 className="text-3xl font-extrabold text-white mb-2">Create your account</h1>
                    <p className="text-gray-400 mb-8">It's free — get started in under a minute.</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                Full name
                            </label>
                            <input
                                id="name"
                                type="text"
                                required
                                value={form.name}
                                onChange={update("name")}
                                placeholder="Your name"
                                className="w-full rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 px-4 py-3 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={form.email}
                                onChange={update("email")}
                                placeholder="you@example.com"
                                className="w-full rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 px-4 py-3 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    minLength={8}
                                    value={form.password}
                                    onChange={update("password")}
                                    placeholder="Min 8 characters"
                                    className="w-full rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 px-4 py-3 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition"
                                />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                                    Confirm
                                </label>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    required
                                    value={form.confirmPassword}
                                    onChange={update("confirmPassword")}
                                    placeholder="Repeat password"
                                    className="w-full rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 px-4 py-3 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition"
                                />
                            </div>
                        </div>

                        <label className="flex items-start gap-2 text-sm text-gray-400 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                required
                                checked={form.agree}
                                onChange={update("agree")}
                                className="mt-0.5 rounded border-white/20 bg-white/5 text-violet-500 focus:ring-violet-500 focus:ring-offset-0"
                            />
                            I agree to the{" "}
                            <a href="/terms" className="text-violet-400 hover:text-violet-300">
                                Terms of Service
                            </a>{" "}
                            and{" "}
                            <a href="/privacy" className="text-violet-400 hover:text-violet-300">
                                Privacy Policy
                            </a>
                        </label>

                        <button
                            type="submit"
                            className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold py-3 transition shadow-lg shadow-violet-900/30"
                        >
                            Create account
                        </button>
                    </form>

                    <div className="flex items-center gap-3 my-6">
                        <div className="h-px flex-1 bg-white/10" />
                        <span className="text-xs text-gray-500">OR</span>
                        <div className="h-px flex-1 bg-white/10" />
                    </div>

                    <button className="w-full flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium py-3 transition">
                        <svg width="18" height="18" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M23.5 12.3c0-.85-.08-1.67-.22-2.45H12v4.63h6.46c-.28 1.5-1.13 2.77-2.4 3.62v3h3.87c2.27-2.09 3.57-5.17 3.57-8.8z" />
                            <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.87-3c-1.08.72-2.45 1.15-4.08 1.15-3.14 0-5.8-2.12-6.75-4.96H1.25v3.1C3.23 21.3 7.3 24 12 24z" />
                            <path fill="#FBBC05" d="M5.25 14.29A7.2 7.2 0 0 1 4.88 12c0-.8.14-1.57.37-2.29v-3.1H1.25A11.98 11.98 0 0 0 0 12c0 1.93.46 3.76 1.25 5.39l4-3.1z" />
                            <path fill="#EA4335" d="M12 4.75c1.76 0 3.34.6 4.58 1.79l3.44-3.44C17.95 1.19 15.23 0 12 0 7.3 0 3.23 2.7 1.25 6.61l4 3.1C6.2 6.87 8.86 4.75 12 4.75z" />
                        </svg>
                        Continue with Google
                    </button>

                    <p className="text-center text-sm text-gray-400 mt-8">
                        Already have an account?{" "}
                        <span onClick={() => {setModalPage("login")}} className="text-violet-400 font-semibold hover:text-violet-300 cursor-pointer">
                            Log in
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register;