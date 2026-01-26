import type { Farm } from "../assets/utils/types";

interface MapViewProps {
  farms: Farm[];
  onFarmSelect: (farm: Farm) => void;
}

const MapView = ({ farms, onFarmSelect }: MapViewProps) => {
  return (
    <div className="map-container">
      <h3>Farm Map</h3>
      <div className="farms-grid">
        {farms.map((farm) => (
          <div
            key={farm.id}
            className="farm-dot"
            onClick={() => onFarmSelect(farm)}
          >
            {farm.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapView;
