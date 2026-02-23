import { useState } from "react";
import Dashboard from "./components/Dashboard";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import "leaflet/dist/leaflet.css";
import "./assets/utils/leafletIconFix";

const App = () => {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // ✅ ADMIN DASHBOARD
  if (isAdminLoggedIn) {
    return (
      <AdminDashboard
        userId={0} // later replace with real admin/user id
        onLogout={() => {
          setIsAdminLoggedIn(false); // 👈 return to public dashboard
          setShowAdminLogin(false);  // 👈 optional: reset login screen
        }}
      />
    );
  }

  // ✅ ADMIN LOGIN
  if (showAdminLogin) {
    return (
      <AdminLogin
        onLogin={() => {
          setIsAdminLoggedIn(true);
          setShowAdminLogin(false);
        }}
      />
    );
  }

  // ✅ PUBLIC DASHBOARD
  return (
    <Dashboard
      onAdminLoginClick={() => setShowAdminLogin(true)}
    />
  );
};

export default App;