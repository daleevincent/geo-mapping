import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polygon,
  CircleMarker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Farm, TreeData } from "../assets/utils/types";
import "../styles/admin.css";
import { TREES_DATA } from "../assets/utils/treesData";

interface AdminTreesProps {
  farm: Farm;
  onBack: () => void;
}

// ---------- Geometry Helper ----------
const isPointInPolygon = (
  point: [number, number],
  polygon: [number, number][],
) => {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i][1],
      yi = polygon[i][0];
    const xj = polygon[j][1],
      yj = polygon[j][0];

    const intersect =
      yi > point[0] !== yj > point[0] &&
      point[1] < ((xj - xi) * (point[0] - yi)) / (yj - yi) + xi;

    if (intersect) inside = !inside;
  }
  return inside;
};

const AdminTrees = ({ farm, onBack }: AdminTreesProps) => {
  const [trees, setTrees] = useState<TreeData[]>(
    TREES_DATA.filter((t) => t.farmId === farm.id),
  );

  const addTree = () => {
    const lat = parseFloat(prompt("Enter latitude") || "0");
    const lng = parseFloat(prompt("Enter longitude") || "0");

    if (!lat || !lng) return;

    if (!isPointInPolygon([lat, lng], farm.boundary)) {
      alert("Coordinates are outside the farm boundary!");
      return;
    }

    // Prompt the user to choose DNA status
    const dnaInput = prompt(
      "Is DNA verified? Enter 'yes' or 'no'",
    )?.toLowerCase();
    const dnaVerified = dnaInput === "yes";

    const newTree: TreeData = {
      id: trees.length > 0 ? Math.max(...trees.map((t) => t.id)) + 1 : 1,
      farmId: farm.id,
      lat,
      lng,
      dnaVerified,
    };

    setTrees([...trees, newTree]);
  };

  const deleteTree = (id: number) => {
    setTrees((prev) => prev.filter((tree) => tree.id !== id));
  };

  return (
    <div className="admin-trees-wrapper">
      <div className="admin-trees-header">
        <button className="btn-back" onClick={onBack}>
          ← Back
        </button>
        <h2>{farm.name} – Tree Management</h2>
        <button className="btn-add" onClick={addTree}>
          Add Tree
        </button>
      </div>

      <div className="admin-trees-content">
        {/* Left: Map */}
        <div className="admin-trees-map">
          {farm.boundary.length > 0 && (
            <MapContainer
              bounds={farm.boundary as [number, number][]} // auto-fit boundary
              className="admin-tree-map"
              scrollWheelZoom
            >
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {/* Farm boundary */}
              <Polygon
                positions={farm.boundary}
                pathOptions={{ color: "#ff0000" }}
              />
              {/* Trees */}
              {trees.map((tree) => (
                <CircleMarker
                  key={tree.id}
                  center={[tree.lat, tree.lng]}
                  radius={5}
                  pathOptions={{
                    color: tree.dnaVerified ? "#1565c0" : "#2e7d32",
                    fillOpacity: 0.9,
                  }}
                >
                  <Popup>
                    <strong>Tree #{tree.id}</strong>
                    <br />
                    DNA Verified: {tree.dnaVerified ? "Yes" : "No"}
                    <br />
                    Lat: {tree.lat.toFixed(6)}, Lng: {tree.lng.toFixed(6)}
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          )}
        </div>

        {/* Right: Table */}
        <div className="admin-trees-table-wrapper">
          <table className="admin-tree-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>DNA Verified</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {trees.map((tree) => (
                <tr key={tree.id}>
                  <td>{tree.id}</td>
                  <td>{tree.lat}</td>
                  <td>{tree.lng}</td>
                  <td>{tree.dnaVerified ? "Yes" : "No"}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={tree.dnaVerified}
                      onChange={(e) =>
                        setTrees((prev) =>
                          prev.map((t) =>
                            t.id === tree.id
                              ? { ...t, dnaVerified: e.target.checked }
                              : t,
                          ),
                        )
                      }
                    />
                    <button onClick={() => deleteTree(tree.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminTrees;
