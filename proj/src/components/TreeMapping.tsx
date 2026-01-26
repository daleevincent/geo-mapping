import { MapContainer, TileLayer, Polygon, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/treeMapping.css";
import { TREES_DATA } from "../assets/utils/treesData";



interface TreeMappingProps {
  farm: {
    id: number;
    name: string;
    boundary: [number, number][];
  };
  onBack: () => void;
}

/* ---------- Geometry Helpers ---------- */
const isPointInPolygon = (
  point: [number, number],
  polygon: [number, number][]
) => {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i][1], yi = polygon[i][0];
    const xj = polygon[j][1], yj = polygon[j][0];

    const intersect =
      yi > point[0] !== yj > point[0] &&
      point[1] < ((xj - xi) * (point[0] - yi)) / (yj - yi) + xi;

    if (intersect) inside = !inside;
  }
  return inside;
};


/* ---------- Component ---------- */
const TreeMapping = ({ farm, onBack }: TreeMappingProps) => {

  const trees = TREES_DATA.filter(tree =>
  tree.farmId === farm.id &&
  isPointInPolygon([tree.lat, tree.lng], farm.boundary)
);

  return (
    <div className="tree-map-wrapper">
      <button className="btn-back" onClick={onBack}>← Back</button>
      <h3>Tree Mapping – {farm.name}</h3>

      <MapContainer
        bounds={farm.boundary}
        className="tree-map"
        scrollWheelZoom
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Farm Boundary */}
        <Polygon positions={farm.boundary} pathOptions={{ color: "#ff0000" }} />

        {/* Trees */}
        {trees.map(tree => (
  <CircleMarker
    key={tree.id}
    center={[tree.lat, tree.lng]}
    radius={4}
    pathOptions={{
      color: tree.dnaVerified ? "#1565c0" : "#2e7d32",
      fillOpacity: 0.9
    }}
  >
    <Popup>
      <strong>Tree #{tree.id}</strong><br />
      DNA Verified: {tree.dnaVerified ? "Yes" : "No"}
    </Popup>
  </CircleMarker>
))}

      </MapContainer>
    </div>
  );
};

export default TreeMapping;
