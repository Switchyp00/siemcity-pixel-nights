import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { CitizenProvider, useCitizen } from "./state/CitizenContext";
import AppShell from "./components/AppShell";
import Onboarding from "./screens/Onboarding";
import HomeScreen from "./screens/HomeScreen";
import { CityScreen, MissionsScreen, ProfileScreen, SocialScreen } from "./screens/TabScreens";

function RequireCitizen() {
  const { citizen, loading } = useCitizen();
  if (loading) return <p className="p-6 font-mono text-xs neon-text">CONNECTING…</p>;
  return citizen ? <Outlet /> : <Navigate to="/app" replace />;
}

export default function WorldApp() {
  return (
    <CitizenProvider>
      <Routes>
        <Route index element={<Onboarding />} />
        <Route element={<RequireCitizen />}>
          <Route element={<AppShell />}>
            <Route path="home" element={<HomeScreen />} />
            <Route path="city" element={<CityScreen />} />
            <Route path="social" element={<SocialScreen />} />
            <Route path="missions" element={<MissionsScreen />} />
            <Route path="profile" element={<ProfileScreen />} />
          </Route>
        </Route>
      </Routes>
    </CitizenProvider>
  );
}
