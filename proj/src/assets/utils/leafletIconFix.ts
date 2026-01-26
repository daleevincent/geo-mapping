import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Properly type the prototype
type LeafletIconDefault = typeof L.Icon.Default & {
  prototype: {
    _getIconUrl?: () => string;
  };
};

// Cast once, safely
const DefaultIcon = L.Icon.Default as LeafletIconDefault;

// Remove private method if it exists
if (DefaultIcon.prototype._getIconUrl) {
  delete DefaultIcon.prototype._getIconUrl;
}

// Apply icon paths
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});
