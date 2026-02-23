import { useState } from "react";
import AdminFarms from "./AdminFarms";
import AdminTrees from "./AdminTrees";
import type { Farm } from "../assets/utils/types";
import "../styles/admin.css";
import { GiCoffeeBeans } from "react-icons/gi";


interface DashboardProps {
  userId: number; // current admin/owner ID
  onLogout: () => void; // return to main dashboard
}

const AdminDashboard = ({ userId, onLogout }: DashboardProps) => {
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null);

  return (
    <div className="admin-container">
      {/* HEADER */}
      <header className="admin-header">
        <div className="admin-title">
          <GiCoffeeBeans className="admin-icon" />
          <div className="title-text">
              <h1>Liberica Farm Mapping</h1>
              <p>Admin Dashboard</p>
            </div>
        </div>
        <button className="btn-logout" onClick={onLogout}>
          Logout
        </button>
      </header>

      {/* MAIN CONTENT */}
      <main className="admin-main">
        {!selectedFarm ? (
          <AdminFarms
            userId={userId}
            onSelectFarm={(farm) => setSelectedFarm(farm)}
          />
        ) : (
          <AdminTrees
            farm={selectedFarm}
            onBack={() => setSelectedFarm(null)}
          />
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
