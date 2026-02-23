import * as L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Polygon,
  CircleMarker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "../styles/treeMapping.css";
import type { TreeData } from "../assets/utils/types";
import { TREES_DATA } from "../assets/utils/treesData";

interface TreeMappingProps {
  farm: {
    id: number;
    name: string;
    boundary: [number, number][];
  };
  trees?: TreeData[]; // admin mode
  adminMode?: boolean;
  onTreesChange?: (trees: TreeData[]) => void; // update tree list
  onAddTree?: (lat: number, lng: number) => void;
  onUpdateTree?: (tree: TreeData) => void;
  onDeleteTree?: (treeId: number) => void;
  onBack: () => void;
}

/* ---------- Geometry Helpers ---------- */
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

/* ---------- Component ---------- */
const TreeMapping = ({
  farm,
  trees,
  adminMode = false,
  onAddTree,
  onUpdateTree,
  onDeleteTree,
  onBack,
}: TreeMappingProps) => {
  const baseTrees = adminMode ? (trees ?? []) : TREES_DATA;

  const displayedTrees = baseTrees.filter(
    (tree) =>
      tree.farmId === farm.id &&
      isPointInPolygon([tree.lat, tree.lng], farm.boundary),
  );
  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        if (adminMode && onAddTree) {
          onAddTree(e.latlng.lat, e.latlng.lng);
        }
      },
    });
    return null;
  };

  /* Leaflet control overlay for header/back button */
  const MapHeaderControl = ({
    name,
    admin,
    onBackClick,
  }: {
    name: string;
    admin: boolean;
    onBackClick: () => void;
  }) => {
    const map = useMap();
    useEffect(() => {
      const container = L.DomUtil.create("div", "leaflet-map-header");
      container.style.background = "rgba(255,255,255,0.95)";
      container.style.padding = "6px 10px";
      container.style.borderRadius = "8px";
      container.style.boxShadow = "0 2px 6px rgba(0,0,0,0.12)";
      container.style.display = "flex";
      container.style.alignItems = "center";

      const btn = L.DomUtil.create("button", "btn-back-inline", container) as HTMLButtonElement;
      btn.innerText = "← Back";
      btn.style.marginRight = "10px";
      btn.style.background = "#2e7d32";
      btn.style.color = "white";
      btn.style.border = "none";
      btn.style.padding = "6px 10px";
      btn.style.borderRadius = "6px";
      btn.style.cursor = "pointer";

      const title = L.DomUtil.create("div", "map-header-title", container) as HTMLDivElement;
      title.innerText = `Liberica Tree Mapping – ${name}${admin ? " (Admin)" : ""}`;
      title.style.fontWeight = "700";


      const mapContainerEl = map.getContainer();
      container.style.position = "absolute";
      container.style.top = "10px";
      container.style.right = "10px";
      container.style.zIndex = "1000";
      mapContainerEl.appendChild(container);

      const onClick = (e: Event) => {
        e.preventDefault();
        onBackClick();
      };
      btn.addEventListener("click", onClick);

      // Prevent map interactions when interacting with the control
      L.DomEvent.disableClickPropagation(container);
      L.DomEvent.disableScrollPropagation(container);

      return () => {
        btn.removeEventListener("click", onClick);
        // detach the container from the map DOM
        if (container.parentNode) container.parentNode.removeChild(container);
      };
    }, [map, name, admin, onBackClick]);

    return null;
  };

  return (
    <div className="tree-map-wrapper">

      <MapContainer bounds={farm.boundary} className="tree-map" scrollWheelZoom>
        <MapHeaderControl name={farm.name} admin={!!adminMode} onBackClick={onBack} />
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Farm Boundary */}
        <Polygon positions={farm.boundary} pathOptions={{ color: "#ff0000" }} />

        {/* Admin click handler */}
        {adminMode && <MapClickHandler />}

        {/* Trees */}
        {displayedTrees.map((tree) => (
          <CircleMarker
            key={tree.id}
            center={[tree.lat, tree.lng]}
            radius={4}
            pathOptions={{
              color: tree.dnaVerified ? "#1565c0" : "#2e7d32",
              fillOpacity: 0.9,
            }}
          >
            <Popup>
              <strong>Tree #{tree.id}</strong>
              <br />
              DNA Verified: {tree.dnaVerified ? "Yes" : "No"}
              {adminMode && (
                <>
                  <br />
                  <button
                    onClick={() =>
                      onUpdateTree?.({
                        ...tree,
                        dnaVerified: !tree.dnaVerified,
                      })
                    }
                  >
                    Toggle DNA
                  </button>
                  <button onClick={() => onDeleteTree?.(tree.id)}>
                    Delete
                  </button>
                </>
              )}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};

export default TreeMapping;
