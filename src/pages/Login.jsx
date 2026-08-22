// // import React, { useState } from 'react'
// // import { loginUser } from '../store/action/auth.action';
// // import { useAppDispatch, useAppSelector } from '../store/hooks';
// // import { selectAuthError, selectAuthStatus } from '../store/Slice/authSlice';

// // const Login = ({ setModalPage }) => {
// //     const dispatch = useAppDispatch();
// //     const status = useAppSelector(selectAuthStatus);
// //     const error = useAppSelector(selectAuthError);
// //     const [email, setEmail] = useState("");
// //     const [password, setPassword] = useState("");
// //     const [showPassword, setShowPassword] = useState(false);

// //     const handleSubmit = (e) => {
// //         e.preventDefault();
// //         console.log({ email, password });
// //     };
// //     return (
// //         <div className="min-h-screen w-full bg-[#0a0a12] flex">
// //             <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 sm:px-16 py-12">
// //                 <a href="/" className="flex items-center gap-3 mb-16">
// //                     <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center">
// //                         <span className="text-white font-bold text-sm">/</span>
// //                     </div>
// //                     <div className="leading-tight">
// //                         <p className="text-white font-extrabold tracking-wide text-sm">CRIC LEAGUE</p>
// //                         <p className="text-gray-500 text-[10px] tracking-widest">PLAY. COMPETE. WIN.</p>
// //                     </div>
// //                 </a>

// //                 <div className="max-w-sm w-full mx-auto">
// //                     <h1 className="text-3xl font-extrabold text-white mb-2">Welcome back</h1>
// //                     <p className="text-gray-400 mb-8">Log in to check your stats and live matches.</p>

// //                     <form onSubmit={handleSubmit} className="space-y-5">
// //                         <div>
// //                             <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
// //                                 Email address
// //                             </label>
// //                             <input
// //                                 id="email"
// //                                 type="email"
// //                                 required
// //                                 value={email}
// //                                 onChange={(e) => setEmail(e.target.value)}
// //                                 placeholder="you@example.com"
// //                                 className="w-full rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 px-4 py-3 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition"
// //                             />
// //                         </div>

// //                         <div>
// //                             <div className="flex items-center justify-between mb-2">
// //                                 <label htmlFor="password" className="block text-sm font-medium text-gray-300">
// //                                     Password
// //                                 </label>
// //                                 <a href="/forgot-password" className="text-xs font-semibold text-violet-400 hover:text-violet-300">
// //                                     Forgot?
// //                                 </a>
// //                             </div>
// //                             <div className="relative">
// //                                 <input
// //                                     id="password"
// //                                     type={showPassword ? "text" : "password"}
// //                                     required
// //                                     value={password}
// //                                     onChange={(e) => setPassword(e.target.value)}
// //                                     placeholder="Enter your password"
// //                                     className="w-full rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 px-4 py-3 pr-12 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition"
// //                                 />
// //                                 <button
// //                                     type="button"
// //                                     onClick={() => setShowPassword((s) => !s)}
// //                                     className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 text-xs font-semibold"
// //                                 >
// //                                     {showPassword ? "Hide" : "Show"}
// //                                 </button>
// //                             </div>
// //                         </div>

// //                         <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer select-none">
// //                             <input type="checkbox" className="rounded border-white/20 bg-white/5 text-violet-500 focus:ring-violet-500 focus:ring-offset-0" />
// //                             Keep me signed in
// //                         </label>

// //                         <button
// //                             type="submit"
// //                             className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold py-3 transition shadow-lg shadow-violet-900/30"
// //                         >
// //                             Log in
// //                         </button>
// //                     </form>

// //                     <div className="flex items-center gap-3 my-6">
// //                         <div className="h-px flex-1 bg-white/10" />
// //                         <span className="text-xs text-gray-500">OR</span>
// //                         <div className="h-px flex-1 bg-white/10" />
// //                     </div>

