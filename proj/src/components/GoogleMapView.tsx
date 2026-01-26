import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import type { Farm, Coordinates } from "../assets/utils/types";

interface GoogleMapViewProps {
  farms: Farm[];
  center: Coordinates;
  zoom: number;
  onMarkerClick: (farm: Farm) => void;
}

const GoogleMapView = ({ farms, center, zoom, onMarkerClick }: GoogleMapViewProps) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "500px" }}
      center={center}
      zoom={zoom}
    >
      {farms.map((farm) => (
        <Marker
          key={farm.id}
          position={farm.coordinates}
          onClick={() => onMarkerClick(farm)}
        />
      ))}
    </GoogleMap>
  );
};

export default GoogleMapView;
