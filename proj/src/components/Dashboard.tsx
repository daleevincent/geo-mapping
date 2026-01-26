import { useState } from "react";
import GoogleMapView from "./GoogleMapView";
import TreeMapping from "./TreeMapping";
import FarmModal from "./FarmModal";
import { FARMS_DATA } from "../assets/utils/farmsData";
import { BATANGAS_CITIES } from "../assets/utils/batangasCities";
import { BARANGAYS } from "../assets/utils/barangays";
import type { Farm, Coordinates } from "../assets/utils/types";
import "../styles/dashboard.css";
import { GiCoffeeBeans } from "react-icons/gi";
import { FaFilter } from "react-icons/fa";
import { FiBarChart2 } from "react-icons/fi";

interface DashboardProps {
  onAdminLoginClick?: () => void;
}

const Dashboard = ({ onAdminLoginClick }: DashboardProps) => {
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null);
  const [showFarmModal, setShowFarmModal] = useState<Farm | null>(null);
  const [filters, setFilters] = useState({
    city: "",
    barangay: "",
    dnaStatus: "",
    coordinates: "",
  });

  const [mapCenter, setMapCenter] = useState<Coordinates>({
    lat: 13.9,
    lng: 121.1,
  });
  const [mapZoom, setMapZoom] = useState(10);

  /* =========================
     FILTER LOGIC (UNCHANGED)
     ========================= */
  const filteredFarms = FARMS_DATA.filter((farm) => {
    if (filters.city && farm.cityName !== filters.city) return false;
    if (filters.barangay && farm.barangayName !== filters.barangay)
      return false;
    if (filters.dnaStatus === "verified" && !farm.hasDnaVerified) return false;
    if (filters.dnaStatus === "unverified" && farm.hasDnaVerified) return false;
    if (
      filters.coordinates &&
      !`${farm.coordinates.lat},${farm.coordinates.lng}`.includes(
        filters.coordinates,
      )
    )
      return false;
    return true;
  });

  /* =========================
     STATS (UNCHANGED)
     ========================= */
  const stats = {
    totalFarms: filteredFarms.length,
    totalTrees: filteredFarms.reduce((sum, f) => sum + f.totalTrees, 0),
    dnaVerifiedTrees: filteredFarms.reduce(
      (sum, f) => sum + f.dnaVerifiedCount,
      0,
    ),
    cities: [...new Set(filteredFarms.map((f) => f.cityName))].length,
  };

  /* =========================
     HANDLERS (UNCHANGED)
     ========================= */
  const handleCityFilter = (cityName: string) => {
    setFilters({ ...filters, city: cityName, barangay: "" });

    if (!cityName) return;

    const city = BATANGAS_CITIES.find((c) => c.name === cityName);
    if (city) {
      setMapCenter(city.center || { lat: 13.9, lng: 121.1 });
      setMapZoom(12);
    }
  };

  const handleResetFilters = () => {
    setFilters({
      city: "",
      barangay: "",
      dnaStatus: "",
      coordinates: "",
    });
    setMapCenter({ lat: 13.9, lng: 121.1 });
    setMapZoom(10);
  };

  const handleFarmMarkerClick = (farm: Farm) => {
    setShowFarmModal(farm);
  };

  const handleViewTreeMapping = () => {
    if (showFarmModal) {
      setSelectedFarm(showFarmModal);
      setShowFarmModal(null);
    }
  };

  return (
    <div className="dashboard-container">
      {/* ================= HEADER ================= */}
      <header className="dashboard-header">
        <div className="dashboard-header-left">
          <div className="dashboard-title">
            <GiCoffeeBeans className="coffee-icon" />
            <div className="title-text">
              <h1>Liberica Farm Mapping</h1>
              <p>Discover Premium Coffee Farms in Batangas</p>
            </div>
          </div>
        </div>

        <button
          className="admin-login-btn"
          onClick={() => {
            // call the handler passed from App.tsx
            if (onAdminLoginClick) onAdminLoginClick();
          }}
        >
          Admin Login
        </button>
      </header>

      {/* ================= sidebar LAYOUT ================= */}
      <div className="dashboard-layout">
        {/* ========== LEFT COLUMN (STATS + FILTERS) ========== */}
        <aside className="dashboard-sidebar">
          {/* ================= STATS ================= */}
          <section className="stats-wrapper">
            <h3 className="stats-title">
              <FiBarChart2 className="stats-icon" />
              Overview Statistics
            </h3>

            <div className="stats-container">
              {[
                {
                  label: "Total Farms",
                  value: stats.totalFarms,
                  color: "#4a7c2c",
                },
                {
                  label: "Total Liberica Trees",
                  value: stats.totalTrees,
                  color: "#6b9b47",
                },
                {
                  label: "DNA Verified",
                  value: stats.dnaVerifiedTrees,
                  color: "#2196F3",
                },
                {
                  label: "Cities/Municipality Covered",
                  value: stats.cities,
                  color: "#757575",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="stat-card animate-card"
                  style={{ borderLeft: `4px solid ${stat.color}` }}
                >
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ================= FILTERS ================= */}
          <section className="filters-container">
            <div className="filters-header">
              <h3 className="filters-title">
                <FaFilter className="filter-icon" />
                Search & Filters
              </h3>
              <button className="reset-btn" onClick={handleResetFilters}>
                Reset
              </button>
            </div>

            <div className="filters-grid">
              <div className="filter-item">
                <label>City / Municipality</label>
                <select
                  value={filters.city}
                  onChange={(e) => handleCityFilter(e.target.value)}
                >
                  <option value="">All</option>
                  {BATANGAS_CITIES.map((city) => (
                    <option key={city.id} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-item">
                <label>Barangay</label>
                <select
                  value={filters.barangay}
                  disabled={!filters.city}
                  onChange={(e) =>
                    setFilters({ ...filters, barangay: e.target.value })
                  }
                >
                  <option value="">All Barangays</option>
                  {filters.city &&
                    BARANGAYS[filters.city]?.map((brgy) => (
                      <option key={brgy.id} value={brgy.name}>
                        {brgy.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="filter-item">
                <label>DNA Status</label>
                <select
                  value={filters.dnaStatus}
                  onChange={(e) =>
                    setFilters({ ...filters, dnaStatus: e.target.value })
                  }
                >
                  <option value="">All Status</option>
                  <option value="verified">DNA Verified</option>
                  <option value="unverified">Not DNA Verified</option>
                </select>
              </div>

              <div className="filter-item">
                <label>Coordinates</label>
                <input
                  type="text"
                  placeholder="13.9411, 121.1624"
                  value={filters.coordinates}
                  onChange={(e) =>
                    setFilters({ ...filters, coordinates: e.target.value })
                  }
                />
              </div>
            </div>
          </section>
        </aside>

        {/* ========== RIGHT COLUMN (MAP / TREE) ========== */}
        <main className="dashboard-map">
          {selectedFarm ? (
            <TreeMapping
              farm={selectedFarm}
              onBack={() => setSelectedFarm(null)}
            />
          ) : (
            <>
              <GoogleMapView
                farms={filteredFarms}
                center={mapCenter}
                zoom={mapZoom}
                onMarkerClick={handleFarmMarkerClick}
              />

              {showFarmModal && (
                <FarmModal
                  farm={showFarmModal}
                  onClose={() => setShowFarmModal(null)}
                  onViewTrees={handleViewTreeMapping}
                />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