// //                     <button className="w-full flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium py-3 transition">
// //                         <svg width="18" height="18" viewBox="0 0 24 24">
// //                             <path fill="#4285F4" d="M23.5 12.3c0-.85-.08-1.67-.22-2.45H12v4.63h6.46c-.28 1.5-1.13 2.77-2.4 3.62v3h3.87c2.27-2.09 3.57-5.17 3.57-8.8z" />
// //                             <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.87-3c-1.08.72-2.45 1.15-4.08 1.15-3.14 0-5.8-2.12-6.75-4.96H1.25v3.1C3.23 21.3 7.3 24 12 24z" />
// //                             <path fill="#FBBC05" d="M5.25 14.29A7.2 7.2 0 0 1 4.88 12c0-.8.14-1.57.37-2.29v-3.1H1.25A11.98 11.98 0 0 0 0 12c0 1.93.46 3.76 1.25 5.39l4-3.1z" />
// //                             <path fill="#EA4335" d="M12 4.75c1.76 0 3.34.6 4.58 1.79l3.44-3.44C17.95 1.19 15.23 0 12 0 7.3 0 3.23 2.7 1.25 6.61l4 3.1C6.2 6.87 8.86 4.75 12 4.75z" />
// //                         </svg>
// //                         Continue with Google
// //                     </button>

// //                     <p className="text-center text-sm text-gray-400 mt-8">
// //                         New to Cric League?{" "}
// //                         <span onClick={() => setModalPage("register")} className="text-violet-400 font-semibold hover:text-violet-300 cursor-pointer">
// //                             Create an account
// //                         </span>
// //                     </p>
// //                 </div>
// //             </div>

// //             {/* Right: branded panel */}
// //             <div className="hidden lg:flex w-[55%] relative overflow-hidden bg-gradient-to-br from-[#14102b] via-[#1a1030] to-[#0a0a12] items-center justify-center p-12">
// //                 <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-violet-600/20 blur-3xl" />
// //                 <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-purple-600/10 blur-3xl" />

// //                 <div className="relative z-10 max-w-md">
// //                     <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
// //                         Every match makes you <span className="text-violet-400">a hero</span>.
// //                     </h2>
// //                     <p className="text-gray-400 mb-10">
// //                         Track live scores, detailed stats and tournaments — all in one place.
// //                     </p>

// //                     <div className="rounded-2xl bg-black/40 border border-white/10 backdrop-blur p-5">
// //                         <div className="flex items-center gap-2 mb-4">
// //                             <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
// //                             <span className="text-red-400 text-xs font-bold tracking-wide">LIVE MATCH</span>
// //                         </div>
// //                         <p className="text-gray-400 text-xs mb-4">Naeem Premier League</p>

// //                         <div className="flex items-center justify-between mb-3">
// //                             <div className="flex items-center gap-3">
// //                                 <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-white text-xs font-bold">RW</div>
// //                                 <span className="text-white font-semibold text-sm">Royal Warriors</span>
// //                             </div>
// //                             <div className="text-right">
// //                                 <p className="text-white font-bold">128/4</p>
// //                                 <p className="text-gray-500 text-[11px]">15.3 Overs</p>
// //                             </div>
// //                         </div>

// //                         <div className="flex items-center justify-between mb-4">
// //                             <div className="flex items-center gap-3">
// //                                 <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">TB</div>
// //                                 <span className="text-white font-semibold text-sm">Thunder Bolts</span>
// //                             </div>
// //                             <div className="text-right">
// //                                 <p className="text-white font-bold">125/8</p>
// //                                 <p className="text-gray-500 text-[11px]">20 Overs</p>
// //                             </div>
// //                         </div>

// //                         <p className="text-xs text-gray-400 border-t border-white/10 pt-3">
// //                             Royal Warriors need <span className="text-white font-semibold">43 runs</span> in{" "}
// //                             <span className="text-white font-semibold">27 balls</span>
// //                         </p>
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     )
// // }

// // export default Login



