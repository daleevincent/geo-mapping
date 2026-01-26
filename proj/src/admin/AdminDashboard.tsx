import { useEffect, useState } from "react";
import api from "../services/api";
import type { Farm } from "../assets/utils/types";

const AdminDashboard = () => {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const res = await api.get<Farm[]>("/admin/farms");
        setFarms(res.data);
      } catch (err) {
        console.error("Failed to load farms", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFarms();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  const totalTrees = farms.reduce((sum, f) => sum + f.totalTrees, 0);
  const dnaVerified = farms.reduce((sum, f) => sum + f.dnaVerifiedCount, 0);

  return (
    <div className="admin-page">
      <h2>Admin Dashboard</h2>

      <div className="admin-stats">
        <div className="card">Total Farms: {farms.length}</div>
        <div className="card">Total Trees: {totalTrees}</div>
        <div className="card">DNA Verified Trees: {dnaVerified}</div>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Farm</th>
            <th>City</th>
            <th>Barangay</th>
            <th>Total Trees</th>
            <th>DNA Verified</th>
          </tr>
        </thead>
        <tbody>
          {farms.map(farm => (
            <tr key={farm.id}>
              <td>{farm.name}</td>
              <td>{farm.cityName}</td>
              <td>{farm.barangayName}</td>
              <td>{farm.totalTrees}</td>
              <td>{farm.dnaVerifiedCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
