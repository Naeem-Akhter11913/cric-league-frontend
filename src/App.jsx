import { lazy, Suspense, useEffect } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { useAppDispatch } from './store/hooks'
import { restoreSession } from './store/action/auth.action'

import ProtectedRoute from './routes/ProtectedRoute'
import GuestRoute from './routes/GuestRoute'

const Landing = lazy(() => import('./pages/Landing'));
const Navbar = lazy(() => import('./components/Navbar'));
const Tournaments = lazy(() => import('./pages/Tournaments'));
const TeamsPage = lazy(() => import('./pages/TeamsPage'));
const Players = lazy(() => import('./pages/Players'));
const LiveScores = lazy(() => import('./pages/LiveScores'));
const Rankings = lazy(() => import('./pages/Rankings'));
const Blog = lazy(() => import('./pages/Blog'));
const CricDashboardLayout = lazy(() => import('./pages/CricDashboardLayout'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const OrgTeams = lazy(() => import('./pages/OrgTeams'));
const OrgPlayers = lazy(() => import('./pages/OrgPlayers'));
const Matches = lazy(() => import('./pages/Matches'));
const OrgLiveScores = lazy(() => import('./pages/OrgLiveScores'));
const OrgPointsTable = lazy(() => import('./pages/OrgPointsTable'));
const OrgStatistics = lazy(() => import('./pages/OrgStatistics'));
const OrgNotifications = lazy(() => import('./pages/OrgNotifications'));
const OrgSettings = lazy(() => import('./pages/OrgSettings'));
const OrgScorer = lazy(() => import('./pages/OrgScorer'));
const OrgTournaments = lazy(() => import('./pages/OrgTournaments'));
const OrgVenues = lazy(() => import('./pages/OrgVenues'));

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <p className="text-white text-lg">Loading...</p>
      </div>
    }>
      <Routes>

        {/* <Route element={<GuestRoute />}> */}
          <Route path="/" element={<Landing />} />
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/players" element={<Players />} />
          <Route path="/liveScores" element={<LiveScores />} />
          <Route path="/rankings" element={<Rankings />} />
          <Route path="/blog" element={<Blog />} />
        {/* </Route> */}

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<CricDashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="tournaments" element={<OrgTournaments />} />
            <Route path="teams" element={<OrgTeams />} />
            <Route path="players" element={<OrgPlayers />} />
            <Route path="matches" element={<Matches />} />
            <Route path="live-scores" element={<OrgLiveScores />} />
            <Route path="points-table" element={<OrgPointsTable />} />
            <Route path="statistics" element={<OrgStatistics />} />
            <Route path="venues" element={<OrgVenues />} />
            <Route path="scorers" element={<OrgScorer />} />
            <Route path="notifications" element={<OrgNotifications />} />
            <Route path="settings" element={<OrgSettings />} />
          </Route>
        </Route>

        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center bg-slate-900">
              <h1 className="text-5xl font-bold text-white">
                Page is not Found
              </h1>
            </div>
          }
        />
      </Routes>
    </Suspense>
  )
}

export default App;