// import React, { useState } from 'react'
// import { loginUser } from '../store/action/auth.action';
// import { useAppDispatch, useAppSelector } from '../store/hooks';
// import { selectAuthError, selectAuthStatus } from '../store/Slice/authSlice';
// import { useNavigate } from 'react-router-dom';

// // Simple, dependency-free validation. Swap for yup/zod if the form grows.
// const validate = ({ email, password }) => {
//     const errors = {};
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!email.trim()) errors.email = 'Email is required';
//     else if (!emailRegex.test(email)) errors.email = 'Enter a valid email address';
//     if (!password) errors.password = 'Password is required';
//     else if (password.length < 6) errors.password = 'Password must be at least 6 characters';
//     return errors;
// };

// const Login = ({ setModalPage }) => {
//     const dispatch = useAppDispatch();
//     const navigate = useNavigate();
//     const status = useAppSelector(selectAuthStatus);
//     const error = useAppSelector(selectAuthError);
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [showPassword, setShowPassword] = useState(false);
//     const [fieldErrors, setFieldErrors] = useState({});

//     const isLoading = status === 'loading';

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const errors = validate({ email, password });
//         setFieldErrors(errors);
//         if (Object.keys(errors).length > 0) return;

//         try {
//             await dispatch(loginUser({ email, password })).unwrap();
//             // if (onClose) onClose();          // close the login modal, if this is rendered as one
//             navigate('/dashboard');
//         } catch (err) {
//             console.error('Login failed:', err);
//         }
//     };

//     return (
//         <div className="min-h-screen w-full bg-[#0a0a12] flex">
//             <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 sm:px-16 py-12">
//                 <a href="/" className="flex items-center gap-3 mb-16">
//                     <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center">
//                         <span className="text-white font-bold text-sm">/</span>
//                     </div>
//                     <div className="leading-tight">
//                         <p className="text-white font-extrabold tracking-wide text-sm">CRIC LEAGUE</p>
//                         <p className="text-gray-500 text-[10px] tracking-widest">PLAY. COMPETE. WIN.</p>
//                     </div>
//                 </a>

//                 <div className="max-w-sm w-full mx-auto">
//                     <h1 className="text-3xl font-extrabold text-white mb-2">Welcome back</h1>
//                     <p className="text-gray-400 mb-8">Log in to check your stats and live matches.</p>

//                     {error && (
//                         <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
//                             {error}
//                         </div>
//                     )}

//                     <form onSubmit={handleSubmit} noValidate className="space-y-5">
//                         <div>
//                             <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
//                                 Email address
//                             </label>
//                             <input
//                                 id="email"
//                                 type="email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 placeholder="you@example.com"
//                                 className={`w-full rounded-xl bg-white/5 border text-white placeholder-gray-500 px-4 py-3 outline-none focus:ring-1 transition ${fieldErrors.email
//                                         ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
//                                         : 'border-white/10 focus:border-violet-500 focus:ring-violet-500'
//                                     }`}
//                             />
//                             {fieldErrors.email && (
//                                 <p className="text-red-400 text-xs mt-1.5">{fieldErrors.email}</p>
//                             )}
//                         </div>

//                         <div>
//                             <div className="flex items-center justify-between mb-2">
//                                 <label htmlFor="password" className="block text-sm font-medium text-gray-300">
//                                     Password
//                                 </label>
//                                 <a href="/forgot-password" className="text-xs font-semibold text-violet-400 hover:text-violet-300">
//                                     Forgot?
//                                 </a>
//                             </div>
//                             <div className="relative">
//                                 <input
//                                     id="password"
//                                     type={showPassword ? "text" : "password"}
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                     placeholder="Enter your password"
//                                     className={`w-full rounded-xl bg-white/5 border text-white placeholder-gray-500 px-4 py-3 pr-12 outline-none focus:ring-1 transition ${fieldErrors.password
//                                             ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
//                                             : 'border-white/10 focus:border-violet-500 focus:ring-violet-500'
//                                         }`}
//                                 />
//                                 <button
//                                     type="button"
//                                     onClick={() => setShowPassword((s) => !s)}
//                                     className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 text-xs font-semibold"
//                                 >
//                                     {showPassword ? "Hide" : "Show"}
//                                 </button>
//                             </div>
//                             {fieldErrors.password && (
//                                 <p className="text-red-400 text-xs mt-1.5">{fieldErrors.password}</p>
//                             )}
//                         </div>

