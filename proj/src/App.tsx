import { useState } from "react";
import Dashboard from "./components/Dashboard";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard"; // your admin dashboard page
import "leaflet/dist/leaflet.css";
import "./assets/utils/leafletIconFix";

const App = () => {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Public view
  if (isAdminLoggedIn) {
    return <AdminDashboard />; // admin dashboard after login
  }

  if (showAdminLogin) {
    return <AdminLogin onLogin={() => setIsAdminLoggedIn(true)} />; // show login form
  }

  return (
    <Dashboard
      onAdminLoginClick={() => setShowAdminLogin(true)} // pass click handler to dashboard
    />
  );
};

export default App;
