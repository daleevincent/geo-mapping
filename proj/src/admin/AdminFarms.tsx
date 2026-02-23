import type { Farm } from "../assets/utils/types";
import "../styles/admin.css";

interface AdminFarmsProps {
  userId: number;
  onSelectFarm: (farm: Farm) => void;
}

const AdminFarms = ({ userId, onSelectFarm }: AdminFarmsProps) => {
  // Placeholder farm list for this admin
  const userFarms: Farm[] = [
    {
      id: 2, 
      owner_id: userId, 
      name: "Katy's Farm", 
      cityId: 41014070, 
      cityName: "Lipa City", 
      barangayName: "Tangob", 
      coordinates: { lat: 13.928827, lng: 121.199448 }, 
      totalTrees: 624, 
      dnaVerifiedCount: 3, 
      hasDnaVerified: true, 
      boundary: [ 
        [13.929214301107653, 121.20034446066478],
        [13.928979385075202, 121.19962510897223],
        [13.927738989230706, 121.20003232871031], 
        [13.92798880037607, 121.20081003643072],
      ],
    },
  ];

  return (
    <div className="admin-farms">
      <h2>Your Farms</h2>
      <div className="farm-list">
        {userFarms.map((farm) => (
          <div
            key={farm.id}
            className="farm-card"
            onClick={() => onSelectFarm(farm)}
          >
            <h3>{farm.name}</h3>
            <p>{farm.cityName} - {farm.barangayName}</p>
            <p>Total Trees: {farm.totalTrees}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminFarms;