//                         <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer select-none">
//                             <input type="checkbox" className="rounded border-white/20 bg-white/5 text-violet-500 focus:ring-violet-500 focus:ring-offset-0" />
//                             Keep me signed in
//                         </label>

//                         <button
//                             type="submit"
//                             disabled={isLoading}
//                             className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 transition shadow-lg shadow-violet-900/30"
//                         >
//                             {isLoading ? 'Logging in...' : 'Log in'}
//                         </button>
//                     </form>

//                     <div className="flex items-center gap-3 my-6">
//                         <div className="h-px flex-1 bg-white/10" />
//                         <span className="text-xs text-gray-500">OR</span>
//                         <div className="h-px flex-1 bg-white/10" />
//                     </div>

//                     <button className="w-full flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium py-3 transition">
//                         <svg width="18" height="18" viewBox="0 0 24 24">
//                             <path fill="#4285F4" d="M23.5 12.3c0-.85-.08-1.67-.22-2.45H12v4.63h6.46c-.28 1.5-1.13 2.77-2.4 3.62v3h3.87c2.27-2.09 3.57-5.17 3.57-8.8z" />
//                             <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.87-3c-1.08.72-2.45 1.15-4.08 1.15-3.14 0-5.8-2.12-6.75-4.96H1.25v3.1C3.23 21.3 7.3 24 12 24z" />
//                             <path fill="#FBBC05" d="M5.25 14.29A7.2 7.2 0 0 1 4.88 12c0-.8.14-1.57.37-2.29v-3.1H1.25A11.98 11.98 0 0 0 0 12c0 1.93.46 3.76 1.25 5.39l4-3.1z" />
//                             <path fill="#EA4335" d="M12 4.75c1.76 0 3.34.6 4.58 1.79l3.44-3.44C17.95 1.19 15.23 0 12 0 7.3 0 3.23 2.7 1.25 6.61l4 3.1C6.2 6.87 8.86 4.75 12 4.75z" />
//                         </svg>
//                         Continue with Google
//                     </button>

//                     <p className="text-center text-sm text-gray-400 mt-8">
//                         New to Cric League?{" "}
//                         <span onClick={() => setModalPage("register")} className="text-violet-400 font-semibold hover:text-violet-300 cursor-pointer">
//                             Create an account
//                         </span>
//                     </p>
//                 </div>
//             </div>

//             {/* Right: branded panel — unchanged */}
//             <div className="hidden lg:flex w-[55%] relative overflow-hidden bg-gradient-to-br from-[#14102b] via-[#1a1030] to-[#0a0a12] items-center justify-center p-12">
//                 <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-violet-600/20 blur-3xl" />
//                 <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-purple-600/10 blur-3xl" />
//                 <div className="relative z-10 max-w-md">
//                     <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
//                         Every match makes you <span className="text-violet-400">a hero</span>.
//                     </h2>
//                     <p className="text-gray-400 mb-10">
//                         Track live scores, detailed stats and tournaments — all in one place.
//                     </p>
//                     <div className="rounded-2xl bg-black/40 border border-white/10 backdrop-blur p-5">
//                         <div className="flex items-center gap-2 mb-4">
//                             <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
//                             <span className="text-red-400 text-xs font-bold tracking-wide">LIVE MATCH</span>
//                         </div>
//                         <p className="text-gray-400 text-xs mb-4">Naeem Premier League</p>
//                         <div className="flex items-center justify-between mb-3">
//                             <div className="flex items-center gap-3">
//                                 <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-white text-xs font-bold">RW</div>
//                                 <span className="text-white font-semibold text-sm">Royal Warriors</span>
//                             </div>
//                             <div className="text-right">
//                                 <p className="text-white font-bold">128/4</p>
//                                 <p className="text-gray-500 text-[11px]">15.3 Overs</p>
//                             </div>
//                         </div>
//                         <div className="flex items-center justify-between mb-4">
//                             <div className="flex items-center gap-3">
//                                 <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">TB</div>
//                                 <span className="text-white font-semibold text-sm">Thunder Bolts</span>
//                             </div>
//                             <div className="text-right">
//                                 <p className="text-white font-bold">125/8</p>
//                                 <p className="text-gray-500 text-[11px]">20 Overs</p>
//                             </div>
//                         </div>
//                         <p className="text-xs text-gray-400 border-t border-white/10 pt-3">
//                             Royal Warriors need <span className="text-white font-semibold">43 runs</span> in{" "}
//                             <span className="text-white font-semibold">27 balls</span>
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Login



