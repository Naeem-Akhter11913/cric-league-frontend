// // import { Navigate, Outlet, useLocation } from 'react-router-dom';
// // import { useAppSelector } from '../store/hooks';
// // import { selectIsAuthenticated, selectSessionChecked } from '../store/Slice/authSlice';

// // // Wrap protected routes with this, e.g.:
// // //   <Route element={<ProtectedRoute />}>
// // //     <Route path="/dashboard" element={<CricDashboardLayout />}>...</Route>
// // //   </Route>
// // //
// // // Waits for the app's one-time restoreSession() call to settle before
// // // deciding whether to redirect, so a page reload with a still-valid
// // // persisted session doesn't briefly bounce the user to /login.
// // export default function ProtectedRoute() {
// //   const isAuthenticated = useAppSelector(selectIsAuthenticated);
// //   const sessionChecked = useAppSelector(selectSessionChecked);
// //   const location = useLocation();

// //   if (!sessionChecked) {
// //     // brief loading state while restoreSession() is in flight on app boot
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-slate-900">
// //         <p className="text-white text-lg">Loading...</p>
// //       </div>
// //     );
// //   }

// //   if (!isAuthenticated) {
// //     // remember where they were headed so you can redirect back post-login if you want
// //     return <Navigate to="/" replace state={{ from: location }} />;
// //   }

// //   return <Outlet />;
// // }



// import { Navigate, Outlet, useLocation } from 'react-router-dom';
// import { useAppSelector } from '../store/hooks';
// import { selectIsAuthenticated, selectSessionChecked } from '../store/Slice/authSlice';


// export default function ProtectedRoute() {
//   const isAuthenticated = useAppSelector(selectIsAuthenticated);
//   const sessionChecked = useAppSelector(selectSessionChecked);
//   const location = useLocation();
//   if (isAuthenticated) {
//     return <Outlet />;
//   }

  
//   if (!sessionChecked) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-slate-900">
//         <p className="text-white text-lg">Loading...</p>
//       </div>
//     );
//   }
//   console.log("JJJJJJJJJJJJJJJJjj")
//   return <Navigate to="/" replace state={{ from: location }} />;
// }


import { memo } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import {
  selectIsAuthenticated,
  selectSessionChecked
} from '../store/Slice/authSlice';

function ProtectedRoute() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const sessionChecked = useAppSelector(selectSessionChecked);
  const location = useLocation();


  if (!sessionChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <p className="text-white text-lg">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export default memo(ProtectedRoute);