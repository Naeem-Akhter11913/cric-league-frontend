// import { Navigate, Outlet } from 'react-router-dom';
// import { useAppSelector } from '../store/hooks';
// import { selectIsAuthenticated, selectSessionChecked } from '../store/Slice/authSlice';

// export default function GuestRoute() {
//   const isAuthenticated = useAppSelector(selectIsAuthenticated);
//   const sessionChecked = useAppSelector(selectSessionChecked);
  
//   if (!sessionChecked) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-slate-900">
//         <p className="text-white text-lg">Loading...</p>
//       </div>
//     );
//   }

//   if (isAuthenticated) {
//     return <Navigate to="/dashboard" replace />;
//   }

//   return <Outlet />;
// }


import { memo } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import {
  selectIsAuthenticated,
  selectSessionChecked
} from '../store/Slice/authSlice';

function GuestRoute() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const sessionChecked = useAppSelector(selectSessionChecked);

  console.log("GuestRoute rendered");

  if (!sessionChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <p className="text-white text-lg">Loading...</p>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default memo(GuestRoute);