import React, { useState } from 'react'
import { loginUser } from '../store/action/auth.action';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectAuthError, selectAuthStatus } from '../store/Slice/authSlice';
import { useNavigate } from 'react-router-dom';

// Simple, dependency-free validation. Swap for yup/zod if the form grows.
const validate = ({ email, password }) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) errors.email = 'Email is required';
    else if (!emailRegex.test(email)) errors.email = 'Enter a valid email address';
    if (!password) errors.password = 'Password is required';
    else if (password.length < 6) errors.password = 'Password must be at least 6 characters';
    return errors;
};

const Login = ({ setModalPage }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const status = useAppSelector(selectAuthStatus);
    const error = useAppSelector(selectAuthError);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});

    const isLoading = status === 'loading';

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = validate({ email, password });
        setFieldErrors(errors);
        if (Object.keys(errors).length > 0) return;

        try {
            await dispatch(loginUser({ email, password })).unwrap();
            // if (onClose) onClose();          // close the login modal, if this is rendered as one
            navigate('/dashboard');
        } catch (err) {
            console.error('Login failed:', err);
        }
    };

    return (
        <div className="h-full w-full max-h-[700px] bg-[#0a0a12] flex rounded-2xl overflow-hidden">
            <div className="w-full lg:w-[45%] flex flex-col justify-center px-6 sm:px-10 py-6 overflow-y-auto">
                <a href="/" className="flex items-center gap-3 mb-6">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">/</span>
                    </div>
                    <div className="leading-tight">
                        <p className="text-white font-extrabold tracking-wide text-sm">CRIC LEAGUE</p>
                        <p className="text-gray-500 text-[10px] tracking-widest">PLAY. COMPETE. WIN.</p>
                    </div>
                </a>

                <div className="max-w-sm w-full mx-auto">
                    <h1 className="text-3xl font-extrabold text-white mb-2">Welcome back</h1>
                    <p className="text-gray-400 mb-5">Log in to check your stats and live matches.</p>

                    {error && (
                        <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} noValidate className="space-y-3">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className={`w-full rounded-xl bg-white/5 border text-white placeholder-gray-500 px-4 py-2.5 outline-none focus:ring-1 transition ${fieldErrors.email
                                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                        : 'border-white/10 focus:border-violet-500 focus:ring-violet-500'
                                    }`}
                            />
                            {fieldErrors.email && (
                                <p className="text-red-400 text-xs mt-1.5">{fieldErrors.email}</p>
                            )}
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                                    Password
                                </label>
                                <a href="/forgot-password" className="text-xs font-semibold text-violet-400 hover:text-violet-300">
                                    Forgot?
                                </a>
                            </div>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className={`w-full rounded-xl bg-white/5 border text-white placeholder-gray-500 px-4 py-2.5 pr-12 outline-none focus:ring-1 transition ${fieldErrors.password
                                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                            : 'border-white/10 focus:border-violet-500 focus:ring-violet-500'
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((s) => !s)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 text-xs font-semibold"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                            {fieldErrors.password && (
                                <p className="text-red-400 text-xs mt-1.5">{fieldErrors.password}</p>
                            )}
                        </div>

                        <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer select-none">
                            <input type="checkbox" className="rounded border-white/20 bg-white/5 text-violet-500 focus:ring-violet-500 focus:ring-offset-0" />
                            Keep me signed in
                        </label>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2.5 transition shadow-lg shadow-violet-900/30"
                        >
                            {isLoading ? 'Logging in...' : 'Log in'}
                        </button>
                    </form>

                    <div className="flex items-center gap-3 my-4">
                        <div className="h-px flex-1 bg-white/10" />
                        <span className="text-xs text-gray-500">OR</span>
                        <div className="h-px flex-1 bg-white/10" />
                    </div>

                    <button className="w-full flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium py-2.5 transition">
                        <svg width="18" height="18" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M23.5 12.3c0-.85-.08-1.67-.22-2.45H12v4.63h6.46c-.28 1.5-1.13 2.77-2.4 3.62v3h3.87c2.27-2.09 3.57-5.17 3.57-8.8z" />
                            <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.87-3c-1.08.72-2.45 1.15-4.08 1.15-3.14 0-5.8-2.12-6.75-4.96H1.25v3.1C3.23 21.3 7.3 24 12 24z" />
                            <path fill="#FBBC05" d="M5.25 14.29A7.2 7.2 0 0 1 4.88 12c0-.8.14-1.57.37-2.29v-3.1H1.25A11.98 11.98 0 0 0 0 12c0 1.93.46 3.76 1.25 5.39l4-3.1z" />
                            <path fill="#EA4335" d="M12 4.75c1.76 0 3.34.6 4.58 1.79l3.44-3.44C17.95 1.19 15.23 0 12 0 7.3 0 3.23 2.7 1.25 6.61l4 3.1C6.2 6.87 8.86 4.75 12 4.75z" />
                        </svg>
                        Continue with Google
                    </button>

                    <p className="text-center text-sm text-gray-400 mt-6">
                        New to Cric League?{" "}
                        <span onClick={() => setModalPage("register")} className="text-violet-400 font-semibold hover:text-violet-300 cursor-pointer">
                            Create an account
                        </span>
                    </p>
                </div>
            </div>

            {/* Right: branded panel */}
            <div className="hidden lg:flex w-[55%] relative overflow-hidden bg-gradient-to-br from-[#14102b] via-[#1a1030] to-[#0a0a12] items-center justify-center p-6">
                <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-violet-600/20 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-purple-600/10 blur-3xl" />
                <div className="relative z-10 max-w-md">
                    <h2 className="text-4xl font-extrabold text-white leading-tight mb-3">
                        Every match makes you <span className="text-violet-400">a hero</span>.
                    </h2>
                    <p className="text-gray-400 mb-6">
                        Track live scores, detailed stats and tournaments — all in one place.
                    </p>
                    <div className="rounded-2xl bg-black/40 border border-white/10 backdrop-blur p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            <span className="text-red-400 text-xs font-bold tracking-wide">LIVE MATCH</span>
                        </div>
                        <p className="text-gray-400 text-xs mb-3">Naeem Premier League</p>
                        <div className="flex items-center justify-between mb-2.5">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-white text-xs font-bold">RW</div>
                                <span className="text-white font-semibold text-sm">Royal Warriors</span>
                            </div>
                            <div className="text-right">
                                <p className="text-white font-bold">128/4</p>
                                <p className="text-gray-500 text-[11px]">15.3 Overs</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">TB</div>
                                <span className="text-white font-semibold text-sm">Thunder Bolts</span>
                            </div>
                            <div className="text-right">
                                <p className="text-white font-bold">125/8</p>
                                <p className="text-gray-500 text-[11px]">20 Overs</p>
                            </div>
                        </div>
                        <p className="text-xs text-gray-400 border-t border-white/10 pt-3">
                            Royal Warriors need <span className="text-white font-semibold">43 runs</span> in{" "}
                            <span className="text-white font-semibold">27 balls</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login